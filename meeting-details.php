<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Meeting Details';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 301);
	$add_meeting_note = $api->check_role_permissions($username, 302);
	$add_meeting_task = $api->check_role_permissions($username, 304);
	$add_meeting_memo = $api->check_role_permissions($username, 307);
	$add_meeting_other_matters = $api->check_role_permissions($username, 311);
	$print_meeting = $api->check_role_permissions($username, 313);

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

        $author = $meeting_details[0]['AUTHOR'];
        $author_details = $api->get_data_details_one_parameter('employee profile', $author);
        $author_first_name = $author_details[0]['FIRST_NAME'];
        $author_last_name = $author_details[0]['LAST_NAME'];
        $author_middle_name = $author_details[0]['MIDDLE_NAME'];
        $author_suffix = $author_details[0]['SUFFIX'];
        $author_fullname = $api->get_full_name($author_first_name, $author_middle_name, $author_last_name, $author_suffix)[0]['FULL_NAME'];

        $department = trim($author_details[0]['DEPARTMENT']);
        $department_details = $api->get_data_details_one_parameter('department', $department);
        $department_name = $department_details[0]['DEPARTMENT'];

        $status = trim($meeting_details[0]['STATUS']);
        $meeting_status = $api->get_meeting_status($status)[0]['BADGE'];

        $meeting_date = $api->check_date('empty', trim($meeting_details[0]['MEETING_DATE']), '', 'F d, Y', '', '', '');
        $meeting_start_time = $api->check_date('empty', trim($meeting_details[0]['START_TIME']), '', 'h:i:s a', '', '', '');
        $meeting_end_time = $api->check_date('empty', trim($meeting_details[0]['END_TIME']), '', 'h:i:s a', '', '', '');

        for($i = 0; $i < count($meeting_attendees_details); $i++) {
            $attendees_details = $api->get_data_details_one_parameter('employee profile', $meeting_attendees_details[$i]['EMPLOYEE_ID']);
            $attendees_first_name = $attendees_details[0]['FIRST_NAME'];
            $attendees_last_name = $attendees_details[0]['LAST_NAME'];
            $attendees_middle_name = $attendees_details[0]['MIDDLE_NAME'];
            $attendees_suffix = $attendees_details[0]['SUFFIX'];
            $attendees_full_name = $api->get_full_name($attendees_first_name, $attendees_middle_name, $attendees_last_name, $attendees_suffix)[0]['FULL_NAME'];

            $meeting_attendees .= $attendees_full_name;

            if($i != (count($meeting_attendees_details)-1)){
                $meeting_attendees .= ', ';
            }
        }

        if($status == '1'){
            $meeting_details_column_size = 'col-md-7';
        }
        else{
            $meeting_details_column_size = 'col-md-12';
        }
    }
?>
        <?php
            require('views/_head.php');
        ?>
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
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
                            <div class="<?php echo $meeting_details_column_size; ?>">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-md-6">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="text-truncate font-size-15"><?php echo $meeting_title; ?></h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                                if($print_meeting > 0){

                                                        if($meeting_details[0]['STATUS'] != 0){
                                                            echo '<div class="col-md-6">
                                                    <div class="float-end btn-group">
                                                            <a href="meeting-print.php?id='. $id .'" target="_blank" class="btn btn-success waves-effect btn-label waves-light"><i class="bx bx-printer label-icon"></i> View Printable Version</a>
                                                        </div>
                                                    </div>';
                                                        }
                                                    
                                                }
                                            ?>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <p class="text-muted"><?php echo $meeting_type; ?></p>

                                                <div class="text-muted mt-4">
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Preparer: <?php echo $author_fullname; ?></p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Department: <?php echo $department_name; ?></p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Attendees: <?php echo $meeting_attendees; ?> </p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Status: <?php echo $meeting_status; ?> </p>
                                                    <?php
                                                        if(!empty($previous_meeting)){
                                                            echo '<p><i class="mdi mdi-chevron-right text-primary me-1"></i> Previous Meeting: <a href="meeting-details.php?id='. $previous_meeting_encrypted .'" target="_blank">'. $previous_meeting_title .'</a></p>';
                                                        }
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row task-dates">
                                            <div class="col-sm-3">
                                                <div class="mt-4">
                                                    <h5 class="font-size-14"><i class="bx bx-calendar-event me-1 text-primary"></i> Meeting Date</h5>
                                                    <p class="text-muted mb-0"><?php echo $meeting_date; ?></p>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="mt-4">
                                                    <h5 class="font-size-14"><i class="bx bx bx-time text-primary"></i> Start Time</h5>
                                                    <p class="text-muted mb-0"><?php echo $meeting_start_time; ?></p>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="mt-4">
                                                    <h5 class="font-size-14"><i class="bx bx bx-time-five text-primary"></i> End Time</h5>
                                                    <p class="text-muted mb-0"><?php echo $meeting_end_time; ?></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php
                                if($status == '1'){
                                    $meeting_note_container = '<div class="col-md-5">
                                            <div class="card">
                                                <div class="card-body border-bottom">
                                                    <div class="row">
                                                        <div class="col-md-6">
                                                            <h5 class="card-title">Meeting Notes</h5>
                                                        </div>';

                                                        if($add_meeting_note > 0 && $status == '1'){
                                                            $meeting_note_container .= '<div class="col-md-6">
                                                                <div class="float-end">
                                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-meeting-note"><i class="bx bx-plus label-icon"></i> Add Meeting Note</button>
                                                                </div>
                                                            </div>';
                                                        }
                                                        
                                    $meeting_note_container .= '</div>
                                                </div>
                                                <div class="card-body">
                                                    <div>
                                                        <ul class="list-group list-group-flush" id="meeting-notes" style="max-height: 280px; overflow-y: auto;"></ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>';

                                    echo $meeting_note_container;
                                }
                            ?>
                        </div>
                        <?php
                            if(!empty($previous_meeting) && $status == '0'){
                                echo '<div class="row">
                                            <div class="col-md-12">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <h5 class="card-title">Previous Meeting Discussions</h5>
                                                                <input type="hidden" id="previousmeeting" value="'. $previous_meeting .'">
                                                            </div>
                                                        </div>
                                                        <div class="row mt-4">
                                                            <div class="col-md-12">
                                                                <table id="previous-meeting-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                                    <thead>
                                                                        <tr>
                                                                            <th class="all">Points of Discussion</th>
                                                                            <th class="all">Person Responsible</th>
                                                                            <th class="all">Status</th>
                                                                            <th class="all">Due Date</th>
                                                                            <th class="all">Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody></tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>';
                            }
                        ?>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Meeting Discussion</h5>
                                            </div>
                                            <?php
                                                if($add_meeting_task > 0 && $status == '0' && $author == $employee_id){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-meeting-task"><i class="bx bx-plus label-icon"></i> Add Discussion</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="meeting-task-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Points of Discussion</th>
                                                            <th class="all">Agenda</th>
                                                            <th class="all">Person Responsible</th>
                                                            <th class="all">Status</th>
                                                            <th class="all">Due Date</th>
                                                            <th class="all">New Due Date</th>
                                                            <th class="all">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Memos & Procedures</h5>
                                            </div>
                                            <?php
                                                if($add_meeting_memo > 0 && $status == '0' && $author == $employee_id){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-meeting-memo"><i class="bx bx-plus label-icon"></i> Add Memos & Procedure</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="meeting-memo-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Document</th>
                                                            <th class="all">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Other Matters</h5>
                                            </div>
                                            <?php
                                                if($add_meeting_other_matters > 0 && $status == '0' && $author == $employee_id){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-meeting-other-matters"><i class="bx bx-plus label-icon"></i> Add Other Matters</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="meeting-other-matters-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Other Matters</th>
                                                            <th class="all">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody></tbody>
                                                </table>
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
        
        <script src="assets/js/click-events.js"></script>
        <script src="assets/js/on-change-events.js"></script>
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/jquery.repeater/jquery.repeater.min.js"></script>
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    </body>
</html>