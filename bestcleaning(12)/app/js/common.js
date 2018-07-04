$(function() {
    var calculate = $('.calculate'),
     sale= 0,
     basepay_r = +calculate.find('.content_tab_1_right .to_pay .val').text().replace(',','.'),
     basepay_w = +calculate.find('.content_tab_2_right .to_pay .val').text().replace(',','.'),
     price_room = +$('#price_room').val(),
     price_bathroom = +$('#price_bathroom').val(),
     price_window = +$('#price_window').val();

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
    var nowdate = new Date();
    $('#datepicker_room').val(nowdate.getDate() + '.' + nowdate.getMonth() + '.' + nowdate.getFullYear());
    $('#datepicker_window').val(nowdate.getDate() + '.' + nowdate.getMonth() + '.' + nowdate.getFullYear());
    $.datepicker.setDefaults($.datepicker.regional['ru']);
    $('#datepicker_window').datepicker({
        onClose:function () {
            $('#datepicker_window').parent().toggleClass('active');
            calculate.find('.content_tab_2_right .date_time').text($('#datepicker_window').val()+" "+$('#timepicker_window').val());
        }
    });
    $('#datepicker_room').datepicker({
        onClose:function () {
            $('#datepicker_room').parent().toggleClass('active');
            calculate.find('.content_tab_1_right .date_time').text($('#datepicker_room').val()+" "+$('#timepicker_room').val());
        }
    });
    $('#datepicker_window,#datepicker_room').click(function () {
        $(this).parent().toggleClass('active');
    });
    $('#timepicker_window').selectize({
        onChange: function() {
            calculate.find('.content_tab_2_right .date_time').text($('#datepicker_window').val()+" "+$('#timepicker_window').val());
        }
    });
    $('#timepicker_room').selectize({
        onChange: function() {
            calculate.find('.content_tab_1_right .date_time').text($('#datepicker_room').val()+" "+$('#timepicker_room').val());
        }
    });
    $('#timepicker_room-selectized').attr('readonly',true);
    $('#timepicker_window-selectized').attr('readonly',true);
    calculate.find('.content_tab_1_right .date_time').text($('#datepicker_room').val()+" "+$('#timepicker_room').val());
    calculate.find('.content_tab_2_right .date_time').text($('#datepicker_window').val()+" "+$('#timepicker_window').val());
    calculate.find('.tabs .tab').click(function () {
        $(this).parent().find('.tab').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('tab_1')){
            calculate.find('.content_tab_1_right').show();
            calculate.find('.content_tab_1_left').show();
            calculate.find('.content_tab_2_right').hide();
            calculate.find('.content_tab_2_left').hide();
        }
        else{
            calculate.find('.content_tab_2_right').show();
            calculate.find('.content_tab_2_left').show();
            calculate.find('.content_tab_1_right').hide();
            calculate.find('.content_tab_1_left').hide();
        }
    });
    calculate.find('.payment_methods .method').click(function () {
        $(this).parent().find('.method').removeClass('active');
        $(this).addClass('active');
        if ($(this).parent().parent().hasClass('content_tab_1_left')){
            if ($(this).hasClass('cash')){
                calculate.find('.content_tab_1_right .pay_method').text('наличными');
            }
            if ($(this).hasClass('card')){
                calculate.find('.content_tab_1_right .pay_method').text('картой');
            }
        }
        if ($(this).parent().parent().hasClass('content_tab_2_left')){
            if ($(this).hasClass('cash')){
                calculate.find('.content_tab_2_right .pay_method').text('наличными');
            }
            if ($(this).hasClass('card')){
                calculate.find('.content_tab_2_right .pay_method').text('картой');
            }
        }

    });
    calculate.find('.calc_frequency_harvesting div').click(function () {
        $(this).parent().find('div').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('one_week')){
            calculate.find('.content_tab_1_right .regularity').text('1 раз в неделю');
            sale = 0.15;
        }
        if ($(this).hasClass('one_2_week')){
            calculate.find('.content_tab_1_right .regularity').text('раз в 2 недели');
            sale = 0.10;
        }
        if ($(this).hasClass('one_month')){
            calculate.find('.content_tab_1_right .regularity').text('раз в месяц');
            sale = 0.05;
        }
        if ($(this).hasClass('one_times')){
            calculate.find('.content_tab_1_right .regularity').text('1 раз');
            sale = 0;
        }
        calculate.find('.content_tab_1_right .to_pay .val').text(resale(basepay_r).toFixed(2).replace('.',','));
    });
    //Уменьшение
    calculate.find('.remove').click(function () {
        var count = +$(this).parent().find('.res .val').text();
        if (count==1){
            return
        }
        count --;
        $(this).parent().find('.res .val').text(count);
        if ($(this).parent().hasClass('calc_room')){
            if (count==1){
                $(this).parent().find('.res .txt').text('комната');
                calculate.find('.content_tab_1_right h3 .room_txt').text('жилой');
            }
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('комнаты');
                calculate.find('.content_tab_1_right h3 .room_txt').text('жилыми');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('комнат');
                calculate.find('.content_tab_1_right h3 .room_txt').text('жилыми');
            }
            calculate.find('.content_tab_1_right h3 .room').text(count);
        }
        if ($(this).parent().hasClass('calc_bathroom')){
            if (count==1){
                $(this).parent().find('.res .txt').text('санузел');
                calculate.find('.content_tab_1_right h3 .bathroom_txt').text('ванной');
            }
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('санузла');
                calculate.find('.content_tab_1_right h3 .bathroom_txt').text('ваннами');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('санузлов');
                calculate.find('.content_tab_1_right h3 .bathroom_txt').text('ваннами');
            }
            calculate.find('.content_tab_1_right h3 .bathroom').text(count);
        }
        if ($(this).parent().parent().hasClass('calc_window')){
            if (count==1){
                $(this).parent().find('.res .txt').text('окно');
            }
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('окна');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('окон');
            }
            calculate.find('.content_tab_1_right h3 .bathroom').text(count);
        }
        if ($(this).parent().parent().hasClass('calc_room_bathroom')){
            var count_room =  +$(this).closest('.calc_room_bathroom').find('.calc_room .val').text() ,
                count_bathroom = +$(this).closest('.calc_room_bathroom').find('.calc_bathroom .val').text();
            calculate.find('.content_tab_1_right .time_val').text((count_room+count_bathroom).toFixed(2));
            if (count_room+count_bathroom>1 && count_room+count_bathroom<5){
                calculate.find('.content_tab_1_right .time_txt').text('часа');
            }
            if (count_room+count_bathroom>4){
                calculate.find('.content_tab_1_right .time_txt').text('часов');
            }
            basepay_r -= $(this).parent().hasClass('calc_room') ? price_room : price_bathroom;
            calculate.find('.content_tab_1_right .to_pay .val').text(resale(basepay_r).toFixed(2).replace('.',','));
            if (String(basepay_r).length == 3){
                calculate.find('.content_tab_1_right .to_pay .txt').text('рублей');
            }
            else{
                var lastnumberpay = +String(basepay_r).substr(String(basepay_r).length-1,1);
                if (lastnumberpay == 0 || lastnumberpay > 4){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рублей');
                }
                if (lastnumberpay == 1){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рубль');
                }
                if (lastnumberpay > 1 && lastnumberpay < 5){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рубля');
                }
            }
        }
        if ($(this).parent().parent().hasClass('calc_window')){
            var count_room = +$(this).closest('.calc_window').find('.calc_room .val').text();
            calculate.find('.content_tab_2_right .time_val').text((count_room).toFixed(2));
            if (count_room==1){
                calculate.find('.content_tab_2_right .time_txt').text('час');
            }
            if (count_room>1 && count_room<5){
                calculate.find('.content_tab_2_right .time_txt').text('часа');
            }
            if (count_room>4){
                calculate.find('.content_tab_2_right .time_txt').text('часов');
            }
            basepay_w-=price_window;
            calculate.find('.content_tab_2_right .to_pay .val').text(basepay_w.toFixed(2).replace('.',','));
            if (String(basepay_w).length == 3){
                calculate.find('.content_tab_2_right .to_pay .txt').text('рублей');
            }
            else {
                var lastnumberpay = +String(basepay_w).substr(String(basepay_w).length - 1, 1);
                if (lastnumberpay == 0 || lastnumberpay > 4) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рублей');
                }
                if (lastnumberpay == 1) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рубль');
                }
                if (lastnumberpay > 1 && lastnumberpay < 5) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рубля');
                }
            }
        }
    });
    // Добавление
    calculate.find('.add').click(function () {
        var count = +$(this).parent().find('.res .val').text();
        count ++;
        $(this).parent().find('.res .val').text(count);
        if ($(this).parent().hasClass('calc_room') && $(this).parent().parent().hasClass('calc_room_bathroom')){
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('комнаты');
                calculate.find('.content_tab_1_right h3 .room_txt').text('жилыми');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('комнат');
                calculate.find('.content_tab_1_right h3 .room_txt').text('жилыми');
            }
            calculate.find('.content_tab_1_right h3 .room').text(count);
        }
        if ($(this).parent().hasClass('calc_bathroom')){
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('санузла');
                calculate.find('.content_tab_1_right h3 .bathroom_txt').text('ваннами');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('санузлов');
                calculate.find('.content_tab_1_right h3 .bathroom_txt').text('ваннами');
            }
            calculate.find('.content_tab_1_right h3 .bathroom').text(count);
        }
        if ($(this).parent().parent().hasClass('calc_window')){
            if (count==1){
                $(this).parent().find('.res .txt').text('окно');
            }
            if (count>1 && count<5){
                $(this).parent().find('.res .txt').text('окна');
            }
            if (count>4){
                $(this).parent().find('.res .txt').text('окон');
            }
            calculate.find('.content_tab_1_right h3 .bathroom').text(count);
        }
        if ($(this).parent().parent().hasClass('calc_room_bathroom')){
            var count_room =  +$(this).closest('.calc_room_bathroom').find('.calc_room .val').text() ,
                count_bathroom = +$(this).closest('.calc_room_bathroom').find('.calc_bathroom .val').text();
            calculate.find('.content_tab_1_right .time_val').text((count_room+count_bathroom).toFixed(2));
            if (count_room+count_bathroom>1 && count_room+count_bathroom<5){
                calculate.find('.content_tab_1_right .time_txt').text('часа');
            }
            if (count_room+count_bathroom>4){
                calculate.find('.content_tab_1_right .time_txt').text('часов');
            }
            basepay_r += $(this).parent().hasClass('calc_room') ? price_room : price_bathroom;
            calculate.find('.content_tab_1_right .to_pay .val').text(resale(basepay_r).toFixed(2).replace('.',','));
            if (String(basepay_r).length == 3){
                calculate.find('.content_tab_1_right .to_pay .txt').text('рублей');
            }
            else{
                var lastnumberpay = +String(basepay_r).substr(String(basepay_r).length-1,1);
                if (lastnumberpay == 0 || lastnumberpay > 4){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рублей');
                }
                if (lastnumberpay == 1){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рубль');
                }
                if (lastnumberpay > 1 && lastnumberpay < 5){
                    calculate.find('.content_tab_1_right .to_pay .txt').text('рубля');
                }
            }
        }
        if ($(this).parent().parent().hasClass('calc_window')){
            var count_room = +$(this).closest('.calc_window').find('.calc_room .val').text();
            calculate.find('.content_tab_2_right .time_val').text((count_room).toFixed(2));
            if (count_room==1){
                calculate.find('.content_tab_2_right .time_txt').text('час');
            }
            if (count_room>1 && count_room<5){
                calculate.find('.content_tab_2_right .time_txt').text('часа');
            }
            if (count_room>4){
                calculate.find('.content_tab_2_right .time_txt').text('часов');
            }
            basepay_w+=price_window;
            calculate.find('.content_tab_2_right .to_pay .val').text(basepay_w.toFixed(2).replace('.',','));
            if (String(basepay_w).length == 3){
                calculate.find('.content_tab_2_right .to_pay .txt').text('рублей');
            }
            else {
                var lastnumberpay = +String(basepay_w).substr(String(basepay_w).length - 1, 1);
                if (lastnumberpay == 0 || lastnumberpay > 4) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рублей');
                }
                if (lastnumberpay == 1) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рубль');
                }
                if (lastnumberpay > 1 && lastnumberpay < 5) {
                    calculate.find('.content_tab_2_right .to_pay .txt').text('рубля');
                }
            }
        }
    });
    // Скидка калькулятора
    function resale(summ) {
        return summ-summ*sale;
    }
    $('.modal').click(function(event){
        event.preventDefault();
        $($(this).attr('href')).fadeIn('slow');
        $($(this).attr('href')).css('display','flex');
        if ($(this).attr('href')=='#form_prevorder'){
          var form = $($(this).attr('href')).find('form');
            form.find("[name='worktype']").val($(this).parent().parent().find('h3 .h3').text());
            form.find("[name='worktime']").val($(this).parent().parent().find('.time_val').text()!= "" ? $(this).parent().parent().find('.time_val').text()+" "+$(this).parent().parent().find('.time_txt').text() : null);
            form.find("[name='workdate']").val($(this).parent().parent().find('.date_time').text());
            form.find("[name='workregular']").val($(this).parent().parent().find('.regularity').text());
            form.find("[name='workpaymethod']").val($(this).parent().parent().find('.pay_method').text());
            form.find("[name='worktopay']").val($(this).parent().parent().find('.to_pay .val').text()!= "" ? $(this).parent().parent().find('.to_pay .val').text()+" "+$(this).parent().parent().find('.to_pay .txt').text(): null);
        }
    });
    $('.modal_window .close').click(function () {
        $(this).closest('.modal_window').fadeOut('fast');
    });
    $('.btn_collapse').click(function () {
        $('ul.menu').slideToggle();
    });
    $('section.our_services .content h3').click(function(){
        if($(window).width()<768){
            $(this).next('.wrap_collapse').slideToggle();
            $(this).toggleClass('active');
        }
    });
    if ($(window).width()<768){
        $('section.banner_1').insertAfter('.our_services');
    }
    $('.menu li a').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top-$('header').height()
        }, 1000);
    });
    $("input[type='tel']").mask("+375(99) 999-99-99");
});