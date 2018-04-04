var router = require('express').Router();
var mongoose = require('mongoose');
var Countdown = mongoose.model('Countdown');
var auth = require('../auth');

// Preload article objects on routes with ':article'
router.param('countdown', function(req, res, next, slug) {
  Countdown.find(1)
    .then(function (countdown) {
      if (!countdown) { return res.sendStatus(404); }

      req.countdown = countdown;

      return next();
    }).catch(next);
});

router.get('/countdown', function(req, res, next) {
  return Promise.all([
    Countdown.find(1)
      .exec(),
  ]).then(function(results){
    return res.json({
      countdowns: results[0]
    });
  });
});

// Update the Countdown
router.put('/:countdown', function(req, res, next) {
  Countdown.find(1).then(function(countdown) {

    let req_countdown = req.countdown[0];

    if(typeof req.body.launch_time !== 'undefined'){
      req_countdown.launch_time = req.body.launch_time;
    }

    if(typeof req.body.title !== 'undefined'){
      req_countdown.title = req.body.title;
    }

    if(typeof req.body.description !== 'undefined'){
      req_countdown.description = req.body.description;
    }

    if(typeof req.body.logo !== 'undefined'){
      req_countdown.logo = req.body.logo;
    }

    if(typeof req.body.facebook_url !== 'undefined'){
      req_countdown.facebook_url = req.body.facebook_url;
    }

    if(typeof req.body.twitter_url !== 'undefined'){
      req_countdown.twitter_url = req.body.twitter_url;
    }

    if(typeof req.body.behance_url !== 'undefined'){
      req_countdown.behance_url = req.body.behance_url;
    }

    req_countdown.save(function(err, countdown) {
      if (err) {
        return res.status(404).json(err); 
      }else {
        return res.json({
          countdown: req_countdown
        });
      }
    })

  });
})

module.exports = router;