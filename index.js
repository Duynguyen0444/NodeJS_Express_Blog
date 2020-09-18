const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const BlogPost = require('./models/BlogPost');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.set('view engine', 'ejs');
//Đăng ký thư mục public.
app.use(express.static('public'));

// Mongoose
mongoose.connect('mongodb://localhost/blog_database', { useNewUrlParser: true });

app.get('/', (request, response) => {
	BlogPost.find({}, (error, posts) => {
		response.render('index', {
			// Variable use in index.js file
			blogposts: posts,
		});
	});
});

app.get('/about', (request, response) => {
	response.render('about');
});
app.get('/contact', (request, response) => {
	response.render('contact');
});

// Render detail post
app.get('/post/:id', (request, response) => {	
	BlogPost.findById(request.params.id, (error, detailPost) => {
		response.render('post', {
			detailPost,
		});
	});
});

// Render create page
app.get('/posts/new', (request, response) => {
	response.render('create');
});

// Route handle create request
app.post('/posts/store', (request, response) => {
	BlogPost.create(request.body, (error, blogpost) => {
		response.redirect('/');
	});
});

app.listen(port, () => {
	console.log('App listening on port 3000');
});
