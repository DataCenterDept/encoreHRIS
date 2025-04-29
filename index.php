<?php
    $page_title = 'Human Resource Information Systems';

    require('session-check.php');
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
        <style>
            
        </style>
    </head>
    <body class="auth-body-bg">
   <section class="h-100 gradient-form" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100" style="background-color:#ffff"; "background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);"
 >
          <div class="row g-0">
                      
                    <div class="col-xl-6">
                        <div class="auth-full-bg pt-lg-5 p-4">
                            <div class="w-100">
                                <div class="bg-overlay" style="background:url('https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80');background-size:cover;background-repeat:no-repeat;background-position:center"></div>
                            </div>
                        </div>
                    </div>

                <div class="col-xl-6">
                        <div class="auth-full-page-content p-md-5 p-4">
                            <div class="w-100">
                                <div class="d-flex flex-column h-100">
                                    <!-- Logo Section -->
                                    <div class="mb-4 text-center">
                                        <a href="index.php" class="d-block auth-logo">
                                            <img src="<?php echo $logo_dark; ?>" alt="logo" style="max-height: 120px" class="auth-logo-dark">
                                            <img src="<?php echo $logo_light; ?>" alt="logo" style="max-height: 120px" class="auth-logo-light">
                                        </a>
                                    </div>
                                    
                                    <div class="my-auto">
                                        <!-- Header Section -->
                                        <div>
                                            <h5 class="text-primary">Sign in to your account</h5>
                                            <p class="text-muted">Enter your username & password to continue.</p>
                                        </div>
                            
                                        <div class="mt-4">
                                            <form id="signinForm" method="post" action="#">
                                                <!-- Username field with icon -->
                                                <div class="mb-3">
                                                    <label for="username" class="form-label">Username</label>
                                                    <div class="input-group">
                                                        <span class="input-group-text"><i class="mdi mdi-account-outline"></i></span>
                                                        <input type="text" class="form-control" id="username" name="username" autocomplete="off" placeholder="Enter username">
                                                    </div>
                                                </div>
                                    
                                                <!-- Password field with icon -->
                                                <div class="mb-3">
                                                    <div class="input-group auth-pass-inputgroup">
                                                        <span class="input-group-text"><i class="mdi mdi-lock-outline"></i></span>
                                                        <input type="password" id="password" name="password" class="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon">
                                                        <button class="btn btn-light" type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>
                                                
                                                <!-- Remember me checkbox -->
                                                <div class="form-check mb-3">
                                                    <input class="form-check-input" type="checkbox" id="remember-check">
                                                    <label class="form-check-label" for="remember-check">
                                                        Remember me
                                                    </label>
                                                </div>
                                                
                                                <!-- Login button -->
                                                <div class="mt-3 d-grid">
                                                    <button id="signin" class="btn btn-primary waves-effect waves-light" type="submit">
                                                        Log In <i class="mdi mdi-arrow-right ms-1"></i>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                    
                                    <!-- Footer -->
                                    <div class="mt-4 mt-md-5 text-center">
                                        <hr class="my-4">
                                        <p class="mb-0"> Copyright © <?php echo date('Y'); ?> Human Resource Information Systems. All rights reserved.</p>
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