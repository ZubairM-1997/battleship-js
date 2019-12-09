let fireButton = document.getElementById("fireButton");
let guessInput = document.getElementById("guessInput")



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


let model = {
	boardSize: 10,
	numShips: 3,
	shipsLength: 3,
	shipsSunk: 0,

	ships: [
		{locations: ["06", "16", "26"], hits: ["","",""]},
		{locations: ["24", "34", "44"], hits: ["","",""]},
		{locations: ["10", "11", "12"], hits: ["","",""]}
	],

	fire: function(guess){
		console.log(guess)


		//takes a users guess as an argument
		for (let i=0; i < this.ships.length; i++){
			// loops through the ships array
			let ship = this.ships[i]
			console.log(this.ships[i])


			let locations = ship.locations

			//if user's guess is found in array
			let index = locations.indexOf(guess);
			console.log(index)


			if (index >= 0){
				found = true;
				// We have a hit!
				//setting the value at index to hit
				ship.hits[index] = "hit"
				view.displayHit(guess)
				view.displayMessage("HIT!")

				if (this.isSunk(ship)){
					//passing each ship to the isSunk method which checks if it has sunk or not
					this.shipsSunk++
				}

				break;


			} else {
				view.displayMiss(guess);
				view.displayMessage("You missed!")
				continue;

			}





		}
	},

	isSunk: function(ship){
		for(let i =0; i < this.shipsLength; i++){
			if(ship.hits[i] !== "hit"){
				//if location does not have a hit, the ship has not sunk
				return false;
			}
		}
		//otherwise ship has sunk
		return true;
	}

}


let controller = {
	guesses: 0,

	processGuess: function(guess){
		console.log(guess)
		let location = parseGuess(guess);

		console.log(location)
		if (location){
			this.guesses++;
			let hit = model.fire(location)

			if (hit && model.shipsSunk === model.numShips){
				view.displayMessage(`You sank all my battleships in ${this.guesses} guesses`)
			}

		}
	}


}


function parseGuess(guess){
	let alphabet = ["A","B","C","D","E","F","G", "H", "I", "J"]

		if (guess === null || guess.length !== 2){
			alert("Please enter a letter and a number on the board")
		} else {
			let firstChar = guess.charAt(0);
			//takes the first charachter of users guess, which is a letter
			let row = alphabet.indexOf(firstChar)
			//matches the letter to a position in the alphabet array
			let column = guess.charAt(1)
			//takes the first charachter of users guess, which is a number

			if (isNaN(row) || isNaN(column)){
				//checking to see if either row or number isn't a number
				alert("Oops, that isnt on the board")
			} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
				//checking to see if user input isn't off board
				alert("Thats off the board")
			} else {
				return row + column
			}
		}
		return null;
	}

function init(){
	fireButton.addEventListener("click", () => {
		let userGuess = guessInput.value;
		controller.processGuess(userGuess)
	})

	guessInput.addEventListener("keypress", (event) => {
		if (event.keyCode === 13){
			fireButton.click();
			return false
		}
	})
}

window.onload = init();