import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormText, Alert, Badge } from 'reactstrap';
import '../ProjectDescription.css';
import { useAddProject, useMyProjects, useUpdateProject } from '../hooks/project';
import DownloadPdf from '../utils/DownloadPDF';
import '../project.css'
import { arrayBufferToBase64 } from '../common/utils';
export const MyProject = () => {
    
    const addProject = useAddProject()
    const {isSuccess:myProjSuccess,data:group}=useMyProjects()

    const updateProject = useUpdateProject()
    
    const [selectedFile, setSelectedFile] = useState('')
    
    
    const updateDoc = async(status) =>{
       const update=await updateProject.mutateAsync({id:group?.project?._id,status,selectedFile})
    }
    console.log(group?.project)
    
    return (
        
        
        <Container className='prjectContainer'>
     
    {myProjSuccess ? group ? <>
        <Row>
        <Col className="project-header">
        <h1>{group?.project?.title}</h1>
        </Col>
        </Row>
        {group?.supervisor ? 
            <Row>
            
            <Col xl={8} sm={8} md={8}className="project-section">
            <h2>Supervisor</h2>
            <div className="supervisor-info">
            <div>
            <img  className="supervisor-avatar" src={`data:image/jpeg;base64,${arrayBufferToBase64(group?.supervisor?.cover?.data?.data)}`} />
            </div>
            <div className="supervisor-details">
            <h3>{group?.supervisor?.username}</h3>
            <p>{group?.supervisor?.email}</p>
            </div>
            </div>
            </Col>
            </Row> : <Alert color='info'>You're not assigned any supervisor yet!</Alert>}
            </> : "" : ""}
            <Row>
<br/>
    {group?.project?.requirement_document ? (
      <>
        Requirement Document
        <DownloadPdf fileName="requirement" buffer={group.project?.requirement_document?.data.data} />
      </>
    ) : null}

{group?.project?.prop_document ? (
      <>
        Proposel Document
        <DownloadPdf fileName="Proposel" buffer={group.project?.prop_document?.data.data} />
      </>
    ) : null}
    {group?.project?.defense_document ? (
      <>
        Defense Document
        <DownloadPdf fileName="defense" buffer={group.project?.defense_document?.data.data} />
      </>
    ) : null}
    {group?.project?.mid_document ? (
      <>
        Mid Document
        <DownloadPdf fileName="mid" buffer={group.project?.mid_document?.data.data} />
      </>
    ) : null}
    {group?.project?.final_document ? (
      <>
        Final Document
        <DownloadPdf fileName="final" buffer={group.project?.final_document?.data.data} />
      </>
    ) : null}
</Row>
            <hr/>
            <p> <b>status - </b>
  <Badge bg='yellow' className='m-2'>{group?.project?.status}</Badge></p>

           
        <Row>
        <Col className="project-section">
        <h2>Group Members</h2>
        <ul>
        
        <li key='requirement'>{group?.student1?.username}</li>
        <li key='requirement'>{group?.student2?.username}</li>
        <li key='requirement'>{group?.student3?.username}</li>
        </ul>
        </Col>
        </Row>
        <Row>
        <Col xl={8} sm={8} md={8} className="project-section">
        <h2>Details</h2>
        <p>{group?.project?.details}</p>
        </Col>
        </Row>
       
        
     
     
        

            <Col className="project-section">
            <h2>Upload File</h2>
            </Col>
<Row>
            {group?.project?.status != 'completed' ? <>
            <FormGroup>
            <Input
            id="exampleFile"
            name="file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            </FormGroup>
            </> : "All docs Submitted!" }
            
            {group?.project?.status == 'accepted' ? <>
            <Button onClick={()=>updateDoc('requirement')}>Update</Button>
            </> : ""}

            {group?.project?.status == 'requirement' ? <>

            <Button onClick={()=>updateDoc('proposel')}>Update</Button>
            </> : ""}

            {group?.project?.status == 'proposel' ? <>
           
            <Button onClick={()=>updateDoc('defense')}>Update</Button>
            </> : ""}
            
            {group?.project?.status == 'defense' ? <>
            <Button onClick={()=>updateDoc('mid')}>Update</Button>
            </> : ""}

            {group?.project?.status == 'mid' ? <>
            <Button onClick={()=>updateDoc('completed')}>Update</Button>
            </> : ""}
            </Row>
            </Container>
            
            
            );
        };
        
        