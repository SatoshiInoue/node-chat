//var messages = [];
var socket = io.connect();
 
socket.on('connect', function () {
	console.log('Socket connected');
});

socket.on('message', function (data) {
	console.log(data.message);
    if(data.message) {
        //messages.push(data);
        if (data.systemMsg) {
        	$("#messages").append("<li>" + data.message + "</li>");
        } else {
        	$("#messages").append("<li>" + data.username + " said: " + data.message + "</li>");
        }
    } else {
        console.log("Problem occured:", data);
	}
});
 
socket.on('pageview', function (data) {
    $('#connections').html(data.connections);
});

$("#send").click(function() {
    if($("#name").val() == "") {
        alert("Please type your name!");
    } else if ($("#new-message").val() == "") {
		alert("Please type message!");
	}else {
        //var text = field.value;
        socket.emit('send', { message: $("#new-message").val(), username: $("#name").val()});
    }
});