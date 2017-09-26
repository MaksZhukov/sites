$(document).ready(function() {
    //First-slider

    $('#slider-points .points .point').click(function(event) {
        $('.points .point').removeClass('active');
        $(this).addClass('active');
        $('#slider .slide.active').removeClass('active');
        $('#slider .slide').eq($(this).index()).addClass('active');
    });



    //Two-slider

    countslides = $('#slider-arrow .slide-arrow').size();
    indexactive = $('#slider-arrow .slide-arrow.active').index();
    $('#slider-arrow .arrows .left').click(function(event) {
        if (indexactive == 0) {
            $('#slider-arrow .slide-arrow').eq(indexactive).removeClass('active');
            $('#slider-arrow .slide-arrow').eq(countslides - 1).addClass('active');
            indexactive = 2;
        } else {
            $('#slider-arrow .slide-arrow').eq(indexactive).removeClass('active');
            $('#slider-arrow .slide-arrow').eq(indexactive - 1).addClass('active');
            indexactive -= 1;
        }
    });
    $('#slider-arrow .arrows .right').click(function(event) {
        if (indexactive == 2) {
            $('#slider-arrow .slide-arrow').eq(indexactive).removeClass('active');
            $('#slider-arrow .slide-arrow').eq(0).addClass('active');
            indexactive = 0;
        } else {
            $('#slider-arrow .slide-arrow').eq(indexactive).removeClass('active');
            $('#slider-arrow .slide-arrow').eq(indexactive + 1).addClass('active');
            indexactive += 1;
        }
    });
});