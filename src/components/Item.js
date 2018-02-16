import React, { Component } from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import './../App.css';

var Item = createClass({
	displayName: 'Item',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			value: [],
		};
	},
	handleClick() {
		var value = this.props.options.key;
		this.props.onClick(value);
	},
	render() {
		if (this.props.options != null) {
			var name = this.props.options.name;
			var city = this.props.options.city;
			var value = this.props.options.key;
			return (
				<div className="row">
					<ul className="listitem">
						<li className="listitem">{name}</li>
						<li className="listitem">{city}</li>
						<li className="listitem">
							<input type="button" 
								value="Information"
								onClick={this.handleClick}
							/>
						</li>
					</ul>
				</div>
			);
		}
		else {
			return (<div></div>);
		}
	}
});
export default Item;