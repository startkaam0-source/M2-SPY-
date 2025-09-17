<?php
declare(strict_types=1);
require_once __DIR__ . '/middleware/authMiddleware.php';
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Admin Dashboard</title>
<link rel="stylesheet" href="/admin_public_html/assets/styles.css" />
</head>
<body class="bg">
  <header class="topbar">
    <div class="brand">Admin</div>
    <nav><a class="link" href="/admin_public_html/admin_api/auth.php?action=logout">Logout</a></nav>
  </header>
  <main class="container">
    <div class="grid">
      <div class="card stat">
        <div class="stat-title">Users</div>
        <div class="stat-value">0</div>
      </div>
      <div class="card stat">
        <div class="stat-title">Notes</div>
        <div class="stat-value">0</div>
      </div>
      <div class="card stat">
        <div class="stat-title">Quizzes</div>
        <div class="stat-value">0</div>
      </div>
      <div class="card stat">
        <div class="stat-title">Payments</div>
        <div class="stat-value">0</div>
      </div>
    </div>
  </main>
  
</body>
</html>

