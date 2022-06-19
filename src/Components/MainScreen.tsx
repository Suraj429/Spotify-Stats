import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Ids } from "../Constants/APIData";
import { mainProps, mainState } from "./Interface";
import axios from "axios";
import "../index.css";
import ArtistCard from "./ArtistCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Tabs from "./TabsNavigation";
import TabsNavigation from "./TabsNavigation";
import NavBar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { AutoFixOffSharp } from "@mui/icons-material";

let success = true;
export default class MainScreen extends Component<mainProps, mainState> {
    constructor(props: mainProps) {
        super(props);
        this.state = {
            hrefLink: `${Ids.AUTH_ENDPOINT}?client_id=${Ids.CLIENT_ID}&redirect_uri=${Ids.REDIRECT_URL}&response_type=${Ids.RESPONSE_TYPE}&scope=user-top-read`,
            token: "",
            artistCount: {},
            showCard: false,
            userID: "",
            showLoader: false,
            showError: false,
            shortTerm: [],
            longTerm: [],
            mediumTerm: []
        };
    }

    componentDidMount = () => {
        const hash = window.location.hash;

        let getToken: any = window.localStorage.getItem("token");
        if (!getToken && hash) {
            getToken = hash
                .substring(1)
                ?.split("&")
                ?.find((elem) => elem.startsWith("access_token"))
                ?.split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", getToken);
        }
        this.setState({
            token: getToken
        });
    };

    logout = () => {
        this.setState({
            showLoader: false,
            token: "",
            showCard: false
        });
        window.localStorage.clear();
    };

    topTracks = async () => {
        this.setState({
            showLoader: true
        });

        let timeRange = ["short_term", "medium_term", "long_term"];

        timeRange.map(async (value: string) => {
            const url = "	https://api.spotify.com/v1/me/top/tracks";
            try {
                let response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${this.state.token}`
                    },
                    params: {
                        limit: 50,
                        time_range: value
                    }
                });

                response.data.items.map((items: any) => {
                    let tempObj = {
                        artistName: "",
                        songName: "",
                        image: ""
                    };

                    tempObj.artistName = items.artists[0].name;
                    tempObj.songName = items.name;
                    tempObj.image = items.album.images[0].url;

                    value === "short_term"
                        ? this.state.shortTerm.push(tempObj)
                        : value === "medium_term"
                        ? this.state.mediumTerm.push(tempObj)
                        : this.state.longTerm.push(tempObj);
                });

                this.setState({
                    showLoader: false
                });

                console.log(this.state.shortTerm, this.state.mediumTerm, this.state.longTerm);
            } catch (error) {
                console.log("ERROR", error);
                this.setState({
                    showError: true,
                    showLoader: false
                });
            }
        });
    };

    goBack = () => {
        this.setState({
            showCard: false
        });
    };

    closeEror = () => {
        this.setState({
            showError: false
        });
    };

    render() {
        return (
            <>
                <NavBar logout={this.logout} home={this.goBack} />
                {this.state.showError && (
                    <Alert
                        onClose={this.closeEror}
                        severity="error"
                        style={{
                            position: "absolute",
                            width: "100%"
                        }}
                    >
                        Session expired - Please logout and login again
                    </Alert>
                )}
                {this.state.showCard && (
                    <div className="d-flex flex-column">
                        <Button
                            variant="light"
                            className="ml-2 mt-3 mb-3 align-self-start"
                            onClick={this.goBack}
                            style={{
                                position: "sticky"
                            }}
                        >
                            <ArrowBackIcon />
                            Go back
                        </Button>
                        <div className="mb-3 mx-5 overflow-auto">
                            {/* <TabsNavigation artist={this.state.artistCount} /> */}
                            <ArtistCard artist={this.state.artistCount} />
                        </div>
                    </div>
                )}
                {!this.state.showCard && (
                    <div
                        className="d-flex align-items-center justify-content-center flex-column"
                        style={{ height: "90vh", backgroundColor: "rgb(227 227 227)" }}
                    >
                        {this.state.showLoader && <CircularProgress />}
                        <div className="borderMain text-center shadow-lg rounded border-success mb-5">
                            <div style={{ marginTop: "8.5%" }}>
                                <div className="mt-4 h5">Spotify-Stats</div>
                                <p>
                                    {this.state.showCard ? (
                                        <small className="text-muted">
                                            Please login with your Spotify account to see the
                                            statistics
                                        </small>
                                    ) : (
                                        <small className="text-muted">
                                            {" "}
                                            Select any of the option below{" "}
                                        </small>
                                    )}
                                </p>

                                {!this.state.token ? (
                                    <Button
                                        variant="success"
                                        className="mt-4"
                                        href={this.state.hrefLink}
                                    >
                                        Login with Spotify
                                    </Button>
                                ) : (
                                    <div className="d-flex flex-column justify-content-center align-items-center mt-1">
                                        <Button onClick={this.topTracks}>Top artists</Button>
                                        <Button variant="danger mt-2 btn-sm" onClick={this.logout}>
                                            Log out
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
