import React, { useState,useEffect } from "react";
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
} from "reactstrap";
import "../Meet.css"; // Import the CSS file for styling
import { useAttendees } from "../hooks/group";
import { useParams } from "react-router-dom";
import { useAddMeeting, useMeetingPercenatge, useMeetings } from "../hooks/meeting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/authentication";

export const Meeting = () => {
    
    const {id} = useParams()
    const {data:auth}=useAuth()
    const addMeeting = useAddMeeting()
    const{data:meets} = useMeetings()
    
    const {data:students} = useAttendees(id)
    
    const {isSuccess, data:percenatgeStudents} = useMeetingPercenatge(id)
    console.log(percenatgeStudents)
    
    const [attendees, setAttendees] = useState([]);
    const currentDate = new Date().toLocaleDateString();
    
    // Check if today's date is present in any meeting object
    const isDatePresent = meets?.some(
        (meeting) => meeting.currentDate === currentDate
        );
        
        useEffect(() => {
            // Set initial state of attendees with all students and false attendance
            const initialAttendees = students?.map((student) => ({
                student: student._id,
                present: false,
            }));
            setAttendees(initialAttendees);
        }, [students]);
        
        const addToArray = (e, studentId) => {
            const isChecked = e.target.checked;
            
            setAttendees((prevAttendees) => {
                const updatedAttendees = prevAttendees.map((attendee) => {
                    if (attendee.student === studentId) {
                        return {
                            ...attendee,
                            present: isChecked,
                        };
                    }
                    return attendee;
                });
                
                // If student not found in attendees, add them to the array
                if (!prevAttendees.some((attendee) => attendee.student === studentId)) {
                    updatedAttendees.push({ student: studentId, present: isChecked });
                }
                
                return updatedAttendees;
            });
        };
        
        const add = async() =>{
            
            const addMeet = await addMeeting.mutateAsync({attendees,id,currentDate})
            
        }
        
        
        return (
            
            <div className="meet-add-container">
            
            
            <Row>
            {isSuccess ? Object.values(percenatgeStudents).map((student) => (
                <Col className="col-md-4 mb-3">
                
                
                <Card 
                 className={`student-card ${student?.percentage < 75 ? 'alertAttendance' : ''}`}
                >
                <CardBody>
                <CardTitle>{student?.student?.username}</CardTitle>
                <h2>{student?.percentage}%</h2>
                </CardBody>
                </Card>
                </Col>
                
                )) : ""}
                </Row>
                
                
                {isDatePresent ? "" : auth?.type == 'Teacher' ?
                <>
                <h2>Add Meeting</h2>
                <Card className="custom-card">
                <CardBody>
                <CardTitle tag="h5" className="custom-card-title">
                {currentDate} - Meeting Details
                </CardTitle>
                {students?.map((student) => (
                    <FormGroup key={student._id} check className="student-item">
                    <Label check className="custom-checkbox">
                    <Input
                    type="checkbox"
                    onChange={(e) =>
                        addToArray(e, student._id)
                    }
                    />{" "}
                    <b>{student.username} </b> <small>( {student.email} )</small>
                    </Label>
                    </FormGroup>
                    ))}
                    <Button color="primary" onClick={()=>add()}  className="custom-button float-end">
                    Add
                    </Button>
                    </CardBody>
                    </Card></> : ""
                }
                
                {meets?.map((meet) => ( 
                    <Card >
                    <CardBody>
                    <CardTitle tag="h5" className="custom-card-title">
                    {meet.currentDate} - Meeting Details
                    </CardTitle>
                    {meet.attendees?.map((attendee) => (
                        <FormGroup key={attendee.student._id} check className="student-item">
                        <Label check className="custom-checkbox">
                        <b>{attendee.student.username} </b>  
                        {attendee.present ? (
                            <FontAwesomeIcon icon={faCheckCircle} color="green" />
                            ) : (
                                <FontAwesomeIcon icon={faTimesCircle} color="red" />
                                )}
                                </Label></FormGroup>
                                ))}
                                </CardBody>
                                </Card>
                                ))}
                                </div>
                                );
                            };
                            
                            