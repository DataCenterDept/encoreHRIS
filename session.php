<?php
session_start();

# Allow SSO login to bypass certain checks
$is_sso_login = isset($_SESSION['sso_token']) && isset($_SESSION['is_logged_in']);

if (!$is_sso_login && (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] != 1)) {
    session_unset();
    session_destroy();
    header('Location: index.php');
    exit();
}

if(isset($_SESSION['lock']) && $_SESSION['lock'] == 1 && !$is_sso_login) {
    header('Location: lockscreen.php');
    exit();
}

$username = $_SESSION['username'] ?? '';
?>