const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

let File = require('../models/file');

router.post('/upload', function(req, res){
  var upload = multer({storage: storage}).single('user-file');
  upload(req, res, function(err){
    if (err) {
      console.log(err);
    } else {
      let newFile = new File({
        name: req.file.originalname,
        size: req.file.size,
        date: Date.now()
      });

      newFile.save(function(err){
        if (err) throw err;
        console.log('File Uploaded!');
      });
      fs.unlinkSync('./uploads/' + req.file.filename);
      res.json({name:newFile.name,size:newFile.size,date:newFile.date});
    }
  });
});

module.exports = router;
