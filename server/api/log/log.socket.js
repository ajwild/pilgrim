/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Log = require('./log.model');

exports.register = function(socket) {
  Log.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Log.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

var docToLog = function (doc) {
  var log = {
    id: doc.id,
    latitude: doc.location[1],
    longitude: doc.location[0],
    accuracy: doc.accuracy,
    time: doc.time,
    battery: doc.battery
  };
  return log;
}

function onSave(socket, doc, cb) {
  var log = docToLog(doc);
  socket.emit('log:save', log);
}

function onRemove(socket, doc, cb) {
  var log = docToLog(doc);
  socket.emit('log:remove', log);
}