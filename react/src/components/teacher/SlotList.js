import React, { useState,useEffect } from 'react';

import { useAuth } from "../../hooks/authentication";
import { useEditTeacherSlot, useTeacherSlots } from "../../hooks/teacher";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faCheckCircle, faCheckSquare, faComment, faComments, faEye, faHandshake, faHourglassHalf, faTimesCircle } from '@fortawesome/free-solid-svg-icons'


import { Row,Col,Table, Button
} from "reactstrap";
import { StudentNone } from '../request/StudentNone';
import { TeacherViewRequest } from '../request/TeacherViewRequest';
import { useNavigate } from 'react-router-dom';

export const SlotList=(props)=>{
  
  const { data: auth } = useAuth()
  const navigate = useNavigate()
  
  const slots=props.slots
  
  return(
    <Row>
    <Col>
    <Table striped bordered responsive>
    <thead>
    <tr>
    <th>Date</th>
    <th>Time</th>
    <th>Availablity</th>
    
    <th>Action</th> 
    
    </tr>
    </thead>
    <tbody>
    {slots?.map((slot, index) => (
      
      <tr >
      <td>{slot.date}</td>
      <td>{slot.time}</td>
      <td >{!slot.isBooked ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" size="xl" />
        ) : (
          <FontAwesomeIcon icon={faTimesCircle} color="red" size="xl" />
          )}</td>
          
          <td>
          
          {(slot.status === 'none' && auth.type=='Student' ) && (
            <StudentNone slot={slot} /> 
            )}
            
            {(slot.status === 'pending'  && auth.type=='Student') && (
              <Button color='secondary'>  <FontAwesomeIcon icon={faHourglassHalf} size="xl" /> Pending </Button>
              )}
              
              {(slot.status === 'pending'  && auth.type=='Teacher') && (
                <TeacherViewRequest slot={slot} />
                )}
                
                {slot.status === 'accept' && (
                  <> <Button color='success'>  <FontAwesomeIcon icon={faCheckSquare} size="xl" /> Accepted </Button> {'     '}
                  
                  {(slot.group.student1 == auth?.id ||slot.group.student2 == auth?.id || slot.group.student3 == auth?.id) || (auth?.type == 'Teacher') ? <>
                    <Button color='primary' onClick={()=>navigate(`/home/chat/${slot.group._id}`)}><FontAwesomeIcon  icon={faComments}  size="xl" /> Chat </Button> {'     '}
                    <Button color='danger'  onClick={()=>navigate(`/home/meeting/${slot.group._id}`)}> <FontAwesomeIcon icon={faHandshake} size="xl" /> Meetings </Button>
                    
                    </>:"" }
                    
                    
                    </>
                    )}
                    
                    </td>
                    
                    </tr>
                    ))}
                    </tbody>
                    </Table>
                    </Col>
                    </Row>
                    )
                  }