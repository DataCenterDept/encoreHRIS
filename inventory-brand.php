<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = ' Category Brands';

# Check role permission
$page_access = $api->check_role_permissions($username, 64);
$apply_leave = $api->check_role_permissions($username, 314);
if ($page_access == 0) {
    header('location: 404-page.php');
} ?>
<?php
require('views/_head.php');
?>
<link href="assets/libs/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css" />
<link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
<link href="assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
<link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />

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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Inventory Modules</a></li>
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Inventory Categories</a></li>
                                        <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title">Inventory Brands Table</h4>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="float-end">
                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="btn_addcat_brand"><i class="bx bx-plus label-icon"></i>Add Brand</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mt-4">
                                        <!-- <div class="row">
                                            <div class="col-md-6">
                                                <label for="dept_owner_cat">Department Owner : </label>
                                                <select name="dept_owner_brand" class="select2 form-control mb-3" id="dept_owner_brand"> 
                                               <?php echo $api->generate_department_options()?>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="brand_cat">Category : </label>
                                                <select name="brand_cat" class="select2 form-control mb-3" id="brand_cat"> </select>
                                            </div>
                                        </div> -->

                                        <div class="col-md-12 mt-3">
                                            <table id="item-brand-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Brand Code</th>
                                                        <th class="all">Brand name</th>
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


                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <h4 class="card-title">Assign Brands in Category Table</h4>
                                        </div>
                                        <!-- <div class="col-md-6">
                                            <div class="float-end">
                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="btn_addcat_brand"><i class="bx bx-plus label-icon"></i>Add Brand</button>
                                            </div>
                                        </div> -->

                                    </div>
                                    <div class="mt-4">
                                        <!-- <div class="row">
                                            <div class="col-md-6">
                                                <label for="dept_owner_cat">Department Owner : </label>
                                                <select name="dept_owner_brand" class="select2 form-control mb-3" id="dept_owner_brand"> 
                                               <?php echo $api->generate_department_options()?>
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="brand_cat">Category : </label>
                                                <select name="brand_cat" class="select2 form-control mb-3" id="brand_cat"> </select>
                                            </div>
                                        </div> -->

                                        <div class="col-md-12 mt-3">
                                            <table id="item-assign-cat-brand-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Category Name</th>
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

            <!-- MODAL for brand add -->
            <div id="mdl_brand_add" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Brand</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="addbrandForm">
                            <div class="modal-body">

                                <div class="row">

                                <!-- <div class="col-md-6">
                                    <label for="addbrand_dept_owner" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="addbrand_dept_owner" class="form-control select2 required" id="addbrand_dept_owner">
                                        <option value="">-- --</option>
                                        <?php echo  $api->generate_department_options();?>
                                    </select>
                                </div> -->


                                <!-- <div class="col-md-6">
                                    <label for="addbrand_cat" class="form-label">Category:<span class="required">*</span></label>
                                    <select name="addbrand_cat" class="form-control select2 required" id="addbrand_cat">
                                        <option value="">-- --</option>
                                        
                                    </select>
                                </div> -->

                                </div>

                               

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="addbrand_code" class="form-label">Brand Code<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="addbrand_code" id="addbrand_code" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="addbrand_name" class="form-label">Brand Name<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="addbrand_name" id="addbrand_name" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_addbrand_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Edit Brand -->

            <div id="mdl_editbrand" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Brand</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="editbrandForm">
                            <div class="modal-body">

                                <div class="row">

                                <!-- <div class="col-md-6">
                                    <label for="editbrand_dept_owner" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="editbrand_dept_owner" class="form-control select2 required" id="editbrand_dept_owner">
                                        <option value="">-- --</option>
                                        <?php echo  $api->generate_department_options();?>
                                    </select>
                                </div> -->


                                <!-- <div class="col-md-6">
                                    <label for="editbrand_cat" class="form-label">Category:<span class="required">*</span></label>
                                    <select name="editbrand_cat" class="form-control select2 required" id="editbrand_cat">
                                        <option value="">-- --</option>
                                        
                                    </select>
                                </div> -->


                                </div>


                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="editbrand_code" class="form-label">Brand Code<span class="required">*</span></label>
                                            <input type="text" class="form-control" readonly="readonly" name="editbrand_code" id="editbrand_code" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="editbrand_name" class="form-label">Brand Name<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="editbrand_name" id="editbrand_name" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_editbrand_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <div id="mdl_editbrand" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="editbrandForm">
                            <div class="modal-body">

                                <div class="row">

                                <!-- <div class="col-md-6">
                                    <label for="editbrand_dept_owner" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="editbrand_dept_owner" class="form-control select2 required" id="editbrand_dept_owner">
                                        <option value="">-- --</option>
                                        <?php echo  $api->generate_department_options();?>
                                    </select>
                                </div> -->


                                <!-- <div class="col-md-6">
                                    <label for="editbrand_cat" class="form-label">Category:<span class="required">*</span></label>
                                    <select name="editbrand_cat" class="form-control select2 required" id="editbrand_cat">
                                        <option value="">-- --</option>
                                        
                                    </select>
                                </div> -->


                                </div>


                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="editbrand_code" class="form-label">Brand Code<span class="required">*</span></label>
                                            <input type="text" class="form-control" readonly="readonly" name="editbrand_code" id="editbrand_code" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="editbrand_name" class="form-label">Brand Name<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="editbrand_name" id="editbrand_name" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_editbrand_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <!-- Modal for deleting brand -->
            <div id="mdl_deletebrand" class="modal fade" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Brand</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="deletebrandForm">
                            <div class="modal-body">
                                <input type="hidden" id="delete_brand_code" name="delete_brand_code" />

                                <h4>Are you sure to Delete this? <span id="item_id_container"></span></h4>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_branddel_frm">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


              <!-- Modal for assigning category -->
              <div id="mdl_assignbrand" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Assign Brand</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="assignbrandForm">
                            <div class="modal-body">
                                <input type="hidden" id="cat_code_assign" name="cat_code_assign" />
                                <div class="col-md-12">
                                    
                                <select class="form-control select2" multiple="multiple" name="sel_brand[]" id="sel_brand">
                                        
                                </select>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_assign_cat_brand">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>




            
            <?php
            require('views/_footer.php');
            ?>
        </div>
        <?php
        require('views/_scripts.php');
        ?>
                
        <script src="https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"></script>
        <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
        <script src="assets/libs/qrcode/qr-generator.min.js"></script>
        <script src="assets/libs/qrcode/html5-qrcode.min.js"></script>
        <script src="assets/js/click-events.js"></script>
        <script src="assets/js/on-change-events.js"></script>
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>


        <script>
            $(".select2").select2({});
        </script>
    </div>
</body>