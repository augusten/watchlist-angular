// all the necessary modules
const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')


// connect to db
let db = new Sequelize( 'moviewatch', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

let Towatch = db.define('towatch', {
	text: Sequelize.STRING,
	done: Sequelize.BOOLEAN
})

// use express
app.use(express.static(__dirname + '/public'))              // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}))       // parse application/x-www-form-urlencoded
app.use(bodyParser.json())                                  // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })) // parse application/vnd.api+json as json
app.use(methodOverride())

app.get('/api/towatches', ( req, res ) => {
	// display the to watch list
	Towatch.findAll()
	.then( data => {
		res.json( data )
	})
})

app.post('/api/towatches', ( req, res ) => {
	// add a movie to watch
	console.log( req.body.text )
	Towatch.create({
		text: req.body.text,
		done: false
	})
	Towatch.findAll()
	.then( data => {
		res.json( data )
	})
})

app.delete('/api/towatches/:id', ( req, res ) => {
	Towatch.destroy({
		where: { id: req.params.id }
	})
	Towatch.findAll()
	.then( data => {
		res.json( data )
	})
})

app.get( '*', ( req, res ) => {
	res.sendFile( './public/index.html' )
})

// sync db
db.sync({ force: true }).then( db => {
	Towatch.create({
		text: "Swiss Army Man",
		done: false
	})
	Towatch.create({
		text: "Home Alone",
		done: false
	})
})

// listening on port 8000
app.listen(8000, () => {
	console.log( 'I hear you!' )
})