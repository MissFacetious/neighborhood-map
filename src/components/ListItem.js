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
			// display the list of items here
			var items = this.props.options.forEach (function (loc) {
				var item = { key: loc.key, name: loc.name, city: loc.city };
			});
			
			const listItems = this.props.options.map((loc) =>
				<Item key={loc.key} options={loc} />
			);
			
			return (
				<ul>{listItems}</ul>
			);
			// we are having a problem rendering here, and instead it goes to blank
			//return (null);
		}
		else {
			// empty so nothing to display
			return (<div></div>);
		}
    }
}

export default ListItem;
