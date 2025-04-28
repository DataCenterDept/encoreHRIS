<?php
    session_start();
    require('config/config.php');
    require('classes/api.php');
    $api = new Api;
    require('views/_application_settings.php');
    
    $page_title = 'Worknest';
 
    if ($_SESSION['logged_in'] != 1) {
        # Destroy session
        session_unset();
        session_destroy();
        header('Location: index.php');
        exit();
    }

    $username = $_SESSION['username'];
    $_SESSION['lock'] = 1;

    $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
    $employee_name = ucwords(strtolower($employee_profile_details[0]['FIRST_NAME'] . ' ' . $employee_profile_details[0]['LAST_NAME']));
    $position = $api->get_system_description('DESIGNATION', $employee_profile_details[0]['DESIGNATION']);  
    $profile_image = $api->check_profile_image($employee_profile_details[0]['PROFILE_IMAGE']);
?>
        <?php
            require('views/_head.php');
        ?>
        <link rel="stylesheet" href="assets/libs/sweetalert2/sweetalert2.min.css">
        <link href="assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
    </head>
    <body class="auth-body-bg">
        <div>
            <div class="container-fluid p-0">
                <div class="row g-0">
                    
                    <div class="col-xl-8">
                        <div class="auth-full-bg pt-lg-5 p-4">
                            <div class="w-100">
                            <div class="bg-overlay" style="background:url('<?php echo $login_bg; ?>');background-size:cover;background-repeat:no-repeat;background-position:center"></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-4">
                        <div class="auth-full-page-content p-md-5 p-4">
                            <div class="w-100">

                                <div class="d-flex flex-column h-100">
                                    <div class="mb-3 mb-md-3">
                                        <a href="index.html" class="d-block auth-logo">
                                            <img src="<?php echo $logo_dark; ?>" alt="logo" style="max-height: 120px" class="auth-logo-dark">
                                            <img src="<?php echo $logo_light; ?>" alt="logo" style="max-height: 120px" class="auth-logo-light">
                                        </a>
                                    </div>
                                    <div class="my-auto">
                                        
                                        <div>
                                            <h5 class="text-primary">Lock screen</h5>
                                            <p class="text-muted">Enter your password to unlock the screen.</p>
                                        </div>
            
                                        <div class="mt-4">
                                            <form id="lockscreenForm" method="post" action="#">
                
                                                <div class="user-thumb text-center mb-4">
                                                    <img src="<?php echo $profile_image; ?>" class="rounded-circle img-thumbnail avatar-md" alt="avatar">
                                                    <h5 class="font-size-15 mt-3"><?php echo $employee_name; ?></h5>
                                                </div>

                                                <input type="hidden" id="username" name="username" value="<?php echo $username; ?>">
                        
                                                <div class="mb-3">
                                                    <label class="form-label">Password</label>
                                                    <div class="input-group auth-pass-inputgroup">
                                                        <input type="password" id="password" name="password" class="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon">
                                                        <button class="btn btn-light" type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>
                                                
                                                <div class="mt-3 d-grid">
                                                    <button id="signin" class="btn btn-primary waves-effect waves-light" type="submit">Unlock</button>
                                                </div>

                                            </form>
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
        </div>
        <?php
            require('views/_signin_script.php');
        ?>
    </body>
</html>