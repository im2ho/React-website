import React from "react";
import {Container, Row, Col, Card} from 'react-bootstrap';
import Weather from "../weather/Weather";

export default function Home() {
    return(
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>React Website</Card.Title>
                            <Card.Text>React 와 Bootstrap을 활용한 웹사이트</Card.Text>
                                <Weather />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}