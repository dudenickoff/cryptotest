import React from 'react';
import Grid from '../libs/bootstrap-grid.css';
import normalize from 'normalize-scss/sass/normalize/_import-now.scss';
import styles from '../styles.scss';
import Body from '../containers/body';

export default class App extends React.Component {
	render() {
		return (
			<Body />
		);
	}
}