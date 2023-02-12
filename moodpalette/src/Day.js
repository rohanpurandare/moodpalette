import React from "react";
import { Row, Card, Button } from "react-bootstrap";

function Day() {
    console.log("hi");
    return (
    <div className="Day">
        <Button onClick={handleClick}>button</Button>
        {/* <Row>
        <div onClick={handleClick}>
            <Card style={{ width: '18rem', cursor : 'pointer' }} >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>
        </div>
        </Row> */}
    </div>
    );
}

function handleClick() {
    console.log("Clicked!");
}

export default Day;