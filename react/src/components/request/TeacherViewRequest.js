import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalFooter, ModalHeader,Button,
    Card,CardText, CardBody,CardTitle } from 'reactstrap';
    
    import './ProjectCard.css'; // Import the custom CSS file
    import { useEditTeacherSlot } from '../../hooks/teacher';
    
    export const TeacherViewRequest=(props)=>{
        
        const slot = props.slot
        const [modal, setModal] = useState(false);
        const updateSlotStatus = useEditTeacherSlot()
        
        const acceptRequest = async (status) =>{
            const accept = await updateSlotStatus.mutateAsync({slot:{id:slot._id, status}})
            if(accept)
            setModal(!modal)
        }
        
        return(
            <>
            <FontAwesomeIcon  onClick={()=>setModal(!modal)}  icon={faEye} color="green" size="xl" />
            
            <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={()=>setModal(!modal)}>Request Details</ModalHeader>
            <ModalBody>
            
            <Card className="unique-card">
            <CardBody>
            <CardTitle tag="h3">Group Members:</CardTitle>
            <div  className="group-members">
            <span  className="member">{slot.group?.student1?.username}</span>
            <span  className="member">{slot.group?.student2?.username}</span>
            <span  className="member">{slot.group?.student3?.username}</span>
            </div>
            </CardBody>
            <CardBody>
            <CardTitle tag="h3">Project Name:</CardTitle>
            <CardText>{slot.group?.project?.title}</CardText>
            </CardBody>
            <CardBody>
            <CardTitle tag="h3">Status:</CardTitle>
            <CardText>{slot.status}</CardText>
            </CardBody>
            <CardBody>
            <CardTitle tag="h3">Project Details:</CardTitle>
            <CardText>{slot.group?.project?.details}</CardText>
            </CardBody>
            
           
           
            </Card>
            
            </ModalBody>
            <ModalFooter>
            <Button color="success" onClick={()=>acceptRequest("accept")}>
            Accept
            </Button>{' '}
            <Button color="danger"  onClick={()=>acceptRequest("reject")}>
            Reject
            
            </Button>
            <Button color="secondary" onClick={()=>acceptRequest("improve")}>
            Needs Improvement
            </Button>
            </ModalFooter>
            </Modal>
            
            </>
            )
        }