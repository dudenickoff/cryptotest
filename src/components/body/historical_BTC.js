import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

export default class HistoricalBTC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				labels: [],
				datasets: [
					{
						label: 'Bitcoin',
						fill: true,
						lineTension: 0.1,
						backgroundColor: 'rgba(75,192,192,0.4)',
						borderColor: 'rgba(75,192,192,1)',
						borderCapStyle: 'butt',
						borderDash: [],
						borderDashOffset: 0.0,
						borderJoinStyle: 'miter',
						pointBorderColor: 'rgba(75,192,192,1)',
						pointBackgroundColor: '#fff',
						pointBorderWidth: 1,
						pointHoverRadius: 5,
						pointHoverBackgroundColor: 'rgba(75,192,192,1)',
						pointHoverBorderColor: 'rgba(220,220,220,1)',
						pointHoverBorderWidth: 2,
						pointRadius: 1,
						pointHitRadius: 10,
						data: []
				    }
				]
			},
			currentTimeRange: 'Day'
		};
	}
	componentWillMount() {
		let link = this.getLink(this.state.currentTimeRange);
		this.updateData(link);
	}
	updateData = (link) => {
		fetch(link)
        	.then(response => {
          		if (response.status == 200) {
            		return response.json();
          		}
        	})
	        .then(data => {
	        	this.dataPrepare(data.Data);
	        });
	}
	dataPrepare = (data) => {
		switch(true) {
			case (this.state.currentTimeRange == 'Day'):
				let labelsDay = Object.values(data).map((item) => {
					return moment.unix(item.time).format('hh:mm');
				});
				let dotsDay = Object.values(data).map((item) => {
					return item.close;
				});
				this.setState({
					data: {
						labels: labelsDay,
						datasets: [
							{
								label: 'Bitcoin',
								fill: true,
								lineTension: 0.1,
								backgroundColor: 'rgba(75,192,192,0.4)',
								borderColor: 'rgba(75,192,192,1)',
								borderCapStyle: 'butt',
								borderDash: [],
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: 'rgba(75,192,192,1)',
								pointBackgroundColor: '#fff',
								pointBorderWidth: 1,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: 'rgba(75,192,192,1)',
								pointHoverBorderColor: 'rgba(220,220,220,1)',
								pointHoverBorderWidth: 2,
								pointRadius: 1,
								pointHitRadius: 10,
								data: dotsDay
							}
						]
					}
				});
				break;
			case (this.state.currentTimeRange == 'Month'):
				let labelsMonth = Object.values(data).map((item) => {
					return moment.unix(item.time).format('YYYY/MM/DD');
				});
				let dotsMonth = Object.values(data).map((item) => {
					return item.close;
				});
				this.setState({
					data: {
						labels: labelsMonth,
						datasets: [
							{
								label: 'Bitcoin',
								fill: true,
								lineTension: 0.1,
								backgroundColor: 'rgba(75,192,192,0.4)',
								borderColor: 'rgba(75,192,192,1)',
								borderCapStyle: 'butt',
								borderDash: [],
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: 'rgba(75,192,192,1)',
								pointBackgroundColor: '#fff',
								pointBorderWidth: 1,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: 'rgba(75,192,192,1)',
								pointHoverBorderColor: 'rgba(220,220,220,1)',
								pointHoverBorderWidth: 2,
								pointRadius: 1,
								pointHitRadius: 10,
								data: dotsMonth
							}
						]
					}
				});
				break;
			case (this.state.currentTimeRange == 'Year'):
				let Data = Object.values(data).filter(function(value, index, Arr) {
				    return index % 30 == 0;
				});
				let labelsYear = Object.values(Data).map((item) => {
					return moment.unix(item.time).format('MMMM');
				});
				let dotsYear = Object.values(Data).map((item) => {
					return item.close;
				});
				this.setState({
					data: {
						labels: labelsYear,
						datasets: [
							{
								label: 'Bitcoin',
								fill: true,
								lineTension: 0.1,
								backgroundColor: 'rgba(75,192,192,0.4)',
								borderColor: 'rgba(75,192,192,1)',
								borderCapStyle: 'butt',
								borderDash: [],
								borderDashOffset: 0.0,
								borderJoinStyle: 'miter',
								pointBorderColor: 'rgba(75,192,192,1)',
								pointBackgroundColor: '#fff',
								pointBorderWidth: 1,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: 'rgba(75,192,192,1)',
								pointHoverBorderColor: 'rgba(220,220,220,1)',
								pointHoverBorderWidth: 2,
								pointRadius: 1,
								pointHitRadius: 10,
								data: dotsYear
							}
						]
					}
				});
				break;
			default: 
				console.log('Invalid parametr');
				break;
		}
	}
	selectHandler = (event) => {
		this.setState({
			currentTimeRange: event.target.value
		});
		let link = this.getLink(event.target.value);
		this.updateData(link);
	}
	getLink = (time) => {
		let link = '';
		switch(true) {
			case (time == 'Day'):
				link = 'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24';
				break;
			case (time == 'Month'):
				link = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30';
				break;
			case (time == 'Year'): 
				link = 'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=365';
				break;
			default:
				link = 'https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24';
			break;
		}
		return link;
	}
	render() {
		return (
			<div className='col-xl-12 col-lg-12 historical row'>
			<select onChange={this.selectHandler}>
				<option>Day</option>
				<option>Month</option>
				<option>Year</option>
			</select>
		        <Line data={this.state.data} />
			</div>
		);
	}
}