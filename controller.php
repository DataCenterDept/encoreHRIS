<?php
session_start();
require('config/config.php');
require('classes/api.php');



if (isset($_POST['transaction']) && !empty($_POST['transaction'])) {
    $transaction = $_POST['transaction'];
    $api = new Api;
    $systemdate = date('Y-m-d');
    $current_time = date('H:i:s');
    $attendance_time = date('H:i:00');

    # Authenticate
    if ($transaction == 'authenticate') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])) {
            $username = $_POST['username'];
            $password = $api->encrypt_data($_POST['password']);

            $authenticate = $api->authenticate($username, $password);

            if ($authenticate == '1') {
                $_SESSION['lock'] = 0;
                $_SESSION['logged_in'] = 1;
                $_SESSION['username'] = $username;

                echo 'Authenticated';
            } else {
                echo $authenticate;
            }
        }
    }
    # -------------------------------------------------------------

    # Unlock screen
    else if ($transaction == 'unlock screen') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['password']) && !empty($_POST['password'])) {
            $username = $_POST['username'];
            $password = $api->encrypt_data($_POST['password']);

            $authenticate = $api->authenticate($username, $password);

            if ($authenticate == '1') {
                $_SESSION['lock'] = 0;

                echo 'Authenticated';
            } else {
                echo $authenticate;
            }
        }
    }
    # -------------------------------------------------------------

    # Change password
    else if ($transaction == 'change password') {
        if (isset($_POST['change_username']) && !empty($_POST['change_username']) && isset($_POST['change_password']) && !empty($_POST['change_password'])) {
            $username = $_POST['change_username'];
            $password = $api->encrypt_data($_POST['change_password']);
            $password_expiry_date = $api->format_date('Y-m-d', $systemdate, '+6 months');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $username);

            if ($check_data_exist_one_parameter == 1) {
                $change_password = $api->update_user_password($username, $password, $password_expiry_date);

                if ($change_password == '1') {
                    echo 'Updated';
                } else {
                    echo $change_password;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Check role permission
    else if ($transaction == 'check role permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['permissionid']) && !empty($_POST['permissionid'])) {
            $username = $_POST['username'];
            $permissionid = $_POST['permissionid'];
            $role = $api->check_role_permissions($username, $permissionid);

            echo $role;
        }
    }
    # -------------------------------------------------------------

    # -------------------------------------------------------------
    #   Submit functions
    # -------------------------------------------------------------

    # Insert/update page
    else if ($transaction == 'submit page') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['pageid']) && isset($_POST['pagename']) && !empty($_POST['pagename'])) {
            $username = $_POST['username'];
            $page_id = $_POST['pageid'];
            $page_name = $_POST['pagename'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('page', $page_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_page = $api->update_page($page_name, $page_id, $username);

                if ($update_page == '1') {
                    echo 'Updated';
                } else {
                    echo $update_page;
                }
            } else {
                $insert_page = $api->insert_page($page_name, $username);

                if ($insert_page == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_page;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update permission
    else if ($transaction == 'submit permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['permissionid']) && isset($_POST['pageid']) && !empty($_POST['pageid']) && isset($_POST['permissiondesc']) && !empty($_POST['permissiondesc'])) {
            $username = $_POST['username'];
            $permission_id = $_POST['permissionid'];
            $page_id = $_POST['pageid'];
            $permission_desc = $_POST['permissiondesc'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('permission', $permission_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_permission = $api->update_permission($page_id, $permission_desc, $permission_id, $username);

                if ($update_permission == '1') {
                    echo 'Updated';
                } else {
                    echo $update_permission;
                }
            } else {
                $insert_permission = $api->insert_permission($page_id, $permission_desc, $username);

                if ($insert_permission == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_permission;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert / update system parameters
    else if ($transaction == 'submit system parameter') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['parameterid']) && isset($_POST['description']) && isset($_POST['extension']) && isset($_POST['paramnum'])) {
            $username = $_POST['username'];
            $parameter_id = $_POST['parameterid'];
            $description = $_POST['description'];
            $extension = $_POST['extension'];
            $number = $api->check_number($_POST['paramnum']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('system parameter', $parameter_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_system_parameter = $api->update_system_parameter($description, $extension, $number, $parameter_id, $username);

                if ($update_system_parameter == '1') {
                    echo 'Updated';
                } else {
                    echo $update_system_parameter;
                }
            } else {
                $insert_system_parameter = $api->insert_system_parameter($description, $extension, $number, $username);

                if ($insert_system_parameter == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_system_parameter;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert / update system code
    else if ($transaction == 'submit system code') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['systemtype']) && isset($_POST['systemcode']) && isset($_POST['systemdesc'])) {
            $username = $_POST['username'];
            $system_type = $_POST['systemtype'];
            $system_code = $_POST['systemcode'];
            $system_desc = $_POST['systemdesc'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('system code', $system_type, $system_code);

            if ($check_data_exist_two_parameter > 0) {
                $update_system_code = $api->update_system_code($system_desc, $system_type, $system_code, $username);

                if ($update_system_code == '1') {
                    echo 'Updated';
                } else {
                    echo $update_system_code;
                }
            } else {
                $insert_system_code = $api->insert_system_code($system_type, $system_code, $system_desc, $username);

                if ($insert_system_code == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_system_code;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update role
    else if ($transaction == 'submit role') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && isset($_POST['roledesc']) && !empty($_POST['roledesc'])) {
            $username = $_POST['username'];
            $role_desc = $_POST['roledesc'];
            $role_id = $_POST['roleid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_role = $api->update_role($role_desc, $role_id, $username);

                if ($update_role == '1') {
                    echo 'Updated';
                } else {
                    echo $update_role;
                }
            } else {
                $insert_role = $api->insert_role($role_desc, $username);

                if ($insert_role == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_role;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update role permission
    else if ($transaction == 'submit role permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && !empty($_POST['roleid']) && isset($_POST['permission'])) {
            $username = $_POST['username'];
            $role_id = $_POST['roleid'];
            $permissions = explode(',', $_POST['permission']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_permission_role = $api->delete_permission_role($role_id, $username);

                if ($delete_permission_role == '1') {
                    foreach ($permissions as $permission) {
                        $insert_permission_role = $api->insert_permission_role($role_id, $permission, $username);

                        if ($insert_permission_role != '1') {
                            echo $insert_permission_role;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_permission_role;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update role user
    else if ($transaction == 'submit role user') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && !empty($_POST['roleid']) && isset($_POST['user'])) {
            $username = $_POST['username'];
            $role_id = $_POST['roleid'];
            $users = explode(',', $_POST['user']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_user_role = $api->delete_user_role($role_id, $username);

                if ($delete_user_role == '1') {
                    foreach ($users as $user) {
                        $insert_user_role = $api->insert_user_role($role_id, $user, $username);

                        if ($insert_user_role != '1') {
                            echo $insert_user_role;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_user_role;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update company settings
    else if ($transaction == 'submit company settings') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['companyid']) && !empty($_POST['companyid']) && isset($_POST['companyname']) && !empty($_POST['companyname']) && isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['telephone']) && isset($_POST['phone']) && isset($_POST['address']) && !empty($_POST['address']) && isset($_POST['website']) && isset($_POST['starttime']) && !empty($_POST['starttime']) && isset($_POST['endtime']) && !empty($_POST['endtime']) && isset($_POST['halfday']) && !empty($_POST['halfday']) && isset($_POST['late']) && !empty($_POST['late']) && isset($_POST['workingdays']) && isset($_POST['healthdeclaration']) && isset($_POST['maxclockin']) && !empty($_POST['maxclockin']) && isset($_POST['lunchstarttime']) && !empty($_POST['lunchstarttime']) && isset($_POST['lunchendtime']) && !empty($_POST['lunchendtime']) && isset($_POST['workingdayspermonth']) && !empty($_POST['workingdayspermonth'])) {
            $username = $_POST['username'];
            $company_id = $_POST['companyid'];
            $company_name = $_POST['companyname'];
            $email = $_POST['email'];
            $telephone = $_POST['telephone'];
            $phone = $_POST['phone'];
            $address = $_POST['address'];
            $website = $_POST['website'];
            $start_time = $_POST['starttime'];
            $end_time = $_POST['endtime'];
            $half_day = $_POST['halfday'];
            $lunch_start_time = $_POST['lunchstarttime'];
            $lunch_end_time = $_POST['lunchendtime'];
            $working_days_per_month = $_POST['workingdayspermonth'];
            $max_clock_in = $_POST['maxclockin'];
            $health_declaration = $_POST['healthdeclaration'];
            $late = $_POST['late'];
            $working_days = explode(',', $_POST['workingdays']);
            $working_day_total = 0;

            foreach ($working_days as $working_day) {
                $working_day_total += intval($working_day);
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('company', $company_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_company_settings = $api->update_company_settings($company_name, $email, $phone, $telephone, $website, $address, $start_time, $end_time, $lunch_start_time, $lunch_end_time, $half_day, $working_days_per_month, $late, $working_day_total, $max_clock_in, $health_declaration, $company_id, $username);

                if ($update_company_settings == '1') {
                    echo 'Updated';
                } else {
                    echo $update_company_settings;
                }
            } else {
                $insert_company_settings = $api->insert_company_settings($company_id, $company_name, $email, $phone, $telephone, $website, $address, $start_time, $end_time, $lunch_start_time, $lunch_end_time, $half_day, $working_days_per_month, $late, $working_day_total, $max_clock_in, $health_declaration, $username);

                if ($insert_company_settings == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_company_settings;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Update profile
    else if ($transaction == 'submit profile') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['middlename']) && isset($_POST['lastname']) && !empty($_POST['lastname']) && isset($_POST['suffix']) && isset($_POST['password']) && isset($_POST['gender']) && !empty($_POST['gender']) &&  isset($_POST['birthday']) && !empty($_POST['birthday']) &&  isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['phone']) && !empty($_POST['phone']) && isset($_POST['telephone']) && isset($_POST['address']) && !empty($_POST['address'])) {
            $error = '';
            $username = $_POST['username'];
            $first_name = $_POST['firstname'];
            $middle_name = $_POST['middlename'];
            $last_name = $_POST['lastname'];
            $suffix = $_POST['suffix'];
            $gender = $_POST['gender'];
            $birthday = $api->check_date('empty', $_POST['birthday'], '', 'Y-m-d', '', '', '');
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $telephone = $_POST['telephone'];
            $address = $_POST['address'];
            $password = $_POST['password'];
            $password_encrypt = $api->encrypt_data($password);
            $password_expiry_date = $api->format_date('Y-m-d', $systemdate, '+6 months');

            $profile_image_file_name = $_FILES['profile_image']['name'];
            $profile_image_file_size = $_FILES['profile_image']['size'];
            $profile_image_file_error = $_FILES['profile_image']['error'];
            $profile_image_file_tmp_name = $_FILES['profile_image']['tmp_name'];
            $profile_image_file_ext = explode('.', $profile_image_file_name);
            $profile_image_file_actual_ext = strtolower(end($profile_image_file_ext));
            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee profile', $username);

            if ($check_data_exist_one_parameter > 0) {
                if (!empty($profile_image_file_name)) {
                    if (in_array($profile_image_file_actual_ext, $allowed_ext)) {
                        if (!$profile_image_file_error) {
                            if ($profile_image_file_size < 2000000) {
                                $update_profile_image = $api->update_profile_image($profile_image_file_tmp_name, $profile_image_file_actual_ext, '', $username);

                                if ($update_profile_image != '1') {
                                    $error = $update_profile_image;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (empty($error)) {
                    $update_profile = $api->update_profile($first_name, $middle_name, $last_name, $suffix, $gender, $birthday, $email, $phone, $telephone, $address, $username);

                    if ($update_profile == '1') {
                        if (!empty($password)) {
                            $change_password = $api->update_user_password($username, $password_encrypt, $password_expiry_date);

                            if ($change_password == '1') {
                                echo 'Updated';
                            } else {
                                echo $change_password;
                            }
                        } else {
                            echo 'Updated';
                        }
                    } else {
                        echo $update_profile;
                    }
                } else {
                    echo $error;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    
    
    else if ($transaction == 'new employee details') {
    $details = $api->get_new_employee_details();
    echo json_encode($details);
    }
    
    else if ($transaction == 'new employees') {
        $month = isset($_POST['month']) ? intval($_POST['month']) : date('n');
        $details = $api->get_new_employees($username, 23, $month); // Using same permission ID as employee headcount
        echo json_encode($details);
    }



    else if ($transaction == 'employee headcount details') {
            $details = $api->get_employee_headcount_details();
            echo json_encode($details);
    }
    
    else if ($transaction == 'employee departures') {
    $details = $api->get_employee_departures();
    echo json_encode($details);
    }

    else if ($transaction == 'employee birthdays') {
        $month = isset($_POST['month']) ? intval($_POST['month']) : date('n');
        $details = $api->get_employee_birthdays($month);
        echo json_encode($details);
    }
    
    else if ($transaction == 'employee work anniversaries') {
    $month = isset($_POST['month']) ? intval($_POST['month']) : date('n');
    $details = $api->get_employee_work_anniversaries($username, 23); // Using same permission ID as employee headcount
    echo json_encode($details);
    }
    
    else if ($transaction == 'newly permanent employees') {
    $month = isset($_POST['month']) ? intval($_POST['month']) : date('n');
    $details = $api->get_newly_permanent_employees($username, 23, $month); // Using same permission ID as employee headcount
    echo json_encode($details);
    }



    # -------------------------------------------------------------
    # Get Sales Partner Monthly Booking
    else if ($transaction == 'sales partner monthly booking details') {
            $details = $api->get_sales_partner_monthly_booking_details();

            echo json_encode($details);
    }

    # -------------------------------------------------------------
    # Get Branch Monthly Booking
    else if ($transaction == 'branch monthly booking details') {
        $details = $api->get_branch_monthly_booking_details();

        echo json_encode($details);
    }

    # -------------------------------------------------------------
    # Get Sales Partner To Date Booking
    else if ($transaction == 'sales partner to date booking details') {
        $details = $api->get_sales_partner_to_date_booking_details();

        echo json_encode($details);
    }

    # -------------------------------------------------------------
    # Get Branch To Date Booking
    else if ($transaction == 'branch to date booking details') {
        $details = $api->get_branch_to_date_booking_details();

        echo json_encode($details);
    }

    # -------------------------------------------------------------

    # update sales partner booking
    else if ($transaction == 'submit sales partner booking') {
        if (!isset($_POST['username']) || empty($_POST['username'])) {
            $error = 'Please Login to proceed.';
            echo $error;
            return;
        }

        //check if there is an uploaded file
        if (!isset($_FILES["sales_partner_booking_file"]) || empty($_FILES["sales_partner_booking_file"]["name"])){
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        $error = '';
        $username = $_POST['username'];
        $submission_type = $_POST['submission_type'];

        $sales_partner_booking_file_name = $_FILES['sales_partner_booking_file']['name'];
        $sales_partner_booking_file_size = $_FILES['sales_partner_booking_file']['size'];
        $sales_partner_booking_file_error = $_FILES['sales_partner_booking_file']['error'];
        $sales_partner_booking_file_tmp_name = $_FILES['sales_partner_booking_file']['tmp_name'];
        $sales_partner_booking_file_ext = explode('.', $sales_partner_booking_file_name);
        $sales_partner_booking_file_actual_ext = strtolower(end($sales_partner_booking_file_ext));
        $allowed_ext = array('csv');

        //check if there is an uploaded file
        if (empty($sales_partner_booking_file_name)) {
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        //check the file type
        if (!in_array($sales_partner_booking_file_actual_ext, $allowed_ext)) {
            $error = 'Please send a file in CSV.';
            echo $error;
            return;
        }

        //check if there is an error in the file
        if ($sales_partner_booking_file_error) {
            $error = 'There was an error uploading the file.';
            echo $error;
            return;
        }

        //check the file size
        if ($sales_partner_booking_file_size > 50000000) {
            $error = 'Please send a file less than 5mb.';
            echo $error;
            return;
        }

        //update the database
        $update_sales_partner_booking = $api->update_sales_partner_booking($sales_partner_booking_file_tmp_name, $sales_partner_booking_file_actual_ext, $username, $submission_type);

        //check the response in updating the database
        if ($update_sales_partner_booking != '1') {
            $error = $update_sales_partner_booking;
            echo $error;
            return;
        }

        //show the message
        echo 'Updated';
        return;
    }


    # -------------------------------------------------------------

    # update position monthly quota
    else if ($transaction == 'submit position monthly quota') {
        if (!isset($_POST['username']) || empty($_POST['username'])) {
            $error = 'Please Login to proceed.';
            echo $error;
            return;
        }

        //check if there is an uploaded file
        if (!isset($_FILES["position_monthly_quota_file"]) || empty($_FILES["position_monthly_quota_file"]["name"])){
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        $error = '';
        $username = $_POST['username'];

        $position_monthly_quota_file_name = $_FILES['position_monthly_quota_file']['name'];
        $position_monthly_quota_file_size = $_FILES['position_monthly_quota_file']['size'];
        $position_monthly_quota_file_error = $_FILES['position_monthly_quota_file']['error'];
        $position_monthly_quota_file_tmp_name = $_FILES['position_monthly_quota_file']['tmp_name'];
        $position_monthly_quota_file_ext = explode('.', $position_monthly_quota_file_name);
        $position_monthly_quota_file_actual_ext = strtolower(end($position_monthly_quota_file_ext));
        $allowed_ext = array('csv');

        //check if there is an uploaded file
        if (empty($position_monthly_quota_file_name)) {
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        //check the file type
        if (!in_array($position_monthly_quota_file_actual_ext, $allowed_ext)) {
            $error = 'Please send a file in CSV.';
            echo $error;
            return;
        }

        //check if there is an error in the file
        if ($position_monthly_quota_file_error) {
            $error = 'There was an error uploading the file.';
            echo $error;
            return;
        }

        //check the file size
        if ($position_monthly_quota_file_size > 50000000) {
            $error = 'Please send a file less than 5mb.';
            echo $error;
            return;
        }

        //update the database
        $update_position_monthly_quota = $api->update_position_monthly_quota($position_monthly_quota_file_tmp_name, $position_monthly_quota_file_actual_ext, $username);

        //check the response in updating the database
        if ($update_position_monthly_quota != '1') {
            $error = $update_position_monthly_quota;
            echo $error;
            return;
        }

        //show the message
        echo 'Updated';
        return;
    }

    # -------------------------------------------------------------

    # update position monthly quota history
    else if ($transaction == 'submit position monthly quota history') {
        if (!isset($_POST['username']) || empty($_POST['username'])) {
            $error = 'Please Login to proceed.';
            echo $error;
            return;
        }

        //check if there is an uploaded file
        if (!isset($_FILES["position_monthly_quota_history_file"]) || empty($_FILES["position_monthly_quota_history_file"]["name"])){
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        $error = '';
        $username = $_POST['username'];

        $position_monthly_quota_history_file_name = $_FILES['position_monthly_quota_history_file']['name'];
        $position_monthly_quota_history_file_size = $_FILES['position_monthly_quota_history_file']['size'];
        $position_monthly_quota_history_file_error = $_FILES['position_monthly_quota_history_file']['error'];
        $position_monthly_quota_history_file_tmp_name = $_FILES['position_monthly_quota_history_file']['tmp_name'];
        $position_monthly_quota_history_file_ext = explode('.', $position_monthly_quota_history_file_name);
        $position_monthly_quota_history_file_actual_ext = strtolower(end($position_monthly_quota_history_file_ext));
        $allowed_ext = array('csv');


        //check if there is an uploaded file
        if (empty($position_monthly_quota_history_file_name)) {
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        //check the file type
        if (!in_array($position_monthly_quota_history_file_actual_ext, $allowed_ext)) {
            $error = 'Please send a file in CSV.';
            echo $error;
            return;
        }

        //check if there is an error in the file
        if ($position_monthly_quota_history_file_error) {
            $error = 'There was an error uploading the file.';
            echo $error;
            return;
        }

        //check the file size
        if ($position_monthly_quota_history_file_size > 50000000) {
            $error = 'Please send a file less than 5mb.';
            echo $error;
            return;
        }

        //update the database
        $update_position_monthly_quota_history = $api->update_position_monthly_quota_history($position_monthly_quota_history_file_tmp_name, $position_monthly_quota_history_file_actual_ext, $username);

        //check the response in updating the database
        if ($update_position_monthly_quota_history != '1') {
            $error = $update_position_monthly_quota_history;
            echo $error;
            return;
        }

        //show the message
        echo 'Updated';
        return;
    }


    # -------------------------------------------------------------
        
        # Insert/update announcement
    else if ($transaction == 'submit announcement') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['announcementid']) && isset($_POST['title']) && !empty($_POST['title']) && isset($_POST['content']) && !empty($_POST['content'])) {
            $username = $_POST['username'];
            $announcement_id = $_POST['announcementid'];
            $title = $_POST['title'];
            $content = $_POST['content'];
            $type = $_POST['type'];
            $start_date = $_POST['start_date'];
            $end_date = empty($_POST['end_date']) ? null : $_POST['end_date'];
            $is_priority = isset($_POST['is_priority']) ? $_POST['is_priority'] : '0';
            $department = empty($_POST['department']) ? null : $_POST['department'];
            $branch = empty($_POST['branch']) ? null : $_POST['branch'];
            
            # Handle file upload if there's an attachment
            $attachment = null;
            if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
                $upload_dir = 'uploads/announcements/';
                if (!file_exists($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }
                
                $filename = time() . '_' . $_FILES['attachment']['name'];
                $target_file = $upload_dir . $filename;
                
                // Check file type
                $allowed_types = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'txt'];
                $file_ext = strtolower(pathinfo($_FILES['attachment']['name'], PATHINFO_EXTENSION));
                
                if (in_array($file_ext, $allowed_types)) {
                    if (move_uploaded_file($_FILES['attachment']['tmp_name'], $target_file)) {
                        $attachment = $target_file;
                    }
                }
            }
    
            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('announcement', $announcement_id);
    
            if ($check_data_exist_one_parameter > 0) {
                $update_announcement = $api->update_announcement($title, $content, $type, $start_date, $end_date, $attachment, $is_priority, $department, $branch, $announcement_id, $username);
    
                if ($update_announcement == '1') {
                    echo 'Updated';
                } else {
                    echo $update_announcement;
                }
            } else {
                $insert_announcement = $api->insert_announcement($title, $content, $type, $start_date, $end_date, $attachment, $is_priority, $department, $branch, $username);
    
                if ($insert_announcement == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_announcement;
                }
            }
        }
    }
    
    # Delete announcement
    else if ($transaction == 'delete announcement') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['announcementid']) && !empty($_POST['announcementid'])) {
            $username = $_POST['username'];
            $announcement_id = $_POST['announcementid'];
    
            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('announcement', $announcement_id);
    
            if ($check_data_exist_one_parameter > 0) {
                $delete_announcement = $api->delete_announcement($announcement_id, $username);
    
                if ($delete_announcement == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_announcement;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    
    # Get announcement details
    else if ($transaction == 'announcement details') {
        if (isset($_POST['announcementid']) && !empty($_POST['announcementid'])) {
            $announcement_id = $_POST['announcementid'];
            
            $announcement_details = $api->get_announcement_details($announcement_id);
            
            echo json_encode($announcement_details);
        }
    }
    
    # Get dashboard announcements
    else if ($transaction == 'get dashboard announcements') {
        $department = isset($_POST['department']) ? $_POST['department'] : null;
        $branch = isset($_POST['branch']) ? $_POST['branch'] : null;
        
        $announcements = $api->get_dashboard_announcements($department, $branch);
        
        echo json_encode($announcements);
    }


    # update branch monthly quota history
    else if ($transaction == 'submit branch monthly quota history') {
        if (!isset($_POST['username']) || empty($_POST['username'])) {
            $error = 'Please Login to proceed.';
            echo $error;
            return;
        }

        //check if there is an uploaded file
        if (!isset($_FILES["branch_monthly_quota_history_file"]) || empty($_FILES["branch_monthly_quota_history_file"]["name"])){
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        $error = '';
        $username = $_POST['username'];

        $branch_monthly_quota_history_file_name = $_FILES['branch_monthly_quota_history_file']['name'];
        $branch_monthly_quota_history_file_size = $_FILES['branch_monthly_quota_history_file']['size'];
        $branch_monthly_quota_history_file_error = $_FILES['branch_monthly_quota_history_file']['error'];
        $branch_monthly_quota_history_file_tmp_name = $_FILES['branch_monthly_quota_history_file']['tmp_name'];
        $branch_monthly_quota_history_file_ext = explode('.', $branch_monthly_quota_history_file_name);
        $branch_monthly_quota_history_file_actual_ext = strtolower(end($branch_monthly_quota_history_file_ext));
        $allowed_ext = array('csv');

        //check if there is an uploaded file
        if (empty($branch_monthly_quota_history_file_name)) {
            $error = 'Please upload a file.';
            echo $error;
            return;
        }

        //check the file type
        if (!in_array($branch_monthly_quota_history_file_actual_ext, $allowed_ext)) {
            $error = 'Please send a file in CSV.';
            echo $error;
            return;
        }

        //check if there is an error in the file
        if ($branch_monthly_quota_history_file_error) {
            $error = 'There was an error uploading the file.';
            echo $error;
            return;
        }

        //check the file size
        if ($branch_monthly_quota_history_file_size > 50000000) {
            $error = 'Please send a file less than 5mb.';
            echo $error;
            return;
        }

        //update the database
        $update_branch_monthly_quota_history = $api->update_branch_monthly_quota_history($branch_monthly_quota_history_file_tmp_name, $branch_monthly_quota_history_file_actual_ext, $username);

        //check the response in updating the database
        if ($update_branch_monthly_quota_history != '1') {
            $error = $update_branch_monthly_quota_history;
            echo $error;
            return;
        }

        //show the message
        echo 'Updated';
        return;
    }
    
    # -------------------------------------------------------------

    # Insert/update application settings
    else if ($transaction == 'submit application settings') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['settingsid']) && !empty($_POST['settingsid']) && isset($_POST['currency']) && !empty($_POST['currency']) && isset($_POST['timezone']) && !empty($_POST['timezone']) && isset($_POST['dateformat']) && !empty($_POST['dateformat']) && isset($_POST['timeformat'])) {
            $error = '';
            $username = $_POST['username'];
            $settings_id = $_POST['settingsid'];
            $currency = $_POST['currency'];
            $timezone = $_POST['timezone'];
            $dateformat = $_POST['dateformat'];
            $timeformat = $_POST['timeformat'];

            $login_bg_file_name = $_FILES['login_bg']['name'];
            $login_bg_file_size = $_FILES['login_bg']['size'];
            $login_bg_file_error = $_FILES['login_bg']['error'];
            $login_bg_file_tmp_name = $_FILES['login_bg']['tmp_name'];
            $login_bg_file_ext = explode('.', $login_bg_file_name);
            $login_bg_file_actual_ext = strtolower(end($login_bg_file_ext));

            $logo_light_file_name = $_FILES['logo_light']['name'];
            $logo_light_file_size = $_FILES['logo_light']['size'];
            $logo_light_file_error = $_FILES['logo_light']['error'];
            $logo_light_file_tmp_name = $_FILES['logo_light']['tmp_name'];
            $logo_light_file_ext = explode('.', $logo_light_file_name);
            $logo_light_file_actual_ext = strtolower(end($logo_light_file_ext));

            $logo_dark_file_name = $_FILES['logo_dark']['name'];
            $logo_dark_file_size = $_FILES['logo_dark']['size'];
            $logo_dark_file_error = $_FILES['logo_dark']['error'];
            $logo_dark_file_tmp_name = $_FILES['logo_dark']['tmp_name'];
            $logo_dark_file_ext = explode('.', $logo_dark_file_name);
            $logo_dark_file_actual_ext = strtolower(end($logo_dark_file_ext));

            $login_icon_light_file_name = $_FILES['login_icon_light']['name'];
            $login_icon_light_file_size = $_FILES['login_icon_light']['size'];
            $login_icon_light_file_error = $_FILES['login_icon_light']['error'];
            $login_icon_light_file_tmp_name = $_FILES['login_icon_light']['tmp_name'];
            $login_icon_light_file_ext = explode('.', $login_icon_light_file_name);
            $login_icon_light_file_actual_ext = strtolower(end($login_icon_light_file_ext));

            $login_icon_dark_file_name = $_FILES['login_icon_dark']['name'];
            $login_icon_dark_file_size = $_FILES['login_icon_dark']['size'];
            $login_icon_dark_file_error = $_FILES['login_icon_dark']['error'];
            $login_icon_dark_file_tmp_name = $_FILES['login_icon_dark']['tmp_name'];
            $login_icon_dark_file_ext = explode('.', $login_icon_dark_file_name);
            $login_icon_dark_file_actual_ext = strtolower(end($login_icon_dark_file_ext));

            $favicon_image_file_name = $_FILES['favicon_image']['name'];
            $favicon_image_file_size = $_FILES['favicon_image']['size'];
            $favicon_image_file_error = $_FILES['favicon_image']['error'];
            $favicon_image_file_tmp_name = $_FILES['favicon_image']['tmp_name'];
            $favicon_image_file_ext = explode('.', $favicon_image_file_name);
            $favicon_image_file_actual_ext = strtolower(end($favicon_image_file_ext));

            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('application details', $settings_id);

            if ($check_data_exist_one_parameter > 0) {
                if (!empty($login_bg_file_name)) {
                    if (in_array($login_bg_file_actual_ext, $allowed_ext)) {
                        if (!$login_bg_file_error) {
                            if ($login_bg_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($login_bg_file_tmp_name, $login_bg_file_actual_ext, 'login background', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (!empty($logo_light_file_name)) {
                    if (in_array($logo_light_file_actual_ext, $allowed_ext)) {
                        if (!$logo_light_file_error) {
                            if ($logo_light_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($logo_light_file_tmp_name, $logo_light_file_actual_ext, 'logo light', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (!empty($logo_dark_file_name)) {
                    if (in_array($logo_dark_file_actual_ext, $allowed_ext)) {
                        if (!$logo_dark_file_error) {
                            if ($logo_dark_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($logo_dark_file_tmp_name, $logo_dark_file_actual_ext, 'logo dark', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (!empty($login_icon_light_file_name)) {
                    if (in_array($login_icon_light_file_actual_ext, $allowed_ext)) {
                        if (!$login_icon_light_file_error) {
                            if ($login_icon_light_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($login_icon_light_file_tmp_name, $login_icon_light_file_actual_ext, 'logo icon light', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (!empty($login_icon_dark_file_name)) {
                    if (in_array($login_icon_dark_file_actual_ext, $allowed_ext)) {
                        if (!$login_icon_dark_file_error) {
                            if ($login_icon_dark_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($login_icon_dark_file_tmp_name, $login_icon_dark_file_actual_ext, 'logo icon dark', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (!empty($favicon_image_file_name)) {
                    if (in_array($favicon_image_file_actual_ext, $allowed_ext)) {
                        if (!$favicon_image_file_error) {
                            if ($favicon_image_file_size < 2000000) {
                                $update_application_settings_images = $api->update_application_settings_images($favicon_image_file_tmp_name, $favicon_image_file_actual_ext, 'favicon image', $settings_id, $username);

                                if ($update_application_settings_images != '1') {
                                    $error = $update_application_settings_images;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading the image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }

                if (empty($error)) {
                    $update_application_settings = $api->update_application_settings($currency, $timezone, $dateformat, $timeformat, $settings_id, $username);

                    if ($update_application_settings == '1') {
                        echo 'Updated';
                    } else {
                        echo $update_application_settings;
                    }
                } else {
                    echo $error;
                }
            } else {
                $insert_application_settings = $api->insert_application_settings($settings_id, $currency, $timezone, $dateformat, $timeformat, $username);

                if ($insert_application_settings == '1') {
                    if (!empty($login_bg_file_name)) {
                        if (in_array($login_bg_file_actual_ext, $allowed_ext)) {
                            if (!$login_bg_file_error) {
                                if ($login_bg_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($login_bg_file_tmp_name, $login_bg_file_actual_ext, 'login background', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($logo_light_file_name)) {
                        if (in_array($logo_light_file_actual_ext, $allowed_ext)) {
                            if (!$logo_light_file_error) {
                                if ($logo_light_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($logo_light_file_tmp_name, $logo_light_file_actual_ext, 'logo light', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($logo_dark_file_name)) {
                        if (in_array($logo_dark_file_actual_ext, $allowed_ext)) {
                            if (!$logo_dark_file_error) {
                                if ($logo_dark_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($logo_dark_file_tmp_name, $logo_dark_file_actual_ext, 'logo dark', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($login_icon_light_file_name)) {
                        if (in_array($login_icon_light_file_actual_ext, $allowed_ext)) {
                            if (!$login_icon_light_file_error) {
                                if ($login_icon_light_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($login_icon_light_file_tmp_name, $login_icon_light_file_actual_ext, 'logo icon light', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($login_icon_dark_file_name)) {
                        if (in_array($login_icon_dark_file_actual_ext, $allowed_ext)) {
                            if (!$login_icon_dark_file_error) {
                                if ($login_icon_dark_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($login_icon_dark_file_tmp_name, $login_icon_dark_file_actual_ext, 'logo icon dark', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($favicon_image_file_name)) {
                        if (in_array($favicon_image_file_actual_ext, $allowed_ext)) {
                            if (!$favicon_image_file_error) {
                                if ($favicon_image_file_size < 2000000) {
                                    $update_application_settings_images = $api->update_application_settings_images($favicon_image_file_tmp_name, $favicon_image_file_actual_ext, 'favicon image', $settings_id, $username);

                                    if ($update_application_settings_images != '1') {
                                        $error = $update_application_settings_images;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (empty($error)) {
                        echo 'Inserted';
                    } else {
                        echo $error;
                    }
                } else {
                    echo $insert_application_settings;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update employee
    else if ($transaction == 'submit employee') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeid']) && isset($_POST['idnumber']) && !empty($_POST['idnumber']) && isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['middlename']) && isset($_POST['lastname']) && !empty($_POST['lastname']) && isset($_POST['suffix']) && isset($_POST['department']) && !empty($_POST['department']) && isset($_POST['designation']) && !empty($_POST['designation']) && isset($_POST['joindate']) && !empty($_POST['joindate']) && isset($_POST['permanentdate']) && isset($_POST['exitdate']) && isset($_POST['employmenttp']) && !empty($_POST['employmenttp']) && isset($_POST['employmentstatus']) && isset($_POST['branch']) && !empty($_POST['branch']) && isset($_POST['payrollperiod']) && !empty($_POST['payrollperiod']) && isset($_POST['basicpay']) && !empty($_POST['basicpay']) && isset($_POST['dailyrate']) && isset($_POST['hourlyrate']) && isset($_POST['minuterate']) && isset($_POST['birthday']) && !empty($_POST['birthday']) && isset($_POST['superior']) && isset($_POST['subordinate']) && isset($_POST['authorizer']) && isset($_POST['gender']) && !empty($_POST['gender'])  && isset($_POST['civil_status']) && !empty($_POST['civil_status']) && isset($_POST['email']) && !empty($_POST['email']) && isset($_POST['phone']) && isset($_POST['telephone']) && isset($_POST['address']) && !empty($_POST['address']) && isset($_POST['sss']) && isset($_POST['tin']) && isset($_POST['philhealth']) && isset($_POST['pagibig']) && isset($_POST['driverlicense']) && isset($_POST['accountname']) && !empty($_POST['accountname']) && isset($_POST['accountnumber']) && !empty($_POST['accountnumber'])) {
            $error = '';
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $id_number = $_POST['idnumber'];
            $first_name = $_POST['firstname'];
            $middle_name = $_POST['middlename'];
            $last_name = $_POST['lastname'];
            $suffix = $_POST['suffix'];
            $department = $_POST['department'];
            $designation = $_POST['designation'];
            $employment_type = $_POST['employmenttp'];
            $employment_status = $_POST['employmentstatus'];
            $branch = $_POST['branch'];
            $payroll_period = $_POST['payrollperiod'];
            $basic_pay = $api->remove_comma($_POST['basicpay']);
            $daily_rate = $api->remove_comma($_POST['dailyrate']);
            $hourly_rate = $api->remove_comma($_POST['hourlyrate']);
            $minute_rate = $api->remove_comma($_POST['minuterate']);
            $superior = $_POST['superior'];
            $subordinates = $_POST['subordinate'];
            $authorizers = $_POST['authorizer'];
            $gender = $_POST['gender'];
            $civil_status = $_POST['civil_status'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $telephone = $_POST['telephone'];
            $address = $_POST['address'];
            $sss = $_POST['sss'];
            $tin = $_POST['tin'];
            $philhealth = $_POST['philhealth'];
            $pagibig = $_POST['pagibig'];
            $driver_license = $_POST['driverlicense'];
            $account_name = $_POST['accountname'];
            $account_number = $_POST['accountnumber'];
            $join_date = $api->check_date('empty', $_POST['joindate'], '', 'Y-m-d', '', '', '');
            $permanent_date = $api->check_date('empty', $_POST['permanentdate'], '', 'Y-m-d', '', '', '');
            $exit_date = $api->check_date('empty', $_POST['exitdate'], '', 'Y-m-d', '', '', '');
            $birthday = $api->check_date('empty', $_POST['birthday'], '', 'Y-m-d', '', '', '');

            $profile_image_file_name = $_FILES['profile_image']['name'];
            $profile_image_file_size = $_FILES['profile_image']['size'];
            $profile_image_file_error = $_FILES['profile_image']['error'];
            $profile_image_file_tmp_name = $_FILES['profile_image']['tmp_name'];
            $profile_image_file_ext = explode('.', $profile_image_file_name);
            $profile_image_file_actual_ext = strtolower(end($profile_image_file_ext));
            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_employee_profile_exist = $api->check_data_exist_one_parameter('employee profile', $employee_id);

            if ($check_employee_profile_exist > 0) {
                $update_employee = $api->update_employee($id_number, $first_name, $middle_name, $last_name, $suffix, $birthday, $employment_type, $employment_status, $join_date, $permanent_date, $exit_date, $email, $phone, $telephone, $department, $branch, $designation, $gender, $civil_status,  $address, $payroll_period, $basic_pay, $daily_rate, $hourly_rate, $minute_rate, $sss, $tin, $philhealth, $pagibig, $driver_license, $account_name, $account_number, $employee_id, $username);

                if ($update_employee == '1') {
                    if (!empty($profile_image_file_name)) {
                        if (in_array($profile_image_file_actual_ext, $allowed_ext)) {
                            if (!$profile_image_file_error) {
                                if ($profile_image_file_size < 2000000) {
                                    $update_profile_image = $api->update_profile_image($profile_image_file_tmp_name, $profile_image_file_actual_ext, $employee_id, $username);

                                    if ($update_profile_image != '1') {
                                        $error = $update_profile_image;
                                    }
                                } else {
                                    $error = 'File Size';
                                }
                            } else {
                                $error = 'There was an error uploading the image.';
                            }
                        } else {
                            $error = 'File Type';
                        }
                    }

                    if (!empty($superior)) {
                        $delete_employee_superior = $api->delete_employee_superior($employee_id, $username);

                        if ($delete_employee_superior == '1') {
                            $delete_employee_subordinate = $api->delete_employee_subordinate($employee_id, $username);

                            if ($delete_employee_subordinate == '1') {
                                $insert_employee_superior = $api->insert_employee_superior($employee_id, $superior, $username);

                                if ($insert_employee_superior == '1') {
                                    $insert_employee_subordinate = $api->insert_employee_subordinate($superior, $employee_id, $username);

                                    if ($insert_employee_subordinate != '1') {
                                        $error = $insert_employee_subordinate;
                                    }
                                } else {
                                    $error = $insert_employee_superior;
                                }
                            } else {
                                $error = $delete_employee_subordinate;
                            }
                        } else {
                            $error = $delete_employee_superior;
                        }
                    } else {
                        $delete_employee_superior = $api->delete_employee_superior($employee_id, $username);

                        if ($delete_employee_superior == '1') {
                            $delete_employee_subordinate = $api->delete_employee_subordinate($employee_id, $username);

                            if ($delete_employee_subordinate != '1') {
                                $error = $delete_employee_subordinate;
                            }
                        }
                    }

                    if (!empty($subordinates)) {
                        $subordinates = explode(',', $subordinates);

                        $delete_all_employee_subordinate = $api->delete_all_employee_subordinate($employee_id, $username);

                        if ($delete_all_employee_subordinate == '1') {
                            foreach ($subordinates as $subordinate) {
                                $insert_employee_subordinate = $api->insert_employee_subordinate($employee_id, $subordinate, $username);

                                if ($insert_employee_subordinate == '1') {
                                    $delete_employee_superior = $api->delete_employee_superior($subordinate, $username);

                                    if ($delete_employee_superior == '1') {
                                        $insert_employee_superior = $api->insert_employee_superior($subordinate, $employee_id, $username);

                                        if ($insert_employee_superior != '1') {
                                            $error = $insert_employee_superior;
                                        }
                                    } else {
                                        $error = $delete_employee_superior;
                                    }
                                } else {
                                    $error = $insert_employee_subordinate;
                                }
                            }
                        } else {
                            $error = $delete_all_employee_subordinate;
                        }
                    }

                    if (!empty($authorizers)) {
                        $authorizers = explode(',', $authorizers);

                        $delete_all_employee_authorizer = $api->delete_all_employee_authorizer($employee_id, $username);

                        if ($delete_all_employee_authorizer == '1') {
                            foreach ($authorizers as $authorizer) {
                                $insert_employee_authorizer = $api->insert_employee_authorizer($employee_id, $authorizer, $username);

                                if ($insert_employee_authorizer != '1') {
                                    $error = $insert_employee_authorizer;
                                }
                            }
                        } else {
                            $error = $delete_all_employee_authorizer;
                        }
                    }

                    if (empty($error)) {
                        echo 'Updated';
                    } else {
                        echo $error;
                    }
                } else {
                    echo $update_employee;
                }
            } else {
                $check_id_number_exist = $api->check_data_exist_one_parameter('id number', $id_number);

                if ($check_id_number_exist < 1) {
                    if (!empty($profile_image_file_name)) {
                        if (in_array($profile_image_file_actual_ext, $allowed_ext)) {
                            if (!$profile_image_file_error) {
                                if ($profile_image_file_size < 2000000) {
                                    $insert_employee = $api->insert_employee($profile_image_file_tmp_name, $profile_image_file_actual_ext, $id_number, $first_name, $middle_name, $last_name, $suffix, $birthday, $employment_type, $employment_status, $join_date, $permanent_date, $exit_date, $email, $phone, $telephone, $department, $branch, $designation, $gender, $civil_status, $address, $payroll_period, $basic_pay, $daily_rate, $hourly_rate, $minute_rate, $sss, $tin, $philhealth, $pagibig, $driver_license, $account_name, $account_number, $superior, $subordinates, $username);

                                    if ($insert_employee == '1') {
                                        echo 'Inserted';
                                    } else {
                                        echo $insert_employee;
                                    }
                                } else {
                                    echo 'File Size';
                                }
                            } else {
                                echo 'There was an error uploading the image.';
                            }
                        } else {
                            echo 'File Type';
                        }
                    } else {
                        $insert_employee = $api->insert_employee('', '', $id_number, $first_name, $middle_name, $last_name, $suffix, $birthday, $employment_type, $employment_status, $join_date, $permanent_date, $exit_date, $email, $phone, $telephone, $department, $branch, $designation, $gender, $civil_status, $address, $payroll_period, $basic_pay, $daily_rate, $hourly_rate, $minute_rate, $sss, $tin, $philhealth, $pagibig, $driver_license, $account_name, $account_number, $superior, $subordinates, $username);

                        if ($insert_employee == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_employee;
                        }
                    }
                } else {
                    echo 'ID Number';
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update department
    else if ($transaction == 'submit department') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['departmentid']) && isset($_POST['department']) && !empty($_POST['department'])) {
            $username = $_POST['username'];
            $department = $_POST['department'];
            $department_id = $_POST['departmentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('department', $department_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_department = $api->update_department($department, $department_id, $username);

                if ($update_department == '1') {
                    echo 'Updated';
                } else {
                    echo $update_department;
                }
            } else {
                $insert_department = $api->insert_department($department, $username);

                if ($insert_department == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_department;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update designation
    else if ($transaction == 'submit designation') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['designationid']) && isset($_POST['designation']) && !empty($_POST['designation'])) {
            $username = $_POST['username'];
            $designation = $_POST['designation'];
            $designation_id = $_POST['designationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('designation', $designation_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_designation = $api->update_designation($designation, $designation_id, $username);

                if ($update_designation == '1') {
                    echo 'Updated';
                } else {
                    echo $update_designation;
                }
            } else {
                $insert_designation = $api->insert_designation($designation, $username);

                if ($insert_designation == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_designation;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update branch
    else if ($transaction == 'submit branch') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['branchid']) && isset($_POST['branch']) && !empty($_POST['branch']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['telephone']) && isset($_POST['address']) && !empty($_POST['address'])) {
            $username = $_POST['username'];
            $branch_id = $_POST['branchid'];
            $branch = $_POST['branch'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $telephone = $_POST['telephone'];
            $address = $_POST['address'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('branch', $branch_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_branch = $api->update_branch($branch, $email, $phone, $telephone, $address, $branch_id, $username);

                if ($update_branch == '1') {
                    echo 'Updated';
                } else {
                    echo $update_branch;
                }
            } else {
                $insert_branch = $api->insert_branch($branch, $email, $phone, $telephone, $address, $username);

                if ($insert_branch == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_branch;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update holiday
    else if ($transaction == 'submit holiday') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['holidayid']) && isset($_POST['holiday']) && !empty($_POST['holiday']) && isset($_POST['holidaydate']) && !empty($_POST['holidaydate']) && isset($_POST['holidaytype']) && !empty($_POST['holidaytype'])) {
            $username = $_POST['username'];
            $holiday_id = $_POST['holidayid'];
            $holiday = $_POST['holiday'];
            $holiday_date = $api->check_date('empty', $_POST['holidaydate'], '', 'Y-m-d', '', '', '');
            $holiday_type = $_POST['holidaytype'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('holiday', $holiday_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_holiday = $api->update_holiday($holiday, $holiday_date, $holiday_type, $holiday_id, $username);

                if ($update_holiday == '1') {
                    echo 'Updated';
                } else {
                    echo $update_holiday;
                }
            } else {
                $insert_holiday = $api->insert_holiday($holiday, $holiday_date, $holiday_type, $username);

                if ($insert_holiday == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_holiday;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update leave type
    else if ($transaction == 'submit leave type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leavetypeid']) && isset($_POST['leave']) && !empty($_POST['leave']) && isset($_POST['noleaves']) && !empty($_POST['noleaves']) && isset($_POST['paidstatus']) && !empty($_POST['paidstatus'])) {
            $username = $_POST['username'];
            $leave_type_id = $_POST['leavetypeid'];
            $leave = $_POST['leave'];
            $no_leaves = $_POST['noleaves'];
            $paid_status = $_POST['paidstatus'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('leave type', $leave_type_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_leave_type = $api->update_leave_type($leave, $no_leaves, $paid_status, $leave_type_id, $username);

                if ($update_leave_type == '1') {
                    echo 'Updated';
                } else {
                    echo $update_leave_type;
                }
            } else {
                $insert_leave_type = $api->insert_leave_type($leave, $no_leaves, $paid_status, $username);

                if ($insert_leave_type == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_leave_type;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update leave entitlement
    else if ($transaction == 'submit leave entitlement') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['entitlementid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['leavetype']) && !empty($_POST['leavetype']) && isset($_POST['noleaves']) && isset($_POST['startdate']) && !empty($_POST['startdate']) && isset($_POST['enddate']) && !empty($_POST['enddate'])) {
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $entitlement_id = $_POST['entitlementid'];
            $leave_type = $_POST['leavetype'];
            $no_leaves = $_POST['noleaves'];
            $start_date = $api->check_date('empty', $_POST['startdate'], '', 'Y-m-d', '', '', '');
            $end_date = $api->check_date('empty', $_POST['enddate'], '', 'Y-m-d', '', '', '');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('leave entitlement', $entitlement_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_leave_entitlement = $api->update_leave_entitlement($no_leaves, $entitlement_id, $employee_id, $username);

                if ($update_leave_entitlement == '1') {
                    echo 'Updated';
                } else {
                    echo $update_leave_entitlement;
                }
            } else {
                $start_date_overlap = $api->check_leave_entitlement_overlap($start_date, $leave_type, $entitlement_id, $employee_id);
                $end_date_overlap = $api->check_leave_entitlement_overlap($end_date, $leave_type, $entitlement_id, $employee_id);

                if ($start_date_overlap == 0 && $end_date_overlap == 0) {
                    $insert_leave_entitlement = $api->insert_leave_entitlement($employee_id, $leave_type, $no_leaves, $start_date, $end_date, $username);

                    if ($insert_leave_entitlement == '1') {
                        echo 'Inserted';
                    } else {
                        echo $insert_leave_entitlement;
                    }
                } else {
                    echo 'Overlap';
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert employee leave
    else if ($transaction == 'submit employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['employeeleavetype']) && !empty($_POST['employeeleavetype']) && isset($_POST['leavestatus']) && isset($_POST['leaveduration']) && !empty($_POST['leaveduration']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $error = '';
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $leave_type = $_POST['employeeleavetype'];
            $leave_status = $_POST['leavestatus'];
            $leave_duration = $_POST['leaveduration'];
            $leave_dates = explode(',', $_POST['leavedate']);
            $reason = $_POST['reason'];

            if ($leave_status != '2') {
                $decision_date = date('Y-m-d');
                $decision_time = date('h:i:s A');
            } else {
                $decision_date = '';
                $decision_time = '';
            }

            foreach ($leave_dates as $leave_date) {
                $leave_date = $api->check_date('empty', $leave_date, '', 'Y-m-d', '', '', '');
                $leave_day = $api->check_week_day($api->check_date('empty', $leave_date, '', 'w', '', '', ''));
                $office_shift_details = $api->get_data_details_two_parameter('office shift', $employee_id, $leave_day);
                $start_working_hours = $office_shift_details[0]['TIME_IN'];
                $end_working_hours = $office_shift_details[0]['TIME_OUT'];
                $half_day_mark = $office_shift_details[0]['HALF_DAY_MARK'];

                if ($leave_duration == 'CUSTOM') {
                    $start_time = $_POST['starttime'];
                    $end_time = $_POST['endtime'];
                } else if ($leave_duration == 'HLFDAYMOR' || $leave_duration == 'HLFDAYAFT') {
                    if ($leave_duration == 'HLFDAYMOR') {
                        $start_time = $start_working_hours;
                        $end_time = $half_day_mark;
                    } else {
                        $start_time = $half_day_mark;
                        $end_time = $end_working_hours;
                    }
                } else {
                    $start_time = $start_working_hours;
                    $end_time = $end_working_hours;
                }

                $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
                $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

                if ($total_working_hours == $total_leave_hours) {
                    $total_hours = 1;
                } else {
                    $total_hours = ($total_working_hours - $total_leave_hours) / $total_working_hours;
                }

                $get_available_entitlement_count = $api->get_available_entitlement($employee_id, $leave_date, $leave_type);

                if ($get_available_entitlement_count > 0) {
                    $insert_employee_leave = $api->insert_employee_leave($employee_id, $leave_type, $leave_date, $start_time, $end_time, $reason, $leave_status, $decision_date, $decision_time, $username);

                    if ($insert_employee_leave == '1') {
                        $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                        if ($update_leave_entitlement_count != '1') {
                            $error = $update_leave_entitlement_count;
                            break;
                        }
                    } else {
                        $error = $insert_employee_leave;
                        break;
                    }
                } else {
                    $error = 'Leave Entitlement';
                    break;
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert leave application
    else if ($transaction == 'submit leave application') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeleavetype']) && !empty($_POST['employeeleavetype']) && isset($_POST['leaveduration']) && !empty($_POST['leaveduration']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $error = '';
            $username = $_POST['username'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $leave_type = $_POST['employeeleavetype'];
            $leave_duration = $_POST['leaveduration'];
            $leave_dates = explode(',', $_POST['leavedate']);
            $reason = $_POST['reason'];

            $leave_attachement = $_FILES['leave_attachement'] ?? null;
            $upload_location = "assets/images/leave-attachments/";
            $upload_path = null;

            if($leave_attachement['name']!=""){

                $target_file = $upload_location . basename($leave_attachement["name"]);
                $temp = explode(".", $leave_attachement["name"]);
                $newfilename = $api->generateRandomString(7) . '.' . end($temp);
                if (move_uploaded_file($leave_attachement['tmp_name'], $upload_location . $newfilename)) {
                    //$res =  $api->insert_activity_note_attachmment($upload_location . $newfilename,$leave_attachement["name"], $act_id, $username);
                    $upload_path = $upload_location . $newfilename;
                }else{  
                    echo "Upload attachment Error";
                    exit();
    
                }
            }else{
               $leave_attachement = null; 
            }
            
            foreach ($leave_dates as $leave_date) {
                $leave_date = $api->check_date('empty', $leave_date, '', 'Y-m-d', '', '', '');
                $leave_day = $api->check_week_day($api->check_date('empty', $leave_date, '', 'w', '', '', ''));
                $office_shift_details = $api->get_data_details_two_parameter('office shift', $employee_id, $leave_day);
                $start_working_hours = $office_shift_details[0]['TIME_IN'];
                $end_working_hours = $office_shift_details[0]['TIME_OUT'];
                $half_day_mark = $office_shift_details[0]['HALF_DAY_MARK'];

                if ($leave_duration == 'CUSTOM') {
                    $start_time = $_POST['starttime'];
                    $end_time = $_POST['endtime'];
                } else if ($leave_duration == 'HLFDAYMOR' || $leave_duration == 'HLFDAYAFT') {
                    if ($leave_duration == 'HLFDAYMOR') {
                        $start_time = $start_working_hours;
                        $end_time = $half_day_mark;
                    } else {
                        $start_time = $half_day_mark;
                        $end_time = $end_working_hours;
                    }
                } else {
                    $start_time = $start_working_hours;
                    $end_time = $end_working_hours;
                }

                $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
                $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

                if ($total_working_hours == $total_leave_hours) {
                    $total_hours = 1;
                } else {
                    $total_hours = ($total_working_hours - $total_leave_hours) / $total_working_hours;
                }

                if ($leave_type == 'LEAVETP3' || $leave_type == 'LEAVETP8' || $leave_type == 'LEAVETP9') {
                    $insert_employee_leave = $api->insert_employee_leave($employee_id, $leave_type, $leave_date, $start_time, $end_time, $reason, '2', '', '', $username,$upload_path);

                    if ($insert_employee_leave != '1') {
                        $error = $insert_employee_leave;
                        break;
                    }
                } else {
                    $get_available_entitlement_count = $api->get_available_entitlement($employee_id, $leave_date, $leave_type);

                    if ($get_available_entitlement_count > 0) {
                        $insert_employee_leave = $api->insert_employee_leave($employee_id, $leave_type, $leave_date, $start_time, $end_time, $reason, '2', '', '', $username,$upload_path);

                        if ($insert_employee_leave == '1') {
                            $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                            if ($update_leave_entitlement_count != '1') {
                                $error = $update_leave_entitlement_count;
                                break;
                            }
                        } else {
                            $error = $insert_employee_leave;
                            break;
                        }
                    } else {
                        $error = 'Leave Entitlement';
                        break;
                    }
                }
            }

            if (empty($error)) {
                $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Leave Application', '', '', $username);

                if ($insert_system_notification_by_superior == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_system_notification_by_superior;
                }
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert leave application
    else if ($transaction == 'submit employee leave overlap') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeleavetype']) && !empty($_POST['employeeleavetype']) && isset($_POST['leaveduration']) && !empty($_POST['leaveduration']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $error = '';
            $username = $_POST['username'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $leave_type = $_POST['employeeleavetype'];
            $leave_duration = $_POST['leaveduration'];
            $leave_dates = explode(',', $_POST['leavedate']);
            $reason = $_POST['reason'];

            foreach ($leave_dates as $leave_date) {
                $leave_date = $api->check_date('empty', $leave_date, '', 'Y-m-d', '', '', '');
                $leave_day = $api->check_week_day($api->check_date('empty', $leave_date, '', 'w', '', '', ''));
                $office_shift_details = $api->get_data_details_two_parameter('office shift', $employee_id, $leave_day);
                $start_working_hours = $office_shift_details[0]['TIME_IN'];
                $end_working_hours = $office_shift_details[0]['TIME_OUT'];
                $half_day_mark = $office_shift_details[0]['HALF_DAY_MARK'];

                if ($leave_duration == 'CUSTOM') {
                    $start_time = $_POST['starttime'];
                    $end_time = $_POST['endtime'];
                } else if ($leave_duration == 'HLFDAYMOR' || $leave_duration == 'HLFDAYAFT') {
                    if ($leave_duration == 'HLFDAYMOR') {
                        $start_time = $start_working_hours;
                        $end_time = $half_day_mark;
                    } else {
                        $start_time = $half_day_mark;
                        $end_time = $end_working_hours;
                    }
                } else {
                    $start_time = $start_working_hours;
                    $end_time = $end_working_hours;
                }

                $check_leave_overlap_start = $api->check_leave_overlap($leave_date, $start_time);
                $check_leave_overlap_end = $api->check_leave_overlap($leave_date, $end_time);

                if ($check_leave_overlap_start == 0 && $check_leave_overlap_end == 0) {
                    $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
                    $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

                    if ($total_working_hours == $total_leave_hours) {
                        $total_hours = 1;
                    } else {
                        $total_hours = ($total_working_hours - $total_leave_hours) / $total_working_hours;
                    }

                    $get_available_entitlement_count = $api->get_available_entitlement($employee_id, $leave_date, $leave_type);

                    if ($get_available_entitlement_count > 0) {
                        $insert_employee_leave = $api->insert_employee_leave($employee_id, $leave_type, $leave_date, $start_time, $end_time, $reason, '2', '', '', $username);

                        if ($insert_employee_leave == '1') {
                            $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                            if ($update_leave_entitlement_count != '1') {
                                $error = $update_leave_entitlement_count;
                                break;
                            }
                        } else {
                            $error = $insert_employee_leave;
                            break;
                        }
                    } else {
                        $error = 'Leave Entitlement';
                        break;
                    }
                } else {
                    $error = 'Overlap';
                }
            }

            if (empty($error)) {
                $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Leave Application', '', '', $username);

                if ($insert_system_notification_by_superior == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_system_notification_by_superior;
                }
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Update employee leave
    else if ($transaction == 'update employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && !empty($_POST['employeeleavetype']) && isset($_POST['employeeleavetype']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];
            $leave_type = $_POST['employeeleavetype'];
            $leave_date = $api->check_date('empty', $_POST['leavedate'], '', 'Y-m-d', '', '', '');
            $reason = $_POST['reason'];
            $start_time = $_POST['starttime'];
            $end_time = $_POST['endtime'];
            $rejection_reason = $_POST['rejectionreason'];

            $company_details = $api->get_data_details_one_parameter('company', '1');
            $start_working_hours = $company_details[0]['START_WORKING_HOURS'];
            $end_working_hours = $company_details[0]['END_WORKING_HOURS'];

            $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
            $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

            if ($total_working_hours == $total_leave_hours) {
                $total_hours = 1;
            } else {
                $total_hours = ($total_working_hours - $total_leave_hours) / $total_working_hours;
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_employee_leave = $api->update_employee_leave($leave_type, $leave_date, $start_time, $end_time, $reason, $rejection_reason, $leave_id, $employee_id, $username);

                if ($update_employee_leave == '1') {
                    echo 'Updated';
                } else {
                    echo $update_employee_leave;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert employee document
    else if ($transaction == 'submit employee document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['documentname']) && !empty($_POST['documentname']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['documentdate']) && !empty($_POST['documentdate']) && isset($_POST['documentnote']) && !empty($_POST['documentnote'])) {
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $document_name = $_POST['documentname'];
            $document_note = $_POST['documentnote'];
            $category = $_POST['category'];
            $document_date = $api->check_date('empty', $_POST['documentdate'], '', 'Y-m-d', '', '', '');
            $document_file = $_FILES['documentfile'];

            $fileName = $document_file['name'];
            $fileSize = $document_file['size'];
            $fileError = $document_file['error'];
            $fileTmpName = $document_file['tmp_name'];
            $fileExt = explode('.', $fileName);
            $fileActualExt = strtolower(end($fileExt));
            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt');

            if (in_array($fileActualExt, $allowed_ext)) {
                if ($fileError === 0) {
                    if ($fileSize < 100000000) {
                        $insert_employee_document = $api->insert_employee_document($fileTmpName, $fileActualExt, $document_name, $document_note, $employee_id, $document_date, $category, $systemdate, $current_time, $username);

                        if ($insert_employee_document == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_employee_document;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading your image.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert employee document import
    else if ($transaction == 'submit employee document import') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['docemployee']) && !empty($_POST['docemployee']) && isset($_POST['documentname']) && !empty($_POST['documentname']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['documentnote']) && !empty($_POST['documentnote'])) {
            $username = $_POST['username'];
            $error = '';

            $doc_employee = explode(',', $_POST['docemployee']);
            $document_name = explode(',', $_POST['documentname']);
            $category = explode(',', $_POST['category']);
            $document_note = explode(',', $_POST['documentnote']);
            $document_file = $_FILES['documents'];
            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt');

            if (count($document_file['name']) <= 10) {
                for ($i = 0; $i < count($document_file['name']); $i++) {
                    $fileName = $document_file['name'][$i]['documentfile'];
                    $fileSize = $document_file['size'][$i]['documentfile'];
                    $fileError = $document_file['error'][$i]['documentfile'];
                    $fileTmpName = $document_file['tmp_name'][$i]['documentfile'];
                    $fileExt = explode('.', $fileName);
                    $fileActualExt = strtolower(end($fileExt));

                    if (in_array($fileActualExt, $allowed_ext)) {
                        if ($fileError === 0) {
                            if ($fileSize < 100000000) {
                                $insert_employee_document = $api->insert_employee_document($fileTmpName, $fileActualExt, $document_name[$i], $document_note[$i], $doc_employee[$i], $systemdate, $category[$i], $systemdate, $current_time, $username);

                                if ($insert_employee_document != '1') {
                                    $error = $insert_employee_document;
                                }
                            } else {
                                $error = 'File Size';
                            }
                        } else {
                            $error = 'There was an error uploading your image.';
                        }
                    } else {
                        $error = 'File Type';
                    }
                }
            } else {
                $error = 'Limit';
            }

            if (empty($error)) {
                echo 'Imported';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update employee attendance log
    else if ($transaction == 'submit employee attendance log' || $transaction == 'submit attendance log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['attendanceid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['timeindate']) && !empty($_POST['timeindate']) && isset($_POST['timein']) && !empty($_POST['timein']) && isset($_POST['timeoutdate']) && isset($_POST['timeout']) && isset($_POST['remarks']) && isset($_POST['latitude']) && !empty($_POST['latitude']) && isset($_POST['longitude']) && !empty($_POST['longitude'])) {
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $attendance_id = $_POST['attendanceid'];
            $time_in_date = $api->check_date('empty', $_POST['timeindate'], '', 'Y-m-d', '', '', '');
            $time_out_date = $api->check_date('empty', $_POST['timeoutdate'], '', 'Y-m-d', '', '', '');
            $time_in = $api->check_date('empty', $_POST['timein'], '', 'H:i:00', '', '', '');
            $time_out = $api->check_date('empty', $_POST['timeout'], '', 'H:i:00', '', '', '');
            $remarks = $_POST['remarks'];
            $latitude = $_POST['latitude'];
            $longitude = $_POST['longitude'];
            $ip_address = $api->get_ip_address();

            $attachment_file_name = $_FILES['attachment_file']['name'];
            $attachment_file_size = $_FILES['attachment_file']['size'];
            $attachment_file_error = $_FILES['attachment_file']['error'];
            $attachment_file_tmp_name = $_FILES['attachment_file']['tmp_name'];
            $attachment_file_ext = explode('.', $attachment_file_name);
            $attachment_file_actual_ext = strtolower(end($attachment_file_ext));
            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_attendance_log_validation = $api->check_attendance_log_validation($time_in_date, $time_in, $time_out_date, $time_out);

            if (empty($check_attendance_log_validation)) {
                if (!empty($time_in_date) && !empty($time_in)) {
                    $late = $api->get_attendance_late_total($employee_id, $time_in_date, $time_in);
                } else {
                    $late = '';
                }

                if (!empty($time_out_date) && !empty($time_out)) {
                    $early_leaving = $api->get_attendance_early_leaving_total($employee_id, $time_out_date, $time_out);
                    $overtime = $api->get_attendance_overtime_total($employee_id, $time_in_date, $time_out_date, $time_out);
                    $total_hours_worked = $api->get_attendance_total_hours($employee_id, $time_in_date, $time_in, $time_out_date, $time_out);
                } else {
                    $early_leaving = '';
                    $overtime = '';
                    $total_hours_worked = '';
                }

                $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance log', $attendance_id);

                if ($check_data_exist_one_parameter > 0) {
                    $update_employee_attendance_log = $api->update_employee_attendance_log($time_in_date, $time_in, $time_out_date, $time_out, $latitude, $longitude, $ip_address, $late, $early_leaving, $overtime, $total_hours_worked, $remarks, $attendance_id, $employee_id, $username);

                    if ($update_employee_attendance_log == '1') {
                        if (!empty($attachment_file_name)) {
                            if (in_array($attachment_file_actual_ext, $allowed_ext)) {
                                if (!$attachment_file_error) {
                                    if ($attachment_file_size < 2000000) {
                                        $update_attendance_record_attachment = $api->update_attendance_record_attachment($attachment_file_tmp_name, $attachment_file_actual_ext, $attendance_id, $employee_id, $username);

                                        if ($update_attendance_record_attachment == '1') {
                                            echo 'Updated';
                                        } else {
                                            echo $update_attendance_record_attachment;
                                        }
                                    } else {
                                        echo 'File Size';
                                    }
                                } else {
                                    echo 'There was an error uploading the file.';
                                }
                            } else {
                                echo 'File Type';
                            }
                        } else {
                            echo 'Updated';
                        }
                    } else {
                        echo $update_employee_attendance_log;
                    }
                } else {
                    $company_details = $api->get_data_details_one_parameter('company', '1');
                    $get_clock_in_total = $api->get_clock_in_total($employee_id, $time_in_date);
                    $max_clock_in = $company_details[0]['MAX_CLOCK_IN'];

                    if ($get_clock_in_total < $max_clock_in) {
                        if (in_array($attachment_file_actual_ext, $allowed_ext)) {
                            if (!$attachment_file_error) {
                                if ($attachment_file_size < 2000000) {
                                    $insert_employee_attendance_log = $api->insert_employee_attendance_log($attachment_file_tmp_name, $attachment_file_actual_ext, $employee_id, $time_in_date, $time_in, $time_out_date, $time_out, $latitude, $longitude, $ip_address, $late, $early_leaving, $overtime, $total_hours_worked, $remarks, $username);

                                    if ($insert_employee_attendance_log == '1') {
                                        echo 'Inserted';
                                    } else {
                                        echo $insert_employee_attendance_log;
                                    }
                                } else {
                                    echo 'File Size';
                                }
                            } else {
                                echo 'There was an error uploading the file.';
                            }
                        } else {
                            echo 'File Type';
                        }
                    } else {
                        echo 'Max Clock-In';
                    }
                }
            } else {
                echo $check_attendance_log_validation;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update deduction type
    else if ($transaction == 'submit deduction type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['deductiontypeid']) && isset($_POST['deductiontype']) && !empty($_POST['deductiontype']) && isset($_POST['category']) && !empty($_POST['category'])) {
            $username = $_POST['username'];
            $deduction_type_id = $_POST['deductiontypeid'];
            $deduction_type = $_POST['deductiontype'];
            $category = $_POST['category'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('deduction type', $deduction_type_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_deduction_type = $api->update_deduction_type($deduction_type, $category, $deduction_type_id, $username);

                if ($update_deduction_type == '1') {
                    echo 'Updated';
                } else {
                    echo $update_deduction_type;
                }
            } else {
                $insert_deduction_type = $api->insert_deduction_type($deduction_type, $category, $username);

                if ($insert_deduction_type == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_deduction_type;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update deduction amount
    else if ($transaction == 'submit deduction amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid']) && isset($_POST['startrange']) && !empty($_POST['startrange']) && isset($_POST['endrange']) && !empty($_POST['endrange']) && isset($_POST['deductionamount']) && !empty($_POST['deductionamount'])) {
            $username = $_POST['username'];
            $deduction_type_id = $_POST['deductiontypeid'];
            $start_range = $_POST['startrange'];
            $end_range = $_POST['endrange'];
            $deduction_amount = $_POST['deductionamount'];

            $check_data_exist_three_parameter = $api->check_data_exist_three_parameter('deduction amount', $deduction_type_id, $start_range, $end_range);

            if ($check_data_exist_three_parameter > 0) {
                $update_deduction_amount = $api->update_deduction_amount($deduction_amount, $deduction_type_id, $start_range, $end_range, $username);

                if ($update_deduction_amount == '1') {
                    echo 'Updated';
                } else {
                    echo $update_deduction_amount;
                }
            } else {
                $start_range_overlap = $api->check_deduction_amount_overlap($start_range, $deduction_type_id);
                $end_range_overlap = $api->check_deduction_amount_overlap($end_range, $deduction_type_id);

                if ($start_range_overlap == 0 && $end_range_overlap == 0) {
                    $insert_deduction_amount = $api->insert_deduction_amount($deduction_type_id, $start_range, $end_range, $deduction_amount, $username);

                    if ($insert_deduction_amount == '1') {
                        echo 'Inserted';
                    } else {
                        echo $insert_deduction_amount;
                    }
                } else {
                    echo 'Overlap';
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update allowance type
    else if ($transaction == 'submit allowance type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['allowancetypeid']) && isset($_POST['allowancetype']) && !empty($_POST['allowancetype']) && isset($_POST['taxtype']) && !empty($_POST['taxtype'])) {
            $username = $_POST['username'];
            $allowance_type_id = $_POST['allowancetypeid'];
            $allowance_type = $_POST['allowancetype'];
            $tax_type = $_POST['taxtype'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('allowance type', $allowance_type_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_allowance_type = $api->update_allowance_type($allowance_type, $tax_type, $allowance_type_id, $username);

                if ($update_allowance_type == '1') {
                    echo 'Updated';
                } else {
                    echo $update_allowance_type;
                }
            } else {
                $insert_allowance_type = $api->insert_allowance_type($allowance_type, $tax_type, $username);

                if ($insert_allowance_type == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_allowance_type;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update other income type
    else if ($transaction == 'submit other income type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['otherincometypeid']) && isset($_POST['otherincometype']) && !empty($_POST['otherincometype']) && isset($_POST['taxtype']) && !empty($_POST['taxtype'])) {
            $username = $_POST['username'];
            $other_income_type_id = $_POST['otherincometypeid'];
            $other_income_type = $_POST['otherincometype'];
            $tax_type = $_POST['taxtype'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('other income type', $other_income_type_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_other_income_type = $api->update_other_income_type($other_income_type, $tax_type, $other_income_type_id, $username);

                if ($update_other_income_type == '1') {
                    echo 'Updated';
                } else {
                    echo $update_other_income_type;
                }
            } else {
                $insert_other_income_type = $api->insert_other_income_type($other_income_type, $tax_type, $username);

                if ($insert_other_income_type == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_other_income_type;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert payroll specification
    else if ($transaction == 'submit payroll specification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['specemployee']) && isset($_POST['employees']) && !empty($_POST['employees']) && isset($_POST['specificationtype']) && !empty($_POST['specificationtype']) && isset($_POST['specificationcategory']) && !empty($_POST['specificationcategory']) && isset($_POST['specstartdate']) && !empty($_POST['specstartdate']) && isset($_POST['specamount']) && !empty($_POST['specamount']) && isset($_POST['recurrencepattern']) && isset($_POST['recurrencecount'])) {
            $username = $_POST['username'];
            $employees = explode(',', $_POST['employees']);
            $specification_type = $_POST['specificationtype'];
            $specification_category = $_POST['specificationcategory'];
            $start_date =  $api->check_date('empty', $_POST['specstartdate'], '', 'Y-m-d', '', '', '');

            $recurrence_pattern = $_POST['recurrencepattern'];
            $recurrence_count = $_POST['recurrencecount'];
            $error = '';

            if ($specification_type == 'DEDUCTION') {
                $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $specification_category);
                $deducation_category = $deduction_type_details[0]['CATEGORY'];

                if ($deducation_category == 'GOVERNMENT') {
                    $amount = 0;
                } else {
                    $amount = $_POST['specamount'];
                }
            } else {
                $amount = $_POST['specamount'];
            }

            foreach ($employees as $employee) {
                if (!empty($start_date) && !empty($recurrence_pattern) && $recurrence_count > 0) {
                    $payroll_date = $start_date;

                    for ($x = 0; $x < $recurrence_count; $x++) {
                        $payroll_date = $api->check_date('empty', $api->get_next_date($payroll_date, $start_date, $recurrence_pattern), '', 'Y-m-d', '', '', '');

                        $insert_payroll_specification = $api->insert_payroll_specification($employee, $specification_type, '0', $specification_category, $amount, $payroll_date, $username);

                        if ($insert_payroll_specification != '1') {
                            $error =  $insert_payroll_specification;
                        }
                    }
                } else {
                    $insert_payroll_specification = $api->insert_payroll_specification($employee, $specification_type, '0', $specification_category, $amount, $start_date, $username);

                    if ($insert_payroll_specification != '1') {
                        $error =  $insert_payroll_specification;
                    }
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Update payroll specification
    else if ($transaction == 'submit payroll specification update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['specid']) && !empty($_POST['specid']) && isset($_POST['specemployee']) && !empty($_POST['specemployee']) && isset($_POST['specificationtype']) && !empty($_POST['specificationtype']) && isset($_POST['specificationcategory']) && !empty($_POST['specificationcategory']) && isset($_POST['specpayrolldate']) && !empty($_POST['specpayrolldate']) && isset($_POST['specamount']) && !empty($_POST['specamount'])) {
            $username = $_POST['username'];
            $spec_id = $_POST['specid'];
            $employee = $_POST['specemployee'];
            $specification_type = $_POST['specificationtype'];
            $specification_category = $_POST['specificationcategory'];
            $payroll_date = $api->check_date('empty', $_POST['specpayrolldate'], '', 'Y-m-d', '', '', '');

            $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $specification_category);
            $deducation_category = $deduction_type_details[0]['CATEGORY'];

            if ($specification_type == 'DEDUCTION' && $deducation_category == 'GOVERNMENT') {
                $amount = 0;
            } else {
                $amount = $_POST['specamount'];
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll specification', $spec_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_payroll_specification = $api->update_payroll_specification($employee, $specification_type, $specification_category, $amount, $payroll_date, $spec_id, $username);

                if ($update_payroll_specification == '1') {
                    echo 'Updated';
                } else {
                    echo $update_payroll_specification;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert user account
    else if ($transaction == 'submit user account') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employee']) && isset($_POST['usercd']) && !empty($_POST['usercd']) && isset($_POST['password']) && !empty($_POST['password']) && isset($_POST['role']) && isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['middlename']) && isset($_POST['lastname']) && !empty($_POST['lastname']) && isset($_POST['suffix'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];
            $role = $_POST['role'];
            $first_name = $_POST['firstname'];
            $middle_name = $_POST['middlename'];
            $last_name = $_POST['lastname'];
            $suffix = $_POST['suffix'];
            $password = $_POST['password'];
            $password_encrypt = $api->encrypt_data($password);
            $password_expiry_date = $api->format_date('Y-m-d', $systemdate, '+6 months');

            if (empty($_POST['employee'])) {
                $employee_id = 'USER-' . $api->generate_file_name(20);
            } else {
                $employee_id = $_POST['employee'];
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter == 0) {
                $insert_user_account = $api->insert_user_account($employee_id, $user_cd, $password_encrypt, $password_expiry_date, $role, $username);

                if ($insert_user_account == '1') {
                    if (empty($_POST['employee'])) {
                        $insert_user_profile = $api->insert_user_profile($employee_id, $user_cd, $first_name, $middle_name, $last_name, $suffix, $username);

                        if ($insert_user_profile == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_user_profile;
                        }
                    } else {
                        $update_employee_username = $api->update_employee_username($user_cd, $employee_id, $username);

                        if ($update_employee_username == '1') {
                            echo 'Inserted';
                        } else {
                            echo $update_employee_username;
                        }
                    }
                } else {
                    echo $insert_user_account;
                }
            } else {
                echo 'Username';
            }
        }
    }
    # -------------------------------------------------------------

    # Update user account
    else if ($transaction == 'submit user account update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['usercd']) && !empty($_POST['usercd']) && isset($_POST['password']) && isset($_POST['role']) && isset($_POST['firstname']) && !empty($_POST['firstname']) && isset($_POST['middlename']) && isset($_POST['lastname']) && !empty($_POST['lastname']) && isset($_POST['suffix'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];
            $role = $_POST['role'];
            $first_name = $_POST['firstname'];
            $middle_name = $_POST['middlename'];
            $last_name = $_POST['lastname'];
            $suffix = $_POST['suffix'];
            $password = $_POST['password'];
            $password_encrypt = $api->encrypt_data($password);
            $password_expiry_date = $api->format_date('Y-m-d', $systemdate, '+6 months');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter > 0) {
                if (!empty($password)) {
                    $update_user = $api->update_user_account($password_encrypt, $password_expiry_date, $role, $user_cd, $username);
                } else {
                    $update_user = $api->update_user_account('', '', $role, $user_cd, $username);
                }

                if ($update_user == '1') {
                    $update_user_profile_name = $api->update_user_profile_name($first_name, $middle_name, $last_name, $suffix, $user_cd, $username);

                    if ($update_user_profile_name == '1') {
                        echo 'Updated';
                    } else {
                        echo $update_user_profile_name;
                    }
                } else {
                    echo $update_user;
                }
            } else {
                echo 'Not Found';
            }
        } else {
            echo $_POST['suffix'];
        }
    }
    # -------------------------------------------------------------

    # Insert/update regular DTR schedule
    else if ($transaction == 'submit office shift') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employee']) && !empty($_POST['employee']) && isset($_POST['timein']) && !empty($_POST['timein']) && isset($_POST['timeout']) && !empty($_POST['timeout']) && isset($_POST['late']) && !empty($_POST['late']) && isset($_POST['lunchstarttime']) && !empty($_POST['lunchstarttime']) && isset($_POST['lunchendtime']) && !empty($_POST['lunchendtime']) && isset($_POST['halfday']) && !empty($_POST['halfday'])) {
            $username = $_POST['username'];
            $employees = explode(',', $_POST['employee']);
            $dtr_days = explode(',', $_POST['dtrday']);
            $time_in = $_POST['timein'];
            $time_out = $_POST['timeout'];
            $late = $_POST['late'];
            $lunch_start_time = $_POST['lunchstarttime'];
            $lunch_end_time = $_POST['lunchendtime'];
            $half_day = $_POST['halfday'];
            $counter = 1;
            $error = '';

            foreach ($dtr_days as $dtr_day) {
                foreach ($employees as $employee) {
                    if ($dtr_day == '1') {
                        $day_off = '0';
                    } else {
                        $day_off = '1';
                    }

                    $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('office shift', $employee, $counter);

                    if ($check_data_exist_two_parameter > 0) {
                        $update_office_shift = $api->update_office_shift($day_off, $time_in, $time_out, $late, $employee, $counter, $lunch_start_time, $lunch_end_time, $half_day, $username);

                        if ($update_office_shift != '1') {
                            $error = $update_office_shift;
                        }
                    } else {
                        $insert_office_shift = $api->insert_office_shift($employee, $counter, $day_off, $time_in, $time_out, $late, $lunch_start_time, $lunch_end_time, $half_day, $username);

                        if ($insert_office_shift != '1') {
                            $error = $insert_office_shift;
                        }
                    }
                }

                $counter++;
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update regular DTR schedule update
    else if ($transaction == 'submit office shift update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['dtrday']) && !empty($_POST['dtrday']) && isset($_POST['dayoff']) && isset($_POST['timein']) && !empty($_POST['timein']) && isset($_POST['timeout']) && !empty($_POST['timeout']) && isset($_POST['late']) && !empty($_POST['late']) && isset($_POST['lunchstarttime']) && !empty($_POST['lunchstarttime']) && isset($_POST['lunchendtime']) && !empty($_POST['lunchendtime']) && isset($_POST['halfday']) && !empty($_POST['halfday'])) {
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];
            $dtr_day = $_POST['dtrday'];
            $time_in = $_POST['timein'];
            $time_out = $_POST['timeout'];
            $late = $_POST['late'];
            $day_off = $_POST['dayoff'];
            $lunch_start_time = $_POST['lunchstarttime'];
            $lunch_end_time = $_POST['lunchendtime'];
            $half_day = $_POST['halfday'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('office shift', $employee_id, $dtr_day);

            if ($check_data_exist_two_parameter > 0) {
                $update_office_shift = $api->update_office_shift($day_off, $time_in, $time_out, $late, $employee_id, $dtr_day, $lunch_start_time, $lunch_end_time, $half_day, $username);

                if ($update_office_shift == '1') {
                    echo 'Updated';
                } else {
                    echo $update_office_shift;
                }
            } else {
                $insert_office_shift = $api->insert_office_shift($employee_id, $dtr_day, $day_off, $time_in, $time_out, $late, $lunch_start_time, $lunch_end_time, $half_day, $username);

                if ($insert_office_shift == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_office_shift;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update email notification
    else if ($transaction == 'submit email notification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && isset($_POST['notification']) && !empty($_POST['notification'])) {
            $username = $_POST['username'];
            $notification = $_POST['notification'];
            $notification_id = $_POST['notificationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('email notification', $notification_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_email_notification = $api->update_email_notification($notification, $notification_id, $username);

                if ($update_email_notification == '1') {
                    echo 'Updated';
                } else {
                    echo $update_email_notification;
                }
            } else {
                $insert_email_notification = $api->insert_email_notification($notification, $username);

                if ($insert_email_notification == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_email_notification;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Update email configuration
    else if ($transaction == 'submit email configuration') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['mailid']) && !empty($_POST['mailid']) && isset($_POST['mailhost']) && !empty($_POST['mailhost']) && isset($_POST['port']) && !empty($_POST['port']) && isset($_POST['smptauth']) && isset($_POST['smptautotls']) && isset($_POST['mailuser']) && !empty($_POST['mailuser']) && isset($_POST['mailpassword']) && !empty($_POST['mailpassword']) && isset($_POST['mailencryption']) && !empty($_POST['mailencryption']) && isset($_POST['mailfromname']) && !empty($_POST['mailfromname']) && isset($_POST['mailfromemail']) && !empty($_POST['mailfromemail'])) {
            $username = $_POST['username'];
            $mail_id = $_POST['mailid'];
            $mail_host = $_POST['mailhost'];
            $port = $_POST['port'];
            $smpt_auth = $_POST['smptauth'];
            $smpt_auto_tls = $_POST['smptautotls'];
            $mail_user = $_POST['mailuser'];
            $mail_password = $api->encrypt_data($_POST['mailpassword']);
            $mail_encryption = $_POST['mailencryption'];
            $mail_from_name = $_POST['mailfromname'];
            $mail_from_email = $_POST['mailfromemail'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('email configuration', $mail_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_email_configuration = $api->update_email_configuration($mail_host, $port, $smpt_auth, $smpt_auto_tls, $mail_user, $mail_password, $mail_encryption, $mail_from_name, $mail_from_email, $mail_id, $username);

                if ($update_email_configuration == '1') {
                    echo 'Updated';
                } else {
                    echo $update_email_configuration;
                }
            } else {
                $insert_email_configuration = $api->insert_email_configuration($mail_id, $mail_host, $port, $smpt_auth, $smpt_auto_tls, $mail_user, $mail_password, $mail_encryption, $mail_from_name, $mail_from_email, $username);

                if ($insert_email_configuration == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_email_configuration;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update email recipient
    else if ($transaction == 'submit email recipient') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && !empty($_POST['notificationid']) && isset($_POST['recipientid']) && isset($_POST['email']) && !empty($_POST['email'])) {
            $username = $_POST['username'];
            $notification_id = $_POST['notificationid'];
            $recipient_id = $_POST['recipientid'];
            $email = $_POST['email'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('email recipient', $notification_id, $recipient_id);

            if ($check_data_exist_two_parameter > 0) {
                $update_email_recipient = $api->update_email_recipient($email, $notification_id, $recipient_id, $username);

                if ($update_email_recipient == '1') {
                    echo 'Updated';
                } else {
                    echo $update_email_recipient;
                }
            } else {
                $insert_email_recipient = $api->insert_email_recipient($email, $notification_id, $username);

                if ($insert_email_recipient == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_email_recipient;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update payroll group
    else if ($transaction == 'submit payroll group') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollgroupid']) && isset($_POST['payrollgroup']) && !empty($_POST['payrollgroup'])) {
            $username = $_POST['username'];
            $payroll_group = $_POST['payrollgroup'];
            $payroll_group_id = $_POST['payrollgroupid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll group', $payroll_group_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_payroll_group = $api->update_payroll_group($payroll_group, $payroll_group_id, $username);

                if ($update_payroll_group == '1') {
                    echo 'Updated';
                } else {
                    echo $update_payroll_group;
                }
            } else {
                $insert_payroll_group = $api->insert_payroll_group($payroll_group, $username);

                if ($insert_payroll_group == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_payroll_group;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update payroll group employee
    else if ($transaction == 'submit payroll group employee') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollgroupid']) && !empty($_POST['payrollgroupid']) && isset($_POST['employee'])) {
            $username = $_POST['username'];
            $payroll_group_id = $_POST['payrollgroupid'];

            if (!empty($_POST['employee'])) {
                $employees = explode(',', $_POST['employee']);

                $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll group', $payroll_group_id);

                if ($check_data_exist_one_parameter == 1) {
                    foreach ($employees as $employee) {
                        $insert_payroll_group_employee = $api->insert_payroll_group_employee($payroll_group_id, $employee, $username);

                        if ($insert_payroll_group_employee != '1') {
                            echo $insert_payroll_group_employee;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo 'Not Found';
                }
            } else {
                echo 'Employee';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert employee adjustment request
    else if ($transaction == 'submit employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['attendanceid']) && !empty($_POST['attendanceid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['timeindate']) && !empty($_POST['timeindate']) && isset($_POST['timein']) && !empty($_POST['timein']) && isset($_POST['timeoutdate']) && isset($_POST['timeout']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $attendance_id = $_POST['attendanceid'];
            $employee_id = $_POST['employeeid'];
            $time_in = $_POST['timein'];
            $time_out = $_POST['timeout'];
            $reason = $_POST['reason'];
            $time_in_date = $api->check_date('empty', $_POST['timeindate'], '', 'Y-m-d', '', '', '');
            $time_out_date = $api->check_date('empty', $_POST['timeoutdate'], '', 'Y-m-d', '', '', '');

            $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);
            $time_in_org = $employee_attendance_log_details[0]['TIME_IN'];
            $time_out_date_org = $api->check_date('empty', $employee_attendance_log_details[0]['TIME_OUT_DATE'], '', 'Y-m-d', '', '', '');
            $time_out_org = $employee_attendance_log_details[0]['TIME_OUT'];

            $attachment_file_name = $_FILES['attachment_file']['name'];
            $attachment_file_size = $_FILES['attachment_file']['size'];
            $attachment_file_error = $_FILES['attachment_file']['error'];
            $attachment_file_tmp_name = $_FILES['attachment_file']['tmp_name'];
            $attachment_file_ext = explode('.', $attachment_file_name);
            $attachment_file_actual_ext = strtolower(end($attachment_file_ext));
            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_attendance_log_validation = $api->check_attendance_log_validation($time_in_date, $time_in, $time_out_date, $time_out);

            if (empty($check_attendance_log_validation)) {
                if (in_array($attachment_file_actual_ext, $allowed_ext)) {
                    if (!$attachment_file_error) {
                        if ($attachment_file_size < 2000000) {
                            $insert_attendance_adjustment = $api->insert_attendance_adjustment($attachment_file_tmp_name, $attachment_file_actual_ext, $attendance_id, $employee_id, $time_in_date, $time_in_org, $time_in, $time_out_date_org, $time_out_date, $time_out_org, $time_out, $reason, $systemdate, $current_time, $username);

                            if ($insert_attendance_adjustment == '1') {
                                $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Attendance Adjustment', '', '', $username);

                                if ($insert_system_notification_by_superior == '1') {
                                    echo 'Requested';
                                } else {
                                    echo $insert_system_notification_by_superior;
                                }
                            } else {
                                echo $insert_attendance_adjustment;
                            }
                        } else {
                            echo 'File Size';
                        }
                    } else {
                        echo 'There was an error uploading the file.';
                    }
                } else {
                    echo 'File Type';
                }
            } else {
                echo $check_attendance_log_validation;
            }
        }
    }
    # -------------------------------------------------------------

    # Update employee adjustment request
    else if ($transaction == 'submit employee attendance adjustment request update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['timeindate']) && !empty($_POST['timeindate']) && isset($_POST['timein']) && !empty($_POST['timein']) && isset($_POST['timeoutdate']) && isset($_POST['timeout']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $time_in = $_POST['timein'];
            $time_out = $_POST['timeout'];
            $reason = $_POST['reason'];
            $time_in_date = $api->check_date('empty', $_POST['timeindate'], '', 'Y-m-d', '', '', '');
            $time_out_date = $api->check_date('empty', $_POST['timeoutdate'], '', 'Y-m-d', '', '', '');

            $attachment_file_name = $_FILES['attachment_file']['name'];
            $attachment_file_size = $_FILES['attachment_file']['size'];
            $attachment_file_error = $_FILES['attachment_file']['error'];
            $attachment_file_tmp_name = $_FILES['attachment_file']['tmp_name'];
            $attachment_file_ext = explode('.', $attachment_file_name);
            $attachment_file_actual_ext = strtolower(end($attachment_file_ext));
            $allowed_ext = array('jpg', 'png', 'jpeg');

            $check_attendance_log_validation = $api->check_attendance_log_validation($time_in_date, $time_in, $time_out_date, $time_out);

            if (empty($check_attendance_log_validation)) {

                $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

                if ($check_data_exist_one_parameter == 1) {
                    $update_attendance_adjustment = $api->update_attendance_adjustment($time_in, $time_out_date, $time_out, $reason, $adjustment_id, $username);

                    if ($update_attendance_adjustment == '1') {
                        if (!empty($attachment_file_name)) {
                            if (in_array($attachment_file_actual_ext, $allowed_ext)) {
                                if (!$attachment_file_error) {
                                    if ($attachment_file_size < 2000000) {
                                        $update_attendance_adjustment_attachment = $api->update_attendance_adjustment_attachment($attachment_file_tmp_name, $attachment_file_actual_ext, $adjustment_id, $username);

                                        if ($update_attendance_adjustment_attachment == '1') {
                                            echo 'Updated';
                                        } else {
                                            echo $update_attendance_adjustment_attachment;
                                        }
                                    } else {
                                        echo 'File Size';
                                    }
                                } else {
                                    echo 'There was an error uploading the file.';
                                }
                            } else {
                                echo 'File Type';
                            }
                        } else {
                            echo 'Updated';
                        }
                    } else {
                        echo $update_attendance_adjustment;
                    }
                } else {
                    echo 'Not Found';
                }
            } else {
                echo $check_attendance_log_validation;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update telephone log
    else if ($transaction == 'submit telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && isset($_POST['recipient']) && !empty($_POST['recipient']) && isset($_POST['telephone']) && !empty($_POST['telephone']) && isset($_POST['initialcalldate']) && !empty($_POST['initialcalldate']) && isset($_POST['initialcalltime']) && !empty($_POST['initialcalltime']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $recipient = $_POST['recipient'];
            $telephone = $_POST['telephone'];
            $initial_call_date = $api->check_date('empty', $_POST['initialcalldate'], '', 'Y-m-d', '', '', '');
            $initial_call_time = $_POST['initialcalltime'];
            $reason = $_POST['reason'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_telephone_log = $api->update_telephone_log($recipient, $telephone, $initial_call_date, $initial_call_time, $reason, $log_id, $username);

                if ($update_telephone_log == '1') {
                    echo 'Updated';
                } else {
                    echo $update_telephone_log;
                }
            } else {
                $insert_telephone_log = $api->insert_telephone_log($employee_id, $recipient, $telephone, $initial_call_date, $initial_call_time, $reason, $systemdate, $current_time, $username);

                if ($insert_telephone_log == '1') {
                    $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Telephone Log', '', '', $username);

                    if ($insert_system_notification_by_superior == '1') {
                        echo 'Inserted';
                    } else {
                        echo $insert_system_notification_by_superior;
                    }
                } else {
                    echo $insert_telephone_log;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update document management setting
    else if ($transaction == 'submit document management setting') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['settingid']) && !empty($_POST['settingid']) && isset($_POST['maxfilesize']) && !empty($_POST['maxfilesize']) && isset($_POST['authentication']) && !empty($_POST['authentication']) && isset($_POST['filetype']) && !empty($_POST['filetype'])) {
            $error = '';
            $username = $_POST['username'];
            $setting_id = $_POST['settingid'];
            $max_file_size = $api->remove_comma($_POST['maxfilesize']);
            $authentication = $_POST['authentication'];
            $file_types = explode(',', $_POST['filetype']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document management setting', $setting_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_document_setting = $api->update_document_setting($max_file_size, $authentication, $setting_id, $username);

                if ($update_document_setting == '1') {
                    $delete_all_document_file_type = $api->delete_all_document_file_type($setting_id, $username);

                    if ($delete_all_document_file_type == '1') {
                        foreach ($file_types as $file_type) {
                            $insert_document_file_type = $api->insert_document_file_type($file_type, $setting_id, $username);

                            if ($insert_document_file_type != '1') {
                                $error = $insert_document_file_type;
                            }
                        }
                    } else {
                        $error = $delete_all_document_file_type;
                    }

                    if (empty($error)) {
                        echo 'Updated';
                    } else {
                        echo $error;
                    }
                } else {
                    echo $update_document_setting;
                }
            } else {
                $insert_document_setting = $api->insert_document_setting($setting_id, $max_file_size, $authentication, $username);

                if ($insert_document_setting == '1') {
                    foreach ($file_types as $file_type) {
                        $insert_document_file_type = $api->insert_document_file_type($file_type, $setting_id, $username);

                        if ($insert_document_file_type != '1') {
                            $error = $insert_document_file_type;
                        }
                    }

                    if (empty($error)) {
                        echo 'Inserted';
                    } else {
                        echo $error;
                    }
                } else {
                    echo $insert_document_setting;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert document management setting
    else if ($transaction == 'submit document authorizer') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['department']) && !empty($_POST['department']) && isset($_POST['authorizer']) && !empty($_POST['authorizer'])) {
            $error = '';
            $username = $_POST['username'];
            $department = $_POST['department'];
            $authorizers = explode(',', $_POST['authorizer']);

            foreach ($authorizers as $authorizer) {
                $check_data_exist_one_parameter = $api->check_data_exist_two_parameter('document authorizer', $department, $authorizer);

                if ($check_data_exist_one_parameter == 0) {
                    $insert_document_authorizer = $api->insert_document_authorizer($department, $authorizer, $username);

                    if ($insert_document_authorizer != '1') {
                        $error = $insert_document_authorizer;
                    }
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update document
     else if ($transaction == 'submit document') {

        error_log("Entering submit document transaction");
        error_log("Received POST data: " . print_r($_POST, true));
        error_log("Received FILES data: " . print_r($_FILES, true));

        error_log("Description from POST: " . (isset($_POST['description']) ? $_POST['description'] : 'Not set'));

        if (isset($_POST['publish']) && isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentname']) && !empty($_POST['documentname']) &&
            isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['update'])) {

            error_log("All required fields are set");

            $file_type = '';
            $error = '';
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $department = $employee_profile_details[0]['DEPARTMENT'];
            $document_name = $_POST['documentname'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            
            $tags = isset($_POST['tags']) ? $_POST['tags'] : '';

            // Handle publish value: If the checkbox is unchecked, it will be set to 0
            $publish = isset($_POST['publish']) ? $_POST['publish'] : 0;

            $document_management_setting_details = $api->get_data_details_one_parameter('document management setting', '1');
            $document_file_type_details = $api->get_data_details_one_parameter('document file type', '1');
            $max_file_size = $document_management_setting_details[0]['MAX_FILE_SIZE'] * 1048576;
            $authorization = $document_management_setting_details[0]['AUTHORIZATION'];

            for ($i = 0; $i < count($document_file_type_details); $i++) {
                $file_type .= $document_file_type_details[$i]['FILE_TYPE'];

                if ($i != (count($document_file_type_details) - 1)) {
                    $file_type .= ',';
                }
            }

            if ($authorization == '1') {
                $status = 0;
            } else {
                $status = 1;
            }

            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf');


            $document_file_name = $_FILES['document_file']['name'];
            $document_file_size = $_FILES['document_file']['size'];
            $document_file_error = $_FILES['document_file']['error'];
            $document_file_tmp_name = $_FILES['document_file']['tmp_name'];
            $document_file_ext = explode('.', $document_file_name);
            $document_file_actual_ext = strtolower(end($document_file_ext));

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

             if ($check_data_exist_one_parameter > 0) {
                // Update existing document
                // ... (your existing update code)
                $response = ['status' => 'success', 'message' => 'Updated'];
            } else {
                // Insert new document
                if (in_array($document_file_actual_ext, $allowed_ext)) {
                    if (!$document_file_error) {
                        if ($document_file_size < $max_file_size) {
                            $insert_document = $api->insert_document($document_file_tmp_name, $document_file_actual_ext, $document_file_size, $document_name, $category, $description, $department, $status, date('Y-m-d'), date('H:i:s'), $username, $tags);

                            if ($insert_document == '1') {
                                $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Authorizer', 'Document', $department, '', $username);

                                if ($insert_system_notification_by_superior == '1') {
                                    $response = ['status' => 'success', 'message' => 'Inserted'];
                                } else {
                                    $response = ['status' => 'error', 'message' => $insert_system_notification_by_superior];
                                }
                            } else {
                                $response = ['status' => 'error', 'message' => $insert_document];
                            }
                        } else {
                            $response = ['status' => 'error', 'message' => 'File Size'];
                        }
                    } else {
                        $response = ['status' => 'error', 'message' => 'There was an error uploading the file.'];
                    }
                } else {
                    $response = ['status' => 'error', 'message' => 'File Type'];
                }
            }
        } else {
            error_log("Missing required fields:");
            error_log("publish: " . (isset($_POST['publish']) ? $_POST['publish'] : 'Not set'));
            error_log("username: " . (isset($_POST['username']) ? $_POST['username'] : 'Not set'));
            error_log("documentname: " . (isset($_POST['documentname']) ? $_POST['documentname'] : 'Not set'));
            error_log("description: " . (isset($_POST['description']) ? $_POST['description'] : 'Not set'));
            error_log("category: " . (isset($_POST['category']) ? $_POST['category'] : 'Not set'));
            error_log("update: " . (isset($_POST['update']) ? $_POST['update'] : 'Not set'));

            $response = ['status' => 'error', 'message' => 'Missing required fields'];
        }
    }
    
    else if ($transaction == 'submit update document') {
    error_log("Received submit update document request");
    if (isset($_POST['publish']) && isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && isset($_POST['documentname']) && !empty($_POST['documentname']) &&
        isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['update'])) {

        $file_type = '';
        $username = $_POST['username'];
        $document_id = $_POST['documentid'];
        $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
        $department = $employee_profile_details[0]['DEPARTMENT'];
        $document_name = $_POST['documentname'];
        $description = $_POST['description'];
        $category = $_POST['category'];
        $tags = isset($_POST['tags']) ? $_POST['tags'] : '';

        $publish = isset($_POST['publish']) ? $_POST['publish'] : 0;

        $document_management_setting_details = $api->get_data_details_one_parameter('document management setting', '1');
        $document_file_type_details = $api->get_data_details_one_parameter('document file type', '1');
        $max_file_size = $document_management_setting_details[0]['MAX_FILE_SIZE'] * 1048576;
        $authorization = $document_management_setting_details[0]['AUTHORIZATION'];

        for ($i = 0; $i < count($document_file_type_details); $i++) {
            $file_type .= $document_file_type_details[$i]['FILE_TYPE'];
            if ($i != (count($document_file_type_details) - 1)) {
                $file_type .= ',';
            }
        }

        if ($authorization == '1') {
            $status = 0;
        } else {
            $status = 1;
        }
        
         $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf');


        $document_file_name = $_FILES['document_file']['name'];
        $document_file_size = $_FILES['document_file']['size'];
        $document_file_error = $_FILES['document_file']['error'];
        $document_file_tmp_name = $_FILES['document_file']['tmp_name'];
        $document_file_ext = explode('.', $document_file_name);
        $document_file_actual_ext = strtolower(end($document_file_ext));

        $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

        if ($check_data_exist_one_parameter > 0) {
            if (!empty($document_file_name)) {
                if (in_array($document_file_actual_ext, $allowed_ext)) {
                    if (!$document_file_error) {
                        if ($document_file_size < $max_file_size) {
                            $update_document_file = $api->update_document_file($document_file_tmp_name, $document_file_actual_ext, $document_file_size, $document_id, $username);

                            if ($update_document_file == '1') {
                                $update_document = $api->update_document($publish, $document_name, $category, $description, $document_id, $username);

                                if ($update_document == '1') {
                                    $update_tags = $api->update_document_tags($document_id, $tags);
                                    if ($update_tags == '1') {
                                        $response = ['status' => 'success', 'message' => 'Updated'];
                                    } else {
                                        $response = ['status' => 'error', 'message' => $update_tags];
                                    }
                                } else {
                                    $response = ['status' => 'error', 'message' => $update_document];
                                }
                            } else {
                                $response = ['status' => 'error', 'message' => $update_document_file];
                            }
                        } else {
                            $response = ['status' => 'error', 'message' => 'File Size'];
                        }
                    } else {
                        $response = ['status' => 'error', 'message' => 'There was an error uploading the file.'];
                    }
                } else {
                    $response = ['status' => 'error', 'message' => 'File Type'];
                }
            } else {
                $update_document = $api->update_document($publish, $document_name, $category, $description, $document_id, $username);

                if ($update_document == '1') {
                    $update_tags = $api->update_document_tags($document_id, $tags);
                    if ($update_tags == '1') {
                        $response = ['status' => 'success', 'message' => 'Updated'];
                    } else {
                        $response = ['status' => 'error', 'message' => $update_tags];
                    }
                } else {
                    $response = ['status' => 'error', 'message' => 'Document Error ' . $update_document];
                }
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Document not found'];
        }
    } else {
        $response = ['status' => 'error', 'message' => 'Missing required fields'];
    }

    echo json_encode($response);
    exit;
}
    # -------------------------------------------------------------

    # Insert department document permission
    else if ($transaction == 'submit department document permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid']) && isset($_POST['permission'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];
            $permissions = explode(',', $_POST['permission']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_department_document_permission = $api->delete_department_document_permission($document_id, $username);

                if ($delete_department_document_permission == '1') {
                    foreach ($permissions as $permission) {
                        $insert_department_document_permission = $api->insert_department_document_permission($document_id, $permission, $username);

                        if ($insert_department_document_permission != '1') {
                            echo $insert_department_document_permission;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_department_document_permission;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert employee document permission
    else if ($transaction == 'submit employee document permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid']) && isset($_POST['permission'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];
            $permissions = explode(',', $_POST['permission']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_document_permission = $api->delete_employee_document_permission($document_id, $username);

                if ($delete_employee_document_permission == '1') {
                    foreach ($permissions as $permission) {
                        $insert_employee_document_permission = $api->insert_employee_document_permission($document_id, $permission, $username);

                        if ($insert_employee_document_permission != '1') {
                            echo $insert_employee_document_permission;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_employee_document_permission;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert transmittal
    else if ($transaction == 'submit transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['transmittaldepartment']) && !empty($_POST['transmittaldepartment']) && isset($_POST['priorityperson'])) {
            $username = $_POST['username'];
            $description = $_POST['description'];
            $department = $_POST['transmittaldepartment'];
            $priority_person = $_POST['priorityperson'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];
            $department_details = $api->get_data_details_one_parameter('department', $employee_details[0]['DEPARTMENT']);
            $employee_department = $department_details[0]['DEPARTMENT'] ?? null;

            $insert_transmittal = $api->insert_transmittal($description, $department, $priority_person, $systemdate, $current_time, $username);

            if ($insert_transmittal == '1') {
                if (isset($_POST['descriptions']) && count($_POST['descriptions']) > 0) {

                    for ($i = 0; $i < count($_POST['descriptions']); $i++) {
                        if (!empty($_POST['descriptions'][$i]['addon'])) {
                            $insert_transmittal = $api->insert_transmittal($_POST['descriptions'][$i]['addon'], $department, $priority_person, $systemdate, $current_time, $username);

                            if ($insert_transmittal != '1') {
                                echo $insert_transmittal;
                            }
                        }
                    }

                    if (!empty($priority_person)) {
                        $insert_system_notification = $api->insert_system_notification('Transmittal', $employee_id, $priority_person, 'Transmittal', 'You have an incoming priority transmittal from ' . $employee_department . '.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Transmittal', 'Transmittal', $department, '', $username);

                        if ($insert_system_notification_by_superior == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_system_notification_by_superior;
                        }
                    }
                } else {
                    if (!empty($priority_person)) {
                        $insert_system_notification = $api->insert_system_notification('Transmittal', $employee_id, $priority_person, 'Transmittal', 'You have an incoming priority transmittal from ' . $employee_department . '.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Transmittal', 'Transmittal', $department, '', $username);

                        if ($insert_system_notification_by_superior == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_system_notification_by_superior;
                        }
                    }
                }
            } else {
                echo $insert_transmittal;
            }
        }
    }
    # -------------------------------------------------------------

    # Update transmittal
    else if ($transaction == 'submit transmittal update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid']) && isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['transmittaldepartment']) && !empty($_POST['transmittaldepartment']) && isset($_POST['priorityperson'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];
            $description = $_POST['description'];
            $department = $_POST['transmittaldepartment'];
            $priority_person = $_POST['priorityperson'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_details[0]['DEPARTMENT'] ?? null;

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_transmittal = $api->update_transmittal($description, $department, $priority_person, $transmittal_id, $username);

                if ($update_transmittal == '1') {
                    $insert_transmittal_history = $api->insert_transmittal_history($transmittal_id, '5', $employee_id, $employee_department, $priority_person, $department, $systemdate, $current_time, '', $username);

                    if ($insert_transmittal_history == '1') {
                        echo 'Updated';
                    } else {
                        echo $insert_transmittal_history;
                    }
                } else {
                    echo $update_transmittal;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update suggest to win
    else if ($transaction == 'submit suggest to win') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && isset($_POST['title']) && !empty($_POST['title']) && isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['reason']) && !empty($_POST['reason']) && isset($_POST['benefits']) && !empty($_POST['benefits'])) {
            $file_type = '';
            $error = '';
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $title = $_POST['title'];
            $description = $_POST['description'];
            $reason = $_POST['reason'];
            $benefits = $_POST['benefits'];

            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf');

            $stw_attachment_file_name = $_FILES['stw_attachment_file']['name'];
            $stw_attachment_file_size = $_FILES['stw_attachment_file']['size'];
            $stw_attachment_file_error = $_FILES['stw_attachment_file']['error'];
            $stw_attachment_file_tmp_name = $_FILES['stw_attachment_file']['tmp_name'];
            $stw_attachment_file_ext = explode('.', $stw_attachment_file_name);
            $stw_attachment_file_actual_ext = strtolower(end($stw_attachment_file_ext));

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter > 0) {
                if (!empty($stw_attachment_file_name)) {
                    if (in_array($stw_attachment_file_actual_ext, $allowed_ext)) {
                        if (!$stw_attachment_file_error) {
                            if ($stw_attachment_file_size < 2000000) {
                                $update_stw_attachment_file = $api->update_stw_attachment_file($stw_attachment_file_tmp_name, $stw_attachment_file_actual_ext, $stw_id, $username);

                                if ($update_stw_attachment_file == '1') {
                                    $update_suggest_to_win = $api->update_suggest_to_win($title, $description, $reason, $benefits, $stw_id, $username);

                                    if ($update_suggest_to_win == '1') {
                                        echo 'Updated';
                                    } else {
                                        echo $update_suggest_to_win;
                                    }
                                } else {
                                    echo $update_stw_attachment_file;
                                }
                            } else {
                                echo 'File Size';
                            }
                        } else {
                            echo 'There was an error uploading the file.';
                        }
                    } else {
                        echo 'File Type';
                    }
                } else {
                    $update_suggest_to_win = $api->update_suggest_to_win($title, $description, $reason, $benefits, $stw_id, $username);

                    if ($update_suggest_to_win == '1') {
                        echo 'Updated';
                    } else {
                        echo $update_suggest_to_win;
                    }
                }
            } else {
                if (!empty($stw_attachment_file_name)) {
                    if (in_array($stw_attachment_file_actual_ext, $allowed_ext)) {
                        if (!$stw_attachment_file_error) {
                            if ($stw_attachment_file_size < 2000000) {
                                $insert_suggest_to_win = $api->insert_suggest_to_win($stw_attachment_file_tmp_name, $stw_attachment_file_actual_ext, $title, $description, $reason, $benefits, $systemdate, $current_time, $username);

                                if ($insert_suggest_to_win == '1') {
                                    $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Suggest To Win', '', '', $username);

                                    if ($insert_system_notification_by_superior == '1') {
                                        echo 'Inserted';
                                    } else {
                                        echo $insert_system_notification_by_superior;
                                    }
                                } else {
                                    echo $insert_suggest_to_win;
                                }
                            } else {
                                echo 'File Size';
                            }
                        } else {
                            echo 'There was an error uploading the file.';
                        }
                    } else {
                        echo 'File Type';
                    }
                } else {
                    $insert_suggest_to_win = $api->insert_suggest_to_win('', '', $title, $description, $reason, $benefits, $systemdate, $current_time, $username);

                    if ($insert_suggest_to_win == '1') {
                        $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Suggest To Win', '', '', $username);

                        if ($insert_system_notification_by_superior == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_system_notification_by_superior;
                        }
                    } else {
                        echo $insert_suggest_to_win;
                    }
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Update suggest to win vote end date
    else if ($transaction == 'submit suggest to win vote end date') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid']) && isset($_POST['voteenddate']) && !empty($_POST['voteenddate'])) {
            $file_type = '';
            $error = '';
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $vote_end_date = $api->check_date('empty', $_POST['voteenddate'], '', 'Y-m-d', '', '', '');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_suggest_to_win_vote_end_date = $api->update_suggest_to_win_vote_end_date($vote_end_date, $stw_id, $username);

                if ($update_suggest_to_win_vote_end_date == '1') {
                    echo 'Updated';
                } else {
                    echo $update_suggest_to_win_vote_end_date;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update suggest to win vote
    else if ($transaction == 'submit suggest to win vote') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['satisfaction']) && !empty($_POST['satisfaction']) && isset($_POST['quality']) && !empty($_POST['quality']) && isset($_POST['innovation']) && !empty($_POST['innovation']) && isset($_POST['feasibility']) && !empty($_POST['feasibility']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $employee_id = $_POST['employeeid'];
            $satisfaction = $_POST['satisfaction'];
            $quality = $_POST['quality'];
            $innovation = $_POST['innovation'];
            $feasibility = $_POST['feasibility'];
            $remarks = $_POST['remarks'];
            $total = $satisfaction + $quality + $innovation + $feasibility;

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('suggest to win vote', $stw_id, $employee_id);

            if ($check_data_exist_two_parameter > 0) {
                $update_suggest_to_win_vote = $api->update_suggest_to_win_vote($satisfaction, $quality, $innovation, $feasibility, $total, $remarks, $stw_id, $employee_id, $username);

                if ($update_suggest_to_win_vote == '1') {
                    $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win vote summary', $stw_id);

                    if ($check_data_exist_one_parameter > 0) {
                        $update_suggest_to_win_vote_summary = $api->update_suggest_to_win_vote_summary($stw_id, $username);

                        if ($update_suggest_to_win_vote_summary == '1') {
                            echo 'Updated';
                        } else {
                            echo $update_suggest_to_win_vote_summary;
                        }
                    } else {
                        $insert_suggest_to_win_vote_summary = $api->insert_suggest_to_win_vote_summary($stw_id, $username);

                        if ($insert_suggest_to_win_vote_summary == '1') {
                            echo 'Updated';
                        } else {
                            echo $insert_suggest_to_win_vote_summary;
                        }
                    }
                } else {
                    echo $update_suggest_to_win_vote;
                }
            } else {
                $insert_suggest_to_win_vote = $api->insert_suggest_to_win_vote($stw_id, $employee_id, $satisfaction, $quality, $innovation, $feasibility, $total, $remarks, $systemdate, $current_time, $username);

                if ($insert_suggest_to_win_vote == '1') {
                    $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win vote summary', $stw_id);

                    if ($check_data_exist_one_parameter > 0) {
                        $update_suggest_to_win_vote_summary = $api->update_suggest_to_win_vote_summary($stw_id, $username);

                        if ($update_suggest_to_win_vote_summary == '1') {
                            echo 'Inserted';
                        } else {
                            echo $update_suggest_to_win_vote_summary;
                        }
                    } else {
                        $insert_suggest_to_win_vote_summary = $api->insert_suggest_to_win_vote_summary($stw_id, $username);

                        if ($insert_suggest_to_win_vote_summary == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_suggest_to_win_vote_summary;
                        }
                    }
                } else {
                    echo $insert_suggest_to_win_vote;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update training room log
    else if ($transaction == 'submit training room log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && isset($_POST['participants']) && !empty($_POST['participants']) && isset($_POST['otherparticipants']) && isset($_POST['startdate']) && !empty($_POST['startdate']) && isset($_POST['starttime']) && !empty($_POST['starttime']) && isset($_POST['endtime']) && !empty($_POST['endtime']) && isset($_POST['lights']) && isset($_POST['fan']) && isset($_POST['aircon']) && isset($_POST['reason'])) {
            $error = '';
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $other_participants = $_POST['otherparticipants'];
            $start_date = $api->check_date('empty', $_POST['startdate'], '', 'Y-m-d', '', '', '');
            $start_time = $_POST['starttime'];
            $end_time = $_POST['endtime'];
            $lights = $_POST['lights'];
            $fan = $_POST['fan'];
            $aircon = $_POST['aircon'];
            $reason = $_POST['reason'];
            $participants = $_POST['participants'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];

            $check_training_log_start_overlap = $api->check_training_room_log_overlap($start_date, $start_time);
            $check_training_log_end_overlap = $api->check_training_room_log_overlap($start_date, $end_time);
            $check_date_time_validation = $api->check_date_time_validation($start_date, $start_time, $start_date, $end_time);

            if (empty($check_date_time_validation)) {
                if ($check_training_log_start_overlap == 0 && $check_training_log_end_overlap == 0) {
                    $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training room log', $log_id);

                    if ($check_data_exist_one_parameter > 0) {
                        $update_training_room_log = $api->update_training_room_log($start_date, $start_time, $end_time, $other_participants, $lights, $fan, $aircon, $reason, $log_id, $username);

                        if ($update_training_room_log == '1') {
                            $delete_all_training_room_log_participant = $api->delete_all_training_room_log_participant($log_id, $username);

                            if ($delete_all_training_room_log_participant == '1') {

                                $participants = explode(',', $_POST['participants']);

                                foreach ($participants as $participant) {
                                    $insert_training_room_log_participant = $api->insert_training_room_log_participant($log_id, $participant, $username);

                                    if ($insert_training_room_log_participant != '1') {
                                        $error = $insert_training_room_log_participant;
                                    }
                                }
                            } else {
                                $error = $delete_all_training_room_log_participant;
                            }

                            if (empty($error)) {
                                echo 'Updated';
                            } else {
                                echo $error;
                            }
                        } else {
                            echo $update_training_room_log;
                        }
                    } else {
                        $insert_training_room_log = $api->insert_training_room_log($employee_id, $start_date, $start_time, $end_time, $other_participants, $lights, $fan, $aircon, $reason, $systemdate, $current_time, $participants, $username);

                        if ($insert_training_room_log == '1') {
                            $insert_system_notification_by_hr_head = $api->insert_system_notification_by_type('HR Head', 'Training Room Log', '', '', $username);

                            if ($insert_system_notification_by_hr_head == '1') {
                                echo 'Inserted';
                            } else {
                                echo $insert_system_notification_by_hr_head;
                            }
                        } else {
                            echo $insert_training_room_log;
                        }
                    }
                } else {
                    echo 'Overlap';
                }
            } else {
                echo $check_date_time_validation;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update weekly cash flow
    else if ($transaction == 'submit weekly cash flow') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && isset($_POST['startdate']) && !empty($_POST['startdate'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];
            $start_date = $api->check_date('empty', $_POST['startdate'], '', 'Y-m-d', '', '', '');
            $start_day = $api->check_date('empty', $_POST['startdate'], '', 'N', '', '', '');
            $end_date = $api->check_date('empty', $_POST['startdate'], '', 'Y-m-d', '+4 days', '', '');

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];
            $employee_branch = $employee_profile_details[0]['BRANCH'];

            if ($start_day == 1) {
                $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow', $wcf_id);

                if ($check_data_exist_one_parameter > 0) {
                    $update_weekly_cash_flow = $api->update_weekly_cash_flow($start_date, $end_date, $wcf_id, $username);

                    if ($update_weekly_cash_flow == '1') {
                        echo 'Updated';
                    } else {
                        echo $update_weekly_cash_flow;
                    }
                } else {
                    $check_weekly_cash_flow_start_overlap = $api->check_weekly_cash_flow_overlap($employee_department, $employee_branch, $start_date);
                    $check_weekly_cash_flow_end_overlap = $api->check_weekly_cash_flow_overlap($employee_department, $employee_branch, $end_date);

                    if ($check_weekly_cash_flow_start_overlap == 0 && $check_weekly_cash_flow_end_overlap == 0) {
                        $insert_weekly_cash_flow = $api->insert_weekly_cash_flow($employee_id, $employee_department, $employee_branch, $start_date, $end_date, $username);

                        if ($insert_weekly_cash_flow == '1') {
                            echo 'Inserted';
                        } else {
                            echo $insert_weekly_cash_flow;
                        }
                    } else {
                        echo 'Overlap';
                    }
                }
            } else {
                echo 'Monday';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update weekly cash flow particulars
    else if ($transaction == 'submit weekly cash flow particulars') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid']) && isset($_POST['particularid']) && isset($_POST['details']) && !empty($_POST['details']) && isset($_POST['wcftype']) && !empty($_POST['wcftype']) && isset($_POST['wcfloantype']) && isset($_POST['monday']) && isset($_POST['tuesday']) && isset($_POST['wednesday']) && isset($_POST['thursday']) && isset($_POST['friday'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];
            $particular_id = $_POST['particularid'];
            $details = $_POST['details'];
            $wcf_type = $_POST['wcftype'];
            $wcf_loan_type = $_POST['wcfloantype'];
            $monday = $_POST['monday'];
            $tuesday = $_POST['tuesday'];
            $wednesday = $_POST['wednesday'];
            $thursday = $_POST['thursday'];
            $friday = $_POST['friday'];
            $total = $monday + $tuesday + $wednesday + $thursday + $friday;

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow particulars', $particular_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_weekly_cash_flow_particulars = $api->update_weekly_cash_flow_particulars($details, $wcf_type, $wcf_loan_type, $monday, $tuesday, $wednesday, $thursday, $friday, $total, $particular_id, $username);

                if ($update_weekly_cash_flow_particulars == '1') {
                    echo 'Updated';
                } else {
                    echo $update_weekly_cash_flow_particulars;
                }
            } else {
                $insert_weekly_cash_flow_particulars = $api->insert_weekly_cash_flow_particulars($wcf_id, $details, $wcf_type, $wcf_loan_type, $monday, $tuesday, $wednesday, $thursday, $friday, $total, $username);

                if ($insert_weekly_cash_flow_particulars == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_weekly_cash_flow_particulars;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert ticket
    else if ($transaction == 'submit ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketdepartment']) && !empty($_POST['ticketdepartment']) && isset($_POST['priorityperson']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['duedate']) && !empty($_POST['duedate']) && isset($_POST['duetime']) && !empty($_POST['duetime']) && isset($_POST['subject']) && !empty($_POST['subject']) && isset($_POST['description']) && !empty($_POST['description'])) {
            $error = '';
            $username = $_POST['username'];
            $ticket_department = $_POST['ticketdepartment'];
            $priority_person = $_POST['priorityperson'];
            $category = $_POST['category'];
            $subject = $_POST['subject'];
            $description = $_POST['description'];
            $ticket_attachment = $_FILES['ticket_file'];
            $due_time = $_POST['duetime'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');

            # Get system parameter id
            $system_parameter = $api->get_system_parameter('37', 1);
            $paramnum = $system_parameter[0]['PARAMNUM'];
            $id = $system_parameter[0]['ID'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_details[0]['DEPARTMENT'];

            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv', 'rar', 'zip', '7z', 'ppt', 'pptx');

            if (strtotime($due_date) >= strtotime($systemdate)) {
                $insert_ticket = $api->insert_ticket($id, $employee_id, $employee_department, $ticket_department, $priority_person, $category, $subject, $description, $due_date, $due_time, $systemdate, $current_time, $username);

                if ($insert_ticket == '1') {
                    # Update system parameter value
                    $update_system_parameter_value = $api->update_system_parameter_value($paramnum, '37', $username);

                    if ($update_system_parameter_value) {
                        for ($i = 0; $i < count($ticket_attachment['name']); $i++) {
                            $fileName = $ticket_attachment['name'][$i];
                            $fileSize = $ticket_attachment['size'][$i];
                            $fileError = $ticket_attachment['error'][$i];
                            $fileTmpName = $ticket_attachment['tmp_name'][$i];
                            $fileExt = explode('.', $fileName);
                            $fileActualExt = strtolower(end($fileExt));

                            if (in_array($fileActualExt, $allowed_ext)) {
                                if ($fileError === 0) {
                                    if ($fileSize < 100000000) {
                                        $insert_ticket_attachment = $api->insert_ticket_attachment($id, $fileName, $fileTmpName, $fileActualExt, $employee_id, $systemdate, $current_time, $username);

                                        if ($insert_ticket_attachment != '1') {
                                            $error = $insert_ticket_attachment;
                                        }
                                    } else {
                                        $error = 'File Size';
                                    }
                                } else {
                                    $error = 'There was an error uploading your image.';
                                }
                            } else {
                                $error = $fileActualExt;
                            }
                        }

                        if (empty($error)) {
                            $get_ticket_auto_accept_date_time = $api->get_ticket_auto_accept_date_time($employee_id, 0, 4, $id);
                            $auto_accept_date = $get_ticket_auto_accept_date_time[0]['AUTO_ACCEPT_DATE'];
                            $auto_accept_time = $get_ticket_auto_accept_date_time[0]['AUTO_ACCEPT_TIME'];

                            $update_ticket_auto_accept_details = $api->update_ticket_auto_accept_details($id, $auto_accept_date, $auto_accept_time, $username);

                            if ($update_ticket_auto_accept_details == '1') {
                                echo 'Inserted';
                            } else {
                                echo $update_ticket_auto_accept_details;
                            }
                        } else {
                            echo $error;
                        }
                    } else {
                        return $update_system_parameter_value;
                    }
                } else {
                    echo $insert_ticket;
                }
            } else {
                echo 'Due Date';
            }
        }
    }
    # -------------------------------------------------------------

    # Update ticket
    else if ($transaction == 'submit ticket update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['ticketdepartment']) && !empty($_POST['ticketdepartment']) && isset($_POST['priorityperson']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['duedate']) && !empty($_POST['duedate']) && isset($_POST['subject']) && !empty($_POST['subject']) && isset($_POST['description']) && !empty($_POST['description'])) {
            $error = '';
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $ticket_department = $_POST['ticketdepartment'];
            $priority_person = $_POST['priorityperson'];
            $category = $_POST['category'];
            $subject = $_POST['subject'];
            $description = $_POST['description'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_ticket = $api->update_ticket($ticket_department, $priority_person, $category, $subject, $description, $due_date, $ticket_id, $username);

                if ($update_ticket == '1') {
                    echo 'Updated';
                } else {
                    echo $update_ticket;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert ticket note
    else if ($transaction == 'submit ticket note') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['note']) && !empty($_POST['note'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $note = $_POST['note'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter > 0) {
                $insert_ticket_note = $api->insert_ticket_note($ticket_id, $note, $employee_id, $systemdate, $current_time, $username);

                if ($insert_ticket_note == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_ticket_note;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert ticket attachment
    else if ($transaction == 'submit ticket attachment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $error = '';
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $ticket_attachment = $_FILES['ticket_file'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $allowed_ext = array('jpg', 'png', 'jpeg', 'doc', 'docx', 'xls', 'xlsx', 'pdf', 'txt', 'csv', 'rar', 'zip', '7z', 'ppt', 'pptx');

            for ($i = 0; $i < count($ticket_attachment['name']); $i++) {
                $fileName = $ticket_attachment['name'][$i];
                $fileSize = $ticket_attachment['size'][$i];
                $fileError = $ticket_attachment['error'][$i];
                $fileTmpName = $ticket_attachment['tmp_name'][$i];
                $fileExt = explode('.', $fileName);
                $fileActualExt = strtolower(end($fileExt));

                if (in_array($fileActualExt, $allowed_ext)) {
                    if ($fileError === 0) {
                        if ($fileSize < 100000000) {
                            $insert_ticket_attachment = $api->insert_ticket_attachment($ticket_id, $fileName, $fileTmpName, $fileActualExt, $employee_id, $systemdate, $current_time, $username);

                            if ($insert_ticket_attachment != '1') {
                                $error = $insert_ticket_attachment;
                            }
                        } else {
                            $error = 'File Size';
                        }
                    } else {
                        $error = 'There was an error uploading your image.';
                    }
                } else {
                    $error = $fileActualExt;
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert ticket adjustment
    else if ($transaction == 'submit ticket adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['priorityperson']) && !empty($_POST['priorityperson']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['priority']) && !empty($_POST['priority']) && isset($_POST['duedate']) && !empty($_POST['duetime']) && isset($_POST['duetime']) && !empty($_POST['duedate']) && isset($_POST['subject']) && !empty($_POST['subject']) && isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $priority_person = $_POST['priorityperson'];
            $category = $_POST['category'];
            $priority = $_POST['priority'];
            $subject = $_POST['subject'];
            $description = $_POST['description'];
            $reason = $_POST['reason'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');
            $due_time = $_POST['duetime'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter > 0) {
                $insert_ticket_adjustment = $api->insert_ticket_adjustment($ticket_id, $employee_id, $priority_person, $category, $subject, $description, $priority, $due_date, $due_time, $reason, $systemdate, $current_time, $username);

                if ($insert_ticket_adjustment == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_ticket_adjustment;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Update ticket adjustment
    else if ($transaction == 'submit ticket adjustment update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['priorityperson']) && !empty($_POST['priorityperson']) && isset($_POST['category']) && !empty($_POST['category']) && isset($_POST['priority']) && !empty($_POST['priority']) && isset($_POST['duedate']) && !empty($_POST['duetime']) && isset($_POST['duetime']) && !empty($_POST['duedate']) && isset($_POST['subject']) && !empty($_POST['subject']) && isset($_POST['description']) && !empty($_POST['description']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $priority_person = $_POST['priorityperson'];
            $category = $_POST['category'];
            $priority = $_POST['priority'];
            $subject = $_POST['subject'];
            $description = $_POST['description'];
            $reason = $_POST['reason'];
            $due_time = $_POST['duetime'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_ticket_adjustment = $api->update_ticket_adjustment($priority_person, $category, $subject, $description, $priority, $due_date, $due_time, $reason, $adjustment_id, $username);

                if ($update_ticket_adjustment == '1') {
                    echo 'Updated';
                } else {
                    echo $update_ticket_adjustment;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert health declaration
    else if ($transaction == 'submit health declaration') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['temperature']) && !empty($_POST['temperature']) && isset($_POST['sorethroat']) && isset($_POST['bodypain']) && isset($_POST['headache']) && isset($_POST['fever']) && isset($_POST['question2']) && isset($_POST['question3']) && isset($_POST['question4']) && isset($_POST['question5']) && isset($_POST['specific'])) {
            $username = $_POST['username'];
            $temperature = $_POST['temperature'];
            $sore_throat = $_POST['sorethroat'];
            $body_pain = $_POST['bodypain'];
            $headache = $_POST['headache'];
            $fever = $_POST['fever'];
            $question_1 = $sore_throat + $body_pain + $headache + $fever;
            $question_2 = $_POST['question2'];
            $question_3 = $_POST['question3'];
            $question_4 = $_POST['question4'];
            $question_5 = $_POST['question5'];
            $specific = $_POST['specific'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $insert_health_declaration = $api->insert_health_declaration($employee_id, $temperature, $question_1, $question_2, $question_3, $question_4, $question_5, $specific, $systemdate, $current_time, $username);

            if ($insert_health_declaration == '1') {
                $insert_system_notification_by_hr_head = $api->insert_system_notification_by_type('HR Head', 'Health Declaration', '', '', $username);

                if ($insert_system_notification_by_hr_head == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_system_notification_by_hr_head;
                }
            } else {
                echo $insert_health_declaration;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update meeting
    else if ($transaction == 'submit meeting') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && isset($_POST['meetingtitle']) && !empty($_POST['meetingtitle']) && isset($_POST['meetingtype']) && !empty($_POST['meetingtype']) && isset($_POST['meetingdate']) && !empty($_POST['meetingdate']) && isset($_POST['starttime']) && !empty($_POST['starttime']) && isset($_POST['endtime']) && !empty($_POST['endtime']) && isset($_POST['presider']) && !empty($_POST['presider']) && isset($_POST['notedby']) && !empty($_POST['notedby']) && isset($_POST['attendees']) && !empty($_POST['attendees']) && isset($_POST['absentees']) && isset($_POST['previousmeeting'])) {
            $error = '';
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $meeting_title = $_POST['meetingtitle'];
            $meeting_type = $_POST['meetingtype'];
            $meeting_date = $api->check_date('empty', $_POST['meetingdate'], '', 'Y-m-d', '', '', '');
            $start_time = $_POST['starttime'];
            $end_time = $_POST['endtime'];
            $attendees = $_POST['attendees'];
            $absentees = $_POST['absentees'];
            $presider = $_POST['presider'];
            $noted_by = $_POST['notedby'];
            $previous_meeting = $_POST['previousmeeting'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_meeting = $api->update_meeting($meeting_title, $meeting_type, $meeting_date, $start_time, $end_time, $previous_meeting, $presider, $noted_by, $meeting_id, $username);

                if ($update_meeting == '1') {
                    $delete_all_meeting_attendees = $api->delete_all_meeting_attendees($meeting_id, $username);

                    if ($delete_all_meeting_attendees == '1') {
                        $attendees = explode(',', $_POST['attendees']);

                        foreach ($attendees as $attendee) {
                            $insert_meeting_attendees = $api->insert_meeting_attendees($meeting_id, $attendee, $username);

                            if ($insert_meeting_attendees != '1') {
                                $error = $insert_meeting_attendees;
                            }
                        }
                    } else {
                        $error = $delete_all_meeting_attendees;
                    }

                    $delete_all_meeting_absentees = $api->delete_all_meeting_absentees($meeting_id, $username);

                    if ($delete_all_meeting_absentees == '1') {
                        if (!empty($absentees)) {
                            $absentees = explode(',', $_POST['absentees']);

                            foreach ($absentees as $absentee) {
                                $insert_meeting_absentees = $api->insert_meeting_absentees($meeting_id, $absentee, $username);

                                if ($insert_meeting_absentees != '1') {
                                    $error = $insert_meeting_absentees;
                                }
                            }
                        }
                    } else {
                        $error = $delete_all_meeting_absentees;
                    }

                    if (empty($error)) {
                        echo 'Updated';
                    } else {
                        echo $error;
                    }
                } else {
                    echo $update_meeting;
                }
            } else {
                $insert_meeting = $api->insert_meeting($employee_id, $employee_department, $meeting_title, $meeting_type, $meeting_date, $start_time, $end_time, $attendees, $absentees, $previous_meeting, $presider, $noted_by, $username);

                if ($insert_meeting == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_meeting;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert meeting permission
    else if ($transaction == 'submit meeting permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['permission'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $permissions = explode(',', $_POST['permission']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_all_meeting_permission = $api->delete_all_meeting_permission($meeting_id, $username);

                if ($delete_all_meeting_permission == '1') {
                    if (!empty($_POST['permission'])) {
                        foreach ($permissions as $permission) {
                            $insert_meeting_permission = $api->insert_meeting_permission($meeting_id, $permission, $username);

                            if ($insert_meeting_permission != '1') {
                                echo $insert_meeting_permission;
                            }
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_all_meeting_permission;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert meeting note
    else if ($transaction == 'submit meeting note') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['note']) && !empty($_POST['note'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $note = $_POST['note'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter > 0) {
                $insert_meeting_note = $api->insert_meeting_note($meeting_id, $note, $employee_id, $systemdate, $current_time, $username);

                if ($insert_meeting_note == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_meeting_note;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert meeting task
    else if ($transaction == 'submit meeting task') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['agenda']) && !empty($_POST['agenda']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['task']) && !empty($_POST['task']) && isset($_POST['meetingemployee']) && !empty($_POST['meetingemployee']) && isset($_POST['taskstatus']) && isset($_POST['duedatetype']) && !empty($_POST['duedatetype']) && isset($_POST['duedate'])) {
            $username = $_POST['username'];
            $agenda = $_POST['agenda'];
            $meeting_id = $_POST['meetingid'];
            $task = $_POST['task'];
            #$meeting_employees = explode(',', $_POST['meetingemployee']); use for multiple Entry
            $meeting_employee  = $_POST['meetingemployee'];
            #$meeting_employees = explode(',', $_POST['meetingemployee']);
            $task_status = $_POST['taskstatus'];
            $due_date_type = $_POST['duedatetype'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');


                        
            #user for multiple entry
            // foreach ($meeting_employees as $meeting_employee) {
            //     $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $meeting_employee);
            //     $meeting_department = $employee_profile_details[0]['DEPARTMENT'];

            //     $insert_meeting_task = $api->insert_meeting_task($agenda, $meeting_id, '', $task, $meeting_employee, $meeting_department, $task_status, $due_date_type, $due_date, $username);

            //     if ($insert_meeting_task != '1') {
            //         $error = $insert_meeting_task;
            //     }
            // }
            $employee_dept = [];
            $employee_ids = [];

            foreach (explode(',', $_POST['meetingemployee']) as  $employee_id) {
                $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $employee_id);
                $meeting_department = $employee_profile_details[0]['DEPARTMENT'];           
                array_push($employee_dept,$meeting_department);
                array_push($employee_ids,$employee_id);
            
            }

            // echo gettype(json_encode($employee_ids));
            // exit();
            // $employee_profile_details = $api->get_data_details_one_parameter('employee profile', explode(',', $meeting_employee)[0]);
            // $meeting_department = $employee_profile_details[0]['DEPARTMENT'];

                $insert_meeting_task = $api->insert_meeting_task($agenda, $meeting_id, '', $task,json_encode($employee_ids),json_encode($employee_dept), $task_status, $due_date_type, $due_date, $username);

                if ($insert_meeting_task != '1') {
                    $error = $insert_meeting_task;
                }
                if (empty($error)) {
                    echo 'Inserted';
                } else {
                    echo $error;
                }
        }
    }
    # -------------------------------------------------------------

    # Update meeting task
    else if ($transaction == 'submit meeting task update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['taskid']) && isset($_POST['agenda']) && !empty($_POST['agenda']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['task']) && !empty($_POST['task']) && isset($_POST['meetingemployee']) && !empty($_POST['meetingemployee']) && isset($_POST['taskstatus']) && isset($_POST['duedatetype']) && !empty($_POST['duedatetype']) && isset($_POST['duedate'])) {
            $username = $_POST['username'];
            $task_id = $_POST['taskid'];
            $agenda = $_POST['agenda'];
            $meeting_id = $_POST['meetingid'];
            $task = $_POST['task'];
            $meeting_employee = $_POST['meetingemployee'];
           // $meeting_department = $_POST['meetingdepartment'];
            $task_status = $_POST['taskstatus'];
            $due_date_type = $_POST['duedatetype'];
            $due_date = $api->check_date('empty', $_POST['duedate'], '', 'Y-m-d', '', '', '');

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting task', $task_id);
             
            if ($check_data_exist_one_parameter > 0) {
                $meeting_task_details = $api->get_data_details_one_parameter('meeting task', $task_id);
                $previous_meeting = $meeting_task_details[0]['PREVIOUS_MEETING'];
                $meeting_due_date = $meeting_task_details[0]['DUE_DATE'];

                if (!empty($previous_meeting) && !empty($due_date) && $agenda != 'PREVIOUSUPDATES') {
                    if (strtotime($meeting_due_date) != strtotime($due_date)) {
                        $new_due_date = $due_date;
                    } else {
                        $new_due_date = null;
                    }

                    $update_meeting_task = $api->update_meeting_task($agenda, $task, $meeting_employee, $meeting_department=null, $task_status, $due_date_type, $meeting_due_date, $new_due_date, $task_id, $username);
                } else {
                    $update_meeting_task = $api->update_meeting_task($agenda, $task, $meeting_employee, $meeting_department=null, $task_status, $due_date_type, $due_date, null, $task_id, $username);
                }

                if ($update_meeting_task == '1') {
                    echo 'Updated';
                } else {
                    echo $update_meeting_task;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert meeting memo
    else if ($transaction == 'submit meeting memo') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['memo']) && !empty($_POST['memo'])) {
            $error = '';
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $memos = explode(',', $_POST['memo']);

            foreach ($memos as $memo) {
                $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('meeting memo', $meeting_id, $memo);

                if ($check_data_exist_two_parameter == 0) {
                    $insert_meeting_memo = $api->insert_meeting_memo($memo, $meeting_id, $username);

                    if ($insert_meeting_memo != '1') {
                        $error = $insert_meeting_memo;
                    }
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert previous discussion
    else if ($transaction == 'submit previous discussion') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid']) && isset($_POST['taskid']) && !empty($_POST['taskid']) && isset($_POST['meetingagenda']) && !empty($_POST['meetingagenda']) && isset($_POST['previousmeeting']) && !empty($_POST['previousmeeting'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $task_id = $_POST['taskid'];
            $meeting_agenda = $_POST['meetingagenda'];
            $previous_meeting = $_POST['previousmeeting'];

            $meeting_task_details = $api->get_data_details_one_parameter('meeting task', $task_id);
            $task = $meeting_task_details[0]['TASK'];
            $employee = $meeting_task_details[0]['EMPLOYEE_ID'];
            $department = $meeting_task_details[0]['DEPARTMENT'];
            $task_status = $meeting_task_details[0]['STATUS'];
            $due_date_type = $meeting_task_details[0]['DUE_DATE_TYPE'];
            $new_due_date = $api->check_date('empty', $meeting_task_details[0]['NEW_DUE_DATE'], '', 'Y-m-d', '', '', '');
            $due_date = $api->check_date('empty', $meeting_task_details[0]['DUE_DATE'], '', 'Y-m-d', '', '', '');

            if (!empty($new_due_date)) {
                $due_date = $new_due_date;
            }

            $insert_meeting_task = $api->insert_meeting_task($meeting_agenda, $meeting_id, $previous_meeting, $task, $employee, $department, $task_status, $due_date_type, $due_date, $username);

            if ($insert_meeting_task == '1') {
                echo 'Inserted';
            } else {
                echo $insert_meeting_task;
            }
        }
    }
    # -------------------------------------------------------------

    # Insert meeting other matters
    else if ($transaction == 'submit meeting other matters') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $error = '';
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];

            if (count($_POST['descriptions']) > 0) {
                for ($i = 0; $i < count($_POST['descriptions']); $i++) {
                    $insert_meeting_other_matters = $api->insert_meeting_other_matters($_POST['descriptions'][$i]['othermatters'], $meeting_id, $username);

                    if ($insert_meeting_other_matters != '1') {
                        $error = $insert_meeting_other_matters;
                    }
                }
            }

            if (empty($error)) {
                echo 'Inserted';
            } else {
                echo $error;
            }
        }
    }
    # -------------------------------------------------------------

    # Update meeting other matters update
    else if ($transaction == 'submit meeting other matters update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['othermattersid']) && !empty($_POST['othermattersid']) && isset($_POST['othermatters']) && !empty($_POST['othermatters'])) {
            $username = $_POST['username'];
            $other_matters_id = $_POST['othermattersid'];
            $other_matters = $_POST['othermatters'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting other matters', $other_matters_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_meeting_other_matters = $api->update_meeting_other_matters($other_matters, $other_matters_id, $username);

                if ($update_meeting_other_matters == '1') {
                    echo 'Updated';
                } else {
                    echo $update_meeting_other_matters;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update training
    else if ($transaction == 'submit training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && isset($_POST['trainingtitle']) && !empty($_POST['trainingtitle']) && isset($_POST['trainingtype']) && !empty($_POST['trainingtype']) && isset($_POST['trainingdate']) && !empty($_POST['trainingdate']) && isset($_POST['starttime']) && !empty($_POST['starttime']) && isset($_POST['endtime']) && !empty($_POST['endtime']) && isset($_POST['description']) && !empty($_POST['description'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $training_title = $_POST['trainingtitle'];
            $training_type = $_POST['trainingtype'];
            $training_date = $api->check_date('empty', $_POST['trainingdate'], '', 'Y-m-d', '', '', '');
            $start_time = $_POST['starttime'];
            $end_time = $_POST['endtime'];
            $description = $_POST['description'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_training = $api->update_training($training_title, $description, $training_type, $training_date, $start_time, $end_time, $training_id, $username);

                if ($update_training == '1') {
                    echo 'Updated';
                } else {
                    echo $update_training;
                }
            } else {
                $insert_training = $api->insert_training($employee_id, $training_title, $description, $training_type, $training_date, $start_time, $end_time, $username);

                if ($insert_training == '1') {
                    $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Trainings & Seminars', '', '', $username);

                    if ($insert_system_notification_by_superior == '1') {
                        echo 'Inserted';
                    } else {
                        echo $insert_system_notification_by_superior;
                    }
                } else {
                    echo $insert_training;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update training attendees
    else if ($transaction == 'submit training attendees') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['user'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $users = explode(',', $_POST['user']);

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_training_attendees = $api->delete_training_attendees($training_id, $username);

                if ($delete_training_attendees == '1') {
                    foreach ($users as $user) {
                        $insert_training_attendees = $api->insert_training_attendees($training_id, $user, $username);

                        if ($insert_training_attendees != '1') {
                            echo $insert_training_attendees;
                        }
                    }

                    echo 'Assigned';
                } else {
                    echo $delete_training_attendees;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update training report
    else if ($transaction == 'submit training report') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['learnings']) && !empty($_POST['learnings']) && isset($_POST['comments']) && !empty($_POST['comments'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $learnings = $_POST['learnings'];
            $comments = $_POST['comments'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('training report', $training_id, $employee_id);

            if ($check_data_exist_two_parameter > 0) {
                $update_training_report = $api->update_training_report($learnings, $comments, $training_id, $employee_id, $username);

                if ($update_training_report == '1') {
                    echo 'Updated';
                } else {
                    echo $update_training_report;
                }
            } else {
                $insert_training_report = $api->insert_training_report($training_id, $employee_id, $learnings, $comments, $username);

                if ($insert_training_report == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_training_report;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update department
    else if ($transaction == 'submit car search parameter') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['parameterid']) && isset($_POST['parameter_code']) && !empty($_POST['parameter_code']) && isset($_POST['parameter_value']) && !empty($_POST['parameter_value']) && isset($_POST['category_type']) && !empty($_POST['category_type'])) {
            $username = $_POST['username'];
            $parameter_code = $_POST['parameter_code'];
            $parameter_value = $_POST['parameter_value'];
            $category_type = $_POST['category_type'];
            $parameter_id = $_POST['parameterid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('car search parameter', $parameter_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_car_search_parameter = $api->update_car_search_parameter($parameter_value, $category_type, $parameter_id, $username);

                if ($update_car_search_parameter == '1') {
                    echo 'Updated';
                } else {
                    echo $update_car_search_parameter;
                }
            } else {
                $insert_car_search_parameter = $api->insert_car_search_parameter($parameter_code, $parameter_value, $category_type, $username);

                if ($insert_car_search_parameter == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_car_search_parameter;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update price index item
    else if ($transaction == 'submit price index item') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['itemid']) && isset($_POST['brand']) && !empty($_POST['brand']) && isset($_POST['model']) && !empty($_POST['model']) && isset($_POST['variant']) && isset($_POST['engine_size']) && isset($_POST['gas_type']) && isset($_POST['transmission']) && isset($_POST['drive_train']) && isset($_POST['body_type']) && isset($_POST['seating_capacity']) && isset($_POST['camshaft_profile']) && isset($_POST['color_type']) && isset($_POST['aircon_type']) && isset($_POST['other_information'])) {
            $username = $_POST['username'];
            $item_id = $_POST['itemid'];
            $brand = $_POST['brand'];
            $model = $_POST['model'];
            $variant = $_POST['variant'];
            $engine_size = $_POST['engine_size'];
            $gas_type = $_POST['gas_type'];
            $transmission = $_POST['transmission'];
            $drive_train = $_POST['drive_train'];
            $body_type = $_POST['body_type'];
            $seating_capacity = $_POST['seating_capacity'];
            $camshaft_profile = $_POST['camshaft_profile'];
            $color_type = $_POST['color_type'];
            $aircon_type = $_POST['aircon_type'];
            $other_information = $_POST['other_information'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index item', $item_id);

            if ($check_data_exist_one_parameter > 0) {
                $update_price_index_item = $api->update_price_index_item($brand, $model, $variant, $engine_size, $gas_type, $transmission, $drive_train, $body_type, $seating_capacity, $camshaft_profile, $color_type, $aircon_type, $other_information, $item_id, $username);

                if ($update_price_index_item == '1') {
                    echo 'Updated';
                } else {
                    echo $update_price_index_item;
                }
            } else {
                $insert_price_index_item = $api->insert_price_index_item($brand, $model, $variant, $engine_size, $gas_type, $transmission, $drive_train, $body_type, $seating_capacity, $camshaft_profile, $color_type, $aircon_type, $other_information, $username);

                if ($insert_price_index_item == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_price_index_item;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update price index amount
    else if ($transaction == 'submit price index amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['price_index_item']) && !empty($_POST['price_index_item']) && isset($_POST['year']) && !empty($_POST['year']) && isset($_POST['amount']) && !empty($_POST['amount'])) {
            $username = $_POST['username'];
            $price_index_item = $_POST['price_index_item'];
            $year = $_POST['year'];
            $amount = $_POST['amount'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('price index item amount', $price_index_item, $year);

            if ($check_data_exist_two_parameter > 0) {
                echo 'Existed';
            } else {
                $insert_price_index_amount = $api->insert_price_index_amount($price_index_item, $year, $amount, $systemdate, $current_time, $username);

                if ($insert_price_index_amount == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_price_index_amount;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update price index amount
    else if ($transaction == 'submit price index amount update') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['itemid']) && !empty($_POST['itemid']) && isset($_POST['year']) && !empty($_POST['year']) && isset($_POST['amount']) && !empty($_POST['amount'])) {
            $username = $_POST['username'];
            $item_id = $_POST['itemid'];
            $year = $_POST['year'];
            $amount = $_POST['amount'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('price index item amount', $item_id, $year);

            if ($check_data_exist_two_parameter > 0) {
                $update_price_index_amount = $api->update_price_index_amount($item_id, $year, $amount, $systemdate, $current_time, $username);

                if ($update_price_index_amount == '1') {
                    echo 'Updated';
                } else {
                    echo $update_price_index_amount;
                }
            } else {
                $insert_price_index_amount = $api->insert_price_index_amount($item_id, $year, $amount, $systemdate, $current_time, $username);

                if ($insert_price_index_amount == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_price_index_amount;
                }
            }
        }
    }
    # -------------------------------------------------------------

    # Insert/update price index amount adjustment
    else if ($transaction == 'submit price index amount adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['itemid']) && !empty($_POST['itemid']) && isset($_POST['year']) && !empty($_POST['year']) && isset($_POST['amount']) && !empty($_POST['amount'])) {
            $username = $_POST['username'];
            $item_id = $_POST['itemid'];
            $year = $_POST['year'];
            $amount = $_POST['amount'];
            $price_index_item_details = $api->get_data_details_two_parameter('price index amount', $item_id, $year);
            $initial_value = $price_index_item_details[0]['ITEM_VALUE'];

            if ($amount != $initial_value) {
                $insert_price_index_amount_adjustment = $api->insert_price_index_amount_adjustment($item_id, $year, $initial_value, $amount, $systemdate, $current_time, $username);

                if ($insert_price_index_amount_adjustment == '1') {
                    echo 'Inserted';
                } else {
                    echo $insert_price_index_amount_adjustment;
                }
            } else {
                echo 'No Change';
            }
        }
    }
    # -------------------------------------------------------------

    # -------------------------------------------------------------
    #   Delete functions
    # -------------------------------------------------------------

    # Delete page
    else if ($transaction == 'delete page') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['pageid']) && !empty($_POST['pageid'])) {
            $username = $_POST['username'];
            $page_id = $_POST['pageid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('page', $page_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_page = $api->delete_page($page_id, $username);

                if ($delete_page == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_page;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete permission
    else if ($transaction == 'delete permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['permissionid']) && !empty($_POST['permissionid'])) {
            $username = $_POST['username'];
            $permission_id = $_POST['permissionid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('permission', $permission_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_permission = $api->delete_permission($permission_id, $username);

                if ($delete_permission == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_permission;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete system parameter
    else if ($transaction == 'delete system parameter') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['parameterid']) && !empty($_POST['parameterid'])) {
            $username = $_POST['username'];
            $parameter_id = $_POST['parameterid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('system parameter', $parameter_id);

            if ($check_data_exist_one_parameter > 0) {
                $delete_system_parameter = $api->delete_system_parameter($parameter_id, $username);

                if ($delete_system_parameter == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_system_parameter;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete system code
    else if ($transaction == 'delete system code') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['systemtype']) && !empty($_POST['systemtype']) && isset($_POST['systemcode']) && !empty($_POST['systemcode'])) {
            $username = $_POST['username'];
            $system_type = $_POST['systemtype'];
            $system_code = $_POST['systemcode'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('system code', $system_type, $system_code);

            if ($check_data_exist_two_parameter > 0) {
                $delete_system_code = $api->delete_system_code($system_type, $system_code, $username);

                if ($delete_system_code == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_system_code;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete role
    else if ($transaction == 'delete role') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $username = $_POST['username'];
            $role_id = $_POST['roleid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_role = $api->delete_role($role_id, $username);

                if ($delete_role == '1') {
                    $delete_permission_role = $api->delete_permission_role($role_id, $username);

                    if ($delete_permission_role == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_permission_role;
                    }
                } else {
                    echo $delete_role;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete employee
    else if ($transaction == 'delete employee') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $username = $_POST['username'];
            $employee_id = $_POST['employeeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee profile', $employee_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_profile = $api->delete_employee_profile($employee_id, $username);

                if ($delete_employee_profile == '1') {
                    $delete_user_account = $api->delete_user_account($employee_id, $username);

                    if ($delete_user_account == '1') {
                        $delete_employee_superior = $api->delete_employee_superior($employee_id, $username);

                        if ($delete_employee_superior == '1') {
                            $delete_all_employee_subordinate = $api->delete_all_employee_subordinate($employee_id, $username);

                            if ($delete_all_employee_subordinate == '1') {
                                $delete_employee_office_shift = $api->delete_employee_office_shift($employee_id, $username);

                                if ($delete_employee_office_shift == '1') {
                                    echo 'Deleted';
                                } else {
                                    echo $delete_all_employee_subordinate;
                                }
                            } else {
                                echo $delete_all_employee_subordinate;
                            }
                        } else {
                            echo $delete_employee_superior;
                        }
                    } else {
                        echo $delete_user_account;
                    }
                } else {
                    echo $delete_employee_profile;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete department
    else if ($transaction == 'delete department') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['departmentid']) && !empty($_POST['departmentid'])) {
            $username = $_POST['username'];
            $department_id = $_POST['departmentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('department', $department_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_department = $api->delete_department($department_id, $username);

                if ($delete_department == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_department;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete designation
    else if ($transaction == 'delete designation') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['designationid']) && !empty($_POST['designationid'])) {
            $username = $_POST['username'];
            $designation_id = $_POST['designationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('designation', $designation_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_designation = $api->delete_designation($designation_id, $username);

                if ($delete_designation == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_designation;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete branch
    else if ($transaction == 'delete branch') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['branchid']) && !empty($_POST['branchid'])) {
            $username = $_POST['username'];
            $branch_id = $_POST['branchid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('branch', $branch_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_branch = $api->delete_branch($branch_id, $username);

                if ($delete_branch == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_branch;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete holiday
    else if ($transaction == 'delete holiday') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['holidayid']) && !empty($_POST['holidayid'])) {
            $username = $_POST['username'];
            $holiday_id = $_POST['holidayid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('holiday', $holiday_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_holiday = $api->delete_holiday($holiday_id, $username);

                if ($delete_holiday == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_holiday;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete leave type
    else if ($transaction == 'delete leave type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leavetypeid']) && !empty($_POST['leavetypeid'])) {
            $username = $_POST['username'];
            $leave_type_id = $_POST['leavetypeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('leave type', $leave_type_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_leave_type = $api->delete_leave_type($leave_type_id, $username);

                if ($delete_leave_type == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_leave_type;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete leave entitlement
    else if ($transaction == 'delete leave entitlement') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['entitlementid']) && !empty($_POST['entitlementid'])) {
            $username = $_POST['username'];
            $entitlement_id = $_POST['entitlementid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('leave entitlement', $entitlement_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_leave_entitlement = $api->delete_leave_entitlement($entitlement_id, $username);

                if ($delete_leave_entitlement == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_leave_entitlement;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete employee leave
    else if ($transaction == 'delete employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_leave = $api->delete_employee_leave($leave_id, $username);

                if ($delete_employee_leave == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_employee_leave;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete employee document
    else if ($transaction == 'delete employee document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_document = $api->delete_employee_document($document_id, $username);

                if ($delete_employee_document == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_employee_document;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete employee attendance log
    else if ($transaction == 'delete employee attendance log' || $transaction == 'delete attendance log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['attendanceid']) && !empty($_POST['attendanceid'])) {
            $username = $_POST['username'];
            $attendance_id = $_POST['attendanceid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance log', $attendance_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_attendance_log = $api->delete_employee_attendance_log($attendance_id, $username);

                if ($delete_employee_attendance_log == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_employee_attendance_log;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete deduction type
    else if ($transaction == 'delete deduction type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid'])) {
            $username = $_POST['username'];
            $deduction_type_id = $_POST['deductiontypeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('deduction type', $deduction_type_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_deduction_type = $api->delete_deduction_type($deduction_type_id, $username);

                if ($delete_deduction_type == '1') {
                    $delete_all_deduction_amount = $api->delete_all_deduction_amount($deduction_type_id, $username);

                    if ($delete_all_deduction_amount == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_deduction_amount;
                    }
                } else {
                    echo $delete_deduction_type;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete deduction amount
    else if ($transaction == 'delete deduction amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid']) && isset($_POST['startrange']) && !empty($_POST['startrange']) && isset($_POST['endrange']) && !empty($_POST['endrange'])) {
            $username = $_POST['username'];
            $deduction_type_id = $_POST['deductiontypeid'];
            $start_range = $_POST['startrange'];
            $end_range = $_POST['endrange'];

            $check_data_exist_three_parameter = $api->check_data_exist_three_parameter('deduction amount', $deduction_type_id, $start_range, $end_range);

            if ($check_data_exist_three_parameter == 1) {
                $delete_deduction_amount = $api->delete_deduction_amount($deduction_type_id, $start_range, $end_range, $username);

                if ($delete_deduction_amount == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_deduction_amount;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete allowance type
    else if ($transaction == 'delete allowance type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['allowancetypeid']) && !empty($_POST['allowancetypeid'])) {
            $username = $_POST['username'];
            $allowance_type_id = $_POST['allowancetypeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('allowance type', $allowance_type_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_allowance_type = $api->delete_allowance_type($allowance_type_id, $username);

                if ($delete_allowance_type == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_allowance_type;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete other income type
    else if ($transaction == 'delete other income type') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['otherincometypeid']) && !empty($_POST['otherincometypeid'])) {
            $username = $_POST['username'];
            $other_income_type_id = $_POST['otherincometypeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('other income type', $other_income_type_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_other_income_type = $api->delete_other_income_type($other_income_type_id, $username);

                if ($delete_other_income_type == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_other_income_type;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete payroll specification
    else if ($transaction == 'delete payroll specification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['specid']) && !empty($_POST['specid'])) {
            $username = $_POST['username'];
            $spec_id = $_POST['specid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll specification', $spec_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_payroll_specification = $api->delete_payroll_specification($spec_id, $username);

                if ($delete_payroll_specification == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_payroll_specification;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete email notification
    else if ($transaction == 'delete email notification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && !empty($_POST['notificationid'])) {
            $username = $_POST['username'];
            $notification_id = $_POST['notificationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('email notification', $notification_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_email_notification = $api->delete_email_notification($notification_id, $username);

                if ($delete_email_notification == '1') {
                    $delete_all_email_notification_recipients = $api->delete_all_email_notification_recipients($notification_id, $username);

                    if ($delete_all_email_notification_recipients == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_email_notification_recipients;
                    }
                } else {
                    echo $delete_email_notification;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete email recipient
    else if ($transaction == 'delete email recipient') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && !empty($_POST['notificationid']) && isset($_POST['recipientid']) && !empty($_POST['recipientid'])) {
            $username = $_POST['username'];
            $notification_id = $_POST['notificationid'];
            $recipient_id = $_POST['recipientid'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('email recipient', $notification_id, $recipient_id);

            if ($check_data_exist_two_parameter == 1) {
                $delete_email_recipient = $api->delete_email_recipient($notification_id, $recipient_id, $username);

                if ($delete_email_recipient == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_email_recipient;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete payroll group
    else if ($transaction == 'delete payroll group') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollgroupid']) && !empty($_POST['payrollgroupid'])) {
            $username = $_POST['username'];
            $payroll_group_id = $_POST['payrollgroupid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll group', $payroll_group_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_payroll_group = $api->delete_payroll_group($payroll_group_id, $username);

                if ($delete_payroll_group == '1') {
                    $delete_all_payroll_group_employee = $api->delete_all_payroll_group_employee($payroll_group_id, $username);

                    if ($delete_all_payroll_group_employee == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_payroll_group_employee;
                    }
                } else {
                    echo $delete_payroll_group;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete employee attendance adjustment request
    else if ($transaction == 'delete employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_employee_attendance_adjustment_request = $api->delete_employee_attendance_adjustment_request($adjustment_id, $username);

                if ($delete_employee_attendance_adjustment_request == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_employee_attendance_adjustment_request;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete telephone log
    else if ($transaction == 'delete telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_telephone_log = $api->delete_telephone_log($log_id, $username);

                if ($delete_telephone_log == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_telephone_log;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete document authorizer
    else if ($transaction == 'delete document authorizer') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['department']) && !empty($_POST['department']) && isset($_POST['authorizer']) && !empty($_POST['authorizer'])) {
            $username = $_POST['username'];
            $department = $_POST['department'];
            $authorizer = $_POST['authorizer'];

            $check_data_exist_one_parameter = $api->check_data_exist_two_parameter('document authorizer', $department, $authorizer);

            if ($check_data_exist_one_parameter == 1) {
                $delete_document_authorizer = $api->delete_document_authorizer($department, $authorizer, $username);

                if ($delete_document_authorizer == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_document_authorizer;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete document
    else if ($transaction == 'delete document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_document = $api->delete_document($document_id, $username);

                if ($delete_document == '1') {
                    $delete_department_document_permission = $api->delete_department_document_permission($document_id, $username);

                    if ($delete_department_document_permission == '1') {
                        $delete_employee_document_permission = $api->delete_employee_document_permission($document_id, $username);

                        if ($delete_employee_document_permission == '1') {
                            echo 'Deleted';
                        } else {
                            echo $delete_employee_document_permission;
                        }
                    } else {
                        echo $delete_department_document_permission;
                    }
                } else {
                    echo $delete_document;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete transmittal
    else if ($transaction == 'delete transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_transmittal = $api->delete_transmittal($transmittal_id, $username);

                if ($delete_transmittal == '1') {
                    $delete_all_transmittal_history = $api->delete_all_transmittal_history($transmittal_id, $username);

                    if ($delete_all_transmittal_history == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_transmittal_history;
                    }
                } else {
                    echo $delete_transmittal;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete file
    else if ($transaction == 'delete file') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['fileurl']) && !empty($_POST['fileurl'])) {
            $username = $_POST['username'];
            $file_url = $_POST['fileurl'];

            if (file_exists($file_url)) {
                unlink($file_url);
            }
        }
    }
    # -------------------------------------------------------------

    # Delete suggest to win
    else if ($transaction == 'delete suggest to win') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid'])) {
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_suggest_to_win = $api->delete_suggest_to_win($stw_id, $username);

                if ($delete_suggest_to_win == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_suggest_to_win;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete training room log
    else if ($transaction == 'delete training room log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training room log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_training_room_log = $api->delete_training_room_log($log_id, $username);

                if ($delete_training_room_log == '1') {
                    $delete_all_training_room_log_participant = $api->delete_all_training_room_log_participant($log_id, $username);

                    if ($delete_all_training_room_log_participant == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_training_room_log_participant;
                    }
                } else {
                    echo $delete_training_room_log;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete weekly cash flow
    else if ($transaction == 'delete weekly cash flow') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow', $wcf_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_weekly_cash_flow = $api->delete_weekly_cash_flow($wcf_id, $username);

                if ($delete_weekly_cash_flow == '1') {
                    $delete_all_weekly_cash_flow_particulars = $api->delete_all_weekly_cash_flow_particulars($wcf_id, $username);

                    if ($delete_all_weekly_cash_flow_particulars == '1') {
                        echo 'Deleted';
                    } else {
                        echo $delete_all_weekly_cash_flow_particulars;
                    }
                } else {
                    echo $delete_weekly_cash_flow;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete weekly cash flow particulars
    else if ($transaction == 'delete weekly cash flow particulars') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid']) && isset($_POST['particularid']) && !empty($_POST['particularid'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];
            $particular_id = $_POST['particularid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow particulars', $particular_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_weekly_cash_flow_particulars = $api->delete_weekly_cash_flow_particulars($particular_id, $username);

                if ($delete_weekly_cash_flow_particulars == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_weekly_cash_flow_particulars;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete ticket
    else if ($transaction == 'delete ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_ticket = $api->delete_ticket($ticket_id, $username);

                if ($delete_ticket == '1') {
                    $delete_all_ticket_notes = $api->delete_all_ticket_notes($ticket_id, $username);

                    if ($delete_all_ticket_notes == '1') {
                        $delete_all_ticket_attachments = $api->delete_all_ticket_attachments($ticket_id, $username);

                        if ($delete_all_ticket_attachments == '1') {
                            $delete_all_ticket_adjustments = $api->delete_all_ticket_adjustments($ticket_id, $username);

                            if ($delete_all_ticket_adjustments == '1') {
                                echo 'Deleted';
                            } else {
                                echo $delete_all_ticket_adjustments;
                            }
                        } else {
                            echo $delete_all_ticket_attachments;
                        }
                    } else {
                        echo $delete_all_ticket_notes;
                    }
                } else {
                    echo $delete_ticket;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete ticket note
    else if ($transaction == 'delete ticket note') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['noteid']) && !empty($_POST['noteid'])) {
            $username = $_POST['username'];
            $note_id = $_POST['noteid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket note', $note_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_ticket_note = $api->delete_ticket_note($note_id, $username);

                if ($delete_ticket_note == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_ticket_note;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete ticket attachment
    else if ($transaction == 'delete ticket attachment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['attachmentid']) && !empty($_POST['attachmentid'])) {
            $username = $_POST['username'];
            $attachment_id = $_POST['attachmentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket attachment', $attachment_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_ticket_attachment = $api->delete_ticket_attachment($attachment_id, $username);

                if ($delete_ticket_attachment == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_ticket_attachment;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete ticket adjustment
    else if ($transaction == 'delete ticket adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_ticket_adjustment = $api->delete_ticket_adjustment($adjustment_id, $username);

                if ($delete_ticket_adjustment == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_ticket_adjustment;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete meeting
    else if ($transaction == 'delete meeting') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_meeting = $api->delete_meeting($meeting_id, $username);

                if ($delete_meeting == '1') {
                    $delete_all_meeting_attendees = $api->delete_all_meeting_attendees($meeting_id, $username);

                    if ($delete_all_meeting_attendees == '1') {
                        $delete_all_meeting_permission = $api->delete_all_meeting_permission($meeting_id, $username);

                        if ($delete_all_meeting_permission == '1') {
                            $delete_all_meeting_note = $api->delete_all_meeting_note($meeting_id, $username);

                            if ($delete_all_meeting_note == '1') {
                                $delete_all_meeting_task = $api->delete_all_meeting_task($meeting_id, $username);

                                if ($delete_all_meeting_task == '1') {
                                    $delete_all_meeting_memo = $api->delete_all_meeting_memo($meeting_id, $username);

                                    if ($delete_all_meeting_memo == '1') {
                                        $delete_all_meeting_other_matters = $api->delete_all_meeting_other_matters($meeting_id, $username);

                                        if ($delete_all_meeting_other_matters == '1') {
                                            echo 'Deleted';
                                        } else {
                                            echo $delete_all_meeting_other_matters;
                                        }
                                    } else {
                                        echo $delete_all_meeting_memo;
                                    }
                                } else {
                                    echo $delete_all_meeting_task;
                                }
                            } else {
                                echo $delete_all_meeting_note;
                            }
                        } else {
                            echo $delete_all_meeting_permission;
                        }
                    } else {
                        echo $delete_all_meeting_attendees;
                    }
                } else {
                    echo $delete_meeting;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete meeting note
    else if ($transaction == 'delete meeting note') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['noteid']) && !empty($_POST['noteid'])) {
            $username = $_POST['username'];
            $note_id = $_POST['noteid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting note', $note_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_meeting_note = $api->delete_meeting_note($note_id, $username);

                if ($delete_meeting_note == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_meeting_note;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete meeting task
    else if ($transaction == 'delete meeting task') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['taskid']) && !empty($_POST['taskid']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $task_id = $_POST['taskid'];
            $meeting_id = $_POST['meetingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting task', $task_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_meeting_task = $api->delete_meeting_task($task_id, $username);

                if ($delete_meeting_task == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_meeting_task;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete meeting memo
    else if ($transaction == 'delete meeting memo') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['memoid']) && !empty($_POST['memoid']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $memo_id = $_POST['memoid'];
            $meeting_id = $_POST['meetingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting memo', $memo_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_meeting_memo = $api->delete_meeting_memo($memo_id, $username);

                if ($delete_meeting_memo == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_meeting_memo;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete meeting other matters
    else if ($transaction == 'delete meeting other matters') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['othermattersid']) && !empty($_POST['othermattersid']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $other_matters_id = $_POST['othermattersid'];
            $meeting_id = $_POST['meetingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting other matters', $other_matters_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_meeting_other_matters = $api->delete_meeting_other_matters($other_matters_id, $username);

                if ($delete_meeting_other_matters == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_meeting_other_matters;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete training
    else if ($transaction == 'delete training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_training = $api->delete_training($training_id, $username);

                if ($delete_training == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_training;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete car search parameter
    else if ($transaction == 'delete car search parameter') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['parameterid']) && !empty($_POST['parameterid'])) {
            $username = $_POST['username'];
            $parameter_id = $_POST['parameterid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('car search parameter', $parameter_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_car_search_parameter = $api->delete_car_search_parameter($parameter_id, $username);

                if ($delete_car_search_parameter == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_car_search_parameter;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete price index item
    else if ($transaction == 'delete price index item') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['itemid']) && !empty($_POST['itemid'])) {
            $username = $_POST['username'];
            $item_id = $_POST['itemid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index item', $item_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_price_index_item = $api->delete_price_index_item($item_id, $username);

                if ($delete_price_index_item == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_price_index_item;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Delete delete price index amount
    else if ($transaction == 'delete price index amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['itemid']) && !empty($_POST['itemid']) && isset($_POST['year']) && !empty($_POST['year'])) {
            $username = $_POST['username'];
            $item_id = $_POST['itemid'];
            $year = $_POST['year'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('price index item amount', $item_id, $year);

            if ($check_data_exist_one_parameter == 1) {
                $delete_price_index_amount = $api->delete_price_index_amount($item_id, $year, $username);

                if ($delete_price_index_amount == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_price_index_amount;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # -------------------------------------------------------------
    #   Custom functions
    # -------------------------------------------------------------

    # Activate role
    else if ($transaction == 'activate role') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $username = $_POST['username'];
            $role_id = $_POST['roleid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_role_status = $api->update_role_status($role_id, 1, $username);

                if ($update_role_status == '1') {
                    echo 'Activated';
                } else {
                    echo $update_role_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Deactivate role
    else if ($transaction == 'deactivate role') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $username = $_POST['username'];
            $role_id = $_POST['roleid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('role', $role_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_role_status = $api->update_role_status($role_id, 0, $username);

                if ($update_role_status == '1') {
                    echo 'Deactivated';
                } else {
                    echo $update_role_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve employee leave
    else if ($transaction == 'approve employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['leavetype']) && !empty($_POST['leavetype'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];
            $leave_type = $_POST['leavetype'];
            $employee_leave_details = $api->get_data_details_two_parameter('employee leave', $leave_id, $employee_id);
            $leave_date = $api->check_date('empty', $employee_leave_details[0]['LEAVE_DATE'], '', 'm/d/Y', '', '', '');
            $start_time = $employee_leave_details[0]['START_TIME'];
            $end_time = $employee_leave_details[0]['END_TIME'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter == 1) {
                $check_leave_overlap_start = $api->check_leave_overlap($employee_id, $leave_date, $start_time);
                $check_leave_overlap_end = $api->check_leave_overlap($employee_id, $leave_date, $end_time);

                if ($check_leave_overlap_start == 0 && $check_leave_overlap_end == 0) {
                    $update_leave_to_approve = $api->update_leave_to_approve($leave_id, $username);

                    if ($update_leave_to_approve == '1') {
                        $insert_system_notification = $api->insert_system_notification('Approve Leave', $approver_id, $employee_id, 'Leave Application', 'Your leave application has been approved.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Approved';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $update_leave_to_approve;
                    }
                } else {
                    echo 'Overlap';
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve overlap employee leave
    else if ($transaction == 'approve overlap employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['leavetype']) && !empty($_POST['leavetype'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];
            $leave_type = $_POST['leavetype'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_overlap_leave_to_cancel = $api->update_overlap_leave_to_cancel($employee_id, $leave_id, $username);

                if ($update_overlap_leave_to_cancel == '1') {
                    $update_leave_to_approve = $api->update_leave_to_approve($leave_id, $username);

                    if ($update_leave_to_approve == '1') {
                        $insert_system_notification = $api->insert_system_notification('Approve Leave', $approver_id, $employee_id, 'Leave Application', 'Your leave application has been approved.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Approved';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $update_leave_to_approve;
                    }
                } else {
                    echo $update_overlap_leave_to_cancel;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject employee leave
    else if ($transaction == 'reject employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['rejectionreason']) && !empty($_POST['rejectionreason'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];
            $rejection_reason = $_POST['rejectionreason'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $employee_leave_details = $api->get_data_details_two_parameter('employee leave', $leave_id, $employee_id);
            $leave_type = $employee_leave_details[0]['LEAVE_TYPE'];
            $start_time = $employee_leave_details[0]['START_TIME'];
            $end_time = $employee_leave_details[0]['END_TIME'];
            $leave_date = $api->check_date('empty', $employee_leave_details[0]['LEAVE_DATE'], '', 'm/d/Y', '', '', '');

            $company_details = $api->get_data_details_one_parameter('company', '1');
            $start_working_hours = $company_details[0]['START_WORKING_HOURS'];
            $end_working_hours = $company_details[0]['END_WORKING_HOURS'];

            $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
            $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

            if ($total_working_hours == $total_leave_hours) {
                $total_hours = -1;
            } else {
                $total_hours = -1 * abs(($total_working_hours - $total_leave_hours) / $total_working_hours);
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_leave_to_reject = $api->update_leave_to_reject($leave_id, $rejection_reason, $username);

                if ($update_leave_to_reject == '1') {
                    $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                    if ($update_leave_entitlement_count == '1') {
                        $insert_system_notification = $api->insert_system_notification('Reject Leave', $approver_id, $employee_id, 'Leave Application', 'Your leave application has been rejected.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Rejected';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $update_leave_entitlement_count;
                    }
                } else {
                    echo $update_leave_to_reject;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel employee leave
    else if ($transaction == 'cancel employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['cancelationreason']) && !empty($_POST['cancelationreason'])) {
            $username = $_POST['username'];
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];
            $cancelation_reason = $_POST['cancelationreason'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $employee_leave_details = $api->get_data_details_two_parameter('employee leave', $leave_id, $employee_id);
            $leave_type = $employee_leave_details[0]['LEAVE_TYPE'];
            $start_time = $employee_leave_details[0]['START_TIME'];
            $end_time = $employee_leave_details[0]['END_TIME'];
            $leave_date = $api->check_date('empty', $employee_leave_details[0]['LEAVE_DATE'], '', 'Y-m-d', '', '', '');

            $company_details = $api->get_data_details_one_parameter('company', '1');
            $start_working_hours = $company_details[0]['START_WORKING_HOURS'];
            $end_working_hours = $company_details[0]['END_WORKING_HOURS'];

            $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
            $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

            if ($total_working_hours == $total_leave_hours) {
                $total_hours = -1;
            } else {
                $total_hours = -1 * abs(($total_working_hours - $total_leave_hours) / $total_working_hours);
            }

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee leave', $leave_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_leave_to_cancel = $api->update_leave_to_cancel($leave_id, $cancelation_reason, $username);

                if ($update_leave_to_cancel == '1') {
                    $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                    if ($update_leave_entitlement_count == '1') {
                        $insert_system_notification = $api->insert_system_notification('Cancel Leave', $approver_id, $employee_id, 'Leave Application', 'Your leave application has been cancelled.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Cancelled';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $update_leave_entitlement_count;
                    }
                } else {
                    echo $update_leave_to_cancel;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    else if ($transaction == 'record attendance') {
        if (isset($_POST['username']) && !empty($_POST['username'])) {
            $username = $_POST['username'];
            $latitude = $_POST['latitude'];
            $longitude = $_POST['longitude'];
            $ip_address = $api->get_ip_address();

            if (!isset($_POST['employeeid']) || empty($_POST['employeeid'])) {
                $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
                $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            } else {
                $employee_id = $_POST['employeeid'];
            }

            if (!filter_var($ip_address, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                $company_details = $api->get_data_details_one_parameter('company', '1');
                $get_clock_in_total = $api->get_clock_in_total($employee_id, $systemdate);
                $max_clock_in = $company_details[0]['MAX_CLOCK_IN'];

                if ($get_clock_in_total < $max_clock_in) {
                    $attendance_id = $api->check_attendance_clock_out($employee_id);

                    if (!empty($attendance_id)) {
                        $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);
                        $attendance_time_in_date = $employee_attendance_log_details[0]['TIME_IN_DATE'];
                        $attendance_time_in = $employee_attendance_log_details[0]['TIME_IN'];
                        $time_difference = round(abs(strtotime($systemdate . ' ' . $attendance_time) - strtotime($attendance_time_in_date . ' ' . $attendance_time_in)) / 60, 2);

                        if ($time_difference > 10) {
                            $early_leaving = $api->get_attendance_early_leaving_total($employee_id, $systemdate, $attendance_time);
                            $overtime = $api->get_attendance_overtime_total($employee_id, $attendance_time_in_date, $systemdate, $attendance_time);
                            $total_hours_worked = $api->get_attendance_total_hours($employee_id, $attendance_time_in_date, $attendance_time_in, $systemdate, $attendance_time);

                            $check_attendance_log_validation = $api->check_attendance_log_validation($attendance_time_in_date, $attendance_time_in, $systemdate, $attendance_time);

                            if (empty($check_attendance_log_validation)) {
                                $update_attendance = $api->update_attendance($latitude, $longitude, $ip_address, $systemdate, $attendance_time, $early_leaving, $overtime, $total_hours_worked, $attendance_id, $username);

                                if ($update_attendance == '1') {
                                    $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock Out', 'You clocked out on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                    if ($insert_system_notification == '1') {
                                        echo 'Clock Out';
                                    } else {
                                        echo $insert_system_notification;
                                    }
                                } else {
                                    echo $update_attendance;
                                }
                            } else {
                                echo $check_attendance_log_validation;
                            }
                        } else {
                            echo 'Time Difference';
                        }
                    } else {
                        $last_attendance_record = $api->get_last_attendance_record($employee_id) ?? null;
                        $late = $api->get_attendance_late_total($employee_id, $systemdate, $attendance_time);

                        if (!empty($last_attendance_record)) {
                            $insert_leave_without_pay = $api->insert_leave_without_pay($employee_id, $systemdate, $attendance_time, $last_attendance_record, $username);

                            if ($insert_leave_without_pay == '1') {
                                $insert_attendance = $api->insert_attendance($employee_id, $latitude, $longitude, $ip_address, $systemdate, $attendance_time, $late, $username);

                                if ($insert_attendance == '1') {
                                    $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock In', 'You clocked in on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                    if ($insert_system_notification == '1') {
                                        echo 'Clock In';
                                    } else {
                                        echo $insert_system_notification;
                                    }
                                } else {
                                    echo $insert_attendance;
                                }
                            } else {
                                echo $insert_leave_without_pay;
                            }
                        } else {
                            $insert_attendance = $api->insert_attendance($employee_id, $latitude, $longitude, $ip_address, $systemdate, $attendance_time, $late, $username);

                            if ($insert_attendance == '1') {
                                $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock In', 'You clocked in on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                if ($insert_system_notification == '1') {
                                    echo 'Clock In';
                                } else {
                                    echo $insert_system_notification;
                                }
                            } else {
                                echo $insert_attendance;
                            }
                        }
                    }
                } else {
                    echo 'Max Clock-In';
                }
            } else {
               
                if (!empty($latitude) && !empty($longitude)) {
                    $company_details = $api->get_data_details_one_parameter('company', '1');
                    $get_clock_in_total = $api->get_clock_in_total($employee_id, $systemdate);
                    $max_clock_in = $company_details[0]['MAX_CLOCK_IN'];

                    if ($get_clock_in_total < $max_clock_in) {
                        $attendance_id = $api->check_attendance_clock_out($employee_id);

                        if (!empty($attendance_id)) {
                            $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);
                            $attendance_time_in_date = $employee_attendance_log_details[0]['TIME_IN_DATE'];
                            $attendance_time_in = $employee_attendance_log_details[0]['TIME_IN'];
                            $time_difference = round(abs(strtotime($systemdate . ' ' . $attendance_time) - strtotime($attendance_time_in_date . ' ' . $attendance_time_in)) / 60, 2);

                            if ($time_difference > 10) {
                                $early_leaving = $api->get_attendance_early_leaving_total($employee_id, $systemdate, $attendance_time);
                                $overtime = $api->get_attendance_overtime_total($employee_id, $attendance_time_in_date, $systemdate, $attendance_time);
                                $total_hours_worked = $api->get_attendance_total_hours($employee_id, $attendance_time_in_date, $attendance_time_in, $systemdate, $attendance_time);

                                $check_attendance_log_validation = $api->check_attendance_log_validation($attendance_time_in_date, $attendance_time_in, $systemdate, $attendance_time);

                                if (empty($check_attendance_log_validation)) {
                                    $update_attendance = $api->update_attendance($latitude, $longitude, $ip_address, $systemdate, $attendance_time, $early_leaving, $overtime, $total_hours_worked, $attendance_id, $username);

                                    if ($update_attendance == '1') {
                                        $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock Out', 'You clocked out on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                        if ($insert_system_notification == '1') {
                                            echo 'Clock Out';
                                        } else {
                                            echo $insert_system_notification;
                                        }
                                    } else {
                                        echo $update_attendance;
                                    }
                                } else {
                                    echo $check_attendance_log_validation;
                                }
                            } else {
                                echo 'Time Difference';
                            }
                        } else {
                            $last_attendance_record = $api->get_last_attendance_record($employee_id) ?? null;
                            $late = $api->get_attendance_late_total($employee_id, $systemdate, $attendance_time);

                            if (!empty($last_attendance_record)) {
                                $insert_leave_without_pay = $api->insert_leave_without_pay($employee_id, $systemdate, $attendance_time, $last_attendance_record, $username);

                                if ($insert_leave_without_pay == '1') {
                                    $insert_attendance = $api->insert_attendance($employee_id, $latitude, $longitude, $ip_address, $systemdate, $attendance_time, $late, $username);

                                    if ($insert_attendance == '1') {
                                        $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock In', 'You clocked in on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                        if ($insert_system_notification == '1') {
                                            echo 'Clock In';
                                        } else {
                                            echo $insert_system_notification;
                                        }
                                    } else {
                                        echo $insert_attendance;
                                    }
                                } else {
                                    echo $insert_leave_without_pay;
                                }
                            } else {
                                $insert_attendance = $api->insert_attendance($employee_id, $latitude, $longitude, $ip_address, $systemdate, $attendance_time, $late, $username);

                                if ($insert_attendance == '1') {
                                    $insert_system_notification = $api->insert_system_notification('Employee Attendance', 'System', $employee_id, 'Attendance Clock In', 'You clocked in on ' . $api->check_date('empty', $systemdate, '', 'F d, Y', '', '', '') . ' ' . $api->check_date('empty', $attendance_time, '', 'h:i a', '', '', '') . '.', $username);

                                    if ($insert_system_notification == '1') {
                                        echo 'Clock In';
                                    } else {
                                        echo $insert_system_notification;
                                    }
                                } else {
                                    echo $insert_attendance;
                                }
                            }
                        }
                    } else {
                        echo 'Max Clock-In';
                    }
                } else {
                    echo 'Location';
                }
            }
        }
    }
    # Get location
    else if ($transaction == 'get location') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['latitude']) && !empty($_POST['latitude']) && isset($_POST['longitude']) && !empty($_POST['longitude']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $latitude = $_POST['latitude'];
            $longitude = $_POST['longitude'];
            $remarks = $_POST['remarks'];

            if (!isset($_POST['employeeid']) || empty($_POST['employeeid'])) {
                $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
                $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            } else {
                $employee_id = $_POST['employeeid'];
            }

            $insert_location = $api->insert_location($employee_id, $latitude, $longitude, $systemdate, $current_time, $remarks, $username);

            if ($insert_location == '1') {
                echo 'Recorded';
            } else {
                echo $insert_location;
            }
        }
    }
    # -------------------------------------------------------------

    # Import deduction amount
    else if ($transaction == 'import deduction amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['deduction_amount_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $deduction_amount_file_name = $_FILES['deduction_amount_file']['name'];
            $deduction_amount_file_size = $_FILES['deduction_amount_file']['size'];
            $deduction_amount_file_error = $_FILES['deduction_amount_file']['error'];
            $deduction_amount_file_tmp_name = $_FILES['deduction_amount_file']['tmp_name'];
            $deduction_amount_file_ext = explode('.', $deduction_amount_file_name);
            $deduction_amount_file_actual_ext = strtolower(end($deduction_amount_file_ext));

            if (in_array($deduction_amount_file_actual_ext, $allowed_ext)) {
                if (!$deduction_amount_file_error) {
                    if ($deduction_amount_file_size < 2000000) {
                        $file = fopen($deduction_amount_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $deduction_type_id = $column[0];
                            $start_range = $column[1];
                            $end_range = $column[2];
                            $deduction_amount = $column[3];

                            $check_data_exist_three_parameter = $api->check_data_exist_three_parameter('deduction amount', $deduction_type_id, $start_range, $end_range);

                            if ($check_data_exist_three_parameter > 0) {
                                $update_deduction_amount = $api->update_deduction_amount($deduction_amount, $deduction_type_id, $start_range, $end_range, $username);

                                if ($update_deduction_amount != '1') {
                                    $error = $update_deduction_amount;
                                }
                            } else {
                                $start_range_overlap = $api->check_deduction_amount_overlap($start_range, $deduction_type_id);
                                $end_range_overlap = $api->check_deduction_amount_overlap($end_range, $deduction_type_id);

                                if ($start_range_overlap == 0 && $end_range_overlap == 0) {
                                    $insert_deduction_amount = $api->insert_deduction_amount($deduction_type_id, $start_range, $end_range, $deduction_amount, $username);

                                    if ($insert_deduction_amount != '1') {
                                        $error = $insert_deduction_amount;
                                    }
                                } else {
                                    $error = 'Overlap';
                                }
                            }
                        }

                        if (empty($error)) {
                            echo 'Imported';
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Calculate payroll specification end date
    else if ($transaction == 'calculate payroll specification end date') {
        if (isset($_POST['startdate']) && isset($_POST['counter']) && isset($_POST['pattern'])) {
            $startdate = $_POST['startdate'];
            $counter = $_POST['counter'];
            $pattern = $_POST['pattern'];

            if (!empty($startdate) && !empty($pattern) && $counter > 0) {
                # Set end date
                $end_date = $startdate;

                # Loop end date based on check number difference
                for ($x = 0; $x < $counter; $x++) {
                    $end_date = $api->get_next_date($end_date, $startdate, $pattern);
                }
            } else {
                $end_date = $api->check_date('empty', $startdate, '', 'm/d/Y', '', '', '');
            }

            $response[] = array(
                'END_DATE' =>  $end_date
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Unlock user account
    else if ($transaction == 'unlock user account') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['usercd']) && !empty($_POST['usercd'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter == 1) {
                $update_failed_login_attempt = $api->update_failed_login_attempt($user_cd, '', 0, NULL);

                if ($update_failed_login_attempt == '1') {
                    echo 'Unlocked';
                } else {
                    echo $update_failed_login_attempt;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Lock user account
    else if ($transaction == 'lock user account') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['usercd']) && !empty($_POST['usercd'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter == 1) {
                $update_failed_login_attempt = $api->update_failed_login_attempt($user_cd, '', 5, NULL);

                if ($update_failed_login_attempt == '1') {
                    echo 'Locked';
                } else {
                    echo $update_failed_login_attempt;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Activate user account
    else if ($transaction == 'activate user account') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['usercd']) && !empty($_POST['usercd'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter == 1) {
                $update_user_account_status = $api->update_user_account_status($user_cd, 1, $username);

                if ($update_user_account_status == '1') {
                    echo 'Activated';
                } else {
                    echo $update_user_account_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Deactivate user account
    else if ($transaction == 'deactivate user account') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['usercd']) && !empty($_POST['usercd'])) {
            $username = $_POST['username'];
            $user_cd = $_POST['usercd'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('user account', $user_cd);

            if ($check_data_exist_one_parameter == 1) {
                $update_user_account_status = $api->update_user_account_status($user_cd, 0, $username);

                if ($update_user_account_status == '1') {
                    echo 'Deactivated';
                } else {
                    echo $update_user_account_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Activate email notification
    else if ($transaction == 'activate email notification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && !empty($_POST['notificationid'])) {
            $username = $_POST['username'];
            $notification_id = $_POST['notificationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('email notification', $notification_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_email_notification_status = $api->update_email_notification_status($notification_id, 1, $username);

                if ($update_email_notification_status == '1') {
                    echo 'Activated';
                } else {
                    echo $update_email_notification_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Deactivate email notification
    else if ($transaction == 'deactivate email notification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['notificationid']) && !empty($_POST['notificationid'])) {
            $username = $_POST['username'];
            $notification_id = $_POST['notificationid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('email notification', $notification_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_email_notification_status = $api->update_email_notification_status($notification_id, 0, $username);

                if ($update_email_notification_status == '1') {
                    echo 'Deactivated';
                } else {
                    echo $update_email_notification_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Send test email
    else if ($transaction == 'send test email') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['email']) && !empty($_POST['email'])) {
            $username = $_POST['username'];
            $email = $_POST['email'];

            $send_notification_email = $api->send_notification_email($email, 'Test Email', 'This is a test email.', 0, '');

            if ($send_notification_email == '1') {
                echo 'Sent';
            } else {
                echo $send_notification_email;
            }
        }
    }
    # -------------------------------------------------------------

    # Generate payroll
    else if ($transaction == 'generate payroll') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['generatepayrolloption']) && !empty($_POST['generatepayrolloption']) && isset($_POST['payrollstartdate']) && !empty($_POST['payrollstartdate']) && isset($_POST['payrollenddate']) && !empty($_POST['payrollenddate']) && isset($_POST['employee']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $generate_payroll_option = $_POST['generatepayrolloption'];
            $remarks = $_POST['remarks'];
            $employees = $_POST['employee'];
            $payroll_start_date = $api->check_date('empty', $_POST['payrollstartdate'], '', 'Y-m-d', '', '', '');
            $payroll_end_date = $api->check_date('empty', $_POST['payrollenddate'], '', 'Y-m-d', '', '', '');

            $generate_payroll = $api->generate_payroll($generate_payroll_option, $employees, $payroll_start_date, $payroll_end_date, $remarks, $username);

            if (empty($generate_payroll)) {
                echo 'Generated';
            } else {
                echo $generate_payroll;
            }
        }
    }
    # -------------------------------------------------------------

    # Pay payroll
    else if ($transaction == 'pay payroll') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollid']) && !empty($_POST['payrollid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['bankreference']) && !empty($_POST['bankreference'])) {
            $username = $_POST['username'];
            $payroll_id = $_POST['payrollid'];
            $employee_id = $_POST['employeeid'];
            $bank_reference = $_POST['bankreference'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('payroll', $payroll_id, $employee_id);

            if ($check_data_exist_two_parameter > 0) {
                $payroll_details = $api->get_data_details_two_parameter('payroll', $payroll_id, $employee_id);
                $payroll_status = $payroll_details[0]['STATUS'];

                if ($payroll_status == 0) {
                    $pay_payroll = $api->pay_payroll($bank_reference, $payroll_id, $employee_id, $username);

                    if ($pay_payroll == '1') {
                        $update_payroll_specification_status = $api->update_payroll_specification_status($payroll_id, $employee_id, '1', $username);

                        if ($update_payroll_specification_status == '1') {
                            echo 'Paid';
                        } else {
                            echo $update_payroll_specification_status;
                        }
                    } else {
                        echo $pay_payroll;
                    }
                } else {
                    echo 'Status';
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reverse payroll
    else if ($transaction == 'reverse payroll') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollid']) && !empty($_POST['payrollid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $username = $_POST['username'];
            $payroll_id = $_POST['payrollid'];
            $employee_id = $_POST['employeeid'];

            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('payroll', $payroll_id, $employee_id);

            if ($check_data_exist_two_parameter > 0) {
                $payroll_details = $api->get_data_details_two_parameter('payroll', $payroll_id, $employee_id);
                $payroll_status = $payroll_details[0]['STATUS'];
                $payroll_start_date = $api->check_date('empty', $payroll_details[0]['PAYROLL_START_DATE'], '', 'Y-m-d', '', '', '');
                $payroll_end_date = $api->check_date('empty', $payroll_details[0]['PAYROLL_END_DATE'], '', 'Y-m-d', '', '', '');

                if ($payroll_status == 0) {
                    $update_attendance_record_status = $api->update_attendance_record_status($employee_id, '0', $payroll_start_date, $payroll_end_date, $username);

                    if ($update_attendance_record_status == '1') {
                        $update_payroll_specification_status = $api->update_payroll_specification_status($payroll_id, $employee_id, '2', $username);

                        if ($update_payroll_specification_status == '1') {
                            $duplicate_payroll_specification = $api->duplicate_payroll_specification($payroll_id, $employee_id, $username);

                            if ($duplicate_payroll_specification == '1') {
                                $reverse_payroll = $api->reverse_payroll($payroll_id, $employee_id, $username);

                                if ($reverse_payroll == '1') {
                                    echo 'Reversed';
                                } else {
                                    echo $pay_payrreverse_payrolloll;
                                }
                            } else {
                                echo $duplicate_payroll_specification;
                            }
                        } else {
                            echo $update_payroll_specification_status;
                        }
                    } else {
                        echo $update_attendance_record_status;
                    }
                } else {
                    echo 'Status';
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Unassign payroll group employee
    else if ($transaction == 'unassign payroll group employee') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payrollgroupid']) && !empty($_POST['payrollgroupid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $username = $_POST['username'];
            $payroll_group_id = $_POST['payrollgroupid'];
            $employee_id = $_POST['employeeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('payroll group', $payroll_group_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_payroll_group_employee = $api->delete_payroll_group_employee($payroll_group_id, $employee_id, $username);

                if ($delete_payroll_group_employee == '1') {
                    echo 'Unassigned';
                } else {
                    echo $delete_payroll_group_employee;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Backup database
    else if ($transaction == 'backup database') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['filename']) && !empty($_POST['filename'])) {
            $username = $_POST['username'];
            $file_name = str_replace(array(' ', '/', '|'), '_', $_POST['filename']);

            $backup_database = $api->backup_database($file_name, $username);

            if ($backup_database == '1') {
                echo 'Backed Up';
            } else {
                echo $backup_database;
            }
        }
    }
    # -------------------------------------------------------------

    # Import attendance log
    else if ($transaction == 'import attendance log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['attendance_log_file']['name'])) {
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $attendance_log_file_name = $_FILES['attendance_log_file']['name'];
            $attendance_log_file_size = $_FILES['attendance_log_file']['size'];
            $attendance_log_file_error = $_FILES['attendance_log_file']['error'];
            $attendance_log_file_tmp_name = $_FILES['attendance_log_file']['tmp_name'];
            $attendance_log_file_ext = explode('.', $attendance_log_file_name);
            $attendance_log_file_actual_ext = strtolower(end($attendance_log_file_ext));

            if (in_array($attendance_log_file_actual_ext, $allowed_ext)) {
                if (!$attendance_log_file_error) {
                    if ($attendance_log_file_size < 2000000) {
                        $file = fopen($attendance_log_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $employee_id = $column[0];
                            $time_in_date = $api->check_date('empty', $column[1], '', 'Y-m-d', '', '', '');
                            $time_in = $column[2];
                            $time_in_latitude = $column[3];
                            $time_in_longitude = $column[4];
                            $time_in_ip_address = $column[5];
                            $time_out_date = $api->check_date('empty', $column[6], '', 'Y-m-d', '', '', '');
                            $time_out = $column[7];
                            $time_out_latitude = $column[8];
                            $time_out_longitude = $column[9];
                            $time_out_ip_address = $column[10];
                            $remarks = $column[11];

                            $check_attendance_log_validation = $api->check_attendance_log_validation($time_in_date, $time_in, $time_out_date, $time_out);

                            if (empty($check_attendance_log_validation)) {
                                if (!empty($time_in_date) && !empty($time_in)) {
                                    $late = $api->get_attendance_late_total($employee_id, $time_in_date, $time_in);
                                } else {
                                    $late = '';
                                }

                                if (!empty($time_out_date) && !empty($time_out)) {
                                    $early_leaving = $api->get_attendance_early_leaving_total($employee_id, $time_out_date, $time_out);
                                    $overtime = $api->get_attendance_overtime_total($employee_id, $time_in_date, $time_out_date, $time_out);
                                    $total_hours_worked = $api->get_attendance_total_hours($employee_id, $time_in_date, $time_in, $time_out_date, $time_out);
                                } else {
                                    $early_leaving = '';
                                    $overtime = '';
                                    $total_hours_worked = '';
                                }

                                $company_details = $api->get_data_details_one_parameter('company', '1');
                                $get_clock_in_total = $api->get_clock_in_total($employee_id, $time_in_date);
                                $max_clock_in = $company_details[0]['MAX_CLOCK_IN'];

                                if ($get_clock_in_total < $max_clock_in) {
                                    if (!empty($employee_id) && !empty($time_in_date) && !empty($time_in)) {
                                        $insert_imported_employee_attendance_log = $api->insert_imported_employee_attendance_log($employee_id, $time_in_date, $time_in, $time_in_latitude, $time_in_longitude, $time_in_ip_address, $time_out_date, $time_out, $time_out_latitude, $time_out_longitude, $time_out_ip_address, $late, $early_leaving, $overtime, $total_hours_worked, $remarks, $username);
                                    }
                                }
                            }
                        }

                        echo 'Imported';
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import employee leave
    else if ($transaction == 'import employee leave') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['employee_leave_file']['name'])) {
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $employee_leave_file_name = $_FILES['employee_leave_file']['name'];
            $employee_leave_file_size = $_FILES['employee_leave_file']['size'];
            $employee_leave_file_error = $_FILES['employee_leave_file']['error'];
            $employee_leave_file_tmp_name = $_FILES['employee_leave_file']['tmp_name'];
            $employee_leave_file_ext = explode('.', $employee_leave_file_name);
            $employee_leave_file_actual_ext = strtolower(end($employee_leave_file_ext));

            if (in_array($employee_leave_file_actual_ext, $allowed_ext)) {
                if (!$employee_leave_file_error) {
                    if ($employee_leave_file_size < 2000000) {
                        $file = fopen($employee_leave_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $employee_id = $column[0];
                            $leave_type = $column[1];
                            $leave_date = $api->check_date('empty', $column[2], '', 'Y-m-d', '', '', '');
                            $start_time = $column[3];
                            $end_time = $column[4];
                            $leave_status = $column[5];
                            $reason = $column[6];

                            $leave_day = $api->check_week_day($api->check_date('empty', $leave_date, '', 'w', '', '', ''));
                            $office_shift_details = $api->get_data_details_two_parameter('office shift', $employee_id, $leave_day);
                            $start_working_hours = $office_shift_details[0]['TIME_IN'] ?? '8:30';
                            $end_working_hours = $office_shift_details[0]['TIME_OUT'] ?? '17:30';

                            $total_working_hours = round(abs(strtotime($end_working_hours) - strtotime($start_working_hours)) / 3600, 2);
                            $total_leave_hours = round(abs(strtotime($end_time) - strtotime($start_time)) / 3600, 2);

                            if ($total_working_hours == $total_leave_hours) {
                                $total_hours = 1;
                            } else {
                                $total_hours = ($total_working_hours - $total_leave_hours) / $total_working_hours;
                            }

                            $insert_employee_leave = $api->insert_employee_leave($employee_id, $leave_type, $leave_date, $start_time, $end_time, $reason, $leave_status, $systemdate, $current_time, $username);

                            if ($insert_employee_leave == '1') {
                                $update_leave_entitlement_count = $api->update_leave_entitlement_count($employee_id, $leave_type, $leave_date, $total_hours, $username);

                                if ($update_leave_entitlement_count != '1') {
                                    $error = $update_leave_entitlement_count;
                                }
                            } else {
                                $error = $insert_employee_leave;
                            }
                        }

                        echo 'Imported';
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # ------------------------------------------------------------

    # Import payroll specification
    else if ($transaction == 'import payroll specification') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['payroll_specification_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $payroll_specification_file_name = $_FILES['payroll_specification_file']['name'];
            $payroll_specification_file_size = $_FILES['payroll_specification_file']['size'];
            $payroll_specification_file_error = $_FILES['payroll_specification_file']['error'];
            $payroll_specification_file_tmp_name = $_FILES['payroll_specification_file']['tmp_name'];
            $payroll_specification_file_ext = explode('.', $payroll_specification_file_name);
            $payroll_specification_file_actual_ext = strtolower(end($payroll_specification_file_ext));

            if (in_array($payroll_specification_file_actual_ext, $allowed_ext)) {
                if (!$payroll_specification_file_error) {
                    if ($payroll_specification_file_size < 2000000) {
                        $file = fopen($payroll_specification_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $employee_id = $column[0];
                            $specification_type = $column[1];
                            $specification_category = $column[2];
                            $amount = $api->remove_comma($column[3]);
                            $start_date = $api->check_date('empty', $column[4], '', 'Y-m-d', '', '', '');

                            if ($specification_type == 'DEDUCTION') {
                                $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $specification_category);
                                $deducation_category = $deduction_type_details[0]['CATEGORY'];

                                if ($deducation_category == 'GOVERNMENT') {
                                    $amount = 0;
                                }
                            }

                            $insert_payroll_specification = $api->insert_payroll_specification($employee_id, $specification_type, '0', $specification_category, $amount, $start_date, $username);

                            if ($insert_payroll_specification != '1') {
                                $error =  $insert_payroll_specification;
                            }
                        }

                        if (empty($error)) {
                            echo 'Imported';
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel employee attendance adjustment request
    else if ($transaction == 'cancel employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $attendance_adjustment_details = $api->get_data_details_one_parameter('attendance adjustment', $adjustment_id);
                $employee_id = $attendance_adjustment_details[0]['EMPLOYEE_ID'];

                $update_employee_attendance_adjustment_request_status = $api->update_employee_attendance_adjustment_request_status('3', $remarks, $adjustment_id, $approver_id, $username);

                if ($update_employee_attendance_adjustment_request_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Cancel Attendance Adjustment', $approver_id, $employee_id, 'Attendance Adjustment', 'Your attendance adjustment request has been cancelled.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Cancelled';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_employee_attendance_adjustment_request_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Recommend employee attendance adjustment request
    else if ($transaction == 'recommend employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $attendance_adjustment_details = $api->get_data_details_one_parameter('attendance adjustment', $adjustment_id);
                $employee_id = $attendance_adjustment_details[0]['EMPLOYEE_ID'];

                $update_employee_attendance_adjustment_request_status = $api->update_employee_attendance_adjustment_request_status('4', '', $adjustment_id, $approver_id, $username);

                if ($update_employee_attendance_adjustment_request_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Recommend Attendance Adjustment', $approver_id, $employee_id, 'Attendance Adjustment', 'Your attendance adjustment request has been recommended.', $username);

                    if ($insert_system_notification == '1') {
                        $insert_system_notification_by_hr_head = $api->insert_system_notification_by_type('HR Head', 'Attendance Adjustment Recommendation', '', '', $username);

                        if ($insert_system_notification_by_hr_head == '1') {
                            echo 'Recommended';
                        } else {
                            echo $insert_system_notification_by_hr_head;
                        }
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_employee_attendance_adjustment_request_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject employee attendance adjustment request
    else if ($transaction == 'reject employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $attendance_adjustment_details = $api->get_data_details_one_parameter('attendance adjustment', $adjustment_id);
                $employee_id = $attendance_adjustment_details[0]['EMPLOYEE_ID'];

                $update_employee_attendance_adjustment_request_status = $api->update_employee_attendance_adjustment_request_status('2', $remarks, $adjustment_id, $approver_id, $username);

                if ($update_employee_attendance_adjustment_request_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Reject Attendance Adjustment', $approver_id, $employee_id, 'Attendance Adjustment', 'Your attendance adjustment request has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_employee_attendance_adjustment_request_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve employee attendance adjustment request
    else if ($transaction == 'approve employee attendance adjustment request') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance adjustment request', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $attendance_adjustment_details = $api->get_data_details_one_parameter('attendance adjustment', $adjustment_id);
                $employee_id = $attendance_adjustment_details[0]['EMPLOYEE_ID'];
                $attendance_id = $attendance_adjustment_details[0]['ATTENDANCE_ID'];
                $time_in_org = $attendance_adjustment_details[0]['TIME_IN_ORG'];
                $time_in_adj = $attendance_adjustment_details[0]['TIME_IN_ADJ'];
                $time_in_date = $api->check_date('empty', $attendance_adjustment_details[0]['TIME_IN_DATE'], '', 'Y-m-d', '', '', '');
                $time_out_date_org = $api->check_date('empty', $attendance_adjustment_details[0]['TIME_OUT_DATE_ORG'], '', 'Y-m-d', '', '', '');
                $time_out_date_adj = $api->check_date('empty', $attendance_adjustment_details[0]['TIME_OUT_DATE_ADJ'], '', 'Y-m-d', '', '', '');
                $time_out_org = $attendance_adjustment_details[0]['TIME_OUT_ORG'];
                $time_out_adj = $attendance_adjustment_details[0]['TIME_OUT_ADJ'];

                if (strtotime($time_in_adj) != strtotime($time_in_org)) {
                    $time_in = $time_in_adj;
                } else {
                    $time_in = $time_in_org;
                }

                if (strtotime($time_out_date_adj) != strtotime($time_out_date_org)) {
                    $time_out_date = $time_out_date_adj;
                } else {
                    $time_out_date = $time_out_date_org;
                }

                if (strtotime($time_out_adj) != strtotime($time_out_org)) {
                    $time_out = $time_out_adj;
                } else {
                    $time_out = $time_out_org;
                }

                $check_attendance_log_validation = $api->check_attendance_log_validation($time_in_date, $time_in, $time_out_date, $time_out);

                if (empty($check_attendance_log_validation)) {
                    if (!empty($time_in_date) && !empty($time_in)) {
                        $late = $api->get_attendance_late_total($employee_id, $time_in_date, $time_in);
                    } else {
                        $late = '';
                    }

                    if (!empty($time_out_date) && !empty($time_out)) {
                        $early_leaving = $api->get_attendance_early_leaving_total($employee_id, $time_out_date, $time_out);
                        $overtime = $api->get_attendance_overtime_total($employee_id, $time_in_date, $time_out_date, $time_out);
                        $total_hours_worked = $api->get_attendance_total_hours($employee_id, $time_in_date, $time_in, $time_out_date, $time_out);
                    } else {
                        $early_leaving = '';
                        $overtime = '';
                        $total_hours_worked = '';
                    }

                    $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('employee attendance log', $attendance_id);

                    if ($check_data_exist_one_parameter > 0) {
                        $update_employee_attendance_log_adjustment = $api->update_employee_attendance_log_adjustment($time_in_date, $time_in, $time_out_date, $time_out, $late, $early_leaving, $overtime, $total_hours_worked, $attendance_id, $employee_id, $username);

                        if ($update_employee_attendance_log_adjustment == '1') {
                            $update_employee_attendance_adjustment_request_status = $api->update_employee_attendance_adjustment_request_status('1', $remarks, $adjustment_id, $approver_id, $username);

                            if ($update_employee_attendance_adjustment_request_status == '1') {
                                $insert_system_notification = $api->insert_system_notification('Approve Attendance Adjustment', $approver_id, $employee_id, 'Attendance Adjustment', 'Your attendance adjustment request has been approved.', $username);

                                if ($insert_system_notification == '1') {
                                    echo 'Approved';
                                } else {
                                    echo $insert_system_notification;
                                }
                            } else {
                                echo $update_employee_attendance_adjustment_request_status;
                            }
                        } else {
                            echo $update_employee_attendance_log_adjustment;
                        }
                    } else {
                        echo 'Attendance Not Found';
                    }
                } else {
                    echo $check_attendance_log_validation;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel telephone log
    else if ($transaction == 'cancel telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $telephone_log_details = $api->get_data_details_one_parameter('telephone log', $log_id);
                $employee_id = $telephone_log_details[0]['EMPLOYEE_ID'];

                $update_telephone_log_status = $api->update_telephone_log_status('3', $log_id, $approver_id, $username);

                if ($update_telephone_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Cancel Telephone Log', $approver_id, $employee_id, 'Telephone Log', 'Your telephone log has been cancelled.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Cancelled';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_telephone_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve telephone log
    else if ($transaction == 'approve telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $telephone_log_details = $api->get_data_details_one_parameter('telephone log', $log_id);
                $employee_id = $telephone_log_details[0]['EMPLOYEE_ID'];

                $update_telephone_log_status = $api->update_telephone_log_status('1', $log_id, $approver_id, $username);

                if ($update_telephone_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Approve Telephone Log', $approver_id, $employee_id, 'Telephone Log', 'Your telephone log has been approved.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Approved';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_telephone_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject telephone log
    else if ($transaction == 'reject telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $telephone_log_details = $api->get_data_details_one_parameter('telephone log', $log_id);
                $employee_id = $telephone_log_details[0]['EMPLOYEE_ID'];

                $update_telephone_log_status = $api->update_telephone_log_status('2', $log_id, $approver_id, $username);

                if ($update_telephone_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Reject Telephone Log', $approver_id, $employee_id, 'Telephone Log', 'Your telephone log has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_telephone_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Consumed telephone log
    else if ($transaction == 'consume telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid']) && isset($_POST['actualcalldate']) && !empty($_POST['actualcalldate']) && isset($_POST['actualcalltime']) && !empty($_POST['actualcalltime']) && isset($_POST['duration'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];
            $actual_call_date = $api->check_date('empty', $_POST['actualcalldate'], '', 'Y-m-d', '', '', '');
            $actual_call_time = $_POST['actualcalltime'];
            $duration = $_POST['duration'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_telephone_log_consumption_status = $api->update_telephone_log_consumption_status('4', $actual_call_date, $actual_call_time, $duration, $log_id, $username);

                if ($update_telephone_log_consumption_status == '1') {
                    echo 'Consumed';
                } else {
                    echo $update_telephone_log_consumption_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Not consumed telephone log
    else if ($transaction == 'not consumed telephone log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('telephone log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_telephone_log_consumption_status = $api->update_telephone_log_consumption_status('5', '', '', '', $log_id, $employee_id, $username);

                if ($update_telephone_log_consumption_status == '1') {
                    echo 'Not Consumed';
                } else {
                    echo $update_telephone_log_consumption_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Publish document
    else if ($transaction == 'publish document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_profile_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $document_details = $api->get_data_details_one_parameter('document', $document_id);
                $author = $document_details[0]['AUTHOR'];
                $author_details = $api->get_data_details_one_parameter('employee profile', $author);
                $author_id = $author_details[0]['EMPLOYEE_ID'];

                $update_document_status = $api->update_document_status('1', $approver_id, $document_id, $username);

                if ($update_document_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Approve Document', $approver_id, $author_id, 'Document', 'Your document has been approved.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Published';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_document_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Unpublish document
    else if ($transaction == 'unpublish document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('document', $document_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_document_status = $api->update_document_status('0', '', $document_id, $username);

                if ($update_document_status == '1') {
                    echo 'Unpublished';
                } else {
                    echo $update_document_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Download document
    else if ($transaction == 'download document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid']) && isset($_POST['password']) && !empty($_POST['password'])) {
            $username = $_POST['username'];
            $document_id = $_POST['documentid'];
            $password = $_POST['password'];

            $document_details = $api->get_data_details_one_parameter('document', $document_id);
            $document_name = str_replace(' ', '_', $document_details[0]['DOCUMENT_NAME']);
            $document_name = str_replace('.pdf', '', $document_details[0]['DOCUMENT_NAME']);
            $document_path = $document_details[0]['DOCUMENT_PATH'];
            $document_extension = $document_details[0]['DOCUMENT_EXTENSION'];
            $temp_file_name = $document_path . '.dat';
            $actual_file_name = $document_path . '.' . $document_extension;
            $zip_link = './temp/' . $document_name . '.zip';

            if (file_exists($actual_file_name)) {
                unlink($actual_file_name);
            }

            if (file_exists($zip_link)) {
                unlink($zip_link);
            }

            if (copy($temp_file_name, $actual_file_name)) {
                $zip = new ZipArchive;
                $zip->open($zip_link, ZipArchive::CREATE);

                $zip->addFile($actual_file_name);
                $zip->setEncryptionName($actual_file_name, ZipArchive::EM_AES_256, $password);
                $zip->close();

                $response[] = array(
                    'STATUS' => 'Downloaded',
                    'ZIP_LINK' => $zip_link,
                    'FILE_LINK' => $actual_file_name,
                    'FILE_NAME' => $document_name
                );

                echo json_encode($response);
            }
        }
    }
    # -------------------------------------------------------------

    # View document file
     else if ($transaction == 'view document file') {
  if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['documentid']) && !empty($_POST['documentid'])) {
    $username = $_POST['username'];
    $document_id = $_POST['documentid'];
    $document_details = $api->get_data_details_one_parameter('document', $document_id);
    $document_name = str_replace('.', '', $document_details[0]['DOCUMENT_NAME']);
    $document_name = str_replace(' ', '_', $document_name);
    $document_path = $document_details[0]['DOCUMENT_PATH'];
    $document_extension = $document_details[0]['DOCUMENT_EXTENSION'];
    $temp_file_name = $document_path . '.dat';
    $actual_file_name = $document_path . '.' . $document_extension;
    if (file_exists($actual_file_name)) {
      unlink($actual_file_name);
    }
    if (copy($temp_file_name, $actual_file_name)) {
      $response[] = array(
        'LINK' => $actual_file_name,
        'FILE_NAME' => $document_name,
        'FILE_EXTENSION' => $document_extension // Add this line
      );
      echo json_encode($response);
    }
  }
}
    # -------------------------------------------------------------

    # Receive transmittal
    else if ($transaction == 'receive transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];

            $transmittal_details = $api->get_data_details_one_parameter('transmittal', $transmittal_id);
            $description = $transmittal_details[0]['DESCRIPTION'];
            $current_employee = $transmittal_details[0]['CURRENT_EMPLOYEE'];
            $current_department = $transmittal_details[0]['CURRENT_DEPARTMENT'];
            $transmitted_employee = $transmittal_details[0]['TRANSMITTED_EMPLOYEE'];
            $transmitted_department = $transmittal_details[0]['TRANSMITTED_DEPARTMENT'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_transmittal_status = $api->update_transmittal_status('1', $transmittal_id, $systemdate, $current_time, $username);

                if ($update_transmittal_status == '1') {
                    $insert_transmittal_history = $api->insert_transmittal_history($transmittal_id, '1', $current_employee, $current_department, $transmitted_employee, $transmitted_department, $systemdate, $current_time, $employee_id, $username);

                    if ($insert_transmittal_history == '1') {
                        $insert_system_notification = $api->insert_system_notification('Transmittal', $transmitted_employee, $current_employee, 'Transmittal', 'Your transmittal (' . $description . ') has been received.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Received';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $insert_transmittal_history;
                    }
                } else {
                    echo $update_transmittal_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # File transmittal
    else if ($transaction == 'file transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];

            $transmittal_details = $api->get_data_details_one_parameter('transmittal', $transmittal_id);
            $description = $transmittal_details[0]['DESCRIPTION'];
            $current_employee = $transmittal_details[0]['CURRENT_EMPLOYEE'];
            $current_department = $transmittal_details[0]['CURRENT_DEPARTMENT'];
            $transmitted_employee = $transmittal_details[0]['TRANSMITTED_EMPLOYEE'];
            $transmitted_department = $transmittal_details[0]['TRANSMITTED_DEPARTMENT'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_transmittal_status = $api->update_transmittal_status('3', $transmittal_id, $systemdate, $current_time, $username);

                if ($update_transmittal_status == '1') {
                    $insert_transmittal_history = $api->insert_transmittal_history($transmittal_id, '3', $current_employee, $current_department, $transmitted_employee, $transmitted_department, $systemdate, $current_time, $employee_id, $username);

                    if ($insert_transmittal_history == '1') {
                        $insert_system_notification = $api->insert_system_notification('Transmittal', $transmitted_employee, $current_employee, 'Transmittal', 'The transmittal (' . $description . ') has been filed.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Filed';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $insert_transmittal_history;
                    }
                } else {
                    echo $update_transmittal_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel transmittal
    else if ($transaction == 'cancel transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];

            $transmittal_details = $api->get_data_details_one_parameter('transmittal', $transmittal_id);
            $description = $transmittal_details[0]['DESCRIPTION'];
            $current_employee = $transmittal_details[0]['CURRENT_EMPLOYEE'];
            $current_department = $transmittal_details[0]['CURRENT_DEPARTMENT'];
            $transmitted_employee = $transmittal_details[0]['TRANSMITTED_EMPLOYEE'];
            $transmitted_department = $transmittal_details[0]['TRANSMITTED_DEPARTMENT'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_transmittal_status = $api->update_transmittal_status('4', $transmittal_id, $systemdate, $current_time, $username);

                if ($update_transmittal_status == '1') {
                    $insert_transmittal_history = $api->insert_transmittal_history($transmittal_id, '4', $current_employee, $current_department, $transmitted_employee, $transmitted_department, $systemdate, $current_time, $employee_id, $username);

                    if ($insert_transmittal_history == '1') {
                        $insert_system_notification = $api->insert_system_notification('Transmittal', $current_employee, $transmitted_employee, 'Transmittal', 'The transmittal (' . $description . ') has been cancelled.', $username);

                        if ($insert_system_notification == '1') {
                            echo 'Cancelled';
                        } else {
                            echo $insert_system_notification;
                        }
                    } else {
                        echo $insert_transmittal_history;
                    }
                } else {
                    echo $update_transmittal_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Re-transmit transmittal
    else if ($transaction == 'retransmit transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['transmittalid']) && !empty($_POST['transmittalid']) && isset($_POST['transmittaldepartment']) && !empty($_POST['transmittaldepartment']) && isset($_POST['priorityperson'])) {
            $username = $_POST['username'];
            $transmittal_id = $_POST['transmittalid'];
            $transmittal_department = $_POST['transmittaldepartment'];
            $priority_person = $_POST['priorityperson'];

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
            $employee_department = $employee_profile_details[0]['DEPARTMENT'];
            $department_details = $api->get_data_details_one_parameter('department', $employee_department);
            $employee_department_name = $department_details[0]['DEPARTMENT'] ?? null;

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('transmittal', $transmittal_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_transmittal_status = $api->update_transmittal_status('2', $transmittal_id, $systemdate, $current_time, $username);

                if ($update_transmittal_status == '1') {
                    $update_transmittal_person = $api->update_transmittal_person($employee_id, $employee_department, $priority_person, $transmittal_department, $transmittal_id, $username);

                    if ($update_transmittal_person == '1') {
                        $insert_transmittal_history = $api->insert_transmittal_history($transmittal_id, '2', $employee_id, $employee_department, $priority_person, $transmittal_department, $systemdate, $current_time, '', $username);

                        if ($insert_transmittal_history == '1') {
                            if (!empty($priority_person)) {
                                $insert_system_notification = $api->insert_system_notification('Transmittal', $employee_id, $priority_person, 'Transmittal', 'You have an incoming priority transmittal from ' . $employee_department_name . '.', $username);

                                if ($insert_system_notification == '1') {
                                    echo 'Re-Transmitted';
                                } else {
                                    echo $insert_system_notification;
                                }
                            } else {
                                $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Transmittal', 'Transmittal', $transmittal_department, '', $username);

                                if ($insert_system_notification_by_superior == '1') {
                                    echo 'Re-Transmitted';
                                } else {
                                    echo $insert_system_notification_by_superior;
                                }
                            }
                        } else {
                            echo $insert_transmittal_history;
                        }
                    } else {
                        echo $update_transmittal_person;
                    }
                } else {
                    echo $update_transmittal_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve suggest to win
    else if ($transaction == 'approve suggest to win') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid'])) {
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_suggest_to_win_status = $api->update_suggest_to_win_status('1', $stw_id, $approver_id, $username);

                if ($update_suggest_to_win_status == '1') {
                    $stw_details = $api->get_data_details_one_parameter('suggest to win', $stw_id);
                    $employee_id = $stw_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Approve Suggest To Win', $approver_id, $employee_id, 'Suggest To Win', 'Your suggest to win entry has been approved.', $username);

                    if ($insert_system_notification == '1') {
                        $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Suggest To Win Vote', '', '', $username);

                        if ($insert_system_notification_by_superior == '1') {
                            echo 'Approved';
                        } else {
                            echo $insert_system_notification_by_superior;
                        }
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_suggest_to_win_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject suggest to win
    else if ($transaction == 'reject suggest to win') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid'])) {
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_suggest_to_win_status = $api->update_suggest_to_win_status('2', $stw_id, $approver_id, $username);

                if ($update_suggest_to_win_status == '1') {
                    $stw_details = $api->get_data_details_one_parameter('suggest to win', $stw_id);
                    $employee_id = $stw_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Reject Suggest To Win', $approver_id, $employee_id, 'Suggest To Win', 'Your suggest to win entry has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_suggest_to_win_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel suggest to win
    else if ($transaction == 'cancel suggest to win') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['stwid']) && !empty($_POST['stwid'])) {
            $username = $_POST['username'];
            $stw_id = $_POST['stwid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('suggest to win', $stw_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_suggest_to_win_status = $api->update_suggest_to_win_status('3', $stw_id, $approver_id, $username);

                if ($update_suggest_to_win_status == '1') {
                    $stw_details = $api->get_data_details_one_parameter('suggest to win', $stw_id);
                    $employee_id = $stw_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Cancel Suggest To Win', $approver_id, $employee_id, 'Suggest To Win', 'Your suggest to win entry has been cancelled.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Cancelled';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_suggest_to_win_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Import transmittal
    else if ($transaction == 'import transmittal') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['transmittal_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $transmittal_file_name = $_FILES['transmittal_file']['name'];
            $transmittal_file_size = $_FILES['transmittal_file']['size'];
            $transmittal_file_error = $_FILES['transmittal_file']['error'];
            $transmittal_file_tmp_name = $_FILES['transmittal_file']['tmp_name'];
            $transmittal_file_ext = explode('.', $transmittal_file_name);
            $transmittal_file_actual_ext = strtolower(end($transmittal_file_ext));

            if (in_array($transmittal_file_actual_ext, $allowed_ext)) {
                if (!$transmittal_file_error) {
                    if ($transmittal_file_size < 2000000) {
                        $file = fopen($transmittal_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $transmittal_id = $column[0];
                            $description = $column[1];
                            $status = $column[2];
                            $current_employee = $column[3];
                            $current_department = $column[4];
                            $transmitted_employee = $column[5];
                            $transmitted_department = $column[6];
                            $last_transaction_date = $api->check_date('empty', $column[7], '', 'Y-m-d', '', '', '');
                            $last_transaction_time = $api->check_date('empty', $column[8], '', 'H:i:s', '', '', '');

                            $insert_transmittal_import = $api->insert_transmittal_import($transmittal_id, $description, $status, $current_employee, $current_department, $transmitted_employee, $transmitted_department, $last_transaction_date, $last_transaction_time, $username);

                            if ($insert_transmittal_import != '1') {
                                $error = $insert_transmittal_import;
                            }
                        }

                        if (empty($error)) {
                            $update_transmittal_parameter_number = $api->update_transmittal_parameter_number($username);

                            if ($update_transmittal_parameter_number == '1') {
                                echo 'Imported';
                            } else {
                                echo $update_transmittal_parameter_number;
                            }
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import transmittal history
    else if ($transaction == 'import transmittal history') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['transmittal_history_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $transmittal_history_file_name = $_FILES['transmittal_history_file']['name'];
            $transmittal_history_file_size = $_FILES['transmittal_history_file']['size'];
            $transmittal_history_file_error = $_FILES['transmittal_history_file']['error'];
            $transmittal_history_file_tmp_name = $_FILES['transmittal_history_file']['tmp_name'];
            $transmittal_history_file_ext = explode('.', $transmittal_history_file_name);
            $transmittal_history_file_actual_ext = strtolower(end($transmittal_history_file_ext));

            if (in_array($transmittal_history_file_actual_ext, $allowed_ext)) {
                if (!$transmittal_history_file_error) {
                    if ($transmittal_history_file_size < 2000000) {
                        $file = fopen($transmittal_history_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $transmittal_id = $column[0];
                            $transmittal_type = $column[1];
                            $employee_from = $column[2];
                            $department_from = $column[3];
                            $employee_to = $column[4];
                            $department_to = $column[5];
                            $transaction_date = $api->check_date('empty', $column[6], '', 'Y-m-d', '', '', '');
                            $transaction_time = $api->check_date('empty', $column[7], '', 'H:i:s', '', '', '');
                            $received_by = $column[8];

                            $insert_transmittal_history_import = $api->insert_transmittal_history_import($transmittal_id, $transmittal_type, $employee_from, $department_from, $employee_to, $department_to, $transaction_date, $transaction_time, $received_by, $username);

                            if ($insert_transmittal_history_import != '1') {
                                $error = $insert_transmittal_history_import;
                            }
                        }

                        if (empty($error)) {
                            echo 'Imported';
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import document
    else if ($transaction == 'import document') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['document_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $document_file_name = $_FILES['document_file']['name'];
            $document_file_size = $_FILES['document_file']['size'];
            $document_file_error = $_FILES['document_file']['error'];
            $document_file_tmp_name = $_FILES['document_file']['tmp_name'];
            $document_file_ext = explode('.', $document_file_name);
            $document_file_actual_ext = strtolower(end($document_file_ext));

            if (in_array($document_file_actual_ext, $allowed_ext)) {
                if (!$document_file_error) {
                    if ($document_file_size < 2000000) {
                        $file = fopen($document_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $document_id = $column[0];
                            $document_name = $column[1];
                            $author = $column[2];
                            $department = $column[3];
                            $document_path = $column[4];
                            $category = $column[5];
                            $extenstion = $column[6];
                            $size = $column[7];
                            $description = $column[8];
                            $upload_date = $api->check_date('empty', $column[9], '', 'Y-m-d', '', '', '');
                            $upload_time = $api->check_date('empty', $column[10], '', 'H:i:s', '', '', '');

                            $insert_document_import = $api->insert_document_import($document_id, $document_name, $author, $department, $document_path, $category, $extenstion, $size, $description, $upload_date, $upload_time, $employee_id, $systemdate, $current_time, $username);

                            if ($insert_document_import != '1') {
                                $error = $insert_document_import;
                            }
                        }

                        if (empty($error)) {
                            $update_document_management_parameter_number = $api->update_document_management_parameter_number($username);

                            if ($update_document_management_parameter_number == '1') {
                                echo 'Imported';
                            } else {
                                echo $update_document_management_parameter_number;
                            }
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import department document permissions
    else if ($transaction == 'import department document permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['department_permission_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $department_permission_file_name = $_FILES['department_permission_file']['name'];
            $department_permission_file_size = $_FILES['department_permission_file']['size'];
            $department_permission_file_error = $_FILES['department_permission_file']['error'];
            $department_permission_file_tmp_name = $_FILES['department_permission_file']['tmp_name'];
            $department_permission_file_ext = explode('.', $department_permission_file_name);
            $department_permission_file_actual_ext = strtolower(end($department_permission_file_ext));

            if (in_array($department_permission_file_actual_ext, $allowed_ext)) {
                if (!$department_permission_file_error) {
                    if ($department_permission_file_size < 2000000) {
                        $file = fopen($department_permission_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $document_id = $column[0];
                            $department = $column[1];
                            $permission = $column[2];

                            $insert_department_document_permission_import = $api->insert_department_document_permission_import($document_id, $department, $permission, $username);

                            if ($insert_department_document_permission_import != '1') {
                                $error = $insert_department_document_permission_import;
                            }
                        }

                        if (empty($error)) {
                            echo 'Imported';
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import employee document permissions
    else if ($transaction == 'import employee document permission') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['employee_permission_file']['name'])) {
            $error = '';
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $employee_permission_file_name = $_FILES['employee_permission_file']['name'];
            $employee_permission_file_size = $_FILES['employee_permission_file']['size'];
            $employee_permission_file_error = $_FILES['employee_permission_file']['error'];
            $employee_permission_file_tmp_name = $_FILES['employee_permission_file']['tmp_name'];
            $employee_permission_file_ext = explode('.', $employee_permission_file_name);
            $employee_permission_file_actual_ext = strtolower(end($employee_permission_file_ext));

            if (in_array($employee_permission_file_actual_ext, $allowed_ext)) {
                if (!$employee_permission_file_error) {
                    if ($employee_permission_file_size < 2000000) {
                        $file = fopen($employee_permission_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $document_id = $column[0];
                            $employee_id = $column[1];
                            $permission = $column[2];

                            $insert_employee_document_permission_import = $api->insert_employee_document_permission_import($document_id, $employee_id, $permission, $username);

                            if ($insert_employee_document_permission_import != '1') {
                                $error = $insert_employee_document_permission_import;
                            }
                        }

                        if (empty($error)) {
                            echo 'Imported';
                        } else {
                            echo $error;
                        }
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel training room log
    else if ($transaction == 'cancel training room log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training room log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $training_room_log_details = $api->get_data_details_one_parameter('training room log', $log_id);
                $employee_id = $training_room_log_details[0]['EMPLOYEE_ID'];

                $update_training_room_log_status = $api->update_training_room_log_status('3', $log_id, $approver_id, $username);

                if ($update_training_room_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Cancel Training Room Log', $approver_id, $employee_id, 'Training Room Log', 'Your training room log has been cancelled.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Cancelled';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_room_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve training room log
    else if ($transaction == 'approve training room log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training room log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $training_room_log_details = $api->get_data_details_one_parameter('training room log', $log_id);
                $employee_id = $training_room_log_details[0]['EMPLOYEE_ID'];

                $update_training_room_log_status = $api->update_training_room_log_status('1', $log_id, $approver_id, $username);

                if ($update_training_room_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Approve Training Room Log', $approver_id, $employee_id, 'Training Room Log', 'Your training room log has been approved.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Approved';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_room_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject training room log
    else if ($transaction == 'reject training room log') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['logid']) && !empty($_POST['logid'])) {
            $username = $_POST['username'];
            $log_id = $_POST['logid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training room log', $log_id);

            if ($check_data_exist_one_parameter == 1) {
                $training_room_log_details = $api->get_data_details_one_parameter('training room log', $log_id);
                $employee_id = $training_room_log_details[0]['EMPLOYEE_ID'];

                $update_training_room_log_status = $api->update_training_room_log_status('2', $log_id, $approver_id, $username);

                if ($update_training_room_log_status == '1') {
                    $insert_system_notification = $api->insert_system_notification('Reject Training Room Log', $approver_id, $employee_id, 'Training Room Log', 'Your training room log has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_room_log_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve weekly cash flow
    else if ($transaction == 'approve weekly cash flow') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow', $wcf_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_weekly_cash_flow_status = $api->update_weekly_cash_flow_status('1', $wcf_id, $employee_id, $username);

                if ($update_weekly_cash_flow_status == '1') {
                    echo 'Approved';
                } else {
                    echo $update_weekly_cash_flow_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Lock weekly cash flow
    else if ($transaction == 'lock weekly cash flow') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow', $wcf_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_weekly_cash_flow_status = $api->update_weekly_cash_flow_status('2', $wcf_id, $employee_id, $username);

                if ($update_weekly_cash_flow_status == '1') {
                    echo 'Locked';
                } else {
                    echo $update_weekly_cash_flow_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Unlock weekly cash flow
    else if ($transaction == 'unlock weekly cash flow') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['wcfid']) && !empty($_POST['wcfid'])) {
            $username = $_POST['username'];
            $wcf_id = $_POST['wcfid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('weekly cash flow', $wcf_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_weekly_cash_flow_status = $api->update_weekly_cash_flow_status('3', $wcf_id, $employee_id, $username);

                if ($update_weekly_cash_flow_status == '1') {
                    echo 'Unlocked';
                } else {
                    echo $update_weekly_cash_flow_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Accept ticket
    else if ($transaction == 'accept ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('1', $ticket_id, '', $username);

                if ($update_ticket_status == '1') {
                    $update_ticket_priority_person = $api->update_ticket_priority_person($employee_id, $ticket_id, $username);

                    if ($update_ticket_priority_person == '1') {
                        echo 'Accepted';
                    } else {
                        echo $update_ticket_priority_person;
                    }
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Tag ticket as solved
    else if ($transaction == 'tag ticket as solved') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('4', $ticket_id, '', $username);

                if ($update_ticket_status == '1') {
                    $get_ticket_auto_close_date_time = $api->get_ticket_auto_close_date_time($employee_id, 0, 4, $ticket_id);
                    $auto_close_date = $get_ticket_auto_close_date_time[0]['AUTO_CLOSE_DATE'];
                    $auto_close_time = $get_ticket_auto_close_date_time[0]['AUTO_CLOSE_TIME'];

                    $update_ticket_auto_close_details = $api->update_ticket_auto_close_details($ticket_id, $auto_close_date, $auto_close_time, $username);

                    if ($update_ticket_auto_close_details == '1') {
                        echo 'Solved';
                    } else {
                        echo $update_ticket_auto_close_details;
                    }
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------


    # Tag ticket as unsolved
    else if ($transaction == 'tag ticket as unsolved') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('5', $ticket_id, '', $username);

                if ($update_ticket_status == '1') {
                    $update_ticket_auto_close_details = $api->update_ticket_auto_close_details($ticket_id, null, null, $username);

                    if ($update_ticket_auto_close_details == '1') {
                        echo 'Unsolved';
                    } else {
                        echo $update_ticket_auto_close_details;
                    }
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Tag ticket as closed
    else if ($transaction == 'tag ticket as closed') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('6', $ticket_id, '', $username);

                if ($update_ticket_status == '1') {
                    echo 'Closed';
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Tag auto close ticket
    else if ($transaction == 'tag auto close ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['auto_close_reason']) && !empty($_POST['auto_close_reason'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $auto_close_reason = $_POST['auto_close_reason'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('6', $ticket_id, '', $username);

                if ($update_ticket_status == '1') {
                    $update_ticket_auto_close_reason = $api->update_ticket_auto_close_reason($ticket_id, $auto_close_reason, $username);

                    if ($update_ticket_auto_close_reason == '1') {
                        echo 'Closed';
                    } else {
                        echo $update_ticket_auto_close_reason;
                    }
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject ticket
    else if ($transaction == 'reject ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $reason = $_POST['reason'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('2', $ticket_id, $reason, $username);

                if ($update_ticket_status == '1') {
                    echo 'Rejected';
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel ticket
    else if ($transaction == 'cancel ticket') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $ticket_id = $_POST['ticketid'];
            $reason = $_POST['reason'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket', $ticket_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_status = $api->update_ticket_status('3', $ticket_id, $reason, $username);

                if ($update_ticket_status == '1') {
                    echo 'Cancelled';
                } else {
                    echo $update_ticket_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel ticket adjustment
    else if ($transaction == 'cancel ticket adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_adjustment_status = $api->update_ticket_adjustment_status('3', $adjustment_id, $employee_id, $username);

                if ($update_ticket_adjustment_status == '1') {
                    echo 'Cancelled';
                } else {
                    echo $update_ticket_adjustment_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve ticket adjustment
    else if ($transaction == 'approve ticket adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_details = $api->update_ticket_details($adjustment_id, $username);

                if ($update_ticket_details == '1') {
                    $update_ticket_adjustment_status = $api->update_ticket_adjustment_status('1', $adjustment_id, $employee_id, $username);

                    if ($update_ticket_adjustment_status == '1') {
                        echo 'Approved';
                    } else {
                        echo $update_ticket_adjustment_status;
                    }
                } else {
                    echo $update_ticket_details;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject ticket adjustment
    else if ($transaction == 'reject ticket adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('ticket adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_ticket_adjustment_status = $api->update_ticket_adjustment_status('2', $adjustment_id, $employee_id, $username);

                if ($update_ticket_adjustment_status == '1') {
                    echo 'Rejected';
                } else {
                    echo $update_ticket_adjustment_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # umentall notification status
    else if ($transaction == 'update all notification status') {
        if (isset($_POST['username']) && !empty($_POST['username'])) {
            $username = $_POST['username'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $update_all_notification_status = $api->update_all_notification_status('1', $employee_id, $username);

            if ($update_all_notification_status == '1') {
                echo '1';
            } else {
                echo $update_all_notification_status;
            }
        }
    }
    # -------------------------------------------------------------

    # Notification count
    else if ($transaction == 'notification count') {
        if (isset($_POST['username']) && !empty($_POST['username'])) {
            $username = $_POST['username'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            echo $api->get_unread_notifications_count($employee_id);
        }
    }
    # -------------------------------------------------------------

    # Approve meeting
    else if ($transaction == 'approve meeting') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_meeting_status = $api->update_meeting_status('1', $meeting_id, $approver_id, $username);

                if ($update_meeting_status == '1') {
                    $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Meeting Attendees', 'Approve Meeting', '', $meeting_id, $username);

                    if ($insert_system_notification_by_superior == '1') {
                        echo 'Approved';
                    } else {
                        echo $insert_system_notification_by_superior;
                    }
                } else {
                    echo $update_meeting_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Tag meeting as submitted
    else if ($transaction == 'tag meeting as submitted') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_meeting_status = $api->update_meeting_status('2', $meeting_id, $approver_id, $username);

                if ($update_meeting_status == '1') {
                    $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Meeting Attendees', 'Tag Meeting As Submitted', '', $meeting_id, $username);

                    if ($insert_system_notification_by_superior == '1') {
                        echo 'Approved';
                    } else {
                        echo $insert_system_notification_by_superior;
                    }
                } else {
                    echo $update_meeting_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Pending meeting
    else if ($transaction == 'pending meeting') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $username = $_POST['username'];
            $meeting_id = $_POST['meetingid'];
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('meeting', $meeting_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_meeting_status = $api->update_meeting_status('0', $meeting_id, $approver_id, $username);

                if ($update_meeting_status == '1') {
                    echo 'Pending';
                } else {
                    echo $update_meeting_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Recommend training
    else if ($transaction == 'recommend training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('1', $training_id, '', $username);

                if ($update_training_status == '1') {
                    $insert_system_notification_by_hr_head = $api->insert_system_notification_by_type('HR Head', 'Training Recommendation', $training_id, '', $username);

                    if ($insert_system_notification_by_hr_head == '1') {
                        echo 'Recommended';
                    } else {
                        echo $insert_system_notification_by_hr_head;
                    }
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------
    else if ($transaction == 'reject overtime') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['overtimeid']) && !empty($_POST['overtimeid']) && isset($_POST['reason_cancellation']) && !empty($_POST['reason_cancellation'])) {
            $username = $_POST['username'];
            $overtime_id = $_POST['overtimeid'];
            $reason_cancellation = $_POST['reason_cancellation'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_overtime_status = $api->update_overtime_status('3', $overtime_id, $reason_cancellation, $username);

                if ($update_overtime_status == '1') {
                    $overtime_details = $api->get_data_details_one_parameter('overtime', $overtime_id);
                    $title = $overtime_details[0]['TITLE'];
                    $employee_id = $overtime_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification ('Your overtime (' . $title . ') has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                        echo 'The overtime has been rejected, ' . $username . '.';

                }
            } else {
                echo 'Not Found';
            }
        }
    }
    
    else if ($transaction == 'recommend overtime') {
        // Debug logging
         
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['overtimeid']) && !empty($_POST['overtimeid'])) {
            $username = $_POST['username'];
            $overtime_id = $_POST['overtimeid'];
            
            // Log the values being used
             
            // Fixed parameter: Change 'overtimeid' to 'overtime'
            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);
            error_log("Check data exist result: $check_data_exist_one_parameter");
            
            if ($check_data_exist_one_parameter == 1) {
                $update_overtime_status = $api->update_overtime_status('1', $overtime_id, '', $username);
                error_log("Update overtime status result: $update_overtime_status");
                
                if ($update_overtime_status == '1') {
                    // Added missing response
                    echo 'Recommended';
                } else {
                 echo 'The overtime has been recommended, ' . $username . '.';

                }
            } else {
                echo 'Not Found';
            }
        } else {
            // Handle missing parameters
            echo 'Missing Required Parameters';
        }
    }
    
    
      # Reject overtime
       else if ($transaction == 'reject training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $reason = $_POST['reason_cancellation'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('3', $training_id, $reason, $username);

                if ($update_training_status == '1') {
                    $training_details = $api->get_data_details_one_parameter('training', $training_id);
                    $title = $training_details[0]['TITLE'];
                    $employee_id = $training_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Reject Training', $approver_id, $employee_id, 'Training', 'Your training (' . $title . ') has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    
    
    else if ($transaction == 'approve overtime') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['overtimeid']) && !empty($_POST['overtimeid'])) {
            $username = $_POST['username'];
            $overtime_id = $_POST['overtimeid'];
    
            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];
    
            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);
    
            if ($check_data_exist_one_parameter == 1) {
                $update_overtime_status = $api->update_overtime_status('2', $overtime_id, '', $username);
    
                if ($update_overtime_status == '1') {
                    // Get overtime details
                    $overtime_details = $api->get_data_details_one_parameter('overtime', $overtime_id);
                    $title = isset($overtime_details[0]['TITLE']) ? $overtime_details[0]['TITLE'] : '';
                    $employee_id = isset($overtime_details[0]['EMPLOYEE_ID']) ? $overtime_details[0]['EMPLOYEE_ID'] : '';
                    
                    // Return "Approved" on success - THIS IS THE KEY FIX
                    echo 'Approved';
                } else {
                    echo $update_overtime_status;
                }
            } else {
                echo 'Not Found';
            }
        } else {
            echo 'Missing required parameters';
        }
    }

    
       else if ($transaction == 'cancel overtime') {
            
        error_log("Cancel Overtime Request: " . json_encode($_POST));

        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['overtimeid']) && !empty($_POST['overtimeid']) && isset($_POST['reason_cancellation']) && !empty($_POST['reason_cancellation'])) {
           

            $username = $_POST['username'];
            $overtime_id = $_POST['overtimeid'];
             $reason = $_POST['reason_cancellation'];
            
             error_log("Username: $username, Overtime ID: $overtime_id, Reason: $reason_cancellation");

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);
            error_log("Check data exist result: $check_data_exist_one_parameter");


            if ($check_data_exist_one_parameter == 1) {
                $update_overtime_status = $api->update_overtime_status('4', $overtime_id, $reason_cancellation, $username);

                if ($update_overtime_status == '1') {
                    echo 'Cancelled';
                } else {
                    echo $update_overtime_status;
                }
            } else {
               error_log("Check data exist result: $check_data_exist_one_parameter");
                
            }
        }
    }
    
    
    
    # -------------------------------------------------------------
    
        else if ($transaction == 'delete overtime') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['overtimeid']) && !empty($_POST['overtimeid'])) {
            $username = $_POST['username'];
            $overtime_id = $_POST['overtimeid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);

            if ($check_data_exist_one_parameter == 1) {
                $delete_overtime = $api->delete_overtime($overtime_id, $username);

                if ($delete_overtime == '1') {
                    echo 'Deleted';
                } else {
                    echo $delete_overtime;
                }
            } else {
                echo 'Not Found';
            }
        }
    }



    # Approve training
    else if ($transaction == 'approve training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('2', $training_id, '', $username);

                if ($update_training_status == '1') {
                    $training_details = $api->get_data_details_one_parameter('training', $training_id);
                    $title = $training_details[0]['TITLE'];
                    $employee_id = $training_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Approve Training', $approver_id, $employee_id, 'Training', 'Your training (' . $title . ') has been approved.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Approved';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject training
    else if ($transaction == 'reject training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $reason = $_POST['reason'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $approver_id = $employee_details[0]['EMPLOYEE_ID'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('3', $training_id, $reason, $username);

                if ($update_training_status == '1') {
                    $training_details = $api->get_data_details_one_parameter('training', $training_id);
                    $title = $training_details[0]['TITLE'];
                    $employee_id = $training_details[0]['EMPLOYEE_ID'];

                    $insert_system_notification = $api->insert_system_notification('Reject Training', $approver_id, $employee_id, 'Training', 'Your training (' . $title . ') has been rejected.', $username);

                    if ($insert_system_notification == '1') {
                        echo 'Rejected';
                    } else {
                        echo $insert_system_notification;
                    }
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel training
    else if ($transaction == 'cancel training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['reason']) && !empty($_POST['reason'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];
            $reason = $_POST['reason'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('4', $training_id, $reason, $username);

                if ($update_training_status == '1') {
                    echo 'Cancelled';
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    
     

    # Employee department selection
    else if ($transaction == 'employee department selection') {
        if (isset($_POST['employee_id']) && !empty($_POST['employee_id'])) {
            $employee_id = $_POST['employee_id'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $employee_id);

            echo $employee_profile_details[0]['DEPARTMENT'];
        }
    }
    # -------------------------------------------------------------

    # Unlock training
    else if ($transaction == 'unlock training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('6', $training_id, '', $username);

                if ($update_training_status == '1') {
                    echo 'Unlocked';
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Lock training
    else if ($transaction == 'lock training') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $username = $_POST['username'];
            $training_id = $_POST['trainingid'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('training', $training_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_training_status = $api->update_training_status('5', $training_id, '', $username);

                if ($update_training_status == '1') {
                    echo 'Locked';
                } else {
                    echo $update_training_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Calculate payment due calculator
    else if ($transaction == 'calculate payment due calculator') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['payment_date']) && !empty($_POST['payment_date'])) {
            $username = $_POST['username'];
            $payment_date = $api->check_date('empty', $_POST['payment_date'], '', 'Y-m-d', '', '', '');
            $total_penalty = 0;
            $total_charges = 0;
            $total_dues = 0;

            if (isset($_POST['repayments']) && count($_POST['repayments']) > 0) {
                for ($i = 0; $i < count($_POST['repayments']); $i++) {
                    if (!empty($_POST['repayments'][$i]['repayment_amount']) && !empty($_POST['repayments'][$i]['due_date'])) {
                        $repayment_amount = $_POST['repayments'][$i]['repayment_amount'];
                        $due_date = $api->check_date('empty', $_POST['repayments'][$i]['due_date'], '', 'Y-m-d', '', '', '');
                        $total_charge = $_POST['repayments'][$i]['total_charge'];
                        $days_diff = abs(round(strtotime($payment_date) - strtotime($due_date)) / 86400);

                        $penalty = ($repayment_amount * ($days_diff / 30)) * .1;
                        $due = $repayment_amount + $penalty + $total_charge;

                        $total_penalty = $total_penalty + $penalty;
                        $total_charges = $total_charges + $total_charge;
                        $total_dues = $total_dues + $due;
                    } else {
                        $total_penalty = $total_penalty + 0;
                        $total_charges = $total_charges + 0;
                        $total_dues = $total_dues + 0;
                    }
                }
            }

            $response[] = array(
                'RESPONSE' => 'Calculated',
                'PENALTY' => number_format($total_penalty, 2),
                'CHARGES' => number_format($total_charges, 2),
                'DUES' => number_format($total_dues, 2)
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Calculate rate
    else if ($transaction == 'calculate rate') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['amtfin']) && !empty($_POST['amtfin']) && isset($_POST['repayment_amount']) && !empty($_POST['repayment_amount']) && isset($_POST['term']) && !empty($_POST['term']) && isset($_POST['frequency']) && !empty($_POST['frequency'])) {
            define('FINANCIAL_MAX_ITERATIONS', 128);
            define('FINANCIAL_PRECISION', 1.0e-08);

            function RATE($nper, $pmt, $pv, $fv = 0.0, $type = 0, $guess = 0.1)
            {
                $rate = $guess;
                if (abs($rate) < FINANCIAL_PRECISION) {
                    $y = $pv * (1 + $nper * $rate) + $pmt * (1 + $rate * $type) * $nper + $fv;
                } else {
                    $f = exp($nper * log(1 + $rate));
                    $y = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
                }
                $y0 = $pv + $pmt * $nper + $fv;
                $y1 = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
                $i = $x0 = 0.0;
                $x1 = $rate;
                while ((abs($y0 - $y1) > FINANCIAL_PRECISION) && ($i < FINANCIAL_MAX_ITERATIONS)) {
                    $rate = ($y1 * $x0 - $y0 * $x1) / ($y1 - $y0);
                    $x0 = $x1;
                    $x1 = $rate;
                    if (abs($rate) < FINANCIAL_PRECISION) {
                        $y = $pv * (1 + $nper * $rate) + $pmt * (1 + $rate * $type) * $nper + $fv;
                    } else {
                        $f = exp($nper * log(1 + $rate));
                        $y = $pv * $f + $pmt * (1 / $rate + $type) * ($f - 1) + $fv;
                    }
                    $y0 = $y1;
                    $y1 = $y;
                    ++$i;
                }
                return $rate;
            }

            $irr_helper = new IRRHelper;

            $username = $_POST['username'];
            $amtfin = $_POST['amtfin'];
            $repayment_amount = $_POST['repayment_amount'];
            $term = $_POST['term'];
            $frequency = $_POST['frequency'];
            $fee_total = 0;
            $irr = 0;
            $cr = 0;

            if (isset($_POST['fees']) && count($_POST['fees']) > 0) {
                for ($i = 0; $i < count($_POST['fees']); $i++) {
                    if (!empty($_POST['fees'][$i]['fee_amount'])) {
                        $fee_amount = $_POST['fees'][$i]['fee_amount'];

                        $fee_total = $fee_total + $fee_amount;
                    } else {
                        $fee_total = $fee_total + 0;
                    }
                }
            }

            $total = $amtfin - $fee_total;
            $flow = array($total);

            if ($frequency == 'H') {
                $term = $term * 2;
                $fix = 24;
                $mrate = 24;

                for ($x = 0; $x < $term; $x++) {
                    array_push($flow, '-' . $repayment_amount);
                }

                $irr = number_format(((pow((1 + $irr_helper->IRR($flow)), $fix) - 1) * 100), 6);
            } else {
                $fix = 12;
                $mrate = 12;

                for ($x = 0; $x < $term; $x++) {
                    array_push($flow, '-' . $repayment_amount);
                }

                $irr = number_format(((pow((1 + $irr_helper->IRR($flow)), $fix) - 1) * 100), 6);
            }

            $cr = ((RATE($term, '-' . $repayment_amount, $amtfin) * 100) * $mrate);

            $response[] = array(
                'RESPONSE' => 'Calculated',
                'IRR' => $irr,
                'CR' => number_format($cr, 2)
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Import car search parameter
    else if ($transaction == 'import car search parameter') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['car_search_parameter_file']['name'])) {
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $car_search_parameter_file_name = $_FILES['car_search_parameter_file']['name'];
            $car_search_parameter_file_size = $_FILES['car_search_parameter_file']['size'];
            $car_search_parameter_file_error = $_FILES['car_search_parameter_file']['error'];
            $car_search_parameter_file_tmp_name = $_FILES['car_search_parameter_file']['tmp_name'];
            $car_search_parameter_file_ext = explode('.', $car_search_parameter_file_name);
            $car_search_parameter_file_actual_ext = strtolower(end($car_search_parameter_file_ext));

            if (in_array($car_search_parameter_file_actual_ext, $allowed_ext)) {
                if (!$car_search_parameter_file_error) {
                    if ($car_search_parameter_file_size < 2000000) {
                        $file = fopen($car_search_parameter_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $parameter_code = $column[0];
                            $parameter_value = $column[1];
                            $category_type = $column[2];

                            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('car search parameter', $parameter_code);

                            if ($check_data_exist_one_parameter > 0) {
                                $update_car_search_parameter = $api->update_car_search_parameter_with_code($parameter_value, $category_type, $parameter_code, $username);
                            } else {
                                $insert_car_search_parameter = $api->insert_car_search_parameter($parameter_code, $parameter_value, $category_type, $username);
                            }
                        }

                        echo 'Imported';
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import price index item
    else if ($transaction == 'import price index item') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['price_index_item_file']['name'])) {
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $price_index_item_file_name = $_FILES['price_index_item_file']['name'];
            $price_index_item_file_size = $_FILES['price_index_item_file']['size'];
            $price_index_item_file_error = $_FILES['price_index_item_file']['error'];
            $price_index_item_file_tmp_name = $_FILES['price_index_item_file']['tmp_name'];
            $price_index_item_file_ext = explode('.', $price_index_item_file_name);
            $price_index_item_file_actual_ext = strtolower(end($price_index_item_file_ext));

            if (in_array($price_index_item_file_actual_ext, $allowed_ext)) {
                if (!$price_index_item_file_error) {
                    if ($price_index_item_file_size < 2000000) {
                        $file = fopen($price_index_item_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $item_id = $column[0];

                            if (!empty($column[1])) {
                                $brand = $api->get_data_details_two_parameter('car search parameter value', 'BRAND', $column[1])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $brand = null;
                            }

                            if (!empty($column[2])) {
                                $model = $api->get_data_details_two_parameter('car search parameter value', 'MODEL', $column[2])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $model = null;
                            }


                            if (!empty($column[3])) {
                                $variant = $api->get_data_details_two_parameter('car search parameter value', 'VARIANT', $column[3])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $variant = null;
                            }

                            if (!empty($column[4])) {
                                $engine_size = $api->get_data_details_two_parameter('car search parameter value', 'ENGINESIZE', $column[4])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $engine_size = null;
                            }

                            if (!empty($column[5])) {
                                $gas_type = $api->get_data_details_two_parameter('car search parameter value', 'GASTYPE', $column[5])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $gas_type = null;
                            }

                            if (!empty($column[6])) {
                                $transmission = $api->get_data_details_two_parameter('car search parameter value', 'TRANSMISSION', $column[6])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $transmission = null;
                            }

                            if (!empty($column[7])) {
                                $drive_train = $api->get_data_details_two_parameter('car search parameter value', 'DRIVETRAIN', $column[7])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $drive_train = null;
                            }

                            if (!empty($column[8])) {
                                $body_type = $api->get_data_details_two_parameter('car search parameter value', 'BODYTYPE', $column[8])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $body_type = null;
                            }

                            if (!empty($column[9])) {
                                $seating_capacity = $api->get_data_details_two_parameter('car search parameter value', 'SEATINGCAPACITY', $column[9])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $seating_capacity = null;
                            }

                            if (!empty($column[10])) {
                                $camshaft_profile = $api->get_data_details_two_parameter('car search parameter value', 'CAMSHAFTPROFILE', $column[10])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $camshaft_profile = null;
                            }

                            if (!empty($column[11])) {
                                $color_type = $api->get_data_details_two_parameter('car search parameter value', 'COLORTYPE', $column[11])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $color_type = null;
                            }

                            if (!empty($column[12])) {
                                $aircon_type = $api->get_data_details_two_parameter('car search parameter value', 'AIRCONTYPE', $column[12])[0]['PARAMETER_CODE'] ?? null;
                            } else {
                                $aircon_type = null;
                            }

                            $other_information = $column[13];

                            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index item', $item_id);

                            if ($check_data_exist_one_parameter > 0) {
                                $update_price_index_item = $api->update_price_index_item($brand, $model, $variant, $engine_size, $gas_type, $transmission, $drive_train, $body_type, $seating_capacity, $camshaft_profile, $color_type, $aircon_type, $other_information, $item_id, $username);
                            } else {
                                $insert_imported_price_index_item = $api->insert_imported_price_index_item($item_id, $brand, $model, $variant, $engine_size, $gas_type, $transmission, $drive_train, $body_type, $seating_capacity, $camshaft_profile, $color_type, $aircon_type, $other_information, $username);
                            }
                        }

                        echo 'Imported';
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Import price index amount
    else if ($transaction == 'import price index amount') {
        if (isset($_POST['username']) && !empty($_POST['username']) && !empty($_FILES['price_index_amount_file']['name'])) {
            $username = $_POST['username'];
            $allowed_ext = array('csv');

            $price_index_amount_file_name = $_FILES['price_index_amount_file']['name'];
            $price_index_amount_file_size = $_FILES['price_index_amount_file']['size'];
            $price_index_amount_file_error = $_FILES['price_index_amount_file']['error'];
            $price_index_amount_file_tmp_name = $_FILES['price_index_amount_file']['tmp_name'];
            $price_index_amount_file_ext = explode('.', $price_index_amount_file_name);
            $price_index_amount_file_actual_ext = strtolower(end($price_index_amount_file_ext));

            if (in_array($price_index_amount_file_actual_ext, $allowed_ext)) {
                if (!$price_index_amount_file_error) {
                    if ($price_index_amount_file_size < 2000000) {
                        $file = fopen($price_index_amount_file_tmp_name, 'r');
                        fgetcsv($file);

                        while (($column = fgetcsv($file, 0, ',')) !== FALSE) {
                            $item_id = $column[0];
                            $year = $column[2];
                            $amount = $column[3];

                            $check_data_exist_two_parameter = $api->check_data_exist_two_parameter('price index item amount', $item_id, $year);

                            if ($check_data_exist_two_parameter > 0) {
                                $update_price_index_amount = $api->update_price_index_amount($item_id, $year, $amount, $systemdate, $current_time, $username);
                            } else {
                                $insert_price_index_amount = $api->insert_price_index_amount($item_id, $year, $amount, $systemdate, $current_time, $username);
                            }
                        }

                        echo 'Imported';
                    } else {
                        echo 'File Size';
                    }
                } else {
                    echo 'There was an error uploading the file.';
                }
            } else {
                echo 'File Type';
            }
        }
    }
    # -------------------------------------------------------------

    # Cancel price index amount adjustment request
    else if ($transaction == 'cancel price index amount adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index amount adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {

                $update_price_index_amount_adjustment_status = $api->update_price_index_amount_adjustment_status('3', $remarks, $adjustment_id, $username);

                if ($update_price_index_amount_adjustment_status == '1') {
                    echo 'Cancelled';
                } else {
                    echo $update_price_index_amount_adjustment_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Reject price index amount adjustment request
    else if ($transaction == 'reject price index amount adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index amount adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $update_price_index_amount_adjustment_status = $api->update_price_index_amount_adjustment_status('2', $remarks, $adjustment_id, $username);

                if ($update_price_index_amount_adjustment_status == '1') {
                    echo 'Rejected';
                } else {
                    echo $update_price_index_amount_adjustment_status;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # Approve price index amount adjustment request
    else if ($transaction == 'approve price index amount adjustment') {
        if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid']) && isset($_POST['remarks'])) {
            $username = $_POST['username'];
            $adjustment_id = $_POST['adjustmentid'];
            $remarks = $_POST['remarks'];

            $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('price index amount adjustment', $adjustment_id);

            if ($check_data_exist_one_parameter == 1) {
                $price_index_amount_adjustment_details = $api->get_data_details_one_parameter('price index amount adjustment', $adjustment_id);
                $item_id = $price_index_amount_adjustment_details[0]['ITEM_ID'];
                $year_model = $price_index_amount_adjustment_details[0]['YEAR_MODEL'];
                $proposed_item_value = $price_index_amount_adjustment_details[0]['PROPOSED_ITEM_VALUE'];

                $update_price_index_amount = $api->update_price_index_amount($item_id, $year_model, $proposed_item_value, $systemdate, $current_time, $username);

                if ($update_price_index_amount == '1') {
                    $update_price_index_amount_adjustment_status = $api->update_price_index_amount_adjustment_status('1', $remarks, $adjustment_id, $username);

                    if ($update_price_index_amount_adjustment_status == '1') {
                        echo 'Approved';
                    } else {
                        echo $update_price_index_amount_adjustment_status;
                    }
                } else {
                    echo $update_price_index_amount;
                }
            } else {
                echo 'Not Found';
            }
        }
    }
    # -------------------------------------------------------------

    # -------------------------------------------------------------
    #   Get details functions
    # -------------------------------------------------------------

    # Page details
    else if ($transaction == 'page details') {
        if (isset($_POST['pageid']) && !empty($_POST['pageid'])) {
            $page_id = $_POST['pageid'];
            $page_details = $api->get_data_details_one_parameter('page', $page_id);

            $response[] = array(
                'PAGE_NAME' => $page_details[0]['PAGE_NAME']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Permission details
    else if ($transaction == 'permission details') {
        if (isset($_POST['permissionid']) && !empty($_POST['permissionid'])) {
            $permissionid = $_POST['permissionid'];
            $permission_details = $api->get_data_details_one_parameter('permission', $permissionid);

            $response[] = array(
                'PAGE_ID' => $permission_details[0]['PAGE_ID'],
                'PERMISSION_DESC' => $permission_details[0]['PERMISSION_DESC']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # System parameter details
    else if ($transaction == 'system parameter details') {
        if (isset($_POST['parameterid']) && !empty($_POST['parameterid'])) {
            $parameterid = $_POST['parameterid'];
            $system_parameter_details = $api->get_data_details_one_parameter('system parameter', $parameterid);

            $response[] = array(
                'PARAMETER_DESC' => $system_parameter_details[0]['PARAMETER_DESC'],
                'PARAMETER_EXTENSION' => $system_parameter_details[0]['PARAMETER_EXTENSION'],
                'PARAMETER_NUMBER' => $system_parameter_details[0]['PARAMETER_NUMBER']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # System code details
    else if ($transaction == 'system code details') {
        if (isset($_POST['systemtype']) && !empty($_POST['systemtype']) && isset($_POST['systemcode']) && !empty($_POST['systemcode'])) {
            $systemtype = $_POST['systemtype'];
            $systemcode = $_POST['systemcode'];

            $system_code_details = $api->get_data_details_two_parameter('system code', $systemtype, $systemcode);

            $response[] = array(
                'SYSTEM_DESC' => $system_code_details[0]['SYSTEM_DESC']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get role details
    else if ($transaction == 'role details') {
        if (isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $role_id = $_POST['roleid'];
            $role_details = $api->get_data_details_one_parameter('role', $role_id);

            $response[] = array(
                'ROLE_DESC' => $role_details[0]['ROLE_DESC']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get company details
    else if ($transaction == 'company details') {
        if (isset($_POST['companyid']) && !empty($_POST['companyid'])) {
            $company_id = $_POST['companyid'];
            $company_details = $api->get_data_details_one_parameter('company', $company_id);

            $response[] = array(
                'COMPANY_NAME' => $company_details[0]['COMPANY_NAME'],
                'EMAIL' => $company_details[0]['EMAIL'],
                'PHONE' => $company_details[0]['PHONE'],
                'TELEPHONE' => $company_details[0]['TELEPHONE'],
                'WEBSITE' => $company_details[0]['WEBSITE'],
                'ADDRESS' => $company_details[0]['ADDRESS'],
                'WORKING_DAYS' => $company_details[0]['WORKING_DAYS'],
                'START_WORKING_HOURS' => $company_details[0]['START_WORKING_HOURS'],
                'END_WORKING_HOURS' => $company_details[0]['END_WORKING_HOURS'],
                'START_LUNCH_BREAK' => $company_details[0]['START_LUNCH_BREAK'],
                'END_LUNCH_BREAK' => $company_details[0]['END_LUNCH_BREAK'],
                'MONTHLY_WORKING_DAYS' => $company_details[0]['MONTHLY_WORKING_DAYS'],
                'HALF_DAY_MARK' => $company_details[0]['HALF_DAY_MARK'],
                'LATE_MARK' => $company_details[0]['LATE_MARK'],
                'MAX_CLOCK_IN' => $company_details[0]['MAX_CLOCK_IN'],
                'HEALTH_DECLARATION' => $company_details[0]['HEALTH_DECLARATION']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get role permission details
    else if ($transaction == 'role permission details') {
        if (isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $role_id = $_POST['roleid'];
            $role_permission_details = $api->get_data_details_one_parameter('role permission', $role_id);
            $response = array();

            for ($i = 0; $i < count($role_permission_details); $i++) {
                array_push($response, $role_permission_details[$i]['PERMISSION_ID']);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get role user details
    else if ($transaction == 'role user details') {
        if (isset($_POST['roleid']) && !empty($_POST['roleid'])) {
            $role_id = $_POST['roleid'];
            $role_user_details = $api->get_data_details_one_parameter('role user', $role_id);
            $response = array();

            for ($i = 0; $i < count($role_user_details); $i++) {
                array_push($response, $role_user_details[$i]['USERNAME']);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get profile details
    else if ($transaction == 'profile details') {
        if (isset($_POST['username']) && !empty($_POST['username'])) {
            $username = $_POST['username'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);

            $response[] = array(
                'FIRST_NAME' => $employee_profile_details[0]['FIRST_NAME'],
                'MIDDLE_NAME' => $employee_profile_details[0]['MIDDLE_NAME'],
                'LAST_NAME' => $employee_profile_details[0]['LAST_NAME'],
                'BIRTHDAY' => $employee_profile_details[0]['BIRTHDAY'],
                'EMAIL' => $employee_profile_details[0]['EMAIL'],
                'PHONE' => $employee_profile_details[0]['PHONE'],
                'TELEPHONE' => $employee_profile_details[0]['TELEPHONE'],
                'ADDRESS' => $employee_profile_details[0]['ADDRESS'],
                'GENDER' => $employee_profile_details[0]['GENDER'],
                'SUFFIX' => $employee_profile_details[0]['SUFFIX'],
                'PROFILE_IMAGE' => $employee_profile_details[0]['PROFILE_IMAGE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get application settings details
    else if ($transaction == 'application settings details') {
        if (isset($_POST['settingsid']) && !empty($_POST['settingsid'])) {
            $settings_id = $_POST['settingsid'];
            $application_settings_details = $api->get_data_details_one_parameter('application settings', $settings_id);

            $response[] = array(
                'LOGIN_BG' => $application_settings_details[0]['LOGIN_BG'],
                'LOGO_LIGHT' => $application_settings_details[0]['LOGO_LIGHT'],
                'LOGO_DARK' => $application_settings_details[0]['LOGO_DARK'],
                'LOGO_ICON_LIGHT' => $application_settings_details[0]['LOGO_ICON_LIGHT'],
                'LOGO_ICON_DARK' => $application_settings_details[0]['LOGO_ICON_DARK'],
                'FAVICON' => $application_settings_details[0]['FAVICON'],
                'CURRENCY' => $application_settings_details[0]['CURRENCY'],
                'TIMEZONE' => $application_settings_details[0]['TIMEZONE'],
                'DATE_FORMAT' => $application_settings_details[0]['DATE_FORMAT'],
                'TIME_FORMAT' => $application_settings_details[0]['TIME_FORMAT']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get employee details
    else if ($transaction == 'employee details') {
        if (isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $subordinate = '';
            $authorizer = '';
            $employee_id = $_POST['employeeid'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $employee_id);
            $employee_superior_details = $api->get_data_details_one_parameter('employee superior', $employee_id);
            $employee_subordinate_details = $api->get_data_details_one_parameter('employee subordinate', $employee_id);
            $employee_authorizer_details = $api->get_data_details_one_parameter('employee authorizer', $employee_id);

            for ($i = 0; $i < count($employee_subordinate_details); $i++) {
                $subordinate .= $employee_subordinate_details[$i]['SUBORDINATE_ID'];

                if ($i != (count($employee_subordinate_details) - 1)) {
                    $subordinate .= ',';
                }
            }

            for ($i = 0; $i < count($employee_authorizer_details); $i++) {
                $authorizer .= $employee_authorizer_details[$i]['AUTHORIZER_ID'];

                if ($i != (count($employee_authorizer_details) - 1)) {
                    $authorizer .= ',';
                }
            }

            $response[] = array(
                'ID_NUMBER' => $employee_profile_details[0]['ID_NUMBER'],
                'FIRST_NAME' => $employee_profile_details[0]['FIRST_NAME'],
                'LAST_NAME' => $employee_profile_details[0]['LAST_NAME'],
                'MIDDLE_NAME' => $employee_profile_details[0]['MIDDLE_NAME'],
                'SUFFIX' => $employee_profile_details[0]['SUFFIX'],
                'JOIN_DATE' => $employee_profile_details[0]['JOIN_DATE'],
                'PERMANENT_DATE' => $api->check_date('empty', $employee_profile_details[0]['PERMANENT_DATE'], '', 'm/d/Y', '', '', ''),
                'EXIT_DATE' => $api->check_date('empty', $employee_profile_details[0]['EXIT_DATE'], '', 'm/d/Y', '', '', ''),
                'PAYROLL_PERIOD' => $employee_profile_details[0]['PAYROLL_PERIOD'],
                'BASIC_PAY' => $employee_profile_details[0]['BASIC_PAY'],
                'DAILY_RATE' => $employee_profile_details[0]['DAILY_RATE'],
                'HOURLY_RATE' => $employee_profile_details[0]['HOURLY_RATE'],
                'MINUTE_RATE' => $employee_profile_details[0]['MINUTE_RATE'],
                'BIRTHDAY' => $employee_profile_details[0]['BIRTHDAY'],
                'EMAIL' => $employee_profile_details[0]['EMAIL'],
                'PHONE' => $employee_profile_details[0]['PHONE'],
                'TELEPHONE' => $employee_profile_details[0]['TELEPHONE'],
                'ADDRESS' => $employee_profile_details[0]['ADDRESS'],
                'DEPARTMENT' => $employee_profile_details[0]['DEPARTMENT'],
                'DESIGNATION' => $employee_profile_details[0]['DESIGNATION'],
                'EMPLOYEMENT_TYPE' => $employee_profile_details[0]['EMPLOYEMENT_TYPE'],
                'EMPLOYMENT_STATUS' => $employee_profile_details[0]['EMPLOYMENT_STATUS'],
                'BRANCH' => $employee_profile_details[0]['BRANCH'],
                'PROFILE_IMAGE' => $employee_profile_details[0]['PROFILE_IMAGE'],
                'GENDER' => $employee_profile_details[0]['GENDER'],
                'CIVIL_STATUS' => $employee_profile_details[0]['CIVIL_STATUS'],
                'SSS' => $employee_profile_details[0]['SSS'],
                'TIN' => $employee_profile_details[0]['TIN'],
                'PHILHEALTH' => $employee_profile_details[0]['PHILHEALTH'],
                'PAGIBIG' => $employee_profile_details[0]['PAGIBIG'],
                'DRIVERS_LICENSE' => $employee_profile_details[0]['DRIVERS_LICENSE'],
                'ACCOUNT_NAME' => $employee_profile_details[0]['ACCOUNT_NAME'],
                'ACCOUNT_NUMBER' => $employee_profile_details[0]['ACCOUNT_NUMBER'],
                'SUPERIOR_ID' => $employee_superior_details[0]['SUPERIOR_ID'] ?? null,
                'SUBORDINATE_ID' => $subordinate ?? null,
                'AUTHORIZAER_ID' => $authorizer ?? null
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get user account details
    else if ($transaction == 'user account details') {
        if (isset($_POST['usercd']) && !empty($_POST['usercd'])) {
            $user_cd = $_POST['usercd'];
            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $user_cd);
            $user_account_details = $api->get_data_details_one_parameter('user account', $user_cd);

            $response[] = array(
                'EMPLOYEE_ID' => $employee_profile_details[0]['EMPLOYEE_ID'],
                'FIRST_NAME' => $employee_profile_details[0]['FIRST_NAME'],
                'LAST_NAME' => $employee_profile_details[0]['LAST_NAME'],
                'MIDDLE_NAME' => $employee_profile_details[0]['MIDDLE_NAME'],
                'SUFFIX' => $employee_profile_details[0]['SUFFIX'],
                'USERNAME' => $user_account_details[0]['USERNAME'],
                'ROLE_ID' => $user_account_details[0]['ROLE_ID']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get department details
    else if ($transaction == 'department details') {
        if (isset($_POST['departmentid']) && !empty($_POST['departmentid'])) {
            $department_id = $_POST['departmentid'];
            $department_details = $api->get_data_details_one_parameter('department', $department_id);

            $response[] = array(
                'DEPARTMENT' => $department_details[0]['DEPARTMENT']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get designation details
    else if ($transaction == 'designation details') {
        if (isset($_POST['designationid']) && !empty($_POST['designationid'])) {
            $designation_id = $_POST['designationid'];
            $designation_details = $api->get_data_details_one_parameter('designation', $designation_id);

            $response[] = array(
                'DESIGNATION' => $designation_details[0]['DESIGNATION']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get branch details
    else if ($transaction == 'branch details') {
        if (isset($_POST['branchid']) && !empty($_POST['branchid'])) {
            $branch_id = $_POST['branchid'];
            $branch_details = $api->get_data_details_one_parameter('branch', $branch_id);

            $response[] = array(
                'BRANCH' => $branch_details[0]['BRANCH'],
                'EMAIL' => $branch_details[0]['EMAIL'],
                'PHONE' => $branch_details[0]['PHONE'],
                'TELEPHONE' => $branch_details[0]['TELEPHONE'],
                'ADDRESS' => $branch_details[0]['ADDRESS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get holiday details
    else if ($transaction == 'holiday details') {
        if (isset($_POST['holidayid']) && !empty($_POST['holidayid'])) {
            $holiday_id = $_POST['holidayid'];
            $holiday_details = $api->get_data_details_one_parameter('holiday', $holiday_id);

            $response[] = array(
                'HOLIDAY' => $holiday_details[0]['HOLIDAY'],
                'HOLIDAY_DATE' => $api->check_date('empty', $holiday_details[0]['HOLIDAY_DATE'], '', 'm/d/Y', '', '', ''),
                'HOLIDAY_TYPE' => $holiday_details[0]['HOLIDAY_TYPE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get leave type details
    else if ($transaction == 'leave type details') {
        if (isset($_POST['leavetypeid']) && !empty($_POST['leavetypeid'])) {
            $leave_type_id = $_POST['leavetypeid'];
            $leave_type_details = $api->get_data_details_one_parameter('leave type', $leave_type_id);

            $response[] = array(
                'LEAVE_NAME' => $leave_type_details[0]['LEAVE_NAME'],
                'NO_LEAVES' => $leave_type_details[0]['NO_LEAVES'],
                'PAID_STATUS' => $leave_type_details[0]['PAID_STATUS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get available leave details
    else if ($transaction == 'available leave details') {
        if (isset($_POST['leavetypeid']) && !empty($_POST['leavetypeid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $leave_type_id = $_POST['leavetypeid'];
            $employee_id = $_POST['employeeid'];
            $leave_type_details = $api->get_data_details_two_parameter('available leaves', $leave_type_id, $employee_id);

            $response[] = array(
                'TOTAL' => $leave_type_details[0]['TOTAL']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get leave entitlement details
    else if ($transaction == 'leave entitlement details') {
        if (isset($_POST['entitlementid']) && !empty($_POST['entitlementid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $entitlement_id = $_POST['entitlementid'];
            $employee_id = $_POST['employeeid'];
            $leave_entitlement_details = $api->get_data_details_two_parameter('leave entitlement', $entitlement_id, $employee_id);

            $response[] = array(
                'LEAVE_TYPE' => $leave_entitlement_details[0]['LEAVE_TYPE'],
                'NO_LEAVES' => $leave_entitlement_details[0]['NO_LEAVES'],
                'START_DATE' => $api->check_date('empty', $leave_entitlement_details[0]['START_DATE'], '', 'm/d/Y', '', '', ''),
                'END_DATE' => $api->check_date('empty', $leave_entitlement_details[0]['END_DATE'], '', 'm/d/Y', '', '', '')
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get employee leave details
    else if ($transaction == 'employee leave details') {
        if (isset($_POST['leaveid']) && !empty($_POST['leaveid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $leave_id = $_POST['leaveid'];
            $employee_id = $_POST['employeeid'];

            $employee_leave_details = $api->get_data_details_two_parameter('employee leave', $leave_id, $employee_id);

            $response[] = array(
                'LEAVE_TYPE' => $employee_leave_details[0]['LEAVE_TYPE'],
                'START_TIME' => $employee_leave_details[0]['START_TIME'],
                'END_TIME' => $employee_leave_details[0]['END_TIME'],
                'REASON' => $employee_leave_details[0]['REASON'],
                'STATUS' => $employee_leave_details[0]['STATUS'],
                'REJECTION_REASON' => $employee_leave_details[0]['REJECTION_REASON'],
                'DECISION_BY' => $employee_leave_details[0]['DECISION_BY'],
                'DECISION_TIME' => $employee_leave_details[0]['DECISION_TIME'],
                'FILED_BY' => $employee_leave_details[0]['FILED_BY'],
                'LEAVE_DATE' => $api->check_date('empty', $employee_leave_details[0]['LEAVE_DATE'], '', 'm/d/Y', '', '', ''),
                'DECISION_DATE' => $api->check_date('empty', $employee_leave_details[0]['DECISION_DATE'], '', 'm/d/Y', '', '', ''),
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get employee attendance log details
    else if ($transaction == 'employee attendance log details' || $transaction == 'attendance log details') {
        if (isset($_POST['attendanceid']) && !empty($_POST['attendanceid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $attendance_id = $_POST['attendanceid'];
            $employee_id = $_POST['employeeid'];

            $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);

            $response[] = array(
                'TIME_IN_DATE' => $api->check_date('empty', $employee_attendance_log_details[0]['TIME_IN_DATE'], '', 'm/d/Y', '', '', ''),
                'TIME_IN' => $employee_attendance_log_details[0]['TIME_IN'],
                'TIME_OUT_DATE' => $api->check_date('empty', $employee_attendance_log_details[0]['TIME_OUT_DATE'], '', 'm/d/Y', '', '', ''),
                'TIME_OUT' => $employee_attendance_log_details[0]['TIME_OUT'],
                'LOCKED' => $employee_attendance_log_details[0]['LOCKED'],
                'REMARKS' => $employee_attendance_log_details[0]['REMARKS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get deduction type details
    else if ($transaction == 'deduction type details') {
        if (isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid'])) {
            $deduction_type_id = $_POST['deductiontypeid'];
            $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $deduction_type_id);

            $response[] = array(
                'DEDUCTION' => $deduction_type_details[0]['DEDUCTION'],
                'CATEGORY' => $deduction_type_details[0]['CATEGORY']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get deduction amount details
    else if ($transaction == 'deduction amount details') {
        if (isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid']) && isset($_POST['startrange']) && isset($_POST['endrange']) && !empty($_POST['endrange'])) {
            $deduction_type_id = $_POST['deductiontypeid'];
            $start_range = $_POST['startrange'];
            $end_range = $_POST['endrange'];
            $deduction_amount_details = $api->get_data_details_three_parameter('deduction amount', $deduction_type_id, $start_range, $end_range);

            $response[] = array(
                'DEDUCTION_AMOUNT' => $deduction_amount_details[0]['DEDUCTION_AMOUNT']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get salary rate details
    else if ($transaction == 'salary rate details') {
        if (isset($_POST['basicpay']) && !empty($_POST['basicpay'])) {
            $basic_pay = $_POST['basicpay'];
            $company_details = $api->get_data_details_one_parameter('company', '1');
            $working_days = $company_details[0]['MONTHLY_WORKING_DAYS'];

            $daily_rate = $basic_pay / $working_days;
            $hourly_rate = ($basic_pay / $working_days) / 8;
            $minute_rate = ((($basic_pay / $working_days) / 8) / 60);

            $response[] = array(
                'DAILY_RATE' => number_format($daily_rate, 2),
                'HOURLY_RATE' => number_format($hourly_rate, 2),
                'MINUTE_RATE' => number_format($minute_rate, 2)
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get allowance type details
    else if ($transaction == 'allowance type details') {
        if (isset($_POST['allowancetypeid']) && !empty($_POST['allowancetypeid'])) {
            $allowance_type_id = $_POST['allowancetypeid'];
            $allowance_type_details = $api->get_data_details_one_parameter('allowance type', $allowance_type_id);

            $response[] = array(
                'ALLOWANCE' => $allowance_type_details[0]['ALLOWANCE'],
                'TAX_TYPE' => $allowance_type_details[0]['TAX_TYPE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get other income type details
    else if ($transaction == 'other income type details') {
        if (isset($_POST['otherincometypeid']) && !empty($_POST['otherincometypeid'])) {
            $other_income_type_id = $_POST['otherincometypeid'];
            $other_income_type_details = $api->get_data_details_one_parameter('other income type', $other_income_type_id);

            $response[] = array(
                'OTHER_INCOME' => $other_income_type_details[0]['OTHER_INCOME'],
                'TAX_TYPE' => $other_income_type_details[0]['TAX_TYPE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get payroll specification details
    else if ($transaction == 'payroll specification details') {
        if (isset($_POST['specid']) && !empty($_POST['specid'])) {
            $spec_id = $_POST['specid'];
            $payroll_specification_details = $api->get_data_details_one_parameter('payroll specification', $spec_id);

            $response[] = array(
                'EMPLOYEE_ID' => $payroll_specification_details[0]['EMPLOYEE_ID'],
                'SPEC_TYPE' => $payroll_specification_details[0]['SPEC_TYPE'],
                'CATEGORY' => $payroll_specification_details[0]['CATEGORY'],
                'SPEC_AMOUNT' => $payroll_specification_details[0]['SPEC_AMOUNT'],
                'STATUS' => $payroll_specification_details[0]['STATUS'],
                'PAYROLL_ID' => $payroll_specification_details[0]['PAYROLL_ID'],
                'PAYROLL_DATE' => $api->check_date('empty', $payroll_specification_details[0]['PAYROLL_DATE'], '', 'm/d/Y', '', '', '')
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get payroll specification details
    else if ($transaction == 'payroll deduction type details') {
        if (isset($_POST['deductiontypeid']) && !empty($_POST['deductiontypeid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $deduction_type_id = $_POST['deductiontypeid'];
            $employee_id = $_POST['employeeid'];

            $deduction_type_details = $api->get_data_details_one_parameter('deduction type', $deduction_type_id);
            $deduction_amount = $api->get_deduction_amount($deduction_type_id, $employee_id);

            $response[] = array(
                'DEDUCTION_AMOUNT' => $deduction_amount,
                'CATEGORY' => $deduction_type_details[0]['CATEGORY'],
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get email notification details
    else if ($transaction == 'email notification details') {
        if (isset($_POST['notificationid']) && !empty($_POST['notificationid'])) {
            $notification_id = $_POST['notificationid'];
            $email_notification_details = $api->get_data_details_one_parameter('email notification', $notification_id);

            $response[] = array(
                'NOTIFICATION' => $email_notification_details[0]['NOTIFICATION']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get email configuration details
    else if ($transaction == 'email configuration details') {
        if (isset($_POST['mailid']) && !empty($_POST['mailid'])) {
            $mail_id = $_POST['mailid'];
            $email_configuration_details = $api->get_data_details_one_parameter('email configuration', $mail_id);

            $response[] = array(
                'MAIL_HOST' => $email_configuration_details[0]['MAIL_HOST'],
                'PORT' => $email_configuration_details[0]['PORT'],
                'SMTP_AUTH' => $email_configuration_details[0]['SMTP_AUTH'],
                'SMTP_AUTO_TLS' => $email_configuration_details[0]['SMTP_AUTO_TLS'],
                'USERNAME' => $email_configuration_details[0]['USERNAME'],
                'PASSWORD' => $api->decrypt_data($email_configuration_details[0]['PASSWORD']),
                'MAIL_ENCRYPTION' => $email_configuration_details[0]['MAIL_ENCRYPTION'],
                'MAIL_FROM_NAME' => $email_configuration_details[0]['MAIL_FROM_NAME'],
                'MAIL_FROM_EMAIL' => $email_configuration_details[0]['MAIL_FROM_EMAIL']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get office shift details
    else if ($transaction == 'office shift details') {
        if (isset($_POST['dtrday']) && !empty($_POST['dtrday']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $dtr_day = $_POST['dtrday'];
            $employee_id = $_POST['employeeid'];
            $dtr_day_name = $api->get_day_name($dtr_day);
            $office_shift_details = $api->get_data_details_two_parameter('office shift', $employee_id, $dtr_day);

            $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $employee_id);
            $employee_first_name = $employee_profile_details[0]['FIRST_NAME'];
            $employee_last_name = $employee_profile_details[0]['LAST_NAME'];
            $employee_middle_name = $employee_profile_details[0]['MIDDLE_NAME'];
            $employee_suffix = $employee_profile_details[0]['SUFFIX'];
            $employee_fullname = $api->get_full_name($employee_first_name, $employee_middle_name, $employee_last_name, $employee_suffix)[0]['REVERSE_FULL_NAME'];

            $response[] = array(
                'EMPLOYEE_NAME' => $employee_fullname,
                'DTR_DAY_NAME' => $dtr_day_name,
                'DAY_OFF' => $office_shift_details[0]['DAY_OFF'],
                'TIME_IN' => $office_shift_details[0]['TIME_IN'],
                'TIME_OUT' => $office_shift_details[0]['TIME_OUT'],
                'START_LUNCH_BREAK' => $office_shift_details[0]['START_LUNCH_BREAK'],
                'END_LUNCH_BREAK' => $office_shift_details[0]['END_LUNCH_BREAK'],
                'HALF_DAY_MARK' => $office_shift_details[0]['HALF_DAY_MARK'],
                'LATE_MARK' => $office_shift_details[0]['LATE_MARK']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get payroll group details
    else if ($transaction == 'payroll group details') {
        if (isset($_POST['payrollgroupid']) && !empty($_POST['payrollgroupid'])) {
            $payroll_group_id = $_POST['payrollgroupid'];
            $payroll_group_details = $api->get_data_details_one_parameter('payroll group', $payroll_group_id);

            $response[] = array(
                'PAYROLL_GROUP_DESC' => $payroll_group_details[0]['PAYROLL_GROUP_DESC']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get employee attendance log details
    else if ($transaction == 'employee attendance log details' || $transaction == 'attendance log details') {
        if (isset($_POST['attendanceid']) && !empty($_POST['attendanceid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $attendance_id = $_POST['attendanceid'];
            $employee_id = $_POST['employeeid'];

            $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);

            $response[] = array(
                'TIME_IN_DATE' => $api->check_date('empty', $employee_attendance_log_details[0]['TIME_IN_DATE'], '', 'm/d/Y', '', '', ''),
                'TIME_IN' => $employee_attendance_log_details[0]['TIME_IN'],
                'TIME_OUT_DATE' => $api->check_date('empty', $employee_attendance_log_details[0]['TIME_OUT_DATE'], '', 'm/d/Y', '', '', ''),
                'TIME_OUT' => $employee_attendance_log_details[0]['TIME_OUT'],
                'LOCKED' => $employee_attendance_log_details[0]['LOCKED'],
                'REMARKS' => $employee_attendance_log_details[0]['REMARKS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get attendance adjustment details
    else if ($transaction == 'attendance adjustment details') {
        if (isset($_POST['attendanceid']) && !empty($_POST['attendanceid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $attendance_id = $_POST['attendanceid'];
            $employee_id = $_POST['employeeid'];
            $adjustment_id = $_POST['adjustmentid'];

            $employee_attendance_log_details = $api->get_data_details_two_parameter('employee attendance log', $attendance_id, $employee_id);
            $attendance_adjustment_details = $api->get_data_details_one_parameter('attendance adjustment', $adjustment_id);

            $response[] = array(
                'TIME_IN_DATE' => $api->check_date('empty', $employee_attendance_log_details[0]['TIME_IN_DATE'], '', 'm/d/Y', '', '', ''),
                'TIME_IN' => $attendance_adjustment_details[0]['TIME_IN_ADJ'],
                'TIME_OUT_DATE' => $api->check_date('empty', $attendance_adjustment_details[0]['TIME_OUT_DATE_ADJ'], '', 'm/d/Y', '', '', ''),
                'TIME_OUT' => $attendance_adjustment_details[0]['TIME_OUT_ADJ'],
                'STATUS' => $attendance_adjustment_details[0]['STATUS'],
                'REASON' => $attendance_adjustment_details[0]['REASON']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get telephone log details
    else if ($transaction == 'telephone log details') {
        if (isset($_POST['logid']) && !empty($_POST['logid'])) {
            $log_id = $_POST['logid'];

            $telephone_log_details = $api->get_data_details_one_parameter('telephone log', $log_id);

            $response[] = array(
                'INITIAL_CALL_DATE' => $api->check_date('empty', $telephone_log_details[0]['INITIAL_CALL_DATE'], '', 'm/d/Y', '', '', ''),
                'INITIAL_CALL_TIME' => $telephone_log_details[0]['INITIAL_CALL_TIME'],
                'RECIPIENT' => $telephone_log_details[0]['RECIPIENT'],
                'TELEPHONE' => $telephone_log_details[0]['TELEPHONE'],
                'STATUS' => $telephone_log_details[0]['STATUS'],
                'REASON' => $telephone_log_details[0]['REASON']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get document management setting details
    else if ($transaction == 'document management setting details') {
        if (isset($_POST['settingid']) && !empty($_POST['settingid'])) {
            $file_type = '';
            $setting_id = $_POST['settingid'];
            $document_management_setting_details = $api->get_data_details_one_parameter('document management setting', $setting_id);
            $document_file_type_details = $api->get_data_details_one_parameter('document file type', $setting_id);

            for ($i = 0; $i < count($document_file_type_details); $i++) {
                $file_type .= $document_file_type_details[$i]['FILE_TYPE'];

                if ($i != (count($document_file_type_details) - 1)) {
                    $file_type .= ',';
                }
            }

            $response[] = array(
                'MAX_FILE_SIZE' => $document_management_setting_details[0]['MAX_FILE_SIZE'],
                'AUTHORIZATION' => $document_management_setting_details[0]['AUTHORIZATION'],
                'FILE_TYPE' => $file_type
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get document details
    else if ($transaction == 'document details') {
    error_log("Received document details request for ID: " . $_POST['documentid']);
    if (isset($_POST['documentid']) && !empty($_POST['documentid'])) {
        $document_id = $_POST['documentid'];
        $document_details = $api->get_data_details_one_parameter('document', $document_id);

        error_log("Document details fetched: " . print_r($document_details, true));

        if ($document_details && !empty($document_details)) {
            $response = $document_details[0];  // Use the entire result
            error_log("Sending response: " . json_encode($response));
            echo json_encode($response);  // Remove the extra array wrapping
        } else {
            error_log("No document found for ID: " . $document_id);
            echo json_encode(['error' => 'No document found']);
        }
    } else {
        error_log("Invalid document ID");
        echo json_encode(['error' => 'Invalid document ID']);
    }
    exit;  // Make sure to exit after sending the response
}
    # -------------------------------------------------------------

    # Get department document permission details
    else if ($transaction == 'department document permission details') {
        if (isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $document_id = $_POST['documentid'];
            $department_document_permission_details = $api->get_data_details_one_parameter('department document permission', $document_id);
            $response = array();

            for ($i = 0; $i < count($department_document_permission_details); $i++) {
                $permission = $department_document_permission_details[$i]['DEPARTMENT_ID'] . '-' . $department_document_permission_details[$i]['PERMISSION'];
                array_push($response, $permission);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get department employee permission details
    else if ($transaction == 'department employee permission details') {
        if (isset($_POST['documentid']) && !empty($_POST['documentid'])) {
            $document_id = $_POST['documentid'];
            $employee_document_permission_details = $api->get_data_details_one_parameter('employee document permission', $document_id);
            $response = array();

            for ($i = 0; $i < count($employee_document_permission_details); $i++) {
                $permission = $employee_document_permission_details[$i]['EMPLOYEE_ID'] . '-' . $employee_document_permission_details[$i]['PERMISSION'];
                array_push($response, $permission);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get transmittal details
    else if ($transaction == 'transmittal details') {
        if (isset($_POST['transmittalid']) && !empty($_POST['transmittalid'])) {
            $transmittal_id = $_POST['transmittalid'];
            $transmittal_details = $api->get_data_details_one_parameter('transmittal', $transmittal_id);

            $response[] = array(
                'DESCRIPTION' => $transmittal_details[0]['DESCRIPTION'],
                'STATUS' => $transmittal_details[0]['STATUS'],
                'TRANSMITTED_DEPARTMENT' => $transmittal_details[0]['TRANSMITTED_DEPARTMENT'],
                'TRANSMITTED_EMPLOYEE' => $transmittal_details[0]['TRANSMITTED_EMPLOYEE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get suggest to win details
    else if ($transaction == 'suggest to win details') {
        if (isset($_POST['stwid']) && !empty($_POST['stwid'])) {
            $stw_id = $_POST['stwid'];
            $stw_details = $api->get_data_details_one_parameter('suggest to win', $stw_id);

            $response[] = array(
                'TITLE' => $stw_details[0]['TITLE'],
                'VOTING_PERIOD' => $api->check_date('empty', $stw_details[0]['VOTING_PERIOD'], '', 'm/d/Y', '', '', ''),
                'STATUS' => $stw_details[0]['STATUS'],
                'DESCRIPTION' => $stw_details[0]['DESCRIPTION'],
                'REASON' => $stw_details[0]['REASON'],
                'BENEFITS' => $stw_details[0]['BENEFITS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get suggest to win vote details
    else if ($transaction == 'suggest to win vote details') {
        if (isset($_POST['stwid']) && !empty($_POST['stwid']) && isset($_POST['employeeid']) && !empty($_POST['employeeid'])) {
            $stw_id = $_POST['stwid'];
            $employee_id = $_POST['employeeid'];
            $stw_details = $api->get_data_details_one_parameter('suggest to win', $stw_id);
            $stw_vote_details = $api->get_data_details_two_parameter('suggest to win vote', $stw_id, $employee_id);

            $response[] = array(
                'TITLE' => $stw_details[0]['TITLE'],
                'SATISFACTION' => $stw_vote_details[0]['SATISFACTION'] ?? 3,
                'QUALITY' => $stw_vote_details[0]['QUALITY'] ?? 3,
                'INNOVATION' => $stw_vote_details[0]['INNOVATION'] ?? 3,
                'FEASIBILITY' => $stw_vote_details[0]['FEASIBILITY'] ?? 3,
                'REMARKS' => $stw_vote_details[0]['REMARKS'] ?? null
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get training room log details
    else if ($transaction == 'training room log details') {
        if (isset($_POST['logid']) && !empty($_POST['logid'])) {
            $participant = '';
            $log_id = $_POST['logid'];

            $training_room_log_details = $api->get_data_details_one_parameter('training room log', $log_id);
            $training_room_log_patricipant_details = $api->get_data_details_one_parameter('training room log participant', $log_id);

            for ($i = 0; $i < count($training_room_log_patricipant_details); $i++) {
                $participant .= $training_room_log_patricipant_details[$i]['EMPLOYEE_ID'];

                if ($i != (count($training_room_log_patricipant_details) - 1)) {
                    $participant .= ',';
                }
            }

            $response[] = array(
                'START_DATE' => $api->check_date('empty', $training_room_log_details[0]['START_DATE'], '', 'm/d/Y', '', '', ''),
                'START_TIME' => $training_room_log_details[0]['START_TIME'],
                'END_TIME' => $training_room_log_details[0]['END_TIME'],
                'STATUS' => $training_room_log_details[0]['STATUS'],
                'OTHER_PARTICIPANT' => $training_room_log_details[0]['OTHER_PARTICIPANT'],
                'LIGHTS' => $training_room_log_details[0]['LIGHTS'],
                'FAN' => $training_room_log_details[0]['FAN'],
                'AIRCON' => $training_room_log_details[0]['AIRCON'],
                'REASON' => $training_room_log_details[0]['REASON'],
                'PARTICIPANT' => $participant,
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get email recipient details
    else if ($transaction == 'email recipient details') {
        if (isset($_POST['notificationid']) && !empty($_POST['notificationid']) && isset($_POST['recipientid']) && !empty($_POST['recipientid'])) {
            $notification_id = $_POST['notificationid'];
            $recipient_id = $_POST['recipientid'];

            $email_recipient_details = $api->get_data_details_two_parameter('email recipient', $notification_id, $recipient_id);

            $response[] = array(
                'EMAIL' => $email_recipient_details[0]['EMAIL']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get weekly cash flow details
    else if ($transaction == 'weekly cash flow details') {
        if (isset($_POST['wcfid']) && !empty($_POST['wcfid'])) {
            $wcf_id = $_POST['wcfid'];

            $weekly_cash_flow_details = $api->get_data_details_one_parameter('weekly cash flow', $wcf_id);

            $response[] = array(
                'START_DATE' => $api->check_date('empty', $weekly_cash_flow_details[0]['START_DATE'], '', 'm/d/Y', '', '', ''),
                'STATUS' => $weekly_cash_flow_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get weekly cash flow particulars details
    else if ($transaction == 'weekly cash flow particulars details') {
        if (isset($_POST['wcfid']) && !empty($_POST['wcfid']) && isset($_POST['particularid']) && !empty($_POST['particularid'])) {
            $wcf_id = $_POST['wcfid'];
            $particular_id = $_POST['particularid'];

            $weekly_cash_flow_details = $api->get_data_details_one_parameter('weekly cash flow', $wcf_id);
            $weekly_cash_flow_particulars_details = $api->get_data_details_one_parameter('weekly cash flow particulars', $particular_id);

            $response[] = array(
                'DETAILS' => $weekly_cash_flow_particulars_details[0]['DETAILS'],
                'WCF_TYPE' => $weekly_cash_flow_particulars_details[0]['WCF_TYPE'],
                'LOAN_WCF_TYPE' => $weekly_cash_flow_particulars_details[0]['LOAN_WCF_TYPE'],
                'MONDAY' => $weekly_cash_flow_particulars_details[0]['MONDAY'],
                'TUESDAY' => $weekly_cash_flow_particulars_details[0]['TUESDAY'],
                'WEDNESDAY' => $weekly_cash_flow_particulars_details[0]['WEDNESDAY'],
                'THURSDAY' => $weekly_cash_flow_particulars_details[0]['THURSDAY'],
                'FRIDAY' => $weekly_cash_flow_particulars_details[0]['FRIDAY'],
                'TOTAL' => $weekly_cash_flow_particulars_details[0]['TOTAL'],
                'STATUS' => $weekly_cash_flow_details[0]['STATUS'],
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get ticket details
    else if ($transaction == 'ticket details') {
        if (isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $ticket_id = $_POST['ticketid'];

            $ticket_details = $api->get_data_details_one_parameter('ticket', $ticket_id);

            $response[] = array(
                'DUE_DATE' => $api->check_date('empty', $ticket_details[0]['DUE_DATE'], '', 'm/d/Y ', '', '', ''),
                'DUE_TIME' => $ticket_details[0]['DUE_TIME'],
                'CATEGORY' => $ticket_details[0]['CATEGORY'],
                'ASSIGNED_DEPARTMENT' => $ticket_details[0]['ASSIGNED_DEPARTMENT'],
                'ASSIGNED_EMPLOYEE' => $ticket_details[0]['ASSIGNED_EMPLOYEE'],
                'SUBJECT' => $ticket_details[0]['SUBJECT'],
                'DESCRIPTION' => $ticket_details[0]['DESCRIPTION'],
                'STATUS' => $ticket_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get ticket details
    else if ($transaction == 'add ticket adjustment details') {
        if (isset($_POST['ticketid']) && !empty($_POST['ticketid'])) {
            $ticket_id = $_POST['ticketid'];

            $ticket_details = $api->get_data_details_one_parameter('ticket', $ticket_id);

            $response[] = array(
                'DUE_DATE' => $api->check_date('empty', $ticket_details[0]['DUE_DATE'], '', 'm/d/Y', '', '', ''),
                'DUE_TIME' => $ticket_details[0]['DUE_TIME'],
                'PRIORITY' => $ticket_details[0]['PRIORITY'],
                'CATEGORY' => $ticket_details[0]['CATEGORY'],
                'ASSIGNED_DEPARTMENT' => $ticket_details[0]['ASSIGNED_DEPARTMENT'],
                'ASSIGNED_EMPLOYEE' => $ticket_details[0]['ASSIGNED_EMPLOYEE'],
                'SUBJECT' => $ticket_details[0]['SUBJECT'],
                'DESCRIPTION' => $ticket_details[0]['DESCRIPTION']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get ticket adjustment details
    else if ($transaction == 'ticket adjustment details') {
        if (isset($_POST['ticketid']) && !empty($_POST['ticketid']) && isset($_POST['adjustmentid']) && !empty($_POST['adjustmentid'])) {
            $adjustment_id = $_POST['adjustmentid'];
            $ticket_id = $_POST['ticketid'];

            $ticket_details = $api->get_data_details_one_parameter('ticket', $ticket_id);
            $ticket_adjustment_details = $api->get_data_details_one_parameter('ticket adjustment', $adjustment_id);

            $response[] = array(
                'DUE_DATE' => $api->check_date('empty', $ticket_adjustment_details[0]['DUE_DATE_ADJ'], '', 'm/d/Y', '', '', ''),
                'DUE_TIME' => $ticket_adjustment_details[0]['DUE_TIME_ADJ'],
                'PRIORITY' => $ticket_adjustment_details[0]['PRIORITY_ADJ'],
                'CATEGORY' => $ticket_adjustment_details[0]['CATEGORY_ADJ'],
                'ASSIGNED_DEPARTMENT' => $ticket_details[0]['ASSIGNED_DEPARTMENT'],
                'ASSIGNED_EMPLOYEE' => $ticket_adjustment_details[0]['ASSIGNED_EMPLOYEE_ADJ'],
                'SUBJECT' => $ticket_adjustment_details[0]['SUBJECT_ADJ'],
                'DESCRIPTION' => $ticket_adjustment_details[0]['DESCRIPTION_ADJ'],
                'REASON' => $ticket_adjustment_details[0]['REASON']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------


    // ==========================changes lemarbil======================

    //purchasing module

    //change the status of purchase request to Approved
    else if ($transaction == 'purchase request change to approve'){
        $prno = $_POST['prno'];
        $res = $api->change_pr_status($prno,"APPROVED");
        echo  json_encode($res);
    }


    //change the status of purchase request to Recommended
    else if ($transaction == 'purchase request change to recommended'){
        $prno = $_POST['prno'];
        $res = $api->change_pr_status($prno,"RECOMMENDED");
        echo  json_encode($res);
    }

    //delete the Purchase request
    else if ($transaction == 'purchase request change to deleted'){
        $prno = $_POST['prno'];
        $res = $api->change_pr_status($prno,"DELETED");
        echo  json_encode($res);
    }

    //change the status to For Recommendation PR
    elseif($transaction == 'purchase request change to for recommendation'){
        $prno = $_POST['prno'];
        $res = $api->change_pr_status($prno,"FOR RECOMMENDATION");
        echo  json_encode($res);
    }

    //add approve status on recommended_by1
    elseif($transaction == "purchase request add approved in recommendation 1"){
        $prno = $_POST['prno'];
        $res = $api->change_recommended_by1($prno,"APPROVED");
        echo  json_encode($res);
    }


        //add approve status on recommended_by2
    elseif($transaction == "purchase request add approved in recommendation 2"){
        $prno = $_POST['prno'];
        $res = $api->change_recommended_by2($prno,"APPROVED");
        echo  json_encode($res);
    }


     //change the status of pr to budget confirmed
    elseif($transaction == 'purchase request change to budget confirm'){
        $prno = $_POST['prno'];
        $bud_con_rem = $_POST['pr_bud_con_rem'];
        $res = $api->change_pr_status($prno,"BUDGET CONFIRMED");
        echo  json_encode($res);
    }

    //change the status of pr to for budget confirm
    elseif($transaction == 'purchase request change to for bud confirm'){
        $prno = $_POST['prno'];
        $res = $api->change_pr_status($prno,"FOR BUDGET CONFIRMATION");
        echo json_encode($res);
    }


    //update pr details
    elseif($transaction == 'submit update pr'){

        $remarks = $_POST['rem_justi'];
        $req = $_POST['requested_by'];
        $bud_con = ($_POST['budget_confim'] == '') ? null : $_POST['budget_confim'];
        $bud_con_rem = ($_POST['rem_budcon'] == '') ? null : $_POST['rem_budcon'];
        $rec1 = ($_POST['recom_by1'] == '') ? null :$_POST['recom_by1'];
        $rec2 = ($_POST['recom_by2'] == '') ? null : $_POST['recom_by2'];
        $approver = ($_POST['approved_by'] == '') ? null : $_POST['approved_by'];
        $prno = $_POST['prno'];

        $res = $api->update_pr($prno,$remarks,$req,$bud_con,$bud_con_rem,$rec1,$rec2, $approver);

        echo json_encode($res);
    }
    //get the asignatory
    elseif ($transaction == 'get pr assignitory'){

        $type = $_POST['type'];
        
        $res = $api->get_data_details_two_parameter('system code','PRSIGNATORY',$type);
        $system_desc_string_obj = json_decode($res[0]['SYSTEM_DESC']);
        $emp_id = $api->get_data_details_one_parameter('user account',$_SESSION['username'])[0]['EMPLOYEE_ID'];
        $superior = $api->get_data_details_one_parameter('employee superior',$emp_id)[0]['SUPERIOR_ID'];
        
        //requestee
        if($system_desc_string_obj[0]->req == 'head'){
            
            $system_desc_string_obj[0]->req = $superior; 
        }elseif ($system_desc_string_obj[0]->req == 'creator') {
            $system_desc_string_obj[0]->req = $emp_id; 
        }


        if($system_desc_string_obj[0]->approver == 'head'){
            $system_desc_string_obj[0]->approver = $superior;
        }

        echo json_encode($system_desc_string_obj); 

    }


    elseif ($transaction == "get purchase request details"){
        $prno = $_POST['pr_id'];
        $res = $api->get_data_details_one_parameter('purchase request',$prno);
        echo json_encode($res);
    }





    //delete pr item
    elseif ($transaction == 'delete pr items')
    {
        $item_id_to_delete = $_POST['item_id'];
        $res = $api->delete_item_id_pr($api->decrypt_data($item_id_to_delete));
        echo json_encode($res);
    }

    //add pr item
    elseif($transaction == 'submit add pr item')
    {
        $quantity = $_POST['quantity'];
        $unit = $_POST['unit'];
        $particular = $_POST['part_desc'];
        $budget = $_POST['budget'];
        $estemated = $_POST['estimated'];
        $prno =$_POST['prno'];

        if(
        in_array(null, $quantity) == false && 
        in_array(null, $unit) == false &&
        in_array(null, $particular) == false &&
        in_array(null, $budget) == false &&
        in_array(null, $estemated) == false 
        )
        {
            $count = 0;
            $res = [];
            foreach ($particular as $value) 
            {
                array_push(
                    $res,
                    $api->add_pr_items(
                        $quantity[$count],
                        $unit[$count],
                        $particular[$count],
                        $budget[$count],
                        $estemated[$count],
                        $prno
                        )
                    );

                $count = $count + 1;           
            }
            echo json_encode($res);
        }
        else
        {
            echo json_encode("Some Values are empty please Check the items");
        }


    
    }
    // add PR
    elseif($transaction == "submit add pr"){

        $date_needed =   date("Y-m-d", strtotime($_POST['date_needed']));
        $title = trim($_POST['title']);
        $dept = $api->get_data_details_one_parameter('employee profile', $_SESSION['username'])[0]['DEPARTMENT'];
        $employee_id  = $api->get_data_details_one_parameter('employee profile',$_SESSION['username'])[0]['EMPLOYEE_ID'];
        $res = $api->add_pr($date_needed,$title,$dept,"PENDING",$employee_id);

        echo json_encode($res);
       
    }

    //Vault Access Modules
        /*
         format in QR image 
         Must be in JSON String 
         How to create new vault qr
         1. the pattern of your string should be like this :   [{"scantype":"vault acess","vaultbranch":"BRANCH1"}]
         2. that string shall need to encrypt using encrypt_data() function from API
         3. Now you can generate QR at any QR generator provider and input the encrypted string to be generated
         4. Once generated, it can now be use
         */

    //get vault access
    elseif ($transaction == 'get vault details') {
        // echo json_encode($_POST['ID']);
        // exit();
        $ID = $_POST['ID'];
        $res = $api->get_data_details_one_parameter('vault access', $ID);
        echo json_encode($res);
    }


    //time out
    elseif ($transaction == 'time out vault access') {

        $ID = $_POST['ID'];
        $scanned_text =  $_POST['scannedtext'];
        $decrypted_scanned = $api->decrypt_data($scanned_text);
        $jsontext = json_decode($decrypted_scanned);
        $access_details = $api->get_data_details_one_parameter('vault access', $ID);

        if ($jsontext[0]->scantype == 'vault acess') {

            if((String)$jsontext[0]->vaultbranch == (String)$access_details[0]['VAULT_BRANCH'] ){
                $res = $api->time_out_qr_vault($ID);
            }else{
                $res = 'You are using different vault QR please try again';
            }
        } else {
            $res = 'invalid qr';
        }
        echo json_encode($res);
    }

    //submit time in
    elseif ($transaction == 'submit vault access') {
        //$_POST['encrypted_web'] = $api->encrypt_data('http://13.89.51.26/vault-access');
        
        $scanned_text =  $_POST['scannedtext'];
        $decrypted_scanned = $api->decrypt_data($scanned_text);
        $jsontext = json_decode($decrypted_scanned);

        $person = $_POST['names'];
        $activity = $_POST['purpose'];
        $other_purpose = $_POST['other_purpose'] ?? null;


        if ($jsontext[0]->scantype == 'vault acess') {


            $res = $api->add_submit_qr_vault($person, $activity, $other_purpose,$jsontext[0]->vaultbranch );
        } else {
            $res = 'invalid qr';
        }

        echo json_encode($res);
    }


    // insurance request module
    elseif ($transaction == 'submit cancel insurance request') {
        $ins_id = $_POST['ins_req_id'];
        $cancel_rem = $_POST['cancel_rem'];
        $res = $api->tag_as_cancel_insurance_request($ins_id, $cancel_rem);



        echo json_encode($res);
    } elseif ($transaction == 'submit complete insurance request') {
        $ins_id = $_POST['ins_req_id'];

        $res = $api->tag_as_complete_insurance_request($ins_id);

        echo json_encode($res);
    } else if ($transaction == 'load insurance request') {
        
        $file_path  = $_FILES['import']['tmp_name'];
        $file_handle = fopen($file_path, "r");

        $result = array();

        if ($file_handle !== FALSE) {

            $column_headers = fgetcsv($file_handle);
            foreach ($column_headers as $header) {
                $result[$header] = array();
            }
            while (($data = fgetcsv($file_handle)) !== FALSE) {
                $i = 0;
                foreach ($result as &$column) {
                    $column[] = $data[$i++];
                }
            }
            fclose($file_handle);
        }

        // print_r($result); // I see all data(s) except the header
        $json = json_encode($result);
        echo $json;
        //echo json_encode($file_handle);

    } else if ($transaction == "submit delete insurance request") {

        $res = $api->delete_insurance_request($api->decrypt_data($_POST['ins_req_id']));
        echo json_encode($res);
    } else if ($transaction == "submit add insurance request") {


        $date_time =  date('Y-m-d H:i:s');

        $ins_req_ID = $_POST['ins_req_id'];
        $aog = $_POST['aog'];
        $bodily_injured =  $api->string_to_number($_POST['bodily_injured']);
        $classifi = $_POST['classifi'];
        $client_name = $_POST['client_name'];
        $address = $_POST['address'];
        $col_id = $_POST['col_id'];
        $coverage = $api->string_to_number($_POST['coverage']);
        $deal_comm = $api->string_to_number($_POST['deal_comm']);
        $due_dt = $_POST['due_dt'];
        $gross_prem =  $api->string_to_number($_POST['gross_prem']);
        $iet = $_POST['iet'];
        $income =  $api->string_to_number($_POST['income']);
        $ins_req_id = $_POST['ins_req_id'];
        $insur_com = $_POST['insur_com'];
        $isd = $_POST['isd'];
        $mortgagee = $_POST['mortgagee'];
        $net_amt =  $api->string_to_number($_POST['net_amt']);
        $net_com = $api->string_to_number($_POST['net_com']);
        $nodays = $_POST['nodays'];
        $odtl =  $api->string_to_number($_POST['odtl']);
        $otherlines = $_POST['otherlines'];
        $p_term = $_POST['p_term'];
        $per_dmg =  $api->string_to_number($_POST['per_dmg']);
        $pro_dmg =  $api->string_to_number($_POST['pro_dmg']);
        $pro_r_m =  $api->string_to_number($_POST['pro_r_m']);
        $pro_rt_amount =  $api->string_to_number($_POST['pro_rt_amount']);
        $rate =  $api->string_to_number($_POST['rate']);
        $tot_prem =  $api->string_to_number($_POST['tot_prem']);
        $transaction = $_POST['transaction'];
        $unit_desc = $_POST['unit_desc'];
        $username = $_POST['username'];
        $year_model = $_POST['year_model'];
        $plate_num = $_POST['plate_num'];
        $chasis_num = $_POST['chasis_num'];
        $motor_num = $_POST['motor_num'];
        $color = $_POST['color'];
        $irs = $_POST['irs'] ?? null;







        if ($ins_req_ID == '') {
            $res = $api->insert_insurance_request(
                $client_name,
                $address,
                $col_id,
                $unit_desc,
                $year_model,
                $plate_num,
                $chasis_num,
                $motor_num,
                $color,
                'yes',
                $insur_com,
                $classifi,
                $mortgagee,
                $rate,
                $coverage,
                $otherlines,
                $pro_r_m,
                $pro_rt_amount,
                $aog,
                $isd,
                $iet,
                $p_term,
                $nodays,
                $due_dt,
                $odtl,
                $bodily_injured,
                $pro_dmg,
                $per_dmg,
                $gross_prem,
                $net_amt,
                $net_com,
                $tot_prem,
                $income,
                $deal_comm,
                $username,
                $date_time,
                'pending'
            );
        } else {


            $updateinsurancereq =  $api->check_role_permissions($username, 391);

            if ($updateinsurancereq > 0) {

                $res = $api->update_insurance_request(
                    $ins_req_ID,
                    $client_name,
                    $address,
                    $col_id,
                    $unit_desc,
                    $year_model,
                    $plate_num,
                    $chasis_num,
                    $motor_num,
                    $color,
                    'yes',
                    $insur_com,
                    $classifi,
                    $mortgagee,
                    $rate,
                    $coverage,
                    $otherlines,
                    $pro_r_m,
                    $pro_rt_amount,
                    $aog,
                    $isd,
                    $iet,
                    $p_term,
                    $nodays,
                    $due_dt,
                    $odtl,
                    $bodily_injured,
                    $pro_dmg,
                    $per_dmg,
                    $gross_prem,
                    $net_amt,
                    $net_com,
                    $tot_prem,
                    $income,
                    $deal_comm,
                    $username,
                    $systemdate,
                    $irs
                );
            } else {
                $res = 'no update permission';
            }
        }

        echo json_encode($res);
    }

    //activity notes details 

    else if ($transaction == "delete activity notes attachment") {

        $username = $_POST['username'];
        $attached_id = $_POST['attach_id'];

        $res = $api->delete_activity_note_attachment($username, $attached_id);
        echo json_encode($res);
    }

    #------------------------------------------------------------------

    # add attachement to activity notes
    else if ($transaction == "submit upload activity attachement") {

        $act_id = $_POST['activity_id'];
        $username = $_POST['username'];


        $upload_location = "activity-notes/";
        $target_file = $upload_location . basename($_FILES["activity_attachement"]["name"]);

        $temp = explode(".", $_FILES["activity_attachement"]["name"]);
        $newfilename = $api->generateRandomString(7) . '.' . end($temp);

        if ($_FILES['activity_attachement']['size'] <= 15000000) {

            if (move_uploaded_file($_FILES['activity_attachement']['tmp_name'], $upload_location . $newfilename)) {
                $res =  $api->insert_activity_note_attachmment($upload_location . $newfilename, $_FILES["activity_attachement"]["name"], $act_id, $username);
                echo json_encode($res);
            }
        } else {
            echo json_encode("0");
        }
    }

    //module activity notes

    #Delete Activity
    else if ($transaction == "delete activity notes") {

        $act_note = $_POST['activity_id'];
        $username = $_POST['username'];

        $res = $api->delete_activity_note($username, $act_note);
        echo json_encode($res);
    }
    #Update Activty
    else if ($transaction == "submit update activity") {
        $act_id = $_POST['act_id'];
        $client_name = $_POST['upt_client_name'];
        $client_num = $_POST['upt_client_num'];
        $act_date = $_POST['upt_act_date'];
        $start_time = $_POST['upt_starttime'];
        $end_time = $_POST['upt_endtime'];
        $act_type = $_POST['upt_act_type'];
        $act_desc = $_POST['upt_act_desc'];
        $username = $_POST['username'];
     
        $res = $api->update_activity_note($act_id, $client_name, $client_num, $act_date, $start_time, $end_time, $act_type, $act_desc, $username);
        echo json_encode($res);
    }

    #Add activity notes
    else if ($transaction == "submit add activity") {
        $username = $_POST['username'];
        $client_name = $_POST['client_name'];
        $client_num = $_POST['client_num'];
        $act_type = $_POST['act_type'];
        $act_desc = $_POST['act_desc'];
        $long = $_POST['long'];
        $lat = $_POST['lat'];
        $act_date =$_POST['act_date'];
        $start_time = $_POST['starttime'];
        $end_time = $_POST['endtime'];
        $res = $api->insert_activity_note($username, $client_name, $client_num, $act_date, $start_time,  $end_time, $act_type, $act_desc, $long, $lat);
 
        echo json_encode($res);
    }
    #Get activity details
    else if ($transaction == "get activity details") {

        $act_id  = $_POST['activity_id'];
        $res = $api->get_data_details_one_parameter('activity note', $act_id);
        echo json_encode($res[0]);
    }

    #Upload Item image
    else if ($transaction == "upload item image") {
        //echo json_encode($_FILES);

        $countfiles = count($_FILES['images']['name']);
        $item_id = $_POST['item_id'];

        $upload_location = "assets/images/inventory-item-images/";
        // // To store uploaded files path

        //$file_destination = $_SERVER['DOCUMENT_ROOT'];
        $files_arr = array();

        for ($index = 0; $index < $countfiles; $index++) {


            if (isset($_FILES['images']['name'][$index]) && $_FILES['images']['name'][$index] != '') {
                // File name
                $filename = $_FILES['images']['name'][$index];

                // Get extension
                $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

                // Valid image extension
                $valid_ext = array("png", "jpeg", "jpg");

                //new name
                $temp = explode(".", $_FILES["images"]["name"][$index]);
                $newfilename = round(microtime(true)) . $index . '.' . end($temp);

                // Check extension
                if (in_array($ext, $valid_ext)) {



                    if ($_FILES['images']['size'][$index] <= 3000000) {

                        if (move_uploaded_file($_FILES['images']['tmp_name'][$index], $upload_location . $newfilename)) {

                            array_push($files_arr, $newfilename . ' : ' . 'is uploaded   ');
                            $api->insert_item_image($upload_location . $newfilename, $item_id);
                        }
                    } else {

                        array_push($files_arr, $newfilename . ' : ' . 'this file is exeeced to the max image size (3MB)   ');
                    }


                    // Upload file

                } else {
                    array_push($files_arr, $newfilename . ' : ' . 'this file is not supported please consider ("png","jpeg","jpg")   ');
                }
            }
        }
        echo json_encode($files_arr);

        // die;
    }
    #--------------------------------------------------------------------------

    #showing the image 

    else if ($transaction == "show item images") {

        $item_id = $_POST['data']['item_id'];
        $data =  $api->show_item_image($item_id);
        echo json_encode($data);
    }
    #-------------------------------------------------------------------------

    # to delete an image item

    else if ($transaction == "delete item image") {

        $image_id = $_POST['data']['image_id'];
        $q =  $api->get_item_image($image_id);
        $url = $q[0]['image_name'];

        // Use unlink() function to delete a file 
        if (!unlink($url)) {
            echo "$url cannot be deleted due to an error";
        } else {
            echo "$url has been deleted";
            $api->delete_image_item($image_id);
        }

        //echo json_encode($url);
    }


    #------------------------------------------------------------------------------

    #get category generation
    else if ($transaction == "generate inventory category"){
        $dept_owner = $_POST['dept_owner'];
        $res = $api->generate_inventory_category_options(
            "SELECT cat.ITEM_CATEGORY, cat.CATEG_NAME, dhascat.DEPARTMENT_ID FROM tbldepthasitemcategory as dhascat 
              LEFT JOIN tblitemcategory as cat on cat.ITEM_CATEGORY = dhascat.ITEM_CATEGORY WHERE dhascat.DEPARTMENT_ID = '".$dept_owner."' "
        );
        
        echo json_encode($res);
    }



    # Get Item inventory single
    else if ($transaction == "get inventory item single") {
        if (isset($_POST['data']['item_id']) && !empty($_POST['data']['item_id'])) {
            echo json_encode($api->get_item_inventory_single('tblinventoryitems.*,tblitembrand.BRANDNAME', $_POST['data']['item_id']));
        }
    }

    // ------------------------------------------------------------

    # Get the employee list
    else if ($transaction == "get employee list") {
        echo json_encode($api->generate_employee_options());
    }
    // -------------------------------------------------------------
    # Get the Branch list
    else if ($transaction == "get branch list") {
        echo json_encode($api->generate_branch_options());
    }
    // -------------------------------------------------------------


    # Assigning the item
    elseif ($transaction == "assign item inventory") {
        $emp_id = $_POST['sel_emp_assign'];
        $item_id = $_POST['itemid_assign'];
        $date_assign = $_POST['assigndate'];
        $location = $_POST['item_loc'];
        $branch = $_POST['assign_branch'];
        echo json_encode($api->assign_item($emp_id, $item_id, $date_assign, $location, $branch));
    }
    // -------------------------------------------------------------

    # Return the item
    elseif ($transaction == "return item inventory") {
        echo json_encode($api->return_inventory_item($_POST['returnitem_id']));
    }
    // -------------------------------------------------------------

    // get the history
    elseif ($transaction == "get item history") {
        //echo json_encode($_POST);
    }
    // -------------------------------------------------------------

    // Add item Category
    else if ($transaction == "add item category") {
        $catcode = $_POST['addcat_code'];
        $catname = $_POST['addcat_name'];
        //$deptowner = $_POST['additem_dept_owner_cat'];
        echo json_encode($api->add_item_category($catcode, $catname));
    }
    // -------------------------------------------------------------


    // Get Category single
    else if ($transaction == "get category item single") {
        echo json_encode($api->get_cat_single($_POST['cat_code']));
    }
    // -------------------------------------------------------------

    // Edit item category
    else if ($transaction == "edit item category") {
        $cat_code = $_POST['editcat_code'];
        //$cat_dept = $_POST['edititem_dept_owner_cat'];
        $cat_name = $_POST['editcat_name'];
        echo json_encode($api->update_cat($cat_code, $cat_name));
    }
    // ---------------------------------------------------------------

    // Category deleted
    else if ($transaction == "delete item category") {
        $cat_code = $_POST['cat_code_delete'];
        echo json_encode($api->delete_cat($cat_code));
    }


    //-------------------------------------------------------------------

    //Assign CAtegories per department
    else if ($transaction == "assign item category") {
        $categories = $_POST['sel_categories'] ?? [];
        $dept = $_POST['dept_id_assign'];
        //remove existing
        if ($api->databaseConnection()) {
            $sql_del = $api->db_connection->prepare("DELETE FROM tbldepthasitemcategory where DEPARTMENT_ID=:del_dept_id");
            $sql_del->bindParam(':del_dept_id', $dept);
            try {
                $sql_del->execute();
            } catch (\Throwable $th) {
                echo json_encode($th);
            }
        }
        //assigning
        try {
            if (count($categories) != 0) {
                foreach ($categories as $value) {
                    $api->assign_cat_dept($dept, $value);
                }
            }

            echo json_encode('assign success');
        } catch (\Throwable $th) {
            echo json_encode($th);
        }
    } else if ($transaction == "get assign category dept") {
        $dept = $_POST['dept_id'];
        echo json_encode($api->get_assigned_cat_dept($dept));
    }

    // ----------------------------------------------------------------

    // Add Brand
    else if ($transaction == "add brand") {
        $brand_code = $_POST['addbrand_code'];
        $brand_name = $_POST['addbrand_name'];
        //$brand_cat = $_POST['addbrand_cat'];

        echo json_encode($api->add_brand($brand_code, $brand_name));
    }
    // ----------------------------------------------------------------

    // Get the brand single  
    else if ($transaction == "get brand item single") {
        $brand_code = $_POST['brand_code'];
        echo json_encode($api->get_brand($brand_code));
        // echo json_encode($brand_code);
    }
    // ------------------------------------------------------------------

    // Edit the brand
    else if ($transaction == "edit brand") {

        $brand_code = $_POST['editbrand_code'];
        $brand_name = $_POST['editbrand_name'];

        echo json_encode($api->edit_brand($brand_code, $brand_name));
    }
    // --------------------------------------------------------------------

    // Deleted the brand
    else if ($transaction == "delete brand") {
        echo json_encode($api->delete_brand($_POST['delete_brand_code']));
    }
    #----------------------------------------------------------------------

    //Assign brand in category

    else if ($transaction == "assign category brand") {

        $brands = $_POST['sel_brand'] ?? [];;
        $categ = $_POST['cat_code_assign'];
        //echo json_encode($api->assign_brand_cat());

        //remove existing
        if ($api->databaseConnection()) {
            $sql_del = $api->db_connection->prepare("DELETE FROM tblcathasbrand where ITEM_CATEGORY=:categ");
            $sql_del->bindParam(':categ', $categ);
            try {
                $sql_del->execute();
            } catch (\Throwable $th) {
                echo json_encode($th);
            }
        }


        //assigning
        try {
            if (count($brands) != 0) {
                foreach ($brands as $value) {
                    $api->assign_brand_cat($value, $categ);
                }
            }
            echo json_encode('assign success');
        } catch (\Throwable $th) {
            echo json_encode($th);
        }
    } else if ($transaction == "get assign brand cat") {
        $cat = $_POST['cat'];
        echo json_encode($api->get_assigned_brand_cat($cat));
    }

    #-----------------------------------------------------------------------

    // get permission
    else if ($transaction == "get permission") {
        $username = $_POST['username'];
        $perm_id = $_POST['permissionid'];
        echo json_encode($api->check_role_permissions($username, $perm_id));
    }
    #---------------------------------------------------------------------

    # Delete (dispose) Inventory Item
    else if ($transaction == 'dispose item inventory') {

        $disposeitem_id = trim($_POST['disposeitem_id'], "ITEM_");
        echo json_encode($api->dispose_item_inventory($disposeitem_id));
    }
    # -------------------------------------------------------------

    # Insert Inventory Items
    else if ($transaction == 'insert item inventory') {


        if (isset($_POST['additem_dept_owner']) && !empty($_POST['additem_dept_owner']) && isset($_POST['additem_itemcategory']) && !empty($_POST['additem_itemcategory']) && isset($_POST['additem_brand']) && !empty($_POST['additem_brand']) && isset($_POST['additem_model']) && !empty($_POST['additem_model']) && isset($_POST['additem_serialnum']) && !empty($_POST['additem_serialnum']) && isset($_POST['additem_remarks']) && !empty($_POST['additem_remarks'])) {

            $dept_owner = $_POST['additem_dept_owner'];
            $item_cat = $_POST['additem_itemcategory'];
            $item_brand = $_POST['additem_brand'];
            $item_model = $_POST['additem_model'];
            $item_serial_num = $_POST['additem_serialnum'];
            $item_remarks = $_POST['additem_remarks'];
            $curr_val = $_POST['curr_value'];
            $orig_val = $_POST['orig_value'];
            $item_desc = $_POST['additem_description'];

            echo json_encode($api->insert_item_inventory($dept_owner, $item_cat, $item_brand, $item_model, $item_serial_num, $item_desc, $item_remarks, $curr_val, $orig_val));
        }
    }
    # -------------------------------------------------------------
    // Update Inventory
    else if ($transaction == "update item inventory") {


        $dept_owner = $_POST['edititem_dept_owner'];
        $item_cat = $_POST['edititem_itemcategory'];
        $item_brand = $_POST['edititem_brand'];
        $item_model = $_POST['edititem_model'];
        $item_serial_num = $_POST['edititem_serialnum'];
        $item_remarks = $_POST['edititem_remarks'];
        $curr_val = $_POST['edititem_curr_value'];
        $orig_val = $_POST['edititem_orig_value'];
        $item_desc = $_POST['edititem_description'];
        $item_id = $_POST['edititem_id'];

        echo $api->update_item_inventory($item_id, $dept_owner, $item_cat, $item_brand, $item_model, $item_serial_num, $item_desc, $item_remarks, $curr_val, $orig_val);
    }


    #-------------------------------------------------------------

    // ==========================changes lemarbil======================end


    # Get meeting details
    else if ($transaction == 'meeting details') {
        if (isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $attendee = '';
            $absentee = '';
            $meeting_id = $_POST['meetingid'];

            $meeting_details = $api->get_data_details_one_parameter('meeting', $meeting_id);
            $meeting_attendees_details = $api->get_data_details_one_parameter('meeting attendees', $meeting_id);
            $meeting_absentees_details = $api->get_data_details_one_parameter('meeting absentees', $meeting_id);

            for ($i = 0; $i < count($meeting_attendees_details); $i++) {
                $attendee .= $meeting_attendees_details[$i]['EMPLOYEE_ID'];

                if ($i != (count($meeting_attendees_details) - 1)) {
                    $attendee .= ',';
                }
            }

            for ($i = 0; $i < count($meeting_absentees_details); $i++) {
                $absentee .= $meeting_absentees_details[$i]['EMPLOYEE_ID'];

                if ($i != (count($meeting_absentees_details) - 1)) {
                    $absentee .= ',';
                }
            }

            $response[] = array(
                'MEETING_DATE' => $api->check_date('empty', $meeting_details[0]['MEETING_DATE'], '', 'm/d/Y', '', '', ''),
                'TITLE' => $meeting_details[0]['TITLE'],
                'PRESIDER' => $meeting_details[0]['PRESIDER'],
                'NOTED_BY' => $meeting_details[0]['NOTED_BY'],
                'PREVIOUS_MEETING' => $meeting_details[0]['PREVIOUS_MEETING'],
                'START_TIME' => $meeting_details[0]['START_TIME'],
                'END_TIME' => $meeting_details[0]['END_TIME'],
                'STATUS' => $meeting_details[0]['STATUS'],
                'MEETING_TYPE' => $meeting_details[0]['MEETING_TYPE'],
                'ATTENDEES' => $attendee,
                'ABSENTEES' => $absentee,
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get meeting permission details
    else if ($transaction == 'meeting permission details') {
        if (isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $meeting_id = $_POST['meetingid'];
            $meeting_permission_details = $api->get_data_details_one_parameter('meeting permission', $meeting_id);
            $response = array();

            for ($i = 0; $i < count($meeting_permission_details); $i++) {
                $permission = $meeting_permission_details[$i]['EMPLOYEE_ID'] . '-' . $meeting_permission_details[$i]['PERMISSION'];
                array_push($response, $permission);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get meeting task details
    else if ($transaction == 'meeting task details') {
        if (isset($_POST['taskid']) && !empty($_POST['taskid']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {
            $task_id = $_POST['taskid'];
            $meeting_id = $_POST['meetingid'];

            $meeting_details = $api->get_data_details_one_parameter('meeting', $meeting_id);
            $meeting_task_details = $api->get_data_details_one_parameter('meeting task', $task_id);

            $previous_meeting = $meeting_task_details[0]['PREVIOUS_MEETING'];
            $new_due_date = $meeting_task_details[0]['NEW_DUE_DATE'];

            if (!empty($previous_meeting) && !empty($new_due_date)) {
                if (strtotime($meeting_task_details[0]['DUE_DATE']) != strtotime($new_due_date)) {
                    $due_date = $meeting_task_details[0]['NEW_DUE_DATE'];
                } else {
                    $due_date = $meeting_task_details[0]['DUE_DATE'];
                }
            } else {
                $due_date = $meeting_task_details[0]['DUE_DATE'];
            }

            $response[] = array(
                'TASK' => $meeting_task_details[0]['TASK'],
                'EMPLOYEE_ID' => $meeting_task_details[0]['EMPLOYEE_ID'],
                'DEPARTMENT' => $meeting_task_details[0]['DEPARTMENT'],
                'AGENDA' => $meeting_task_details[0]['AGENDA'],
                'STATUS' => $meeting_task_details[0]['STATUS'],
                'DUE_DATE_TYPE' => $meeting_task_details[0]['DUE_DATE_TYPE'],
                'DUE_DATE' => $api->check_date('empty', $due_date, '', 'm/d/Y', '', '', ''),
                'MEETING_STATUS' => $meeting_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get meeting other matters details
    else if ($transaction == 'meeting other matters details') {
        if (isset($_POST['othermattersid']) && !empty($_POST['othermattersid']) && isset($_POST['meetingid']) && !empty($_POST['meetingid'])) {;
            $other_matters_id = $_POST['othermattersid'];
            $meeting_id = $_POST['meetingid'];

            $meeting_details = $api->get_data_details_one_parameter('meeting', $meeting_id);
            $meeting_other_matters_details = $api->get_data_details_one_parameter('meeting other matters', $other_matters_id);

            $response[] = array(
                'OTHER_MATTERS' => $meeting_other_matters_details[0]['OTHER_MATTERS'],
                'MEETING_STATUS' => $meeting_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
 
     else if ($transaction == 'overtime details') {
        if (isset($_POST['overtimeid']) && !empty($_POST['overtimeid'])) {
            $overtime_id = $_POST['overtimeid'];

            $overtime_details = $api->get_data_details_one_parameter('overtime', $overtime_id);

            $response[] = array(
                'OVERTIME_DATE' => $api->check_date('empty', $overtime_details[0]['OVERTIME_DATE'], '', 'm/d/Y', '', '', ''),
                'TITLE' => $overtime_details[0]['TITLE'],
                'REASON' => $overtime_details[0]['REASON'],
                'HOLIDAY_TYPE' => $overtime_details[0]['HOLIDAY_TYPE'],
                'START_TIME' => $overtime_details[0]['START_TIME'],
                'END_TIME' => $overtime_details[0]['END_TIME'],
                'STATUS' => $overtime_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
    
         else if ($transaction == 'training details') {
        if (isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $training_id = $_POST['trainingid'];

            $training_details = $api->get_data_details_one_parameter('training', $training_id);

            $response[] = array(
                'TRAINING_DATE' => $api->check_date('empty', $training_details[0]['TRAINING_DATE'], '', 'm/d/Y', '', '', ''),
                'TITLE' => $training_details[0]['TITLE'],
                'DETAILS' => $training_details[0]['DETAILS'],
                'TRAINING_TYPE' => $training_details[0]['TRAINING_TYPE'],
                'START_TIME' => $training_details[0]['START_TIME'],
                'END_TIME' => $training_details[0]['END_TIME'],
                'STATUS' => $training_details[0]['STATUS']
            );

            echo json_encode($response);
        }
    }
 
    # Get training attendees details
    else if ($transaction == 'training attendees details') {
        if (isset($_POST['trainingid']) && !empty($_POST['trainingid'])) {
            $training_id = $_POST['trainingid'];
            $training_attendees_details = $api->get_data_details_one_parameter('training attendees', $training_id);
            $response = array();

            for ($i = 0; $i < count($training_attendees_details); $i++) {
                array_push($response, $training_attendees_details[$i]['EMPLOYEE_ID']);
            }

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get training report details
    else if ($transaction == 'training report details') {
        if (isset($_POST['trainingid']) && !empty($_POST['trainingid']) && isset($_POST['username']) && !empty($_POST['username'])) {
            $training_id = $_POST['trainingid'];
            $username = $_POST['username'];

            $employee_details = $api->get_data_details_one_parameter('employee profile', $username);
            $employee_id = $employee_details[0]['EMPLOYEE_ID'];

            $training_report_details = $api->get_data_details_two_parameter('training report', $training_id, $employee_id);
            $response = array();

            $response[] = array(
                'COMMENTS' => $training_report_details[0]['COMMENTS'] ?? null,
                'LEARNINGS' => $training_report_details[0]['LEARNINGS'] ?? null
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get car search parameter details
    else if ($transaction == 'car search parameter details') {
        if (isset($_POST['parameterid']) && !empty($_POST['parameterid'])) {
            $parameter_id = $_POST['parameterid'];

            $car_search_parameter_details = $api->get_data_details_one_parameter('car search parameter', $parameter_id);

            $response[] = array(
                'PARAMETER_CODE' => $car_search_parameter_details[0]['PARAMETER_CODE'],
                'CATEGORY_TYPE' => $car_search_parameter_details[0]['CATEGORY_TYPE'],
                'PARAMETER_VALUE' => $car_search_parameter_details[0]['PARAMETER_VALUE'],
            );

            echo json_encode($response);
        }
    }
    
     # -------------------------------------------------------------
    #Insert overtime / rcmercado
       else if ($transaction == 'submit overtime') {
            if (
                isset($_POST['username']) && !empty($_POST['username']) && 
                isset($_POST['overtimeid']) && 
                isset($_POST['overtimetitle']) && !empty($_POST['overtimetitle']) && 
                isset($_POST['holidaytype']) && !empty($_POST['holidaytype']) && 
                isset($_POST['overtimedate']) && !empty($_POST['overtimedate'])  && 
                isset($_POST['starttime']) && !empty($_POST['starttime']) && 
                 isset($_POST['endtime']) && !empty($_POST['endtime']) && 
                 isset($_POST['reason']) && !empty($_POST['reason'])
            ) {
                $username = $_POST['username'];
                $overtime_id = $_POST['overtimeid'];
                $overtime_title = $_POST['overtimetitle'];
                $holiday_type = $_POST['holidaytype'];
                $overtime_date = $_POST['overtimedate']; 
                $start_time  = $_POST['starttime']; 
                $end_time  = $_POST['endtime']; 
                // Convert date format to YYYY-MM-DD
                $overtime_date = date('Y-m-d', strtotime($overtime_date));
                $reason  = $_POST['reason']; 
                // Check if the employee exists
                $employee_profile_details = $api->get_data_details_one_parameter('employee profile', $username);
                if (!$employee_profile_details || empty($employee_profile_details[0]['EMPLOYEE_ID'])) {
                    die("Error: Employee not found.");
                }
        
                $employee_id = $employee_profile_details[0]['EMPLOYEE_ID'];
        
                // Check if overtime ID already exists
                $check_data_exist_one_parameter = $api->check_data_exist_one_parameter('overtime', $overtime_id);
        
                 if ($check_data_exist_one_parameter > 0) {
                $update_overtime = $api->update_overtime($overtime_title, $holiday_type, $overtime_date, $start_time, $end_time, $reason, $overtime_id, $username);
                
                // Parse JSON response if needed
                $response = json_decode($update_overtime, true);
                echo ($response && $response['status'] == 'success') ? 'Updated' : $update_overtime;
                } else {
                    $insert_overtime = $api->insert_overtime($employee_id, $overtime_title, $holiday_type, $overtime_date,  $start_time, $end_time, $reason, $employee_profile_details);
        
                    if ($insert_overtime == '1') {
                        $insert_system_notification_by_superior = $api->insert_system_notification_by_type('Superior', 'Overtime Application', '', '', $username);
                        echo ($insert_system_notification_by_superior == '1') ? 'Inserted' : $insert_system_notification_by_superior;
                    } else {
                        echo $insert_overtime;
                    }
                }
            } else {
                die("Error: Missing required fields.");
            }
        }

     
    # -------------------------------------------------------------

    # Get price index item details
    else if ($transaction == 'price index item details') {
        if (isset($_POST['itemid']) && !empty($_POST['itemid'])) {
            $item_id = $_POST['itemid'];

            $price_index_item_details = $api->get_data_details_one_parameter('price index item', $item_id);

            $response[] = array(
                'BRAND' => $price_index_item_details[0]['BRAND'],
                'MODEL' => $price_index_item_details[0]['MODEL'],
                'VARIANT' => $price_index_item_details[0]['VARIANT'],
                'ENGINE_SIZE' => $price_index_item_details[0]['ENGINE_SIZE'],
                'GAS_TYPE' => $price_index_item_details[0]['GAS_TYPE'],
                'TRANSMISSION' => $price_index_item_details[0]['TRANSMISSION'],
                'DRIVE_TRAIN' => $price_index_item_details[0]['DRIVE_TRAIN'],
                'BODY_TYPE' => $price_index_item_details[0]['BODY_TYPE'],
                'SEATING_CAPACITY' => $price_index_item_details[0]['SEATING_CAPACITY'],
                'CAMSHAFT_PROFILE' => $price_index_item_details[0]['CAMSHAFT_PROFILE'],
                'COLOR_TYPE' => $price_index_item_details[0]['COLOR_TYPE'],
                'AIRCON_TYPE' => $price_index_item_details[0]['AIRCON_TYPE'],
                'OTHER_INFORMATION' => $price_index_item_details[0]['OTHER_INFORMATION'],
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # Get price index amount details
    else if ($transaction == 'price index amount details') {
        if (isset($_POST['itemid']) && !empty($_POST['itemid']) && isset($_POST['itemid']) && !empty($_POST['itemid'])) {
            $item_id = $_POST['itemid'];
            $year = $_POST['year'];
            $item = '';
            $item_array = [];

            $price_index_item_details = $api->get_data_details_one_parameter('price index item', $item_id);

            $brand = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['BRAND'])[0]['PARAMETER_VALUE'] ?? null;
            $model = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['MODEL'])[0]['PARAMETER_VALUE'] ?? null;
            $variant = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['VARIANT'])[0]['PARAMETER_VALUE'] ?? null;
            $engine_size = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['ENGINE_SIZE'])[0]['PARAMETER_VALUE'] ?? null;
            $gas_type = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['GAS_TYPE'])[0]['PARAMETER_VALUE'] ?? null;
            $transmission = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['TRANSMISSION'])[0]['PARAMETER_VALUE'] ?? null;
            $drive_train = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['DRIVE_TRAIN'])[0]['PARAMETER_VALUE'] ?? null;
            $body_type = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['BODY_TYPE'])[0]['PARAMETER_VALUE'] ?? null;
            $seating_capacity = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['SEATING_CAPACITY'])[0]['PARAMETER_VALUE'] ?? null;
            $camshaft_profile = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['CAMSHAFT_PROFILE'])[0]['PARAMETER_VALUE'] ?? null;
            $color_type = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['COLOR_TYPE'])[0]['PARAMETER_VALUE'] ?? null;
            $aircon_type = $api->get_data_details_one_parameter('car search parameter', $price_index_item_details[0]['AIRCON_TYPE'])[0]['PARAMETER_VALUE'] ?? null;

            if (!empty($brand)) {
                $item_array[] = $brand;
            }

            if (!empty($model)) {
                $item_array[] = $model;
            }

            if (!empty($variant)) {
                $item_array[] = $variant;
            }

            if (!empty($engine_size)) {
                $item_array[] = $engine_size;
            }

            if (!empty($gas_type)) {
                $item_array[] = $gas_type;
            }

            if (!empty($transmission)) {
                $item_array[] = $transmission;
            }

            if (!empty($drive_train)) {
                $item_array[] = $drive_train;
            }

            if (!empty($body_type)) {
                $item_array[] = $body_type;
            }

            if (!empty($seating_capacity)) {
                $item_array[] = $seating_capacity;
            }

            if (!empty($camshaft_profile)) {
                $item_array[] = $camshaft_profile;
            }

            if (!empty($color_type)) {
                $item_array[] = $color_type;
            }

            if (!empty($aircon_type)) {
                $item_array[] = $aircon_type;
            }

            if (!empty($other_information)) {
                $item_array[] = $other_information;
            }

            if (!empty($item_array)) {
                $item .= implode(' ', $item_array);
            }

            $price_index_item_details = $api->get_data_details_two_parameter('price index amount', $item_id, $year);

            $response[] = array(
                'ITEM' => $item,
                'ITEM_VALUE' => $price_index_item_details[0]['ITEM_VALUE']
            );

            echo json_encode($response);
        }
    }
    # -------------------------------------------------------------

    # -------------------------------------------------------------

    # Get employees by department
    else if($transaction == 'get employee by department'){
        $selected_department =  $_POST['selected_department'];
        // $arr_employees =[];
        $res = $api->get_data_details_one_parameter('employees department',$selected_department);

        if($selected_department == ""){
           $res = $api->generate_all_employees();
        }else{
            $res = $api->get_data_details_one_parameter('employees department',$selected_department);
        }
        echo json_encode($res) ;
    }
    
    else if ($transaction == 'get_hr_announcements') {
    $type = isset($_POST['type']) ? $_POST['type'] : null;
    $department = isset($_SESSION['department']) ? $_SESSION['department'] : null;
    $branch = isset($_SESSION['branch']) ? $_SESSION['branch'] : null;
    
    $details = $api->get_hr_announcements($type, $department, $branch);
    echo json_encode($details);
    }
    
    else if ($transaction == 'create_hr_announcement') {
        // Check if user has permission to create announcements
        if (!isset($_SESSION['user_role']) || ($_SESSION['user_role'] != 'admin' && $_SESSION['user_role'] != 'hr')) {
            echo json_encode(['status' => 'error', 'message' => 'Permission denied']);
            exit;
        }
        
        // Handle file upload if there's an attachment
        $attachment_path = null;
        if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == 0) {
            $upload_dir = 'uploads/announcements/';
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0755, true);
            }
            
            $filename = time() . '_' . $_FILES['attachment']['name'];
            $target_file = $upload_dir . $filename;
            
            if (move_uploaded_file($_FILES['attachment']['tmp_name'], $target_file)) {
                $attachment_path = $target_file;
            }
        }
        
        $data = [
            'title' => $_POST['title'],
            'content' => $_POST['content'],
            'type' => $_POST['type'],
            'start_date' => $_POST['start_date'],
            'end_date' => isset($_POST['end_date']) && !empty($_POST['end_date']) ? $_POST['end_date'] : null,
            'attachment' => $attachment_path,
            'is_priority' => isset($_POST['is_priority']) && $_POST['is_priority'] == '1' ? true : false,
            'department' => isset($_POST['department']) ? $_POST['department'] : null,
            'branch' => isset($_POST['branch']) ? $_POST['branch'] : null,
            'created_by' => $_SESSION['employee_id'] // Assuming you store the logged-in user's ID in session
        ];
        
        $result = $api->create_hr_announcement($data);
        
        if ($result) {
            echo json_encode(['status' => 'success', 'id' => $result]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to create announcement']);
        }
    }
    
    // Optional: Add handlers for policy documents and events
    else if ($transaction == 'get_hr_policies') {
        $details = $api->get_hr_policies();
        echo json_encode($details);
    }
    
    else if ($transaction == 'get_hr_events') {
        $start_date = isset($_POST['start_date']) ? $_POST['start_date'] : null;
        $end_date = isset($_POST['end_date']) ? $_POST['end_date'] : null;
        $details = $api->get_hr_events($start_date, $end_date);
        echo json_encode($details);
    }




     # -------------------------------------------------------------

    # -------------------------------------------------------------

    else if($transaction == 'insert pdc monitoring'){

        $loan_num = $_POST['loan_num'];
        $curr_pdc_num = $_POST['curr_pdc_num'];
        $undertaking =($_POST['undertaking'] == "") ? null : $_POST['undertaking'] ;
        $assign_to = $_POST['assign_emp_add'];
        $branch = $_POST['branch'];

        //check if the ASSIGN_TO is active
        $emp_details = $api->get_data_details_one_parameter('user account',$assign_to)[0]['ACTIVE'];
        if($emp_details=="1"){
            $res = $api->add_pdc_monitoring($loan_num,$curr_pdc_num,$undertaking,$assign_to,$branch);
            echo json_encode($res);
        }else{
            echo json_encode('Assigned partner is inactive');
        }
    }

    else if($transaction == 'insert pdc remarks monitoring'){
        $id_monitor = $_POST['id_monitoring_remarks'];
        $pdc_remarks = $_POST['pdc_remarks'];
        $res = $api->insert_pdc_remarks($id_monitor,$pdc_remarks);
       echo json_encode($res);
    }
    else if($transaction == 'get pdc remarks'){
        $id_monitoring = $_POST['id_monitoring'];
       $res = $api->get_pdc_remarks_monitoring($id_monitoring);
       echo json_encode($res);
    }
    else if($transaction == 'get pdc monitoring'){
        $res = $api->get_data_details_one_parameter('pdc monitoring',$_POST['id_monitoring']);
        echo json_encode($res);
    }
    else if($transaction == "update pdc monitoring check number"){
        $id_monitoring = $_POST['pdc_check_number_id_monitoring'];
        $pdc_number_update = $_POST['pdc_number_update'];
        $undertaking = $_POST['undertaking_update'];
        $assign_emp_update = $_POST['assign_emp_update'];
        $branch_update = $_POST['branch_update'];
        $res = $api->update_pdc_current_check_number_monitoring($id_monitoring,$pdc_number_update,$undertaking,$assign_emp_update,$branch_update);
        echo json_encode($res);
    }
    else if($transaction == "delete pdc monitoring"){
        $id_monitoring = $_POST['id_monitoring'];
        $res = $api->delete_pdc_monitoring($id_monitoring);
        echo json_encode($res);
    }



}
