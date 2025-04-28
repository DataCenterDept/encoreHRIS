<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Activity Notes';

# Check role permission
$page_access = $api->check_role_permissions($username, 379);
$add_activity = $api->check_role_permissions($username, 387);;

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
                                <div class="card-body">


                                   <div class="row">
                                   <div class="col-md-12">
                                        <div class="d-flex align-items-start">
                                            <div class="flex-grow-1 align-self-center">
                                                <h4 class="card-title">Activity Table</h4>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <?php
                                                if ($add_activity != 0) {
                                                    echo '<button type="button" class="btn btn-primary waves-effect btn-label waves-light"  id="btn_addactivity"><i class="bx bx-plus label-icon"></i> Add Activity</button>';
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
                                                        <p class="text-muted">Activity Date</p>

                                                        <div class="input-group mb-3" id="filter-start-date-container">
                                                            <input type="text" class="form-control" id="filter_start_date" name="filter_start_date" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-start-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="Start Date">
                                                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                        </div>

                                                        <div class="input-group" id="filter-end-date-container">
                                                            <input type="text" class="form-control" id="filter_end_date" name="filter_end_date" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-end-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="End Date">
                                                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                        </div>
                                                    </div>

                                                    <div class="mb-3">
                                                        <p class="text-muted">Department</p>

                                                        <select class="form-control select2" id="filter_department">
                                                            <option value="">All Department</option>
                                                            <?php echo $api->generate_department_options(); ?>
                                                        </select>
                                                    </div>

                                                    <div class="mb-3">
                                                        <p class="text-muted">Activity Type</p>

                                                        <select class="form-control select2" id="filter_activity_type">
                                                            <option value=''>-- --</option>
                                                            <?php echo $api->generate_activity_type_options(); ?>
                                                        </select>
                                                    </div>


                                                    <div>
                                                        <button type="button" class="btn btn-primary waves-effect waves-light" id="apply-activity-filter" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas">Apply Filter</button>
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
                                        <table id="activity-note-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                            <thead>
                                                <tr>
                                                    <th class="all">Details</th>
                                                    <th class="all">Username</th>
                                                    <!-- <th class="all">Client Name</th> -->
                                                    <th class="">Notes</th>
                                                    <th class="all">Activity Type</th>
                                                    <th class="all">Activity Date</th>
                                                    <th class="all">Mobile Number</th>
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

                <!-- MODAL for item ACTIVITY NOTE   -->
                <div id="mdl_add_activity" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Add Activity</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form action="" id="addactivityForm">
                                <div class="modal-body">

                                    <div class="row">
                                        <label class="form-label">CLIENT INFORMATION </label>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label for="client_fname" class="form-label">Client Name</label>
                                            <input type="text" class="form-control" name="client_name" id="client_name" />
                                         
                                        </div>

                                        <div class="col-md-6">
                                          
                                                <label for="client_num">Phone Number</label>
                                                <input type="text" class="form-control" name="client_num" id="client_num">
                                           
                                        </div>


                                    </div>

                                  

                                    <div class="row">
                                        <label class="form-label mt-4">ACTIVITY DETAILS </label>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <label for="act_type">Activity Type<span class="required">*</span></label>
                                            <select name="act_type" class="form-control select2" id="act_type">
                                            <option value='' selected>-- --</option>
                                                            <?php echo $api->generate_activity_type_options(); ?>
                                            </select>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <label for="act_desc">Description</label>
                                            <textarea name="act_desc" id="act_desc" cols="30" rows="3" class="form-control"></textarea>
                                        </div>

                                    </div>



                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" id="submitform">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



                <div id="mdl_update_activity" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Update Activity</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form action="" id="updateactivityForm">
                                <div class="modal-body">

                                    <div class="row">
                                        <label class="form-label">CLIENT INFORMATION </label>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="client_fname" class="form-label">Client Name</label>
                                            <input type="hidden" name="act_id" id="act_id">
                                            <input type="text" class="form-control" name="upt_client_name" id="upt_client_name" />

                                        </div>

                                        <div class="col-md-6 mb-3">
                                            <label for="client_num">Phone Number</label>
                                            <input type="text" class="form-control" name="upt_client_num" id="upt_client_num">
                                        </div>

                                    </div>

                                   

                                    <div class="row">
                                        <label class="form-label mt-4">ACTIVITY DETAILS </label>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12 mb-2">
                                            <label for="upt_act_type">Activity Type<span class="required">*</span></label>
                                            <select name="upt_act_type" class="form-control select2" id="upt_act_type">
                                            </select>
                                        </div>

                                        <div class="col-md-12 mb-2">
                                            <label for="act_desc">Description</label>
                                            <textarea name="upt_act_desc" id="upt_act_desc" cols="30" rows="3" class="form-control"></textarea>
                                        </div>

                                    </div>



                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" class="btn btn-primary" id="submitform">Submit</button>
                                    </div>
                                </div>
                            </form>
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