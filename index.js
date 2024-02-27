const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');


let cuurentPlayer;
let gameGrid;
let winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// let create a function to initialize the game
function initGame(){
    cuurentPlayer='X';
    gameGrid=["","","","","","","","",""];
    //UI pe bhi empty krna pdega
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //intialize css property
        box.classList=`box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${cuurentPlayer}`;
}
initGame();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=cuurentPlayer;
        gameGrid[index]=cuurentPlayer;
        boxes[index].style.pointerEvents="none";
        //turn change kro players ki
        swapTurn();
        //check koi jeet to nhi gya
        checkGameOver();
    }
}
function swapTurn(){
    if(cuurentPlayer==='X'){
        cuurentPlayer='O';
    }
    else
    {
        cuurentPlayer='X'
    }
    //ui updating
    gameInfo.innerText=`Current Player -${cuurentPlayer}`;
}
function checkGameOver(){
    let ans="";

    winningPosition.forEach((position)=>{
        //all 3 boxes should be filled and have exactly same value
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            // check who is winner
            if(gameGrid[position[0]]==='X')
                ans='X';
            else
                ans='O';
            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans!==""){
        gameInfo.innerText=`Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }

    //let's check whether there is tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            fillCount++;
        }
    })
    if(fillCount==9){
        gameInfo.innerText="Game Tied!";
        newGameBtn.classList.add("active");
    }
}
newGameBtn.addEventListener("click",initGame);