/////////////////////////////////////////////////////////////////////////
//----------------------- LOAD MODULES AND VIEWS -------------------------

const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// use express for the view
app.use(express.static(__dirname + '/public'))

// Body parser to be able to input data into view   
app.use(bodyParser.urlencoded({'extended':'true'}))       
app.use(bodyParser.json())
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


/////////////////////////////////////////////////////////////////////////
//------------------------------ DATABASE -------------------------------

let db = new Sequelize( 'moviewatch', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

let Towatch = db.define('towatch', {
	text: Sequelize.STRING,
	done: Sequelize.BOOLEAN
})

/////////////////////////////////////////////////////////////////////////
//-------------------------- HTTP REQUESTS ------------------------------

app.get('/api/towatches', ( req, res ) => {
	// display the to watch list
	Towatch.findAll()
	.then( data => {
		res.json( data )
	})
})

app.post('/api/towatches', ( req, res ) => {
	// add a movie to watch
	Towatch.create({
		text: req.body.text,
		done: false
	}).then( newData => {
		Towatch.findAll()
		.then( data => {
			res.json( data )
		})
	})
})

app.delete('/api/towatches/:id', ( req, res ) => {
	// delete a watched movie from the list
	Towatch.destroy({
		where: { id: req.params.id }
	}).then( delData => {
		Towatch.findAll()
		.then( data => {
			res.json( data )
		})
	})

})

app.get( '/', ( req, res ) => {
	res.sendFile( './public/index.html' )
})

/////////////////////////////////////////////////////////////////////////
//-------------------------- SYNC DATABASE -----------------------------

db.sync({ force: true }).then( db => {
	// some values for the development process
	Towatch.create({
		text: "Swiss Army Man",
		done: false
	})
	Towatch.create({
		text: "Home Alone",
		done: false
	})
})

/////////////////////////////////////////////////////////////////////////
//-------------------------- LISTEN TO SERVER ---------------------------

// listening on port 8000
app.listen(8000, () => {
	console.log( 'I hear you, stop shouting!' )
})