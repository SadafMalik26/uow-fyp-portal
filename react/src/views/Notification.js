import { useNotification } from "../hooks/authentication"
import { ListGroup, ListGroupItem } from 'reactstrap';
export const Notification = ()=>{
    const {data:notifications}=useNotification()
    console.log(notifications)
    return (
        <ListGroup>
          {notifications?.map((notification, index) => (
            <ListGroupItem key={index} color={notification.type}>
              {notification.message}
            </ListGroupItem>
          ))}
        </ListGroup>
      );
}