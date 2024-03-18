import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import {
    Container, Row, Col, Form, FormGroup, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter
    , InputGroup,
    Alert } from 'reactstrap';
import {  useAddStudent } from '../hooks/student';
import { All } from '../components/student/All';
import { useAuth } from '../hooks/authentication';


export function Student() {
    
    const addStudent = useAddStudent()
    
    const {data:auth} = useAuth()

    
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    
    
    const [modal, setModal] = useState(false);
    
    const handleUserEmail = (email) => {
        let isEmailValid = email.match(/^([\w.%+-]+)@(student.uow.edu.pk)/i);
        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }
    
    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let add = await addStudent.mutateAsync({ username, email, password, selectedImage })
        setUserName('')
        setEmail('')
        setPassword('')
        setModal(!modal)
    };
    
    return (
        <>
        <Container>
        <Row>
        
        {(addStudent.isSuccess) ?
            <Alert color='success'>Student Added!</Alert> : "" }
            <Col lg={12}>
            {auth?.type=="Admin" ? 
            <Button className='float-end' color="primary" onClick={()=>setModal(!modal)}><i class="bi bi-plus"></i> Add New</Button> : "  " }
            <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
            <ModalHeader toggle={()=>setModal(!modal)}>Add Student Details</ModalHeader>
            <ModalBody>
            
            {(addStudent.isError) ?
                <Alert color='danger'>{addStudent.error.response.data.message}</Alert> : "" }
                
                <Form onSubmit={handleSubmit}>
                <FormGroup>
                <Label for="name">Username</Label>
                <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter teacher's name"
                value={username}
                onChange={(e) => setUserName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                <Label for="email">Email</Label>
                <Input
                type="email"
                name={email}
                value={email}
                valid={emailError}
                invalid={!emailError}
                onChange={(e) => handleUserEmail(e.target.value)} />
                </FormGroup>
                
                
                <FormGroup >
                <Label
                for="image"
                >
                Cover
                </Label>
                <Input
                id="image"
                name="image"
                type="file"
                onChange={(e) => {
                    setSelectedImage(e.target.files[0]);
                }}
                />
                
                </FormGroup>
                
                <FormGroup>
                <Label for="examplePassword">
                Password
                </Label>
                <InputGroup>
                <Input
                id="examplePassword"
                name={password}
                value={password}
                valid={passwordError}
                invalid={!passwordError}
                onChange={(e) => handleUserPassword(e.target.value)}
                placeholder="Enter Password"
                type={showPassword ? 'text' : 'password'}
                />
                <Button
                onClick={() => setShowPassword(!showPassword)}
                >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </Button>
                </InputGroup>
                </FormGroup>
                </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Add Student</Button>{' '}
                <Button color="secondary" onClick={()=>setModal(!modal)}>Cancel</Button>
                </ModalFooter>
                </Modal>
                
                <All />
                
                </Col>
                </Row>
                </Container>
                </>
                )
            }