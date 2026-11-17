<?php
// HTTPS -> mail relay for the contact form.
//
// Render's free plan blocks outbound SMTP ports, so the backend POSTs the message
// here and this script sends it from Xserver. The recipient is fixed in the config
// file: this endpoint can only ever send mail to the site admin.
//
// Setup: upload this file to a public_html directory together with
// contact_mail_config.php (a copy of contact_mail_config.sample.php with real values).

declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

function respond(int $status, string $message): void
{
    http_response_code($status);
    echo json_encode(['message' => $message]);
    exit;
}

$config = require __DIR__ . '/contact_mail_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'method not allowed');
}

$token = $_SERVER['HTTP_X_RELAY_TOKEN'] ?? '';
if (strlen($config['token']) < 32 || !hash_equals($config['token'], $token)) {
    respond(403, 'forbidden');
}

$input = json_decode((string) file_get_contents('php://input'), true);
$subject = $input['subject'] ?? null;
$body = $input['body'] ?? null;
$replyTo = $input['reply_to'] ?? null;
if (!is_string($subject) || !is_string($body) || $subject === '' || $body === '') {
    respond(400, 'subject and body are required');
}

// header values must stay on one line (prevents header injection)
$subject = trim((string) preg_replace('/[\r\n]+/', ' ', $subject));
$headers = ['From' => $config['from']];
if (is_string($replyTo) && filter_var($replyTo, FILTER_VALIDATE_EMAIL) !== false) {
    // lets the admin answer the sender with a plain "reply"
    $headers['Reply-To'] = $replyTo;
}

mb_language('uni');
mb_internal_encoding('UTF-8');
if (!mb_send_mail($config['to'], $subject, $body, $headers, '-f' . $config['from'])) {
    respond(500, 'failed to send mail');
}

respond(200, 'sent');
