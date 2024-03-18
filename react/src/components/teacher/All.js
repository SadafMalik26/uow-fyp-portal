import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDeleteLeft, faEye } from '@fortawesome/free-solid-svg-icons'

import { useTeacher } from '../../hooks/teacher';
import { useAuth, useDeleteUser } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';

import { Table, Button } from 'reactstrap';

export const All = () => {

    const navigate = useNavigate()

    const { data: teachers } = useTeacher()
    const { data: auth } = useAuth()
    const deleteUser = useDeleteUser()

    const viewDetails = (id) => {
        navigate(`details/${id}`)
    }

    const edit = (id) => {
        navigate("/home/updateProfile", { state: { id } });
    }

    return (
        <>
            <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                    <tr>
                        <th><strong>Teacher</strong></th>
                        <th><strong>Qualification</strong></th>
                        <th><strong>Interests</strong></th>
                        <th><strong>Actions</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {teachers?.map((teacher, index) => (
                        <tr key={index} className="border-top">
                            <td>
                                <div className="d-flex align-items-center p-2">
                                    
                                    <img
                                        src={`data:image/jpeg;base64,${teacher?.cover?.data}`}
                                        className="rounded-circle"
                                        alt="avatar"
                                        width="45"
                                        height="45"
                                    />
                                    <div className="ms-3">
                                        <h6 className="mb-0">{teacher.username}</h6>
                                        <span className="text-muted">{teacher.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td>{teacher.qualification}</td>
                            <td>{teacher.interest}</td>
                            <td>
                                {auth?.type == 'Admin' ?
                                    <>
                                        <Button onClick={()=>edit(teacher._id)} color="info"><FontAwesomeIcon icon={faEdit} /></Button>{' '}
                                        <Button onClick={()=>deleteUser.mutate(teacher._id)} color="danger"><FontAwesomeIcon icon={faDeleteLeft} /></Button>{' '}
                                    </>
                                    : ""}

                                <Button color="warning"
                                    onClick={() => viewDetails(teacher._id)}
                                ><FontAwesomeIcon icon={faEye} /></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}