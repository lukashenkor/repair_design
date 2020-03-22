<?php

use PHPMailer\PHPMailer\PHPMailer;

$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];
$userPhone = $_POST['userPhone'];
$userQuestion = $_POST['userQuestion'];


// Load Composer's autoloader
require 'phpmailer/Exception.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/PHPMailer.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
  //Server settings
  $mail->SMTPDebug = 0;                      // Enable verbose debug output
  $mail->isSMTP();                                            // Send using SMTP
  $mail->Host = "smtp.gmail.com";                    // Set the SMTP server to send through
  $mail->SMTPAuth = true;                                   // Enable SMTP authentication
  $mail->Username = "mail.sender.322@gmail.com";                     // SMTP username
  $mail->Password = "john8457165_3";                               // SMTP password
  $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
  $mail->Port = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` aboveindex.html

  //Recipients
  $mail->setFrom('mail.sender.322@gmail.com', 'Roman');
  $mail->addAddress('ramosss1997@gmail.com', 'Stanislaw');

  // Content
  $mail->isHTML(true);                                  // Set email format to HTML
  $mail->Subject = 'New zayavochka';
  if ($userQuestion != '') {
    $mail->Body = "Имя пользователя: ${userName}, его телефон: ${userPhone},\nВопрос: ${userQuestion}";
  } else {
    $mail->Body = "Имя пользователя: ${userName}, его телефон: ${userPhone}, его почта: ${userEmail}";
  }
  if ($mail->send()) {
    echo "ok";
  } else {
    echo "Письмо не отправлено. Вот такая ошибка: {$mail->ErrorInfo}";
  }

} catch (Exception $e) {
  echo "Письмо не отправлено. Вот такая ошибка: {$mail->ErrorInfo}";
}



