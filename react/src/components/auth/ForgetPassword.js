import { useState } from 'react';

import {
    CardBody,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    InputGroup
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import logo from '../../images/logo.png'
import { useForgetPass } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';


export function ForgetPassword() {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const updatePass = useForgetPass()
    const navigate = useNavigate()

    const handleUserEmail = (email) => {

        setEmail(email)
    }

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

  const update =async()=>{

    const edit = await updatePass.mutateAsync({password,email})
    if(edit){
        navigate('/')
    }

  }

    return (

        <CardBody className='loginBG'>

            <div className='text-center'>
                <img alt='logo' src={logo} width={250} />
            </div>

            {updatePass.isError ? (
                <Alert color="danger">
                    Invalid Email
                </Alert>
            ) : null}

            <Form>
                <FormGroup>
                    <Label for="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        name={email}
                        value={email}
                        onChange={(e) => handleUserEmail(e.target.value)}
                        placeholder="Enter Email"
                        type="email"
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


            </Form>
            <Button
                className='float-end'
                color='primary'
                block
                disabled={( passwordError && confirmPasswordError) ? false : true}
                onClick={() => update()}>
                Update
            </Button>

        </CardBody>

    )
}