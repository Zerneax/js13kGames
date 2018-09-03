var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// start localization of the ball
var ballX = canvas.width/2;
var ballY = 10;

drawBall();

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
