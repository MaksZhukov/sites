$(document).ready(function() {
    new WOW().init();
    var activel = $('.contacts button');
    var activelreverse = null;
    var mass = $('.contacts .dropdown .dropdown-menu li');
    $('.contacts .dropdown .dropdown-menu li a').click(function() {
        activelreverse = activel.html();
        activel.html($(this).html());
        $(this).html(activelreverse);

    });
    $('#gridsale').masonry({
        columnWidth: '.saleitem-2',

    })
});