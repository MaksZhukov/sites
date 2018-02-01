$(function() {

    $(document).ready(function() {
        $('.custom_title').append('<div class="line_left"></div><div class="line_right"></div>'); 
        $('.custom_title .line_left, .custom_title .line_right').width(($('.custom_title').width()-$('.custom_title h2').width())/2-35); 
        $(window).resize(function () { 
        $('.custom_title .line_left, .custom_title .line_right').width(($('.custom_title').width()-$('.custom_title h2').width())/2-35); 
        })
        $('.slides_products').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            responsive: [{
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });
        $('.product').each(function(index) {
            $(this).addClass('product_' + index);
            var product = '.product_' + index + ' ';
            $(product + '.pictures .preview').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                fade: true,
                arrows: false,
                draggable : false,
                focusOnSelect: true,
                asNavFor: product + '.pictures .thumbs',
            });
            $(product + '.pictures .thumbs').slick({
                asNavFor: product + '.pictures .preview',
                slidesToShow: 4,
                slidesToScroll: 1,
                verticalSwiping: true,
                vertical: true,
                autoplay: false,
                arrows: false,
                dots: false,
                adaptiveHeight: true,
                focusOnSelect: true
            });
        });
        $('.product').mouseenter(function(event) {
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
        });
        $('.product').mouseleave(function(event) {
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
        });

        $('.main_content_single_product .pictures .preview').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            focusOnSelect: true,
            asNavFor: '.main_content_single_product .pictures .thumbs',
        });
        $('.main_content_single_product .pictures .thumbs').slick({
            asNavFor: '.main_content_single_product .pictures .preview',
            slidesToShow: 4,
            slidesToScroll: 1,
            verticalSwiping: true,
            autoplay: false,
            arrows: false,
            dots: false,
            adaptiveHeight: true,
            focusOnSelect: true
        });
        if ($(document).width() > 768) {
            $('#map').width($('.contact_and_map').width() - $('.contact_and_map .contacts').width() - ($('.contact_and_map').width() - $('.contact_and_map .container').width()) / 2 - 30);
        }


        $('.banner_slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false
        });

        var maxWidthH3 = 0;
        $('.is_katalog .cat').each(function(index, el) {
            if (maxWidthH3 < $(this).find('.link_cat h3').width()) {
                maxWidthH3 = $(this).find('.link_cat h3').width();
            }
        });
        $('.is_katalog .cat').each(function(index, el) {
            $(this).find('.link_cat img').css('margin-left', (maxWidthH3 - $(this).find('.link_cat h3').width() + 12) + 'px');
        });
        var slidesToShow;
        if (window.screen.width > 992) {
            slidesToShow = 4
        }
        if (window.screen.width <= 992) {
            slidesToShow = 3
        }
        if (window.screen.width <= 768) {
            slidesToShow = 2
        }
        if (window.screen.width <= 576) {
            slidesToShow = 1
        }
        $('body').on('mouseenter', '.slides_products .col.slick-slide .product', function(event) {
            if ($(this).parent().index() == $('.slides_products .col.slick-current').index() + slidesToShow - 1) {
                $(this).css('margin-left', '-34%');
                console.log('hello');
            }
            if ($(this).parent().index() == $('.slides_products .col.slick-current').index()) {
                $(this).css('margin-left', '0');
            }
        });
        $('body').on('mouseleave', '.slides_products .col.slick-slide .product', function(event) {
            $(this).css('margin-left', '');
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
            $(this).find('.pictures .thumbs').slick('setPosition');
            $(this).find('.pictures .preview').slick('setPosition');
        });

        var myMap;

        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map('map', {
                center: [53.934022, 27.647117],
                zoom: 16
            }, {
                searchControlProvider: 'yandex#search'
            });
            myMap.geoObjects
                .add(new ymaps.Placemark([53.934022, 27.647117], {
                    iconCaption: 'проспект Независимости, 143к1'
                }, {
                    preset: 'islands#redIcon',
                    iconCaptionMaxWidth: '300'
                }));

        }
        $(".modalbox").fancybox();
        $('.one_click').click(function(event) {
            $('#form_order .name_prod').text($(this).closest('.main_content_single_product').find('h3').text());
            $('#form_order .price').text('Цена ' + $(this).closest('.main_content_single_product').find('.price .new').text());
        });


    })

});