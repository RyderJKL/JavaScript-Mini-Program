var bird = document.getElementById("bird");
var gameBox = document.getElementById("gameBox");
var canFly = true;
var btnStart = document.getElementById("btnStart");
// 小鸟是否可飞的标识
var creatPipeTimer = null;
// 创建管道计时器
var movePipeTimer = null;
// 移动管道计时器
var birdFlyTimer = null;
// 小鸟飞行计时器

var move2Timer = null;
btnStart.onclick = function(){
	createPipe();
}


function createPipe(){
	
	creatPipeTimer = setInterval(function(){
	move2Timer = movePipeTimer;
	var newPipe = document.createElement("div");
	newPipe.className = "pipeLi";
	var newPipeTop = document.createElement("p");
	var newPipeBottom = document.createElement("p");
	newPipeBottom.style.background
	newPipeTop.style.height = randNum(60,150) + "px";
	newPipeBottom.style.height = randNum(60,200) + "px";
	newPipeTop.style.top = 0;
	newPipeBottom.style.bottom = 0;
	newPipeTop.innerHTML = "<img style='bottom:0' src='" +"img/up_pipe.png'"+"/>";
	newPipeBottom.innerHTML = "<img style'top:0' src='" + "img/down_pipe.png'"+"/>";
	newPipe.appendChild(newPipeTop);
	newPipe.appendChild(newPipeBottom);
	gameBox.appendChild(newPipe);
	movePipeTimer = setInterval(function move() {
		if(newPipe.offsetLeft <= -63){
			//newPipe.offsetLeft  + newPipe.offsetWidth <= 0？？？报错
			gameBox.removeChild(newPipe);
		}
		newPipe.style.left = newPipe.offsetLeft -1 +"px";
		var lis = document.querySelectorAll(".pipeLi");

		for(var i =0;i<lis.length;i++){
		//????
			boom(bird,lis[i]);
		}
	},10);
	},2500);	
}

function boom(bird,pipe){
	//碰撞检测
	var birdLeft = bird.offsetLeft;
	//鸟的左侧距box的距离
	var birdRight = bird.offsetLeft + bird.offsetWidth;
	//鸟的右侧距box距离
	var birdTop = bird.offsetTop;
	//鸟的上部距box的距离
	var birdBottom = bird.offsetHeight + bird.offsetTop;
	//鸟的下部距box的距离

	var pipeLeft = pipe.offsetLeft;
	//管道左侧距离box距离
	var pipeRight = pipe.offsetLeft + pipe.offsetWidth;
	//管道右侧距离box距离
	var pipeFirst = pipe.firstElementChild.offsetHeight;
	//管道上部的高度
	var pipeSecond = pipe.lastElementChild.offsetTop;
	//管道下部的高度

	if(birdRight >= pipeLeft && birdTop <= pipeFirst && birdLeft <= pipeRight){
		//检测管道上部
		gameOver();
	}else if(birdRight >= pipeLeft && birdTop>= pipeSecond && birdLeft <= pipeRight){
		gameOver();
	}


}
function randNum (max,min){
	return parseInt(Math.random()*(max - min +1)+min);
}

gameBox.onclick = function(){
	clearInterval(birdFlyTimer);
	birdFly();
}

function gameOver(){
	canFly = false;
	clearInterval(creatPipeTimer);
	clearInterval(movePipeTimer);
	clearInterval(birdFlyTimer);
	clearInterval(move2Timer);

}
function birdFly (){
	var speed = -6;
	// 每次点击鼠标，bird 首先会得到一个向上移动的速度
	var num = 0;
	// 切换 bird 飞行图片
	if(canFly){
		birdFlyTimer = setInterval(function(){
			// birdFlyTimer 的作用是使小鸟向下坠落，只有通过不断的点击鼠标，才能得到一个 负的 speed 速度，
			//以次抵消,定时器向下坠落的速度
			speed += 0.5;
			if(speed >=15 ){
				//向下坠落的最大速度
				speed =15;
			}

			// 下面为小鸟飞行时的不同状态下的图片
			if(speed >0 ){
				//向下飞
				num = num>0?0:1;
				bird.style.background = "url(img/down_bird"+num+".png)";
			}else{
				//向上飞
				num = num>0?0:1;
				bird.style.background = "url(img/up_bird"+num+".png)";
			}

			if(bird.offsetTop <=0 ){
				bird.style.top = 0;
			}else if(bird.offsetTop >= 400){
				bird.style.top = 400 +"px";
			}

			bird.style.top = bird.offsetTop + speed +"px";
		},30);
	}
}



