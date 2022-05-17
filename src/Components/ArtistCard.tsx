import React, { Component } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { artistCardProp, artistCardState } from "./Interface";

export default class ArtistCard extends Component<artistCardProp, artistCardState> {
    constructor(props: artistCardProp) {
        super(props);
        this.state = {
            storeArtist: Object.keys(this.props.artist)
            //TODO: Sort the array based on the count^
        };
    }

    render() {
        let totalArtist = this.state.storeArtist;
        return (
            <Row xs={1} md={6} className="g-4 px-5">
                {Array.from({ length: 22 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img
                                variant="top"
                                src={this.props.artist[this.state.storeArtist[idx]][1]}
                            />
                            <Card.Body>
                                <Card.Title>{this.state.storeArtist[idx]}</Card.Title>
                                <Card.Text>
                                    In the album{" "}
                                    <strong>
                                        {this.props.artist[this.state.storeArtist[idx]][0]}{" "}
                                    </strong>{" "}
                                    time(s)
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }
}
