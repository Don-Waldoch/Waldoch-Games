/////////////////////////////////////////////////////////////////////

let DEBUG = true;

window.onload = async () => {
	Othello.makeBoard();
	Othello.newGame();
	Othello.displayDiscs();
	if (DEBUG) console.table(Othello.grid);
}

/////////////////////////////////////////////////////////////////////

const Othello = {
	grid: [],
	numCols: 8,
	numRows: 8,

	makeBoard() {
		let board = document.querySelector('.board');
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
				let id = `S${row}:${col}`
				let square = document.createElement('div');
				square.setAttribute('id', id)
				square.setAttribute('class', "square");
				square.addEventListener('click', clickHandler);

				id = `I${row}:${col}`
				let image = document.createElement('img');
				image.setAttribute('id', id)
				image.setAttribute('src', "./assets/Clear.png");

				square.append(image);
				board.append(square);
			}
		}
	},

	newGame() {
		this.grid = [];
		for (let row=0; row<this.numRows; row++) {
			this.grid.push([]); // Add a new row
			for (let col=0; col<this.numCols; col++) {
				this.grid[row].push(null); // Add a new column to the row
			}
		}
		// Place the first 4 discs needed for a new game
		this.grid[3][3] = "Light";
		this.grid[3][4] = "Dark";
		this.grid[4][3] = "Dark";
		this.grid[4][4] = "Light";
	},

	displayDiscs() {
		for (let row=0; row<this.numRows; row++) {
			for (let col=0; col<this.numCols; col++) {
				let id = `I${row}:${col}`;
				let image = document.getElementById(id);
				id = `S${row}:${col}`;
				let square = document.getElementById(id);
				switch (this.grid[row][col]) {
					case 'Light':
					    image.setAttribute('src', "./assets/Light.png");
						square.removeEventListener('click', clickHandler);
					    break;
					case 'Dark':
					    image.setAttribute('src', "./assets/Dark.png");
						square.removeEventListener('click', clickHandler);
					    break;
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
	    Othello.grid[row][col] = "Dark";
	    Othello.displayDiscs();
		if (DEBUG) console.table(Othello.grid);
		if (DEBUG) console.log("Clicked square " + grid)
	}
}

/////////////////////////////////////////////////////////////////////
