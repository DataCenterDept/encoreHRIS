<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Employee';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 55);
    $update_employee = $api->check_role_permissions($username, 33);
    $add_leave_entitlement = $api->check_role_permissions($username, 56);
    $add_employee_leave = $api->check_role_permissions($username, 59);
    $add_employee_document = $api->check_role_permissions($username, 62);
    $add_employee_attendance = $api->check_role_permissions($username, 70);

	if($page_access == 0 || !isset($_GET['id']) || empty($_GET['id'])){
		header('location: 404-page.php');
	}
    else{
        $id = $_GET['id'];
        $employee_id = $api->decrypt_data($id);
        $employee_profile_info = $api->get_data_details_one_parameter('employee profile', $employee_id);
        $user_account_details = $api->get_data_details_one_parameter('user account', $employee_id);
        $employee_vacation_leave = $api->get_employee_remaining_leave($employee_id, 'LEAVETP1');
        $employee_sick_leave = $api->get_employee_remaining_leave($employee_id, 'LEAVETP2');
        $employee_emergency_leave = $api->get_employee_remaining_leave($employee_id, 'LEAVETP5');
        $employee_profile_image = $employee_profile_info[0]['PROFILE_IMAGE'];
        $employee_first_name = $employee_profile_info[0]['FIRST_NAME'];
        $employee_last_name = $employee_profile_info[0]['LAST_NAME'];
        $employee_suffix = $employee_profile_info[0]['SUFFIX'];
        $employee_email = $employee_profile_info[0]['EMAIL'];
        $employee_phone = $employee_profile_info[0]['PHONE'];
        $employee_telephone = $employee_profile_info[0]['TELEPHONE'];
        $employee_address = $employee_profile_info[0]['ADDRESS'];
        $employee_account_name = $employee_profile_info[0]['ACCOUNT_NAME'];
        $employee_account_number = $employee_profile_info[0]['ACCOUNT_NUMBER'];
        $employee_type = $api->get_system_description('EMPLOYMENTTP', $employee_profile_info[0]['EMPLOYEMENT_TYPE']);
        $employee_basic_pay = number_format($employee_profile_info[0]['BASIC_PAY'], 2);
        $employee_daily_rate = number_format($employee_profile_info[0]['DAILY_RATE'], 2);
        $employee_hourly_rate = number_format($employee_profile_info[0]['HOURLY_RATE'], 2);
        $employee_minute_rate = number_format($employee_profile_info[0]['MINUTE_RATE'], 2);
        $employee_birthday = $api->check_date('empty', $employee_profile_info[0]['BIRTHDAY'], '', 'F d, Y', '', '', '');
        $employee_join_date = $api->check_date('empty', $employee_profile_info[0]['JOIN_DATE'], '', 'F d, Y', '', '', '');
        $employee_exit_date = $api->check_date('empty', $employee_profile_info[0]['EXIT_DATE'], '', 'F d, Y', '', '', '');
        $employee_fullname = $api->get_full_name($employee_first_name, '', $employee_last_name, $employee_suffix)[0]['FULL_NAME'];
        $employee_designation_details = $api->get_data_details_one_parameter('designation', $employee_profile_info[0]['DESIGNATION']);
        $employee_department_details = $api->get_data_details_one_parameter('department', $employee_profile_info[0]['DEPARTMENT']);
        $employee_branch_details = $api->get_data_details_one_parameter('branch', $employee_profile_info[0]['BRANCH']);
        $employee_designation = $employee_designation_details[0]['DESIGNATION'];
        $employee_department = $employee_department_details[0]['DEPARTMENT'];
        $employee_branch = $employee_branch_details[0]['BRANCH'];
        $employee_gender = $api->get_system_description('GENDER', $employee_profile_info[0]['GENDER']);
        $employee_civil_status = $api->get_system_description('CIVIL_STATUS', $employee_profile_info[0]['CIVIL_STATUS']);
        $employee_payroll_periond = $api->get_system_description('PAYROLLPERIOD', $employee_profile_info[0]['PAYROLL_PERIOD']);
        $employee_employment_status = $api->get_employment_status($employee_profile_info[0]['EMPLOYMENT_STATUS'])[0]['STATUS'];
    }
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css">
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
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Human Resource</a></li>
                                            <li class="breadcrumb-item"><a href="employee-list.php">Employee List</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="media">
                                                    <div class="me-3">
                                                        <img src="<?php echo $employee_profile_image . '?' . rand(); ?>" alt="" class="avatar-md rounded-circle img-thumbnail">
                                                    </div>
                                                    <div class="media-body align-self-center">
                                                        <div class="text-muted">
                                                            <h5 class="mb-1"><?php echo $employee_fullname; ?></h5>
                                                            <p class="mb-0"><?php echo $employee_designation; ?></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                
                                            <div class="col-lg-4 align-self-center">
                                                <div class="text-lg-center mt-4 mt-lg-0">
                                                    <div class="row">
                                                        <div class="col-4">
                                                            <div>
                                                                <p class="text-muted text-truncate mb-2">Sick Leave</p>
                                                                <h5 class="mb-0"><?php echo number_format($emp_sick_leave, 1); ?></h5>
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div>
                                                                <p class="text-muted text-truncate mb-2">Vacation Leave</p>
                                                                <h5 class="mb-0"><?php echo number_format($emp_vacation_leave, 1); ?></h5>                                                                
                                                            </div>
                                                        </div>
                                                        <div class="col-4">
                                                            <div>
                                                                <p class="text-muted text-truncate mb-2">Emergency Leave</p>
                                                                <h5 class="mb-0"><?php echo number_format($emp_emergency_leave, 1); ?></h5>                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-lg-4 d-lg-block">
                                                <div class="clearfix mt-4 mt-lg-3">
                                                    <div class="float-end">
                                                        <?php
                                                            if($update_employee > 0){
                                                                echo '<button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="update-employee-details" data-employeeid="'. $employee_id .'"><i class="bx bx-edit-alt label-icon"></i> Edit Employee</button>';
                                                            }
                                                        ?>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xl-4">

                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <h4 class="card-title">Employee Information</h4>
                                            </div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <div class="table-responsive">
                                                    <table class="table table-nowrap mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">Full Name :</th>
                                                                <td><?php echo $employee_fullname; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Employee ID :</th>
                                                                <td id="employee-profile-employee-id"><?php echo $employee_id; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Designation :</th>
                                                                <td><?php echo $employee_designation; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Department :</th>
                                                                <td><?php echo $employee_department; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Branch :</th>
                                                                <td><?php echo $employee_branch; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Employee Type :</th>
                                                                <td><?php echo $employee_type; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Payroll Period :</th>
                                                                <td><?php echo $employee_payroll_periond; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Bank Account Name :</th>
                                                                <td><?php echo $employee_account_name; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Bank Account Number :</th>
                                                                <td><?php echo $employee_account_number; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Basic Pay :</th>
                                                                <td><?php echo $employee_basic_pay; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Daily Rate :</th>
                                                                <td><?php echo $employee_daily_rate; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Hourly Rate :</th>
                                                                <td><?php echo $employee_hourly_rate; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Minute Rate :</th>
                                                                <td><?php echo $employee_minute_rate; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Mobile :</th>
                                                                <td><?php echo $employee_phone; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">E-mail :</th>
                                                                <td><?php echo $employee_email; ?></td>
                                                            </tr>
                                                            <?php
                                                                if(!empty($employee_telephone)){
                                                                    echo '<tr>
                                                                        <th scope="row">Telephone :</th>
                                                                        <td>'. $employee_telephone .'</td>
                                                                    </tr>';
                                                                }
                                                            ?>
                                                            <tr>
                                                                <th scope="row">Address :</th>
                                                                <td><?php echo $employee_address; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Hired Date :</th>
                                                                <td><?php echo $employee_join_date; ?></td>
                                                            </tr>
                                                            <?php
                                                                if(!empty($employee_exit_date)){
                                                                    echo '<tr>
                                                                        <th scope="row">Exit Date :</th>
                                                                        <td>'. $employee_exit_date .'</td>
                                                                    </tr>';
                                                                }
                                                            ?>
                                                            <tr>
                                                                <th scope="row">Gender :</th>
                                                                <td><?php echo $employee_gender; ?></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Civil Status :</th>
                                                                <td><?php echo $employee_civil_status; ?></td>
                                                            </tr> 
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>         
                            
                            <div class="col-xl-8">

                                <div class="card">
                                    <div class="card-body">
                                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-bs-toggle="tab" href="#leave-entitlement-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-calendar-alt"></i></span>
                                                    <span class="d-none d-sm-block">Leave Entitlement</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#leaves-taken-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-calendar-check"></i></span>
                                                    <span class="d-none d-sm-block">Leaves Taken</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#attendance-logs-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-user-clock"></i></span>
                                                    <span class="d-none d-sm-block">Attendance Log</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#documents-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-file-alt"></i></span>
                                                    <span class="d-none d-sm-block">Documents</span>    
                                                </a>
                                            </li>
                                        </ul>
                                        
                                        <div class="tab-content p-3 text-muted">
                                            <div class="tab-pane active" id="leave-entitlement-tab" role="tabpanel">
                                                <div class="row">
                                                    <?php
                                                        if($add_leave_entitlement > 0){
                                                            echo '<div class="col-md-12">
                                                                <div class="float-end">
                                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-leave-entitlement"><i class="bx bx-plus label-icon"></i> Add Leave Entitlement</button>
                                                                </div>
                                                            </div>';
                                                        }
                                                    ?>
                                                </div>
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="employee-leave-entitlement-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:40%">Leave</th>
                                                                    <th class="all" style="width:15%">Entitled Leave</th>
                                                                    <th class="all" style="width:25%">Date Coverage</th>
                                                                    <th class="all" style="width:20%">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="leaves-taken-tab" role="tabpanel">
                                                <div class="row">
                                                    <?php
                                                        if($add_employee_leave > 0){
                                                            echo '<div class="col-md-12">
                                                                <div class="float-end">
                                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-employee-leave"><i class="bx bx-plus label-icon"></i> Add Employee Leave</button>
                                                                </div>
                                                            </div>';
                                                        }
                                                    ?>
                                                </div>
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="employee-leave-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:40%">Leave</th>
                                                                    <th class="all" style="width:30%">Date</th>
                                                                    <th class="all" style="width:10%">Status</th>
                                                                    <th class="none">Reason</th>
                                                                    <th class="none">Cancelation Reason</th>
                                                                    <th class="none">Rejection Reason</th>
                                                                    <th class="all" style="width:20%">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="attendance-logs-tab" role="tabpanel">
                                                <div class="row">
                                                    <?php
                                                        if($add_employee_attendance > 0){
                                                            echo '<div class="col-md-12">
                                                                <div class="float-end">
                                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-employee-attendance-log"><i class="bx bx-plus label-icon"></i> Add Employee Attendance Log</button>
                                                                </div>
                                                            </div>';
                                                        }
                                                    ?>
                                                </div>
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="employee-attendance-logs-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:20%">Time In</th>
                                                                    <th class="none">Time In By</th>
                                                                    <th class="none">Time In IP</th>
                                                                    <th class="all" style="width:20%">Time Out</th>
                                                                    <th class="none">Time Out By</th>
                                                                    <th class="none">Time Out IP</th>
                                                                    <th class="all" style="width:10%">Total Hours</th>
                                                                    <th class="all" style="width:10%">Late</th>
                                                                    <th class="all" style="width:10%">Early Leave</th>
                                                                    <th class="all" style="width:10%">Overtime</th>
                                                                    <th class="none">Remarks</th>
                                                                    <th class="all" style="width:20%">Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="documents-tab" role="tabpanel">
                                                <div class="row">
                                                    <?php
                                                        if($add_employee_document > 0){
                                                            echo '<div class="col-md-12">
                                                                <div class="float-end">
                                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-employee-document"><i class="bx bx-plus label-icon"></i> Add Document</button>
                                                                </div>
                                                            </div>';
                                                        }
                                                    ?>
                                                </div>
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="employee-document-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all">Document</th>
                                                                    <th class="all">Category</th>
                                                                    <th class="all">Document Note</th>
                                                                    <th class="all">Document Date</th>
                                                                    <th>Uploaded Date</th>
                                                                    <th>Uploaded By</th>
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
        <script src="assets/libs/qrcode/qrcode.min.js"></script>
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    </body>
</html>
