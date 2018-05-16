import React from 'react';
import CurrencySelector from '../components/body/currency_select';
import Prices from '../components/body/prices';
import CurrencyConverter from '../components/body/currency_converter';
import HistoricalBTC from '../components/body/historical_BTC';
import LiveUpdate from '../components/body/live_update';

export default class Body extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			currentCurrency: 'USD',
			currencies: [
				{id: 0, currency: 'USD'},
				{id: 1, currency: 'EUR'},
				{id: 2, currency: 'UAH'}
			]
		};
		let link = `https://api.coinmarketcap.com/v2/ticker/?convert=${this.state.currentCurrency}&limit=6`;
		this.getItems(link, this.state.currentCurrency);
	}
	getItems = (link, currency) => {
		fetch(link)
        	.then(response => {
          		if (response.status == 200) {
            		return response.json();
          		}
        	})
	        .then(data => {
	            this.setState({
	            	items: data.data,
	            	currentCurrency: currency
	            });
	        });
	}
	changeCurrencyHandler = (event) => {
		let link = `https://api.coinmarketcap.com/v2/ticker/?convert=${event.target.value}&limit=6`;
		this.getItems(link, event.target.value);
	}
	render() {
		return (
			<div className='col-xl-6 offset-xl-3
			col-lg-8 offset-lg-2
			col-md-10 offset-md-1
			col-sm-12 offset-sm-0
			col-12 offset-0
			container'>
				<CurrencySelector handle={this.changeCurrencyHandler} currencies={this.state.currencies}/>
				<Prices items={this.state.items} currency={this.state.currentCurrency}/>
				<CurrencyConverter currentCurrency={this.state.currentCurrency} data={this.state.items}/>
				<HistoricalBTC />
				<LiveUpdate />
			</div>
		);
	}
}