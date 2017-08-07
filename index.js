/**
 * http://usejsdoc.org/
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//initialize body parser (one line of middleware)
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;



//route to homepage
app.get('/',function(req,res){
	
	res.send("It worked");
});

app.get('/api/genres',function(req,res){
Genre.getGenres(function(err,genres){
	if(err){
		throw err;
		}
	res.json(genres);
	});
});

//whatever comes in through from req.body put into the genre object.
//bosyparser : middleware Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
//Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle

app.post('/api/genres',function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id',function(req, res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.get('/api/books',function(req,res){
Book.getBooks(function(err,books){
	if(err){
		throw err;
		}
	res.json(books);
	});
});


app.get('/api/books/:_id',function(req,res){
Book.getBookById(req.params._id,function(err,book){
	if(err){
		throw err;
		}
	res.json(book);
	});
});


app.put('/api/books/:_id',function(req,res){
	var id = req.params._id;
	var book = req.body;
Book.updateBook(id, book, {},function(err,book){
	if(err){
		throw err;
		}
	res.json(book);
	});
});



app.post('/api/books',function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});



app.delete('/api/genres/:_id',function(req,res){
	var id = req.params._id;
Genre.removeGenre(id,function(err,genre){
	if(err){
		throw err;
		}
	res.json(genre);
	});
});


app.delete('/api/books/:_id',function(req,res){
	var id = req.params._id;
Book.removeBook(id,function(err,book){
	if(err){
		throw err;
		}
	res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000');