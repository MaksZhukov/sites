$(document).ready(function() {
    var widthslide = 0;
    var widtharrow = 0;
    var marginnext = 0;
    var marginprev = 0;
    var paddingslide = 0;
    var width = $(window).width();
    if (width < 965) {

        widthslide = 118 * width / 800;
        widtharrow = 16 * width / 800;
        marginnext = 14 * width / 965;
        marginprev = 14 * width / 965;
        paddingslide = 6 * width / 800;
        $('#carousel .slide').css({ 'width': widthslide + 'px', 'padding': paddingslide + 'px' });
        $('#carousel .arrow').css('width', widtharrow + 'px');
        $('#carousel #next').css('margin-left', marginnext + 'px');
        $('#carousel #prev').css('margin-right', marginprev + 'px');

    }
    $(window).resize(function() {
        var width = $(window).width();
        if (width < 965) {
            widthslide = 118 * width / 800;
            widtharrow = 16 * width / 800;
            marginnext = 14 * width / 965;
            marginprev = 14 * width / 965;
            paddingslide = 6 * width / 800;
            $('#carousel .slide').css({ 'width': widthslide + 'px', 'padding': paddingslide + 'px' });
            $('#carousel .arrow').css('width', widtharrow + 'px');
            $('#carousel #next').css('margin-left', marginnext + 'px');
            $('#carousel #prev').css('margin-right', marginprev + 'px');
        } else {
            $('#carousel .slide').css({ 'width': '118px', 'padding': '6px' });
            $('#carousel .arrow').css('width', '15px');
            $('#carousel #next').css('margin-left', '14px');
            $('#carousel #prev').css('margin-right', '14px');
        }
    });

});