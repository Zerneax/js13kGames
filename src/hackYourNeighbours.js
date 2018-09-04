var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// ball informations
var file = new Image();
file.src = './assets/file.png';
var fileX = canvas.width/2;
var fileY = 10;
var fileColor = "#ff0000";
var offsetCenterFile = 26;

// receptacle informations
var receptacles = [];
var widthReceptacle = canvas.width/3;
var heightReceptacle = 20;

// obstacles
var obstacles = [];
var widthObstacle = canvas.width/3;
var heightObstacle = 20;
var paddingObstacle = 40;
var offsetTopObstacle = 120;

// score
var score = 50;

// movement
var rightPressed = false;
var leftPressed = false;

initReceptacle();
initObstacles();
addColorToBall();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
    else if(e.keyCode == 13) {
      setInterval(draw, 10);
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
  drawObstacles();

  colision();
  isInGoodReceptacle();

  if(score <= 0)
    alert("You fail to DDOS your neighbours");
  else if( score >= 100)
  {
    alert("Your neighbours is OFFLINE");
    document.location.reload();
  }

  displayScore();

  moveBall();
}


function colision(){
  // colision with border of the canvas
  if(fileX < offsetCenterFile || fileX > canvas.width - offsetCenterFile)
  {
    initBallPosition();
  }
  else {
    // colision with black obstacles
    for(var i = 0; i < 3; i ++)
    {
      if((fileX + offsetCenterFile) > obstacles[i].x && (fileX) < (obstacles[i].x + obstacles[i].w))
      {
        if((fileY + offsetCenterFile) >  obstacles[i].y && (fileY) <  (obstacles[i].y + heightObstacle))
        {
          initBallPosition();
        }
      }
    }
  }
}

function addColorToBall() {
  var colorOfFile = "";
  switch (getRandomInt(3)) {
    case 0:
      fileColor = "#ff0000";
      colorOfFile = "RED";
      break;
    case 1:
      fileColor = "#00ff00";
      colorOfFile = "GREEN";
      break;
    case 2:
      fileColor = "#0000ff";
      colorOfFile = "BLUE";
      break;
    default:
      fileColor = "#ff0000";

  }
  document.getElementById("fileColor").innerHTML = "Destination of file : " + colorOfFile;
}

function isInGoodReceptacle() {
  if(fileY >= canvas.height - heightReceptacle)
  {
    for(var i = 0; i < 3; i ++)
    {
      if(fileX >= receptacles[i].x && fileX <= (receptacles[i].x + widthReceptacle))
      {
        console.log('color' , fileColor);
        if(fileColor === receptacles[i].color)
        {
          addPoint();
          initObstacles();
        }
        addColorToBall();
        initBallPosition();
      }
    }
  }
}

function initBallPosition() {
  fileX = canvas.width/2;
  fileY = 10;
}

function displayScore() {
  document.getElementById("score").innerHTML = score;
}

function looseScore() {
  score -=2;
}

setInterval(looseScore, 3000);

function addPoint() {
  switch (fileColor) {
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
  ctx.drawImage(file, fileX, fileY);
  ctx.closePath();
}

function moveBall() {
  if(leftPressed)
  {
    fileX -= 1;
  } else if(rightPressed)
  {
    fileX += 1;
  }else {
    fileY += 1.25;
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

function initObstacles() {
  for(var i = 0; i < 3; i ++)
  {
    var o = {
      x: i * widthObstacle,
      y: (i * (heightObstacle + paddingObstacle)) + offsetTopObstacle,
      w: 100 + getRandomInt(canvas.width / 3)
    }
    obstacles[i] = o;
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

function drawObstacles() {
  for(var i = 0; i < 3; i ++)
  {
    ctx.beginPath();
    ctx.rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, heightObstacle);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
