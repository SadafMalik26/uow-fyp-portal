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

import { useNavigate, useParams } from 'react-router-dom';

import { useLogin } from '../../hooks/authentication';

export function Login() {

    //react query hook
    const signIn = useLogin()

    const navigate = useNavigate()
    const { type } = useParams()

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

  
   
  
    

    const handleUserEmail = (email) => {
       
        let isEmailValid
        let pattern
        if (type == 'Admin')
        pattern = /^(admin+)@(uow.edu.pk)/i
        else if (type == 'Student')
            pattern = /^([\w.%+-]+)@(student.uow.edu.pk)/i
        else
            pattern = /^([\w.%+-]+)@(uow.edu.pk)/i

        isEmailValid = email.match(pattern)


        setEmailError(isEmailValid ? true : false)
        setEmail(email)
    }

    const handleUserPassword = (password) => {
        let isPasswordValid = password.length >= 6
        setPasswordError(isPasswordValid ? true : false)
        setPassword(password)
    }

    const login = async () => {
        let loggedIn = await signIn.mutateAsync({ email, password, type })
        if (loggedIn)
            navigate('/home');
    }

  
    return (

        <CardBody className='loginBG'>

            <div className='text-center'>
                <img alt='logo' src={logo} width={250} />
            </div>

            {signIn.isError ? (
                <Alert color="danger">
                    Invalid Credentials
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
                        valid={emailError}
                        invalid={!emailError}
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
            </Form>
            <Button
                className='float-end'
                color='primary'
                block
                disabled={(emailError && passwordError) ? false : true}
                onClick={() => login()}>
                Login
            </Button>

        </CardBody>

    )
}