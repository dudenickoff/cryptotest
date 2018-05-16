import React from 'react';

export default class CurrencySelector extends React.Component {
	renderSelectOption = (elems) => {
		return elems.map((elem) => {
			return <option key={elem.id}>{elem.currency}</option>;
		});
	}
	render() {
		return (
			<div className='col-xl-12 col-lg-12 currency'>
				<select 
					onChange={this.props.handle}
					className='col-xl-6 offset-xl-3 col-lg-8 offset-lg-2'>
					{this.renderSelectOption(this.props.currencies)}
				</select>
			</div>
		);
	}
}