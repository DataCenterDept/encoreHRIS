<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Inventory';

# Check role permission
$user_dept ='all'; 
$page_access = $api->check_role_permissions($username, 336);
$view_all_items = $api->check_role_permissions($username,314);
$add_item = $api->check_role_permissions($username,337);
$scan_item = $api->check_role_permissions($username,347);
if ($page_access == 0) {
    header('location: 404-page.php');
}
if ($view_all_items==0) {
    if($username=="admin"){
        $user_dept ='all'; 
    }else{
        $user_dept = $api->get_data_details_one_parameter('employee profile',$username)[0]['DEPARTMENT'];
    }
}
//
?>
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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Inventory Items</a></li>
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
                                            <h4 class="card-title">Inventory Item Table</h4>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="float-end">
                                                <?php 
                                                if($add_item!=0)
                                                {
                                                    echo ' <button type="button" class="btn btn-primary waves-effect btn-label waves-light" id="btn_additem"><i class="bx bx-plus label-icon"></i>Add items</button>';
                                                }
                                                ?>
                                               
                                            </div>
                                        </div>

                                    </div>
                                    <div class="mt-4">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <input type="hidden" id="user_dept" value="<?php echo $user_dept?>">
                                            </div>
                                            <div class="col-md-5">
                                                <label for="dept_owner">Department Owner : </label>
                                                <select name="dept_owner" class="select2 form-control mb-3" id="dept_owner"> </select>
                                            </div>
                                            <div class="col-md-5">
                                                <label for="item_dept">Category : </label>
                                                <select name="item_cat" class="select2 form-control mb-3" id="item_cat">
                                                    <option value="dept">-- --</option>
                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <label for="btn_scan" class="form-label">Scan item</label>
                                               
                                                <button type="button" id="btn_scan" class="btn btn-primary form-control btn-item-scanner"  <?php if($scan_item==0){ echo 'disabled';}?> >Scan Item</button>
                                            </div>
                                        </div>

                                        <div class="col-md-12 mt-3">
                                            <table id="item-inventory-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Item ID</th>
                                                        <th class="all">Brand</th>
                                                        <th class="all">Model</th>
                                                        <th class="all">Description</th>
                                                        <th class="all">Status</th>
                                                        <th class="all">Current assign to</th>
                                                        <th class="all">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                        <div>

                                       
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL for item add -->
            <div id="mdl_additem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="additemForm">
                            <div class="modal-body">
                                <div class="col-md-12">
                                    <label for="additem_dept_owner" class="form-label">Department Owner<span class="required">*</span></label>
                                    <select name="additem_dept_owner" class="form-control select2 required" id="additem_dept_owner">
                                        <option value="">-- --</option>
                                        <?php echo $api->generate_department_options();?>
                                    </select>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="additem_itemcategory" class="form-label mt-2">Categories<span class="required">*</span></label>
                                        <select name="additem_itemcategory" class="form-control select2" id="additem_itemcategory"> </select>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="additem_brand" class="form-label mt-2">Brands<span class="required">*</span></label>
                                        <select name="additem_brand" class="form-control select2" id="additem_brand"> </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3 mt-2">
                                            <label for="additem_model" class="form-label">Model</label>
                                            <input type="text" class="form-control" name="additem_model" id="additem_model" />
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="additem_serialnum" class="form-label">Serial Number</label>
                                            <input type="text" class="form-control" name="additem_serialnum" id="additem_serialnum" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="reason" class="form-label">Item Description <span class="required">*</span></label>
                                            <textarea class="form-control maxlength" id="additem_description" name="additem_description" maxlength="500" rows="3"></textarea>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="reason" class="form-label">Remarks</label>
                                            <textarea class="form-control maxlength" id="additem_remarks" name="additem_remarks" maxlength="500" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="curr_value">Current Value</label>
                                            <input type="number" class="form-control" value="0" name="curr_value" id="curr_value" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="orig_value">Original Value</label>
                                            <input type="number" class="form-control" value="0" name="orig_value" id="orig_value" />
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" id="btn_additem_frm">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <!-- Modal for scan the item -->
            <div id="mdl_scanitem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Scan Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="">
                            <div class="modal-body">


                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="col-md-12">
                                                <div class="col-md-12" id="reader"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            


            <!--  MODAL for item edit-->
            <div id="mdl_edititem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Edit Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              
                        </div>
                        <form action="" id="edititemForm">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header">Options</div>

                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <button class="btn btn-primary btn-open-history mt-2 mb-2" type="button">View History</button>
                                                    </div>

                                                    <div class="col-md-7">
                                                        <button class="btn btn-primary btn-dl-item-code mt-2 mb-2" type="button">Download Item code</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card">
                                            <div class="card-header">Actions</div>

                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <button class="btn btn-primary btn-show-assign-modal mt-2 mb-2" type="button">Assign this item to</button>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button class="btn btn-primary btn-mark-return mt-2 mb-2" type="button">Mark as return</button>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-6" id="print_me" style="border-style: solid; border-color: #cccccc; float: center;">
                                        <div class="card card-default">
                                            <div class="card-body">
                                                <div class="col-md-12">
                                                    <div class="col-md-12">
                                                        <div class="col-md-12">
                                                            <div class="text-center">
                                                                <canvas id="qr_code_item" class="img-thumbnail" style="width: auto; display:none"> </canvas>
                                                                <img src="assets/images/default/info-avatar.png" class="img-thumbnail" id="img_item_image" style="width: auto;" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div class="col-md-12">
                                                                <h4 class="text-center">
                                                                    <hr />
                                                                    <p id="item_code">{code}</p>
                                                                    <p id="item_name">{name}</p>
                                                                    <a id="link"></a>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-md-12">
                                            <input type="hidden" name="edititem_id" id="edititem_id" />
                                            <label for="edittem_dept_owner" class="form-label">Department Owner<span class="required">*</span></label>
                                            <select name="edititem_dept_owner" class="form-control select2 required" id="edittem_dept_owner">
                                                <option value="">-- --</option>
                                                <?php echo  $api->generate_department_options(); ?>
                                            </select>
                                        </div>

                                        <div class="col-md-12">
                                            <label for="edititem_itemcategory" class="form-label mt-2">Categories<span class="required">*</span></label>
                                            <select name="edititem_itemcategory" class="form-control select2" id="edititem_itemcategory"> </select>
                                        </div>

                                        <div class="col-md-12">
                                            <label for="edititem_brand" class="form-label mt-2">Brands<span class="required">*</span></label>
                                            <select name="edititem_brand" class="form-control select2" id="edititem_brand"> </select>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="mb-3 mt-2">
                                                <label for="edititem_model" class="form-label">Model </label>
                                                <input type="text" class="form-control" name="edititem_model" id="edititem_model" />
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <label for="edittem_serialnum" class="form-label">Serial Number </label>
                                                <input type="text" class="form-control" name="edititem_serialnum" id="edititem_serialnum" />
                                            </div>
                                        </div>

                                        <div class="col-md-12">
                                            <div class="mb-3">
                                                <button type="button" class="btn btn-primary" id="btn-view-image">View item Images</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="row col-md-12">
                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="edititem_description" class="form-label">Item Description <span class="required">*</span></label>
                                            <textarea class="form-control maxlength" id="edititem_description" name="edititem_description" maxlength="500" rows="3"></textarea>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mb-3">
                                            <label for="edititem_remarks" class="form-label">Remarks </label>
                                            <textarea class="form-control maxlength" id="edititem_remarks" name="edititem_remarks" maxlength="500" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 mb-3">
                                            <label for="edititem_curr_value">Current Value</label>
                                            <input type="number" class="form-control" value="0" name="edititem_curr_value" id="edititem_curr_value" />
                                        </div>
                                        <div class="col-md-6">
                                            <label for="edititem_orig_value">Original Value</label>
                                            <input type="number" class="form-control" value="0" name="edititem_orig_value" id="edititem_orig_value" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="btn_edititem_frm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <!-- MODAL for viewing images -->
            <div id="mdl_item_images" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Item Images</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="col-md-12 container">
                                
                                <form action="" id="uploaditemimageForm" class="mb-3" method="post" enctype="multipart/form-data" >
                                    <div class="row">
                                    <input type="hidden" name="transaction" value = "upload item image">
                                    <label for="file_upload_item_image">Add Image : </label>
                                    <input type="file" class="custom-file-input form-control mb-2" name="images[]"  required multiple id="file_upload_item_image" accept="image/png, image/jpeg"></input>
                                    <button type="button" id="btn_upload_image_item" class="btn btn-primary mb-3">submit</button>
                                    </div>                                                                                                              
                                </form>

                            </div>
                          

                            <div class="col-md-12 row" id="img_item_container">
                    
                            </div>
                        </div>  
                    </div>
                </div>
            </div>



            <!-- MODAL for deleting images -->
            <div id="mdl_item_delete" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-dialog-centered">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Remove Images</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <form action="" id="removeimageForm" method="post">
                                <div class="modal-body">

                                <input type="hidden" name="item_id" id="delete_item_image_id">
                                                    
                                <h4>Remove this? </h4>

                                    
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" id="btn_delete_image">Remove</button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>




                                            


            <!-- MODAL for viewing history -->
            <div id="mdl_item_owner_history" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Item History</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="">
                            <div class="modal-body">
                                                <div class="col-md-12"> <p>History of <span id="item_id_hist"></span></p></div>
                                <div class="col-md-12 mt-3">
                                    <table id="item-inventory-history-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                        <thead>
                                            <tr>
                                               <th>Name</th>
                                                <th>Location</th>
                                                <th>Branch</th>
                                                <th>Date Assigned</th>
                                                <th>Date Returned</th>                                           
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>


                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            <!-- modal for assigning the item to user/ branch -->
            <div id="mdl_assignitem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5>Assign Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="assignitemForm">
                            <div class="modal-body">


                                <div class="col-md-12 mb-3">
                                    <label for="" class="form-label">Assign <span id="item_id_cont"></span> to:</label>
                                    <input type="hidden" id="itemid_assign" name="itemid_assign">
                                    <select name="sel_emp_assign" id="sel_emp_assign" class="form-control"></select>
                                </div>
                                <div class="row">
                                    <div class="col-md-3">
                                        <label class="form-label">Assign Date <span class="required">*</span></label>
                                        <div class="input-group" id="start-date-container">
                                            <input type="text" class="form-control" id="assigndate" name="assigndate" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#start-date-container" data-provide="datepicker" data-date-autoclose="true" value="<?php echo date('m/d/Y') ?>">
                                            <span class="input-group-text"><i class="mdi mdi-calendar"></i></span>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <label for="assign_branch" class="form-label">Branch</label>
                                        <select name="assign_branch" id="assign_branch" class="form-control"></select>
                                    </div>
                                    <div class="col-md-6">
                                    <label class="form-label">Location <span class="required">*</span></label>
                                        <input type="text" name="item_loc" id="item_loc" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <a href="inventory-generate-eaa.php"  class="mt-2  btn btn-primary form-control btn-generate-eaa">Generate EAA</a>
                                </div>

                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="btn_assignitem_frm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Modal for disposing the item -->
            <div id="mdl_disposeitem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Dispose Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="disposeitemForm">
                            <div class="modal-body">
                                <input type="hidden" id="disposeitem_id" name="disposeitem_id" />

                                <h4>Are you sure to dispose this? <span id="disposeitem_id_container"></span></h4>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_disposeitem_frm">Dispose</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div id="mdl_returnitem" class="modal fade" role="dialog">
                <div class="modal-dialog modal-sm">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title">Return Item</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <form action="" id="returnitemForm">
                            <div class="modal-body">
                                <input type="hidden" id="returnitem_id" name="returnitem_id" />

                                <h4>Make sure to Check the item before confiming.</span></h4>
                                <div class="col-md-12">
                                        <label class="form-label">Return Date <span class="required">*</span></label>
                                        <div class="input-group" id="start-date-container">
                                            <input type="date" class="form-control" id="returndate" name="returndate" autocomplete="off" data-date-format="m/dd/yyyy" data-date-container="#start-date-container" data-provide="datepicker" required data-date-autoclose="true" value="<?php echo date('Y-m-d') ?>">
                                        </div>
                                    </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-warning" id="btn_returnitem_frm">Confirm</button>
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