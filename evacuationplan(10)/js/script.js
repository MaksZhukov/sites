$(document).ready(function () {
    $('select').selectize({
        create: true,
        sortField: 'text'
    });

    $.fancybox.defaults.animationEffect = "fade";
    $("[data-fancybox]").fancybox({
        animationEffect: 'zoom',
        buttons:[
            'close'
        ]
    });

    $(".order_btn a").fancybox();
    $("#f_contact").submit(function(){ return false; });
    $("#f_send").on("click", function(){
        $("#f_contact").fadeOut("fast", function(){
            $(this).before("<p><strong>Ваше сообщение отправлено!</strong></p>");
            setTimeout("$.fancybox.close()", 5000);
        });
    });
})