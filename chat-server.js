var io = require('socket.io')(8080);

io.on('connection', function(socket){

	socket.on('join:room', function(data){
		var room_name = data.room_name;
		socket.join(room_name);
	});


	socket.on('leave:room', function(msg){
		msg.text = msg.user + ' deixou a sala';
		socket.leave(msg.room);
		socket.in(msg.room).emit('message', msg);
	});


	socket.on('send:message', function(msg){
		socket.in(msg.room).emit('message', msg);
	});

});
