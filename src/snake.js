window.onload = function ()

{
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      score = 0,
      level = 0,
      direction = 0;

  var map = new Array(20);  //creates 20 blank arrays
  console.log(map)
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(20)    //creates 20 blank arrays for each map array
    // console.log(map[i])
  }

    canvas.width = 204;
    canvas.height = 224;

  var body = document.getElementsByTagName('body')[0];
  body.appendChild(canvas);

  map = generateFood(map);
  drawGame();

  function drawGame()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
  }

  function generateFood(){
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

    while (map[rndX][rndY] === 2){
      var rndX = Math.round(Math.random() * 19),
          rndY = Math.round(Math.random() * 19);
    }

    map[rndX][rndY] = 1;
    return map;
  }


  function drawMain()
  {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
    ctx.font = '12px courier';
    ctx.fillStyle = "green";
    ctx.fillText('Score: ' + score + ' - Level:' + level, 2, 12);
  }
};