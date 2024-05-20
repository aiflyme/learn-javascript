let score = JSON.parse(localStorage.getItem('score')) ||  {
    win: 0,
    lost: 0,
    tie: 0,
};

updateScoreElement();

document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r' || event.key === 'R'){f('Rock');}
    else if(event.key === 'p' || event.key === 'P'){f('Paper');}
    else if(event.key === 's' || event.key === 'S'){f('Scissors');}else if(event.key === 's' || event.key === 'S'){f('Scissors');}

    else if(event.key === 'a' || event.key === 'A'){autoPlay();}
    else if(event.code === 'Space'){showResetConfirmation()}
});
//bind rock paper scissors click
document.querySelector('.js-rock-button').addEventListener('click',()=>{
    f('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click',()=>{
    f('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    f('Scissors');
});

function reset() {
    score.tie = score.lost = score.win = 0;
    localStorage.removeItem('score');
    //alert(localStorage.getItem('score'));
    updateScoreElement();

    alert(`Wins: ${score.win}, Losses: ${score.lost}, Ties: ${score.tie}`);
}

function f(choose) {
    const randomNumber = Math.random();
    let computerMove;
    let result;


    //alert(randomNumber);
    if(randomNumber >= 0 && randomNumber< 1/3){
        console.log('Rock');
        computerMove='Rock';
        result = choose === computerMove ? 'Tie' : choose === 'Paper' ? 'Win' : 'Lost';
    }else if(randomNumber >= 1/3 && randomNumber< 2/3){
        console.log('Paper')
        computerMove='Paper';
        result = choose === computerMove ? 'Tie' : choose === 'Scissors' ? 'Win' : 'Lost';
    }else{
        console.log('Scissors')
        computerMove='Scissors';
        result = choose === computerMove ? 'Tie' : choose === 'Rock' ? 'Win' : 'Lost';
    }

    //alert(result);
    if(result === 'Tie') {
        score.tie += 1;
    }else if(result === 'Win') {
        score.win += 1;
    }else if(result === 'Lost') {
        score.lost += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement(result, choose, computerMove);
    //alert(`Computer set the ${computerMove}, you are ${result}
      //      Wins: ${score.win}, Losses: ${score.lost}, Ties: ${score.tie}`);
    //
    // if(choose === 'Rock'){
    //     resule = choose === computerMove ? 'Tie' : computerMove ===''
    // }

}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;
    if(randomNumber >= 0 && randomNumber< 1/3){
        computerMove='Rock';
    }else if(randomNumber >= 1/3 && randomNumber< 2/3){
        computerMove='Paper';
    }else{
        computerMove='Scissors';
    }
    return computerMove;
}

function updateScoreElement(result = '', choose ='', computerMove='') {
    if(result){
        document.querySelector('.status').innerHTML = `
                           You: ${result}`;
    }else{
        document.querySelector('.status').innerHTML = ``;
    }
    if (choose && computerMove){

        document.querySelector('.choose').innerHTML = `
                   you <img src="images/${choose.toLowerCase()}-emoji.png" class="move-icon">
                   <img src="images/${computerMove.toLowerCase()}-emoji.png" class="move-icon"> Computer
                `;

    }else{
        document.querySelector('.choose').innerHTML = ``;
    }
    document.querySelector('.result').innerHTML = `
                       Wins: ${score.win}, Losses: ${score.lost}, Ties: ${score.tie}`;
}

let isAutoPlay = false;
let intervalId ;

function autoPlay() {
    if(!isAutoPlay){
        intervalId = setInterval( ()=> {
            computerChoose = pickComputerMove();
            f(computerChoose);
        } ,2000);
        isAutoPlay=true;
    } else {
        alert('Stop Auto Play')
        clearInterval(intervalId);
        isAutoPlay=false;
    }

}

function showResetConfirmation() {
    clearInterval(intervalId);
    isAutoPlay=false;
    
    document.querySelector('.reset-confirmation').innerHTML=`
    Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
    document.querySelector('.js-reset-confirm-yes')
        .addEventListener('click', () => {
            reset();
            hideResetConfirmation();
        });

    document.querySelector('.js-reset-confirm-no')
        .addEventListener('click', () => {
            hideResetConfirmation();
        });
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
    document.querySelector('.reset-confirmation')
        .innerHTML = '';
}

const product2 = {
    name:'shirt',
}
console.log(product2['name1']);
console.log(product2.name1);