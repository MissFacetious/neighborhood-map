import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown'
import './App.css';

// constants
const KEY = 'AIzaSyDyOfgG6r4Kh8HkyqMy1Fb_awuCl6TToEs';
const URL = "https://maps.googleapis.com/maps/api/js?key="+KEY+"&callback=initMap";

// properties
var map = {
	zoom: 4,
	center: {
		lat: -25.363, 
		lng: 131.044,
	}
};

var marker = {
	position: {
		lat: -25.363, 
		lng: 131.044,
	},
	map: null,
}

var state = {
	inError: false,
	isLoading: true,
	error: null,
};

const options = [
  'one', 'two', 'three'
]

const defaultOption = options[0];

class App extends Component {

	initMap() {
		console.log("call initMap");
		var mapDOM = new window.google.maps.Map(document.getElementById('map'));
		var mapObject = new window.google.maps.Map(document.getElementById('map'), map);
	}
	
	loadMap() {
		// load map div into var
		var mapDOM = new window.google.maps.Map(document.getElementById('map'));
		
		// change zoom
		//map.zoom = 4;
		
		// change the center location
		map.center = {
			lat: 0,
			lng: 0,
		};
		
		// display the map information on map div
		var mapObject = new window.google.maps.Map(document.getElementById('map'), map);
	}
	
	filterMarkers() {
		
		//var markerObject = new google.maps.Marker({marker});	
	}
	
	componentWillMount() {
		this.setState({ inError: false, isLoading: false });
	}
	
	componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
		
		var ref = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		script.src = URL;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		this.setState({ inError: false, isLoading: false });
	}

	componentWillUnmount() {
		this.setState({ inError: false, isLoading: false });
	}
	
	
	render() {
		const isLoading = this.state;
		
//		if (inError) {
//			return <p>ERROR! {this.state.error}</p>;
//		}
		//if (isLoading) {
		//	return <p>Loading map...</p>
		//}
		//this.loadMap();

		return (
			<div>
				<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
			</div>
		);
	}
}

export default App;
