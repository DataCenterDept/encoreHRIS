<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Rate Calculator';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 376);

	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
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
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Employee Modules</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <form class="cmxform" id="ratecalculatorForm" method="post" action="#">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="amtfin" class="form-label">Amount Financed</label>
                                                        <input class="form-control" type="number" name="amtfin">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="repayment_amount" class="form-label">Repayment Amount</label>
                                                        <input class="form-control" type="number" name="repayment_amount">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="term" class="form-label">Term (In Months)</label>
                                                        <input class="form-control" type="number" name="term">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Frequency of Payment</label>
                                                        <select class="form-control form-select2" id="frequency" name="frequency">
                                                        <option value="">--</option>
                                                        <option value="M">Monthly</option>
                                                        <option value="H">Semi-monthly</option>
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                             <div class="row">
                                                <div class="col-md-12 payment-repeater">
                                                    <div data-repeater-list="fees">
                                                        <div data-repeater-item class="row">
                                                            <div  class="mb-3 col-lg-6">
                                                                <label for="fee" class="form-label">Fee (Do not include : Outstanding Balance, Life Insurance and PA Insurance)</label>
                                                                <input class="form-control" type="text" name="fee">
                                                            </div>
                                                            <div  class="mb-3 col-lg-3">
                                                                <label for="fee_amount" class="form-label">Fee Amount</label>
                                                                <input class="form-control" type="number" name="fee_amount">
                                                            </div>
                                                            <div class="col-lg-3 align-self-center">
                                                                <div class="d-grid">
                                                                    <label class="form-label"></label>
                                                                    <button data-repeater-delete type="button" class="btn btn-danger waves-effect waves-light">
                                                                        <i class="bx bx-trash font-size-16 align-middle"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <input data-repeater-create type="button" class="btn btn-success mt-3 mt-lg-0 mb-3" value="Add Fee"/>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="irr" class="form-label">IRR</label>
                                                        <input type="text" class="form-control text-bold" autocomplete="off" id="irr" value="0.00" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label for="cr" class="form-label">Contractual Rate</label>
                                                        <input type="text" class="form-control text-bold" autocomplete="off" id="cr" value="0.00" readonly>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <button type="submit" class="btn btn-primary" id="submitform" form="ratecalculatorForm">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="assets/libs/jquery.repeater/jquery.repeater.min.js"></script>
        <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    </body>
</html>
