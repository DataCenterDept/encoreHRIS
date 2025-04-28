$(function () {
  "use strict";

  var username = $("#username").html();

  $(document).on("click", "#add-page", function () {
    generate_modal(
      "page form",
      "Page",
      "R",
      "1",
      "1",
      "form",
      "pageForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-page", function () {
    var pageid = $(this).data("pageid");

    sessionStorage.setItem("pageid", pageid);

    generate_modal(
      "page form",
      "Page",
      "R",
      "1",
      "1",
      "form",
      "pageForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-page", function () {
    var pageid = $(this).data("pageid");
    var transaction = "delete page";

    Swal.fire({
      title: "Delete Page",
      text: "Are you sure you want to delete this page?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            pageid: pageid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Page",
                "The page has been deleted.",
                "success"
              );

              generate_datatable("page table", "#page-datatable", 0, "asc", [
                1,
              ]);
              generate_datatable(
                "permission table",
                "#permission-datatable",
                0,
                "asc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert("Delete Page", "The page does not exist.", "info");
            } else {
              show_alert("Delete Page", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-permission", function () {
    generate_modal(
      "permission form",
      "Permission",
      "R",
      "1",
      "1",
      "form",
      "permissionForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-permission", function () {
    var permissionid = $(this).data("permissionid");

    sessionStorage.setItem("permissionid", permissionid);

    generate_modal(
      "permission form",
      "Permission",
      "R",
      "1",
      "1",
      "form",
      "permissionForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-permission", function () {
    var permissionid = $(this).data("permissionid");
    var transaction = "delete permission";

    Swal.fire({
      title: "Delete Permission",
      text: "Are you sure you want to delete this permission?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            permissionid: permissionid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Permission",
                "The permission has been deleted.",
                "success"
              );

              generate_datatable(
                "permission table",
                "#permission-datatable",
                0,
                "asc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Permission",
                "The permission does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Permission", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-role", function () {
    generate_modal(
      "role form",
      "Role",
      "R",
      "1",
      "1",
      "form",
      "roleForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-role", function () {
    var roleid = $(this).data("roleid");

    sessionStorage.setItem("roleid", roleid);

    generate_modal(
      "role form",
      "Role",
      "R",
      "1",
      "1",
      "form",
      "roleForm",
      "0",
      username
    );
  });

  $(document).on("click", ".assign-permission-role", function () {
    var roleid = $(this).data("roleid");

    sessionStorage.setItem("roleid", roleid);

    generate_modal(
      "permission role form",
      "Role Permission Assignment",
      "XL",
      "1",
      "1",
      "form",
      "permissionroleForm",
      "0",
      username
    );
  });

  $(document).on("click", ".assign-user-role", function () {
    var roleid = $(this).data("roleid");

    sessionStorage.setItem("roleid", roleid);

    generate_modal(
      "user role form",
      "User Assignment",
      "XL",
      "1",
      "1",
      "form",
      "userroleForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-role", function () {
    var roleid = $(this).data("roleid");
    var transaction = "delete role";

    Swal.fire({
      title: "Delete Role",
      text: "Are you sure you want to delete this role?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            roleid: roleid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Role",
                "The role has been deleted.",
                "success"
              );

              generate_datatable("roles table", "#roles-datatable", 0, "asc", [
                2,
              ]);
            } else if (response === "Not Found") {
              show_alert("Delete Role", "The role does not exist.", "info");
            } else {
              show_alert("Delete Role", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".activate-role", function () {
    var roleid = $(this).data("roleid");
    var transaction = "activate role";

    Swal.fire({
      title: "Activate Role",
      text: "Are you sure you want to activate this role?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Activate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            roleid: roleid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Activated") {
              show_alert(
                "Activate Role",
                "The role has been activated.",
                "success"
              );

              generate_datatable("roles table", "#roles-datatable", 0, "asc", [
                2,
              ]);
            } else if (response === "Not Found") {
              show_alert("Activate Role", "The role does not exist.", "info");
            } else {
              show_alert("Activate Role", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".deactivate-role", function () {
    var roleid = $(this).data("roleid");
    var transaction = "deactivate role";

    Swal.fire({
      title: "Deactivate Role",
      text: "Are you sure you want to deactivate this role?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Deactivate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            roleid: roleid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deactivated") {
              show_alert(
                "Deactivate Role",
                "The role has been deactivated.",
                "success"
              );

              generate_datatable("roles table", "#roles-datatable", 0, "asc", [
                2,
              ]);
            } else if (response === "Not Found") {
              show_alert("Deactivate Role", "The role does not exist.", "info");
            } else {
              show_alert("Deactivate Role", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-system-code", function () {
    generate_modal(
      "system code form",
      "System Code",
      "R",
      "1",
      "1",
      "form",
      "systemcodeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-system-code", function () {
    var systemtype = $(this).data("systemtype");
    var systemcode = $(this).data("systemcode");

    sessionStorage.setItem("systemtype", systemtype);
    sessionStorage.setItem("systemcode", systemcode);

    generate_modal(
      "system code form",
      "System Code",
      "R",
      "1",
      "1",
      "form",
      "systemcodeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-system-code", function () {
    var systemtype = $(this).data("systemtype");
    var systemcode = $(this).data("systemcode");

    var transaction = "delete system code";

    Swal.fire({
      title: "Delete System Code",
      text: "Are you sure you want to delete this system code?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            systemtype: systemtype,
            systemcode: systemcode,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete System Code",
                "The system code has been deleted.",
                "success"
              );

              generate_datatable(
                "system code table",
                "#system-code-datatable",
                0,
                "asc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete System Code",
                "The system code does not exist.",
                "info"
              );
            } else {
              show_alert("Delete System Code", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-system-parameter", function () {
    generate_modal(
      "system parameter form",
      "System Parameter",
      "R",
      "1",
      "1",
      "form",
      "systemparameterForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-system-parameter", function () {
    var parameterid = $(this).data("parameterid");

    sessionStorage.setItem("parameterid", parameterid);

    generate_modal(
      "system parameter form",
      "System Parameter",
      "R",
      "1",
      "1",
      "form",
      "systemparameterForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-system-parameter", function () {
    var parameterid = $(this).data("parameterid");

    var transaction = "delete system parameter";

    Swal.fire({
      title: "Delete System Parameter",
      text: "Are you sure you want to delete this system parameter?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            parameterid: parameterid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete System Parameter",
                "The system parameter has been deleted.",
                "success"
              );

              generate_datatable(
                "system parameter table",
                "#system-parameter-datatable",
                0,
                "asc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete System Parameter",
                "The system parameter does not exist.",
                "info"
              );
            } else {
              show_alert("Delete System Parameter", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-employee", function () {
    generate_modal(
      "employee form",
      "Employee",
      "XL",
      "1",
      "1",
      "form",
      "employeeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-employee", function () {
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "employee form",
      "Employee",
      "XL",
      "1",
      "1",
      "form",
      "employeeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-employee", function () {
    var employeeid = $(this).data("employeeid");
    var transaction = "delete employee";

    Swal.fire({
      title: "Delete Employee",
      text: "Are you sure you want to delete this employee?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            employeeid: employeeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              $("#filter-text").text("");

              show_alert(
                "Delete Employee",
                "The employee has been deleted.",
                "success"
              );

              generate_datatable_two_parameter(
                "employee list table",
                "",
                "",
                "#employee-list-datatable",
                0,
                "asc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Employee",
                "The employee does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Employee", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#filter-employee", function () {
    generate_modal(
      "filter employee form",
      "Filter Employee",
      "R",
      "0",
      "1",
      "form",
      "filteremployeeForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-department", function () {
    generate_modal(
      "department form",
      "Department",
      "R",
      "1",
      "1",
      "form",
      "departmentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-department", function () {
    var departmentid = $(this).data("departmentid");

    sessionStorage.setItem("departmentid", departmentid);

    generate_modal(
      "department form",
      "Department",
      "R",
      "1",
      "1",
      "form",
      "departmentForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-department", function () {
    var departmentid = $(this).data("departmentid");
    var transaction = "delete department";

    Swal.fire({
      title: "Delete Department",
      text: "Are you sure you want to delete this department?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            departmentid: departmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Department",
                "The department has been deleted.",
                "success"
              );

              generate_datatable(
                "department table",
                "#department-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Department",
                "The department does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Department", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-designation", function () {
    generate_modal(
      "designation form",
      "Designation",
      "R",
      "1",
      "1",
      "form",
      "designationForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-designation", function () {
    var designationid = $(this).data("designationid");

    sessionStorage.setItem("designationid", designationid);

    generate_modal(
      "designation form",
      "Designation",
      "R",
      "1",
      "1",
      "form",
      "designationForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-designation", function () {
    var designationid = $(this).data("designationid");
    var transaction = "delete designation";

    Swal.fire({
      title: "Delete Designation",
      text: "Are you sure you want to delete this designation?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            designationid: designationid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Designation",
                "The designation has been deleted.",
                "success"
              );

              generate_datatable(
                "designation table",
                "#designation-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Designation",
                "The designation does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Designation", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-branch", function () {
    generate_modal(
      "branch form",
      "Branch",
      "LG",
      "1",
      "1",
      "form",
      "branchForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-branch", function () {
    var branchid = $(this).data("branchid");

    sessionStorage.setItem("branchid", branchid);

    generate_modal(
      "branch form",
      "Branch",
      "LG",
      "1",
      "1",
      "form",
      "branchForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-branch", function () {
    var branchid = $(this).data("branchid");
    var transaction = "delete branch";

    Swal.fire({
      title: "Delete Branch",
      text: "Are you sure you want to delete this branch?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            branchid: branchid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Branch",
                "The branch has been deleted.",
                "success"
              );

              generate_datatable(
                "branch table",
                "#branch-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert("Delete Branch", "The branch does not exist.", "info");
            } else {
              show_alert("Delete Branch", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-holiday", function () {
    generate_modal(
      "holiday form",
      "Holiday",
      "R",
      "0",
      "1",
      "form",
      "holidayForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-holiday", function () {
    var holidayid = $(this).data("holidayid");

    sessionStorage.setItem("holidayid", holidayid);

    generate_modal(
      "holiday form",
      "Holiday",
      "R",
      "0",
      "1",
      "form",
      "holidayForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-holiday", function () {
    var holidayid = $(this).data("holidayid");
    var transaction = "delete holiday";

    Swal.fire({
      title: "Delete Holiday",
      text: "Are you sure you want to delete this holiday?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            holidayid: holidayid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Holiday",
                "The holiday has been deleted.",
                "success"
              );

              generate_datatable(
                "holiday table",
                "#holiday-datatable",
                0,
                "desc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Holiday",
                "The holiday does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Holiday", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-leave-type", function () {
    generate_modal(
      "leave type form",
      "Leave Type",
      "R",
      "1",
      "1",
      "form",
      "leavetypeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-leave-type", function () {
    var leavetypeid = $(this).data("leavetypeid");

    sessionStorage.setItem("leavetypeid", leavetypeid);

    generate_modal(
      "leave type form",
      "Leave Type",
      "R",
      "1",
      "1",
      "form",
      "leavetypeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-leave-type", function () {
    var leavetypeid = $(this).data("leavetypeid");
    var transaction = "delete leave type";

    Swal.fire({
      title: "Delete Leave Type",
      text: "Are you sure you want to delete this leave type?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            leavetypeid: leavetypeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Leave Type",
                "The leave type has been deleted.",
                "success"
              );

              generate_datatable(
                "leave type table",
                "#leave-type-datatable",
                0,
                "desc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Leave Type",
                "The leave type does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Leave Type", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-leave-entitlement", function () {
    sessionStorage.setItem("entitlement_status", "add");
    generate_modal(
      "leave entitlement form",
      "Leave Entitlement",
      "R",
      "0",
      "1",
      "form",
      "leaveentitlementForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-leave-entitlement", function () {
    var entitlementid = $(this).data("entitlementid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("entitlement_status", "update");
    sessionStorage.setItem("entitlementid", entitlementid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "leave entitlement form",
      "Leave Entitlement",
      "R",
      "0",
      "1",
      "form",
      "leaveentitlementForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-leave-entitlement", function () {
    var entitlementid = $(this).data("entitlementid");
    var employee_profile_employee_id = $(
      "#employee-profile-employee-id"
    ).text();
    var transaction = "delete leave entitlement";

    Swal.fire({
      title: "Delete Leave Entitlement",
      text: "Are you sure you want to delete this leave entitlement?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            entitlementid: entitlementid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Leave Entitlement",
                "The leave entitlement has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "employee leave entitlement table",
                employee_profile_employee_id,
                "#employee-leave-entitlement-datatable",
                0,
                "desc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Leave Entitlement",
                "The leave entitlement does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Leave Entitlement", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-employee-leave", function () {
    generate_modal(
      "employee leave form",
      "Employee Leave",
      "R",
      "0",
      "1",
      "form",
      "employeeleaveForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-employee-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("leaveid", leaveid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "update employee leave form",
      "Employee Leave",
      "R",
      "0",
      "1",
      "form",
      "updateemployeeleaveForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-employee-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employee_profile_employee_id = $(
      "#employee-profile-employee-id"
    ).text();
    var transaction = "delete employee leave";

    Swal.fire({
      title: "Delete Employee Leave",
      text: "Are you sure you want to delete this employee leave?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            leaveid: leaveid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Employee Leave",
                "The employee leave has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "employee leave table",
                employee_profile_employee_id,
                "#employee-leave-datatable",
                0,
                "desc",
                [4]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Employee Leave",
                "The employee leave does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Employee Leave", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-employee-document", function () {
    generate_modal(
      "employee document form",
      "Employee Document",
      "R",
      "0",
      "1",
      "form",
      "employeedocumentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-employee-document", function () {
    var documentid = $(this).data("documentid");
    var employee_profile_employee_id = $(
      "#employee-profile-employee-id"
    ).text();
    var transaction = "delete employee document";

    Swal.fire({
      title: "Delete Employee Document",
      text: "Are you sure you want to delete this employee document?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            documentid: documentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Employee Document",
                "The employee document has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "employee document table",
                employee_profile_employee_id,
                "#employee-document-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Employee Document",
                "The employee document does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Employee Document", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");
    var leavetype = $(this).data("leavetype");
    var transaction = "approve employee leave";

    Swal.fire({
      title: "Approve Leave",
      text: "Are you sure you want to approve this leave?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            leaveid: leaveid,
            employeeid: employeeid,
            leavetype: leavetype,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Leave Approval Success",
                "The leave has been approved.",
                "success"
              );

              if ($("#leaves-datatable").length) {
                generate_datatable(
                  "leave table",
                  "#leaves-datatable",
                  0,
                  "desc",
                  [6]
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
            } else if (response === "Not Found") {
              show_alert(
                "Leave Approval Error",
                "The leave does not exist.",
                "info"
              );
            } else if (response === "Overlap") {
              Swal.fire({
                title: "Leave Overlap",
                text: "This leave being applied overlaps with an existing approved leave. Do you want to continue approving this leave?",
                icon: "warning",
                showCancelButton: !0,
                confirmButtonText: "Continue",
                cancelButtonText: "Close",
                confirmButtonClass: "btn btn-warning mt-2",
                cancelButtonClass: "btn btn-secondary ms-2 mt-2",
                buttonsStyling: !1,
              }).then(function (result) {
                if (result.value) {
                  transaction = "approve overlap employee leave";

                  $.ajax({
                    type: "POST",
                    url: "controller.php",
                    data: {
                      username: username,
                      leaveid: leaveid,
                      employeeid: employeeid,
                      leavetype: leavetype,
                      transaction: transaction,
                    },
                    success: function (response) {
                      if (response === "Approved") {
                        show_alert(
                          "Leave Approval Success",
                          "The leave has been approved.",
                          "success"
                        );

                        if ($("#leaves-datatable").length) {
                          generate_datatable(
                            "leave table",
                            "#leaves-datatable",
                            0,
                            "desc",
                            [6]
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
                      } else {
                        show_alert("Leave Approval Error", response, "error");
                      }
                    },
                  });
                  return false;
                } else {
                  $("#System-Modal").modal("hide");

                  show_alert(
                    "Leave Overlap",
                    "Please notify the employee to fix the overlap.",
                    "info"
                  );
                }
              });
            } else {
              show_alert("Leave Approval Error", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("leaveid", leaveid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "reject leave form",
      "Reject Leave",
      "R",
      "1",
      "1",
      "form",
      "rejectleaveForm",
      "1",
      username
    );
  });

  $(document).on("click", ".cancel-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("leaveid", leaveid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "cancel leave form",
      "Cancel Leave",
      "R",
      "1",
      "1",
      "form",
      "cancelleaveForm",
      "1",
      username
    );
  });

  $(document).on("click", "#record-attendance", function () {
    var latitude = sessionStorage.getItem("latitude");
    var longitude = sessionStorage.getItem("longitude");
    var attendance = $(this).data("attendance");
    var transaction = "record attendance";

    if (attendance == "in") {
      $.ajax({
        type: "POST",
        url: "controller.php",
        data: {
          username: username,
          latitude: latitude,
          longitude: longitude,
          transaction: transaction,
        },
        success: function (response) {
          if (response === "Clock In") {
            show_alert_event(
              "Clock In Success",
              "Your attendance has been recorded.",
              "success",
              "reload"
            );
          } else if (response === "Clock Out") {
            show_alert_event(
              "Clock Out Success",
              "Your attendance has been recorded.",
              "success",
              "reload"
            );
          } else if (response === "Max Clock-In") {
            show_alert_event(
              "Attendance Record Error",
              "Your have reached the maximum clock-in for the day.",
              "error",
              "reload"
            );
          } else if (response === "Time-In") {
            show_alert_event(
              "Attendance Record Error",
              "The clock-in cannot be greater than the clock-out.",
              "error",
              "reload"
            );
          } else if (response === "Time-Out") {
            show_alert_event(
              "Attendance Record Error",
              "The clock-out cannot be less than the clock-in.",
              "error",
              "reload"
            );
          } else if (response === "Location") {
            show_alert_event(
              "Attendance Record Error",
              "Your location cannot be determined.",
              "error",
              "reload"
            );
          } else if (response === "Time Difference") {
            show_alert_event(
              "Attendance Record Error",
              "Please wait ten (10) minutes before you can update your attendance record.",
              "error",
              "reload"
            );
          } else {
            show_alert("Attendance Record Error", response, "error");
          }
        },
      });
    } else {
      Swal.fire({
        title: "Attendance Clock Out",
        text: "Are you sure you want to clock out?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Clock Out",
        cancelButtonText: "Cancel",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-secondary ms-2 mt-2",
        buttonsStyling: !1,
      }).then(function (result) {
        if (result.value) {
          $.ajax({
            type: "POST",
            url: "controller.php",
            data: {
              username: username,
              latitude: latitude,
              longitude: longitude,
              transaction: transaction,
            },
            success: function (response) {
              if (response === "Clock In") {
                show_alert_event(
                  "Clock In Success",
                  "Your attendance has been recorded.",
                  "success",
                  "reload"
                );
              } else if (response === "Clock Out") {
                show_alert_event(
                  "Clock Out Success",
                  "Your attendance has been recorded.",
                  "success",
                  "reload"
                );
              } else if (response === "Max Clock-In") {
                show_alert_event(
                  "Attendance Record Error",
                  "Your have reached the maximum clock-in for the day.",
                  "error",
                  "reload"
                );
              } else if (response === "Time-In") {
                show_alert_event(
                  "Attendance Record Error",
                  "The clock-in cannot be greater than the clock-out.",
                  "error",
                  "reload"
                );
              } else if (response === "Time-Out") {
                show_alert_event(
                  "Attendance Record Error",
                  "The clock-out cannot be less than the clock-in.",
                  "error",
                  "reload"
                );
              } else if (response === "Time Difference") {
                show_alert_event(
                  "Attendance Record Error",
                  "Please wait ten (10) minutes before you can update your attendance record.",
                  "error",
                  "reload"
                );
              } else {
                show_alert("Attendance Record Error", response, "error");
              }
            },
          });
          return false;
        }
      });
    }
  });

  $(document).on("click", "#password-addon", function () {
    $(this).siblings("input").length &&
      ("password" == $(this).siblings("input").attr("type")
        ? $(this).siblings("input").attr("type", "input")
        : $(this).siblings("input").attr("type", "password"));
  });

  $(document).on("click", "#update-employee-details", function () {
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "employee form",
      "Employee",
      "XL",
      "1",
      "1",
      "form",
      "employeeForm",
      "0",
      username
    );
  });

  $(document).on("click", "#scan-qr", function () {
    generate_modal(
      "scan attendance qr code form",
      "Scan Attendance QR Code",
      "LG",
      "0",
      "0",
      "element",
      "attendanceqrcodeForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-employee-attendance-log", function () {
    generate_modal(
      "employee attendance log form",
      "Employee Attendance Log",
      "R",
      "0",
      "1",
      "form",
      "employeeattendancelogForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-employee-attendance-log", function () {
    var attendanceid = $(this).data("attendanceid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("attendanceid", attendanceid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "employee attendance log form",
      "Employee Attendance Log",
      "R",
      "0",
      "1",
      "form",
      "employeeattendancelogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-employee-attendance-log", function () {
    var attendanceid = $(this).data("attendanceid");
    var employee_profile_employee_id = $(
      "#employee-profile-employee-id"
    ).text();
    var transaction = "delete employee attendance log";

    Swal.fire({
      title: "Delete Employee Attendance Log",
      text: "Are you sure you want to delete this employee attendance log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            attendanceid: attendanceid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Employee Attendance Log",
                "The employee attendance log has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "employee attendance logs table",
                employee_profile_employee_id,
                "#employee-attendance-logs-datatable",
                0,
                "desc",
                [11]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Employee Attendance Log",
                "The employee attendance log does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Employee Attendance Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-payroll-specification", function () {
    generate_modal(
      "payroll specification form",
      "Payroll Specification",
      "R",
      "0",
      "1",
      "form",
      "payrollspecificationForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-payroll-specification", function () {
    var specid = $(this).data("specid");

    sessionStorage.setItem("specid", specid);

    generate_modal(
      "update payroll specification form",
      "Payroll Specification",
      "R",
      "0",
      "1",
      "form",
      "updatepayrollspecificationForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-payroll-specification", function () {
    var specid = $(this).data("specid");
    var transaction = "delete payroll specification";

    Swal.fire({
      title: "Delete Payroll Specification",
      text: "Are you sure you want to delete this payroll specification?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            specid: specid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Payroll Specification",
                "The payroll specification has been deleted.",
                "success"
              );

              generate_datatable(
                "payroll specification table",
                "#payroll-specification-datatable",
                0,
                "desc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Payroll Specification",
                "The payroll specification does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Payroll Specification", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-deduction-type", function () {
    generate_modal(
      "deduction type form",
      "Deduction Type",
      "R",
      "1",
      "1",
      "form",
      "deductiontypeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-deduction-type", function () {
    var deductiontypeid = $(this).data("deductiontypeid");

    sessionStorage.setItem("deductiontypeid", deductiontypeid);

    generate_modal(
      "deduction type form",
      "Deduction Type",
      "R",
      "1",
      "1",
      "form",
      "deductiontypeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-deduction-type", function () {
    var deductiontypeid = $(this).data("deductiontypeid");
    var transaction = "delete deduction type";

    Swal.fire({
      title: "Delete Deduction Type",
      text: "Are you sure you want to delete this deduction type?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            deductiontypeid: deductiontypeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Deduction Type",
                "The deduction type has been deleted.",
                "success"
              );

              generate_datatable(
                "deduction type table",
                "#deduction-type-datatable",
                0,
                "desc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Deduction Type",
                "The deduction type does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Deduction Type", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-deduction-amount", function () {
    generate_modal(
      "deduction amount form",
      "Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "deductionamountForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-deduction-amount", function () {
    var startrange = $(this).data("startrange");
    var endrange = $(this).data("endrange");
    var deductiontypeid = $(this).data("deductiontypeid");

    sessionStorage.setItem("startrange", startrange);
    sessionStorage.setItem("endrange", endrange);
    sessionStorage.setItem("deductiontypeid", deductiontypeid);

    generate_modal(
      "deduction amount form",
      "Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "deductionamountForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-deduction-amount", function () {
    var startrange = $(this).data("startrange");
    var endrange = $(this).data("endrange");
    var deductiontypeid = $(this).data("deductiontypeid");
    var transaction = "delete deduction amount";

    Swal.fire({
      title: "Delete Deduction Amount",
      text: "Are you sure you want to delete this deduction amount?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            deductiontypeid: deductiontypeid,
            startrange: startrange,
            endrange: endrange,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Deduction Amount",
                "The deduction amount has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "deduction amount table",
                deductiontypeid,
                "#deduction-amount-datatable",
                0,
                "desc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Deduction Amount",
                "The deduction amount does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Deduction Amount", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-deduction-amount", function () {
    generate_modal(
      "import deduction amount form",
      "Import Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "importdeductionamountForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-main-deduction-amount", function () {
    generate_modal(
      "main deduction amount form",
      "Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "maindeductionamountForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-main-deduction-amount", function () {
    var startrange = $(this).data("startrange");
    var endrange = $(this).data("endrange");
    var deductiontypeid = $(this).data("deductiontypeid");

    sessionStorage.setItem("startrange", startrange);
    sessionStorage.setItem("endrange", endrange);
    sessionStorage.setItem("deductiontypeid", deductiontypeid);

    generate_modal(
      "main deduction amount form",
      "Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "maindeductionamountForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-main-deduction-amount", function () {
    var startrange = $(this).data("startrange");
    var endrange = $(this).data("endrange");
    var deductiontypeid = $(this).data("deductiontypeid");
    var transaction = "delete deduction amount";

    Swal.fire({
      title: "Delete Deduction Amount",
      text: "Are you sure you want to delete this deduction amount?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            deductiontypeid: deductiontypeid,
            startrange: startrange,
            endrange: endrange,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Deduction Amount",
                "The deduction amount has been deleted.",
                "success"
              );

              generate_datatable(
                "main deduction amount table",
                "#main-deduction-amount-datatable",
                0,
                "desc",
                [3]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Deduction Amount",
                "The deduction amount does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Deduction Amount", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-main-deduction-amount", function () {
    generate_modal(
      "import main deduction amount form",
      "Import Deduction Amount",
      "R",
      "1",
      "1",
      "form",
      "importmaindeductionamountForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-allowance-type", function () {
    generate_modal(
      "allowance type form",
      "Allowance Type",
      "R",
      "1",
      "1",
      "form",
      "allowancetypeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-allowance-type", function () {
    var allowancetypeid = $(this).data("allowancetypeid");

    sessionStorage.setItem("allowancetypeid", allowancetypeid);

    generate_modal(
      "allowance type form",
      "Allowance Type",
      "R",
      "1",
      "1",
      "form",
      "allowancetypeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-allowance-type", function () {
    var allowancetypeid = $(this).data("allowancetypeid");
    var transaction = "delete allowance type";

    Swal.fire({
      title: "Delete Allowance Type",
      text: "Are you sure you want to delete this allowance type?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            allowancetypeid: allowancetypeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Allowance Type",
                "The allowance type has been deleted.",
                "success"
              );

              generate_datatable(
                "allowance type table",
                "#allowance-type-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Allowance Type",
                "The allowance type does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Allowance Type", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-other-income-type", function () {
    generate_modal(
      "other income type form",
      "Other Income Type",
      "R",
      "1",
      "1",
      "form",
      "otherincometypeForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-other-income-type", function () {
    var otherincometypeid = $(this).data("otherincometypeid");

    sessionStorage.setItem("otherincometypeid", otherincometypeid);

    generate_modal(
      "other income type form",
      "Other Income Type",
      "R",
      "1",
      "1",
      "form",
      "otherincometypeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-other-income-type", function () {
    var otherincometypeid = $(this).data("otherincometypeid");
    var transaction = "delete other income type";

    Swal.fire({
      title: "Delete Other Income Type",
      text: "Are you sure you want to delete this other income type?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            otherincometypeid: otherincometypeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Other Income Type",
                "The other income type has been deleted.",
                "success"
              );

              generate_datatable(
                "other income type table",
                "#other-income-type-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Other Income Type",
                "The other income type does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Other Income Type", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-user-account", function () {
    generate_modal(
      "user account form",
      "User Account",
      "LG",
      "1",
      "1",
      "form",
      "useraccountForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-user-account", function () {
    var usercd = $(this).data("usercd");

    sessionStorage.setItem("usercd", usercd);

    generate_modal(
      "update user account form",
      "User Account",
      "LG",
      "1",
      "1",
      "form",
      "updateuseraccountForm",
      "0",
      username
    );
  });

  $(document).on("click", ".unlock-user-account", function () {
    var usercd = $(this).data("usercd");

    var transaction = "unlock user account";

    Swal.fire({
      title: "Unlock User Account",
      text: "Are you sure you want to unlock this user account?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Unlock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            usercd: usercd,
          },
          success: function (response) {
            if (response == "Unlocked") {
              show_alert(
                "Unlock User Account",
                "The user account has been unlocked.",
                "success"
              );
              generate_datatable(
                "user account table",
                "#user-account-datatable",
                0,
                "asc",
                [7]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Unlock User Account",
                "The user account does not exists.",
                "warning"
              );
            } else {
              show_alert("Unlock User Account", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".lock-user-account", function () {
    var usercd = $(this).data("usercd");

    var username = $("#username").text();
    var transaction = "lock user account";

    Swal.fire({
      title: "Lock User Account",
      text: "Are you sure you want to lock this user account?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Lock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            usercd: usercd,
          },
          success: function (response) {
            if (response == "Locked") {
              show_alert(
                "Lock User Account",
                "The user account has been locked.",
                "success"
              );
              generate_datatable(
                "user account table",
                "#user-account-datatable",
                0,
                "asc",
                [7]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Lock User Account",
                "The user account does not exists.",
                "warning"
              );
            } else {
              show_alert("Lock User Account", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".activate-user-account", function () {
    var usercd = $(this).data("usercd");

    var username = $("#username").text();
    var transaction = "activate user account";

    Swal.fire({
      title: "Activate User Account",
      text: "Are you sure you want to activate this user account?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Activate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            usercd: usercd,
          },
          success: function (response) {
            if (response == "Activated") {
              show_alert(
                "Activate User Account",
                "The user account has been activated.",
                "success"
              );
              generate_datatable(
                "user account table",
                "#user-account-datatable",
                0,
                "asc",
                [7]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Activate User Account",
                "The user account does not exists.",
                "info"
              );
            } else {
              show_alert("Activate User Account", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".deactivate-user-account", function () {
    var usercd = $(this).data("usercd");

    var username = $("#username").text();
    var transaction = "deactivate user account";

    Swal.fire({
      title: "Deactivate User Account",
      text: "Are you sure you want to deactivate this user account?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Deactivate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            usercd: usercd,
          },
          success: function (response) {
            if (response == "Deactivated") {
              show_alert(
                "Deactivate User Account",
                "The user account has been deactivated.",
                "success"
              );
              generate_datatable(
                "user account table",
                "#user-account-datatable",
                0,
                "asc",
                [7]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Deactivate User Account",
                "The user account does not exists.",
                "info"
              );
            } else {
              show_alert("Deactivate User Account", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#get-location", function () {
    generate_modal(
      "get location form",
      "Get Location",
      "R",
      "1",
      "1",
      "form",
      "getlocationForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-email-notification", function () {
    generate_modal(
      "email notification form",
      "Email Notification",
      "R",
      "1",
      "1",
      "form",
      "emailnotificationForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-email-notification", function () {
    var notificationid = $(this).data("notificationid");

    sessionStorage.setItem("notificationid", notificationid);

    generate_modal(
      "email notification form",
      "Email Notification",
      "R",
      "1",
      "1",
      "form",
      "emailnotificationForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-email-notification", function () {
    var notificationid = $(this).data("notificationid");
    var transaction = "delete email notification";

    Swal.fire({
      title: "Delete Email Notification",
      text: "Are you sure you want to delete this email notification?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            notificationid: notificationid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Email Notification",
                "The email notification has been deleted.",
                "success"
              );

              generate_datatable(
                "email notification table",
                "#email-notification-datatable",
                0,
                "asc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Email Notification",
                "The email notification does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Email Notification", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".activate-email-notification", function () {
    var notificationid = $(this).data("notificationid");
    var transaction = "activate email notification";

    Swal.fire({
      title: "Activate Email Notification",
      text: "Are you sure you want to activate this email notification?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Activate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            notificationid: notificationid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Activated") {
              show_alert(
                "Activate Email Notification",
                "The email notification has been activated.",
                "success"
              );

              generate_datatable(
                "email notification table",
                "#email-notification-datatable",
                0,
                "asc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Activate Email Notification",
                "The email notification does not exist.",
                "info"
              );
            } else {
              show_alert("Activate Email Notification", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".deactivate-email-notification", function () {
    var notificationid = $(this).data("notificationid");
    var transaction = "deactivate email notification";

    Swal.fire({
      title: "Deactivate Email Notification",
      text: "Are you sure you want to deactivate this email notification?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Deactivate",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            notificationid: notificationid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deactivated") {
              show_alert(
                "Deactivate Email Notification",
                "The email notification has been deactivated.",
                "success"
              );

              generate_datatable(
                "email notification table",
                "#email-notification-datatable",
                0,
                "asc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Deactivate Email Notification",
                "The email notification does not exist.",
                "info"
              );
            } else {
              show_alert("Deactivate Email Notification", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-email-recipient", function () {
    generate_modal(
      "email recipient form",
      "Email Recipient",
      "R",
      "1",
      "1",
      "form",
      "emailrecipientForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-email-recipient", function () {
    var notificationid = $(this).data("notificationid");
    var recipientid = $(this).data("recipientid");

    sessionStorage.setItem("notificationid", notificationid);
    sessionStorage.setItem("recipientid", recipientid);

    generate_modal(
      "email recipient form",
      "Email Recipient",
      "R",
      "1",
      "1",
      "form",
      "emailrecipientForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-email-recipient", function () {
    var notificationid = $(this).data("notificationid");
    var recipientid = $(this).data("recipientid");

    var transaction = "delete email recipient";

    Swal.fire({
      title: "Delete Email Recipient",
      text: "Are you sure you want to delete this email recipient?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            notificationid: notificationid,
            recipientid: recipientid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Email Recipient",
                "The email recipient has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "email recipient table",
                notificationid,
                "#email-recipient-datatable",
                0,
                "asc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Email Recipient",
                "The email recipient does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Email Recipient", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-office-shift", function () {
    generate_modal(
      "office shift form",
      "Office Shift",
      "LG",
      "1",
      "1",
      "form",
      "officeshiftscheduleForm",
      "0",
      username
    );
  });

  $(document).on("click", ".update-office-shift", function () {
    var dtrday = $(this).data("dtrday");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("dtrday", dtrday);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "update office shift form",
      "Office Shift",
      "LG",
      "1",
      "1",
      "form",
      "updateofficeshiftscheduleForm",
      "0",
      username
    );
  });

  $(document).on("click", "#testemail", function () {
    generate_modal(
      "test email form",
      "Send Test Email",
      "R",
      "1",
      "1",
      "form",
      "testemailForm",
      "1",
      username
    );
  });

  $(document).on("click", "#generate-payroll", function () {
    generate_modal(
      "generate payroll form",
      "Generate Payroll",
      "R",
      "0",
      "1",
      "form",
      "generatepayrollForm",
      "1",
      username
    );
  });

  $(document).on("click", ".pay-payroll", function () {
    var payrollid = $(this).data("payrollid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("payrollid", payrollid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "pay payroll form",
      "Pay Payroll",
      "R",
      "1",
      "1",
      "form",
      "payparollForm",
      "1",
      username
    );
  });

  $(document).on("click", ".reverse-payroll", function () {
    var payrollid = $(this).data("payrollid");
    var employeeid = $(this).data("employeeid");
    var payrollperiod = $("#payrollperiod").val();
    var transaction = "reverse payroll";

    Swal.fire({
      title: "Reverse Payroll",
      text: "Are you sure you want to reverse this employee's payroll?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Reverse",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            payrollid: payrollid,
            employeeid: employeeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Reversed") {
              show_alert(
                "Reverse Payroll",
                "The payroll has been reversed.",
                "success"
              );

              generate_datatable_one_parameter(
                "payroll table",
                payrollperiod,
                "#payroll-datatable",
                1,
                "desc",
                [11]
              );
            } else if (response === "Status") {
              show_alert(
                "Reverse Payroll",
                "The payroll cannot be reversed.",
                "info"
              );
            } else if (response === "Not Found") {
              show_alert(
                "Reverse Payroll",
                "The payroll does not exist.",
                "info"
              );
            } else {
              show_alert("Reverse Payroll", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-payroll-group", function () {
    generate_modal(
      "payroll group form",
      "Payroll Group",
      "R",
      "1",
      "1",
      "form",
      "payrollgroupForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-payroll-group", function () {
    var payrollgroupid = $(this).data("payrollgroupid");

    sessionStorage.setItem("payrollgroupid", payrollgroupid);

    generate_modal(
      "payroll group form",
      "Payroll Group",
      "R",
      "1",
      "1",
      "form",
      "payrollgroupForm",
      "0",
      username
    );
  });

  $(document).on("click", ".assign-payroll-group-employee", function () {
    var payrollgroupid = $(this).data("payrollgroupid");

    sessionStorage.setItem("payrollgroupid", payrollgroupid);

    generate_modal(
      "payroll group employee form",
      "Employee Assignment",
      "XL",
      "1",
      "1",
      "form",
      "payrollgroupemployeeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-payroll-group", function () {
    var payrollgroupid = $(this).data("payrollgroupid");
    var transaction = "delete payroll group";

    Swal.fire({
      title: "Delete Payroll Group",
      text: "Are you sure you want to delete this payroll group?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            payrollgroupid: payrollgroupid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Payroll Group",
                "The payroll group has been deleted.",
                "success"
              );

              generate_datatable(
                "payroll group table",
                "#payroll-group-datatable",
                0,
                "asc",
                [1]
              );
              generate_datatable(
                "payroll group employee table",
                "#payroll-group-employee-datatable",
                0,
                "asc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Payroll Group",
                "The payroll group does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Payroll Group", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".unassign-payroll-group-employee", function () {
    var payrollgroupid = $(this).data("payrollgroupid");
    var employeeid = $(this).data("employeeid");
    var transaction = "unassign payroll group employee";

    Swal.fire({
      title: "Unassign Payroll Group",
      text: "Are you sure you want to unassign this payroll group?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Unassign",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            payrollgroupid: payrollgroupid,
            employeeid: employeeid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Unassigned") {
              show_alert(
                "Unassign Payroll Group",
                "The payroll group has been unassign.",
                "success"
              );

              generate_datatable(
                "payroll group table",
                "#payroll-group-datatable",
                0,
                "asc",
                [1]
              );
              generate_datatable(
                "payroll group employee table",
                "#payroll-group-employee-datatable",
                0,
                "asc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Unassign Payroll Group",
                "The payroll group does not exist.",
                "info"
              );
            } else {
              show_alert("Unassign Payroll Group", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#backup-database", function () {
    generate_modal(
      "database backup form",
      "Database Backup",
      "R",
      "1",
      "1",
      "form",
      "databasebackupForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-attendance-log", function () {
    generate_modal(
      "attendance log form",
      "Attendance Log",
      "R",
      "0",
      "1",
      "form",
      "attendancelogForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-attendance-log", function () {
    var attendanceid = $(this).data("attendanceid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("attendanceid", attendanceid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "attendance log form",
      "Attendance Log",
      "R",
      "0",
      "1",
      "form",
      "attendancelogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-attendance-log", function () {
    var attendanceid = $(this).data("attendanceid");
    var transaction = "delete attendance log";

    Swal.fire({
      title: "Delete Attendance Log",
      text: "Are you sure you want to delete this attendance log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            attendanceid: attendanceid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Attendance Log",
                "The attendance log has been deleted.",
                "success"
              );

              generate_datatable_two_parameter(
                "attendance logs table",
                "",
                "",
                "#attendance-record-datatable",
                1,
                "desc",
                [12]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Attendance Log",
                "The attendance log does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Attendance Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-attendance-log", function () {
    generate_modal(
      "import attendance log form",
      "Import Attendace Log",
      "R",
      "1",
      "1",
      "form",
      "importattendancelogForm",
      "1",
      username
    );
  });

  $(document).on("click", "#import-employee-leave", function () {
    generate_modal(
      "import employee leave form",
      "Import Employee Leave",
      "R",
      "1",
      "1",
      "form",
      "importemployeeleaveForm",
      "1",
      username
    );
  });

  $(document).on("click", "#import-payroll-specification", function () {
    generate_modal(
      "import payroll specification form",
      "Import Payroll Specification",
      "R",
      "1",
      "1",
      "form",
      "importpayrollspecificationForm",
      "1",
      username
    );
  });

  $(document).on("click", "#apply-leave", function () {
    generate_modal(
      "apply leave form",
      "Apply Leave",
      "R",
      "0",
      "1",
      "form",
      "applyleaveForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-employee-leave", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("leaveid", leaveid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "update employee leave form",
      "Employee Leave",
      "R",
      "0",
      "1",
      "form",
      "updateemployeeleaveForm",
      "0",
      username
    );
  });

  $(document).on("click", ".cancel-leave-application", function () {
    var leaveid = $(this).data("leaveid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("leaveid", leaveid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "cancel leave application form",
      "Cancel Leave",
      "R",
      "1",
      "1",
      "form",
      "cancelleaveapplicationForm",
      "1",
      username
    );
  });

  $(document).on(
    "click",
    ".request-employee-attendance-record-adjustment",
    function () {
      var attendanceid = $(this).data("attendanceid");
      var employeeid = $(this).data("employeeid");

      sessionStorage.setItem("attendanceid", attendanceid);
      sessionStorage.setItem("employeeid", employeeid);

      generate_modal(
        "request employee attendance adjustment form",
        "Request Attendance Record Adjustment",
        "R",
        "0",
        "1",
        "form",
        "requestemployeeattendanceadjustmentForm",
        "0",
        username
      );
    }
  );

  $(document).on(
    "click",
    ".updated-employee-attendance-record-adjustment",
    function () {
      var attendanceid = $(this).data("attendanceid");
      var employeeid = $(this).data("employeeid");
      var adjustmentid = $(this).data("adjustmentid");

      sessionStorage.setItem("attendanceid", attendanceid);
      sessionStorage.setItem("employeeid", employeeid);
      sessionStorage.setItem("adjustmentid", adjustmentid);

      generate_modal(
        "update employee attendance adjustment form",
        "Attendance Record Adjustment",
        "R",
        "0",
        "1",
        "form",
        "updateemployeeattendanceadjustmentForm",
        "0",
        username
      );
    }
  );

  $(document).on(
    "click",
    ".cancel-employee-attendance-record-adjustment",
    function () {
      var adjustmentid = $(this).data("adjustmentid");

      sessionStorage.setItem("adjustmentid", adjustmentid);

      generate_modal(
        "cancel attendance adjustment leave form",
        "Cancel Attendance Adjustment",
        "R",
        "1",
        "1",
        "form",
        "cancelattendanceadjustmentForm",
        "1",
        username
      );
    }
  );

  $(document).on(
    "click",
    ".delete-employee-attendance-record-adjustment",
    function () {
      var adjustmentid = $(this).data("adjustmentid");
      var transaction = "delete employee attendance adjustment request";

      Swal.fire({
        title: "Delete Attendance Record Adjustment",
        text: "Are you sure you want to delete this attendance record adjustment?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        confirmButtonClass: "btn btn-danger mt-2",
        cancelButtonClass: "btn btn-secondary ms-2 mt-2",
        buttonsStyling: !1,
      }).then(function (result) {
        if (result.value) {
          $.ajax({
            type: "POST",
            url: "controller.php",
            data: {
              username: username,
              adjustmentid: adjustmentid,
              transaction: transaction,
            },
            success: function (response) {
              if (response === "Deleted") {
                show_alert(
                  "Delete Attendance Record Adjustment",
                  "The attendance record adjustment has been deleted.",
                  "success"
                );

                generate_datatable_two_parameter(
                  "employee attendance adjustment table",
                  "",
                  "",
                  "#employee-attendance-adjustment-datatable",
                  0,
                  "desc",
                  [8]
                );
              } else if (response === "Not Found") {
                show_alert(
                  "Delete Attendance Record Adjustment",
                  "The attendance record adjustment does not exist.",
                  "info"
                );
              } else {
                show_alert(
                  "Delete Attendance Record Adjustment",
                  response,
                  "error"
                );
              }
            },
          });
          return false;
        }
      });
    }
  );

  $(document).on("click", ".cancel-attendance-record-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "cancel attendance adjustment leave form",
      "Cancel Attendance Adjustment",
      "R",
      "1",
      "1",
      "form",
      "cancelattendanceadjustmentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-attendance-record-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");
    var transaction = "delete employee attendance adjustment request";

    Swal.fire({
      title: "Delete Attendance Record Adjustment",
      text: "Are you sure you want to delete this attendance record adjustment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            adjustmentid: adjustmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Attendance Record Adjustment",
                "The attendance record adjustment has been deleted.",
                "success"
              );

              generate_datatable(
                "attendance adjustment table",
                "#attendance-adjustment-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Attendance Record Adjustment",
                "The attendance record adjustment does not exist.",
                "info"
              );
            } else {
              show_alert(
                "Delete Attendance Record Adjustment",
                response,
                "error"
              );
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-attendance-record-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "approve attendance adjustment leave form",
      "Approve Attendance Adjustment",
      "R",
      "1",
      "1",
      "form",
      "approveattendanceadjustmentForm",
      "1",
      username
    );
  });

  $(document).on(
    "click",
    ".recommend-attendance-record-adjustment",
    function () {
      var adjustmentid = $(this).data("adjustmentid");
      var transaction = "recommend employee attendance adjustment request";

      Swal.fire({
        title: "Recommend Attendance Record Adjustment",
        text: "Are you sure you want to recommend this attendance record adjustment?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Recommend",
        cancelButtonText: "Close",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-secondary ms-2 mt-2",
        buttonsStyling: !1,
      }).then(function (result) {
        if (result.value) {
          $.ajax({
            type: "POST",
            url: "controller.php",
            data: {
              username: username,
              adjustmentid: adjustmentid,
              transaction: transaction,
            },
            success: function (response) {
              if (response === "Recommended") {
                show_alert(
                  "Recommend Attendance Record Adjustment",
                  "The attendance record adjustment has been recommended.",
                  "success"
                );

                generate_datatable(
                  "attendance adjustment recommendation table",
                  "#attendance-adjustment-recommendation-datatable",
                  0,
                  "desc",
                  [8]
                );
              } else if (response === "Not Found") {
                show_alert(
                  "Recommend Attendance Record Adjustment",
                  "The attendance record adjustment does not exist.",
                  "info"
                );
              } else {
                show_alert(
                  "Recommend Attendance Record Adjustment",
                  response,
                  "error"
                );
              }
            },
          });
          return false;
        }
      });
    }
  );

  $(document).on("click", ".reject-attendance-record-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "reject attendance adjustment leave form",
      "Reject Attendance Adjustment",
      "R",
      "1",
      "1",
      "form",
      "rejectattendanceadjustmentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".view-attendance-record", function () {
    var employeeid = $(this).data("employeeid");
    var startdate = $(this).data("startdate");
    var enddate = $(this).data("enddate");

    sessionStorage.setItem("employeeid", employeeid);
    sessionStorage.setItem("startdate", startdate);
    sessionStorage.setItem("enddate", enddate);

    generate_modal(
      "attendance summary details",
      "Attendance Summary Details",
      "XL",
      "0",
      "0",
      "element",
      "",
      "0",
      username
    );
  });

  $(document).on("click", "#filter-attendance-summary", function () {
    generate_modal(
      "filter attendance summary",
      "Filter Attendance Summary",
      "R",
      "0",
      "1",
      "form",
      "filterattendancesummaryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-health-declaration-summary", function () {
    generate_modal(
      "filter health declaration summary",
      "Filter Health Declaration Summary",
      "R",
      "0",
      "1",
      "form",
      "filterhealtdeclarationsummaryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-payroll", function () {
    generate_modal(
      "filter payroll",
      "Filter Payroll",
      "R",
      "0",
      "1",
      "form",
      "filterpayrollForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-payroll-summary", function () {
    generate_modal(
      "filter payroll summary",
      "Filter Payroll Summary",
      "R",
      "0",
      "1",
      "form",
      "filterpayrollsummaryForm",
      "1",
      username
    );
  });

  $(document).on("click", ".view-payroll-summary", function () {
    var employeeid = $(this).data("employeeid");
    var payrollid = $(this).data("payrollid");
    var payrollperiod = $(this).data("payrollperiod");
    var date = payrollperiod.split("|");

    sessionStorage.setItem("employeeid", employeeid);
    sessionStorage.setItem("payrollid", payrollid);
    sessionStorage.setItem("startdate", date[0]);
    sessionStorage.setItem("enddate", date[1]);

    generate_modal(
      "payroll summary details",
      "Payroll Summary Details",
      "XL",
      "0",
      "0",
      "element",
      "",
      "0",
      username
    );
  });

  $(document).on("click", "#add-telephone-log", function () {
    generate_modal(
      "telephone log form",
      "Telephone Log",
      "R",
      "0",
      "1",
      "form",
      "telephonelogForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-telephone-log", function () {
    var logid = $(this).data("logid");

    sessionStorage.setItem("logid", logid);

    generate_modal(
      "telephone log form",
      "Telephone Log",
      "R",
      "0",
      "1",
      "form",
      "telephonelogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".view-telephone-log", function () {
    var logid = $(this).data("logid");

    sessionStorage.setItem("logid", logid);

    generate_modal(
      "telephone log form",
      "Telephone Log",
      "R",
      "0",
      "0",
      "form",
      "telephonelogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-telephone-log", function () {
    var logid = $(this).data("logid");
    var transaction = "delete telephone log";

    Swal.fire({
      title: "Delete Telephone Log",
      text: "Are you sure you want to delete this telephone log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Telephone Log",
                "The telephone log has been deleted.",
                "success"
              );

              generate_datatable(
                "telephone log table",
                "#telephone-log-datatable",
                0,
                "desc",
                [9]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Telephone Log",
                "The telephone log does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Telephone Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-telephone-log", function () {
    var logid = $(this).data("logid");
    var transaction = "cancel telephone log";

    Swal.fire({
      title: "Cancel Telephone Log",
      text: "Are you sure you want to cancel this telephone log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Cancelled") {
              show_alert(
                "Cancel Telephone Log",
                "The telephone log has been cancelled.",
                "success"
              );

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
            } else if (response === "Not Found") {
              show_alert(
                "Cancel Telephone Log",
                "The telephone log does not exist.",
                "info"
              );
            } else {
              show_alert("Cancel Telephone Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".consumed-telephone-log", function () {
    var logid = $(this).data("logid");

    sessionStorage.setItem("logid", logid);

    generate_modal(
      "consumed telephone log form",
      "Consumed Telephone Log",
      "LG",
      "0",
      "1",
      "form",
      "consumedtelephonelogForm",
      "1",
      username
    );
  });

  $(document).on("click", ".not-consumed-telephone-log", function () {
    var logid = $(this).data("logid");
    var transaction = "not consumed telephone log";

    Swal.fire({
      title: "Not Consumed Telephone Log",
      text: "Are you sure you want to tag this telephone log as not consumed?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Not Consumed",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Not Consumed") {
              show_alert(
                "Not Consumed Telephone Log",
                "The telephone log has been tagged as not consumed.",
                "success"
              );

              generate_datatable(
                "telephone log table",
                "#telephone-log-datatable",
                0,
                "desc",
                [9]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Not Consumed Telephone Log",
                "The telephone log does not exist.",
                "info"
              );
            } else {
              show_alert("Not Consumed Telephone Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-telephone-log", function () {
    var logid = $(this).data("logid");
    var transaction = "approve telephone log";

    Swal.fire({
      title: "Approve Telephone Log",
      text: "Are you sure you want to approve this telephone log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Telephone Log",
                "The telephone log has been approved.",
                "success"
              );

              generate_datatable(
                "telephone log approval table",
                "#telephone-log-approval-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Telephone Log",
                "The telephone log does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Telephone Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-telephone-log", function () {
    var logid = $(this).data("logid");
    var transaction = "reject telephone log";

    Swal.fire({
      title: "Reject Telephone Log",
      text: "Are you sure you want to reject this telephone log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Reject",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Rejected") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment has been rejected.",
                "success"
              );

              generate_datatable(
                "telephone log approval table",
                "#telephone-log-approval-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment does not exist.",
                "info"
              );
            } else {
              show_alert(
                "Reject Attendance Record Adjustment",
                response,
                "error"
              );
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-document", function () {
    generate_modal(
      "document form",
      "Document",
      "R",
      "1",
      "1",
      "form",
      "documentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-document", function () {
    var documentid = $(this).data("documentid");

    sessionStorage.setItem("documentid", documentid);

    generate_modal(
      "document form1",
      "Document",
      "R",
      "1",
      "1",
      "form",
      "documentForm1",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-document", function () {
    var documentid = $(this).data("documentid");
    var transaction = "delete document";

    Swal.fire({
      title: "Delete Document",
      text: "Are you sure you want to delete this document?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            documentid: documentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Document",
                "The document has been deleted.",
                "success"
              );

              if ($("#pending-document-datatable").length) {
                generate_datatable(
                  "pending documents table",
                  "#pending-document-datatable",
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
            } else if (response === "Not Found") {
              show_alert(
                "Delete Document",
                "The document does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Document", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".publish-document", function () {
    var documentid = $(this).data("documentid");
    var transaction = "publish document";

    Swal.fire({
      title: "Publish Document",
      text: "Are you sure you want to publish this document?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Publish",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            documentid: documentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Published") {
              show_alert(
                "Publish Document",
                "The document has been published.",
                "success"
              );

              if ($("#pending-document-datatable").length) {
                generate_datatable(
                  "pending documents table",
                  "#pending-document-datatable",
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
            } else if (response === "Not Found") {
              show_alert(
                "Publish Document",
                "The document does not exist.",
                "info"
              );
            } else {
              show_alert("Publish Document", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".unpublish-document", function () {
    var documentid = $(this).data("documentid");
    var transaction = "unpublish document";

    Swal.fire({
      title: "Unpublish Document",
      text: "Are you sure you want to unpublish this document?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Unpublish",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            documentid: documentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Unpublished") {
              show_alert(
                "Unublish Document",
                "The document has been unpublished.",
                "success"
              );

              if ($("#pending-document-datatable").length) {
                generate_datatable(
                  "pending documents table",
                  "#pending-document-datatable",
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
            } else if (response === "Not Found") {
              show_alert(
                "Unublish Document",
                "The document does not exist.",
                "info"
              );
            } else {
              show_alert("Unublish Document", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-document-authorizer", function () {
    generate_modal(
      "document authorizer form",
      "Document Authorizer",
      "R",
      "0",
      "1",
      "form",
      "documentauthorizerForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-document-authorizer", function () {
    var department = $(this).data("department");
    var authorizer = $(this).data("authorizer");
    var transaction = "delete document authorizer";

    Swal.fire({
      title: "Delete Document Authorizer",
      text: "Are you sure you want to delete this document authorizer?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            department: department,
            authorizer: authorizer,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Document Authorizer",
                "The document authorizer has been deleted.",
                "success"
              );

              generate_datatable(
                "document authorizer table",
                "#document-authorizer-datatable",
                0,
                "desc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Document Authorizer",
                "The document authorizer does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Document Authorizer", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on(
    "click",
    ".assign-document-permission-department",
    function () {
      var documentid = $(this).data("documentid");

      sessionStorage.setItem("documentid", documentid);

      generate_modal(
        "document permission department form",
        "Document Permission Assignment",
        "LG",
        "1",
        "1",
        "form",
        "documentpermissiondepartmentForm",
        "0",
        username
      );
    }
  );

  $(document).on("click", ".assign-document-permission-employee", function () {
    var documentid = $(this).data("documentid");

    sessionStorage.setItem("documentid", documentid);

    generate_modal(
      "document permission employee form",
      "Document Permission Assignment",
      "LG",
      "1",
      "1",
      "form",
      "documentpermissionemployeeForm",
      "0",
      username
    );
  });

  $(document).on("click", ".download-document", function () {
    var documentid = $(this).data("documentid");

    sessionStorage.setItem("documentid", documentid);

    generate_modal(
      "download document form",
      "Protect & Download Document",
      "R",
      "1",
      "1",
      "form",
      "downloaddocumentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".view-document-file", function () {
  var documentid = $(this).data("documentid");
  var username = $("#username").text();
  var transaction = "view document file";
  $.ajax({
    type: "POST",
    url: "controller.php",
    dataType: "JSON",
    data: {
      username: username,
      transaction: transaction,
      documentid: documentid,
    },
    success: function (response) {
      // Open the document in a new tab
      window.open(response[0].LINK, '_blank');
    },
  });
});


  $(document).on("click", "#filter-document", function () {
    generate_modal(
      "filter document form",
      "Filter Document",
      "R",
      "0",
      "1",
      "form",
      "filterdocumentForm",
      "1",
      username
    );
  });



  $(document).on('click',"#filter_department_memos_procedures",function(){

    var  department = $(this).val()
    var form = new FormData;
    form.append('selected_department',department);
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
  })


$(document).on('click','#apply-memos-filter',function () {

  var filter_date =[moment($('#filter_start_date').val(), "MM/DD/YYYY",false).format("YYYY-MM-DD"),moment($('#filter_end_date').val(), "MM/DD/YYYY",false).format("YYYY-MM-DD")]
  var filter_department = $('#filter_department_memos_procedures').val()
  var filter_author = $('#filter_memo_author').val()

  generate_datatable_three_parameter(
    "publish memorandum documents table",
    filter_date.toString(),
    filter_department,
    filter_author,
    "#publish-memorandum-document-datatable",
    0,
    "desc",
    [11]
  );


  
})



  $(document).on("click", "#search-document", function () {
    generate_modal(
      "search document form",
      "Search All Document",
      "R",
      "0",
      "1",
      "form",
      "searchdocumentForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-document-category", function () {
    generate_modal(
      "filter document category form",
      "Filter Document",
      "R",
      "0",
      "1",
      "form",
      "filterdocumentcategoryForm",
      "1",
      username
    );
  });



  

  $(document).on("click", "#search-document-category", function () {
    generate_modal(
      "search document category form",
      "Search Document",
      "R",
      "0",
      "1",
      "form",
      "searchdocumentcategoryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-transmittal", function () {
    generate_modal(
      "transmittal form",
      "Transmittal",
      "R",
      "1",
      "1",
      "form",
      "transmittalForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");

    sessionStorage.setItem("transmittalid", transmittalid);

    generate_modal(
      "update transmittal form",
      "Transmittal",
      "R",
      "1",
      "1",
      "form",
      "updatetransmittalForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");
    var transaction = "delete transmittal";
    var filter1 = sessionStorage.getItem("filter1");
    var filter2 = sessionStorage.getItem("filter2");

    Swal.fire({
      title: "Delete Transmittal",
      text: "Are you sure you want to delete this transmittal?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            transmittalid: transmittalid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Transmittal",
                "The transmittal has been deleted.",
                "success"
              );

              if ($("#transmittal-datatable").length) {
                $("#filter-text").text("");
                generate_datatable_two_parameter(
                  "transmittal table",
                  filter1,
                  filter2,
                  "#transmittal-datatable",
                  3,
                  "desc",
                  [6]
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
            } else if (response === "Not Found") {
              show_alert(
                "Delete Transmittal",
                "The transmittal does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Transmittal", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".receive-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");
    var transaction = "receive transmittal";
    var filter1 = sessionStorage.getItem("filter1");
    var filter2 = sessionStorage.getItem("filter2");

    Swal.fire({
      title: "Receive Transmittal",
      text: "Are you sure you want to receive this transmittal?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Receive",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            transmittalid: transmittalid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Received") {
              show_alert(
                "Receive Transmittal",
                "The transmittal has been received.",
                "success"
              );

              if ($("#transmittal-datatable").length) {
                $("#filter-text").text("");
                generate_datatable_two_parameter(
                  "transmittal table",
                  filter1,
                  filter2,
                  "#transmittal-datatable",
                  3,
                  "desc",
                  [6]
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
            } else if (response === "Not Found") {
              show_alert(
                "Receive Transmittal",
                "The transmittal does not exist.",
                "info"
              );
            } else {
              show_alert("Receive Transmittal", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".retransmit-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");

    sessionStorage.setItem("transmittalid", transmittalid);

    generate_modal(
      "retransmit transmittal form",
      "Re-Transmit Transmittal",
      "R",
      "1",
      "1",
      "form",
      "retransmittransmittalForm",
      "0",
      username
    );
  });

  $(document).on("click", ".file-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");
    var transaction = "file transmittal";
    var filter1 = sessionStorage.getItem("filter1");
    var filter2 = sessionStorage.getItem("filter2");

    Swal.fire({
      title: "File Transmittal",
      text: "Are you sure you want to file this transmittal?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "File",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            transmittalid: transmittalid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Filed") {
              show_alert(
                "File Transmittal",
                "The transmittal has been filed.",
                "success"
              );

              if ($("#transmittal-datatable").length) {
                $("#filter-text").text("");
                generate_datatable_two_parameter(
                  "transmittal table",
                  filter1,
                  filter2,
                  "#transmittal-datatable",
                  3,
                  "desc",
                  [6]
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
            } else if (response === "Not Found") {
              show_alert(
                "File Transmittal",
                "The transmittal does not exist.",
                "info"
              );
            } else {
              show_alert("File Transmittal", response, "error");
            }
          },
        });
        return false;
      }
    });
  });
 
  $(document).on('click',"#apply-item-filter",function (){
     
  })

  $(document).on("click", ".cancel-transmittal", function () {
    var transmittalid = $(this).data("transmittalid");
    var transaction = "cancel transmittal";
    var filter1 = sessionStorage.getItem("filter1");
    var filter2 = sessionStorage.getItem("filter2");

    Swal.fire({
      title: "Cancel Transmittal",
      text: "Are you sure you want to cancel this transmittal?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            transmittalid: transmittalid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Cancelled") {
              show_alert(
                "Cancel Transmittal",
                "The transmittal has been cancelled.",
                "success"
              );

              if ($("#transmittal-datatable").length) {
                $("#filter-text").text("");
                generate_datatable_two_parameter(
                  "transmittal table",
                  filter1,
                  filter2,
                  "#transmittal-datatable",
                  3,
                  "desc",
                  [6]
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
            } else if (response === "Not Found") {
              show_alert(
                "Cancel Transmittal",
                "The transmittal does not exist.",
                "info"
              );
            } else {
              show_alert("Cancel Transmittal", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#filter-transmittal", function () {
    generate_modal(
      "filter transmittal",
      "Filter Transmittal",
      "R",
      "0",
      "1",
      "form",
      "filtertransmittalForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-transmittal-by-category", function () {
    generate_modal(
      "filter transmittal by category",
      "Filter Transmittal By Category",
      "R",
      "0",
      "1",
      "form",
      "filtertransmittalbycategoryForm",
      "1",
      username
    );
  });

  $(document).on("click", ".view-transmittal-history", function () {
    var transmittalid = $(this).data("transmittalid");

    sessionStorage.setItem("transmittalid", transmittalid);

    generate_modal(
      "transmittal history details",
      "Transmittal History",
      "XL",
      "0",
      "0",
      "element",
      "",
      "0",
      username
    );
  });

  $(document).on("click", "#add-suggest-to-win", function () {
    generate_modal(
      "suggest to win form",
      "Suggest To Win",
      "XL",
      "1",
      "1",
      "form",
      "suggesttowinForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-suggest-to-win", function () {
    var stwid = $(this).data("stwid");

    sessionStorage.setItem("stwid", stwid);

    generate_modal(
      "suggest to win form",
      "Suggest To Win",
      "XL",
      "1",
      "1",
      "form",
      "suggesttowinForm",
      "0",
      username
    );
  });

  $(document).on("click", ".view-suggest-to-win", function () {
    var stwid = $(this).data("stwid");

    sessionStorage.setItem("stwid", stwid);

    generate_modal(
      "suggest to win form",
      "Suggest To Win",
      "XL",
      "1",
      "0",
      "form",
      "suggesttowinForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-suggest-to-win", function () {
    var stwid = $(this).data("stwid");
    var transaction = "delete suggest to win";

    Swal.fire({
      title: "Delete Suggest To Win",
      text: "Are you sure you want to delete this suggest to win?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, stwid: stwid, transaction: transaction },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Suggest To Win",
                "The suggest to win has been deleted.",
                "success"
              );

              $("#filter-text").text("");
              generate_datatable_two_parameter(
                "suggest to win table",
                "",
                "",
                "#suggest-to-win-datatable",
                1,
                "asc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Suggest To Win",
                "The suggest to win does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Suggest To Win", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-suggest-to-win", function () {
    var stwid = $(this).data("stwid");
    var transaction = "approve suggest to win";

    Swal.fire({
      title: "Approve Suggest To Win",
      text: "Are you sure you want to approve this suggest to win?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, stwid: stwid, transaction: transaction },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Suggest To Win",
                "The suggest to win has been approved.",
                "success"
              );

              generate_datatable_two_parameter(
                "suggest to win approval table",
                "",
                "",
                "#suggest-to-win-approval-datatable",
                1,
                "asc",
                [7]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Suggest To Win",
                "The suggest to win does not exist.",
                "info"
              );
            } else {
                show_alert(
                "Approve Suggest To Win",
                "The suggest to win has been approved.",
                "success"
              );
            setTimeout(function() {
              window.location.reload();
            }, 2000);      }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-suggest-to-win", function () {
    var stwid = $(this).data("stwid");
    var transaction = "reject suggest to win";

    Swal.fire({
      title: "Reject Suggest To Win",
      text: "Are you sure you want to reject this suggest to win?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Reject",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, stwid: stwid, transaction: transaction },
          success: function (response) {
            if (response === "Rejected") {
              show_alert(
                "Reject Suggest To Win",
                "The suggest to win has been rejected.",
                "success"
              );

              generate_datatable_two_parameter(
                "suggest to win approval table",
                "",
                "",
                "#suggest-to-win-approval-datatable",
                1,
                "asc",
                [7]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Reject Suggest To Win",
                "The suggest to win does not exist.",
                "info"
              );
            } else {
              show_alert("Reject Suggest To Win", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-suggest-to-win", function () {
    var stwid = $(this).data("stwid");
    var transaction = "cancel suggest to win";

    Swal.fire({
      title: "Cancel Suggest To Win",
      text: "Are you sure you want to cancel this suggest to win?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, stwid: stwid, transaction: transaction },
          success: function (response) {
            if (response === "Cancelled") {
              show_alert(
                "Cancel Suggest To Win",
                "The suggest to win has been cancelled.",
                "success"
              );

              $("#filter-text").text("");
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
            } else if (response === "Not Found") {
              show_alert(
                "Cancel Suggest To Win",
                "The suggest to win does not exist.",
                "info"
              );
            } else {
              show_alert("Cancel Suggest To Win", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".adjust-suggest-to-win", function () {
    var stwid = $(this).data("stwid");

    sessionStorage.setItem("stwid", stwid);

    generate_modal(
      "stw vote end date form",
      "Suggest To Win Vote End Date",
      "R",
      "0",
      "1",
      "form",
      "suggesttowinvoteenddateForm",
      "0",
      username
    );
  });

  $(document).on("click", "#filter-suggest-to-win", function () {
    generate_modal(
      "filter suggest to win",
      "Filter Suggest To Win",
      "R",
      "0",
      "1",
      "form",
      "filtersuggesttowinForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-suggest-to-win-approval", function () {
    generate_modal(
      "filter suggest to win approval",
      "Filter Suggest To Win",
      "R",
      "0",
      "1",
      "form",
      "filtersuggesttowinapprovalForm",
      "1",
      username
    );
  });

  $(document).on("click", ".vote-suggest-to-win", function () {
    var stwid = $(this).data("stwid");
    var employeeid = $(this).data("employeeid");

    sessionStorage.setItem("stwid", stwid);
    sessionStorage.setItem("employeeid", employeeid);

    generate_modal(
      "suggest to win vote form",
      "Suggest To Win Vote",
      "R",
      "0",
      "1",
      "form",
      "suggesttowinvoteForm",
      "0",
      username
    );
  });

  $(document).on("click", ".view-suggest-to-win-votes", function () {
    var stwid = $(this).data("stwid");

    sessionStorage.setItem("stwid", stwid);

    generate_modal(
      "suggest to win votes details",
      "Suggest To Win Votes",
      "XL",
      "0",
      "0",
      "element",
      "",
      "0",
      username
    );
  });

  $(document).on("click", "#filter-suggest-to-win-vote-summary", function () {
    generate_modal(
      "filter suggest to win votes",
      "Filter Suggest To Win Votes",
      "R",
      "0",
      "1",
      "form",
      "filtersuggesttowinvotesForm",
      "1",
      username
    );
  });

  $(document).on("click", "#import-transmittal", function () {
    generate_modal(
      "import transmittal form",
      "Import Transmittal",
      "R",
      "1",
      "1",
      "form",
      "importtransmittalForm",
      "1",
      username
    );
  });

  $(document).on("click", "#import-transmittal-history", function () {
    generate_modal(
      "import transmittal history form",
      "Import Transmittal History",
      "R",
      "1",
      "1",
      "form",
      "importtransmittalhistoryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#import-document", function () {
    generate_modal(
      "import document form",
      "Import Document",
      "R",
      "1",
      "1",
      "form",
      "importdocumentForm",
      "1",
      username
    );
  });

  $(document).on(
    "click",
    "#import-department-document-permission",
    function () {
      generate_modal(
        "import department document permission form",
        "Import Department Permission",
        "R",
        "1",
        "1",
        "form",
        "importdepartmentdocumentpermissionForm",
        "1",
        username
      );
    }
  );

  $(document).on("click", "#import-employee-document-permission", function () {
    generate_modal(
      "import employee document permission form",
      "Import Employee Permission",
      "R",
      "1",
      "1",
      "form",
      "importemployeedocumentpermissionForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-training-room-log", function () {
    generate_modal(
      "training room log form",
      "Training Room Log",
      "R",
      "0",
      "1",
      "form",
      "trainingroomlogForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-training-room-log", function () {
    var logid = $(this).data("logid");
    var locked = $(this).data("locked");

    sessionStorage.setItem("logid", logid);
    sessionStorage.setItem("locked", locked);

    generate_modal(
      "training room log form",
      "Training Room Log",
      "R",
      "0",
      "1",
      "form",
      "trainingroomlogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".view-training-room-log", function () {
    var logid = $(this).data("logid");

    sessionStorage.setItem("logid", logid);

    generate_modal(
      "training room log form",
      "Training Room Log",
      "R",
      "0",
      "0",
      "form",
      "trainingroomlogForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-training-room-log", function () {
    var logid = $(this).data("logid");
    var transaction = "delete training room log";

    Swal.fire({
      title: "Delete Training Room Log",
      text: "Are you sure you want to delete this training room log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Training Room Log",
                "The training room log has been deleted.",
                "success"
              );

              $("#filter-text").text("");

              generate_datatable_two_parameter(
                "training room log table",
                "",
                "",
                "#training-room-log-datatable",
                0,
                "asc",
                [11]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Training Room Log",
                "The training room log does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Training Room Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-training-room-log", function () {
    var logid = $(this).data("logid");
    var transaction = "cancel training room log";

    Swal.fire({
      title: "Cancel Training Room Log",
      text: "Are you sure you want to cancel this training room log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Cancelled") {
              show_alert(
                "Cancel Training Room Log",
                "The training room log has been cancelled.",
                "success"
              );

              if ($("#training-room-log-datatable").length) {
                $("#filter-text").text("");
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
            } else if (response === "Not Found") {
              show_alert(
                "Cancel Training Room Log",
                "The training room log does not exist.",
                "info"
              );
            } else {
              show_alert("Cancel Training Room Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-training-room-log", function () {
    var logid = $(this).data("logid");
    var transaction = "approve training room log";

    Swal.fire({
      title: "Approve Training Room Log",
      text: "Are you sure you want to approve this training room log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Training Room Log",
                "The training room log has been approved.",
                "success"
              );

              generate_datatable(
                "training room log approval table",
                "#training-room-log-approval-datatable",
                0,
                "asc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Training Room Log",
                "The training room log does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Training Room Log", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-training-room-log", function () {
    var logid = $(this).data("logid");
    var transaction = "reject training room log";

    Swal.fire({
      title: "Reject Training Room Log",
      text: "Are you sure you want to reject this training room log?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Reject",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, logid: logid, transaction: transaction },
          success: function (response) {
            if (response === "Rejected") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment has been rejected.",
                "success"
              );

              generate_datatable(
                "training room log approval table",
                "#training-room-log-approval-datatable",
                0,
                "asc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment does not exist.",
                "info"
              );
            } else {
              show_alert(
                "Reject Attendance Record Adjustment",
                response,
                "error"
              );
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#filter-employee-attendance-record", function () {
    generate_modal(
      "filter employee attendance record",
      "Filter Employee Attendance Record",
      "R",
      "0",
      "1",
      "form",
      "filteremployeeattendancerecordForm",
      "1",
      username
    );
  });

  $(document).on(
    "click",
    "#filter-employee-attendance-adjustment",
    function () {
      generate_modal(
        "filter employee attendance adjustment",
        "Filter Employee Attendance Adjustment",
        "R",
        "0",
        "1",
        "form",
        "filteremployeeattendanceadjustmentForm",
        "1",
        username
      );
    }
  );

  $(document).on("click", "#filter-attendance-log", function () {
    generate_modal(
      "filter attendance log",
      "Filter Attendance Record",
      "R",
      "0",
      "1",
      "form",
      "filterattendancelogForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-attendance-adjustment-summary", function () {
    generate_modal(
      "filter attendance adjustment",
      "Filter Attendance Adjustment",
      "R",
      "0",
      "1",
      "form",
      "filterattendanceadjustmentForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-weekly-cash-flow", function () {
    generate_modal(
      "weekly cash flow form",
      "Weekly Cash Flow",
      "R",
      "0",
      "1",
      "form",
      "weeklycashflowForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-weekly-cash-flow", function () {
    var wcfid = $(this).data("wcfid");

    sessionStorage.setItem("wcfid", wcfid);

    generate_modal(
      "weekly cash flow form",
      "Weekly Cash Flow",
      "R",
      "0",
      "1",
      "form",
      "weeklycashflowForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-weekly-cash-flow", function () {
    var wcfid = $(this).data("wcfid");
    var transaction = "delete weekly cash flow";

    Swal.fire({
      title: "Delete Weekly Cash Flow",
      text: "Are you sure you want to delete this weekly cash flow?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, wcfid: wcfid, transaction: transaction },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Weekly Cash Flow",
                "The weekly cash flow has been deleted.",
                "success"
              );

              $("#filter-text").text("");
              generate_datatable_one_parameter(
                "weekly cash flow table",
                "",
                "#weekly-cash-flow-datatable",
                2,
                "desc",
                [5]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Weekly Cash Flow",
                "The weekly cash flow does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Weekly Cash Flow", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-weekly-cash-flow", function () {
    var wcfid = $(this).data("wcfid");
    var transaction = "approve weekly cash flow";

    Swal.fire({
      title: "Approve Weekly Cash Flow",
      text: "Are you sure you want to approve this weekly cash flow?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { username: username, wcfid: wcfid, transaction: transaction },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Weekly Cash Flow",
                "The weekly cash flow has been approved.",
                "success"
              );

              $("#filter-text").text("");
              generate_datatable_one_parameter(
                "weekly cash flow table",
                "",
                "#weekly-cash-flow-datatable",
                2,
                "desc",
                [5]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Weekly Cash Flow",
                "The weekly cash flow does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Weekly Cash Flow", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".unlock-weekly-cash-flow", function () {
    var wcfid = $(this).data("wcfid");

    var transaction = "unlock weekly cash flow";

    Swal.fire({
      title: "Unlock Weekly Cash Flow",
      text: "Are you sure you want to unlock this weekly cash flow?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Unlock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { transaction: transaction, username: username, wcfid: wcfid },
          success: function (response) {
            if (response == "Unlocked") {
              show_alert(
                "Unlock Weekly Cash Flow",
                "The weekly cash flow has been unlocked.",
                "success"
              );

              $("#filter-text").text("");
              generate_datatable_one_parameter(
                "weekly cash flow table",
                "",
                "#weekly-cash-flow-datatable",
                2,
                "desc",
                [5]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Unlock Weekly Cash Flow",
                "The weekly cash flow does not exists.",
                "warning"
              );
            } else {
              show_alert("Unlock Weekly Cash Flow", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".lock-weekly-cash-flow", function () {
    var wcfid = $(this).data("wcfid");

    var username = $("#username").text();
    var transaction = "lock weekly cash flow";

    Swal.fire({
      title: "Lock Weekly Cash Flow",
      text: "Are you sure you want to lock this weekly cash flow?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Lock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: { transaction: transaction, username: username, wcfid: wcfid },
          success: function (response) {
            if (response == "Locked") {
              show_alert(
                "Lock Weekly Cash Flow",
                "The weekly cash flow has been locked.",
                "success"
              );

              $("#filter-text").text("");
              generate_datatable_one_parameter(
                "weekly cash flow table",
                "",
                "#weekly-cash-flow-datatable",
                2,
                "desc",
                [5]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Lock Weekly Cash Flow",
                "The weekly cash flow does not exists.",
                "warning"
              );
            } else {
              show_alert("Lock Weekly Cash Flow", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-weekly-cash-flow-particulars", function () {
    generate_modal(
      "weekly cash flow particulars form",
      "Weekly Cash Flow Particulars",
      "R",
      "0",
      "1",
      "form",
      "weeklycashflowparticularsForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-weekly-cash-flow-particulars", function () {
    var wcfid = $(this).data("wcfid");
    var particularid = $(this).data("particularid");

    sessionStorage.setItem("wcfid", wcfid);
    sessionStorage.setItem("particularid", particularid);

    generate_modal(
      "weekly cash flow particulars form",
      "Weekly Cash Flow Particulars",
      "R",
      "0",
      "1",
      "form",
      "weeklycashflowparticularsForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-weekly-cash-flow-particulars", function () {
    var wcfid = $(this).data("wcfid");
    var particularid = $(this).data("particularid");
    var transaction = "delete weekly cash flow particulars";

    Swal.fire({
      title: "Delete Weekly Cash Flow Particulars",
      text: "Are you sure you want to delete this weekly cash flow particulars?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            wcfid: wcfid,
            particularid: particularid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Weekly Cash Flow Particulars",
                "The weekly cash flow particulars has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "weekly cash flow particulars table",
                wcfid,
                "#weekly-cash-flow-particulars-datatable",
                0,
                "desc",
                [9]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Weekly Cash Flow Particulars",
                "The weekly cash flow particulars does not exist.",
                "info"
              );
            } else {
              show_alert(
                "Delete Weekly Cash Flow Particulars",
                response,
                "error"
              );
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#filter-weekly-cash-flow", function () {
    generate_modal(
      "filter weekly cash flow",
      "Filter Weekly Cash Flow",
      "R",
      "0",
      "1",
      "form",
      "filterweeklycashflowForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-weekly-cash-flow-summary", function () {
    generate_modal(
      "filter weekly cash flow summary",
      "Filter Weekly Cash Flow Summary",
      "R",
      "0",
      "1",
      "form",
      "filterweeklycashflowsummaryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-training-room-log", function () {
    generate_modal(
      "filter training room log",
      "Filter Training Room Log",
      "R",
      "0",
      "1",
      "form",
      "filtertrainingroomlogForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-training", function () {
    generate_modal(
      "filter training room log",
      "Filter Training Room Log",
      "R",
      "0",
      "1",
      "form",
      "filtertrainingroomlogForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-ticket", function () {
    generate_modal(
      "ticket form",
      "Ticket",
      "LG",
      "0",
      "1",
      "form",
      "ticketForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-ticket", function () {
    var ticketid = $(this).data("ticketid");
    var locked = $(this).data("locked");

    sessionStorage.setItem("ticketid", ticketid);
    sessionStorage.setItem("locked", locked);

    generate_modal(
      "update ticket form",
      "Ticket",
      "LG",
      "0",
      "1",
      "form",
      "updateticketForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-ticket", function () {
    var ticketid = $(this).data("ticketid");
    var transaction = "delete ticket";

    Swal.fire({
      title: "Delete Ticket",
      text: "Are you sure you want to delete this ticket?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            ticketid: ticketid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Ticket",
                "The ticket has been deleted.",
                "success"
              );

              $("#filter-text").text("");

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
            } else if (response === "Not Found") {
              show_alert("Delete Ticket", "The ticket does not exist.", "info");
            } else {
              show_alert("Delete Ticket", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".accept-ticket", function () {
    var ticketid = $(this).data("ticketid");
    var transaction = "accept ticket";

    Swal.fire({
      title: "Accept Ticket",
      text: "Are you sure you want to approve this ticket?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Accept",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            ticketid: ticketid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Accepted") {
              if ($("#ticket-datatable").length) {
                show_alert(
                  "Accept Ticket",
                  "The ticket has been accepted.",
                  "success"
                );

                $("#filter-text").text("");

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
              } else {
                show_alert_event(
                  "Accept Ticket",
                  "The ticket has been accepted.",
                  "success",
                  "reload"
                );
              }
            } else if (response === "Not Found") {
              show_alert("Accept Ticket", "The ticket does not exist.", "info");
            } else {
              show_alert("Accept Ticket", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-ticket", function () {
    var ticketid = $(this).data("ticketid");

    sessionStorage.setItem("ticketid", ticketid);

    generate_modal(
      "cancel ticket form",
      "Cancel Ticket",
      "R",
      "0",
      "1",
      "form",
      "cancelticketForm",
      "1",
      username
    );
  });

  $(document).on("click", ".reject-ticket", function () {
    var ticketid = $(this).data("ticketid");

    sessionStorage.setItem("ticketid", ticketid);

    generate_modal(
      "reject ticket form",
      "Reject Ticket",
      "R",
      "0",
      "1",
      "form",
      "rejectticketForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-ticket", function () {
    generate_modal(
      "filter ticket form",
      "Filter Ticket",
      "R",
      "0",
      "1",
      "form",
      "filterticketForm",
      "1",
      username
    );
  });

  $(document).on("click", "#filter-ticket-by-date", function () {
    generate_modal(
      "filter ticket by date",
      "Filter Ticket By Date",
      "R",
      "0",
      "1",
      "form",
      "filterticketbydateForm",
      "1",
      username
    );
  });

  $(document).on("click", ".tag-ticket-as-auto-closed", function () {
    var ticketid = $(this).data("ticketid");

    sessionStorage.setItem("ticketid", ticketid);

    generate_modal(
      "tag ticket as closed form",
      "Tag Ticket As Close",
      "R",
      "0",
      "1",
      "form",
      "tagticketasclosedForm",
      "1",
      username
    );
  });

  $(document).on("click", ".tag-ticket-as-solved", function () {
    var ticketid = $(this).data("ticketid");
    var transaction = "tag ticket as solved";

    Swal.fire({
      title: "Tag Ticket As Solved",
      text: "Are you sure you want to tag this ticket as solved?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Tag As Solved",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            ticketid: ticketid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Solved") {
              if ($("#ticket-datatable").length) {
                show_alert(
                  "Tag Ticket As Solved",
                  "The ticket has been tagged as solved.",
                  "success"
                );

                $("#filter-text").text("");

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
              } else {
                show_alert_event(
                  "Tag Ticket As Solved",
                  "The ticket has been tagged as solved.",
                  "success",
                  "reload"
                );
              }
            } else if (response === "Not Found") {
              show_alert(
                "Tag Ticket As Solved",
                "The ticket does not exist.",
                "info"
              );
            } else {
              show_alert("Tag Ticket As Solved", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".tag-ticket-as-closed", function () {
    var ticketid = $(this).data("ticketid");
    var transaction = "tag ticket as closed";

    Swal.fire({
      title: "Tag Ticket As Closed",
      text: "Are you sure you want to tag this ticket as closed?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Tag As Closed",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            ticketid: ticketid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Closed") {
              if ($("#ticket-datatable").length) {
                show_alert(
                  "Tag Ticket As Closed",
                  "The ticket has been tagged as closed.",
                  "success"
                );

                $("#filter-text").text("");

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
              } else {
                show_alert_event(
                  "Tag Ticket As Closed",
                  "The ticket has been tagged as closed.",
                  "success",
                  "reload"
                );
              }
            } else if (response === "Not Found") {
              show_alert(
                "Tag Ticket As Closed",
                "The ticket does not exist.",
                "info"
              );
            } else {
              show_alert("Tag Ticket As Closed", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".tag-ticket-as-unsolved", function () {
    var ticketid = $(this).data("ticketid");
    var transaction = "tag ticket as unsolved";

    Swal.fire({
      title: "Tag Ticket As Unsolved",
      text: "Are you sure you want to tag this ticket as unsolved?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Tag As Unsolved",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            ticketid: ticketid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Unsolved") {
              if ($("#ticket-datatable").length) {
                show_alert(
                  "Tag Ticket As Unsolved",
                  "The ticket has been tagged as unsolved.",
                  "success"
                );

                $("#filter-text").text("");

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
              } else {
                show_alert_event(
                  "Tag Ticket As Unsolved",
                  "The ticket has been tagged as unsolved.",
                  "success",
                  "reload"
                );
              }
            } else if (response === "Not Found") {
              show_alert(
                "Tag Ticket As Unsolved",
                "The ticket does not exist.",
                "info"
              );
            } else {
              show_alert("Tag Ticket As Unsolved", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-ticket-note", function () {
    generate_modal(
      "ticket note form",
      "Ticket Note",
      "R",
      "0",
      "1",
      "form",
      "ticketnoteForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-ticket-note", function () {
    var noteid = $(this).data("noteid");
    var ticketid = $("#ticket-id").text();
    var transaction = "delete ticket note";

    Swal.fire({
      title: "Delete Ticket Note",
      text: "Are you sure you want to delete this ticket note?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            noteid: noteid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Ticket Note",
                "The ticket note has been deleted.",
                "success"
              );

              generate_ticket_notes(ticketid);
            } else if (response === "Not Found") {
              show_alert(
                "Delete Ticket Note",
                "The ticket note does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Ticket Note", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-ticket-attachment", function () {
    generate_modal(
      "ticket attachment form",
      "Ticket Attachment",
      "R",
      "0",
      "1",
      "form",
      "ticketattachmentForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-ticket-attachment", function () {
    var attachmentid = $(this).data("attachmentid");
    var ticketid = $("#ticket-id").text();
    var transaction = "delete ticket attachment";

    Swal.fire({
      title: "Delete Ticket Attachment",
      text: "Are you sure you want to delete this ticket attachment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            attachmentid: attachmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Ticket Attachment",
                "The ticket attachment has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "ticket attachment table",
                ticketid,
                "#ticket-attachment-datatable",
                0,
                "desc",
                [5]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Ticket Attachment",
                "The ticket attachment does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Ticket Attachment", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-ticket-adjustment", function () {
    generate_modal(
      "add ticket adjustment form",
      "Ticket Adjustment",
      "LG",
      "0",
      "1",
      "form",
      "addticketadjustmentForm",
      "0",
      username
    );
  });

  $(document).on("click", ".update-ticket-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "update ticket adjustment form",
      "Ticket Adjustment",
      "LG",
      "0",
      "1",
      "form",
      "updateticketadjustmentForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-ticket-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");
    var ticketid = $("#ticket-id").text();
    var transaction = "delete ticket adjustment";

    Swal.fire({
      title: "Delete Ticket Adjustment",
      text: "Are you sure you want to delete this ticket adjustment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            adjustmentid: adjustmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Ticket Adjustment",
                "The ticket adjustment has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "ticket request table",
                ticketid,
                "#ticket-adjustment-datatable",
                0,
                "desc",
                [12]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Ticket Adjustment",
                "The ticket adjustment does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Ticket Adjustment", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-ticket-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");
    var transaction = "cancel ticket adjustment";

    Swal.fire({
      title: "Cancel Ticket Adjustment",
      text: "Are you sure you want to cancel this ticket adjustment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Cancel",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            adjustmentid: adjustmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Cancelled") {
              show_alert(
                "Cancel Ticket Adjustment",
                "The ticket adjustment has been cancelled.",
                "success"
              );

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
            } else if (response === "Not Found") {
              show_alert(
                "Cancel Ticket Adjustment",
                "The ticket adjustment does not exist.",
                "info"
              );
            } else {
              show_alert("Cancel Ticket Adjustment", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".approve-ticket-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");
    var transaction = "approve ticket adjustment";

    Swal.fire({
      title: "Approve Ticket Adjustment",
      text: "Are you sure you want to approve this ticket adjustment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            adjustmentid: adjustmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Ticket Adjustment",
                "The ticket adjustment has been approved.",
                "success"
              );

              generate_datatable(
                "ticket adjustment request table",
                "#ticket-adjustment-request-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Ticket Adjustment",
                "The ticket adjustment does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Ticket Adjustment", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-ticket-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");
    var transaction = "reject ticket adjustment";

    Swal.fire({
      title: "Reject Ticket Adjustment",
      text: "Are you sure you want to reject this ticket adjustment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Reject",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            adjustmentid: adjustmentid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Rejected") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment has been rejected.",
                "success"
              );

              generate_datatable(
                "ticket adjustment request table",
                "#ticket-adjustment-request-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Reject Attendance Record Adjustment",
                "The attendance record adjustment does not exist.",
                "info"
              );
            } else {
              show_alert(
                "Reject Attendance Record Adjustment",
                response,
                "error"
              );
            }
          },
        });
        return false;
      }
    });
  });

  // ============================changes lemar bill==================================

  //Purchase request module


  //print approved PR

  $(document).on("click","#btn_print_summary",function () {
    var prno = $("#prno_encrypted").val();
    const url = `purchase-request-print.php?prid=${prno}`;
    window.open(url, "_blank");
    
  })

  // filter purchase request list
  $(document).on("click","#apply-pr-list-filter",function () {
    generate_datatable(
      "purchase request table",
      "#purchase-request-datatable",
      0,
      "desc"
    )
  })

    //action for approve the purchase request
    $(document).on("click", "#btn_action_approve", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "Approve purchase request",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confim",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          var prno = $("#prno").val();
          var formdata = new FormData();
          formdata.append(
            "transaction",
            "purchase request change to approve"
          );
          formdata.append("prno", prno);
  
         
  
          ajax_request_form(
            "controller.php",
            formdata,
            function (d) {
              show_alert_event("Success!", "", "success", "reload");
            },
            function () {},
            function () {
              $("#btn_action_to_bud_con").html(
                '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
              );
            }
          );
        }
      });
    })

  //action for recommend the purchase request
  $(document).on("click", "#btn_action_recommend", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "Recommend your purchase request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
        var formdata = new FormData();
        formdata.append(
          "transaction",
          "purchase request change to recommended"
        );
        formdata.append("prno", prno);

       

        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            show_alert_event("Success!", "", "success", "reload");
          },
          function () {},
          function () {
            $("#btn_action_to_bud_con").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });
  })

  //action for deleting the purchase request
  $(document).on("click", "#btn_action_delete", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete your purchase request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
        var formdata = new FormData();
        formdata.append(
          "transaction",
          "purchase request change to deleted"
        );
        formdata.append("prno", prno);

        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            show_alert_event("Success!", "", "success", "reload");
          },
          function () {},
          function () {
            $("#btn_action_to_bud_con").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });
  });


  //action button change recommedation 1 approval to approve
  $(document).on('click',"#btn_action_approve_recommendation1",function () {


    Swal.fire({
      title: "Are you sure?",
      text: "To approve recommendation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
       
        var formdata = new FormData();

        //append the data 
        formdata.append(
          "transaction",
          "purchase request add approved in recommendation 1"
        );
        formdata.append("prno", prno);


        //send request
        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            console.log(d);
            show_alert_event("Success!", "", "success", "reload");
            
          },
          function (d) {
            console.log(d);
          },
          function () {
            $("#btn_action_for_recommendation").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });
  })




  $(document).on('click',"#btn_action_approve_recommendation2",function () {


    Swal.fire({
      title: "Are you sure?",
      text: "To approve recommendation",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
       
        var formdata = new FormData();

        //append the data 
        formdata.append(
          "transaction",
          "purchase request add approved in recommendation 2"
        );
        formdata.append("prno", prno);


        //send request
        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            console.log(d);
            show_alert_event("Success!", "", "success", "reload");
            
          },
          function (d) {
            console.log(d);
          },
          function () {
            $("#btn_action_for_recommendation").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });
  })

  //action button change pr status to For Recommendation
  $(document).on('click',"#btn_action_for_recommendation",function () {
    Swal.fire({
      title: "Are you sure?",
      text: "To recommend the Purchase request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
       
        var formdata = new FormData();

        //append the data 
        formdata.append(
          "transaction",
          "purchase request change to for recommendation"
        );
        formdata.append("prno", prno);


        //send request
        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            console.log(d);
            show_alert_event("Success!", "", "success", "reload");
            
          },
          function (d) {
            console.log(d);
          },
          function () {
            $("#btn_action_for_recommendation").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });



  })

  //action for changing status to Budget Confirmed
  $(document).on("click", "#btn_action_bud_con", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "Please review,  fill the budget cofirmation remarks",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confim",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        var prno = $("#prno").val();
        var pr_bud_confirm_rem = $('#rem_budcon').val()
        var formdata = new FormData();

        //append the data 
        formdata.append(
          "transaction",
          "purchase request change to budget confirm"
        );
        formdata.append(
            "pr_bud_con_rem",
            pr_bud_confirm_rem
        )
        formdata.append("prno", prno);


        //send request
        ajax_request_form(
          "controller.php",
          formdata,
          function (d) {
            console.log(d);
            show_alert_event("Success!", "", "success", "reload");
            
          },
          function (d) {
            console.log(d);
           
          },
          function () {
            $("#btn_action_to_bud_con").html(
              '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
            );
          }
        );
      }
    });
  });

  //action if  to bud con button is click : action for changing the pr to for budget confirm
  $(document).on("click", "#btn_action_to_bud_con", function () {
    var total_est_cost =$('#total_estcost b').html().replace("Php ","");
    var requested_by = $('#requested_by').val()
    var approved_by = $('#approved_by').val()
    var rem_justi =$('#rem_justi').val()
    
    

      if(total_est_cost == 0 || requested_by == '' || approved_by == ''|| rem_justi == ''){
          if(requested_by == ''){
            show_alert("No Requested By","Please Fill the Requested By","info")
          }else if(approved_by == ''){
            show_alert("No Approver","Please Fill the Approver","info")
            
          }else if(rem_justi == ''){
            show_alert("No Justification","Please Fill the Justification","info")
          }
          else{
            show_alert("No Items","Please Add a Particular","info")
          }
       
      }else{

        Swal.fire({
          title: "Are you sure?",
          text: "Please review before confiming",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confim",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.value) {
            var prno = $("#prno").val();
            var formdata = new FormData();
            formdata.append(
              "transaction",
              "purchase request change to for bud confirm"
            );
            formdata.append("prno", prno);

            $('#frm_PR_info').submit();
    
           // show_alert_event("Success!", "", "success", "reload");
    
            ajax_request_form(
              "controller.php",
              formdata,
              function (d) {
                console.log(d);
              show_alert_event("Success!", "", "success", "reload");
              },
              function (d) {
                console.log(d);
              },
              function () {
                $("#btn_action_to_bud_con").html(
                  '<div class="spinner-border spinner-border-sm text-light" role="status"><span rclass="sr-only"></span></div>'
                );
              }
            );
          }
        });


      }




  });

  //delete items
  $(document).on("click", ".btn-delete-item-purchase-request", function () {
    var item_id = $(this).data("item-pr");
    var formdata = new FormData();
    formdata.append("transaction", "delete pr items");
    formdata.append("item_id", item_id);
    //alert(item_id)

    ajax_request_form(
      "controller.php",
      formdata,
      function (res) {
        //success
        show_alert("success", "item is deleted", "success", function () {});
      },
      function (res) {
        //complete
        generate_datatable(
          "purchase request items table",
          "#purchase-request-items-datatable",
          2,
          "desc"
        );
      },
      function () {
        //before send
      },
      function (res) {
        //error
        show_alert(res.status, res.responseText, "error");
      }
    );
  });

  $(document).on("click", "#btn_add_particular", function () {
    $("#mdl_add_particular").modal("show");
  });

  $("#btn_add_row_item").on("click", function () {
    var elem = $("#item_container");
    var clone = elem.last();
    var display = ` <div class="row mb-4">
        <div class="col-md-2">
            <label for="client_fname" class="form-label">Quantity</label>
            <input type="number" class="form-control"  name="quantity[]"  />
        
        </div>

        <div class="col-md-2">
        
            <label for="unit">Unit</label>
            <input type="text" class="form-control"  name="unit[]" >
        
        </div>

        <div class="col-md-3">
        
            <label for="part_desc">Particular</label>
            <textarea name="part_desc[]"  class="form-control"  cols="" rows="1"></textarea>
        
        </div>

        <div class="col-md-2">
            <label for="Budget">Budget</label>
            <input type="number" class="form-control"  name="budget[]" >
        </div>

        <div class="col-md-2">
            <label for="Budget">Estimated</label>
            <input type="number" class="form-control"  name="estimated[]" >
        </div>
        <div class="col-md-1">
            <label class="text-white">0</label>
           <button class="btn btn-danger delete-element form-control">x</button>
        </div>
    </div>`;
    elem.after(display);
    console.log(clone);

    $(".delete-element").on("click", function () {
      $(this).parent().parent().remove();
    });
  });

  //pr list add pr
  $(document).on("click", ".btn-add-purchase-request", function () {
    $("#mdl_add_pr").modal("show");
  });

  //vault access

  $("#apply-vault-access-filter").on("click", function () {
    generate_datatable(
      "vault access logs table",
      "#vault-access-datatable",
      0,
      "desc"
    );
  });

  $("#scan_vault").on("click", function () {
    console.log(localStorage.getItem("names"));
    var names_input = $("#name").val();
    var act_other = $("#purpose").val();
    var other_input = $("#other_purpose").val();

    if (act_other == "VACTOTHER") {
      if (other_input.length == 0) {
        show_alert("Purpose", "Please Specify your Purpose", "error");
      } else {
        $("#mdl_scan").modal("show");
      }
    } else {
      $("#mdl_scan").modal("show");
    }
  });

  //insurance request modules

  $(document).on("click", "#ins_tag_cancel", function () {
    var ins_req_id = $("#ins_req_id").val();

    Swal.fire({
      title: "Are you sure? this cannot be undone.",
      text: "Are you sure you want to tag as cancel?",
      html: '<input type="text" id="cancel_rem" class="swal2-input" placeholder="remark">',
      icon: "warning",

      showCancelButton: !0,
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-primary mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,

      preConfirm: () => {
        const rem = Swal.getPopup().querySelector("#cancel_rem").value;

        if (!rem) {
          Swal.showValidationMessage(`Please enter your remarks`);
        }
        return { rem: rem };
      },
    }).then(function (result) {
      if (result.value) {
        var remarks = result.value.rem;

        console.log(remarks);
        var formdata = new FormData();
        formdata.append("transaction", "submit cancel insurance request");
        formdata.append("username", username);
        formdata.append("ins_req_id", ins_req_id);
        formdata.append("cancel_rem", remarks);
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: formdata,
          processData: false,
          contentType: false,
          success: function (response) {
            console.log(response);
          },
          complete: function (e) {
            if (JSON.parse(e.responseText) == "complete") {
              show_alert_event(
                "Success",
                "Insurance request successfully tag as completed",
                "success",
                "reload"
              );
            } else {
              show_alert_event("Error", e.responseText, "error");
            }
          },
        });

        return false;
      }
    });
  });

  $(document).on("click", "#ins_tag_complete", function () {
    var ins_req_id = $("#ins_req_id").val();

    Swal.fire({
      title: "Are you sure? this cannot be undone.",
      text: "Are you sure you want to tag as complete?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Yes",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-primary mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        var formdata = new FormData();
        formdata.append("transaction", "submit complete insurance request");
        formdata.append("username", username);
        formdata.append("ins_req_id", ins_req_id);
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: formdata,
          processData: false,
          contentType: false,
          success: function (response) {
            console.log(response);
          },
          complete: function (e) {
            if (JSON.parse(e.responseText) == "complete") {
              show_alert_event(
                "Success",
                "Insurance request successfully tag as completed",
                "success",
                "reload"
              );
            } else {
              show_alert_event("Error", e.responseText, "error");
            }
          },
        });

        return false;
      }
    });
  });

  $(document).on("click", ".btn-delete-insurance-request", function () {
    var ins_req_id = $(this).data("insurance-requestid");

    Swal.fire({
      title: "Delete insurance Request",
      text: "Are you sure you want to delete this insurance Request?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        var formdata = new FormData();
        formdata.append("transaction", "submit delete insurance request");
        formdata.append("username", username);
        formdata.append("ins_req_id", ins_req_id);
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: formdata,
          processData: false,
          contentType: false,
          success: function (response) {
            console.log(response);
          },
          complete: function (e) {
            if (JSON.parse(e.responseText) == "deleted") {
              show_alert_event(
                "Deleted",
                "Insurance request successfully deleted",
                "success",
                "reload"
              );
            } else {
              show_alert_event("Error", e.responseText, "error");
            }
          },
        });

        return false;
      }
    });
  });

  $("#submitform_ins_req").on("click", function () {
    Swal.fire({
      title: "Add/Update insurance Request",
      text: "Are you sure you want to add/update this insurance Request?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Add",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-primary mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $("#addinsurancerequestForm").submit();
        return false;
      }
    });
  });

  //activity note details

  $("#btn_addattachment").on("click", function () {
    $("#mdl_add_activity_attachement").modal("show");
  });
  //Activity Notes
  //Add activity Notes
  $(document).on("click", "#btn_addactivity", function () {
    $("#mdl_add_activity").modal("show");
  });

  $(document).on("click", ".btn-update-activity", function () {
    generate_select_option("#upt_act_type", "activity type option");
    $("#mdl_update_activity").modal("show");
    var act_id = $(this).data("activityid");
    ajax_request(
      "controller.php",
      { transaction: "get activity details", activity_id: act_id },
      function (d) {
        //console.log(d);
      },
      function (d) {
        var data = d.responseJSON;
        console.log(data);
        $("#act_id").val(act_id);
        $("#upt_client_name").val(data.CLIENT_NAME);
        $("#upt_client_num").val(data.CLIENT_TEL);
        $("#upt_act_type").val(data.NOTE_TYPE).change();
        $("#upt_act_desc").val(data.NOTE_DESC);
      }
    );
  });

  $(document).on("click", ".btn-delete-activity", function () {
    var activityid = $(this).data("activityid");
    var transaction = "delete activity notes";

    Swal.fire({
      title: "Delete Activity Note",
      text: "Are you sure you want to delete this activity notes?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            activity_id: activityid,
            transaction: transaction,
            username: username,
          },
          success: function (response) {
            console.log(response);
            var res = JSON.parse(response);
            if (res === "deleted") {
              show_alert_event(
                "Delete Activity",
                "Delete Sucess!",
                "success",
                "reload"
              );
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".btn-delete-activity-attachment", function () {
    var attach_id = $(this).data("activityidattach");
    var transaction = "delete activity notes attachment";

    Swal.fire({
      title: "Delete Activity Note Attachment",
      text: "Are you sure you want to delete this activity attachment?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            attach_id: attach_id,
            transaction: transaction,
            username: username,
          },
          success: function (response) {
            console.log(response);
            var res = JSON.parse(response);
            if (res === "deleted") {
              show_alert_event(
                "Delete Activity",
                "Delete Sucess!",
                "success",
                "reload"
              );
            }
          },
        });
        return false;
      }
    });
  });

  // Remove the image
  $(document).on("click", ".btn-remove-image", function () {
    var image_id = $(this).data("imageid");
    // $('#delete_item_image_id').val(image_id)
    // $('#mdl_item_delete').modal('show')
    var item_id = $("#edititem_id").val();

    ajax_request(
      "controller.php",
      { data: { image_id: image_id }, transaction: "delete item image" },
      function (d) {
        console.log(d);
      }
    );
    setTimeout(() => {
      show_item_image(item_id, username);
      show_alert("Success", "", "success");
    }, 500);
    console.log(item_id);
  });

  // View Images
  $(document).on("click", "#btn-view-image", function () {
    var item_id = $("#edititem_id").val();
    $(".modal").modal("hide");

    setTimeout(() => {
      show_item_image(item_id, username);
    }, 500);

    $("#mdl_item_images").on("hidden.bs.modal", function () {
      display_item(item_id, username);
    });
  });

  //For adding Item
  $(document).on("click", "#btn_additem", function () {
    //generate_modal('add item form', 'Add Item', 'R' , '0', '1', 'form', 'additemForm', '1', username);
    var user_dept = $("#user_dept").val();

    if (user_dept != "all") {
      setTimeout(() => {
        $("#additem_dept_owner").val(user_dept).change();
        $("#additem_dept_owner").prop("disabled", true);
      }, 500);
    }

    $("#mdl_additem").modal("show");
  });

  //Show Edit modal
  $(document).on("click", ".edit-inventory-items", function () {
    var itemid = $(this).data("edititemid");
    var newitemid = itemid.replace("ITEM_", "");

    display_item(itemid, username);

    //check if item is issued
    ajax_request(
      "controller.php",
      {
        data: { item_id: newitemid },
        transaction: "get inventory item single",
      },
      function (d) {
        var itemdetails = d[0];
        var details = "";
        if (itemdetails.MODEL == "") {
          details = itemdetails.DESCRIPTION;
        } else {
          details = itemdetails.BRANDNAME + " " + itemdetails.MODEL;
        }
        $("#item_name").html(details);

        if (itemdetails.CURR_STATUS == "ISSUED") {
          $(".btn-show-assign-modal").prop("disabled", true);
          $(".btn-mark-return").prop("disabled", false);
        } else if (itemdetails.CURR_STATUS == "STOCK") {
          $(".btn-show-assign-modal").prop("disabled", false);
          $(".btn-mark-return").prop("disabled", true);
        } else {
        }
        $("#mdl_edititem").modal("show");
      }
    );
  });

  //Delete script for item
  $(document).on("click", ".delete-inventory-items", function () {
    var itemid = $(this).data("deleteitemid");
    $("#disposeitem_id").val(itemid);
    $("#disposeitem_id_container").html(itemid);
    $("#mdl_disposeitem").modal("show");
  });

  $(document).on("click", ".btn-item-scanner", function () {
    qr_scanner_item("reader");
    $("#mdl_scanitem").modal("show");
  });

  $(document).on("click", ".btn-show-assign-modal", function () {
    $(".modal").modal("hide");
    $("#item_id_cont").html("ITEM_" + $("#edititem_id").val());
    var item_ID = $("#edititem_id").val();
    $("#itemid_assign").val($("#edititem_id").val());

    //generate option for assigning employee
    ajax_request(
      "controller.php",
      { transaction: "get employee list" },
      function (d) {
        var option = `<option value="">-- --</option>${d}`;
        $("#sel_emp_assign").html(option).select2();
      }
    );
    //generate branch
    ajax_request(
      "controller.php",
      { transaction: "get branch list" },
      function (d) {
        $("#assign_branch").html(d).select2();
      }
    );
    //generate branch
    ajax_request(
      "controller.php",
      { transaction: "get inventory item single", data: { item_id: item_ID } },
      function (d) {
        console.log(d);
        var item_detail = "";
        if (d[0].MODEL == "") {
          item_detail = d[0].DESCRIPTION;
        } else {
          item_detail = d[0].BRANDNAME + " " + d[0].MODEL;
        }
      }
    );

    setTimeout(() => {
      $("#mdl_assignitem").modal("show");
    }, 600);
  });

  $(document).on("click", ".btn-mark-return", function () {
    var item_id = $("#edititem_id").val();
    $("#mdl_returnitem").modal("show");
    $("#mdl_edititem").modal("hide");
    $("#returnitem_id").val(item_id);
  });

  $(document).on("click", ".btn-open-history", function () {
    var item_id = $("#edititem_id").val();

    ajax_request(
      "controller.php",
      { transaction: "get inventory item single", data: { item_id: item_id } },
      function (d) {
        console.log(d);
        var item_details = "";
        if (d[0].MODEL == "") {
          item_details = d[0].DESCRIPTION;
        } else {
          item_details = d[0].BRANDNAME + " " + d[0].MODEL;
        }
        $("#item_id_hist").html(item_details);
      }
    );
    $("#mdl_item_owner_history").modal("show");
    $("#mdl_edititem").modal("hide");

    var cols = [
      { data: "EMP_NAME" },
      { data: "ADDRESS" },
      { data: "BRANCH" },
      { data: "DATE_ASSIGN" },
      { data: "DATE_RETURN" },
    ];
    setTimeout(() => {
      datatable_custom_param(
        "inventory item history",
        "#item-inventory-history-datatable",
        { itemid: item_id },
        cols,
        3,
        "desc",
        ""
      );
    }, 100);
  });

  $(document).on("click", ".btn-generate-eaa", function () {
    var item_id = $("#edititem_id").val();
    var emp_id = $("#sel_emp_assign").val();
    window.open(
      `inventory-generate-eaa.php?item_id_assign=${item_id}&emp_id=${emp_id}`,
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    );
    return false;
  });

  //for downloading the item code
  $(document).on("click", ".btn-dl-item-code", function () {
    $("#img_item_image").hide();
    $("#qr_code_item").show();
    html2canvas(document.querySelector("#print_me")).then((canvas) => {
      // document.body.appendChild(canvas)
      // $('#mdl_item_canvas').modal('show')
      console.log(canvas);
      // $('#canvas_cont').html(canvas)
      $("#img_item_image").show();
      $("#qr_code_item").hide();
      setTimeout(() => {
        var filename = $("#edititem_id").val();
        var link = document.getElementById("link");
        link.setAttribute("download", `${filename}.png`);
        link.setAttribute(
          "href",
          canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream")
        );
        link.click();
      }, 1000);
    });
  });

  $(document).on("click", "#btn_additem_cat", function () {
    $("#mdl_addcateg").modal("show");
    generate_select_option("#additem_dept_owner_cat", "department option");
  });

  $(document).on("click", ".edit-category-items", function () {
    var cat_code = $(this).data("editcatcode");
    ajax_request(
      "controller.php",
      { cat_code: cat_code, transaction: "get category item single" },
      function (d) {
        $("#mdl_editcateg").modal("show");
        $("#edititem_dept_owner_cat").val(d[0].DEPT).change();
        $("#editcat_code").val(d[0].ITEM_CATEGORY);
        $("#editcat_name").val(d[0].CATEG_NAME);
      }
    );
  });

  $(document).on("click", ".delete-category-items", function () {
    var cat_code = $(this).data("deletecatcode");
    $("#cat_code_delete").val(cat_code);
    $("#mdl_deletecateg").modal("show");
  });

  $(document).on("click", ".assign-category-dept", function () {
    var dept_id = $(this).data("departmentid");
    $("#dept_id_assign").val(dept_id);
    $("#mdl_assigncateg").modal("show");
    generate_select_option("#sel_categories", "item category option");
    $("#sel_categories").attr("disabled", true);
    setTimeout(() => {
      ajax_request(
        "controller.php",
        { transaction: "get assign category dept", dept_id: dept_id },
        function (d) {
          $("#sel_categories").attr("disabled", false);
          var selected = [];
          d.forEach((element) => {
            selected.push(element.ITEM_CATEGORY);
          });
          console.log(selected);
          $("#sel_categories").val(selected).change();
        }
      );
    }, 600);
  });

  $(document).on("click", "#btn_addcat_brand", function () {
    $("#mdl_brand_add").modal("show");
    generate_select_option("#addbrand_dept_owners", "department option");
  });

  $(document).on("click", ".edit-inventory-brand", function () {
    var brand_code = $(this).data("editbrand");

    ajax_request(
      "controller.php",
      { brand_code: brand_code, transaction: "get brand item single" },
      function (d) {
        var br = d[0];

        $("#editbrand_code").val(br.BRAND_CODE);
        $("#editbrand_name").val(br.BRANDNAME);
        setTimeout(() => {
          $("#editbrand_cat");
          $("#mdl_editbrand").modal("show");
          generate_select_option("#editbrand_cat", "item category option", {
            dept_owner: br.DEPARTMENT_ID,
          });
        }, 600);
        setTimeout(() => {
          $("#editbrand_cat").val(br.ITEM_CATEGORY).change();
        }, 1000);
      }
    );
  });

  $(document).on("click", ".delete-inventory-brand", function () {
    var brand_code = $(this).data("deletebrand");

    $("#delete_brand_code").val(brand_code);
    $("#mdl_deletebrand").modal("show");
  });

  $(document).on("click", ".assign-cat-brand", function () {
    var cat = $(this).data("assigncatcode");
    generate_select_option("#sel_brand", "item brand option");
    $("#cat_code_assign").val(cat);
    $("#mdl_assignbrand").modal("show");

    $("#sel_brand").attr("disabled", true);
    setTimeout(() => {
      ajax_request(
        "controller.php",
        { transaction: "get assign brand cat", cat: cat },
        function (d) {
          $("#sel_brand").attr("disabled", false);
          var selected = [];
          d.forEach((element) => {
            selected.push(element.BRAND_CODE);
          });
          console.log(selected);
          $("#sel_brand").val(selected).change();

          console.log(d);
        }
      );
    }, 600);
  });

  // ============================changes lemar bill==================================

  $(document).on("click", "#filter-telephone-log-summary", function () {
    generate_modal(
      "filter telephone log summary",
      "Filter Telephone Log",
      "R",
      "0",
      "1",
      "form",
      "filtertelephonelogsummaryForm",
      "1",
      username
    );
  });

  $(document).on("click", "#page-header-notifications-dropdown", function () {
    var transaction = "update all notification status";

    $.ajax({
      url: "controller.php",
      method: "POST",
      dataType: "text",
      data: { transaction: transaction, username: username },
      success: function () {
        $("#page-header-notifications-dropdown").html('<i class="bx bx-bell">');
      },
    });
  });

  $(document).on("click", "#import-employee-document", function () {
    generate_modal(
      "import employee document form",
      "Import Employee Document",
      "LG",
      "0",
      "1",
      "form",
      "importemployeedocumentForm",
      "1",
      username
    );
  });

  $(document).on("click", "#healthdeclaration", function () {
    generate_modal(
      "health declaration form",
      "Health Declaration",
      "LG",
      "0",
      "1",
      "form",
      "healthdeclarationForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-meeting", function () {
    generate_modal(
      "meeting form",
      "Meeting",
      "LG",
      "0",
      "1",
      "form",
      "meetingForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-meeting", function () {
    var meetingid = $(this).data("meetingid");

    sessionStorage.setItem("meetingid", meetingid);

    generate_modal(
      "meeting form",
      "Meeting",
      "LG",
      "0",
      "1",
      "form",
      "meetingForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-meeting", function () {
    var meetingid = $(this).data("meetingid");
    var transaction = "delete meeting";

    Swal.fire({
      title: "Delete Meeting",
      text: "Are you sure you want to delete this meeting?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Meeting",
                "The meeting has been deleted.",
                "success"
              );
              $("#filter-text").text("");

              generate_datatable(
                "meeting table",
                "#meeting-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Meeting",
                "The meeting does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Meeting", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#apply-insurance-request-filter", function () {
    generate_datatable(
      "insurance request table",
      "#insurance-request-datatable",
      0,
      "desc"
    );
  });
  $(document).on("click", "#apply-activity-filter", function () {
    generate_datatable(
      "activity table",
      "#activity-note-datatable",
      5,
      "desc",
      [7]
    );
  });
  $(document).on("click", "#apply-meeting-filter", function () {
    generate_datatable("meeting table", "#meeting-datatable", 0, "desc", [8]);
  });
  $(document).on("click", "#apply-training-filter", function () {
    //generate_datatable('meeting table', '#meeting-datatable', 0, 'desc', [8]);
    var start = $("#filter_start_date").val();
    var end = $("#filter_end_date").val();

    generate_datatable_two_parameter(
      "training table",
      start,
      end,
      "#training-datatable",
      0,
      "desc",
      [10]
    );
  });

  $(document).on("click", "#apply-attendance-record-filter", function () {
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
  });

  $(document).on("click", "#apply-attendance-adjustment-filter", function () {
    generate_datatable(
      "attendance adjustment table",
      "#attendance-adjustment-datatable",
      0,
      "desc",
      [11]
    );
  });

  $(document).on(
    "click",
    "#apply-attendance-adjustment-summary-filter",
    function () {
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
  );

  $(document).on("click", "#apply-attendance-summary-filter", function () {
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
  });

  $(document).on("click", ".approve-meeting", function () {
    var meetingid = $(this).data("meetingid");
    var transaction = "approve meeting";

    Swal.fire({
      title: "Approve Meeting",
      text: "Are you sure you want to approve this meeting?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Meeting",
                "The meeting has been approved.",
                "success"
              );

              $("#filter-text").text("");

              generate_datatable(
                "meeting table",
                "#meeting-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Approved Meeting",
                "The meeting does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Meeting", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".submit-meeting", function () {
    var meetingid = $(this).data("meetingid");
    var transaction = "tag meeting as submitted";

    Swal.fire({
      title: "Tag Meeting As Submitted",
      text: "Are you sure you want to tag this meeting as submitted?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Submit",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Tag Meeting As Submitted",
                "The meeting has been tagged as submitted.",
                "success"
              );

              $("#filter-text").text("");

              generate_datatable(
                "meeting table",
                "#meeting-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Tag Meeting As Submitted",
                "The meeting does not exist.",
                "info"
              );
            } else {
              show_alert("Tag Meeting As Submitted", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".update-to-pending-meeting", function () {
    var meetingid = $(this).data("meetingid");
    var transaction = "pending meeting";

    Swal.fire({
      title: "Tag Meeting As Pending",
      text: "Are you sure you want to tag this meeting as pending?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Tag As Pending",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Pending") {
              show_alert(
                "Tag Meeting As Pending",
                "The meeting has been tagged as pending.",
                "success"
              );

              $("#filter-text").text("");

              generate_datatable(
                "meeting table",
                "#meeting-datatable",
                0,
                "desc",
                [8]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Tag Meeting As Pending",
                "The meeting does not exist.",
                "info"
              );
            } else {
              show_alert("Tag Meeting As Pending", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".assign-meeting-permission", function () {
    var meetingid = $(this).data("meetingid");

    sessionStorage.setItem("meetingid", meetingid);

    generate_modal(
      "meeting permission form",
      "Meeting Permission",
      "LG",
      "1",
      "1",
      "form",
      "meetingpermissionForm",
      "0",
      username
    );
  });

  $(document).on("click", "#add-meeting-note", function () {
    generate_modal(
      "meeting note form",
      "Meeting Note",
      "R",
      "0",
      "1",
      "form",
      "meetingnoteForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-meeting-note", function () {
    var noteid = $(this).data("noteid");
    var meetingid = $("#meeting-id").text();
    var transaction = "delete meeting note";

    Swal.fire({
      title: "Delete Meeting Note",
      text: "Are you sure you want to delete this meeting note?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            noteid: noteid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Meeting Note",
                "The meeting note has been deleted.",
                "success"
              );

              generate_meeting_notes(meetingid);
            } else if (response === "Not Found") {
              show_alert(
                "Delete Meeting Note",
                "The meeting note does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Meeting Note", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-meeting-task", function () {
    generate_modal(
      "meeting task form",
      "Meeting Discussion",
      "LG",
      "0",
      "1",
      "form",
      "meetingagendataskForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-meeting-task", function () {
    var taskid = $(this).data("taskid");

    sessionStorage.setItem("taskid", taskid);

    generate_modal(
      "meeting task update form",
      "Meeting Discussion",
      "LG",
      "0",
      "1",
      "form",
      "meetingagendataskupdateForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-meeting-task", function () {
    var taskid = $(this).data("taskid");
    var meetingid = $("#meeting-id").text();
    var transaction = "delete meeting task";

    Swal.fire({
      title: "Delete Meeting Discussion",
      text: "Are you sure you want to delete this meeting dicussion?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            taskid: taskid,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Meeting Discussion",
                "The meeting discussion has been deleted.",
                "success"
              );

              var meetingid = $("#meeting-id").text();
              
              generate_datatable_one_parameter(
                "meeting task table",
                meetingid,
                "#meeting-task-datatable",
                2,
                "asc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Meeting Discussion",
                "The meeting discussion does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Meeting Discussion", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-meeting-memo", function () {
    generate_modal(
      "meeting memo form",
      "Memos & Procedures",
      "LG",
      "0",
      "1",
      "form",
      "meetingmemoForm",
      "1",
      username
    );
  });

  $(document).on("click", ".delete-meeting-memo", function () {
    var memoid = $(this).data("memoid");
    var meetingid = $("#meeting-id").text();
    var transaction = "delete meeting memo";

    Swal.fire({
      title: "Delete Memo",
      text: "Are you sure you want to delete this memo?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            memoid: memoid,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Memo",
                "The memo has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "meeting memo table",
                meetingid,
                "#meeting-memo-datatable",
                0,
                "desc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert("Delete Memo", "The memo does not exist.", "info");
            } else {
              show_alert("Delete Memo", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-meeting-other-matters", function () {
    generate_modal(
      "meeting other matters form",
      "Other Matters",
      "R",
      "0",
      "1",
      "form",
      "meetingothermattersForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-meeting-other-matters", function () {
    var othermattersid = $(this).data("othermattersid");

    sessionStorage.setItem("othermattersid", othermattersid);

    generate_modal(
      "meeting other matters update form",
      "Other Matters",
      "R",
      "0",
      "1",
      "form",
      "meetingothermattersupdateForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-meeting-other-matters", function () {
    var othermattersid = $(this).data("othermattersid");
    var meetingid = $("#meeting-id").text();
    var transaction = "delete meeting other matters";

    Swal.fire({
      title: "Delete Other Matters",
      text: "Are you sure you want to delete this other matters?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            othermattersid: othermattersid,
            meetingid: meetingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Other Matters",
                "The other matters has been deleted.",
                "success"
              );

              generate_datatable_one_parameter(
                "meeting other matters table",
                meetingid,
                "#meeting-other-matters-datatable",
                0,
                "asc",
                [1]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Other Matters",
                "The other matters does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Other Matters", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".add-previous-discussion-to-agenda", function () {
    var taskid = $(this).data("taskid");

    sessionStorage.setItem("taskid", taskid);

    generate_modal(
      "add previous discussion to agenda form",
      "Add Previous Discussion to Current",
      "R",
      "0",
      "1",
      "form",
      "addpreviousiscussiontoagendaForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-training", function () {
    generate_modal(
      "training form",
      "Training & Seminar",
      "LG",
      "0",
      "1",
      "form",
      "trainingForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-training", function () {
    var trainingid = $(this).data("trainingid");

    sessionStorage.setItem("trainingid", trainingid);

    generate_modal(
      "training form",
      "Training & Seminar",
      "LG",
      "0",
      "1",
      "form",
      "trainingForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-training", function () {
    var trainingid = $(this).data("trainingid");
    var transaction = "delete training";

    Swal.fire({
      title: "Delete Training & Seminar",
      text: "Are you sure you want to delete this training & seminar?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            trainingid: trainingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Training",
                "The training has been deleted.",
                "success"
              );
              $("#filter-text").text("");

              generate_datatable_two_parameter(
                "training table",
                "",
                "",
                "#training-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Training",
                "The training does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Training", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".cancel-training", function () {
    var trainingid = $(this).data("trainingid");

    sessionStorage.setItem("trainingid", trainingid);

    generate_modal(
      "cancel training form",
      "Cancel Training",
      "R",
      "0",
      "1",
      "form",
      "canceltrainingForm",
      "1",
      username
    );
  });

  $(document).on("click", ".approve-training", function () {
    var trainingid = $(this).data("trainingid");
    var transaction = "approve training";

    Swal.fire({
      title: "Approve Training",
      text: "Are you sure you want to approve this training?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Approve",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            trainingid: trainingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Approved") {
              show_alert(
                "Approve Training",
                "The training has been approved.",
                "success"
              );

              if ($("#training-approval-datatable").length) {
                generate_datatable(
                  "training approval table",
                  "#training-approval-datatable",
                  0,
                  "desc",
                  [6]
                );
              }
            } else if (response === "Not Found") {
              show_alert(
                "Approved Training",
                "The training does not exist.",
                "info"
              );
            } else {
              show_alert("Approved Training", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".reject-training", function () {
    var trainingid = $(this).data("trainingid");

    sessionStorage.setItem("trainingid", trainingid);

    generate_modal(
      "reject training form",
      "Reject Training",
      "R",
      "0",
      "1",
      "form",
      "rejecttrainingForm",
      "1",
      username
    );
  });

  $(document).on("click", ".recommend-training", function () {
    var trainingid = $(this).data("trainingid");
    var transaction = "recommend training";

    Swal.fire({
      title: "Recommend Training",
      text: "Are you sure you want to recommend this training?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Recommend",
      cancelButtonText: "Close",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            trainingid: trainingid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Recommended") {
              show_alert(
                "Recommend Training",
                "The training has been recommended.",
                "success"
              );

              generate_datatable(
                "training recommendation table",
                "#training-recommendation-datatable",
                0,
                "desc",
                [6]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Recommend Training",
                "The attendance record adjustment does not exist.",
                "info"
              );
            } else {
              show_alert("Recommend Training", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".role-permissions", function () {
    var page = $(this).data("page");

    check_box_check(page);
  });

  $(document).on("click", ".role-page", function () {
    var page = $(this).data("page");

    if ($(this).is(":checked")) {
      $("." + page + "-child").prop("checked", true);
    } else {
      $("." + page + "-child").prop("checked", false);
    }
  });

  $(document).on("click", ".role-user", function () {
    var department = $(this).data("department");

    check_box_check(department);
  });

  $(document).on("click", ".role-department", function () {
    var department = $(this).data("department");

    if ($(this).is(":checked")) {
      $("." + department + "-child").prop("checked", true);
    } else {
      $("." + department + "-child").prop("checked", false);
    }
  });

  $(document).on("click", ".assign-training-attendees", function () {
    var trainingid = $(this).data("trainingid");

    sessionStorage.setItem("trainingid", trainingid);

    generate_modal(
      "training attendees form",
      "Training Attendees",
      "XL",
      "0",
      "1",
      "form",
      "trainingattendeesForm",
      "0",
      username
    );
  });

  $(document).on("click", ".add-training-report", function () {
    var trainingid = $(this).data("trainingid");

    sessionStorage.setItem("trainingid", trainingid);

    generate_modal(
      "training report form",
      "Training Report",
      "R",
      "0",
      "1",
      "form",
      "trainingreportForm",
      "0",
      username
    );
  });

  $(document).on("click", ".unlock-training", function () {
    var trainingid = $(this).data("trainingid");
    var transaction = "unlock training";

    Swal.fire({
      title: "Unlock Training",
      text: "Are you sure you want to unlock this training?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Unlock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-success mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            trainingid: trainingid,
          },
          success: function (response) {
            if (response == "Unlocked") {
              show_alert(
                "Unlock Training",
                "The training has been unlocked.",
                "success"
              );

              $("#filter-text").text("");

              generate_datatable_two_parameter(
                "training table",
                "",
                "",
                "#training-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Unlock Training",
                "The training does not exists.",
                "warning"
              );
            } else {
              show_alert("Unlock Training", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", ".lock-training", function () {
    var trainingid = $(this).data("trainingid");
    var transaction = "lock training";

    Swal.fire({
      title: "Lock Training",
      text: "Are you sure you want to lock this training?",
      icon: "info",
      showCancelButton: !0,
      confirmButtonText: "Lock",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            transaction: transaction,
            username: username,
            trainingid: trainingid,
          },
          success: function (response) {
            if (response == "Locked") {
              show_alert(
                "Lock Training",
                "The training has been locked.",
                "success"
              );
              $("#filter-text").text("");

              generate_datatable_two_parameter(
                "training table",
                "",
                "",
                "#training-datatable",
                0,
                "desc",
                [10]
              );
            } else if (response == "Not Found") {
              show_alert(
                "Lock Training",
                "The training does not exists.",
                "warning"
              );
            } else {
              show_alert("Lock Training", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#add-car-search-parameter", function () {
    generate_modal(
      "car search parameter form",
      "Car Search Parameter",
      "R",
      "1",
      "1",
      "form",
      "carsearchparameterForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-car-search-parameter", function () {
    var parameterid = $(this).data("parameterid");

    sessionStorage.setItem("parameterid", parameterid);

    generate_modal(
      "car search parameter form",
      "Car Search Parameter",
      "R",
      "1",
      "1",
      "form",
      "carsearchparameterForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-car-search-parameter", function () {
    var parameterid = $(this).data("parameterid");
    var transaction = "delete car search parameter";

    Swal.fire({
      title: "Delete Car Search Parameter",
      text: "Are you sure you want to delete this car search parameter?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            parameterid: parameterid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Car Search Parameter",
                "The car search parameter has been deleted.",
                "success"
              );

              generate_datatable(
                "car search parameter table",
                "#car-search-parameter-datatable",
                0,
                "desc",
                [0]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Car Search Parameter",
                "The car search parameter does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Car Search Parameter", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-car-search-parameter", function () {
    generate_modal(
      "import car search parameter form",
      "Import Car Search Parameter",
      "R",
      "1",
      "1",
      "form",
      "importcarsearchparameterForm",
      "1",
      username
    );
  });

  $(document).on("click", "#add-price-index-item", function () {
    generate_modal(
      "price index item form",
      "Price Index Item",
      "LG",
      "1",
      "1",
      "form",
      "priceindexitemForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-price-index-item", function () {
    var itemid = $(this).data("itemid");

    sessionStorage.setItem("itemid", itemid);

    generate_modal(
      "price index item form",
      "Price Index Item",
      "LG",
      "1",
      "1",
      "form",
      "priceindexitemForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-price-index-item", function () {
    var itemid = $(this).data("itemid");
    var transaction = "delete price index item";

    Swal.fire({
      title: "Delete Price Index Item",
      text: "Are you sure you want to delete this price index item?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            itemid: itemid,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Price Index Item",
                "The price index item has been deleted.",
                "success"
              );

              generate_datatable(
                "price index item table",
                "#price-index-item-datatable",
                0,
                "asc",
                [2]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Price Index Item",
                "The price index item does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Price Index Item", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-price-index-item", function () {
    generate_modal(
      "import price index item form",
      "Import Price Index Item",
      "R",
      "1",
      "1",
      "form",
      "importpriceindexitemForm",
      "1",
      username
    );
  });

  $(document).on("click", "#apply-price-index-filter", function () {
    generate_datatable(
      "price index item table",
      "#price-index-item-datatable",
      0,
      "asc",
      [2]
    );
  });

  $(document).on("click", "#apply-price-index-amount-filter", function () {
    generate_datatable(
      "price index amount table",
      "#price-index-amount-datatable",
      0,
      "asc",
      [4]
    );
  });

  $(document).on("click", "#add-price-index-amount", function () {
    generate_modal(
      "price index amount form",
      "Price Index Amount",
      "LG",
      "1",
      "1",
      "form",
      "priceindexamountForm",
      "1",
      username
    );
  });

  $(document).on("click", ".update-price-index-amount", function () {
    var itemid = $(this).data("itemid");
    var year = $(this).data("year");

    sessionStorage.setItem("itemid", itemid);
    sessionStorage.setItem("year", year);

    generate_modal(
      "update price index amount form",
      "Price Index Amount",
      "LG",
      "1",
      "1",
      "form",
      "updatepriceindexamountForm",
      "0",
      username
    );
  });

  $(document).on("click", ".add-price-index-amount-adjustment", function () {
    var itemid = $(this).data("itemid");
    var year = $(this).data("year");

    sessionStorage.setItem("itemid", itemid);
    sessionStorage.setItem("year", year);

    generate_modal(
      "add price index amount adjustment form",
      "Price Index Amount Adjustment",
      "LG",
      "1",
      "1",
      "form",
      "addpriceindexamountadjustmentForm",
      "0",
      username
    );
  });

  $(document).on("click", ".delete-price-index-amount", function () {
    var itemid = $(this).data("itemid");
    var year = $(this).data("year");
    var transaction = "delete price index amount";

    Swal.fire({
      title: "Delete Price Index Amount",
      text: "Are you sure you want to delete this price index amount?",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonClass: "btn btn-danger mt-2",
      cancelButtonClass: "btn btn-secondary ms-2 mt-2",
      buttonsStyling: !1,
    }).then(function (result) {
      if (result.value) {
        $.ajax({
          type: "POST",
          url: "controller.php",
          data: {
            username: username,
            itemid: itemid,
            year: year,
            transaction: transaction,
          },
          success: function (response) {
            if (response === "Deleted") {
              show_alert(
                "Delete Price Index Amount",
                "The price index amount has been deleted.",
                "success"
              );

              generate_datatable(
                "price index amount table",
                "#price-index-amount-datatable",
                0,
                "asc",
                [4]
              );
            } else if (response === "Not Found") {
              show_alert(
                "Delete Price Index Amount",
                "The price index amount does not exist.",
                "info"
              );
            } else {
              show_alert("Delete Price Index Amount", response, "error");
            }
          },
        });
        return false;
      }
    });
  });

  $(document).on("click", "#import-price-index-amount", function () {
    generate_modal(
      "import price index amount form",
      "Import Price Index Amount",
      "R",
      "1",
      "1",
      "form",
      "importpriceindexamountForm",
      "1",
      username
    );
  });

  $(document).on("click", ".cancel-price-index-amount-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "cancel price index amount adjustment form",
      "Cancel Attendance Adjustment",
      "R",
      "1",
      "1",
      "form",
      "cancelpriceindexamountadjustmentForm",
      "1",
      username
    );
  });

  $(document).on(
    "click",
    ".approve-price-index-amount-adjustment",
    function () {
      var adjustmentid = $(this).data("adjustmentid");

      sessionStorage.setItem("adjustmentid", adjustmentid);

      generate_modal(
        "approve price index amount adjustment form",
        "Approve Attendance Adjustment",
        "R",
        "1",
        "1",
        "form",
        "approvepriceindexamountadjustmentForm",
        "1",
        username
      );
    }
  );

  $(document).on("click", ".reject-price-index-amount-adjustment", function () {
    var adjustmentid = $(this).data("adjustmentid");

    sessionStorage.setItem("adjustmentid", adjustmentid);

    generate_modal(
      "reject price index amount adjustment form",
      "Reject Attendance Adjustment",
      "R",
      "1",
      "1",
      "form",
      "rejectpriceindexamountadjustmentForm",
      "1",
      username
    );
  });

// PDC Monitoring module related actions

  //delete the monitoring
  $(document).on('click',".delete-pdc-monitor",function () {
    var id_monitor = $(this).data('pdcmonitorid')



    var formdata = new FormData();
    formdata.append('transaction','get pdc monitoring')
    formdata.append('id_monitoring',id_monitor)
    // display check number
    ajax_request_form('controller.php',formdata,function (d) {
      //console.log(d);

      
          Swal.fire({
            title: "Delete this monitoring?",
            text: "Please click the button to confirm",
            icon: 'warning',
            showCancelButton: !0,
            confirmButtonText: "Delete "+ d[0]['LOAN_NUM'],
            cancelButtonText: "Cancel",
            confirmButtonClass: "btn btn-"+ "danger" +" mt-2",
            cancelButtonClass: "btn btn-secondary ms-2 mt-2",
            buttonsStyling: !1
        }).then(function(result) {
            if (result.isConfirmed == true) {

              var formdata = new FormData();
              formdata.append('transaction','delete pdc monitoring')
              formdata.append('id_monitoring',id_monitor)

              ajax_request_form('controller.php',formdata,function (d) {
                if(d == '1'){
                  show_alert_close_modals('Success','Deleted success','success')

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
               
              })
              console.log(result);
            }
        })



    })



    



  })

  $(document).on("click", "#add-pdc-monitoring", function () {
    $('#mdl_add_pdc_monitor').modal('show')
  });

  $(document).on("click", ".view-pdc-monitor", function () {
    $('#mdl_view_pdc_monitor').modal('show')
    
    //get single data by id
    var id_monitoring = $(this).data('pdcmonitorid');
    var formdata = new FormData();
    formdata.append('transaction','get pdc remarks')
    formdata.append('id_monitoring',id_monitoring)
    //
    $('#id_monitoring_view').val(id_monitoring)//temporary container of id monitoring for adding remarks
    ajax_request_form('controller.php',formdata,function (d) {
      var disp='';
      console.log(d);
      if(d.length !=0){
               //display of loan nummber
      $('#loan_number_container').html(d[0]['LOAN_NUMBER'])
      d.forEach(element => {
        disp += `
        <div class="col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <p><i>Created on : ${element.CREATED_AT}</i></p>
                <p><i>Remarks by : ${element.CREATED_BY_FNAME} ${element.CREATED_BY_LNAME}</i></p>
              </div>
              <div class="col-md-12">
                <textarea readonly class="form-control" rows="5">${element.DETAILS}</textarea>
            </div>
            </div>
          </div>
        </div>
        `
      });
      $('#remarks_container').html(disp)

      }else{
        $('#remarks_container').html("")
      }
 

    })
  });

  $(document).on("click", "#add-pdc-remarks-monitoring", function () {
    $('#mdl_add_pdc_remarks_monitor').modal('show')
    $('#mdl_view_pdc_monitor').modal('hide')
    $('#mdl_add_pdc_remarks_monitor').on('hidden.bs.modal', function () {
    $('#mdl_view_pdc_monitor').modal('show')

      //reopen the the view pdc monitor
      var id_monitoring = $('#id_monitoring_view').val()
      var formdata = new FormData();
      formdata.append('transaction','get pdc remarks')
      formdata.append('id_monitoring',id_monitoring)
     
      ajax_request_form('controller.php',formdata,function (d) {
        var disp='';
        console.log(d);
        //display of loan nummber
        $('#loan_number_container').html(d[0]['LOAN_NUMBER'])
        d.forEach(element => {
          disp += `
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <p><i>Created on : ${element.CREATED_AT}</i></p>
                  <p><i>Remarks by : ${element.CREATED_BY_FNAME} ${element.CREATED_BY_LNAME}</i></p>
                </div>
                <div class="col-md-12">
                  <textarea readonly class="form-control" rows="5">${element.DETAILS}</textarea>
              </div>
              </div>
            </div>
          </div>
          `
        });
        $('#remarks_container').html(disp)
      })
    })
  });

  $(document).on('click','.update-pdc-monitor',function () {

    $('#mdl_update_pdc_monitor').modal('show')
  
    var id_monitor = $(this).data('pdcmonitorid')
    $('#pdc_check_number_id_monitoring').val(id_monitor)
    
    var formdata = new FormData();
    formdata.append('transaction','get pdc monitoring')
    formdata.append('id_monitoring',id_monitor)

    // display check number
    ajax_request_form('controller.php',formdata,function (d) {
      console.log(d);
      $("#pdc_number_update").val(d[0]['CURR_PDC_NUMBER'])
      $("#undertaking_update").val(d[0]['UNDERTAKING'])
      $('#assign_emp_update').val(d[0]['ASSIGN_TO']).change()
      $('#branch_update').val(d[0]['BRANCH']).change()
    })
    //console.log(id_monitor);
  })






});
