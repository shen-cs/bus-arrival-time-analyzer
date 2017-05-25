import { calcOccurrences, getStopNames, getBusNums } from '../util';
const arrivalActionTypes = {
	GET_ARRIVAL_INIT: 'GET_ARRIVAL_INIT',
	GET_ARRIVAL_SUCCESS: 'GET_ARRIVAL_SUCCESS', 
	GET_ARRIVAL_FAIL: 'GET_ARRIVAL_FAIL',
	GET_STOPNAMES_INIT: 'GET_STOPNAMES_INIT',
	GET_STOPNAMES_SUCCESS: 'GET_STOPNAMES_SUCCESS',
	GET_STOPNAMES_FAIL: 'GET_STOPNAMES_FAIL',
	ON_BUS_NUM_CHANGE: 'ON_BUS_NUM_CHANGE',
	ON_STOPNAME_CHANGE: 'ON_STOPNAME_CHANGE',
	GET_BUS_NUMS_SUCCESS: 'GET_BUS_NUMS_SUCCESS',
	GET_BUS_NUMS_FAIL: 'GET_BUS_NUMS_FAIL',
};

// const FETCH_URL = 'http://140.112.214.92:8000/api/';
const FETCH_URL = 'http://localhost:8000/api/';
export const arrivalsActionCreator = {
	getArrivals: ( busNum, stopName ) => {
		return async (dispatch) => {
			const url = FETCH_URL + busNum + '/' + stopName;
			dispatch({ type: arrivalActionTypes.GET_ARRIVAL_INIT });
			fetch(url).then((res) => res.json()).then((json) => {
				let data = calcOccurrences(json[0].arrivals);
				dispatch({ type: arrivalActionTypes.GET_ARRIVAL_SUCCESS, payload: data })
			})
			.catch((res) => {
				console.log('Get arrivals failed.');
				console.log(res);
				dispatch({ type: arrivalActionTypes.GET_ARRIVAL_FAIL })
			})
		}
	},
	getBusNums: () => {
		return (dispatch) => {
			const url = FETCH_URL + 'buses';
			fetch(url).then((res) => res.json()).then((json) => {
				const data = getBusNums(json);
				dispatch({ type: arrivalActionTypes.GET_BUS_NUMS_SUCCESS, payload: data });
			})
			.catch((res) => {
				console.log('Get busNums failed.', res)
				dispatch({ type: arrivalActionTypes.GET_BUS_NUMS_FAIL });
			})
		}
	},
	getStopNames: (busNum) => {
		return (dispatch) => {
			const url = FETCH_URL + busNum;
			dispatch({ type: arrivalActionTypes.GET_STOPNAMES_INIT });
			fetch(url).then((res) => res.json()).then((json) => {
				let data = getStopNames(json);
				dispatch({ type: arrivalActionTypes.GET_STOPNAMES_SUCCESS, payload: data })
			})
			.catch((res) => {
				console.log('Get stop names failed.');
				console.log(res);
				dispatch({ type: arrivalActionTypes.GET_STOPNAMES_FAIL });
			})
		}
	},
	onBusNumChange: (busNum) => {
		return { type: arrivalActionTypes.ON_BUS_NUM_CHANGE, payload: busNum };
	},
	onStopNameChange: (stopName) => {
		return { type: arrivalActionTypes.ON_STOPNAME_CHANGE, payload: stopName };
	},
};

const initialState = { busNum: '15-go', stopName: '', stopNames: [], arrivals: [] };
const arrivalsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch(type) {
		case arrivalActionTypes.GET_ARRIVAL_SUCCESS: {
			return {...state, arrivals: payload };
		}
		case arrivalActionTypes.GET_STOPNAMES_SUCCESS: {
			return {...state, stopNames: payload };
		}
		case arrivalActionTypes.ON_BUS_NUM_CHANGE: {
			return {...state, busNum: payload };
		}
		case arrivalActionTypes.ON_STOPNAME_CHANGE: {
			return {...state, stopName: payload };
		}
		default: return state;
	}
};

export default arrivalsReducer;