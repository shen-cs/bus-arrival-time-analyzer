import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import './css/index.css';
import routes from './routes';
import store from './store/configureStore';
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>	
	  <MuiThemeProvider>
		  <Router routes={routes} history={browserHistory}/>
	  </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
