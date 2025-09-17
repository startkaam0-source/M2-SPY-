<?php
declare(strict_types=1);
if (session_status() === PHP_SESSION_NONE) { session_start(); }
$key = ($_SERVER['REQUEST_METHOD'] ?? 'GET') . ':' . ($_SERVER['REQUEST_URI'] ?? '/');
$bucket = 'u_rl_' . md5($key . date('YmdHi'));
$_SESSION[$bucket] = ($_SESSION[$bucket] ?? 0) + 1;
if ($_SESSION[$bucket] > 120) {
    http_response_code(429);
    echo 'Too Many Requests';
    exit;
}

