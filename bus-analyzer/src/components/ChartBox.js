import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import RaisedButton from 'material-ui/RaisedButton';
import { arrivalsActionCreator } from '../redux/arrivalsRedux';
const mapStateToProps = (state) => ({
	data: state.arrivals,
})
class ChartBox extends Component {
	componentWillMount() {
		const { dispatch } = this.props;
		dispatch(arrivalsActionCreator.getArrivals('15-go', '南昌路'));
	}
	refresh = async () => {
		const { dispatch } = this.props;
		await dispatch(arrivalsActionCreator.getArrivals('15-go', '南昌路'))
		// console.log(this.props.data)
	}
	render() {
		const { data } = this.props;
		return(
			<div>
				<RaisedButton label="refresh" primary onClick={this.refresh}/>
				<ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
					<XAxis dataKey="interval" name="interval" unit=" mins"/>
					<YAxis dataKey="occurrences" name="occurences" unit=" times"/>
					<Scatter name="bus arrival" data={data} fill='#8884d8'/>
					<CartesianGrid strokeDasharray="3 3"/>
					<Tooltip/>
					<Legend/>
				</ScatterChart>
			</div>
		)
	}
}
export default connect(mapStateToProps)(ChartBox);