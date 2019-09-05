function initialize()
{

  timeCount = 60 * 1000; //1 minute
  //timeCount = 10 * 1000; //10 seconds

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
  //decrement time count
  timeCount -= 25;

/*
  //speed up bgm last 5 seconds
  if(bgm.playbackRate == 1 && timeCount < 5000)
  {
    bgm.pause();
    bgm.playbackRate = 1.5;
    bgm.play();
  }
*/

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
  if (moves.length == 0 && timeCount <= 0)
  {
    clearInterval(timer);
    timer = null;
    bgm.pause();
    bgm.currentTime = 0;
    setTimeout('gameOverTimer()', 500);
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

  //time
  var sec = Math.floor(timeCount/ 1000);
  var mSec = timeCount % 1000;

  if(sec < 0)
  {
    sec = '00';
  }
  else if(sec < 10)
  {
    sec = '0' + sec;
  }
  if (mSec < 0) mSec = '00';

  ctx.fillText('Times Left : ', 100, 50);
  ctx.fillText( sec + ' : ' + mSec , 200, 50);
  ctx.fillText('Score : ' + score, 450, 50);
}
