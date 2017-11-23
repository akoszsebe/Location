"use strict"
let express = require('express'),
	bodyParser = require('body-parser'),
 	app = express(),
 	DataBase = require('./backend/database'),
	server = require('http').createServer(app)

app.set('port', process.env.PORT || 8080)

app.use(express.static(__dirname + ''))

app.use(bodyParser());

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


server.listen(app.get('port'), () => {
	console.info('App is running on port ', app.get('port'))
})

var dataBase = new DataBase()


app.post('/settemperature', (req, res) => {
    var temperature = req.body
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ req -> "+" - "+temperature.raspberryid+"    "+temperature.tempvalue);
     //db.createTemperatureMessage(temperature.raspberryid,temperature.sensorid,temperature.tempvalue,temperature.tempdate, (returndata) => {
     //  res.json(returndata)
     //});
});
 
app.post('/setph', (req, res) => {
    var temperature = req.body
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ req -> "+" - "+temperature.raspberryid+"    "+temperature.phvalue);
     //db.createTemperatureMessage(temperature.raspberryid,temperature.sensorid,temperature.tempvalue,temperature.tempdate, (returndata) => {
     //  res.json(returndata)
     //});
});

require('./backend/routes')(app,dataBase)
