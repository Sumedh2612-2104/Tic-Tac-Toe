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
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetgame = () => {
    turnO = true;
    Enabledboxes ();
    msgcontainer.classList.add("hide");
    gameBoard.classList.remove("hide");
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

const showWinner = (winner) =>{
    msg.innerText = `Congratulation, The winner is ${winner}! `;
    msgcontainer.classList.remove("hide");
    gameBoard.classList.add("hide")
    disabledboxes();
}

const computerMove = () => {
    let emptyBoxes = Array.from(boxes).filter(block => block.innerText === "");

    if(emptyBoxes.length === 0) return;

    let randomBoxes =emptyBoxes[Math.floor(Math.random()*emptyBoxes.length)];

    randomBoxes.innerText = computerSymbol;
    randomBoxes.style.color = computerSymbol === "X" ? "#421131" : "#ff48b0";
    randomBoxes.disabled = true;

    checkwinner();
    turnO = true;
}

 const showDraw = () => {
        msg.innerText = "OOPS! its a Draw";
        msgcontainer.classList.remove("hide");
        gameBoard.classList.add("hide")
        disabledboxes ();
    }

const checkwinner = () => {
    let iswinner = false;
    for(let pattern of winPatterns) {
        
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !=  "" && pos2val !="" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){

        showWinner (pos1val) 
        iswinner = true;
        return ;
    }
        }
        }
    

   
    let allfilled = true;
    boxes.forEach((block) => {
        if(block.innerText === ""){
            allfilled =false;
        }
    });

    if(allfilled && !iswinner){
        showDraw();
    }
}

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