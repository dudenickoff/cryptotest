import React from 'react';
import PricesItem from './prices_item';

export default class Prices extends React.Component {
	renderSelectOption = (elems) => {
		return Object.values(elems).map((elem) => {
			return <PricesItem item={elem} key={elem.id} currency={this.props.currency} />;
		});
	}
	render() {
		return (
			<div className='col-lg-12 col-md-12 col-sm-12 col-12 prices row'>
				{this.renderSelectOption(this.props.items)}
			</div>
		);
	}
}