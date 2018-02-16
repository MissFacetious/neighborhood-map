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
			console.log(this.props.options.length);
			// display the list of items here
			var items = this.props.options.forEach (function (loc) {
				var item = { name: loc.name, city: loc.city };
				console.log(item);
				return (
					<Item options={item} />
				);
			}, this);
			
			// we are having a problem rendering here, and instead it goes to blank
			return (null);
		}
		else {
			// empty so nothing to display
			return (<div></div>);
		}
    }
}

export default ListItem;
