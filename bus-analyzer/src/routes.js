import React from 'react';
import { Route } from 'react-router';
import App from './container/App';
import Chart from './container/Chart';
module.exports = (
	<Route>
		<Route component={App} path="/"/>
		<Route component={Chart} path="/chart"/>
	</Route>
)