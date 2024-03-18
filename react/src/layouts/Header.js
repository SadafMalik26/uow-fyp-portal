import React ,{useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Alert,
} from "reactstrap";
import Logo from "./Logo";
import user1 from "../assets/images/users/user4.jpg";
import { useAuth, useLogout } from "../hooks/authentication";


const Header = () => {
  
  const logoutUser = useLogout()
  const navigate = useNavigate()
  const {data:auth} = useAuth()
  
  const [isOpen, setIsOpen] = useState(false);
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  
  const logout = () => {
    logoutUser.mutate()
    navigate('/')
  }
  
  return (
    <> <Navbar color="light" light expand="md" className="fix-header">
    <div className="d-flex align-items-center">
    <div className="d-lg-block d-none me-5 pe-2">
    <Logo />
    </div>
    
    <Button
    color="primary"
    className=" d-lg-none"
    onClick={() => showMobilemenu()}
    >
    <i className="bi bi-list"></i>
    </Button>
    </div>
    <div className="hstack gap-2">
    <Button
    color="primary"
    size="sm"
    className="d-sm-block d-md-none"
    onClick={Handletoggle}
    >
    {isOpen ? (
      <i className="bi bi-x"></i>
      ) : (
        <i className="bi bi-three-dots-vertical"></i>
        )}
        </Button>
        </div>
        
        <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
        
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="transparent">
        <span className="fw-bold">Hello, {auth?.username}</span> {'  '}
        <img
        src={user1}
        alt="profile"
        className="rounded-circle"
        width="30"
        ></img>
        </DropdownToggle>
         <DropdownMenu>
         {auth?.type != 'Admin' ?  
       <>
        <Link to="editProfile">
        <DropdownItem>Edit Profile</DropdownItem>
        </Link>
        <DropdownItem divider /> </> : "" }
        <DropdownItem onClick={()=>logout()}>Logout</DropdownItem>
        </DropdownMenu>
        </Dropdown>
        </Collapse>
        </Navbar>
        
        
        </>
        );
      };
      
      export default Header;
      