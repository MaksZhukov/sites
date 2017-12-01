<?
$text = $_POST['text'];

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: evacuationplan <no-reply@evacuationplan>' . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8 \r\n"; 

$title = "Сообщение с сайта evacuationplan";
mail("yourmail", $title, $text, $headers, "-f <no-reply@evacuationplan>" );
?>