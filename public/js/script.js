//var messages = [];
var socket = io.connect();
var numOfMsg = 0;
var style = "";
socket.on('connect', function () {
	console.log('Socket connected');
});

socket.on('message', function (data) {
	console.log(data.message);
    if(data.message) {
        //messages.push(data);
    	numOfMsg++;
    	if (numOfMsg%2 != 0)
    		style = "bgDark";
    	else
    		style = "bgLight";
    	
        if (data.systemMsg) {
        	$("#messages").append("<li class=\"" + style + "\">" + data.message + "</li>");
        } else {
        	$("#messages").append("<li class=\"" + style + "\">" + data.username + " said: " + data.message + "</li>");
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

window.onhashchange = function () {
	console.log("onhashchange");
  socket.send(window.location.href);
}