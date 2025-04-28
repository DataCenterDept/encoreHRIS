<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Activity Notes Details';
$id = '';
# Check role permission
$page_access = $api->check_role_permissions($username, 379);
$add_activity = $api->check_role_permissions($username, 387);

if ($page_access == 0 || !isset($_GET['id']) || empty($_GET['id'])) {
    header('location: 404-page.php');
} else {
    $id = $_GET['id'];
    $activity_notes = $api->get_data_details_one_parameter('activity note', $id);
    $lat_long = $activity_notes[0]['LAT'].','.$activity_notes[0]['LONG'];
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
  max-width:500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


/* Set the size of the div element that contains the map */
#map {
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
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
                                        <li class="breadcrumb-item active"><?php echo $id; ?></li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-grow-1 align-self-center">
                                                    <h4 class="card-title">Activity Details</h4>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div class="row mt-3">

                                        <div class="col-md-12">
                                            <div class="row mt-3">
                                                <div class="col-md-4"><b>Client Name : </b></div>
                                                <div class="col-md-8"><?php echo $activity_notes[0]['CLIENT_NAME'] ?></div>
                                            </div>

                                            <div class="row mt-3">
                                                <div class="col-md-4"><b>Phone Number : </b></div>
                                                <div class="col-md-8"><?php echo $activity_notes[0]['CLIENT_TEL'] ?></div>
                                            </div>

                                            <div class="row mt-3">
                                                <div class="col-md-4"><b>Notes : </b></div>
                                                <div class="col-md-8"><?php echo $activity_notes[0]['NOTE_DESC'] ?></div>
                                            </div>

                                        </div>


                                    </div>


                                </div>
                            </div>
                        </div>



                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-grow-1 align-self-center">
                                                    <h4 class="card-title">Activity Attachements</h4>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-2 mt-3">
                                        <?php
                                        if ($add_activity != 0) {
                                            echo '<button type="button" class="btn btn-primary waves-effect btn-label waves-light"  id="btn_addattachment"><i class="bx bx-plus label-icon"></i> Add Attachement</button>';
                                        }
                                        ?>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="mt-3">
                                            <table id="activity-attachment-datatable" class="table table-bordered table-hover align-middle dt-responsive nowrap w-100">
                                                <thead>
                                                    <tr>
                                                        <th class="all">Filename</th>
                                                        <th class="all">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="d-flex align-items-start">
                                                <div class="flex-grow-1 align-self-center">
                                                    <h4 class="card-title">Activity Maps</h4>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                    <div class="mapouter"><div class="gmap_canvas"><iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=<?php echo $lat_long;?>&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://piratebay-proxys.com/">Piratebay</a></div><style>.mapouter{position:relative;text-align:right;width:100%;height:400px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:400px;}.gmap_iframe {height:400px!important;}</style></div>

                                    </div>
                                        


                                     
                                   
                                  
                                </div>
                            </div>
                        </div>




                    </div>



                    <div id="mdl_add_activity_attachement" class="modal fade" role="dialog">
                        <div class="modal-dialog modal-lg">
                            <!-- Modal content-->
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Attachement</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <form action="" id="addactivityattachementForm">
                                    <div class="modal-body">

                                        <div class="row">
                                            <div class="col-md-12">
                                                
                                                <input type="hidden" name="activity_id" id="activity_id" value="<?php echo $id?>">
                                                <input type="file" name="activity_attachement" id="activity_attachement" class="form-control">
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