document.addEventListener("DOMContentLoaded", () => {

	// Message typing area is hidden until name provided
	document.querySelector("#messageform").style.visibility = 'hidden';

	// When name provided, hide the name form and show the message typing area
	document.querySelector("#userform").onsubmit = () => {

		var displayName = document.querySelector("#displayname").value;

		document.querySelector("#greeting").innerHTML = "Hello";
		document.querySelector("#name").innerHTML = displayName;
		document.querySelector("#userform").style.display = "none";
		document.querySelector("#messageform").style.visibility = 'visible';

		return false;
	};

	// Connect to websocket
	var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

	// When connected, configure the protocol for sending message
	socket.on('connect', () => {

		// When a message is sent, emit the event
		document.querySelector("#messageform").onsubmit = () => {

			displayName = document.querySelector("#name").innerHTML;
			const message = document.querySelector("#message").value;
			socket.emit('message sent', {'displayname': displayName, 'message': message});

			document.querySelectorAll("#message").value = "";

			return false;
		};
	});

	// When a new message is announced, add the message to unordered list
	socket.on('message received', data => {

		const li = document.createElement("li");
		li.innerHTML = "" + data.displayname + " says: " + data.message;
		document.querySelector("#messages").append(li);
	});
});