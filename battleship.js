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
		{locations: ["0", "0", "0"], hits: ["","",""]},
		{locations: ["0", "0", "0"], hits: ["","",""]},
		{locations: ["0", "0", "0"], hits: ["","",""]}
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
	},


	generateShip: function(){
		// creates an array with random locations for one ship without worrying about overlap with other ships
		let direction = Math.floor(Math.random() *2)
		let row;
		let col;

		if (direction === 1){
			// generate a starting location for horizontal ship
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - (this.shipsLength + 1)))

		} else {
			// generate a starting location for vertical ship
			row =  Math.floor(Math.random() * (this.boardSize - (this.shipsLength + 1)))
			col = Math.floor(Math.random() * this.boardSize);

		}


		let newShipLocations = [];
		for (let i = 0; i < this.shipsLength; i++){
			if (direction === 1){
				// add location to array for new horizontal ship
				newShipLocations.push(row + "" + (col + i));


			} else {
				// add location to array for new vertical ship
				newShipLocations.push((row + i) + "" + col);


			}

		}

		return newShipLocations;
	},
	generateShipLocations: function(){
		let locations;
		for (let i = 0; i < this.numShips; i++){
			do {
				//for each ship we invoke the generateShip method and set it to the locations variable
				locations = this.generateShip()
			} while (this.collision(locations))
			//while to see if the locations overlap with any existing ships on the board
			this.ships[i].locations = locations
			//we assign the locations that were generated to the models array
		}
	},
	collision: function(locations){
		for (let i = 0; i < this.numShips; i++){
			let ship = this.ships[i]
			for (let j = 0; j < locations.length; j++){
				if (ship.locations.indexOf(locations[j] >= 0)){
					return true
				}
			}
		}
		return false;
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

	model.generateShipLocations();
	console.log(model.ships)
}

window.onload = init();