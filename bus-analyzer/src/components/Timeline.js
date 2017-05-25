import React, { Component } from 'react';
import { ScatterplotChart, Legend } from 'react-easy-chart';
export default class extends Component {
	render() {
		
  	const data = this.props.data.map((item) => {
  		// return { x: item.interval > 10 ? '4-Jan-15': '6-Feb-15', y: item.interval }
  		const date = new Date(item.time);
  		const formattedTime = date.getUTCHours() + ':' + date.getMinutes();
  		console.log(formattedTime);
  		return { x: formattedTime, y: item.interval }
  	});
  	console.log(data);
  
		return(
			<div>
				<h3>Arrival Timeline</h3>
				<ScatterplotChart data={data} axes grid verticalGrid
					axisLabels={{ x: 'Arrival time', y: 'Interval(min)'}}
					xType={'time'}
					xTicks={30}
					tickTimeDisplayFormat={'%H:%M'}
					datePattern={'%H:%M'}
					width={800}
					height={400}
					/>
			</div>
		)
	}
}