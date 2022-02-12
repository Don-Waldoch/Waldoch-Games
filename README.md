# Waldoch-Games

## Othello
Web-Based implementation of the Othello board game.

Rules of the game: https://en.wikipedia.org/wiki/Reversi

### MVP
- 2-Player version.
- Engine needs to implement rules, not strategy.
- 8x8 Array of green squares
- Light & dark discs
- Detect legal/Illegal moves
- Implement flipping logic
- Detect end of game (no remaining legal moves)
- Tally & Display results
- Make flips async so users can better see results of moves.

### Stretch Goals
- 1-Player vs Computer. Add strategy to the engine.
- Animate flips

### Psuedo Code
* Prompt the users for names/colors
* Build an 8x8 playing board
* Place the initial 4 discs

#### Grid Row/Column Coordinate System

|   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| - | - | - | - | - | - | - | - | - |
| 0 |   |   |   |   |   |   |   |   |
| 1 |   |   |   |   |   |   |   |   |
| 2 |   |   |   |   |   |   |   |   |
| 3 |   |   |   | L | D |   |   |   |
| 4 |   |   |   | D | L |   |   |   |
| 5 |   |   |   |   |   |   |   |   |
| 6 |   |   |   |   |   |   |   |   |
| 7 |   |   |   |   |   |   |   |   |

#### Implementation Plan
- The grid will be stored as a 2 dimensional array
- The array values will contain the color of the disc at that grid spot
- e.g.: grid[3][3] = 'Light',  grid[3][4] = 'Dark'