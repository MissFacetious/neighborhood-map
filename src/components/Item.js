import React, { Component } from 'react';
import './../App.css';

class Item extends Component {

	constructor(props) {
        super(props);
	}
	
	render() {
		if (this.props.options != null) {
			var name = this.props.options.name;
			var city = this.props.options.city;
			return (
				<div className="row">
					<ul className="listitem">
						<li className="listitem">{name}</li>
						<li className="listitem">{city}</li>
					</ul>
				</div>
			);
		}
		else {
			return (<div></div>);
		}
	}
}

export default Item;
