const express = require('express');
const app = express();
const mongoose = require('mongoose');
const itemModel = require('./models/Item');

app.set('view engine', 'ejs');
app.use(express.json(), express.urlencoded({ extended: false }));

mongoose
  .connect('mongodb://mongodb_docker1:27017/test')
  .then(() => console.log('MongoDB has been connected successfully'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  itemModel
    .find()
    .then((items) => res.render('index', { items }))
    .catch((err) =>
      res
        .status(400)
        .json({ msg: 'No items found', error: JSON.stringify(err) })
    );
});

app.post('/item/add', (req, res) => {
  const newItem = new itemModel({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => {
      console.log('Added item: ', item);
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.use((error, req, res, next) => {
  console.error('Request error', error);
  res.status(500).json({ message: 'internal error' });
});

process.on('uncaughtException', (error) => {
  console.error('Unhandled error', error);
});

// TODO: DO NOT using app.listen() unless we're testing this directly
if (require.main === module) {
  const httpPort = 8080;
  app.listen(httpPort);
} else {
  module.exports = app;
}
