'use client'

import 'bootstrap/dist/css/bootstrap.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {usePathname} from "next/navigation";

const NavBar = () => {
    let pathname = usePathname();
    let isLoggedIn = true;
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" className="display-4 fw-bold">Lernplaner</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mxe-auto">
                        <Nav.Link href="/" className={pathname == "/" ? "active" : ""}>Home</Nav.Link>
                        <Nav.Link href="/about" className={pathname == "/about" ? "active" : ""}>Über uns</Nav.Link>
                        {
                            isLoggedIn ? (
                                <>
                                    <Nav.Link href="/data/students"
                                              className={pathname == "/data/students" ? "active" : ""}>Schüler</Nav.Link>
                                    <Nav.Link href="/data/teachers"
                                              className={pathname == "/data/teachers" ? "active" : ""}>Lehrer</Nav.Link>
                                    <Nav.Link href="/data/classes"
                                              className={pathname == "/data/classes" ? "active" : ""}>Klassen</Nav.Link>
                                </>
                            ) : null
                        }
                    </Nav>
                    <div className="d-none d-lg-block"
                         style={{borderRight: '2px solid grey', height: '30px', marginRight: '15px'}}></div>
                    <div className="d-block d-lg-none"
                         style={{borderBottom: '2px solid grey', width: '100%', marginTop: '15px'}}></div>
                    <Nav>
                        {
                            isLoggedIn ? (
                                <>
                                    <Nav.Link href="/data/users"
                                              className={pathname == "/data/users" ? "active" : ""}>Benutzerverwaltung</Nav.Link>

                                    <Nav.Link href="/logout"
                                              className={pathname == "/logout" ? "active" : ""}>Logout</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login"
                                              className={pathname == "/login" ? "active" : ""}>Login</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar