var express = require('express');
var router = express.Router();
var Note = require('../models/note');

router.get('/', function(req, res) {
 Note.find( function(err, notes, count ) {
   if (err)
    return res.status(500).json({ error: 'Something went wrong'});
   res.send(notes);
 });
});

router.post('/', function(req, res) {
 new Note({
   title: req.body.title
 }).save( function( err, note) {
   if (err)
  return res.status(500).json({ error: 'Something went wrong'});
   res.send(note);
 });
});

router.post('/note_template', function(req, res) {
  var task = req.body;
   res.render('note', { id: note.id, title: note.title, complete: note.complete });
});

module.exports = router;
