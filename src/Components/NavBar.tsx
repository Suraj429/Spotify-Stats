import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import spotifyLogo from "../Constants/download.png";
import { navBarProps, navBarState } from "./Interface";

export default class NavBar extends Component<navBarProps, navBarState> {
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg" className="border-top border-bottom ">
                    <Container>
                        <a className="navbar-brand" href="#" onClick={this.props.home}>
                            <img src={spotifyLogo} width="30" height="30" alt="" />
                        </a>
                        <Navbar.Brand>Spotify-Stats</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home" onClick={this.props.home}>
                                    Home
                                </Nav.Link>
                                <NavDropdown title="Top Artists" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">
                                        Based On Playlist
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Based On Play Time
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="#link">Link</Nav.Link>
                                <NavDropdown
                                    title="Account"
                                    id="basic-nav-dropdown"
                                    style={{
                                        marginLeft: "51rem"
                                    }}
                                >
                                    <NavDropdown.Item onClick={this.props.logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}
