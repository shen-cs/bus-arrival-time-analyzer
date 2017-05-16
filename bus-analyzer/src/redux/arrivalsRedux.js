import { calcOccurrences } from '../util';
const arrivalActionTypes = {
	GET_ARRIVAL_INIT: 'GET_ARRIVAL_INIT',
	GET_ARRIVAL_SUCCESS: 'GET_ARRIVAL_SUCCESS', 
	GET_ARRIVAL_FAIL: 'GET_ARRIVAL_FAIL',
};

const FETCH_URL = 'http://140.112.214.92:8000/api/';
export const arrivalsActionCreator = {
	getArrivals: ( busNum, stopName ) => {
		return async (dispatch) => {
			const url = FETCH_URL + busNum + '/' + stopName;
			dispatch({ type: arrivalActionTypes.GET_ARRIVAL_INIT });
			fetch(url).then((res) => res.json()).then((json) => {
				let data = calcOccurrences(json[0].arrivals);
				// console.log(data);
				dispatch({ type: arrivalActionTypes.GET_ARRIVAL_SUCCESS, payload: data })
			})
			.catch((res) => {
				console.log('Get arrivals failed.');
				console.log(res);
				dispatch({ type: arrivalActionTypes.GET_ARRIVAL_FAIL })
			})
		}
	},
};

const initialState = { arrivals: [] };
const arrivalsReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch(type) {
		case arrivalActionTypes.GET_ARRIVAL_SUCCESS: {
			return {...state, arrivals: payload };
		}
		default: return state;
	}
};

export default arrivalsReducer;