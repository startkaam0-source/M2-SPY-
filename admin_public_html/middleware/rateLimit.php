<?php
declare(strict_types=1);
require_once __DIR__ . '/../../admin_config/utils.php';
$endpointKey = $_SERVER['REQUEST_METHOD'] . ':' . ($_SERVER['REQUEST_URI'] ?? '/');
if (!simple_rate_limit($endpointKey, 120)) {
    http_response_code(429);
    echo 'Too Many Requests';
    exit;
}

