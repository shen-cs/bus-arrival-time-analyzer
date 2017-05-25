import mongoose, { Schema } from 'mongoose';

const busSchema = Schema({
	busNum: String,
})
export default mongoose.model('Bus',  busSchema);