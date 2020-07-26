const express = require('express');
const mongoose = require('mongoose');

const app = express();
//connecting to MongoDB
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;

const Book = require('./models/bookModel');

bookRouter.route('/books').get((req, res) => {
  // const response = { hello: 'This is my get API' };
  const query = {};
  if (req.query.genre) {
    query.genre = req.query.genre;
  }
  Book.find(query, (err, books) => {
    if (err) {
      return res.send(err);
    }
    return res.json(books);
  });
});
//Get single item
bookRouter.route('/books/:bookId').get((req, res) => {
  // const response = { hello: 'This is my get API' };
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      return res.send(err);
    }
    return res.json(book);
  });
});

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Rest & Nodemon API');
});

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
