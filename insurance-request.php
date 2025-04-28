<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Insurance Request';

# Check role permission
$page_access = $api->check_role_permissions($username, 389);
$addinsurancereq = $api->check_role_permissions($username, 390);

if ($page_access == 0) {
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
<link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
<style>

.truncate {
  max-width:200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
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
                                <div class="card-body ">


                                   <div class="row">
                                   <div class="col-md-12 ">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1 align-self-center">
                                                <h4 class="card-title">Insurance Request Table</h4>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <?php
                                                if ($addinsurancereq != 0) {
                                                    echo '<a href="insurance-request-create-update.php" class="btn btn-primary waves-effect btn-label waves-light"> <i class="bx bx-plus label-icon"></i>Add Request </a>';
                                                }


                                                ?>
                                                <button type="button" class="btn btn-info waves-effect btn-label waves-light" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas"><i class="bx bx-filter-alt label-icon"></i> Filter</button>
                                            </div>

                                            <div class="offcanvas offcanvas-end" tabindex="-1" id="filter-off-canvas" data-bs-backdrop="true" aria-labelledby="filter-off-canvas-label">
                                                <div class="offcanvas-header">
                                                    <h5 class="offcanvas-title" id="filter-off-canvas-label">Filter</h5>
                                                    <h5 class="offcanvas-title" id="filter-off-canvas-label">Filter</h5>
                                                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div class="offcanvas-body">
                                                    <div class="mb-3">
                                                        <p class="text-muted">Requested Date</p>

                                                        <div class="input-group mb-3" id="filter-start-date-container">
                                                            <input type="text" class="form-control" id="filter_start_date" name="filter_start_date" value="<?php echo date('m/01/Y') ?>" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-start-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="Start Date">
                                                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                        </div>

                                                        <div class="input-group" id="filter-end-date-container">
                                                            <input type="text" class="form-control" id="filter_end_date" name="filter_end_date"  value="<?php echo date('m/t/Y') ?>" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-end-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="End Date">
                                                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <p class="text-muted">Status</p>

                                                        <select class="form-control select2" id="filter_insurance_status">
                                                            <option value="">all</option>
                                                            <option value="pending" selected>Pending</option>
                                                            <option value="complete">Complete</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </div>

                                                    <div class="mb-3">
                                                        <!-- <p class="text-muted">Activity Type</p>

                                                        <select class="form-control select2" id="filter_activity_type">
                                                            <option value=''>-- --</option>
                                                            <?php echo $api->generate_activity_type_options(); ?>
                                                        </select> -->
                                                    </div>


                                                    <div>
                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="apply-insurance-request-filter" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas">Apply Filter</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                </div>


                                <div class="row">
                                <div class="col-md-12">
                                    <div class="mt-3">
                                        <table id="insurance-request-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                            <thead>
                                                <tr>
                                                    <th class="all">Client Name</th>
                                                    <th class="all">Collateral ID</th>
                                                    <th class="all">Year Model</th>
                                                    <th class="all">Unit/Description</th>
                                                    <th >Requested By</th>
                                                    <th >Requested Date</th>
                                                    <th>Status</th>
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
    <script src="assets/libs/select2/js/select2.min.js"></script>
    <script src="assets/libs/jquery.repeater/jquery.repeater.min.js"></script>
    <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
    <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.colVis.min.js"></script>
    <script src="assets/libs/jszip/jszip.min.js"></script>
    <script src="assets/libs/pdfmake/build/pdfmake.min.js"></script>
    <script src="assets/libs/pdfmake/build/vfs_fonts.js"></script>
    <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script>
        $(".select2").select2({});
    </script>
</body>

</html>