import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ArtistCard from "./ArtistCard";
import { tabsNavigationProps, tabsNavigationState } from "./Interface";

export default class TabsNavigation extends Component<tabsNavigationProps, tabsNavigationState> {
    render() {
        return (
            <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{
                    maxWidth: "60%"
                }}
            >
                <Tab eventKey="home" title="Home">
                    <ArtistCard artist={this.props.artist} />
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Hi
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Hello
                </Tab>
            </Tabs>
        );
    }
}
