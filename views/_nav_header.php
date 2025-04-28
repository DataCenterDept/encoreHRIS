<?php
    require('notification_update.php');
    
    $profile_page = $api->check_role_permissions($username, 27);
    $backup_database = $api->check_role_permissions($username, 135);
	$employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
    $emp_id = $employee_profile_details[0]['EMPLOYEE_ID'];
    $emp_vacation_leave = $api->get_employee_remaining_leave($emp_id, 'LEAVETP1');
    $emp_sick_leave = $api->get_employee_remaining_leave($emp_id, 'LEAVETP2');
    $emp_emergency_leave = $api->get_employee_remaining_leave($emp_id, 'LEAVETP5');
    $employee_name = ucwords(strtolower($employee_profile_details[0]['FIRST_NAME'] . ' ' . $employee_profile_details[0]['LAST_NAME']));
    $designation_details = $api->get_data_details_one_parameter('designation', $employee_profile_details[0]['DESIGNATION']);
    $position = $designation_details[0]['DESIGNATION'] ?? null;
    $profile_image = $api->check_profile_image($employee_profile_details[0]['PROFILE_IMAGE']);
    $notification_list = $api->generate_notification_list($emp_id);
?>
            
            <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                        <div class="navbar-brand-box">

                            <a href="dashboard.php" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="<?php echo $logo_icon_light; ?>" alt="" height="24">
                                </span>
                                <span class="logo-lg">
                                    <img src="<?php echo $logo_light; ?>" alt="" height="40">
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect" id="vertical-menu-btn">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>
                    </div>

                    <div class="d-flex">
                        <div class="d-none d-lg-inline-block ms-1 mt-4" id="system-time">
                        </div>

                        <div class="dropdown d-none d-lg-inline-block ms-1">
                            <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                                <i class="bx bx-fullscreen"></i>
                            </button>
                             <?php
                                if($backup_database > 0){
                                    echo '<button type="button" class="btn header-item noti-icon waves-effect" id="backup-database">
                                        <i class="bx bx-data"></i>
                                    </button>';
                                }
                            ?>
                        </div>

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                                <div class="p-3">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h6 class="m-0" key="t-notifications"> Notifications </h6>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style="max-height: 250px;">
                                    <?php
                                        echo $notification_list;
                                    ?>
                                </div>
                            </div>
                        </div>

                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="rounded-circle header-profile-user" src="<?php echo $profile_image; ?>" alt="Header Avatar">
                                <span class="d-none d-xl-inline-block ms-1" key="t-henry" id="username"><?php echo $username; ?></span>
                                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <?php
                                    if($profile_page > 0){
                                        echo '<a class="dropdown-item" href="profile.php"><i class="bx bx-user font-size-16 align-middle me-1"></i> <span key="t-profile">Profile</span></a>';
                                    }
                                ?>
                                <a class="dropdown-item" href="lockscreen.php"><i class="bx bx-lock-open font-size-16 align-middle me-1"></i> <span key="t-lock-screen">Lock screen</span></a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-danger" href="logout.php?logout"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>