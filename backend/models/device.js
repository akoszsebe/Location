'use strict';
let mongoose, Schema;

mongoose = require('mongoose')

Schema = mongoose.Schema;

let deviceSchema = new Schema({
    devicename: String,
    deviceid: String
});

module.exports = mongoose.model('Devices', deviceSchema);
