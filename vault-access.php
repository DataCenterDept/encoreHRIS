<?php
$page_title = 'Encore Integrated Systems';

require('config/config.php');
require('classes/api.php');
$api = new Api;

require('views/_application_settings.php');
?>
<?php
require('views/_head.php');
?>
<link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
<link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
<link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />

</head>

<body class="auth-body-bg">
    <div>
        <div class="container-fluid p-0">
            <div class="row g-0">

                <!-- <div class="col-xl-8">
                        <div class="auth-full-bg pt-lg-5 p-4">
                            <div class="w-100">
                                <div class="bg-overlay" style="background:url('<?php echo $login_bg; ?>');background-size:cover;background-repeat:no-repeat;background-position:center"></div>
                            </div>
                        </div>
                    </div> -->

                <div class="col-xl-12">
                    <div class="auth-full-page-content p-md-5 p-4">
                        <div class="w-100">
                            <div id="vault-view"></div>

                            <div class="d-flex flex-column h-100">
                                <!-- <div class="mb-3 mb-md-3">
                                        <a href="index.php" class="d-block auth-logo">
                                            <img src="<?php echo $logo_dark; ?>" alt="logo" style="max-height: 120px" class="auth-logo-dark">
                                            <img src="<?php echo $logo_light; ?>" alt="logo" style="max-height: 120px" class="auth-logo-light">
                                        </a>
                                    </div> -->
                                <div class="my-auto">



                                    <div class="mt-4">
                                        <!-- <form id="signinForm" method="post" action="#">
                
                                                <div class="mb-3">
                                                    <label for="username" class="form-label">Username</label>
                                                    <input type="text" class="form-control" id="username" name="username" autocomplete="off" placeholder="Enter username">
                                                </div>

                                                <div class="row"></div>
                        
                                                <div class="mb-3">
                                                    <label class="form-label">Password</label>
                                                    <div class="input-group auth-pass-inputgroup">
                                                        <input type="password" id="password" name="password" class="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon">
                                                        <button class="btn btn-light " type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>
                                                
                                                <div class="mt-3 d-grid">
                                                    <button id="signin" class="btn btn-primary waves-effect waves-light" type="submit">Log In</button>
                                                </div>

                                            </form> -->




                                        <div class="col-md-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class=col-md-12>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="d-flex align-items-start">
                                                                    <div class="flex-grow-1 align-self-center">

                                                                    </div>



                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>




                                                    <form action="" id="vault">
                                                        <div class="container">
                                                            <div class="col-md-12">
                                                                <h5 class="text-primary">Vault Access</h5>
                                                                <p id="test_disp"></p>
                                                                <p class="text-muted">Enter your username & purpose to continue.</p>
                                                            </div>

                                                            <div class="col-md-12 mb-3">
                                                                <label for="name">Usernames</label>
                                                                <select class="form-control select2" id="name" multiple="multiple">
                                                                </select>
                                                            </div>
                                                            <div class="col-md-12 mb-3">
                                                                <label for="purpose">Purpose/Activity</label>
                                                                <!-- <textarea name="purpose" id="purpose" required rows="2" class="form-control"></textarea> -->

                                                                <select name="purpose" class="form-control select2-option" id="purpose">
                                                                    <?php echo $api->generate_system_options('VACT') ?>
                                                                </select>
                                                            </div>

                                                            <div class="col-md-12" id="other_pur_container" style="display: none;">
                                                                <label for="purpose">Specify your Purpose</label>
                                                                <textarea name="other_purpose" id="other_purpose" required rows="2" class="form-control"></textarea>

                                                              
                                                            </div>




                                                            <div class="col-md-12 mt-3">

                                                                <!-- <button type="button" class="btn btn-warning mt-3" id="btn_remember" >Save Username</button> -->
                                                                <button type="button" class="btn btn-primary mt-3"  id="scan_vault" >Scan to time in</button>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-4 mt-md-5 text-center">
                                <p class="mb-0"> Copyright © <?php echo date('Y'); ?> Encore Integrated Systems. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




    <div id="mdl_scan" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <form action="" id="addcatForm">
                    <div class="modal-body">

                        <div class="row">
                            <div class="col-md-12">
                            <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="col-md-12">
                                            <div id="reader"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>






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
        //initialize
        $(".select2").select2({
            tags: true,
            tokenSeparators: [',']
        });
        $(".select2-option").select2({});



     


    </script>
</body>

</html>