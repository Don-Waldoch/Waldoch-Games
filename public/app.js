/////////////////////////////////////////////////////////////////////

window.onload = async () => {
	console.log("JavaScript Loaded")
}

/////////////////////////////////////////////////////////////////////

let grid =[];
for (let x=0; x<=7; x++) {
	grid.push([]);
	for (let y=0; y<=7; y++) {
		grid[x].push(null);
	}
}
grid[3][3] = "Light";
grid[3][4] = "Dark";
grid[4][3] = "Dark";
grid[4][4] = "Light";

console.table(grid);
