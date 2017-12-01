 $(document).ready(initMailScripts);

function initMailScripts(){
    $("form").submit(function(){
        return false;
    });
    var mailUrl = "./mail.php";
    var successMessage = "<p>Спасибо за заявку, менеджер с вами свяжется.</p>";
    var errorMessage = "<p>Системная ошибка, попробуйте позже или позвоните нам по телефону: +375293817399.</p>";
    // 
    $("input[type='submit']").click(function(){
        var form = $(this).parents("form");             
        var type = form.attr("data-form-type");
        var phone = form.find("[name='phone']").val();
        var name = form.find("[name='name']").val();
        var etag = form.find("[name='etag']").val();
        var size = form.find("[name='size']").val();
        var message = form.find("[name='message']").val();
        var text = "<strong>Запрос:</strong> " + type + " с сайта evacuationplan<br>" +
                   "<strong>Телефон:</strong> " + phone + "<br>";

		if (message)
        {
            text = text + "<strong>Сообщение:</strong> " + message + "<br>";
        }

        if (size)
        {
            text = text + "<strong>Размер:</strong> " + size + "<br>";
        }
        if (name)
        {
            text = text + "<strong>Имя:</strong> " + name + "<br>";
        }
        if (etag)
        {
            text = text + "<strong>Количество этажей:</strong> " + etag + "<br>";
        }

        if(!phone)
        {
        	alert("Укажите телефон");
        	return false;
        }

        $.post(mailUrl,{text:text})
        .done(function(res){
            form.fadeOut(200);
            setTimeout(function(){
                form.html(successMessage);
                form.fadeIn(200);
            },200);
        })
        .fail(function(res){
            form.fadeOut(200);
            setTimeout(function(){
                form.fadeIn(200);
                form.html(errorMessage);
            },200);
        });
        return false;
    });
}