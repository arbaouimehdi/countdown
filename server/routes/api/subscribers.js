var router = require('express').Router();
var mongoose = require('mongoose');
var Subscriber = mongoose.model('Subscriber');
var User = mongoose.model('User');
var auth = require('../auth');

// Get All Subscribers
router.get('/subscribers', function(req, res, next) {

  Subscriber.find({}, function(err, subscribers){
    if (!err) {
      res.json({
        subscribers: subscribers
      })
    }
  });

})

// Add a New Subscriber
router.post('/subscriber', function(req, res, next) {
  
  var subscriber = new Subscriber(req.body.subscriber);
  subscriber.email = req.body.email
  
  return subscriber.save(function(err, countdown) {
    if (err) {
      return res.status(404).json(err); 
    }
    else {
      return res.json({subscriber});
    }
  });

});

// delete a subscriber
router.delete('/subscriber/:subscriber', function(req, res, next) {
  let subscriber_id = req.params.subscriber;
  if (subscriber_id) {
    Subscriber.remove({ _id: subscriber_id}, (err, post) => {
      if (err) {
        return res.status(404).json(err); 
      }
      else {
        return res.sendStatus(204);
      }
    })
  }
});

module.exports = router;
