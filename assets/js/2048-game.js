// This is the full script for the 2048 game.
// It is wrapped in an initialization function to be called by the game launcher.

function initialize2048Game() {
  const gridDisplay = document.querySelector('.grid')
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  let squares = []
  const width = 4
  let score = 0

  //create the playing board
  function createBoard() {
    gridDisplay.innerHTML = '' // Clear board first
    squares = []
    for (let i=0; i < width*width; i++) {
      let square = document.createElement('div')
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
    addColours()
  }
  createBoard()

  //generate a new number
  function generate() {
    let emptySquares = squares.filter(sq => sq.innerHTML == 0)
    if (emptySquares.length > 0) {
      let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]
      randomSquare.innerHTML = 2
      checkForGameOver()
    }
  }

  function moveRight() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
      }
    }
  }

  function moveLeft() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i+1].innerHTML = newRow[1]
        squares[i+2].innerHTML = newRow[2]
        squares[i+3].innerHTML = newRow[3]
      }
    }
  }


  function moveUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function moveDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i+width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

  function combineRow() {
    for (let i =0; i < 15; i++) {
      if ((i + 1) % 4 !== 0 && squares[i].innerHTML === squares[i+1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+1].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  function combineColumn() {
    for (let i =0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i+width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i+width].innerHTML = 0
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = 'You WIN'
        document.removeEventListener('keyup', control)
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i=0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = 'You LOSE'
      document.removeEventListener('keyup', control)
    }
  }

  //add colours
  function addColours() {
    for (let i=0; i < squares.length; i++) {
      const value = squares[i].innerHTML
      let color = 'var(--glass-bg-medium)' // for 0
      let textColor = 'var(--theme-text-secondary)'
      
      if (value == 2) {
        color = 'var(--theme-accent-light)'
        textColor = 'var(--theme-text)'
      }
      else if (value == 4) {
        color = 'var(--theme-accent)'
        textColor = 'var(--text-white)'
      }
      else if (value == 8) {
        color = 'var(--theme-primary)'
        textColor = 'var(--text-white)'
      }
      else if (value == 16) {
        color = 'var(--theme-secondary)'
        textColor = 'var(--text-white)'
      }
      else if (value == 32) {
        color = 'var(--theme-accent-dark)'
        textColor = 'var(--text-white)'
      }
      else if (value == 64) {
        color = 'var(--theme-primary-shadow)'
        textColor = 'var(--text-white)'
      }
      else if (value == 128) {
        color = 'var(--theme-secondary-shadow)'
        textColor = 'var(--text-white)'
      }
      else if (value == 256) {
        color = 'var(--theme-accent-light)'
        textColor = 'var(--theme-text)'
      }
      else if (value == 512) {
        color = 'var(--theme-accent)'
        textColor = 'var(--text-white)'
      }
      else if (value == 1024) {
        color = 'var(--theme-primary)'
        textColor = 'var(--text-white)'
      }
      else if (value == 2048) {
        color = 'var(--theme-secondary)'
        textColor = 'var(--text-white)'
      }
      
      squares[i].style.backgroundColor = color
      squares[i].style.color = textColor
    }
  }

  var myTimer = setInterval(addColours, 50)
}

document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we are on a page that needs it
    if (document.querySelector('.game-container-2048')) {
        initialize2048Game();
    }
}); 