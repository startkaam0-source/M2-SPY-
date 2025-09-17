<?php
declare(strict_types=1);
require_once __DIR__ . '/../../admin_config/db.php';
require_once __DIR__ . '/../../admin_config/security.php';
require_once __DIR__ . '/../../admin_config/utils.php';

$action = $_GET['action'] ?? 'login';

if ($action === 'login') {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        json_response(['ok' => false, 'error' => 'Method not allowed'], 405);
    }
    if (!verify_csrf_token($_POST['csrf_token'] ?? null)) {
        json_response(['ok' => false, 'error' => 'Invalid CSRF token'], 400);
    }
    $email = strtolower(trim((string)($_POST['email'] ?? '')));
    $password = (string)($_POST['password'] ?? '');

    if ($email === '' || $password === '') {
        json_response(['ok' => false, 'error' => 'Missing credentials'], 400);
    }

    $pdo = get_pdo();
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role FROM admins WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $admin = $stmt->fetch();

    if (!$admin || !password_verify($password, $admin['password_hash'])) {
        json_response(['ok' => false, 'error' => 'Invalid email or password'], 401);
    }

    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    $_SESSION['admin_id']   = (int)$admin['id'];
    $_SESSION['admin_name'] = (string)$admin['name'];
    $_SESSION['admin_role'] = (string)$admin['role'];

    json_response(['ok' => true, 'redirect' => '/admin_public_html/dashboard.php']);
} elseif ($action === 'logout') {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    session_unset();
    session_destroy();
    header('Location: /admin_public_html/login.php');
    exit;
} else {
    json_response(['ok' => false, 'error' => 'Unknown action'], 400);
}

