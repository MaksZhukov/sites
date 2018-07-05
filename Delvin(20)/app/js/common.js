$(function () {
    $(document).ready(function () {
        $("input[type='tel']").mask("+375(99) 999-99-99");
        $(".btn-collapse-menu").click(function () {
            $('nav .menu').slideToggle()
        });
        if ($('#map').length) {
            ymaps.ready(init);
            function init() {
                let myMap = new ymaps.Map('map', {
                    center: [53.996112, 27.697252],
                    zoom: 15
                }, {
                    searchControlProvider: 'yandex#search'
                });
                myMap.geoObjects
                    .add(new ymaps.Placemark([53.996112, 27.697252], {
                        iconCaption: 'Центральная улица, 1Б'
                    }, {
                        preset: 'islands#redDotIcon',
                        iconCaptionMaxWidth: '300'
                    }));
                myMap.behaviors.disable("scrollZoom");
            }
        }
        $('.modal-link').click(function (event) {
            event.preventDefault();
            $($(this).attr('href')).show().parent().fadeIn('slow');
        });
        $('.modal-close').click(function () {
            $(this).parent().hide().parent().fadeOut('fast');
        });
        $('.categories .parent .drop').click(function () {
            $(this).parents('.parent').toggleClass('active').find('.sub-categories').slideToggle();
        });
        $('.categories .parent.active').find('.sub-categories').slideToggle();
        $("#get-consultation form input[name='name_product']").val($('.single-product .name').text());
    });
});