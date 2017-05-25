import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { browserHistory } from 'react-router';
import ChartBox from '../components/ChartBox';

export default class extends Component {
	render() {
		return(
			<div>
				<AppBar title="Bus arrival analyzer"
				 	showMenuIconButton={false} fullWidth
				 	iconElementRight={<FlatButton label="home" onClick={() => browserHistory.push('/')}/>}/>
				<ChartBox/>
			</div>
		)
	}
}