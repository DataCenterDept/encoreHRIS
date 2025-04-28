$(function() {
    'use strict';

    $(document).on('change', "#employeeleavetype, #leaveduration", function() {
        var leaveType = $("#employeeleavetype").val();
        var leaveDuration = $("#leaveduration").val();
        
        // ONLY handle the attachment visibility
        if (leaveType == 'LEAVETP2' && 
            !(leaveDuration == 'SINGLE' || leaveDuration == 'HLFDAYMOR' || leaveDuration == 'HLFDAYAFT' || leaveDuration == 'CUSTOM')) {
            $('#leave_attachement_container').show();
            $('#leave_attachement').prop('required', true);
        } else {
            $('#leave_attachement_container').hide();
            $('#leave_attachement').prop('required', false);
        }
        
    });


    
    $(document).on('change','.file-upload-default',function() {
        $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });

    $(document).on('change','#leavetype',function() {
        if(this.value != ''){         
            sessionStorage.setItem('leavetypeid', this.value);
            var entitlement_status = sessionStorage.getItem('entitlement_status');

            if(entitlement_status == 'add'){
                display_form_details('leave type');
            }
        }
        else{
            $('#noleaves').val('0');
        }
    });

    $(document).on('change','#leavestatus',function() {
        if(this.value == '0'){
            if($('#rejectionreason').length){
                document.getElementById('rejectionreason').disabled = false;
            }
        }
        else{
            if($('#rejectionreason').length){
                document.getElementById('rejectionreason').disabled = true;
            }
        }
    });

    $(document).on('change','#leaveduration',function() {
        if(this.value != ''){
            var username = $('#username').text();

            generate_element('leave duration', this.value, 'leave-date-container', '0', username);
        }
        else{
            document.getElementById('leave-date-container').innerHTML = '';
        }
    });

    $(document).on('change','#country',function() {
        if(this.value != ''){
            reset_element_validation('#province');
            reset_element_validation('#city');
            generate_province_option(this.value, '');
        }
        else{
            $('#province').append(new Option('--', '', false, false));
            $('#city').append(new Option('--', '', false, false));
            $('#province').val('').change();
            $('#city').val('').change();
            document.getElementById('province').disabled = true;
            document.getElementById('city').disabled = true;
        }
    });

    $(document).on('change','#province',function() {
        var country = $('#country').val();

        if(this.value != '' && country != ''){
            reset_element_validation('#city');
            generate_city_option(this.value, country, '');
            document.getElementById('city').disabled = false;
        }
        else{
            $('#city').val('').change();
            document.getElementById('city').disabled = true;
        }
    });

    $(document).on('change','#basicpay',function() {
        sessionStorage.setItem('basicpay', this.value);
        
        display_form_details('salary rate');
    });

    $(document).on('change','#employeefilterby',function() {
        reset_element_validation('#employeefiltervalue');

        if(this.value != ''){
            generate_employee_filter_value(this.value, '');
            document.getElementById('employeefiltervalue').disabled = false;
        }
        else{
            $('#employeefiltervalue').empty();

            var newOption = new Option('--', '', false, false);
            $('#employeefiltervalue').append(newOption);
            document.getElementById('employeefiltervalue').disabled = true;
        }
    });

    $(document).on('change','#superior',function() {
        var employeeid = $('#employeeid').val();
        var update = $('#update').val();

        if(this.value != ''){
            if(update == '1'){
                generate_subordinates(employeeid, this.value, '');
            }
            else{
                generate_subordinates('', this.value, '');
            }
        }
        else{
            generate_subordinates('', '', '');
        }
    });

    $(document).on('change','#reoccuring',function() {
        $('#recurrencepattern').val('').trigger('change');
        $('#recurrencecount').val('');

        if(this.value == '0'){
            document.getElementById('recurrencepattern').disabled = true;
            document.getElementById('recurrencecount').readOnly = true;
        }
        else{
            document.getElementById('recurrencepattern').disabled = false;
            document.getElementById('recurrencecount').readOnly = false;
        }
    });

    $(document).on('change','#employeesdeductiontype',function() {
        sessionStorage.setItem('deductiontype', this.value);
        
        display_form_details('deduction type');
    });

    $(document).on('change','#specificationtype',function() {
        reset_element_validation('#specificationcategory');

        if(this.value != ''){
            generate_payroll_specification_category(this.value, '');
            document.getElementById('specificationcategory').disabled = false;
        }
        else{
            $('#specificationcategory').empty();

            var newOption = new Option('--', '', false, false);
            $('#specificationcategory').append(newOption);
            document.getElementById('specificationcategory').disabled = true;

            var updatespecamount = $('#updatespecamount').val();

            if(updatespecamount != ''){
                $('#specamount').val(updatespecamount);
            }

            $('#deductioncategory').val('');
        }
    });

    $(document).on('change','#specificationcategory',function() {
        var specificationtype = $('#specificationtype').val();
        var specemployee = $('#specemployee').val();

        if(this.value != '' && specemployee != '' && specificationtype == 'DEDUCTION'){
            sessionStorage.setItem('specificationcategory', this.value);
            sessionStorage.setItem('employeeid', specemployee);
        
            display_form_details('deduction type');
        }
        else{
            var updatespecamount = $('#updatespecamount').val();

            if(updatespecamount != ''){
                $('#specamount').val(updatespecamount);
            }
            
            $('#deductioncategory').val('');
        }
    });

    $(document).on('change','#specemployee',function() {
        var specificationtype = $('#specificationtype').val();
        var specificationcategory = $('#specificationcategory').val();

        if(this.value != '' && specificationcategory != '' && specificationtype == 'DEDUCTION'){
            sessionStorage.setItem('specificationcategory', specificationcategory);
            sessionStorage.setItem('employeeid', this.value);
        
            display_form_details('deduction type');
        }
        else{
            var updatespecamount = $('#updatespecamount').val();

            if(updatespecamount != ''){
                $('#specamount').val(updatespecamount);
            }

            $('#deductioncategory').val('');
        }
    });

    $(document).on('change','#employeewouser',function() {
        if(this.value != ''){
            sessionStorage.setItem('employeeid', this.value);
        
            display_form_details('employee name');
        }
        else{
            $('#firstname').val('');
            $('#middlename').val('');
            $('#role').val('');
            check_empty('', '#role', 'select');

            document.getElementById('firstname').readOnly = false;
            document.getElementById('middlename').readOnly = false;
            document.getElementById('lastname').readOnly = false;
            document.getElementById('role').disabled = false;
            document.getElementById('suffix').disabled = false;
        }
    });

    $(document).on('change','#generatepayrolloption',function() {
        if(this.value != '' && (this.value == 'selected' || this.value == 'exclude')){
            document.getElementById('employee').disabled = false;
        }
        else{
            $('#employee').val('').change();

            document.getElementById('employee').disabled = true;
        }
    });

    $(document).on('change','#specstartdate',function() {
        var recurrencepattern = $('#recurrencepattern').val();
        var recurrencecount = $('#recurrencecount').val();
        reset_element_validation('#specstartdate');

        if(this.value != '' && recurrencepattern != '' && recurrencecount > 0){
            calculate_payroll_specification_end_date(this.value, recurrencepattern, recurrencecount);
        }
        else{
            $('#specenddate').val(this.value);
        }
    });

    $(document).on('change','#recurrencepattern',function() {
        var specstartdate = $('#specstartdate').val();
        var recurrencecount = $('#recurrencecount').val();
        reset_element_validation('#recurrencepattern');

        if(this.value != ''){
            document.getElementById('recurrencecount').readOnly = false;
        }
        else{
            $('#recurrencecount').val('');
            document.getElementById('recurrencecount').readOnly = true;
        }

        if(this.value != '' && specstartdate != '' && recurrencecount > 0){
            calculate_payroll_specification_end_date(specstartdate, this.value, recurrencecount);
        }
        else{
            $('#specenddate').val(specstartdate);
        }
    });

    $(document).on('change','.employee-permission',function() {
        var str = $(this).val().split('-');
        var employee = str[0];
        var permission = str[1];

        if(permission == 'F' && this.checked){
            $('#' + employee + '-V').prop('checked', false);
            $('#' + employee + '-U').prop('checked', false);
            $('#' + employee + '-S').prop('checked', false);
            $('#' + employee + '-D').prop('checked', false);
        }
        else{
            $('#' + employee + '-F').prop('checked', false);
        }
    });

    $(document).on('change','#documentfilterby',function() {
        reset_element_validation('#documentfiltervalue');

        if(this.value != ''){
            generate_document_filter_value(this.value, '');
            document.getElementById('documentfiltervalue').disabled = false;
        }
        else{
            $('#documentfiltervalue').empty();

            var newOption = new Option('--', '', false, false);
            $('#documentfiltervalue').append(newOption);
            document.getElementById('documentfiltervalue').disabled = true;
        }
    });

    $(document).on('change','#transmittaldepartment',function() {
        $('#priorityperson').empty();

        if(this.value != ''){
            generate_priority_person(this.value, '');
            document.getElementById('priorityperson').disabled = false;
        }
        else{
            var newOption = new Option('--', '', false, false);
            $('#priorityperson').append(newOption);
            document.getElementById('priorityperson').disabled = true;
        }
    });

    $(document).on('change','#ticketdepartment',function() {
        $('#priorityperson').empty();

        if(this.value != ''){
            generate_priority_person(this.value, '');
            document.getElementById('priorityperson').disabled = false;
        }
        else{
            var newOption = new Option('--', '', false, false);
            $('#priorityperson').append(newOption);
            document.getElementById('priorityperson').disabled = true;
        }
    });

    $(document).on('change','.wcfdays',function() {
        var sum = 0;
        $(".wcfdays").each(function(){
            sum += +$(this).val();
        });
        $("#wcftotal").val(sum);
    });

    $(document).on('change','#wcftype',function() {
        reset_element_validation('#wcfloantype');

        if(this.value != ''){
            if(this.value == 'LOAN'){
                document.getElementById('wcfloantype').disabled = false;
            }
            else{
                document.getElementById('wcfloantype').disabled = true;
            }
        }
        else{
            document.getElementById('wcfloantype').disabled = true;
        }
    });


     // ================================changes lemar bill====================================

     //Purchase request

     if($('#purchase-request-items-datatable').length){
        $(document).on('change','[type=number]',function () {
          if($(this).val()<0){
            $(this).val(0)
          }
         })
      }


      if($('#total_budget').length){
        $(document).on('change','#total_budget',function () {
            console.log("nag bago");
        })
      }

     //vault access module
     $(document).on('change','#purpose',function () {
        if($(this).val() == 'VACTOTHER' ){
            $('#other_pur_container').show()
        }else{
            $('#other_pur_container').hide()
            $('#other_purpose').val('')
        }
     })
     
     $(document).on('change',"#name",function (e) {
        if($(this).val().length>0){
            
            $('#scan_vault').prop('disabled',false)
        }else{
           
            $('#scan_vault').prop('disabled',true) 
        }
       
     })

     //insurance module
     $(document).on('change','#insured_elf',function() {
      var d =  $(this).val()

      console.log(d);
      if(d == 'Y'){ 
        generate_select_option('#insur_com','acredited insurance option');
        $('#otherlines').prop('disabled',false);
        $('#rate').prop('disabled',true);
      }else{
        generate_select_option('#insur_com','insurance option');
        $('#otherlines').prop('disabled',true);
        $('#rate').prop('disabled',false);
      }
     });

     $(document).on('change','#p_term',function () {
        var d = $(this).val()
            if(d=='1time'){
                $('#nodays').prop('readonly',false)
            }else{ 
                $('#nodays').prop('readonly',true).val(0)
                
            }
     })

     $(document).on('change','#rate,#coverage,#ist,#col_id,#unit_desc,#insur_com,#classifi,#year_model,#mortgagee,#rate,#coverage,#otherlines,#pro_r_m,#aog,#isd,#p_term,#nodays',function () {
        
        var  formID = document.getElementById('addinsurancerequestForm');
        var formdata = new FormData(formID);
        var transaction = 'submit insurance request'
        formdata.append('transaction',transaction)
       // console.log(formData.values());
        $.ajax({
            type: 'POST',
            url: 'insurance-calculator.php',
            data: formdata,
            processData: false,
            contentType: false,
            beforeSend: function(){
                //document.getElementById('submitform').disabled = true;
                $('#submitform').html('<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>');
            },
            success: function (response) {
               var res = JSON.parse(response)[0]
               $('#pro_rt_amount').val(res.ProrataAmount);
               $('#iet').val(res.InceptionEndDate)
               $('#due_dt').val(res.DueDate)
               $('#odtl').val(res.Theft)
               $('#bodily_injured').val(res.BodilyInjured)
               $('#pro_dmg').val(res.PropertyDamage)
               $('#per_dmg').val(res.PersonnalAccident)
               $('#gross_prem').val(res.GrossPremium)
               $('#net_amt').val(res.NetAmount)
               $('#net_com').val(res.NetCommission)
               $('#tot_prem').val(res.TotalPremium)
               $('#income').val(res.Income)
               $('#deal_comm').val(res.DealersCommission)
    
    
            //    console.log(parseFloat(res.ProrataAmount));
                  console.log(res);
    
                
            },
            complete: function(){
                //document.getElementById('submitform').disabled = false;
                    $('#submitform').html('Submit');
              
                //$("#mdl_item_images").modal("hide");
            }
        });



        






     })

     $(document).on('change','#isd',function () {

     })

     //generation of categories options
     $(document).on('change','#filter-department-owner',function(){
        var formdata = new FormData()
        var department_owner = $('#filter-department-owner').val()
        formdata.append('dept_owner', department_owner)
        formdata.append('transaction',"generate inventory category")
        ajax_request_form('controller.php',formdata,function (d) {
          $("#filter-item-categories").html(d)
        })
     })


     $(document).on('change','#dept_owner',function() {
        //reset_element_validation('#wcfloantype');
        var selected_dept = $(this).val();
       generate_select_option('#item_cat','department item category option',{dept_owner : selected_dept});
       var cols  = [{'data': 'ITEM_ID'},{'data': 'BRAND'},{'data': 'MODEL'},{'data': 'DESCRIPTION'},{'data' : 'CURR_STATUS'},{'data' : 'CURR_ASSIGNED'},{'data': 'ACTION'}]
       datatable_custom_param('inventory item table','#item-inventory-datatable',{dept_owner : selected_dept},cols,0,'asc','');
    });

    $(document).on('change','#item_cat',function(){
        var selected_dept = $('#dept_owner').val();
        var selected_cat = $(this).val();
        var cols  = [{'data': 'ITEM_ID'},{'data': 'BRAND'},{'data': 'MODEL'},{'data': 'DESCRIPTION'},{'data' : 'CURR_STATUS'},{'data' : 'CURR_ASSIGNED'},{'data': 'ACTION'}]
        datatable_custom_param('inventory item table','#item-inventory-datatable',{dept_owner : selected_dept,item_cat : selected_cat},cols,0,'asc','');
    })

    $(document).on('change','#additem_dept_owner',function() {
        //reset_element_validation('#wcfloantype');
        var selected_dept = $(this).val();
        generate_select_option('#additem_itemcategory','department item category option',{dept_owner : selected_dept});
        $('#additem_brand').html('<option value="">-- --<option>')
        
    });

    $(document).on('change','#additem_itemcategory',function() {
        reset_element_validation('#wcfloantype');
        var selected_item_cat = $(this).val();
        generate_select_option('#additem_brand','item category brand option',{sel_cat : selected_item_cat});
        console.log(selected_item_cat);
        
    });

    //for editing item
    $(document).on('change','#edittem_dept_owner',function() {
        //reset_element_validation('#wcfloantype');
        var selected_dept = $(this).val();
        generate_select_option('#edititem_itemcategory','department item category option',{dept_owner : selected_dept});
        $(this).select2({});
       
    });


    $(document).on('change','#edititem_itemcategory',function() {
        //reset_element_validation('#wcfloantype');
        var selected_item_cat = $(this).val();
        generate_select_option('#edititem_brand','item category brand option',{sel_cat : selected_item_cat});
        $(this).select2({});
        $('#edititem_brand').select2({});
    });


    $(document).on('change','#dept_owner_cat',function() {
        console.log('change');
        var selected_item_cat = $(this).val();
        var cols  = [{'data': 'ITEM_CATEGORY'},{'data': 'CATEG_NAME'},{'data': 'ACTION'}]
        datatable_custom_param('inventory category table','#item-category-datatable',{dept_owner_cat : selected_item_cat},cols,0,'asc','');
        
    });

    $(document).on('change',"#additem_dept_owner_cat",function () {
        var selected_dept = $(this).val();
        generate_select_option('#additem_brand_cat','item category option',{dept_owner : selected_dept});
    })


    $(document).on('change',"#dept_owner_brand",function () {
        var selected_dept = $(this).val();
        generate_select_option('#brand_cat','department item category option',{dept_owner : selected_dept});
        var cols  = [{'data': 'BRAND_CODE'},{'data': 'BRANDNAME'},{'data': 'ACTION'}]
        datatable_custom_param('inventory brand table','#item-brand-datatable',{dept_owner_brand : selected_dept},cols,0,'asc','');
    })

    $(document).on('change',"#addbrand_dept_owner",function(){
        var selected_dept = $(this).val();
        generate_select_option('#addbrand_cat','item category option',{dept_owner : selected_dept});
    })

    
    $(document).on('change','#brand_cat',function () {
        var selected_dept = $('#dept_owner_brand').val();
        var cols  = [{'data': 'BRAND_CODE'},{'data': 'BRANDNAME'},{'data': 'ACTION'}]
        datatable_custom_param('inventory brand table','#item-brand-datatable',{dept_owner_brand : selected_dept,brand_cat: $(this).val() },cols,0,'asc','');
    })

    $(document).on('change','#dept_owner_report',function () {
        var selected_dept = $(this).val();
        $('#item_brand_report').html('');
        generate_select_option('#item_cat_report','department item category option',{dept_owner : selected_dept});
        var cols  = [{'data': 'ITEM_ID'},{'data': 'BRAND'},{'data': 'MODEL'},{'data': 'DESCRIPTION'},{'data' : 'CURR_STATUS'},{'data' : 'CURR_ASSIGNED'},{'data':'SERIAL_NUMBER'}]
        console.log(selected_dept);
       datatable_custom_param('inventory item inquiry table','#item-inventory-report-datatable',{dept_owner : selected_dept},cols,0,'asc','');
    })

    $(document).on('change',"#item_cat_report",function () {
        var selected_dept = $('#dept_owner_report').val()
        var selected_cat = $(this).val();
        console.log(selected_cat);
        generate_select_option('#item_brand_report','item category brand option',{sel_cat : selected_cat});
        var cols  = [{'data': 'ITEM_ID'},{'data': 'BRAND'},{'data': 'MODEL'},{'data': 'DESCRIPTION'},{'data' : 'CURR_STATUS'},{'data' : 'CURR_ASSIGNED'},{'data':'SERIAL_NUMBER'}]
        datatable_custom_param('inventory item inquiry table','#item-inventory-report-datatable',{dept_owner : selected_dept,item_cat : selected_cat},cols,0,'asc','');
    })


    $(document).on('change',"#item_brand_report",function () {
        var selected_dept = $('#dept_owner_report').val()
        var selected_cat = $("#item_cat_report").val();
        var selected_brand = $(this).val()
        var cols  = [{'data': 'ITEM_ID'},{'data': 'BRAND'},{'data': 'MODEL'},{'data': 'DESCRIPTION'},{'data' : 'CURR_STATUS'},{'data' : 'CURR_ASSIGNED'},{'data':'SERIAL_NUMBER'}]
        datatable_custom_param('inventory item inquiry table','#item-inventory-report-datatable',{dept_owner : selected_dept,item_cat : selected_cat,item_brand: selected_brand},cols,0,'asc','');
    })
    // ================================changes lemar bill=====================================


    $(document).on('change','#transmittalfilterby',function() {
        reset_element_validation('#transmittalfiltervalue');

        if(this.value != ''){
            generate_transmittal_filter_value(this.value, '');
            document.getElementById('transmittalfiltervalue').disabled = false;
        }
        else{
            $('#transmittalfiltervalue').empty();

            var newOption = new Option('--', '', false, false);
            $('#transmittalfiltervalue').append(newOption);
            document.getElementById('transmittalfiltervalue').disabled = true;
        }
    });

    $(document).on('change','#question5',function() {
        reset_element_validation('#specific');

        if(this.value == 1){
            document.getElementById('specific').disabled = false;
        }
        else{
            document.getElementById('specific').disabled = true;
        }
    });

    $(document).on('change','#duedatetype',function() {
        reset_element_validation('#duedate');

        if(this.value == 'SPECIFICDATE'){
            document.getElementById('duedate').disabled = false;
        }
        else{
            document.getElementById('duedate').disabled = true;
            $('#duedate').val('');
        }
    });

    $(document).on('change','.employee-meeting-permission',function() {
        var str = $(this).val().split('-');
        var employee = str[0];
        var permission = str[1];

        if(permission == 'A' && this.checked){
            $('#' + employee + '-V').prop('checked', true);
        }
    });

    $(document).on('change','#meetingemployee',function() {
        select_employee_department(this.value);
    });
	
	$(document).on('change','#search_brand',function() {
        var search_model = $('#search_model').val();

        if(this.value != '' || search_model != ''){
            reset_element_validation('#price_index_item');
            generate_price_index_item_option(this.value, search_model);
        }
        else{
            $('#price_index_item').append(new Option('--', '', false, false));
            $('#price_index_item').val('').change();
            document.getElementById('price_index_item').disabled = true;
        }
    });

    $(document).on('change','#search_model',function() {
        var search_brand = $('#search_brand').val();

        if(this.value != '' || search_brand != ''){
            reset_element_validation('#price_index_item');
            generate_price_index_item_option(search_brand, this.value);
        }
        else{
            $('#price_index_item').append(new Option('--', '', false, false));
            $('#price_index_item').val('').change();
            document.getElementById('price_index_item').disabled = true;
        }
    });



    
});