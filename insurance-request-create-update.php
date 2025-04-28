<?php
require('session.php');
require('config/config.php');
require('classes/api.php');
$api = new Api;
$page_title = 'Insurance Request Creation Modification';


# Check role permission
$page_access = $api->check_role_permissions($username, 389);
$importinsurancereq =  $api->check_role_permissions($username, 393);
$insurancetagging = $api->check_role_permissions($username,395);


$ID = null;
$insurance_data= [];

if(isset($_GET['ID'])){
    $ID = $api->decrypt_data( $_GET['ID']);
    $insurance_data = $api->get_data_details_one_parameter("insurance request",$ID);
}
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
                                        <li class="breadcrumb-item"><a href="insurance-request.php">Insurance Request</a></li>
                                        <li class="breadcrumb-item "><?php echo $page_title; ?></li>
                                        <li class="breadcrumb-item active" id="irs_id"><?php echo $ID; ?></li>
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
                                                    <h4 class="card-title">Insurance Request Creation / Modification</h4>
                                                    </div>

                                                    
                                            
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-md-12">


                                      


                                        <div class="row">
                                        <?php if($importinsurancereq > 0){ ?>
                                            <div class="col-md-8">

                                                <form action="" id="loadinsurancerequestdataForm">

                                                <div class="row">


                                                <div class="col-md-10">
                                                        <label for="">Load Insurance Data</label>
                                                        <input type="file" name="import" class="form-control" id="import">
                                                </div>
                                                <div class="col-md-2">
                                                        <label for="" class="text-white"> sample </label>
                                                        <input type="submit" value="Import" class=" btn btn-primary form-control ">
                                                </div>


                                                </div>
                                                
                                                </form>

                                            </div>

                                        <?php }?>

                                        <?php if($insurancetagging > 0){ ?>
                                        <div class="col-md-4">
                                            <div class="row">

                                                <div class="col-md-6">
                                                    <label for="" class="text-white"> sample </label>
                                                    <button type="button" class="btn btn-primary form-control <?php if($ID == null){ echo'disabled';}; ?> " id="ins_tag_complete">Tag as Complete</button>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="" class="text-white"> sample </label>
                                                    <button type="button" class="btn btn-danger form-control <?php if($ID == null){ echo'disabled';}; ?> "  id="ins_tag_cancel">Tag as Cancel</button>
                                                </div>

                                            </div>
                                          
                                        </div>
                                        <?php }?>

                                        </div>



                                       

                                        <form id="addinsurancerequestForm" action="" method="post">
                                            <input type="hidden" name='action' id='action' value="compute">
                                            
                                            <div class="row">

                                            <div class="col-md-6 mt-3">
                                                <label for="client">Client Name</label>
                                                <input type="text" name="client_name" id="client_name" value="<?php echo $insurance_data[0]['CLIENT_NAME'] ?? null?>" class="form-control">
                                            </div>
                                            <div class="col-md-6 mt-3">
                                                <label for="address">Client Address</label>
                                                <input type="text" name="address" id="address" value="<?php echo $insurance_data[0]['ADDRESS'] ?? null?>" class="form-control">
                                            </div>



                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="ins_req_id">Insurance Request ID</label>
                                                        <input type="text" class="form-control disabled" readonly  value="<?php echo $insurance_data[0]['ID'] ?? null?>"  name="ins_req_id" id="ins_req_id">
                                                    </div>
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="col_id">Collateral ID</label>
                                                        <input type="text" class="form-control disabled" value="<?php echo $insurance_data[0]['COLLA_ID'] ?? null?>"   name="col_id" id="col_id">
                                                    </div>
                                                    <div class="col-md-4 mt-3"> 
                                                        <label for="unit_desc">Unit Description</label>
                                                        <input type="text" class="form-control" value="<?php echo $insurance_data[0]['UNIT_DESC'] ?? null?>"   name="unit_desc" id="unit_desc">
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="plate_num">Plate Number</label>
                                                        <input type="text" class="form-control" value="<?php echo $insurance_data[0]['PLATE_NUM'] ?? null?>"  name="plate_num" id="plate_num">
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="chasis_num">Chasis Number</label>
                                                        <input type="text" class="form-control" value="<?php echo $insurance_data[0]['CHASIS_NUM'] ?? null?>"   name="chasis_num" id="chasis_num">
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="motor_num">Motor Number</label>
                                                        <input type="text" class="form-control" value="<?php echo $insurance_data[0]['MOTOR_NUM'] ?? null?>"   name="motor_num" id="motor_num">
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="color">Color</label>
                                                        <input type="text" class="form-control" value="<?php echo $insurance_data[0]['COLOR'] ?? null?>"   name="color" id="color">
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <!-- <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Insured by Encore?</label>
                                                        <select name="insured_elf" id="insured_elf" class="form-control select2">
                                                            <option value='N'>No</option>
                                                            <option value='Y'>Yes</option>
                                                        </select>
                                                    </div> -->
                                                    <div class="col-md-6 mt-3"> 
                                                        <label for="col_id">Insurance Company</label>
                                                        <select name="insur_com" id="insur_com" class="form-control select2">
                                                            <?php echo  $api->generate_insurance_options('INSCODEACRED', $insurance_data[0]['INS_CODE'] ?? null)?>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="clas">Classification</label>
                                                        <select name="classifi" id="classifi" class="form-control select2">
                                                            <?php echo  $api->generate_insurance_options('ISRCLASS', $insurance_data[0]['INS_CLAS'] ?? null)?>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="year_model">Year model <?php $insurance_data[0]['YEAR_MOD'] ?? null ?></label>
                                                        <input type="number" name="year_model" class="form-control" value="<?php echo $insurance_data[0]['YEAR_MOD'] ?? null ?>" id="year_model">
                                                    </div>
                                                    
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Mortgagee</label>
                                                        <select name="mortgagee" id="mortgagee" value="<?php echo $insurance_data[0]['MORTGAGEE'] ?? null ?>" class="form-control select2">
                                                           <option value="1">Encore Leasing and Finance Corp.</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="col_id">Rate</label>
                                                       <input type="number" value="<?php echo $insurance_data[0]['RATE'] ?? '0.00' ?>" class="form-control"  name="rate" id="rate" >
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="coverage">Coverage</label>
                                                       <input type="text" class="form-control currency" value="<?php echo $insurance_data[0]['COVERAGE'] ?? '0.00' ?>" name="coverage" id="coverage" >
                                                    </div>
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="other lines">Other Lines</label>
                                                        <select name="otherlines" id="otherlines"  class="form-control select2">
                                                            <option value="100K" <?php if($insurance_data[0]['OTHER_LINES'] ?? null =='100K') echo 'selected' ?> >100K</option>
                                                            <option value="200K" <?php if($insurance_data[0]['OTHER_LINES'] ?? null =='200K') echo 'selected' ?> >200K</option>
                                                        </select>
                                                    </div>
                                                   
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Pro-Rata Months</label>
                                                        <select name="pro_r_m" id="pro_r_m" class="form-control select2">
                                                            <option value='1' <?php if($insurance_data[0]['PRM'] ?? null =='1') echo 'selected' ?> >1</option>
                                                            <option value='2' <?php if($insurance_data[0]['PRM'] ?? null =='2') echo 'selected' ?>  >2</option>
                                                            <option value='3' <?php if($insurance_data[0]['PRM'] ?? null =='3') echo 'selected' ?> >3</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Pro-Rata Amount</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['PRM_AM'] ?? '0.00' ?>" name="pro_rt_amount" readonly id="pro_rt_amount" class="form-control currency">
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">With AOG?</label>
                                                        <select name="aog" id="aog" class="form-control select2">
                                                            <option value='0' <?php if($insurance_data[0]['IS_AOG']  ?? null =='0') echo 'selected' ?> >No</option>
                                                            <option value='1' <?php if($insurance_data[0]['IS_AOG']  ?? null =='1') echo 'selected' ?> >Yes</option>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">Inception Start Date</label>
                                                        <input type="date" name="isd" id="isd" value="<?php echo $insurance_data[0]['INCEP_SDT'] ?? null ?>" class="form-control datepicker">
                                                    </div>
                                                </div>
                                            </div>


                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="aog">Inception End Date</label>
                                                        <input type="date" name="iet" id="iet" value="<?php echo $insurance_data[0]['INCEP_EDT'] ?? null ?>" class="form-control datepicker">
                                                    </div>

                                                    <div class="col-md-3 mt-3"> 
                                                        <label for="ins_req_id">Payment Term</label>
                                                        <select name="p_term" id="p_term" class="form-control select2">
                                                            <?php echo  $api->generate_insurance_options('INSPTERM',$insurance_data[0]['PAY_TERM'])?>
                                                        </select>
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="nodays">Number of Days.</label>
                                                        <input type="number" name="nodays" readonly value="<?php echo $insurance_data[0]['NOD'] ?? null ?>" id="nodays" class="form-control">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="num_days">Due Date</label>
                                                        <input type="date" name="due_dt" value="<?php echo $insurance_data[0]['DD'] ?? null ?>" readonly id="due_dt" class="form-control">
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3">
                                                        <label for="odtl">OD/Theft/Loss</label>
                                                        <input type="text" name="odtl" value="<?php echo $insurance_data[0]['ODTL'] ?? '0.00'?>" readonly class="form-control currency" id="odtl">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="bodyly_injured">Bodily Injured</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['BODIN'] ?? '0.00' ?>" name="bodily_injured" readonly class="form-control currency" id="bodily_injured">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="p_dmg">Property Damage</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['PTDMG'] ?? '0.00' ?>" name="pro_dmg" readonly class="form-control currency" id="pro_dmg">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="p_dmg">Personal Accident</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['PERACC'] ?? '0.00' ?>" name="per_dmg" readonly class="form-control currency" id="per_dmg">
                                                    </div>

                                                </div>
                                            </div>




                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-3 mt-3">
                                                        <label for="gross_prem">Gross Premium</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['GP'] ?? '0.00' ?>" name="gross_prem" readonly class="form-control currency" id="gross_prem">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="net_amt">Net Amount</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['NETMT'] ?? '0.00' ?>" name="net_amt" readonly  class="form-control currency" id="net_amt">
                                                    </div>
                                                    <div class="col-md-3 mt-3">
                                                        <label for="net_com">Net Commision</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['NETCOMI'] ?? '0.00' ?>" name="net_com" readonly  class="form-control currency" id="net_com">
                                                    </div>

                                                    <div class="col-md-3 mt-3">
                                                        <label for="tot_prem">Total Premium</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['TOTALPREM'] ?? '0.00' ?>" name="tot_prem" readonly class="form-control currency" id="tot_prem">
                                                    </div>

                                                </div>
                                            </div>



                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-4 mt-3">
                                                        <label for="gross_prem">Income</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['INCOME'] ?? '0.00' ?>" name="income" readonly class="form-control currency" id="income">
                                                    </div>
                                                    <div class="col-md-4 mt-3">
                                                        <label for="net_amt">Dealer's Commission</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['DEALCD'] ?? '0.00' ?>" name="deal_comm" readonly  class="form-control currency" id="deal_comm">
                                                    </div>
                                                    <div class="col-md-4 mt-3">
                                                        <label for="net_amt">Status</label>
                                                        <input type="text" value="<?php echo $insurance_data[0]['IRS'] ?? 'pending' ?>" name="" readonly  class="form-control" id="">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-12 mt-3">
                                                            <label for="gross_prem">Cancelled remarks</label>
                                                            <textarea name="" class="form-control" id="" readonly cols="1" rows="2"><?php echo $insurance_data[0]['CAN_REM'] ?? 'No remarks' ?></textarea>
                                                        </div>
                                                    </div>
                                                </div>



                                          <div class="col-md-12 mt-4">
                                          <button type="button" class="btn btn-primary" id="submitform_ins_req">Submit</button>
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
    <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
    <script src="assets/libs/moment/moment-with-locales.min.js"></script>
    <script>
        var id_irs = "<?php echo $insurance_data[0]['IRS']  ?? 'pending' ?>";
        if(id_irs == 'complete' || id_irs=='cancelled' ){
            $(`input,select,button`).prop('disabled',true);
        }
        console.log(id_irs);
        $(".select2").select2({});
        $('.datepicker').datepicker({
        format: 'yyyy-mm-dd'});
        $('.currency').inputmask({
        'alias':          'decimal',
        'groupSeparator': ',',
        'autoGroup':      true, 
        'digits':         2,
        'digitsOptional': false,
        'placeholder':    '0.00'
});
    if($('#p_term').val() == '1time'){
        $('#nodays').prop('readonly',false)
    }



    </script>
</body>

</html>