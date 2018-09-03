var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// start localization of the ball
var ballX = canvas.width/2;
var ballY = 10;

// receptacle informations
var receptacles = [];
var widthReceptacle = canvas.width/3;
var heightReceptacle = 20;

// movement
var rightPressed = false;
var leftPressed = false;

initReceptacle();
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function draw() {

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawReceptacles();

  moveBall();
}

setInterval(draw, 10);


function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function moveBall() {
  if(leftPressed)
  {
    ballX -= 1;
  } else if(rightPressed)
  {
    ballX += 1;
  }else {
    ballY += 0.75;
  }
}

function initReceptacle() {
  for(var i = 0; i < 3; i ++)
  {

    var r = {
      x: i * widthReceptacle,
      y: canvas.height - heightReceptacle,
      color: returnColor(i)
    }
    receptacles[i] = r;
  }
}

function returnColor(i) {
  switch (i) {
    case 0:
      return "#ff0000";
      break;
    case 1:
      return "#00ff00";
      break;
    case 2:
      return "#0000ff";
      break;
    default:
    return "#ffffff";

  }
}

function drawReceptacles() {
  for(var i = 0; i < 3; i ++)
  {
    ctx.beginPath();
    ctx.rect(receptacles[i].x, receptacles[i].y, widthReceptacle, heightReceptacle);
    ctx.fillStyle = receptacles[i].color;
    ctx.fill();
    ctx.closePath();
  }
}
