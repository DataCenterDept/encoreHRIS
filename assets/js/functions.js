// Initialize elements





function initialize_elements(){
    
    
    //RAMUEL TAGS
    $("#tags").tagsinput({
        trimValue: true,
        confirmKeys: [13, 44, 32], // Enter, Comma, Space
        focusClass: "has-focus"
    });
    $("#tags").on("focus", function() {
        $(this).closest(".bootstrap-tagsinput").addClass("has-focus");
    }).on("blur", function() {
        $(this).closest(".bootstrap-tagsinput").removeClass("has-focus");
    });
    
    
    
    if ($('.maxlength').length) {
        $('.maxlength').maxlength({
          alwaysShow: true,
          warningClass: 'badge mt-1 bg-info',
          limitReachedClass: 'badge mt-1 bg-danger',
          validate: true
        });
    }

    if ($('.form-select2').length) {
        $('.form-select2').select2().on('change', function() {
          $(this).valid();
        });
    }
	
    if ($('[data-toggle="touchspin"]').length) {
        $('[data-toggle="touchspin"]').TouchSpin({
            min: 0,
            initval: 0,
            max: 9999999999
        });
    }

    if($('.email-inputmask').length) {
        $('.email-inputmask').inputmask({clearIncomplete : true, alias : 'email'});
    }

     if($('#attendance-reader').length) {
        $('#attendance-reader').html('<div class="d-flex justify-content-center"><div class="spinner-border spinner-border-sm text-primary" role="status"><span rclass="sr-only"></span></div></div>');

        Html5Qrcode.getCameras().then(devices => {
            
            if (devices && devices.length) {
                
                var camera_id = devices[devices.length - 1].id;
                var html =`<option value='0'>choose camera</option>`;

                devices.forEach(element => {
                    console.log(element);
                        html += `<option value = "${element.id}">${element.label}</option>`;
                });
                $('#cam_option').html(html)

                const html5QrCode = new Html5Qrcode("attendance-reader");
                const config = { fps: 10, qrbox: { width: 250, height: 250 } };
                const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                    var audio = new Audio('assets/audio/scan.mp3');
                    audio.play();
                    navigator.vibrate([500]);

                    var employeeid = decodedText.substring(
                        decodedText.lastIndexOf("[") + 1, 
                        decodedText.lastIndexOf("]")
                    );

                    var latitude = sessionStorage.getItem('latitude');
                    var longitude = sessionStorage.getItem('longitude');
                    var transaction = 'record attendance';
                    var username = $('#username').text();
                        
                    $.ajax({
                        type: 'POST',
                        url: 'controller.php',
                        data: {username : username, latitude : latitude, employeeid : employeeid, longitude : longitude, transaction : transaction},
                        success: function (response) {
                            if(response === 'Clock In'){
                                var audio = new Audio('assets/audio/attendance-clock-in-success.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                            else if(response === 'Clock Out'){
                                var audio = new Audio('assets/audio/attendance-clock-out-success.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                            else if(response === 'Max Clock-In'){
                                var audio = new Audio('assets/audio/max-attendance-error.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                            else if(response === 'Location'){
                                var audio = new Audio('assets/audio/location-error.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                            else if(response === 'Time Difference'){
                                var audio = new Audio('assets/audio/clock-out-time-error.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                            else{
                                var audio = new Audio('assets/audio/attendance-error.mp3');
                                audio.play();
                                navigator.vibrate([500]);
                            }
                        }
                    });

                    html5QrCode.stop().then((ignore) => {
                        $('#attendance-reader').html('');
                        $('#attendance-reader').html('<div class="d-flex justify-content-center"><div class="spinner-border spinner-border-sm text-primary" role="status"><span rclass="sr-only"></span></div></div>');
                        
                        setTimeout(function(){  html5QrCode.start({ deviceId: { exact: camera_id} }, config, qrCodeSuccessCallback); }, 4000);
                    }).catch((err) => {
                        alert(err);
                    });
                };

                $('#cam_option').on('change',function () {
                    var camera_id = $(this).val()
                    $(this).prop('disabled',true)
                    html5QrCode.start({ deviceId: { exact: camera_id} }, config, qrCodeSuccessCallback);
                })

                $('#btn_stop_scan').on('click',function () {
                    html5QrCode.stop()
                    $('#cam_option').prop('disabled',false)
                    $('#cam_option option[value="0"]').val(0).attr('selected','selected');
                })
            }
        }).catch(err => {
            alert(err);
        });
    }


    if($('.repeater').length) {
        $('.repeater').repeater({
            initEmpty: true,
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            isFirstItemUndeletable: true
        })
    }

    if($('.document-repeater').length) {
        $('.document-repeater').repeater({
            initEmpty: false,
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            isFirstItemUndeletable: true
        })
    }

    if($('.payment-repeater').length) {
        $('.payment-repeater').repeater({
            initEmpty: false,
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            isFirstItemUndeletable: true
        })
    }

    if($('.other-matters-repeater').length) {
        $('.other-matters-repeater').repeater({
            initEmpty: false,
            show: function () {
                $(this).slideDown();
            },
            hide: function (deleteElement) {
                $(this).slideUp(deleteElement);
            },
            isFirstItemUndeletable: true
        })
    }
}

// Check functions
function check_option_exist(element, option, returnval){
    if ($(element).find('option[value="' + option + '"]').length) {
        $(element).val(option).trigger('change');
    }
    else{
        $(element).val(returnval).trigger('change');
    }
}

function check_empty(value, id, type){
    if(value != '' || value != null){
        if(type == 'select'){
            $(id).val(value).change();
        }
        else if(type == 'text'){
            $(id).text(value);
        }
        else {
            $(id).val(value);
        }
    }
}

function check_time(i) {
    if (i < 10) {i = '0' + i}; 
    return i;
}

function download(fileurl, fileName) {
    var a = document.createElement("a");
    a.href = fileurl;
    a.setAttribute('download', fileName);
    a.click();
}

function delete_file(fileurl) {
    var username = $('#username').text();
    var transaction = 'delete file';

    $.ajax({
        type: 'POST',
        url: 'controller.php',
        dataType: 'JSON',
        data: {username : username, transaction : transaction, fileurl : fileurl},
        success: function () {}
    });
}

// Custom functions

function system_time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var ext = h >= 12 ? 'pm' : 'am';
    m = check_time(m);
    s = check_time(s);
    h = h % 12;
    h = h ? h : 12;

    document.getElementById('system-time').innerHTML = h + ':' + m + ':' + s + ' ' + ext;
    var t = setTimeout(system_time, 1000);
}

function attendance_time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var ext = h >= 12 ? 'pm' : 'am';
    m = check_time(m);
    h = h % 12;
    h = h ? h : 12;
    

    document.getElementById('attendance-clock').innerHTML = h + ':' + m + ' ' + ext;
    var t = setTimeout(attendance_time, 1000);
}

function get_location(map_div) {

    if(!map_div){
        if (navigator.geolocation) {
            var options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            navigator.geolocation.watchPosition(show_position, show_geolocation_error, options);
        } 
        else {
            show_alert('Geolocation Error', 'Your browser does not support geolocation.', 'error');
        }
    }
    else{
        map = new GMaps({
            div: '#' + map_div,
            lat: -12.043333,
            lng: -77.028333
        });
    
        GMaps.geolocate({
            success: function(position){
                map.setCenter(position.coords.latitude, position.coords.longitude);
                map.addMarker({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });

                sessionStorage.setItem('latitude', position.coords.latitude);
                sessionStorage.setItem('longitude', position.coords.longitude);
            },
            error: function(error){
                show_alert('Geolocation Error', 'Geolocation failed: ' + error.message, 'error');
            },
            not_supported: function(){
                show_alert('Geolocation Error', 'Your browser does not support geolocation.', 'error');
            },
        });
    }
}

function show_position(position) {
    sessionStorage.setItem('latitude', position.coords.latitude);
    sessionStorage.setItem('longitude', position.coords.longitude);
}

function show_geolocation_error(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        show_alert('Geolocation Error', 'User denied the request for Geolocation.', 'error');
        break;
      case error.POSITION_UNAVAILABLE:
        show_alert('Geolocation Error', 'Location information is unavailable.', 'error');
        break;
      case error.TIMEOUT:
        show_alert('Geolocation Error', 'The request to get user location timed out.', 'error');
        break;
      case error.UNKNOWN_ERROR:
        show_alert('Geolocation Error', 'An unknown error occurred.', 'error');
        break;
    }
}

function create_employee_qr_code(container, name, employee_id, email, mobile){
    document.getElementById(container).innerHTML = '';

    var card = 'BEGIN:VCARD\r\n';
    card += 'VERSION:3.0\r\n';
    card += 'FN:'+ name +'\r\n';
    card += 'EMAIL:' + email +'\r\n';
    card += 'ID NO:[' + employee_id + ']\r\n';

    if(mobile){
        card += 'TEL:' + mobile +'\r\n';
    }
    
    card += 'END:VCARD';

    var qrcode = new QRCode(document.getElementById(container), {
        width: 220,
        height: 220,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
    });

    qrcode.makeCode(card);

    
}

function calculate_payroll_specification_end_date(startdate, pattern, counter){
    var username = $('#username').text();
    var transaction = 'calculate payroll specification end date';

    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: {username : username, transaction : transaction, startdate : startdate, pattern : pattern, counter : counter},
        success: function(response) {
            $('#specenddate').val(response[0].END_DATE);
        }
    });
}

function clear_filter(){
    sessionStorage.setItem('filter1', '');
    sessionStorage.setItem('filter2', '');
    sessionStorage.setItem('filter3', '');
}

// Display functions
function display_form_details(formtype){
    var transaction;
    var d = new Date();

    if(formtype == 'page form'){
        var pageid = sessionStorage.getItem('pageid');
        transaction = 'page details';
       
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {pageid : pageid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#pageid').val(pageid);
                $('#pagename').val(response[0].PAGE_NAME);
            },
            complete: function(){
                check_role_permission(formtype, 10);
            }
        });
    }
    else if(formtype == 'permission form'){
        var permissionid = sessionStorage.getItem('permissionid');
        transaction = 'permission details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {permissionid : permissionid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#permissionid').val(permissionid);
                $('#permissiondesc').val(response[0].PERMISSION_DESC);

                check_option_exist('#pageid', response[0].PAGE_ID, '');
            },
            complete: function(){
                check_role_permission(formtype, 13);
            }
        });
    }
    else if(formtype == 'system parameter form'){
        var parameterid = sessionStorage.getItem('parameterid');
        transaction = 'system parameter details';

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {parameterid : parameterid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#description').val(response[0].PARAMETER_DESC);
                $('#extension').val(response[0].PARAMETER_EXTENSION);
                $('#paramnum').val(response[0].PARAMETER_NUMBER);
                $('#parameterid').val(parameterid);
            },
            complete: function(){
                check_role_permission(formtype, 21);
            }
        });
    }
    else if(formtype == 'system code form'){
        transaction = 'system code details';
        var systemtype = sessionStorage.getItem('systemtype');
        var systemcode = sessionStorage.getItem('systemcode');

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {systemtype : systemtype, systemcode : systemcode, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#systemdesc').val(response[0].SYSTEM_DESC);
                $('#systemcode').val(systemcode);

                check_option_exist('#systemtype', systemtype, '');
            },
            complete: function(){
                check_role_permission(formtype, 17);
            }
        });
    }
    else if(formtype == 'role form'){
        var roleid = sessionStorage.getItem('roleid');
        transaction = 'role details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {roleid : roleid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#roleid').val(roleid);
                $('#roledesc').val(response[0].ROLE_DESC);
            },
            complete: function(){
                check_role_permission(formtype, 3);
            }
        });
    }
    else if(formtype == 'permission role form'){
        var roleid = sessionStorage.getItem('roleid');
        transaction = 'role permission details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {roleid : roleid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.role-permissions').each(function(index) {
                    var val = $(this).val();
                    var page = $(this).data('page');

                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }

                    check_box_check(page);
                });
            },
            complete: function(){
                check_role_permission(formtype, 5);
            }
        });
    }
    else if(formtype == 'user role form'){
        var roleid = sessionStorage.getItem('roleid');
        transaction = 'role user details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {roleid : roleid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.role-user').each(function(index) {
                    var val = $(this).val();
                    var department = $(this).data('department');

                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }

                    check_box_check(department);
                });
            },
            complete: function(){
                check_role_permission(formtype, 188);
            }
        });
    }
    else if(formtype == 'company settings form'){
        transaction = 'company details';
        var companyid = '1';

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {companyid : companyid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                display_working_days(response[0].WORKING_DAYS);

                $('#companyname').val(response[0].COMPANY_NAME);
                $('#email').val(response[0].EMAIL);
                $('#telephone').val(response[0].TELEPHONE);
                $('#phone').val(response[0].PHONE);
                $('#address').val(response[0].ADDRESS);
                $('#website').val(response[0].WEBSITE);

                $('#starttime').val(response[0].START_WORKING_HOURS);
                $('#endtime').val(response[0].END_WORKING_HOURS);
                $('#halfday').val(response[0].HALF_DAY_MARK);
                $('#late').val(response[0].LATE_MARK);
                $('#lunchstarttime').val(response[0].START_LUNCH_BREAK);
                $('#lunchendtime').val(response[0].END_LUNCH_BREAK);
                $('#workingdayspermonth').val(response[0].MONTHLY_WORKING_DAYS);
                $('#maxclockin').val(response[0].MAX_CLOCK_IN);
                
                check_empty(response[0].HEALTH_DECLARATION, '#healthdeclaration', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 26);
            }
        });
    }
    else if(formtype == 'profile form'){
        transaction = 'profile details';
        var username = $('#username').text();

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {username : username, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#firstname').val(response[0].FIRST_NAME);
                $('#middlename').val(response[0].MIDDLE_NAME);
                $('#lastname').val(response[0].LAST_NAME);
                $('#birthday').val(response[0].BIRTHDAY);
                $('#email').val(response[0].EMAIL);
                $('#phone').val(response[0].PHONE);
                $('#telephone').val(response[0].TELEPHONE);
                $('#address').val(response[0].ADDRESS);

                $("#profile-img").attr("src", response[0].PROFILE_IMAGE + '?' + d.getMilliseconds());

                check_empty(response[0].SUFFIX, '#suffix', 'select');
                check_empty(response[0].GENDER, '#gender', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 28);
            }
        });
    }
    else if(formtype == 'application settings form'){
        transaction = 'application settings details';
        var settingsid = '1';

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {settingsid : settingsid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $("#login-bg").attr("src", response[0].LOGIN_BG + '?' + d.getMilliseconds());
                $("#logo-light").attr("src", response[0].LOGO_LIGHT + '?' + d.getMilliseconds());
                $("#logo-dark").attr("src", response[0].LOGO_DARK + '?' + d.getMilliseconds());
                $("#logo-icon-light").attr("src", response[0].LOGO_ICON_LIGHT + '?' + d.getMilliseconds());
                $("#logo-icon-dark").attr("src", response[0].LOGO_ICON_DARK + '?' + d.getMilliseconds());
                $("#favicon-image").attr("src", response[0].FAVICON + '?' + d.getMilliseconds());

                check_empty(response[0].CURRENCY, '#currency', 'select');
                check_empty(response[0].TIMEZONE, '#timezone', 'select');
                check_empty(response[0].DATE_FORMAT, '#dateformat', 'select');
                check_empty(response[0].TIME_FORMAT, '#timeformat', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 30);
            }
        });
    }
    else if(formtype == 'employee form'){
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'employee details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#employeeid').val(employeeid);
                $('#idnumber').val(response[0].ID_NUMBER);
                $('#firstname').val(response[0].FIRST_NAME);
                $('#middlename').val(response[0].MIDDLE_NAME);
                $('#lastname').val(response[0].LAST_NAME);
                $('#joindate').val(response[0].JOIN_DATE);
                
                $('#basicpay').val(response[0].BASIC_PAY);
                $('#dailyrate').val(response[0].DAILY_RATE);
                $('#hourlyrate').val(response[0].HOURLY_RATE);
                $('#minuterate').val(response[0].MINUTE_RATE);
                $('#birthday').val(response[0].BIRTHDAY);
                $('#email').val(response[0].EMAIL);
                $('#phone').val(response[0].PHONE);
                $('#telephone').val(response[0].TELEPHONE);
                $('#address').val(response[0].ADDRESS);
                $('#sss').val(response[0].SSS);
                $('#tin').val(response[0].TIN);
                $('#philhealth').val(response[0].PHILHEALTH);
                $('#pagibig').val(response[0].PAGIBIG);
                $('#driverlicense').val(response[0].DRIVERS_LICENSE);
                $('#accountname').val(response[0].ACCOUNT_NAME);
                $('#accountnumber').val(response[0].ACCOUNT_NUMBER);

                $('#profile-img').attr('src', response[0].PROFILE_IMAGE + '?' + d.getMilliseconds());

                create_employee_qr_code('qr-code', response[0].FIRST_NAME + ' ' + response[0].LAST_NAME, employeeid, response[0].EMAIL, response[0].PHONE);

                check_empty(response[0].EXIT_DATE, '#exitdate', 'val');
                check_empty(response[0].PERMANENT_DATE, '#permanentdate', 'val');
                check_empty(response[0].SUFFIX, '#suffix', 'select');
                check_empty(response[0].DEPARTMENT, '#department', 'select');
                check_empty(response[0].DESIGNATION, '#designation', 'select');
                check_empty(response[0].EMPLOYEMENT_TYPE, '#employmenttp', 'select');
                check_empty(response[0].EMPLOYMENT_STATUS, '#employmentstatus', 'select');
                check_empty(response[0].BRANCH, '#branch', 'select');
                check_empty(response[0].GENDER, '#gender', 'select');
                check_empty(response[0].CIVIL_STATUS, '#civil_status', 'select');
                check_empty(response[0].SUPERIOR_ID, '#superior', 'select');
                check_empty(response[0].PAYROLL_PERIOD, '#payrollperiod', 'select');

                $("#superior option[value='" + employeeid + "']").remove();
                $("#subordinate option[value='" + employeeid + "']").remove();

                var authorizers = response[0].AUTHORIZAER_ID.split(',');
                $('#authorizer').val(authorizers).change();
                
                if(response[0].SUBORDINATE_ID){
                    var subordinates = response[0].SUBORDINATE_ID;
                    var subordinate = subordinates.split(',');

                    generate_subordinates('', this.value, subordinate);
                }
            },
            complete: function(){
                check_role_permission(formtype, 33);
            }
        });
    }
    else if(formtype == 'employee name'){
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'employee details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {employeeid : employeeid, transaction : transaction},
            success: function(response) {
                $('#firstname').val(response[0].FIRST_NAME);
                $('#middlename').val(response[0].MIDDLE_NAME);
                $('#lastname').val(response[0].LAST_NAME);

                document.getElementById('firstname').readOnly = true;
                document.getElementById('middlename').readOnly = true;
                document.getElementById('lastname').readOnly = true;
                document.getElementById('suffix').disabled = true;
                document.getElementById('role').disabled = true;
            },
        });
    }
    else if(formtype == 'department form'){
        var departmentid = sessionStorage.getItem('departmentid');
        transaction = 'department details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {departmentid : departmentid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#departmentid').val(departmentid);
                $('#department').val(response[0].DEPARTMENT);
            },
            complete: function(){
                check_role_permission(formtype, 37);
            }
        });
    }
    else if(formtype == 'designation form'){
        var designationid = sessionStorage.getItem('designationid');
        transaction = 'designation details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {designationid : designationid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#designationid').val(designationid);
                $('#designation').val(response[0].DESIGNATION);
            },
            complete: function(){
                check_role_permission(formtype, 41);
            }
        });
    }
    
    else if(formtype == 'announcement form'){
    var announcementid = sessionStorage.getItem('announcementid');
    
    if(announcementid){
        transaction = 'announcement details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {announcementid : announcementid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                if(response.length > 0){
                    $('#announcementid').val(announcementid);
                    $('#title').val(response[0].TITLE);
                    $('#type').val(response[0].TYPE);
                    $('#content').val(response[0].CONTENT);
                    $('#start_date').val(response[0].START_DATE);
                    $('#end_date').val(response[0].END_DATE);
                    $('#is_priority').val(response[0].IS_PRIORITY);
                    $('#department').val(response[0].DEPARTMENT);
                    $('#branch').val(response[0].BRANCH);
                    
                    if(response[0].ATTACHMENT){
                        $('#attachment_name').text(response[0].ATTACHMENT.split('/').pop());
                        $('#attachment_preview').show();
                    }
                }
                
                sessionStorage.removeItem('announcementid');
            },
            complete: function(){
                if(announcementid){
                    check_role_permission(formtype, 33); // Update announcement permission ID
                }
                else{
                    check_role_permission(formtype, 59); // Add announcement permission ID
                }
            }
        });
    }
    else{
        check_role_permission(formtype, 59); // Add announcement permission ID
        
        // Set default date to today
        var today = new Date().toISOString().split('T')[0];
        $('#start_date').val(today);
    }
}

    else if(formtype == 'branch form'){
        var branchid = sessionStorage.getItem('branchid');
        transaction = 'branch details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {branchid : branchid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#branchid').val(branchid);
                $('#branch').val(response[0].BRANCH);
                $('#email').val(response[0].EMAIL);
                $('#phone').val(response[0].PHONE);
                $('#telephone').val(response[0].TELEPHONE);
                $('#address').val(response[0].ADDRESS);
            },
            complete: function(){
                check_role_permission(formtype, 45);
            }
        });
    }
    else if(formtype == 'holiday form'){
        var holidayid = sessionStorage.getItem('holidayid');
        transaction = 'holiday details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {holidayid : holidayid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#holidayid').val(holidayid);
                $('#holiday').val(response[0].HOLIDAY);
                $('#holidaydate').val(response[0].HOLIDAY_DATE);

                check_empty(response[0].HOLIDAY_TYPE, '#holidaytype', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 49);
            }
        });
    }
    else if(formtype == 'leave type form'){
        var leavetypeid = sessionStorage.getItem('leavetypeid');
        transaction = 'leave type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {leavetypeid : leavetypeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#leavetypeid').val(leavetypeid);
                $('#leave').val(response[0].LEAVE_NAME);
                $('#noleaves').val(response[0].NO_LEAVES);

                check_empty(response[0].PAID_STATUS, '#paidstatus', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 53);
            }
        });
    }
    else if(formtype == 'leave type'){
        var leavetypeid = sessionStorage.getItem('leavetypeid');
        transaction = 'leave type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {leavetypeid : leavetypeid, transaction : transaction},
            success: function(response) {
                $('#noleaves').val(response[0].NO_LEAVES);
            },
        });
    }
    else if(formtype == 'leave entitlement form'){
        var entitlementid = sessionStorage.getItem('entitlementid');
        var employeeid = $('#employee-profile-employee-id').text();
        transaction = 'leave entitlement details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {entitlementid : entitlementid, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                check_empty(response[0].LEAVE_TYPE, '#leavetype', 'select');

                $('#entitlementid').val(entitlementid);
                $('#noleaves').val(response[0].NO_LEAVES);
                $('#startdate').val(response[0].START_DATE);
                $('#enddate').val(response[0].END_DATE);
            },
            complete: function(){
                check_role_permission(formtype, 57);
            }
        });
    }
    else if(formtype == 'available leave'){
        var leavetypeid = sessionStorage.getItem('leavetypeid');
        var employeeid = $('#employee-profile-employee-id').text();
        transaction = 'available leave details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {leavetypeid : leavetypeid, employeeid : employeeid, transaction : transaction},
            success: function(response) {
                $('#noleaves').val(response[0].TOTAL);
            },
        });
    }
    else if(formtype == 'update employee leave form'){
        var leaveid = sessionStorage.getItem('leaveid');
        var employeeid = $('#employee-profile-employee-id').text();
        transaction = 'employee leave details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {leaveid : leaveid, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                check_empty(response[0].LEAVE_TYPE, '#employeeleavetype', 'select');

                $('#leaveid').val(leaveid);
                $('#leavedate').val(response[0].LEAVE_DATE);
                $('#starttime').val(response[0].START_TIME);
                $('#endtime').val(response[0].END_TIME);
                $('#reason').val(response[0].REASON);
                $('#rejectionreason').val(response[0].REJECTION_REASON);
                $('#leavestatus').val(response[0].STATUS);
            },
            complete: function(){
                check_role_permission(formtype, 60);
            }
        });
    }
    else if(formtype == 'employee attendance log form'){
        var attendanceid = sessionStorage.getItem('attendanceid');
        var employeeid = $('#employee-profile-employee-id').text();
        transaction = 'employee attendance log details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {attendanceid : attendanceid, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#attendanceid').val(attendanceid);

                $('#locked').val(response[0].LOCKED);
                $('#timeindate').val(response[0].TIME_IN_DATE);
                $('#timein').val(response[0].TIME_IN);
                $('#timeoutdate').val(response[0].TIME_OUT_DATE);
                $('#timeout').val(response[0].TIME_OUT);
                $('#remarks').val(response[0].REMARKS);
            },
            complete: function(){
                check_role_permission(formtype, 71);
            }
        });
    }
    else if(formtype == 'deduction type form'){
        var deductiontypeid = sessionStorage.getItem('deductiontypeid');
        transaction = 'deduction type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {deductiontypeid : deductiontypeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#deductiontypeid').val(deductiontypeid);

                $('#deductiontype').val(response[0].DEDUCTION);

                check_empty(response[0].CATEGORY, '#category', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 79);
            }
        });
    }
    else if(formtype == 'salary rate'){
        var basicpay = sessionStorage.getItem('basicpay');
        transaction = 'salary rate details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {basicpay : basicpay, transaction : transaction},
            success: function(response) {
                $('#dailyrate').val(response[0].DAILY_RATE);
                $('#hourlyrate').val(response[0].HOURLY_RATE);
                $('#minuterate').val(response[0].MINUTE_RATE);
            }
        });
    }
    else if(formtype == 'update payroll specification form'){
        var specid = sessionStorage.getItem('specid');
        transaction = 'payroll specification details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {specid : specid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#specid').val(specid);

                generate_payroll_specification_category(response[0].SPEC_TYPE, response[0].CATEGORY);

                check_empty(response[0].SPEC_TYPE, '#specificationtype', 'select');
                check_empty(response[0].EMPLOYEE_ID, '#specemployee', 'select');

                $('#updatespecamount').val(response[0].SPEC_AMOUNT);
                $('#specpayrolldate').val(response[0].PAYROLL_DATE);
                $('#payrollspecstatus').val(response[0].STATUS);
                $('#payrollid').val(response[0].PAYROLL_ID);
            },
            complete: function(){
                check_role_permission(formtype, 75);
            }
        });
    }
    else if(formtype == 'deduction amount form'){
        var deductiontypeid = sessionStorage.getItem('deductiontypeid');
        var startrange = sessionStorage.getItem('startrange');
        var endrange = sessionStorage.getItem('endrange');
        transaction = 'deduction amount details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {deductiontypeid : deductiontypeid, startrange : startrange, endrange : endrange, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#deductiontypeid').val(deductiontypeid);
                $('#startrange').val(startrange);
                $('#endrange').val(endrange);

                $('#deductionamount').val(response[0].DEDUCTION_AMOUNT);
            },
            complete: function(){
                check_role_permission(formtype, 83);
            }
        });
    }
    else if(formtype == 'main deduction amount form'){
        var deductiontypeid = sessionStorage.getItem('deductiontypeid');
        var startrange = sessionStorage.getItem('startrange');
        var endrange = sessionStorage.getItem('endrange');
        transaction = 'deduction amount details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {deductiontypeid : deductiontypeid, startrange : startrange, endrange : endrange, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#startrange').val(startrange);
                $('#endrange').val(endrange);

                check_empty(deductiontypeid, '#deductiontypeid', 'select');
                $('#deductionamount').val(response[0].DEDUCTION_AMOUNT);
            },
            complete: function(){
                check_role_permission(formtype, 88);
            }
        });
    }
    else if(formtype == 'deduction type'){
        var deductiontypeid = sessionStorage.getItem('specificationcategory');
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'payroll deduction type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {deductiontypeid : deductiontypeid, employeeid : employeeid, transaction : transaction},
            success: function(response) {
                if(response[0].DEDUCTION_AMOUNT > 0){
                    $('#specamount').val(response[0].DEDUCTION_AMOUNT);
                }

                $('#deductioncategory').val(response[0].CATEGORY);

                if(response[0].CATEGORY == 'REGULAR'){
                    document.getElementById('specamount').readOnly = false;
                }
                else{
                    document.getElementById('specamount').readOnly = true;
                }
            },
        });
    }
    else if(formtype == 'allowance type form'){
        var allowancetypeid = sessionStorage.getItem('allowancetypeid');
        transaction = 'allowance type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {allowancetypeid : allowancetypeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#allowancetypeid').val(allowancetypeid);

                $('#allowancetype').val(response[0].ALLOWANCE);
                check_empty(response[0].TAX_TYPE, '#taxtype', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 93);
            }
        });
    }
    else if(formtype == 'other income type form'){
        var otherincometypeid = sessionStorage.getItem('otherincometypeid');
        transaction = 'other income type details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {otherincometypeid : otherincometypeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#otherincometypeid').val(otherincometypeid);

                $('#otherincometype').val(response[0].OTHER_INCOME);
                check_empty(response[0].TAX_TYPE, '#taxtype', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 97);
            }
        });
    }
    else if(formtype == 'update user account form'){
        var usercd = sessionStorage.getItem('usercd');
        transaction = 'user account details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {usercd : usercd, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#usercd').val(usercd);
                $('#employeeid').val(response[0].EMPLOYEE_ID);
                $('#firstname').val(response[0].FIRST_NAME);
                $('#middlename').val(response[0].MIDDLE_NAME);
                $('#lastname').val(response[0].LAST_NAME);

                check_empty(response[0].SUFFIX, '#suffix', 'select');
                check_empty(response[0].ROLE_ID, '#role', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 106);
            }
        });
    }
    else if(formtype == 'email notification form'){
        var notificationid = sessionStorage.getItem('notificationid');
        transaction = 'email notification details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {notificationid : notificationid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#notificationid').val(notificationid);
                $('#notification').val(response[0].NOTIFICATION);
            },
            complete: function(){
                check_role_permission(formtype, 114);
            }
        });
    }
    else if(formtype == 'email configuration form'){
        var mailid = $('#mailid').val();
        transaction = 'email configuration details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {mailid : mailid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#mailhost').val(response[0].MAIL_HOST);
                $('#port').val(response[0].PORT);
                $('#mailuser').val(response[0].USERNAME);
                $('#mailpassword').val(response[0].PASSWORD);
                $('#mailfromname').val(response[0].MAIL_FROM_NAME);
                $('#mailfromemail').val(response[0].MAIL_FROM_EMAIL);

                check_empty(response[0].MAIL_ENCRYPTION, '#mailencryption', 'select');
                check_empty(response[0].SMTP_AUTH, '#smptauth', 'select');
                check_empty(response[0].SMTP_AUTO_TLS, '#smptautotls', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 118);
            }
        });
    }
    else if(formtype == 'email recipient form'){
        var notificationid = sessionStorage.getItem('notificationid');
        var recipientid = sessionStorage.getItem('recipientid');
        transaction = 'email recipient details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {notificationid : notificationid, recipientid : recipientid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#notificationid').val(notificationid);
                $('#recipientid').val(recipientid);

                $('#email').val(response[0].EMAIL);
            },
            complete: function(){
                check_role_permission(formtype, 231);
            }
        });
    }
    else if(formtype == 'office shift form'){
        transaction = 'company details';
        var companyid = '1';

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {companyid : companyid, transaction : transaction},
            success: function(response) {
                $('#timein').val(response[0].START_WORKING_HOURS);
                $('#timeout').val(response[0].END_WORKING_HOURS);
                $('#late').val(response[0].LATE_MARK);
                $('#lunchstarttime').val(response[0].START_LUNCH_BREAK);
                $('#lunchendtime').val(response[0].END_LUNCH_BREAK);
                $('#halfday').val(response[0].HALF_DAY_MARK);
            },
        });
    }
    else if(formtype == 'update office shift form'){
        var dtrday = sessionStorage.getItem('dtrday');
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'office shift details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {dtrday : dtrday, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#employeeid').val(employeeid);
                $('#dtrday').val(dtrday);

                $('#employeename').val(response[0].EMPLOYEE_NAME);
                $('#dtrdayname').val(response[0].DTR_DAY_NAME);
                $('#timein').val(response[0].TIME_IN);
                $('#timeout').val(response[0].TIME_OUT);
                $('#late').val(response[0].LATE_MARK);
                $('#lunchstarttime').val(response[0].START_LUNCH_BREAK);
                $('#lunchendtime').val(response[0].END_LUNCH_BREAK);
                $('#halfday').val(response[0].HALF_DAY_MARK);

                check_empty(response[0].DAY_OFF, '#dayoff', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 126);
            }
        });
    }
    else if(formtype == 'payroll group form'){
        var payrollgroupid = sessionStorage.getItem('payrollgroupid');
        transaction = 'payroll group details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {payrollgroupid : payrollgroupid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#payrollgroupid').val(payrollgroupid);
                $('#payrollgroup').val(response[0].PAYROLL_GROUP_DESC);
            },
            complete: function(){
                check_role_permission(formtype, 131);
            }
        });
    }
    else if(formtype == 'attendance log form'){
        var attendanceid = sessionStorage.getItem('attendanceid');
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'attendance log details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {attendanceid : attendanceid, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#attendanceid').val(attendanceid);
                check_empty(employeeid, '#employeeid', 'select');

                $('#locked').val(response[0].LOCKED);
                $('#timeindate').val(response[0].TIME_IN_DATE);
                $('#timein').val(response[0].TIME_IN);
                $('#timeoutdate').val(response[0].TIME_OUT_DATE);
                $('#timeout').val(response[0].TIME_OUT);
                $('#remarks').val(response[0].REMARKS);
            },
            complete: function(){
                check_role_permission(formtype, 138);
            }
        });
    }
    else if(formtype == 'request employee attendance adjustment form'){
        var attendanceid = sessionStorage.getItem('attendanceid');
        var employeeid = sessionStorage.getItem('employeeid');

        transaction = 'employee attendance log details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {attendanceid : attendanceid, employeeid : employeeid, transaction : transaction},
            success: function(response) {
                $('#attendanceid').val(attendanceid);
                $('#employeeid').val(employeeid);

                document.getElementById('timeindate').disabled = true;

                $('#timeindate').val(response[0].TIME_IN_DATE);
                $('#timein').val(response[0].TIME_IN);
				$('#timeoutdate').val(response[0].TIME_OUT_DATE);
                $('#timeoutdatedef').val(response[0].TIME_OUT_DATE);
				$('#timeout').val(response[0].TIME_OUT);
                $('#timeoutdef').val(response[0].TIME_OUT);
            }
        });
    }
    else if(formtype == 'update employee attendance adjustment form'){
        var attendanceid = sessionStorage.getItem('attendanceid');
        var employeeid = sessionStorage.getItem('employeeid');
        var adjustmentid = sessionStorage.getItem('adjustmentid');

        transaction = 'attendance adjustment details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {attendanceid : attendanceid, employeeid : employeeid, adjustmentid : adjustmentid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#attendanceid').val(attendanceid);
                $('#employeeid').val(employeeid);
                $('#adjustmentid').val(adjustmentid);

                $('#timeindate').val(response[0].TIME_IN_DATE);
                $('#timein').val(response[0].TIME_IN);
                $('#reason').val(response[0].REASON);
                $('#status').val(response[0].STATUS);

                if(response[0].TIME_OUT_DATE){
                    $('#timeoutdate').val(response[0].TIME_OUT_DATE);
                    $('#timeoutdatedef').val(response[0].TIME_OUT_DATE);
                }
                else{
                    document.getElementById('timeoutdate').disabled = true;
                }

                if(response[0].TIME_OUT){
                    $('#timeout').val(response[0].TIME_OUT);
                    $('#timeoutdef').val(response[0].TIME_OUT);
                }
                else{
                    document.getElementById('timeout').disabled = true;
                }
            },
            complete: function(){
                check_role_permission(formtype, 148);
            }
        });
    }
    else if(formtype == 'telephone log form'){
        var logid = sessionStorage.getItem('logid');
        var employeeid = sessionStorage.getItem('employeeid');

        transaction = 'telephone log details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {logid : logid, employeeid : employeeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#logid').val(logid);

                $('#recipient').val(response[0].RECIPIENT);
                $('#telephone').val(response[0].TELEPHONE);
                $('#initialcalldate').val(response[0].INITIAL_CALL_DATE);
                $('#initialcalltime').val(response[0].INITIAL_CALL_TIME);
                $('#reason').val(response[0].REASON);
                $('#status').val(response[0].STATUS);
            },
            complete: function(){
                check_role_permission(formtype, 162);
            }
        });
    }
    else if(formtype == 'document management setting form'){
        var settingid = $('#settingid').val();
        transaction = 'document management setting details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {settingid : settingid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#maxfilesize').val(response[0].MAX_FILE_SIZE);

                check_empty(response[0].AUTHORIZATION, '#authentication', 'select');

                check_empty(response[0].FILE_TYPE.split(','), '#filetype', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 173);
            }
        });
    }
    else if (formtype == 'document form') {
        var documentid = sessionStorage.getItem('documentid');
        transaction = 'document details';

        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: { documentid: documentid, transaction: transaction },
            beforeSend: function () {
                disable_form(formtype);
            },
            success: function (response) {
                $('#publish').val(response[0].PUBLISH);
                $('#documentid').val(documentid);
                $('#update').val('1');
                $('#documentname').val(response[0].DOCUMENT_NAME);
                $('#description').val(response[0].DESCRIPTION);
                $('#publish').val(response[0].PUBLISH);
                $('#tags').val(response[0].TAGS);

                if (response[0].TAGS) {
                    $('#tags').val(response[0].TAGS);
                }

                check_empty(response[0].DOCUMENT_CATEGORY, '#category', 'select');
            },
            complete: function () {
                check_role_permission(formtype, 179);
            }
        });
    }
    
    
    else if(formtype == 'document form1'){
    var documentid = sessionStorage.getItem('documentid');
    transaction = 'document details';

    console.log('Fetching document details for ID:', documentid);

    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: {documentid : documentid, transaction : transaction},
        beforeSend: function(){
            console.log('Sending request to fetch document details');
            disable_form(formtype);
        },
        success: function(response) {
            console.log('Received response:', response);

            if(response && !response.error){
                $('#publish').val(response.PUBLISH);
                $('#documentid').val(documentid);
                $('#update').val('1');
                $('#documentname').val(response.DOCUMENT_NAME);
                $('#description').val(response.DESCRIPTION);
                $('#publish').val(response.PUBLISH);

                check_empty(response.DOCUMENT_CATEGORY, '#category', 'select');

                console.log('Tags before setting:', response.TAGS);
                if(response.TAGS) {
                    $('#tags').tagsinput('removeAll');
                    var tags = response.TAGS.split(',');
                    tags.forEach(function(tag) {
                        console.log('Adding tag:', tag.trim());
                        $('#tags').tagsinput('add', tag.trim());
                    });
                } else {
                    console.log('No tags found in the response');
                }
                console.log('Tags after setting:', $('#tags').val());
                console.log('Tagsinput items:', $('#tags').tagsinput('items'));
                console.log('Document details populated successfully');
            } else {
                console.log('Received error response:', response.error);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error fetching document details:', textStatus, errorThrown);
            console.log('Response Text:', jqXHR.responseText);
        },
        complete: function(){
            console.log('AJAX request completed');
            check_role_permission(formtype, 179);
            enable_form(formtype);
            initializeTagsInput();
            console.log('Submit button disabled state after AJAX complete:', $('#submitform'));

            // Force enable the submit button
            setTimeout(function() {
                $('#submitform').prop('disabled', false).removeAttr('disabled');
                console.log('Submit button forced enable, disabled state:', $('#submitform'));
            }, 100);
        }
    });
}
    else if(formtype == 'document permission department form'){
        var documentid = sessionStorage.getItem('documentid');
        transaction = 'department document permission details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {documentid : documentid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.department-permission').each(function(index) {
                    var val = $(this).val();
                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }
                    else{
                        $(this).prop('checked', false);
                    }
                });
            }
        });
    }
    else if(formtype == 'document permission employee form'){
        var documentid = sessionStorage.getItem('documentid');
        transaction = 'department employee permission details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {documentid : documentid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.employee-permission').each(function(index) {
                    var val = $(this).val();
                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }
                    else{
                        $(this).prop('checked', false);
                    }
                });
            }
        });
    }
    else if(formtype == 'update transmittal form'){
        var transmittalid = sessionStorage.getItem('transmittalid');
        transaction = 'transmittal details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {transmittalid : transmittalid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#transmittalid').val(transmittalid);
                $('#status').val(response[0].STATUS);
                $('#description').val(response[0].DESCRIPTION);

                check_empty(response[0].TRANSMITTED_DEPARTMENT, '#transmittaldepartment', 'select');
                
                if(response[0].TRANSMITTED_EMPLOYEE){
                    generate_priority_person(response[0].TRANSMITTED_DEPARTMENT, response[0].TRANSMITTED_EMPLOYEE);
                }
            },
            complete: function(){
                check_role_permission(formtype, 191);
            }
        });
    }
    else if(formtype == 'retransmit transmittal form'){
        var transmittalid = sessionStorage.getItem('transmittalid');
        transaction = 'transmittal details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {transmittalid : transmittalid, transaction : transaction},
            success: function(response) {
                $('#transmittalid').val(transmittalid);
                $('#description').val(response[0].DESCRIPTION);
            },
        });
    }
    else if(formtype == 'suggest to win form'){
        var stwid = sessionStorage.getItem('stwid');
        transaction = 'suggest to win details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {stwid : stwid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#stwid').val(stwid);

                $('#status').val(response[0].STATUS);
                $('#title').val(response[0].TITLE);
                $('#description').val(response[0].DESCRIPTION);
                $('#reason').val(response[0].REASON);
                $('#benefits').val(response[0].BENEFITS);
            },
            complete: function(){
                check_role_permission(formtype, 201);
            }
        });
    }
    else if(formtype == 'stw vote end date form'){
        var stwid = sessionStorage.getItem('stwid');
        transaction = 'suggest to win details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {stwid : stwid, transaction : transaction},
            success: function(response) {
                $('#stwid').val(stwid);

                $('#voteenddate').val(response[0].VOTING_PERIOD);
            },
        });
    }
    else if(formtype == 'suggest to win vote form'){
        var stwid = sessionStorage.getItem('stwid');
        var employeeid = sessionStorage.getItem('employeeid');
        transaction = 'suggest to win vote details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {stwid : stwid, employeeid : employeeid, transaction : transaction},
            success: function(response) {
                $('#stwid').val(stwid);
                $('#employeeid').val(employeeid);

                check_empty(response[0].SATISFACTION, '#satisfaction', 'select');
                check_empty(response[0].QUALITY, '#quality', 'select');
                check_empty(response[0].INNOVATION, '#innovation', 'select');
                check_empty(response[0].FEASIBILITY, '#feasibility', 'select');

                $('#title').val(response[0].TITLE);
                $('#remarks').val(response[0].REMARKS);
            },
        });
    }
    else if(formtype == 'training room log form'){
        var logid = sessionStorage.getItem('logid');
        var locked = sessionStorage.getItem('locked');

        transaction = 'training room log details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {logid : logid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#logid').val(logid);
                $('#locked').val(locked);

                $('#otherparticipants').val(response[0].OTHER_PARTICIPANT);
                $('#startdate').val(response[0].START_DATE);
                $('#starttime').val(response[0].START_TIME);
                $('#endtime').val(response[0].END_TIME);
                $('#reason').val(response[0].REASON);
                $('#status').val(response[0].STATUS);

                check_empty(response[0].LIGHTS, '#lights', 'select');
                check_empty(response[0].FAN, '#fan', 'select');
                check_empty(response[0].AIRCON, '#aircon', 'select');

                var participants = response[0].PARTICIPANT.split(',');
                $('#participants').val(participants).change();
            },
            complete: function(){
                check_role_permission(formtype, 222);
            }
        });
    }
    else if(formtype == 'weekly cash flow form'){
        var wcfid = sessionStorage.getItem('wcfid');

        transaction = 'weekly cash flow details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {wcfid : wcfid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#wcfid').val(wcfid);

                $('#startdate').val(response[0].START_DATE);
                $('#status').val(response[0].STATUS);

                if(response[0].STATUS == '0'){
                    check_role_permission(formtype, 235);
                }
                else{
                    check_role_permission(formtype, 241);
                }
            }
        });
    }
    else if(formtype == 'weekly cash flow particulars form'){
        var wcfid = sessionStorage.getItem('wcfid');
        var particularid = sessionStorage.getItem('particularid');

        transaction = 'weekly cash flow particulars details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {wcfid : wcfid, particularid : particularid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#wcfid').val(wcfid);
                $('#particularid').val(particularid);

                $('#details').val(response[0].DETAILS);
                $('#monday').val(response[0].MONDAY);
                $('#tuesday').val(response[0].TUESDAY);
                $('#wednesday').val(response[0].WEDNESDAY);
                $('#thursday').val(response[0].THURSDAY);
                $('#friday').val(response[0].FRIDAY);
                $('#wcftotal').val(response[0].TOTAL);
                $('#status').val(response[0].STATUS);

                check_empty(response[0].WCF_TYPE, '#wcftype', 'select');
                check_empty(response[0].LOAN_WCF_TYPE, '#wcfloantype', 'select');

                if(response[0].STATUS == '0'){
                    check_role_permission(formtype, 244);
                }
                else{
                    check_role_permission(formtype, 241);
                }
            }
        });
    }
    else if(formtype == 'update ticket form'){
        var ticketid = sessionStorage.getItem('ticketid');
        var locked = sessionStorage.getItem('locked');

        transaction = 'ticket details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {ticketid : ticketid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#ticketid').val(ticketid);
                $('#locked').val(locked);

                $('#duedate').val(response[0].DUE_DATE);
                $('#subject').val(response[0].SUBJECT);
                $('#description').val(response[0].DESCRIPTION);
                $('#duetime').val(response[0].DUE_TIME);

                check_empty(response[0].ASSIGNED_DEPARTMENT, '#ticketdepartment', 'select');
                check_empty(response[0].CATEGORY, '#category', 'select');
                
                if(response[0].ASSIGNED_EMPLOYEE){
                    generate_priority_person(response[0].ASSIGNED_DEPARTMENT, response[0].ASSIGNED_EMPLOYEE);
                }
            },
            complete: function(){
                if($('#ticket-datatable').length){
                    check_role_permission(formtype, 249);
                }
                else{
                    check_role_permission(formtype, 260);
                }                
            }
        });
    }
    else if(formtype == 'add ticket adjustment form'){
        var ticketid = $('#ticket-id').text();

        transaction = 'add ticket adjustment details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {ticketid : ticketid, transaction : transaction},
            success: function(response) {
                $('#ticketid').val(ticketid);
                $('#duedate').val(response[0].DUE_DATE);
                $('#duetime').val(response[0].DUE_TIME);
                $('#subject').val(response[0].SUBJECT);
                $('#description').val(response[0].DESCRIPTION);

                check_empty(response[0].ASSIGNED_DEPARTMENT, '#ticketdepartment', 'select');
                check_empty(response[0].CATEGORY, '#category', 'select');
                check_empty(response[0].PRIORITY, '#priority', 'select');
                
                if(response[0].ASSIGNED_EMPLOYEE){
                    generate_priority_person(response[0].ASSIGNED_DEPARTMENT, response[0].ASSIGNED_EMPLOYEE);
                }
            }
        });
    }
    else if(formtype == 'update ticket adjustment form'){
        var ticketid = $('#ticket-id').text();
        var adjustmentid = sessionStorage.getItem('adjustmentid');

        transaction = 'ticket adjustment details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {adjustmentid : adjustmentid, ticketid : ticketid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#adjustmentid').val(adjustmentid);
                $('#duedate').val(response[0].DUE_DATE);
                $('#duetime').val(response[0].DUE_TIME);
                $('#subject').val(response[0].SUBJECT);
                $('#description').val(response[0].DESCRIPTION);
                $('#reason').val(response[0].REASON);

                check_empty(response[0].ASSIGNED_DEPARTMENT, '#ticketdepartment', 'select');
                check_empty(response[0].CATEGORY, '#category', 'select');
                check_empty(response[0].PRIORITY, '#priority', 'select');
                
                if(response[0].ASSIGNED_EMPLOYEE){
                    generate_priority_person(response[0].ASSIGNED_DEPARTMENT, response[0].ASSIGNED_EMPLOYEE);
                }
            },
            complete: function(){
                check_role_permission(formtype, 272);           
            }
        });
    }
    else if(formtype == 'meeting form'){
        var meetingid = sessionStorage.getItem('meetingid');
        transaction = 'meeting details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {meetingid : meetingid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#meetingid').val(meetingid);

                $('#meetingtitle').val(response[0].TITLE);
                $('#meetingdate').val(response[0].MEETING_DATE);
                $('#starttime').val(response[0].START_TIME);
                $('#endtime').val(response[0].END_TIME);
                $('#status').val(response[0].STATUS);

                check_empty(response[0].MEETING_TYPE, '#meetingtype', 'select');
                check_empty(response[0].PREVIOUS_MEETING, '#previousmeeting', 'select');
                check_empty(response[0].PRESIDER, '#presider', 'select');
                check_empty(response[0].NOTED_BY, '#notedby', 'select');

                var attendees = response[0].ATTENDEES.split(',');
                $('#attendees').val(attendees).change();

                var absentees = response[0].ABSENTEES.split(',');
                $('#absentees').val(absentees).change();
            },
            complete: function(){
                check_role_permission(formtype, 298);
            }
        });
    }
    else if(formtype == 'meeting permission form'){
        var meetingid = sessionStorage.getItem('meetingid');
        transaction = 'meeting permission details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {meetingid : meetingid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.employee-permission').each(function(index) {
                    var val = $(this).val();
                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }
                    else{
                        $(this).prop('checked', false);
                    }
                });
            }
        });
    }
    else if(formtype == 'meeting task update form'){
        var taskid = sessionStorage.getItem('taskid');
        var agendaid = sessionStorage.getItem('agendaid');
        var meetingid = $('#meeting-id').text();
        transaction = 'meeting task details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {taskid : taskid, meetingid : meetingid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                var assigned_employees = JSON.parse(response[0].EMPLOYEE_ID);
                $('#taskid').val(taskid);
                $('#agendaid').val(agendaid);

                $('#task').val(response[0].TASK);
                $('#meetingstatus').val(response[0].MEETING_STATUS);
                $('#duedate').val(response[0].DUE_DATE);

                $('#meetingemployee').attr("disabled",true)
                var inter = setInterval(() => {
                $('#meetingemployee').attr("disabled",false)
                $('#meetingemployee').val(assigned_employees).change()
                if($('#meetingemployee option').length > 1){
                    clearInterval(inter)
                    }
               }, 200);
               
                generate_meeting_attendees(meetingid, response[0].EMPLOYEE_ID);
                check_empty(response[0].STATUS, '#taskstatus', 'select');
                check_empty(response[0].DUE_DATE_TYPE, '#duedatetype', 'select');
                check_empty(response[0].AGENDA, '#agenda', 'select');
                

            },
            complete: function(){
                check_role_permission(formtype, 308);
            }
        });
    }
    else if(formtype == 'meeting other matters update form'){
        var othermattersid = sessionStorage.getItem('othermattersid');
        var meetingid = $('#meeting-id').text();
        transaction = 'meeting other matters details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {othermattersid : othermattersid, meetingid : meetingid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#othermattersid').val(othermattersid);

                $('#othermatters').val(response[0].OTHER_MATTERS);
            },
            complete: function(){
                check_role_permission(formtype, 310);
            }
        });
    }
    
  else if(formtype == 'overtime form'){
        var overtimeid = sessionStorage.getItem('overtimeid');
        transaction = 'overtime details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {overtimeid : overtimeid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#overtimeid').val(overtimeid);
                $('#overtimetitle').val(response[0].TITLE);
                $('#holidaytype').val(response[0].HOLIDAY_TYPE).trigger('change');
                $('#overtimedate').val(response[0].OVERTIME_DATE);
                $('#overtimestart').val(response[0].START_TIME);
                $('#overtimeend').val(response[0].END_TIME);
                $('#reason').val(response[0].REASON);

            },
            complete: function(){
                check_role_permission(formtype, 407);
            }
        });
    }

    
 
    
    else if(formtype == 'training form'){
        var trainingid = sessionStorage.getItem('trainingid');
        transaction = 'training details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {trainingid : trainingid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#trainingid').val(trainingid);

                $('#trainingtitle').val(response[0].TITLE);
                $('#trainingdate').val(response[0].TRAINING_DATE);
                $('#starttime').val(response[0].START_TIME);
                $('#endtime').val(response[0].END_TIME);
                $('#description').val(response[0].DETAILS);
                $('#status').val(response[0].STATUS);

                check_empty(response[0].TRAINING_TYPE, '#trainingtype', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 318);
            }
        });
    }
    else if(formtype == 'training attendees form'){
        var trainingid = sessionStorage.getItem('trainingid');
        transaction = 'training attendees details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {trainingid : trainingid, transaction : transaction},
            success: function(response) {
                var userArray = new Array();
                userArray = response.toString().split(',');

                $('.role-user').each(function(index) {
                    var val = $(this).val();
                    var department = $(this).data('department');

                    if (userArray.includes(val)) {
                        $(this).prop('checked', true);
                    }

                    check_box_check(department);
                });
            },
            complete: function(){
                check_role_permission(formtype, 320);
            }
        });
    }
    else if(formtype == 'training report form'){
        var trainingid = sessionStorage.getItem('trainingid');
        var username = $('#username').text();
        transaction = 'training report details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {trainingid : trainingid, username : username, transaction : transaction},
            success: function(response) {
                $('#trainingid').val(trainingid);

                $('#learnings').val(response[0].LEARNINGS);
                $('#comments').val(response[0].COMMENTS);
            },
        });
    }
	else if(formtype == 'car search parameter form'){
        var parameterid = sessionStorage.getItem('parameterid');
        transaction = 'car search parameter details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {parameterid : parameterid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#parameterid').val(parameterid);

                $('#parameter_code').val(response[0].PARAMETER_CODE);
                $('#parameter_value').val(response[0].PARAMETER_VALUE);

                check_empty(response[0].CATEGORY_TYPE, '#category_type', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 354);
            }
        });
    }
    else if(formtype == 'price index item form'){
        var itemid = sessionStorage.getItem('itemid');
        transaction = 'price index item details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {itemid : itemid, transaction : transaction},
            beforeSend: function(){
                disable_form(formtype);
            },
            success: function(response) {
                $('#itemid').val(itemid);

                $('#other_information').val(response[0].OTHER_INFORMATION);

                check_empty(response[0].BRAND, '#brand', 'select');
                check_empty(response[0].MODEL, '#model', 'select');
                check_empty(response[0].VARIANT, '#variant', 'select');
                check_empty(response[0].ENGINE_SIZE, '#engine_size', 'select');
                check_empty(response[0].GAS_TYPE, '#gas_type', 'select');
                check_empty(response[0].TRANSMISSION, '#transmission', 'select');
                check_empty(response[0].DRIVE_TRAIN, '#drive_train', 'select');
                check_empty(response[0].BODY_TYPE, '#body_type', 'select');
                check_empty(response[0].SEATING_CAPACITY, '#seating_capacity', 'select');
                check_empty(response[0].CAMSHAFT_PROFILE, '#camshaft_profile', 'select');
                check_empty(response[0].COLOR_TYPE, '#color_type', 'select');
                check_empty(response[0].AIRCON_TYPE, '#aircon_type', 'select');
            },
            complete: function(){
                check_role_permission(formtype, 359);
            }
        });
    }
    else if(formtype == 'update price index amount form'){
        var itemid = sessionStorage.getItem('itemid');
        var year = sessionStorage.getItem('year');
        transaction = 'price index amount details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {itemid : itemid, year : year, transaction : transaction},
            success: function(response) {
                $('#itemid').val(itemid);
                $('#item').val(response[0].ITEM);
                check_empty(year, '#year', 'select');

                $('#amount').val(response[0].ITEM_VALUE);
            }
        });
    }
    else if(formtype == 'add price index amount adjustment form'){
        var itemid = sessionStorage.getItem('itemid');
        var year = sessionStorage.getItem('year');
        transaction = 'price index amount details';
  
        $.ajax({
            url: 'controller.php',
            method: 'POST',
            dataType: 'JSON',
            data: {itemid : itemid, year : year, transaction : transaction},
            success: function(response) {
                $('#itemid').val(itemid);
                $('#item').val(response[0].ITEM);
                check_empty(year, '#year', 'select');

                $('#amount').val(response[0].ITEM_VALUE);
            }
        });
    }
}

function display_working_days(total){
    var binValue;
    var working_days = '';
    var working_day;
    binValue = (total >>> 0).toString(2);
    
    if(binValue.length == 6){
        binValue = '0' + binValue;
    }
    if(binValue.length == 5){
        binValue = '00' + binValue;
    }
    else if(binValue.length == 4){
        binValue = '000' + binValue;
    }
    else if(binValue.length == 3){
        binValue = '0000' + binValue;
    }
    else if(binValue.length == 2){
        binValue = '00000' + binValue;
    }
    else if(binValue.length == 1){
        binValue = '000000' + binValue;
    }

    for(var i = 0; i < binValue.length; i++){
        if(binValue.charAt(i) == '1'){
            if(i == 0){
                working_days += '64';
            }
            else if(i == 1){
                working_days += '32';
            }
            else if(i == 2){
                working_days += '16';
            }
            else if(i == 3){
                working_days += '8';
            }
            else if(i == 4){
                working_days += '4';
            }
            else if(i == 5){
                working_days += '2';
            }
            else {
                working_days += '1';
            }

            if(i != (binValue.length - 1)){
                working_days += ',';
            }
        }
    }

    working_day = working_days.split(',');

    check_empty(working_day, '#workingdays', 'select');
}

// Show alert
function show_alert(title, message, type){
    Swal.fire(title, message, type);
}

function show_alert_event(title, message, type, event, link = null){
    Swal.fire(title, message, type).then(function(){ 
            if(event == 'reload'){
                location.reload();
            }if(event == 'link-open'){
                window.open(link, "_blank");
            }
        }
    );
}

//======================changes lemar bill=====================
function show_alert_close_modals(title, message, type){
    Swal.fire(title, message, type).then(function(){ 
                $('.modal').modal('hide')  
        });
}
//======================changes lemar bill=====================


// Show sweetalert2 confirmation
function show_alert_confirmation(confirmtitle, confirmtext, confirmicon, confirmbtntext, btncolor, confirmtype){
    Swal.fire({
        title: confirmtitle,
        text: confirmtext,
        icon: confirmicon,
        showCancelButton: !0,
        confirmButtonText: confirmbtntext,
        cancelButtonText: "Cancel",
        confirmButtonClass: "btn btn-"+ btncolor +" mt-2",
        cancelButtonClass: "btn btn-secondary ms-2 mt-2",
        buttonsStyling: !1
    }).then(function(result) {
        if (result.value) {
            if(confirmtype == 'expired password'){

                var username = $('#username').val();
                generate_modal('change password form', 'Change Password', 'R' , '1', '1', 'form', 'changepasswordForm', '0', username);
                
            }
        }
    })
}

//duplicate element
function duplicate_element(target) {
    $(target).last().clone(false).appendTo(target)

    //$(target).append(element)

 
}

// Generate function
function generate_modal(formtype, title, size, scrollable, submitbutton, generatetype, formid, add, username){
    var type = 'system modal';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, username : username, title : title, size : size, scrollable : scrollable, submitbutton : submitbutton, generatetype : generatetype, formid : formid},
        beforeSend: function(){
            $('#System-Modal').remove();
        },
        success: function(response) {
            $('body').append(response[0].MODAL);
        },
        complete : function(){
            if(generatetype == 'form'){
                generate_form(formtype, formid, add, username);
            }
            else{
                generate_element(formtype, '', '', '1', username);
            }
        }
    });
}

function generate_form(formtype, formid, add, username){
    var type = 'system form';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: { type : type, username : username, formtype : formtype, formid : formid },
        success: function(response) {
            document.getElementById('modal-body').innerHTML = response[0].FORM;
        },
        complete: function(){
            if(add == '0'){
                display_form_details(formtype);
            }
            else{
                if(formtype == 'reject leave form' || formtype == 'cancel leave form' || formtype == 'cancel leave application form'){
                    var employeeid = sessionStorage.getItem('employeeid');
                    var leaveid = sessionStorage.getItem('leaveid');

                    $('#employeeid').val(employeeid);
                    $('#leaveid').val(leaveid);
                }
                else if(formtype == 'approve attendance adjustment leave form' || formtype == 'reject attendance adjustment leave form' || formtype == 'cancel attendance adjustment leave form' || formtype == 'approve price index amount adjustment form' || formtype == 'reject price index amount adjustment form' || formtype == 'cancel price index amount adjustment form'){
                    var adjustmentid = sessionStorage.getItem('adjustmentid');

                    $('#adjustmentid').val(adjustmentid);
                }
                else if(formtype == 'deduction amount form'){
                    var deduction_type_id = $('#deduction-type-id').text();

                    $('#deductiontypeid').val(deduction_type_id);
                }
                else if(formtype == 'pay payroll form'){
                    var payrollid = sessionStorage.getItem('payrollid');
                    var employeeid = sessionStorage.getItem('employeeid');

                    $('#payrollid').val(payrollid);
                    $('#employeeid').val(employeeid);
                }
                else if(formtype == 'consumed telephone log form'){
                    var logid = sessionStorage.getItem('logid');

                    $('#logid').val(logid);
                }
                else if(formtype == 'download document form'){
                    var documentid = sessionStorage.getItem('documentid');

                    $('#documentid').val(documentid);
                }
                else if(formtype == 'email recipient form'){
                    var notificationid = $('#notification-id').text();

                    $('#notificationid').val(notificationid);
                }
                else if(formtype == 'filter employee attendance record' || formtype == 'filter employee attendance adjustment' || formtype == 'filter suggest to win' || formtype == 'filter suggest to win approval' || formtype == 'filter attendance summary' || formtype == 'filter attendance log' || formtype == 'filter training room log' || formtype == 'filter health declaration summary' || formtype == 'filter meeting'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != ''){
                        $('#startdate').val(filter1);
                        $('#enddate').val(filter2);
                    }
                }
                else if(formtype == 'filter transmittal'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != '' && (filter1 != 'transmittedto' && filter1 != 'transmittedby' && filter1 != 'status')){
                        $('#startdate').val(filter1);
                        $('#enddate').val(filter2);
                    }
                }
                else if(formtype == 'filter suggest to win votes'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#month', 'val');
                        check_empty(filter2, '#year', 'val');
                    }
                }
                else if(formtype == 'filter payroll' || formtype == 'filter payroll summary'){
                    var filter1 = sessionStorage.getItem('filter1');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#payrollperiod', 'val');
                    }
                }
                else if(formtype == 'filter document form'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#documentfilterby', 'val');
                        document.getElementById('documentfiltervalue').disabled = false;

                        generate_document_filter_value(filter1, filter2);
                    }
                }
                else if(formtype == 'search document form'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#documentsearchby', 'val');
                        $('#documentsearch').val(filter2);
                    }
                }
                else if(formtype == 'filter employee form'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#employeefilterby', 'val');

                        generate_employee_filter_value(filter1, filter2);
                    }
                }
                else if(formtype == 'weekly cash flow particulars form'){
                    var wcfid = $('#wcf-id').text();

                    $('#wcfid').val(wcfid);
                }
                else if(formtype == 'filter weekly cash flow'){
                    var filter1 = sessionStorage.getItem('filter1');

                    if(filter1 != '' && filter2 != ''){
                        check_empty(filter1, '#wcfperiod', 'val');
                    }
                }
                else if(formtype == 'filter ticket by date' || formtype == 'filter telephone log summary'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');
                    var filter3 = sessionStorage.getItem('filter3');

                    if(filter1 != '' && filter2 != '' && filter3 != ''){
                        check_empty(filter1, '#filterby', 'val');
                        $('#startdate').val(filter2);
                        $('#enddate').val(filter3);
                    }
                }
                else if(formtype == 'filter ticket form'){
                    var filter1 = sessionStorage.getItem('filter1');

                    if(filter1 != ''){
                        check_empty(filter1, '#filterby', 'select');
                    }
                }
                else if(formtype == 'reject ticket form' || formtype == 'cancel ticket form'){
                    var ticketid = sessionStorage.getItem('ticketid');

                    $('#ticketid').val(ticketid);
                }
                else if(formtype == 'ticket note form' || formtype == 'ticket attachment form'){
                    var ticketid = $('#ticket-id').text();

                    $('#ticketid').val(ticketid);
                }
                else if(formtype == 'filter transmittal by category'){
                    var filter1 = sessionStorage.getItem('filter1');
                    var filter2 = sessionStorage.getItem('filter2');

                    if(filter1 != '' && filter2 != '' && (filter1 == 'transmittedto' || filter1 == 'transmittedby' || filter1 == 'status')){
                        check_empty(filter1, '#transmittalfilterby', 'val');
                        document.getElementById('transmittalfiltervalue').disabled = false;

                        generate_transmittal_filter_value(filter1, filter2);
                    }
                }
                else if(formtype == 'meeting note form'){
                    var meetingid = $('#meeting-id').text();

                    $('#meetingid').val(meetingid);
                }
                else if(formtype == 'meeting task form'){
                    var meetingid = $('#meeting-id').text();
                    var agendaid = sessionStorage.getItem('agendaid');

                    generate_meeting_attendees(meetingid, '');

                    $('#agendaid').val(agendaid);
                }
                else if(formtype == 'add previous discussion to agenda form'){
                    var meetingid = $('#meeting-id').text();
                    var taskid = sessionStorage.getItem('taskid');

                    $('#taskid').val(taskid);
                }
                else if(formtype == 'reject training form' || formtype == 'cancel training form'){
                    var trainingid = sessionStorage.getItem('trainingid');

                    $('#trainingid').val(trainingid);
                }
                  else if(formtype == 'reject overtime form' || formtype == 'cancel overtime form'){
                     var overtimeid = sessionStorage.getItem('overtimeid');
                        console.log("Overtime ID from sessionStorage:", overtimeid);
                        $('#overtimeid').val(overtimeid);
                        console.log("Overtime ID set in form:", $('#overtimeid').val());

                }
                
				 else if(formtype == 'tag ticket as closed form'){
                    var ticketid = sessionStorage.getItem('ticketid');

                    $('#ticketid').val(ticketid);
                }
            }

            initialize_elements();
            initialize_form_validation(formtype);

            $('#System-Modal').modal('show');
        }
    });    
}

function generate_element(elementtype, value, container, modal, username){
    var type = 'system element';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: { type : type, username : username, value : value, elementtype : elementtype },
        beforeSend : function(){
            if(container){
                document.getElementById(container).innerHTML = '';
            }
        },
        success: function(response) {
            if(!container){
                document.getElementById('modal-body').innerHTML = response[0].ELEMENT;
            }
            else{
                document.getElementById(container).innerHTML = response[0].ELEMENT;
            }
        },
        complete: function(){
            initialize_elements();

            if($('#attendance-summary-attendance-record-datatable').length || $('#attendance-summary-leave-datatable').length || $('#attendance-summary-attendance-adjustment-datatable').length || $('#payroll-summary-payroll-specification-datatable')){
                var employeeid = sessionStorage.getItem('employeeid');
                var startdate = sessionStorage.getItem('startdate');
                var enddate = sessionStorage.getItem('enddate');            

                if($('#attendance-summary-attendance-record-datatable').length){
                    generate_datatable_three_parameter('attendance summary attendance record table', employeeid, startdate, enddate, '#attendance-summary-attendance-record-datatable', 0, 'desc', '');
                }

                if($('#attendance-summary-leave-datatable').length){
                    generate_datatable_three_parameter('attendance summary leave table', employeeid, startdate, enddate, '#attendance-summary-leave-datatable', 0, 'desc', '');
                }

                if($('#attendance-summary-attendance-adjustment-datatable').length){
                    generate_datatable_three_parameter('attendance summary attendance adjustment table', employeeid, startdate, enddate, '#attendance-summary-attendance-adjustment-datatable', 0, 'desc', '');
                }

                if($('#payroll-summary-payroll-specification-datatable').length){
                    var payrollid = sessionStorage.getItem('payrollid');

                    generate_datatable_one_parameter('payroll summary payroll specification table', payrollid, '#payroll-summary-payroll-specification-datatable', 0, 'desc', '');
                }

                if($('#suggest-to-win-vote-details-datatable').length){
                    var stwid = sessionStorage.getItem('stwid');

                    generate_datatable_one_parameter('suggest to win vote details table', stwid, '#suggest-to-win-vote-details-datatable', 6, 'desc', [8]);
                }
            }

            if($('#transmittal-history-datatable').length){
                var transmittalid = sessionStorage.getItem('transmittalid');

                generate_datatable_one_parameter('transmittal history table', transmittalid, '#transmittal-history-datatable', 0, 'desc', '');
            }

            if(modal == '1'){
                $('#System-Modal').modal('show');
            }
        }
    });
}

function generate_payroll_specification_category(specificationtype, selected){
    var username = $('#username').text();
    var type = 'payroll specification category options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, specificationtype : specificationtype, username : username},
        beforeSend: function(){
            $('#specificationcategory').empty();
        },
        success: function(response) {
            var newOption = new Option('--', '', false, false);
            $('#specificationcategory').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].CATEGORYDESC, response[i].CATEGORYID, false, false);
                $('#specificationcategory').append(newOption);
            }
        },
        complete: function(){            
            if(selected != ''){
                $('#specificationcategory').val(selected).change();
            }
        }
    });
}

function generate_document_filter_value(filterby, selected){
    var username = $('#username').text();
    var type = 'document filter options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, filterby : filterby, username : username},
        beforeSend: function(){
            $('#documentfiltervalue').empty();
        },
        success: function(response) {
            var newOption = new Option('--', '', false, false);
            $('#documentfiltervalue').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FILTERDESC, response[i].FILTERVAL, false, false);
                $('#documentfiltervalue').append(newOption);
            }
        },
        complete: function(){            
            if(selected != ''){
                $('#documentfiltervalue').val(selected).change();
            }
        }
    });
}

function generate_employee_filter_value(filterby, selected){
    var username = $('#username').text();
    var type = 'employee filter options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, filterby : filterby, username : username},
        beforeSend: function(){
            $('#employeefiltervalue').empty();
        },
        success: function(response) {
            var newOption = new Option('--', '', false, false);
            $('#employeefiltervalue').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FILTERDESC, response[i].FILTERVAL, false, false);
                $('#employeefiltervalue').append(newOption);
            }
        },
        complete: function(){            
            if(selected != ''){
                document.getElementById('employeefiltervalue').disabled = false;
                $('#employeefiltervalue').val(selected).change();
            }
        }
    });
}

function generate_subordinates(employeeid, superior, selected){
    var username = $('#username').text();
    var type = 'subordinates options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, employeeid : employeeid, superior : superior, username : username},
        beforeSend: function(){
            $('#subordinate').empty();
        },
        success: function(response) {
            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FULL_NAME, response[i].EMPLOYEE_ID, false, false);
                $('#subordinate').append(newOption);
            }
        },
        complete: function(){
            if(selected != ''){
                $('#subordinate').val(selected).change();
            }
        }
    });
}

function generate_priority_person(departmentid, selected){
    var username = $('#username').text();
    var type = 'priority person options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, departmentid : departmentid, username : username},
        beforeSend: function(){
            $('#priorityperson').empty();
        },
        success: function(response) {
            $('#priorityperson').empty();

            var newOption = new Option('--', '', false, false);
            $('#priorityperson').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FULL_NAME, response[i].EMPLOYEE_ID, false, false);
                $('#priorityperson').append(newOption);
            }
        },
        complete: function(){
            if(selected != ''){
                $('#priorityperson').val(selected).change();
            }
        }
    });
}

function generate_meeting_attendees(meetingid, selected){
    var username = $('#username').text();
    var type = 'meeting attendees options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, meetingid : meetingid, username : username},
        beforeSend: function(){
            $('#employee').empty();
        },
        success: function(response) {
            $('#meetingemployee').empty();

            var newOption = new Option('--', '', false, false);
            $('#meetingemployee').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FULL_NAME, response[i].EMPLOYEE_ID, false, false);
                $('#meetingemployee').append(newOption);
            }
        },
        complete: function(){
            if(selected != ''){
                $('#meetingemployee').val(selected).change();
            }
        }
    });
}

function generate_ticket_notes(ticketid){
    var username = $('#username').text();
    var type = 'ticket notes';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, ticketid : ticketid, username : username},
        beforeSend: function(){
            $('#ticket-notes').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
        },
        success: function(response) {
            $('#ticket-notes').html(response[0]['NOTES']);
        }
    });
}

function generate_price_index_item_option(search_brand, search_model){
    var username = $('#username').text();
    var type = 'price index item options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, search_brand : search_brand, search_model : search_model, username : username},
        beforeSend: function(){
            $('#price_index_item').empty();
             document.getElementById('price_index_item').disabled = true;
        },
        success: function(response) {
            var newOption = new Option('--', '', false, false);
            $('#price_index_item').append(newOption);

            if(response.length > 0){
                for(var i = 0; i < response.length; i++) {
                    newOption = new Option(response[i].ITEM, response[i].ITEM_ID, false, false);
                    $('#price_index_item').append(newOption);
                }

                document.getElementById('price_index_item').disabled = false;
            }
            else{
                document.getElementById('price_index_item').disabled = true;
            }
        }
    });
}

// =================================changes lemar bill===================================

/**
 * function for generating options
 * @param {String} targetElementID  where to render the html
 * @param {string} type // to specific the generation type
 * @param {any} data // if you want to send any data to server 
 */
 function generate_select_option(targetElementID,type,data = null){
    var username = $('#username').text();
    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {'type' : type,'data': data,'username' : username},
        beforeSend: function(){
            $(`${targetElementID}`).attr("disabled", true);
        },
        success: function(response) {
           // $(`${targetElementID}`).html(response);
            // console.log(response);
        },complete :function(res) {
            console.log(res);
            $(`${targetElementID}`).attr("disabled", false);
            $(`${targetElementID}`).html(res.responseJSON);

        }
    });

}

//send data to controller
function ajax_request(url,data, success,complete=null) {
    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'JSON',
        data: data,
        beforeSend: function(){
          //To Do
        },
        success: success,
        complete : complete,
    });
}

function ajax_request_form(url,data, success,complete=null,beforesend=null,error=null) {
    $.ajax({
        url: url,
        method: 'POST',
        dataType: 'JSON',
        processData: false,
        contentType: false,
        data: data,
        beforeSend:beforesend,
        success: success,
        complete : complete,
        error : error
    });
}


//generate QR for item
/**
 * This function is for generation  of QR 
 * @param {string} data string data to be generate to qr
 */
 function create_qr(data,canvas) {
    var qr;
    qr = new QRious({
        element: document.getElementById(canvas),
        size: 100,
        value: "No ID Number Yet",
    });

    qr.set({
        foreground: "#000000",
        size: 200,
        value: data,
    });
}
function display_item(itemid,username)
{
    var newitemid = itemid.replace('ITEM_','')
    var permission_view_image = check_permission('367')

    if(permission_view_image == 0){
        $('#btn-view-image').parent().html('')
    }

    ajax_request('controller.php',{data:{item_id:newitemid},username:username,transaction : 'get inventory item single'},function (d) {
        var timer = 500
        var item = d[0] //data of the item
      //  console.log(item);
        var user_dept = $('#user_dept').val()
        $('#mdl_edititem').modal('show')
        $('#edittem_dept_owner').val(item.DEPT_ITEM_OWNER).change()
        generate_select_option('#edititem_itemcategory','department item category option',{dept_owner : item.DEPT_ITEM_OWNER});
        generate_select_option('#edititem_brand','item category brand option',{sel_cat : item.ITEM_CATEGORY});

    },function (d) {

                var timer = 5000
                var item = d.responseJSON[0];
                console.log(item);
                var user_dept = $('#user_dept').val()

                setTimeout(() => {
                
                    $('#edititem_itemcategory').val(item.ITEM_CATEGORY).change()
                
                    if (user_dept!="all") {
                        $('#edittem_dept_owner').prop('disabled',true)
                    }
                    
                }, timer);
                setTimeout(() => {
                    $('#edititem_brand').val(item.BRAND).change()
                
                }, timer+3000);
                $('#edititem_model').val(item.MODEL)
                $('#edititem_serialnum').val(item.SERIAL_NUMBER)
                $('#edititem_model').val(item.MODEL)
                $('#edititem_description').val(item.DESCRIPTION)
                $('#edititem_remarks').val(item.REMARKS)
                $('#edititem_curr_value').val(item.CURR_VALUE)
                $('#edititem_orig_value').val(item.ORIG_VALUE)
                $('#edititem_id').val(item.ITEM_ID)
            
                create_qr(itemid,'qr_code_item')
                $('#item_code').html(itemid)


                if (item.CURR_STATUS == "ISSUED") {
                    $('.btn-show-assign-modal').prop('disabled', true);
                    $('.btn-mark-return').prop('disabled', false);
                }else if (item.CURR_STATUS == "STOCK") {
                    $('.btn-show-assign-modal').prop('disabled', false);
                    $('.btn-mark-return').prop('disabled', true);
                } else {
                    
                }
                
        }
    )

    ajax_request('controller.php',{data :{item_id : newitemid},username : username, transaction : "show item images"},function(d){
        console.log();
        if(d.length !=0){
            var image_url = d[0].image_name;
            $('#img_item_image').attr("src",image_url)
        }else{
            $('#img_item_image').attr("src","assets/images/default/info-avatar.png")
        }
        
    })

    
}

//For showing the images of items
function show_item_image(item_id,username){

    $("#mdl_item_images").modal("show");
    $('#file_upload_item_image').val('')
    $('#img_item_container').html('')
    
    var permission_delete_image = check_permission('368')
    var permission_upload_image = check_permission('369')
    console.log(permission_delete_image);

    
    //permission check
    if(permission_upload_image == 0 ){
        $('#file_upload_item_image').parent().html('')
    }

    ajax_request('controller.php',{data:{item_id:item_id},username:username,transaction : 'show item images'},function (d) {
        var html =''
        var buttons = ''
        
        d.slice().reverse().forEach(element => {
            if(permission_delete_image == 1){
                buttons =` <button type="button" class="btn btn-sm btn-danger waves-effect waves-light mb-3 btn-remove-image" data-imageid="${element.id}" style="text-align:center;" >
                remove
             </button>`
            }
             html += `
            <div class="col-md-4">
           
            <div class="col-md-12">
            <a href="${element.image_name}" target="_blank">
                <img src="${element.image_name}" alt="..." class="img-thumbnail rounded" style="height:120px;" />
            </a>
            </div>

             <div class="col-md-12 d-flex flex-column">
             <div class="p-2">
                <i>${element.created_at}</i>
             </div>
                 <div class="p-2 ">
                    ${buttons}
                 </div>
             </div> 
         </div>
            `
          
        });

        $('#img_item_container').html(html)
    
    })
}





function qr_scanner_item(target_element_to_render) {

    //qr scanner
function onScanSuccess(qrCodeMessage) {
    // handle on success condition with the decoded message
    //alert(qrCodeMessage)

    if (typeof qrCodeMessage == "string") {
        qr = [];
        qr.push(qrCodeMessage);

    }

    if (qr.length == 1) {
        //check_user_item(qrCodeMessage);

        display_item(qrCodeMessage);
        //$('.modal').modal('hide')
       // alert(qrCodeMessage)
        $("#btn_stop").click();
        var audio = new Audio("assets/audio/scan.mp3");
        audio.play();
        navigator.vibrate([200, 20, 200]);
    }
    console.log(qr.length);
}


function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }




var html5QrcodeScanner = new Html5QrcodeScanner(target_element_to_render, { fps: 20});
html5QrcodeScanner.render(onScanSuccess,onScanFailure);
 
}


// =================================changes lemar bill===================================

function generate_meeting_notes(meetingid){
    var username = $('#username').text();
    var type = 'meeting notes';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, meetingid : meetingid, username : username},
        beforeSend: function(){
            $('#meeting-notes').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
        },
        success: function(response) {
            $('#meeting-notes').html(response[0]['NOTES']);
        }
    });
}

function generate_transmittal_filter_value(filterby, selected){
    var username = $('#username').text();
    var type = 'transmittal filter options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, filterby : filterby, username : username},
        beforeSend: function(){
            $('#transmittalfiltervalue').empty();
        },
        success: function(response) {
            var newOption = new Option('--', '', false, false);
            $('#transmittalfiltervalue').append(newOption);

            for(var i = 0; i < response.length; i++) {
                newOption = new Option(response[i].FILTERDESC, response[i].FILTERVAL, false, false);
                $('#transmittalfiltervalue').append(newOption);
            }
        },
        complete: function(){            
            if(selected != ''){
                $('#transmittalfiltervalue').val(selected).change();
            }
        }
    });
}

function get_notification_count(){
    var username = $('#username').text();
    var transaction = 'notification count';

    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'TEXT',
        data: {transaction : transaction, username : username},
        success: function(response) {
            if(response > 0){
                $('#page-header-notifications-dropdown').html('<i class="bx bx-bell bx-tada"></i><span class="badge bg-danger rounded-pill">'+ response +'</span>');
            }
            else{
                $('#page-header-notifications-dropdown').html('<i class="bx bx-bell">');
            }
        },
    });
}

function select_employee_department(employee_id){
    var username = $('#username').text();
    var transaction = 'employee department selection';

    $.ajax({
        type: 'POST',
        url: 'controller.php',
        data: {username : username, employee_id : employee_id, transaction : transaction},
        success: function (response) {
            $('#meetingdepartment').val(response).change();
        },
    });
}

// Check function

function check_box_check(id){
    var check_box_child_check = $('.'+ id +'-child:checked').length;
    var check_box_child_number = $('.'+ id +'-child').length;

    if (check_box_child_check == check_box_child_number){
        $('.'+ id +'-parent').prop('checked', true);
    }
    else{
        $('.'+ id +'-parent').prop('checked', false);
    }
}


function initializeTagsInput() {
    console.log('Initializing tagsinput');
    $('#tags').tagsinput({
        trimValue: true,
        confirmKeys: [13, 44, 32],
        maxTags: 10
    });
    console.log('Tagsinput initialized');
}


function loadBirthdayData(month) {
    // Show loader, hide other elements
    $("#birthday-loader").show();
    $("#birthday-container, #no-birthdays").hide();
    
    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { 
            transaction: "employee birthdays",
            month: month 
        },
        success: function(response) {
            // Hide loader
            $("#birthday-loader").hide();
            
            if (response && response.length > 0) {
                // Render birthday cards
                renderBirthdayCards(response);
                $("#birthday-container").show();
            } else {
                // Show no birthdays message
                $("#no-birthdays").show();
            }
        },
        error: function(error) {
            console.error("Error fetching birthday data:", error);
            $("#birthday-loader").hide();
            
            // Show error message
            $("#no-birthdays").html(`
                <i class="fas fa-exclamation-triangle text-danger" style="font-size: 48px;"></i>
                <p class="mt-3">Failed to load birthday data. Please try again later.</p>
            `).show();
        }
    });
}

/**
 * Get a random birthday message
 */
function getRandomBirthdayMessage() {
    const birthdayMessages = [
        "Happy Birthday! Wishing you a fantastic day!",
        "Happy Birthday! Hope your day is filled with joy!",
        "May your birthday be filled with happiness!",
        "Wishing you a wonderful birthday celebration!",
        "Happy Birthday! May all your wishes come true!",
        "Celebrate and enjoy your special day!",
        "Another amazing year ahead. Happy Birthday!",
        "Hope your birthday is as special as you are!"
    ];
    
    return birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
}


function renderBirthdayCards(employees) {
    const container = $("#birthday-cards");
    container.empty();
    
    employees.forEach(function(employee) {
        // Format birthday date
        const birthday = new Date(employee.BIRTHDAY);
        const formattedDate = formatDate(birthday);
        
        const birthdayMessage = getRandomBirthdayMessage();
        
        // Default image if profile image is not available
        const profileImage = employee.PROFILE_IMAGE ? 
            employee.PROFILE_IMAGE : 
            'assets/images/default-avatar.png';
        
        // Department and designation
        let position = '';
        if (employee.DEPARTMENT) {
            position += employee.DEPARTMENT;
            if (employee.DESIGNATION) {
                position += ' | ' + employee.DESIGNATION;
            }
        } else if (employee.DESIGNATION) {
            position = employee.DESIGNATION;
        }
        
        // Create card HTML with birthday hat SVG
        const card = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 birthday-card">
                    <div class="card-body text-center position-relative">
                        <span class="badge bg-primary position-absolute top-0 end-0 mt-2 me-2">
                            ${employee.birthday_day}
                        </span>
                        
                        <!-- Profile image with birthday hat -->
                        <div class="position-relative mt-3 mb-3">
                            <img src="${profileImage}" class="rounded-circle img-thumbnail" 
                                alt="${employee.FIRST_NAME}" style="width: 80px; height: 80px; object-fit: cover; position: relative; z-index: 1;">
                            
                  
                        </div>
                        
                        <h5 class="card-title">${employee.FIRST_NAME} ${employee.LAST_NAME}</h5>
                        <p class="card-text">
                            <i class="fas fa-birthday-cake text-primary me-2"></i>
                            ${formattedDate}
                        </p>
                        <p class="card-text text-primary">
                            ${birthdayMessage}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.append(card);
    });
}


function formatDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


function loadWorkAnniversaries(month = null) {
    // Show loader, hide other elements
    $("#anniversary-loader").show();
    $("#anniversary-container, #no-anniversaries").hide();
    
    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { 
            transaction: "employee work anniversaries",
            month: month 
        },
        success: function(response) {
            // Hide loader
            $("#anniversary-loader").hide();
            
            if (response && response.length > 0) {
                // Render anniversary cards
                renderAnniversaryCards(response);
                $("#anniversary-container").show();
            } else {
                // Show no anniversaries message
                $("#no-anniversaries").show();
            }
        },
        error: function(error) {
            console.error("Error fetching work anniversary data:", error);
            $("#anniversary-loader").hide();
            
            // Show error message
            $("#no-anniversaries").html(`
                <i class="fas fa-exclamation-triangle text-danger" style="font-size: 48px;"></i>
                <p class="mt-3">Failed to load work anniversary data. Please try again later.</p>
            `).show();
        }
    });
}

$(document).ready(function() {
    // Load birthdays, work anniversaries, and new employees for current month
    const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-based
    loadBirthdayData(currentMonth);
    loadWorkAnniversaries(currentMonth);
    loadNewEmployees(currentMonth);
    loadNewlyPermanentEmployees(currentMonth);
    

    
    // Handle month selection for birthdays
    $(".month-option").on("click", function(e) {
        e.preventDefault();
        const selectedMonth = $(this).data("month");
        $("#selected-month").text($(this).text());
        loadBirthdayData(selectedMonth);
    });
    
        // Handle month selection for newly permanent employees
    $(".permanent-employee-month-option").on("click", function(e) {
        e.preventDefault();
        const selectedMonth = $(this).data("month");
        $("#selected-permanent-employee-month").text($(this).text());
        loadNewlyPermanentEmployees(selectedMonth);
    });
    
    // Handle month selection for work anniversaries
    $(".anniversary-month-option").on("click", function(e) {
        e.preventDefault();
        const selectedMonth = $(this).data("month");
        $("#selected-anniversary-month").text($(this).text());
        loadWorkAnniversaries(selectedMonth);
    });
    
    // Handle month selection for new employees
    $(".new-employee-month-option").on("click", function(e) {
        e.preventDefault();
        const selectedMonth = $(this).data("month");
        $("#selected-new-employee-month").text($(this).text());
        loadNewEmployees(selectedMonth);
    });
});

/**
 * Get a random work anniversary message
 * @param {number} years - Number of years of service
 * @param {string} firstName - Employee's first name
 * @return {string} - A personalized anniversary message
 */
function getRandomAnniversaryMessage(years, firstName) {
    // First year anniversary messages
    const firstYearMessages = {
        formal: [
            `Congratulations on your first year with us, ${firstName}!`,
            `We appreciate your contributions during your first year, ${firstName}.`,
            `Thank you for a successful first year with our team, ${firstName}.`
        ],
        celebratory: [
            `One amazing year down, many more to go! Congratulations, ${firstName}!`,
            `Happy first work anniversary, ${firstName}! What a fantastic year it's been!`,
            `Time flies when you're awesome! Happy 1-year anniversary, ${firstName}!`
        ],
        teamFocused: [
            `${firstName}, your first year has made our team stronger!`,
            `We're so glad you joined our team one year ago, ${firstName}!`,
            `Our team is better because you joined us a year ago, ${firstName}!`
        ]
    };

    // Regular anniversary messages (2-4 years)
    const regularMessages = {
        formal: [
            `Congratulations on ${years} years of dedicated service, ${firstName}.`,
            `We value your ${years} years of commitment to excellence, ${firstName}.`,
            `Thank you for ${years} years of valuable contributions, ${firstName}.`
        ],
        celebratory: [
            `Happy ${years}-year anniversary, ${firstName}! Here's to many more!`,
            `${years} years of awesome work! You're incredible, ${firstName}!`,
            `Time flies! Celebrating your ${years} amazing years with us, ${firstName}!`
        ],
        teamFocused: [
            `${firstName}, for ${years} years you've made our team better every day!`,
            `${years} years of teamwork and success! Thank you, ${firstName}!`,
            `Our team has grown stronger with you for ${years} years, ${firstName}!`
        ]
    };

    // Milestone anniversary messages (5, 10, 15, 20+ years)
    const milestoneMessages = {
        formal: [
            `Congratulations on reaching the significant milestone of ${years} years, ${firstName}.`,
            `We deeply appreciate your ${years} years of dedicated service, ${firstName}.`,
            `${years} years represents an extraordinary commitment. Thank you, ${firstName}.`
        ],
        celebratory: [
            `${years} incredible years! What an amazing milestone, ${firstName}!`,
            `Happy ${years}-year anniversary, ${firstName}! This calls for a celebration!`,
            `${years} years of brilliance and counting! Congratulations, ${firstName}!`
        ],
        teamFocused: [
            `${firstName}, your ${years} years of leadership have shaped our success!`,
            `${years} years of teamwork, growth, and shared achievements! Thank you, ${firstName}!`,
            `Our team's foundation is stronger because of your ${years} years, ${firstName}!`
        ]
    };

    // Select message category based on years of service
    let messageCategory;
    if (years === 1) {
        messageCategory = firstYearMessages;
    } else if (years >= 5 && years % 5 === 0) {
        messageCategory = milestoneMessages;
    } else {
        messageCategory = regularMessages;
    }

    // Randomly select message style (formal, celebratory, or team-focused)
    const styles = Object.keys(messageCategory);
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
    
    // Randomly select a message from the chosen style category
    const messages = messageCategory[selectedStyle];
    return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Render work anniversary cards
 */
/**
 * Render work anniversary cards for employees
 */
function renderAnniversaryCards(employees) {
    const container = $("#anniversary-cards");
    container.empty();
    
    employees.forEach(function(employee) {
        // Format anniversary date
        const joinDate = new Date(employee.JOIN_DATE);
        const month = joinDate.toLocaleString('default', { month: 'long' });
        const day = joinDate.getDate();
        const formattedDate = `${month} ${day}`;
        
        // Default image if profile image is not available
        const profileImage = employee.PROFILE_IMAGE ? 
            employee.PROFILE_IMAGE : 
            'assets/images/default-avatar.png';
        
        // Get years of service
        const yearsOfService = parseInt(employee.years_of_service);
        
        // Get personalized anniversary message
        const anniversaryMessage = getRandomAnniversaryMessage(yearsOfService, employee.FIRST_NAME);
        
        // Create card HTML with anniversary badge
        const card = `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 anniversary-card">
                    <div class="card-body text-center position-relative">
                        <span class="badge bg-success position-absolute top-0 end-0 mt-2 me-2">
                            ${employee.anniversary_day}
                        </span>
                        <div class="mt-3 mb-3">
                            <img src="${profileImage}" class="rounded-circle img-thumbnail" 
                                alt="${employee.FIRST_NAME}" style="width: 80px; height: 80px; object-fit: cover;">
                        </div>
                        <h5 class="card-title">${employee.FIRST_NAME} ${employee.LAST_NAME}</h5>
                        <p class="card-text">
                            <i class="fas fa-award text-success me-2"></i>
                            ${yearsOfService} ${yearsOfService === 1 ? 'Year' : 'Years'} of Service
                        </p>
                        <p class="card-text small text-muted">
                            Joined on ${formattedDate}
                        </p>
                        <p class="card-text text-success">
                            ${anniversaryMessage}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.append(card);
    });
}


/**
 * Load new employees for the specified month
 */
function loadNewEmployees(month = null) {
    // Show loader, hide other elements
    $("#new-employee-loader").show();
    $("#new-employee-container, #no-new-employees").hide();
    
    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { 
            transaction: "new employees",
            month: month 
        },
        success: function(response) {
            // Hide loader
            $("#new-employee-loader").hide();
            
            if (response && response.length > 0) {
                // Render new employee cards
                renderNewEmployeeCards(response);
                $("#new-employee-container").show();
            } else {
                // Show no new employees message
                $("#no-new-employees").show();
            }
        },
        error: function(error) {
            console.error("Error fetching new employee data:", error);
            $("#new-employee-loader").hide();
            
            // Show error message
            $("#no-new-employees").html(`
                <i class="fas fa-exclamation-triangle text-danger" style="font-size: 48px;"></i>
                <p class="mt-3">Failed to load new employee data. Please try again later.</p>
            `).show();
        }
    });
}

/**
 * Get a random welcome message
 */
function getRandomWelcomeMessage() {
    const welcomeMessages = [
        "Welcome to the team!",
        "Excited to have you onboard!",
        "A warm welcome to our newest team member!",
        "Delighted to have you join us!",
        "Welcome aboard!",
        "We're thrilled to have you with us!",
        "A big welcome to our growing family!",
        "So happy you've joined our team!"
    ];
    
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

/**
 * Render new employee cards
 */
function renderNewEmployeeCards(employees) {
    const container = $("#new-employee-cards");
    container.empty();
    
    employees.forEach(function(employee) {
        // For debugging - check what's coming from the server
        console.log("Employee data:", employee);
        
        // Format join date
        const joinDate = new Date(employee.JOIN_DATE);
        const month = joinDate.toLocaleString('default', { month: 'long' });
        const day = joinDate.getDate();
        const formattedDate = `${month} ${day}`;
        
        // Default image if profile image is not available
        const profileImage = employee.PROFILE_IMAGE ? 
            employee.PROFILE_IMAGE : 
            'assets/images/default-avatar.png';
        
        // Get branch name
        const branchName = employee.BRANCH_NAME || 'Not Assigned';
        
        // Get designation name - use DESIGNATION_NAME instead of DESIGNATION
        const designationName = employee.DESIGNATION_NAME || 'Not Assigned';
        
        // Get random welcome message
        const welcomeMessage = getRandomWelcomeMessage();
        
        // Create card HTML
        const card = `
            <div class="col-md-6 col-lg-5 mb-4">
                <div class="card h-100 new-employee-card">
                    <div class="card-body text-center position-relative">
                        <span class="badge bg-info position-absolute top-0 end-0 mt-2 me-2">
                            New
                        </span>
                        <div class="mt-3 mb-3">
                            <img src="${profileImage}" class="rounded-circle img-thumbnail" 
                                alt="${employee.FIRST_NAME}" style="width: 80px; height: 80px; object-fit: cover;">
                        </div>
                        <h5 class="card-title">${employee.FIRST_NAME} ${employee.LAST_NAME}</h5>
                        <p class="card-text">
                            <i class="fas fa-briefcase me-2"></i>
                            ${designationName}
                        </p>
                        <p class="card-text">
                            <i class="fas fa-building me-2"></i>
                            ${branchName}
                        </p>
                        <p class="card-text text-muted">
                            Joined on ${formattedDate}
                        </p>
                        <p class="card-text text-muted mt-2">
                            ${welcomeMessage}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.append(card);
    });
}


function loadNewlyPermanentEmployees(month = null) {
    // Show loader, hide other elements
    $("#permanent-employee-loader").show();
    $("#permanent-employee-container, #no-permanent-employees").hide();
    
    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { 
            transaction: "newly permanent employees",
            month: month 
        },
        success: function(response) {
            // Hide loader
            $("#permanent-employee-loader").hide();
            
            if (response && response.length > 0) {
                // Render newly permanent employee cards
                renderPermanentEmployeeCards(response);
                $("#permanent-employee-container").show();
            } else {
                // Show no newly permanent employees message
                $("#no-permanent-employees").show();
            }
        },
        error: function(error) {
            console.error("Error fetching newly permanent employee data:", error);
            $("#permanent-employee-loader").hide();
            
            // Show error message
            $("#no-permanent-employees").html(`
                <i class="fas fa-exclamation-triangle text-danger" style="font-size: 58px;"></i>
                <p class="mt-3">Failed to load newly permanent employee data. Please try again later.</p>
            `).show();
        }
    });
}

/**
 * Get a random congratulatory message for permanent employees
 */
function getRandomCongratulationMessage() {
    const messages = [
        "Congratulations on your permanent position!",
        "Well deserved permanent status!",
        "Officially part of the family now!",
        "Congratulations on this career milestone!",
        "Your hard work has paid off!",
        "Welcome to the permanent team!",
        "Thrilled to have you as a permanent member!",
        "Congratulations on your permanency!"
    ];
    
    return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Format days to a readable duration
 */
function formatDuration(days) {
    if (days < 30) {
        return days + (days === 1 ? " day" : " days");
    } else if (days < 365) {
        const months = Math.floor(days / 30);
        return months + (months === 1 ? " month" : " months");
    } else {
        const years = Math.floor(days / 365);
        const remainingMonths = Math.floor((days % 365) / 30);
        
        if (remainingMonths === 0) {
            return years + (years === 1 ? " year" : " years");
        } else {
            return years + (years === 1 ? " year" : " years") + " and " + 
                   remainingMonths + (remainingMonths === 1 ? " month" : " months");
        }
    }
}

/**
 * Render newly permanent employee cards
 */
function renderPermanentEmployeeCards(employees) {
    const container = $("#permanent-employee-cards");
    container.empty();
    
    employees.forEach(function(employee) {
        // Format permanent date
        const permanentDate = new Date(employee.PERMANENT_DATE);
        const month = permanentDate.toLocaleString('default', { month: 'long' });
        const day = permanentDate.getDate();
        const formattedDate = `${month} ${day}`;
        
        // Default image if profile image is not available
        const profileImage = employee.PROFILE_IMAGE ? 
            employee.PROFILE_IMAGE : 
            'assets/images/default-avatar.png';
        
        // Get branch and designation names
        const branchName = employee.BRANCH_NAME || 'Not Assigned';
        const designationName = employee.DESIGNATION_NAME || 'Not Assigned';
        
        // Get duration from join date to permanent date
        const durationText = formatDuration(employee.days_to_permanent);
        
        // Get random congratulation message
        const congratsMessage = getRandomCongratulationMessage();
        
        // Create card HTML
        const card = `
            <div class="col-md-6 col-lg-5 mb-4">
                <div class="card h-100 permanent-employee-card">
                    <div class="card-body text-center position-relative">
                        <span class="badge bg-success position-absolute top-0 end-0 mt-2 me-2">
                            Permanent
                        </span>
                        <div class="mt-3 mb-3">
                            <img src="${profileImage}" class="rounded-circle img-thumbnail" 
                                alt="${employee.FIRST_NAME}" style="width: 80px; height: 80px; object-fit: cover;">
                        </div>
                        <h5 class="card-title">${employee.FIRST_NAME} ${employee.LAST_NAME}</h5>
                        <p class="card-text">
                            <i class="fas fa-briefcase me-2"></i>
                            ${designationName}
                        </p>
                        <p class="card-text">
                            <i class="fas fa-building me-2"></i>
                            ${branchName}
                        </p>
                        <p class="card-text text-muted">
                            <i class="fas fa-certificate me-2 text-success"></i>
                            Permanent since ${formattedDate}
                        </p>
                        <p class="card-text text-muted">
                            <i class="fas fa-clock me-2"></i>
                            ${durationText} to permanent status
                        </p>
                        <p class="card-text text-success mt-2">
                            ${congratsMessage}
                        </p>
                    </div>
                </div>
            </div>
        `;
        
        container.append(card);
    });
}



// If formatDate function doesn't exist yet, add it
if (typeof formatDate !== 'function') {
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

