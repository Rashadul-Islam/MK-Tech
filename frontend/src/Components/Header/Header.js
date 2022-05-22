import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../actions/userActions";
import { useLocation } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const role = useSelector((state) =>
        state.userLogin.userInfo ? state.userLogin.userInfo.role : ""
    );

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <>
            <Navbar expand="lg" >
                <Container fluid>
                    <Navbar.Brand className='fw-bold' href="/">MasterKey</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0 fw-bold"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            {role === "" ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link onClick={logoutHandler} href="#">Logout</Nav.Link>}
                            {role !== "" && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                            <Nav.Link href="/" >About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;