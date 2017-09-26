 $(document).ready(function() {

     $('body').append('<div class="button-up" style="display: none;opacity: 0.5;position: fixed;right:10px;top: 92%;cursor: pointer;text-align: center;line-height: 40px;color: #000000;"><i class="fa fa-arrow-circle-up fa-3x"></i></div>');

     $(window).scroll(function() {
         if ($(this).scrollTop() > 300) {
             $('.button-up').fadeIn();
         } else {
             $('.button-up').fadeOut();
         }
     });

     $('.button-up').click(function() {
         $('body,html').animate({
             scrollTop: 0
         }, 500);
         return false;
     });

     $('.button-up').hover(function() {
         $(this).animate({
             'opacity': '1',
         });
     }, function() {
         $(this).animate({
             'opacity': '0.5'
         });
     });

 });



 $(document).ready(function() {
     $("#responsive-menu").on("click", "a", function(event) {
         //отменяем стандартную обработку нажатия по ссылке
         event.preventDefault();

         //забираем идентификатор бока с атрибута href
         var id = $(this).attr('href'),

             //узнаем высоту от начала страницы до блока на который ссылается якорь
             top = $(id).offset().top;
         11
         //анимируем переход на расстояние - top за 1500 мс
         $('body,html').animate({ scrollTop: top }, 1500);
     });
 });
