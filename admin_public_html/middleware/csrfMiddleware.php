<?php
declare(strict_types=1);
require_once __DIR__ . '/../../admin_config/security.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ok = verify_csrf_token($_POST['csrf_token'] ?? null);
    if (!$ok) {
        http_response_code(400);
        echo 'Invalid CSRF token';
        exit;
    }
}

