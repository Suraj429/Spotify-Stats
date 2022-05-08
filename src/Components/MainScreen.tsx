import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Ids } from "../Constants/APIData";
import { mainProps, mainState } from "./Interface";
import axios from "axios";
import "../index.css";

export default class MainScreen extends Component<mainProps, mainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hrefLink: `${Ids.AUTH_ENDPOINT}?client_id=${Ids.CLIENT_ID}&redirect_uri=${Ids.REDIRECT_URL}&response_type=${Ids.RESPONSE_TYPE}`,
            token: ""
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

    getArtistByName = (values: any) => {
        Object.keys(values).forEach((val: any) => {
            console.log(val);
        });
    };

    showArtists = async () => {
        const playlistId = "7syp2DaAeVmTsnh2atrBTP";
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

        const data = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${this.state.token}`
            },
            params: {
                fields: "items(track(name, artists(name)))"
            }
        });

        let value = data.data.items;

        Object.keys(value).forEach((val: string) => {
            // this.getArtistByName(value[val]);
            let aritstName = value[val].track.artists;
            aritstName.map((names: string) => {
                console.log(names);
            });
        });
    };

    render() {
        return (
            <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100vh" }}
            >
                <div className="borderMain text-center rounded border-success mb-5 ">
                    <div style={{ marginTop: "8.5%" }}>
                        <div className="mt-4 h5">Spotify Statistics</div>
                        <p>
                            <small className="text-muted">
                                Please login with your Spotify account to see the statistics
                            </small>
                        </p>

                        {!this.state.token ? (
                            <Button variant="success" className="mt-4" href={this.state.hrefLink}>
                                Login with Spotify
                            </Button>
                        ) : (
                            <div className="d-flex flex-column justify-content-center align-items-center mt-1">
                                <Button onClick={this.showArtists}>Show Artists</Button>
                                <Button variant="danger mt-2 btn-sm" onClick={this.logout}>
                                    Log out
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
