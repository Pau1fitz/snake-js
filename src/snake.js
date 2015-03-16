window.onload = function()
{
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 0,
    direction = 0,
    snake = new Array(7),
    active = true,
    speed = 1150;

    // Initialize the matrix.
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(20);
    }

    canvas.width = 204;
    canvas.height = 224;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    // Add the snake
    map = generateSnake(map);

    // Add the food
    map = generateFood(map);

    drawGame();

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 38 && direction !== 3) {
            direction = 2; // Up
        } else if (e.keyCode === 40 && direction !== 2) {
            direction = 3; // Down
        } else if (e.keyCode === 37 && direction !== 0) {
            direction = 1; // Left
        } else if (e.keyCode === 39 && direction !== 1) {
            direction = 0; // Right
        }
    });

    function drawGame()
    {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        for (var i = snake.length - 1; i >= 0; i--) {

            // We're only going to perform the collision detection using the head
            // so it will be handled differently than the rest
            if (i === 0) {
                switch(direction) {
                    case 0: // Right
                        snake[0] = { x: snake[0].x + 1, y: snake[0].y }
                        break;
                    case 1: // Left
                        snake[0] = { x: snake[0].x - 1, y: snake[0].y }
                        break;
                    case 2: // Up
                        snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
                        break;
                    case 3: // Down
                        snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
                        break;
                }

                // Check that it's not out of bounds.
                if (snake[0].x < 0 ||
                    snake[0].x >= 20 ||
                    snake[0].y < 0 ||
                    snake[0].y >= 20) {
                    showGameOver();
                    return;
                }


                if (map[snake[0].x][snake[0].y] === 1) {
                    score += 10;
                    map = generateFood(map);

                    // Add a new body piece to the array
                    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                    map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

                    if ((score % 100) == 0) {
                        level += 1;
                    }

                } else if (map[snake[0].x][snake[0].y] === 2) {
                    showGameOver();
                    return;
                }

                map[snake[0].x][snake[0].y] = 2;
            } else {

                if (i === (snake.length - 1)) {
                    map[snake[i].x][snake[i].y] = null;
                }

                snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
                map[snake[i].x][snake[i].y] = 2;
            }
        }

        drawMain();

        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                if (map[x][y] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                } else if (map[x][y] === 2) {
                    ctx.fillStyle = 'green';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                }
            }
        }

        if (active) {
            setTimeout(drawGame, speed - (level * 50));
        }
    }


    function drawMain()
    {
        ctx.lineWidth = 2; // Our border will have a thickness of 2 pixels
        ctx.strokeStyle = 'black'; // The border will also be black

        // The border is drawn on the outside of the rectangle, so we'll
        // need to move it a bit to the right and up. Also, we'll need
        // to leave a 20 pixels space on the top to draw the interface.
        ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

        ctx.fillStyle = 'black';
        ctx.font = '12px sans-serif';
        ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
    }

    function generateFood(map)
    {
        // Generate a random position for the rows and the columns.
        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);

        // We also need to watch so as to not place the food
        // on the a same matrix position occupied by a part of the
        // snake's body.
        while (map[rndX][rndY] === 2) {
            rndX = Math.round(Math.random() * 19);
            rndY = Math.round(Math.random() * 19);
        }

        map[rndX][rndY] = 1;

        return map;
    }

    function generateSnake(map)
    {
        // Generate a random position for the row and the column of the head.
        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);

        // Let's make sure that we're not out of bounds as we also need to make space to accomodate the
        // other two body pieces
        while ((rndX - snake.length) < 0) {
            rndX = Math.round(Math.random() * 19);
        }

        for (var i = 0; i < snake.length; i++) {
            snake[i] = { x: rndX - i, y: rndY };
            map[rndX - i][rndY] = 2;
        }

        return map;
    }

    function showGameOver()
    {
        // Disable the game.
        active = false;

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.font = '16px sans-serif';

        ctx.fillText('Game Over!', ((canvas.width / 2) - (ctx.measureText('Game Over!').width / 2)), 50);

        ctx.font = '12px sans-serif';

        ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score Was: ' + score).width / 2)), 70);

    }
};