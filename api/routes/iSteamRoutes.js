'use strict';
module.exports = function(app) {
  var gameList = require('../controllers/iSteamController');

  // todoList Routes
  app.route('/games')
    .get(gameList.list_all_games)
    .post(gameList.create_a_game);

  app.route('/games/search/:gameName')
    .get(gameList.search_game);

  app.route('/games/rate/:gameId')
    .get(gameList.list_comments)
    .put(gameList.create_comment);

    app.route('/games/rate/:gameId/:idUser')
    .put(gameList.edit_comment)
    .delete(gameList.delete_comment);

  app.route('/games/:gameId')
    .get(gameList.read_a_game)
    .put(gameList.update_a_game)
    .delete(gameList.delete_a_game);
};
