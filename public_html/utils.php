<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function user_csrf_token(): string {
    if (empty($_SESSION['user_csrf'])) {
        $_SESSION['user_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['user_csrf'];
}

function verify_user_csrf(?string $token): bool {
    if (empty($_SESSION['user_csrf']) || empty($token)) return false;
    return hash_equals($_SESSION['user_csrf'], (string)$token);
}

function json_out(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

