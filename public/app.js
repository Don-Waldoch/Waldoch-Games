/////////////////////////////////////////////////////////////////////

window.onload = async () => {
	console.log("JavaScript Loaded");
	Othello.newGame();
	console.table(Othello.grid);
}

/////////////////////////////////////////////////////////////////////

const Othello = {
	grid: [],
	playerNameLight: '',
	playerNameDark: '',

	newGame() {
		this.grid = [];
		for (let x=0; x<=7; x++) {
			this.grid.push([]);
			for (let y=0; y<=7; y++) {
				this.grid[x].push(null);
			}
		}
		this.grid[3][3] = "Light";
		this.grid[3][4] = "Dark";
		this.grid[4][3] = "Dark";
		this.grid[4][4] = "Light";
	}
}
