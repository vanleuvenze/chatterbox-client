$(document).ready(function () {

//To Do//

//be able to add messages to specific chat rooms

//have messages auto refresh



var app = {};

var rawData;

//raw data gatherd on initialization

//initialize
$.ajax({
url: 'https://api.parse.com/1/classes/chatterbox',
type: 'GET',
contentType: 'application/json',
success: function (data) {
  //function that initializes the page
  app.init(data);
},
error: function (data) {
  // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  console.error('chatterbox: Failed to send message');
}

})




//a
app.init = function (data) {  
  var rooms = _.uniq(_(data.results).map(function (message) {
    return message.roomname;
  }));
  //add the rooms to the page
  _.each(rooms, function (room) {
    var element = $('<div class="room"></div>');
    element.text(room);
    element.attr('id', room);
    $('.channels').append(element);
  })

  _(data.results).each(function (message) {
    var element = $('<div class="message"></div>');
    var userName = message.username;
    element.text(userName + ":" + "    " + message.text);
    $('.messages').append(element)
  });
  console.log(data);
  rawData = data; 
}





app.send = function (message) {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: message,
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
  });

}

app.addUser = function (username) {





}








//send clickhandler
  $('.enter').on('click', function (data) {
    console.log($(data.toElement).text());
    var currentMessage = $('input').val(); 
    $('input').val('');

    var message = {
    username: 'Zacky',
    text: currentMessage,
    roomname: 'The Hovel'
    };

    app.send(JSON.stringify(message));

  })

//selecting a room clickhandler
  $('.channels').on('click', function (data) {
    //when you click a room, select all messages based on that name
    var selectedRoom = $(data.toElement).attr('id');

    var appendMessage = $('<div class="message"></div>');
    //remove divs from page to prep for new room exclusive divs
    $('.messages').text('');

    //iterate through data and if a message's roomname matches the roomname that was clicked, append it to the page.
    _(rawData.results).each(function (message) {
      if (message.roomname === selectedRoom) {
        appendMessage.text(message.username + ':' + "    " + message.text)
        $('.messages').append(appendMessage);
      }
    }) 
    })




















})
