 $(document).ready(initMailScripts);

function initMailScripts(){
    $("form").submit(function(){
        return false;
    });
    var mailUrl = "../mail.php";
    var successMessage = "<p>Спасибо за заявку, менеджер с вами свяжется.</p>";
    var errorMessage = "<p>Системная ошибка, попробуйте позже или позвоните нам по телефону: +375293817399.</p>";
    // 
    $("input[type='submit']").click(function(){
        var form = $(this).parents("form");             
        var type = form.attr("data-form-type");
        var phone = form.find("[name='phone']").val();
        var name = form.find("[name='name']").val();
        var email = form.find("[name='email']").val();
        var typeproduct = form.find("[name='type_product']").val();
        var message = form.find("[name='message']").val();
        var text = "<strong>Запрос:</strong> " + type + " с сайта anfracs<br>" +
                   "<strong>Телефон:</strong> " + phone + "<br>";

		if (message)
        {
            text = text + "<strong>Сообщение:</strong> " + message + "<br>";
        }

        if (email)
        {
            text = text + "<strong>Почта:</strong> " + email + "<br>";
        }
        if (name)
        {
            text = text + "<strong>Имя:</strong> " + name + "<br>";
        }
        if (typeproduct)
        {
            text = text + "<strong>Тип изделия:</strong> " + typeproduct + "<br>";
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