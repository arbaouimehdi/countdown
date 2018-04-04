let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let SubscriberSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: [true, "can't be blank"], index: true},
}, {timestamps: true});

SubscriberSchema.methods.toJSONFor = function(user){
  return {
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Subscriber', SubscriberSchema);