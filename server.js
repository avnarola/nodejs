const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const url = 'mongodb+srv://test:test@cluster0-u0xis.mongodb.net/test?retryWrites=true&w=majority';
const apiroutes = require('./users/user.service');
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

require('dotenv').config();
app.use(express.json());

// Cors setting
app.use(cors());

// Support corss origin request
// app.use(function (req, res, next) {
// 	// Website you wish to allow to connect
// 	res.setHeader("Access-Control-Allow-Origin", "*");

// 	// Request methods you wish to allow
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// 	);

// 	// Request headers you wish to allow
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"x-access-token,content-type,authorization"
// 	);

// 	// Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
// 	res.setHeader("Access-Control-Allow-Credentials", true);

// 	// If option request, send okay response
// 	if (req.method == "OPTIONS") {
// 		res.status(200).json();
// 	} else {
// 		next();
// 	}
// });

app.use('/', apiroutes);

app.get('/', function (req, res) {
	res.send('Welcome!');
});

// app.get('/', function (req, res) {
// 	res.sendFile(__dirname + '/');
// });

const port = process.env.PORT;
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		app.listen(port);
		console.log('database connected!');
		console.log('Server is Running on Port', port);
	})
	.catch(
		(err) => console.log(err)
	);
