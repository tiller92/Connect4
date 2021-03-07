const WIDTH = 7;
const HEIGHT = 6;
// sets the player at player one
let currPlayer = 1;

// board never get bigger then 6X7 here is a way it could by setting the h w to a proportion of the window size.
let w = (window.innerWidth / 100)
let h = (window.innerHeight / 100)
    // this if statement make sure that if I do allow for dynamic sizing that it wont be smaller than a 6X7
if (w < 7) {
    w = 7
}
if (h < 6 || h > 6) {
    h = 6
}

// this board keeps track of my coordintates that have been used and I use it for th find colm for x funciton. It helps establish which y coordinate the ball is placed into.
const whboard = [

];


/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
// this baord keeps track of which player had placed which piece where and is used by the check win function to compare agiants it winning board cobinations
const board = []

// makes the actual board using JS
function makeBoard() {
    // grabbing some HTML here
    const board2 = document.getElementById('board2')
        // adding a restart button here
    const newGameBtn = document.createElement('button')
    const game = document.getElementById('game')
    game.classList.add('container')
    newGameBtn.classList.add('restartBtn')
    newGameBtn.innerHTML = 'Restart'
        // passing my restart btn into my restart function
    restart(newGameBtn)

    // creating some HTML using JS here to add rows and columns 
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);

    // made some HTML/CSS just to give the user some innstruction that points to the top column 
    const clickerHere = document.createElement('div')
    clickerHere.classList.add('clickHere')
    const textClickHere = document.createElement('p')
    clickerHere.append(textClickHere)
    textClickHere.innerHTML = 'Click Top Row to place piece &#8594;'
    clickerHere.append(textClickHere)
        // this loop creates the top row of cells that are clickable and this sets how many long the width is (mine is preset tho)
    for (let x = 0; x < WIDTH; x++) {
        let headCell = document.createElement("td");
        headCell.setAttribute("id", x);
        top.append(headCell);
    }
    board2.append(top);


    //  this nested loop creates the the actualy board underneath the top board and sets them to what the height and width are set to
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
    // these are things I just want placed when the board is created
    game.append(newGameBtn)
    game.append(clickerHere)
}

// add this function just because my make board function was already hectic and I didnt want to add anything else I did not need to into the code
function restart(btn) {
    btn.addEventListener('click', () => {
        location.reload()
    })
}

// this function
function findSpotForCol(x) {
    // this function use the whBoard array and deterimnes which cells are open and which are not
    // this var sets the default y at the 5th row instead of at the first row
    let tempY = 5
        // this for loop checks eache cell in cell in the array and checks for null values. if a null value is present(because a piece hase been place there) it will subtract one from the tempyY var and that is where the y coordintate it will place the next piece
    for (let i = 0; i < whboard.length; i++) {
        if (whboard[i][x] === null) {
            tempY--
        }
    }
    // what returns becomes y
    return tempY
}

// Since there is only two players in this game I just use and even odd stradegy to keep track of player one and player two
let turnCount = 0

function placeInTable(y, x) {

    // if statement makes it so that color changes everytime ther is a div placed i.e count
    // these if statements help me keep track of player one and player two while also making sure more than one piece is not placed in the same cell
    if (turnCount % 2 === 0 && whboard[y][x] !== null) {
        // creatings some html here
        const circleDiv = document.createElement('div')
            // gets its x and y from the evt function and then grabs the cell with that Id
        let tableRowCordinate = document.getElementById(`${y}-${x}`)
            // adding the red or blue class
        circleDiv.setAttribute('class', 'piece2')
        tableRowCordinate.append(circleDiv)
            // updating my boards 
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
// create the HTML and adds the css for the endgame
function endGame(msg) {
    const box = document.createElement('div')
    const popup = document.querySelector('body')
    const player = document.createElement('p')
    player.innerHTML = `Player ${currPlayer} Wins`
    box.append(player)
    box.setAttribute('class', 'winner')
    popup.append(box)
    console.log(msg)
}
// this function take the tagert id and that is what is passes to the findSporForCol function and also the place in table function after that 
function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // switch players by just adding one every click it makes it even or odd 
    turnCount++
    // this is just setting the y val to what is retured by the function
    const y = findSpotForCol(x);

    // now you have and x and a y that you can pass into this function and create the needed pieces and place them correctly 
    placeInTable(y, x);

    // once the check for win function returns true it triggers the endGame function
    if (checkForWin()) {
        return endGame(`Player ${currPlayer} won!`);
    }

    // TODO: check if all cells in board are filled; if so call, call endGame
    //still needs done you forgot but there is a resart button

    //this is needed to changes the current player so that board is updated 
    if (turnCount % 2 === 0) {
        currPlayer = 1
    } else { currPlayer = 2 }
}



/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color(1 or 2) of current player
        //  - cells checks the lists of four x and y corrdints and then check to see if the board array has those coordinated filled with the current players number
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

    // this code creates all the possible winning cobinations and then is passed into the WIN function which compares it to the current board
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