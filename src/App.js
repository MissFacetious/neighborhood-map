import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown'
import './App.css';

// constants
const KEY = 'AIzaSyDyOfgG6r4Kh8HkyqMy1Fb_awuCl6TToEs';
const URL = "https://maps.googleapis.com/maps/api/js?key="+KEY+"&callback=initMap";

// properties
var map = {
	zoom: 10,
	center: { // mpls
		lat: 44.9706756, 
		lng: -93.331518,
	}
};

// positions for landmarks

var locations = [
	{
		name: 'Minneapolis–Saint Paul International Airport, Terminal 1 & 2',
		city: 'None',
		location: {
			lat: 44.8847554, 
			lng: -93.22228459999997,
		},
	},
	{
		name: 'University of Minnesota Twin Cities',
		city: 'Minneapolis',
		location: {
			lat: 44.97399,
			lng: -93.22772850000001, 
		},
	}, 
	{
		name: 'Minnesota Zoo',
		city: 'Apple Valley',
		location: {
			lat: 44.767807,
			lng: -93.19667179999999, 
		},
	}, 
	{
		name: 'Minnesota State Capital',
		city: 'St. Paul',
		location: {
			lat: 44.95515,
			lng: -93.10223300000001, 
		},
	}, 
	{
		name: 'Mall of America',
		city: 'Bloomington',
		location: {
			lat: 44.856691,
			lng: -93.24130939999998,
		},
	}, 
	{
		name: 'Minnesota State Fairgrounds',
		city: 'Falcon Heights',
		location: {
			lat: 44.981921,
			lng: -93.1731168, 
		},
	}
]


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
  locations[0].name, locations[1].name, locations[2].name, locations[3].name, locations[4].name, locations[5].name
]

const defaultOption = options[0];

class App extends Component {

	initMap() {
		console.log("call initMap");
		var mapDOM = new window.google.maps.Map(document.getElementById('map'));
		var mapObject = new window.google.maps.Map(mapDOM, map);
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
		var mapDOM = new window.google.maps.Map(document.getElementById('map'));
		var mapObject = new window.google.maps.Map(mapDOM, map);
		
		locations.forEach (function(loc) {
			var myLatLng = {lat: loc.location.lat, lng: loc.location.lng};

			var marker = new window.google.maps.Marker({
				position: myLatLng,
				map: mapObject,
				title: loc.name
			});	
		});
		

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
//		this.filterMarkers();
		return (
			<div>
				<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
			</div>
		);
	}
}

export default App;
