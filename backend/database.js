"use strict"
let mongoose = require('mongoose'),
	path = require('path'),
	Coordinate = require(path.resolve('./backend/models/Coordinate')),
	Device = require(path.resolve('./backend/models/device'))

var DataBase = module.exports = function () {
	this.mongoose = mongoose
	this.init()
}

DataBase.prototype.init = function () {
	var self = this
	self.mongoose.Promise = global.Promise;

	self.mongoose.connection.on('open', (ref) => {
		console.info('Connected to mongo server.', ref)
	})

	self.mongoose.connection.on('error', (error) => {
		console.error('Could not connect to mongo server!', error)
	})

	connectWithRetry(self) 
}

function connectWithRetry(self){
		console.info('itt')
	    //return self.mongoose.connect('mongodb://localhost/smartHome', function(err) {
		return self.mongoose.connect('mongodb://heroku_xr2pj2sw:478kj7lelu6klbrklj3fbmnink@ds139869.mlab.com:39869/heroku_xr2pj2sw', function(err) {
	        if (err) {
	            console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
	            setTimeout(connectWithRetry(self), 1000);
	        }
	    });
}

/**
 * Close method to handle the connection close explicitely 
 */
DataBase.prototype.close = function () {

	var self = this 
	
	self.mongoose.Promise = global.Promise

	self.mongoose.connection.close(function () {
		console.log('Mongoose default connection disconnected through app termination');
					
	})
}


DataBase.prototype.createCoordinate = function(lat,lon,det,_callback) {
	var self = this

	var t = new Coordinate({  
		latitude : lat,
		longitude : lon,
		details : det
	})
	
	t.save(function(err) {
		if (err) 
			return _callback(err)
	})
	return _callback(null)
}

DataBase.prototype.getCoordinates = function (_callback) {

	Coordinate.find({}, '-_id -__v', (error, ampers) => {
		if (error) { return _callback(null) }
		return _callback(ampers)
	})
}

DataBase.prototype.getDevices = function (_callback) {    
    Device.find({},  '-_id -__v', (error, devices) => {
      if (error) {
        return _callback(null)
      }
      return _callback(devices)
    });
  };

DataBase.prototype.createDevice = function (dn, did, _callback) {
    
      console.info("Save device -------- "+ dn + " " + did + " "  )
      // create a Ph json object
      const device = new Device({
        devicename: dn,
        deviceid: did
      });
      // call the Temperature class save operator
      device.save(function (err) {
        if (err)
          return _callback(err);
        return _callback(null)
      })
    
    };