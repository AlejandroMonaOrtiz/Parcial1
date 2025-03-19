 'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = Schema({
	email: String,
	password: String,
	role: { type: String, enum: ["admin", "user"], default: "user" } //
});

module.exports = mongoose.model('users',UserSchema);

