import {
    Card,Container
} from 'reactstrap';

import background from '../../images/img1.jpg'

import { Outlet } from 'react-router-dom';

export function Auth() {

    return (
        <Container
            className=" center"
            fluid
            style={{
                backgroundImage: `url(${background})`, backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <Card
                style={{
                    width: '30rem'
                }}>

                <Outlet />

            </Card>
        </Container>
    )
}