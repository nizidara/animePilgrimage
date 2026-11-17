<?php
// Copy this file to contact_mail_config.php on the server and fill in the values.
// The real file holds a secret: never commit it.
return [
    // shared secret, 32+ random characters; must equal MAIL_RELAY_TOKEN on Render
    'token' => '',
    // where contact notifications are delivered
    'to' => 'admin@example.com',
    // sender address: a mailbox that exists on this Xserver account
    'from' => 'noreply@example.com',
];
