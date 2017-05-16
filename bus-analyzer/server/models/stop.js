import mongoose, { Schema } from 'mongoose';

const stopSchema = Schema({
	busNum: String,
	stopName: String,
	arrivals: []
});

export default mongoose.model('Stop', stopSchema);