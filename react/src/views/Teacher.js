import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, InputGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useAddTeacher } from '../hooks/teacher';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faAdd} from '@fortawesome/free-solid-svg-icons'
import { All } from '../components/teacher/All';
import { useAuth } from '../hooks/authentication';

export function Teacher() {
    
    
    const addTeacher = useAddTeacher()
    const { data: auth } = useAuth()
    
    const [username, setUserName] = useState('');
    const [qualification, setQualification] = useState('');
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [interest, setInterest] = useState(null);
    
    
    const [modal, setModal] = useState(false);
    
    const handleUserEmail = (email) => {
        let isEmailValid = email.match(/^([\w.%+-]+)@(uow.edu.pk)/i);
        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }
    
    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }
    
    const toggleModal = () => {
        setModal(!modal);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let add = await addTeacher.mutateAsync({ username, email, password, qualification,selectedImage,interest })
        
        setUserName('')
        setEmail('')
        setPassword('')
        setQualification('')
        toggleModal();
    };
    
    
    
    return (
        <>
        <Container>
        <Row>
        
        {(addTeacher.isSuccess) ?
            <Alert color='success'>Teacher Added!</Alert> : "" }

        <Col lg={12}>
        {auth?.type == 'Admin' ?
        <Button className='float-end' color="primary" onClick={toggleModal}>
        <FontAwesomeIcon icon={faAdd} /> {' '}
        Add New</Button>
        : "" }
        <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}><strong>Add Teacher Details</strong></ModalHeader>
        <ModalBody>

        {(addTeacher.isError) ?
            <Alert color='danger'>{addTeacher.error.response.data.message}</Alert> : "" }
            
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
            <FormGroup>
            <Label for="qualification">Qualification</Label>
            <Input
            type="text"
            name="qualification"
            id="qualification"
            placeholder="Enter teacher's qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)} />
            </FormGroup>
            
            <FormGroup>
            <Label for="interest">Interests</Label>
            <Input
            type="text"
            name="interest"
            id="interest"
            placeholder="Enter teacher's interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)} />
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
            <Button color="primary" onClick={handleSubmit}>Add Teacher</Button>{' '}
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
            </Modal>
            
           <strong> <h2 style={{ fontSize: "32px" }}><strong>List of Teachers</strong></h2></strong>
            <br></br>
            <All />
            
            </Col>
            </Row>
            </Container>
            </>
            )
        }