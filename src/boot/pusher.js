import Pusher from 'pusher-js'

var pusher = new Pusher('ebf37415525faa96ab14', {
    cluster: 'eu'
});

// client side own
// Pusher.logToConsole = true;

var channel = pusher.subscribe('my-channel');

export {channel}

// channel.bind('my-event', function(data) {
//   app.messages.push(JSON.stringify(data));
// });