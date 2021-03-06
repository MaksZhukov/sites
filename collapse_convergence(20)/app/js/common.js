$(function() {
    var rem = +$('html').css('font-size').replace('px','');

    if($(window).width()>=768) {
        $('.slick_slider_service_station').slick({
            dots: true,
        });
        $('#gallery_service_station .slick_slider_gallery').slick({
            slidesToShow: 1,
        });
    }
    if($(window).width()<768) {
        $('.slick_slider_service_station').hide();
        $('.slick_slider_service_station_mobile').slick({

        });
        var maxHeight = Math.max.apply(null, $(".slick_slider_service_station_mobile .slide").map(function ()
        {
            return $(this).height();
        }).get());
        $('.slick_slider_service_station_mobile .slide').height(maxHeight);
    }
    $('.slick_slider_reviews').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            },
    ]
    });
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $('#calendar').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (dateText) {
            $(this).parent().find('form input[name="date"]').val(dateText);
        }
    });
    $('#calendar').height($('#calendar').height()+10*rem)
    var myMap;

    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map('map', {
            center: [53.90832607, 27.60767200],
            zoom: 14
        }, {
            searchControlProvider: 'yandex#search'
        });
        myMap.geoObjects
            .add(new ymaps.Placemark([53.90832607, 27.60767200], {
                iconCaption: 'Ботаническая улица, 10'
            }, {
                preset: 'islands#redDotIcon',
                iconCaptionMaxWidth: '300'
            }));
        myMap.behaviors.disable("scrollZoom");

    }
    function current_slide_gallery(link) {
       return $(link).parent().attr('data-slick-index') == 0 ? $(link).index() : $(link).index()+$(link).parent().attr('data-slick-index')*6;
    }

    $('.modal').click(function(event){
        event.preventDefault();
        $($(this).attr('href')).fadeIn('slow');
        $($(this).attr('href')).css('display','flex');
        if ($(this).parent().hasClass('slide_service_station') && $(window).width()>=768){
            $('#gallery_service_station .slick_slider_gallery').slick('setPosition');
            $('#gallery_service_station .slick_slider_gallery').slick('slickGoTo', current_slide_gallery(this));
        }
        if ($(this).parent().hasClass('slide_review')){
            $($(this).attr('href')).find('.review').hide();
            $($(this).attr('href')).find('.review').eq($(this).parent().attr('data-slick-index')).show();
        }
        if ($(this).parents('.service').length>0){
            $($(this).attr('href')).find('input[name="title"]').val($(this).parents('.service').find('.title').text());
            $($(this).attr('href')).find('input[name="axis"]').val($(this).parents('.service').find('.axis').text());
            $($(this).attr('href')).find('input[name="price"]').val($(this).parents('.service').find('.price').text());
        }
    });
    $('.modal_window .close').click(function () {
        $(this).closest('.modal_window').fadeOut('fast');
    });
    $('.btn_collapse').click(function () {
        $('.top_header ul.menu').slideToggle();
    });
    $('.menu li a').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });
    $("input[type='tel']").mask("+375(99) 999-99-99");

});