import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import '../css/chart.css';
import { arrivalsActionCreator } from '../redux/arrivalsRedux';
// import Label from './Label';
const mapStateToProps = (state) => ({
	data: state.arrivals.arrivals,
	busNum: state.arrivals.busNum,
	stopNames: state.arrivals.stopNames,
	stopName: state.arrivals.stopName
})
class ChartBox extends Component {

	componentWillMount() {
		// const { dispatch, stopName, busNum } = this.props;
		// dispatch(arrivalsActionCreator.getArrivals(busNum, stopName));
		this.refresh();
	}
	// componentDidMount() {
	// 	const { dispatch, stopNames } = this.props;
	// 	dispatch(arrivalsActionCreator.onStopNameChange(stopNames[0]));
	// }
	refresh = async () => {
		const { dispatch, stopName, busNum, stopNames } = this.props;
		// console.log(stopName, busNum)
		await dispatch(arrivalsActionCreator.getStopNames(busNum));
		// await dispatch(arrivalsActionCreator.onStopNameChange(stopNames[0]));
		await dispatch(arrivalsActionCreator.getArrivals(busNum, stopName));
	}
	renderMenuItem = (item, i) => {
		return <MenuItem value={item} key={i} primaryText={item}/>
	}
	onBusNumChange = (e, index, busNum) => {
		const { dispatch } = this.props;
		dispatch(arrivalsActionCreator.onBusNumChange(busNum))
	}
	onStopNameChange = (e, index, stopName) => {
		const { dispatch, busNum } = this.props;
		dispatch(arrivalsActionCreator.onStopNameChange(stopName));
		dispatch(arrivalsActionCreator.getArrivals(busNum, stopName));
	}
	render() {
		const { data, busNum, stopName, stopNames } = this.props;
		return(
			<div className="div-container">
				<div className="chart-container">
					<ScatterChart width={700} height={400} margin={{top: 30, right: 120, bottom: 20, left: 20}}>
						<XAxis dataKey="interval" name="interval" unit=" mins" label="interval(mins)"/>
						<YAxis dataKey="occurrences" name="occurrences" unit=" times" label="occurrences(times)"/>
						<Scatter name="bus arrival" data={data} fill='#8884d8'/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend/>	
					</ScatterChart>
					{/*<BarChart width={700} height={400} margin={{top: 30, right: 120, bottom: 20, left: 20}}
							  data={data.sort((a, b) => parseInt(a.interval, 10) - parseInt(b.interval, 10))}>
						<XAxis dataKey="interval" unit=" mins" label="interval(mins)"/>
						<YAxis dataKey="occurrences" unit=" times" label="occurrences(times)"/>
						<Bar name="occurrences" dataKey="occurrences" fill='#8884d8'/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend/>
					</BarChart>*/}
				</div>
				<div className="menu-container">
					{/*<DropDownMenu maxHeight={300} style={{width: 300}} value={busNum}>
						{data.map(this.renderMenuItem)}
					</DropDownMenu>*/}
					<SelectField maxHeight={300} style={{width: 300}} floatingLabelText="Select stop name"
						value={stopName} onChange={this.onStopNameChange}>
						{stopNames.map(this.renderMenuItem)}
					</SelectField>
				</div>
				
			</div>
		)
	}
}
export default connect(mapStateToProps)(ChartBox);