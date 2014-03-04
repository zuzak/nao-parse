var scrape = require('scrape');
var _ = require('underscore');

function getJson (user, callback) {
  if (callback) {
    scrape.request('http://alt.org/nethack/player-all-xlog.php?player=' + user, function (err, $) {
      if (err) {
        return console.error(err)
      }

      $('pre').each(function (pre) {
        var games = pre.children[0].data.split(' version=')
        games.forEach(function(item,index) {
          games[index] = "version=" + item
          games[index] = games[index].split(':')
          games[index].forEach(function(sub,ind) {
            games[index][ind] = games[index][ind].split('=');
          })
          games[index] = _.object(games[index])
        })
        callback(games)
        callback = null
      })
    })
  }
}

module.exports = getJson
