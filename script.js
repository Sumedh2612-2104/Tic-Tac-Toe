let boxes = document.querySelectorAll(".block");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#newgame");
let msg =document.querySelector("#msg");
let msgcontainer = document.querySelector(".winner");
let gameBoard = document.querySelector(".mainContainer");

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
        // console.log("box has been clicked");
       if(turnO) {
        block.innerText = "O";
        block.style.color = "#ff48b0";
        turnO = false;
       } else {
        block.innerText ="X";
        block.style.color = "#421131";
        turnO = true;
       }
       block.disabled = true;

       checkwinner();
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

 const showDraw = () => {
        msg.innerText = "OOPS! its a Draw";
        msgcontainer.classList.remove("hide");
        gameBoard.classList.add("hide")
        disabledboxes ();
    }

const checkwinner = () => {
    let iswinner = false;
    for(pattern of winPatterns) {
        
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !=  "" && pos2val !="" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val){
            // console.log("winner");
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
