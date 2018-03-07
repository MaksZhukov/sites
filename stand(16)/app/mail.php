<?
$text = '';
$type = $_POST['form_type'];
$phone = $_POST['phone'];
$name = $_POST['name'];
$message = $_POST['message'];
$text = "<strong>Запрос:</strong> " . $type . " с сайта evacuationplan<br>" .
    "<strong>Телефон:</strong> " . $phone . "<br>";
if ($name)
{
    $text .="<strong>Имя:</strong> " . $name . "<br>";
}


$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$title = "Сообщение с сайта план-эвакуации.бел";
mail("sudm.nefox@gmail.com", $title, $text, $headers);
header("Location: http://план-эвакуации.бел/thanks.html"); /* Redirect browser */
?>
