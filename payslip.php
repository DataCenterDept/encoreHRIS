<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Payslip';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 123);
	$view_own_payslip = $api->check_role_permissions($username, 127);
	$print_payslip = $api->check_role_permissions($username, 128);

	if($page_access == 0 || !isset($_GET['id']) || empty($_GET['id']) || !isset($_GET['emp']) || empty($_GET['emp'])){
		header('location: 404-page.php');
	}
    else{
        $payroll_id = $api->decrypt_data($_GET['id']);
        $employee_id = $api->decrypt_data($_GET['emp']);
        $employee_profile_info = $api->get_data_details_one_parameter('employee profile', $employee_id);
        $payroll_details = $api->get_data_details_two_parameter('payroll', $payroll_id, $employee_id);
        $payroll_start_date = $api->check_date('empty', $payroll_details[0]['PAYROLL_START_DATE'], '', 'F d, Y', '', '', '');
        $payroll_end_date = $api->check_date('empty', $payroll_details[0]['PAYROLL_END_DATE'], '', 'F d, Y', '', '', '');
        $payroll_pay_date = $api->check_date('empty', $payroll_details[0]['PAY_DATE'], '', 'F d, Y', '', '', '');
        $payroll_withholding_tax = $payroll_details[0]['WITHHOLDING_TAX'];
        $payroll_late = $payroll_details[0]['LATE'];
        $payroll_early_living = $payroll_details[0]['EARLY_LEAVING'];
        $payroll_overtime = $payroll_details[0]['OVERTIME'];
        $payroll_absent = $payroll_details[0]['ABSENT'];

        $employee_basic_pay = $employee_profile_info[0]['BASIC_PAY'];
        $employee_payroll_period = $employee_profile_info[0]['PAYROLL_PERIOD'];
        $employee_first_name = $employee_profile_info[0]['FIRST_NAME'];
        $employee_last_name = $employee_profile_info[0]['LAST_NAME'];
        $employee_middle_name = $employee_profile_info[0]['MIDDLE_NAME'];
        $employee_suffix = $employee_profile_info[0]['SUFFIX']; 
        $employee_fullname = $api->get_full_name($employee_first_name, $employee_middle_name, $employee_last_name, $employee_suffix)[0]['REVERSE_FULL_NAME'];
        $employee_designation_details = $api->get_data_details_one_parameter('designation', $employee_profile_info[0]['DESIGNATION']);
        $employee_department_details = $api->get_data_details_one_parameter('department', $employee_profile_info[0]['DEPARTMENT']);
        $employee_designation = $employee_designation_details[0]['DESIGNATION'];
        $employee_department = $employee_department_details[0]['DEPARTMENT'];
        $employee_basic_pay = $employee_profile_info[0]['BASIC_PAY'];
        $employee_hourly_rate = $employee_profile_info[0]['HOURLY_RATE'];
        $employee_minute_rate = $employee_profile_info[0]['MINUTE_RATE'];

        if($employee_payroll_period == 'SEMIMONTHLY'){
            $employee_basic_pay = $employee_basic_pay / 2;
        }
    }
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
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
                                <div class="page-title-box d-md-flex align-items-center justify-content-between">
                                    <h4 class="mb-md-0 font-size-18"><?php echo $page_title; ?></h4>
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Human Resource</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Payroll</a></li>
                                            <li class="breadcrumb-item"><a href="generate-payroll.php">Generate Payroll</a></li>
                                            <li class="breadcrumb-item active"><?php echo $page_title; ?></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="invoice-title">
                                            <h4 class="float-end font-size-16">Payroll # <?php echo $payroll_id; ?></h4>
                                            <div class="mb-4">
                                                <img src="<?php echo $logo_dark; ?>" alt="logo" height="20"/>
                                            </div>
                                        </div>
                                        <hr>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <address>
                                                    <strong>Employee:</strong><br>
                                                    <?php echo $employee_fullname; ?><br>
                                                    <?php echo $employee_designation; ?><br>
                                                    <?php echo $employee_department; ?><br>
                                                </address>
                                            </div>
                                            <div class="col-md-6 text-md-end">
                                                <address class="mt-2 mt-md-0">
                                                    <strong>Payroll Details:</strong><br>
                                                    Payroll Period : <?php echo $payroll_start_date . ' - ' . $payroll_end_date; ?><br>
                                                    Pay Date : <?php echo $payroll_pay_date; ?><br>
                                                </address>
                                            </div>
                                        </div>
                                        <div class="py-2 mt-3">
                                            <h3 class="font-size-15 fw-bold">Earnings</h3>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Earnings</th>
                                                        <th width="15%">Unit</th>
                                                        <th width="15%">Rate</th>
                                                        <th class="text-end">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Basic Pay</td>
                                                        <td>N/A</td>
                                                        <td>N/A</td>
                                                        <td class="text-end"><?php echo number_format($employee_basic_pay, 2); ?> Php</td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td>Overtime</td>
                                                        <td><?php echo number_format($api->check_number($payroll_overtime), 2) . ' hour(s)'; ?></td>
                                                        <td>0.00 Php</td>
                                                        <td class="text-end">0.00 Php</td>
                                                    </tr>

                                                    <?php
                                                        $allowance_total = 0;
                                                        $other_income_total = 0;

                                                        $sql = $api->db_connection->prepare("SELECT CATEGORY, SPEC_AMOUNT FROM tblpayrollspec WHERE PAYROLL_ID = :payroll_id AND EMPLOYEE_ID = :employee_id AND SPEC_TYPE = 'ALLOWANCE'");
                                                        $sql->bindParam(':payroll_id', $payroll_id);
                                                        $sql->bindParam(':employee_id', $employee_id);

                                                        if($sql->execute()){
                                                            while($row = $sql->fetch()){
                                                                $category = trim($row['CATEGORY']);
                                                                $spec_amount = $row['SPEC_AMOUNT'];
                                            
                                                                $allowance_type_details = $api->get_data_details_one_parameter('allowance type', $category);
                                                                $category_name = $allowance_type_details[0]['ALLOWANCE'];

                                                                echo '<tr>
                                                                        <td>'. $category_name .'</td>
                                                                        <td>N/A</td>
                                                                        <td>N/A</td>
                                                                        <td class="text-end">'. number_format($spec_amount, 2) .' Php</td>
                                                                    </tr>';

                                                                $allowance_total = $allowance_total + $spec_amount;
                                                            }
                                                        }  

                                                        $sql = $api->db_connection->prepare("SELECT CATEGORY, SPEC_AMOUNT FROM tblpayrollspec WHERE PAYROLL_ID = :payroll_id AND EMPLOYEE_ID = :employee_id AND SPEC_TYPE = 'OTHERINCOME'");
                                                        $sql->bindParam(':payroll_id', $payroll_id);
                                                        $sql->bindParam(':employee_id', $employee_id);

                                                        if($sql->execute()){
                                                            while($row = $sql->fetch()){
                                                                $category = trim($row['CATEGORY']);
                                                                $spec_amount = $row['SPEC_AMOUNT'];
                                            
                                                                $other_income_type_details = $api->get_data_details_one_parameter('other income type', $category);
                                                                $category_name = $other_income_type_details[0]['OTHER_INCOME'];

                                                                echo '<tr>
                                                                        <td>'. $category_name .'</td>
                                                                        <td>N/A</td>
                                                                        <td>N/A</td>
                                                                        <td class="text-end">'. number_format($spec_amount, 2) .' Php</td>
                                                                    </tr>';

                                                                $other_income_total = $other_income_total + $spec_amount;
                                                            }
                                                        } 

                                                        $total_earnings = $employee_basic_pay + $allowance_total + $other_income_total;
                                                    ?>

                                                    <tr>
                                                        <td colspan="3" class="border-0 text-end"><strong>Gross Pay</strong></td>
                                                        <td class="border-0 text-end"><h4 class="m-0"><?php echo number_format($total_earnings, 2)?> Php</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="py-2 mt-3">
                                            <h3 class="font-size-15 fw-bold">Deductions</h3>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-nowrap">
                                                <thead>
                                                    <tr>
                                                        <th width="50%">Deductions</th>
                                                        <th width="15%">Unit</th>
                                                        <th width="15%">Rate</th>
                                                        <th class="text-end">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Absent</td>
                                                        <td><?php echo number_format($api->check_number($payroll_absent), 2) . ' hour(s)'; ?></td>
                                                        <td><?php echo number_format($employee_hourly_rate, 2); ?> Php</td>
                                                        <td class="text-end"><?php echo number_format($payroll_absent * $employee_hourly_rate, 2); ?> Php</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Late</td>
                                                        <td><?php echo number_format($api->check_number($payroll_late), 2) . ' minute(s)'; ?></td>
                                                        <td><?php echo number_format($employee_minute_rate, 2); ?> Php</td>
                                                        <td class="text-end"><?php echo number_format($payroll_late * $employee_minute_rate, 2); ?> Php</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Under Time</td>
                                                        <td><?php echo number_format($api->check_number($payroll_early_living), 2) . ' minute(s)'; ?></td>
                                                        <td><?php echo number_format($employee_minute_rate, 2); ?> Php</td>
                                                        <td class="text-end"><?php echo number_format($payroll_early_living * $employee_minute_rate, 2); ?> Php</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Withholding Tax</td>
                                                        <td>N/A</td>
                                                        <td>N/A</td>
                                                        <td class="text-end"><?php echo number_format($payroll_withholding_tax, 2); ?> Php</td>
                                                    </tr>
                                                    <?php
                                                        $deduction_total = 0;

                                                        $sql = $api->db_connection->prepare("SELECT CATEGORY, SPEC_AMOUNT FROM tblpayrollspec WHERE PAYROLL_ID = :payroll_id AND EMPLOYEE_ID = :employee_id AND SPEC_TYPE = 'OTHERINCOME'");
                                                        $sql->bindParam(':payroll_id', $payroll_id);
                                                        $sql->bindParam(':employee_id', $employee_id);

                                                        if($sql->execute()){
                                                            while($row = $sql->fetch()){
                                                                $category = trim($row['CATEGORY']);
                                                                $spec_amount = $row['SPEC_AMOUNT'];
                                            
                                                                $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $category);
                                                                $category_name = $deduction_type_details[0]['DEDUCTION'];

                                                                $deduction_category = $deduction_type_details[0]['CATEGORY'];
                                                                
                                                                if($deduction_category == 'GOVERNMENT'){
                                                                    $spec_amount = $api->get_deduction_amount($category, $employee_id);
                                                                }

                                                                echo '<tr>
                                                                        <td>'. $category_name .'</td>
                                                                        <td>N/A</td>
                                                                        <td>N/A</td>
                                                                        <td class="text-end">'. number_format($spec_amount, 2) .' Php</td>
                                                                    </tr>';

                                                                $deduction_total = $deduction_total + $spec_amount;
                                                            }
                                                        } 

                                                        $total_deduction = $deduction_total + $payroll_withholding_tax;
                                                        $net_pay = $total_earnings  - $total_deduction;
                                                    ?>
                                                    <tr>
                                                        <td colspan="3" class="border-0 text-end"><strong>Total Deductions</strong></td>
                                                        <td class="border-0 text-end"><h4 class="m-0"><?php echo number_format($total_deduction, 2)?> Php</h4></td>
                                                    </tr>
                                                    <tr>
                                                        <td colspan="3" class="border-0 text-end"><strong>Net Pay</strong></td>
                                                        <td class="border-0 text-end"><h4 class="m-0"><?php echo number_format($net_pay, 2)?> Php</h4></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <?php
                                            if($print_payslip > 0){
                                                echo '<div class="d-print-none">
                                                    <div class="float-end">
                                                        <a href="javascript:window.print()" class="btn btn-success waves-effect waves-light me-1"><i class="fa fa-print"></i></a>
                                                    </div>
                                                </div>';
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end row -->
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
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/qrcode/qrcode.min.js"></script>
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/datatables.net/js/jquery.dataTables.min.js"></script>
        <script src="assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js"></script>
        <script src="assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
        <script src="assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js"></script>
        <script src="assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
        <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    </body>
</html>