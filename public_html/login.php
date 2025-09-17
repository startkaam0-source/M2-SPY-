<?php
declare(strict_types=1);
require_once __DIR__ . '/utils.php';
$csrf = user_csrf_token();
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Login</title>
<link rel="stylesheet" href="/public_html/assets/styles.css" />
</head>
<body>
  <header class="header">
    <div>Learning App</div>
    <nav class="nav"><a href="/public_html/index.php">Home</a></nav>
  </header>
  <main class="container">
    <div class="card">
      <h2>Sign In</h2>
      <form method="post" action="/public_html/api/auth.php?action=login">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf, ENT_QUOTES); ?>" />
        <label>Email</label>
        <input class="input" type="email" name="email" required />
        <label>Password</label>
        <input class="input" type="password" name="password" required />
        <button class="btn" type="submit">Login</button>
      </form>
    </div>
  </main>
</body>
</html>

