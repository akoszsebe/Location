"use strict"
let path = require('path'),
	validator = require('validator')


module.exports = (app,dataBase) => {

	app.get('/device/getConfigurationPage', (req,res) => {
		res.sendFile(path.resolve('./backend/pages/configpage.html'))
	})

	app.get('/api/save', (req, res) => {
		var objBody;
		objBody = req.query

		var lon = parseFloat(objBody.lon.replace(',','.'))
		var lat = parseFloat(objBody.lat.replace(',','.'))
		var det = objBody.det

		console.log("----",req.query,lon,lat,det)
		dataBase.createCoordinate(lat,lon,det,function(error){
		 	if(error){
		 		console.error('error:',error)
		 	}
		})
		res.json(true);
	})

	app.get('/api/frontEnd/getDevices', (req, res) => {
      dataBase.getDevices((returndata) => {
        res.json(returndata)
      })
    });
    
   app.post('/api/device/setDevice', (req, res) => {
   var d = req.body
     dataBase.createDevice(d.devicename,d.deviceid, (returndata) => {
       res.json(returndata)
     })
   });

	app.get('/', (req,res) => {
		res.sendFile(path.resolve('./index.html'))
	})

	/**
	 *  routes for android devices 
	 * 
	 * 	- add to path /api/*   
	 */

	app.get('/api/locations', (req, res) => { ///getliveamper
	        console.log("get location")
			dataBase.getCoordinates(function(datatouser){
				res.json(datatouser)
			})
	})
	
}
