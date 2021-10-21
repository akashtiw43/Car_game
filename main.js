const score=document.querySelector(".score");
const game=document.querySelector(".game");
const startScreen=document.querySelector(".startScreen");
const gameArea=document.querySelector(".gameArea");
const keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false,};
let player={speed:10,score:0};
startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

/*-----------------CONTROLS---------------*/
function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
}
function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;    
}

/*------xxxxxx-----------CONTROLS--------xxxxxxx-------*/


/*----------------GAME OVER----------*/
function collision(a,b){
    let aRect=a.getBoundingClientRect();
    let bRect=b.getBoundingClientRect();
    return !(
        (aRect.bottom<bRect.top)|| (aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right)
    )
}

function gameOver(){
    player.start=false;
    score.innerHTML="Game Over<br>Score was: "+player.score;
    startScreen.classList.remove("hide");
}

/*-----xxxx---------GAME OVER---------xxxx-----*/

function moveLines(){
    let line=document.querySelectorAll(".line");
    line.forEach(function(item){
        if(item.y>=1500){
            item.y-=1500;
        }
        item.y+=player.speed;
        item.style.top=item.y + 'px';
    })
}
function moveEnemy(car){
    let enemy=document.querySelectorAll(".enemy");
    enemy.forEach(function(item){
        if(collision(car,item)){
           
            gameOver();
        }
        if(item.y>=1500){
            item.y=-600;
            item.style.left=Math.floor(Math.random()*250) + 'px';
           //item.style.backgroundColor=randomColor();
        }
        item.y+=player.speed;
        item.style.top=item.y + 'px';
       
    })

}

/*-------------------------GAMEPLAY-----------*/
function playGame(){
    let car=document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road=gameArea.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowDown && player.y < (road.bottom-50)){player.y+=player.speed;}
        if(keys.ArrowUp && player.y > road.top ){player.y-=player.speed;}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed;}
        if(keys.ArrowRight && player.x < (road.width-50)){player.x+=player.speed;}
        car.style.left=player.x + 'px';
        car.style.top=player.y + 'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText="Score: "+player.score;
    }
}
/*----------xxxxx---------------GAMEPLAY--------xxxxxxxx---*/

/*---------------INITIALIZING GAME-------------*/
function start(){
   startScreen.classList.add("hide");
   //gameArea.classList.remove("hide");
   score.classList.remove("hide");
   gameArea.innerHTML="";
   player.start=true;
   player.score=0;
   for(let x=0;x<10;x++){
        let div=document.createElement("div");
        div.setAttribute("class","line");
        div.y=x*150;
        div.style.top=(x*150)+'px';
        gameArea.appendChild(div);
   }
   for(let x=0;x<3;x++){
        let enemy=document.createElement("div");
        enemy.classList.add("enemy")
        enemy.y=((x+1)*600)*-1;
        enemy.style.top=(enemy.y)+'px';
        enemy.style.left=Math.floor(Math.random()*250) + 'px';
       // enemy.style.backgroundColor=randomColor();
        gameArea.appendChild(enemy);
   }
   window.requestAnimationFrame(playGame);
   let car=document.createElement("div");
   car.setAttribute("class","car");
   gameArea.appendChild(car);
   player.x=car.offsetLeft;
   player.y=car.offsetTop;
}

/*---------xxx------INITIALIZING GAME------xxx-------*/



/*             CAN BE USED INSTEAD OF CAR IMAGES
function randomColor(){
    function c(){
    let hex=Math.floor(Math.random()*256).toString(16);
    return ("0"+ String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}

*/