(function() {

    $(document).ready(function() {

        var options = {
            ovalWidth: 200,
            ovalHeight: 25,
            offsetX: 100,
            offsetY: 430,
            angle: 0,
            activeItem: 0,
            duration: 350,
            className: 'item',
            classNamebullet: 'bullet'
        }

        var carousel = $('.carousel').CircularCarousel(options);

        /* Fires when an item is about to start it's activate animation */


        /* Previous button */
        $('.controls .previous').click(function(e) {
            carousel.cycleActive('previous');
            e.preventDefault();
        });

        /* Next button */
        $('.controls .next').click(function(e) {
            carousel.cycleActive('next');
            e.preventDefault();
        });

        /* Manaully click an item anywhere in the carousel 
        $('.carousel .item').click(function(e) {
            var index = $(this).index('li');
            carousel.cycleActiveTo(index);
            e.preventDefault();
        });
        */
        /*Bullet click*/
        $('.bullets .bullet').click(function(e) {
            var index = $(this).index('.bullet');
            carousel.cycleActiveTo(index);
            $('.bullets .bullet').removeClass('active');
            $(this).addClass(' active');
            e.preventDefault();
        });



    });

})();
