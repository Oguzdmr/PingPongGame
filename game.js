(function() {
    var winner = '2. OYUNCU';

    var CSS = {
        arena: {
            width: 900,
            height: 600,
            background: '#62247B',
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '999',
            transform: 'translate(-50%, -50%)'
        },
        ball: {
            width: 15,
            height: 15,
            position: 'absolute',
            top: 0,
            left: 350,
            background: '#C6A62F'
        },
        line: {
            width: 0,
            height: 600,
            borderLeft: '2px dashed #C6A62F',
            position: 'absolute',
            top: 0,
            left: '50%'
        },
        stick: {
            width: 12,
            height: 85,
            position: 'absolute',
            background: '#C6A62F'
        },
        stick1: {
            left: 0,
            top: 150
        },
        stick2: {
            right: 0,
            top: 150,
        },
        scoreboard: {
            width: '50%',
            height: '20%',
            margin: 'auto',
            type: Number,
        },
        score1: {
            'color': '# ffffff',
            'font-family': 'sans-serif',
            'font-size': '400%',
            'margin-top': '4%',
            'float': 'right',
        },
        score2: {
            'color': '# ffffff',
            'font-family': 'sans-serif',
            'font-size': '400%',
            'margin-top': '4%',
            'float': 'right',
        }
    };

    var CONSTS = {
        gameSpeed: 20,
        score1: 0,
        score2: 0,
        stick1Speed: 0,
        stick2Speed: 0,
        ballTopSpeed: 0,
        ballLeftSpeed: 0,
    };

    function start() {
        draw();
        setEvents();
        roll();
        loop();
    }

    function draw() {
        $('<div/>', {id: 'pong-game'}).css(CSS.arena).appendTo('body');
        $('<div/>', {id: 'pong-line'}).css(CSS.line).appendTo('#pong-game');
        $('<div/>', {id: 'pong-ball'}).css(CSS.ball).appendTo('#pong-game');
        $('<div/>', {id: 'stick-1'}).css($.extend(CSS.stick1, CSS.stick)).appendTo('#pong-game');
        $('<div/>', {id: 'stick-2'}).css($.extend(CSS.stick2, CSS.stick)).appendTo('#pong-game');
        $('<div id="s1">' + CONSTS.score1 + '<div/>').css($.extend(CSS.score1, CSS.scoreboard)).appendTo('#pong-game');
        $('<div id="s2">' + CONSTS.score2 + '<div/>').css($.extend(CSS.score2, CSS.scoreboard)).appendTo('#pong-game');

    }

    function setEvents() {
        $(document).on('keydown', function(e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 5;
            } else if (e.keyCode == 40) {
                CONSTS.stick2Speed = 5;
            }

            if (e.keyCode == 87) {
                CONSTS.stick1Speed = -5;
            } else if (e.keyCode == 38) {
                CONSTS.stick2Speed = -5;
            }
        });

        $(document).on('keyup', function(e) {
            if (e.keyCode == 83) {
                CONSTS.stick1Speed = 0;
            } else if (e.keyCode == 40) {
                CONSTS.stick2Speed = 0;
            }

            if (e.keyCode == 87) {
                CONSTS.stick1Speed = 0;
            } else if (e.keyCode == 38) {
                CONSTS.stick2Speed = 0;
            }
        });

    }

    function loop() {
        window.pongLoop = setInterval(function() {
            CSS.stick1.top += CONSTS.stick1Speed;
            $('#stick-1').css('top', CSS.stick1.top);
            if (CSS.stick1.top <= 0 || CSS.stick1.top >= CSS.arena.height - CSS.stick1.height) {
                CONSTS.stick1Speed = CONSTS.stick1Speed * -1;
            }

            CSS.stick2.top += CONSTS.stick2Speed;
            $('#stick-2').css('top', CSS.stick2.top);
            if (CSS.stick2.top <= 0 || CSS.stick2.top >= CSS.arena.height - CSS.stick2.height) {
                CONSTS.stick2Speed = CONSTS.stick2Speed * -1;
            }

            CSS.ball.top += CONSTS.ballTopSpeed;
            CSS.ball.left += CONSTS.ballLeftSpeed;

            if (CSS.ball.top <= 0 ||
                CSS.ball.top >= CSS.arena.height - CSS.ball.height) {
                CONSTS.ballTopSpeed = CONSTS.ballTopSpeed * -1;
            }

            $('#pong-ball').css({
                top: CSS.ball.top,
                left: CSS.ball.left
            });

            if (CSS.ball.left <= CSS.stick.width) {
                //CSS.ball.top > CSS.stick1.top && CSS.ball.top < (CSS.stick1.top + CSS.stick.height) && (CONSTS.ballLeftSpeed = CONSTS.ballLeftSpeed * -1) || 
                jQuery('#s1').text((parseInt(jQuery('#s1').text()) + 1).toString());
                roll();
            }

            if (CSS.ball.left >= CSS.arena.width - CSS.ball.width - CSS.stick.width) {
                jQuery('#s2').text((parseInt(jQuery('#s2').text()) + 1).toString());
                roll();
            }

            if (parseInt(CSS.ball.left) <= 0 + 15 && parseInt(CSS.ball.top) >= parseInt(CSS.stick1.top) && parseInt(CSS.ball.top) <= parseInt(CSS.stick1.top) + 85) {
                CONSTS.ballLeftSpeed *= -1;

            } else if (parseInt(CSS.ball.left) + 15 >= CSS.arena.width - CSS.ball.width - CSS.stick.width && parseInt(CSS.ball.top) >= parseInt(CSS.stick2.top) && parseInt(CSS.ball.top) <= parseInt(CSS.stick2.top) + 85) {
                CONSTS.ballLeftSpeed *= -1;
            }

            if (jQuery('#s1').text() === '5' || jQuery('#s2').text() === '5') {
                if (jQuery('#s2').text() === '5') {
                    winner = '1. OYUNCU'
                    winnerMessage(winner);
                }

                
            }

        }, CONSTS.gameSpeed);
    }

    function roll() {
        CSS.ball.top = 250;
        CSS.ball.left = 450;

        var side = -1;

        if (Math.random() < 0.5) {
            side = 1;
        }

        CONSTS.ballTopSpeed = Math.random() * -2 - 3;
        CONSTS.ballLeftSpeed = side * (Math.random() * 2 + 3);
    }

    function winnerMessage(winner) {
        jQuery('#s1').text('0');
        jQuery('#s2').text('0');
        jQuery('#ball').css('visible', 'none');

        alert('WINNER = ' + winner);
        
    }

    start();
})();