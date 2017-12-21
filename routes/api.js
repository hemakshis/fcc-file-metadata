const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

let File = require('../models/file');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

router.post('/upload', function(req, res){
  var upload = multer({storage:storage}).single('user-file');
  upload(req, res, function(err){
    if (err) {
      console.log('multer error', err, 'multer error over');
    } else {
      let newFile = new File({
        name: req.file.originalname,
        size: req.file.size,
        date: new Date().toLocaleString(),
        file: req.file.filename
      });

      newFile.save(function(err, file){
        if (err) throw err;
        console.log(file, 'File Uploaded!');
      });
      fs.unlinkSync('./uploads/' + req.file.filename);
      res.json({name:newFile.name,size:newFile.size,date:newFile.date,file:newFile.file});
    }
  });
});

module.exports = router;
