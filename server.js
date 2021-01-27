const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const http = require('http')
const container = require('./container')
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const flash = require('connect-flash')

container.resolve(function (users) {
	mongoose.Promise = global.Promise
	mongoose.connect(
		'mongodb+srv://socketiochat:socketiochat@cluster0.j8lzv.mongodb.net/socketiochat?retryWrites=true&w=majority',
		{ useNewUrlParser: true }
	)

	const app = SetupExpress()

	function SetupExpress() {
		const app = express()
		const server = http.createServer(app)
		server.listen(3000, function () {
			console.log('Listening on port 3000')
		})

		ConfigureExpress(app)

		//Setup Router
		const router = require('express-promise-router')()
		users.SetRouting(router)

		app.use(router)
	}

	function ConfigureExpress(app) {
		app.use(express.static('public'))
		app.use(cookieParser())
		app.set('view engine', 'ejs')
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: true }))

		app.use(validator())
		app.use(
			session({
				secret: 'secret-key',
				resave: true,
				saveUninitialized: true,
				store: new MongoStore({ mongooseConnection: mongoose.connection }),
			})
		)
		app.use(flash())
	}
})
