<?php
declare(strict_types=1);
if (session_status() === PHP_SESSION_NONE) { session_start(); }
if (empty($_SESSION['user_id'])) {
  header('Location: /public_html/login.php');
  exit;
}
?><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>App</title>
<link rel="stylesheet" href="/public_html/assets/styles.css" />
</head>
<body>
  <header class="header">
    <div>Learning App</div>
    <nav class="nav">
      <a href="/public_html/notes.php">Notes</a>
      <a href="/public_html/quiz.php">Quiz</a>
      <a href="/public_html/store.php">Store</a>
      <a href="/public_html/profile.php">Profile</a>
      <a href="/public_html/api/auth.php?action=logout">Logout</a>
    </nav>
  </header>
  <main class="container">
    <div class="card">
      <h2>Welcome</h2>
      <p>Your learning dashboard.</p>
    </div>
  </main>
</body>
</html>

