const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const path = require('path');

//const upload = multer({ dest: "uploads/" });
const router = express.Router();

// Set Storage Engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'server/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
  }
})

// Init Upload
const upload = multer({
  storage: storage
});

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});


router.post('/', upload.single('file'), async (req, res) => {
  const posts = await loadPostsCollection();
  console.log(req.body);
  console.log(req.file);
  await posts.insertOne({
    body: req.body,
    file: req.file,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Add Posts
// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   console.log(req.body);
//   await posts.insertOne({
//     disappearTime: req.body.disappearTime,
//     disappearPlace: req.body.disappearPlace,
//     race: req.body.race,
//     color: req.body.color,
//     age: req.body.age,
//     name: req.body.name,
//     info: req.body.info,
//     // formData: req.body.formData,
//     createdAt: new Date()
//   });
//   res.status(201).send();
// })

// Delete Post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://adam:adam@cluster0.doni8.mongodb.net/mevn?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db('vue_express').collection('posts');
}


module.exports = router;
