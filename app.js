const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

let posts = []; // In-memory post storage

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Home route to display all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// GET form to create a new post
app.get('/compose', (req, res) => {
  res.render('compose');
});

// POST request to add a new post
app.post('/compose', (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: Date.now(), title, content });
  res.redirect('/');
});

// GET form to edit a post
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit', { post });
});

// POST to update a post
app.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;
  res.redirect('/');
});

// POST to delete a post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id != req.params.id);
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});    