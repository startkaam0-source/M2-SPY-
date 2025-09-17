<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Simple HTTPS enforcement helper
 */
function require_https(): void {
    if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
        return;
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
        return;
    }
    // Intentionally not forcing redirect automatically to avoid proxy loops.
}

/**
 * CSRF token utilities
 */
function get_csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function verify_csrf_token(?string $token): bool {
    if (empty($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Basic sanitization
 */
function sanitize_string(string $value): string {
    return trim(filter_var($value, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES));
}

/**
 * Require admin login
 */
function require_admin_login(): void {
    if (empty($_SESSION['admin_id'])) {
        header('Location: /admin_public_html/login.php');
        exit;
    }
}

/**
 * Role check: expects $_SESSION['admin_role'] string
 */
function require_role(array $allowedRoles): void {
    $role = $_SESSION['admin_role'] ?? null;
    if ($role === null || !in_array($role, $allowedRoles, true)) {
        http_response_code(403);
        echo 'Forbidden';
        exit;
    }
}

