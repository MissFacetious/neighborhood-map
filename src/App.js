import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import ListItem from './components/ListItem';
import './App.css';


// constants
const KEY = 'AIzaSyDyOfgG6r4Kh8HkyqMy1Fb_awuCl6TToEs';
const GOOGLE_URL = "https://maps.googleapis.com/maps/api/js?v=3&key="+KEY+"&callback=initMap";
const WIKI_URL = "https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&section=0";

// properties
var mapDefault = {
	zoom: 10,
	center: { // mpls
		lat: 44.9706756, 
		lng: -93.331518,
	}
};

class App extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			map: null,
			isLoading: true,
			currentOptions: null,
			// positions for landmarks
			locations: [{
				name: 'Minneapolis–Saint Paul International Airport, Terminal 1 & 2',
				wiki: 'Minneapolis–Saint_Paul_International_Airport',
				city: 'None',
				location: {
					lat: 44.8847554, 
					lng: -93.22228459999997,
				},
				marker: null,
				infoWindow: null,
			},
			{
				name: 'University of Minnesota Twin Cities',
				wiki: 'University_of_Minnesota',
				city: 'Minneapolis',
				location: {
					lat: 44.97399,
					lng: -93.22772850000001, 
				},
				marker: null,
				infoWindow: null,
			}, 
			{
				name: 'Minnesota Zoo',
				wiki: 'Minnesota_Zoo',
				city: 'Apple Valley',
				location: {
					lat: 44.767807,
					lng: -93.19667179999999, 
				},
				marker: null,
				infoWindow: null,
			}, 
			{
				name: 'Minnesota State Capitol',
				wiki: 'Minnesota_State_Capitol',
				city: 'St. Paul',
				location: {
					lat: 44.95515,
					lng: -93.10223300000001, 
				},
				marker: null,
				infoWindow: null,
			}, 
			{
				name: 'Mall of America',
				wiki: 'Mall_of_America',
				city: 'Bloomington',
				location: {
					lat: 44.856691,
					lng: -93.24130939999998,
				},
				marker: null,
				infoWindow: null,
			}, 
			{
				name: 'Minnesota State Fairgrounds',
				wiki: 'Minnesota_State_Fair',
				city: 'Falcon Heights',
				location: {
					lat: 44.981921,
					lng: -93.1731168, 
				},
				marker: null,
				infoWindow: null,
			}]
		}
		this.initMap = this.initMap.bind(this);
		this.onChange = this.onChange.bind(this);
	};
	
	initMap() {
		console.log("call initMap");
		var mapDOM = new window.google.maps.Map(document.getElementById('map'));
		var map = new window.google.maps.Map(document.getElementById('map'), mapDefault);
		
		var locations = this.state.locations;
		var index = 0;
		
		locations.forEach (function(loc) {
			var myLatLng = {lat: loc.location.lat, lng: loc.location.lng};

			var marker = new window.google.maps.Marker({
				position: myLatLng,
				map: map,
				title: loc.name
			});	
			
			// add information to windows and set in state for later usage
			var infoWindow = new window.google.maps.InfoWindow({content: loc.name});
			var xhr = new XMLHttpRequest();
			xhr.open('GET', WIKI_URL+"&page="+loc.wiki);
			// CORS needs to be turned on, else this will not work.. an error can be set and told in the console or webpage
			//console.log(WIKI_URL+"&page="+loc.wiki);
			xhr.onload = function(e){
				if (xhr.readyState === 4 && xhr.status === 200){
					try {
						var parseText = JSON.parse(xhr.responseText);
						var content = parseText.parse.text["*"];
					}
					catch (error) {
						console.log("problem with a url " + WIKI_URL+"&page="+loc.wiki);
						return;
					}
					//console.log(content);
					// this doesn't seem to update, we could just update the listitem instead
					//infoWindow.setContent = content;
					//infoWindow.open(map, marker);
					} else {
					console.error(xhr.statusText)
				}
				xhr.onerror = function(e){
					console.error(xhr.statusText);
				}
			}
			xhr.send();
			
			marker.addListener('click', function() {
				//this.showInfoWindow(loc);
				//console.log(loc);
				loc.infoWindow.open(map, marker);
			});
		
			marker.setMap(map);
			locations[index].marker = marker;
			locations[index].infoWindow = infoWindow;
			
			index++;
		});
		this.setState({ map: map, locations: locations });
	};
	
	onChange(index) {
		// remove markers on map
		var map = this.state.map;
		var co = [];
		var locations = this.state.locations;
		locations.forEach (function(loc) {
			if (loc.marker != null) {
				loc.marker.setMap(null);
				loc.marker = null;
			}
		});

		// create new marker based on drop down or list
		var loc = locations[index.value];
		var myLatLng = {lat: loc.location.lat, lng: loc.location.lng};
		
		var marker = new window.google.maps.Marker({
			position: myLatLng,
			map: map,
			title: loc.name
		});
		
		marker.addListener('click', function() {
			loc.infoWindow.open(map, marker);
		});
		
		co.push(loc);
		loc.marker = marker;
		marker.setMap(map);
		locations[index] = loc;
		this.setState({ map: map, locations: locations, currentOptions: co });
	};
	
	componentWillMount() {
		console.log("component will mount");
		//this.setState({ isLoading: true });
		window.locations = {
			locations: this.state.locations
		};
	};
	
	componentDidMount() {
    // Connect the initMap() function within this class to the global window context,
        // so Google Maps can invoke it
        window.initMap = this.initMap;
		
		var ref = window.document.getElementsByTagName("script")[0];
		var script = window.document.createElement("script");
		script.src = GOOGLE_URL;
		script.async = true;
		ref.parentNode.insertBefore(script, ref);
		console.log("component did mount");
		this.setState({ isLoading: false });
	};

	componentWillUnmount() {
		console.log("component will unmount");
	//	this.setState({ inError: false, isLoading: false });
	};
	
	render() {
		const isLoading = this.state;
		var options = [
			{ label: this.state.locations[0].name, value: '0' },
			{ label: this.state.locations[1].name, value: '1' },
			{ label: this.state.locations[2].name, value: '2' },
			{ label: this.state.locations[3].name, value: '3' },
			{ label: this.state.locations[4].name, value: '4' },
			{ label: this.state.locations[5].name, value: '5' }
		]
//		if (inError) {
//			return <p>ERROR! {this.state.error}</p>;
//		}
		//if (isLoading) {
		//	return <p>Loading map...</p>
		//}
		return (
			<div>
				<div className="dropdown">
					<Select
						//closeOnSelect={false}
						//disabled={false}
						//multi
						onChange={this.onChange}
						options={options}
						placeholder="Search..."
						//removeSelected={this.state.removeSelected}
						//rtl={this.state.rtl}
						//simpleValue
						//value=[{options[0]}]
					/>
				</div>
				<div className="listitem">
					<ul className="listitem">
						<li className="listitem">Destination</li>
						<li className="listitem">City</li>
					</ul>
					<ListItem 
						onChange={this.onChange}
						options={this.state.currentOptions}
					/>
				</div>
			</div>
		);
	}
}

export default App;
