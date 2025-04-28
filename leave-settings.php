<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Leave Setting';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 51);
    $add_leave_type = $api->check_role_permissions($username, 52);

	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/tui-calendar/tui-calendar.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/tui-date-picker/tui-date-picker.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/tui-time-picker/tui-time-picker.min.css" rel="stylesheet" type="text/css" />
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
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Administrator Modules</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Settings</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <h4 class="card-title">Leave Type Table</h4>
                                            </div>
                                            <?php
                                                if($add_leave_type > 0){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end button-items">
                                                            <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-leave-type"><i class="bx bx-plus label-icon"></i> Add Leave Type</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="leave-type-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all" style="width:60%">Leave</th>
                                                            <th class="all" style="width:15%">No of Leaves</th>
                                                            <th class="all" style="width:15%">Paid Status</th>
                                                            <th class="all" style="width:10%">Action</th>
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
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/tui-code-snippet/tui-code-snippet.min.js"></script>
        <script src="assets/libs/tui-dom/tui-dom.min.js"></script>
        <script src="assets/libs/tui-date-picker/tui-date-picker.min.js"></script>
        <script src="assets/libs/tui-time-picker/tui-time-picker.min.js"></script>
        <script src="assets/libs/tui-calendar/tui-calendar.min.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
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
