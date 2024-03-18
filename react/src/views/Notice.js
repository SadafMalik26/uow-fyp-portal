import React, { useState } from 'react';
import { Card, CardBody,Col , Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row } from 'reactstrap';
import { useAddNotice, useDeleteNotice, useNotice } from '../hooks/notice';
import { useAuth } from '../hooks/authentication';
export const Notice = () => {

  const {data:auth} = useAuth()
  const {data:notices}=useNotice()
  const addNotice = useAddNotice()
  
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const deleteNotice = useDeleteNotice()
  const toggleModal = () => setModal(!modal);
  
  const noticeAdd = async () => {
    const notice = await addNotice.mutateAsync({title,description})
    if(notice){
      toggleModal();
      setTitle("")
      setDescription("")
    }
  };
  
  return (
   <div>
        {auth?.type==="Admin" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> Add New</Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
    <ModalHeader toggle={toggleModal}>Add Notice</ModalHeader>
    <ModalBody>
    <FormGroup>
    <Label for="title">Title</Label>
    <Input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} required placeholder="Enter Title"  />
    </FormGroup>
    <FormGroup>
    <Label for="Description">Description</Label>
    <Input type="Description"  onChange={(e) => setDescription(e.target.value)} value={description} name="Description" id="Description" placeholder="Enter Description"  />
    </FormGroup>
    <Button onClick={()=>noticeAdd()} color="primary"><strong>Add Notice</strong></Button>{' '}
    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalBody>
    </Modal>
    
    <h2 style={{ fontSize: "30px" }}>Notice Board</h2><br></br>
               
    
    
    <Row className=" m-2">
    {notices?.map((notice) => (
      <Col md={4} sm={6} key={notice._id}>
      <Card className="mb-4">
      <CardBody>
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="card-title mb-0" >{notice.title}</h5>
     <div><i class="bi bi-bell" style={{ color: 'blue' }}></i><i onClick={()=>deleteNotice.mutate(notice._id)} className="bi bi-trash" style={{ color: 'red' }}></i></div>
      </div>
      <p className="card-text">{notice.description}</p>
      </CardBody>
      </Card>
      </Col>
      ))}
      </Row>
      </div>
      );
    };
    
    