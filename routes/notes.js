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
  var note = req.body;
   res.render('note', { id: note.id, title: note.title, complete: note.complete });
});


router.put('/:id', function(req, res) {
  Note.findByIdAndUpdate(
    req.params.id,
    {$set: {complete: req.body.complete}},
    function(err, note){
      res.send(note);
    });
});

router.delete('/:id', function(req, res) {
 Note.findById(req.params.id, function(err, note) {
   note.remove();
   res.status(200).send({success: true});
  });
});



module.exports = router;
