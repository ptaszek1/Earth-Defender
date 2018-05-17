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


        function fire() {
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 800,
                left: $('.ship').offset().left+10,
            }));
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 800,
                left: $('.ship').offset().left+76,
            }));
            playSound()
        }
        $(document).click(fire);

        function update() {
            $(".bullet").each(function() {
                let top = $(this).offset().top;
                $(this).css({
                    top: top - 15,
            });
                if($(this).offset().top < -10){
                    $(this).remove()
                }
            });
        }
        setInterval(update, 15);

        
        
        function asteroid() {
            let size = Math.floor((Math.random() * 150) + 30);
            $galaxy.append($("<div>").addClass("asteroid").css({
                top: -100,
                left: Math.floor((Math.random() * 100) + 1) +'%',
                width: size,
                height: size,
            }));
        }
        setInterval(asteroid,500);

        let topPos = 4;

        function moveAsteroid() {
                $('.asteroid').each(function () {
                    let top = $(this).offset().top;
                    let left = $(this).offset().left;
                    if($(this).offset().left > 700){
                        $(this).css({
                            left: left -1
                        })
                    } else {
                        $(this).css({
                            left: left +1
                        })
                    }
                    $(this).css({
                        top: top + topPos,
                    });
                    if($(this).offset().top > 1000){
                        $(this).remove()
                    }
                });
            collision()
        }
        setInterval(moveAsteroid,40);


        let $scoreScore = 0;
        let $stageScore = 1;
        var $destroyedScore = 1;

        function countScore() {
            $destroyedScore+=1;
            $scoreScore += 10;
            if($destroyedScore % 25 === 0){
                $stageScore +=1;
                topPos+=1;
                moveAsteroid()
            }
            $('.destroyed span').text($destroyedScore);
            $('.score span').text($scoreScore);
            $('.stage span').text($stageScore);
        }



        function collision() {
            let list = $('.bullet').collision('.asteroid');
            let list2 = $('.asteroid').collision('.bullet')
            let list3 = $('.earth').collision('.asteroid');
            if(list.length > 0){
                list.remove();
                list2.remove();
                countScore()
            } else if (list3.length > 0){

            }
        }
        
        

    }

    game()


});