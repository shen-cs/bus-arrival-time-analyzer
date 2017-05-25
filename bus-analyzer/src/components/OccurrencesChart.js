import React, { Component } from 'react';
import { BarChart } from 'react-easy-chart';
export default class extends Component {
	render() {
		const data = this.props.data.map((item) => {
			return { x: item.interval, y: item.occurrences };
		})

		return(
			<div>
			   <h3>Occurrences-Interval graph</h3>
			   <BarChart axes
			       axisLabels={{ x: 'Interval(min)', y: 'Occurrences' }}
			       xType={'linear'}
			       xTickNumber={30}
			       height={400}
			       width={800}
			       grid
			       data={data}/>
			</div>
		)
	}
}