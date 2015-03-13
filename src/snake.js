window.onload = function ()

{
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    direction = 0,
    snake = new Array(3);

    var map = new Array(20);  //creates 20 empty arrays
    console.log(map)
    for (var i = 0; i < map.length; i++) {
          map[i] = new Array(20)    //creates 20 empty arrays for each map array
    }

    canvas.width = 204;
    canvas.height = 224;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    map = generateSnake(map);
    map = generateFood(map);

    drawGame();

    function drawGame()
    {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawMain();

      for (var x = 0; x < map.length; x++){
        for (var y = 0; y < map[0].length; y++){
          if (map[x][y] === 1) {
            ctx.fillStyle = 'red';
            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
          } else if (map[x][y] === 2) {
            ctx.fillStyle = 'green';
            ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
          }
        }
      }
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


  function generateSnake(map){
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);
    while((rndX - snake.length) < 0){
      rndX = Math.round(Math.random() * 19);
    }

    for (var i = 0; i < snake.length; i++){
      snake[i] = { x: rndX - i, y: rndY};
      map[rndX - i][rndY] = 2;
    }
    return map
  }


  function generateFood(map){
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);

    while (map[rndX][rndY] === 2){
      var rndX = Math.round(Math.random() * 19),
          rndY = Math.round(Math.random() * 19);
    }

    map[rndX][rndY] = 1;
    return map;
  }

  function showGameOver() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "16px sans-serif";

    ctx.fillText("Game over!", (canvas.width / 2 ) - (ctx.measureText('Game Over!').width/2));
    ctx.font = '12px sans-serif';
    ctx.fillText('Your Score Was: ' + score);
  };
};