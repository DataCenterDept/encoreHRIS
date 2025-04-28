<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'PDC Monitoring';

# Check role permission
$page_access = $api->check_role_permissions($username, 398);
$add_pdc_monitoring = $api->check_role_permissions($username, 399);
$add_remarkd_pdc_monitoring = $api->check_role_permissions($username, 402);

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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Employee Module</a></li>
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
                                        <div class="col-md-6">
                                            <h4 class="card-title">PDC Monitoring Table</h4>
                                            <p class="card-title-desc" id="filter-text"></p>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="float-end">
                                                <div class="d-flex gap-2">
                                                    <?php if ($add_pdc_monitoring>=1){?>
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-pdc-monitoring"><i class="bx bx-plus label-icon"></i> Add </button>
                                                    <?php }?>
                                                    <button type="button" class="btn btn-primary waves-effect btn-label waves-light" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas"><i class="bx bx-filter-alt label-icon"></i> Filter</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="offcanvas offcanvas-end" tabindex="-1" id="filter-off-canvas" data-bs-backdrop="true" aria-labelledby="filter-off-canvas-label">
                                        <div class="offcanvas-header">
                                            <h5 class="offcanvas-title" id="filter-off-canvas-label">Filter</h5>
                                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div class="offcanvas-body">
                                            <div class="mb-3">
                                                <p class="text-muted">Date/Time Created</p>

                                                <div class="input-group mb-3" id="filter-start-date-container">
                                                    <input type="text" class="form-control" id="filter_start_date" name="filter_start_date" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-start-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="Start Date">
                                                    <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                </div>

                                                <div class="input-group" id="filter-end-date-container">
                                                    <input type="text" class="form-control" id="filter_end_date" name="filter_end_date" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#filter-end-date-container" data-provide="datepicker" data-date-autoclose="true" data-date-orientation="right" placeholder="End Date">
                                                    <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                                </div>
                                            </div>
                                         
                                       
                                           
                                            <div>
                                                <button type="button" class="btn btn-primary waves-effect waves-light" id="apply-pdc-monitoring1-filter" data-bs-toggle="offcanvas" data-bs-target="#filter-off-canvas" aria-controls="filter-off-canvas">Apply Filter</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-4">
                                        <div class="col-md-12">
                                            <table id="pdc-monitoring1-datatable" class="table table-bordered align-middle mb-0 table-hover table-striped dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Loan Number</th>
                                                        <th class="all">Number of Lacking PDC</th>
                                                        <th class="all">Assign to</th>
                                                        <th >Branch : </th>
                                                        <th >Undertaking : </th>
                                                        <th>Encoded By :</th>
                                                        <th class="all">Date/Time Created</th>
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



    
    <!-- Add modal -->
    <div id="mdl_add_pdc_monitor" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Monitoring</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="" id="submitaddpdcmonitoringForm">
                    <div class="modal-body">

                        <div class="col-md-12 mb-4">
                            <label for="loan_num">Loan Number</label>
                            <input type="number" class="form-control" id="loan_num" name="loan_num">
                        </div>

                        <div class="col-md-12 mb-4">
                            <label for="curr_pdc_num">Current PDC Number</label>
                            <input type="number" class="form-control" id="curr_pdc_num" name="curr_pdc_num">
                        </div>


                     



                        <div class="col-md-12 mb-4">
                            <label for="undertaking">Undertaking (optional)</label>
                           <textarea name="undertaking" class="form-control" id="undertaking" rows="5"></textarea>
                        </div>

                        <div class="col-md-12 mb-4">

                        <div class="row">

                            <div class="col-md-6">
                                <label for="pdc_number_update">Assign partner</label>
                                <select class="form-control select2" name="assign_emp_add" id="assign_emp_add" >
                                    <?php echo $api->generate_employee_options_by_department(null,'DEPT5')?>
                                </select>
                            </div>

                            <div class="col-md-6">
                                <label for="pdc_number_update">Branch</label>
                                <select class="form-control select2" name="branch" id="branch" >
                                    <?php echo $api->generate_branch_options()?>
                                </select>
                            </div>

                        </div>
                           
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-warning">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>



    <!--pdc remarks view -->
    <div id="mdl_view_pdc_monitor" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg" >
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">View PDC Monitoring of <b id="loan_number_container"></b></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="">
                    <div class="modal-body" style="background-color: #f8f8fb;">

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title">PDC Remarks</h4>
                                            <p class="card-title-desc" id="filter-text"></p>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="float-end">
                                                <div class="d-flex gap-2">
                                                    <?php if($add_remarkd_pdc_monitoring>=1){?>
                                                        <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="add-pdc-remarks-monitoring"><i class="bx bx-plus label-icon"></i> Add </button>
                                                        <?php }?>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <input type="hidden" name="id_monitoring_view" id="id_monitoring_view">
                            <div id="remarks_container"></div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <!-- <button type="submit" class="btn btn-warning">Save</button> -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>





    <div id="mdl_add_pdc_remarks_monitor" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add New Remarks Monitoring</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="" id="submitaddpdcremarksmonitoringForm">
                    <div class="modal-body">

                        <div class="col-md-12 mb-4">
                            <label for="pdc_remarks">Remarks</label>
                            <textarea name="pdc_remarks" id="pdc_remarks" class="form-control" rows="10"></textarea>
                        </div>

                        
                    </div>

                    <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-warning">Save</button>
                        </div>
                </form>
            </div>
        </div>
    </div>



    <div id="mdl_update_pdc_monitor" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Update Monitoring</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="" id="submitupdatepdcnumbermonitoringForm">
                    <div class="modal-body">

                        <div class="col-md-12 mb-4">
                            <label for="pdc_number_update">Check Number</label>
                            <input type="hidden" name="pdc_check_number_id_monitoring" id="pdc_check_number_id_monitoring">
                            <input type="number" class="form-control" name="pdc_number_update" id="pdc_number_update">
                        </div>


                        <div class="col-md-12 mb-4">
                       
                            <label for="undertaking">Undertaking (optional)</label>
                           <textarea name="undertaking_update" class="form-control" id="undertaking_update" rows="5"></textarea>
                        </div>

                            
                        <div class="col-md-12 mb-4">
                            <div class="row">
                                <div class="col-md-6">
                                    <label for="pdc_number_update">Assign partner</label>
                                    <select name="assign_emp_update" id="assign_emp_update" class="form-control select2">
                                        <?php echo $api->generate_employee_options_by_department(null,'DEPT5')?>    
                                    </select>
                                </div>

                                <div class="col-md-6">
                                    <label for="pdc_number_update">Branch</label>
                                    <select name="branch_update" id="branch_update" class="form-control select2">
                                        <?php echo $api->generate_branch_options()?>    
                                    </select>
                                </div>

                            </div>

                        

                        </div>

                        
                    </div>

                    <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-warning">Save</button>
                        </div>
                </form>
            </div>
        </div>
    </div>



    








  <?php
    require('views/_scripts.php');
    ?>

    <script src="assets/js/click-events.js?v=<?php echo rand() ?>"></script>
    <script src="assets/js/on-change-events.js?v=<?php echo rand() ?>"></script>
    <script src="assets/js/form-validation.js?v=<?php echo rand() ?>"></script>
    <script src="assets/js/datatable.js"></script>

    <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
    <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
    <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
    <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="assets/libs/select2/js/select2.min.js"></script>
    <script src="assets/libs/moment/moment-with-locales.min.js"></script>
        <script src="assets/libs/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
    <script src="assets/libs/datatables.net-buttons-bs4/js/buttons.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.html5.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.print.min.js"></script>
    <script src="assets/libs/datatables.net-buttons/js/buttons.colVis.min.js"></script>
        <script src="assets/libs/jszip/jszip.min.js"></script>
    <script src="assets/libs/pdfmake/build/pdfmake.min.js"></script>
        <script src="assets/libs/pdfmake/build/vfs_fonts.js"></script>

    <script>
            $(".select2").select2({});
    </script>



</body>

</html>