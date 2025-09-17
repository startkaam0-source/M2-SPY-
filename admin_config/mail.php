<?php
declare(strict_types=1);

/**
 * Minimal SMTP mail stub. Replace with PHPMailer or Symfony Mailer in production.
 */
function send_mail(string $toEmail, string $subject, string $htmlBody): bool {
    // Stub: integrate a proper mailer here. For now, return true to simulate success.
    return true;
}

