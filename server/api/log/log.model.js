'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LogSchema = new Schema({
  time: {
    type: Date,
    default: Date.now
  },
  location: {
    type: [Number],
    index: {
      type: '2dsphere',
      sparse: true
    },
  },
  altitude: Number,
  speed: Number,
  direction: Number,
  satellites: Number,
  accuracy: Number,
  battery: Number,
  description: String,
  route: String
});

module.exports = mongoose.model('Log', LogSchema);