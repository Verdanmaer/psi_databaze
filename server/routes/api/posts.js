const express = require('express');
const mongodb = require('mongodb');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

const router = express.Router();

// Setup AWS S3 params
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-central-1'
});

const multerFilter = function(req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
}

// Handle file upload with multer-s3
const MAX_SIZE = 5000000;
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
  }),
  fileFilter: multerFilter,
  limits: {
    fileSize: MAX_SIZE
  }
});

// Get posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add post
router.post('/', upload.single('file'), async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    body: req.body,
    file: req.file,
    createdAt: new Date()
  });
  res.status(201).send();
});

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