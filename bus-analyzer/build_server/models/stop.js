import mongoose, { Schema } from 'mongoose';

const stopSchema = Schema({
	stopName: String,
	arrivals: []
});

export default mongoose.model('Stop', stopSchema);
//# sourceMappingURL=stop.js.map