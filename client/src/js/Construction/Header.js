import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';

import logo from "../google.png";

//bg : background 배경색
//expand : 화면 크기가 큰 곳에서는 네비게이션이 펼쳐지고, 모바일에서는 네비게이션이 축소되게 함
//lg : large
//Navbar.Collapse : 화면이 작아졌을 때를 대비
//aria-controls='basic-navbar-nav' : 네비게이션에서 기본 메뉴를 나타냄
//as={Link} 추후 App에서 전달받을 Router를 지원 
export default function Header() {
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} style={{width:"100px"}} alt="로고이미지"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse>
                    <Nav.Link as={Link} to="/movies" className="ms-3">MovieList</Nav.Link>
                    <Nav.Link as={Link} to="/todos" className="ms-3">Todo</Nav.Link>
                    <Nav.Link as={Link} to="/boards" className="ms-3">Board</Nav.Link>
                    <NavDropdown title="Games" id="basic-nav-dropdown" className="ms-3">
                        <NavDropdown.Item as={Link} to="/game/numberguessing">
                            NumberGuessingGame
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/game/quiz">
                            Quiz
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/game/fastclick">
                            FastClicker
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to="/weather" className="ms-3">Weather</Nav.Link>
                    <Nav.Link as={Link} to="/music" className="ms-3">Music</Nav.Link>
                    <Nav.Link as={Link} to="/emoji" className="ms-3">Emojis</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}