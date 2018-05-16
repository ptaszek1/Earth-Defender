$(function () {
    function game() {


        $(document).on('mousemove', function (e) {
            $('.ship').css({
                left: e.pageX - 50,
            });
        });

        let $pos = 0;

        function fire() {
            $(".galaxy").append($("<div>").addClass("bullet").css("top", 900));
            $pos = $('.ship').offset().left
        }
        $(document).click(fire);

        function shipPos() {
            console.log($('.ship').position());
        }

        function update() {
            $(".bullet").each(function() {
                let top = $(this).offset().top;
                $(this).css({
                    top: top - 20,
                    left: $('.ship').offset().left,
            });
                if($(this).offset().top < -10){
                    $(this).remove()
                }
            });
        }
        setInterval(update, 25);


    }

    game()


})