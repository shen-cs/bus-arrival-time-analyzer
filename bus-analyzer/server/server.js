import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from './api/api';
// mongoose.connect('mongodb://localhost/bus_arrival')
const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes)
app.use((req, res, next) => {
	// res.send('wooooooooow')
	console.log('request...')
	next()
});
module.exports = app;