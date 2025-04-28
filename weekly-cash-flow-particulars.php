<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Weekly Cash Flow Particulars';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 242);
    $add_weekly_cash_flow_particulars = $api->check_role_permissions($username, 243);
    $update_approved_weekly_cash_flow_projections = $api->check_role_permissions($username, 241);

	if($page_access == 0 || !isset($_GET['id']) || empty($_GET['id'])){
		header('location: 404-page.php');
	}
    else{
        $id = $_GET['id'];
        $wcf_id = $api->decrypt_data($id);

        $weekly_cash_flow_details = $api->get_data_details_one_parameter('weekly cash flow', $wcf_id);
        $wcf_status = $weekly_cash_flow_details[0]['STATUS'];
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
                                            <li class="breadcrumb-item"><a href="weekly-cash-flow-projection.php">Weekly Cash Flow Projection</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                            <li class="breadcrumb-item" id="wcf-id"><?php echo $wcf_id; ?></li>
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
                                            <div class="col-md-6">
                                                <h4 class="card-title">Weekly Cash Flow Particular Table</h4>
                                            </div>
                                            <?php
                                                if(($wcf_status == '0' || (($wcf_status == '1' || $wcf_status == '3') && $update_approved_weekly_cash_flow_projections > 0)) && $add_weekly_cash_flow_particulars > 0){
                                                    echo '<div class="col-md-6">
                                                        <div class="float-end">
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-weekly-cash-flow-particulars"><i class="bx bx-plus label-icon"></i> Add Weekly Cash Flow Particulars</button>
                                                        </div>
                                                    </div>';
                                                }
                                            ?>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="weekly-cash-flow-particulars-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all">Details</th>
                                                            <th class="all">Weekly Cash Flow Type</th>
                                                            <th class="all">Weekly Cash Flow Loan Type</th>
                                                            <th class="all">Monday</th>
                                                            <th class="all">Tuesday</th>
                                                            <th class="all">Wednesday</th>
                                                            <th class="all">Thursday</th>
                                                            <th class="all">Friday</th>
                                                            <th class="all">Total</th>
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
        <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    </body>
</html>