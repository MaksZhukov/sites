$(function() {
    $(document).ready(function () {
        if ($(window).width()<768){
            var scaleprocent = $(window).width() / 768 *0.9;
            var margin_left= (1-scaleprocent)*110;
            $('.slider3d').css({'transform':'scale('+scaleprocent+')','margin-left': '-'+margin_left+'px'});
        }
        $(window).on('resize',function () {
            if ($(this).width()<768){
                var scaleprocent = $(this).width() / 768*0.9;
                var margin_left= (1-scaleprocent)*110;
                $('.slider3d').css({'transform':'scale('+scaleprocent+')','margin-left': '-'+margin_left+'px'});
            }
        })
        var carousel = new $('.carousel').CircularCarousel({
            ovalWidth: 250,
            ovalHeight: 15,
            offsetX: 50, // the left offset of all points on the ellipse
            offsetY: 125, // the top offset of all points on the ellipse
            angle: 0, // the angle of the ellipse
            activeItem: 0, // used to influence which element is considered active
            duration: 850,
            className: 'item'
        });
        if ($(window).width()<768) {
            $('.slider3d').height($('.carousel .item.active').outerHeight()*1.1);
        }
        else{
            $('.slider3d').height($('.carousel .item.active').outerHeight());
        }
       setInterval(function () {
                carousel.cycleActive('next')
            }
            ,4000);
        var items3dslider = $('.carousel .item');
        items3dslider.click(function () {
            var index = items3dslider.index($(this));
            var activeindex = items3dslider.index($('.carousel .item.active'));
            if (activeindex==2){
                if (index== 0){
                    carousel.cycleActive('next');
                }
                if (index== 1){
                    carousel.cycleActive('previous');
                }
            }
            if (activeindex==1){
                if (index== 2){
                    carousel.cycleActive('next');
                }
                if (index== 0){
                    carousel.cycleActive('previous');
                }
            }
            if (activeindex==0){
                if (index== 1){
                    carousel.cycleActive('next');
                }
                if (index== 2){
                    carousel.cycleActive('previous');

                }
            }

        });
        $('.main_slider').slick({
            slidesToShow: 5,
            variableWidth: true
        });
        var height ='';
        if ($(window).width()<992){
            height= '';
        }
        else
        {
            fit="cover"
        }
       var sliderswithparam = $('.theark_slider_param_1,.theark_slider_param_2,.theark_slider_param_3,.theark_slider_param_4, .souvenir_slider_param_1,.souvenir_slider_param_2,.souvenir_slider_param_3').fotorama({
            width: '100%',
            thumbwidth: '100%',
            height: height,
            fit : 'cover',
            thumbwidth: '130px',
            thumbmargin: 6,
            nav: false,
            arrows: false
        }).hide();
        $('.theark_slider_param_1').show();
        $('.souvenir_slider_param_1').show();
        $('.wrap_main_content .params > div').click(function () {
            var indexparam = $(this).attr('class')[$(this).attr('class').length-1];
            var section = $(this).closest("section");
            section.find('.fotorama').hide();
            section.find("[class*='slider_param_"+indexparam+"']").show().resize();
        });

        $('select').selectize({
            placeholder: 'Тип изделия    ',
            create: true,
            currentValue: ""
        });
        $(".order_call").fancybox();
    });

});