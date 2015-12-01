'use strict';

let parser = require('../lib/support/chrome-perflog-parser'),
  assert = require('assert'),
  fs = require('fs'),
  path = require('path');

describe('chrome-perflog-parser', function() {
  describe('#eventFromLogEntry', function() {
    it('should parse valid log entries', function() {
      let datadir = path.resolve(__dirname, 'testdata', 'chromehar');
      let perflogFile = path.resolve(datadir, 'perflog.json');

      let perflog = JSON.parse(fs.readFileSync(perflogFile, 'utf-8'));
      for (let logentry of perflog) {
        let event = parser.eventFromLogEntry(logentry);
        assert.notEqual(event, null);
      }
    });
  });

  describe('#harFromEvents', function() {
    it('should make har from valid events', function() {
      let datadir = path.resolve(__dirname, 'testdata', 'chromehar');
      let perflogFile = path.resolve(datadir, 'perflog.json');

      let perflog = JSON.parse(fs.readFileSync(perflogFile, 'utf-8'));
      let events = perflog.map(function(logentry) {
        return parser.eventFromLogEntry(logentry);
      });

      let har = parser.harFromEvents(events);
      assert.notEqual(har, null);
    });
  })
});