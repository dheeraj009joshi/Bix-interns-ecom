// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/e-commerce-site', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('mongoDB connected'))
.catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
  res.send('hello!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
