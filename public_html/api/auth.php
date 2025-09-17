<?php
declare(strict_types=1);
require_once __DIR__ . '/../utils.php';

$action = $_GET['action'] ?? 'login';

if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_out(['ok'=>false,'error'=>'Method not allowed'],405);
    }
    if (!verify_user_csrf($_POST['csrf_token'] ?? null)) {
        json_out(['ok'=>false,'error'=>'Invalid CSRF token'],400);
    }
    $email = strtolower(trim((string)($_POST['email'] ?? '')));
    $password = (string)($_POST['password'] ?? '');
    if ($email === '' || $password === '') {
        json_out(['ok'=>false,'error'=>'Missing credentials'],400);
    }
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    $_SESSION['user_id'] = 1; // stub
    json_out(['ok'=>true,'redirect'=>'/public_html/app.php']);
} elseif ($action === 'logout') {
    if (session_status() === PHP_SESSION_NONE) { session_start(); }
    session_unset();
    session_destroy();
    header('Location: /public_html/index.php');
    exit;
} else {
    json_out(['ok'=>false,'error'=>'Unknown action'],400);
}

