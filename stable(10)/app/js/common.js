$(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 150) {
            $('#to_top').fadeIn();
        } else {
            $('#to_top').fadeOut();
        }
    });
    $('#to_top').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });
    $(window).on('load', function() {
        $('.preloader').delay(1000).fadeOut('slow');
    });

});