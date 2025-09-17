<?php
declare(strict_types=1);

/**
 * Firebase configuration stub for push notifications.
 */
function get_firebase_server_key(): ?string {
    $key = getenv('FIREBASE_SERVER_KEY');
    return $key === false ? null : $key;
}

function send_fcm_message(array $tokens, array $payload): bool {
    // Stub: Implement HTTP call to FCM here
    return true;
}

