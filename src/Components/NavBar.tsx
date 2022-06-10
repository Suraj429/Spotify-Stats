import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import spotifyLogo from "../Constants/download.png";

export default class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar
                    bg="light"
                    expand="lg"
                    style={{
                        marginRight: "4%"
                    }}
                >
                    <Container>
                        <a className="navbar-brand" href="#">
                            <img src={spotifyLogo} width="30" height="30" alt="" />
                        </a>
                        <Navbar.Brand href="#home">Spotify-Stats</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <NavDropdown title="Top Artists" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">
                                        Based On Playlist
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Based on Play Time
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#link">Link</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
