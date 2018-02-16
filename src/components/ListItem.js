import React, { Component } from 'react';
import Item from './Item';
import './../App.css';

class ListItem extends Component {

    render() {
		if (this.props.options != null && this.props.options.length > 0) {

			// display the list of items here
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
