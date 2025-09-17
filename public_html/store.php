<?php
declare(strict_types=1);
if (session_status() === PHP_SESSION_NONE) { session_start(); }
if (empty($_SESSION['user_id'])) { header('Location: /public_html/login.php'); exit; }
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Store</title>
<link rel="stylesheet" href="/public_html/assets/styles.css" />
</head>
<body>
  <header class="header">
    <div>Store</div>
    <nav class="nav"><a href="/public_html/app.php">Back</a></nav>
  </header>
  <main class="container">
    <div class="card">
      <p>Store page placeholder.</p>
    </div>
  </main>
</body>
</html>

