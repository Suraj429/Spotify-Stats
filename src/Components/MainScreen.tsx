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

let success = true;
export default class MainScreen extends Component<mainProps, mainState> {
    constructor(props: mainProps) {
        super(props);
        this.state = {
            hrefLink: `${Ids.AUTH_ENDPOINT}?client_id=${Ids.CLIENT_ID}&redirect_uri=${Ids.REDIRECT_URL}&response_type=${Ids.RESPONSE_TYPE}`,
            token: "",
            artistCount: {},
            showCard: false,
            userID: ""
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
            token: ""
        });
        window.localStorage.clear();
    };

    getAllPlaylistID = async () => {
        const url = "https://api.spotify.com/v1/me/playlists";

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            });
            let items = response.data.items;

            let artist: any = {};

            let promises: any = [];

            for (let i = 0; i < items.length; i++) {
                await this.showArtists(items[i].id, artist);
            }

            // await Promise.all(promises);

            this.setState({
                artistCount: artist
            });

            if (success) {
                this.setState({
                    showCard: true
                });
            }

            // items.map(async (value: any) => {
            //     await this.showArtists(value.id);
            // });
        } catch (err) {
            console.log(err);
            alert("Session expired! Plese logout and login again getAllPlaylistIDs");
        }
    };

    showArtists = async (id: any, artist: any) => {
        const playlistId = id;
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                },
                params: {
                    fields: "items(track(name, artists(name, uri)))"
                }
            });

            const value = await response.data.items;

            Object.keys(value).forEach((val: string) => {
                // this.getArtistByName(value[val]);
                let aritstName = value[val].track.artists;
                aritstName.map((names: any) => {
                    let uri = names.uri.split(":")[2];
                    if (names.name in artist) {
                        // this.state.artistCount[names.name][0] += 1;
                        // this.state.artistCount[names.name][1] = uri;

                        artist[names.name][0] += 1;
                        artist[names.name][1] = uri;
                    } else {
                        // this.state.artistCount[names.name] = [];
                        // this.state.artistCount[names.name][0] = 1;
                        // this.state.artistCount[names.name][1] = uri;

                        artist[names.name] = [];
                        artist[names.name][0] = 1;
                        artist[names.name][1] = uri;
                    }
                });
            });

            let promises: any = [];
            let counter = 0;
            // console.log(artist);
            Object.keys(artist).map(async (value: any) => {
                counter++;
                if (value !== "ARIANNE" && success) {
                    // await this.getArtistsImage(this.state.artistCount[value][1], value);
                    // promises.push(this.getArtistsImage(this.state.artistCount[value][1], value));
                    // console.log("In artist map", artist[value][1], value);
                    if (artist[value][1] && !artist[value][1].startsWith("https")) {
                        await promises.push(this.getArtistsImage(artist[value][1], value, artist));
                    }
                }
            });
            await Promise.all(promises);

            console.log("Promise done", artist);

            success = true;
        } catch (err) {
            console.log("err", err);
            success = false;
            console.log(success);

            alert("Session expired! Plese logout and login again");
        }
    };

    getArtistsImage = async (uri: string, value: any, artist: any) => {
        console.log(uri);
        if (success) {
            const url = `https://api.spotify.com/v1/artists/${uri}`;

            const response: any = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }
            });

            let names = response.data.name;
            // console.log(value, names, artist);
            Object.keys(artist).forEach((value: any, index: number) => {
                if (value === names) {
                    let arr = artist[value];
                    let image = response.data?.images;
                    arr[1] = image[1]?.url;
                    // console.log("what image is getting set", value, arr[1]);
                }
            });
        }
    };

    goBack = () => {
        this.setState({
            showCard: false
        });
    };

    render() {
        return (
            <>
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
                            <TabsNavigation artist={this.state.artistCount} />
                        </div>
                    </div>
                )}
                {!this.state.showCard && (
                    <div
                        className="d-flex align-items-center justify-content-center flex-column"
                        style={{ height: "100vh" }}
                    >
                        <div className="borderMain text-center shadow-lg rounded border-success mb-5">
                            <div style={{ marginTop: "8.5%" }}>
                                <div className="mt-4 h5">Spotify Statistics</div>
                                <p>
                                    <small className="text-muted">
                                        Please login with your Spotify account to see the statistics
                                    </small>
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
                                        <Button onClick={this.getAllPlaylistID}>
                                            Show Artists
                                        </Button>
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
