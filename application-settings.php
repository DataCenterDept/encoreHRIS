<?php
	require('session.php');
	require('config/config.php');
	require('classes/api.php');
	$api = new Api;
	$page_title = 'Application Settings';

	# Check role permission
	$page_access = $api->check_role_permissions($username, 29);

	if($page_access == 0){
		header('location: 404-page.php');
	}
?>
        <?php
            require('views/_head.php');
        ?>
        <link href="assets/libs/select2/css/select2.min.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
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
                                        <form class="cmxform" id="applicationsettingsForm" method="post" action="#">
                                            <input type="hidden" id="settingsid" name="settingsid" value="1">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Default Currency <span class="required">*</span></label>
                                                        <select class="form-control select2" id="currency" name="currency">
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_system_options('CURRENCY'); ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Default Timezone <span class="required">*</span></label>
                                                        <select class="form-control select2" id="timezone" name="timezone">
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_timezone(); ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Date Format <span class="required">*</span></label>
                                                        <select class="form-control select2" id="dateformat" name="dateformat">
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_system_options('DATEFORMAT'); ?>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="mb-3">
                                                        <label class="form-label">Time Format <span class="required">*</span></label>
                                                        <select class="form-control select2" id="timeformat" name="timeformat">
                                                            <option value="">--</option>
                                                            <?php echo $api->generate_system_options('TIMEFORMAT'); ?>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="login_bg" class="form-label">Login Background</label><br/>
                                                        <img class="rounded mr-2 mb-3" alt="login bg" width="150" src="" id="login-bg" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="logo_light" class="form-label">Logo Light</label><br/>
                                                        <img class="rounded mr-2 mb-3" alt="logo-light" width="150" src="" id="logo-light" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="logo_dark" class="form-label">Logo Dark</label></br>
                                                        <img class="rounded mr-2 mb-3" alt="logo dark" width="150" src="" id="logo-dark" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="login_bg" id="login_bg">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="logo_light" id="logo_light">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="logo_dark" id="logo_dark">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="login_icon_light" class="form-label">Logo Icon Light</label><br/>
                                                        <img class="rounded mr-2 mb-3" alt="logo icon light" width="150" src="" id="logo-icon-light" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="login_icon_dark" class="form-label">Logo Icon Dark</label><br/>
                                                        <img class="rounded mr-2 mb-3" alt="logo icon dark" width="150" src="" id="logo-icon-dark" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <label for="favicon_image" class="form-label">Favicon Image</label><br/>
                                                        <img class="rounded mr-2 mb-3" alt="favicon image" width="150" src="" id="favicon-image" data-holder-rendered="true">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="login_icon_light" id="login_icon_light">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="login_icon_dark" id="login_icon_dark">
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="mb-3">
                                                        <input class="form-control" type="file" name="favicon_image" id="favicon_image">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="mb-3">
                                                        <button type="submit" class="btn btn-primary" id="submitform" form="applicationsettingsForm">Submit</button>
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
        <script src="assets/libs/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>
        <script src="assets/libs/select2/js/select2.min.js"></script>
    </body>
</html>
