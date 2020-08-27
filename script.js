const player1 = "X"
const player2 = "O"

let playerTime = player1
let gameOver = false

let winner = ""

const $ = selector => document.querySelector(selector)
const $all = selector => document.querySelectorAll(selector)

const winnerText = $(".winner-text")
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const updateDisplay = () => {
  if (gameOver) {
    return
  }
  
  let player = $("#display img")
  if (playerTime == player1){
    player.setAttribute("src", "images/x.png")
  }
  else {
    player.setAttribute("src", "images/o.png")
  }
}

const resetHash = () => {
  gameOver = false
  winner = ""
  const spaces = Array.from($all(".space"))

  spaces.map(space => {
    space.innerHTML = ""
    space.setAttribute("move", "")
  })
  winnerText.innerHTML = ""

  updateDisplay()
}

const initSpaces = () => {
  let spaces = Array.from($all(".space"))
  
  spaces.map(space => {
    space.addEventListener("click", function() {
      if (gameOver) {
        return 
      }
      
      if (this.getElementsByTagName("img").length === 0) {
        if (playerTime === player1) {
          this.innerHTML = "<img src='images/x.png' />"
          this.setAttribute("move", player1)
          playerTime = player2
        } else {
          this.innerHTML = "<img src='images/o.png' />"
          this.setAttribute("move", player2)
          playerTime = player1
        }
        updateDisplay()
        verifyWinner()
      }
    })
  })
}

async function verifyWinner() {
  let spacesImg = $all(".space img")
  let spaces = Array.from($all(".space"))

  let [a1, a2, a3, b1, b2, b3, c1, c2, c3] = spaces.map(space => space.getAttribute("move"))

  if(a1 !== "") {
    if ((a1 == b1 && a1 == c1) || (a1 == a2 && a1 == a3) || (a1 == b2 && a1 == c3)) {
      winner = a1
    }
    else if ((b2 == b1 && b2 == b3) || (b2 == a2 && b2 == c2) || (b2 == a3 && b2 == c1)) {
      winner = b2
    }
    else if ((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) {
      winner = c3
    }
  }

  if (winner !== "") {
    gameOver = true
    winnerText.innerHTML = `O vencedor foi "${winner}"`
    await sleep(50)
  }

  if (spacesImg.length === 9 && !winner) {
    winnerText.innerHTML = `Deu velha!`
  }
}

initSpaces()
updateDisplay()