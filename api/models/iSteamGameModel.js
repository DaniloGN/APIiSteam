'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: {
    type: String,
    required: 'Digite o nome do jogo'
  },
  description: {
    type: String,
    required: 'Digite a descrição do jogo'
  },
  category: {
    type: String,
    required: 'Digite a categoria do jogo'
  },
  reviews: [{
    idUser: Number,
    userName: String,
    rating:Number,
    message:String,
    Created_date: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('Games', GameSchema);