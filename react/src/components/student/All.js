import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faDeleteLeft , faEye} from '@fortawesome/free-solid-svg-icons';
import { useStudent } from '../../hooks/student';
import { Table,Button } from 'reactstrap';
import { arrayBufferToBase64 } from '../../common/utils';
import { useAuth,useDeleteUser } from '../../hooks/authentication';
import { useNavigate } from 'react-router-dom';

export const All = () => {
    const { data: students } = useStudent();
    const { data: auth } = useAuth();
    const deleteUser = useDeleteUser();
    const navigate = useNavigate();
    const [sortedStudents, setSortedStudents] = useState([]);
  
    const sortStudentsAscending = () => {
      const sortedArray = [...students].sort((a, b) => a.email.localeCompare(b.email));
      setSortedStudents(sortedArray);
    };
  
    const sortedList = sortedStudents.length > 0 ? sortedStudents : students;
  
    const edit = (id) => {
      navigate("/home/updateProfile", { state: { id } });
    };
  
    return (
      <>
        <h2 style={{ fontSize: "30px" }}>
          <strong>List of Students</strong>
         <Button className='float-end' color="primary" onClick={sortStudentsAscending}>Sort Ascending</Button> 
        </h2> 
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th>
                <strong>Student</strong>
              </th>
              {auth?.type === "Admin" && (
                <th>
                  <strong>Actions</strong>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedList?.map((student, index) => (
              <tr key={index} className="border-top">
                <td>
                  <div className="d-flex align-items-center p-2">
                    <img
                      src={`data:image/jpeg;base64,${arrayBufferToBase64(
                        student.cover?.data?.data
                      )}`}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                    />
                    <div className="ms-3">
                      <h6 className="mb-0">{student.username}</h6>
                      <span className="text-muted">{student.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  {auth?.type === "Admin" && (
                    <>
                      <Button onClick={() => edit(student._id)} color="info">
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => deleteUser.mutate(student._id)}
                      >
                        <FontAwesomeIcon icon={faDeleteLeft} />
                      </Button>{" "}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };
  