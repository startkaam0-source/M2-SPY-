<?php
declare(strict_types=1);
require_once __DIR__ . '/../../utils.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_user_csrf($_POST['csrf_token'] ?? null)) {
        http_response_code(400);
        echo 'Invalid CSRF token';
        exit;
    }
}

