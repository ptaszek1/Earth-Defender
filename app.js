$(function () {
    function game() {


        // Ship follow the mouse

        $(document).on('mousemove', function (e) {
            $('.ship').css({
                left: e.pageX - 50,
            });
        });

        let $galaxy = $('.galaxy');

        function playSound() {
            var sound = document.getElementById("audio");
            sound.play();
        }


        function fire() {
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 850,
                left: $('.ship').offset().left+10,
            }));
            $galaxy.append($("<div>").addClass("bullet").css({
                top: 850,
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
            $galaxy.append($("<div>").addClass("asteroid").css({
                top: 10,
                left: Math.floor((Math.random() * 1300) + 1),
            }));
        }
        setInterval(asteroid,1500);


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
                        top: top + 4,
                    })
                    if($(this).offset().top > 1000){
                        $(this).remove()
                    }
                })
        }

        setInterval(moveAsteroid,20)
        
        

    }

    game()


})