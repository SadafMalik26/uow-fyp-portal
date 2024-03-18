import React, { memo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Spinner,
} from "reactstrap";

  
import '../ImageContainer.css';
import { updateTemplates } from "../utils/common";
import {  useTemplates, useUpdateTemplates } from "../hooks/template";
import PDFViewer from "../utils/PDFViewer";
import DownloadPdf from "../utils/DownloadPDF";
import { useAuth } from "../hooks/authentication";

const MemoizedPDFViewer = memo(PDFViewer);

export function Template() {

  // const addTemplate=useAddTemplates()
  const updateTemplate = useUpdateTemplates()
  const { isLoading,data: templates } = useTemplates()
  console.log(templates)

  const {data:auth}= useAuth()

  if(updateTemplate.isLoading || isLoading){
    return (<><Spinner /></>)
  }else
{
  return (
    <Container>
      <h2 style={{ fontSize: "30px" }}>Template Documents</h2><br></br>
      <Row>
        {templates?.map((template) => (
          <Col sm="6" md="4" lg="4" >
            
            <Card>
            <CardTitle style={{ paddingLeft:"20px", paddingTop:"20px",fontSize: "20px" }}><strong>{template.title}</strong></CardTitle>
               <br></br>
              <div style={{ position: "relative" , size: "100%" }}>
                {isLoading ? '' : <MemoizedPDFViewer font="Arial"  pdfBuffer={template.document?.data.data} width="100%"
                  height="100%" />}
            
                <Button
                  color="primary"
                  size="sm"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    margin: "8px",
                    zIndex: "1",
                  }}
                >
                  <DownloadPdf fileName={template.title} buffer={template.document?.data.data} />
                </Button>
              </div>
              <CardBody>
                {auth.type === "Admin" ? 
                <input type="file" 
              
                  accept="application/pdf"
                  onChange={(e) => updateTemplates(e.target.files[0], template.title, updateTemplate)} />
                  : "" }
                  
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
                }
}