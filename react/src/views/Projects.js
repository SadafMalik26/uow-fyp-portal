import { useProjects } from "../hooks/project"
import { Badge, Table } from "reactstrap"

export const Projects = () => {
    const {data:groupProjects} = useProjects()
    return(
        <>
        <h2 style={{ fontSize: "30px" }}>List of Projects</h2><br></br>
        <Table responsive bordered style={{ textAlign: 'center' }}>
        <thead>
        <tr>
        <th><strong>Project Name</strong></th>
        <th><strong>Group</strong></th>
        <th><strong>Supervisor</strong></th>
        <th><strong>Status</strong></th>
        </tr>
        </thead>
        <tbody>
        {groupProjects?.map((groupProject, index) => (
            <tr >
            <td>{groupProject?.project?.title}</td>
            <td>
                <h5><Badge color="info" className="m-2">{groupProject?.student1?.username}</Badge>
            <Badge color="info" className="m-2">{groupProject?.student2?.username}</Badge>
            <Badge color="info" className="m-2">{groupProject?.student3?.username}</Badge></h5></td>
            <td>{groupProject?.supervisor?.username}</td>
            <td><Badge color="warning">{groupProject?.project?.status}</Badge></td>
            
            </tr>
            ))}
            </tbody>
            </Table>
            </>
            )
            
        }