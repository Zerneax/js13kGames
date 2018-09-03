var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ball informations
var ballX = canvas.width/2;
var ballY = 10;
var ballColor = "#ff0000";

// receptacle informations
var receptacles = [];
var widthReceptacle = canvas.width/3;
var heightReceptacle = 20;

// score
var score = 50;

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

  colision();
  isInGoodReceptacle();

  if(score <= 0)
    alert("GAME OVER");

  displayScore();

  moveBall();
}

setInterval(draw, 10);

function colision(){
  if(ballX < 10 || ballX > canvas.width - 10)
  {
    initBallPosition();
  }
}

function addColorToBall() {
  switch (getRandomInt(3)) {
    case 0:
      ballColor = "#ff0000";
      break;
    case 1:
      ballColor = "#00ff00";
      break;
    case 2:
      ballColor = "#0000ff";
      break;
    default:
      ballColor = "#ff0000";

  }
}

function isInGoodReceptacle() {
  if(ballY >= canvas.height - heightReceptacle)
  {
    for(var i = 0; i < 3; i ++)
    {
      if(ballX >= receptacles[i].x && ballX <= (receptacles[i].x + widthReceptacle))
      {
        if(ballColor === receptacles[i].color)
        {
          addPoint();
        }
        addColorToBall();
        initBallPosition();
      }
    }
  }
}

function initBallPosition() {
  ballX = canvas.width/2;
  ballY = 10;
}

function displayScore() {
  document.getElementById("score").innerHTML = score;
}

function looseScore() {
  score -=2;
}

setInterval(looseScore, 4000);

function addPoint() {
  switch (ballColor) {
    case "#ff0000":
      score += 2;
      break;
    case "#00ff00":
      score += 3;
      break;
    case "#0000ff":
      score += 4;
      break;
    default:
      return;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
  ctx.fillStyle = ballColor;
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
    ballY += 1.25;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
