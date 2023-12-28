import React from "react";
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function Home() {
    return(
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>React Website</Card.Title>
                            <Card.Text>React 와 Bootstrap을 활용한 웹사이트</Card.Text>
                                <Link to="/movie">
                                    <Button variant="primary">Movies</Button>
                                </Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}