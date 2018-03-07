$(function() {
    var rem = $('html').css('font-size').replace('px','');
    $('section.sub_header').css('margin-top',$('header').outerHeight());
    $("input[type='tel']").mask("+375(99) 999-99-99");
    if ($(window).width()>576){
    $('.stand').each(function (index,el) {
        $(this).find('.picture').outerHeight($(this).find('.desc').outerHeight()+6*rem);
    });
    }
    $('.slider_production').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
    ]
    });
    $('.menu li a, a.look').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - $('header').outerHeight()
        }, 1000);
    });
    $('.btn_collapse_menu').click(function () {
        $('header ul.menu').slideToggle();
    });
    $('a.modal').click(function (event) {
        event.preventDefault();
        $($(this).attr('href')).fadeIn('slow');
    })
    $('.modal_window .close').click(function (event) {
        event.preventDefault();
        $(this).parents('.modal_wrapper').fadeOut('fast');

    })
});