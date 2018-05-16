import React from 'react';

export default class CurrencyConverter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value: 1,
			currencies: [
				{id: 0, currency: 'USD'},
				{id: 1, currency: 'EUR'},
				{id: 2, currency: 'UAH'}
			],
			currentCurrency: 'USD',
			currentItem: {
				name: '',
				price: 0
			},
			data: {}
		};
	}
	changeCurrencyHandler = (event) => {
		let link = `https://api.coinmarketcap.com/v2/ticker/?convert=${event.target.value}&limit=6`;
		this.updateItems(link, event.target.value, this.state.currentItem.name);
		this.setState({
			currentCurrency: event.target.value
		});
	}
	changeCryptoNameHandler = (event) => {
		let link = `https://api.coinmarketcap.com/v2/ticker/?convert=${this.state.currentCurrency}&limit=6`;
		this.updateItems(link, this.state.currentCurrency, event.target.value);
	}
	updateItems = (link, currency, name) => {
		this.setState({
			currentCurrency: currency
		});
		fetch(link)
        	.then(response => {
          		if (response.status == 200) {
            		return response.json();
          		}
        	})
	        .then(data => {
				let currentItem = Object.values(data.data).find( (obj) => 
					obj.name == name
				);
	            this.setState({
	            	items: data.data,
	            	currentItem: {
						name: currentItem.name,
						price: currentItem.quotes[`${this.state.currentCurrency}`].price
					}
	            });
	        });
	}
	renderCryptoSelectOption = (elems) => {
		return Object.values(elems).map((elem) => {
			return <option key={elem.id}>{elem.name}</option>;
		});
	}
	renderCurrencySelectOption = (elems) => {
		return elems.map((elem) => {
			return <option key={elem.id} value={elem.currency}>{elem.currency}</option>;
		});
	}
	cryptoCountHandler = (event) => {
		this.setState({
			value: event.target.value
		});
	}
	componentWillReceiveProps(props) {
		let key = Object.keys(props.data)[0];
		let firstObj = props.data[key];
		if(props.currentCurrency == this.state.currentCurrency){
			this.setState({
				data: props.data,
				currentItem: {
					name: firstObj.name,
					price: firstObj.quotes[`${this.state.currentCurrency}`].price
				}
			});
		}
	}
	render() {
		return (
			<div className='col-xl-10 offset-xl-1 converter'>
				<h1>Cryptocurrency Converter Calculator</h1>
				<input type='number' min="1" placeholder='Type some digit...' onChange={this.cryptoCountHandler} value={this.state.value}/>
				<div>
					<select onChange={this.changeCryptoNameHandler}> 
						{this.renderCryptoSelectOption(this.state.data)}
					</select>
					<select onChange={this.changeCurrencyHandler}>
						{this.renderCurrencySelectOption(this.state.currencies)}
					</select>
				</div>
				<div>
					<span>{`${this.state.value} ${this.state.currentItem.name}`}</span>
					<span>=</span>
					<span>{`${(this.state.value * this.state.currentItem.price).toFixed(2)}`}</span>
				</div>
			</div>
		);
	}
}