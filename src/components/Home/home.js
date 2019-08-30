import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import './home.css';
import Spotifylogo from "./../../assets/images/spotify.svg";

class Home extends Component 
{
	constructor(props) {
		super(props);
		this.state = {
			spotifyApi: new SpotifyWebApi(),
			albums: [],
		}
	}

	componentDidMount() {

		var here = this;
		this.state.spotifyApi.setAccessToken("BQCBs_7gwvye1F17oOEagokfQRy6JdUuJ7t5OZY220GypoDXLVZ2790NBAHArpEIHpo3-dzhKozI8fSx7O0SFzkSNAWBOFr830OIAuYtAvEz4TxvVwgVZZ9orm83r8GykuS5tQrHQMamwA1P3n-Aa1C6mA");
		this.state.spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {

		  if (err) console.error(err);
		 // else here.setState({albums: data['items']});
		  	console.log(data);
		});

		this.state.spotifyApi.searchTracks('artist:DJ Snake')
		  .then(function(data) {
		    console.log('Search tracks by "Love" in the artist name', data);
		    here.setState({albums: data['tracks']['items']});
		  }, function(err) {
		    console.error(err);
		  });
	}
	
	render(){

		return(			
			<div>
				<div className='top'>
					<img alt='logo' src={Spotifylogo}/>
				</div>
				
				{this.state.albums.map((title, i) => (
					<div className='take' key={i}>
						<div className='songs' >
				        	<p>{title.name}</p>
				        	<img alt='djsnake' src={title['album']['images'][0].url}/>
				        	<p id='date'>Date de sortie: {title['album']['release_date']}</p>
				        	<i className="fab fa-spotify"></i>
				        </div>
			        </div>
			        
			    ))}
			</div>
		);
	}
}

export default Home;