import {
    CardBody,
    Button,
} from 'reactstrap';

import logo from '../../images/logo.png'

import { useNavigate } from 'react-router-dom';

export function PreLogin() {

    const navigate = useNavigate()

    const login = (type) => {
        navigate(`/${type}`);
    }

    return (

        <CardBody className='loginBG text-center justify-content-between'>

            <div>
                <img alt='logo' src={logo} width={250} />
            </div>

            <h4>Login As</h4>

            <Button
                className='m-2'
                color='danger'
                onClick={() => login('Admin')}>
                Admin
            </Button>

            <Button
                className='m-2'
                color='primary'
                onClick={() => login('Teacher')}>
                Teacher
            </Button>

            <Button
                className='m-2'
                color='warning'
                onClick={() => login('Student')}>
                Student
            </Button>

        </CardBody>

    )
}