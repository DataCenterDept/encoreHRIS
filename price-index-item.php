<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Price Index Item';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 357);
    $add_price_index_item = $api->check_role_permissions($username, 358);
    $import_price_index_item = $api->check_role_permissions($username, 361);

	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
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
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Price Index</a></li>
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
                                            <div class="d-flex align-items-start">
                                                <div class="flex-grow-1 align-self-center">
                                                    <h4 class="card-title">Price Index Item Table</h4>
                                                </div>
                                                <div class="d-flex gap-2">
                                                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Options <i class="mdi mdi-chevron-down"></i>
                                                    </button>
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <?php
                                                            if($add_price_index_item > 0){
                                                                echo '<a class="dropdown-item" href="javascript: void(0);" id="add-price-index-item">Add Price Index Item</a>';
                                                            }

                                                            if($import_price_index_item > 0){
                                                                echo '<a class="dropdown-item" href="javascript: void(0);" id="import-price-index-item">Import Price Index Item</a>';
                                                            }
                                                        ?>
                                                    </div>
                                                    <button type="button" class="btn btn-info waves-effect btn-label waves-light" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas"><i class="bx bx-filter-alt label-icon"></i> Filter</button>
                                                </div>

                                                <div class="offcanvas offcanvas-end" tabindex="-1" id="filter-off-canvas" data-bs-backdrop="true" aria-labelledby="filter-off-canvas-label">
                                                    <div class="offcanvas-header">
                                                        <h5 class="offcanvas-title" id="filter-off-canvas-label">Filter</h5>
                                                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                    </div>
                                                    <div class="offcanvas-body">
                                                        <div class="mb-3">
                                                            <p class="text-muted">Brand</p>

                                                            <select class="form-control filter-select2" id="filter_brand">
                                                                <option value="">All Brand</option>
                                                                <?php echo $api->generate_car_search_parameter_options('BRAND'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Model</p>

                                                            <select class="form-control filter-select2" id="filter_model">
                                                                <option value="">All Model</option>
                                                                <?php echo $api->generate_car_search_parameter_options('MODEL'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Variant</p>

                                                            <select class="form-control filter-select2" id="filter_variant">
                                                                <option value="">All Variant</option>
                                                                <?php echo $api->generate_car_search_parameter_options('VARIANT'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Engine Size</p>

                                                            <select class="form-control filter-select2" id="filter_engine_size">
                                                                <option value="">All Engine Size</option>
                                                                <?php echo $api->generate_car_search_parameter_options('ENGINESIZE'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Gas Type</p>

                                                            <select class="form-control filter-select2" id="filter_gas_type">
                                                                <option value="">All Gas Type</option>
                                                                <?php echo $api->generate_car_search_parameter_options('GASTYPE'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Transmission</p>

                                                            <select class="form-control filter-select2" id="filter_transmission">
                                                                <option value="">All Transmission</option>
                                                                <?php echo $api->generate_car_search_parameter_options('TRANSMISSION'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Drive Train</p>

                                                            <select class="form-control filter-select2" id="filter_drive_train">
                                                                <option value="">All Drive Train</option>
                                                                <?php echo $api->generate_car_search_parameter_options('DRIVETRAIN'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Body Type</p>

                                                            <select class="form-control filter-select2" id="filter_body_type">
                                                                <option value="">All Body Type</option>
                                                                <?php echo $api->generate_car_search_parameter_options('BODYTYPE'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Seating Capacity</p>

                                                            <select class="form-control filter-select2" id="filter_seating_capacity">
                                                                <option value="">All Seating Capacity</option>
                                                                <?php echo $api->generate_car_search_parameter_options('SEATINGCAPACITY'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Camshaft Profile</p>

                                                            <select class="form-control filter-select2" id="filter_camshaft_profile">
                                                                <option value="">All Camshaft Profile</option>
                                                                <?php echo $api->generate_car_search_parameter_options('CAMSHAFTPROFILE'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Color Type</p>

                                                            <select class="form-control filter-select2" id="filter_color_type">
                                                                <option value="">All Color Type</option>
                                                                <?php echo $api->generate_car_search_parameter_options('COLORTYPE'); ?>
                                                            </select>
                                                        </div>
                                                        <div class="mb-3">
                                                            <p class="text-muted">Aircon Type</p>

                                                            <select class="form-control filter-select2" id="filter_aircon_type">
                                                                <option value="">All Aircon Type</option>
                                                                <?php echo $api->generate_car_search_parameter_options('AIRCONTYPE'); ?>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <button type="button" class="btn btn-primary waves-effect waves-light" id="apply-price-index-filter" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas">Apply Filter</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col-md-12">
                                                <table id="price-index-item-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                    <thead>
                                                        <tr>
                                                            <th class="all" style="width:10%">#</th>
                                                            <th class="all" style="width:70%">Item</th>
                                                            <th class="all" style="width:20%">Action</th>
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
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script>
            $('.filter-select2').select2({
                dropdownParent: $('#filter-off-canvas')
            });
        </script>
    </body>
</html>
