$(document).ready(function() {
    var active = false;
    var activel = null;
    var index = 0;
    var mass = $('.custom-select');
    $('.custom-select').click(function() {
        for (var i = 0; i < $(mass).length; i++) {
            if (mass[i] == this) {
                index = i;
            }
        }
        activel = $(mass[index]).find('.option.active');
        if (!active) {
            $(mass[index]).find('.option').slideDown(500);
            active = !active;
        } else {
            $(mass[index]).find('.option:not(.active)').slideUp(500);
            active = !active;
        }
    });
    $('.custom-select .option:not(.active)').click(function() {
        var txt = $(activel).text();
        $(activel).text($(this).text());
        $(this).text(txt);
        $(mass[index]).find('.option:not(.active)').slideUp(500);
    });
});