$(function () {
    function game() {


        $(document).on('mousemove', function (e) {
            $('.ship').css({
                left: e.pageX - 50,
            });
        });

        let $galaxy = $('.galaxy');


        function playSound() {
            let sound = document.getElementById("audio");
            sound.play();
        }

        let $bulletWidth = 4;
        let $bulletHeight = 25;

        function fire() {
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 800,
                left: $('.ship').offset().left + 10,
                width: $bulletWidth,
                height: $bulletHeight,
            }));
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 800,
                left: $('.ship').offset().left + 76,
                width: $bulletWidth,
                height: $bulletHeight,
            }));
            playSound()
        }

        $(document).click(fire);

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

        setInterval(update, 15);


        function asteroid() {
            let size = Math.floor((Math.random() * 150) + 30);
            $galaxy.append($("<div>").addClass("asteroid").css({
                top: -100,
                left: Math.floor((Math.random() * 100) + 1) + '%',
                width: size,
                height: size,
            }));
        }

        setInterval(asteroid, 500);

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

        setInterval(moveAsteroid, 40);


        let $scoreScore = 0;
        let $stageScore = 1;
        let $destroyedScore = 1;

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
                // console.log('game over')
            } else if (ufoCollision.length > 0) {
                $scoreScore += 1000;
                $('.ufo-move').remove();
                countScore();
            } else if (dollar.length > 0) {
                $('.dollar').remove();
                $scoreScore += 200;
                countScore();
            } else if (timer.length > 0) {
                $('.timer').remove();
                topPos -= 1;
                moveAsteroid();
            } else if (weapone.length > 0) {
                $('.better-bullets').remove();
                $bulletWidth += 3;
                $bulletHeight += 2;
                fire()
            }
        }

        let $randomUFO = Math.floor((Math.random() * 15000) + 4000);
        let $randomDollar = Math.floor((Math.random() * 60000) + 1000);
        let $randomTimer = Math.floor((Math.random() * 60000) + 1000);
        let $randomWeapone = Math.floor((Math.random() * 60000) + 1000);

        function createUfo() {
            $('.ufo-move').append($('<div>').addClass('ufo'))
        }

        setTimeout(createUfo, $randomUFO);

        function bonusDollar() {
            $('.bonuses').append($('<div>').addClass('dollar').css({
                left: Math.floor((Math.random() * 100) + 1) + '%',
            }))
        }

        setTimeout(bonusDollar, $randomDollar);

        function bonusTimer() {
            $('.bonuses').append($('<div>').addClass('timer').css({
                left: Math.floor((Math.random() * 100) + 1) + '%',
            }))
        }

        setTimeout(bonusTimer, $randomTimer);

        function bonusWeapone() {
            $('.bonuses').append($('<div>').addClass('better-bullets').css({
                left: Math.floor((Math.random() * 100) + 1) + '%',
            }))
        }

        setTimeout(bonusWeapone, $randomWeapone)


    }

    // Out of game function

    $('#start-game').on('click', function () {
        $('.galaxy').removeClass('hide');
        $('.main-menu').css({
            display: 'none',
        });
        game()
    });

    const $firstUl = $('.main-menu .first-ul');
    const $secondUl = $('.main-menu .second-ul');
    const $table = $('.table');
    const $copyright = $('.copyright');

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
    $('.copyright-button').on('click',function () {
        $copyright.addClass('hide');
        $firstUl.removeClass('hide');
    });


});