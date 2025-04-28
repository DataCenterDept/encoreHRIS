<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Meeting Print';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 301);
	$add_meeting_note = $api->check_role_permissions($username, 302);
	$add_meeting_agenda = $api->check_role_permissions($username, 304);
	$add_meeting_memo = $api->check_role_permissions($username, 310);
	$add_meeting_other_matters = $api->check_role_permissions($username, 313);

	if($page_access == 0 || !isset($_GET['id']) || empty($_GET['id'])){
		header('location: 404-page.php');
	}
    else{
        $id = $_GET['id'];
        $system_date = date('Y-m-d');
        $meeting_id = $api->decrypt_data($id);
        $meeting_attendees = '';

        $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
        $employee_id = $employee_details[0]['EMPLOYEE_ID'];

        $meeting_details = $api->get_data_details_one_parameter('meeting', $meeting_id);
        $meeting_attendees_details = $api->get_data_details_one_parameter('meeting attendees', $meeting_id);
        $meeting_absentees_details = $api->get_data_details_one_parameter('meeting absentees', $meeting_id);
        $meeting_title = $meeting_details[0]['TITLE'];
        $previous_meeting = $meeting_details[0]['PREVIOUS_MEETING'];
        $meeting_type = $api->get_system_description('MEETINGTYPE', $meeting_details[0]['MEETING_TYPE']);

        if(!empty($previous_meeting)){
            $previous_meeting_details = $api->get_data_details_one_parameter('meeting', $previous_meeting);
            $previous_meeting_title = $previous_meeting_details[0]['TITLE'];
            $previous_meeting_encrypted = $api->encrypt_data($previous_meeting);
        }
        else{
            $previous_meeting_title = '';
        }

        $presider = $meeting_details[0]['PRESIDER'];
        $presider_details = $api->get_data_details_one_parameter('employee profile', $presider);
        $presider_first_name = $presider_details[0]['FIRST_NAME'];
        $presider_last_name = $presider_details[0]['LAST_NAME'];
        $presider_middle_name = $presider_details[0]['MIDDLE_NAME'];
        $presider_suffix = $presider_details[0]['SUFFIX'];
        $presider_fullname = $api->get_full_name($presider_first_name, $presider_middle_name, $presider_last_name, $presider_suffix)[0]['FIRST_LAST'];

        $noted_by = $meeting_details[0]['NOTED_BY'];
        $noted_by_details = $api->get_data_details_one_parameter('employee profile', $noted_by);
        $noted_by_first_name = $noted_by_details[0]['FIRST_NAME'];
        $noted_by_last_name = $noted_by_details[0]['LAST_NAME'];
        $noted_by_middle_name = $noted_by_details[0]['MIDDLE_NAME'];
        $noted_by_suffix = $noted_by_details[0]['SUFFIX'];
        $noted_by_designation_details = $api->get_data_details_one_parameter('designation', $noted_by_details[0]['DESIGNATION']);
        $noted_by_designation = $noted_by_designation_details[0]['DESIGNATION'];
        $noted_by_fullname = $api->get_full_name($noted_by_first_name, $noted_by_middle_name, $noted_by_last_name, $noted_by_suffix)[0]['FIRST_LAST'];

        $author = $meeting_details[0]['AUTHOR'];
        $author_details = $api->get_data_details_one_parameter('employee profile', $author);
        $author_first_name = $author_details[0]['FIRST_NAME'];
        $author_last_name = $author_details[0]['LAST_NAME'];
        $author_middle_name = $author_details[0]['MIDDLE_NAME'];
        $author_suffix = $author_details[0]['SUFFIX'];
        $author_designation_details = $api->get_data_details_one_parameter('designation', $author_details[0]['DESIGNATION']);
        $author_designation = $author_designation_details[0]['DESIGNATION'];
        $author_fullname = $api->get_full_name($author_first_name, $author_middle_name, $author_last_name, $author_suffix)[0]['FIRST_LAST'];

        $department = trim($author_details[0]['DEPARTMENT']);
        $department_details = $api->get_data_details_one_parameter('department', $department);
        $department_name = $department_details[0]['DEPARTMENT'];

        $status = trim($meeting_details[0]['STATUS']);
        $meeting_status = $api->get_meeting_status($status)[0]['BADGE'];

        $meeting_date = $api->check_date('empty', trim($meeting_details[0]['MEETING_DATE']), '', 'd F Y', '', '', '');
        $meeting_start_time = $api->check_date('empty', trim($meeting_details[0]['START_TIME']), '', 'h:i a', '', '', '');
        $meeting_end_time = $api->check_date('empty', trim($meeting_details[0]['END_TIME']), '', 'h:i a', '', '', '');

        for($i = 0; $i < count($meeting_attendees_details); $i++) {
            $attendees_details = $api->get_data_details_one_parameter('employee profile', $meeting_attendees_details[$i]['EMPLOYEE_ID']);
            $attendees_first_name = $attendees_details[0]['FIRST_NAME'];
            $attendees_last_name = $attendees_details[0]['LAST_NAME'];
            $attendees_middle_name = $attendees_details[0]['MIDDLE_NAME'];
            $attendees_suffix = $attendees_details[0]['SUFFIX'];
            $attendees_full_name = $api->get_full_name($attendees_first_name, $attendees_middle_name, $attendees_last_name, $attendees_suffix)[0]['FIRST_LAST'];

            $meeting_attendees .= $attendees_full_name;

            $meeting_attendees .= '&nbsp; &nbsp; &nbsp; ';
        }

        for($i = 0; $i < count($meeting_absentees_details); $i++) {
            $absent_details = $api->get_data_details_one_parameter('employee profile', $meeting_absentees_details[$i]['EMPLOYEE_ID']);
            $absent_first_name = $absent_details[0]['FIRST_NAME'];
            $absent_last_name = $absent_details[0]['LAST_NAME'];
            $absent_middle_name = $absent_details[0]['MIDDLE_NAME'];
            $absent_suffix = $absent_details[0]['SUFFIX'];
            $absent_full_name = $api->get_full_name($absent_first_name, $absent_middle_name, $absent_last_name, $absent_suffix)[0]['FIRST_LAST'];

            $meeting_attendees .= $absent_full_name . ' (Absent)';

            if($i != (count($meeting_absentees_details)-1)){
                $meeting_attendees .= '&nbsp; &nbsp; &nbsp; ';
            }
        }

        $updates_from_previous_meeting_table = $api->generate_meeting_table('PREVIOUSUPDATES', $meeting_id);
        $meeting_table = $api->generate_meeting_table('', $meeting_id);
        $meeting_memo = $api->generate_meeting_memos($meeting_id);
        $meeting_other_matters = $api->generate_meeting_other_matters($meeting_id);

    }
?>
        <?php
            require('views/_head.php');
        ?>
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
    </head>

    <body data-sidebar="dark">
        <?php
            require('views/_preloader.php');
        ?>
        <div id="layout-wrapper">
            <?php
                require('views/_nav_header.php');
                require('views/_menu.php');
            ?>

            <div class="main-content">

                <div class="page-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0 font-size-18"><?php echo $page_title; ?></h4>
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Employee Modules</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Meeting</a></li>
                                            <li class="breadcrumb-item"><a href="minutes-of-the-meeting.php">Minutes of the Meeting</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                            <li class="breadcrumb-item" id="meeting-id"><?php echo $meeting_id; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card" id="print">
                                    <div class="card-body">
                                        <div>
                                            <h6 class="text-center"><b><?php echo $meeting_title; ?></b></h6>
                                            <h6 class="text-center"><b>Minutes of the Meeting</b></h6>
                                            <h6 class="text-center"><b><?php echo $meeting_date; ?></b></h6>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left"><b>I. <u>Attendance</u></b></h6>
                                            <p class="text-left"><?php echo $meeting_attendees; ?></p>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left"><b>II. <u>Quorum and Call to Order</u></b></h6>
                                            <p class="text-left">The meeting was called to order and presided by <?php echo $presider_fullname; ?> at <?php echo $meeting_start_time; ?>.</p>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left"><b>III. <u>Reading and Approval of Minutes</u></b></h6>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left mb-3"><b>IV. <u>Updates from Previous Minutes</u></b></h6>
                                            <?php echo $updates_from_previous_meeting_table; ?>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left mb-3"><b>V. <u>Business for the Week</u></b></h6>
                                            <?php echo $meeting_table; ?>
                                        </div>
                                        <div>
                                            <h6 class="text-left"><b>VI. <u>Memos, Policies & Procedures</u></b></h6>
                                        </div>
                                        <div class="mb-4">
                                            <?php echo $meeting_memo; ?>
                                        </div>
                                        <div>
                                            <h6 class="text-left"><b>VII. <u>Other Matters/Cascading</u></b></h6>
                                        </div>
                                        <div class="mb-4">
                                            <?php echo $meeting_other_matters; ?>
                                        </div>
                                        <div class="mb-4">
                                            <h6 class="text-left"><b>VIII. <u>Summary</u></b></h6>
                                            <p class="text-left">Main points summarized by <?php echo $author_fullname; ?></p>
                                        </div>
                                        <div class="mb-5">
                                            <h6 class="text-left"><b>IX. <u>Adjournment</u></b></h6>
                                            <p class="text-left">The meeting was adjourned at <?php echo $meeting_end_time; ?>.</p>
                                        </div>
                                        <div class="row">
                                            <div class="col-print-4">
                                                <p class="text-left mb-4">Prepared By:</p>
                                                <p class="text-left mb-0"><?php echo $author_fullname; ?></p>
                                                <p class="text-left"><?php echo $author_designation; ?></p>
                                            </div>
                                            <div class="col-print-4">
                                                <p class="text-left mb-4">Noted By:</p>
                                                <p class="text-left mb-0"><?php echo $noted_by_fullname; ?></p>
                                                <p class="text-left"><?php echo $noted_by_designation; ?></p>
                                            </div>
                                        </div>
                                        <div class="d-print-none">
                                            <div class="float-end">
                                                <a href="javascript:window.print()" class="btn btn-success waves-effect btn-label waves-light"><i class="bx bx-printer label-icon"></i> Print</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
                    require('views/_footer.php');
                ?>
            </div>
        </div>
        <?php
	        require('views/_scripts.php');
        ?>

        <style>
            table, th, td {
                border: 1px solid black !important;
                border-collapse: collapse !important;
            }
        </style>
        
        <script src="assets/js/click-events.js"></script>
        <script src="assets/js/on-change-events.js"></script>
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
    </body>
</html>