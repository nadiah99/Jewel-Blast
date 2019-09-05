function initialize()
{

  moveCount =10;
  score = 0;

  //create ball objects.
  for(var x =0; x<10; x++)
  {
    balls[x] = [];
    for(var y=0; y<10; y++)
    {
      balls[x][y] = new Ball(x,y);

    }
  }

  //set color.
  for (var x=0; x<10; x++)
  {
    for (var y=0; y<10; y++)
    {
      while(true)
      {
        var colorNum = getRandomNum(6);
        if (checkColor(x,y,colorNum))
        {
          balls[x][y].color = colorNum;
          break;
        }
      }
    }
  }



  //set mouse events
  canvas.onmousedown = myMouseDown;
  canvas.onmouseup = myMouseUp;

  //start timer
  timer = setInterval(checkBallStatus, 25);
  bgm.play();

}


function checkBallStatus()
{
  if(moves.length > 0)
  {

    //decrement gapCount
    for(var i=0; i<moves.length; i++)
    {
      moves[i].update();
    }

    //if gapCount remains, put it back
    moves = moves.filter(
      function(ball){
        return ball.gapCount !=0;
      }
    );
    //moving done
    if (moves.length == 0)
    {
      setRemoveFlag();
      fall();

    }

  }
  paint();

  //Game Over
  if (moves.length == 0 && moveCount == 0)
  {
    clearInterval(timer);
    timer = null;
    bgm.pause();
    bgm.currentTime = 0;
    setTimeout('gameOverBasic()', 500);
  }

}



function paint()
{

  btnBack.style.display = 'inline';
  mute.style.display = 'inline';
  unMute.style.display = 'inline';

  //clear canvas
  //ctx.clearRect(0, 0, 600, 700); //ctx.clearRect(x, y, width, height)
  ctx.drawImage(bgGame, 0, 0);

  for(var x=0; x<10; x++)
  {
    for(var y=0; y<10; y++)
    {
      //drawImage(image, x, y, width, height)
      ctx.drawImage(imageList[balls[x][y].color], x*60, balls[x][y].getY(), 60, 60);

    }
  }

  //text
  ctx.font = 'bold 20px Open Sans';
  ctx.textAlign = 'center';
  ctx.fillText('Moves Left : ' + moveCount , 150, 50);
  ctx.fillText('Score : ' + score, 450, 50);

}
