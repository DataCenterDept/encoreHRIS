<?php
require('config/config.php');
require('classes/api.php');
$api = new Api;

$systemdate = date('Y-m-d');
$working_days = 5;
$employee_id = '7';
$date = '2021-11-08';
$time = '17:30';

if ($api->databaseConnection()) {
    $overlap_count = 0;

    $sql = $api->db_connection->prepare("SELECT LEAVE_DATE, START_TIME, END_TIME FROM tblleave WHERE STATUS IN ('1', '4') AND EMPLOYEE_ID = :employee_id");
    $sql->bindParam(':employee_id', $employee_id);
                                                
    if($sql->execute()){
        $count = $sql->rowCount();

        if($count > 0){
            while($row = $sql->fetch()){
                $start_date = $api->check_week_day($api->check_date('empty', $row['LEAVE_DATE'], '', 'Y-m-d', '', '', '')) . ' ' . $row['START_TIME'];
                $end_date = $api->check_week_day($api->check_date('empty', $row['LEAVE_DATE'], '', 'Y-m-d', '', '', '')) . ' ' . $row['END_TIME'];
                
                echo $start_date . ' - ' . $end_date . '<br/>';

                if (strtotime($date . ' ' . $time) >= strtotime($start_date) && strtotime($date . ' ' . $time) <= strtotime($end_date)){
                    $overlap_count++;
                }
            }

            echo $overlap_count;
        }
    }
    else{
        echo $sql->errorInfo()[2];
    }
}

?>