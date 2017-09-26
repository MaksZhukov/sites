

$(document).ready(function() {

    var active=false;
    var mainimg=0;
    var marginleftmainimg=0;
    var img =0;
    var sizeh2 =0;
    var sizep =0;
    var widthp=0;
var width = $(window).width();
        if (width < 960) {
        mainimg = 358* (width/960);
        img = 218 * (width/960);
        sizep = 18 * (width/960);
        sizeh2=48 * (width/960);
        widthp=512 * (width/960);
        $('.slider .main-img img').css('width',mainimg+'px');
        $('.slider .main-img').css('margin-left',marginleftmainimg+'px');
        $('.slider .info img').css('width',img+'px');
         $('.slider .info h2').css('font-size',sizeh2+'px');
        $('.slider .info p').css('font-size',sizep+'px');
        $('.slider .info p').css('width',widthp+'px');
      }
    $(window).resize(function() {
            var width = $(window).width();
    if (width < 960) {
        mainimg = 358* (width/960);
        img = 218 * (width/960);
        sizep = 18 * (width/960);
        sizeh2=48 * (width/960);
        widthp=512 * (width/960);
        $('.slider .main-img img').css('width',mainimg+'px');
        $('.slider .main-img').css('margin-left',marginleftmainimg+'px');
        $('.slider .info img').css('width',img+'px');
         $('.slider .info h2').css('font-size',sizeh2+'px');
        $('.slider .info p').css('font-size',sizep+'px');
        $('.slider .info p').css('width',widthp+'px');
      } else {
        mainimg = 358
        img = 218
        sizep = 18
        sizeh2=48
        widthp=512
        $('.slider .main-img img').css('width',mainimg+'px');
        $('.slider .main-img').css('margin-left',marginleftmainimg+'px');
        $('.slider .info img').css('width',img+'px');
         $('.slider .info h2').css('font-size',sizeh2+'px');
        $('.slider .info p').css('font-size',sizep+'px');
        $('.slider .info p').css('width',widthp+'px');
      }
    });


    $('.responsive .btn').click(function() {
            active=!active;
            if (active){
               $('.responsive .responsive-menu').slideDown(500);;


            }
            else {
                  $('.responsive .responsive-menu').slideUp(1000);
            }
        
    });

});