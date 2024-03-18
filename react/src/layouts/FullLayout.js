import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Alert, Container } from "reactstrap";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from "../hooks/authentication";



const FullLayout = () => {

  const { isSuccess, data: auth } = useAuth()

  // const authenticated = false
  const navigate = useNavigate()

  //if user is not logged in, redirect to login page
  if (isSuccess && !auth?.is_login) {
    navigate('/');
  }

  return (
    <main>
      <Header />
      <div className="pageWrapper d-lg-flex">
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        <div className="contentArea">
          
    

          <Container className="p-4" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
