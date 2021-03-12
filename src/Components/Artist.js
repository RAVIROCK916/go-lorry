import React, { Component } from 'react'

import './Artist.css';

import axios from 'axios';

let url = `https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums`;


export class Artist extends Component {
    getData = () => {
        
        axios.get(url).then(res => {
            console.log(res.data.items);
        }).catch(err => {
            console.log(err);
        })
    }
    
    render() {
        return (
            <div className="out">
                <div className="in">
                    <button onClick={this.getData}>Hello</button>
                </div>
            </div>
        )
    }
}

export default Artist
