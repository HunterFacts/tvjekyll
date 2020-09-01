<?php 
// Файлы phpmailer
require 'class.phpmailer.php';
require 'class.smtp.php';

/* Проверка на время (в разработки);
if ($_SESSION["date"] != null){
	if ($_SESSION["date"] > date('d.m.Y H:i:s')){
		echo "Вы уже отправляли сообщение";
		exit;
	}
}*/

$mailBody = trim(htmlspecialchars($_POST['mailBody']));
// $name = trim(htmlspecialchars($_POST['name']));
// $number = trim(htmlspecialchars($_POST['number']));

// Настройки
$mail = new PHPMailer;
/* Защищенное соединение (в разработке)
$mail->SMTPDebug = 2;
$mail->Host = 'smtp.ics.perm.ru';
$mail->SMTPAuth = true;
$mail->Username = 'rhVM3TdCBfQ';
$mail->Password = '7e14bh1s6Ag';
$mail->SMTPSecure = 'tls';
$mail->Port = 25;
*/
$mail->CharSet = 'UTF-8';
$mail->isSMTP();
$mail->Host = 'smtp.ics.perm.ru';
$mail->setFrom('t-mobis@ics.perm.ru', 'T-mobis'); // Ваш Email

//Список получателей
$mail->addAddress('belova@proinfoservice.ru');
$mail->addAddress('ezakharov@ics.perm.ru');

// Прикрепление файлов
if (isset($_FILES['file'])){
    $mail->AddAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
}

// Письмо
$mail->isHTML(true);
$mail->Subject = "Заявка с сайта Т-мобис"; // Заголовок письма

// Текст письма
$mail->Body = $mailBody; 

echo $mail;

// Результат
if(!$mail->send()) 
{
    echo 'Ошибка при отправке письма, обратитесь в сервисный центр.';
    
    /* Проверка на время (опционально);
    $_SESSION["date"] = echo date('d.m.Y H:i:s', strtotime("+1 hours"));
    */
    
    /* Вывод ошибки (для отладки)
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    */
} 
else 
{
    echo 'Ваше письмо было отправлено';
}
?>
