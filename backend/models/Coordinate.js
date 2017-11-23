'use strict'

let mongoose = require('mongoose'),
	Schema = mongoose.Schema

let coordinateSchema = new Schema({
	latitude : Number,
	longitude : Number,
	details : String
})

module.exports = mongoose.model('Coordinate', coordinateSchema)
