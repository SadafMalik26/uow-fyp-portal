import { Card, CardBody, CardTitle, CardText, Row, Col, CardSubtitle, Alert } from 'reactstrap';
import { useStudentCount } from '../hooks/student';
import { useTeacherCount } from '../hooks/teacher';
import "../OngoingProjectsSummary.css"; // Import custom CSS file
import { useOngoingProjects, useProjectCount } from '../hooks/project';
import { useAuth } from '../hooks/authentication';

export function Dashboard() {
  
  const { data: teacherCount } = useTeacherCount()
  
  const { data: studentCount } = useStudentCount()
  
  const {data: projectCount } = useProjectCount()
  
  const {data:ongoingProjects} = useOngoingProjects()
  
  return (
    <div className="container">
    
    <Row>
    <Col className="col-md-6 mb-4">
    <Card className="custom-card student-card">
    <div className="count-circle position-absolute d-flex align-items-center justify-content-center">
    <h3>{studentCount}</h3>
    </div>
    <CardBody>
    <CardTitle tag="h5">Students</CardTitle>
    <CardText>Total number of students</CardText>
    </CardBody>
    </Card>
    </Col>
    <Col className="col-md-6 mb-4">
    <Card className="custom-card teacher-card">
    <div className="count-circle position-absolute d-flex align-items-center justify-content-center">
    <h3>{teacherCount}</h3>
    </div>
    <CardBody>
    <CardTitle tag="h5">Teachers</CardTitle>
    <CardText>Total number of teachers</CardText>
    </CardBody>
    </Card>
    </Col>
    </Row>
    
    <Row>
  
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Accepted Projects</CardTitle>
    <h2>{projectCount?.acceptedCount}</h2>
    </CardBody>
    </Card>
    </Col>
    
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Requirements Submitted</CardTitle>
    <h2>{projectCount?.requirementCount}</h2>
    </CardBody>
    </Card>
    </Col>
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Proposed Projects</CardTitle>
    <h2>{projectCount?.propCount}</h2>
    </CardBody>
    </Card>
    </Col>
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Defense Done</CardTitle>
    <h2>{projectCount?.defenseCount}</h2>
    </CardBody>
    </Card>
    </Col>
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Mid Evaluated</CardTitle>
    <h2>{projectCount?.midCount}</h2>
    </CardBody>
    </Card>
    </Col>
    <Col className="col-md-4 mb-4">
    <Card>
    <CardBody>
    <CardTitle>Completed</CardTitle>
    <h2>{projectCount?.completedCount}</h2>
    </CardBody>
    </Card>
    </Col>
    </Row>
    
    
    <Card className="ongoing-projects-card">
    <CardBody>
    <CardTitle tag="h5">Ongoing Projects</CardTitle>
    <div className="d-flex align-items-center mb-3">
    <div className="project-count-circle mx-2">{projectCount?.midCount+projectCount?.defenseCount+projectCount?.propCount+projectCount?.requirementCount+projectCount?.acceptedCount}</div>
    <CardSubtitle tag="h6" className="mb-0 ml-3">
    projects in progress
    </CardSubtitle>
    </div>
    <ul className="project-list">
    {ongoingProjects?.map((project, index) => (
      <li className="project-item">{project.title}</li>
      
      ))}
      </ul>
      </CardBody>
      </Card>
      
      
      
      </div>
      )
    }