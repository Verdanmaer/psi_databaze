const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle errors
app.use('/api/posts', (err, req, res, next) => {
  if(err.code === "LIMIT_FILE_TYPES") {
    res.status(422).send({ error: "Only images allowed" });
  };
  if(err.code === "LIMIT_FILE_SIZE") {
    res.status(422).send({ error: "Max size is 5MB" });
  }
});

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public'));

  // SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));