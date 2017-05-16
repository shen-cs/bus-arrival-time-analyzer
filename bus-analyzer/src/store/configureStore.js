import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import arrivals from '../redux/arrivalsRedux';

const store = createStore(
	arrivals,
	applyMiddleware(thunk)
);
export default store;