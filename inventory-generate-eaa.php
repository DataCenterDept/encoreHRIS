<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Equipment agreement';
$name = '';

$item = $api->get_item_inventory_single('*', $_GET['item_id_assign']);


if ($_GET['emp_id'] != "") {
    $emp = $api->get_data_details_one_parameter('employee profile', $_GET['emp_id']);
    $name = $emp[0]['FIRST_NAME'] . ' ' . $emp[0]['LAST_NAME']. ' ' . ucfirst(strtolower($emp[0]['SUFFIX'].'.'));
}

?>
<?php
require('views/_head.php');
?>
<link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
<link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
<link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />


<style>
    body {
        font-size: 30%
    }
    @media print {
   .no-print {
      visibility: hidden;
   }
   .pagebreak { page-break-before: always; } /* page-break-after works, as well */
   body {
        font-size: 30%
    }
}
</style>


</head>

<body data-sidebar="dark">
    <?php
    require('views/_preloader.php');
    ?>
    <div class="wrapper">
        <!-- Navbar -->

        <!-- sidebar -->
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->

            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="col-md-12">

                    <div class="card">
                        <div class="card-body">
                            <div class="col-md-12 no-print" id="btn_div_print">
                                <button type="button" class="btn btn-primary " onclick="window.print()">Print</button>
                            </div>

                            <div class="d-flex justify-content-between">
                                <div class="p-2"><img src="../images/encore-logo.png" style="height: 100px;" alt=""></div>
                                <div class="p-2 align-self-end">
                                    <h2>EQUIPMENT ACCEPTANCE FORM & AGREEMENT </h2>
                                    <h3 class="text-center">(Employee Copy)</h3>
                                </div>
                                <div class="p-2">
                                    <p class="text-center">ITEM_<?php echo $_GET['item_id_assign'] ?> </p>
                                    <p class="text-center"></p>
                                </div>
                            </div>

                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> GENERAL RULE :</h5>
                            </div>
                            <div>
                                <p>Partners are responsible for protecting their equipment’s regardless of whether the equipment’s are
                                    used in the office, or in any other location or while travelling, from loss or theft and for protecting the
                                    information it contains. These rules are provided to assist in assuring that their equipment’s are secure at all times.
                                    All conceivable situations cannot be covered in this document. Partners must realize that common sense should be
                                    your guide when faced with unusual or unforeseen situations.</p>
                            </div>

                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> APPROPRIATE USE</h5>
                            </div>

                            <div>
                                <p>It is the responsibility of each Authorized User to take the following steps as a condition to ensure Company Equipment’s are
                                    utilized properly:</p>
                            </div>

                            <div style="margin-left: 20px;" class="mt-3">
                                1. Partners are NOT allowed to bring the equipment’s anywhere unless on official business related to company transactions. <br>
                                2. Partners are expected to protect company data, equipment and accessories from damage and theft. <br>
                                3. Partners should NOT attempt to download or install software or hardware or change the System Configuration including network settings. <br>
                                4. Partners must report damage or suspected problems immediately to ELFC technical support. <br>
                                5. Never bypass equipment’s systems' security mechanisms. <br>
                                6. Never use company related files for private gain or anything that is not related for company business <br>
                                7. Equipment’s are provided for official use by authorized employees. Do not lend your equipment’s (and any other accessories) or allow it to be used by others. <br>
                                8. Equipment’s should be locked away out of sight when not in use, preferably in a filing cabinet, safe or security cable. This applies in the office or in any premises, never leaves equipment visibly unattended in a vehicle. 
                            </div>


                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> DATA SECURITY</h5>
                            </div>

                            <div style="margin-left: 20px;" class="mt-3">
                                1. Never make any disclosure of data that is not specifically authorized. <br>
                                2. Never duplicate any data files, create sub-files of such records, remove or transmit
                                data unless the user has been specifically authorized to do so. <br>
                                3. Never browse or use data files for unauthorized or illegal purposes; <br>

                            </div>


                            <table class="table table-bordered mt-5">
                                <thead class="text-center">
                                    <tr>
                                        <th>Equipment</th>
                                        <th>Make and Model</th>
                                        <th>Serial Number</th>
                                        <th>Value</th>
                                        <th>Original Value</th>
                                        <th>Inclusion/Accessories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ITEM_<?php echo $_GET['item_id_assign'] ?></td>
                                        <td><?php echo $item[0]['BRAND'] . ' ' . $item[0]['MODEL'] ?> </td>
                                        <td><?php echo $item[0]['SERIAL_NUMBER'] ?></td>
                                        <td><?php echo $item[0]['CURR_VALUE'] ?></td>
                                        <td><?php echo $item[0]['ORIG_VALUE'] ?></td>
                                        <td><?php echo $item[0]['DESCRIPTION'] ?></td>
                                    </tr>
                                </tbody>
                            </table>


                            <div class="mt-4">
                                I understand that all equipment and accessories that ELFC has provided me are the property of ELFC. I agree with, and will adhere to all of the rules and guidelines.
                                In case of damage or loss, I will replace or pay the full cost of replacement of the damaged or lost equipment with equal value (market/book cost, whichever is higher) and functionality plus the additional cost for loss of company data subject to the approval of ELFC.
                                I understand that a violation of the terms and conditions set out in the policy will result in the restriction and/or termination of my use of ELFC’s equipment and accessories and may result in further discipline up to and including termination of employment and/or other legal action.
                            </div>

                            <div class="d-flex justify-content-between">
                                <div class="p-2">
                                    <div style="margin-top: 50px;">
                                        <p>Received By :</p>
                                        <p style=" text-decoration-line: underline;"><?php echo $name?></p>
                                    </div>
                                </div>

                                <div class="p-2">
                                    <div style="margin-top: 50px;">
                                        <p>Issued By :</p>
                                        <p>_________________________</p>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <p>printed at <?php echo date('m/d/Y h:i A') ?></p>
                            </div>




                        </div>
                    </div>
                </div>
                <div class="pagebreak"></div>




                <div class="col-md-12">

                    <div class="card">
                        <div class="card-body">
                            

                            <div class="d-flex justify-content-between">
                                <div class="p-2"><img src="../images/encore-logo.png" style="height: 100px;" alt=""></div>
                                <div class="p-2 align-self-end">
                                    <h2>EQUIPMENT ACCEPTANCE FORM & AGREEMENT </h2>
                                </div>
                                <div class="p-2">
                                    <p class="text-center">ITEM_<?php echo $_GET['item_id_assign'] ?> </p>
                                    <p class="text-center"></p>
                                </div>
                            </div>

                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> GENERAL RULE :</h5>
                            </div>
                            <div>
                                <p>Partners are responsible for protecting their equipment’s regardless of whether the equipment’s are
                                    used in the office, or in any other location or while travelling, from loss or theft and for protecting the
                                    information it contains. These rules are provided to assist in assuring that their equipment’s are secure at all times.
                                    All conceivable situations cannot be covered in this document. Partners must realize that common sense should be
                                    your guide when faced with unusual or unforeseen situations.</p>
                            </div>

                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> APPROPRIATE USE</h5>
                            </div>

                            <div>
                                <p>It is the responsibility of each Authorized User to take the following steps as a condition to ensure Company Equipment’s are
                                    utilized properly:</p>
                            </div>

                            <div style="margin-left: 20px;" class="mt-3">
                                1. Partners are NOT allowed to bring the equipment’s anywhere unless on official business related to company transactions. <br>
                                2. Partners are expected to protect company data, equipment and accessories from damage and theft. <br>
                                3. Partners should NOT attempt to download or install software or hardware or change the System Configuration including network settings. <br>
                                4. Partners must report damage or suspected problems immediately to ELFC technical support. <br>
                                5. Never bypass equipment’s systems' security mechanisms. <br>
                                6. Never use company related files for private gain or anything that is not related for company business <br>
                                7. Equipment’s are provided for official use by authorized employees. Do not lend your equipment’s (and any other accessories) or allow it to be used by others. <br>
                                8. Equipment’s should be locked away out of sight when not in use, preferably in a filing cabinet, safe or security cable. This applies in the office or in any premises, never leaves equipment visibly unattended in a vehicle.
                            </div>


                            <div class="col-md-12" style="margin-top: 50px; text-decoration-line: underline;">
                                <h5> DATA SECURITY</h5>
                            </div>

                            <div style="margin-left: 20px;" class="mt-3">
                                1. Never make any disclosure of data that is not specifically authorized. <br>
                                2. Never duplicate any data files, create sub-files of such records, remove or transmit
                                data unless the user has been specifically authorized to do so. <br>
                                3. Never browse or use data files for unauthorized or illegal purposes; <br>
 
                            </div>


                            <table class="table table-bordered mt-5">
                                <thead class="text-center">
                                    <tr>
                                        <th>Equipment</th>
                                        <th>Make and Model</th>
                                        <th>Serial Number</th>
                                        <th>Value</th>
                                        <th>Original Value</th>
                                        <th>Inclusion/Accessories</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ITEM_<?php echo $_GET['item_id_assign'] ?></td>
                                        <td><?php echo $item[0]['BRAND'] . ' ' . $item[0]['MODEL'] ?> </td>
                                        <td><?php echo $item[0]['SERIAL_NUMBER'] ?></td>
                                        <td><?php echo $item[0]['CURR_VALUE'] ?></td>
                                        <td><?php echo $item[0]['ORIG_VALUE'] ?></td>
                                        <td><?php echo $item[0]['DESCRIPTION'] ?></td>
                                    </tr>
                                </tbody>
                            </table>


                            <div class="mt-4">
                                I understand that all equipment and accessories that ELFC has provided me are the property of ELFC. I agree with, and will adhere to all of the rules and guidelines.
                                In case of damage or loss, I will replace or pay the full cost of replacement of the damaged or lost equipment with equal value (market/book cost, whichever is higher) and functionality plus the additional cost for loss of company data subject to the approval of ELFC.
                                I understand that a violation of the terms and conditions set out in the policy will result in the restriction and/or termination of my use of ELFC’s equipment and accessories and may result in further discipline up to and including termination of employment and/or other legal action.
                            </div>

                            <div class="d-flex justify-content-between">
                                <div class="p-2">
                                    <div style="margin-top: 50px;">
                                        <p>Received By :</p>
                                        <p style=" text-decoration-line: underline;"><?php echo $name?></p>
                                    </div>
                                </div>

                                <div class="p-2">
                                    <div style="margin-top: 50px;">
                                        <p>Issued By :</p>
                                        <p>_________________________</p>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-12">
                                <p>printed at <?php echo date('m/d/Y h:i A') ?></p>
                            </div>




                        </div>
                    </div>
                </div>








            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->




        <!-- sweetalert2 js -->
        <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>
        <!-- jQuery -->
        <script src=" plugins/jquery/jquery.min.js"></script>
        <!-- Bootstrap 4 -->
        <script src=" plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- DataTables -->
        <script src=" plugins/datatables/jquery.dataTables.min.js"></script>
        <script src=" plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src=" plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
        <script src=" plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
        <!-- AdminLTE App -->
        <script src=" dist/js/adminlte.min.js"></script>
        <!-- Select2 -->
        <script src="plugins/select2/js/select2.full.min.js"></script>
        <!-- AdminLTE for demo purposes -->
        <!-- InputMask -->
        <script src="plugins/moment/moment.min.js"></script>
        <script src="plugins/inputmask/min/jquery.inputmask.bundle.min.js"></script>

        <script src=" dist/js/demo.js"></script>
        <!-- jquery validate -->
        <script src="plugins/jquery-validation/jquery.validate.min.js"></script>
        <!-- page script -->
        <script src="plugins/qrcode/html5-qrcode.min.js"></script>
        <script src="ajax/attendance-scan.js"></script>
        <script src="ajax/countdown.js"></script>

    </div>
    <?php
    require('views/_scripts.php');
    ?>
</body>

</html>