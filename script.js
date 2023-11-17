const winner = document.getElementById("winner");
const btn0 = document.getElementById("btn0");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const btn5 = document.getElementById("btn5");
const btn6 = document.getElementById("btn6");
const btn7 = document.getElementById("btn7");
const btn8 = document.getElementById("btn8");
const reset = document.getElementById("reset");

let board = [ { id: "btn0", choice: "" }, { id: "btn1", choice: "" }, { id: "btn2", choice: "" }, { id: "btn3", choice: "" }, { id: "btn4", choice: "" }, { id: "btn5", choice: "" }, { id: "btn6", choice: "" }, { id: "btn7", choice: "" }, { id: "btn8", choice: "" } ];
let won = false;

const btns = [ btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8 ];

const player1 = "X";
const player2 = "O";

const winCombinations = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ]
];

function checkWin() {
  winCombinations.forEach(combination => {
    if (board[ combination[ 0 ] ].choice === player1 && board[ combination[ 1 ] ].choice === player1 && board[ combination[ 2 ] ].choice === player1) {
      winner.textContent = "You Won!";
      winner.setAttribute("style", "display: block;");
      won = true;
    } else if (board[ combination[ 0 ] ].choice === player2 && board[ combination[ 1 ] ].choice === player2 && board[ combination[ 2 ] ].choice === player2) {
      winner.textContent = "Bot Won";
      winner.setAttribute("style", "display: block;");
      won = true;
    }
  });
}

function checkIfBoardIsFull() {
  let full = true;
  board.forEach(btn => {
    if (btn.choice === "") {
      full = false;
    }
  });
  return full;
}

function botChoose() {
  if (checkIfBoardIsFull()) { return }
  let choice = Math.floor(Math.random() * 9);
  if (board[ choice ].choice === "") {
    board[ choice ].choice = player2;
    btns[ choice ].innerHTML = player2;
  } else {
    botChoose();
  }
  if (won === false) { checkWin() }
}

btns.forEach(btn => {
  btn.onclick = () => {
    if (btn.innerHTML === "") {
      let id = btn.id;
      let index = id[ 3 ];
      board[ index ].choice = player1;
      btn.innerHTML = player1;
      if (won === false) { checkWin() }
      botChoose();
    }
  }
});

reset.onclick = () => {
  btns.forEach(btn => {
    btn.innerHTML = "";
  });
  winner.setAttribute("style", "display: none;");
  won = false;
  board = [ { id: "btn0", choice: "" }, { id: "btn1", choice: "" }, { id: "btn2", choice: "" }, { id: "btn3", choice: "" }, { id: "btn4", choice: "" }, { id: "btn5", choice: "" }, { id: "btn6", choice: "" }, { id: "btn7", choice: "" }, { id: "btn8", choice: "" } ];
}