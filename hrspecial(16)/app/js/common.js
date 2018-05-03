$(function() {
    $(document).ready(function() {
    	$('input[type="tel"]').mask('+375(99) 999-99-99');
        $('section.banner_1').css('margin-top', $('header').innerHeight());
        $('input[type="file"]').change(function(event) {
            if (this.files[0].size > 1000000) {
                this.value = "";
                alert('Ваш файл больше 1 мб');
            }
        });
        $('.slider_team').slick({
            dots: true
        });
        $('body').on('click','.modal_link',function(event) {
            event.preventDefault();
            $($(this).attr('href')).fadeIn('slow');
            if($(this).attr('href')==="#certificate_preview"){
                $($(this).attr('href')).find('.preview .stuff img').hide();
                $($(this).attr('href')).find('.preview .stuff').eq($(this).parents('.slide').index()-1).find('img').eq($(this).index()).show();
            }
        });
        $('.modal_close').click(function(event) {
            event.preventDefault();
            $(this).parents('.modal_overlay').fadeOut('fast');
        });
        $('textarea')
            .on('keypress', function (event) {
                var textarea = $(this),
                    text = textarea.val(),
                    numberOfLines = (text.match(/\n/g) || []).length + 1,
                    maxRows = parseInt(textarea.attr('rows'));

                if (event.which === 13 && numberOfLines === maxRows ) {
                    return false;
                }
            });
        $('.our_team .slide').each(function () {
            if ($(this).find('.certificates > a').length<5){
                $(this).find('.watch_all').hide();
            }
        });
        $('.watch_all').click(function (event) {
            event.preventDefault();
            $(this).parents('.slide').find('.certificates a').addClass('active');
            $(this).parent().remove();
        });
        if ($(window).width()>768) {
            $('.vacancies .tab').click(function () {
                $('.vacancies .tab,.vacancies .content').removeClass('active');
                $('.vacancies .tab').eq($(this).index()).addClass('active');
                $('.vacancies .content').eq($(this).index()).addClass('active');
            });
        }
        $('header .phone').click(function () {
            $('header .contacts_and_timework').toggle();
        });
        $('header ul .sub_menu').click(function () {
            $('header ul ul').toggle();
        });
        $('.dropdown_employer').click(function (event) {
            event.preventDefault();
            $('.employer').toggle();
        });
        $('.dropdown_aspirant').click(function (event) {
            event.preventDefault();
            $('.aspirant').toggle();
        });
        $("a[data-to]").click(function (event) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top - ($('header').height())
            }, 1000);
        });
        $('a[href="#"]').click(function (event) {
            event.preventDefault();
        });
        $('.btn_collapse_menu').click(function () {
            $('header ul.menu').toggle('fast');
        });
        $('.slide .add_info a').click(function(event) {
            event.preventDefault();
            $(this).parents('.add_info').find('.content').slideDown();
        });
        $('.slide .add_info .back').click(function(event) {
            $(this).parent().slideUp();
        });
        if ($(window).width()<=768){
            $('.vacancies .tabs .tab').each(function (index) {
                $('<div class="contents"><div class="content">'+ $('.vacancies > .contents .content').eq(index).html()+'</div></div>').insertAfter($(this));
            });
            $('.vacancies > .contents').remove();
            $('.vacancies > .tab').eq(0).addClass('active');
            $('.vacancies .contents').eq(0).addClass('active');
            $('.vacancies > .contents').eq(0).addClass('active');
            $('.vacancies .tab').click(function () {
                !$(this).hasClass('active') ? $('.vacancies .tab,.vacancies .contents').removeClass('active') : false;
                $(this).toggleClass('active');
                $(this).next().toggleClass('active');
            });
        }
    });

});