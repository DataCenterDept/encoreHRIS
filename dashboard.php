<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
    
	$api = new Api;
	$page_title = 'Dashboard';
 

	# Check role permission
	$page_access = $api->check_role_permissions($username, 23);
	$record_attendance = $api->check_role_permissions($username, 68);
	$scan_qr_code_attendance = $api->check_role_permissions($username, 69);
	$get_location = $api->check_role_permissions($username, 111);
// 	$telephone_log_approval_page = $api->check_role_permissions($username, 167);
	$transmittal_page = $api->check_role_permissions($username, 189);
	$employee_monitoring = $api->check_role_permissions($username, 421);
	$employee_card = $api->check_role_permissions($username, 428);

    $company_settings_details = $api->get_data_details_one_parameter('company', '1');
    $health_declaration = $company_settings_details[0]['HEALTH_DECLARATION'];
    
    $get_all_incoming_outgoing_transmittal_count = $api->get_transmittal_count('all incoming/outgoing', $username);
    $get_incoming_transmittal_count = $api->get_transmittal_count('incoming', $username);
    $get_outgoing_transmittal_count = $api->get_transmittal_count('outgoing', $username);
    
    $get_total_employee_headcount = $api ->get_total_employee_headcount($username, 23);
    
    $get_total_employee_regular = $api ->get_total_employee_regular($username, 23);
    $get_total_employee_probitionary = $api ->get_total_employee_probitionary($username, 23);


	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
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
                <!-- Left column - Welcome and Attendance cards -->
                <div class="col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="bg-primary bg-soft">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-primary p-3">
                                        <h5 class="text-primary">Welcome!</h5>
                                        <p>HRIS Dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="avatar-md profile-user-wid mb-4">
                                        <img src="<?php echo $profile_image . '?' . rand(); ?>" alt="" class="img-thumbnail rounded-circle">
                                    </div>
                                    <h5 class="font-size-15 text-truncate"><?php echo $employee_name; ?></h5>
                                    <p class="text-muted mb-0 text-truncate"><?php echo $position; ?></p>
                                </div>

                                <div class="col-sm-8">
                                    <div class="pt-4">
                                        <div class="row">
                                            <div class="col-4">
                                                <h5 class="font-size-15"><?php echo number_format($emp_sick_leave, 1); ?></h5>
                                                <p class="text-muted mb-0">Sick Leave</p>
                                            </div>
                                            <div class="col-4">
                                                <h5 class="font-size-15"><?php echo number_format($emp_vacation_leave, 1); ?></h5>
                                                <p class="text-muted mb-0">Vacation Leave</p>
                                            </div>
                                            <div class="col-4">
                                                <h5 class="font-size-15"><?php echo number_format($emp_emergency_leave, 1); ?></h5>
                                                <p class="text-muted mb-0">Emergency Leave</p>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <a href="profile.php" class="btn btn-primary waves-effect waves-light btn-sm">View Profile <i class="mdi mdi-arrow-right ms-1"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Record Attendance</h4>
                            <div class="row">
                                <div class="col-sm-6">
                                    <p class="text-muted">Clock In :</p>
                                    <h4 id="attendance-clock"></h4>
                                </div>
                                <div class="col-sm-6">
                                    <p class="text-muted">Clock In IP:</p>
                                    <h4><?php echo $api->get_ip_address(); ?></h4>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-transparent border-top">
                            <div class="text-center">
                                <?php
                                    $company_details = $api->get_data_details_one_parameter('company', '1');
                                    $get_clock_in_total = $api->get_clock_in_total($emp_id, date('Y-m-d'));
                                    $max_clock_in = $company_details[0]['MAX_CLOCK_IN'];
                                    $get_health_declaration_count = $api->get_health_declaration_count($emp_id, date('Y-m-d'));

                                    if($record_attendance > 0){
                                        if($get_clock_in_total < $max_clock_in){
                                            $attendance_id = $api->check_attendance_clock_out($emp_id);
    
                                            if(!empty($attendance_id)){
                                                echo '<button type="button" class="btn btn-danger waves-effect waves-light me-2 w-md mb-2" id="record-attendance" data-attendance="out">Clock Out</button>';
                                            }
                                            else{
                                                echo '<button type="button" class="btn btn-success waves-effect waves-light me-2 w-md mb-2" id="record-attendance" data-attendance="in">Clock In</button>';
                                            }
                                        }
                                    }

                                    if($health_declaration == 1 && $get_health_declaration_count == 0){
                                        echo '<button type="button" class="btn btn-primary waves-effect waves-light me-2 w-md mb-2" id="healthdeclaration">Health Declaration</button>';
                                    }

                                    if($scan_qr_code_attendance > 0){
                                        echo '<button type="button" class="btn btn-warning waves-effect waves-light me-2 w-md mb-2" id="scan-qr">Scan QR</button>';
                                    }

                                    if($get_location > 0){
                                        echo '<button type="button" class="btn btn-info waves-effect waves-light me-2 w-md mb-2" id="get-location">Get Location</button>';
                                    }
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
              

                <!-- Right column - Birthday and Employee Growth cards -->
                <div class="col-xl-7">
                    <!-- Employee Birthdays card -->
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="card-title mb-4">
                                        <i class="fas fa-birthday-cake text-primary me-2"></i>
                                        Employee Birthdays
                                    </h4>
                                </div>
                                <div class="col-md-6 text-end">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-primary dropdown-toggle" disabled type="button" id="birthdayMonthDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span id="selected-month"><?php echo date('F'); ?></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="birthdayMonthDropdown">
                                            <li><a class="dropdown-item month-option" href="#" data-month="1">January</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="2">February</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="3">March</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="4">April</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="5">May</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="6">June</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="7">July</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="8">August</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="9">September</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="10">October</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="11">November</a></li>
                                            <li><a class="dropdown-item month-option" href="#" data-month="12">December</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Loading State -->
                            <div id="birthday-loader" class="text-center py-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p class="mt-3">Loading birthday data...</p>
                            </div>
                            
                            <!-- Birthday Cards Container -->
                            <div id="birthday-container" class="mt-4" style="display: none;">
                                <div class="row" id="birthday-cards">
                                    <!-- Birthday cards will be dynamically inserted here -->
                                </div>
                            </div>
                            
                            <!-- No Birthdays Message -->
                            <div id="no-birthdays" class="text-center py-5" style="display: none;">
                                <i class="fas fa-calendar-times text-muted" style="font-size: 48px;"></i>
                                <p class="mt-3">No birthdays found for this month.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Work Anniversaries card -->
                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="card-title mb-4">
                                        <i class="fas fa-award text-success me-2"></i>
                                        Work Anniversaries
                                    </h4>
                                </div>
                                <div class="col-md-6 text-end">
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-outline-success dropdown-toggle"  disabled type="button" id="anniversaryMonthDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                            <span id="selected-anniversary-month"><?php echo date('F'); ?></span>
                                        </button>
                                        <ul class="dropdown-menu" aria-labelledby="anniversaryMonthDropdown">
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="1">January</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="2">February</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="3">March</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="4">April</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="5">May</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="6">June</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="7">July</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="8">August</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="9">September</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="10">October</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="11">November</a></li>
                                            <li><a class="dropdown-item anniversary-month-option" href="#" data-month="12">December</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Loading State -->
                            <div id="anniversary-loader" class="text-center py-5">
                                <div class="spinner-border text-success" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <p class="mt-3">Loading work anniversary data...</p>
                            </div>
                            
                            <!-- Anniversary Cards Container -->
                            <div id="anniversary-container" class="mt-4" style="display: none;">
                                <div class="row" id="anniversary-cards">
                                    <!-- Anniversary cards will be dynamically inserted here -->
                                </div>
                            </div>
                            
                            <!-- No Anniversaries Message -->
                            <div id="no-anniversaries" class="text-center py-5" style="display: none;">
                                <i class="fas fa-calendar-times text-muted" style="font-size: 48px;"></i>
                                <p class="mt-3">No work anniversaries found for this month.</p>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                     <div class="row">
                        <!-- New Employees Card (Left Side) -->
                        <div class="col-md-6">
                            <div class="card h-100 mt-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title mb-4">
                                                <i class="fas fa-user-plus text-info me-2"></i>
                                                New Employees
                                            </h4>
                                        </div>
                                        <div class="col-md-6 text-end">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-outline-info dropdown-toggle" type="button" disabled id="newEmployeeMonthDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span id="selected-new-employee-month"><?php echo date('F'); ?></span>
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="newEmployeeMonthDropdown">
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="1">January</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="2">February</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="3">March</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="4">April</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="5">May</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="6">June</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="7">July</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="8">August</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="9">September</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="10">October</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="11">November</a></li>
                                                    <li><a class="dropdown-item new-employee-month-option" href="#" data-month="12">December</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Loading State -->
                                    <div id="new-employee-loader" class="text-center py-5">
                                        <div class="spinner-border text-info" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        <p class="mt-3">Loading new employee data...</p>
                                    </div>
                                    
                                    <!-- New Employee Cards Container -->
                                    <div id="new-employee-container" class="mt-4" style="display: none;">
                                        <div class="row" id="new-employee-cards">
                                            <!-- New employee cards will be dynamically inserted here -->
                                        </div>
                                    </div>
                                    
                                    <!-- No New Employees Message -->
                                    <div id="no-new-employees" class="text-center py-5" style="display: none;">
                                        <i class="fas fa-user-slash text-muted" style="font-size: 48px;"></i>
                                        <p class="mt-3">No new employees joined this month.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Newly Permanent Employees Card (Right Side) -->
                        <div class="col-md-6">
                            <div class="card h-100 mt-4">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title mb-4">
                                                <i class="fas fa-certificate text-success me-2"></i>
                                                Newly Permanent Employees
                                            </h4>
                                        </div>
                                        <div class="col-md-6 text-end">
                                            <div class="dropdown">
                                                <button class="btn btn-sm btn-outline-success dropdown-toggle" disabled type="button" id="permanentEmployeeMonthDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <span id="selected-permanent-employee-month"><?php echo date('F'); ?></span>
                                                </button>
                                                <ul class="dropdown-menu" aria-labelledby="permanentEmployeeMonthDropdown">
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="1">January</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="2">February</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="3">March</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="4">April</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="5">May</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="6">June</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="7">July</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="8">August</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="9">September</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="10">October</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="11">November</a></li>
                                                    <li><a class="dropdown-item permanent-employee-month-option" href="#" data-month="12">December</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Loading State -->
                                    <div id="permanent-employee-loader" class="text-center py-5">
                                        <div class="spinner-border text-success" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        <p class="mt-3">Loading newly permanent employee data...</p>
                                    </div>
                                    
                                    <!-- Newly Permanent Employee Cards Container -->
                                    <div id="permanent-employee-container" class="mt-4" style="display: none;">
                                        <div class="row" id="permanent-employee-cards">
                                            <!-- Newly permanent employee cards will be dynamically inserted here -->
                                        </div>
                                    </div>
                                    
                                    <!-- No Newly Permanent Employees Message -->
                                    <div id="no-permanent-employees" class="text-center py-5" style="display: none;">
                                        <i class="fas fa-certificate text-muted" style="font-size: 48px;"></i>
                                        <p class="mt-3">No employees became permanent this month.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
 
                    <!-- Employee Growth card - Only visible to HR -->
                    <?php if ($employee_monitoring > 0) { ?>
                    <div class="card mt-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4 class="card-title mb-4">Employee Growth</h4>
                                </div>
                            </div>
                            <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-bs-toggle="tab" href="#employee-headcount-tab" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-users"></i></span>
                                        <span class="d-none d-sm-block">Headcount</span>    
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#new-employees-tab" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-user-plus"></i></span>
                                        <span class="d-none d-sm-block">New Employees</span>    
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-bs-toggle="tab" href="#departures-tab" role="tab">
                                        <span class="d-block d-sm-none"><i class="fas fa-user-minus"></i></span>
                                        <span class="d-none d-sm-block">Departures</span>    
                                    </a>
                                </li>
                            </ul>
                            
                            <div class="tab-content p-3 text-muted">
                                <div class="tab-pane active" id="employee-headcount-tab" role="tabpanel">
                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <canvas id="employee-headcount-chart"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="new-employees-tab" role="tabpanel">
                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <canvas id="new-employees-chart"></canvas>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="departures-tab" role="tabpanel">
                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <canvas id="departures-chart"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <?php } ?>
                    
                    <!--<div class="col-xl-7">-->
                    <!--    <div class="card">-->
                    <!--        <div class="card-body">-->
                    <!--            <div class="d-flex justify-content-between align-items-center mb-3">-->
                    <!--                <h4 class="card-title mb-0">-->
                    <!--                    <i class="fas fa-bullhorn text-primary me-2"></i>HR Announcements-->
                    <!--                </h4>-->
                                    <!-- Admin-only button -->
                    <!--                <?php if (isset($_SESSION['user_role']) && ($_SESSION['user_role'] == 'admin' || $_SESSION['user_role'] == 'hr')) { ?>-->
                    <!--                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#newAnnouncementModal">-->
                    <!--                    <i class="fas fa-plus me-1"></i> New Announcement-->
                    <!--                </button>-->
                    <!--                <?php } ?>-->
                    <!--            </div>-->
                                
                                <!-- Announcement Tabs -->
                    <!--            <ul class="nav nav-tabs nav-tabs-custom" role="tablist">-->
                    <!--                <li class="nav-item">-->
                    <!--                    <a class="nav-link active" data-bs-toggle="tab" href="#announcements-tab" role="tab">-->
                    <!--                        <span><i class="fas fa-bullhorn me-1"></i> Announcements</span>-->
                    <!--                    </a>-->
                    <!--                </li>-->
                    <!--            </ul>-->
                                
                                <!-- Tab Content -->
                    <!--            <div class="tab-content p-3">-->
                                    <!-- Announcements Tab -->
                    <!--                <div class="tab-pane fade show active" id="announcements-tab" role="tabpanel">-->
                    <!--                    <div id="announcement-list" class="announcement-container">-->
                                            <!-- Loading indicator -->
                    <!--                        <div class="text-center py-3" id="announcements-loader">-->
                    <!--                            <div class="spinner-border text-primary" role="status">-->
                    <!--                                <span class="visually-hidden">Loading...</span>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                                            
                                            <!-- No announcements message (hidden by default) -->
                    <!--                        <div id="no-announcements" class="text-center py-4 text-muted" style="display: none;">-->
                    <!--                            No announcements to display-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                </div>-->
                                    
                                    <!-- Policies Tab -->
                    <!--                <div class="tab-pane fade" id="policies-tab" role="tabpanel">-->
                    <!--                    <div class="row">-->
                    <!--                        <div class="col-md-12">-->
                    <!--                            <div id="policy-list">-->
                                                    <!-- Loading indicator -->
                    <!--                                <div class="text-center py-3" id="policies-loader">-->
                    <!--                                    <div class="spinner-border text-primary" role="status">-->
                    <!--                                        <span class="visually-hidden">Loading...</span>-->
                    <!--                                    </div>-->
                    <!--                                </div>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                </div>-->
                                    
                                    <!-- Events Tab -->
                    <!--                <div class="tab-pane fade" id="events-tab" role="tabpanel">-->
                    <!--                    <div class="row">-->
                    <!--                        <div class="col-md-12">-->
                    <!--                            <div id="events-list">-->
                                                    <!-- Loading indicator -->
                    <!--                                <div class="text-center py-3" id="events-loader">-->
                    <!--                                    <div class="spinner-border text-primary" role="status">-->
                    <!--                                        <span class="visually-hidden">Loading...</span>-->
                    <!--                                    </div>-->
                    <!--                                </div>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <!--                </div>-->
                    <!--            </div>-->
                    <!--        </div>-->
                    <!--    </div>-->
                    <!--</div>-->
                    
                    <!-- New Announcement Modal (Admin only) -->
                    <?php if ($employee_card > 0){ ?>
                    <div class="modal fade" id="newAnnouncementModal" tabindex="-1" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Create New Announcement</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="announcementForm">
                                        <div class="mb-3">
                                            <label for="announcementTitle" class="form-label">Title</label>
                                            <input type="text" class="form-control" id="announcementTitle" required>
                                        </div>
                                        <div class="mb-3">
                                            <label for="announcementType" class="form-label">Type</label>
                                            <select class="form-select" id="announcementType" required>
                                                <option value="announcement">Announcement</option>
                                                <option value="policy">Policy Update</option>
                                                <option value="event">Event</option>
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="announcementContent" class="form-label">Content</label>
                                            <textarea class="form-control" id="announcementContent" rows="5" required></textarea>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="announcementStartDate" class="form-label">Start Date</label>
                                                <input type="date" class="form-control" id="announcementStartDate" required>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="announcementEndDate" class="form-label">End Date (Optional)</label>
                                                <input type="date" class="form-control" id="announcementEndDate">
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <label for="announcementAttachment" class="form-label">Attachment (Optional)</label>
                                            <input type="file" class="form-control" id="announcementAttachment">
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label for="announcementDepartment" class="form-label">Department (Optional)</label>
                                                <select class="form-select" id="announcementDepartment">
                                                    <option value="">All Departments</option>
                                                    <!-- Add your department options here -->
                                                </select>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label for="announcementBranch" class="form-label">Branch (Optional)</label>
                                                <select class="form-select" id="announcementBranch">
                                                    <option value="">All Branches</option>
                                                    <!-- Add your branch options here -->
                                                </select>
                                            </div>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="announcementPriority">
                                                <label class="form-check-label" for="announcementPriority">
                                                    Mark as Priority
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary" id="saveAnnouncement">Save Announcement</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php } ?>



 
                            
                            <!-- cards -->
                           <?php if ($employee_card > 0){ ?>
                            <div class="col-xl-12">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Employee</p>
                                                        <h4 class="mb-0"><?php echo number_format($get_total_employee_headcount); ?></h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                                            <span class="avatar-title">
                                                                <i class="bx bx-archive font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Regular Employee</p>
                                                        <h4 class="mb-0"><?php echo number_format($get_total_employee_regular); ?></h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center ">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-archive-in font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="card mini-stats-wid">
                                            <div class="card-body">
                                                <div class="d-flex">
                                                    <div class="flex-grow-1">
                                                        <p class="text-muted fw-medium">Probitionary Employee</p>
                                                        <h4 class="mb-0"><?php echo number_format($get_total_employee_probitionary); ?></h4>
                                                    </div>

                                                    <div class="flex-shrink-0 align-self-center">
                                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                                            <span class="avatar-title rounded-circle bg-primary">
                                                                <i class="bx bx-archive-out font-size-24"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <?php } ?>
                                <!-- end row -->

                                <!--<div class="card">-->
                                <!--    <div class="card-body">-->
                                <!--        <div class="row">-->
                                <!--            <div class="col-md-6">-->
                                <!--                <h4 class="card-title mb-4">Latest Transmittal</h4>-->
                                <!--            </div>-->
                         
                                <!--            ?>-->
                                <!--        </div>-->
                                <!--        <div class="row mt-4">-->
                                <!--            <div class="col-md-12">-->
                                <!--                <table id="dashboard-transmittal-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">-->
                                <!--                    <thead>-->
                                <!--                        <tr>-->
                                <!--                            <th class="all" style="width:30%">Description</th>-->
                                <!--                            <th class="all">Transmitted From</th>-->
                                <!--                            <th class="all">Transmitted To</th>-->
                                <!--                            <th class="all">Transmittal Date</th>-->
                                <!--                            <th class="all">Status</th>-->
                                <!--                            <th class="all">Incoming/Outgoing</th>-->
                                <!--                            <th class="all">Action</th>-->
                                <!--                        </tr>-->
                                <!--                    </thead>-->
                                <!--                    <tbody></tbody>-->
                                <!--                </table>-->
                                <!--            </div>-->
                                <!--        </div>-->
                                <!--    </div>-->
                                <!--</div>-->
                            </div>
   <?php
                            echo $api->generate_dashboard_monitoring_widgets(2, $username);
                        ?>
 
                    </div>
                </div>
                <?php
                    require('views/_footer.php');
                ?>
            </div>
        </div>
        
        <script src="https://maps.google.com/maps/api/js?key=AIzaSyCtSAR45TFgZjOs4nBFFZnII-6mMHLfSYI"></script>
        <?php
	        require('views/_scripts.php');
        ?>
        <script src="assets/js/click-events.js"></script>
        <script src="assets/js/on-change-events.js"></script>
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/jquery.repeater/jquery.repeater.min.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/gmaps/gmaps.min.js"></script>
        <script src="assets/libs/html5-qr-code/html5-qrcode.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
       
         
    </body>
</html>
