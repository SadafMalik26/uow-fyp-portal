import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import { useTeacherSlots, useTeacherSlotsCount } from "../../hooks/teacher";
import { SlotList } from "./SlotList";


export const TeacherSlots = (props) => {

  const id=props.id
  const { isSuccess,data: slots } = useTeacherSlots(id)
  const {data:slotCount}=useTeacherSlotsCount(id)
  
    return (
      <Card>
        <CardBody>
          <CardTitle>Teacher Slots</CardTitle>
          <Row>
            <Col>
              <h5>Total Slots</h5>
              <p>{slotCount?.totalCount}</p>
            </Col>
            <Col>
              <h5>Available Slots</h5>
              <p>{slotCount?.availableCount}</p>
            </Col>
            <Col>
              <h5>Booked Slots</h5>
              <p>{slotCount?.bookedCount}</p>
            </Col>
          </Row>
  
          <SlotList slots={slots} />
  
        </CardBody>
      </Card>
    );
  
 
};

