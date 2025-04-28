(function ($) {
  "use strict";
  $(function () {
    if ($("#page-datatable").length) {
      generate_datatable("page table", "#page-datatable", 0, "asc", [1]);
    }

    if ($("#permission-datatable").length) {
      generate_datatable(
        "permission table",
        "#permission-datatable",
        0,
        "asc",
        [3]
      );
    }

    if ($("#roles-datatable").length) {
      generate_datatable("roles table", "#roles-datatable", 0, "asc", [2]);
    }

    if ($("#system-code-datatable").length) {
      generate_datatable(
        "system code table",
        "#system-code-datatable",
        0,
        "asc",
        [3]
      );
    }

    if ($("#system-parameter-datatable").length) {
      generate_datatable(
        "system parameter table",
        "#system-parameter-datatable",
        0,
        "asc",
        [3]
      );
    }

    if ($("#user-logs-datatable").length) {
      generate_datatable(
        "user logs table",
        "#user-logs-datatable",
        0,
        "desc",
        []
      );
    }

    if ($("#employee-list-datatable").length) {
      generate_datatable_two_parameter(
        "employee list table",
        "",
        "",
        "#employee-list-datatable",
        0,
        "asc",
        [6]
      );
    }

    if ($("#department-datatable").length) {
      generate_datatable(
        "department table",
        "#department-datatable",
        0,
        "desc",
        [1]
      );
    }

    if ($("#designation-datatable").length) {
      generate_datatable(
        "designation table",
        "#designation-datatable",
        0,
        "desc",
        [1]
      );
    }

    if ($("#branch-datatable").length) {
      generate_datatable("branch table", "#branch-datatable", 0, "desc", [1]);
    }

    if ($("#holiday-datatable").length) {
      generate_datatable("holiday table", "#holiday-datatable", 0, "desc", [3]);
    }

    if ($("#leave-type-datatable").length) {
      generate_datatable(
        "leave type table",
        "#leave-type-datatable",
        0,
        "desc",
        [3]
      );
    }

    if ($("#leaves-datatable").length) {
      generate_datatable("leave table", "#leaves-datatable", 0, "desc", [6]);
    }

    if ($("#employee-leave-entitlement-datatable").length) {
      var employee_profile_employee_id = $(
        "#employee-profile-employee-id"
      ).text();

      generate_datatable_one_parameter(
        "employee leave entitlement table",
        employee_profile_employee_id,
        "#employee-leave-entitlement-datatable",
        0,
        "desc",
        [3]
      );
    }

    if ($("#employee-document-datatable").length) {
      var employee_profile_employee_id = $(
        "#employee-profile-employee-id"
      ).text();

      generate_datatable_one_parameter(
        "employee document table",
        employee_profile_employee_id,
        "#employee-document-datatable",
        0,
        "desc",
        [1]
      );
    }

    if ($("#employee-leave-datatable").length) {
      var employee_profile_employee_id = $(
        "#employee-profile-employee-id"
      ).text();

      generate_datatable_one_parameter(
        "employee leave table",
        employee_profile_employee_id,
        "#employee-leave-datatable",
        0,
        "desc",
        [4]
      );
    }

    if ($("#employee-attendance-logs-datatable").length) {
      var employee_profile_employee_id = $(
        "#employee-profile-employee-id"
      ).text();

      generate_datatable_one_parameter(
        "employee attendance logs table",
        employee_profile_employee_id,
        "#employee-attendance-logs-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#payroll-specification-datatable").length) {
      generate_datatable(
        "payroll specification table",
        "#payroll-specification-datatable",
        0,
        "desc",
        [6]
      );
    }

    if ($("#deduction-type-datatable").length) {
      generate_datatable(
        "deduction type table",
        "#deduction-type-datatable",
        0,
        "desc",
        [2]
      );
    }

    if ($("#deduction-amount-datatable").length) {
      var deduction_type_id = $("#deduction-type-id").text();

      generate_datatable_one_parameter(
        "deduction amount table",
        deduction_type_id,
        "#deduction-amount-datatable",
        0,
        "desc",
        [3]
      );
    }

    if ($("#main-deduction-amount-datatable").length) {
      generate_datatable(
        "main deduction amount table",
        "#main-deduction-amount-datatable",
        0,
        "desc",
        [3]
      );
    }

    if ($("#allowance-type-datatable").length) {
      generate_datatable(
        "allowance type table",
        "#allowance-type-datatable",
        0,
        "desc",
        [1]
      );
    }

    if ($("#other-income-type-datatable").length) {
      generate_datatable(
        "other income type table",
        "#other-income-type-datatable",
        0,
        "desc",
        [1]
      );
    }

    if ($("#user-account-datatable").length) {
      generate_datatable(
        "user account table",
        "#user-account-datatable",
        0,
        "asc",
        [7]
      );
    }

    if ($("#email-notification-datatable").length) {
      generate_datatable(
        "email notification table",
        "#email-notification-datatable",
        0,
        "asc",
        [2]
      );
    }

    if ($("#payroll-datatable").length) {
      generate_datatable_one_parameter(
        "payroll table",
        "",
        "#payroll-datatable",
        1,
        "desc",
        [11]
      );
    }

    if ($("#office-shift-datatable").length) {
      generate_datatable(
        "office shift table",
        "#office-shift-datatable",
        0,
        "asc",
        [6]
      );
    }

    if ($("#system-time").length) {
      system_time();
      get_notification_count();
    }

    if ($("#attendance-clock").length) {
      attendance_time();
      get_location("");
    }

    if ($("#payroll-group-datatable").length) {
      generate_datatable(
        "payroll group table",
        "#payroll-group-datatable",
        0,
        "asc",
        [1]
      );
    }

    if ($("#payroll-group-employee-datatable").length) {
      generate_datatable(
        "payroll group employee table",
        "#payroll-group-employee-datatable",
        0,
        "asc",
        [1]
      );
    }

    if ($("#attendance-record-datatable").length) {
      generate_datatable_two_parameter(
        "attendance logs table",
        "",
        "",
        "#attendance-record-datatable",
        1,
        "desc",
        [12],
        "1"
      );
    }

    if ($("#attendance-adjustment-summary-datatable").length) {
      generate_datatable_two_parameter(
        "attendance adjustment summary table",
        "",
        "",
        "#attendance-adjustment-summary-datatable",
        0,
        "asc",
        "",
        "1"
      );
    }

    if ($("#leaves-application-datatable").length) {
      generate_datatable(
        "leave application table",
        "#leaves-application-datatable",
        0,
        "desc",
        [6]
      );
    }

    if ($("#employee-attendance-record-datatable").length) {
      generate_datatable_two_parameter(
        "employee attendance record table",
        "",
        "",
        "#employee-attendance-record-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#employee-attendance-adjustment-datatable").length) {
      generate_datatable_two_parameter(
        "employee attendance adjustment table",
        "",
        "",
        "#employee-attendance-adjustment-datatable",
        0,
        "desc",
        [8]
      );
    }

    if ($("#attendance-adjustment-recommendation-datatable").length) {
      generate_datatable(
        "attendance adjustment recommendation table",
        "#attendance-adjustment-recommendation-datatable",
        0,
        "desc",
        [8]
      );
    }

    if ($("#attendance-adjustment-datatable").length) {
      generate_datatable(
        "attendance adjustment table",
        "#attendance-adjustment-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#attendance-summary-datatable").length) {
      var export_attendance_summary = check_permission("158");

      if (export_attendance_summary > 0) {
        generate_datatable_two_parameter(
          "attendance summary table",
          "",
          "",
          "#attendance-summary-datatable",
          0,
          "desc",
          [17],
          "1"
        );
      } else {
        generate_datatable_two_parameter(
          "attendance summary table",
          "",
          "",
          "#attendance-summary-datatable",
          0,
          "desc",
          [17]
        );
      }
    }

    if ($("#payroll-summary-datatable").length) {
      var export_payroll_summary = check_permission("159");

      if (export_payroll_summary > 0) {
        generate_datatable_one_parameter(
          "payroll summary table",
          "",
          "#payroll-summary-datatable",
          1,
          "desc",
          [11],
          "1"
        );
      } else {
        generate_datatable_one_parameter(
          "payroll summary table",
          "",
          "#payroll-summary-datatable",
          1,
          "desc",
          [11]
        );
      }
    }

    if ($("#telephone-log-datatable").length) {
      generate_datatable(
        "telephone log table",
        "#telephone-log-datatable",
        0,
        "desc",
        [9]
      );
    }

    if ($("#telephone-log-approval-datatable").length) {
      generate_datatable(
        "telephone log approval table",
        "#telephone-log-approval-datatable",
        0,
        "desc",
        [8]
      );
    }

    if ($("#document-authorizer-datatable").length) {
      generate_datatable(
        "document authorizer table",
        "#document-authorizer-datatable",
        0,
        "desc",
        [2]
      );
    }

    if ($("#pending-document-datatable").length) {
      generate_datatable(
        "pending documents table",
        "#pending-document-datatable",
        0,
        "desc",
        [7]
      );
    }
    
     if ($("#rescinded-document-datatable").length) {
      generate_datatable(
        "rescinded documents table",
        "#rescinded-document-datatable",
        0,
        "desc",
        [7]
      );
    }

    if ($("#publish-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish documents table",
        "",
        "",
        "",
        "#publish-document-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#publish-images-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish images documents table",
        "",
        "",
        "",
        "#publish-images-document-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#publish-memorandum-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish memorandum documents table",
        "",
        "",
        "",
        "#publish-memorandum-document-datatable",
        0,
        "desc",
        [11]
      );

     
      var form = new FormData;
      form.append('selected_department','');
      form.append('transaction','get employee by department');
      ajax_request_form('controller.php',form,function (res) {
        var disp=`  <option value="">-- --</option>`;
        res.forEach(element => {
          if(element.EMPLOYEE_ID != 'USER-GUARD' &&  element.EMPLOYEE_ID != 'USER-wg1xs8lm7orn786nc4so'){
            disp += `<option value="${element.EMPLOYEE_ID}">${element.LAST_NAME}, ${element.FIRST_NAME}, ${element.MIDDLE_NAME}</option>`
          }
        });
        $('#filter_memo_author').html(disp)
      })

    }

    if ($("#publish-loan-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish loan documents table",
        "",
        "",
        "",
        "#publish-loan-document-datatable",
        0,
        "desc",
        [11]
      );
    }
    
    if ($("#publish-credit-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish credit documents table",
        "",
        "",
        "",
        "#publish-credit-document-datatable",
        0,
        "desc",
        [11]
      );
    }
      
    
           if ($("#publish-admin-document-datatable").length) {
      generate_datatable_three_parameter(
        "publish admin documents table",
        "",
        "",
        "",
        "#publish-admin-document-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#publish-forms-datatable").length) {
      generate_datatable_three_parameter(
        "publish forms table",
        "",
        "",
        "",
        "#publish-forms-datatable",
        0,
        "desc",
        [11]
      );
    }

    if ($("#transmittal-datatable").length) {
      generate_datatable_two_parameter(
        "transmittal table",
        "",
        "",
        "#transmittal-datatable",
        3,
        "desc",
        [6]
      );
    }

    if ($("#suggest-to-win-datatable").length) {
      generate_datatable_two_parameter(
        "suggest to win table",
        "",
        "",
        "#suggest-to-win-datatable",
        1,
        "asc",
        [6]
      );
    }

    if ($("#suggest-to-win-approval-datatable").length) {
      generate_datatable_two_parameter(
        "suggest to win approval table",
        "",
        "",
        "#suggest-to-win-approval-datatable",
        1,
        "asc",
        [7]
      );
    }

    if ($("#suggest-to-win-voting-datatable").length) {
      generate_datatable(
        "suggest to win voting table",
        "#suggest-to-win-voting-datatable",
        1,
        "asc",
        [8]
      );
    }

    if ($("#suggest-to-win-vote-summary-datatable").length) {
      generate_datatable_two_parameter(
        "suggest to win vote summary table",
        "",
        "",
        "#suggest-to-win-vote-summary-datatable",
        7,
        "asc",
        [8]
      );
    }

    if ($("#training-room-log-datatable").length) {
      generate_datatable_two_parameter(
        "training room log table",
        "",
        "",
        "#training-room-log-datatable",
        0,
        "asc",
        [11]
      );
    }

    if ($("#training-room-log-approval-datatable").length) {
      generate_datatable(
        "training room log approval table",
        "#training-room-log-approval-datatable",
        0,
        "asc",
        [6]
      );
    }

    if ($("#email-recipient-datatable").length) {
      var notificationid = $("#notification-id").text();
      generate_datatable_one_parameter(
        "email recipient table",
        notificationid,
        "#email-recipient-datatable",
        0,
        "asc",
        [1]
      );
    }

    if ($("#weekly-cash-flow-datatable").length) {
      generate_datatable_one_parameter(
        "weekly cash flow table",
        "",
        "#weekly-cash-flow-datatable",
        2,
        "desc",
        [5]
      );
    }

    if ($("#weekly-cash-flow-particulars-datatable").length) {
      var wcfid = $("#wcf-id").text();
      generate_datatable_one_parameter(
        "weekly cash flow particulars table",
        wcfid,
        "#weekly-cash-flow-particulars-datatable",
        0,
        "desc",
        [9]
      );
    }

    if ($("#weekly-cash-flow-summary-datatable").length) {
      var export_weekly_cash_flow_summary = check_permission("335");

      if (export_weekly_cash_flow_summary > 0) {
        generate_datatable_one_parameter(
          "weekly cash flow summary table",
          "",
          "#weekly-cash-flow-summary-datatable",
          0,
          "desc",
          "",
          "1"
        );
      } else {
        generate_datatable_one_parameter(
          "weekly cash flow summary table",
          "",
          "#weekly-cash-flow-summary-datatable",
          0,
          "desc",
          ""
        );
      }
    }

    if ($("#ticket-datatable").length) {
      generate_datatable_three_parameter(
        "ticket table",
        "",
        "",
        "",
        "#ticket-datatable",
        0,
        "desc",
        [14]
      );
    }

    if ($("#ticket-attachment-datatable").length) {
      var ticketid = $("#ticket-id").text();
      generate_datatable_one_parameter(
        "ticket attachment table",
        ticketid,
        "#ticket-attachment-datatable",
        0,
        "desc",
        [5]
      );
    }

    if ($("#ticket-adjustment-datatable").length) {
      var ticketid = $("#ticket-id").text();
      generate_datatable_one_parameter(
        "ticket request table",
        ticketid,
        "#ticket-adjustment-datatable",
        0,
        "desc",
        [12]
      );
    }

    if ($("#ticket-adjustment-request-datatable").length) {
      generate_datatable(
        "ticket adjustment request table",
        "#ticket-adjustment-request-datatable",
        0,
        "desc",
        [10]
      );
    }

    // =================changes lemar bill======================================

    //purchasing module

    if($('#purchasing-module-pritems').length){
    $("#repeater").repeater();
    }

    else if($('#purchase-request-datatable').length){
      generate_datatable(
        "purchase request table",
        "#purchase-request-datatable",
        0,
        "desc"
      )
    }

    if($('#purchase-request-items-datatable').length){
      generate_datatable(
        "purchase request items table",
        "#purchase-request-items-datatable",
        2,
        "desc"
      )
      
    }

    //vault access

    if($('#vault-access-datatable').length){

        generate_datatable(
            "vault access logs table",
            "#vault-access-datatable",
            0,
            "desc"
          );

       
    }

    if ($("#vault-view").length) {

     //localStorage.clear()
      // this line is for force https
      if (window.location.protocol == "http:") {
        console.log(
          "you are accessing us via " +
            "an insecure protocol (HTTP). " +
            "Redirecting you to HTTPS."
        );

        window.location.href = window.location.href.replace("http:", "https:");
      } else if (window.location.protocol == "https:") {
        console.log("you are accessing us via" + " our secure HTTPS protocol.");
      }



      //if device is not supported storage API
      if (typeof Storage !== "undefined") {
        
        if (localStorage.getItem("ID") != null) {

          $('#ID_vault').html(localStorage.getItem("ID"))
          $("#name,#purpose,#btn_remember").prop("disabled", "true");
          $("#scan_vault").prop("disabled", false);
          $("#scan_vault")
            .html("Scan to time out")
            .removeClass("btn-primary")
            .addClass("btn-danger");


          var formdata = new FormData();
          formdata.append("ID", localStorage.getItem("ID"));
          formdata.append("transaction", "get vault details");

          ajax_request_form(
            "controller.php",
            formdata,
            function (e) {},
            function (e) {
              var data = JSON.parse(e.responseText);
              var names = data[0]["PERSON"];
              const name_arr = names.split(",");
              console.log(data);
              var disp = ``;
              //
              if ($("#name").val() == 0) {
                name_arr.forEach((element) => {
                  disp += `<option selected value="${element}">${element}</option>`;
                });
                  $("#name").html(disp);
                  
                 
              }
              $('#purpose').val(data[0].ACTIVITY).change()
              $('#other_purpose').val(data[0].REMARKS).prop('disabled',true)
            }
          );
        }else{

          if (
            localStorage.getItem("names") != null &&
            localStorage.getItem("names") != ""
          ) {
            var data = localStorage.getItem("names").split(",");
            var disp = ``;
            data.forEach((element) => {
              disp += `<option selected value="${element}">${element}</option>`;
            });
  
            $("#name").html(disp);
          } else {
            localStorage.removeItem("names");
          }






        }
        //qr
        function onScanSuccess(decodedText, decodedResult) {
          // Handle on success condition with the decoded text or result.
          $("#btn_stop").click();
          var names = $("#name").val();
          var str_names = names.toString();
          var purpose = $("#purpose").val();
          var other_purpose = $('#other_purpose').val()


          var names = $("#name").val();
          localStorage.setItem("remember", "true");
          localStorage.setItem("names", names);
         // show_alert_event("Success", "Usernames is saved", "success");


          //time in
          if (localStorage.getItem("ID") == null) {
            console.log($('#name').val().length);

            if($('#name').val().length > 0){

                var formdata = new FormData();
                formdata.append("transaction", "submit vault access");
                formdata.append("names", str_names);
                formdata.append("purpose", purpose);
                formdata.append("scannedtext", decodedText);
                formdata.append("other_purpose",other_purpose)
    
                ajax_request_form(
                  "controller.php",
                  formdata,
                  function (d) {
                    console.log(d);
                  },
                  function (e) {
                    var id = JSON.parse(e.responseText);
                    console.log(id);
                    console.log(localStorage);
    
                    localStorage.setItem("status", "time-in");
                    localStorage.setItem("ID", id["ID"]);
                    show_alert_event(
                      "Time In ",
                      "Time in success",
                      "success",
                      "reload"
                    );
                  }
                );


            }else{
                show_alert_event(
                    "No Name",
                    "unable to process",
                    "error",
                  );
            }
            
           //time out
          } else {
            console.log(localStorage);

            var formdata = new FormData();
            formdata.append("transaction", "time out vault access");
            formdata.append("ID", localStorage.getItem("ID"));
            formdata.append("scannedtext", decodedText);

            ajax_request_form(
              "controller.php",
              formdata,
              function (e) {},
              function (e) {
                console.log(e.responseText);

                if(e.responseText == '"clock out"'){
                  show_alert_event(
                  "Time Out",
                  "time out success",
                  "success",
                  "reload"
                );
                localStorage.removeItem("ID");
                }else{
                  show_alert('Error',e.responseText,'error')
                }
                
              }
            );
          }

          //alert(`Scan result: ${url}`, decodedResult);
        }
        var html5QrcodeScanner = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: 160,
        });
        html5QrcodeScanner.render(onScanSuccess);





        //click functions
        // $("#btn_remember").on("click", function () {
        //   var names = $("#name").val();
        //   localStorage.setItem("remember", "true");
        //   localStorage.setItem("names", names);
        //   show_alert_event("Success", "Usernames is saved", "success");
        // });
      } else {
        // Sorry! No Web Storage support..
        alert("Storage is not supported, Remember Username is no available");
      }
    }

    //insurance request app
    if ($("#insurance-request-datatable").length) {
      generate_datatable(
        "insurance request table",
        "#insurance-request-datatable",
        0,
        "desc"
      );
    }

    //inventory module
    if ($("#item-inventory-datatable").length) {
      var cols = [
        { data: "ITEM_ID" },
        { data: "BRAND" },
        { data: "MODEL" },
        { data: "DESCRIPTION" },
        { data: "CURR_STATUS" },
        { data: "CURR_ASSIGNED" },
        { data: "ACTION" },
      ];
      //initialize the filter options
      var dept_owner = $('#filter-department-owner').val()
      var formdata = new FormData()
      formdata.append('dept_owner', dept_owner)
      formdata.append('transaction',"generate inventory category")
      ajax_request_form('controller.php',formdata,function (d) {
        console.log(d);
      })

      generate_select_option("#dept_owner", "department option");
      var user_dept = $("#user_dept").val();

      setTimeout(() => {
        var sel_dept = $("#dept_owner option").eq(0).val();
        datatable_custom_param(
          "inventory item table",
          "#item-inventory-datatable",
          { dept_owner: sel_dept },
          cols,
          0,
          "asc",
          ""
        );
        generate_select_option("#item_cat", "department item category option", {
          dept_owner: sel_dept,
        });
      }, 1000);




      setTimeout(() => {
        if (user_dept != "all") {
          $("#dept_owner").val(user_dept).change();
          $("#dept_owner").prop("disabled", true);
        }
      }, 1500);

      $("#mdl_item_owner_history,#mdl_assignitem,#mdl_returnitem").on(
        "hidden.bs.modal",
        function () {
          // $('#mdl_edititem').modal('show')
          var item_id = $("#item_code").html();
          var username = $("#username").text();
          display_item(item_id, username);
        }
      );

      $(".btn-generate-eaa").hide();
      $("#item_loc").on("keyup", function () {
        $(".btn-generate-eaa").show();
        if ($(this).val().length == 0) {
          $(".btn-generate-eaa").hide();
        }
      });



    }
  if ($("#tbl-blank").length) {
      console.log("nakita na");
      $(document).ready(function() {
        $('.select2').select2({
          placeholder: 'Select an option',
  allowClear: true  
        });
      });
  }

    //activity note app
    if ($("#activity-attachment-datatable").length) {
      generate_datatable(
        "activity table attachment",
        "#activity-attachment-datatable",
        0,
        "desc"
      );
    }

    if ($("#activity-note-datatable").length) {
      generate_datatable(
        "activity table",
        "#activity-note-datatable",
        5,
        "desc",
        [0, 7]
      );
      var username = $("#username").html();
      var transaction = "get permission";

      ajax_request(
        "controller.php",
        { username: username, transaction: transaction, permissionid: 386 },
        function (d) {},
        function (res) {
          if (res.responseText == "0") {
            $(".dt-buttons").remove();
          }
        }
      );

      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(
          (position) => {
            localStorage.setItem("longitude", position.coords.longitude);
            localStorage.setItem("latitude", position.coords.latitude);
          },
          function (error) {
            if (error.code == error.PERMISSION_DENIED) {
              show_alert("Location", `Please Allow the Location`, "error");
              $("#submitform").prop("disabled", true);
              localStorage.setItem("longitude", null);
              localStorage.setItem("latitude", null);
            }
          }
        );
      } else {
        alert("Location not available");
      }
    }
    if ($("#item-category-datatable").length) {
      setTimeout(() => {
        //select the 1st option
        var sel_dept = $("#dept_owner_cat option").eq(0).val();
        var cols = [
          { data: "ITEM_CATEGORY" },
          { data: "CATEG_NAME" },
          { data: "ACTION" },
        ];
        datatable_custom_param(
          "inventory category table",
          "#item-category-datatable",
          { dept_owner_cat: sel_dept },
          cols,
          0,
          "asc",
          ""
        );
      }, 1000);
    }

    if ($("#item-brand-datatable").length) {
      generate_select_option("#dept_owner_brand", "department option");

      setTimeout(() => {
        //select the 1st option
        var sel_dept = $("#dept_owner_brand option").eq(0).val();
        generate_select_option(
          "#brand_cat",
          "department item category option",
          { dept_owner: sel_dept }
        );

        var cols = [
          { data: "BRAND_CODE" },
          { data: "BRANDNAME" },
          { data: "ACTION" },
        ];
        datatable_custom_param(
          "inventory brand table",
          "#item-brand-datatable",
          { dept_owner_brand: sel_dept },
          cols,
          0,
          "asc",
          ""
        );
      }, 1000);
    }
    if ($("#item-assign-cat-brand-datatable").length) {
      setTimeout(() => {
        var cols = [{ data: "CATEG_NAME" }, { data: "ACTION" }];
        datatable_custom_param(
          "inventory assign cat brand table",
          "#item-assign-cat-brand-datatable",
          null,
          cols,
          0,
          "asc",
          ""
        );
      }, 1000);
    }

    if ($("#item-inventory-report-datatable").length) {
      generate_select_option("#dept_owner_report", "department option");

      setTimeout(() => {
        //select the 1st option
        var sel_dept = $("#dept_owner_report option").eq(0).val();
        console.log(sel_dept);
        generate_select_option(
          "#item_cat_report",
          "department item category option",
          { dept_owner: sel_dept }
        );

        var cols = [
          { data: "ITEM_ID" },
          { data: "BRAND" },
          { data: "MODEL" },
          { data: "DESCRIPTION" },
          { data: "CURR_STATUS" },
          { data: "CURR_ASSIGNED" },
          { data: "SERIAL_NUMBER" },
        ];
        var buttons = ["csv", "excel", "pdf"];
        datatable_custom_param(
          "inventory item inquiry table",
          "#item-inventory-report-datatable",
          { dept_owner: sel_dept },
          cols,
          0,
          "asc"
        );
      }, 1000);
    }

    if ($("#item-dept-has-cat-datatable").length) {
      setTimeout(() => {
        var cols = [{ data: "DEPARTMENT" }, { data: "ACTION" }];
        datatable_custom_param(
          "inventory department table",
          "#item-dept-has-cat-datatable",
          null,
          cols,
          0,
          "desc"
        );
      }, 1000);
    }
    // =================changes lemar bill======================================

    if ($("#telephone-log-summary-datatable").length) {
      generate_datatable_three_parameter(
        "telephone log summary table",
        "",
        "",
        "",
        "#telephone-log-summary-datatable",
        0,
        "desc",
        ""
      );
    }

    if ($("#profile-employee-leave-entitlement-datatable").length) {
      var employee_id = $("#employee-id").text();

      generate_datatable_one_parameter(
        "profile employee leave entitlement table",
        employee_id,
        "#profile-employee-leave-entitlement-datatable",
        0,
        "desc",
        ""
      );
    }

    if ($("#profile-employee-document-datatable").length) {
      var employee_id = $("#employee-id").text();

      generate_datatable_one_parameter(
        "profile employee document table",
        employee_id,
        "#profile-employee-document-datatable",
        0,
        "desc",
        ""
      );
    }

    if ($("#profile-employee-leave-datatable").length) {
      var employee_id = $("#employee-id").text();

      generate_datatable_one_parameter(
        "profile employee leave table",
        employee_id,
        "#profile-employee-leave-datatable",
        0,
        "desc",
        ""
      );
    }

    if ($("#profile-employee-attendance-logs-datatable").length) {
      var employee_id = $("#employee-id").text();

      generate_datatable_one_parameter(
        "profile employee attendance logs table",
        employee_id,
        "#profile-employee-attendance-logs-datatable",
        0,
        "desc",
        ""
      );
    }

    if ($("#dashboard-transmittal-datatable").length) {
      generate_datatable(
        "dashboard transmittal table",
        "#dashboard-transmittal-datatable",
        3,
        "desc",
        ""
      );
    }

    /////////////////////////////////////////////////////////////
    // SALES PARTNER BOOKING DATATABLE
    if ($("#sales-partner-booking-datatable").length) {
      generate_datatable(
        "sales partner booking table",
        "#sales-partner-booking-datatable",
        0,
        "desc",
        "",
        1
      );
    }

    /////////////////////////////////////////////////////////////
    // POSITION MONTHLY QUOTA DATATABLE
    if ($("#position-monthly-quota-datatable").length) {
      generate_datatable(
        "position monthly quota table",
        "#position-monthly-quota-datatable",
        0,
        "desc",
        "",
        1
      );
    }

    /////////////////////////////////////////////////////////////
    // POSITION MONTHLY QUOTA DATATABLE
    if ($("#position-monthly-quota-history-datatable").length) {
      generate_datatable(
        "position monthly quota history table",
        "#position-monthly-quota-history-datatable",
        0,
        "desc",
        "",
        1
      );
    }

    /////////////////////////////////////////////////////////////
    // BRANCH MONTHLY QUOTA HISTORY DATATABLE
    if ($("#branch-monthly-quota-history-datatable").length) {
      generate_datatable(
        "branch monthly quota history table",
        "#branch-monthly-quota-history-datatable",
        0,
        "desc",
        "",
        1
      );
    }


    ///////////////////////////////////////////////////////////////
    // FUNCTION FOR CAPITALIZING EACH WORD
    function capitalizeFirstLetter(str) {
      return str.replace(/\b\w/g, match => match.toUpperCase());
    }


    /////////////////////////////////////////////////////////////////
    // SALES PARTNER MONTHLY BOOKING CHART
    if ($("#sales-partner-monthly-booking-chart").length) {
      transaction = "sales partner monthly booking details";

      $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { transaction: transaction },
        success: function(response) {
          const salesPartnerData = response.map(data => ({
            name: capitalizeFirstLetter(data.full_name.toLowerCase()),
            quotaPercentage: data.percentage_of_quota
          }));
      
          const salesPartnerMonthlyBookingChart = document.getElementById('sales-partner-monthly-booking-chart');
          new Chart(salesPartnerMonthlyBookingChart, {
            type: 'bar',
            data: {
              labels: salesPartnerData.map(data => data.name),
              datasets: [{
                label: 'Quota Percentage',
                data: salesPartnerData.map(data => data.quotaPercentage),
                borderWidth: 1
              }]
            },
            options: {
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 100
                }
              }
            }
          });
        }
      });
      
      





      // async function fetchSalesPartnerData() {
      //   try {
      //     const response = await fetch('controller.php', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({ transaction: transaction }),
      //     });
        
      //     if (!response.ok) {
      //       throw new Error(`Error fetching data: ${response.statusText}`);
      //     }
        
      //     const salesPartnerData = await response.json();
        
      //     salesPartnerData.forEach(data => {
      //       data.name = capitalizeFirstLetter(data.full_name.toLowerCase());
      //     });
        
      //     return salesPartnerData;

      //   } catch (error) {
      //     console.error('Error fetching data:', error);
      //   }
      // }
      
      // async function createSalesPartnerChart() {
      //   const salesPartnerData = await fetchSalesPartnerData();
      
      //   const salesPartnerMonthlyBookingChart = document.getElementById('sales-partner-monthly-booking-chart');
      
      //   new Chart(salesPartnerMonthlyBookingChart, {
      //     type: 'bar',
      //     data: {
      //       labels: salesPartnerData.map(data => data.name),
      //       datasets: [{
      //         label: 'Quota Percentage',
      //         data: salesPartnerData.map(data => data.quotaPercentage),
      //         borderWidth: 1
      //       }]
      //     },
      //     options: {
      //       scales: {
      //         y: {
      //           beginAtZero: true,
      //           min: 0,
      //           max: 100
      //         }
      //       }
      //     }
      //   });
      // }
      
      // createSalesPartnerChart();
      
      // function capitalizeFirstLetter(str) {
      //   return str.charAt(0).toUpperCase() + str.slice(1);
      // }










      // // Get Data
      // $.ajax({
      //   url: 'controller.php',
      //   method: 'POST',
      //   dataType: 'JSON',
      //   data: {transaction : transaction},
      //   success: function(response) {
      //     const salesPartnerNames = [];
      //     const quotaPercentages = [];

      //     function capitalizeFirstLetters(str) {
      //       return str.replace(/\b\w/g, match => match.toUpperCase());
      //     }

      //     for (const data of response) {
      //       salesPartnerNames.push(capitalizeFirstLetters(data.full_name.toLowerCase()));
      //     }

      //     for (const data of response) {
      //       quotaPercentages.push(data.percentage_of_quota);
      //     }


      //     const salesPartnerMonthlyBookingChart = document.getElementById('sales-partner-monthly-booking-chart');
      //     new Chart(salesPartnerMonthlyBookingChart, {
      //         type: 'bar',
      //         data: {
      //             labels: salesPartnerNames,
      //             datasets: [{
      //                 label: 'Quota Percentage',
      //                 data: quotaPercentages,
      //                 borderWidth: 1
      //             }]
      //         },
      //         options: {
      //             scales: {
      //                 y: {
      //                     beginAtZero: true,
      //                     min: 0,
      //                     max: 100,
      //                 }
      //             }
      //         }
      //     });
      //   }
      // });


    }

    /////////////////////////////////////////////////////////////////////////////
    // BRANCH MONTHLY BOOKING CHART
    if ($("#branch-monthly-booking-chart").length) {
      transaction = "branch monthly booking details";

      $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { transaction: transaction },
        success: function(response) {
          const branchData = response.map(data => ({
            name: capitalizeFirstLetter(data.branch.toLowerCase()),
            quotaPercentage: data.percentage_of_quota
          }));
      
          const branchMonthlyBookingChart = document.getElementById('branch-monthly-booking-chart');
          new Chart(branchMonthlyBookingChart, {
            type: 'bar',
            data: {
              labels: branchData.map(data => data.name),
              datasets: [{
                label: 'Quota Percentage',
                data: branchData.map(data => data.quotaPercentage),
                borderWidth: 1
              }]
            },
            options: {
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 100
                }
              }
            }
          });
        }
      });
    }



    /////////////////////////////////////////////////////////////////////////////
    // SALES PARTNER TO DATE BOOKING CHART
    if ($("#sales-partner-to-date-booking-chart").length) {
      transaction = "sales partner to date booking details";

      $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { transaction: transaction },
        success: function(response) {
          const branchData = response.map(data => ({
            name: capitalizeFirstLetter(data.full_name.toLowerCase()),
            quotaPercentage: data.percentage_of_quota
          }));
      
          const branchMonthlyBookingChart = document.getElementById('sales-partner-to-date-booking-chart');
          new Chart(branchMonthlyBookingChart, {
            type: 'bar',
            data: {
              labels: branchData.map(data => data.name),
              datasets: [{
                label: 'Quota Percentage',
                data: branchData.map(data => data.quotaPercentage),
                borderWidth: 1
              }]
            },
            options: {
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 100
                }
              }
            }
          });
        }
      });
      
    }

    /////////////////////////////////////////////////////////////////////////////
    // BRANCH TO DATE BOOKING CHART
    if ($("#branch-to-date-booking-chart").length) {
      transaction = "branch to date booking details";

      $.ajax({
        url: 'controller.php',
        method: 'POST',
        dataType: 'JSON',
        data: { transaction: transaction },
        success: function(response) {
          const branchData = response.map(data => ({
            name: capitalizeFirstLetter(data.branch.toLowerCase()),
            quotaPercentage: data.percentage_of_quota
          }));
      
          const branchMonthlyBookingChart = document.getElementById('branch-to-date-booking-chart');
          new Chart(branchMonthlyBookingChart, {
            type: 'bar',
            data: {
              labels: branchData.map(data => data.name),
              datasets: [{
                label: 'Quota Percentage',
                data: branchData.map(data => data.quotaPercentage),
                borderWidth: 1
              }]
            },
            options: {
              indexAxis: 'y',
              scales: {
                x: {
                  beginAtZero: true,
                  min: 0,
                  max: 100
                }
              }
            }
          });
        }
      });
      
    }




    /////////////////////////////////////////////////////////////////
    if ($("#health-declaration-summary-datatable").length) {
      var export_health_declaration_summary = check_permission("295");

      if (export_health_declaration_summary > 0) {
        generate_datatable_two_parameter(
          "health declaration summary table",
          "",
          "",
          "#health-declaration-summary-datatable",
          1,
          "desc",
          "",
          "1"
        );
      } else {
        generate_datatable_two_parameter(
          "health declaration summary table",
          "",
          "",
          "#health-declaration-summary-datatable",
          1,
          "desc",
          ""
        );
      }
    }

    if ($("#meeting-datatable").length) {
      generate_datatable("meeting table", "#meeting-datatable", 0, "desc", [8]);
    }

    if ($("#previous-meeting-datatable").length) {
      var previousmeeting = $("#previousmeeting").val();
      var meetingid = $("#meeting-id").text();

      generate_datatable_two_parameter(
        "previous meeting table",
        meetingid,
        previousmeeting,
        "#previous-meeting-datatable",
        2,
        "desc",
        [4]
      );
    }

    if ($("#meeting-task-datatable").length) {
      var meetingid = $("#meeting-id").text();

      generate_datatable_one_parameter(
        "meeting task table",
        meetingid,
        "#meeting-task-datatable",
        2,
        "asc",
        [6]
      );
    }

    if ($("#meeting-memo-datatable").length) {
      var meetingid = $("#meeting-id").text();

      generate_datatable_one_parameter(
        "meeting memo table",
        meetingid,
        "#meeting-memo-datatable",
        0,
        "asc",
        [1]
      );
    }

    if ($("#meeting-other-matters-datatable").length) {
      var meetingid = $("#meeting-id").text();

      generate_datatable_one_parameter(
        "meeting other matters table",
        meetingid,
        "#meeting-other-matters-datatable",
        0,
        "asc",
        [1]
      );
    }

    if ($("#training-and-seminar-report-datatable").length) {
      var training_id = $("#training_id").val();
      generate_datatable_one_parameter(
        "training and seminar report table",
        training_id,
        "#training-and-seminar-report-datatable",
        0,
        "asc",
        [1],
        "1"
      );
    }

    if ($("#training-datatable").length) {
      generate_datatable_two_parameter(
        "training table",
        "",
        "",
        "#training-datatable",
        0,
        "desc",
        [10]
      );
    }

    if ($("#training-recommendation-datatable").length) {
      generate_datatable(
        "training recommendation table",
        "#training-recommendation-datatable",
        0,
        "desc",
        [6]
      );
    }

    if ($("#training-approval-datatable").length) {
      generate_datatable(
        "training approval table",
        "#training-approval-datatable",
        0,
        "desc",
        [6]
      );
    }

    if ($("#training-report-datatable").length) {
      generate_datatable(
        "training report table",
        "#training-report-datatable",
        0,
        "desc",
        [6]
      );
    }

    if ($("#car-search-parameter-datatable").length) {
      generate_datatable(
        "car search parameter table",
        "#car-search-parameter-datatable",
        0,
        "desc",
        [0]
      );
    }

    if ($("#price-index-item-datatable").length) {
      generate_datatable(
        "price index item table",
        "#price-index-item-datatable",
        0,
        "asc",
        [2]
      );
    }

    if ($("#price-index-amount-datatable").length) {
      generate_datatable(
        "price index amount table",
        "#price-index-amount-datatable",
        0,
        "asc",
        [4]
      );
    }

    if ($("#price-index-amount-adjustment-datatable").length) {
      generate_datatable(
        "price index amount adjustment table",
        "#price-index-amount-adjustment-datatable",
        0,
        "asc",
        [4]
      );
    }

    if($('#pdc-monitoring-datatable').length) {
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

    }
  });
})(jQuery);
