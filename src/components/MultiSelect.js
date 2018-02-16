import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

var MultiSelect = createClass({
	displayName: 'MultiSelect',
	propTypes: {
		label: PropTypes.string,
	},
	getInitialState () {
		return {
			removeSelected: true,
			disabled: false,
			crazy: false,
			stayOpen: false,
			value: [],
			rtl: false,
		};
	},
	handleSelectChange (value) {
		console.log('You\'ve selected:', value);
		this.setState({ value });
		console.log("send info to parent " + this.state.value);
		console.log(this.props);
		this.props.onChange(value);
	},
	
	//componentDidUpdate() {
//		console.log("send info to parent");
		//console.log(this.state);
		//this.props.onChange(this.state.value);
	//},
	
	render () {
		const { crazy, disabled, stayOpen, value } = this.state;
		const options = this.props.options;
		return (
			<Select
				closeOnSelect={!stayOpen}
				disabled={disabled}
				multi
				onChange={this.handleSelectChange}
				options={options}
				placeholder="Search..."
				removeSelected={this.state.removeSelected}
				rtl={this.state.rtl}
				simpleValue
				value={value}
			/>
		);
	}
});
export default MultiSelect;