import React, { Component } from 'react';
import './../App.css';

class Item extends Component {

	constructor(props) {
        super(props);
	}
	
	render() {
		console.log(this.props.options[0]);
		var name = this.props.options[0].name;
		var city = this.props.options[0].city;
		console.log(name + ", " + city);
        return (
			<div className="row">
				<ul className="listitem">
					<li className="listitem">{name}</li>
					<li className="listitem">{city}</li>
				</ul>
			</div>
        );
	}
}

export default Item;
