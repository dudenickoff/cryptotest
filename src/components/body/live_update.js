import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

let socketLink = 'wss://api.gemini.com/v1/marketdata/btcusd';
let socket = new WebSocket(socketLink);
let count = 0;
export default class LiveUpdate extends React.Component {
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
			currentTimeRange: 'Day',
			liveColor: '#ff3232'
		};
		socket.onopen = () => {
		  	this.setState({
		  		liveColor: '#009900'
		  	});
		};
		socket.onclose = (event) => {
		  	if (event.wasClean) {
		    	this.setState({
		  			liveColor: '#ff8000'
			  	});
		  	} else {
		    	this.setState({
		  			liveColor: '#ff8000'
		  		});
		  	}
		  	alert('Code: ' + event.code + ' reason: ' + event.reason);
		  	this.setState({
		  		liveColor: '#ff3232'
		  	});
		};

		socket.onmessage = (event) => {
			count++;
			let data = JSON.parse((event.data).toString());
			if(data.type == 'update' && data.events[0].price != undefined && count%10 == 0){
				let label = moment.unix(data.timestamp).format('hh:mm:ss');
				let Datas = [...this.state.data.datasets[0].data];
				let Labels = [...this.state.data.labels];
				if(this.state.data.labels.length > 19){
					Datas = [...this.state.data.datasets[0].data].splice(1);
					Labels = [...this.state.data.labels].splice(1);
				}
				this.setState({
					data: {
						labels: [...Labels, label],
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
								data: [...Datas, data.events[0].price]
						    }
						]
					}
				});
			}
		};

		socket.onerror = (error) => {
		  	console.error("Error " + error.message);
		  	this.setState({
		  		liveColor: '#ff3232'
		  	});
		};
	}
	render() {
		let statusStyle={color: `${this.state.liveColor}`};
		return (
			<div className='col-xl-12 col-lg-12 live row'>
				<h2>BTC <span style={statusStyle}>Live</span> update</h2>
		        <Line data={this.state.data} />
			</div>
		);
	}
}