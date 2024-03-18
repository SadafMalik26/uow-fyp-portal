import { useTeacherQualificationDetails } from "../../hooks/teacher";
import {
   Row, Col, Spinner
} from "reactstrap";

export const ProfileDetails = (props) => {

  const { isLoading, data: teacher } = useTeacherQualificationDetails(props.id);

return(
    <>
       <div className="teacher-details-container mb-4">
        {isLoading ? <Spinner /> :
          <Row>
            <Col xs={6} md={6}>
              <div className="teacher-details-info"> 
                <h2 style={{ fontSize: "30px" }}>{teacher?.username}</h2><br></br>
                <p style={{ fontSize: "20px" }}><strong>Email:</strong> {teacher?.email}</p>
                <p style={{ fontSize: "20px" }}><strong>Qualification:</strong> {teacher?.qualification}</p>
               
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div className="teacher-details-image-container">
                
              <img src={`data:image/jpeg;base64,${teacher?.cover?.data}`} />
              </div>
            </Col>
          </Row>
        }
      </div>
    </>
)
}