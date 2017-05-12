import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRoute from './api/api';
// mongoose.connect('mongodb://localhost/bus_arrival')
const app = express();
app.use(bodyParser.json());
app.use((req, res) => {
	res.send('wooooooooow');
});
//# sourceMappingURL=server.js.map