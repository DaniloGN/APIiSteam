'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Review = new Schema({

    idUsuario: Number,
    rating:Number,
    message:String,
    Created_date: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Review', GameSchema);