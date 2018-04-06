let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let SubscriberSchema = new mongoose.Schema({
  email: { 
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    match: [email_regx, 'is invalid'],
    maxlength: 30,
    index: true
  },
}, {timestamps: true});

// Uniqueness
SubscriberSchema.plugin(uniqueValidator, {message: 'subscriber already exist'});

// Validators

SubscriberSchema.methods.toJSONFor = function(user){
  return {
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model('Subscriber', SubscriberSchema);