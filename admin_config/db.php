<?php
declare(strict_types=1);

function get_env(string $key, ?string $default = null): ?string {
    $val = getenv($key);
    return $val === false ? $default : $val;
}

/**
 * Returns a shared PDO instance (MySQL, utf8mb4).
 */
function get_pdo(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $host = get_env('DB_HOST', '127.0.0.1');
    $port = get_env('DB_PORT', '3306');
    $db   = get_env('DB_NAME', 'app_db');
    $user = get_env('DB_USER', 'app_user');
    $pass = get_env('DB_PASS', 'app_password');
    $dsn  = "mysql:host={$host};port={$port};dbname={$db};charset=utf8mb4";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);
    return $pdo;
}

