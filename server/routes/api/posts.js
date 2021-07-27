const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
//const path = require('path');
require('dotenv').config();

const router = express.Router();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1'
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'psidatabaze',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

//#region Multer
// Set Storage Engine
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
//   }
// })

// // Init upload
// const upload = multer({
//   storage: storage
// });
//#endregion Multer

// Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

//#region MulterPost
// Add post
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
//#endregion MulterPost

// Delete post
router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});


async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect
  ('mongodb+srv://adam:mantikora@cluster0.doni8.mongodb.net/mevn?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return client.db('vue_express').collection('posts');
}

module.exports = router;