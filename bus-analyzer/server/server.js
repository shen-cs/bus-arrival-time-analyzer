import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoutes from './api/api';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bus_arrival')
const app = express();
app.use(bodyParser.json());
app.use('/api', apiRoutes)

module.exports = app;