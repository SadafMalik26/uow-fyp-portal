import React, { useState,useEffect } from 'react';


import { Row,Col, Modal, ModalHeader, ModalBody, ModalFooter,Button
    ,FormGroup,Label,Input
} from "reactstrap";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../hooks/authentication';
import { useEditTeacherSlot } from "../../hooks/teacher";
import { useWithoutGroupStudents } from '../../hooks/group';

export const StudentNone = (props) => {
    
    const slot = props.slot
    
    const {isSuccess, data: auth } = useAuth()
    
    const updateSlotStatus = useEditTeacherSlot()
    
    const [modal, setModal] = useState(false);
    
    
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    
    const {isSuccess:success,data:withoutGroup} = useWithoutGroupStudents()
    
    
    const [student2, setStudent2] = useState([])
    const [valueStudent2, setValueStudent2] = useState('')
    
    const [student3, setStudent3] = useState([])
    const [valueStudent3, setValueStudent3] = useState('')

    useEffect(() => {
        if(success && withoutGroup)
        {
                var id = auth.id
                const newArray = withoutGroup?.filter(item => item._id !== id);
                setStudent2(newArray)
                const newArray2 = student2?.filter(item => item._id !== id);
                setStudent3(newArray2)
           
        }
    },[auth,withoutGroup]);
    
    
    const selectStudent2 = (id) => {
        setValueStudent2(id)
        const newArray = student2?.filter(item => item._id !== id);
        setStudent3(newArray)
    }
    
    const selectStudent3 = (id) => {
        setValueStudent3(id)
    }
    
    const requestSlot = async (id, status) => {
       const edit =  await updateSlotStatus.mutateAsync({ slot : {id, status} , group : {valueStudent2,valueStudent3},project:{title,details} })
      
       if(edit){
        setModal(!modal)}
    }
    return (
        
        <> <FontAwesomeIcon title="Add Request" onClick={()=>setModal(!modal)} icon={faCalendarPlus} color="green" size="xl" />
        
        <Modal isOpen={modal} toggle={()=>setModal(!modal)} size='lg'>
          
        <ModalHeader toggle={()=>setModal(!modal)}>Add Request Details</ModalHeader>
        <ModalBody>
        
        <Row>
        <Col>
        <FormGroup>
        <Label for="exampleSelect">
        Select Student 2
        </Label>
        <Input
        id="exampleSelect"
        name="select"
        type="select"
        onChange={(e) => selectStudent2(e.target.value)}
        >
        <option>--SELECT--</option>
        {student2?.map((student, index) => (
            <option value={student._id}>
            {student.username}
            </option>
            ))}
            </Input>
            </FormGroup>
            </Col>
            <Col>
            
            <FormGroup>
            <Label for="exampleSelect">
            Select Student 3
            </Label>
            <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={(e) => selectStudent3(e.target.value)}
            >
            <option>--SELECT--</option>
            {student3?.map((student, index) => (
                <option value={student._id}>
                {student.username}
                </option>
                ))}
                </Input>
                </FormGroup>
                </Col>
                </Row>
                
                <FormGroup>
                <Label for="title">
                Title
                </Label>
                <Input
                name="title"
                placeholder="title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                />
                </FormGroup>
                
<Row>
  <Col>
    <FormGroup>
      <Label for="details">Details</Label>
      <ReactQuill
         value={details}
         onChange={(value) => {
           const plainText = value.replace(/<\/?[^>]+(>|$)/g, '').trim();
           setDetails(plainText);
         }}

        modules={{
          toolbar: [
            ['bold', 'italic'],
            [{ align: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
          ],
        }}
        formats={['bold', 'italic', 'align', 'size']}
      />
    </FormGroup>
  </Col>
</Row>
              

   
               
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={()=>requestSlot(slot._id,"pending")}>Add Request</Button>{' '}
                <Button color="secondary" onClick={()=>setModal(!modal)}>Cancel</Button>
                </ModalFooter>
                </Modal>
                
                </>
                )
                
            }