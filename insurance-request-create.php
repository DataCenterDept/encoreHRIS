<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'insurance Request Creation';

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
                                        <li class="breadcrumb-item"><a href="javascript: void(0);">Insurance Request</a></li>
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
                                    <div class=col-md-12>
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="d-flex align-items-start">
                                                    <div class="flex-grow-1 align-self-center">
                                                    <h4 class="card-title">Insurance Request Creation</h4>
                                                    </div>
                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12">
                                        <form id="addinsurancerequestForm" action="" method="post">
                                            <div class="col-md-12">
                                                <label for="client">Client Name</label>
                                                <input type="text" name="client_name" id="client_name" class="form-control">
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="ins_req_id">Insurance Request ID</label>
                                                        <input type="text" class="form-control disabled" readonly  value="09"  name="ins_req_id" id="ins_req_id">
                                                    </div>
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="col_id">Collateral ID</label>
                                                        <input type="text" class="form-control disabled"   name="col_id" id="col_id">
                                                    </div>
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="unit_desc">Unit Description</label>
                                                        <input type="text" class="form-control disabled"   name="unit_desc" id="unit_desc">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Insured by Encore?</label>
                                                        <select name="insured_elf" id="insured_elf" class="form-control">
                                                            <option value='N'>No</option>
                                                            <option value='Y'>Yes</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="col_id">Insurance Company</label>
                                                        <select name="insur_com" id="insur_com" class="form-control">
                                                            <?php echo  $api->generate_insurance_options('INSCODE')?>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="clas">Classification</label>
                                                        <select name="classifi" id="classifi" class="form-control">
                                                            <?php echo  $api->generate_insurance_options('ISRCLASS')?>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="insur_com">Year model</label>
                                                        <input type="number" name="year_model" class="form-control" id="year_model">
                                                    </div>
                                                    
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Mortgagee</label>
                                                        <select name="mortgagee" id="mortgagee" class="form-control">
                                                           <option value="1">Encore Leasing and Finance Corp.</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="col_id">rate</label>
                                                       <input type="number" value="0.00" class="form-control"  name="rate" id="rate" >
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="coverage">Coverage</label>
                                                       <input type="number" value="0.00" class="form-control" name="coverage" id="coverage" >
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="other lines">Other Lines</label>
                                                        <select name="otherlines" id="otherlines" disabled class="form-control">
                                                        <option value="100K">100K</option>
                                                            <option value="200K">200K</option>
                                                        </select>
                                                    </div>
                                                   
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Pro-Rata Months</label>
                                                        <select name="pro_r_m" id="pro_r_m" class="form-control">
                                                            <option value='1'>1</option>
                                                            <option value='2'>2</option>
                                                            <option value='3'>3</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Pro-Rata Amount</label>
                                                        <input type="number" value="0" name="pro_rt_amount" readonly id="pro_rt_amount" class="form-control">
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">With AOG?</label>
                                                        <select name="aog" id="aog" class="form-control">
                                                            <option value='0'>No</option>
                                                            <option value='1'>Yes</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">Inception Start Date</label>
                                                        <input type="date" name="isd" id="isd" class="form-control datepicker">
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">Inception End Date</label>
                                                        <input type="date" name="iet" id="iet" class="form-control datepicker">
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Payment Term</label>
                                                        <select name="p_term" id="p_term" class="form-control">
                                                            <?php echo  $api->generate_insurance_options('INSPTERM')?>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="num_days">Number of Days.</label>
                                                        <input type="number" name="nodays" readonly id="nodays" class="form-control">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="num_days">Due Date</label>
                                                        <input type="date" name="due_dt" readonly id="due_dt" class="form-control">
                                                    </div>

                                                    
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3">
                                                        <label for="odtl">OD/Theft/Loss</label>
                                                        <input type="number" value="0" name="odtl" readonly class="form-control" id="odtl">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="bodyly_injured">Bodily Injured</label>
                                                        <input type="number" value="0" name="bodyly_injured" readonly class="form-control" id="bodyly_injured">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="p_dmg">Property Damage</label>
                                                        <input type="number" value="0" name="pro_dmg" readonly class="form-control" id="pro_dmg">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="p_dmg">Personal Damage</label>
                                                        <input type="number" value="0" name="per_dmg" readonly class="form-control" id="per_dmg">
                                                    </div>

                                                </div>
                                            </div>




                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3">
                                                        <label for="gross_prem">Gross Premium</label>
                                                        <input type="number" value="0" name="gross_prem" readonly class="form-control" id="gross_prem">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="net_amt">Net Amount</label>
                                                        <input type="number" value="0" name="net_amt"  class="form-control" id="net_amt">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="net_com">Net Commision</label>
                                                        <input type="number" value="0" name="net_com"  class="form-control" id="net_com">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="tot_prem">Total Premium</label>
                                                        <input type="number" value="0" name="tot_prem" readonly class="form-control" id="tot_prem">
                                                    </div>

                                                </div>
                                            </div>



                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3">
                                                        <label for="gross_prem">Income</label>
                                                        <input type="number" value="0" name="income" readonly class="form-control" id="income">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="net_amt">Dealer's Commission</label>
                                                        <input type="number" value="0" name="deal_comm" readonly  class="form-control" id="deal_comm">
                                                    </div>
                                                </div>
                                            </div>



                                          <div class="col-md-12 mt-4">
                                          <button type="submit" class="btn btn-primary" id="submitform">Submit</button>
                                          </div>
                                        </form>
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
    <script src="assets/libs//inputmask/min/jquery.inputmask.bundle.min.js"></script>
    <script>
        $(".select2").select2({});
        $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',});

    </script>
</body>

</html>