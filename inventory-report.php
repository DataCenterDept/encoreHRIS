<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Inventory';

# Check role permission
$page_access = $api->check_role_permissions($username, 342);
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
<link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css" />


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
                                            
                                        </div>

                                    </div>
                                    <div class="mt-4">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="dept_owner_report">Department Owner : </label>
                                                <select name="dept_owner_report" class="select2 form-control mb-3" id="dept_owner_report"> </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="item_cat_report">Category : </label>
                                                <select name="item_cat_report" class="select2 form-control mb-3" id="item_cat_report">
                                                    
                                                </select>
                                            </div>
                                            <div class="col-md-4">
                                                <label for="item_brand_report">Brand : </label>
                                                <select name="item_brand_report" class="select2 form-control mb-3" id="item_brand_report">
                                                   
                                                </select>
                                            </div>
                                            <!-- <div class="col-md-3">
                                                <label for="btn_scan" class="form-label">Scan item</label>
                                                <button type="button" id="btn_scan" class="btn btn-primary form-control btn-item-scanner">Scan Item</button>
                                            </div> -->
                                        </div>

                                        <div class="col-md-12 mt-3">
                                            <table id="item-inventory-report-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Item ID</th>
                                                        <th class="all">Brand</th>
                                                        <th class="all">Model</th>
                                                        <th class="all">Description</th>
                                                        <th class="all">Status</th>
                                                        <th class="all">Current assign to</th>
                                                        <th class="all">Serial Number</th>
                                                        
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
                <!-- <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script> -->
                <script src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
        <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js"></script>


        <script>
            $(".select2").select2({});
        </script>
    </div>
</body>