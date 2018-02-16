import React, { Component } from 'react';
import './../App.css';

class Item extends Component {

	constructor(props) {
        super(props);
		
		this.state = {
			currentOption: null
		};
	}
	
	render() {
        return (
            <li>{this.state.currentOption}</li>
        );
	}
}

export default Item;
