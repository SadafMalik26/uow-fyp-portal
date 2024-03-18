import {
    Row, Col, Spinner, FormGroup, Label, Input, Button, Alert,InputGroup
} from "reactstrap";
import { useUpdateUser, useUser } from "../hooks/authentication";
import { useState,useEffect } from "react";
import { arrayBufferToBase64 } from "../common/utils";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export const EditProfile = (props) => {
    
    var id
    const location = useLocation();
    
    console.log(props)
    
    if(Object.keys(props).length !== 0)
    {
        id = props.id
    }
    else
    {
        
        id= location.state.id
    }
    
    
    const {data:user , refetch }=useUser(id)
    console.log(user)
    const [email,setEmail]=useState('')
    const [username,setUsername]=useState('')
    const [selectedImage, setSelectedImage] = useState(null);
    
    
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const [error,showError]=useState(false)
    
    useEffect(() => {
        setEmail(user?.email)
        setUsername(user?.username)
    },[user]);
    
    useEffect(() => {
        refetch()
    },[id,refetch]);
    
    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }
    
    
    const handleUserConfirmPassword = (pass) => {
        if(password == pass)
        setConfirmPasswordError(true)
        else
        setConfirmPasswordError(false)
        
        setConfirmPassword(pass)
    }
    
    const update = useUpdateUser()

    var userUpdate 
    
    const updateUser = async () => {
        update.reset()
        showError(false)
        if(password != '' )
        {
            if(confirmPasswordError)
            userUpdate = await update.mutateAsync({email,username,selectedImage,id,password}) 
            else
            showError(true)

        }else
        userUpdate = await update.mutateAsync({email,username,selectedImage,id}) 

    }
    
    return(
        <>
        
        <div className="teacher-details-container mb-4">
        
        <Row>
        {update?.isSuccess ? <Alert>Updated!</Alert>:""}
        {error? <Alert color="danger">Passwords do not match</Alert> : ""}
        
        <Col xs={6} md={6}>
        <div className="teacher-details-info">
        
        <FormGroup>
        <Label for="date">Email</Label>
        <Input
        type="email"
        disabled
        name="email"
        id="email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        </FormGroup>
        <FormGroup>
        <Label for="date">Username</Label>
        <Input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
        </FormGroup>  
        
        
        <Row>
        <Col>
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
        </Col>
        <Col>
        
        <FormGroup>
        <Label for="examplePassword">
        Confirm Password
        </Label>
        
        <InputGroup>
        
        <Input
        id="examplePassword"
        name={confirmPassword}
        value={confirmPassword}
        valid={confirmPasswordError}
        invalid={!confirmPasswordError}
        onChange={(e) => handleUserConfirmPassword(e.target.value)}
        placeholder="Enter Password"
        type={showConfirmPassword ? 'text' : 'password'}
        />
        <Button
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
        </Button>
        </InputGroup>
        
        
        </FormGroup>
        </Col>
        </Row>
        
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
        
        </div>
        </Col>
        <Col xs={6} md={6}>
        <div className="teacher-details-image-container">
        <img src={`data:image/jpeg;base64,${arrayBufferToBase64(user?.cover?.data?.data)}`} />
        
        </div>
        
        
        </Col>
        
        <Button onClick={()=>updateUser()} className="float-end">Update</Button>
        
        </Row>
        </div>
        </>
        )
    }