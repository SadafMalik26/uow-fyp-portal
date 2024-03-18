// PasswordResetPage.js

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardBody, Button, Form, FormGroup, Label, Input, Alert, InputGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export function PasswordResetPage() {
  const { email } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleUserPassword = (password) => {
    const isPasswordValid = password.length >= 6;
    setPasswordError(!isPasswordValid);
    setPassword(password);
  };

  const handleUserConfirmPassword = (confirmPassword) => {
    const isConfirmPasswordValid = confirmPassword === password;
    setConfirmPasswordError(!isConfirmPasswordValid);
    setConfirmPassword(confirmPassword);
  };

  const handlePasswordReset = async (email, password) => {
    try {
      const response = await axios.post('/reset-password', { email, password });
      if (response.data.success) {
        navigate('/');
      } else {
        // handle error case
      }
    } catch (error) {
      // handle error case
    }
  };

  return (
    <CardBody className='loginBG'>
      <Form>
        <FormGroup>
          <Label for='password'>New Password</Label>
          <InputGroup>
            <Input
              id='password'
              name='password'
              value={password}
              valid={passwordError}
              invalid={!passwordError}
              onChange={(e) => handleUserPassword(e.target.value)}
              placeholder='Enter New Password'
              type={showPassword ? 'text' : 'password'}
            />
            <Button onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </Button>
          </InputGroup>
        </FormGroup>

        <FormGroup>
          <Label for='confirmPassword'>Confirm Password</Label>
          <InputGroup>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              valid={confirmPasswordError}
              invalid={!confirmPasswordError}
              onChange={(e) => handleUserConfirmPassword(e.target.value)}
              placeholder='Confirm New Password'
              type={showConfirmPassword ? 'text' : 'password'}
            />
            <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </Button>
          </InputGroup>
        </FormGroup>

        <Button
          className='float-end'
          color='primary'
          block
          disabled={!passwordError || !confirmPasswordError}
          onClick={handlePasswordReset}
        >
          Reset Password
        </Button>
      </Form>
    </CardBody>
  );
}
