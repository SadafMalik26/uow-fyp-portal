import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft}  from '@fortawesome/free-solid-svg-icons';
import { Table, Button, Form, FormGroup, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAddFacultyProject, useFacultyProjects ,useDeleteFacultyProject} from '../hooks/facultyprojects';
import { useAuth } from '../hooks/authentication';


    export const FacultyProjects = () => {
        const {data:auth} = useAuth()
        const [title,setTitle]=useState("")
        const [supervisorname,setSupervisorname]=useState("")
      
        const deleteFacultyProject = useDeleteFacultyProject()
        const addFacultyProject = useAddFacultyProject()
        const {data:FacultyProjects}=useFacultyProjects()
         
        const [modal, setModal] = useState(false);
        
        const toggleModal = () => {
            setModal(!modal);
        };
        
        const add = async() => {
            const facultyproject= await addFacultyProject.mutateAsync({title,supervisorname})
            if(facultyproject)
            {
                toggleModal()
                setTitle("")
                setSupervisorname('')
                
            }
        }
      
        return (
             
            <div>
        {auth?.type=="Teacher" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> <strong>Add your idea</strong></Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={toggleModal}>Add FacultyProject</ModalHeader>
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
           
            </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={()=>add()} >Add idea</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
            <h2 style={{ fontSize: "30px" }}>Past Endeavors</h2><br></br>
            
            <Table>
            <thead>
            <tr >
            <th><strong>Title</strong></th>
            <th><strong>Supervisor Name</strong></th>
           
             
            {auth?.type=="Teacher" ? 
        <th><strong>Actions</strong></th>
        : "" }
          
            </tr><br></br>
            </thead>
            <tbody>
            {FacultyProjects?.map((facultyproject, index) => (
                
                <tr   key={index} className="border-top">
                <td>{facultyproject.title}</td>
               <td>{facultyproject.supervisorname}</td>
               
               <td> 
               {auth?.type=="Teacher" ? 
            <>
            
                <Button color="danger"  onClick={()=>deleteFacultyProject.mutate(facultyproject._id)}><FontAwesomeIcon icon={faDeleteLeft} /></Button>{' '}
                </>
            : "" }  </td>
           
               </tr>
                ))}
                </tbody>
                </Table>
                
                </div>
                );
            };
            
            