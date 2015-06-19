'use strict';

var _ = require('lodash');
var Log = require('./log.model');

// Get list of logs
exports.index = function (req, res) {
  Log.find(function (err, logs) {
    if (err) { return handleError(res, err); }

    var markers = [];
    _.each(logs, function (marker) {
      if (!marker.location || !marker.location[0] || !marker.location[1]) return;

      markers.push({
        id: marker.id,
        latitude: marker.location[1],
        longitude: marker.location[0],
        accuracy: marker.accuracy,
        time: marker.time,
        battery: marker.battery
      });
    });

    return res.json(200, markers);
  });
};

// Get a single log
exports.show = function (req, res) {
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if (!log) { return res.send(404); }
    return res.json(log);
  });
};

// Creates a new log in the DB.
exports.create = function (req, res) {
  var logEntry = {};
  var fields = 'time altitude speed direction satellites accuracy battery description'.split(' ');
  _.each(fields, function (field) {
    if (req.query.hasOwnProperty(field)) { logEntry[field] = req.query[field]; }
  });

  if (req.query.hasOwnProperty('longitude') && req.query.hasOwnProperty('latitude')) {
    logEntry.location = [
      req.query.longitude,
      req.query.latitude
    ];
  }

  Log.create(logEntry, function (err, log) {
    if (err) { return handleError(res, err); }
    return res.json(201, log);
  });
};

// Updates an existing log in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if (!log) { return res.send(404); }
    var updated = _.merge(log, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, log);
    });
  });
};

// Deletes a log from the DB.
exports.destroy = function (req, res) {
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(res, err); }
    if (!log) { return res.send(404); }
    log.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes all logs from the DB.
exports.destroyAll = function (req, res) {
  Log.remove({}, function (err) {
    if (err) { return handleError(res, err); }
    return res.send(204);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
