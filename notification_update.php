<?php

if(isset($_GET['notification']) && !empty($_GET['notification'])){
    $notification_id = $api->decrypt_data($_GET['notification']);

    $get_data_details_one_parameter = $api->get_data_details_one_parameter('notification', $notification_id);
    $status = $get_data_details_one_parameter[0]['STATUS'];

    if($status == '0'){
        $update_notification_status = $api->update_notification_status('1', $notification_id, $username);
    }
}

?>