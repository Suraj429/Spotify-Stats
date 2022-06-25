import React, { Component } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ArtistCard from "./ArtistCard";
import { tabsNavigationProps, tabsNavigationState } from "./Interface";

export default class TabsNavigation extends Component<tabsNavigationProps, tabsNavigationState> {
    render() {
        console.log(this.props.tracksLongTerm);
        return (
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Last 4 weeks">
                    <ArtistCard artist={this.props.tracksShortTerm} />
                </Tab>
                <Tab eventKey="profile" title="Last 6 months">
                    <ArtistCard artist={this.props.tracksMediumTerm} />
                </Tab>
                <Tab eventKey="contact" title="All time">
                    <ArtistCard artist={this.props.tracksLongTerm} />
                </Tab>
            </Tabs>
        );
    }
}
