import mongoose, { Schema } from 'mongoose';

const stopSchema = Schema({
	busNum: Number,
	stopName: String,
	arrivals: []
});

export default mongoose.model('Stop', stopSchema);