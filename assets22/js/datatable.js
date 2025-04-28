// Destroy datatable
function destroy_datatable(datatablename){
    $(datatablename).DataTable().clear().destroy();
}

// Clear
function clear_datatable(datatablename){
    $(datatablename).dataTable().fnClearTable();
}


// Re-adjust datatable columns
function readjust_datatable_column(){
    $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $('a[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });

    $('#System-Modal').on('shown.bs.modal', function (e) {
        $.fn.dataTable.tables( {visible: true, api: true} ).columns.adjust();
    });
}

function generate_datatable(type, datatablename, order, ordertype, unsort, buttons = '0', showall = '0',completed = null){
    var username = $('#username').text();
    var column;

    destroy_datatable(datatablename);

    if(type == 'page table'){
        column = [ 
            { 'data' : 'PAGE_NAME' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'permission table'){
        column = [ 
            { 'data' : 'PERMISSION_ID' }, 
            { 'data' : 'PERMISSION_DESC' },
            { 'data' : 'PAGE_NAME' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'roles table'){
        column = [ 
            { 'data' : 'ROLE_DESC' }, 
            { 'data' : 'ACTIVE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'system parameter table'){
        column = [ 
            { 'data' : 'PARAMETER_DESC' },
            { 'data' : 'PARAMETER_EXTENSION' },
            { 'data' : 'PARAMETER_NUMBER' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'system code table'){
        column = [ 
            { 'data' : 'SYSTEM_TYPE' },
            { 'data' : 'SYSTEM_CODE' },
            { 'data' : 'SYSTEM_DESC' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'user logs table'){
        column = [ 
            { 'data' : 'USERNAME' },
            { 'data' : 'LOG_TYPE' },
            { 'data' : 'LOG_DATE' },
            { 'data' : 'LOG' }
        ];
    }
    else if(type == 'department table'){
        column = [ 
            { 'data' : 'DEPARTMENT' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'designation table'){
        column = [ 
            { 'data' : 'DESIGNATION' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'branch table'){
        column = [ 
            { 'data' : 'BRANCH' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'holiday table'){
        column = [ 
            { 'data' : 'HOLIDAY' }, 
            { 'data' : 'HOLIDAY_DATE' }, 
            { 'data' : 'HOLIDAY_TYPE' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'leave type table'){
        column = [ 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'NO_LEAVES' }, 
            { 'data' : 'PAID_STATUS' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'leave table'){
        column = [ 
            { 'data' : 'FULL_NAME' }, 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'TOTAL' }, 
            { 'data' : 'LEAVE_DATE' }, 
            { 'data' : 'REASON' }, 
            { 'data' : 'FILE_DATE' }, 
            { 'data' : 'ATTACHMENT_PATH' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'leave application table'){
        column = [ 
            { 'data' : 'FULL_NAME' }, 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_ATTACHMENT' }, 
            { 'data' : 'LEAVE_STATUS' }, 
            { 'data' : 'TOTAL' }, 
            { 'data' : 'LEAVE_DATE' }, 
            { 'data' : 'APPROVAL_DATE'},
            { 'data' : 'REASON' }, 
            { 'data' : 'FILE_DATE' }, 
            { 'data' : 'CANCELATION_REASON' }, 
            { 'data' : 'REJECTION_REASON' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll specification table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'PAYROLL_ID' },
            { 'data' : 'SPEC_TYPE' },
            { 'data' : 'CATEGORY' },
            { 'data' : 'STATUS' },
            { 'data' : 'SPEC_AMOUNT' },
            { 'data' : 'PAYROLL_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'deduction type table'){
        column = [ 
            { 'data' : 'DEDUCTION' },
            { 'data' : 'CATEGORY' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'allowance type table'){
        column = [ 
            { 'data' : 'ALLOWANCE' },
            { 'data' : 'TAX_TYPE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'other income type table'){
        column = [ 
            { 'data' : 'OTHER_INCOME' },
            { 'data' : 'TAX_TYPE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'main deduction amount table'){
        column = [ 
            { 'data' : 'DEDUCTION' },
            { 'data' : 'RANGE' },
            { 'data' : 'DEDUCTION_AMOUNT' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'user account table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'USERNAME' },
            { 'data' : 'ACTIVE' },
            { 'data' : 'LOCK_STATUS' },
            { 'data' : 'FAILED_LOGIN' },
            { 'data' : 'LAST_FAILED_LOGIN' },
            { 'data' : 'PASSWORD_EXPIRY_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'email notification table'){
        column = [ 
            { 'data' : 'NOTIFICATION' },
            { 'data' : 'ACTIVE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'office shift table'){
        column = [ 
            { 'data' : 'EMPLOYEE_FULL_NAME' },
            { 'data' : 'DTR_DAY' },
            { 'data' : 'DAY_OFF' },
            { 'data' : 'TIME' },
            { 'data' : 'LUNCH_BREAK' },
            { 'data' : 'HALF_DAY_MARK' },
            { 'data' : 'LATE_MARK' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll group table'){
        column = [ 
            { 'data' : 'PAYROLL_GROUP_DESC' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll group employee table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'PAYROLL_GROUP_DESC' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'attendance adjustment table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'STATUS' },
            { 'data' : 'ATTACHMENT' },
            { 'data' : 'REASON' },
            { 'data' : 'RECOMMEND_BY' },
            { 'data' : 'RECOMMEND_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'attendance adjustment recommendation table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'STATUS' },
            { 'data' : 'ATTACHMENT' },
            { 'data' : 'REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'telephone log table'){
        column = [ 
            { 'data' : 'RECIPIENT' },
            { 'data' : 'TELEPHONE' },
            { 'data' : 'STATUS' },
            { 'data' : 'INITIAL_CALL' },
            { 'data' : 'ACTUAL_CALL' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'telephone log approval table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'RECIPIENT' },
            { 'data' : 'TELEPHONE' },
            { 'data' : 'STATUS' },
            { 'data' : 'INITIAL_CALL' },
            { 'data' : 'ACTUAL_CALL' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'document authorizer table'){
        column = [ 
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'AUTHORIZER' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'pending documents table'){
        column = [ 
            { 'data' : 'DOCUMENT_ID' },
            { 'data' : 'DOCUMENT_NAME' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'DOCUMENT_CATEGORY' },
            { 'data' : 'STATUS' },
            { 'data' : 'DOCUMENT_EXTENSION' },
            { 'data' : 'DOCUMENT_SIZE' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    
        else if(type == 'rescinded documents table'){
        column = [ 
            { 'data' : 'DOCUMENT_ID' },
            { 'data' : 'DOCUMENT_NAME' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'DOCUMENT_CATEGORY' },
            { 'data' : 'STATUS' },
            { 'data' : 'DOCUMENT_EXTENSION' },
            { 'data' : 'DOCUMENT_SIZE' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'suggest to win voting table'){
        column = [ 
            { 'data' : 'TITLE' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'REASON' },
            { 'data' : 'BENEFITS' },
            { 'data' : 'STATUS' },
            { 'data' : 'VOTE_STATUS' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'VOTING_PERIOD' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'training room log approval table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DATE' },
            { 'data' : 'TIME' },
            { 'data' : 'EQUIPMENT' },
            { 'data' : 'PARTICIPANT' },
            { 'data' : 'OTHER_PARTICIPANT' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'ticket adjustment request table'){
        column = [ 
            { 'data' : 'REQUEST_BY' },
            { 'data' : 'ASSIGNED_EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'CATEGORY' },
            { 'data' : 'SUBJECT' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'PRIORITY' },
            { 'data' : 'DUE_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    //=============changes lemar bill===========
    else if(type == 'inventory item table'){
        column = [
            {'data': 'ITEM_ID'},
            {'data': 'BRAND'},
            {'data': 'MODEL'},
            {'data': 'DESCRIPTION'},
            {'data' : 'CURR_STATUS'},
            {'data' : 'ITEM_ID'},
            {'data': 'ACTION'}
        ]
    }
    // ==========changes lemar bill===============
    else if(type == 'dashboard transmittal table'){
        column = [ 
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'CURRENT' },
            { 'data' : 'TRANSMITTED' },
            { 'data' : 'TRANSACTION_DATE' },
            { 'data' : 'STATUS' },
            { 'data' : 'INCOMING_OUTGOING' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'training recommendation table' || type == 'training approval table' || type == 'training report table'){
        column = [ 
            { 'data' : 'TITLE' },
            { 'data' : 'AUTHOR' },
            { 'data' : 'TRAINING_DATE' },
            { 'data' : 'TRAINING_TIME' },
            { 'data' : 'TRAINING_TYPE' },
            { 'data' : 'STATUS' },
            { 'data' : 'ACTION' }
        ];
    }
	else if(type == 'meeting table'){
        column = [ 
            { 'data' : 'TITLE' },
            { 'data' : 'AUTHOR' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'MEETING_DATE' },
            { 'data' : 'MEETING_TIME' },
            { 'data' : 'MEETING_TYPE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
	else if(type == 'car search parameter table'){
        column = [ 
            { 'data' : 'PARAMETER_CODE' }, 
            { 'data' : 'PARAMETER_VALUE' }, 
            { 'data' : 'CATEGORY_TYPE' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'price index item table'){
        column = [ 
            { 'data' : 'ID' }, 
            { 'data' : 'ITEM' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'price index amount table'){
        column = [ 
            { 'data' : 'ITEM' }, 
            { 'data' : 'YEAR' }, 
            { 'data' : 'ITEM_VALUE' }, 
            { 'data' : 'LOANABLE_AMOUNT' }, 
            { 'data' : 'CREATED_DATE' }, 
            { 'data' : 'CREATED_BY' }, 
            { 'data' : 'LAST_UPDATE_DATE' }, 
            { 'data' : 'LAST_UPDATE_BY' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'price index amount adjustment table'){
        column = [ 
            { 'data' : 'ITEM' }, 
            { 'data' : 'YEAR' }, 
            { 'data' : 'AMOUNT' }, 
            { 'data' : 'STATUS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'activity table'){
        column = [ 
            { 'data' : 'EMP_LOCATION'},
            { 'data' : 'EMP_FULLNAME' }, 
            { 'data' : 'NOTES' }, 
            { 'data' : 'ACTIVITY_TYPE' },
            { 'data' : 'ACTIVITY_DATE' },
            { 'data' : 'CLIENT_NUM' },
            { 'data' : 'ACTION' }
        ];
    }else if(type == 'activity table attachment'){
        column = [ 
            { 'data' : 'TITLE'},
            { 'data' : 'ACTION' }
        ]
    }
    else if(type == 'insurance request table'){
        column = [ 
            { 'data' : 'CLIENTNAME'},
            { 'data' : 'COLID' },
            { 'data' : 'YEARMODEL' },
            { 'data' : 'UNITDESC' },
            { 'data' : 'REQUESTEDBY' },
            { 'data' : 'REQUESTEDDATE' },
            { 'data' : 'STATUS' },
            { 'data' : 'ACTION' }
          
        ]
    }
    else if(type == 'vault access logs table'){

        column = [ 
            { 'data' : 'ID'},
            { 'data' : 'PERSON' },
            { 'data' : 'ACTIVITY' },
            { 'data' : 'VAULT_BRANCH'},
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'REMARKS' }
           
        ]

    }
    else if(type == 'pdc monitoring table'){
        column = [
            { 'data' : 'LOAN_NUM'},
            { 'data' : 'CURR_PDC_NUMBER' },
            { 'data' : 'ASSIGN_TO' },
            { 'data' : 'BRANCH' },
            { 'data' : 'UNDERTAKING' },
            { 'data' : 'CREATED_BY' },
            { 'data' : 'CREATED_AT' },
            { 'data' : 'ACTION' },
        ]
    }
    else if(type == 'sales partner booking table'){
        column = [ 
            { 'data' : 'id' },
            { 'data' : 'full_name' },
            { 'data' : 'branch' },
            { 'data' : 'promissory_note_amount' },
            { 'data' : 'disbursement_date' }
        ];
    }
    else if(type == 'position monthly quota table'){
        column = [ 
            { 'data' : 'id' },
            { 'data' : 'position_name' },
            { 'data' : 'quota' }
        ];
    }
    else if(type == 'position monthly quota history table'){
        column = [ 
            { 'data' : 'id' },
            { 'data' : 'full_name' },
            { 'data' : 'position_monthly_quota_id' },
            { 'data' : 'date' }
        ];
    }
    else if(type == 'branch monthly quota history table'){
        column = [ 
            { 'data' : 'id' },
            { 'data' : 'branch' },
            { 'data' : 'quota' },
            { 'data' : 'date' }
        ];
    }

    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }

    if(buttons == '1'){
        var settings = {
            'ajax': { 
                'url' : 'system-generation.php',
                'method' : 'POST',
                'dataType': 'JSON',
                'data': {'type' : type, 'username' : username},
                'dataSrc' : ''
            },
            dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons: [
                'csv', 'excel', 'pdf'
            ],
            'order': [[ order, ordertype ]],
            'columns' : column,
            'scrollY': false,
            'scrollX': true,
            'scrollCollapse': true,
            'fnDrawCallback': function( oSettings ) {
                readjust_datatable_column();
            },
            'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': unsort
            }],
            'lengthMenu': length_menu,
            'language': {
                'emptyTable': 'No data found',
                'searchPlaceholder': 'Search...',
                'search': '',
                'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
            }
        };
    }
    else{

        if(type == 'pdc monitoring table'){

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        
        if(type == 'meeting table'){

            //filtering
            var filter_branch = $('#filter_branch').val();
            var filter_department = $('#filter_department').val();
            var filter_meeting_type = $('#filter_meeting_type').val();
            var filter_start_date = $('#filter_start_date').val();
            var filter_end_date = $('#filter_end_date').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_branch' : filter_branch, 'filter_department' : filter_department, 'filter_meeting_type' : filter_meeting_type, 'filter_start_date' : filter_start_date, 'filter_end_date' : filter_end_date},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }

        else if(type == 'vault access logs table'){

        
            var filter_start_date = $('#filter_start_date').val();
            var filter_end_date = $('#filter_end_date').val();
            var filter_act = $('#filter_activities').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_start_date' : filter_start_date,'filter_end_date' : filter_end_date, 'filter_act' : filter_act},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },

                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    {extend : 'csv',exportOptions: {columns : [1,2,3,4]}},{extend : 'excel',exportOptions: {columns : [1,2,3,4]}}, {extend : 'pdf',exportOptions: {columns : [1,2,3,4]}}
                ],

                
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],

               
                columnDefs :[{
                    targets : 2,className:"truncate"
                    
                }], createdRow: function(row){
                    var td = $(row).find(".truncate");
                    td.attr("title", td.html());
               },
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };





            

            

          

        }


        else if(type == 'insurance request table'){





            var filter_start_date = $('#filter_start_date').val();
            var filter_end_date = $('#filter_end_date').val();
            // status
            var filter_insurance_status = $('#filter_insurance_status').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_start_date' : filter_start_date,'filter_end_date' : filter_end_date, 'filter_insurance_status' : filter_insurance_status},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },

                // dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                // "<'row'<'col-sm-12'tr>>" +
                // "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                // buttons: [
                //     {extend : 'csv',exportOptions: {columns : [1,2,3,4,5,6]}},{extend : 'excel',exportOptions: {columns : [1,2,3,4,5,6]}}, {extend : 'pdf',exportOptions: {columns : [1,2,3,4,5,6]}}
                // ],

                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                columnDefs :[{
                    targets : 3,className:"truncate"
                    
                }], createdRow: function(row){
                    var td = $(row).find(".truncate");
                    td.attr("title", td.html());
               },
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };

        }

       

        else if (type == 'activity table attachment'){

            var act_id = $('#activity_id').val()            
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'activity_id' : act_id},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                columnDefs :[{
                    targets : 0,className:"truncate"
                    
                }], createdRow: function(row){
                    var td = $(row).find(".truncate");
                    td.attr("title", td.html());
               },
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };



        }
        else if(type == 'activity table'){

            var filter_start_date = $('#filter_start_date').val();
            var filter_end_date = $('#filter_end_date').val();
            var filter_department = $('#filter_department').val();
            var filter_act_type = $('#filter_activity_type').val();

			var username = $("#username").html();
            var transaction = "get permission";
            ajax_request(
              "controller.php",
              { username: username, transaction: transaction, permissionid: 386},
              function (d) {},
              function (res) {
                if (res.responseText == "0") {
                  $(".dt-buttons").remove();
                }
              }
            );
			
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_start_date' : filter_start_date,'filter_end_date' : filter_end_date,'filter_department' : filter_department,'filter_act_type' : filter_act_type},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },

                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    {extend : 'csv',exportOptions: {columns : [1,2,3,4,5,6]}},{extend : 'excel',exportOptions: {columns : [1,2,3,4,5,6]}}, {extend : 'pdf',exportOptions: {columns : [1,2,3,4,5,6]}}
                ],

                
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                columnDefs :[{
                    targets : 3,className:"truncate"
                    
                }], createdRow: function(row){
                    var td = $(row).find(".truncate");
                    td.attr("title", td.html());
               },
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else if(type == 'price index item table'){
            var filter_brand = $('#filter_brand').val();
            var filter_model = $('#filter_model').val();
            var filter_variant = $('#filter_variant').val();
            var filter_engine_size = $('#filter_engine_size').val();
            var filter_gas_type = $('#filter_gas_type').val();
            var filter_transmission = $('#filter_transmission').val();
            var filter_drive_train = $('#filter_drive_train').val();
            var filter_body_type = $('#filter_body_type').val();
            var filter_seating_capacity = $('#filter_seating_capacity').val();
            var filter_camshaft_profile = $('#filter_camshaft_profile').val();
            var filter_color_type = $('#filter_color_type').val();
            var filter_aircon_type = $('#filter_aircon_type').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_brand' : filter_brand, 'filter_model' : filter_model, 'filter_variant' : filter_variant, 'filter_engine_size' : filter_engine_size, 'filter_gas_type' : filter_gas_type, 'filter_transmission' : filter_transmission, 'filter_drive_train' : filter_drive_train, 'filter_body_type' : filter_body_type, 'filter_seating_capacity' : filter_seating_capacity, 'filter_camshaft_profile' : filter_camshaft_profile, 'filter_color_type' : filter_color_type, 'filter_aircon_type' : filter_aircon_type},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else if(type == 'price index amount table'){
            var filter_year = $('#filter_year').val();
            var filter_brand = $('#filter_brand').val();
            var filter_model = $('#filter_model').val();
            var filter_variant = $('#filter_variant').val();
            var filter_engine_size = $('#filter_engine_size').val();
            var filter_gas_type = $('#filter_gas_type').val();
            var filter_transmission = $('#filter_transmission').val();
            var filter_drive_train = $('#filter_drive_train').val();
            var filter_body_type = $('#filter_body_type').val();
            var filter_seating_capacity = $('#filter_seating_capacity').val();
            var filter_camshaft_profile = $('#filter_camshaft_profile').val();
            var filter_color_type = $('#filter_color_type').val();
            var filter_aircon_type = $('#filter_aircon_type').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_year' : filter_year, 'filter_brand' : filter_brand, 'filter_model' : filter_model, 'filter_variant' : filter_variant, 'filter_engine_size' : filter_engine_size, 'filter_gas_type' : filter_gas_type, 'filter_transmission' : filter_transmission, 'filter_drive_train' : filter_drive_train, 'filter_body_type' : filter_body_type, 'filter_seating_capacity' : filter_seating_capacity, 'filter_camshaft_profile' : filter_camshaft_profile, 'filter_color_type' : filter_color_type, 'filter_aircon_type' : filter_aircon_type},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else if(type == 'attendance adjustment table'){
            var filter_branch = $('#filter_branch').val();
            var filter_department = $('#filter_department').val();
            var filter_start_date = $('#filter_start_date').val();
            var filter_end_date = $('#filter_end_date').val();

            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_branch' : filter_branch, 'filter_department' : filter_department, 'filter_start_date' : filter_start_date, 'filter_end_date' : filter_end_date},
                    'dataSrc' : '',
                    'completed' : completed
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else{
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
    }

    $(datatablename).dataTable(settings);
}

function generate_datatable_one_parameter(type, parameter, datatablename, order, ordertype, unsort, buttons = '0', showall = '0'){
    var username = $('#username').text();
    var column;
    var length_menu;

    destroy_datatable(datatablename);
    
    if(type == 'employee leave entitlement table'){
        column = [ 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_STATUS' }, 
            { 'data' : 'DATE_COVERAGE' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'training and seminar report table'){
        column = [ 
            { 'data' : 'RESPONDERS' }, 
            { 'data' : 'LEARNINGS' }, 
            { 'data' : 'COMMENTS' }, 
        ];
    }
    else if(type == 'employee leave table'){
        column = [ 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_DATE' }, 
            { 'data' : 'LEAVE_STATUS' }, 
            { 'data' : 'REASON' },
            { 'data' : 'CANCELATION_REASON' },
            { 'data' : 'REJECTION_REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'employee document table'){
        column = [ 
            { 'data' : 'DOCUMENT_NAME' },
            { 'data' : 'DOCUMENT_CATEGORY' },
            { 'data' : 'DOCUMENT_NOTE' },
            { 'data' : 'DOCUMENT_DATE' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'UPLOAD_BY' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'employee attendance logs table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN_BY' },
            { 'data' : 'TIME_IN_IP' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT_BY' },
            { 'data' : 'TIME_OUT_IP' },
            { 'data' : 'TOTAL_HOURS' },
            { 'data' : 'LATE' },
            { 'data' : 'EARLY_LEAVING' },
            { 'data' : 'OVERTIME' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'deduction amount table'){
        column = [ 
            { 'data' : 'DEDUCTION' },
            { 'data' : 'RANGE' },
            { 'data' : 'DEDUCTION_AMOUNT' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll table'){
        column = [ 
            { 'data' : 'EMPLOYEE_FULL_NAME' },
            { 'data' : 'PAYROLL_PERIOD' },
            { 'data' : 'STATUS' },
            { 'data' : 'NO_HOURS' },
            { 'data' : 'GROSS' },
            { 'data' : 'NET' },
            { 'data' : 'DEDUCTIONS' },
            { 'data' : 'ALLOWANCE' },
            { 'data' : 'OTHER_INCOME' },
            { 'data' : 'GENERATED_DATE' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll summary table'){
        column = [ 
            { 'data' : 'EMPLOYEE_FULL_NAME' },
            { 'data' : 'PAYROLL_PERIOD' },
            { 'data' : 'STATUS' },
            { 'data' : 'NO_HOURS' },
            { 'data' : 'GROSS' },
            { 'data' : 'NET' },
            { 'data' : 'DEDUCTIONS' },
            { 'data' : 'ALLOWANCE' },
            { 'data' : 'OTHER_INCOME' },
            { 'data' : 'GENERATED_DATE' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'payroll summary payroll specification table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'PAYROLL_ID' },
            { 'data' : 'SPEC_TYPE' },
            { 'data' : 'CATEGORY' },
            { 'data' : 'STATUS' },
            { 'data' : 'SPEC_AMOUNT' },
            { 'data' : 'PAYROLL_DATE' }
        ];
    }
    else if(type == 'transmittal history table'){
        column = [ 
            { 'data' : 'TRANSACTION_DATE' },
            { 'data' : 'TRANSMITTAL_TYPE' },
            { 'data' : 'TRANSMITTAL_FROM' },
            { 'data' : 'TRANSMITTAL_TO' },
            { 'data' : 'RECEIVED_BY' }
        ];
    }
    else if(type == 'suggest to win vote details table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'TITLE' },
            { 'data' : 'SATISFACTION' },
            { 'data' : 'QUALITY' },
            { 'data' : 'INNOVATION' },
            { 'data' : 'FEASIBILITY' },
            { 'data' : 'TOTAL' },
            { 'data' : 'VOTE_DATE' },
            { 'data' : 'REMARKS' }
        ];
    }
    else if(type == 'email recipient table'){
        column = [ 
            { 'data' : 'EMAIL' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'weekly cash flow table'){
        column = [ 
            { 'data' : 'DEPARTMENT' }, 
            { 'data' : 'STATUS' }, 
            { 'data' : 'PERIOD_COVERED' }, 
            { 'data' : 'APPROVAL_BY' }, 
            { 'data' : 'APPROVAL_DATE' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'weekly cash flow particulars table'){
        column = [ 
            { 'data' : 'DETAILS' }, 
            { 'data' : 'WCF_TYPE' }, 
            { 'data' : 'LOAN_WCF_TYPE' }, 
            { 'data' : 'MONDAY' }, 
            { 'data' : 'TUESDAY' }, 
            { 'data' : 'WEDNESDAY' }, 
            { 'data' : 'THURSDAY' }, 
            { 'data' : 'FRIDAY' }, 
            { 'data' : 'TOTAL' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'weekly cash flow summary table'){
        column = [ 
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'PERIOD_COVERED' },
            { 'data' : 'DETAILS' },
            { 'data' : 'WCF_TYPE' },
            { 'data' : 'LOAN_WCF_TYPE' },
            { 'data' : 'MONDAY' },
            { 'data' : 'TUESDAY' },
            { 'data' : 'WEDNESDAY' },
            { 'data' : 'THURSDAY' },
            { 'data' : 'FRIDAY' },
            { 'data' : 'TOTAL' }
        ];
    }
    else if(type == 'ticket attachment table'){
        column = [ 
            { 'data' : 'FILE_NAME' },
            { 'data' : 'UPLOAD_BY' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'FILE_TYPE' },
            { 'data' : 'FILE_SIZE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'ticket request table'){
        column = [ 
            { 'data' : 'REQUEST_BY' },
            { 'data' : 'ASSIGNED_EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'CATEGORY' },
            { 'data' : 'SUBJECT' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'PRIORITY' },
            { 'data' : 'DUE_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'profile employee leave entitlement table'){
        column = [ 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_STATUS' }, 
            { 'data' : 'DATE_COVERAGE' }
        ];
    }
    else if(type == 'profile employee leave table'){
        column = [ 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_DATE' }, 
            { 'data' : 'LEAVE_STATUS' },
            { 'data' : 'ATTACHMENT_PATH' },    
            { 'data' : 'REASON' },
            { 'data' : 'CANCELATION_REASON' },
            { 'data' : 'REJECTION_REASON' }
        ];
    }
    else if(type == 'profile employee document table'){
        column = [ 
            { 'data' : 'DOCUMENT_NAME' },
            { 'data' : 'DOCUMENT_CATEGORY' },
            { 'data' : 'DOCUMENT_NOTE' },
            { 'data' : 'DOCUMENT_DATE' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'UPLOAD_BY' }
        ];
    }
    else if(type == 'profile employee attendance logs table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN_BY' },
            { 'data' : 'TIME_IN_IP' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT_BY' },
            { 'data' : 'TIME_OUT_IP' },
            { 'data' : 'TOTAL_HOURS' },
            { 'data' : 'LATE' },
            { 'data' : 'EARLY_LEAVING' },
            { 'data' : 'OVERTIME' },
            { 'data' : 'REMARKS' }
        ];
    }
    else if(type == 'meeting task table'){
        column = [ 
            { 'data' : 'TASK' },
            { 'data' : 'AGENDA' },
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DUE_DATE' },
            { 'data' : 'NEW_DUE_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'meeting memo table'){
        column = [ 
            { 'data' : 'DOCUMENT' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'meeting other matters table'){
        column = [ 
            { 'data' : 'OTHER_MATTERS' },
            { 'data' : 'ACTION' }
        ];
    }

    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }

    if(type == 'weekly cash flow summary table'){
        if(buttons == '1'){
            var settings = {
                'initComplete': function () {
                    this.api().columns().every( function () {
                        var column = this;
                        var select = $('<br/><select><option value="">All</option></select>')
                            .appendTo( $(column.header()) )
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
         
                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );
         
                        column.data().unique().sort().each( function ( d, j ) {
                            select.append( '<option value="'+d+'">'+d+'</option>' )
                        } );
                    } );
                },
                'footerCallback': function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 5;
                    while(j < nb_cols){
                        var pageTotal = api
                    .column( j, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                     $( api.column( j ).footer() ).html('<b>' + pageTotal + '</b>');
                        j++;
                    } 
                },
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter' : parameter},
                    'dataSrc' : ''
                },
                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [{
                            extend: 'csv',
                            className: 'btn btn-primary',
                            exportOptions: {
                                format: {
                                    header: function ( data ) {
                                      var n = data.indexOf("<br><br><select>");
                                      if (n > -1) {
                                        return data.substring(0, n);
                                      } else {
                                        return data;
                                      }
                                    }
                                  }
                            }
                        },
                        {
                            extend: 'excel',
                            className: 'btn btn-primary',
                            exportOptions: {
                                format: {
                                    header: function ( data ) {
                                        var n = data.indexOf("<br><br><select>");
                                      if (n > -1) {
                                        return data.substring(0, n);
                                      } else {
                                        return data;
                                      }
                                    }
                                  }
                            }
                        },
                        {
                            extend: 'pdf',
                            className: 'btn btn-primary',
                            exportOptions: {
                                format: {
                                    header: function ( data ) {
                                        var n = data.indexOf("<br><br><select>");
                                      if (n > -1) {
                                        return data.substring(0, n);
                                      } else {
                                        return data;
                                      }
                                    }
                                  }
                            }
                        }
                ],
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else{
            var settings = {
                'initComplete': function () {
                    $('.wcffilter').remove();
                    
                    this.api().columns().every( function () {
                        var column = this;
                        
                        var select = $('<select class="wcffilter"><option value="">All</option></select>')
                            .appendTo( $(column.header()))
                            .on( 'change', function () {
                                var val = $.fn.dataTable.util.escapeRegex(
                                    $(this).val()
                                );
         
                                column
                                    .search( val ? '^'+val+'$' : '', true, false )
                                    .draw();
                            } );
         
                            column.data().unique().sort().each( function ( d, j ) {
                                select.append( '<option value="'+d+'">'+d+'</option>' )
                            } );
                    } );
                },
                'footerCallback': function ( row, data, start, end, display ) {
                    var api = this.api();
                    nb_cols = api.columns().nodes().length;
                    var j = 5;
                    while(j < nb_cols){
                        var pageTotal = api
                    .column( j, { page: 'current'} )
                    .data()
                    .reduce( function (a, b) {
                        return Number(a) + Number(b);
                    }, 0 );
                     $( api.column( j ).footer() ).html('<b>' + pageTotal + '</b>');
                        j++;
                    } 
                },
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter' : parameter},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
    }
    else{
        if(buttons == '1'){
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter' : parameter},
                    'dataSrc' : ''
                },
                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    'csv', 'excel', 'pdf'
                ],
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else{
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter' : parameter},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
    }

    $(datatablename).dataTable(settings);
}

function generate_datatable_two_parameter(type, parameter1, parameter2, datatablename, order, ordertype, unsort, buttons = '0', showall = '0'){
    var username = $('#username').text();
    var column;

    destroy_datatable(datatablename);
    
    if(type == 'attendance summary table'){
        column = [ 
            { 'data' : 'FULL_NAME' }, 
            { 'data' : 'DEPARTMENT' }, 
            { 'data' : 'WORKING_DAYS' }, 
            { 'data' : 'DAYS_WORKED' }, 
            { 'data' : 'NUM_LATE' }, 
            { 'data' : 'LATE' }, 
            { 'data' : 'NUM_UNDERTIME' }, 
            { 'data' : 'UNDERTIME' }, 
            { 'data' : 'ATTENDANCE_ADJUSTMENT' }, 
            { 'data' : 'VACATION_LEAVE' }, 
            { 'data' : 'LEAVE_WITHOUT_PAY' }, 
            { 'data' : 'MATERNITY_LEAVE' }, 
            { 'data' : 'PATERNITY_LEAVE' }, 
            { 'data' : 'OFFICIAL_BUSINESS_PAID' }, 
            { 'data' : 'OFFICIAL_BUSINESS_UNPAID' }, 
            { 'data' : 'EMERGENCY_LEAVE' }, 
            { 'data' : 'SICK_LEAVE' }, 
            { 'data' : 'MANDATORY_LEAVE' }, 
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'attendance logs table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN_BY' },
            { 'data' : 'TIME_IN_IP' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT_BY' },
            { 'data' : 'TIME_OUT_IP' },
            { 'data' : 'TOTAL_HOURS' },
            { 'data' : 'LATE' },
            { 'data' : 'EARLY_LEAVING' },
            { 'data' : 'OVERTIME' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'employee list table'){
        column = [ 
            { 'data' : 'EMPLOYEE_ID' },
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'DESIGNATION' },
            { 'data' : 'EMPLOYEMENT_TYPE' },
            { 'data' : 'EMPLOYEE_STATUS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'employee attendance record table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN_BY' },
            { 'data' : 'TIME_IN_IP' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT_BY' },
            { 'data' : 'TIME_OUT_IP' },
            { 'data' : 'TOTAL_HOURS' },
            { 'data' : 'LATE' },
            { 'data' : 'EARLY_LEAVING' },
            { 'data' : 'OVERTIME' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'employee attendance adjustment table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'STATUS' },
            { 'data' : 'ATTACHMENT' },
            { 'data' : 'REASON' },
            { 'data' : 'REMARKS' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'transmittal table'){
        column = [ 
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'CURRENT' },
            { 'data' : 'TRANSMITTED' },
            { 'data' : 'TRANSACTION_DATE' },
            { 'data' : 'STATUS' },
            { 'data' : 'INCOMING_OUTGOING' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'suggest to win table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'TITLE' },
            { 'data' : 'STATUS' },
            { 'data' : 'POST_DATE' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'VOTING_PERIOD' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'suggest to win approval table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'TITLE' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'REASON' },
            { 'data' : 'BENEFITS' },
            { 'data' : 'STATUS' },
            { 'data' : 'POST_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'suggest to win vote summary table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'TITLE' },
            { 'data' : 'SATISFACTION' },
            { 'data' : 'QUALITY' },
            { 'data' : 'INNOVATION' },
            { 'data' : 'FEASIBILITY' },
            { 'data' : 'TOTAL' },
            { 'data' : 'RANK' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'training room log table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DATE' },
            { 'data' : 'TIME' },
            { 'data' : 'EQUIPMENT' },
            { 'data' : 'PARTICIPANT' },
            { 'data' : 'OTHER_PARTICIPANT' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'health declaration summary table'){
        column = [ 
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'GENDER' },
            { 'data' : 'AGE' },
            { 'data' : 'ADDRESS' },
            { 'data' : 'PHONE' },
            { 'data' : 'EMAIL' },
            { 'data' : 'SUBMIT_DATE' },
            { 'data' : 'TEMPERATURE' },
            { 'data' : 'SORE_THROAT' },
            { 'data' : 'BODY_PAINS' },
            { 'data' : 'HEADACHE' },
            { 'data' : 'FEVER' },
            { 'data' : 'QUESTION_2' },
            { 'data' : 'QUESTION_3' },
            { 'data' : 'QUESTION_4' },
            { 'data' : 'QUESTION_5' },
            { 'data' : 'QUESTION_5_SPECIFIC' }
        ];
    }
    else if(type == 'previous meeting table'){
        column = [ 
            { 'data' : 'TASK' },
            { 'data' : 'EMPLOYEE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DUE_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'training table'){
        column = [ 
            { 'data' : 'TITLE' },
            { 'data' : 'AUTHOR' },
            { 'data' : 'TRAINING_DATE' },
            { 'data' : 'TRAINING_TIME' },
            { 'data' : 'TRAINING_TYPE' },
            { 'data' : 'STATUS' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'REJECTION_REASON' },
            { 'data' : 'CANCELLATION_REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'attendance adjustment summary table'){
        column = [ 
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'REASON' },
            { 'data' : 'APPROVAL_DATE' },
            { 'data' : 'ATTACHMENT' }
        ];
    }

    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }

    
    if(type == 'attendance logs table' || type == 'attendance summary table' || type == 'attendance adjustment summary table'){
        var filter_branch = $('#filter_branch').val();
        var filter_department = $('#filter_department').val();
        var filter_start_date = $('#filter_start_date').val();
        var filter_end_date = $('#filter_end_date').val();

        if(buttons == '1'){
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_branch' : filter_branch, 'filter_department' : filter_department, 'filter_start_date' : filter_start_date, 'filter_end_date' : filter_end_date},
                    'dataSrc' : ''
                },
                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    'csv', 'excel', 'pdf'
                ],
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else{
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'filter_branch' : filter_branch, 'filter_department' : filter_department, 'filter_start_date' : filter_start_date, 'filter_end_date' : filter_end_date},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ],
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
    }
    else{
        if(buttons == '1'){
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter1' : parameter1, 'parameter2' : parameter2},
                    'dataSrc' : ''
                },
                dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                buttons: [
                    'csv', 'excel', 'pdf'
                ],
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': length_menu,
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
        else{
            var settings = {
                'ajax': { 
                    'url' : 'system-generation.php',
                    'method' : 'POST',
                    'dataType': 'JSON',
                    'data': {'type' : type, 'username' : username, 'parameter1' : parameter1, 'parameter2' : parameter2},
                    'dataSrc' : ''
                },
                'order': [[ order, ordertype ]],
                'columns' : column,
                'scrollY': false,
                'scrollX': true,
                'scrollCollapse': true,
                'fnDrawCallback': function( oSettings ) {
                    readjust_datatable_column();
                },
                'aoColumnDefs': [{
                    'bSortable': false,
                    'aTargets': unsort
                }],
                'lengthMenu': [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ],
                'language': {
                    'emptyTable': 'No data found',
                    'searchPlaceholder': 'Search...',
                    'search': '',
                    'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
                }
            };
        }
    }

    $(datatablename).dataTable(settings);
}

function generate_datatable_three_parameter(type, parameter1, parameter2, parameter3, datatablename, order, ordertype, unsort, buttons = '0', showall = '0'){
    var username = $('#username').text();
    var column;

    destroy_datatable(datatablename);
    
    if(type == 'attendance summary attendance record table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN_BY' },
            { 'data' : 'TIME_IN_IP' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT_BY' },
            { 'data' : 'TIME_OUT_IP' },
            { 'data' : 'TOTAL_HOURS' },
            { 'data' : 'LATE' },
            { 'data' : 'EARLY_LEAVING' },
            { 'data' : 'OVERTIME' },
            { 'data' : 'REMARKS' }
        ];
    }
    else if(type == 'attendance summary leave table'){
        column = [
            { 'data' : 'ATTACHMENT_PATH' }, 
            { 'data' : 'LEAVE_NAME' }, 
            { 'data' : 'LEAVE_DATE' }, 
            { 'data' : 'LEAVE_STATUS' }, 
            { 'data' : 'REASON' },
            { 'data' : 'APPROVAL_DATE'},
            { 'data' : 'CANCELATION_REASON' },
            { 'data' : 'REJECTION_REASON' }
        ];
    }
    else if(type == 'attendance summary attendance adjustment table'){
        column = [ 
            { 'data' : 'TIME_IN_DATE' },
            { 'data' : 'TIME_IN' },
            { 'data' : 'TIME_OUT_DATE' },
            { 'data' : 'TIME_OUT' },
            { 'data' : 'STATUS' },
            { 'data' : 'ATTACHMENT' },
            { 'data' : 'REASON' }
        ];
    }
        else if(type == 'publish documents table' || type == 'publish images documents table' || type == 'publish memorandum documents table' || type == 'publish loan documents table' || type == 'publish credit documents table' || type == 'publish admin documents table' ||  type == 'publish forms table' ){
        column = [ 
            { 'data' : 'DOCUMENT_ID' },
            { 'data' : 'DOCUMENT_NAME' },
            { 'data' : 'DESCRIPTION' },
            { 'data' : 'FULL_NAME' },
            { 'data' : 'DEPARTMENT' },
            { 'data' : 'DOCUMENT_CATEGORY' },
            { 'data' : 'STATUS' },
            { 'data' : 'DOCUMENT_EXTENSION' },
            { 'data' : 'DOCUMENT_SIZE' },
            { 'data' : 'UPLOAD_DATE' },
            { 'data' : 'PUBLISH_BY' },
            { 'data' : 'PUBLISH_DATE' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'ticket table'){
        column = [ 
            { 'data' : 'TICKET_ID' },
            { 'data' : 'SUBJECT' },
            { 'data' : 'REQUESTER' },
            { 'data' : 'STATUS' },
            { 'data' : 'ASSIGNED' },
            { 'data' : 'PRIORITY' },
            { 'data' : 'DUE_DATE' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'ACCEPTED_DATE' },
            { 'data' : 'SOLVED_DATE' },
            { 'data' : 'CLOSED_DATE' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'REJECTION_REASON' },
            { 'data' : 'CANCELLATION_REASON' },
            { 'data' : 'ACTION' }
        ];
    }
    else if(type == 'telephone log summary table'){
        column = [ 
            { 'data' : 'RECIPIENT' },
            { 'data' : 'TELEPHONE' },
            { 'data' : 'STATUS' },
            { 'data' : 'INITIAL_CALL' },
            { 'data' : 'ACTUAL_CALL' },
            { 'data' : 'REQUEST_DATE' },
            { 'data' : 'DECISION_BY' },
            { 'data' : 'DECISION_DATE' },
            { 'data' : 'REASON' }
        ];
    }

    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }

    if(buttons == '1'){
        var settings = {
            'ajax': { 
                'url' : 'system-generation.php',
                'method' : 'POST',
                'dataType': 'JSON',
                'data': {'type' : type, 'username' : username, 'parameter1' : parameter1, 'parameter2' : parameter2, 'parameter3' : parameter3},
                'dataSrc' : ''
            },
            dom:  "<'row'<'col-sm-3'l><'col-sm-6 text-center mb-2'B><'col-sm-3'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            buttons: [
                'csv', 'excel', 'pdf'
            ],
            'order': [[ order, ordertype ]],
            'columns' : column,
            'scrollY': false,
            'scrollX': true,
            'scrollCollapse': true,
            'fnDrawCallback': function( oSettings ) {
                readjust_datatable_column();
            },
            'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': unsort
            }],
            'lengthMenu': length_menu,
            'language': {
                'emptyTable': 'No data found',
                'searchPlaceholder': 'Search...',
                'search': '',
                'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
            }
        };
    }
    else{
        var settings = {
            'ajax': { 
                'url' : 'system-generation.php',
                'method' : 'POST',
                'dataType': 'JSON',
                'data': {'type' : type, 'username' : username, 'parameter1' : parameter1, 'parameter2' : parameter2, 'parameter3' : parameter3},
                'dataSrc' : ''
            },
            'order': [[ order, ordertype ]],
            'columns' : column,
            'scrollY': false,
            'scrollX': true,
            'scrollCollapse': true,
            'fnDrawCallback': function( oSettings ) {
                readjust_datatable_column();
            },
            'aoColumnDefs': [{
                'bSortable': false,
                'aTargets': unsort
            }],
            'lengthMenu': length_menu,
            'language': {
                'emptyTable': 'No data found',
                'searchPlaceholder': 'Search...',
                'search': '',
                'loadingRecords': '<div class="spinner-border spinner-border-lg text-info" role="status"><span class="sr-only">Loading...</span></div>'
            }
        };
    }

    $(datatablename).dataTable(settings);
}

// ======================changes lemar bill==================

//Bill
function datatable_custom_param(type, tableID,params = null,column,order,ordertype,unsort,showall='0',file_name='inv item report'){

    destroy_datatable(tableID);
    

    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }

    var username = $('#username').text();


    if(showall == '1'){
        length_menu = [ [-1], ['All'] ];
    }
    else{
        length_menu = [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ];
    }



    var settings = {
        'ajax': { 
            'url' : 'system-generation.php',
            'method' : 'POST',
            'dataType': 'JSON',
            'data': {'type' : type, 'username' : username, data : params},
            'dataSrc' : ''
        },
        'order': [[ order, ordertype ]],
        'columns' : column,
        dom: "lBfrtip",
        buttons: [
            {
                extend: "collection",
                text: "Export",

                className: "btn btn-primary",
                init: function (a, n, c) {
                    $(n).removeClass("dt-button buttons-collection");
                },
                buttons: ["copy", { extend: "excel", filename: file_name }, { extend: "csv", filename: file_name }, { extend: "pdf", filename: file_name }, { extend: "print", filename: file_name }],
            },
        ],

        'scrollY': false,
        'scrollX': true,
       
        'scrollCollapse': true,
        'fnDrawCallback': function( oSettings ) {
            readjust_datatable_column();
        },
        'aoColumnDefs': [{
            'bSortable': false,
            'aTargets': unsort
        }],
        'lengthMenu': length_menu,
        'language': {
            'emptyTable': 'No data found',
            'searchPlaceholder': 'Search...',
            'search': ''
        }
    };



    $(tableID).dataTable(settings);
}

// ======================changes lemar bill==================
