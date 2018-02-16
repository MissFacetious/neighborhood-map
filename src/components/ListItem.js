import React, { Component } from 'react';
import Item from './Item';
import './../App.css';

class ListItem extends Component {

	constructor(props) {
        super(props);
		
		this.state = {
			currentOptions: null
		};
	}
	
	componentDidMount() {
		
    }
	
	updateList() {
		var locations = window.locations.locations;
		var co = null;
		locations.forEach (function(loc) {
			console.log(loc.marker);
			if (loc.marker != null) {
				co.Push(loc);
			}
		});
		this.setState({ currentOptions: co });
		console.log("currentOptions " + co);
	}

    render() {
		
        return (
			// display the list of items here
			<div>
				<ul>
					<Item 
						options={this.state.currentOptions} 
					/>
				</ul>
			</div>
        );
    }
}

export default ListItem;
