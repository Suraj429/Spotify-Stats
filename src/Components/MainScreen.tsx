import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {Ids} from "../Constants/APIData"
import { mainProps, mainState } from "./Interface";
import "../index.css"

export default class MainScreen extends Component <mainProps, mainState> {

    constructor(props: any){
        super(props);
        this.state = {
            hrefLink: `${Ids.AUTH_ENDPOINT}?client_id=${Ids.CLIENT_ID}&redirect_uri=${Ids.REDIRECT_URL}&response_type=${Ids.RESPONSE_TYPE}`
        }
    }

    render() {
        return (
        <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <div className='borderMain text-center mb-5 '> 
                <div style={{marginTop: "8.5%"}}>
                <div className='mt-4 h6'>Spotify Statistics</div>
                <p><small>Please login with your Spotify account to see the statistics</small></p>
                <Button variant="success" className='mt-4' href={this.state.hrefLink}>Login with Spotify</Button>
                </div>
                
            </div>
        </div>
    )}
}
