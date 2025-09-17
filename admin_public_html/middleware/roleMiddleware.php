<?php
declare(strict_types=1);
require_once __DIR__ . '/../../admin_config/security.php';
function require_roles(array $roles): void {
    require_role($roles);
}

