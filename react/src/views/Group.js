import React, { useState } from 'react';
import { Container, Table} from 'reactstrap';
import { useGroups } from '../hooks/group';

export const Group = () => {

    // const [modal, setModal] = useState(false);
    
    const { data: groups } = useGroups()
    

    return (
        <Container>

            {/* <Button className='float-end' color="primary" onClick={() => setModal(!modal)}><i class="bi bi-plus"></i> Add New</Button>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Add Group Details</ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <Label for="exampleSelect">
                            Select Student 1
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            onChange={(e) => selectStudent1(e.target.value)}
                        >
                            <option>--SELECT--</option>
                            {student1?.map((student, index) => (
                                <option value={student._id}>
                                    {student.username}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>

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

                    



                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => submitGroup()}>Add Group</Button>{' '}
                    <Button color="secondary" onClick={() => setModal(!modal)}>Cancel</Button>
                </ModalFooter>
            </Modal> */}

<h2 style={{ fontSize: "30px" }}>List of Groups</h2><br></br>
            <Table responsive bordered style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>Student 1</th>
                        <th>Student 2</th>
                        <th>Student 3</th>
                        <th>Supervisor</th>
                        <th>Project Name</th>
                    </tr>
                </thead>
                <tbody>
                {groups?.map((group, index) => (

                    <tr >
                        <td>{group.student1?.username}</td>
                        <td>{group.student2?.username}</td>
                        <td>{group.student3?.username}</td>
                        <td>{group?.supervisor?.username}</td>
                        <td>{group.project?.title}</td>

                    </tr>
                ))}
                </tbody>
            </Table>

        </Container>
    );
};

