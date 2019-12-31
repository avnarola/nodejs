const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	dob: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	hobbies: {
		type: Array,
		required: true
	},
	notes: {
		type: String,
		required: true
	},
	mobno: {
		type: Number,
		required: true
	},
	createdDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('UserTable', UserSchema);
