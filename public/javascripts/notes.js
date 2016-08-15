$(document).ready( function() {
  $('#add_note').on('submit', function(e) {
   e.preventDefault();
   var title = $(this).children('input').val();

   $.ajax({
     url: '/notes',
     type: 'POST',
     data: { title: title },
     dataType: 'JSON'
   }).done( function(data) {
     $('#add_note input').val('');
     getAllNotes();
   }).fail( function(err) {
     console.log(err);
   });
 });

 function getAllNotes() {
   $.ajax({
     url: '/notes',
     type: 'GET',
     dataType: 'JSON'
   }).done( function(data) {
    updateNoteList(data);
   }).fail( function(err) {
     console.log(err);
   });
 }


 function updateNoteList(notes) {
  var list = $('#note_list');
  list.empty();
  notes.forEach( function(note) {
  $.ajax({
    url:'/notes/note_template',
    type: 'POST',
    dataType: 'HTML',
    data: {id: note._id, title: note.title, complete: note.complete}
  }).done( function (data) {
   list.append(data);
 });
 });
}


$(document).on('change', '#note_list input', function() {
  var input = $(this);
  var url = '/notes/' + input.attr('id');

  $.ajax({
    url: url,
    type: 'PUT',
    data: { complete: input.is(':checked') }
  }).done( function(data) {
    console.log('Updated');
  }).fail( function(msg) {
    alert("Something went wrong");
    input.attr('checked', !input.is(':checked'));
  });

});

$(document).on('click', '.remove-note', function () {
  var url = '/notes/' + $(this).data('id');
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'JSON'
  }).done( function () {
    getAllNotes();
  });
});

 getAllNotes();

});
