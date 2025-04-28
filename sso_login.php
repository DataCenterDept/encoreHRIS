<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

require_once('config/config.php');
require_once('classes/api.php');

$auth = new Api();

if(!$auth->databaseConnection()) {
    header("Location: login.php?error=db_connection_failed");
    exit;
}

if(isset($_GET['token']) && isset($_GET['emp_id'])) {
    $token = $_GET['token'];
    $emp_id = $_GET['emp_id'];
    
    $validation_result = $auth->validateSsoToken($token, $emp_id);
    
    if($validation_result === '1') {
        // Set all required session variables for HRIS system
        $_SESSION['logged_in'] = 1;  // This is what session.php checks
        $_SESSION['is_logged_in'] = true;  // For backward compatibility
        $_SESSION['username'] = $_SESSION['username'] ?? '';  // Set from validateSsoToken
        
        // Redirect directly to dashboard
        header('Location: dashboard.php');
        exit;
    } else {
        header("Location: index.php?error=invalid_sso_token");
        exit;
    }
} else {
    header("Location: index.php?error=missing_parameters");
    exit;
}
?>