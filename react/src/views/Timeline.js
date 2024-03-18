import React, { useState } from 'react';
import "../timeline.css";
import { Card, CardBody,Col ,CardTitle, CardSubtitle, CardText, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Row } from 'reactstrap';
import { useTimeline, useAddTimeline,  useDeleteTimeline} from '../hooks/timeline';
import { left, right } from '@popperjs/core';
import { useAuth } from '../hooks/authentication';

export const Timeline = () => {
  
  const {data:timelines}=useTimeline()
  const addTimeline = useAddTimeline()
  
    const {data:auth} = useAuth()

  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  
  const deleteTimeline = useDeleteTimeline()
  const toggleModal = () => setModal(!modal);
  
  const timelineAdd = async () => {
    const timeline = await addTimeline.mutateAsync({title,description,date})
    if(timeline){
      toggleModal();
      setTitle("")
      setDescription("")
      setDate("")
    }
  };
  
  return (
    <div>
        {auth?.type=="Admin" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> Add New</Button> : "" }
            
    <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
    <ModalHeader toggle={toggleModal}>Add Timeline</ModalHeader>
    <ModalBody>
     
    <FormGroup>
    <Label for="title">Title</Label>
    <Input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} required placeholder="Enter Title"  />
    </FormGroup>
    <FormGroup>
    <Label for="Description">Description</Label>
    <textarea type="text"  onChange={(e) => setDescription(e.target.value)}  name="description"id="description"
  placeholder="Enter Description" rows="3"  cols="50" spellcheck="false" autocapitalize="off" autocorrect="off"
  /></FormGroup>
    <FormGroup>
    <Label for="date">Date</Label>
    <Input type="date" name="date" id="date" onChange={(e) => setDate(e.target.value)} value={date} required placeholder="Enter date"  />
    </FormGroup>
    <Button onClick={()=>timelineAdd()} color="primary">Add it</Button>{' '}
    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
    </ModalBody>
    </Modal>
    
    <h2>Timeline</h2>
    
    <Row >
      
    <Col >
      <div className="timeline mt-4">
    {timelines?.map((timeline) => (
      <Col md={10} sm={20} key={timeline._id}>

        <div style={{ float: 'right' , clear:'both',padding:20 }}>
          
  <i className="bi bi-calendar-check" ></i>
  <h5 >{timeline.date}</h5>
</div>
      <Card className='timeline-item h2'> 
      <CardBody >
        
      <div className="timeline-item ">
      <h3 className="card-title mb-0" >{timeline.title}</h3>
      <div>  {auth?.type=="Admin" ?  <i onClick={()=>deleteTimeline.mutate(timeline._id)} className="bi bi-trash" style={{ color: 'red', position: 'absolute', top: '0', right: '0' }}></i>: "" }</div></div>
      <ul className="card-text">
  {timeline.description.split("\n").map((line, index) => (<li key={index} style={{fontSize:'14px'}}>{line}</li>
  ))}</ul>
      </CardBody>   
      </Card> 
     
      </Col>
      
      ))}</div>
      </Col></Row >
      </div>
      );
    };
    
    