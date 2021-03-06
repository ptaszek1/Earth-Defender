$(function () {




        function game() {

            // Ship follow mouse on window

            $(document).on('mousemove', function (e) {
                $ship.css({
                    left: e.pageX - 50,
                });
            });

            let $galaxy = $('.galaxy');
            let $bulletWidth = 4;
            let $bulletHeight = 25;
            const $ship = $('.ship');

            // Start fire position

            function fire() {
                $galaxy.append($("<div>").addClass("bullet").css({
                    top: 800,
                    left: $ship.offset().left + 10,
                    width: $bulletWidth,
                    height: $bulletHeight,
                }));
                $galaxy.append($("<div>").addClass("bullet").css({
                    top: 800,
                    left: $ship.offset().left + 76,
                    width: $bulletWidth,
                    height: $bulletHeight,
                }));
                playSound()
            }

            let $fire = $(document).click(fire);

            // Bullet moves

            function update() {
                $(".bullet").each(function () {
                    let top = $(this).offset().top;
                    $(this).css({
                        top: top - 15,
                    });
                    if ($(this).offset().top < -10) {
                        $(this).remove()
                    }
                });
            }

            let $update = setInterval(update, 15);

            // Create asteroids in random top position

            function asteroid() {
                let size = Math.floor((Math.random() * 150) + 30);
                $galaxy.append($("<div>").addClass("asteroid").css({
                    top: -100,
                    left: Math.floor((Math.random() * 100) + 1) + '%',
                    width: size,
                    height: size,
                }));
            }

            let $asteroid = setInterval(asteroid, 500);

            // Move asteroids from top to down

            let topPos = 4;

            function moveAsteroid() {
                $('.asteroid').each(function () {
                    let top = $(this).offset().top;
                    let left = $(this).offset().left;
                    if ($(this).offset().left > 700) {
                        $(this).css({
                            left: left - 1
                        })
                    } else {
                        $(this).css({
                            left: left + 1
                        })
                    }
                    $(this).css({
                        top: top + topPos,
                    });
                    if ($(this).offset().top > 1000) {
                        $(this).remove()
                    }
                });
                collision();
            }

            let $moveAsteroid = setInterval(moveAsteroid, 40);

            // Score, Stage , Destroyed counters

            let $scoreScore = 0;
            let $stageScore = 1;
            let $destroyedScore = 1;

            // Score Counter

            function countScore() {
                $destroyedScore += 1;
                $scoreScore += 10;
                if ($destroyedScore % 25 === 0) {
                    $stageScore += 1;
                    topPos += 1;
                    moveAsteroid()
                }
                $('.destroyed span').text($destroyedScore);
                $('.score span').text($scoreScore);
                $('.stage span').text($stageScore);
            }


            // Collision function , detect all collisions in game

            function collision() {
                let list = $('.bullet').collision('.asteroid');
                let list2 = $('.asteroid').collision('.bullet');
                let list3 = $('.earth').collision('.asteroid');
                let ufoCollision = $('.ufo').collision('.bullet');
                let dollar = $('.dollar').collision('.ship');
                let timer = $('.timer').collision('.ship');
                let weapone = $('.better-bullets').collision('.ship');
                if (list.length > 0) {
                    list.remove();
                    list2.remove();
                    countScore()
                } else if (list3.length > 0) {
                    setTimeout(function () {
                        clearTimeout($createUfo);
                        clearTimeout($bonusDollar);
                        clearTimeout($bonusTimer);
                        clearTimeout($bonusWeapone);
                        clearInterval($moveAsteroid);
                        clearInterval($asteroid);
                        clearInterval($update);
                        $fire.unbind('click');
                        $(document).unbind('mousemove');
                        $('.asteroid').remove()
                        $('.bullet').remove()
                        $galaxy.addClass('hide');
                        $('.main-menu').css('display','flex');
                        $('.first-ul').addClass('hide');
                        $('.game-over').removeClass('hide');
                        $('.nick-over span').text($('.input-first input').val())
                        $('.score-over span').text($scoreScore);
                        $('.stage-over span').text($stageScore);
                        document.getElementById("music").play();
                        $('.earth-explode').remove()
                    },5000);
                    $('.earth-end').append('<div>').addClass('earth-explode');
                    $('.earth').fadeOut()
                    earthSound()
                } else if (ufoCollision.length > 0) {
                    $scoreScore += 1000;
                    $('.ufo-move').remove();
                    countScore();
                    stopUfoSound()
                } else if (dollar.length > 0) {
                    $('.dollar').remove();
                    $scoreScore += 200;
                    countScore();
                    collectSound();
                } else if (timer.length > 0) {
                    $('.timer').remove();
                    topPos -= 1;
                    moveAsteroid();
                    timerSound()
                } else if (weapone.length > 0) {
                    $('.better-bullets').remove();
                    $bulletWidth += 3;
                    $bulletHeight += 2;
                    weaponeReload();
                }
            }

            // Random elements variables

            let $randomUFO = Math.floor((Math.random() * 15000) + 4000);
            let $randomDollar = Math.floor((Math.random() * 60000) + 1000);
            let $randomTimer = Math.floor((Math.random() * 60000) + 1000);
            let $randomWeapone = Math.floor((Math.random() * 60000) + 1000);

            // Randomly Create UFO on map (1000 points if hit)

            function createUfo() {
                $('.ufo-move').append($('<div>').addClass('ufo'))
                ufoSound()
            }
            let $createUfo = setTimeout(createUfo, $randomUFO);

            // Randomly drop dollar bonus (+200 points)

            function bonusDollar() {
                $('.bonuses').append($('<div>').addClass('dollar').css({
                    left: Math.floor((Math.random() * 100) + 1) + '%',
                }))
            }
            let $bonusDollar = setTimeout(bonusDollar, $randomDollar);

            // Randomly drop timer bonus (-1)

            function bonusTimer() {
                $('.bonuses').append($('<div>').addClass('timer').css({
                    left: Math.floor((Math.random() * 100) + 1) + '%',
                }))
            }
            let $bonusTimer = setTimeout(bonusTimer, $randomTimer);


            // Randomly drop weapone bonus

            function bonusWeapone() {
                $('.bonuses').append($('<div>').addClass('better-bullets').css({
                    left: Math.floor((Math.random() * 100) + 1) + '%',
                }))
            }
            let $bonusWeapone = setTimeout(bonusWeapone, $randomWeapone)


        }


        // Out of game functions


        // Start game button

        $('#start-game').on('click', function () {
            $('.galaxy').removeClass('hide');
            $('.main-menu').css({
                display: 'none',
            });
            testText = 'playGame';
            stopMusic();
            game()
        });


        // Menu elements

        const $firstUl = $('.main-menu .first-ul');
        const $secondUl = $('.main-menu .second-ul');
        const $table = $('.table');
        const $copyright = $('.copyright');
        const $input = $('.input-first');
        let $nickname = '';

        $('#settings').on('click', function () {
            $firstUl.addClass('hide');
            $secondUl.removeClass('hide');
        });

        $('#back').on('click', function () {
            $firstUl.removeClass('hide');
            $secondUl.addClass('hide');
        });
        $('#best-scores').on('click', function () {
            $table.removeClass('hide');
            $firstUl.addClass('hide');
        });
        $('.table-button').on('click', function () {
            $table.addClass('hide');
            $firstUl.removeClass('hide');
        });
        $('#copyright').on('click', function () {
            $firstUl.addClass('hide');
            $copyright.removeClass('hide');
        });
        $('.copyright-button').on('click', function () {
            $copyright.addClass('hide');
            $firstUl.removeClass('hide');
        });
        $('#end').on('click',function () {
            window.location.reload();
        });

        // First input value (Nickname)

        let $nick = $('.nickname');


        $('#btn-nick').on('click', function () {
            if ($nick.val().length < 3 || $nick.val().length > 10) {
                $('.input-first p').removeClass('hide');
            } else {
                $input.addClass('hide');
                $firstUl.removeClass('hide');
                playerNickName()
            }
        });

        function playerNickName() {
            const $nickname = $nick.val();
            $('.nick span').text($nickname);
            $('.nick-over span').text($nickname);
        }

        // Sound Variables

        let $myAudio = document.getElementById("music");
        let $clickSound = document.getElementById("audio-click");
        let $collectSound = document.getElementById("coin-audio");
        let $UfoSound = document.getElementById("audio-ufo");
        let $bulletSound = document.getElementById("audio");
        let $earthDestroy = document.getElementById("audio-destroy");
        let $weapone = document.getElementById('audio-weapone');
        let $timer = document.getElementById('audio-timer');
        let $musicBtn = $('.music-on-off');

        // Set 50% of volume at start

        $myAudio.volume = 0.5;

        // Settings turn on or turn off background music

        $musicBtn.on('click', function () {
            if ($myAudio.paused) {
                $myAudio.play();
                $musicBtn.text('MUSIC ON').css('color', '#60daaa')
            } else {
                $myAudio.pause();
                $musicBtn.text('MUSIC OFF').css('color', 'red')
            }
        });

        // Settings change volume of music

        $('.range').on('input', function () {
            $myAudio.volume = $(this).val() / 100;
            $clickSound.volume = $(this).val() / 100;
            $collectSound.volume = $(this).val() / 100;
            $UfoSound.volume = $(this).val() / 100;
            $bulletSound.volume = $(this).val() / 100;
            $earthDestroy.volume = $(this).val() / 100;
        });

        // Earth destroy sound

        function earthSound() {
            $earthDestroy.play()
        }

        // Bullets sound

        function playSound() {
            $bulletSound.play();
        }

        // UFO sound Start

        function ufoSound() {
            $UfoSound.play();
        }

        // UFO sound stop (if destroyed)

        function stopUfoSound() {
            $UfoSound.pause();
        }

        // Pause the music

        function stopMusic() {
            $myAudio.pause();
        }

        // Button sounds

        function playClick() {
            $clickSound.play();
        }

        $('button').on('click', playClick);

        // Bonuses collect sound

        function collectSound() {
            $collectSound.play();
        }

        // Reload sound

        function weaponeReload() {
            $weapone.play()
        }

        // Timer sound

    function timerSound() {
        $timer.play()
    }


        // If nickname is written then show menu:

        if($('.input-first input').val().length >= 3){
            $('.nick span').text($('.input-first input').val())
            $('.input-first').addClass('hide');
            $('.first-ul').removeClass('hide');
        }

        $('.asteroid').each(function () {
            $(this).css({
                transform: 'rotate(360deg)'
            })
        })

});


