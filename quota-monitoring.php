<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Quota Monitoring';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 25);

	if($page_access == 0){
		header('location: 404-page.php');
	}
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
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row">
                            <!-- Forms -->
                            <div class="col-xl-3">          
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <form class="cmxform" id="salesPartnerBookingForm" method="post" action="#">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <label for="sales_partner_booking_file" class="form-label">Sales Partner Booking File</label><br/>
                                                                <input class="form-control mb-4" type="file" name="sales_partner_booking_file" id="sales_partner_booking_file">
                                                    
                                                                <label for="submission_type" class="form-label">Submission Type</label><br/>
                                                                <select name="submission_type" id="submission_type" class="form-select">
                                                                    <option value="additional">Additional Data</option>
                                                                    <option value="replacement">Replacement Data</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-primary" id="submitform" form="salesPartnerBookingForm">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <form class="cmxform" id="positionMonthlyQuotaForm" method="post" action="#">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <label for="position_monthly_quota_file" class="form-label">Position Monthly Quota File</label><br/>
                                                                <input class="form-control" type="file" name="position_monthly_quota_file" id="position_monthly_quota_file">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-primary" id="submitform" form="positionMonthlyQuotaForm">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <form class="cmxform" id="positionMonthlyQuotaHistoryForm" method="post" action="#">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <label for="position_monthly_quota_history_file" class="form-label">Position Monthly Quota History File</label><br/>
                                                                <input class="form-control" type="file" name="position_monthly_quota_history_file" id="position_monthly_quota_history_file">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-primary" id="submitform" form="positionMonthlyQuotaHistoryForm">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <form class="cmxform" id="branchMonthlyQuotaHistoryForm" method="post" action="#">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <label for="branch_monthly_quota_history_file" class="form-label">Branch Monthly Quota History File</label><br/>
                                                                <input class="form-control" type="file" name="branch_monthly_quota_history_file" id="branch_monthly_quota_history_file">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="mb-3">
                                                                <button type="submit" class="btn btn-primary" id="submitform" form="branchMonthlyQuotaHistoryForm">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Forms -->
                            
                            <!-- Table -->
                            <div class="col-xl-9">
                                <div class="card">
                                    <div class="card-body">
                                        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" data-bs-toggle="tab" href="#sales-partner-booking-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-calendar-alt"></i></span>
                                                    <span class="d-none d-sm-block">Sales Partner Booking</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#position-monthly-quota-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-calendar-check"></i></span>
                                                    <span class="d-none d-sm-block">Position Monthly Quota</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#position-monthly-quota-history-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-user-clock"></i></span>
                                                    <span class="d-none d-sm-block">Position Quota History</span>    
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-bs-toggle="tab" href="#branch-monthly-quota-history-tab" role="tab">
                                                    <span class="d-block d-sm-none"><i class="fas fa-file-alt"></i></span>
                                                    <span class="d-none d-sm-block">Branch Quota History</span>    
                                                </a>
                                            </li>
                                        </ul>
                                        
                                        <div class="tab-content p-3 text-muted">
                                            <div class="tab-pane active" id="sales-partner-booking-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="sales-partner-booking-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:28%">ID</th>
                                                                    <th class="all" style="width:27%">Full Name</th>
                                                                    <th class="all" style="width:15%">Branch</th>
                                                                    <th class="all" style="width:15%">Amount</th>
                                                                    <th class="all"  style="width:15%">Disbursement Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="position-monthly-quota-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="position-monthly-quota-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all" style="width:%20">ID</th>
                                                                    <th class="all" style="width:40%">Position Name</th>
                                                                    <th class="all" style="width:40%">Quota</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="position-monthly-quota-history-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="position-monthly-quota-history-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all">ID</th>
                                                                    <th class="all">Full Name</th>
                                                                    <th class="all">Quota ID</th>
                                                                    <th class="all">Date</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody></tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane" id="branch-monthly-quota-history-tab" role="tabpanel">
                                                <div class="row mt-4">
                                                    <div class="col-md-12">
                                                        <table id="branch-monthly-quota-history-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                            <thead>
                                                                <tr>
                                                                    <th class="all">ID</th>
                                                                    <th class="all">Branch</th>
                                                                    <th class="all">Quota</th>
                                                                    <th class="all">Date</th>
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
                            <!-- End Table -->
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