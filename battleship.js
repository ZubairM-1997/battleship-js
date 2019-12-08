let view = {
	displayMessage: function(message){
		let messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = message;

	},
	displayHit: function(location){
		let cell = document.getElementById(location)
		cell.setAttribute("class", "hit");

	},
	displayMiss: function(location){
		let cell = document.getElementById(location)
		cell.setAttribute("class", "miss");

	},

}

view.displayMiss("00")
view.displayHit("34")
view.displayMiss("55")
