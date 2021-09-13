const express = require('express')
const router = express()
const multer = require('multer')
// const path = require('path')
const dotenv = require('dotenv').config()
const { Storage } = require('@google-cloud/storage')

// Create new storage instance with Firebase project credentials
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIAL
})

//creating a bucket
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL)

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
  });




router.post('/', uploader.single('productImg'), (req, res, next) => {
    try {
        if (!req.file) {
          res.status(400).json({msg: 'Error, could not upload file'});
          return;
        }

        console.log(req.file)
        // Create new blob in the bucket referencing the file
        const blob = bucket.file(req.file.originalname);
    
        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
    
        blobWriter.on('error', (err) => next(err));
    
        blobWriter.on('finish', () => {
          // Assembling public URL for accessing the file via HTTP
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media&token=14bd2498-a128-4279-b8f7-3e02e813f817`;
    
          // Return the file name and its public URL
          return res.status(200).send(publicUrl);
        });
    
        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
      } catch (error) {
        res.status(400).send(`Error, could not upload file: ${error}`);
        return;
      }
})

module.exports = router
