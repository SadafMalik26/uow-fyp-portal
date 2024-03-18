import React, { useState } from 'react';
import { Table, Button, Form, FormGroup, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useAddLink, useLinks } from '../hooks/links';
import { useAuth } from '../hooks/authentication';
const LinkItem = ({ link }) => {
    
    return (
        <tr>
        <td>{link.title}</td>
        <td>{link.description}</td>
        <td><a href={link.url} target="_blank" rel="noopener noreferrer">Go to link</a></td>
        </tr>
        );
    };
    
    export const ImportantLinks = () => {
        const {data:auth} = useAuth()
        const [title,setTitle]=useState("")
        const [description,setDescription]=useState("")
        const [url,setUrl]=useState("")
        
        const addLink = useAddLink()
        const {data:links}=useLinks()
        
        const [modal, setModal] = useState(false);
        
        const toggleModal = () => {
            setModal(!modal);
        };
        
        const add = async() => {
            const link = await addLink.mutateAsync({title,description,url})
            if(link)
            {
                toggleModal()
                setTitle("")
                setDescription("")
                setUrl("")
            }
        }
        
        return (
             
            <div>
        {auth?.type=="Admin" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> Add New</Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={toggleModal}><strong>Add Link Details</strong></ModalHeader>
            <ModalBody>
            <Form >
            <FormGroup>
            <Label for="title">Title</Label>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" id="title" placeholder="Enter Title"  />
            </FormGroup>
            <FormGroup>
            <Label for="Description">Description</Label>
            <Input type="Description"  onChange={(e) => setDescription(e.target.value)} value={description} name="Description" id="Description" placeholder="Enter Description"  />
            </FormGroup>
            <FormGroup>
            <Label for="url">URL</Label>
            <Input type="url" name="url"  onChange={(e) => setUrl(e.target.value)} value={url} id="url" placeholder="Enter url"  />
            </FormGroup>
            </Form>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={()=>add()} >Add Link</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
      <h2 style={{ fontSize: "30px" }}>Important Links</h2><br></br>
            
            <Table>
            <thead>
            <tr>
            <th><strong>Title</strong></th>
            <th><strong>Description</strong></th>
            <th><strong>Link</strong></th>
            </tr>
            </thead>
            <tbody>
            {links?.map((link) => (
                <LinkItem key={link.url} link={link} />
                ))}
                </tbody>
                </Table>
                
                </div>
                );
            };
            
            