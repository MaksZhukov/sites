$(function() {

    $('.s-service-1c').css('margin-top',$('.header-site').outerHeight());
    $('.btn-collapse-menu').click(function () {
        $('.header-menu').slideToggle();
    });
    $(window).resize(function () {
        console.log($(document).width);
        if ($(window).width()> 768){
            $('.header-menu').show();
        }
        else{
            $('.header-menu').hide();
        }
    });
    $('.modal-link').click(function(event) {
        event.preventDefault();
        $($(this).attr('href')).show().parent().fadeIn('slow');
    });
    $('.modal-close').click(function(event) {
        $(this).parent().hide().parent().fadeOut('fast');
    });

});