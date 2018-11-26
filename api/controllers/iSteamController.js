'use strict';


var mongoose = require('mongoose'),
  game = mongoose.model('Games');

exports.list_all_games = function(req, res) {
  game.find({}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};




exports.create_a_game = function(req, res) {
  var new_game = new game(req.body);
  new_game.save(function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.search_game = function(req, res) {
    var nameRegex = new RegExp(req.params.gameName);
    game.find({ name: {$regex: nameRegex}}, function(err, game) {
      if (err)
        res.send(err);
      res.json(game);
    });
  };

exports.read_a_game = function(req, res) {
  game.findById(req.params.gameId, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.list_comments = function(req, res) {
    game.findById(req.params.gameId, 'reviews',function(err, game) {
        if (err)
          res.send(err);
        res.json(game);
    })
      };


exports.create_comment = function(req, res) {
  game.findOneAndUpdate({_id: req.params.gameId}, {$push: req.body}, {new: true}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};

exports.edit_comment = function(req, res) {
   game.update({_id: req.params.gameId, "reviews.idUser": req.params.idUser},
   {
    "$set" :
    {
        "reviews.$" : {
          "idUser" : req.body.idUser,
          "rating" : req.body.rating,
          "message": req.body.message
        }
    }
  }
   ,function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
    });
  };

exports.delete_comment = function(req, res) {
    game.update({_id: req.params.gameId, "reviews.idUser": req.params.idUser},
    {
     "$pull" : { "reviews" : {"idUser" : req.params.idUser} }
   }
    ,function(err, game) {
     if (err)
       res.send(err);
     res.json(game);
     });
   };
    
exports.update_a_game = function(req, res) {
  game.findOneAndUpdate({_id: req.params.gameId}, req.body, {new: true}, function(err, game) {
    if (err)
      res.send(err);
    res.json(game);
  });
};


exports.delete_a_game = function(req, res) {
  game.remove({
    _id: req.params.gameId
  }, function(err, game) {
    if (err)
      res.send(err);
    res.json({ message: 'game successfully deleted' });
  });
};

