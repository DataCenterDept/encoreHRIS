<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;



// $s = date("Y-m-d");

// $dateTime = new \DateTime($s);
// $monday = clone $dateTime->modify(('Sunday' == $dateTime->format('l')) ? 'Monday last week' : 'Monday this week');
// $sunday = clone $dateTime->modify('Sunday this week');


// $logged_user = $api->get_data_details_one_parameter('user account',$_SESSION['username']);

// $data =  $api->generate_insurance_options('INSCODEACRED');

// // foreach ($data as $val) {
// //     echo $val;
// // }


// $start_date = ($_POST['filter_start_date']="05/12/2022" == "") ? date('Y-m-01')  : date('Y-m-d',strtotime($_POST['filter_start_date']="05/12/2022"));
// $end_date = ($_POST['filter_end_date'] ='05/30/2022' == "") ? date('Y-m-t')  : date('Y-m-d',strtotime($_POST['filter_end_date']="05/30/2022"));

// echo json_encode($end_date);

echo json_encode(getenv()) ;



?>