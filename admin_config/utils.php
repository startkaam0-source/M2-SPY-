<?php
declare(strict_types=1);

/**
 * JSON response helper
 */
function json_response(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Very basic in-memory rate limit by session and endpoint
 */
function simple_rate_limit(string $key, int $maxPerMinute = 60): bool {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $bucketKey = "rl_" . $key . "_" . date('YmdHi');
    $_SESSION[$bucketKey] = ($_SESSION[$bucketKey] ?? 0) + 1;
    return $_SESSION[$bucketKey] <= $maxPerMinute;
}

