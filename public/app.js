/////////////////////////////////////////////////////////////////////
// NOTES
//
// https://en.wikipedia.org/wiki/Reversi#Othello
// The dark player moves first.
// A valid move is one where at least one piece is reversed (flipped
// over). Players take alternate turns. If one player cannot make a
// valid move, play passes back to the other player. When neither
// player can move, the game ends. This occurs when the grid has
// filled up or when neither player can legally place a piece in any
// of the remaining squares. This means the game may end before the
// grid is completely filled. This possibility may occur because one
// player has no pieces remaining on the board in that player's color.
// In over-the-board play this is generally scored as if the board
// were full (64–0).
//
// If I wanted to add event listeners in displayDiscs() rather than
// in newBoardDOM() to handle new games without regenerating the
// board, would that duplicate the event listeners? The
// addEventListner spec says don't worry about that:
//
// https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget-addEventListener
// If multiple identical EventListeners are registered on the same
// EventTarget with the same parameters the duplicate instances are
// discarded. They do not cause the EventListener to be called twice
// and since they are discarded they do not need to be removed with
// the removeEventListener method.
//
/////////////////////////////////////////////////////////////////////

var DEBUG = true;

window.onload = async () => {
	Othello.newGame();
	if (DEBUG) {
		//console.table(Othello.discs);
		//Othello.compass.forEach(direction => console.log(direction));
	}
}

// https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating/17368101#17368101
Array.prototype.extend = function (other_array) {
    other_array.forEach(function(v) {this.push(v)}, this);
}

/////////////////////////////////////////////////////////////////////

class direction {
	constructor(name, rowIncr, colIncr) {
		this.name = name;
		this.rowIncr = rowIncr;
		this.colIncr = colIncr;
	}
}

const Othello = {
	compass: [],
	discs: [],
	flips: [],
	moves: [],
	numCols: 8,
	numRows: 8,
	opponent: 'Light',
	player: 'Dark',

	newGame() {
		// Create the DOM elements needed for the game board
		this.newBoardDOM();

		// Create a compass array of directions to look for legal moves
		this.compass = [];      // (name, rowIncr, colIncr)
		this.compass.push(new direction('N',  -1,  0));
		this.compass.push(new direction('NE', -1,  1));
		this.compass.push(new direction('E',   0,  1));
		this.compass.push(new direction('SE',  1,  1));
		this.compass.push(new direction('S',   1,  0));
		this.compass.push(new direction('SW',  1, -1));
		this.compass.push(new direction('W',   0, -1));
		this.compass.push(new direction('NW', -1, -1));

		// Create an array to track the grid location and color of all placed discs
		this.discs = [];
		for (let row=0; row<this.numRows; row++) {
			this.discs.push([]); // Add a new row
			for (let col=0; col<this.numCols; col++) {
				this.discs[row].push(null); // Add a new null (disc-less) column to the row
			}
		}

		// Place the first 4 discs needed for a new game
		this.discs[3][3] = "Light";
		this.discs[3][4] = 'Dark';
		this.discs[4][3] = 'Dark';
		this.discs[4][4] = "Light";

		// Display all of the placed discs on the game board
		this.displayDiscs();
	},

	newBoardDOM() {
		let board = document.querySelector('.board');
		board.innerHTML = '';
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
				let square = document.createElement('div');
				square.setAttribute('id', `S${row}:${col}`);
				square.setAttribute('class', "square");
				square.addEventListener('click', clickHandler);
				board.append(square);

				let image = document.createElement('img');
				image.setAttribute('id', `I${row}:${col}`);
				square.append(image);
			}
		}
	},

	availableMoves() {
		this.moves = [];
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
			    if (this.discs[row][col] === null) {
					if (legalMove(row, col)) {
						this.moves.push([row, col]);
					}
				}
			}
		}
		if (this.moves.length === 0) return false;
		return true;
	},

	displayDiscs() {
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
				let image  = document.getElementById(`I${row}:${col}`);
				let square = document.getElementById(`S${row}:${col}`);
			    if (this.discs[row][col] !== null) {
					image.setAttribute('src', `./assets/${this.discs[row][col]}.png`);
					square.removeEventListener('click', clickHandler);
				}
			}
		}
		if (DEBUG) console.table(this.discs);
	},

	changePlayer() {
		this.player   = (this.player === 'Dark') ? 'Light' : 'Dark';
		this.opponent = (this.player === 'Dark') ? 'Light' : 'Dark';
	}
}

/////////////////////////////////////////////////////////////////////

function clickHandler(e) {

	// Handle clicks within squares on the board
	let regex = /^[IS]/;
	if (e.target.id.match(regex)) {
	    let grid = e.target.id.replace(regex,'').split(':');
	    let row = parseInt(grid[0]);
	    let col = parseInt(grid[1]);
		if (legalMove(row, col)) {
			Othello.discs[row][col] = Othello.player;
			Othello.flips.forEach(function(disc) {
				Othello.discs[disc[0]][disc[1]] = Othello.player;
			});
			Othello.displayDiscs();
			Othello.changePlayer();
			if (Othello.availableMoves()) return;
			Othello.changePlayer();
			if (Othello.availableMoves()) return;
			// Game is over if we get here!!
		}
		//if (DEBUG) console.log("Clicked square " + grid);
	}
}

function legalMove(discRow, discCol) {
	let status = false;
	Othello.flips = [];
	Othello.compass.forEach(function(direction) {
		//console.log(`${direction.name} from [${discRow}][${discCol}]`);
		let row = discRow + direction.rowIncr;
		let col = discCol + direction.colIncr;
		let potentialFlips = [];
		while ((Othello.discs[row] !== undefined) && (Othello.discs[row][col] !== undefined)) {
			if (Othello.discs[row][col] === null) break;
			if (Othello.discs[row][col] === Othello.opponent) potentialFlips.push([row, col]);
			if (Othello.discs[row][col] === Othello.player) {
				if (potentialFlips.length) {
					Othello.flips.extend(potentialFlips);
					status = true;
				}
				break;
			}
			//console.log(`   Check [${row}][${col}]`);
			row += direction.rowIncr;
			col += direction.colIncr;
		}
	});

	return(status);
}

/////////////////////////////////////////////////////////////////////
