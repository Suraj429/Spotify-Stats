import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { artistCardProp, artistCardState } from "./Interface";

export default class ArtistCard extends Component<artistCardProp, artistCardState> {
    constructor(props: artistCardProp) {
        super(props);
        this.state = {
            storeArtist: Object.keys(this.props.artist)
        };
    }

    render() {
        console.log(this.props.artist);
        let totalArtist = this.props.artist.length;

        return (
            <>
                <Row xs={1} md={6} className="g-4 px-5">
                    {Array.from({ length: totalArtist }).map((_, idx) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={this.props.artist[idx].image} />
                                <Card.Body>
                                    <Card.Title>
                                        {" "}
                                        <small>{idx + 1}</small>
                                        {". "}
                                        <span>{this.props.artist[idx].songName}</span>
                                    </Card.Title>
                                    <Card.Text>- {this.props.artist[idx].artistName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        );
    }
}
