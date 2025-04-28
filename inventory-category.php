<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Inventory Categories';

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
                                            <h4 class="card-title">Inventory Categories Table</h4>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="float-end">
                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="btn_additem_cat"><i class="bx bx-plus label-icon"></i>Add Categories</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mt-4">
                                        <div class="row">
                                            <!-- <div class="col-md-12">
                                                <label for="dept_owner_cat">Department Owner : </label>
                                                <select name="dept_owner_cat" class="select2 form-control mb-3" id="dept_owner_cat"> 
                                                    <?php echo $api->generate_department_options()?>
                                                </select>
                                            </div> -->
                                        </div>

                                        <div class="col-md-12 mt-3">
                                            <table id="item-category-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Category Code</th>
                                                        <th class="all">Category</th>
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
                                            <h4 class="card-title">Assign Categories per Department Table</h4>
                                        </div>
                                        <!-- <div class="col-md-6">
                                            <div class="float-end">
                                                <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="btn_additem_cat"><i class="bx bx-plus label-icon"></i>Add Categories</button>
                                            </div>
                                        </div> -->

                                    </div>
                                    <div class="mt-4">
                        
                                        <div class="col-md-12 mt-4">
                                            <table id="item-dept-has-cat-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Department</th>
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

            <!-- MODAL for cat add -->
            <div id="mdl_addcateg" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="addcatForm">
                            <div class="modal-body">
                                <!-- <div class="col-md-12">
                                    <label for="additem_dept_owner_cat" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="additem_dept_owner_cat" class="form-control select2 required" id="additem_dept_owner_cat">
                                        <option value="">-- --</option>
                                        <?php echo  $api->generate_department_options(); ?>
                                    </select>
                                </div> -->

                               

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="addcat_code" class="form-label">Category Code<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="addcat_code" id="addcat_code" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="addcat_name" class="form-label">Category Name<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="addcat_name" id="addcat_name" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_addcat_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Edit cat -->

            <div id="mdl_editcateg" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="editcatForm">
                            <div class="modal-body">
                                <!-- <div class="col-md-12">
                                    <label for="edititem_dept_owner_cat" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="edititem_dept_owner_cat" disabled class="form-control select2 required" id="edititem_dept_owner_cat">
                                        <option value="">-- --</option>
                                        <?php echo  $api->generate_department_options(); ?>
                                    </select>
                                </div> -->

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="addcat_code" class="form-label ">Category Code<span class="required">*</span></label>
                                            <input type="text" class="form-control" readonly="readonly" name="editcat_code" id="editcat_code" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="addcat_name" class="form-label">Category Name<span class="required">*</span></label>
                                            <input type="text" class="form-control" name="editcat_name" id="editcat_name" />
                                        </div>
                                    </div>
                                </div>

                                

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_editcat_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        

           
            <!-- Modal for deleting category -->
            <div id="mdl_deletecateg" class="modal fade" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Delete Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="deletecategForm">
                            <div class="modal-body">
                                <input type="hidden" id="cat_code_delete" name="cat_code_delete" />

                                <h4>Are you sure to Delete this? <span id="item_id_container"></span></h4>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_catdel_frm">Delete</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Modal for assigning category -->
            <div id="mdl_assigncateg" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Assign Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="assigncategForm">
                            <div class="modal-body">
                                <input type="hidden" id="dept_id_assign" name="dept_id_assign" />
                                <div class="col-md-12">
                                    
                                <select class="form-control select2" multiple="multiple" name="sel_categories[]" id="sel_categories">
                                        
                                </select>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_assign_dept_cat">Save</button>
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