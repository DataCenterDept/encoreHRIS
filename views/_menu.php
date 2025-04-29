<?php
    $menu = '';
    # Check role permission
    
    # Main pages
    $dashboard_page = $api->check_role_permissions($username, 23);

    # Administrator pages
    $roles_page = $api->check_role_permissions($username, 1);
    $permission_page = $api->check_role_permissions($username, 8);
    $system_code_page = $api->check_role_permissions($username, 15);
    $system_parameter_page = $api->check_role_permissions($username, 19);
    $user_logs_page = $api->check_role_permissions($username, 24);
    $company_settings_page = $api->check_role_permissions($username, 25);
    $application_settings_page = $api->check_role_permissions($username, 29);
    $employee_list_page = $api->check_role_permissions($username, 31);
    $department_page = $api->check_role_permissions($username, 35);
    $designation_page = $api->check_role_permissions($username, 39);
    $branch_page = $api->check_role_permissions($username, 43);
    $holiday_page = $api->check_role_permissions($username, 47);
    $leave_settings_page = $api->check_role_permissions($username, 51);
    $leave_approval_page = $api->check_role_permissions($username, 65);
    $payroll_specification_page = $api->check_role_permissions($username, 73);
    $deduction_type_page = $api->check_role_permissions($username, 77);
    $deduction_amount_page = $api->check_role_permissions($username, 86);
    $allowance_type_page = $api->check_role_permissions($username, 91);
    $other_income_type_page = $api->check_role_permissions($username, 95);
    $user_account_page = $api->check_role_permissions($username, 104);
    $email_settings_page = $api->check_role_permissions($username, 112);
    $generate_payroll_page = $api->check_role_permissions($username, 119);
    $office_shift_page = $api->check_role_permissions($username, 124);
    $payroll_group_page = $api->check_role_permissions($username, 129);
    $attendance_record_page = $api->check_role_permissions($username, 136);
    $leave_application_page = $api->check_role_permissions($username, 142);
    $employee_attendance_record_page = $api->check_role_permissions($username, 146);
    $attendance_record_adjustment_approval_page = $api->check_role_permissions($username, 151);
    $attendance_summary_page = $api->check_role_permissions($username, 156);
    $payroll_summary_page = $api->check_role_permissions($username, 157);
    $telephone_log_page = $api->check_role_permissions($username, 160);
    $telephone_log_approval_page = $api->check_role_permissions($username, 167);
    $document_management_settings_page = $api->check_role_permissions($username, 172);
    $pending_documents_page = $api->check_role_permissions($username, 176);
    $rescinded_documents_page = $api->check_role_permissions($username, 176);
    $all_documents = $api->check_role_permissions($username, 184);
    $transmittal_page = $api->check_role_permissions($username, 189);
    $suggest_to_win_page = $api->check_role_permissions($username, 199);
    $suggest_to_win_approval_page = $api->check_role_permissions($username, 206);
    $suggest_to_win_voting_page = $api->check_role_permissions($username, 210);
    $suggest_to_win_vote_summary_page = $api->check_role_permissions($username, 213);
    $training_room_log_page = $api->check_role_permissions($username, 220);
    $training_room_log_approval_page = $api->check_role_permissions($username, 225);
    $weekly_cash_flow_projection_page = $api->check_role_permissions($username, 233);
    $weekly_cash_flow_projection_summary_page = $api->check_role_permissions($username, 246);
    $ticket_page = $api->check_role_permissions($username, 247);
    $ticket_adjustment_request_page = $api->check_role_permissions($username, 275);
    // =======================changes lemar bill=====================================
    $inventory_page = $api->check_role_permissions($username,336);
    $inventory_brand_page = $api->check_role_permissions($username,340);
    $inventory_category_page = $api->check_role_permissions($username,341);
    $inventory_inquiry_page = $api->check_role_permissions($username,342);
    // ===============================changes lemar bill==============================
    $telephone_log_summary = $api->check_role_permissions($username, 280);
    $attendance_adjustment_recommendation = $api->check_role_permissions($username, 289);
    $health_declaration_summary = $api->check_role_permissions($username, 294);
    $meeting = $api->check_role_permissions($username, 296);
   // =======================changes lemar bill=====================================
    $trainings_and_seminars_page = $api->check_role_permissions($username, 315);
    $trainings_and_seminars_recommendation_page = $api->check_role_permissions($username, 322);
    $trainings_and_seminars_approval_page = $api->check_role_permissions($username, 327);
    $trainings_report_page = $api->check_role_permissions($username, 331);  
    // =======================changes rcmercado=====================================
    
   
    $overtime_management_page = $api->check_role_permissions($username, 404);
    $overtime_management_recommendation_page = $api->check_role_permissions($username, 410);
    $overtime_management_approval_page = $api->check_role_permissions($username, 420);
    // =======================changes lemar bill=====================================

    $activity_note_page = $api->check_role_permissions($username, 379);
    $insurance_req_page = $api->check_role_permissions($username,389);
    $vault_access_page = $api->check_role_permissions($username,396);
    $pdc_monitoring_main_page = $api->check_role_permissions($username,398);
    // ===============================changes ldagulto ==============================
    $payment_due_calculator_page = $api->check_role_permissions($username, 350);
	$car_search_parameter_page = $api->check_role_permissions($username, 352);
    $price_index_item_page = $api->check_role_permissions($username, 357);
    $price_index_amount_page = $api->check_role_permissions($username, 362);
    $price_index_amount_adjustment_page = $api->check_role_permissions($username, 371);
    $attendance_adjustment_summary_page = $api->check_role_permissions($username, 375);
    $application_rate_calculator = $api->check_role_permissions($username, 376);
    ######################## QUOTA MONITORING ###################################
    $sales_quota_monitoring = $api->check_role_permissions($username, 403);

    if($dashboard_page > 0){
        $menu .= '<li class="menu-title" key="t-menu">Dashboard</li>
                    <li>
                        <a href="dashboard.php" class="waves-effect">
                            <i class="bx bx-home-alt"></i>
                            <span key="t-dashboard">Dashboard</span>
                        </a>
                    </li>';
    }

    if($employee_attendance_record_page > 0 || $leave_application_page > 0 || $transmittal_page > 0 || $telephone_log_page > 0 || $training_room_log_page > 0 || $suggest_to_win_page > 0 || $suggest_to_win_approval_page > 0 || $suggest_to_win_voting_page > 0 || $suggest_to_win_vote_summary_page > 0 || $leave_approval_page > 0 || $telephone_log_approval_page > 0 || $telephone_log_summary > 0 || $weekly_cash_flow_projection_page > 0 || $ticket_page > 0 || $ticket_adjustment_request_page > 0 || $attendance_adjustment_recommendation > 0 ||  $overtime_management_page > 0 || $overtime_management_recommendation_page > 0 || $overtime_management_approval_page > 0 || $meeting > 0 || $trainings_and_seminars_page > 0 || $trainings_and_seminars_recommendation_page > 0 || $trainings_report_page > 0 || $payment_due_calculator_page > 0 || $application_rate_calculator > 0){
        $menu .= '<li class="menu-title" key="t-employee-modules">Employee Modules</li>';

        if($employee_attendance_record_page > 0 || $attendance_adjustment_recommendation > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-calendar"></i>
                            <span key="t-employee-modules">Employee Attendance</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($employee_attendance_record_page > 0){
                            $menu .= '<li><a href="employee-attendance-record.php" key="t-employee-modules">Attendance Record</a></li>';
                        }

                        if($attendance_adjustment_recommendation > 0){
                            $menu .= '<li><a href="attendance-adjustment-recommendation.php" key="t-employee-modules">Attendance Adjustment Recommendation</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }

        if($leave_application_page > 0 || $leave_approval_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-calendar-check"></i>
                            <span key="t-employee-modules">Leave Management</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($leave_application_page > 0){
                            $menu .= '<li><a href="leave-application.php" key="t-employee-modules">Leave Application</a></li>';
                        }

                        if($leave_approval_page > 0){
                            $menu .= '<li><a href="leave-approval.php" key="t-employee-modules">Leave Approval</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }
        
        
           //OVERTIME 
        
          if($overtime_management_page > 0 || $overtime_management_recommendation_page > 0 || $overtime_management_approval_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bxs-timer"></i>
                            <span key="t-employee-modules">Overtime Management</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($overtime_management_page > 0){
                            $menu .= '<li><a href="overtime-management.php" key="t-human-resource">Overtime Application</a></li>';
                        }

                        if($overtime_management_recommendation_page > 0){
                            $menu .= '<li><a href="overtime-recommendation.php" key="t-human-resource">Overtime Recommendation</a></li>';
                        }

                        if($overtime_management_approval_page > 0){
                            $menu .= '<li><a href="overtime-approval.php" key="t-human-resource">Overtime Approval</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }

        // if($telephone_log_page > 0 || $telephone_log_approval_page > 0 || $telephone_log_summary > 0){
        //     $menu .= '<li>
        //                 <a href="javascript: void(0);" class="has-arrow waves-effect">
        //                     <i class="bx bx-phone-call"></i>
        //                     <span key="t-employee-modules">Telephone Log</span>
        //                 </a>
        //                 <ul class="sub-menu" aria-expanded="false">';

        //                 if($telephone_log_page > 0){
        //                     $menu .= '<li><a href="telephone-log.php" key="t-employee-modules">Telephone Log</a></li>';
        //                 }

        //                 if($telephone_log_approval_page > 0){
        //                     $menu .= '<li><a href="telephone-log-approval.php" key="t-employee-modules">Telephone Log Approval</a></li>';
        //                 }

        //                 if($telephone_log_summary > 0){
        //                     $menu .= '<li><a href="telephone-log-summary.php" key="t-employee-modules">Telephone Log Summary</a></li>';
        //                 }

        //     $menu .= '</ul>
        //             </li>';
        // }

        // if($suggest_to_win_page > 0 || $suggest_to_win_approval_page > 0 || $suggest_to_win_voting_page > 0 || $suggest_to_win_vote_summary_page > 0){
        //     $menu .= '<li>
        //                 <a href="javascript: void(0);" class="has-arrow waves-effect">
        //                     <i class="bx bx-bulb"></i>
        //                     <span key="t-employee-modules">Suggest To Win</span>
        //                 </a>
        //                 <ul class="sub-menu" aria-expanded="false">';

        //                 if($suggest_to_win_page > 0){
        //                     $menu .= '<li><a href="manage-suggest-to-win.php" key="t-employee-modules">Manage Suggest To Win</a></li>';
        //                 }

        //                 if($suggest_to_win_approval_page > 0){
        //                     $menu .= '<li><a href="suggest-to-win-approval.php" key="t-employee-modules">Suggest To Win Approval</a></li>';
        //                 }

        //                 if($suggest_to_win_voting_page > 0){
        //                     $menu .= '<li><a href="suggest-to-win-voting.php" key="t-employee-modules">Suggest To Win Voting</a></li>';
        //                 }

        //                 if($suggest_to_win_vote_summary_page > 0){
        //                     $menu .= '<li><a href="suggest-to-win-summary.php" key="t-employee-modules">Suggest To Win Summary</a></li>';
        //                 }

        //     $menu .= '</ul>
        //             </li>';
        // }

        // if($weekly_cash_flow_projection_page > 0 || $weekly_cash_flow_projection_summary_page > 0){
        //     $menu .= '<li>
        //                 <a href="javascript: void(0);" class="has-arrow waves-effect">
        //                     <i class="bx bx-line-chart"></i>
        //                     <span key="t-weekly-cash-flow-modules">Weekly Cash Flow</span>
        //                 </a>
        //                 <ul class="sub-menu" aria-expanded="false">';

        //                 if($weekly_cash_flow_projection_page > 0){
        //                     $menu .= '<li><a href="weekly-cash-flow-projection.php" key="t-weekly-cash-flow-modules">Weekly Cash Flow Projection</a></li>';
        //                 }

        //                 if($weekly_cash_flow_projection_summary_page > 0){
        //                     $menu .= '<li><a href="weekly-cash-flow-projection-summary.php" key="t-weekly-cash-flow-modules">Weekly Cash Flow Projection Summary</a></li>';
        //                 }

        //     $menu .= '</ul>
        //             </li>';
        // }

        // if($ticket_page > 0 || $ticket_adjustment_request_page > 0){
        //     $menu .= '<li>
        //                 <a href="javascript: void(0);" class="has-arrow waves-effect">
        //                     <i class="bx bx-bug"></i>
        //                     <span key="t-weekly-cash-flow-modules">Help Desk</span>
        //                 </a>
        //                 <ul class="sub-menu" aria-expanded="false">';

        //                 if($ticket_page > 0){
        //                     $menu .= '<li><a href="ticket.php" key="t-weekly-cash-flow-modules">Ticket</a></li>';
        //                 }

        //                 if($ticket_adjustment_request_page > 0){
        //                     $menu .= '<li><a href="ticket-adjustment-request.php" key="t-weekly-cash-flow-modules">Ticket Adjustment Request</a></li>';
        //                 }

        //     $menu .= '</ul>
        //             </li>';
        // }

        // if($meeting > 0){
        //     $menu .= '<li>
        //                 <a href="javascript: void(0);" class="has-arrow waves-effect">
        //                     <i class="bx bx-book-content"></i>
        //                     <span key="t-human-resource-modules">Meeting</span>
        //                 </a>
        //                 <ul class="sub-menu" aria-expanded="false">';

        //                 if($meeting > 0){
        //                     $menu .= '<li><a href="minutes-of-the-meeting.php" key="t-human-resource">Minutes of the Meeting</a></li>';
        //                 }

        //     $menu .= '</ul>
        //             </li>';
        // }

        if($trainings_and_seminars_page > 0 || $trainings_and_seminars_recommendation_page > 0 || $trainings_report_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-news"></i>
                            <span key="t-human-resource-modules">Trainings & Seminars</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($trainings_and_seminars_page > 0){
                            $menu .= '<li><a href="trainings-and-seminars.php" key="t-human-resource">Manage Trainings & Seminars</a></li>';
                        }

                        if($trainings_and_seminars_recommendation_page > 0){
                            $menu .= '<li><a href="trainings-and-seminars-recommendation.php" key="t-human-resource">Trainings & Seminars Recommendation</a></li>';
                        }

                        if($trainings_report_page > 0){
                            $menu .= '<li><a href="training-report.php" key="t-human-resource">Training Report</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }
        
        
     
// 		if($car_search_parameter_page > 0 || $price_index_item_page > 0 || $price_index_amount_page > 0 || $price_index_amount_adjustment_page > 0){
//             $menu .= '<li>
//                         <a href="javascript: void(0);" class="has-arrow waves-effect">
//                             <i class="bx bx-car"></i>
//                             <span key="t-human-resource-modules">Price Index</span>
//                         </a>
//                         <ul class="sub-menu" aria-expanded="false">';

//                         if($price_index_amount_page > 0){
//                             $menu .= '<li><a href="price-index-amount.php" key="t-human-resource">Price Index Amount</a></li>';
//                         }

//                         if($price_index_amount_adjustment_page > 0){
//                             $menu .= '<li><a href="price-index-amount-adjustment.php" key="t-human-resource">Price Index Amount Adjustment</a></li>';
//                         }

//                         if($price_index_item_page > 0){
//                             $menu .= '<li><a href="price-index-item.php" key="t-human-resource">Price Index Item</a></li>';
//                         }

//                         if($car_search_parameter_page > 0){
//                             $menu .= '<li><a href="car-search-parameter.php" key="t-human-resource">Car Search Parameter</a></li>';
//                         }

//             $menu .= '</ul>
//                     </li>';
//         }

//         if($transmittal_page > 0){
//             $menu .= '<li>
//                         <a href="transmittal.php" class="waves-effect">
//                             <i class="bx bx-archive"></i>
//                             <span key="t-employee-modules">Transmittal</span>
//                         </a>
//                     </li>';
//         }

//         if($training_room_log_page > 0){
//             $menu .= '<li>
//                         <a href="training-room-log.php" class="waves-effect">
//                             <i class="bx bx-notepad"></i>
//                             <span key="t-employee-modules">Training Room Log</span>
//                         </a>
//                     </li>';
//         }

//         if($payment_due_calculator_page > 0){
//             $menu .= '<li>
//                         <a href="payment-due-calculator.php" class="waves-effect">
//                             <i class="bx bx-calculator"></i>
//                             <span key="t-employee-modules">Payment Due Calculator</span>
//                         </a>
//                     </li>';
//         }

//         if($application_rate_calculator > 0){
//             $menu .= '<li>
//                         <a href="rate-calculator.php" class="waves-effect">
//                             <i class="bx bx-wallet-alt"></i>
//                             <span key="t-employee-modules">Rate Calculator</span>
//                         </a>
//                     </li>';
//         }

        if($activity_note_page > 0){
            $menu .= '<li>
                        <a href="activity-note.php" class="waves-effect">
                            <i class="bx bx-edit-alt"></i>
                            <span key="t-employee-modules">Activity Notes</span>
                        </a>
                    </li>';
        }

//         if($insurance_req_page > 0){
//             $menu .= '<li>
//                         <a href="insurance-request.php" class="waves-effect">
//                         <i class="bx bx-edit"></i>
//                             <span key="t-employee-modules">Insurance Request</span>
//                         </a>
//                     </li>';
//         }

//         if($vault_access_page > 0){
//             $menu .= '<li>
//                             <a href="vault-access-mngt.php" class="waves-effect">
//                                 <i class="bx bx-detail"></i>
//                                 <span key="t-userlogs">Vault Access Logs</span>
//                             </a>
//                         </li>';
//         }

//         if($pdc_monitoring_main_page > 0){
//             $menu .= '<li>
//                             <a href="pdc-monitoring.php" class="waves-effect">
//                                 <i class="bx bx-search-alt"></i>
//                                 <span key="t-userlogs">PDC Monitoring</span>
//                             </a>
//                         </li>';
//         }

//         if($sales_quota_monitoring > 0){
//             $menu .= '<li>
//                             <a href="quota-monitoring.php" class="waves-effect">
//                                 <i class="bx bx-line-chart"></i>
//                                 <span key="t-userlogs">Sales Quota Monitoring</span>
//                             </a>
//                         </li>';
//         }
        


    }

    if($employee_list_page > 0 || $attendance_record_page > 0 || $attendance_record_adjustment_approval_page > 0 || $office_shift_page > 0 || $attendance_summary_page > 0 || $generate_payroll_page > 0 || $payroll_specification_page > 0 || $payroll_group_page > 0 || $allowance_type_page > 0 || $other_income_type_page > 0 || $deduction_type_page > 0 || $deduction_amount_page > 0 || $training_room_log_approval_page > 0 || $health_declaration_summary > 0 || $trainings_and_seminars_approval_page > 0 || $attendance_adjustment_summary_page > 0){
        $menu .= '<li class="menu-title" key="t-human-resource">Human Resource Modules</li>';
        
        // if($hr_announcement < 1){
        //     $menu .= '<li>
        //                 <a href="hr-announcement.php" class="waves-effect">
        //                     <i class="bx bxs-bell-plus"></i>
        //                     <span key="t-human-resource-modules">Announcements</span>
        //                 </a>
        //             </li>';
        // }

        if($employee_list_page > 0){
            $menu .= '<li>
                        <a href="employee-list.php" class="waves-effect">
                            <i class="bx bx-user"></i>
                            <span key="t-human-resource-modules">Employee List</span>
                        </a>
                    </li>';
        }

        if($attendance_record_page > 0 || $attendance_record_adjustment_approval_page > 0 || $office_shift_page > 0 || $attendance_summary_page > 0 || $attendance_adjustment_summary_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-calendar"></i>
                            <span key="t-human-resource-modules">Timesheets</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($attendance_record_page > 0){
                            $menu .= '<li><a href="attendance-record.php" key="t-human-resource">Attendance Record</a></li>';
                        }

                        if($attendance_record_adjustment_approval_page > 0){
                            $menu .= '<li><a href="attendance-adjustment.php" key="t-human-resource">Attendance Adjustment</a></li>';
                        }

                        if($attendance_summary_page > 0){
                            $menu .= '<li><a href="attendance-summary.php" key="t-human-resource">Attendance Summary</a></li>';
                        }

                        if($attendance_adjustment_summary_page > 0){
                            $menu .= '<li><a href="attendance-adjustment-summary.php" key="t-human-resource">Attendance Adjustment Summary</a></li>';
                        }

                        if($office_shift_page > 0){
                            $menu .= '<li><a href="office-shift.php" key="t-human-resource">Office Shift</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }
        
    

        if($generate_payroll_page > 0 || $payroll_summary_page > 0 || $payroll_specification_page > 0 || $payroll_group_page > 0 || $allowance_type_page > 0 || $other_income_type_page > 0 || $deduction_type_page > 0 || $deduction_amount_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-money"></i>
                            <span key="t-human-resource-modules">Payroll</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($generate_payroll_page > 0){
                            $menu .= '<li><a href="generate-payroll.php" key="t-human-resource-modules">Generate Payroll</a></li>';
                        }

                        if($payroll_specification_page > 0){
                            $menu .= '<li><a href="payroll-specification.php" key="t-human-resource-modules">Payroll Specification</a></li>';
                        }

                        if($payroll_group_page > 0){
                            $menu .= '<li><a href="payroll-group.php" key="t-human-resource-modules">Payroll Group</a></li>';
                        }

                        if($allowance_type_page > 0){
                            $menu .= ' <li>
                                            <a href="javascript: void(0);" class="has-arrow waves-effect">
                                                <span key="t-multi-level">Allowance</span>
                                            </a>
                                            <ul class="sub-menu" aria-expanded="true">';

                                            if($allowance_type_page > 0){
                                                $menu .= '<li><a href="allowance-type.php" key="t-human-resource-modules">Allowance Type</a></li>';
                                            }
                                           
                                    $menu .= '</ul>
                                        </li>';
                        }

                        if($other_income_type_page > 0){
                            $menu .= ' <li>
                                            <a href="javascript: void(0);" class="has-arrow waves-effect">
                                                <span key="t-multi-level">Other Income</span>
                                            </a>
                                            <ul class="sub-menu" aria-expanded="true">';

                                            if($other_income_type_page > 0){
                                                $menu .= '<li><a href="other-income-type.php" key="t-human-resource-modules">Other Income Type</a></li>';
                                            }
                                           
                                    $menu .= '</ul>
                                        </li>';
                        }

                        if($deduction_type_page > 0 || $deduction_amount_page > 0){
                            $menu .= ' <li>
                                            <a href="javascript: void(0);" class="has-arrow waves-effect">
                                                <span key="t-multi-level">Deductions</span>
                                            </a>
                                            <ul class="sub-menu" aria-expanded="true">';

                                            if($deduction_type_page > 0){
                                                $menu .= '<li><a href="deduction-type.php" key="t-human-resource-modules">Deduction Type</a></li>';
                                            }

                                            if($deduction_amount_page > 0){
                                                $menu .= '<li><a href="deduction-amount-main.php" key="t-human-resource-modules">Deduction Amount</a></li>';
                                            }
                                           
                                    $menu .= '</ul>
                                        </li>';
                        }

                        if($payroll_summary_page > 0){
                            $menu .= '<li><a href="payroll-summary.php" key="t-human-resource-modules">Payroll Summary</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }

        // if($training_room_log_approval_page > 0){
        //     $menu .= '<li>
        //                 <a href="training-room-approval.php" class="waves-effect">
        //                     <i class="bx bx-book"></i>
        //                     <span key="t-human-resource-modules">Training Room Approval</span>
        //                 </a>
        //             </li>';
        // }

        // if($trainings_and_seminars_approval_page > 0){
        //     $menu .= '<li>
        //                 <a href="training-and-seminars-approval.php" class="waves-effect">
        //                     <i class="bx bx-certification"></i>
        //                     <span key="t-human-resource-modules">Training Approval</span>
        //                 </a>
        //             </li>';
        // }

        // if($health_declaration_summary > 0){
        //     $menu .= '<li>
        //                 <a href="health-declaration-summary.php" class="waves-effect">
        //                     <i class="bx bx-health"></i>
        //                     <span key="t-human-resource-modules">Health Declaration</span>
        //                 </a>
        //             </li>';
        // }
    }

    //  if($all_documents > 0 || $pending_documents_page > 0 || $document_management_settings_page > 0){
    
    //         if($all_documents > 1){
    //                         $menu .= '<li class="menu-title" key="t-document-modules">Document Modules</li>';

    //               $menu .= '<li>
    
    //                         <a href="javascript: void(0);" class="has-arrow waves-effect">
    //                             <i class="bx bx-archive"></i>
    //                             <span key="t-weekly-cash-flow-modules">Published Documents</span>
    //                         </a>
    //                             <ul class="sub-menu" aria-expanded="false">
    //                                                  <li><a href="all-published-documents.php" key="t-weekly-cash-flow-modules">All Published Documents</a></li>
    
    //                             <li>
    //                                 <a href="javascript: void(0);" class="has-arrow">Policies and Procedures</a>
    //                                 <ul class="sub-menu" aria-expanded="false">
    //                                     <li><a href="credit-documents-category.php">Credit Policies and Procedures</a></li>
    //                                     <li><a href="admin-documents-category.php">Administrative Policies and Procedures</a></li>
    //                                 </ul>
    //                             </li>
    //                             <li><a href="memorandums-documents-category.php" key="t-weekly-cash-flow-modules">Memos and Announcements</a></li>
    //                             <li><a href="images-documents-category.php" key="t-weekly-cash-flow-modules">Images</a></li>
    //                             <li><a href="loan-documents-category.php" key="t-weekly-cash-flow-modules">Loan Documents</a></li>
    //                             <li><a href="forms-category.php" key="t-weekly-cash-flow-modules">Forms</a></li>
    //                         </ul>
    //                     </li>';
    //         }

    //     if($pending_documents_page > 0){
    //         $menu .= '<li>
    //                     <a href="pending-documents.php" class="waves-effect">
    //                         <i class="bx bx-file"></i>
    //                         <span key="t-document-modules">Pending Documents</span>
    //                     </a>
    //                 </li>';
    //     }
        
    //      if($rescinded_documents_page > 0){
    //         $menu .= '<li>
    //                     <a href="rescinded-documents.php" class="waves-effect">
    //                         <i class="bx bx-block"></i>
    //                         <span key="t-document-modules">Rescinded Documents</span>
    //                     </a>
    //                 </li>';
    //     }

    //     if($document_management_settings_page > 0){
    //         $menu .= '<li>
    //                     <a href="document-management-settings.php" class="waves-effect">
    //                         <i class="bx bx-cog"></i>
    //                         <span key="t-document-modules">Document Settings</span>
    //                     </a>
    //                 </li>';
    //     }
    // }
// ==============================changes lemar bill====================================
// if($inventory_page > 0 || $inventory_brand_page > 0 || $inventory_category_page > 0  ){
//     $menu.= '<li class="menu-title" key="t-inventory-modules">Inventory Modules</li>';
//     if($inventory_page > 0 ){
//         $menu .= '<li>
//             <a href="inventory-items.php" key="t-settings">
//                 <i class="bx bxs-component"></i>
//                 <span key="t-document-modules">Inventory Items</span>
//             </a>
//         </li>';
//     }
//     if($inventory_category_page > 0 ){
//         $menu .= '<li>
//             <a href="inventory-category.php" key="t-settings">
//             <i class="bx bxs-package" ></i>
//                 <span key="t-document-modules">Categories</span>
//             </a>
//         </li>';
//     }

//     if($inventory_brand_page > 0 ){
//         $menu .= '<li>
//             <a href="inventory-brand.php" key="t-settings">
//             <i class="bx bxs-detail"></i>
//                 <span key="t-document-modules">Brands</span>
//             </a>
//         </li>';
//     }
//     if($inventory_inquiry_page > 0 ){
//         $menu .= '<li>
//             <a href="inventory-report.php" key="t-settings">
//             <i class="bx bxs-detail"></i>
//                 <span key="t-document-modules">Inventory Inquiry</span>
//             </a>
//         </li>';
//     }
// }
//=========================changes lemarbill========================================






    if($company_settings_page > 0 || $application_settings_page > 0 || $email_settings_page > 0 || $leave_settings_page > 0 || $branch_page > 0 || $department_page > 0 || $designation_page > 0 || $holiday_page > 0 || $roles_page > 0 || $permission_page > 0 || $system_code_page > 0 || $system_parameter_page > 0 || $user_account_page > 0 || $user_logs_page > 0){
        $menu .= '<li class="menu-title" key="t-menu">Administrator Modules</li>';

        if($company_settings_page > 0 || $application_settings_page > 0 || $email_settings_page > 0 || $leave_settings_page > 0 || $branch_page > 0 || $department_page > 0 || $designation_page > 0 || $holiday_page > 0 || $roles_page > 0 || $permission_page > 0 || $system_code_page > 0 || $system_parameter_page > 0){
            $menu .= '<li>
                        <a href="javascript: void(0);" class="has-arrow waves-effect">
                            <i class="bx bx-cog"></i>
                            <span key="t-settings">Settings</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">';

                        if($company_settings_page > 0){
                            $menu .= '<li><a href="company-settings.php" key="t-settings">Company Settings</a></li>';
                        }

                        if($application_settings_page > 0){
                            $menu .= '<li><a href="application-settings.php" key="t-settings">Application Settings</a></li>';
                        }

                        if($email_settings_page > 0){
                            $menu .= '<li><a href="email-settings.php" key="t-settings">Email Settings</a></li>';
                        }

                        if($leave_settings_page > 0){
                            $menu .= '<li><a href="leave-settings.php" key="t-settings">Leave Settings</a></li>';
                        }

                        if($branch_page > 0){
                            $menu .= '<li><a href="branch.php" key="t-settings">Branch</a></li>';
                        }

                        if($department_page > 0){
                            $menu .= '<li><a href="department.php" key="t-settings">Department</a></li>';
                        }

                        if($designation_page > 0){
                            $menu .= '<li><a href="designation.php" key="t-settings">Designation</a></li>';
                        }

                        if($holiday_page > 0){
                            $menu .= '<li><a href="holiday.php" key="t-settings">Holiday</a></li>';
                        }

                        if($roles_page > 0){
                            $menu .= '<li><a href="roles.php" key="t-settings">Roles</a></li>';
                        }

                        if($permission_page > 0){
                            $menu .= '<li><a href="permission.php" key="t-settings">Permission</a></li>';
                        }

                        if($system_code_page > 0){
                            $menu .= '<li><a href="system-code.php" key="t-settings">System Code</a></li>';
                        }

                        if($system_parameter_page > 0){
                            $menu .= '<li><a href="system-parameter.php" key="t-settings">System Parameter</a></li>';
                        }

            $menu .= '</ul>
                    </li>';
        }

        if($user_account_page > 0){
            $menu .= '<li>
                            <a href="user-account.php" class="waves-effect">
                                <i class="bx bx-user-plus"></i>
                                <span key="t-userlogs">User Account</span>
                            </a>
                        </li>';
        }


       




       
    }

?>

<style> 
:root {
  /* Color variables - matching Encore's dark theme */
  --sidebar-bg: #1e293b;
  --sidebar-text: #94a3b8;
  --sidebar-text-hover: #e2e8f0;
  --sidebar-active: #313643; /* Blue/purple from your screenshot */
  --sidebar-active-text: #ffffff;
  --sidebar-header: #64748b;
  --sidebar-border: #334155;
  --sidebar-hover-bg: #283548;
  --sidebar-item-radius: 10px; /* Consistent rounded corners */
}

#sidebar-menu ul li a {
 
    font-size: 12px!important;
 
}
/* Menu items container */
#side-menu > li {
  position: relative;
  width: 100%;
  padding: 0 10px; /* Create padding for the container */
  margin-bottom: 2px;
}

/* Menu item links */
#side-menu > li > a {
  display: flex;
  align-items: center; /* Vertical alignment */
  width: 100%; /* Fill the container width */
  padding: 10px 15px;
  color: var(--sidebar-text);
   border-radius: var(--sidebar-item-radius); 
  transition: all 0.3s ease;
  text-decoration: none;
}

/* Hover state */
#side-menu > li > a:hover {
  color: var(--sidebar-active-text);
  background-color: var(--sidebar-active);
}

/* Active state - matches your screenshot */
#side-menu > li > a.active,
#side-menu > li.mm-active > a {
  color: var(--sidebar-active-text);
  background-color: var(--sidebar-active);
  box-shadow: 0 2px 6px rgba(79, 70, 229, 0.4); /* Adds subtle depth */
}
 
/* Ensure icons also have the correct color in active state */
#side-menu > li > a.active i,
#side-menu > li.mm-active > a i {
  color: var(--sidebar-active-text);
}

/* Arrow for dropdown */
#side-menu > li > a.has-arrow::after {
  content: "\ea50"; /* Boxicons arrow code */
  font-family: "boxicons";
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
}

/* Rotate arrow when menu is expanded */
#side-menu > li.mm-active > a.has-arrow::after {
  transform: translateY(-50%) rotate(90deg);
}

 
 
</style>
 
            <div class="vertical-menu">
                <div data-simplebar class="h-100">
                    <div id="sidebar-menu">
                        <ul class="metismenu list-unstyled" id="side-menu">
                            <?php
                                echo $menu; // Your existing PHP-generated menu
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
       