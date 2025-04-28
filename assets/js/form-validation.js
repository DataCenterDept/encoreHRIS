$(function() {
    'use strict';
    var username = $('#username').text();

    var transaction;

    if($('#signinForm').length){
        get_location('');
        $('#signinForm').validate({
        submitHandler: function (form) {
            transaction = 'authenticate';

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: $(form).serialize() + '&transaction=' + transaction,
                beforeSend: function(){
                    document.getElementById('signin').disabled = true;
                    $('#signin').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div>');
                },
                success: function (response) {
                    document.getElementById('signin').disabled = false;
                    $('#signin').html('Submit');

                    if(response === 'Authenticated'){
                        var username = $('#username').val();
                        sessionStorage.setItem('username', username);

                        window.location = 'dashboard.php';
                    }
                    else if(response === 'Incorrect'){
                        show_alert('Authentication Error', 'Your username or password is incorrect.', 'error');
                    }
                    else if(response === 'Locked'){
                        show_alert('Authentication Error', 'Your user account is locked. Please contact your administrator.', 'error');
                    }
                    else if(response === 'Inactive'){
                        show_alert('Authentication Error', 'Your user account is inactive. Please contact your administrator.', 'error');
                    }
                    else if(response === 'Password Expired'){
                        show_alert_confirmation('User Account Password Expired', 'Your user account password has expired. Do you want to update your password?', 'info', 'Update Password', 'primary', 'expired password');
                    }
                    else{
                        show_alert('Authentication Error', response, 'error');
                    }
                }
            });
            return false;
        },
        rules: {
            username: {
            required: true         
            },
            password: {
            required: true
            },
        },
        messages: {
            username: {
            required: 'Please enter your username',
            },
            password: {
            required: 'Please enter your password',
            },
        },
        errorPlacement: function(label, element) {
            if(element.hasClass('web-select2') && element.next('.select2-container').length) {
                label.insertAfter(element.next('.input-group'));
            }
            else if(element.parent('.input-group').length){
                label.insertAfter(element.parent());
            }
            else{
                label.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass('has-danger');
            $(element).addClass('form-control-danger');
        },
        success: function(label,element) {
            $(element).parent().removeClass('has-danger')
            $(element).removeClass('form-control-danger')
            label.remove();
        }
        });
    }

    if($('#lockscreenForm').length){
        $('#lockscreenForm').validate({
        submitHandler: function (form) {
            transaction = 'unlock screen';

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: $(form).serialize() + '&transaction=' + transaction,
                beforeSend: function(){
                    document.getElementById('signin').disabled = true;
                    $('#signin').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div>');
                },
                success: function (response) {
                    document.getElementById('signin').disabled = false;
                    $('#signin').html('Unlock');

                    if(response === 'Authenticated'){
                        var username = $('#username').val();
                        sessionStorage.setItem('username', username);
                        
                        window.history.go(-1);
                    }
                    else if(response === 'Incorrect'){
                        show_alert('Unlock Screen Error', 'Your username or password is incorrect.', 'error');
                    }
                    else if(response === 'Locked'){
                        show_alert('Unlock Screen Error', 'Your user account is locked. Please contact your administrator.', 'error');
                    }
                    else if(response === 'Inactive'){
                        show_alert('Unlock Screen Error', 'Your user account is inactive. Please contact your administrator.', 'error');
                    }
                    else if(response === 'Password Expired'){
                        show_alert_confirmation('User Account Password Expired', 'Your user account password has expired. Do you want to update your password?', 'info', 'Update Password', 'primary', 'expired password');
                    }
                    else{
                        show_alert('Unlock Screen Error', response, 'error');
                    }
                }
            });
            return false;
        },
        rules: {
            username: {
            required: true         
            },
            password: {
            required: true
            },
        },
        messages: {
            username: {
            required: 'Please enter your username',
            },
            password: {
            required: 'Please enter your password',
            },
        },
        errorPlacement: function(label, element) {
            if(element.hasClass('web-select2') && element.next('.select2-container').length) {
                label.insertAfter(element.next('.input-group'));
            }
            else if(element.parent('.input-group').length){
                label.insertAfter(element.parent());
            }
            else{
                label.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass('has-danger');
            $(element).addClass('form-control-danger');
        },
        success: function(label,element) {
            $(element).parent().removeClass('has-danger')
            $(element).removeClass('form-control-danger')
            label.remove();
        }
        });
    }

    if($('#companysettingsForm').length){
        initialize_elements();
        display_form_details('company settings form');
        var username = $('#username').text();

        $('#companysettingsForm').validate({
            submitHandler: function (form) {
                transaction = 'submit company settings';
                var workingdays = $('#workingdays').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&workingdays=' + workingdays,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Company Settings Update Success', 'The company settings has been updated.', 'success', 'reload');
                        }
                        else{
                            show_alert('Company Settings Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                companyname: {
                    required: true         
                },
                email: {
                    required: true
                },
                telephone: {
                    required: true,
                    checkwholenumber: true
                },
                phone: {
                    required: true,
                    checkwholenumber: true
                },
                starttime: {
                    required: true
                },
                endtime: {
                    required: true
                },
                halfday: {
                    required: true
                },
                late: {
                    required: true
                },
                workingdays: {
                    required: true
                },
                address: {
                    required: true
                },
                lunchstarttime: {
                    required: true
                },
                lunchendtime: {
                    required: true
                },
                workingdayspermonth: {
                    required: true
                },
                maxclockin: {
                    required: true
                },
            },
            messages: {
                companyname: {
                    required: 'Please enter the company name',
                },
                email: {
                    required: 'Please enter the company email',
                },
                telephone: {
                    required: 'Please enter the telephone',
                },
                starttime: {
                    required: 'Please enter the office start time',
                },
                endtime: {
                    required: 'Please enter the office end time',
                },
                halfday: {
                    required: 'Please enter the half-day mark',
                },
                late: {
                    required: 'Please enter the late mark after',
                },
                workingdays: {
                    required: 'Please choose the working days',
                },
                phone: {
                    required: 'Please enter the phone number',
                },
                address: {
                    required: 'Please enter the company address',
                },
                lunchstarttime: {
                    required: 'Please enter the lunch start time',
                },
                lunchendtime: {
                    required: 'Please enter the lunch end time',
                },
                workingdayspermonth: {
                    required: 'Please enter the working days per month',
                },
                maxclockin: {
                    required: 'Please enter the maximum clock-in per day',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    if($('#profileForm').length){
        initialize_elements();
        display_form_details('profile form');
        var username = $('#username').text();

        $('#profileForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit profile';
                document.getElementById('suffix').disabled = false;
                document.getElementById('gender').disabled = false;
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Profile Update Success', 'Your profile has been updated.', 'success', 'reload');
                        }
                        else if(response === 'File Size'){
                            show_alert('Profile Update Error', 'The profile image should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Profile Update Error', 'The profile image should only be JPEG or PNG.', 'error');
                        }
                        else{
                            show_alert('Profile Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                password: {
                    passwordstrength: true
                }
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            } 
        });
    }
    
    
    
    if($('#salesPartnerBookingForm').length){
        initialize_elements();
        display_form_details('sales partner booking form');
        var username = $('#username').text();

        $('#salesPartnerBookingForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit sales partner booking';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Sales Partner Booking Update Success', 'Your sales partner booking has been updated.', 'success', 'reload');
                        }
                        // else if(response === 'File Size'){
                        //     show_alert('Sales Partner Booking Update Error', 'The sales partner booking file should not exceed 2mb.', 'error');
                        // }
                        else if(response === 'File Type'){
                            show_alert('Sales Partner Booking Update Error', 'The sales partner booking file should only be CSV.', 'error');
                        }
                        else{
                            show_alert('Sales Partner Booking Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            // rules: {
            //     password: {
            //         passwordstrength: true
            //     }
            // },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            } 
        });
    }


    if($('#positionMonthlyQuotaHistoryForm').length){
        initialize_elements();
        display_form_details('position monthly quota history form');
        var username = $('#username').text();

        $('#positionMonthlyQuotaHistoryForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit position monthly quota history';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Position Monthly Quota History Update Success', 'Your position monthly quota history has been updated.', 'success', 'reload');
                        }
                        // else if(response === 'File Size'){
                        //     show_alert('Position Monthly Quota History Update Error', 'The position monthly quota history file should not exceed 2mb.', 'error');
                        // }
                        else if(response === 'File Type'){
                            show_alert('Position Monthly Quota History Update Error', 'The position monthly quota history file should only be CSV.', 'error');
                        }
                        else{
                            show_alert('Position Monthly Quota History Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            // rules: {
            //     password: {
            //         passwordstrength: true
            //     }
            // },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            } 
        });
    }


    if($('#branchMonthlyQuotaHistoryForm').length){
        initialize_elements();
        display_form_details('branch monthly quota history form');
        var username = $('#username').text();

        $('#branchMonthlyQuotaHistoryForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit branch monthly quota history';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Branch Monthly Quota History Update Success', 'Your branch monthly quota history has been updated.', 'success', 'reload');
                        }
                        else{
                            show_alert('Branch Monthly Quota History Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            // rules: {
            //     password: {
            //         passwordstrength: true
            //     }
            // },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            } 
        });
    }


    if($('#positionMonthlyQuotaForm').length){
        initialize_elements();
        display_form_details('position monthly quota form');
        var username = $('#username').text();

        $('#positionMonthlyQuotaForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit position monthly quota';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Position Monthly Quota Update Success', 'Your position monthly quota has been updated.', 'success', 'reload');
                        }
                        // else if(response === 'File Size'){
                        //     show_alert('Position Monthly Quota Update Error', 'The position monthly quota file should not exceed 2mb.', 'error');
                        // }
                        else if(response === 'File Type'){
                            show_alert('Position Monthly Quota Update Error', 'The position monthly quota file should only be CSV.', 'error');
                        }
                        else{
                            show_alert('Position Monthly Quota Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            // rules: {
            //     password: {
            //         passwordstrength: true
            //     }
            // },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            } 
        });
    }

    if($('#applicationsettingsForm').length){
        initialize_elements();
        display_form_details('application settings form');
        var username = $('#username').text();

        $('#applicationsettingsForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit application settings';
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Application Settings Update Success', 'Your application settings has been updated.', 'success', 'reload');
                        }
                        else if(response === 'File Size'){
                            show_alert('Application Settings Update Error', 'The image should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Application Settings Update Error', 'The image should only be JPEG or PNG.', 'error');
                        }
                        else{
                            show_alert('Application Settings Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                currency: {
                    required: true
                },
                timezone: {
                    required: true
                },
                dateformat: {
                    required: true
                },
                timeformat: {
                    required: true
                },
            },
            messages: {
                currency: {
                    required: 'Please choose the default currency',
                },
                timezone: {
                    required: 'Please choose the default timezone',
                },
                dateformat: {
                    required: 'Please choose the date format',
                },
                timeformat: {
                    required: 'Please choose the time format',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    if($('#emailconfigurationForm').length){
        initialize_elements();
        display_form_details('email configuration form');
        var username = $('#username').text();

        $('#emailconfigurationForm').validate({
            submitHandler: function (form) {
                transaction = 'submit email configuration';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Email Configuration Update Success', 'The email configuration has been updated.', 'success', 'reload');
                        }
                        else{
                            show_alert('Email Configuration Update Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                mailhost: {
                    required: true
                },
                port: {
                    required: true
                },
                mailuser: {
                    required: true
                },
                mailpassword: {
                    required: true
                },
                mailencryption: {
                    required: true
                },
                mailfromname: {
                    required: true
                },
                mailfromemail: {
                    required: true
                },
            },
            messages: {
                mailhost: {
                    required: 'Please enter the mail host',
                },
                port: {
                    required: 'Please enter the port',
                },
                mailuser: {
                    required: 'Please enter the mail user',
                },
                mailpassword: {
                    required: 'Please enter the mail password',
                },
                mailencryption: {
                    required: 'Please choose the mail encryption',
                },
                mailfromname: {
                    required: 'Please enter the mail from name',
                },
                mailfromemail: {
                    required: 'Please enter the mail from email',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    if($('#documentmanagementsettingForm').length){
        initialize_elements();
        display_form_details('document management setting form');
        var username = $('#username').text();

        $('#documentmanagementsettingForm').validate({
            submitHandler: function (form) {
                transaction = 'submit document management setting';
                var filetype = $('#filetype').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&filetype=' + filetype,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert_event('Update Document Management Setting Success', 'The document management setting has been updated.', 'success', 'reload');
                        }
                        else{
                            show_alert('Document Management Setting Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                maxfilesize: {
                    required: true
                },
                filetype: {
                    required: true
                },
            },
            messages: {
                maxfilesize: {
                    required: 'Please enter the max document file size',
                },
                filetype: {
                    required: 'Please choose the allowed file type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    if($('#ticket-notes').length) {
        var ticketid = $('#ticket-id').text();

        generate_ticket_notes(ticketid);
    }

    if($('#meeting-notes').length) {
        var meetingid = $('#meeting-id').text();

        generate_meeting_notes(meetingid);
    }

    if($('#paymentduecalculatorForm').length){
        initialize_elements();
        var username = $('#username').text();

        $('#paymentduecalculatorForm').validate({
            submitHandler: function (form) {
                transaction = 'calculate payment due calculator';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    dataType: 'JSON',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response[0].RESPONSE === 'Calculated'){
                            show_alert('Payment Due Calculation Success', 'The payment due has been calculated.', 'success');
                            $('#total_penalty').val(response[0].PENALTY);
                            $('#total_charges').val(response[0].CHARGES);
                            $('#total_due').val(response[0].DUES);
                        }
                        else{
                            show_alert('Payment Due Calculation Error', response[0].RESPONSE, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                payment_date: {
                    required: true         
                },
            },
            messages: {
                payment_date: {
                    required: 'Please choose the payment date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    if($('#ratecalculatorForm').length){
        initialize_elements();
        var username = $('#username').text();

        $('#ratecalculatorForm').validate({
            submitHandler: function (form) {
                transaction = 'calculate rate';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    dataType: 'JSON',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response[0].RESPONSE === 'Calculated'){
                            show_alert('Rate Calculation Success', 'The rate has been calculated.', 'success');
                            $('#irr').val(response[0].IRR);
                            $('#cr').val(response[0].CR);
                        }
                        else{
                            show_alert('Rate Calculation Error', response[0].RESPONSE, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                amtfin: {
                    required: true         
                },
                repayment_amount: {
                    required: true         
                },
                term: {
                    required: true         
                },
                frequency: {
                    required: true         
                },
            },
            messages: {
                amtfin: {
                    required: 'Please enter the amount financed',
                },
                repayment_amount: {
                    required: 'Please enter the repayment amount',
                },
                term: {
                    required: 'Please enter the term',
                },
                frequency: {
                    required: 'Please choose the frequency of payment',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }

    clear_filter();

    setInterval(function(){ 
        get_notification_count();
    }, 60000);
});

// Check option exist
function check_option_exist(element, option, returnval){
  if ($(element).find('option[value="' + option + '"]').length) {
      $(element).val(option).trigger('change');
  }
  else{
      $(element).val(returnval).trigger('change');
  }
}

// Reset validation for single element
function reset_element_validation(element){
  $(element).parent().removeClass('has-danger');
  $(element).removeClass('form-control-danger');
  $(element + '-error').remove();
}

function initialize_form_validation(formtype){
    var transaction;
    var username = $('#username').text();

    if(formtype == 'change password form'){
        transaction = 'change password';
        
        $('#changepasswordForm').validate({
            submitHandler: function (form) {
                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize()+ '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Change User Account Password Success', 'The user account password has been updated. You can now sign in your account.', 'success');
                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Change User Account Password Error', 'The user account does not exist.', 'error');
                        }
                        else{
                            show_alert('Change User Account Password Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                change_username: {
                    required: true         
                },
                change_password: {
                    required: true,
                    passwordstrength : true
                },
            },
            messages: {
                change_username: {
                    required: 'Please enter your username',
                },
                change_password: {
                    required: 'Please enter your password',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'role form'){
        $('#roleForm').validate({
            submitHandler: function (form) {
                transaction = 'submit role';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Role Success', 'The role has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Role Success', 'The role has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('roles table', '#roles-datatable', 0, 'asc', [2]);
                        }
                        else{
                            show_alert('Role Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                roledesc: {
                    required: true         
                }
            },
            messages: {
                roledesc: {
                    required: 'Please enter the role description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'permission role form'){
        $('#permissionroleForm').validate({
            submitHandler: function (form) {
                transaction = 'submit role permission';
                var roleid = sessionStorage.getItem('roleid');
                var permission = [];
        
                $('.role-permissions').each(function(){
                    if($(this).is(':checked')){  
                        permission.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&roleid=' + roleid + '&permission=' + permission,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert_event('Assign Role Permission Success', 'The permission has been assigned to the role.', 'success', 'reload');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Role Permission Error', 'The role does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Role Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'user role form'){
        $('#userroleForm').validate({
            submitHandler: function (form) {
                transaction = 'submit role user';
                var roleid = sessionStorage.getItem('roleid');
                var user = [];
        
                $('.role-user').each(function(){
                    if($(this).is(':checked')){  
                        user.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&roleid=' + roleid + '&user=' + user,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert_event('Assign Role User Success', 'The user has been assigned to the role.', 'success', 'reload');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Role User Error', 'The role does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Role User Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'page form'){
        $('#pageForm').validate({
            submitHandler: function (form) {
                transaction = 'submit page';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Page Success', 'The page has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Page Success', 'The page has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('page table', '#page-datatable', 0, 'asc', [1]);
                            generate_datatable('permission table', '#permission-datatable', 0, 'asc', [3]);
                        }
                        else{
                            show_alert('Page Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                pagename: {
                    required: true         
                }
            },
            messages: {
                pagename: {
                    required: 'Please enter the page name',
                }
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'permission form'){
        $('#permissionForm').validate({
            submitHandler: function (form) {
                transaction = 'submit permission';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Permission Success', 'The permission has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Permission Success', 'The permission has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('permission table', '#permission-datatable', 0, 'asc', [3]);
                        }
                        else{
                            show_alert('Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                permissiondesc: {
                    required: true         
                },
                pageid: {
                    required: true         
                }
            },
            messages: {
                permissiondesc: {
                    required: 'Please enter the permission',
                },
                pageid: {
                    required: 'Please choose the page',
                }
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'system parameter form'){
        $('#systemparameterForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit system parameter';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert System Parameter Success', 'The system parameter has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update System Parameter Success', 'The system parameter has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('system parameter table', '#system-parameter-datatable', 0, 'asc', [3]);
                        }
                        else{
                            show_alert('System Parameter Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                description: {
                    required: true         
                },
            },
            messages: {
                description: {
                    required: 'Please enter the parameter description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'system code form'){
        $('#systemcodeForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit system code';

                document.getElementById('systemtype').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert System Code Success', 'The system code has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update System Code Success', 'The system code has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('system code table', '#system-code-datatable', 0, 'asc', [3]);
                        }
                        else{
                            show_alert('System Code Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                systemtype: {
                    required: true         
                },
                systemcode: {
                    required: true         
                },
                systemdesc: {
                    required: true         
                }
            },
            messages: {
                systemtype: {
                    required: 'Please choose the system type',
                },
                systemcode: {
                    required: 'Please enter the system code',
                },
                systemdesc: {
                    required: 'Please enter the system description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'employee form'){
        $('#employeeForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit employee';
                var subordinate = $('#subordinate').val();
                var authorizer = $('#authorizer').val();

                document.getElementById('subordinate').disabled = false;
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);
                formData.append('subordinate', subordinate);
                formData.append('authorizer', authorizer);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if($('#employee-list-datatable').length){
                                generate_datatable_two_parameter('employee list table', '', '', '#employee-list-datatable', 0, 'asc', [6]);

                                if(response === 'Inserted'){
                                    show_alert('Insert Employee Success', 'The employee has been inserted.', 'success');
                                }
                                else{
                                    show_alert('Update Employee Success', 'The employee has been updated.', 'success');
                                }
                            }
                            else{
                                show_alert_event('Update Employee Success', 'The employee has been updated.', 'success', 'reload');
                            }

                            $('#filter-text').text('');
                            $('#System-Modal').modal('hide');                            
                        }
                        else if(response === 'ID Number'){
                            show_alert('Employee Error', 'The id number already exists.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Employee Error', 'The profile image should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Employee Error', 'The profile image should only be JPEG or PNG.', 'error');
                        }
                        else{
                            show_alert('Employee Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                idnumber: {
                    required: true
                },
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
                department: {
                    required: true
                },
                designation: {
                    required: true
                },
                joindate: {
                    required: true
                },
                exitdate: {
                    required:  function(element){
                        var employment_status = $('#employmentstatus').val();

                        if(employment_status == '0'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                permanentdate: {
                    required:  function(element){
                        var employmenttp = $('#employmenttp').val();

                        if(employmenttp == 'PERMANENT'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                employmenttp: {
                    required: true
                },
                employmentstatus: {
                    required: true
                },
                branch: {
                    required: true
                },
                payrollperiod: {
                    required: true
                },
                basicpay: {
                    required: true
                },
                birthday: {
                    legalage : 18,
                    required: true
                },
                accountname: {
                    required: true
                },
                accountnumber: {
                    required: true
                },
                gender: {
                    required: true
                },
                civil_status: {
                    required: true
                },
                email: {
                    required: true
                },
                address: {
                    required: true
                },
            },
            messages: {
                idnumber: {
                    required: 'Please enter the id number',
                },
                firstname: {
                    required: 'Please enter the first name',
                },
                lastname: {
                    required: 'Please enter the last name',
                },
                department: {
                    required: 'Please choose the department',
                },
                designation: {
                    required: 'Please choose the designation',
                },
                joindate: {
                    required: 'Please enter the join date',
                },
                exitdate: {
                    required: 'Please enter the exit date',
                },
                permanentdate: {
                    required: 'Please enter the permanency date',
                },
                employmenttp: {
                    required: 'Please choose the employment type',
                },
                employmentstatus: {
                    required: 'Please choose the employment status',
                },
                branch: {
                    required: 'Please choose the branch',
                },
                payrollperiod: {
                    required: 'Please choose the payroll period',
                },
                basicpay: {
                    required: 'Please enter the basic pay',
                },
                birthday: {
                    required: 'Please enter the birthday',
                },
                accountname: {
                    required: 'Please enter the account name',
                },
                accountnumber: {
                    required: 'Please enter the account number',
                },
                gender: {
                    required: 'Please choose the gender',
                },
                civil_status: {
                    required: 'Please choose the civil status',
                },
                email: {
                    required: 'Please enter the email',
                },
                address: {
                    required: 'Please enter the address',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter employee form'){
        $('#filteremployeeForm').validate({
            submitHandler: function (form) {
                var employeefilterby = $('#employeefilterby').val();
                var employeefiltervalue = $('#employeefiltervalue').val();
                var data = $('#employeefilterby').select2('data');
                var data2 = $('#employeefiltervalue').select2('data');

                sessionStorage.setItem('filter1', employeefilterby);
                sessionStorage.setItem('filter2', employeefiltervalue);

                $('#filter-text').text('Filtered employees by ' + data[0].text + ' (' + data2[0].text + ')');

                generate_datatable_two_parameter('employee list table', employeefilterby, employeefiltervalue, '#employee-list-datatable', 0, 'asc', [6]);

                show_alert('Filter Employee', 'The documents have been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                employeefilterby: {
                    required: true
                },
                employeefiltervalue: {
                    required: true
                },
            },
            messages: {
                employeefilterby: {
                    required: 'Please choose the filter by',
                },
                employeefiltervalue: {
                    required: 'Please choose the filter value',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'department form'){
        $('#departmentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit department';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Department Success', 'The department has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Department Success', 'The department has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('department table', '#department-datatable', 0, 'desc', [1]);
                        }
                        else{
                            show_alert('Department Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                department: {
                    required: true         
                }
            },
            messages: {
                department: {
                    required: 'Please enter the department',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'designation form'){
        $('#designationForm').validate({
            submitHandler: function (form) {
                transaction = 'submit designation';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Designation Success', 'The designation has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Designation Success', 'The designation has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('designation table', '#designation-datatable', 0, 'desc', [1]);
                        }
                        else{
                            show_alert('Designation Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                designation: {
                    required: true         
                }
            },
            messages: {
                designation: {
                    required: 'Please enter the designation',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'branch form'){
        $('#branchForm').validate({
            submitHandler: function (form) {
                transaction = 'submit branch';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Branch Success', 'The branch has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Branch Success', 'The branch has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('branch table', '#branch-datatable', 0, 'desc', [1]);
                        }
                        else{
                            show_alert('Branch Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                branch: {
                    required: true         
                },
                address: {
                    required: true         
                },
                telephone: {
                    checkwholenumber: true
                },
                phone: {
                    checkwholenumber: true
                },
            },
            messages: {
                branch: {
                    required: 'Please enter the branch',
                },
                address: {
                    required: 'Please enter the address',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'holiday form'){
        $('#holidayForm').validate({
            submitHandler: function (form) {
                transaction = 'submit holiday';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Holiday Success', 'The holiday has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Holiday Success', 'The holiday has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('holiday table', '#holiday-datatable', 0, 'desc', [3]);
                        }
                        else{
                            show_alert('Holiday Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                holiday: {
                    required: true
                },
                holidaydate: {
                    required: true
                },
                holidaytype: {
                    required: true
                },
            },
            messages: {
                holiday: {
                    required: 'Please enter the holiday',
                },
                holidaydate: {
                    required: 'Please enter the holiday date',
                },
                holidaytype: {
                    required: 'Please choose the holiday type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'leave type form'){
        $('#leavetypeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit leave type';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Leave Type Success', 'The leave type has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Leave Type Success', 'The leave type has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('leave type table', '#leave-type-datatable', 0, 'desc', [3]);
                        }
                        else{
                            show_alert('Leave Type Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                leave: {
                    required: true
                },
                noleaves: {
                    required: true
                },
                paidstatus: {
                    required: true
                },
            },
            messages: {
                leave: {
                    required: 'Please enter the leave',
                },
                noleaves: {
                    required: 'Please enter the number of leaves',
                },
                paidstatus: {
                    required: 'Please choose the paid status',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'leave entitlement form'){
        $('#leaveentitlementForm').validate({
            submitHandler: function (form) {
                transaction = 'submit leave entitlement';
                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                document.getElementById('leavetype').disabled = false;
                document.getElementById('startdate').disabled = false;
                document.getElementById('enddate').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&employeeid=' + employee_profile_employee_id + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Leave Entitlement Success', 'The leave entitlement has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Leave Entitlement Success', 'The leave entitlement has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('employee leave entitlement table', employee_profile_employee_id, '#employee-leave-entitlement-datatable', 0, 'desc', [3]);
                        }
                        else if(response == 'Overlap'){
                            show_alert('Leave Entitlement Error', 'The leave entitlement overlaps with existing entitlement.', 'error');
                        }
                        else{
                            show_alert('Leave Entitlement Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                leavetype: {
                    required: true
                },
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                leavetype: {
                    required: 'Please choose the leave type',
                },
                startdate: {
                    required: 'Please choose the coverage start date',
                },
                enddate: {
                    required: 'Please choose the coverage end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'employee leave form'){
        $('#employeeleaveForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee leave';
                var employee_profile_employee_id = $('#employee-profile-employee-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&employeeid=' + employee_profile_employee_id + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            show_alert_event('Insert Employee Leave Success', 'The employee leave has been inserted.', 'success', 'reload');
                        }
                        else if(response === 'Leave Entitlement'){
                            show_alert_event('Employee Leave Error', 'The leave entitlement was consumed.', 'error', 'reload');
                        }
                        else{
                            show_alert('Employee Leave Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                employeeleavetype: {
                    required: true
                },
                leavestatus: {
                    required: true
                },
                leaveduration: {
                    required: true
                },
                leavedate: {
                    required: true
                },
                reason: {
                    required: true
                },
                starttime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                endtime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                employeeleavetype: {
                    required: 'Please choose the leave type',
                },
                leavestatus: {
                    required: 'Please choose the leave status',
                },
                leaveduration: {
                    required: 'Please choose the leave duration',
                },
                leavedate: {
                    required: 'Please choose the leave date',
                },
                starttime: {
                    required: 'Please choose the leave start time',
                },
                endtime: {
                    required: 'Please choose the leave end time',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update employee leave form'){
        $('#updateemployeeleaveForm').validate({
            submitHandler: function (form) {
                transaction = 'update employee leave';
                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                document.getElementById('rejectionreason').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&employeeid=' + employee_profile_employee_id + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            $('#System-Modal').modal('hide');

                            show_alert_event('Update Employee Leave Success', 'The employee leave has been updated.', 'success', 'reload');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Employee Leave Error', 'The employee leave does not exist.', 'info');
                        }
                        else{
                            show_alert('Employee Leave Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                employeeleavetype: {
                    required: true
                },
                leavedate: {
                    required: true
                },
                reason: {
                    required: true
                },
                starttime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                endtime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                employeeleavetype: {
                    required: 'Please choose the leave type',
                },
                leavedate: {
                    required: 'Please choose the leave date',
                },
                starttime: {
                    required: 'Please choose the leave start time',
                },
                endtime: {
                    required: 'Please choose the leave end time',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'employee document form'){
        $('#employeedocumentForm').validate({
            ignore: '',
            submitHandler: function (form) {
                var transaction = 'submit employee document';
                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);
                formData.append('employeeid', employee_profile_employee_id);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Employee Document Success', 'The employee document has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Employee Document Success', 'The employee document has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('employee document table', employee_profile_employee_id, '#employee-document-datatable', 0, 'desc', [1]);
                        }
                        else if(response == 'File Size'){
                            show_alert('Employee Document Error', 'The image size exceeds 10Mb.', 'error');
                        }
                        else if(response == 'File Type'){
                            show_alert('Employee Document Error', 'The file uploaded is not supported.', 'error');
                        }
                        else{
                            show_alert('Employee Document Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                documentname: {
                    required: true
                },
                documentnote: {
                    required: true
                },
                category: {
                    required: true
                },
                documentdate: {
                    required: true
                },
                documentfile: {
                    required: true
                },
            },
            messages: {
                documentname: {
                    required: 'Please enter the document name',
                },
                documentnote: {
                    required: 'Please enter the document note',
                },
                category: {
                    required: 'Please choose the category',
                },
                documentdate: {
                    required: 'Please choose the document date',
                },
                documentfile: {
                    required: 'Please choose the document file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-danger');
                $(element).closest('.form-group').addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).closest('.form-group').removeClass('has-danger');
                $(element).closest('.form-group').removeClass('form-control-danger');
                label.remove();
            }
        });
    }
    else if(formtype == 'reject leave form'){
        $('#rejectleaveForm').validate({
            submitHandler: function (form) {
                transaction = 'reject employee leave';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Rejected'){
                            show_alert('Leave Rejection Success', 'The employee leave has been rejected.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#leaves-datatable').length){
                                generate_datatable('leave table', '#leaves-datatable', 0, 'desc', [6]);
                            }

                            if($('#employee-leave-datatable').length){
                                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                    
                                generate_datatable_one_parameter('employee leave table', employee_profile_employee_id, '#employee-leave-datatable', 0, 'desc', [4]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Leave Rejection Error', 'The leave does not exist.', 'info');
                        }
                        else{
                            show_alert('Leave Rejection Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                rejectionreason: {
                    required: true
                },
            },
            messages: {
                rejectionreason: {
                    required: 'Please enter the rejection reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'cancel leave form'){
        $('#cancelleaveForm').validate({
            submitHandler: function (form) {
                transaction = 'cancel employee leave';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            show_alert('Leave Cancel Success', 'The employee leave has been cancelled.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#leaves-datatable').length){
                                generate_datatable('leave table', '#leaves-datatable', 0, 'desc', [6]);
                            }

                            if($('#employee-leave-datatable').length){
                                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                    
                                generate_datatable_one_parameter('employee leave table', employee_profile_employee_id, '#employee-leave-datatable', 0, 'desc', [4]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Leave Cancel Error', 'The leave does not exist.', 'info');
                        }
                        else{
                            show_alert('Leave Cancel Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                cancelationreason: {
                    required: true
                },
            },
            messages: {
                cancelationreason: {
                    required: 'Please enter the cancelation reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'employee attendance log form'){
        $('#employeeattendancelogForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee attendance log';
                document.getElementById('timeindate').disabled = false;
                var employee_profile_employee_id = $('#employee-profile-employee-id').text();
                var latitude = sessionStorage.getItem('latitude');
                var longitude = sessionStorage.getItem('longitude');

                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('employeeid', employee_profile_employee_id);
                formData.append('latitude', latitude);
                formData.append('longitude', longitude);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Employee Attendance Log Success', 'The employee attendance log has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Employee Attendance Log', 'The employee attendance log has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('employee attendance logs table', employee_profile_employee_id, '#employee-attendance-logs-datatable', 0, 'desc', [11]);
                        }
                        else if(response === 'Max Clock-In'){
                            show_alert('Employee Attendance Log Error', 'The employee have reached the maximum clock-in for the day.', 'error');
                        }
                        else if(response === 'Time-In'){
                            show_alert('Employee Attendance Log Error', 'The clock-in cannot be greater than the clock-out.', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Employee Attendance Log Error', 'The clock-out cannot be less than the clock-in.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Attendance Log Error', 'The attachment should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Attendance Log Error', 'The attachment should only be a JPEG or PNG.', 'error');
                        }
                        else{
                            show_alert('Attendance Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                timeindate: {
                    required: true
                },
                timein: {
                    required: true
                },
                timeoutdate: {
                    required:  function(element){
                        var timeout = $('#timeout').val();

                        if(timeout){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                timeout: {
                    required:  function(element){
                        var timeoutdate = $('#timeoutdate').val();

                        if(timeoutdate){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                attachment_file: {
                    required: true
                },
            },
            messages: {
                timeindate: {
                    required: 'Please choose the time in date',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                timeoutdate: {
                    required: 'Please choose the time out date',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
                attachment_file: {
                    required: 'Please choose the attachment',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'payroll specification form'){
        $('#payrollspecificationForm').validate({
            submitHandler: function (form) {
                transaction = 'submit payroll specification';
                var employees = $('#specemployee').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&employees=' + employees,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Payroll Specification Success', 'The payroll specification has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('payroll specification table', '#payroll-specification-datatable', 0, 'desc', [6]);
                        }
                        else{
                            show_alert('Payroll Specification Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                specemployee: {
                    required: true
                },
                specificationtype: {
                    required: true
                },
                specificationcategory: {
                    required: true
                },
                specstartdate: {
                    required: true
                },
                specamount: {
                    required: true
                },
                recurrencepattern: {
                    required:  function(element){
                        var recurrence_count = $('#recurrencecount').val();

                        if(recurrence_count > 0){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                recurrencecount: {
                    required:  function(element){
                        var recurrence_pattern = $('#recurrencepattern').val();

                        if(recurrence_pattern != ''){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                specemployee: {
                    required: 'Please choose an employee',
                },
                specificationtype: {
                    required: 'Please choose the specification type',
                },
                specificationcategory: {
                    required: 'Please choose the category',
                },
                specstartdate: {
                    required: 'Please choose the start date',
                },
                specamount: {
                    required: 'Please enter the amount',
                },
                recurrencepattern: {
                    required: 'Please choose the recurrence pattern',
                },
                recurrencecount: {
                    required: 'Please enter the counter',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update payroll specification form'){
        $('#updatepayrollspecificationForm').validate({
            submitHandler: function (form) {
                transaction = 'submit payroll specification update';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Payroll Specification Success', 'The payroll specification has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('payroll specification table', '#payroll-specification-datatable', 0, 'desc', [6]);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Payroll Specification Error', 'The payroll specification does not exist.', 'info');
                        }
                        else{
                            show_alert('Payroll Specification Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                specemployee: {
                    required: true
                },
                specificationtype: {
                    required: true
                },
                specificationcategory: {
                    required: true
                },
                specpayrolldate: {
                    required: true
                },
                specamount: {
                    required: true
                },
            },
            messages: {
                specemployee: {
                    required: 'Please choose an employee',
                },
                specificationtype: {
                    required: 'Please choose the specification type',
                },
                specificationcategory: {
                    required: 'Please choose the category',
                },
                specpayrolldate: {
                    required: 'Please choose the payroll date',
                },
                specamount: {
                    required: 'Please enter the amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'deduction type form'){
        $('#deductiontypeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit deduction type';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Deduction Type Success', 'The deduction type has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Deduction Type Success', 'The deduction type has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('deduction type table', '#deduction-type-datatable', 0, 'desc', [2]);
                        }
                        else{
                            show_alert('Deduction Type Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                deductiontype: {
                    required: true
                },
                category: {
                    required: true
                }
            },
            messages: {
                deductiontype: {
                    required: 'Please enter the deduction type',
                },
                category: {
                    required: 'Please choose the category',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'deduction amount form'){
        $('#deductionamountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit deduction amount';
                var deduction_type_id = $('#deduction-type-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Deduction Amount Success', 'The deduction amount has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Deduction Amount Success', 'The deduction amount has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('deduction amount table', deduction_type_id, '#deduction-amount-datatable', 0, 'desc', [3]);
                        }
                        else if(response == 'Overlap'){
                            show_alert('Deduction Amount Error', 'The deduction amount overlaps with existing deduction amount.', 'error');
                        }
                        else{
                            show_alert('Deduction Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                startrange: {
                    required: true
                },
                endrange: {
                    required: true
                },
                deductionamount: {
                    required: true
                }
            },
            messages: {
                startrange: {
                    required: 'Please enter the start range',
                },
                endrange: {
                    required: 'Please enter the end range',
                },
                deductionamount: {
                    required: 'Please enter the deduction amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import deduction amount form'){
        $('#importdeductionamountForm').validate({
            submitHandler: function (form) {
                var transaction = 'import deduction amount';
                var deduction_type_id = $('#deduction-type-id').text();
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Deduction Amount Success', 'The deduction amount has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('deduction amount table', deduction_type_id, '#deduction-amount-datatable', 0, 'desc', [3]);
                        }
                        else if(response == 'Overlap'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount overlaps with existing deduction amount.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Deduction Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                deduction_amount_file: {
                    required: true
                },
            },
            messages: {
                deduction_amount_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'main deduction amount form'){
        $('#maindeductionamountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit deduction amount';
                document.getElementById('deductiontypeid').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Deduction Amount Success', 'The deduction amount has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Deduction Amount Success', 'The deduction amount has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            
                            generate_datatable('main deduction amount table', '#main-deduction-amount-datatable', 0, 'desc', [3]);
                        }
                        else if(response == 'Overlap'){
                            show_alert('Deduction Amount Error', 'The deduction amount overlaps with existing deduction amount.', 'error');
                        }
                        else{
                            show_alert('Deduction Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                startrange: {
                    required: true
                },
                endrange: {
                    required: true
                },
                deductionamount: {
                    required: true
                }
            },
            messages: {
                startrange: {
                    required: 'Please enter the start range',
                },
                endrange: {
                    required: 'Please enter the end range',
                },
                deductionamount: {
                    required: 'Please enter the deduction amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import main deduction amount form'){
        $('#importmaindeductionamountForm').validate({
            submitHandler: function (form) {
                var transaction = 'import deduction amount';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Deduction Amount Success', 'The deduction amount has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable('main deduction amount table', '#main-deduction-amount-datatable', 0, 'desc', [3]);
                        }
                        else if(response == 'Overlap'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount overlaps with existing deduction amount.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Deduction Amount Error', 'The deduction amount file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Deduction Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                deduction_amount_file: {
                    required: true
                },
            },
            messages: {
                deduction_amount_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'allowance type form'){
        $('#allowancetypeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit allowance type';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Allowance Type Success', 'The allowance type has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Allowance Type Success', 'The allowance type has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('allowance type table', '#allowance-type-datatable', 0, 'desc', [1]);
                        }
                        else{
                            show_alert('Allowance Type Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                allowancetype: {
                    required: true
                },
                taxtype: {
                    required: true
                },
            },
            messages: {
                allowancetype: {
                    required: 'Please enter the allowance type',
                },
                taxtype: {
                    required: 'Please choose the tax type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'other income type form'){
        $('#otherincometypeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit other income type';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Other Income Type Success', 'The other income type has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Other Income Type Success', 'The other income type has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('other income type table', '#other-income-type-datatable', 0, 'desc', [1]);
                        }
                        else{
                            show_alert('Other Income Type Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                otherincometype: {
                    required: true
                },
                taxtype: {
                    required: true
                },
            },
            messages: {
                otherincometype: {
                    required: 'Please enter the other income type',
                },
                taxtype: {
                    required: 'Please choose the tax type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'user account form'){
        $('#useraccountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit user account';
                document.getElementById('role').disabled = false;
                document.getElementById('suffix').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert User Account Success', 'The user account has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('user account table', '#user-account-datatable', 0, 'asc', [7]);
                        }
                        else if(response === 'Username'){
                            show_alert('User Account Error', 'The username already exists.', 'error');
                        }
                        else{
                            show_alert('User Account Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                usercd: {
                    required: true
                },
                password: {
                    passwordstrength: true,
                    required: true
                },
                role: {
                    required:  function(element){
                        var employeewouser = $('#employeewouser').val();

                        if(employeewouser != ''){
                            return false;
                        }
                        else{
                            return true;
                        }
                    }
                },
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
            },
            messages: {
                usercd: {
                    required: 'Please enter the username',
                },
                password: {
                    required: 'Please enter the password',
                },
                role: {
                    required: 'Please choose the role',
                },
                firstname: {
                    required: 'Please enter the first name',
                },
                lastname: {
                    required: 'Please enter the last name',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update user account form'){
        $('#updateuseraccountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit user account update';
                document.getElementById('suffix').disabled = false;
                document.getElementById('role').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update User Account Success', 'The other income type has been updated.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('user account table', '#user-account-datatable', 0, 'asc', [7]);
                        }
                        else if(response == 'Not Found'){
                            show_alert('User Account', 'The user account does not exists.', 'warning');
                        }
                        else{
                            show_alert('User Account Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                usercd: {
                    required: true
                },
                password: {
                    passwordstrength: true
                },
                role: {
                    required:  function(element){
                        var employeeid = $('#employeeid').val();

                        if(employeeid.split('-')[0] == 'USER'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                firstname: {
                    required: true
                },
                lastname: {
                    required: true
                },
            },
            messages: {
                usercd: {
                    required: 'Please enter the username',
                },
                role: {
                    required: 'Please choose the role',
                },
                firstname: {
                    required: 'Please enter the first name',
                },
                lastname: {
                    required: 'Please enter the last name',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'get location form'){
        $('#getlocationForm').validate({
            submitHandler: function (form) {
                transaction = 'get location';
                var latitude = sessionStorage.getItem('latitude');
                var longitude = sessionStorage.getItem('longitude');

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&latitude=' + latitude + '&longitude=' + longitude,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Recorded'){
                            show_alert('Get Location Success', 'Your location has been recorded.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Get Location Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'email notification form'){
        $('#emailnotificationForm').validate({
            submitHandler: function (form) {
                transaction = 'submit email notification';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Email Notification Success', 'The employee notification has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Email Notification Success', 'The employee notification has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('email notification table', '#email-notification-datatable', 0, 'asc', [2]);
                        }
                        else{
                            show_alert('Email Notification Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                notification: {
                    required: true         
                }
            },
            messages: {
                notification: {
                    required: 'Please enter the notification description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'email recipient form'){
        $('#emailrecipientForm').validate({
            submitHandler: function (form) {
                transaction = 'submit email recipient';

                var notificationid = $('#notification-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Email Recipient Success', 'The email recipient has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Email Recipient Success', 'The email recipient has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('email recipient table', notificationid, '#email-recipient-datatable', 0, 'asc', [1]);
                        }
                        else{
                            show_alert('Email Recipient Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                email: {
                    required: true
                },
            },
            messages: {
                email: {
                    required: 'Please enter the email',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'test email form'){
        $('#testemailForm').validate({
            submitHandler: function (form) {
                transaction = 'send test email';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Sent'){
                            show_alert('Sent Test Email Success', 'The test email has been sent.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Sent Test Email Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Please enter the email',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'generate payroll form'){
        $('#generatepayrollForm').validate({
            submitHandler: function (form) {
                transaction = 'generate payroll';
                document.getElementById('employee').disabled = false;
                var employee = $('#employee').val();
                var payrollperiod = $('#payrollperiod').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&employee=' + employee + '&payrollperiod=' + payrollperiod,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Generated'){
                            show_alert_event('Generate Payroll Success', 'The payroll has been generated.', 'success', 'reload');

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('payroll table', payrollperiod, '#payroll-datatable', 1, 'desc', [11]);
                        }
                        else{
                            show_alert('Generate Payroll Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                generatepayrolloption: {
                    required: true
                },
                employee: {
                    required:  function(element){
                        var generatepayrolloption = $('#generatepayrolloption').val();

                        if(generatepayrolloption == 'selected' || generatepayrolloption == 'exclude'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                payrollstartdate: {
                    required: true
                },
                payrollenddate: {
                    required: true
                },
            },
            messages: {
                generatepayrolloption: {
                    required: 'Please choose the generation option',
                },
                employee: {
                    required: 'Please choose an employee(s)',
                },
                payrollstartdate: {
                    required: 'Please choose the payroll start date',
                },
                payrollenddate: {
                    required: 'Please choose the payroll end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'office shift form'){
        $('#officeshiftscheduleForm').validate({
            submitHandler: function (form) {
                transaction = 'submit office shift';

                var employee = $('#employee').val();
                var dtrday = [];

                $('.dtrday').each(function(){  
                    if($(this).is(':checked'))  
                    {  
                        dtrday.push('1');  
                    }
                    else{
                        dtrday.push('0'); 
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&employee=' + employee + '&dtrday=' + dtrday,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Office Shift Success', 'The office shift has been inserted.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable('office shift table', '#office-shift-datatable', 0, 'asc', [6]);
                        }
                        else{
                            show_alert('Office Shift Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                employee: {
                    required: true
                },
                timein: {
                    required: true
                },
                timeout: {
                    required: true
                },
                late: {
                    required: true
                },
                lunchstarttime: {
                    required: true
                },
                lunchendtime: {
                    required: true
                },
                halfday: {
                    required: true
                },
            },
            messages: {
                employee: {
                    required: 'Please choose an employee(s)',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
                late: {
                    required: 'Please enter the late mark',
                },
                lunchstarttime: {
                    required: 'Please enter the lunch start time',
                },
                lunchendtime: {
                    required: 'Please enter the lunch end time',
                },
                halfday: {
                    required: 'Please enter the half-day mark',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update office shift form'){
        $('#updateofficeshiftscheduleForm').validate({
            submitHandler: function (form) {
                transaction = 'submit office shift update';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Office Shift Success', 'The regular DTR schedule has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Office Shift Success', 'The regular DTR schedule has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('office shift table', '#office-shift-datatable', 0, 'asc', [6]);
                        }
                        else{
                            show_alert('Office Shift Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                dayoff: {
                    required: true
                },
                timein: {
                    required: true
                },
                timeout: {
                    required: true
                },
                late: {
                    required: true
                },
                lunchstarttime: {
                    required: true
                },
                lunchendtime: {
                    required: true
                },
                halfday: {
                    required: true
                },
            },
            messages: {
                dayoff: {
                    required: 'Please choose day off',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
                late: {
                    required: 'Please enter the late mark',
                },
                lunchstarttime: {
                    required: 'Please enter the lunch start time',
                },
                lunchendtime: {
                    required: 'Please enter the lunch end time',
                },
                halfday: {
                    required: 'Please enter the half-day mark',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'pay payroll form'){
        $('#payparollForm').validate({
            submitHandler: function (form) {
                transaction = 'pay payroll';
                var payrollperiod = $('#payrollperiod').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Paid'){
                            show_alert('Pay Payroll Success', 'The payroll has been paid.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('payroll table', payrollperiod, '#payroll-datatable', 1, 'desc', [11]);
                        }
                        else if(response === 'Status'){
                            show_alert('Pay Payroll Error', 'The payroll cannot be paid.', 'info');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Pay Payroll Error', 'The payroll does not exist.', 'info');
                        }
                        else{
                            show_alert('Pay Payroll Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                bankreference: {
                    required: true         
                }
            },
            messages: {
                bankreference: {
                    required: 'Please enter the bank transaction number',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'payroll group form'){
        $('#payrollgroupForm').validate({
            submitHandler: function (form) {
                transaction = 'submit payroll group';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Payroll Group Success', 'The payroll group has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Payroll Group Success', 'The payroll group has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('payroll group table', '#payroll-group-datatable', 0, 'asc', [1]);
                            generate_datatable('payroll group employee table', '#payroll-group-employee-datatable', 0, 'asc', [1]);
                        }
                        else{
                            show_alert('Payroll Group Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                payrollgroup: {
                    required: true         
                }
            },
            messages: {
                payrollgroup: {
                    required: 'Please enter the payroll group',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'payroll group employee form'){
        $('#payrollgroupemployeeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit payroll group employee';
                var payrollgroupid = sessionStorage.getItem('payrollgroupid');
                var employee = [];
        
                $('.payroll-group-employee').each(function(){
                    if($(this).is(':checked')){  
                        employee.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&payrollgroupid=' + payrollgroupid + '&employee=' + employee,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert('Assign Payroll Group Employee Success', 'The employee has been assigned to the payroll group.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('payroll group table', '#payroll-group-datatable', 0, 'asc', [1]);
                            generate_datatable('payroll group employee table', '#payroll-group-employee-datatable', 0, 'asc', [1]);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Payroll Group Employee Error', 'The payroll group does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Employee'){
                            show_alert('Assign Payroll Group Employee Error', 'No employee selected.', 'error');
                        }
                        else{
                            show_alert('Assign Payroll Group Employee Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'database backup form'){
        $('#databasebackupForm').validate({
            submitHandler: function (form) {
                transaction = 'backup database';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Backed Up'){
                            show_alert('Backup Database Success', 'The database has been backed-up.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Backup Database Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                filename: {
                    required: true         
                }
            },
            messages: {
                filename: {
                    required: 'Please enter the file name',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'attendance log form'){
        $('#attendancelogForm').validate({
            submitHandler: function (form) {
                transaction = 'submit attendance log';
                document.getElementById('timeindate').disabled = false;
                document.getElementById('employeeid').disabled = false;
                var latitude = sessionStorage.getItem('latitude');
                var longitude = sessionStorage.getItem('longitude');

                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('latitude', latitude);
                formData.append('longitude', longitude);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Attendance Log Success', 'The attendance log has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Attendance Log', 'The attendance log has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_two_parameter('attendance logs table', '', '', '#attendance-record-datatable', 1, 'desc', [12], '1');
                        }
                        else if(response === 'File Size'){
                            show_alert('Attendance Log Error', 'The attachment should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Attendance Log Error', 'The attachment should only be a JPEG or PNG.', 'error');
                        }
                        else if(response === 'Max Clock-In'){
                            show_alert('Attendance Log Error', 'The employee have reached the maximum clock-in for the day.', 'error');
                        }
                        else if(response === 'Time-In'){
                            show_alert('Attendance Log Error', 'The clock-in cannot be greater than the clock-out.', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Attendance Log Error', 'The clock-out cannot be less than the clock-in.', 'error');
                        }
                        else{
                            show_alert('Attendance Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                employeeid: {
                    required: true
                },
                timeindate: {
                    required: true
                },
                timein: {
                    required: true
                },
                timeoutdate: {
                    required:  function(element){
                        var timeout = $('#timeout').val();

                        if(timeout){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                timeout: {
                    required:  function(element){
                        var timeoutdate = $('#timeoutdate').val();

                        if(timeoutdate){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                attachment_file: {
                    required: true
                },
            },
            messages: {
                employeeid: {
                    required: 'Please choose the employee',
                },
                timeindate: {
                    required: 'Please choose the time in date',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                timeoutdate: {
                    required: 'Please choose the time out date',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
                attachment_file: {
                    required: 'Please choose the attachment',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import attendance log form'){
        $('#importattendancelogForm').validate({
            submitHandler: function (form) {
                var transaction = 'import attendance log';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Attendance Log Success', 'The attendance log has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_two_parameter('attendance logs table', '', '', '#attendance-record-datatable', 1, 'desc', [12], '1');
                        }
                        else if(response === 'Time-In'){
                            show_alert('Import Attendance Log Error', 'The clock-in cannot be greater than the clock-out', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Import Attendance Log Error', 'The clock-out cannot be less than the clock-in', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Attendance Log Error', 'The attendance log file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Attendance Log Error', 'The attendance log file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Attendance Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                attendance_log_file: {
                    required: true
                },
            },
            messages: {
                attendance_log_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import employee leave form'){
        $('#importemployeeleaveForm').validate({
            submitHandler: function (form) {
                var transaction = 'import employee leave';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Employee Leave Success', 'The employee leave has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Employee Leave Error', 'The employee leave file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Employee Leave Error', 'The employee leave file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Employee Leave Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                employee_leave_file: {
                    required: true
                },
            },
            messages: {
                employee_leave_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import payroll specification form'){
        $('#importpayrollspecificationForm').validate({
            submitHandler: function (form) {
                var transaction = 'import payroll specification';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Payroll Specification Success', 'The payroll specification has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable('payroll specification table', '#payroll-specification-datatable', 0, 'desc', [6]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Payroll Specification Error', 'The payroll specification file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Payroll Specification Error', 'The payroll specification file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Payroll Specification Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                payroll_specification_file: {
                    required: true
                },
            },
            messages: {
                payroll_specification_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'apply leave form'){
        $('#applyleaveForm').validate({
            submitHandler: function (form) {
               var transaction = 'submit leave application';


                var formdata  = new FormData(form)
                formdata.append('transaction',transaction)
                formdata.append('username',username)

                ajax_request_form('controller.php',formdata,
                //success
                function (d) {
                    
                },function (d) {
                    var response = d.responseText


                    if(response === 'Inserted'){
                                    $('#System-Modal').modal('hide');
        
                                    show_alert_event('Apply Leave Success', 'The leave has been inserted.', 'success', 'reload');
                                }
                                else if(response === 'Leave Entitlement'){
                                    show_alert_event('Apply Leave Error', 'The leave entitlement was consumed.', 'error', 'reload');
                                }
                                else{
                                    show_alert('Apply Leave Error', response, 'error');
                                }



                })
                // $.ajax({
                //     type: 'POST',
                //     url: 'controller.php',
                //     data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                //     beforeSend: function(){
                //         document.getElementById('submitform').disabled = true;
                //         $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                //     },
                //     success: function (response) {
                //         if(response === 'Inserted'){
                //             $('#System-Modal').modal('hide');

                //             show_alert_event('Apply Leave Success', 'The leave has been inserted.', 'success', 'reload');
                //         }
                //         else if(response === 'Leave Entitlement'){
                //             show_alert_event('Apply Leave Error', 'The leave entitlement was consumed.', 'error', 'reload');
                //         }
                //         else{
                //             show_alert('Apply Leave Error', response, 'error');
                //         }
                //     },
                //     complete: function(){
                //         document.getElementById('submitform').disabled = false;
                //         $('#submitform').html('Submit');
                //     }
                // });
                return false;
            },
            rules: {
                leavetype: {
                    required: true
                },
                leaveduration: {
                    required: true
                },
                leavedate: {
                    required: true
                },
                reason: {
                    required: true
                },
                starttime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                endtime: {
                    required:  function(element){
                        var leaveduration = $('#leaveduration').val();

                        if(leaveduration == 'CUSTOM'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                leavetype: {
                    required: 'Please choose the leave type',
                },
                leaveduration: {
                    required: 'Please choose the leave duration',
                },
                leavedate: {
                    required: 'Please choose the leave date',
                },
                starttime: {
                    required: 'Please choose the leave start time',
                },
                endtime: {
                    required: 'Please choose the leave end time',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'cancel leave application form'){
        $('#cancelleaveapplicationForm').validate({
            submitHandler: function (form) {
                transaction = 'cancel employee leave';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            show_alert_event('Cancel Leave Application Success', 'The leave application has been cancelled.', 'success', 'reload');

                            $('#System-Modal').modal('hide');

                            if($('#leave application table').length){
                                generate_datatable('leave application table', '#leaves-application-datatable', 0, 'desc', [6]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Leave Application  Cancel Error', 'The leave application does not exist.', 'info');
                        }
                        else{
                            show_alert('Leave Application  Cancel Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                cancelationreason: {
                    required: true
                },
            },
            messages: {
                cancelationreason: {
                    required: 'Please enter the cancelation reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'request employee attendance adjustment form'){
        $('#requestemployeeattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee attendance adjustment request';
                document.getElementById('timeindate').disabled = false;
                document.getElementById('timeoutdate').disabled = false;
                document.getElementById('timeout').disabled = false;

                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Requested'){
                            show_alert('Request Employee Attendance Adjustment', 'The attendance adjustment has been requested.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable_two_parameter('employee attendance adjustment table', '', '', '#employee-attendance-adjustment-datatable', 0, 'desc', [8]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Request Employee Attendance Adjustment Error', 'The attachment should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Request Employee Attendance Adjustment Error', 'The attachment should only be a JPEG or PNG.', 'error');
                        }
                        else if(response === 'Time-In'){
                            show_alert('Request Employee Attendance Adjustment Error', 'The clock-in cannot be greater than the clock-out.', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Request Employee Attendance Adjustment Error', 'The clock-out cannot be less than the clock-in.', 'error');
                        }
                        else{
                            show_alert('Request Employee Attendance Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                timeindate: {
                    required: true
                },
                timein: {
                    required: true
                },
                
                reason: {
                    required: true
                },
                attachment_file: {
                    required: true
                },
                timeoutdate: {
                    required:  function(element){
                        var timeout = $('#timeout').val();
                        var timeoutdatedef = $('#timeoutdatedef').val();

                        if(timeout || timeoutdatedef){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                timeout: {
                    required:  function(element){
                        var timeoutdate = $('#timeoutdate').val();
                        var timeoutdef = $('#timeoutdef').val();

                        if(timeoutdate || timeoutdef){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                timeindate: {
                    required: 'Please choose the time in date',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                attachment_file: {
                    required: 'Please choose the attachment',
                },
                reason: {
                    required: 'Please enter the reason',
                },
                timeoutdate: {
                    required: 'Please choose the time out date',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update employee attendance adjustment form'){
        $('#updateemployeeattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee attendance adjustment request update';
                document.getElementById('timeindate').disabled = false;
                document.getElementById('timeoutdate').disabled = false;
                document.getElementById('timeout').disabled = false;

                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Employee Attendance Adjustment', 'The attendance adjustment has been updated.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable_two_parameter('employee attendance adjustment table', '', '', '#employee-attendance-adjustment-datatable', 0, 'desc', [8]);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The attendance adjustment does not exists.', 'error');
                        }
                        else if(response === 'Attendance Not Found'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The attendance record does not exists.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The attachment should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The attachment should only be a JPEG or PNG.', 'error');
                        }
                        else if(response === 'Time-In'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The clock-in cannot be greater than the clock-out.', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Update Employee Attendance Adjustment Error', 'The clock-out cannot be less than the clock-in.', 'error');
                        }
                        else{
                            show_alert('Update Employee Attendance Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                timeindate: {
                    required: true
                },
                timein: {
                    required: true
                },
                reason: {
                    required: true
                },
                timeoutdate: {
                    required:  function(element){
                        var timeout = $('#timeout').val();
                        var timeoutdatedef = $('#timeoutdatedef').val();

                        if(timeout || timeoutdatedef){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
                timeout: {
                    required:  function(element){
                        var timeoutdate = $('#timeoutdate').val();
                        var timeoutdef = $('#timeoutdef').val();

                        if(timeoutdate || timeoutdef){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                timeindate: {
                    required: 'Please choose the time in date',
                },
                timein: {
                    required: 'Please choose the time in',
                },
                reason: {
                    required: 'Please enter the reason',
                },
                timeoutdate: {
                    required: 'Please choose the time out date',
                },
                timeout: {
                    required: 'Please choose the time out',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter attendance summary'){
        $('#filterattendancesummaryForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                var export_attendance_summary = check_permission('158');

                if(export_attendance_summary > 0){
                    generate_datatable_two_parameter('attendance summary table', startdate, enddate, '#attendance-summary-datatable', 0, 'desc', [16], '1');
                }
                else{
                    generate_datatable_two_parameter('attendance summary table', startdate, enddate, '#attendance-summary-datatable', 0, 'desc', [16]);
                }

                show_alert('Filter Attendance Summary', 'The attendance summary has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter payroll'){
        $('#filterpayrollForm').validate({
            submitHandler: function (form) {
                var payrollperiod = $('#payrollperiod').val();
                var data = $('#payrollperiod').select2('data');

                sessionStorage.setItem('filter1', payrollperiod);

                $('#filter-text').text('Filtered by payroll period (' + data[0].text + ')');

                generate_datatable_one_parameter('payroll table', payrollperiod, '#payroll-datatable', 1, 'desc', [11]);

                show_alert('Filter Payroll', 'The payroll has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                payrollperiod: {
                    required: true
                },
            },
            messages: {
                payrollperiod: {
                    required: 'Please choose the payroll period',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter payroll summary'){
        $('#filterpayrollsummaryForm').validate({
            submitHandler: function (form) {
                var payrollperiod = $('#payrollperiod').val();
                var data = $('#payrollperiod').select2('data');

                sessionStorage.setItem('filter1', payrollperiod);

                $('#filter-text').text('Filtered by payroll period (' + data[0].text + ')');

                var export_payroll_summary = check_permission('159');

                if(export_payroll_summary > 0){
                    generate_datatable_one_parameter('payroll summary table', payrollperiod, '#payroll-summary-datatable', 1, 'desc', [11], '1');
                }
                else{
                    generate_datatable_one_parameter('payroll summary table', payrollperiod, '#payroll-summary-datatable', 1, 'desc', [11]);
                }

                show_alert('Filter Payroll Summary', 'The payroll summary has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                payrollperiod: {
                    required: true
                },
            },
            messages: {
                payrollperiod: {
                    required: 'Please choose the payroll period',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'telephone log form'){
        $('#telephonelogForm').validate({
            submitHandler: function (form) {
                transaction = 'submit telephone log';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Telephone Log Success', 'The telephone log has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Telephone Log Success', 'The telephone log has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('telephone log table', '#telephone-log-datatable', 0, 'desc', [9]);
                        }
                        else{
                            show_alert('Telephone Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                recipient: {
                    required: true
                },
                telephone: {
                    required: true,
                    checkwholenumber: true
                },
                initialcalldate: {
                    required: true
                },
                initialcalltime: {
                    required: true
                },
                reason: {
                    required: true
                },
            },
            messages: {
                recipient: {
                    required: 'Please enter the recipient',
                },
                telephone: {
                    required: 'Please enter the telephone/mobile number',
                },
                initialcalldate: {
                    required: 'Please choose the initial call date',
                },
                initialcalltime: {
                    required: 'Please choose the initial call time',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'consumed telephone log form'){
        $('#consumedtelephonelogForm').validate({
            submitHandler: function (form) {
                transaction = 'consume telephone log';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Consumed'){
                            show_alert('Consumed Telephone Log Success', 'The telephone log has been consumed.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('telephone log table', '#telephone-log-datatable', 0, 'desc', [9]);
                        }
                        else{
                            show_alert('Telephone Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                actualcalldate: {
                    required: true
                },
                actualcalltime: {
                    required: true
                },
            },
            messages: {
                actualcalldate: {
                    required: 'Please choose the actual call date',
                },
                actualcalltime: {
                    required: 'Please choose the actual call time',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
  else if(formtype == 'document form'){
    $('#documentForm').validate({
        submitHandler: function (form) {
            var transaction = 'submit document';

            // If using CKEditor
            if (typeof CKEDITOR !== 'undefined') {
                for (var instanceName in CKEDITOR.instances) {
                    CKEDITOR.instances[instanceName].updateElement();
                }
            }

            var formData = new FormData(form);
            formData.append('username', username);
            formData.append('transaction', transaction);

            // Manually append description
            var description = $('#description').val();
            formData.set('description', description);

 
            // Check for required fields
            var missingFields = [];
            if (!formData.get('documentname')) missingFields.push('Document Name');
            if (!formData.get('category')) missingFields.push('Category');
            if (!formData.get('description')) missingFields.push('Description');
            if (formData.get('update') === '0' && !formData.get('document_file').size) missingFields.push('Document File');

            if (missingFields.length > 0) {
                console.error("Missing required fields: " + missingFields.join(', '));
                show_alert('Form Error', 'Please fill in the following required fields: ' + missingFields.join(', '), 'error');
                return false;
            }

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'text',
                beforeSend: function(){
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div>');
                },
                success: function (response) {
                    console.log('Response:', response);
                    if(response.status === 'success'){
                        if(response.message === 'Inserted'){
                            show_alert('Insert Document Success', 'The document has been inserted.', 'success');
                        }
                        else{
                            show_alert('Update Document Success', 'The document has been updated.', 'success');
                        }

                        $('#System-Modal').modal('hide');

                        if($('#pending-document-datatable').length){
                            generate_datatable('pending documents table', '#pending-document-datatable', 0, 'desc', [7]);
                        }

                        if($('#publish-document-datatable').length){
                            generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                        }
                    }
                    else {
                          show_alert('Insert Document Success', 'The document has been inserted.', 'success');
                        setTimeout(function() {
                            location.reload(); // Refresh the page after 2 seconds
                        }, 1300);
             

                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('AJAX Error:', textStatus, errorThrown);
                    console.log('Response Text:', jqXHR.responseText);
                    show_alert('AJAX Error', 'An error occurred while processing your request. Please check the console for more details.', 'error');
                },
                complete: function(){
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });

            return false;
        },
        rules: {
            document_file: {
                required: function(element){
                    var update = $('#update').val();
                    return update == '0';
                }
            },
            documentname: {
                required: true
            },
            description: {
                required: true
            },
            category: {
                required: true
            },
            tags: {
                required: true
            },
        },
        messages: {
            document_file: {
                required: 'Please choose the document file',
            },
            documentname: {
                required: 'Please enter the document name',
            },
            description: {
                required: 'Please enter the document description',
            },
            category: {
                required: 'Please select the document category',
            },
            tags: {
                required: 'Please enter at least one tag',
            },
        },
        errorPlacement: function(label, element) {
            if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                label.insertAfter(element.next('.select2-container'));
            }
            else if(element.attr('data-role') === 'tagsinput') {
                label.insertAfter(element.next('.bootstrap-tagsinput'));
            }
            else if(element.parent('.input-group').length){
                label.insertAfter(element.parent());
            }
            else{
                label.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass('has-danger');
            $(element).addClass('form-control-danger');
        },
        success: function(label,element) {
            $(element).parent().removeClass('has-danger')
            $(element).removeClass('form-control-danger')
            label.remove();
        }
    });
    }
    
    else if(formtype == 'document form1'){
    $('#documentForm1').validate({
        submitHandler: function (form) {
            console.log('Form submitted');
            console.log('Submit button disabled state before submission:', $('#submitform').prop('disabled'));

            var transaction = 'submit update document';

            var formData = new FormData(form);
            formData.append('username', username);
            formData.append('transaction', transaction);

            // Log form data
            console.log("Form data:");
            for (var pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }

            // Log specific field values
            console.log("Description field value:", $('#description').val());
            console.log("Description in FormData:", formData.get('description'));
            console.log("Description field exists:", $('#description').length > 0);

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: formData,
                processData: false,
                contentType: false,
                dataType: 'json',
                beforeSend: function(){
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only"></span></div>');
                },
                success: function (response) {
                    console.log('Update response:', response);
                    if(response.status === 'success'){
                        show_alert('Update Document Success', response.message, 'success');
                        $('#System-Modal').modal('hide');
                        // Refresh your document list or perform any other necessary actions
                    } else {
                        show_alert('Document Error', response.message, 'error');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('AJAX Error:', textStatus, errorThrown);
                    console.log('Response Text:', jqXHR.responseText);
                    try {
                        var jsonResponse = JSON.parse(jqXHR.responseText);
                        console.log('Parsed JSON response:', jsonResponse);
                        show_alert('Document Error', jsonResponse.message, 'error');
                    } catch(e) {
                        console.log('Response is not valid JSON');
                        show_alert('AJAX Error', 'An error occurred while processing your request. Please check the console for more details.', 'error');
                    }
                },
                complete: function(){
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });

            return false;
        },
        rules: {
            document_file: {
                required: function(element){
                    var update = $('#update').val();
                    return update == '0';
                }
            },
            documentname: {
                required: true
            },
            description: {
                required: true
            },
            category: {
                required: true
            },
            tags: {
                required: true
            },
        },
        messages: {
            document_file: {
                required: 'Please choose the document file',
            },
            documentname: {
                required: 'Please enter the document name',
            },
            description: {
                required: 'Please enter the document description',
            },
            category: {
                required: 'Please select the document category',
            },
            tags: {
                required: 'Please enter at least one tag',
            },
        },
        errorPlacement: function(label, element) {
            if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                label.insertAfter(element.next('.select2-container'));
            }
            else if(element.attr('data-role') === 'tagsinput') {
                label.insertAfter(element.next('.bootstrap-tagsinput'));
            }
            else if(element.parent('.input-group').length){
                label.insertAfter(element.parent());
            }
            else{
                label.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass('has-danger');
            $(element).addClass('form-control-danger');
        },
        success: function(label,element) {
            $(element).parent().removeClass('has-danger')
            $(element).removeClass('form-control-danger')
            label.remove();
        }
    });
            console.log('Initial submit button disabled state:', $('#submitform'));
}
    else if(formtype == 'document authorizer form'){
        $('#documentauthorizerForm').validate({
            submitHandler: function (form) {
                transaction = 'submit document authorizer';

                var authorizer = $('#authorizer').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&authorizer=' + authorizer,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Document Authorizer Success', 'The document authorizer has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('document authorizer table', '#document-authorizer-datatable', 0, 'desc', [2]);
                        }
                        else{
                            show_alert('Document Authorizer Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                department: {
                    required: true
                },
                authorizer: {
                    required: true
                },
            },
            messages: {
                department: {
                    required: 'Please choose the department',
                },
                authorizer: {
                    required: 'Please choose the authorizer',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'document permission department form'){
        $('#documentpermissiondepartmentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit department document permission';
                var documentid = sessionStorage.getItem('documentid');
                var permission = [];
        
                $('.department-permission').each(function(){
                    if($(this).is(':checked')){  
                        permission.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&documentid=' + documentid + '&permission=' + permission,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert('Assign Document Permission Success', 'The permission has been assigned to the document.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#publish-document-datatable').length){
                                generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Document Permission Error', 'The document does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Document Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'document permission employee form'){
        $('#documentpermissionemployeeForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee document permission';
                var documentid = sessionStorage.getItem('documentid');
                var permission = [];
        
                $('.employee-permission').each(function(){
                    if($(this).is(':checked')){  
                        permission.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&documentid=' + documentid + '&permission=' + permission,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert('Assign Document Permission Success', 'The permission has been assigned to the employee.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#publish-document-datatable').length){
                                generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Document Permission Error', 'The document does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Document Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'download document form'){
        $('#downloaddocumentForm').validate({
            submitHandler: function (form) {
                transaction = 'download document';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    dataType: 'JSON',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response[0].STATUS === 'Downloaded'){
                            download(response[0].ZIP_LINK, response[0].FILE_NAME);

                            show_alert('Download Document Success', 'The document has been downloaded.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Download Document Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                password: {
                    required: true
                },
            },
            messages: {
                password: {
                    required: 'Please enter the document password',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter document form'){
        $('#filterdocumentForm').validate({
            submitHandler: function (form) {
                var documentfilterby = $('#documentfilterby').val();
                var documentfiltervalue = $('#documentfiltervalue').val();
                var data = $('#documentfilterby').select2('data');
                var data2 = $('#documentfiltervalue').select2('data');

                sessionStorage.setItem('filter1', documentfilterby);
                sessionStorage.setItem('filter2', documentfiltervalue);

                $('#filter-text').text('Filtered documents by ' + data[0].text + ' (' + data2[0].text + ')');

                generate_datatable_three_parameter('publish documents table', 'filter', documentfilterby, documentfiltervalue, '#publish-document-datatable', 0, 'desc', [11]);

                show_alert('Filter Document', 'The documents have been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                documentfilterby: {
                    required: true
                },
                documentfiltervalue: {
                    required: true
                },
            },
            messages: {
                documentfilterby: {
                    required: 'Please choose the filter by',
                },
                documentfiltervalue: {
                    required: 'Please choose the filter value',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'search document form'){
        $('#searchdocumentForm').validate({
            submitHandler: function (form) {
                var documentsearchby = $('#documentsearchby').val();
                var documentsearch = $('#documentsearch').val();
                var data = $('#documentsearchby').select2('data');

                sessionStorage.setItem('filter1', documentsearchby);
                sessionStorage.setItem('filter2', documentsearch);

                $('#filter-text').text('Search documents by ' + data[0].text + ' (' + documentsearch + ')');

                generate_datatable_three_parameter('publish documents table', 'search', documentsearchby, documentsearch, '#publish-document-datatable', 0, 'desc', [11]);

                show_alert('Search Document', 'The documents have been searched.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                documentsearchby: {
                    required: true
                },
                documentsearch: {
                    required: true
                },
            },
            messages: {
                documentsearchby: {
                    required: 'Please choose the search by',
                },
                documentsearch: {
                    required: 'Please choose the search parameter',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter document category form'){
        $('#filterdocumentcategoryForm').validate({
            submitHandler: function (form) {
                var documentfilterby = $('#documentfilterby').val();
                var documentfiltervalue = $('#documentfiltervalue').val();
                var data = $('#documentfilterby').select2('data');
                var data2 = $('#documentfiltervalue').select2('data');

                sessionStorage.setItem('filter1', documentfilterby);
                sessionStorage.setItem('filter2', documentfiltervalue);

                $('#filter-text').text('Filtered documents by ' + data[0].text + ' (' + data2[0].text + ')');

                if($('#publish-images-document-datatable').length){
                    generate_datatable_three_parameter('publish images documents table', 'filter', documentfilterby, documentfiltervalue, '#publish-images-document-datatable', 0, 'desc', [11]);
                }
        
                if($('#publish-memorandum-document-datatable').length){
                    generate_datatable_three_parameter('publish memorandum documents table', 'filter', documentfilterby, documentfiltervalue, '#publish-memorandum-document-datatable', 0, 'desc', [11]);
                }
        
                if($('#publish-loan-document-datatable').length){
                    generate_datatable_three_parameter('publish loan documents table', 'filter', documentfilterby, documentfiltervalue, '#publish-loan-document-datatable', 0, 'desc', [11]);
                }

                show_alert('Filter Document', 'The documents have been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                documentfilterby: {
                    required: true
                },
                documentfiltervalue: {
                    required: true
                },
            },
            messages: {
                documentfilterby: {
                    required: 'Please choose the filter by',
                },
                documentfiltervalue: {
                    required: 'Please choose the filter value',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'search document category form'){


        $('#documentsearchby').on('change', function() {
            if ($(this).val() === 'tags') {
                $('#tagsRow').show();
                $('#keywordRow').hide();
            } else {
                $('#tagsRow').hide();
                $('#keywordRow').show();
            }
        });



        $('#searchdocumentcategoryForm').validate({
            submitHandler: function (form) {
                var documentsearchby = $('#documentsearchby').val();
                var documentsearch = documentsearchby === 'tags' ? $('#tags').val() : $('#documentsearch').val();
                var data = $('#documentsearchby').select2('data');

                sessionStorage.setItem('filter1', documentsearchby);
                sessionStorage.setItem('filter2', documentsearch);

                $('#filter-text').text('Search documents by ' + data[0].text + ' (' + documentsearch + ')');

                if($('#publish-images-document-datatable').length){
                    generate_datatable_three_parameter('publish images documents table', 'search', documentsearchby, documentsearch, '#publish-images-document-datatable', 0, 'desc', [11]);
                }

                if($('#publish-memorandum-document-datatable').length){
                    generate_datatable_three_parameter('publish memorandum documents table', 'search', documentsearchby, documentsearch, '#publish-memorandum-document-datatable', 0, 'desc', [11]);
                }

                if($('#publish-loan-document-datatable').length){
                    generate_datatable_three_parameter('publish loan documents table', 'search', documentsearchby, documentsearch, '#publish-loan-document-datatable', 0, 'desc', [11]);
                }

                if($('#publish-credit-document-datatable').length){
                    generate_datatable_three_parameter('publish credit documents table', 'search', documentsearchby, documentsearch, '#publish-credit-document-datatable', 0, 'desc', [11]);
                }

                if($('#publish-admin-document-datatable').length){
                    generate_datatable_three_parameter('publish admin documents table', 'search', documentsearchby, documentsearch, '#publish-admin-document-datatable', 0, 'desc', [11]);
                }

                  if($('#publish-form-document-datatable').length){
                    generate_datatable_three_parameter('publish form documents table', 'search', documentsearchby, documentsearch, '#publish-form-document-datatable', 0, 'desc', [11]);
                }


                show_alert('Search Document', 'The documents have been searched.', 'success');

                $('#System-Modal').modal('hide');

                return false;
            },
            rules: {
                documentsearchby: {
                    required: true
                },
                documentsearch: {
                    required: true
                },
            },
            messages: {
                documentsearchby: {
                    required: 'Please choose the search by',
                },
                documentsearch: {
                    required: 'Please choose the search parameter',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
     else if(formtype == 'transmittal form'){
        $('#transmittalForm').validate({
            submitHandler: function (form) {
                transaction = 'submit transmittal';
                var filter1 = sessionStorage.getItem('filter1');
                var filter2 = sessionStorage.getItem('filter2');

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Transmittal', 'The transmittal has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            if($('#transmittal-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('transmittal table', filter1, filter2, '#transmittal-datatable', 3, 'desc', [6]);
                            }

                            if($('#dashboard-transmittal-datatable').length){
                                generate_datatable('dashboard transmittal table', '#dashboard-transmittal-datatable', 3, 'desc', '');
                            }
                        }
                        else{
                            show_alert('Transmittal Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                description: {
                    required: true
                },
                transmittaldepartment: {
                    required: true
                },
            },
            messages: {
                description: {
                    required: 'Please enter the description',
                },
                transmittaldepartment: {
                    required: 'Please choose the department',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update transmittal form'){
        $('#updatetransmittalForm').validate({
            submitHandler: function (form) {
                transaction = 'submit transmittal update';
                var filter1 = sessionStorage.getItem('filter1');
                var filter2 = sessionStorage.getItem('filter2');

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Transmittal', 'The transmittal has been updated.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#transmittal-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('transmittal table', filter1, filter2, '#transmittal-datatable', 3, 'desc', [6]);
                            }

                            if($('#dashboard-transmittal-datatable').length){
                                generate_datatable('dashboard transmittal table', '#dashboard-transmittal-datatable', 3, 'desc', '');
                            }
                        }
                        else{
                            show_alert('Transmittal Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                description: {
                    required: true
                },
                transmittaldepartment: {
                    required: true
                },
            },
            messages: {
                description: {
                    required: 'Please enter the description',
                },
                transmittaldepartment: {
                    required: 'Please choose the department',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'retransmit transmittal form'){
        $('#retransmittransmittalForm').validate({
            submitHandler: function (form) {
                transaction = 'retransmit transmittal';
                var filter1 = sessionStorage.getItem('filter1');
                var filter2 = sessionStorage.getItem('filter2');

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Re-Transmitted'){
                            show_alert('Re-Transmit Transmittal', 'The transmittal has been re-transmitted.', 'success');

                            $('#System-Modal').modal('hide');
                            if($('#transmittal-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('transmittal table', filter1, filter2, '#transmittal-datatable', 3, 'desc', [6]);
                            }

                            if($('#dashboard-transmittal-datatable').length){
                                generate_datatable('dashboard transmittal table', '#dashboard-transmittal-datatable', 3, 'desc', '');
                            }
                        }
                        else{
                            show_alert('Re-Transmit Transmittal Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                transmittaldepartment: {
                    required: true
                },
            },
            messages: {
                transmittaldepartment: {
                    required: 'Please choose the department',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter transmittal'){
        $('#filtertransmittalForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('transmittal table', startdate, enddate, '#transmittal-datatable', 3, 'desc', [6]);

                show_alert('Filter Transmittal', 'The transmittal has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter transmittal by category'){
        $('#filtertransmittalbycategoryForm').validate({
            submitHandler: function (form) {
                var transmittalfilterby = $('#transmittalfilterby').val();
                var transmittalfiltervalue = $('#transmittalfiltervalue').val();
                var data = $('#transmittalfilterby').select2('data');
                var data2 = $('#transmittalfiltervalue').select2('data');

                sessionStorage.setItem('filter1', transmittalfilterby);
                sessionStorage.setItem('filter2', transmittalfiltervalue);

                $('#filter-text').text('Filtered transmittals by ' + data[0].text + ' (' + data2[0].text + ')');

                generate_datatable_two_parameter('transmittal table', transmittalfilterby, transmittalfiltervalue, '#transmittal-datatable', 3, 'desc', [6]);

                show_alert('Filter Transmittal', 'The transmittal have been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                transmittalfilterby: {
                    required: true
                },
                transmittalfiltervalue: {
                    required: true
                },
            },
            messages: {
                transmittalfilterby: {
                    required: 'Please choose the filter by',
                },
                transmittalfiltervalue: {
                    required: 'Please choose the filter value',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'suggest to win form'){
        $('#suggesttowinForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit suggest to win';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Suggest To Win Success', 'The suggest to win has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Suggest To Win Success', 'The suggest to win has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');

                            generate_datatable_two_parameter('suggest to win table', '', '', '#suggest-to-win-datatable', 1, 'asc', [6]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Suggest To Win Error', 'The suggest to win file should not exceed max file size.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Suggest To Win Error', 'The suggest to win file is not supported.', 'error');
                        }
                        else{
                            show_alert('Suggest To Win Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                title: {
                    required: true
                },
                description: {
                    required: true
                },
                reason: {
                    required: true
                },
                benefits: {
                    required: true
                },
            },
            messages: {
                title: {
                    required: 'Please enter the suggestion title',
                },
                description: {
                    required: 'Please enter the description',
                },
                reason: {
                    required: 'Please enter the reason',
                },
                benefits: {
                    required: 'Please enter the benefits',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter suggest to win'){
        $('#filtersuggesttowinForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('suggest to win table', startdate, enddate, '#suggest-to-win-datatable', 2, 'asc', [6]);

                show_alert('Filter Suggest To Win', 'The suggest to win has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter suggest to win approval'){
        $('#filtersuggesttowinapprovalForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('suggest to win approval table', startdate, enddate, '#suggest-to-win-approval-datatable', 1, 'asc', [7]);

                show_alert('Filter Pending Suggest To Win', 'The pending suggest to win has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'suggest to win vote form'){
        $('#suggesttowinvoteForm').validate({
            submitHandler: function (form) {
                transaction = 'submit suggest to win vote';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Suggest To Win Vote Success', 'The suggest to win vote has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Suggest To Win Vote Success', 'The suggest to win vote has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('suggest to win voting table', '#suggest-to-win-voting-datatable', 1, 'asc', [8]);
                        }
                        else{
                            show_alert('Suggest To Win Vote Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                satisfaction: {
                    required: true
                },
                quality: {
                    required: true
                },
                innovation: {
                    required: true
                },
                feasibility: {
                    required: true
                },
            },
            messages: {
                satisfaction: {
                    required: 'Please choose the satisfaction rate',
                },
                quality: {
                    required: 'Please choose the quality rate',
                },
                innovation: {
                    required: 'Please choose the innovation rate',
                },
                feasibility: {
                    required: 'Please choose the feasibility rate',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'stw vote end date form'){
        $('#suggesttowinvoteenddateForm').validate({
            submitHandler: function (form) {
                transaction = 'submit suggest to win vote end date';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Suggest To Win Vote End Date Success', 'The suggest to win vote end date has been updated.', 'success');

                            $('#System-Modal').modal('hide');

                            $('#filter-text').text('');
                            generate_datatable_two_parameter('suggest to win table', '', '', '#suggest-to-win-datatable', 1, 'asc', [6]);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Suggest To Win Vote End Date', 'The suggest to win does not exist.', 'info');
                          }
                        else{
                            show_alert('Suggest To Win Vote End Date Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                voteenddate: {
                    required: true
                },
            },
            messages: {
                voteenddate: {
                    required: 'Please choose the vote end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter suggest to win votes'){
        $('#filtersuggesttowinvotesForm').validate({
            submitHandler: function (form) {
                var month = $('#month').val();
                var year = $('#year').val();

                sessionStorage.setItem('filter1', month);
                sessionStorage.setItem('filter2', year);

                var data = $('#month').select2('data');

                $('#filter-text').text('Filtered by month ' + data[0].text + ' ' + year);

                generate_datatable_two_parameter('suggest to win vote summary table', month, year, '#suggest-to-win-vote-summary-datatable', 7, 'asc', [8]);

                show_alert('Filter Suggest To Win Votes', 'The suggest to win votes has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                month: {
                    required: true
                },
                year: {
                    required: true
                },
            },
            messages: {
                month: {
                    required: 'Please choose the month',
                },
                year: {
                    required: 'Please choose the year',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import transmittal form'){
        $('#importtransmittalForm').validate({
            submitHandler: function (form) {
                var transaction = 'import transmittal';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Transmittal Success', 'The transmittal has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#transmittal-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('transmittal table', '', '', '#transmittal-datatable', 3, 'desc', [6]);
                            }

                            if($('#dashboard-transmittal-datatable').length){
                                generate_datatable('dashboard transmittal table', '#dashboard-transmittal-datatable', 3, 'desc', '');
                            }
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Transmittal Error', 'The transmittal file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Transmittal Error', 'The transmittal file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Transmittal Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                transmittal_file: {
                    required: true
                },
            },
            messages: {
                transmittal_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import transmittal history form'){
        $('#importtransmittalhistoryForm').validate({
            submitHandler: function (form) {
                var transaction = 'import transmittal history';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Transmittal History Success', 'The transmittal history has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Transmittal History Error', 'The transmittal history file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Transmittal History Error', 'The transmittal history file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Transmittal History Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                transmittal_history_file: {
                    required: true
                },
            },
            messages: {
                transmittal_history_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import document form'){
        $('#importdocumentForm').validate({
            submitHandler: function (form) {
                var transaction = 'import document';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Document Success', 'The document has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Document Error', 'The document file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Document Error', 'The document file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Document Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                document_file: {
                    required: true
                },
            },
            messages: {
                document_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import department document permission form'){
        $('#importdepartmentdocumentpermissionForm').validate({
            submitHandler: function (form) {
                var transaction = 'import department document permission';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Department Permission Success', 'The department permission has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Department Permission Error', 'The department permission file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Department Permission Error', 'The department permission file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Department Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                department_permission_file: {
                    required: true
                },
            },
            messages: {
                department_permission_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import employee document permission form'){
        $('#importemployeedocumentpermissionForm').validate({
            submitHandler: function (form) {
                var transaction = 'import employee document permission';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Employee Permission Success', 'The employee permission has been imported.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_three_parameter('publish documents table', '', '', '', '#publish-document-datatable', 0, 'desc', [11]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Employee Permission Error', 'The employee permission file should not exceed 2mb.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Employee Permission Error', 'The employee permission file should only be a CSV file.', 'error');
                        }
                        else{
                            show_alert('Import Employee Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                employee_permission_file: {
                    required: true
                },
            },
            messages: {
                employee_permission_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'training room log form'){
        $('#trainingroomlogForm').validate({
            submitHandler: function (form) {
                transaction = 'submit training room log';
                var participants = $('#participants').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&participants=' + participants,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Training Room Log Success', 'The training room log has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Training Room Log Success', 'The training room log has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_two_parameter('training room log table', '', '', '#training-room-log-datatable', 0, 'asc', [11]);
                        }
                        else if(response === 'Overlap'){
                            show_alert('Training Room Log Error', 'The training room log overlaps with approved training room log.', 'error');
                        }
                        else if(response === 'Start Date'){
                            show_alert('Training Room Log Error', 'The start time cannot be greater than the end time.', 'error');
                        }
                        else if(response === 'Time-Out'){
                            show_alert('Training Room Log Error', 'The end time cannot be less than the start time.', 'error');
                        }
                        else{
                            show_alert('Training Room Log Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                participants: {
                    required: true
                },
                startdate: {
                    required: true
                },
                starttime: {
                    required: true
                },
                endtime: {
                    required: true
                },
                reason: {
                    required: true
                },
            },
            messages: {
                participants: {
                    required: 'Please choose at least one(1) participant',
                },
                startdate: {
                    required: 'Please choose start date',
                },
                starttime: {
                    required: 'Please choose start time',
                },
                endtime: {
                    required: 'Please choose end time',
                },
                reason: {
                    required: 'Please enter the purpose',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter employee attendance record'){
        $('#filteremployeeattendancerecordForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#employee-attendance-record-filter').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('employee attendance record table', startdate, enddate, '#employee-attendance-record-datatable', 0, 'desc', [11]);

                show_alert('Filter Attendance Record', 'The attendance record has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter employee attendance adjustment'){
        $('#filteremployeeattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#employee-attendance-adjustment-filter').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('employee attendance adjustment table', startdate, enddate, '#employee-attendance-adjustment-datatable', 0, 'desc', [8]);

                show_alert('Filter Attendance Adjustment', 'The attendance adjustment has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter attendance log'){
        $('#filterattendancelogForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('attendance logs table', '', '', '#attendance-record-datatable', 1, 'desc', [12], '1');

                show_alert('Filter Attendance Record', 'The attendance record has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'weekly cash flow form'){
        $('#weeklycashflowForm').validate({
            submitHandler: function (form) {
                transaction = 'submit weekly cash flow';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            $('#filter-text').text('');

                            if(response === 'Inserted'){
                                show_alert('Insert Weekly Cash Flow Success', 'The weekly cash flow has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Weekly Cash Flow Success', 'The weekly cash flow has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('weekly cash flow table', '', '#weekly-cash-flow-datatable', 2, 'desc', [5]);
                        }
                        else if(response === 'Monday'){
                            show_alert('Weekly Cash Flow Error', 'The weekly cash flow start date should be Monday.', 'error');
                        }
                        else if(response === 'Overlap'){
                            show_alert('Weekly Cash Flow Error', 'The weekly cash flow overlaps with other weekly cash flow.', 'error');
                        }
                        else{
                            show_alert('Weekly Cash Flow Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose start date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'weekly cash flow particulars form'){
        $('#weeklycashflowparticularsForm').validate({
            submitHandler: function (form) {
                transaction = 'submit weekly cash flow particulars';
                var wcfid = $('#wcf-id').text();
                document.getElementById('wcfloantype').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            $('#filter-text').text('');

                            if(response === 'Inserted'){
                                show_alert('Insert Weekly Cash Flow Particulars Success', 'The weekly cash flow particulars has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Weekly Cash Flow Particulars Success', 'The weekly cash flow particulars has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable_one_parameter('weekly cash flow particulars table', wcfid, '#weekly-cash-flow-particulars-datatable', 0, 'desc', [9]);
                        }
                        else{
                            show_alert('Weekly Cash Flow Particulars Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                details: {
                    required: true
                },
                wcftype: {
                    required: true
                },
                wcfloantype: {
                    required:  function(element){
                        var wcftype = $('#wcftype').val();

                        if(wcftype == 'LOAN'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                details: {
                    required: 'Please enter the particular',
                },
                wcftype: {
                    required: 'Please choose particular type',
                },
                wcfloantype: {
                    required: 'Please choose loan particular type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter weekly cash flow'){
        $('#filterweeklycashflowForm').validate({
            submitHandler: function (form) {
                var wcfperiod = $('#wcfperiod').val();
                var data = $('#wcfperiod').select2('data');

                sessionStorage.setItem('filter1', wcfperiod);

                $('#filter-text').text('Filtered by weekly cash flow period (' + data[0].text + ')');

                generate_datatable_one_parameter('weekly cash flow table', wcfperiod, '#weekly-cash-flow-datatable', 2, 'desc', [5]);

                show_alert('Filter Weekly cash Flow', 'The weekly cash flow period has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                wcfperiod: {
                    required: true
                },
            },
            messages: {
                wcfperiod: {
                    required: 'Please choose the weekly cash flow period',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter weekly cash flow summary'){
        $('#filterweeklycashflowsummaryForm').validate({
            submitHandler: function (form) {
                var wcfperiod = $('#wcfperiod').val();
                var data = $('#wcfperiod').select2('data');

                sessionStorage.setItem('filter1', wcfperiod);

                $('#filter-text').text('Filtered by weekly cash flow summary period (' + data[0].text + ')');

                var export_weekly_cash_flow_summary = check_permission('335');

                if(export_weekly_cash_flow_summary > 0){
                    generate_datatable_one_parameter('weekly cash flow summary table', wcfperiod, '#weekly-cash-flow-summary-datatable', 0, 'desc', '', '1');
                }
                else{
                    generate_datatable_one_parameter('weekly cash flow summary table', wcfperiod, '#weekly-cash-flow-summary-datatable', 0, 'desc', '');
                }

                show_alert('Filter Payroll', 'The weekly cash flow summary period has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                wcfperiod: {
                    required: true
                },
            },
            messages: {
                wcfperiod: {
                    required: 'Please choose the weekly cash flow period',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter training room log'){
        $('#filtertrainingroomlogForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('training room log table', startdate, enddate, '#training-room-log-datatable', 0, 'asc', [11]);

                show_alert('Filter Training Room Log', 'The training room log has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'ticket form'){
        $('#ticketForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit ticket';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Ticket Success', 'The ticket has been inserted.', 'success');

                            $('#System-Modal').modal('hide');

                            $('#filter-text').text('');
                            generate_datatable_three_parameter('ticket table', '', '', '', '#ticket-datatable', 0, 'desc', [14]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Ticket Error', 'The attachment file should not exceed max file size.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Ticket Error', 'The attachment file is not supported.', 'error');
                        }
                        else if(response === 'Due Date'){
                            show_alert('Ticket Error', 'The due date cannot be less than the current date.', 'error');
                        }
                        else{
                            show_alert('Ticket Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                ticketdepartment: {
                    required: true
                },
                category: {
                    required: true
                },
                duedate: {
                    required: true
                },
                duetime: {
                    required: true
                },
                subject: {
                    required: true
                },
                description: {
                    required: true
                },
            },
            messages: {
                ticketdepartment: {
                    required: 'Please choose the department',
                },
                category: {
                    required: 'Please choose the category',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
                duetime: {
                    required: 'Please choose the due time',
                },
                subject: {
                    required: 'Please enter the subject',
                },
                description: {
                    required: 'Please enter the description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update ticket form'){
        $('#updateticketForm').validate({
            submitHandler: function (form) {
                transaction = 'submit ticket update';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            $('#System-Modal').modal('hide');

                            if($('#ticket-datatable').length){
                                show_alert('Update Ticket Success', 'The ticket has been updated.', 'success');

                                $('#filter-text').text('');

                                generate_datatable_three_parameter('ticket table', '', '', '', '#ticket-datatable', 0, 'desc', [14]);
                            }
                            else{
                                show_alert_event('Update Ticket Success', 'The ticket has been updated.', 'success', 'reload');
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Ticket Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Ticket Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                ticketdepartment: {
                    required: true
                },
                category: {
                    required: true
                },
                duedate: {
                    required: true
                },
                subject: {
                    required: true
                },
                description: {
                    required: true
                },
            },
            messages: {
                ticketdepartment: {
                    required: 'Please choose the department',
                },
                category: {
                    required: 'Please choose the category',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
                subject: {
                    required: 'Please enter the subject',
                },
                description: {
                    required: 'Please enter the description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter ticket form'){
        $('#filterticketForm').validate({
            submitHandler: function (form) {
                var filterby = $('#filterby').val();
                var data = $('#filterby').select2('data');

                sessionStorage.setItem('filter1', filterby);

                if(filterby != ''){
                    $('#filter-text').text('Filtered ticket by '+ data[0].text);
                }
                else{
                    $('#filter-text').text('');
                }                

                generate_datatable_three_parameter('ticket table', filterby, '', '', '#ticket-datatable', 0, 'desc', [14]);

                show_alert('Filter Ticket', 'The ticket has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter ticket by date'){
        $('#filterticketbydateForm').validate({
            submitHandler: function (form) {
                var filterby = $('#filterby').val();
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();
                var data = $('#filterby').select2('data');

                sessionStorage.setItem('filter1', filterby);
                sessionStorage.setItem('filter2', startdate);
                sessionStorage.setItem('filter3', enddate);

                $('#filter-text').text('Filtered ticket by '+ data[0].text + ' (' + startdate + ' - ' + enddate + ')');

                generate_datatable_three_parameter('ticket table', filterby, startdate, enddate, '#ticket-datatable', 0, 'desc', [14]);

                show_alert('Filter Ticket', 'The ticket has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'reject ticket form'){
        $('#rejectticketForm').validate({
            submitHandler: function (form) {
                var transaction = 'reject ticket';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Rejected'){
                            $('#System-Modal').modal('hide');
                            
                            if($('#ticket-datatable').length){
                                show_alert('Reject Ticket', 'The ticket has been rejected.', 'success');

                                $('#filter-text').text('');

                                generate_datatable_three_parameter('ticket table', '', '', '', '#ticket-datatable', 0, 'desc', [14]);
                            }
                            else{
                                show_alert_event('Reject Ticket', 'The ticket has been rejected.', 'success', 'reload');
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Ticket Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Ticket Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason: {
                    required: true
                },
            },
            messages: {
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'cancel ticket form'){
        $('#cancelticketForm').validate({
            submitHandler: function (form) {
                var transaction = 'cancel ticket';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            $('#System-Modal').modal('hide');
                            
                            if($('#ticket-datatable').length){
                                show_alert('Cancel Ticket', 'The ticket has been cancelled.', 'success');

                                $('#filter-text').text('');

                                generate_datatable_three_parameter('ticket table', '', '', '', '#ticket-datatable', 0, 'desc', [14]);
                            }
                            else{
                                show_alert_event('Cancel Ticket', 'The ticket has been cancelled.', 'success', 'reload');
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Ticket Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Ticket Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason: {
                    required: true
                },
            },
            messages: {
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'ticket note form'){
        $('#ticketnoteForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit ticket note';
                var ticketid = $('#ticket-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Ticket Note', 'The ticket note has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            
                            generate_ticket_notes(ticketid);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Ticket Note Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Ticket Note Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                note: {
                    required: true
                },
            },
            messages: {
                note: {
                    required: 'Please enter the note',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'ticket attachment form'){
        $('#ticketattachmentForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit ticket attachment';
                var ticketid = $('#ticket-id').text();
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Ticket Attachment Success', 'The ticket attachment has been inserted.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('ticket attachment table', ticketid, '#ticket-attachment-datatable', 0, 'desc', [5]);
                        }
                        else if(response === 'File Size'){
                            show_alert('Ticket Attachment Error', 'The attachment file should not exceed max file size.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Ticket Attachment Error', 'The attachment file is not supported.', 'error');
                        }
                        else{
                            show_alert('Ticket Attachment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                'ticket_file[]': {
                    required: true
                },
            },
            messages: {
                'ticket_file[]': {
                    required: 'Please choose the ticket attachment',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'add ticket adjustment form'){
        $('#addticketadjustmentForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit ticket adjustment';
                var ticketid = $('#ticket-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Ticket Adjustment Success', 'The ticket adjustment has been inserted.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('ticket request table', ticketid, '#ticket-adjustment-datatable', 0, 'desc', [11]);
                        }
                        else{
                            show_alert('Ticket Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                priorityperson: {
                    required: true
                },
                category: {
                    required: true
                },
                priority: {
                    required: true
                },
                duedate: {
                    required: true
                },
                subject: {
                    required: true
                },
                description: {
                    required: true
                },
                reason: {
                    required: true
                },
            },
            messages: {
                priorityperson: {
                    required: 'Please choose the priority person',
                },
                category: {
                    required: 'Please choose the category',
                },
                priority: {
                    required: 'Please choose the priority',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
                subject: {
                    required: 'Please enter the subject',
                },
                description: {
                    required: 'Please enter the description',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update ticket adjustment form'){
        $('#updateticketadjustmentForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit ticket adjustment update';
                var ticketid = $('#ticket-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Ticket Adjustment Success', 'The ticket adjustment has been update.', 'success');

                            $('#System-Modal').modal('hide');

                            generate_datatable_one_parameter('ticket request table', ticketid, '#ticket-adjustment-datatable', 0, 'desc', [11]);
                        }
                        else{
                            show_alert('Ticket Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                priorityperson: {
                    required: true
                },
                category: {
                    required: true
                },
                priority: {
                    required: true
                },
                duedate: {
                    required: true
                },
                subject: {
                    required: true
                },
                description: {
                    required: true
                },
                reason: {
                    required: true
                },
            },
            messages: {
                priorityperson: {
                    required: 'Please choose the priority person',
                },
                category: {
                    required: 'Please choose the category',
                },
                priority: {
                    required: 'Please choose the priority',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
                subject: {
                    required: 'Please enter the subject',
                },
                description: {
                    required: 'Please enter the description',
                },
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'tag ticket as closed form'){
        $('#tagticketasclosedForm').validate({
            submitHandler: function (form) {
                var transaction = 'tag auto close ticket';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Closed'){
                            $('#System-Modal').modal('hide');
                            
                            if($('#ticket-datatable').length){
                                show_alert('Tag Ticket As Closed', 'The ticket has been tagged as closed.', 'success');

                                $('#filter-text').text('');

                                generate_datatable_three_parameter('ticket table', '', '', '', '#ticket-datatable', 0, 'desc', [14]);
                            }
                            else{
                                show_alert_event('Reject Ticket', 'The ticket has been rejected.', 'success', 'reload');
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Ticket Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Ticket Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                auto_close_reason: {
                    required: true
                },
            },
            messages: {
                auto_close_reason: {
                    required: 'Please enter the close reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
	 else if(formtype == 'car search parameter form'){
        $('#carsearchparameterForm').validate({
            submitHandler: function (form) {
                transaction = 'submit car search parameter';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Car Search Parameter Success', 'The car search parameter has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Car Search Parameter Success', 'The car search parameter has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('car search parameter table', '#car-search-parameter-datatable', 0, 'desc', [0]);
                        }
                        else{
                            show_alert('Car Search Parameter Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                parameter_code: {
                    required: true         
                },
                parameter_value: {
                    required: true         
                },
                category_type: {
                    required: true         
                },
            },
            messages: {
                parameter_code: {
                    required: 'Please enter the parameter code',
                },
                parameter_value: {
                    required: 'Please enter the parameter',
                },
                category_type: {
                    required: 'Please choose the category type',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import car search parameter form'){
        $('#importcarsearchparameterForm').validate({
            submitHandler: function (form) {
                var transaction = 'import car search parameter';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Car Search Parameter Success', 'The car search parameter has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('car search parameter table', '#car-search-parameter-datatable', 0, 'desc', [0]);
                        }
                        else{
                            show_alert('Import Car Search Parameter Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                car_search_parameter_file: {
                    required: true
                },
            },
            messages: {
                car_search_parameter_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'price index item form'){
        $('#priceindexitemForm').validate({
            submitHandler: function (form) {
                transaction = 'submit price index item';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            if(response === 'Inserted'){
                                show_alert('Insert Price Index Item Success', 'The price index item has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Price Index Item Success', 'The price index item has been updated.', 'success');
                            }

                            $('#System-Modal').modal('hide');
                            generate_datatable('price index item table', '#price-index-item-datatable', 0, 'asc', [2]);
                        }
                        else{
                            show_alert('Price Index Item Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                brand: {
                    required: true         
                },
                model: {
                    required: true         
                },
            },
            messages: {
                brand: {
                    required: 'Please choose the brand',
                },
                model: {
                    required: 'Please choose the model',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import price index item form'){
        $('#importpriceindexitemForm').validate({
            submitHandler: function (form) {
                var transaction = 'import price index item';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Price Index Item Success', 'The price index item has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('price index item table', '#price-index-item-datatable', 0, 'asc', [2]);
                        }
                        else{
                            show_alert('Import Price Index Item Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                price_index_item_file: {
                    required: true
                },
            },
            messages: {
                price_index_item_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'price index amount form'){
        $('#priceindexamountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit price index amount';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Price Index Amount Success', 'The price index amount has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('price index amount table', '#price-index-amount-datatable', 0, 'asc', [4]);
                        }
                        else if(response === 'Existed'){
                            show_alert('Price Index Amount Error', 'The price index amount already exists.', 'error');
                        }
                        else{
                            show_alert('Price Index Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                price_index_item: {
                    required: true         
                },
                year: {
                    required: true         
                },
                amount: {
                    required: true         
                },
            },
            messages: {
                price_index_item: {
                    required: 'Please choose the price index item',
                },
                year: {
                    required: 'Please choose the year',
                },
                amount: {
                    required: 'Please enter the amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'update price index amount form'){
        $('#updatepriceindexamountForm').validate({
            submitHandler: function (form) {
                transaction = 'submit price index amount update';
                document.getElementById('year').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            show_alert('Update Price Index Amount Success', 'The price index item has been updated.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('price index amount table', '#price-index-amount-datatable', 0, 'asc', [4]);
                        }
                        else{
                            show_alert('Price Index Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                amount: {
                    required: true         
                },
            },
            messages: {
                amount: {
                    required: 'Please enter the amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import price index amount form'){
        $('#importpriceindexamountForm').validate({
            submitHandler: function (form) {
                var transaction = 'import price index amount';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Price Index Amount Success', 'The price index amount has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                            generate_datatable('price index amount table', '#price-index-amount-datatable', 0, 'asc', [4]);
                        }
                        else{
                            show_alert('Import Price Index Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                price_index_amount_file: {
                    required: true
                },
            },
            messages: {
                price_index_amount_file: {
                    required: 'Please choose a file',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'add price index amount adjustment form'){
        $('#addpriceindexamountadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit price index amount adjustment';
                document.getElementById('year').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Price Index Amount Adjustment Success', 'The price index item adjustment has been updated.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'No Change'){
                            show_alert('Price Index Amount Error', 'There is no changes. Unable to add adjustment.', 'error');
                        }
                        else{
                            show_alert('Price Index Amount Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                amount: {
                    required: true         
                },
            },
            messages: {
                amount: {
                    required: 'Please enter the amount',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter attendance adjustment'){
        $('#filterattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('attendance adjustment summary table', startdate, enddate, '#attendance-adjustment-summary-datatable', 0, 'asc', '', '1');

                show_alert('Filter Attendance Adjustment', 'The attendance adjustment has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start datesdasdas',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
	// ===================changes lemar bill=====================================================






    //Purchasing Module

    //

    else if (formtype == "add item form") {

        $('#additemForm').validate({
            submitHandler: function (form) {
                transaction = 'insert item inventory';
                $('#additem_dept_owner').prop('disabled',false);
                
                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&transaction=' + transaction,
                    beforeSend: function () {
                       
                    },
                    success: function (response) {
                        var res = JSON.parse(response);

                        if (res.msg == 'add sucess') {
                            var sel_dept = $('#additem_dept_owner').val();

                            
                            show_alert_close_modals('Added',  res.msg, 'success')
                            
                            $('#dept_owner').val(sel_dept).change()//change the selected to recent added
                            var cols = [{ 'data': 'ITEM_ID' }, { 'data': 'BRAND' }, { 'data': 'MODEL' }, { 'data': 'DESCRIPTION' }, { 'data': 'CURR_STATUS' }, { 'data': 'CURR_ASSIGNED' }, { 'data': 'ACTION' }]
                            datatable_custom_param('inventory item table', '#item-inventory-datatable', { dept_owner: sel_dept }, cols, 0, 'asc', '');
                           
                            
                            generate_select_option('#item_cat', 'item category option', { dept_owner: sel_dept })
                           
                            setTimeout(() => {
                                $('#item_cat').val($('#additem_itemcategory').val()).change()
                            }, 1000);
                            setTimeout(() => {
                                $('#item-inventory-datatable_filter input').val('ITEM_'+res.new_item_id);
                            }, 2000);

 
                        } else {
                            show_alert('Error', response, 'error');

                        }

                        console.log(res);
                    }
                });
                return false;
            },
            rules: {
                additem_dept_owner: {
                    required: true
                },
                additem_itemcategory: {
                    required: true
                },
                additem_brand: {
                    required: true
                },
                additem_description: {
                    required: true
                },
                
            },
            messages: {
                additem_dept_owner: {
                    required: 'Please enter Department',
                },
                additem_itemcategory: {
                    required: 'Please enter Category',
                },
                additem_brand: {
                    required: 'Please enter Brand'
                },
                additem_description: {
                    required: 'Please enter the Item Description'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });




    }else if(formtype == 'edit item form'){

        $('#edititemForm').validate({
            submitHandler: function (form) {
                transaction = 'update item inventory';
                $('#edittem_dept_owner').prop('disabled',false);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&transaction=' + transaction,
                    beforeSend: function () {

                    },
                    success: function (response) {

                        if (response == 'edit sucess') {

                            //show_alert('Added', response, 'success');
                            show_alert_close_modals('Added', response, 'success')
                            var sel_dept = $('#edittem_dept_owner').val();
                            console.log(sel_dept);
                          
                            $('#dept_owner').val(sel_dept).change()//change the selected to recent added
                            var cols = [{ 'data': 'ITEM_ID' }, { 'data': 'BRAND' }, { 'data': 'MODEL' }, { 'data': 'DESCRIPTION' }, { 'data': 'CURR_STATUS' }, { 'data': 'CURR_ASSIGNED' }, { 'data': 'ACTION' }]
                            datatable_custom_param('inventory item table', '#item-inventory-datatable', { dept_owner: sel_dept }, cols, 0, 'asc', '');
                            generate_select_option('#item_cat', 'item category option', { dept_owner: sel_dept })

                            setTimeout(() => {
                                $('#item_cat').val($('#edititem_itemcategory').val()).change()
                            }, 1000);
                            setTimeout(() => {
                                $('#item-inventory-datatable_filter input').val('ITEM_'+$('#edititem_id').val())
                            }, 2000);
 
                        } else {
                            show_alert('Error', response, 'error');

                        }
                    }
                });
                return false;
            },
            rules: {
                edititem_dept_owner: {
                    required: true
                },
                edititem_itemcategory: {
                    required: true
                },
                edititem_brand: {
                    required: true
                },
                edititem_description: {
                    required: true
                },
                
            },
            messages: {
                edititem_dept_owner: {
                    required: 'Please enter Department',
                },
                edititem_itemcategory: {
                    required: 'Please enter Category',
                },
                edititem_brand: {
                    required: 'Please enter Brand'
                },
                edititem_description: {
                    required: 'Please enter the Item Description'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });

    }else if(formtype == 'dispose item form'){

        $('#disposeitemForm').validate({
            submitHandler: function (form) {
                transaction = 'dispose item inventory';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
                ajax_request('controller.php',data,function (response) {
                    if(response == 'dispose success'){
                        show_alert_close_modals('Diposed', response, 'success')
                        var sel_dept = $('#dept_owner').val()
                        var cols = [{ 'data': 'ITEM_ID' }, { 'data': 'BRAND' }, { 'data': 'MODEL' }, { 'data': 'DESCRIPTION' }, { 'data': 'CURR_STATUS' }, { 'data': 'CURR_ASSIGNED' }, { 'data': 'ACTION' }]
                        datatable_custom_param('inventory item table', '#item-inventory-datatable', { dept_owner: sel_dept }, cols, 0, 'asc', '');
                        generate_select_option('#item_cat', 'item category option', { dept_owner: sel_dept })
                    }else{
                        show_alert_close_modals('Added', response, 'error')
                    }
                })
                return false;
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });
        
    }else if(formtype == 'assign item form'){

        $('#assignitemForm').validate({
            submitHandler: function (form) {
                transaction = 'assign item inventory';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
                ajax_request('controller.php',data,function (response) {
                    

                    if(response=='assign sucess'){
                        //show_alert('Added', response, 'success');
                        show_alert_close_modals('Added', response, 'success')
                        var sel_dept = $('#edittem_dept_owner').val();
                        console.log(sel_dept);
                        
                        $('#dept_owner').val(sel_dept).change()//change the selected to recent added
                        var cols = [{ 'data': 'ITEM_ID' }, { 'data': 'BRAND' }, { 'data': 'MODEL' }, { 'data': 'DESCRIPTION' }, { 'data': 'CURR_STATUS' }, { 'data': 'CURR_ASSIGNED' }, { 'data': 'ACTION' }]
                        datatable_custom_param('inventory item table', '#item-inventory-datatable', { dept_owner: sel_dept }, cols, 0, 'asc', '');
                        generate_select_option('#item_cat', 'item category option', { dept_owner: sel_dept })

                        setTimeout(() => {
                            $('#item_cat').val($('#edititem_itemcategory').val()).change()
                        }, 1000);
                        setTimeout(() => {
                            $('#item-inventory-datatable_filter input').val('ITEM_'+$('#edititem_id').val())
                        }, 2000);
                    }
                    else{
                        show_alert_close_modals('', response, 'error')
                    }

                })
                return false;
                
            },
            rules: {
                assign_branch: {
                    required: true
                },
                assigndate: {
                    required: true
                },
                item_loc: {
                    required: true
                },
                
            },
            messages: {
                assign_branch: {
                    required: 'Please enter Branch',
                },
                assigndate: {
                    required: 'Please enter Date',
                },
                item_loc: {
                    required: 'Please enter Location'
                },
                
               
                
            },
            
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });



    }else if(formtype == 'return item form'){

        $('#returnitemForm').validate({
            submitHandler: function (form) {
                transaction = 'return item inventory';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
                ajax_request('controller.php',data,function (response) {
                    
                    console.log(response);
                    if(response=='return success'){
                        //show_alert('Added', response, 'success');
                        show_alert_close_modals('', response, 'success')
                        var sel_dept = $('#edittem_dept_owner').val();
                        console.log(sel_dept);
                        
                        $('#dept_owner').val(sel_dept).change()//change the selected to recent added/updated
                        var cols = [{ 'data': 'ITEM_ID' }, { 'data': 'BRAND' }, { 'data': 'MODEL' }, { 'data': 'DESCRIPTION' }, { 'data': 'CURR_STATUS' }, { 'data': 'CURR_ASSIGNED' }, { 'data': 'ACTION' }]
                        datatable_custom_param('inventory item table', '#item-inventory-datatable', { dept_owner: sel_dept }, cols, 0, 'asc', '');
                        generate_select_option('#item_cat', 'item category option', { dept_owner: sel_dept })

                        setTimeout(() => {
                            $('#item_cat').val($('#edititem_itemcategory').val()).change()
                        }, 1000);
                        setTimeout(() => {
                            $('#item-inventory-datatable_filter input').val('ITEM_'+$('#edititem_id').val())
                        }, 2000);
                    }else{
                        show_alert_close_modals('', response, 'error')
                    }

                })
                return false;
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });
    }

    else if (formtype == 'add category form') {

        $('#addcatForm').validate({
            submitHandler: function (form) {
                transaction = 'add item category';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
                ajax_request('controller.php',data,function (response) {
                    
                    console.log(response);
                    if(response=='add success'){

                        show_alert('Added', response, 'success');
                        show_alert_close_modals('', response, 'success')
                        var sel_dept = $('#additem_dept_owner_cat').val();
                        console.log(sel_dept);
                        
                        $('#dept_owner').val(sel_dept).change()//change the selected to recent added/updated
                        var cols  = [{'data': 'ITEM_CATEGORY'},{'data': 'CATEG_NAME'},{'data': 'ACTION'}]
                        datatable_custom_param('inventory category table','#item-category-datatable',{dept_owner_cat : sel_dept},cols,0,'asc','');
                        


                        setTimeout(() => {
                            $('#dept_owner_cat').val(sel_dept).change()
                        }, 1000);
                        setTimeout(() => {
                            $('#item-category-datatable_filter input').val($('#addcat_code').val())
                        }, 2000);

                    }else{
                        show_alert_close_modals('', response, 'error')
                    }

                })
                return false;
                
            },
            rules: {
                additem_dept_owner_cat: {
                    required: true
                },
                addcat_code: {
                    required: true
                },
                addcat_name: {
                    required: true
                },
                
            },
            messages: {
                additem_dept_owner_cat: {
                    required: 'Please enter Department',
                },
                addcat_code: {
                    required: 'Please enter Category Code',
                },
                addcat_name: {
                    required: 'Please enter Category Name'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });




        
    }else if (formtype =="assign dept category") {


        $('#assigncategForm').validate({
            submitHandler: function (form) {
                transaction = 'assign item category';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
              
                ajax_request('controller.php',data,function (response) {

                    if (response == "assign success") {
                        show_alert_close_modals('', response, 'success')
                    }else{
                        show_alert_close_modals('', response, 'error')
                    }
                })
                return false;
                
            },
            rules: {
                edititem_dept_owner_cat: {
                    required: true
                },
                editcat_code: {
                    required: true
                },
                editcat_name: {
                    required: true
                },
                
            },
            messages: {
                additem_dept_owner_cat: {
                    required: 'Please enter Department',
                },
                addcat_code: {
                    required: 'Please enter Category Code',
                },
                addcat_name: {
                    required: 'Please enter Category Name'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });



        

    }
    
    else if(formtype == "edit category form"){
        

        $('#editcatForm').validate({
            submitHandler: function (form) {
                transaction = 'edit item category';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
                var sel_dept = $('#edititem_dept_owner_cat').val();
              
                ajax_request('controller.php',data,function (response) {
                    
                    console.log(response);
                    if(response=='update success'){

                        show_alert('Added', response, 'success');
                        show_alert_close_modals('', response, 'success')
                      
                        
                        $('#dept_owner_cat').val(sel_dept).change()//change the selected to recent added/updated
                        var cols  = [{'data': 'ITEM_CATEGORY'},{'data': 'CATEG_NAME'},{'data': 'ACTION'}]
                        datatable_custom_param('inventory category table','#item-category-datatable',{dept_owner_cat : sel_dept},cols,0,'asc','');
                        


                        setTimeout(() => {
                            $('#dept_owner_cat').val(sel_dept).change()
                        }, 1000);
                        setTimeout(() => {
                            $('#item-category-datatable_filter input').val($('#editcat_code').val())
                        }, 2000);

                    }else{
                        show_alert_close_modals('', response, 'error')
                    }

                })
                return false;
                
            },
            rules: {
                edititem_dept_owner_cat: {
                    required: true
                },
                editcat_code: {
                    required: true
                },
                editcat_name: {
                    required: true
                },
                
            },
            messages: {
                additem_dept_owner_cat: {
                    required: 'Please enter Department',
                },
                addcat_code: {
                    required: 'Please enter Category Code',
                },
                addcat_name: {
                    required: 'Please enter Category Name'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });
    }
    else if(formtype == "delete category form"){

        $('#deletecategForm').validate({
            submitHandler: function (form) {
                transaction = 'delete item category';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
               
              
                ajax_request('controller.php',data,function (response) {
                    
                    console.log(response);
                    if(response=='delete success'){

                        show_alert('Deleted', response, 'success');
                        show_alert_close_modals('', response, 'success')
                    
                        var sel_dept = $('#dept_owner_cat').val()//change the selected to recent added/updated
                        var cols  = [{'data': 'ITEM_CATEGORY'},{'data': 'CATEG_NAME'},{'data': 'ACTION'}]
                        datatable_custom_param('inventory category table','#item-category-datatable',{dept_owner_cat : sel_dept},cols,0,'asc','');
                    

                    }else{
                        show_alert_close_modals('', response, 'error')
                    }

                })
                return false;
                
            }
        });
    }
    
    else if(formtype == 'announcement form'){
    $('#announcementForm').validate({
        submitHandler: function (form) {
            transaction = 'submit announcement';
            
            var formData = new FormData(form);
            formData.append('username', username);
            formData.append('transaction', transaction);

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function(){
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                },
                success: function (response) {
                    if(response === 'Updated' || response === 'Inserted'){
                        if(response === 'Inserted'){
                            show_alert('Insert Announcement Success', 'The announcement has been inserted.', 'success');
                        }
                        else{
                            show_alert('Update Announcement Success', 'The announcement has been updated.', 'success');
                        }

                        $('#System-Modal').modal('hide');
                        generate_datatable('announcement table', '#announcement-datatable', 0, 'desc', [1]);
                    }
                    else{
                        show_alert('Announcement Error', response, 'error');
                    }
                },
                complete: function(){
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });
            return false;
        },
        rules: {
            title: {
                required: true         
            },
            content: {
                required: true         
            },
            type: {
                required: true         
            },
            start_date: {
                required: true         
            }
        },
        messages: {
            title: {
                required: 'Please enter the title',
            },
            content: {
                required: 'Please enter the content',
            },
            type: {
                required: 'Please select the type',
            },
            start_date: {
                required: 'Please select the start date',
            }
        },
        errorPlacement: function(label, element) {
            if(element.hasClass('form-select') && element.next('.select2-container').length) {
                label.insertAfter(element.next('.select2-container'));
            }
            else if(element.parent('.input-group').length){
                label.insertAfter(element.parent());
            }
            else{
                label.insertAfter(element);
            }
        },
        highlight: function(element) {
            $(element).parent().addClass('has-danger');
            $(element).addClass('form-control-danger');
        },
        success: function(label,element) {
            $(element).parent().removeClass('has-danger')
            $(element).removeClass('form-control-danger')
            label.remove();
        }
    });
}


    else if(formtype == "add brand form"){
        $('#addbrandForm').validate({
            submitHandler: function (form) {

                transaction = 'add brand';                

                var data  = $(form).serialize() + '&transaction=' + transaction;
              
                ajax_request('controller.php',data,function (response) {
                    
                    console.log(response);
                    if(response.msg=='add success'){

                        show_alert_close_modals('', response.msg, 'success')
                        
                        var cols  = [{'data': 'BRAND_CODE'},{'data': 'BRANDNAME'},{'data': 'ACTION'}]
                        datatable_custom_param('inventory brand table','#item-brand-datatable',null,cols,0,'asc','');
                        
                        setTimeout(() => {
                            $('#item-brand-datatable_filter input').val($('#addbrand_code').val())
                        }, 1000);

                    }else{
                        show_alert_close_modals('', JSON.stringify(response.msg), 'error')
                    }

                })
                return false;
                
            },
            rules: {
                
                editcat_code: {
                    required: true
                },
                editcat_name: {
                    required: true
                },
                
            },
            messages: {
                addcat_code: {
                    required: 'Please enter Brand Code',
                },
                addcat_name: {
                    required: 'Please enter Brand Name'
                },
               
                
            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {
               

            }
        });
    }

    else if (formtype == "edit brand form") {
        $('#editbrandForm').validate({
            submitHandler: function (form) {


                transaction = 'edit brand';

                var data = $(form).serialize() + '&transaction=' + transaction;
                var sel_dept = $('#editbrand_dept_owner').val();
                var sel_cat = $('#editbrand_cat').val();

                ajax_request('controller.php', data, function (response) {

                    console.log(response);
                    if (response.msg == 'edit success') {


                        show_alert_close_modals('Updated', response.msg, 'success')


                        $('#dept_owner_brand').val(sel_dept).change()//change the selected to recent added/updated
                        var cols = [{ 'data': 'BRAND_CODE' }, { 'data': 'BRANDNAME' }, { 'data': 'ACTION' }]
                        datatable_custom_param('inventory brand table', '#item-brand-datatable', { dept_owner_brand: sel_dept }, cols, 0, 'asc', '');


                        setTimeout(() => {
                            $('#brand_cat').val(sel_cat).change()
                        }, 1000);
                        setTimeout(() => {
                            $('#item-brand-datatable_filter input').val($('#editbrand_code').val())
                        }, 2000);
                    } else {
                        show_alert_close_modals('', JSON.stringify(response.msg), 'error')
                    }

                })
                return false;

            },
            rules: {
                editbrand_dept_owner: {
                    required: true
                },
                editcat_code: {
                    required: true
                },
                editcat_name: {
                    required: true
                },

            },
            messages: {
                editbrand_dept_owner: {
                    required: 'Please enter Department',
                },
                editcat_code: {
                    required: 'Please enter Category Code',
                },
                editcat_name: {
                    required: 'Please enter Category Name'
                },


            },
            errorPlacement: function (label, element) {
                if (element.hasClass('web-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.input-group'));
                }
                else if (element.parent('.input-group').length) {
                    label.insertAfter(element.parent());
                }
                else {
                    label.insertAfter(element);
                }
            },
            highlight: function (element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function (label, element) {


            }
        });
    }else if(formtype == "delete brand form"){

        $('#deletebrandForm').validate({
            submitHandler: function (form) {


                transaction = 'delete brand';

                var data = $(form).serialize() + '&transaction=' + transaction;
              
                ajax_request('controller.php', data, function (response) {

                    show_alert_close_modals('Deleted', response.msg, 'success')


                    var selected_dept =  $('#dept_owner_brand').val()//change the selected to recent added/updated
                    var sel_cat =   $('#brand_cat').val()
                    var cols = [{ 'data': 'BRAND_CODE' }, { 'data': 'BRANDNAME' }, { 'data': 'ACTION' }]
                    datatable_custom_param('inventory brand table', '#item-brand-datatable', { dept_owner_brand: selected_dept }, cols, 0, 'asc', '');


                    setTimeout(() => {
                        $('#brand_cat').val(sel_cat).change()
                    }, 1000);
                    setTimeout(() => {
                        $('#item-category-datatable_filter input').val($('#addcat_code').val())
                    }, 2000);
                  

                })
                return false;
            },
        });
    }

    else if(formtype == "assign brand form"){

        $('#assignbrandForm').validate({
            submitHandler: function (form) {


                transaction = 'assign category brand';

                var data = $(form).serialize() + '&transaction=' + transaction;
              
                ajax_request('controller.php', data, function (response) {

                    console.log(response);

                    show_alert_close_modals('Assigned', response.msg, 'success')

                  //  var selected_dept =  $('#dept_owner_brand').val()//change the selected to recent added/updated
                   // var sel_cat =   $('#brand_cat').val()
                    //var cols = [{ 'data': 'BRAND_CODE' }, { 'data': 'BRANDNAME' }, { 'data': 'ACTION' }]
                    //var cols  = [{'data': 'CATEG_NAME'},{'data': 'ACTION'}]
                   // datatable_custom_param('inventory assign cat brand table','#item-assign-cat-brand-datatable',null,cols,0,'asc','');


                    // setTimeout(() => {
                    //    // $('#brand_cat').val(sel_cat).change()
                    // }, 1000);
                    // setTimeout(() => {
                    //     $('#item-category-datatable_filter input').val($('#addcat_code').val())
                    // }, 2000);
                  

                })
                return false;
            },
        });




    }
	
	
	
	else if(formtype == "upload item image form"){
        $('#uploaditemimageForm').validate({
            submitHandler: function (form) {

                var transaction = 'upload item image';
                var item_id = $('#edititem_id').val()
                //var data = $(form).serialize() + '&transaction=' + transaction;
                var formData = new FormData(form);
                formData.append('transaction', transaction);
                formData.append('item_id', item_id);
               
              
                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('btn_upload_image_item').disabled = true;
                        $('#btn_upload_image_item').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                       
                       var mess = JSON.parse(response)
                       let text = mess.toString();
                       
                        if(text.includes("this file is")){
                            show_alert('Warning',text,'info')
                        }else{
                            show_alert('Uploaded',text,'success')
                        }

                        show_item_image(item_id,username)
                              
                    },
                    complete: function(){
                        document.getElementById('btn_upload_image_item').disabled = false;
                        $('#btn_upload_image_item').html('Submit');
                      
                        //$("#mdl_item_images").modal("hide");
                    }
                });
                return false;
            },
        });
    }
	
	


// ===============================changes lemar bill ===================================end


    else if(formtype == 'filter telephone log summary'){
        $('#filtertelephonelogsummaryForm').validate({
            submitHandler: function (form) {
                var filterby = $('#filterby').val();
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();
                var data = $('#filterby').select2('data');

                sessionStorage.setItem('filter1', filterby);
                sessionStorage.setItem('filter2', startdate);
                sessionStorage.setItem('filter3', enddate);

                $('#filter-text').text('Filtered ticket by '+ data[0].text + ' (' + startdate + ' - ' + enddate + ')');

                generate_datatable_three_parameter('telephone log summary table', filterby, startdate, enddate, '#telephone-log-summary-datatable', 0, 'desc', '');

                show_alert('Filter Telephone Log Summary', 'The telephone log summary has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'import employee document form'){
        $('#importemployeedocumentForm').validate({
            submitHandler: function (form) {
                transaction = 'submit employee document import';
                var docemployee = [];
                var documentname = [];
                var category = [];
                var documentnote = [];

                $('.docemployee').each(function(){
                    if(this.value != ''){  
                        docemployee.push(this.value);  
                    }
                });

                $('.documentname').each(function(){
                    if(this.value != ''){  
                        documentname.push(this.value);  
                    }
                });

                $('.category').each(function(){
                    if(this.value != ''){  
                        category.push(this.value);  
                    }
                });

                $('.documentnote').each(function(){
                    if(this.value != ''){  
                        documentnote.push(this.value);  
                    }
                });

                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);
                formData.append('docemployee', docemployee);
                formData.append('documentname', documentname);
                formData.append('category', category);
                formData.append('documentnote', documentnote);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Imported'){
                            show_alert('Import Employee Document', 'The employee document has been imported.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Limit'){
                            show_alert('Import Employee Document Error', 'The maximum upload should only be up to 10 documents.', 'error');
                        }
                        else if(response === 'File Size'){
                            show_alert('Import Employee Document Error', 'The document should not exceed max file size.', 'error');
                        }
                        else if(response === 'File Type'){
                            show_alert('Import Employee Document Error', 'The document is not supported.', 'error');
                        }
                        else{
                            show_alert('Import Employee Document Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'health declaration form'){
        $('#healthdeclarationForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit health declaration';
                document.getElementById('specific').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');
                            show_alert_event('Health Declaration', 'The health declaration has been inserted.', 'success', 'reload');
                        }
                        else{
                            show_alert('Health Declaration Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                temperature: {
                    required: true
                },
                specific: {
                    required:  function(element){
                        var question5 = $('#question5').val();

                        if(question5 == '1'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                temperature: {
                    required: 'Please enter the temperature',
                },
                specific: {
                    required: 'Please enter the specific place',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter health declaration summary'){
        $('#filterhealtdeclarationsummaryForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                var export_health_declaration_summary = check_permission('295');

                if(export_health_declaration_summary > 0){
                    generate_datatable_two_parameter('health declaration summary table', startdate, enddate, '#health-declaration-summary-datatable', 1, 'desc', '', '1');
                }
                else{
                    generate_datatable_two_parameter('health declaration summary table', startdate, enddate, '#health-declaration-summary-datatable', 1, 'desc', '');
                }

                show_alert('Filter Health Declaration Summary', 'The health declaration summary has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'approve attendance adjustment leave form'){
        $('#approveattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'approve employee attendance adjustment request';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Approved'){
                            show_alert('Approve Attendance Adjustment Success', 'The attendance adjustment has been approved.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#attendance-adjustment-datatable').length){
                                generate_datatable('attendance adjustment table', '#attendance-adjustment-datatable', 0, 'desc', [10]);
                            }

                            if($('#attendance-adjustment-recommendation-datatable').length){
                                generate_datatable('attendance adjustment recommendation table', '#attendance-adjustment-recommendation-datatable', 0, 'desc', [8]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Approve Attendance Adjustment Error', 'The attendance adjustment does not exist.', 'info');
                        }
                        else{
                            show_alert('Approve Attendance Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'reject attendance adjustment leave form'){
        $('#rejectattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'reject employee attendance adjustment request';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Rejected'){
                            show_alert('Reject Attendance Adjustment Success', 'The attendance adjustment has been rejected.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#attendance-adjustment-datatable').length){
                                generate_datatable('attendance adjustment table', '#attendance-adjustment-datatable', 0, 'desc', [10]);
                            }

                            if($('#attendance-adjustment-recommendation-datatable').length){
                                generate_datatable('attendance adjustment recommendation table', '#attendance-adjustment-recommendation-datatable', 0, 'desc', [8]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Reject Attendance Adjustment Error', 'The attendance adjustment does not exist.', 'info');
                        }
                        else{
                            show_alert('Reject Attendance Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'cancel attendance adjustment leave form'){
        $('#cancelattendanceadjustmentForm').validate({
            submitHandler: function (form) {
                transaction = 'cancel employee attendance adjustment request';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            show_alert('Cancel Attendance Adjustment Success', 'The attendance adjustment has been cancelled.', 'success');

                            $('#System-Modal').modal('hide');

                            if($('#attendance-adjustment-datatable').length){
                                generate_datatable('attendance adjustment table', '#attendance-adjustment-datatable', 0, 'desc', [10]);
                            }

                            if($('#attendance-adjustment-recommendation-datatable').length){
                                generate_datatable('attendance adjustment recommendation table', '#attendance-adjustment-recommendation-datatable', 0, 'desc', [8]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Cancel Attendance Adjustment Error', 'The attendance adjustment does not exist.', 'info');
                        }
                        else{
                            show_alert('Cancel Attendance Adjustment Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting form'){
        $('#meetingForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting';
                var attendees = $('#attendees').val();
                var absentees = $('#absentees').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&attendees=' + attendees + '&absentees=' + absentees,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            $('#System-Modal').modal('hide');
                            $('#filter-text').text('');

                            if(response === 'Inserted'){
                                show_alert('Insert Meeting Success', 'The meeting has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Meeting Success', 'The meeting has been updated.', 'success');
                            }

                            generate_datatable('meeting table', '#meeting-datatable', 0, 'desc', [8]);
                        }
                        else{
                            show_alert('Meeting Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                meetingtitle: {
                    required: true
                },
                meetingtype: {
                    required: true
                },
                meetingdate: {
                    required: true
                },
                starttime: {
                    required: true
                },
                endtime: {
                    required: true
                },
                presider: {
                    required: true
                },
                notedby: {
                    required: true
                },
                attendees: {
                    required: true
                },
            },
            messages: {
                meetingtitle: {
                    required: 'Please enter the meeting title',
                },
                meetingtype: {
                    required: 'Please choose the meeting type',
                },
                meetingdate: {
                    required: 'Please choose the meeting date',
                },
                starttime: {
                    required: 'Please choose the start time',
                },
                endtime: {
                    required: 'Please choose the end time',
                },
                presider: {
                    required: 'Please choose the meeting presider',
                },
                notedby: {
                    required: 'Please choose the noted by',
                },
                attendees: {
                    required: 'Please choose at least one(1) attendee',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'filter meeting'){
        $('#filtermeetingForm').validate({
            submitHandler: function (form) {
                var startdate = $('#startdate').val();
                var enddate = $('#enddate').val();

                sessionStorage.setItem('filter1', startdate);
                sessionStorage.setItem('filter2', enddate);

                $('#filter-text').text('Filtered by date ' + startdate + ' - ' + enddate);

                generate_datatable_two_parameter('meeting table', startdate, enddate, '#meeting-datatable', 0, 'desc', [8]);

                show_alert('Filter Meeting', 'The meeting has been filtered.', 'success');

                $('#System-Modal').modal('hide');
                
                return false;
            },
            rules: {
                startdate: {
                    required: true
                },
                enddate: {
                    required: true
                },
            },
            messages: {
                startdate: {
                    required: 'Please choose the start date',
                },
                enddate: {
                    required: 'Please choose the end date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting permission form'){
        $('#meetingpermissionForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting permission';
                var meetingid = sessionStorage.getItem('meetingid');
                var permission = [];
        
                $('.employee-meeting-permission').each(function(){
                    if($(this).is(':checked')){  
                        permission.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid + '&permission=' + permission,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert('Assign Meeting Permission Success', 'The permission has been assigned to the employee.', 'success');

                            $('#System-Modal').modal('hide');

                            $('#filter-text').text('');

                            if($('#publish-document-datatable').length){
                                generate_datatable('meeting table', '#meeting-datatable', 0, 'desc', [8]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Meeting Permission Error', 'The document does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Meeting Permission Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'meeting note form'){
        $('#meetingnoteForm').validate({
            submitHandler: function (form) {
                var transaction = 'submit meeting note';
                var meetingid = $('#meeting-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            show_alert('Insert Meeting Note', 'The ticket note has been inserted.', 'success');

                            $('#System-Modal').modal('hide');
                            
                            generate_meeting_notes(meetingid);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Meeting Note Error', 'The ticket does not exist.', 'info');
                        }
                        else{
                            show_alert('Meeting Note Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                note: {
                    required: true
                },
            },
            messages: {
                note: {
                    required: 'Please enter the note',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting task form'){
        $('#meetingagendataskForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting task';
                var meetingid = $('#meeting-id').text();
                var meetingemployee = $('#meetingemployee').val();
                document.getElementById('duedate').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid + '&meetingemployee=' + meetingemployee,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            show_alert('Insert Meeting Discussion Success', 'The meeting discussion has been inserted.', 'success');

                            generate_datatable_one_parameter('meeting task table', meetingid, '#meeting-task-datatable', 2, 'asc', [6]);
                        }
                        else{
                            show_alert('Meeting Discussion Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                task: {
                    required: true
                },
                meetingemployee: {
                    required: true
                },
                agenda: {
                    required: true
                },
                taskstatus: {
                    required: true
                },
                duedatetype: {
                    required: true
                },
                duedate: {
                    required:  function(element){
                        var duedatetype = $('#duedatetype').val();
    
                        if(duedatetype == 'SPECIFICDATE'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                task: {
                    required: 'Please enter the point of discussion',
                },
                meetingemployee: {
                    required: 'Please choose the person responsible',
                },
                agenda: {
                    required: 'Please choose the meeting agenda',
                },
                taskstatus: {
                    required: 'Please choose the task status',
                },
                duedatetype: {
                    required: 'Please choose the due date type',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting task update form'){

        $('#meetingagendataskupdateForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting task update';
                var meetingid = $('#meeting-id').text();
                document.getElementById('duedate').disabled = false;

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            $('#System-Modal').modal('hide');

                            show_alert('Update Meeting Discussion Success', 'The meeting discussion has been updated.', 'success');

                            generate_datatable_one_parameter('meeting task table', meetingid, '#meeting-task-datatable', 2, 'asc', [6]);
                        }
                        else if(response === 'Not Found'){
                            show_alert('Meeting Discussion Error', 'The meeting discussion does not exist.', 'error');
                        }
                        else{
                            show_alert('Meeting Discussion Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                task: {
                    required: true
                },
                meetingemployee: {
                    required: true
                },
                meetingdepartment: {
                    required: true
                },
                agenda: {
                    required: true
                },
                taskstatus: {
                    required: true
                },
                duedatetype: {
                    required: true
                },
                duedate: {
                    required:  function(element){
                        var duedatetype = $('#duedatetype').val();
    
                        if(duedatetype == 'SPECIFICDATE'){
                            return true;
                        }
                        else{
                            return false;
                        }
                    }
                },
            },
            messages: {
                task: {
                    required: 'Please enter the point of discussion',
                },
                meetingemployee: {
                    required: 'Please choose the person responsible',
                },
                meetingdepartment: {
                    required: 'Please choose the department',
                },
                agenda: {
                    required: 'Please choose the meeting agenda',
                },
                taskstatus: {
                    required: 'Please choose the task status',
                },
                duedatetype: {
                    required: 'Please choose the due date type',
                },
                duedate: {
                    required: 'Please choose the due date',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
        
    }
    else if(formtype == 'add previous discussion to agenda form'){
        $('#addpreviousiscussiontoagendaForm').validate({
            submitHandler: function (form) {
                transaction = 'submit previous discussion';
                var meetingid = $('#meeting-id').text();
                var previousmeeting = $('#previousmeeting').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid + '&previousmeeting=' + previousmeeting,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            show_alert('Add Previous Discussion', 'The previous discussion has been added.', 'success');

                            generate_datatable_one_parameter('meeting task table', meetingid, '#meeting-task-datatable', 2, 'asc', [6]);
                        }
                        else{
                            show_alert('Meeting Discussion Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                meetingagenda: {
                    required: true
                },
            },
            messages: {
                meetingagenda: {
                    required: 'Please choose the agenda',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting memo form'){
        $('#meetingmemoForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting memo';
                var meetingid = $('#meeting-id').text();
                var memo = $('#memo').val();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid + '&memo=' + memo,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            show_alert('Insert Memos & Procedures Success', 'The memo & procedure has been inserted.', 'success');

                            generate_datatable_one_parameter('meeting memo table', meetingid, '#meeting-memo-datatable', 0, 'asc', [1]);
                        }
                        else{
                            show_alert('Memos & Procedures Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                memo: {
                    required: true
                },
            },
            messages: {
                memo: {
                    required: 'Please choose at least one(1) memo',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting other matters form'){
        $('#meetingothermattersForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting other matters';
                var meetingid = $('#meeting-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            show_alert('Insert Other Matters Success', 'The other matters has been inserted.', 'success');

                            generate_datatable_one_parameter('meeting other matters table', meetingid, '#meeting-other-matters-datatable', 0, 'asc', [1]);
                        }
                        else{
                            show_alert('Other Matters Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'meeting other matters update form'){
        $('#meetingothermattersupdateForm').validate({
            submitHandler: function (form) {
                transaction = 'submit meeting other matters update';
                var meetingid = $('#meeting-id').text();

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&meetingid=' + meetingid,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated'){
                            $('#System-Modal').modal('hide');

                            show_alert('Update Other Matters Success', 'The other matters has been upodated.', 'success');

                            generate_datatable_one_parameter('meeting other matters table', meetingid, '#meeting-other-matters-datatable', 0, 'asc', [1]);
                        }
                        else{
                            show_alert('Other Matters Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                othermatters: {
                    required: true
                },
            },
            messages: {
                othermatters: {
                    required: 'Please enter the other matters',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    
    
    else if(formtype == 'overtime form'){
    $('#overtimeForm').validate({
        submitHandler: function (form) {
            transaction = 'submit overtime';
            var employee_profile_employee_id = $('#employee-profile-employee-id').text();
 
            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: $(form).serialize() + '&username=' + username + '&employeeid=' + employee_profile_employee_id + '&transaction=' + transaction,
                beforeSend: function(){
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"></div>');
                },
                success: function (response) {
                    console.log("Submit Response: ", response);

                    if(response === 'Updated' || response === 'Inserted'){
                        $('#System-Modal').modal('hide');
                        $('#filter-text').text('');

                        if(response === 'Inserted'){
                            show_alert('Insert Overtime Success', 'The overtime has been inserted.', 'success');
                        }
                        else{
                            show_alert('Update Overtime Success', 'The overtime has been updated.', 'success');
                        }

                        generate_datatable_two_parameter('overtime table', '', '', '#overtime-datatable', 0, 'desc', [10]);
                    }
                    else{
                        show_alert('Overtime Error', response, 'error');
                    }
                },
                      error: function(xhr, status, error) {
                    console.error("AJAX Error - Status:", status);
                    console.error("AJAX Error - Error:", error);
                    console.error("AJAX Error - Response Text:", xhr.responseText);
                    alert("Server Response: " + xhr.responseText);
                },


                complete: function(){
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });
            return false;
        },
        rules: {
            overtimetitle: {
                required: true
            },
             holidaytype: {
                required: true
            },
             overtimedate: {
                required: true
            },
             starttime: {
                required: true
            },
             endtime: {
                required: true
            },
             reason: {
                required: true
            }
        },
        messages: {
            overtimetitle: {
                required: 'Please enter the title',
            },
            holidaytype: {
                required: 'Please enter the holiday',
            },  
            overtimedate: {
                required: 'Please enter the Overtime date',
            },  
            overtimedate: {
                required: 'Please enter the Start date',
            },  
            starttime: {
                required: 'Please enter the Start time',
            },  
            endtime: {
                required: 'Please enter the End time',
            },  
            reason: {
                required: 'Please enter the reason',
            }
        },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    
    else if(formtype == 'training form'){
        $('#trainingForm').validate({
            submitHandler: function (form) {
                transaction = 'submit training';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            $('#System-Modal').modal('hide');
                            $('#filter-text').text('');

                            if(response === 'Inserted'){
                                show_alert('Insert Training Success', 'The training has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Training Success', 'The training has been updated.', 'success');
                            }

                            generate_datatable_two_parameter('training table', '', '', '#training-datatable', 0, 'desc', [10]);
                        }
                        else{
                            show_alert('Training Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                trainingtitle: {
                    required: true
                },
                trainingtype: {
                    required: true
                },
                trainingdate: {
                    required: true
                },
                starttime: {
                    required: true
                },
                endtime: {
                    required: true
                },
                description: {
                    required: true
                },
            },
            messages: {
                trainingtitle: {
                    required: 'Please enter the title',
                },
                trainingtype: {
                    required: 'Please choose the type',
                },
                trainingdate: {
                    required: 'Please choose the training date',
                },
                starttime: {
                    required: 'Please choose the start time',
                },
                endtime: {
                    required: 'Please choose the end time',
                },
                description: {
                    required: 'Please enter the description',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'training attendees form'){
        $('#trainingattendeesForm').validate({
            submitHandler: function (form) {
                transaction = 'submit training attendees';
                var trainingid = sessionStorage.getItem('trainingid');
                var user = [];
        
                $('.role-user').each(function(){
                    if($(this).is(':checked')){  
                        user.push(this.value);  
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction + '&trainingid=' + trainingid + '&user=' + user,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Assigned'){
                            show_alert('Assign Training Attendees Success', 'The employees has been assigned to the training attendees.', 'success');

                            $('#System-Modal').modal('hide');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Assign Training Attendees Error', 'The training does not exist.', 'error');

                            $('#System-Modal').modal('hide');
                        }
                        else{
                            show_alert('Assign Training Attendees Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            }
        });
    }
    else if(formtype == 'reject training form'){
        $('#rejecttrainingForm').validate({
            submitHandler: function (form) {
                var transaction = 'reject training';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Rejected'){
                            $('#System-Modal').modal('hide');

                            show_alert('Reject Training', 'The training has been rejected.', 'success');

                            if($('#training-recommendation-datatable').length){
                                generate_datatable('training recommendation table', '#training-recommendation-datatable', 0, 'desc', [6]);
                            }

                            if($('#training-approval-datatable').length){
                                generate_datatable('training approval table', '#training-approval-datatable', 0, 'desc', [6]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Training Error', 'The training does not exist.', 'info');
                        }
                        else{
                            show_alert('Training Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason: {
                    required: true
                },
            },
            messages: {
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    else if(formtype == 'cancel training form'){
        $('#canceltrainingForm').validate({
            submitHandler: function (form) {
                var transaction = 'cancel training';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            $('#System-Modal').modal('hide');
                            
                            if($('#training-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('training table', '', '', '#training-datatable', 0, 'desc', [10]);
                            }

                            if($('#training-datatable').length){
                                generate_datatable('training recommendation table', '#training-recommendation-datatable', 0, 'desc', [6]);
                            }

                            if($('#training-approval-datatable').length){
                                generate_datatable('training approval table', '#training-approval-datatable', 0, 'desc', [6]);
                            }

                            show_alert('Cancel Training', 'The training has been cancelled.', 'success');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Training Error', 'The training does not exist.', 'info');
                        }
                        else{
                            show_alert('Training Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason: {
                    required: true
                },
            },
            messages: {
                reason: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
     else if(formtype == 'cancel overtime form'){
        $('#cancelovertimeForm').validate({
            submitHandler: function (form) {
                var transaction = 'cancel overtime';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Cancelled'){
                            $('#System-Modal').modal('hide');
                            
                            if($('#overtime-datatable').length){
                                $('#filter-text').text('');
                                generate_datatable_two_parameter('overtime table', '', '', '#overtime-datatable', 0, 'desc', [10]);
                            }

                            if($('#overtime-datatable').length){
                                generate_datatable('overtime recommendation table', '#overtime-recommendation-datatable', 0, 'desc', [6]);
                            }

                            if($('#overtime-approval-datatable').length){
                                generate_datatable('overtime approval table', '#overtime-approval-datatable', 0, 'desc', [6]);
                            }

                            show_alert('Cancel Overtime', 'The overtime has been cancelled.', 'success');
                        }
                        else if(response === 'Not Found'){
                            show_alert('Overtime Error', 'The overtime does not exist.', 'info');
                        }
                        else{
                            show_alert('Overtime Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason_cancellation: {
                    required: true
                },
            },
            messages: {
                reason_cancellation: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    
    else if(formtype == 'reject overtime form'){
        $('#rejectovertimeForm').validate({
            submitHandler: function (form) {
                var transaction = 'reject overtime';
                
                var formData = new FormData(form);
                formData.append('username', username);
                formData.append('transaction', transaction);

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: formData,
                    processData: false,
                    contentType: false,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Rejected'){
                            $('#System-Modal').modal('hide');

                            show_alert('Reject Overtime', 'The overtime has been rejected.', 'success');

                            if($('#overtime-recommendation-datatable').length){
                                generate_datatable('overtime recommendation table', '#overtime-recommendation-datatable', 0, 'desc', [6]);
                            }

                            if($('#overtime-approval-datatable').length){
                                generate_datatable('overtime approval table', '#overtime-approval-datatable', 0, 'desc', [6]);
                            }
                        }
                        else if(response === 'Not Found'){
                            show_alert('Overtime Error', 'The overtime does not exist.', 'info');
                        }
                        else{
                            show_alert('Overtime Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                
                return false;
            },
            rules: {
                reason_cancellation: {
                    required: true
                },
            },
            messages: {
                reason_cancellation: {
                    required: 'Please enter the reason',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
    
    else if(formtype == 'training report form'){
        $('#trainingreportForm').validate({
            submitHandler: function (form) {
                transaction = 'submit training report';

                $.ajax({
                    type: 'POST',
                    url: 'controller.php',
                    data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                    beforeSend: function(){
                        document.getElementById('submitform').disabled = true;
                        $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                    },
                    success: function (response) {
                        if(response === 'Updated' || response === 'Inserted'){
                            $('#System-Modal').modal('hide');

                            if(response === 'Inserted'){
                                show_alert('Insert Training Report Success', 'The training report has been inserted.', 'success');
                            }
                            else{
                                show_alert('Update Training Report Success', 'The training report has been updated.', 'success');
                            }

                            generate_datatable('training report table', '#training-report-datatable', 0, 'desc', [6]);
                        }
                        else{
                            show_alert('Training Error', response, 'error');
                        }
                    },
                    complete: function(){
                        document.getElementById('submitform').disabled = false;
                        $('#submitform').html('Submit');
                    }
                });
                return false;
            },
            rules: {
                learnings: {
                    required: true
                },
                comments: {
                    required: true
                },
            },
            messages: {
                learnings: {
                    required: 'Please enter the learnings',
                },
                comments: {
                    required: 'Please enter the comments',
                },
            },
            errorPlacement: function(label, element) {
                if(element.hasClass('form-select2') && element.next('.select2-container').length) {
                    label.insertAfter(element.next('.select2-container'));
                }
                else if(element.parent('.input-group').length){
                    label.insertAfter(element.parent());
                }
                else{
                    label.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).parent().addClass('has-danger');
                $(element).addClass('form-control-danger');
            },
            success: function(label,element) {
                $(element).parent().removeClass('has-danger')
                $(element).removeClass('form-control-danger')
                label.remove();
            }
        });
    }
}

//PDC Monitoring

// add monitoring
$('#submitaddpdcmonitoringForm').validate({
    submitHandler: function (form) {
        var transaction = 'insert pdc monitoring';
        var formdata = new FormData(form)
        formdata.append('transaction',transaction)

        ajax_request_form('controller.php',formdata,function (d) {
            if(d == '1'){
                show_alert_close_modals('Success','PDC monitoring','success')
                generate_datatable(
                    "pdc monitoring table",
                    "#pdc-monitoring-datatable",
                    3,
                    "desc",
                    [7],
                    '1',
                    '0',
                    function (d) {
                      console.log(d);
                    }
                  )

            }else if(d=="Assigned partner is inactive"){
                show_alert('Error',d,'error')
            }else{
                //error info
                show_alert('Error',d[2],'error')
            }
        })
        return false;
    },
    rules: {
        loan_num: {
            required: true
        },
        curr_pdc_num: {
            required: true
        },
        assign_emp_add: {
            required: true
        },
        branch: {
            required: true
        },
        
    },
    messages: {
        loan_num: {
            required: 'Loan Number is required',
        },
        curr_pdc_num: {
            required: 'PDC number is required',
        },
        assign_emp_add: {
            required: 'Assign partner is required',
        },
        branch: {
            required: 'Branch is required',
        },
        
    },
    errorPlacement: function (label, element) {
        if (element.hasClass('web-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.input-group'));
        }
        else if (element.parent('.input-group').length) {
            label.insertAfter(element.parent());
        }
        else {
            label.insertAfter(element);
        }
    },
    highlight: function (element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function (label, element) {
       
    }
});



//add remarks in monitoring
$('#submitaddpdcremarksmonitoringForm').validate({
    submitHandler: function (form) {
        var transaction = 'insert pdc remarks monitoring';
        var id_monitor = $('#id_monitoring_view').val()
        var formdata = new FormData(form)
        formdata.append('transaction',transaction)
        formdata.append('id_monitoring_remarks',id_monitor)

        ajax_request_form('controller.php',formdata,function (d) {
            if(d == '1'){
                show_alert_close_modals('Success','PDC remarks','success')
            }else{
                //error info
                show_alert('Error',d[2],'error')
            }
          
        })
        return false;
    },
    rules: {
        pdc_remarks: {
            required: true
        },
       
    },
    messages: {
        pdc_remarks: {
            required: 'Remarks is required',
        },
       
        
    },
    errorPlacement: function (label, element) {
        if (element.hasClass('web-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.input-group'));
        }
        else if (element.parent('.input-group').length) {
            label.insertAfter(element.parent());
        }
        else {
            label.insertAfter(element);
        }
    },
    highlight: function (element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function (label, element) {
       
    }
});

//update monitoring pdc
$('#submitupdatepdcnumbermonitoringForm').validate({
    submitHandler: function (form) {
        var transaction = 'update pdc monitoring check number';
    
        var formdata = new FormData(form)
        var id_monitor = $('#pdc_check_number_id_monitoring').val()
        formdata.append('transaction',transaction)
        formdata.append('id_monitoring_remarks',id_monitor)

        ajax_request_form('controller.php',formdata,function (d) {
            if(d == '1'){
                show_alert_close_modals('Success','PDC remarks','success')
                generate_datatable(
                    "pdc monitoring table",
                    "#pdc-monitoring-datatable",
                    3,
                    "desc",
                    [7],
                    '1',
                    '0',
                    function (d) {
                      console.log(d);
                    }
                  )
            }else{
                //error info
                show_alert('Error',d[2],'error')
            }
            console.log(d);
        })
        return false;
    },
    rules: {
        pdc_remarks: {
            required: true
        },
       
    },
    messages: {
        pdc_remarks: {
            required: 'Remarks is required',
        },
       
        
    },
    errorPlacement: function (label, element) {
        if (element.hasClass('web-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.input-group'));
        }
        else if (element.parent('.input-group').length) {
            label.insertAfter(element.parent());
        }
        else {
            label.insertAfter(element);
        }
    },
    highlight: function (element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function (label, element) {
       
    }
});


// insurance request
$('#loadinsurancerequestdataForm').validate({
    submitHandler: function (form) {

    var transaction = 'load insurance request'
    var formData = new FormData(form);
    formData.append('transaction',transaction)
  
    $.ajax({
        type: 'POST',
        url: 'controller.php',
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function(){

        },
        success: function (response) {
            
        },
        complete: function(res){
            console.log(res);
           var data  = JSON.parse(res.responseText)
           console.log(data);

        //    Swal.fire({
        //     title: 'importing...',
        //     icon: 'warning',
        //     showConfirmButton: false,
        //     allowOutsideClick: false,
        //     allowEscapeKey: false
        //   })

          dateformat = null;
          if(moment(data['INCEP_SDT'][0],"DD/MM/YYYY").format()!="Invalid date"){
             dateformat = '"DD/MM/YYYY';
          }else if(moment(data['INCEP_SDT'][0],"MM/DD/YYYY").format()!="Invalid date"){
             dateformat = 'MM/DD/YYYY';
          }
 
          var iet = moment(data['INCEP_EDT'][0],dateformat).format('YYYY-MM-DD')
          var isd = moment(data['INCEP_SDT'][0],dateformat).format('YYYY-MM-DD')
          $('#isd').val(isd).change()
          var timer = 1000;

          setTimeout(() => {
            $('#col_id').val(data['COLLA_ID'][0])
            timer = timer + 700
          }, timer);

          setTimeout(() => {
            $('#unit_desc').val(data['UNIT_DESC'][0])
            timer = timer + 700
          }, timer);

          setTimeout(() => {
            $('#plate_num').val(data['PLATE_NUM'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
            $('#chasis_num').val(data['CHASIS_NUM'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
            $('#motor_num').val(data['MOTOR_NUM'][0])
            timer = timer + 700
          }, timer);

          setTimeout(() => {
            $('#color').val(data['COLOR'][0])
             timer = timer + 700
           }, timer);



          setTimeout(() => {
            $('#insur_com').val(data['INS_CODE'][0]).change()
            timer = timer + 700
          }, timer);

          setTimeout(() => {
           $('#classifi').val(data['INS_CLAS'][0]).change()
            timer = timer + 700
          }, timer);

          setTimeout(() => {
           $('#year_model').val(data['YEAR_MOD'][0])
            timer = timer + 700
          }, timer);


          setTimeout(() => {
            $('#mortgagee').val(data['MORTGAGEE'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
           $('#rate').val(data['RATE'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
            $('#coverage').val(data['COVERAGE'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
          $('#aog').val(data['IS_AOG'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
           $('#isd').val(isd).change()
             timer = timer + 700
           }, timer);

           setTimeout(() => {
             $('#p_term').val(data['PAY_TERM'][0]).change()
             timer = timer + 700
           }, timer);

           setTimeout(() => {
            $('#nodays').val(data['NOD'][0])
             timer = timer + 700
           }, timer);

           setTimeout(() => {
           $('#iet').val(iet)
             timer = timer + 700
           }, timer);
          

        //    setTimeout(() => {

        //     // $('#client_name').val(data['CLIENT_NAME'][0])
        //     // $('#address').val(data['ADDRESS'][0])
        //     $('#col_id').val(data['COLLA_ID'][0])
        //     $('#unit_desc').val(data['UNIT_DESC'][0])
        //     $('#insur_com').val(data['INS_CODE'][0]).change()
        //     $('#classifi').val(data['INS_CLAS'][0]).change()
        //     $('#year_model').val(data['YEAR_MOD'][0])
        //     $('#plate_num').val(data['PLATE_NUM'][0])
        //     $('#chasis_num').val(data['CHASIS_NUM'][0])
        //     $('#motor_num').val(data['MOTOR_NUM'][0])
        //     $('#color').val(data['COLOR'][0])
        //     $('#mortgagee').val(data['MORTGAGEE'][0])
        //     $('#rate').val(data['RATE'][0])
        //     $('#coverage').val(data['COVERAGE'][0])
        //     $('#aog').val(data['IS_AOG'][0])
        //     $('#isd').val(isd).change()
        //     $('#p_term').val(data['PAY_TERM'][0]).change()
        //     $('#nodays').val(data['NOD'][0])
        //    }, 8000);

        //    setTimeout(() => {
        //     $('#iet').val(iet)
        //     swal.close()
        //    }, 9000);

        }
    });
    return false;
    },
});




$('#addinsurancerequestForm').validate({
    submitHandler: function (form) {

        var username = $('#username').html();
        var formdata = new FormData(form);
        formdata.append('transaction',"submit add insurance request")
        formdata.append('username',username)

        $.ajax({
            type: 'POST',
            url: 'controller.php',
            data: formdata,
            processData: false,
            contentType: false,
            success: function (response) {
                
            },complete : function(e){
                var res = JSON.parse(e.responseText)

                if(res=='updated' || res == 'added'){
                      show_alert_event("Added / Updated","Insurance request successfully added/updated",'success','reload');
                }else{
                    show_alert("Error",res,'error')
                }
                
             
            }
        });



    return false;
    },

    rules: {
       
        client_name: {
            required: true
        },
        address :{
            required: true,
        },
        col_id :{
            required: true,
        },
        unit_desc :{
            required: true,
        },
        plate_num :{
            required: true,
        },
        chasis_num :{
            required: true,
        },
        motor_num :{
            required: true,
        },
        color :{
            required: true,
        },
        year_model :{
            required: true,
        },
        coverage :{
            required: true,
        }
        
    },
    messages: {
        
        client_name: {
            required: 'Please input client name',
        },
        address :{
            required: 'Please enter address',
        }

        
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }



});


//activity notes details

//activity note attachment
$('#addactivityattachementForm').validate({
    submitHandler: function (form) {

        var transaction = 'submit upload activity attachement';
        var activity_id = $('#activity_id').val();
        var username = $('#username').html()
        //var data = $(form).serialize() + '&transaction=' + transaction;
        var formData = new FormData(form);
        formData.append('transaction', transaction);
        formData.append('activity_id', activity_id);
        formData.append('username', username)
       
      
        $.ajax({
            type: 'POST',
            url: 'controller.php',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                document.getElementById('submitform').disabled = true;
                $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
            },
            success: function (response) {

               var mess = JSON.parse(response)
             if(mess == '1'){
                show_alert_event('Inserted', 'Activity attachment has been inserted.', 'success',"reload");
             }
                      
            },
            complete: function(){
                document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
              
                //$("#mdl_item_images").modal("hide");
            }
        });
        return false;
    },
});




//for submiting the mannually made form and modal


//Purchasing module

//PR generation
$('#addparticularForm').validate({
    submitHandler: function (form) {
        transaction = 'submit add pr item';
        var formdata = new FormData (form)
        formdata.append('transaction',transaction)
        formdata.append('prno',$('#prno').val())

        ajax_request_form('controller.php',formdata,function (res)
         {
            //success
            document.getElementById('submitform').disabled = false;
            $('#submitform').html('Submit');
         },
         function (res) 
         {
            //complete
           if(typeof(res.responseJSON) == 'string')
           {
                show_alert("Error",res.responseJSON,'error')
           }
           else if(typeof(res.responseJSON) == 'object')
           {
                show_alert("Success",'added!','success')
                
               
                    generate_datatable(
                        "purchase request items table",
                        "#purchase-request-items-datatable",
                        2,
                        "desc"
                      )
               
               
                    //reset fields 
                  $('#mdl_add_particular_modal_body input,#mdl_add_particular_modal_body textarea').val('')

                $('.modal').modal('hide')

           }
         },function(){
            //before send
            document.getElementById('submitform').disabled = true;
            $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
          },
         )
        
        return false;
    },
    rules: {
       
        'quantity[]': {
            required: true
        },
        'unit[]': {
            required: true
        },
        'part_desc[]': {
            required: true
        },
        'budget[]': {
            required: true
        },
        'estimated[]': {
            required: true
        },
    },
    messages: {
        
       
        'quantity[]': {
            required:  'Please make an input'
        },
        'unit[]': {
            required:  'Please make an input'
        },
        'part_desc[]': {
            required:  'Please make an input'
        },
        'budget[]': {
            required:  'Please make an input'
        },
        'estimated[]': {
            required:  'Please make an input'
        },
     
        
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }
});


//create Purchase Request
$('#createprForm').validate({
    submitHandler: function (form) {
        transaction = 'submit add pr';
        var formdata = new FormData (form)
        formdata.append('transaction',transaction)

        ajax_request_form(
            'controller.php',
            formdata,
            function (res) {},
            function (res) {
                var response = res.responseJSON['RES']
                var lastid = res.responseJSON['RES']['lastInsertId']
                if(response.error == null){
                    //to another windows
                    show_alert_event(
                        'Success',
                        "Purchase request added"
                        ,'success',
                        'link-open',
                        `purchase-request-create.php?prid=${lastid}`)
                    //regenerate table
                    generate_datatable(
                        "purchase request table",
                        "#purchase-request-datatable",
                        0,
                        "desc"
                      )
                      $('.modal').modal('hide')
                }else{
                    show_alert('Error',response.error[2],'error')
                }
            }
        )
        return false;
    },
    rules: {
       
        'date_needed': {
            required: true
        },
        'title': {
            required: true
        },
        
    },
    messages: {
        
       
        'date_needed': {
            required:  'Please make an input'
        },
        'title': {
            required:  'Please make an input'
        },
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }
});


//update pr details

//create Purchase Request
$('#frm_PR_info').validate({
    submitHandler: function (form) {
        transaction = 'submit update pr';
        var prno = $('#prno').val()
        var formdata = new FormData (form)
        formdata.append('transaction',transaction)
        formdata.append('prno',prno)
        console.log(formdata);

        ajax_request_form(
            'controller.php',
            formdata,
            function (res) {
               // success
                if(res['RES']['error'] == null){
                    show_alert("Success",'Details has been saved','success')
                    $('#btn_save_pr_details').prop('disabled',false)
                   // $('#pr_detail_inputs select,#pr_detail_inputs ').prop("disabled",true)
                }else{
                    show_alert("Error",res['RES']['error'],'error')
                   
                }
                console.log(res);
                
            },
            function (res) {
                //completed
                
            },function () {
                //before send
                $('#btn_save_pr_details').prop('disabled',true)

            }
        )
        return false;
    },
    rules: {
       
        'date_needed': {
            required: true
        },
        'title': {
            required: true
        },
        
    },
    messages: {
        
       
        'date_needed': {
            required:  'Please make an input'
        },
        'title': {
            required:  'Please make an input'
        },
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }
});






//activity notes
//add activity notes
$('#addactivityForm').validate({
    submitHandler: function (form) {
        transaction = 'submit add activity';

        var long =localStorage.getItem("longitude");
        var lat = localStorage.getItem("latitude");
        var username = $('#username').html()
    
        if(long && lat != 'null'){

            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: $(form).serialize() +'&long='+ long + '&lat='+ lat + '&username=' + username + '&transaction=' + transaction,
                beforeSend: function(){
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                },
                success: function (response) {
                   var s = JSON.parse(response)
                    
               
                        $('.modal').modal('hide');
                    
                        if(s === 'Added'){
                            show_alert_event('Inserted', 'Activity has been inserted.', 'success',"reload");
                            
                        }
                        //generate_datatable('training report table', '#training-report-datatable', 0, 'desc', [6]);
              
                    else{
                        show_alert('Training Error', response, 'error');
                    }
                },
                complete: function(){
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });
        }else{
            show_alert('Location',"Failed to add, Your Location is not available", 'error');
        }
        
        return false;
    },
    rules: {
       
        act_type: {
            required: true
        },
        act_desc :{
            required: true,
        }
    },
    messages: {
        
        act_type: {
            required: 'Please select Type',
        },
        act_desc :{
            required: 'Please enter your activiy Description',
        }

        
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }
});



$('#updateactivityForm').validate({
    submitHandler: function (form) {
        transaction = 'submit update activity';

       
        var username = $('#username').html()
        //alert(username);
        
            $.ajax({
                type: 'POST',
                url: 'controller.php',
                data: $(form).serialize() + '&username=' + username + '&transaction=' + transaction,
                beforeSend: function () {
                    document.getElementById('submitform').disabled = true;
                    $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
                },
                success: function (response) {
                     var s = JSON.parse(response)
                

                    // $('.modal').modal('hide');

                    if (s === 'Updated') {

                        show_alert_event('Updated', 'Activity has been Updated.', 'success', "reload");

                    }
                   

                    else {
                        show_alert('Activity Error', response, 'error');
                    }
                },
                complete: function () {
                    document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
                }
            });
 
        
        return false;
    },
    rules: {
       
       
        act_type: {
            required: true
        },
        act_desc :{
            required: true,
        }
    },
    messages: {
        
        upt_act_type: {
            required: 'Please select Type',
        },
        upt_act_desc :{
            required: 'Please enter your activiy Description',
        }

        
    },
    errorPlacement: function(label, element) {
        if(element.hasClass('form-select2') && element.next('.select2-container').length) {
            label.insertAfter(element.next('.select2-container'));
        }
        else if(element.parent('.input-group').length){
            label.insertAfter(element.parent());
        }
        else{
            label.insertAfter(element);
        }
    },
    highlight: function(element) {
        $(element).parent().addClass('has-danger');
        $(element).addClass('form-control-danger');
    },
    success: function(label,element) {
        $(element).parent().removeClass('has-danger')
        $(element).removeClass('form-control-danger')
        label.remove();
    }
});




$('#btn_upload_image_item').on('click',function (e) {
    initialize_form_validation("upload item image form")
    $('#uploaditemimageForm').submit()
})

$('#btn_assign_cat_brand').on('click',function (e) {
    initialize_form_validation("assign brand form")
    $('#assignbrandForm').submit()
})

$('#btn_branddel_frm').on('click',function(e){
    initialize_form_validation("delete brand form")
    $('#deletebrandForm').submit()
})

$('#btn_editbrand_frm').on('click',function (e) {
    initialize_form_validation("edit brand form")
    $('#editbrandForm').submit()
})


$('#btn_addbrand_frm').on('click',function (e) {
    initialize_form_validation("add brand form")
    $('#addbrandForm').submit()
})


$('#btn_catdel_frm').on('click',function(e){
    initialize_form_validation('delete category form')
    $('#deletecategForm').submit()
})

$('#btn_editcat_frm').on('click',function(e){
    initialize_form_validation('edit category form')
    $('#edititem_dept_owner_cat').attr('disabled',false)
    setTimeout(() => {
        $('#editcatForm').submit()
        $('#edititem_dept_owner_cat').attr('disabled',true)
    }, 500);
    
})

$('#btn_additem_frm').on('click', function (e) {
    initialize_form_validation('add item form')
    $('#additemForm').submit()
})

$('#btn_edititem_frm').on('click',function(e){
    initialize_form_validation('edit item form')
    $('#edititemForm').submit()
})

$('#btn_disposeitem_frm').on('click',function(e){
    initialize_form_validation('dispose item form')
    $('#disposeitemForm').submit()
})

$('#btn_assignitem_frm').on('click',function(e){
    initialize_form_validation('assign item form')
    $('#assignitemForm').submit()
})

$('#btn_returnitem_frm').on('click',function(e){
    initialize_form_validation('return item form')
    $('#returnitemForm').submit()
})

$('#btn_addcat_frm').on('click',function(e){
    initialize_form_validation('add category form')
    $('#addcatForm').submit()
})

$('#btn_assign_dept_cat').on('click',function(e){
    initialize_form_validation('assign dept category')
    $('#assigncategForm').submit()
})

// Reset select2
function reset_select2(formname){
    $('#' + formname + ' .select2').each(function() { 
        $(this).val($(this).find('option').first().val()).trigger('change');
    });
}

// Reset form
function reset_form(formname){
  reset_select2(formname);
  document.getElementById(formname).reset();
  var validator = $('#' + formname).validate();
  validator.resetForm();
  $('#'+ formname +' .form-group').removeClass('has-danger');
}

// Form validation rules
// Rules for password strength
$.validator.addMethod('passwordstrength', function(value) {
    if(value != ''){
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(value);
    }
    else{
        return true;
    }

}, 'Password must contain at least 1 lowercase, uppercase letter, number, special character and must be 8 characters or longer');

$.validator.addMethod('legalage', function(value, element, min) {
  var today = new Date();
  var birthDate = new Date(value);
  var age = today.getFullYear() - birthDate.getFullYear();

  if (age > min+1) { return true; }

  var m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }

  return age >= min;
}, 'The employee must be at least 18 years old and above');

$.validator.addMethod('checknumber', function(value) {
    if(isNaN(value)){
        return false;
    }
    else{
        return true;
    }

}, 'Please enter a number');

$.validator.addMethod('checkwholenumber', function(value) {
    if(value % 1 != 0){
        return false;
    }
    else{
        return true;
    }

}, 'Please enter a number');


// Check role permission
function check_role_permission(formtype, permissionid){
    var username = $('#username').text();
    var transaction = 'check role permission';

    $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'TEXT',
        data: {transaction : transaction, username : username, permissionid : permissionid},
        success: function(response) {
            if(response > 0){
                enable_form(formtype);
            }
            else{
                disable_form(formtype);
            }
        }
    });
}

function check_permission(permissionid){
    var username = $('#username').text();
    var transaction = 'check role permission';
    var permission = null;

    $.ajax({
        url: 'controller.php',
        async: false,
        method: 'POST',
        dataType: 'TEXT',
        data: {transaction : transaction, username : username, permissionid : permissionid},
        success: function(response) {
            permission = response;
        }
    });

    return permission;
}

function enable_form(formtype){
    if($('#submitform').length){
        document.getElementById('submitform').disabled = false;

        if(formtype == 'page form'){
            document.getElementById('pagename').disabled = false;
        }
        else if(formtype == 'permission form'){
            document.getElementById('permissiondesc').disabled = false;
        }
        else if(formtype == 'system parameter form'){
            document.getElementById('description').disabled = false;
            document.getElementById('extension').disabled = false;
            document.getElementById('paramnum').disabled = false;
        }
        else if(formtype == 'system code form'){
            document.getElementById('systemtype').disabled = true;
            document.getElementById('systemcode').readOnly = true;
            document.getElementById('systemdesc').disabled = false;
        }
        else if(formtype == 'role form'){
            document.getElementById('roledesc').disabled = false;
        }
        else if(formtype == 'permission role form'){
            var n = document.getElementsByClassName('role-permissions');
            
            for(var i=0;i<n.length;i++){
                n[i].disabled = false;
            }
        }
        else if(formtype == 'user role form'){
            var n = document.getElementsByClassName('role-user');
            
            for(var i=0;i<n.length;i++){
                n[i].disabled = false;
            }
        }
        else if(formtype == 'company settings form'){
            document.getElementById('companyname').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('telephone').disabled = false;
            document.getElementById('website').disabled = false;
            document.getElementById('address').disabled = false;
            document.getElementById('lunchstarttime').disabled = false;
            document.getElementById('lunchendtime').disabled = false;
            document.getElementById('workingdayspermonth').disabled = false;
            document.getElementById('maxclockin').disabled = false;
        }
        else if(formtype == 'profile form'){
            document.getElementById('profile_image').disabled = false;
            document.getElementById('suffix').disabled = true;
            document.getElementById('gender').disabled = true;
            document.getElementById('password').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('telephone').disabled = false;
            document.getElementById('address').disabled = false;
        }
        else if(formtype == 'application settings form'){
            document.getElementById('login_bg').disabled = false;
            document.getElementById('logo_light').disabled = false;
            document.getElementById('logo_dark').disabled = false;
            document.getElementById('login_icon_light').disabled = false;
            document.getElementById('login_icon_dark').disabled = false;
            document.getElementById('favicon_image').disabled = false;
            document.getElementById('currency').disabled = false;
            document.getElementById('timezone').disabled = false;
            document.getElementById('dateformat').disabled = false;
            document.getElementById('timeformat').disabled = false;
        }
         else if(formtype == 'employee form'){
            document.getElementById('profile_image').disabled = false;
            document.getElementById('idnumber').readOnly = true;
            document.getElementById('department').disabled = false;
            document.getElementById('designation').disabled = false;
            document.getElementById('joindate').disabled = false;
            document.getElementById('exitdate').disabled = false;
            document.getElementById('permanentdate').disabled = false;
            document.getElementById('employmentstatus').disabled = false;
            document.getElementById('branch').disabled = false;
            document.getElementById('payrollperiod').disabled = false;
            document.getElementById('basicpay').disabled = false;
            document.getElementById('superior').disabled = false;
            document.getElementById('subordinate').disabled = false;
            document.getElementById('birthday').disabled = false;
            document.getElementById('gender').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('telephone').disabled = false;
            document.getElementById('address').disabled = false;
            document.getElementById('sss').disabled = false;
            document.getElementById('tin').disabled = false;
            document.getElementById('philhealth').disabled = false;
            document.getElementById('pagibig').disabled = false;
            document.getElementById('driverlicense').disabled = false;
            document.getElementById('accountname').disabled = false;
            document.getElementById('accountnumber').disabled = false;
        }
        else if(formtype == 'department form'){
            document.getElementById('department').disabled = false;
        }
        else if(formtype == 'designation form'){
            document.getElementById('designation').disabled = false;
        }
        else if(formtype == 'branch form'){
            document.getElementById('branch').disabled = false;
            document.getElementById('email').disabled = false;
            document.getElementById('phone').disabled = false;
            document.getElementById('telephone').disabled = false;
            document.getElementById('address').disabled = false;
        }
        else if(formtype == 'holiday form'){
            document.getElementById('holiday').disabled = false;
            document.getElementById('holidaydate').disabled = false;
            document.getElementById('holidaytype').disabled = false;
        }
        else if(formtype == 'leave type form'){
            document.getElementById('leave').disabled = false;
            document.getElementById('noleaves').disabled = false;
            document.getElementById('paidstatus').disabled = false;
        }
        else if(formtype == 'leave entitlement form'){
            document.getElementById('noleaves').disabled = false;
        }
        else if(formtype == 'update employee leave form'){
            var leavestatus = $('#leavestatus').val();
    
            if(leavestatus == '0'){
                document.getElementById('rejectionreason').disabled = false;
            }
    
            if(leavestatus == '2'){
                document.getElementById('employeeleavetype').disabled = false;
                document.getElementById('leavestatus').disabled = false;
                document.getElementById('leavedate').disabled = false;
                document.getElementById('starttime').disabled = false;
                document.getElementById('endtime').disabled = false;
                document.getElementById('reason').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'employee attendance log form'){
            var locked = $('#locked').val();
    
            if(locked == '1'){
                disable_form(formtype)
            }
            else{
                document.getElementById('timeindate').disabled = true;
                document.getElementById('timein').disabled = false;
                document.getElementById('timeoutdate').disabled = false;
                document.getElementById('timeout').disabled = false;
                document.getElementById('remarks').disabled = false;
            }
        }
        else if(formtype == 'deduction type form'){
            document.getElementById('deductiontype').disabled = false;
            document.getElementById('category').disabled = false;
        }
        else if(formtype == 'deduction amount form'){
            document.getElementById('startrange').readOnly = true;
            document.getElementById('endrange').readOnly = true;
            document.getElementById('deductionamount').disabled = false;
        }
        else if(formtype == 'main deduction amount form'){
            document.getElementById('deductiontypeid').disabled = true;
            document.getElementById('startrange').readOnly = true;
            document.getElementById('endrange').readOnly = true;
            document.getElementById('deductionamount').disabled = false;
        }
        else if(formtype == 'allowance type form'){
            document.getElementById('allowancetype').disabled = false;
            document.getElementById('taxtype').disabled = false;
        }
        else if(formtype == 'other income type form'){
            document.getElementById('otherincometype').disabled = false;
            document.getElementById('taxtype').disabled = false;
        }
        else if(formtype == 'update payroll specification form'){
            var payrollspecstatus = $('#payrollspecstatus').val();
            var payrollid = $('#payrollid').val();
    
            if(payrollspecstatus != 0 || payrollid != ''){
                disable_form(formtype);
            }
            else{
                document.getElementById('specemployee').disabled = false;
                document.getElementById('specificationtype').disabled = false;
                document.getElementById('specificationcategory').disabled = false;
                document.getElementById('specpayrolldate').disabled = false;
                document.getElementById('specamount').disabled = false;
            }
        }
        else if(formtype == 'update user account form'){
            var employeeid = $('#employeeid').val();
    
            if(employeeid.split('-')[0] == 'USER'){
                document.getElementById('firstname').readOnly = false;
                document.getElementById('middlename').readOnly = false;
                document.getElementById('lastname').readOnly = false;
                document.getElementById('suffix').disabled = false;
                document.getElementById('role').disabled = false;
            }
            else{
                document.getElementById('firstname').readOnly = true;
                document.getElementById('middlename').readOnly = true;
                document.getElementById('lastname').readOnly = true;
                document.getElementById('suffix').disabled = true;
                document.getElementById('role').disabled = true;
            }
    
            document.getElementById('password').disabled = false;
        }
        else if(formtype == 'email notification form'){
            document.getElementById('notification').disabled = false;
        }
        else if(formtype == 'email configuration form'){
            document.getElementById('mailhost').disabled = false;
            document.getElementById('port').disabled = false;
            document.getElementById('smptauth').disabled = false;
            document.getElementById('smptautotls').disabled = false;
            document.getElementById('mailuser').disabled = false;
            document.getElementById('mailpassword').disabled = false;
            document.getElementById('mailencryption').disabled = false;
            document.getElementById('mailfromname').disabled = false;
            document.getElementById('mailfromemail').disabled = false;
        }
        else if(formtype == 'email recipient form'){
            document.getElementById('email').disabled = false;
        }
        else if(formtype == 'update office shift form'){
            document.getElementById('dayoff').disabled = false;
            document.getElementById('timein').disabled = false;
            document.getElementById('timeout').disabled = false;
            document.getElementById('late').disabled = false;
        }
        else if(formtype == 'payroll group form'){
            document.getElementById('payrollgroup').disabled = false;
        }
        else if(formtype == 'attendance log form'){
            var locked = $('#locked').val();
    
            if(locked == '1'){
                disable_form(formtype);
            }
            else{
                document.getElementById('employeeid').disabled = true;
                document.getElementById('timeindate').disabled = true;
                document.getElementById('timein').disabled = false;
                document.getElementById('timeoutdate').disabled = false;
                document.getElementById('timeout').disabled = false;
                document.getElementById('remarks').disabled = false;
            }
        }
        else if(formtype == 'update employee attendance adjustment form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('timeindate').disabled = true;
                document.getElementById('timein').disabled = false;
                document.getElementById('timeoutdate').disabled = false;
                document.getElementById('timeout').disabled = false;
                document.getElementById('attachment_file').disabled = false;
                document.getElementById('reason').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'telephone log form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('recipient').disabled = false;
                document.getElementById('telephone').disabled = false;
                document.getElementById('initialcalldate').disabled = false;
                document.getElementById('initialcalltime').disabled = false;
                document.getElementById('reason').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'document management setting form'){
            document.getElementById('maxfilesize').disabled = false;
            document.getElementById('authentication').disabled = false;
            document.getElementById('filetype').disabled = false;
        }
        else if(formtype == 'document form'){
            document.getElementById('document_file').disabled = false;
            document.getElementById('documentname').disabled = false;
            document.getElementById('category').disabled = false;
            document.getElementById('description').disabled = false;
        }
        else if(formtype == 'update transmittal form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('description').disabled = false;
                document.getElementById('transmittaldepartment').disabled = false;
                document.getElementById('priorityperson').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'suggest to win form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('title').disabled = false;
                document.getElementById('description').disabled = false;
                document.getElementById('reason').disabled = false;
                document.getElementById('benefits').disabled = false;
                document.getElementById('stw_attachment_file').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'training room log form'){
            var status = $('#status').val();
            var locked = $('#locked').val();
    
            if(status == '0' && locked == '0'){
                document.getElementById('participants').disabled = false;
                document.getElementById('otherparticipants').disabled = false;
                document.getElementById('startdate').disabled = false;
                document.getElementById('starttime').disabled = false;
                document.getElementById('endtime').disabled = false;
                document.getElementById('lights').disabled = false;
                document.getElementById('fan').disabled = false;
                document.getElementById('aircon').disabled = false;
                document.getElementById('reason').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'weekly cash flow form'){
            var status = $('#status').val();
    
            if(status == '0' || status == '1' || status == '3'){
                document.getElementById('startdate').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'weekly cash flow particulars form'){
            var status = $('#status').val();
            var wcftype = $('#wcftype').val();
    
            if(status == '0' || status == '1' || status == '3'){
                document.getElementById('details').disabled = false;
                document.getElementById('monday').disabled = false;
                document.getElementById('tuesday').disabled = false;
                document.getElementById('wednesday').disabled = false;
                document.getElementById('thursday').disabled = false;
                document.getElementById('friday').disabled = false;
                document.getElementById('wcftype').disabled = false;

                if(wcftype == 'LOAN'){
                    document.getElementById('wcfloantype').disabled = false;
                }
                else{
                    document.getElementById('wcfloantype').disabled = true;
                }
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'update ticket form'){
            var locked = $('#locked').val();
    
            if(locked == '0'){
                document.getElementById('ticketdepartment').disabled = false;
                document.getElementById('priorityperson').disabled = false;
                document.getElementById('category').disabled = false;
                document.getElementById('duedate').disabled = false;
                document.getElementById('duetime').disabled = false;
                document.getElementById('subject').disabled = false;
                document.getElementById('description').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'update ticket adjustment form'){
            document.getElementById('priorityperson').disabled = false;
            document.getElementById('category').disabled = false;
            document.getElementById('priority').disabled = false;
            document.getElementById('duedate').disabled = false;
            document.getElementById('duetime').disabled = false;
            document.getElementById('subject').disabled = false;
            document.getElementById('description').disabled = false;
            document.getElementById('reason').disabled = false;
        }
        else if(formtype == 'meeting form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('meetingtitle').disabled = false;
                document.getElementById('meetingdate').disabled = false;
                document.getElementById('previousmeeting').disabled = false;
                document.getElementById('starttime').disabled = false;
                document.getElementById('endtime').disabled = false;
                document.getElementById('meetingtype').disabled = false;
                document.getElementById('attendees').disabled = false;
                document.getElementById('presider').disabled = false;
                document.getElementById('notedby').disabled = false;
                document.getElementById('absentees').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'meeting task form'){
            var meetingstatus = $('#meetingstatus').val();
    
            if(meetingstatus == '0'){
                document.getElementById('task').disabled = false;
                document.getElementById('meetingemployee').disabled = false;
                document.getElementById('meetingdepartment').disabled = false;
                document.getElementById('agenda').disabled = false;
                document.getElementById('taskstatus').disabled = false;
                document.getElementById('duedatetype').disabled = false;
                document.getElementById('duedate').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
        else if(formtype == 'meeting other matters update form'){
			document.getElementById('othermatters').disabled = false;
            /*var meetingstatus = $('#meetingstatus').val();
    
            if(meetingstatus == '0'){
                document.getElementById('othermatters').disabled = false;
            }
            else{
                disable_form(formtype);
            }*/
        }
         else if(formtype == 'training form'){
            var status = $('#status').val();
    
            if(status == '0'){
                document.getElementById('trainingtitle').disabled = false;
                document.getElementById('trainingdate').disabled = false;
                document.getElementById('starttime').disabled = false;
                document.getElementById('endtime').disabled = false;
                document.getElementById('description').disabled = false;
                document.getElementById('status').disabled = false;
                document.getElementById('trainingtype').disabled = false;
            }
            else{
                disable_form(formtype);
            }
        }
          else if(formtype == 'overtime form'){
            var status = $('#status').val();
    
            if(status == '1'){
                document.getElementById('overtimetitle').disabled = false;
                document.getElementById('overtimedate').disabled = false;
                document.getElementById('starttime').disabled = false;
                document.getElementById('endtime').disabled = false;
                document.getElementById('reason').disabled = false;
                document.getElementById('status').disabled = false;
                document.getElementById('holidaytype').disabled = false;
            }
           
        }
		else if(formtype == 'car search parameter form'){
            document.getElementById('parameter_code').readOnly = true;
            document.getElementById('parameter_value').disabled = false;
            document.getElementById('category_type').disabled = false;
        }
        else if(formtype == 'price index item form'){
            document.getElementById('brand').disabled = false;
            document.getElementById('model').disabled = false;
            document.getElementById('variant').disabled = false;
            document.getElementById('engine_size').disabled = false;
            document.getElementById('gas_type').disabled = false;
            document.getElementById('transmission').disabled = false;
            document.getElementById('drive_train').disabled = false;
            document.getElementById('body_type').disabled = false;
            document.getElementById('seating_capacity').disabled = false;
            document.getElementById('camshaft_profile').disabled = false;
            document.getElementById('color_type').disabled = false;
            document.getElementById('aircon_type').disabled = false;
            document.getElementById('other_information').disabled = false;
        }
    }
    else{
        disable_form(formtype);
    }
}

function disable_form(formtype){
    if($('#submitform').length){
        document.getElementById('submitform').disabled = true;
    }

    if($('#submitdocumentsettingsform').length){
        document.getElementById('submitdocumentsettingsform').disabled = true;
    }

    if(formtype == 'page form'){
        document.getElementById('pagename').disabled = true;
    }
    else if(formtype == 'permission form'){
        document.getElementById('permissiondesc').disabled = true;
    }
    else if(formtype == 'system parameter form'){
        document.getElementById('description').disabled = true;
        document.getElementById('extension').disabled = true;
        document.getElementById('paramnum').disabled = true;
    }
    else if(formtype == 'system code form'){
        document.getElementById('systemtype').disabled = true;
        document.getElementById('systemcode').readOnly = true;
        document.getElementById('systemdesc').disabled = true;
    }
    else if(formtype == 'role form'){
        document.getElementById('roledesc').disabled = true;
    }
    else if(formtype == 'user role form'){
        var n = document.getElementsByClassName('role-user');
        
        for(var i=0;i<n.length;i++){
            n[i].disabled = true;
        }
    }
    else if(formtype == 'permission role form'){
        var n = document.getElementsByClassName('role-permissions');
        
        for(var i=0;i<n.length;i++){
            n[i].disabled = true;
        }
    }
    else if(formtype == 'company settings form'){
        document.getElementById('companyname').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('telephone').disabled = true;
        document.getElementById('website').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('lunchstarttime').disabled = true;
        document.getElementById('lunchendtime').disabled = true;
        document.getElementById('workingdayspermonth').disabled = true;
        document.getElementById('maxclockin').disabled = true;
    }
    else if(formtype == 'profile form'){
        document.getElementById('profile_image').disabled = true;
        document.getElementById('suffix').disabled = true;
        document.getElementById('gender').disabled = true;
        document.getElementById('password').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('telephone').disabled = true;
        document.getElementById('address').disabled = true;
    }
    else if(formtype == 'application settings form'){
        document.getElementById('login_bg').disabled = true;
        document.getElementById('logo_light').disabled = true;
        document.getElementById('logo_dark').disabled = true;
        document.getElementById('login_icon_light').disabled = true;
        document.getElementById('login_icon_dark').disabled = true;
        document.getElementById('favicon_image').disabled = true;
        document.getElementById('currency').disabled = true;
        document.getElementById('timezone').disabled = true;
        document.getElementById('dateformat').disabled = true;
        document.getElementById('timeformat').disabled = true;
    }
    else if(formtype == 'department form'){
        document.getElementById('department').disabled = true;
    }
    else if(formtype == 'designation form'){
        document.getElementById('designation').disabled = true;
    }
    else if(formtype == 'branch form'){
        document.getElementById('branch').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('telephone').disabled = true;
        document.getElementById('address').disabled = true;
    }
    else if(formtype == 'employee form'){
        document.getElementById('profile_image').disabled = true;
        document.getElementById('idnumber').readOnly = true;
        document.getElementById('department').disabled = true;
        document.getElementById('designation').disabled = true;
        document.getElementById('joindate').disabled = true;
        document.getElementById('exitdate').disabled = true;
        document.getElementById('permanentdate').disabled = true;
        document.getElementById('employmentstatus').disabled = true;
        document.getElementById('branch').disabled = true;
        document.getElementById('payrollperiod').disabled = true;
        document.getElementById('basicpay').disabled = true;
        document.getElementById('superior').disabled = true;
        document.getElementById('subordinate').disabled = true;
        document.getElementById('birthday').disabled = true;
        document.getElementById('gender').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('phone').disabled = true;
        document.getElementById('telephone').disabled = true;
        document.getElementById('address').disabled = true;
        document.getElementById('sss').disabled = true;
        document.getElementById('tin').disabled = true;
        document.getElementById('philhealth').disabled = true;
        document.getElementById('pagibig').disabled = true;
        document.getElementById('driverlicense').disabled = true;
        document.getElementById('accountname').disabled = true;
        document.getElementById('accountnumber').disabled = true;
    }
    else if(formtype == 'holiday form'){
        document.getElementById('holiday').disabled = true;
        document.getElementById('holidaydate').disabled = true;
        document.getElementById('holidaytype').disabled = true;
    }
    else if(formtype == 'leave type form'){
        document.getElementById('leave').disabled = true;
        document.getElementById('noleaves').disabled = true;
        document.getElementById('paidstatus').disabled = true;
    }
    else if(formtype == 'leave entitlement form'){
        document.getElementById('leavetype').disabled = true;
        document.getElementById('startdate').disabled = true;
        document.getElementById('enddate').disabled = true;
        document.getElementById('noleaves').disabled = true;
    }
    else if(formtype == 'update employee leave form'){
        document.getElementById('employeeleavetype').disabled = true;
        document.getElementById('leavestatus').disabled = true;
        document.getElementById('leavedate').disabled = true;
        document.getElementById('starttime').disabled = true;
        document.getElementById('endtime').disabled = true;
        document.getElementById('reason').disabled = true;
        document.getElementById('rejectionreason').disabled = true;
    }
    else if(formtype == 'employee attendance log form'){
        document.getElementById('timeindate').disabled = true;
        document.getElementById('timein').disabled = true;
        document.getElementById('timeoutdate').disabled = true;
        document.getElementById('timeout').disabled = true;
        document.getElementById('remarks').disabled = true;
    }
    else if(formtype == 'deduction type form'){
        document.getElementById('deductiontype').disabled = true;
        document.getElementById('category').disabled = true;
    }
    else if(formtype == 'deduction amount form'){
        document.getElementById('startrange').readOnly = true;
        document.getElementById('endrange').readOnly = true;
        document.getElementById('deductionamount').disabled = true;
    }
    else if(formtype == 'main deduction amount form'){
        document.getElementById('deductiontypeid').disabled = true;
        document.getElementById('startrange').readOnly = true;
        document.getElementById('endrange').readOnly = true;
        document.getElementById('deductionamount').disabled = false;
    }
    else if(formtype == 'allowance type form'){
        document.getElementById('allowancetype').disabled = true;
        document.getElementById('taxtype').disabled = true;
    }
    else if(formtype == 'other income type form'){
        document.getElementById('otherincometype').disabled = true;
        document.getElementById('taxtype').disabled = true;
    }
    else if(formtype == 'update payroll specification form'){
        document.getElementById('specemployee').disabled = true;
        document.getElementById('specificationtype').disabled = true;
        document.getElementById('specificationcategory').disabled = true;
        document.getElementById('specpayrolldate').disabled = true;
        document.getElementById('specamount').disabled = true;
    }
    else if(formtype == 'update user account form'){
        document.getElementById('password').disabled = true;
        document.getElementById('role').disabled = true;
        document.getElementById('firstname').readOnly = true;
        document.getElementById('middlename').readOnly = true;
        document.getElementById('lastname').readOnly = true;
        document.getElementById('suffix').disabled = true;
    }
    else if(formtype == 'email notification form'){
        document.getElementById('notification').disabled = true;
    }
    else if(formtype == 'email configuration form'){
        document.getElementById('mailhost').disabled = true;
        document.getElementById('port').disabled = true;
        document.getElementById('smptauth').disabled = true;
        document.getElementById('smptautotls').disabled = true;
        document.getElementById('mailuser').disabled = true;
        document.getElementById('mailpassword').disabled = true;
        document.getElementById('mailencryption').disabled = true;
        document.getElementById('mailfromname').disabled = true;
        document.getElementById('mailfromemail').disabled = true;
    }
    else if(formtype == 'email recipient form'){
        document.getElementById('email').disabled = true;
    }
    else if(formtype == 'update office shift form'){
        document.getElementById('dayoff').disabled = true;
        document.getElementById('timein').disabled = true;
        document.getElementById('timeout').disabled = true;
        document.getElementById('late').disabled = true;
    }
    else if(formtype == 'payroll group form'){
        document.getElementById('payrollgroup').disabled = true;
    }
    else if(formtype == 'attendance log form'){
        document.getElementById('employeeid').disabled = true;
        document.getElementById('timeindate').disabled = true;
        document.getElementById('timein').disabled = true;
        document.getElementById('timeoutdate').disabled = true;
        document.getElementById('timeout').disabled = true;
        document.getElementById('remarks').disabled = true;
    }
    else if(formtype == 'update employee attendance adjustment form'){
        document.getElementById('timeindate').disabled = true;
        document.getElementById('timein').disabled = true;
        document.getElementById('timeoutdate').disabled = true;
        document.getElementById('timeout').disabled = true;
        document.getElementById('attachment_file').disabled = true;
        document.getElementById('reason').disabled = true;
    }
    else if(formtype == 'telephone log form'){
        document.getElementById('recipient').disabled = true;
        document.getElementById('telephone').disabled = true;
        document.getElementById('initialcalldate').disabled = true;
        document.getElementById('initialcalltime').disabled = true;
        document.getElementById('reason').disabled = true;
    }
    else if(formtype == 'document management setting form'){
        document.getElementById('maxfilesize').disabled = true;
        document.getElementById('authentication').disabled = true;
        document.getElementById('filetype').disabled = true;
    }
    else if(formtype == 'document form'){
        document.getElementById('document_file').disabled = true;
        document.getElementById('documentname').disabled = true;
        document.getElementById('category').disabled = true;
        document.getElementById('description').disabled = true;
    }
    else if(formtype == 'update transmittal form'){
        document.getElementById('description').disabled = true;
        document.getElementById('transmittaldepartment').disabled = true;
        document.getElementById('priorityperson').disabled = true;
    }
    else if(formtype == 'suggest to win form'){
        document.getElementById('title').disabled = true;
        document.getElementById('description').disabled = true;
        document.getElementById('reason').disabled = true;
        document.getElementById('benefits').disabled = true;
        document.getElementById('stw_attachment_file').disabled = true;
    }
    else if(formtype == 'training room log form'){
        document.getElementById('participants').disabled = true;
        document.getElementById('otherparticipants').disabled = true;
        document.getElementById('startdate').disabled = true;
        document.getElementById('starttime').disabled = true;
        document.getElementById('endtime').disabled = true;
        document.getElementById('lights').disabled = true;
        document.getElementById('fan').disabled = true;
        document.getElementById('aircon').disabled = true;
        document.getElementById('reason').disabled = true;
    }
    else if(formtype == 'weekly cash flow form'){
        document.getElementById('startdate').disabled = true;
    }
    else if(formtype == 'weekly cash flow particulars form'){
        document.getElementById('details').disabled = true;
        document.getElementById('monday').disabled = true;
        document.getElementById('tuesday').disabled = true;
        document.getElementById('wednesday').disabled = true;
        document.getElementById('thursday').disabled = true;
        document.getElementById('friday').disabled = true;
        document.getElementById('wcftype').disabled = true;
        document.getElementById('wcfloantype').disabled = true;
    }
    else if(formtype == 'update ticket form'){
        document.getElementById('ticketdepartment').disabled = true;
        document.getElementById('priorityperson').disabled = true;
        document.getElementById('category').disabled = true;
        document.getElementById('duedate').disabled = true;
        document.getElementById('duetime').disabled = true;
        document.getElementById('subject').disabled = true;
        document.getElementById('description').disabled = true;
    }
    else if(formtype == 'update ticket adjustment form'){
        document.getElementById('priorityperson').disabled = true;
        document.getElementById('category').disabled = true;
        document.getElementById('priority').disabled = true;
        document.getElementById('duedate').disabled = true;
        document.getElementById('subject').disabled = true;
        document.getElementById('description').disabled = true;
        document.getElementById('reason').disabled = true;
    }
    else if(formtype == 'meeting form'){
        document.getElementById('meetingtitle').disabled = true;
        document.getElementById('meetingdate').disabled = true;
        document.getElementById('previousmeeting').disabled = true;
        document.getElementById('starttime').disabled = true;
        document.getElementById('endtime').disabled = true;
        document.getElementById('meetingtype').disabled = true;
        document.getElementById('attendees').disabled = true;
        document.getElementById('presider').disabled = true;
        document.getElementById('notedby').disabled = true;
        document.getElementById('absentees').disabled = true;
    }
    else if(formtype == 'meeting task form'){
        document.getElementById('task').disabled = true;
        document.getElementById('meetingemployee').disabled = true;
        document.getElementById('meetingdepartment').disabled = true;
        document.getElementById('agenda').disabled = true;
        document.getElementById('taskstatus').disabled = true;
        document.getElementById('duedatetype').disabled = true;
        document.getElementById('duedate').disabled = true;
    }
    else if(formtype == 'meeting other matters update form'){
        document.getElementById('othermatters').disabled = true;
    }
    else if(formtype == 'training form'){
        document.getElementById('trainingtitle').disabled = true;
        document.getElementById('trainingdate').disabled = true;
        document.getElementById('starttime').disabled = true;
        document.getElementById('endtime').disabled = true;
        document.getElementById('description').disabled = true;
        document.getElementById('status').disabled = true;
        document.getElementById('trainingtype').disabled = true;
    }
    
 
	else if(formtype == 'car search parameter form'){
        document.getElementById('parameter_code').readOnly = true;
        document.getElementById('parameter_value').disabled = true;
        document.getElementById('category_type').disabled = true;
    }
    else if(formtype == 'price index item form'){
        document.getElementById('brand').disabled = true;
        document.getElementById('model').disabled = true;
        document.getElementById('variant').disabled = true;
        document.getElementById('engine_size').disabled = true;
        document.getElementById('gas_type').disabled = true;
        document.getElementById('transmission').disabled = true;
        document.getElementById('drive_train').disabled = true;
        document.getElementById('body_type').disabled = true;
        document.getElementById('seating_capacity').disabled = true;
        document.getElementById('camshaft_profile').disabled = true;
        document.getElementById('color_type').disabled = true;
        document.getElementById('aircon_type').disabled = true;
        document.getElementById('other_information').disabled = true;
    }
}

function generate_province_option(countryid, selected){
    var username = sessionStorage.getItem('username');
    var type = 'province options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, countryid : countryid, username : username},
        success: function(response) {
            if(response.length > 0){
                $('#province').empty();
                document.getElementById('province').disabled = false;

                for(var i = 0; i < response.length; i++) {
                    var newOption = new Option(response[i].STATE_NAME, response[i].STATE_ID, false, false);
                    $('#province').append(newOption);
                }
            }
            else{
                $('#province').append(new Option('--', '', false, false));
                $('#city').append(new Option('--', '', false, false));
                $('#province').val('').change();
                $('#city').val('').change();
                document.getElementById('province').disabled = true;
            }
        },
        complete: function(){            
            if(selected != ''){
                $('#province').val(selected).change();
            }

            $('#city').val('').change();
            document.getElementById('city').disabled = true;
        }
    });
}

function generate_city_option(provinceid, countryid, selected){
    var username = sessionStorage.getItem('username');
    var type = 'city options';

    $.ajax({
        url: 'system-generation.php',
        method: 'POST',
        dataType: 'JSON',
        data: {type : type, provinceid : provinceid, countryid : countryid, username : username},
        success: function(response) {
            if(response.length > 0){
                $('#city').empty();
                document.getElementById('city').disabled = false;

                for(var i = 0; i < response.length; i++) {
                    var newOption = new Option(response[i].CITY_NAME, response[i].CITY_ID, false, false);
                    $('#city').append(newOption);
                }
            }
            else{
                $('#city').append(new Option('--', '', false, false));
                $('#city').val('').change();
                document.getElementById('city').disabled = true;
            }
        },
        complete: function(){            
            if(selected != ''){
                $('#city').val(selected).change();
            }
        }
    });
}

function clear_check_box(){
    $('input:checkbox').each(function() { 
        this.checked = false; 
    });
}