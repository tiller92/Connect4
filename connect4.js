/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2

// for "dynamic" board size the if the screen is big enough the board will get wider but will be no smaller than 6X7 
let w = (window.innerWidth / 100)
let h = (window.innerHeight / 100)
if (w < 7) {
    w = 7
}
if (h < 6 || h > 6) {
    h = 6
}
const whboard = [

];
// array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const board = []


function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    const board2 = document.getElementById('board2')
    const newGameBtn = document.createElement('button')
    const game = document.getElementById('game')
    game.classList.add('container')
    newGameBtn.classList.add('restartBtn')
    newGameBtn.innerHTML = 'Restart'
    restart(newGameBtn)

    // TODO: these varialbes and for loop create the top row of the board
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    const clickerHere = document.createElement('div')
    clickerHere.classList.add('clickHere')
    const textClickHere = document.createElement('p')
    clickerHere.append(textClickHere)
    textClickHere.innerHTML = 'Click Top Row to place piece &#8594;'
    clickerHere.append(textClickHere)

    for (let x = 0; x < WIDTH; x++) {
        let headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);

    }
    board2.append(top);
    // TODO: this nested loop creates the the actualy board underneath the top board and sets them to what the height and width are set to
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        board.push([])
        whboard.push([])
        for (let x = 0; x < WIDTH; x++) {
            const cell = document.createElement("td");
            cell.setAttribute("id", `${y}-${x}`);
            row.append(cell)
                // below us what creates a board of all the cells now you are trying make whBoard push which player
            whboard[y].push([y, x])
            board[y].push(undefined)
        }
        board2.append(row)
    }
    game.append(newGameBtn)
    game.append(clickerHere)
}

function restart(btn) {
    btn.addEventListener('click', () => {
        location.reload()

    })
}

/** makeHtmlBoard: make HTML table and row of column tops. */
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    // board is an array all of the cells when you place a div remove it from board then when you click it will check board and if it is does not contain that cell it wont place a div
    //turn board into a string of numbers
    let tempY = 5

    for (let i = 0; i < whboard.length; i++) {
        if (whboard[i][x] === null) {
            tempY--
        }
    }
    // what returns becomes y
    return tempY
}
/** placeInTable: update DOM to place piece into HTML table of board */
let turnCount = 0

function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    // if statement makes it so that color changes everytime ther is a div placed i.e count
    if (turnCount % 2 === 0 && whboard[y][x] !== null) {
        const circleDiv = document.createElement('div')
        let tableRowCordinate = document.getElementById(`${y}-${x}`)
        circleDiv.setAttribute('class', 'piece2')
        tableRowCordinate.append(circleDiv)
        whboard[y][x] = null
        board[y][x] = currPlayer
    }
    if (turnCount % 2 !== 0 && whboard[y][x] !== null) {
        const circleDiv2 = document.createElement('div')
        let tableRowCordinate = document.getElementById(`${y}-${x}`)
        circleDiv2.setAttribute('class', 'piece')
        tableRowCordinate.append(circleDiv2)
        whboard[y][x] = null
        board[y][x] = currPlayer
    }
}
/** endGame: announce game end */
function endGame(msg) {
    // TODO: pop up alert message
    const box = document.createElement('div')
    const popup = document.querySelector('body')
    const player = document.createElement('p')
    player.innerHTML = `Player ${currPlayer} Wins`
    box.append(player)
    box.setAttribute('class', 'winner')

    popup.append(box)
    console.log(msg)
}
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // switch players
    turnCount++
    // get next spot in column (if none, ignore click)
    const y = findSpotForCol(x);

    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame


    // TODO: switch currPlayer 1 <-> 2
    if (turnCount % 2 === 0) {
        currPlayer = 1
    } else { currPlayer = 2 }

}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === currPlayer
        );

    }


    // TODO: read and understand this code. Add comments to help you.

    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            const horiz = [
                [y, x],
                [y, x + 1],
                [y, x + 2],
                [y, x + 3]
            ];
            const vert = [
                [y, x],
                [y + 1, x],
                [y + 2, x],
                [y + 3, x]
            ];
            const diagDR = [
                [y, x],
                [y + 1, x + 1],
                [y + 2, x + 2],
                [y + 3, x + 3]
            ];
            const diagDL = [
                [y, x],
                [y + 1, x - 1],
                [y + 2, x - 2],
                [y + 3, x - 3]
            ];


            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {


                return true;
            }
        }
    }

}




makeBoard();

//makeHtmlBoard();