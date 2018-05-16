$(function () {
    function game() {


        $(document).on('mousemove', function (e) {
            $('.ship').css({
                left: e.pageX - 50,
            });
        });


        function fire() {
            $(".galaxy").append($("<div>").addClass("bullet").css({
                top: 900,
                left: $('.ship').offset().left+50,
            }));
        }
        $(document).click(fire);

        let $pos = 0;

        function shipPos() {
            console.log(arr1[count]);
            return arr1[count]
        }


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


    }

    game()


})