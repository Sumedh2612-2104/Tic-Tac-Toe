let boxes = document.querySelectorAll(".block");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#newgame");
let msg =document.querySelector("#msg");
let msgcontainer = document.querySelector(".winner");
let gameBoard = document.querySelector(".mainContainer");
let vsComputer = document.querySelector("#computer")
let vsPlayer = document.querySelector("#player")
let startScreen = document.querySelector("#start-screen");
let homeBtn = document.querySelector("#home");
let symbolSelection = document.querySelector(".symbol-selection");
let symbolHome = document.querySelector("#symbol-home");
let chooseX =document.querySelector("#chooseX");
let chooseO = document.querySelector("#chooseO");
let gameMode = "";
let playerSymbol = "";
let computerSymbol = "";


let turnO = true ;

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

const resetgame = () => {
    turnO = playerSymbol === "O" ? false : true;
    Enabledboxes ();
    msgcontainer.classList.add("hide");
    gameBoard.classList.remove("hide");

    if(gameMode === "computer" && !turnO){
        setTimeout(computerMove, 500);
    }
}

boxes.forEach((block) => {
    block.addEventListener("click", () => {
        if (block.innerText !== "") return;
        block.disabled = true;

       if(gameMode === "computer"){

            if (turnO) {
                block.innerText = playerSymbol;
                block.style.color = playerSymbol === "X" ? "#421131" : "#ff48b0";
                turnO = false;
            }

            checkwinner();

            if (!turnO) {
                setTimeout(computerMove, 500);
            }
        }else{
            
        block.innerText = turnO ? "O" : "X";
        block.style.color = turnO? "#ff48b0" : "#421131";
        turnO = !turnO;
       
        checkwinner();
       }
            block.disabled = true;
    })
})

const disabledboxes = () => {
    for(let block of boxes) {
        block.disabled = true ;
    }
}


const Enabledboxes = () => {
    for(let block of boxes) {
        block.disabled = false ;
        block.innerText = "";
    }
}

const showWinner = (symbol) =>{

    let msgText;

    if(gameMode === "player"){
        msgText = symbol === playerSymbol ?"Congratulations! You Won 🎉🔥" :`Player ${symbol} won!`;
    }else if (gameMode === "computer"){
        if (symbol === playerSymbol) {
            msgText =  "Congratulations! You won 🎉🔥" ;
        }else if(symbol === computerSymbol){
            msgText =  "Sorry!😔  Computer won!";
        }
    }

    msg.innerText = msgText;
    msgcontainer.classList.remove("hide");
    gameBoard.classList.add("hide");    
    disabledboxes();
}


// The AI introduces this function to make the computer unbeatable (pro)

const computerMove = () => {

    let emptyBoxes = Array.from(boxes).filter(block => block.innerText === "");
    if (emptyBoxes.length === 0) return;

    // Function to check if placing a symbol can win/block
    const findWinningMove = (symbol) => {
        for (let pattern of winPatterns) {
            let vals = pattern.map(i => boxes[i].innerText);
            if (vals.filter(v => v === symbol).length === 2 && vals.includes("")) {
                let emptyIndex = pattern[vals.indexOf("")];
                return boxes[emptyIndex];
            }
        }
        return null;
    };

    // 1️⃣ Win if possible
    let winBox = findWinningMove(computerSymbol);
    if (winBox) {
        winBox.innerText = computerSymbol;
        winBox.style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
        winBox.disabled = true;
        checkwinner();
        turnO = true;
        return;
    }

    // 2️⃣ Block the player
    let blockBox = findWinningMove(playerSymbol);
    if (blockBox) {
        blockBox.innerText = computerSymbol;
        blockBox.style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
        blockBox.disabled = true;
        checkwinner();
        turnO = true;
        return;
    }

    // 3️⃣ Take the center
    if (boxes[4].innerText === "") {
        boxes[4].innerText = computerSymbol;
        boxes[4].style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
        boxes[4].disabled = true;
        checkwinner();
        turnO = true;
        return;
    }

    // 4️⃣ Take a corner
    let corners = [0, 2, 6, 8].filter(i => boxes[i].innerText === "");
    if (corners.length > 0) {
        let cornerBox = boxes[corners[Math.floor(Math.random() * corners.length)]];
        cornerBox.innerText = computerSymbol;
        cornerBox.style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
        cornerBox.disabled = true;
        checkwinner();
        turnO = true;
        return;
    }

    // 5️⃣ Pick a random empty box
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = computerSymbol;
    randomBox.style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
    randomBox.disabled = true;
    checkwinner();
    turnO = true;
};

 const showDraw = () => {
        msg.innerText = "OOPS! its a Draw";
        msgcontainer.classList.remove("hide");
        gameBoard.classList.add("hide")
        disabledboxes ();
    }

const checkwinner = () => {
    // Check all winning patterns
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        const valA = boxes[a].innerText;
        const valB = boxes[b].innerText;
        const valC = boxes[c].innerText;

        if (valA && valA === valB && valA === valC) {
            showWinner(valA);
            return; // Exit immediately after finding a winner
        }
    }

    // Check for draw
    const allFilled = Array.from(boxes).every(block => block.innerText !== "");
    if (allFilled) {
        showDraw();
    }
};

newbtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);

vsPlayer.addEventListener("click", () => {
    gameMode = "player";
    startScreen.classList.add("hide");
    symbolSelection.classList.add("hide");
    gameBoard.classList.remove("hide");
});


homeBtn.addEventListener("click", () => {

    gameBoard.classList.add("hide");
    msgcontainer.classList.add("hide");
    startScreen.classList.remove("hide");
    turnO = true;
    Enabledboxes();
});


// adding a symbol selection feuture for vscomputer 

vsComputer.addEventListener("click", () => {
    gameMode = "computer";
    startScreen.classList.add("hide");
    symbolSelection.classList.remove("hide");
});

symbolHome.addEventListener("click", () => {
    symbolSelection.classList.add("hide");
    startScreen.classList.remove("hide");
})

// let'sz addd computer feuture into thisssss....

const startGameVsComputer = () => {
    symbolSelection.classList.add("hide");
    gameBoard.classList.remove("hide");
    turnO = playerSymbol === "O" ? false : true; 
    Enabledboxes();

    // If computer starts first, make its move
    if (!turnO) {
        setTimeout(computerMove, 500);
    }
};

chooseX.addEventListener("click", () => {
        playerSymbol = "X";
        computerSymbol = "O";
        startGameVsComputer();
})

chooseO.addEventListener("click", () => {
    playerSymbol = "O";
    computerSymbol = "X";
    startGameVsComputer();
})