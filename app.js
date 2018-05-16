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
                    top: top - 10,
            });
                if($(this).offset().top < -10){
                    $(this).remove()
                }
            });
        }
        setInterval(update, 25);

        
        
        
        function asteroid() {

        }
        
        

    }

    game()


})