<?php
declare(strict_types=1);
require_once __DIR__ . '/../admin_config/security.php';
$csrf = get_csrf_token();
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Admin Login</title>
<link rel="stylesheet" href="/admin_public_html/assets/styles.css" />
</head>
<body class="bg">
  <div class="auth-container">
    <div class="card">
      <h1 class="title">Admin Login</h1>
      <form method="post" action="/admin_public_html/admin_api/auth.php?action=login" class="form">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf, ENT_QUOTES); ?>" />
        <label>Email</label>
        <input type="email" name="email" required placeholder="admin@example.com" />
        <label>Password</label>
        <input type="password" name="password" required placeholder="••••••••" />
        <button type="submit" class="btn-primary">Sign In</button>
      </form>
    </div>
  </div>
</body>
</html>

