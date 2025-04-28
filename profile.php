<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Profile';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 27);

	if($page_access == 0){
		header('location: 404-page.php');
	}

    $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
    $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css">
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
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
                            <div class="col-md-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0 font-size-18"><?php echo $page_title; ?></h4>
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                            <li class="breadcrumb-item" id="employee-id"><?php echo $employee_id; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <form class="cmxform" id="profileForm" method="post" action="#">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label for="profile_image" class="form-label">Profile Image</label><br/>
                                                        <img class="rounded-circle avatar-xl mb-3" alt="profile image" width="150" src="" id="profile-img" data-holder-rendered="true">
                                                        <input class="form-control" type="file" name="profile_image" id="profile_image">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="firstname" class="form-label">First Name</label>
                                                        <input type="text" class="form-control" autocomplete="off" id="firstname" name="firstname"readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="middlename" class="form-label">Middle Name</label>
                                                        <input type="text" class="form-control" autocomplete="off" id="middlename" name="middlename" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="lastname" class="form-label">Last Name</label>
                                                        <input type="text" class="form-control" autocomplete="off" id="lastname" name="lastname" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Suffix</label>
                                                        <select class="form-control select2" id="suffix" name="suffix" disabled>
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_system_options('SUFFIX'); ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="password" class="form-label">Password</label>
                                                        <div class="input-group auth-pass-inputgroup">
                                                            <input type="password" id="password" name="password" class="form-control" aria-label="Password" aria-describedby="password-addon">
                                                            <button class="btn btn-light " type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Gender</label>
                                                        <select class="form-control select2" id="gender" name="gender" disabled>
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_system_options('GENDER'); ?>                                                    
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label class="form-label">Birthday</label>
                                                        <input type="text" class="form-control" autocomplete="off" id="birthday" name="birthday" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="email" class="form-label">Email</label>
                                                        <input id="email" name="email" class="form-control email-inputmask maxlength" maxlength="50" autocomplete="off" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="phone" class="form-label">Mobile Number</label>
                                                        <input type="text" class="form-control maxlength" autocomplete="off" id="phone" name="phone" maxlength="30" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="telephone" class="form-label">Telephone</label>
                                                        <input type="text" class="form-control maxlength" autocomplete="off" id="telephone" name="telephone" maxlength="30" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label for="address" class="form-label">Address</label>
                                                        <textarea class="form-control maxlength" id="address" name="address" maxlength="500" rows="5" readonly></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <button type="submit" class="btn btn-primary" id="submitform" form="profileForm">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6">

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
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="profile-employee-leave-entitlement-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:40%">Leave</th>
                                                                    <th class="all" style="width:25%">Entitled Leave</th>
                                                                    <th class="all" style="width:35%">Date Coverage</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="leaves-taken-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="profile-employee-leave-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:40%">Leave</th>
                                                                    <th class="all" style="width:40%">Date</th>
                                                                    <th class="all" style="width:20%">Status</th>
                                                                    <th class="none">Attachement</th>
                                                                    <th class="none">Reason</th>
                                                                    <th class="none">Cancelation Reason</th>
                                                                    <th class="none">Rejection Reason</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="attendance-logs-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="profile-employee-attendance-logs-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:30%">Time In</th>
                                                                    <th class="none">Time In By</th>
                                                                    <th class="none">Time In IP</th>
                                                                    <th class="all" style="width:30%">Time Out</th>
                                                                    <th class="none">Time Out By</th>
                                                                    <th class="none">Time Out IP</th>
                                                                    <th class="all" style="width:10%">Total Hours</th>
                                                                    <th class="all" style="width:10%">Late</th>
                                                                    <th class="all" style="width:10%">Early Leave</th>
                                                                    <th class="all" style="width:10%">Overtime</th>
                                                                    <th class="none">Remarks</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="documents-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="profile-employee-document-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all">Document</th>
                                                                    <th class="all">Category</th>
                                                                    <th class="all">Document Note</th>
                                                                    <th class="all">Document Date</th>
                                                                    <th>Uploaded Date</th>
                                                                    <th>Uploaded By</th>
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
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    </body>
</html>