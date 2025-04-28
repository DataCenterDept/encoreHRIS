<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Ticket Details';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 259);
	$update_ticket = $api->check_role_permissions($username, 260);
	$accept_ticket = $api->check_role_permissions($username, 261);
	$reject_ticket = $api->check_role_permissions($username, 262);
	$cancel_ticket = $api->check_role_permissions($username, 263);
	$tag_ticket_as_solved = $api->check_role_permissions($username, 264);
	$tag_ticket_as_closed = $api->check_role_permissions($username, 265);
	$tag_ticket_as_unsolved = $api->check_role_permissions($username, 266);
	$add_ticket_note = $api->check_role_permissions($username, 267);
	$add_ticket_attachment = $api->check_role_permissions($username, 269);
	$add_ticket_adjustment  = $api->check_role_permissions($username, 271);

	if($page_access == 0 || !isset($_GET['id']) || empty($_GET['id'])){
		header('location: 404-page.php');
	}
    else{
        $id = $_GET['id'];
        $system_date = date('Y-m-d');
        $ticket_id = $api->decrypt_data($id);

        $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
        $employee_id = $employee_details[0]['EMPLOYEE_ID'];

        $ticket_details = $api->get_data_details_one_parameter('ticket', $ticket_id);
        $subject = $ticket_details[0]['SUBJECT'];
        $requester = $ticket_details[0]['REQUESTER'];
        $description = $ticket_details[0]['DESCRIPTION'];
        $status = $ticket_details[0]['STATUS'];
        $due_date = $ticket_details[0]['DUE_DATE'];
        $assigned_employee = $ticket_details[0]['ASSIGNED_EMPLOYEE'];
        $rejection_reason = $ticket_details[0]['REJECTION_REASON'];
        $cancellation_reason = $ticket_details[0]['CANCELLATION_REASON'];
        $category = $api->get_system_description('TICKETCATEGORY', $ticket_details[0]['CATEGORY']);
        $ticket_status = $api->get_ticket_status($status, $system_date, $due_date)[0]['BADGE'];
        $ticket_priority = $api->get_ticket_priority($ticket_details[0]['PRIORITY'])[0]['BADGE'];
        $created_date = $api->check_date('empty', $ticket_details[0]['CREATED_DATE'], '', 'F d, Y', '', '', '');
        $created_time = $api->check_date('empty', $ticket_details[0]['CREATED_TIME'], '', 'h:i:s a', '', '', '');
        $due_date = $api->check_date('empty', $ticket_details[0]['DUE_DATE'], '', 'F d, Y', '', '', '');
        $due_time = $api->check_date('empty', $ticket_details[0]['DUE_TIME'], '', 'h:i:s a', '', '', '');
        $accepted_date = $api->check_date('empty', $ticket_details[0]['ACCEPTED_DATE'], '', 'F d, Y', '', '', '');
        $accepted_time = $api->check_date('empty', $ticket_details[0]['ACCEPTED_TIME'], '', 'h:i:s a', '', '', '');
        $solved_date = $api->check_date('empty', $ticket_details[0]['SOLVED_DATE'], '', 'F d, Y', '', '', '');
        $solved_time = $api->check_date('empty', $ticket_details[0]['SOLVED_TIME'], '', 'h:i:s a', '', '', '');
        $closed_date = $api->check_date('empty', $ticket_details[0]['CLOSED_DATE'], '', 'F d, Y', '', '', '');
        $closed_time = $api->check_date('empty', $ticket_details[0]['CLOSED_TIME'], '', 'h:i:s a', '', '', '');
        $decision_date = $api->check_date('empty', $ticket_details[0]['DECISION_DATE'], '', 'F d, Y', '', '', '');
        $decision_time = $api->check_date('empty', $ticket_details[0]['DECISION_TIME'], '', 'h:i:s a', '', '', '');

        $requester_details = $api->get_data_details_one_parameter('employee profile', $requester);
        $requester_by_first_name = $requester_details[0]['FIRST_NAME'];
        $requester_by_last_name = $requester_details[0]['LAST_NAME'];
        $requester_by_middle_name = $requester_details[0]['MIDDLE_NAME'];
        $requester_by_suffix = $requester_details[0]['SUFFIX'];
        $requester_by_fullname = $api->get_full_name($requester_by_first_name, $requester_by_middle_name, $requester_by_last_name, $requester_by_suffix)[0]['FULL_NAME'];

        if(!empty($assigned_employee)){
            $assigned_employee_details = $api->get_data_details_one_parameter('employee profile', $assigned_employee);
            $assigned_employee_by_first_name = $assigned_employee_details[0]['FIRST_NAME'];
            $assigned_employee_by_last_name = $assigned_employee_details[0]['LAST_NAME'];
            $assigned_employee_by_middle_name = $assigned_employee_details[0]['MIDDLE_NAME'];
            $assigned_employee_by_suffix = $assigned_employee_details[0]['SUFFIX'];
            $assigned_employee_by_fullname = $api->get_full_name($assigned_employee_by_first_name, $assigned_employee_by_middle_name, $assigned_employee_by_last_name, $assigned_employee_by_suffix)[0]['FULL_NAME'];
        }
        else{
            $assigned_employee_by_fullname = 'No Assigned Personnel';
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
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Help Desk</a></li>
                                            <li class="breadcrumb-item"><a href="ticket.php">Ticket</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                            <li class="breadcrumb-item" id="ticket-id"><?php echo $ticket_id; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row mb-2">
                                            <div class="col-lg-6">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1 overflow-hidden">
                                                        <h5 class="text-truncate font-size-15"><?php echo $subject; ?></h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                                if($update_ticket > 0 || $accept_ticket > 0 || $reject_ticket > 0 || $cancel_ticket > 0 || $tag_ticket_as_solved > 0 || $tag_ticket_as_closed > 0 || $tag_ticket_as_unsolved > 0){
                                                        $dropdown_menu = '';

                                                        if($update_ticket > 0 && $status == '0' && $requester == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item update-ticket" data-ticketid="'. $ticket_id .'" data-locked="0" href="javascript: void(0);">Update Ticket</a>';
                                                        }
                                
                                                        if($accept_ticket > 0 && $status == '0' && $assigned_employee == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item accept-ticket" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Accept Ticket</a>';
                                                        }
                                    
                                                        if($reject_ticket > 0 && $status == '0' && $assigned_employee == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item reject-ticket" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Reject Ticket</a>';       
                                                        }
                                    
                                                        if($cancel_ticket > 0 && ($status == '0' || $status == '1') && $requester == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item cancel-ticket" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Cancel Ticket</a>';
                                                        }
                                
                                                        if($tag_ticket_as_solved > 0 && ($status == '1' || $status == '5') && $assigned_employee == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item tag-ticket-as-solved" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Tag Ticket As Solved</a>';
                                                        }
                                
                                                        if($tag_ticket_as_closed > 0 && $status == '4' && $requester == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item tag-ticket-as-closed" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Tag Ticket As Closed</a>';
                                                        }
                                    
                                                        if($tag_ticket_as_unsolved > 0 && $status == '4' && $requester == $employee_id){
                                                            $dropdown_menu .= '<a class="dropdown-item tag-ticket-as-unsolved" data-ticketid="'. $ticket_id .'" href="javascript: void(0);">Tag Ticket As Unsolved</a>';
                                                        }

                                                        if(!empty($dropdown_menu)){
                                                            echo '<div class="col-md-6">
                                                            <div class="float-end btn-group">
                                                                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    Options <i class="mdi mdi-chevron-down"></i>
                                                                </button>
                                                                <div class="dropdown-menu dropdown-menu-end">
                                                                            '. $dropdown_menu .'
                                                                        </div>
                                                                    </div>
                                                                </div>';
                                                        }
                                                }
                                            ?>
                                        </div>

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <p class="text-muted"><?php echo $description; ?></p>

                                                <div class="text-muted mt-4">
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Requester: <?php echo $requester_by_fullname; ?></p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Assigned To: <?php echo $assigned_employee_by_fullname; ?></p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Category: <?php echo $category; ?></p>
                                                    <p><i class="mdi mdi-chevron-right text-primary me-1"></i> Status: <?php echo $ticket_status; ?> </p>
                                                    
                                                    <?php
                                                        if($assigned_employee == $employee_id){
                                                            echo '<p><i class="mdi mdi-chevron-right text-primary me-1"></i> Priority: '. $ticket_priority .' </p>';
                                                        }

                                                        if(!empty($rejection_reason) && $status == '2'){
                                                            echo '<p><i class="mdi mdi-chevron-right text-primary me-1"></i> Rejection Reason: '. $rejection_reason .'</p>';
                                                        }

                                                        if(!empty($cancellation_reason) && $status == '3'){
                                                            echo '<p><i class="mdi mdi-chevron-right text-primary me-1"></i> Cancellation Reason: '. $cancellation_reason .'</p>';
                                                        }
                                                    ?>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="row task-dates">
                                            <div class="col-sm-3">
                                                <div class="mt-4">
                                                    <h5 class="font-size-14"><i class="bx bx-calendar-event me-1 text-primary"></i> Due Date</h5>
                                                    <p class="text-muted mb-0"><?php echo $due_date . '<br/>' . $due_time; ?></p>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="mt-4">
                                                    <h5 class="font-size-14"><i class="bx bx-calendar me-1 text-primary"></i> Request Date</h5>
                                                    <p class="text-muted mb-0"><?php echo $created_date . '<br/>' . $created_time; ?></p>
                                                </div>
                                            </div>
                                            <?php
                                                if(!empty($accepted_date) && !empty($accepted_time)){
                                                    echo '<div class="col-sm-3">
                                                            <div class="mt-4">
                                                                <h5 class="font-size-14"><i class="bx bx-calendar-check me-1 text-primary"></i> Accepted Date</h5>
                                                                <p class="text-muted mb-0">'. $created_date .'<br/>'. $accepted_time .'</p>
                                                            </div>
                                                        </div>';
                                                }

                                                if(!empty($solved_date) && !empty($solved_date)){
                                                    echo '<div class="col-sm-3">
                                                            <div class="mt-4">
                                                                <h5 class="font-size-14"><i class="bx bx-calendar-check me-1 text-primary"></i> Solved Date</h5>
                                                                <p class="text-muted mb-0">'. $solved_date .'<br/>'. $solved_time .'</p>
                                                            </div>
                                                        </div>';
                                                }

                                                if(!empty($closed_date) && !empty($closed_time)){
                                                    echo '<div class="col-sm-3">
                                                            <div class="mt-4">
                                                                <h5 class="font-size-14"><i class="bx bx-calendar-x me-1 text-primary"></i> Closed Date</h5>
                                                                <p class="text-muted mb-0">'. $closed_date .'<br/>'. $closed_time .'</p>
                                                            </div>
                                                        </div>';
                                                }

                                                if(!empty($decision_date) && !empty($decision_time)){

                                                    if($status == '2'){
                                                        $text = 'Rejection Date';
                                                    }
                                                    else if($status == '3'){
                                                        $text = 'Cancellation Date';
                                                    }
                                                    else{
                                                        $text = '';
                                                    }

                                                    echo '<div class="col-sm-3">
                                                            <div class="mt-4">
                                                                <h5 class="font-size-14"><i class="bx bx-calendar-x me-1 text-primary"></i> '. $text .'</h5>
                                                                <p class="text-muted mb-0">'. $decision_date .'<br/>'. $decision_time .'</p>
                                                            </div>
                                                        </div>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4">
                                <div class="card">
                                    <div class="card-body border-bottom">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Ticket Notes</h5>
                                            </div>
                                            <?php
                                                if($add_ticket_note > 0 && ($status != '2' && $status != '3' && $status != '6')){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-ticket-note"><i class="bx bx-plus label-icon"></i> Add Ticket Note</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div>
                                            <ul class="list-group list-group-flush" id="ticket-notes" style="max-height: 280px; overflow-y: auto;"></ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-5">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Ticket Attachment</h5>
                                            </div>
                                            <?php
                                                if($add_ticket_attachment > 0 && ($status != '2' && $status != '3' && $status != '6')){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-ticket-attachment"><i class="bx bx-plus label-icon"></i> Add Ticket Attachment</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="ticket-attachment-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Attachment</th>
                                                            <th class="all">Uploaded By</th>
                                                            <th class="all">Uploaded Date</th>
                                                            <th>Attachment Type</th>
                                                            <th>Attachment Size</th>
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
                            <div class="col-lg-7">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h5 class="card-title">Ticket Adjustment Request</h5>
                                            </div>
                                            <?php
                                                if($add_ticket_adjustment > 0 && ($status == '1' || $status == '5') && $assigned_employee == $employee_id){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-ticket-adjustment"><i class="bx bx-plus label-icon"></i> Add Ticket Adjustment</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="ticket-adjustment-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Request By</th>
                                                            <th class="all">Assigned Employee</th>
                                                            <th class="all">Status</th>
                                                            <th class="all">Category</th>
                                                            <th class="all">Subject</th>
                                                            <th class="all">Description</th>
                                                            <th class="all">Priority</th>
                                                            <th class="all">Due Date</th>
                                                            <th class="all">Reason</th>
                                                            <th>Request Date</th>
                                                            <th>Decision By</th>
                                                            <th>Decision Date</th>
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
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    </body>
</html>