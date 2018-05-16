import React from 'react';

export default function PricesItem(data){
	let currency = data.currency;
	let item = data.item;
	let price = (item.quotes[`${currency}`].price).toFixed(2);
	return (
		<div className='col-lg-2 col-md-2 col-sm-3 col-6 prices-item '>
			<p>
				<strong 
					className="prices-item__title justify-content-center row">
					{item.name}
				</strong>
				<span
					className="prices-item__price justify-content-center row">
					{price}
				</span>
			</p>
		</div>
	);
}