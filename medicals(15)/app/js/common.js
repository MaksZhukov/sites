$(function() {
    $(document).ready(function () {
        $('input[type="tel"]').mask('+375(99) 999-99-99');
        if ($(window).width()>768){
            var maxHeight = Math.max.apply(null, $(".preparat .content").map(function ()
            {
                return $(this).height();
            }).get());
            $('.preparat .content').height(maxHeight);
        }
        $('.slider_certificate').slick({
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
        $('a.see_more').click(function (event) {
            event.preventDefault();
            $('.list_recall .recall').addClass('active');
            $(this).remove();
        });
        $('a.modal').click(function (event) {
            event.preventDefault();
            $($(this).attr('href')).fadeIn('slow');
            if ($(this).attr('href')=="#recall_preview"){
                var indeximage,
                    indexrecall;
                indeximage = $(this).parent().hasClass('after') ? 1 : 0;
                indexrecall = $(this).parents('.recall').index();
                $($(this).attr('href')+' .recall img').hide();
                $($(this).attr('href')+' .recall').eq(indexrecall).find('img').eq(indeximage).show();
            }
        })
        $('.modal_overlay .close').click(function (event) {
            event.preventDefault();
            $(this).parents('.modal_overlay').fadeOut('fast');

        });
        $('.btn_collapse_menu').click(function () {
            $('ul.menu').toggle('fast');
        });
        $('ul.menu li a').click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - ($('header').height() + $('header + nav').height()+50)
            }, 1000);
        });
        $(document).scroll(function () {
            if($(window).width()>= 768) {
                if ($(document).scrollTop() > 0) {
                    $('header').addClass('fixed');
                    $('header.fixed + nav').css('top', $('header.fixed').height());
                    $('section.banner_1').css('margin-top', $('header').height() + $('header + nav').height() + 20);
                }
                else {
                    $('header').removeClass('fixed');
                    $('header + nav').css('top', '');
                    $('section.banner_1').css('margin-top', '');
                }
            }
        });
        if ($(window).width()<768){
            $('header + nav').css('top', $('header').height());
            $('section.banner_1').css('margin-top', $('header').height() + $('header + nav').height());
        }
        (function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
            {
                $('a.logo,section.banner_1 .txt p:nth-child(3)').addClass('ie');
            }

        })();
    });
});