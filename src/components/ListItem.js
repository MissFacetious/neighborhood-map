import React, { Component } from 'react';
import Item from './Item';
import './../App.css';

class ListItem extends Component {

	constructor(props) {
        super(props);
	}
	
	componentDidMount() {
		var locations = window.locations.locations;
    }
	
    render() {
		if (this.props.options != null && this.props.options.length > 0) {
			var items = [];
			// display the list of items here
			this.props.options.forEach (function(loc) {
				items.push({ name: loc.name, city: loc.city});
			});
			return (
				<Item options={items} />
			);
		}
		else { // empty so nothing to display
			return (<div>sorry, nothing</div>);
		}
    }
}

export default ListItem;
