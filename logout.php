<?php
# -------------------------------------------------------------
#
# Name       : logout.php
# Purpose    : This file logs out the user and destroy the sessions.
#
# Returns    : Page
#
# -------------------------------------------------------------

session_start(); // Start session

require('config/config.php');
require('classes/api.php');
$api = new Api;

// Check if id is not set
if (!isset($_SESSION['logged_in'])) {
	header('Location: index.php');
}

// Check if logout is set
if (isset($_GET['logout'])) {
    $insert_user_log = $api->insert_logs($_SESSION['username'], 'Logout', '');
                                
    if($insert_user_log == '1'){
        // Insert user log
        session_destroy();
        session_unset();

        header('Location: index.php'); # Redirect to index.php
        exit();
    }
    else{
        return $insert_user_log;
    }
}
 
?>