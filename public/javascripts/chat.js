$(function(){
  var socket = io.connect('http://localhost:3000'), roomId = '';
  $('#joinButtonWrap').on('click', 'button', function(){
    roomId = $(this).data('id');
    $('#chat').show().find('h1').html('room' + roomId).end().find('#log').html('');
    socket.emit('join:room', {roomId: roomId});
  });

  $('#submit').on('click',function(){
    var msg = $('#message').val();
    if(!msg){
      return;
    }
    socket.emit('send:message',{
      roomId: roomId,
      message: msg
    });
  });

  socket.on('send:message', function(data){
    console.log(data);
    $('#chat').find('#log').append('<p>'+data+'</p>');
  })
});