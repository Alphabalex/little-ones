<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $name = $_POST['name'];
   $email = $_POST['email'];
   $subject = $_POST['subject'];
   $message = $_POST['message'];

   $to = 'info@beckwin.org';
   $headers = "From: " . $email . "\r\n";
   $headers .= "Reply-To: " . $email . "\r\n";
   $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

   $body = "<h2>Contact Request</h2>
            <p><strong>Name:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Subject:</strong> {$subject}</p>
            <p><strong>Message:</strong><br>{$message}</p>";

   if (mail($to, $subject, $body, $headers)) {
      echo 'Your message has been sent successfully!';
   } else {
      echo 'There was an error sending your message. Please try again later.';
   }
}
?>
