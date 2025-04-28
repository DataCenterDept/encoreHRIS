<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Company Settings';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 25);

	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
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
                            <div class="col-md-12">
                                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 class="mb-sm-0 font-size-18"><?php echo $page_title; ?></h4>
                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Administrator Modules</a></li>
                                            <li class="breadcrumb-item"><a href="javascript: void(0);">Settings</a></li>
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
                                        <form class="cmxform" id="companysettingsForm" method="post" action="#">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label for="companyname" class="form-label">Company Name <span class="required">*</span></label>
                                                        <input type="hidden" id="companyid" name="companyid" value="1">
                                                        <input type="text" class="form-control maxlength" autocomplete="off" id="companyname" name="companyname" maxlength="300">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="email" class="form-label">Email <span class="required">*</span></label>
                                                        <input id="email" name="email" class="form-control email-inputmask maxlength" maxlength="50" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="phone" class="form-label">Phone <span class="required">*</span></label>
                                                        <input type="text" class="form-control maxlength" autocomplete="off" id="phone" name="phone" maxlength="30">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="telephone" class="form-label">Telephone <span class="required">*</span></label>
                                                        <input type="text" class="form-control maxlength" autocomplete="off" id="telephone" name="telephone" maxlength="30">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="website" class="form-label">Website</label>
                                                        <input type="url" id="website" name="website" class="form-control maxlength" maxlength="100" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <label for="address" class="form-label">Company Address <span class="required">*</span></label>
                                                        <textarea class="form-control maxlength" id="address" name="address" maxlength="500" rows="5"></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Working Days <span class="required">*</span></label>
                                                        <select id="workingdays" class="select2 form-control" multiple="multiple">
                                                            <option value="1">Monday</option>
                                                            <option value="2">Tuesday</option>
                                                            <option value="4">Wednesday</option>
                                                            <option value="8">Thursday</option>
                                                            <option value="16">Friday</option>
                                                            <option value="32">Saturday</option>
                                                            <option value="64">Sunday</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="mb-3">
                                                        <label class="form-label">Health Declaration Form <span class="required">*</span></label>
                                                        <select id="healthdeclaration" name="healthdeclaration" class="select2 form-control">
                                                            <option value="0">Disabled</option>
                                                            <option value="1">Enabled</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="starttime" class="form-label">Office Start Time <span class="required">*</span></label>
                                                        <input type="time" id="starttime" name="starttime" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="endtime" class="form-label">Office End Time <span class="required">*</span></label>
                                                        <input type="time" id="endtime" name="endtime" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="lunchstarttime" class="form-label">Lunch Start Time <span class="required">*</span></label>
                                                        <input type="time" id="lunchstarttime" name="lunchstarttime" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="lunchendtime" class="form-label">Lunch End Time <span class="required">*</span></label>
                                                        <input type="time" id="lunchendtime" name="lunchendtime" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="halfday" class="form-label">Half-Day Mark <span class="required">*</span></label>
                                                        <input type="time" id="halfday" name="halfday" class="form-control" autocomplete="off">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="workingdayspermonth" class="form-label">Working Days Per Month <span class="required">*</span></label>
                                                        <input data-toggle="touchspin" autocomplete="off" type="text" id="workingdayspermonth" name="workingdayspermonth">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="late" class="form-label">Late Mark After (minutes) <span class="required">*</span></label>
                                                        <input data-toggle="touchspin" autocomplete="off" type="text" id="late" name="late">
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label for="maxclockin" class="form-label">Maximum Clock-In/Day <span class="required">*</span></label>
                                                        <input data-toggle="touchspin" autocomplete="off" type="text" id="maxclockin" name="maxclockin">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <button type="submit" class="btn btn-primary" id="submitform" form="companysettingsForm">Submit</button>
                                                    </div>
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
        <script src="assets/js/form-validation.js"></script>
        <script src="assets/js/datatable.js"></script>
        <script src="assets/libs/inputmask/min/jquery.inputmask.bundle.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
    </body>
</html>
