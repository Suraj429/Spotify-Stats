import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Ids } from "../Constants/APIData";
import { mainProps, mainState } from "./Interface";
import axios from "axios";
import "../index.css";
import ArtistCard from "./ArtistCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TabsNavigation from "./TabsNavigation";
import NavBar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

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
            tracksShortTerm: [],
            tracksLongTerm: [],
            tracksMediumTerm: [],
            artistsShortTerm: [],
            artistsMediumTerm: [],
            artistsLongTerm: [],
            artistCard: false
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

    topArtists = async () => {
        this.setState({
            showLoader: true
        });

        let timeRange = ["short_term", "medium_term", "long_term"];

        timeRange.map(async (value: string) => {
            const url = "https://api.spotify.com/v1/me/top/artists";
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
                        image: ""
                    };

                    tempObj.artistName = items.name;
                    tempObj.image = items.images[0].url;

                    value === "short_term"
                        ? this.state.artistsShortTerm.push(tempObj)
                        : value === "medium_term"
                        ? this.state.artistsMediumTerm.push(tempObj)
                        : this.state.artistsLongTerm.push(tempObj);
                });

                console.log(this.state.artistsShortTerm);

                this.setState({
                    showLoader: false,
                    showCard: true,
                    artistCard: true
                });
            } catch (error) {
                console.log("ERROR", error);
                this.setState({
                    showError: true,
                    showLoader: false
                });
            }
        });
    };

    topTracks = async () => {
        this.setState({
            showLoader: true,
            artistCard: false
        });

        let timeRange = ["short_term", "medium_term", "long_term"];

        timeRange.map(async (value: string) => {
            const url = "https://api.spotify.com/v1/me/top/tracks";
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
                        ? this.state.tracksShortTerm.push(tempObj)
                        : value === "medium_term"
                        ? this.state.tracksMediumTerm.push(tempObj)
                        : this.state.tracksLongTerm.push(tempObj);
                });

                this.setState({
                    showLoader: false,
                    showCard: true
                });
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

    closeError = () => {
        this.setState({
            showError: false
        });
    };

    render() {
        return (
            <>
                <NavBar logout={this.logout} home={this.goBack} topTracks={this.topTracks} />
                {this.state.showError && (
                    <Alert
                        onClose={this.closeError}
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
                            <TabsNavigation
                                tracksShortTerm={
                                    !this.state.artistCard
                                        ? this.state.tracksShortTerm
                                        : this.state.artistsShortTerm
                                }
                                tracksMediumTerm={
                                    !this.state.artistCard
                                        ? this.state.tracksMediumTerm
                                        : this.state.artistsMediumTerm
                                }
                                tracksLongTerm={
                                    !this.state.artistCard
                                        ? this.state.tracksLongTerm
                                        : this.state.artistsLongTerm
                                }
                            />
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
                                    <div>
                                        <div className="d-flex justify-content-center align-items-center mt-1">
                                            <Button onClick={this.topArtists} className="mr-1">
                                                Top Artists
                                            </Button>
                                            <Button onClick={this.topTracks} className="ml-1">
                                                Top Tracks
                                            </Button>
                                        </div>
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
