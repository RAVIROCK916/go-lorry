import React, { Component } from 'react'

import './Artist.css';
import icon from "../assets/icon.jpg";

import axios from 'axios';

require('dotenv').config()


async function getNewAccessToken(){
	const end_point = 'https://accounts.spotify.com/api/token';
	const body = new URLSearchParams({
			'grant_type': 'client_credentials'
		});
	// console.log('hello');
	const config = {
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic MjM1ZGFjMTMzMDJkNGEyOGIxNmViMTNhNWJlNjRhYzc6M2E0YjQ3YmE5NTdjNGFkMWI0OThiNWE5OTI3MmJkNzI='
			// TODO 'Authorization': process.env.BASE64_AUTH_HEADER
		}
	};
	var token = '';
	// console.log(process.env.BASE64_AUTH_HEADER);
		return axios.post(end_point, body, config)
		.then((res) => {
			token = res.data.access_token;
			return token;
	});
};

var data="";

async function getArtistsAlbums(){
	return getNewAccessToken().then((token) => {
		// console.log(token);
		const end_point = 'https://api.spotify.com/v1/artists/22bE4uQ6baNwSHPVcDxLCe/albums?offset=0&limit=50';
		const config = {
			headers : {
				"Authorization" : "Bearer " + token,
			}
		}
		return axios.get(end_point, config).then(
			(res) => {
				data = res.data.items;
				return res.data.items;
			}
		)
	});
}

getArtistsAlbums().then((res) => {
    // console.log(res);
});




export class Artist extends Component {
    showData = () => {
        let card = document.getElementById("card");
		card.style.display = "none";
		let app = document.getElementById("app");
		// document.appendChild(cards);
		let h = document.createElement("h1");
		h.innerHTML = "Rolling Stones";
		app.appendChild(h);
        console.log(data);
		for(let i=0; i<data.length; i++) {
			let album = document.createElement("div");
			album.innerHTML = `
				<h2>${data[i].name}</h4>
				<img src=${data[i].images[2].url} width="200" />
				<p>${data[i].release_date}</p>
				<hr style="height:2px;border-width:0;color:black;background-color:black">
			`;
			app.appendChild(album);
			console.log(album);
		}
    }
    render() {
        return (
			<div id="app">
				<div id="card" onClick={this.showData}>

					<img id="icon" src={icon} alt="Rolling Stones" width="300"/>
				</div>
			</div>
        )
    }
}

export default Artist;
