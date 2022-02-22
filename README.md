# Waldoch-Games

##[Play my Othello Game](https://don-waldoch.github.io/Waldoch-Games/public/)

## Othello
Web-Based implementation of the Othello board game.

Rules of the game: https://en.wikipedia.org/wiki/Reversi

### MVP
- 2-Player version.
- Engine needed to implement rules, not strategy.

### Stretch Goals
- 1-Player vs CPU. Add AI strategy to the engine.
- Animate flips
- Make flips async so users can better see results of moves.
- Calculated grid sizes rather than hard coded

### Psuedo Code
1. Prompt the users for names/colors.
2. Build an 8x8 playing board.
3. Place the initial 4 discs (2 Light, 2 Dark).
4. Event Listeners for users to place discs. Check that moves are legal.
5. Flip surrounded opponent discs after each move.
6. Detect end of game (filled board, or no remaining legal moves).
7. Tally up the scores and display the results

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

#### Implementation Details
- The grid will be stored as a 2 dimensional array
- The array values will contain the color of the disc at that grid spot (e.g.: grid[3][3] = 'Light',  grid[3][4] = 'Dark')
- CSS Discs (light & dark)
- CSS Disc animation
