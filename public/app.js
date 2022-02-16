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

let DEBUG = true;

window.onload = async () => {
	Othello.newGame();
	if (DEBUG) console.table(Othello.grid);
}

/////////////////////////////////////////////////////////////////////

const Othello = {
	grid: [],
	numCols: 8,
	numRows: 8,

	newGame() {
		this.newBoardDOM();
		this.grid = [];
		for (let row=0; row<this.numRows; row++) {
			this.grid.push([]); // Add a new row
			for (let col=0; col<this.numCols; col++) {
				this.grid[row].push(null); // Add a new null (disc-less) column to the row
			}
		}
		// Place the first 4 discs needed for a new game
		this.grid[3][3] = "Light";
		this.grid[3][4] = "Dark";
		this.grid[4][3] = "Dark";
		this.grid[4][4] = "Light";
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

	displayDiscs() {
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
				let image  = document.getElementById(`I${row}:${col}`);
				let square = document.getElementById(`S${row}:${col}`);
			    if (this.grid[row][col] !== null) {
					image.setAttribute('src', `./assets/${this.grid[row][col]}.png`);
					square.removeEventListener('click', clickHandler);
				}
			}
		}
	},
}

/////////////////////////////////////////////////////////////////////

function clickHandler(e) {

	// Handle clicks within squares on the board
	let regex = /^[IS]/;
	if (e.target.id.match(regex)) {
	    let grid = e.target.id.replace(regex,'').split(':');
	    let row = parseInt(grid[0]);
	    let col = parseInt(grid[1]);
	    Othello.grid[row][col] = "Grey";
	    Othello.displayDiscs();
		if (DEBUG) console.table(Othello.grid);
		if (DEBUG) console.log("Clicked square " + grid)
	}
}

/////////////////////////////////////////////////////////////////////
