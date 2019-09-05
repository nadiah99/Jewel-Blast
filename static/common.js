/*

Common Functions:

function getRandomNum(num)
function Ball(x,y)
function gameOver()
function setRemoveFlag()
function fall()
function checkColor(x,y,c)
function myMouseDown(e)
function myMouseUp(e)

*/

function getRandomNum(n)
{
  return Math.floor(Math.random()*n);
}


function Ball(x,y)
{
  this.x1 = x;
  this.y1 = y;
  this.x2 = x;
  this.y2 = y;
  this.gapCount = 0;

  this.getY = function()
  {
    //move the ball gradually
    return (this.y1 + (this.y2 - this.y1)*(this.gapCount)/25)*60 + 100;
  }


  this.moveBall = function(x2, y2, color)
  {
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.moving = true;
    this.gapCount = 25;
    moves.push(this);
  }

  this.update = function()
  {
    this.gapCount --;
    if(this.gapCount <=0)
    {
      this.moving = false;
    }
  }

}


function gameOverTimer()
{

  const btnSave = document.getElementById('btnSave');
  const inpValue = document.getElementById("inputName");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const homeBtn = document.getElementById('homeBtn');
  const mute = document.getElementById('mute');
  const unMute = document.getElementById('unMute');
  const btnBack = document.getElementById('btnBack');
  const scoreBtn = document.getElementById('scoreBtn');

  ctx.drawImage(bgGame2, 0, 0, 600, 700);
  //ctx.clearRect(0,0,600,700);
  tryAgainBtn.style.display = 'inline';
  btnSave.style.display = 'inline';
  inpValue.style.display = 'inline';
  homeBtn.style.display = 'inline';
  scoreBtn.style.display = 'inline';

  ctx.font = 'bold 30px Open Sans';
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Score : " + score, 300, 250);
  //ctx.fill(lsOutput.innerHTML = localStorage.getItem("name"), 300, 200);

  mute.style.display = 'none';
  unMute.style.display = 'none';
  btnBack.style.display = 'none';

  tryAgainBtn.addEventListener("click",function(){
    setJS("{{url_for('static', filename = 'timeTrial.js')}}")

    btnSave.style.display = 'none';
    scoreBtn.style.display = 'none';

  });

  btnSave.addEventListener("click",function(){
    const  scoreBoard = {
      name: inpValue.value,
      score:score
    };

    highScores.push(scoreBoard);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    var myJSON = JSON.stringify(highScores);
    localStorage.setItem("highScores",myJSON);
  });

    scoreBtn.addEventListener("click",function(){

      btnSave.style.display = 'none';
      scoreBtn.style.display = 'none';
      tryAgainBtn.style.display = 'none';
      inpValue.style.display = 'none';

      for(j=0; j<1; j++)
      {
        const result = JSON.parse(localStorage.getItem("highScores"));
        for(i=0, y=350; i< highScores.length; i++,y+=30 ){

          ctx.textAlign = "left";
          ctx.fillText(i+1 +". " + result[i].name +' - '+result[i].score,220,y);

        }

      }


  });

}


function gameOverBasic()
{

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const homeBtn = document.getElementById('homeBtn');
  const mute = document.getElementById('mute');
  const unMute = document.getElementById('unMute');
  const btnBack = document.getElementById('btnBack');

  ctx.drawImage(bgGame2, 0, 0, 600, 700);
  //ctx.clearRect(0,0,600,700);
  tryAgainBtn.style.display = 'inline';
  homeBtn.style.display = 'inline';
  ctx.font = 'bold 30px Open Sans';
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("Score : " + score, 300, 250);
  //ctx.fill(lsOutput.innerHTML = localStorage.getItem("name"), 300, 200);

  mute.style.display = 'none';
  unMute.style.display = 'none';
  btnBack.style.display = 'none';

  tryAgainBtn.addEventListener("click",function(){
    setJS("{{ url_for('static', filename = 'basicGame.js')}}")

  });

}



function setRemoveFlag()
{

  for (var x=0; x<10; x++)
  {
    var c0 = balls[x][0].color;
    var count = 1;
    for (var y=1; y<10; y++)
    {
      var c1 = balls[x][y].color;
      if (c0 == c1)
      {
        count++;
        if(count >=3)
        {
          balls[x][y-2].remove = true;
          balls[x][y-1].remove = true;
          balls[x][y].remove = true;
        }
      }
      else
      {
        c0 = c1;
        count = 1;
      }
    }
  }

  for (var y=0; y<10; y++)
  {
    var c0 = balls[0][y].color;
    var count =1;
    for (var x=1; x<10; x++)
    {
      var c1 = balls[x][y].color;
      if(c0 == c1)
      {
        count++;
        if(count >=3)
        {
          balls[x-2][y].remove = true;
          balls[x-1][y].remove = true;
          balls[x][y].remove = true;
        }
      }
      else
      {
        c0 = c1;
        count = 1;
      }
    }
  }
  return count;
}

function fall()

{
  for (var x=0; x<10; x++)
  {
    for (var y=9, z=9; y>=0; y--, z--)
    {
      while (z >= 0)
      {
        if (balls[x][z].remove)
        {
          z--;

        }
        else
        {
          break;
        }
      }
      if( y != z)
      {
        var colorNum = (z >= 0) ? balls[x][z].color : getRandomNum(6);
        balls[x][y].moveBall(x, z, colorNum);
      }
    }
  }

  //update remove flag && add score & play sound

  var soundFlag = true;

  for(var x=0; x<10; x++)
  {
    for(var y=0; y<10; y++)
    {
      if(balls[x][y].remove)
      {
        balls[x][y].remove = false;
        score += 100;


        //play sound
        if(soundFlag)
        {
          sound.pause();
          sound.currentTime = 0;
          sound.play();
          soundFlag = false;
        }
      }
    }
  }
}

function checkColor(x, y, c)
{
  var flag = true;

  if(x > 1)
  {
    var c0 = balls[x-2][y].color;
    var c1 = balls[x-1][y].color;

    if (c0 == c1 && c1 == c)
    {
      flag = false;
    }
  }

  if(y > 1)
  {
    var c0 = balls[x][y-2].color;
    var c1 = balls[x][y-1].color;
    if(c0 == c1 && c1==c)
    {
      flag = false;
    }

  }
  return flag;
}


function myMouseDown(e)
{
  mouseDownX = e.offsetX;
  mouseDownY = e.offsetY;
}

function myMouseUp(e)
{
  var ballX1 = Math.floor(mouseDownX/60);
  var ballY1 = Math.floor((mouseDownY-100)/60);
  //console.log("ballX: "+ballX1);
  //console.log("ballY: "+ballY1);

  //switch shape

  var ballX2 = ballX1;
  var ballY2 = ballY1;
  var mouseUpX = e.offsetX;
  var mouseUpY = e.offsetY;

  if(Math.abs(mouseUpX - mouseDownX)==0 && Math.abs(mouseUpY - mouseDownY)==0)
  {
    return;
  }
  else if (Math.abs(mouseUpX - mouseDownX) > Math.abs(mouseUpY - mouseDownY))
  {
    ballX2 += (mouseUpX - mouseDownX > 0) ? 1 : -1;//ternary operator

  }
  else
  {
    ballY2 += (mouseUpY - mouseDownY > 0 ) ? 1: -1;
  }
  //console.log("ballX2: "+ballX2);
  //console.log("ballY2: "+ballY2);

  if(balls[ballX1][ballY1].moving || balls[ballX2][ballY2].moving || timer == null)
  {
    return;
  }

  //switch ball color
  var ballColor = balls[ballX1][ballY1].color;
  balls[ballX1][ballY1].moveBall(ballX2, ballY2, balls[ballX2][ballY2].color);
  balls[ballX2][ballY2].moveBall(ballX1, ballY1, ballColor);



  //Decrease move count

  moveCount --;

  paint();
}
