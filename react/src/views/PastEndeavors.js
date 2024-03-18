import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft}  from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Form, FormGroup, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAddPastEndeavor, usePastEndeavors ,useDeletePastEndeavor} from '../hooks/pastendeavors';
import { useAuth } from '../hooks/authentication';


    export const PastEndeavors = () => {
        const {data:auth} = useAuth()
        const [title,setTitle]=useState("")
        const [supervisorname,setSupervisorname]=useState("")
        const [membersname,setMembersname]=useState("")
        const [description,setDescription]=useState("") 
        const [url,setUrl]=useState("")
        const [inyear,setInyear]=useState("")
        const deletePastEndeavor = useDeletePastEndeavor()
        const addPastEndeavor = useAddPastEndeavor()
        const {data:PastEndeavors}=usePastEndeavors()
         
        const [modal, setModal] = useState(false);
        
        const toggleModal = () => {
            setModal(!modal);
        };
        
        const add = async() => {
            const pastendeavor= await addPastEndeavor.mutateAsync({title,supervisorname,membersname,description,inyear,url})
            if(pastendeavor)
            {
                toggleModal()
                setTitle("")
                setSupervisorname('')
                setMembersname('')
                setDescription("")
                setInyear('')
                setUrl("")
            }
        }
      
        const handleChange = (event) => {
            const year = new Date(event.target.value).getFullYear();
            setInyear(year.toString().slice(-4));
          };
        return (
             
            <div>
        {auth?.type=="Teacher" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> <strong>Add Past Endeavors</strong></Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={toggleModal}>Add PastEndeavor</ModalHeader>
            <ModalBody>
            <Form >
            <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" placeholder="Enter Title"  />
            </FormGroup>
            <FormGroup>
            <Label for="supervisorname">Supervisor Name</Label>
            <Input type="supervisorname" onChange={(e) => setSupervisorname(e.target.value)} value={supervisorname} name="Supervisorname" id="supervisorname" placeholder="Enter Supervisor Name"  />
            </FormGroup>
            <FormGroup>
            <Label for="membersname">Members Name</Label>
            <Input type="membersname"  onChange={(e) => setMembersname(e.target.value)} value={membersname} name="Membersname" id="membersname" placeholder="Enter Group Member Name's"  />
            </FormGroup>

            <FormGroup>
    <Label for="Description">Description</Label>
    <textarea type="text"  onChange={(e) => setDescription(e.target.value)}  name="description"id="description"
  placeholder="Enter Description" rows="3"  cols="50" spellcheck="false" autocapitalize="off" autocorrect="off"
  /></FormGroup>

            
            <FormGroup><Label for="url">Github URL</Label>
            <Input type="url" name="url"  onChange={(e) => setUrl(e.target.value)} value={url} id="url" placeholder="Enter Github url"  />
            </FormGroup>
            <FormGroup>
            <Label for="inyear">In Year</Label>
             <Input type="inyear" name="inyear" id="inyear"  onChange={handleChange} value={inyear} required placeholder="Enter year"  />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={()=>add()} >Add Link</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
            <h2 style={{ fontSize: "30px" }}>Past Endeavors</h2><br></br>
            
            <Table>
            <thead>
            <tr >
            <th><strong>Title</strong></th>
            <th><strong>Supervisor Name</strong></th>
            <th><strong>Group Member Name's</strong></th>
            <th><strong>Description</strong></th>
            <th><strong>Github Link</strong></th>
            <th><strong>In Year</strong></th>
             {auth?.type=="Admin" ? 
        <th><strong>Actions</strong></th>
        : "" }
          
            </tr><br></br>
            </thead>
            <tbody>
            {PastEndeavors?.map((pastendeavor, index) => (
                
                <tr   key={index} className="border-top">
                <td>{pastendeavor.title}</td>
               <td>{pastendeavor.supervisorname}</td>
               <td>{pastendeavor.membersname}</td>
               <td>{pastendeavor.description.split('\n')}</td>
               <td><a href={pastendeavor .url} target="_blank" rel="noopener noreferrer">Go to Past Endeavors </a></td>
               <td>{pastendeavor.inyear}</td> 
               <td> 
               {auth?.type=="Teacher" ? 
            <>
            
                <Button color="danger"  onClick={()=>deletePastEndeavor.mutate(pastendeavor._id)}><FontAwesomeIcon icon={faDeleteLeft} /></Button>{' '}
                </>
            : "" }  </td>
               </tr>
                ))}
                </tbody>
                </Table>
                
                </div>
                );
            };
            
            