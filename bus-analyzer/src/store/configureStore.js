import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import busAnalyzerReducer from '../redux/';

const store = createStore(
	busAnalyzerReducer,
	applyMiddleware(thunk)
);
export default store;