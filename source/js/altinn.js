function paging(n) {
    $("#PageName").val() == "DelegateRoles" && $("#RolesPartialView").load("/ui/AccessManagement/DelegateRolesPartial", {
        Role: selectedRoleIds,
        pageSize: $("#pageSize").val(),
        page: n
    })
}

function ViewsPerPage(n) {
    $("#PageName").val() == "DelegateRoles" && $("#RolesPartialView").load("/ui/AccessManagement/DelegateRolesPartial", {
        Role: selectedRoleIds,
        pageSize: n
    })
}

function RoleSelectionChanged(n) {
    var t = $(n),
        i;
    t.is(":checked") == !0 ? (i = jQuery.inArray(t.val(), selectedRoleIds), i == -1 && selectedRoleIds.push(t.val())) : (i = jQuery.inArray(t.val(), selectedRoleIds), i > -1 && (selectedRoleIds = $.grep(selectedRoleIds, function(n) {
        return n != t.val()
    })));
    $("#selectedCount").text(selectedRoleIds.length)
}

function InfoPortalSearch(n) {
    var t = $("#" + n).val();
    t.length <= 4e3 && window.location.replace("/Systemsider/Sok/?SearchWords=" + t)
}

function EnableAltinnButton(n, t) {
    $(n).removeAttr("disabled");
    $(n).removeClass("disabled");
    t != null && t != undefined && t != "undefined" && $(t).html("")
}

function UpdatePersonalSettings() {
    IsAuthenticated();
    var n = $("#personalsettingsform"),
        t = n.attr("action"),
        i = n.serialize();
    $("#personalsettingsform").css("opacity", "0.5");
    $(this).css("disabled", !0);
    $.post(t, i, function(n) {
        $("#personalSettingsContainer").html(n);
        $("#personalsettingsform").css("opacity", "1");
        $(this).css("disabled", !1)
    })
}

function IsLoading(n) {
    return $(n).find(".altinn-loading-screen").length > 0
}

function LoadModal(n, t) {
    IsAuthenticated();
    $.ajax(n).done(function(n) {
        if (IsLoading(t)) {
            var r = $("<div/>", {
                    "class": "card",
                    html: n
                }),
                i = $("<div/>", {
                    "class": "page current-page",
                    data: {
                        "page-no": 1
                    },
                    html: r
                });
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            $("#focusModalContainer").append(i);
            ShouldShowModalFooter() && i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            $("#focusModal").modal("show");
            ShowNavButtons(!0);
            RemoveLoadingScreen(t);
            $("#focusModal").on("hidden.bs.modal", function() {
                $("#focusModalContainer").empty();
                $("#focusModal").attr("aria-hidden", !0)
            });
            $("#focusModal").on("shown.bs.modal", function() {
                $("#focusModal").attr("aria-hidden", !1)
            });
            EnablePopoversAndTooltips(".popoverDescription", !0)
        }
    })
}

function NextModalPage(n) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    $.ajax(n).done(function(n) {
        var t;
        if (IsLoading(".current-page .card")) {
            var r = $("<div/>", {
                    "class": "card",
                    html: n
                }),
                u = $(":data(page-no)"),
                i = $("<div/>", {
                    "class": "page next-page",
                    data: {
                        "page-no": u.length + 1
                    },
                    html: r
                });
            RemoveLoadingScreen(".current-page .card");
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            $("#focusModalContainer").append(i);
            ShouldShowModalFooter() && i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            $(".modal").animate({
                scrollTop: 0
            }, 20);
            t = $(".current-page");
            EnablePopoversAndTooltips(".popoverDescription", !0);
            setTimeout(function() {
                t.removeClass("current-page");
                t.addClass("previous-page");
                i.removeClass("next-page");
                i.addClass("current-page")
            }, 0);
            t.on(window.transitionEnd, function() {
                t.hide();
                t.off()
            });
            window.transitionEnd || (t.hide(), t.off())
        }
    })
}

function ShouldShowModalFooter() {
    return $("#hasRightsInfoPage").length > 0 || $("#servicesByRoles").length > 0 || $("#unavailableRightsInfoPage").length > 0 || $("#modalReceipt").length > 0 ? !1 : ($("#accessToServices").length > 0, !0)
}

function PreviousModalPage() {
    if (IsAuthenticated(), $(".current-page").data("page-no") == 1) {
        $("#focusModal").modal("hide");
        return
    }
    $(".left-over-close").prop("disabled", !0);
    ShowNavButtons(!0);
    var n = $(".current-page"),
        i = $(":data(page-no)"),
        t = i.filter(function() {
            return $(this).data("page-no") === i.length - 1
        });
    t.show();
    n.addClass("next-page");
    n.removeClass("current-page");
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    setTimeout(function() {
        t.addClass("current-page");
        t.removeClass("previous-page");
        $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
        SetRepresentedByUserColor(!1);
        $(".modal-backdrop").removeClass("modal-success");
        $(".modal-backdrop").removeClass("modal-error")
    }, 0);
    n.one(window.transitionEnd, function() {
        n.remove();
        $(".left-over-close").prop("disabled", !1)
    });
    window.transitionEnd || (n.remove(), $(".left-over-close").prop("disabled", !1));
    $(".modal-footer") === "undefined" && ShouldShowModalFooter() ? $(".modal-body").append($("<div/>").load("/ui/Profile/ModalFooter/")) : $(".modal-footer") !== "undefined"
}

function ResetModalAndLoadPage(n, t) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    $.ajax(n).done(function(n) {
        var f, i, r, u;
        if (IsLoading(".current-page .card")) {
            f = $("<div/>", {
                "class": "card",
                html: n
            });
            i = $("<div/>", {
                "class": "page previous-page",
                html: f
            });
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            RemoveLoadingScreen(".current-page .card");
            $("#focusModalContainer").append(i);
            i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            r = $(".current-page");
            u = $(":data(page-no)");
            r.addClass("next-page");
            r.removeClass("current-page");
            setTimeout(function() {
                i.addClass("current-page");
                i.removeClass("previous-page")
            }, 0);
            r.one(window.transitionEnd, function() {
                i.data("page-no", 1);
                u.remove();
                i.find("script").each(function() {
                    eval($(this).text())
                })
            });
            window.transitionEnd || (i.data("page-no", 1), u.remove(), i.find("script").each(function() {
                eval($(this).text())
            }));
            EnablePopoversAndTooltips(".popoverDescription", !0);
            $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
            SetRepresentedByUserColor(!1);
            $(".modal-backdrop").removeClass("modal-success");
            ShowNavButtons(!0);
            t && t.call(i)
        }
    })
}

function ShowLocalRole(n) {
    $(".current-page").data("goto-page-on-cancel", !0);
    NextModalPage("/ui/AccessManagement/LocalRole/?roleID=" + n)
}

function DeleteLocalRole(n) {
    NextModalPage("/ui/AccessManagement/DeleteLocalRole/?roleID=" + n)
}

function ConfirmUpdateLocalRole() {
    $("#LocalRoleForm").append('<input name="confirmUpdateRole" value="True">');
    $("#LocalRoleForm").submit()
}

function ValidateForm(n, t) {
    $(t).removeData("previousValue");
    setTimeout(function() {
        var t = $(n).find(":submit");
        t.addClass("disabled");
        t.prop("disabled", !0)
    }, 0)
}

function PrepareAddNewRightHolder(n) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    var t = $("<div/>", {
            "class": "card",
            id: n
        }),
        i = $(":data(page-no)"),
        r = $("<div/>", {
            "class": "page next-page",
            data: {
                "page-no": i.length + 1
            },
            html: t
        });
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    $("#focusModalContainer").append(r)
}

function ShowAddNewRightHolder(n) {
    var t, i, r;
    if (IsAuthenticated(), IsLoading(".current-page .card"))
        if ($(".current-page form .form-control").val(""), RemoveLoadingScreen(".current-page .card"), navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader(), t = $("#" + n).parent(), i = $(".current-page"), t.has("> .altinn-captcha").length == 0 && t.has(".altinn-notification-error").length == 0) {
            t.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            i.addClass("previous-page");
            i.removeClass("current-page");
            t.addClass("current-page");
            t.removeClass("next-page");
            i.on(window.transitionEnd, function() {
                i.hide();
                i.off()
            });
            window.transitionEnd || (i.hide(), i.off())
        } else r = t.children(), $("#PersonTabPage").html(r.html()), $("#NewRightHolder_CaptchaCode").length > 0 && $("#NewRightHolder_CaptchaCode").val(""), t.remove()
}

function PrepareNextPage(n) {
    if (IsAuthenticated(), !IsAnyCheckboxChecked($(".current-page input[name^=delete],.current-page input[name^=add]")) && GetNumEmptyInputs("#SubmitEmail_Input") != 0) return CancelEditMode(), ResetCheckboxes(), !1;
    if (GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"],.current-page input[name="LocalRoleModel.RoleName"]') != 0) return !1;
    AddLoadingScreen(".current-page .card");
    var t = $("<div/>", {
            "class": "card",
            id: n
        }),
        i = $(":data(page-no)"),
        r = $("<div/>", {
            "class": "page next-page",
            data: {
                "page-no": i.length + 1
            },
            html: t
        });
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    $("#focusModalContainer").append(r)
}

function ShowNextPage(n) {
    var t, i;
    if (IsAuthenticated(), IsLoading(".current-page .card")) {
        RemoveLoadingScreen(".current-page .card");
        t = $(".current-page");
        t.addClass("previous-page");
        t.removeClass("current-page");
        i = $("#" + n).parent();
        i.addClass("current-page");
        i.removeClass("next-page");
        t.on(window.transitionEnd, function() {
            t.hide();
            t.off()
        });
        window.transitionEnd || (t.hide(), t.off())
    }
}

function SuccessReceipt() {
    $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-black.svg");
    SetRepresentedByUserColor(!0);
    $(".modal-backdrop").addClass("modal-success");
    ShowNavButtons(!1);
    $(".current.page").find(".modal-footer").remove();
    $("#collapseOtherWithAccess").hasClass("in") && GetRightHolders()
}

function SetReceiptStyle(n) {
    SuccessReceipt();
    var t = $("#" + n);
    t.length != 0 && ($("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg"), $(".modal-backdrop").removeClass("modal-success"), $("div .panel-heading-success").addClass("panel-heading-modal"), $("div .panel-heading-success").removeClass(".panel-heading-success"))
}

function ShowNavButtons(n) {
    n ? ($(".left-over-close").show(), $(".left-over-close").attr("aria-hidden", !1), $(".right-over-close").show(), $(".right-over-close").attr("aria-hidden", !1)) : ($(".left-over-close").hide(), $(".left-over-close").attr("aria-hidden", !0), $(".right-over-close").hide(), $(".right-over-close").attr("aria-hidden", !0))
}

function EnablePopoversAndTooltips(n, t) {
    var i = ".body-content";
    t && (i = ".modal");
    $(n).popover({
        placement: "bottom",
        trigger: "focus",
        container: i,
        template: '<div class="popover bg-popover altinn-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    $(".big-popover").popover({
        placement: "bottom",
        trigger: "focus",
        container: i,
        html: !0,
        template: '<div class="popover bg-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    $(".right-over-close").popover({
        placement: "bottom",
        trigger: "manual",
        container: ".modal",
        template: '<div class="popover red-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>',
        html: !0,
        content: $("#close-popover-content-wrapper").remove().html()
    });
    $(".left-over-close").popover({
        placement: "bottom",
        trigger: "manual",
        container: ".modal",
        template: '<div class="popover red-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>',
        html: !0,
        content: $("#back-popover-content-wrapper").remove().html()
    });
    $('[data-toggle="tooltip"]').tooltip({
        container: i,
        placement: "top"
    })
}

function OpenDeleteModal() {
    LoadModal("/ui/AccessManagement/DeleteRolesAndRightsForMe/", "#services-available-for-me-panel")
}

function AddNewRightHolder(n) {
    AddLoadingScreen(n);
    LoadModal("/ui/AccessManagement/AddNewRightHolder/", n)
}

function ToggleAdd(n) {
    var t = $(".add-mode").find("#add-right-checkbox-" + n)[0];
    t != null && SetAddCheckboxState(t, !t.checked)
}

function ToggleDelete(n) {
    var t = $(".delete-mode").find("#delete-right-checkbox-" + n)[0];
    t != null && SetDeleteCheckboxState(t, !t.checked)
}

function AddMode(n) {
    n ? ($(".modal-body").addClass("add-mode"), $("#ServiceSearchDropdown_Delegate").parent().hasClass("open") && $("#ServiceSearchDropdown_Delegate").dropdown("toggle"), $("#ServiceSearch_Input_Delegate").val(""), $("#addRoles").collapse("show"), $("#ServiceSearchDropdown").attr("data-toggle", ""), $("#ServiceSearch_Input").prop("disabled", !0), $("#ServiceSearch_Button").prop("disabled", !0), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", ""), $("#ServiceSearch_Input_Delegate").prop("disabled", !0), $("#ServiceSearch_Button_Delegate").prop("disabled", !0)) : ($(".modal-body").removeClass("add-mode"), $("#confirm-add").addClass("disabled"), $("#confirm-add").prop("disabled", !0), ResetCheckboxes(), ResetAddList(), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input").prop("disabled", !1), $("#ServiceSearch_Button").prop("disabled", !1), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input_Delegate").prop("disabled", !1), $("#ServiceSearch_Button_Delegate").prop("disabled", !1))
}

function DeleteMode(n) {
    n ? ($(".modal-body").addClass("delete-mode"), $("#ServiceSearchDropdown_Delegate").parent().hasClass("open") && $("#ServiceSearchDropdown_Delegate").dropdown("toggle"), $("#ServiceSearch_Input_Delegate").val(""), $("#DirectRoles-Delete").collapse("show"), $("#DirectRights-Delete").collapse("show"), $("#ServiceSearchDropdown").attr("data-toggle", ""), $("#ServiceSearch_Input").prop("disabled", !0), $("#ServiceSearch_Button").prop("disabled", !0), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", ""), $("#ServiceSearch_Input_Delegate").prop("disabled", !0), $("#ServiceSearch_Button_Delegate").prop("disabled", !0)) : ($(".modal-body").removeClass("delete-mode"), ResetCheckboxes(), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input").prop("disabled", !1), $("#ServiceSearch_Button").prop("disabled", !1), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input_Delegate").prop("disabled", !1), $("#ServiceSearch_Button_Delegate").prop("disabled", !1))
}

function ShowResultMode(n) {
    n ? $(".current-page").addClass("search-result-mode") : ($(".current-page").removeClass("search-result-mode"), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"))
}

function DoServiceSearchResult(n) {
    var t = jQuery.Event("keyup");
    t.which = 13;
    $(n).keyup(t)
}

function RedirectOnFinish(n, t) {
    IsAuthenticated();
    IsAnyCheckboxChecked($("input[name^=add]")) ? n === "submit" ? $("#EditRolesAndRightForm").submit() : n === "email" && NextModalPage("/ui/AccessManagement/SubmitEmail?userID=" + t[0] + "&partyID=" + t[1]) : (CancelEditMode(), ResetCheckboxes())
}

function ShowDelegationHistory() {
    AddLoadingScreen("#rightHolders");
    $(".modal-footer").hide();
    LoadModal("/ui/AccessManagement/DelegationHistory", "#rightHolders")
}

function CheckAllByName(n, t) {
    checkboxes = document.getElementsByName(n);
    for (var i = 0, r = checkboxes.length; i < r; i++) SetDeleteCheckboxState(checkboxes[i], t)
}

function SetAddCheckboxState(n, t) {
    n.checked = t;
    var i = $("#addible_" + n.value).parent(),
        r = $("#added_" + n.value).parent();
    n.checked ? ($("#confirm-add").removeClass("disabled"), $("#confirm-add").removeAttr("disabled"), i.addClass("hidden"), r.removeClass("hidden")) : (i.removeClass("hidden"), r.addClass("hidden"))
}

function deactiveButton(n) {
    $(n).prop("disabled", !0);
    $(n).hasClass("btn-success") && $(n).removeClass("btn-success");
    $(n).hasClass("disabled") || $(n).addClass("disabled")
}

function activeButton(n) {
    $(n).prop("disabled", !1);
    $(n).hasClass("btn-success") || $(n).addClass("btn-success");
    $(n).hasClass("disabled") && $(n).removeClass("disabled")
}

function CheckRoleOrRightForDelegtion(n, t) {
    var r, i;
    if (t === "role" && (IsAnyCheckboxChecked($("input[name=addRoles]")) ? (activeButton("#confirm-delegate-roles"), activeButton("#submit-email-roles")) : (deactiveButton("#confirm-delegate-roles"), deactiveButton("#submit-email-roles"))), t === "right" && (IsAnyCheckboxChecked($("input[name=addRights]")) ? (activeButton("#confirm-delegate-rights"), activeButton("#submit-email-rights")) : ($("input:hidden[name=DefaultStyleConfirmButton]").val() === "btn-success" && (activeButton("#confirm-delegate-rights"), activeButton("#submit-email-rights")), deactiveButton("#confirm-delegate-rights"), deactiveButton("#submit-email-rights")), n.checked == !0 && (n.id.indexOf("Sign") >= 0 || n.id.indexOf("Write") >= 0 || n.id.indexOf("ArchiveDelete") >= 0)))
        for (r = $("input[name=addRights]"), i = 0; i < r.length; i++) r[i].id.indexOf("Read") >= 0 && (r[i].checked = !0)
}

function UpdateLocalRoleServiceList() {
    $("input[name=addRights]").prop("name", "LocalRoleModel.addRights");
    var n = $('input[name="LocalRoleModel.Rights"]');
    n.length != 0 && n.val().length != 0 && $("#UpdateLocalRoleRightsForm").append(n.clone());
    $("#UpdateLocalRoleRightsForm").submit();
    PreviousModalPage();
    setTimeout(function() {
        ShowResultMode(!1)
    }, 0)
}

function DeleteLocalRoleService(n) {
    $("#" + n).remove();
    $("#LocalRoleServiceList:has(tr)").length == 0 && $("#LocalRoleServiceList").html($('<input hidden name="LocalRoleModel.Rights" value="" />'));
    VerifyButtonState("#submitRole", '#LocalRoleForm input[name="LocalRoleModel.RoleName"],input[name="LocalRoleModel.Rights"]')
}

function ReturnAfterLocalRole(n) {
    ResetModalAndLoadPage("/ui/AccessManagement/ServicesAvailableForActor/?userID=" + $("input[name=CoveredByUserID]").val() + "&partyID=" + $("input[name=CoveredByPartyID]").val(), function() {
        $(this).find(".modal-body").addClass("add-mode");
        $(this).find("#DirectRoles-Delete").collapse("show");
        $(this).find("#addRoles").collapse("show");
        $(this).find("#confirm-add").removeClass("disabled");
        $(this).find("#confirm-add").prop("disabled", !1);
        ToggleAdd(n)
    })
}

function Cancel() {
    var t = $(".current-page"),
        i = $(":data(page-no)"),
        n = i.filter(function() {
            return $(this).data("goto-page-on-cancel") === !0
        });
    n.show();
    t.addClass("next-page");
    t.removeClass("current-page");
    setTimeout(function() {
        n.addClass("current-page");
        n.removeClass("previous-page");
        $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
        SetRepresentedByUserColor(!1);
        $(".modal-backdrop").removeClass("modal-success");
        $(".modal-backdrop").removeClass("modal-error")
    }, 0);
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    t.one(window.transitionEnd, function() {
        var t = $(":data(page-no)");
        t.filter(function() {
            $(this).data("page-no") > n.data("page-no") && $(this).remove()
        })
    });
    window.transitionEnd || (i = $(":data(page-no)"), i.filter(function() {
        $(this).data("page-no") > n.data("page-no") && $(this).remove()
    }))
}

function LoadServiceListForRoleType(n) {
    $(".current-page .role-service-list-" + n).hasClass("loaded") || $("#services-available-for-me-panel .role-service-list-" + n).hasClass("loaded") || $.ajax({
        url: "/ui/AccessManagement/ServiceListForRoleType",
        data: {
            roleTypeId: n
        },
        beforeSend: function() {
            IsAuthenticated();
            $(".loading-role-type-services-" + n).prop("hidden", !1)
        }
    }).always(function() {
        $(".loading-role-type-services-" + n).prop("hidden", !0);
        $(".role-service-list-" + n).addClass("loaded")
    }).done(function(t) {
        $(".role-service-list-" + n).append(t);
        $(".role-details-service-counter-" + n).html($(t).filter("li").length)
    }).fail(function(n, t) {
        console.log("ServiceListForRoleType failed: " + t)
    })
}

function activateOnValidEmail(n) {
    validate($("#SubmitEmail_Input").val(), config.validEmail) ? (n.hasClass("disabled") && n.removeClass("disabled"), n.attr("disabled", !1)) : (n.hasClass("disabled") || n.addClass("disabled"), n.attr("disabled", !0))
}

function validate(n, t) {
    return n.match(t) != null
}

function submitEmail() {
    validate($("#SubmitEmail_Input").val(), config.validEmail) && ($("#EmailRequestedFor").val() == "DelegateRightsForm" && $("#DelegateRightsForm").length ? ($("#DelegateRightsForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#DelegateRightsForm").submit()) : $("#EmailRequestedFor").val() == "DelegateRolesForm" && $("#DelegateRolesForm").length ? ($("#DelegateRolesForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#DelegateRolesForm").submit()) : $("#EditRolesAndRightForm").length && ($("#EditRolesAndRightForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#EditRolesAndRightForm").submit()))
}

function SetDeleteCheckboxState(n, t) {
    n.checked = t;
    var i = $("#" + n.value);
    n.checked ? ($("#confirm-delete").removeClass("disabled"), $("#confirm-delete").removeAttr("disabled"), i.find(".list-text-container").addClass("text-checked-for-deletion"), i.find(".checkbox-icon").addClass("checked")) : (i.find(".list-text-container").removeClass("text-checked-for-deletion"), i.find(".checkbox-icon").removeClass("checked"), IsAnyCheckboxChecked($("input[name^=delete]")) || ($("#confirm-delete").addClass("disabled"), $("#confirm-delete").attr("disabled", "disabled")))
}

function ResetCheckboxes() {
    CheckAllByName("deleteRoles", !1);
    CheckAllByName("deleteRights", !1);
    CheckAllByName("addRoles", !1);
    $("#delete-all-roles-checkbox").prop("checked", !1);
    $("#delete-all-rights-checkbox").prop("checked", !1);
    $("#delete-all-roles-checkbox-icon").removeClass("checked");
    $("#delete-all-rights-checkbox-icon").removeClass("checked")
}

function CancelEditMode() {
    $(".modal-body").removeClass("delete-mode add-mode");
    $("#addRoles").removeClass("in");
    $("#delete-all-roles-checkbox").prop("checked", !1);
    $("#delete-all-roles-checkbox-icon").removeClass("checked");
    $("#delete-all-rights-checkbox").prop("checked", !1);
    $("#delete-all-rights-checkbox-icon").removeClass("checked")
}

function ResetAddList() {
    $(".addible").removeClass("hidden");
    $(".added").addClass("hidden")
}

function ClickCloseButton() {
    if (RemoveLoadingScreen("#focusModalContainer"), ShowResultMode(!1), $("#new-right-holder-page.current-page").length != 0) {
        var n = $.grep($("#direct-roles-link .round-box-bg-blue, #direct-rights-link .round-box-bg-blue"), function(n) {
            return n.innerHTML != 0
        });
        n.length == 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
            $("#closeOKpopover").focus()
        }, 500)) : $("#focusModal").modal("hide")
    } else IsEmailReceiptPrompt() ? showWarningPopover($(".right-over-close")) : IsAnyCheckboxChecked($("input[name^=delete], input[name^=add]")) && ($("#accessToServices").hasClass("add-mode") || $("#accessToServices").hasClass("delete-mode")) ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $('.current-page input[name="LocalRoleModel.Rights"]').length > 0 && GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"]') != 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $(".current-page").find("#LocalRoleForm").find(".added-static").length > 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $("#focusModal").modal("hide")
}

function ClickBackButton() {
    if (RemoveLoadingScreen("#focusModalContainer"), $("#new-right-holder-page.current-page").length != 0) {
        var n = $.grep($("#direct-roles-link .round-box-bg-blue, #direct-rights-link .round-box-bg-blue"), function(n) {
            return n.innerHTML != 0
        });
        n.length == 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
            $("#backOKpopover").focus()
        }, 500)) : PreviousModalPage()
    } else IsEmailReceiptPrompt() ? PreviousModalPage() : IsAnyCheckboxChecked($("input[name^=delete], input[name^=add]")) && ($("#accessToServices").hasClass("add-mode") || $("#accessToServices").hasClass("delete-mode")) ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : $('.current-page input[name="LocalRoleModel.Rights"]').length > 0 && GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"]') != 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : $(".current-page").find("#LocalRoleForm").find(".added-static").length > 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : PreviousModalPage()
}

function showWarningPopover(n) {
    n.popover("show")
}

function VerifyButtonState(n, t) {
    var i = GetNumEmptyInputs(t);
    i == 0 ? SetButtonState(n, !0) : SetButtonState(n, !1)
}

function SetButtonState(n, t) {
    $(n).prop("disabled", !t);
    t ? $(n).removeClass("disabled") : $(n).addClass("disabled")
}

function GetNumEmptyInputs(n) {
    var t = 0;
    return $(n).each(function() {
        $(this).val() == "" && t++
    }), t
}

function IsAnyCheckboxChecked(n) {
    for (var t = 0; t < n.length; t++)
        if (n[t].checked) return !0;
    return !1
}

function IsEmailReceiptPrompt() {
    return $(".current-page").find("#submitEmail").length > 0
}

function GetAllRightsForMe() {
    var n = $.ajax("/ui/AccessManagement/ServicesAvailableForMe/").done(function(n) {
        $("#myrightsContainer").html(n);
        EnablePopoversAndTooltips(".popoverDescription", !1)
    })
}

function ServicesAvailableForActor(n, t, i) {
    AddLoadingScreen(i);
    LoadModal("/ui/AccessManagement/ServicesAvailableForActor/?userID=" + n + "&partyID=" + t, i)
}

function ConsentOverview(n, t, i) {
    AddLoadingScreen(i);
    LoadModal("/ui/AccessManagement/ConsentOverview/?userID=" + n + "&partyID=" + t, i);
    EnablePopoversAndTooltips(".right-over-close", !0)
}

function ChangeTab(n) {
    $(".altinn-tab-container div").children().removeClass("selected");
    $("#" + n).addClass("selected");
    $(".altinn-tab-pages").children().css("display", "none");
    $("#" + n + "Page").css("display", "block")
}

function ViewDelegateSingleRights() {
    var n = $.ajax("/ui/AccessManagement/DelegateRights/").done(function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function ViewRights(n) {
    var t = "/ui/AccessManagement/ViewRights/" + n,
        i = $.ajax(t).done(function(n) {
            $("#modifyRightHoldersContainer").html(n)
        })
}

function ViewRevokeRights(n) {
    var t = "/ui/AccessManagement/RevokeRights/" + n,
        i = $.ajax(t).done(function(n) {
            $("#modifyRightHoldersContainer").html(n)
        })
}

function PostServicesByRoles() {
    var n = $("#servicesFilterForm"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#serviceList").html(n)
    })
}

function GetServicesByRoles(n, t) {
    LoadModal("/ui/AccessManagement/ServicesByRolesOverview?userID=" + n + "&partyID=" + t, "#services-available-for-me-panel")
}

function Delegate(n, t, i, r, u) {
    NextModalPage("/ui/AccessManagement/Delegate?userId=" + n + "&partyId=" + t + "&serviceCode=" + i + "&serviceEditionCode=" + r + "&secondaryPage=" + u)
}

function AddRightsToLocalRole(n, t) {
    var i = encodeURI($("#RoleName_Input").val()),
        r = $("#serviceRights").val();
    NextModalPage("/ui/AccessManagement/AddRightsToLocalRole?roleName=" + i + "&serviceCode=" + n + "&serviceEditionCode=" + t + "&serviceRights=" + r)
}

function SearchForService(n, t, i, r, u, f, e) {
    IsAuthenticated();
    var o = $("#ServiceSearchDropdown_" + u),
        s = o.data("jqXHR");
    n == null || n.length == 0 || $("#ServiceSearchDropdown_" + u).parent().hasClass("open") || $("#ServiceSearchDropdown_" + u).dropdown("toggle");
    s && s.abort();
    o.data("jqXHR", $.ajax({
        cache: !1,
        type: "POST",
        url: "/ui/AccessManagement/SearchAvailableServices/",
        data: {
            searchText: n,
            partyType: t,
            userID: i,
            partyID: r,
            pageMode: u,
            isAdvancedSearch: f,
            isSearchResultReverseOrder: e
        },
        success: function(t) {
            f ? ($(".current-page").hasClass("search-result-mode") || (CancelEditMode(), $(".current-page").addClass("search-result-mode")), $(".current-page").find(".advanced-search-results").html(t), $("#ServiceSearch_Input_" + u).focus(), $("#ServiceSearchDropdown_" + u).parent().hasClass("open") && $("#ServiceSearchDropdown_" + u).dropdown("toggle")) : ($("#ServiceSearchResults_" + u).html(t), n.length > 0 && $("#ServiceSearch_Input_" + u).focus())
        },
        error: function(n) {
            console.log("Unable to perform service search (aborted?)");
            console.log(n)
        }
    }))
}

function DelegateSingleRights() {
    var n = $("#delegaterightsform"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function RevokeRights() {
    var n = $("#revokerightsform"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function UpdateEndUserSystems() {
    var n = $("#administrateeusform"),
        t, i;
    AddLoadingScreen("#administrateEusContainer .panel-section");
    t = n.attr("action");
    i = n.serialize();
    $.post(t, i, function(n) {
        RemoveLoadingScreen("#administrateEusContainer .panel-section");
        $("#administrateEusContainer").html(n)
    })
}

function EditEndUserSystem(n) {
    AddLoadingScreen("#administrateEusContainer .panel-section");
    var t = "/ui/Profile/EditEndUserSystem/" + n,
        i = $.ajax(t).done(function(n) {
            RemoveLoadingScreen("#administrateEusContainer .panel-section");
            $("#administrateEusContainer").html(n)
        })
}

function DeleteEndUserSystem(n) {
    AddLoadingScreen("#administrateEusContainer .panel-section");
    $("#administrateEusContainer .popover").popover("hide");
    var t = "/ui/Profile/DeletedEndUserSystem/" + n,
        i = $.ajax(t).done(function(n) {
            RemoveLoadingScreen("#administrateEusContainer .panel-section");
            $("#euslistcontainer").html(n)
        })
}

function GetRightHolders() {
    var n = $.ajax("/ui/Profile/RightHolders/").done(function(n) {
        $("#rightholdercontainer").html(n)
    })
}

function DeclineTransferRequest(n, t) {
    $("#TransferRequestDecline #TransferRequest_RequestedUserID").val(n);
    $("#TransferRequestDecline #TransferRequest_RequestedUserName").val(t)
}

function ConfirmTransferRequest(n, t) {
    $("#TransferRequestAccept #TransferRequest_RequestedUserID").val(n);
    $("#TransferRequestAccept #TransferRequest_RequestedUserName").val(t)
}

function StartTransferRequest(n) {
    var t = $("#TransferRequest");
    return t.removeData("validator"), t.removeData("unobtrusiveValidation"), $.validator.unobtrusive.parse(t), window.confirm(n)
}

function UpdateSelectedReportee() {
    var n = $("#reportee-form"),
        i = n.attr("action"),
        t = n.serialize();
    $.ajax({
        url: "/ui/AccessManagement/ChangeReportee",
        type: "POST",
        data: t,
        success: function() {
            location.reload()
        },
        error: function() {
            console.log("Unable to change reportee")
        }
    })
}

function EReceiptRequestChange() {
    $.ajax({
        cache: !1,
        type: "POST",
        url: "/ui/Profile/UpdateReporteeEndPoint",
        datatType: "html",
        data: {
            __RequestVerificationToken: $("#PersonalContactSettings input[type=hidden][name='__RequestVerificationToken']").val(),
            reporteeEndpoint: {
                IsEmailReceiptRequested: $("input[type=checkbox][id='ReporteeEndPoint_IsEmailReceiptRequested']").is(":checked")
            }
        }
    }).done(function(n) {
        $("#contactSettingsPersonal").html(n)
    })
}

function NotificationSettings(n, t) {
    n == "Section1" ? ($("#Section1").hide(), $("#Section2").show()) : n == "Section2" && t == "Cancel" ? ($("#Section1").show(), $("#Section2").hide()) : n == "Section2" && t == "Next" ? ($("#Section3").show(), $("#Section2").hide()) : n == "Section3" && t == "Cancel" && ($("#Section1").show(), $("#Section3").hide())
}

function ShowPassword(n, t) {
    var r = document,
        i = r.getElementById(t);
    i.getAttribute("type") == "text" ? (i.setAttribute("type", "password"), $(n).children(".hide-password-text").hide(), $(n).children(".show-password-text").show()) : (i.setAttribute("type", "text"), $(n).children(".hide-password-text").show(), $(n).children(".show-password-text").hide(), setTimeout(function() {
        r.getElementById(t).setAttribute("type", "password");
        $(n).children(".hide-password-text").hide();
        $(n).children(".show-password-text").show()
    }, 15e3))
}

function ref(n) {
    var t = n;
    location.href = "/ui/Profile/?R=" + t
}

function ChangePersonalSettings() {
    $("#ContactSettingsPersonalDiv").find("button[type='submit']").removeClass("disabled");
    $("#ContactSettingsPersonalDiv").find("button[type='submit']").attr("disabled", !1)
}

function HideNotificationSentMessages() {
    $("#successEmailPersOrg").hide();
    $("#successPhonePersOrg").hide();
    $("#changesSavedInfoMessage").hide()
}

function setVisibility(n, t) {
    var i = document.getElementById(n),
        t = document.getElementById(t);
    t.style.visibility = i.value.length > 0 ? "visible" : "hidden"
}

function SetDefaultReporteeAndExpandPortalSettingsAccordian(n) {
    $("#IsValidReportee").val() == "True" && $("#reporteemenulist ul li").each(function() {
        var t = $(this).find("input[name='reporteedropdown_partyId']").val();
        if (t == n || t == n) return $("#reporteeselected").html($(this).html()), setPartyID(n), !1
    });
    $("#collapseIntegration").collapse({
        parent: "#accordion"
    }, "show")
}

function GetParameterValues(n) {
    for (var i, r = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), t = 0; t < r.length; t++)
        if (i = r[t].split("="), i[0] == n) return i[1]
}

function RedirectToSearchPage() {
    window.location.href = "/ui/Profile/ReporteeList?DR=true"
}

function EditPassword(n, t) {
    $(n).parent().hide();
    $(t).show()
}

function RemoveConsentElement(n, t) {
    $("#" + n).remove();
    $(".consent-remove-box").length === 0 && ($("#" + t).remove(), PreviousModalPage())
}

function truncateToNumberOfLines(n, t) {
    var i = $.trim(n.text()),
        e = n.height(),
        o = parseInt(n.css("line-height"), 10),
        r = e / o,
        u = i.length,
        s = u / r,
        f = Math.ceil(s * t);
    if (f < u) return n.text(i.substring(0, f) + "...");
    r == 1 && n.css("padding-bottom", "24px")
}

function SetRepresentedByUserColor(n) {
    n ? ($("#represented-by-user").hide(), $("#represented-by-user").css("color", ""), $("#icon-org").length > 0 ? $("#icon-org").attr("src", "/ui/Content/img/icon-org-grey.svg") : $("#icon-person").attr("src", "/ui/Content/img/icon-person-grey.svg")) : ($("#represented-by-user").show(), $("#represented-by-user").css("color", "#ffffff"), $("#icon-org").length > 0 ? $("#icon-org").attr("src", "/ui/Content/img/ikon_representerer_fokus_virk.svg") : $("#icon-person").attr("src", "/ui/Content/img/ikon_representerer_fokus_person.svg"))
}
var selectedRoleIds, expandCollapseInputGroup, GoToModalHeader, config;
! function(n, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = n.document ? t(n, !0) : function(n) {
        if (!n.document) throw new Error("jQuery requires a window with a document");
        return t(n)
    } : t(n)
}("undefined" != typeof window ? window : this, function(n, t) {
    function ri(n) {
        var t = "length" in n && n.length,
            r = i.type(n);
        return "function" === r || i.isWindow(n) ? !1 : 1 === n.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in n
    }

    function ui(n, t, r) {
        if (i.isFunction(t)) return i.grep(n, function(n, i) {
            return !!t.call(n, i, n) !== r
        });
        if (t.nodeType) return i.grep(n, function(n) {
            return n === t !== r
        });
        if ("string" == typeof t) {
            if (ef.test(t)) return i.filter(t, n, r);
            t = i.filter(t, n)
        }
        return i.grep(n, function(n) {
            return ft.call(t, n) >= 0 !== r
        })
    }

    function ur(n, t) {
        while ((n = n[t]) && 1 !== n.nodeType);
        return n
    }

    function of(n) {
        var t = fi[n] = {};
        return i.each(n.match(c) || [], function(n, i) {
            t[i] = !0
        }), t
    }

    function ht() {
        u.removeEventListener("DOMContentLoaded", ht, !1);
        n.removeEventListener("load", ht, !1);
        i.ready()
    }

    function v() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        });
        this.expando = i.expando + v.uid++
    }

    function fr(n, t, r) {
        var u;
        if (void 0 === r && 1 === n.nodeType)
            if (u = "data-" + t.replace(hf, "-$1").toLowerCase(), r = n.getAttribute(u), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : sf.test(r) ? i.parseJSON(r) : r
                } catch (f) {}
                e.set(n, t, r)
            } else r = void 0;
        return r
    }

    function lt() {
        return !0
    }

    function k() {
        return !1
    }

    function hr() {
        try {
            return u.activeElement
        } catch (n) {}
    }

    function vr(n, t) {
        return i.nodeName(n, "table") && i.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
    }

    function bf(n) {
        return n.type = (null !== n.getAttribute("type")) + "/" + n.type, n
    }

    function kf(n) {
        var t = pf.exec(n.type);
        return t ? n.type = t[1] : n.removeAttribute("type"), n
    }

    function ei(n, t) {
        for (var i = 0, u = n.length; u > i; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"))
    }

    function yr(n, t) {
        var u, c, f, s, h, l, a, o;
        if (1 === t.nodeType) {
            if (r.hasData(n) && (s = r.access(n), h = r.set(t, s), o = s.events)) {
                delete h.handle;
                h.events = {};
                for (f in o)
                    for (u = 0, c = o[f].length; c > u; u++) i.event.add(t, f, o[f][u])
            }
            e.hasData(n) && (l = e.access(n), a = i.extend({}, l), e.set(t, a))
        }
    }

    function o(n, t) {
        var r = n.getElementsByTagName ? n.getElementsByTagName(t || "*") : n.querySelectorAll ? n.querySelectorAll(t || "*") : [];
        return void 0 === t || t && i.nodeName(n, t) ? i.merge([n], r) : r
    }

    function df(n, t) {
        var i = t.nodeName.toLowerCase();
        "input" === i && er.test(n.type) ? t.checked = n.checked : ("input" === i || "textarea" === i) && (t.defaultValue = n.defaultValue)
    }

    function pr(t, r) {
        var f, u = i(r.createElement(t)).appendTo(r.body),
            e = n.getDefaultComputedStyle && (f = n.getDefaultComputedStyle(u[0])) ? f.display : i.css(u[0], "display");
        return u.detach(), e
    }

    function si(n) {
        var r = u,
            t = oi[n];
        return t || (t = pr(n, r), "none" !== t && t || (at = (at || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement), r = at[0].contentDocument, r.write(), r.close(), t = pr(n, r), at.detach()), oi[n] = t), t
    }

    function it(n, t, r) {
        var e, o, s, u, f = n.style;
        return r = r || vt(n), r && (u = r.getPropertyValue(t) || r[t]), r && ("" !== u || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), hi.test(u) && wr.test(t) && (e = f.width, o = f.minWidth, s = f.maxWidth, f.minWidth = f.maxWidth = f.width = u, u = r.width, f.width = e, f.minWidth = o, f.maxWidth = s)), void 0 !== u ? u + "" : u
    }

    function br(n, t) {
        return {
            get: function() {
                return n() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function gr(n, t) {
        if (t in n) return t;
        for (var r = t[0].toUpperCase() + t.slice(1), u = t, i = dr.length; i--;)
            if (t = dr[i] + r, t in n) return t;
        return u
    }

    function nu(n, t, i) {
        var r = ne.exec(t);
        return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
    }

    function tu(n, t, r, u, f) {
        for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2) "margin" === r && (o += i.css(n, r + p[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + p[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + p[e] + "Width", !0, f))) : (o += i.css(n, "padding" + p[e], !0, f), "padding" !== r && (o += i.css(n, "border" + p[e] + "Width", !0, f)));
        return o
    }

    function iu(n, t, r) {
        var o = !0,
            u = "width" === t ? n.offsetWidth : n.offsetHeight,
            e = vt(n),
            s = "border-box" === i.css(n, "boxSizing", !1, e);
        if (0 >= u || null == u) {
            if (u = it(n, t, e), (0 > u || null == u) && (u = n.style[t]), hi.test(u)) return u;
            o = s && (f.boxSizingReliable() || u === n.style[t]);
            u = parseFloat(u) || 0
        }
        return u + tu(n, t, r || (s ? "border" : "content"), o, e) + "px"
    }

    function ru(n, t) {
        for (var e, u, s, o = [], f = 0, h = n.length; h > f; f++) u = n[f], u.style && (o[f] = r.get(u, "olddisplay"), e = u.style.display, t ? (o[f] || "none" !== e || (u.style.display = ""), "" === u.style.display && tt(u) && (o[f] = r.access(u, "olddisplay", si(u.nodeName)))) : (s = tt(u), "none" === e && s || r.set(u, "olddisplay", s ? e : i.css(u, "display"))));
        for (f = 0; h > f; f++) u = n[f], u.style && (t && "none" !== u.style.display && "" !== u.style.display || (u.style.display = t ? o[f] || "" : "none"));
        return n
    }

    function s(n, t, i, r, u) {
        return new s.prototype.init(n, t, i, r, u)
    }

    function fu() {
        return setTimeout(function() {
            d = void 0
        }), d = i.now()
    }

    function wt(n, t) {
        var r, u = 0,
            i = {
                height: n
            };
        for (t = t ? 1 : 0; 4 > u; u += 2 - t) r = p[u], i["margin" + r] = i["padding" + r] = n;
        return t && (i.opacity = i.width = n), i
    }

    function eu(n, t, i) {
        for (var u, f = (rt[t] || []).concat(rt["*"]), r = 0, e = f.length; e > r; r++)
            if (u = f[r].call(i, t, n)) return u
    }

    function fe(n, t, u) {
        var f, a, p, v, o, w, h, b, l = this,
            y = {},
            s = n.style,
            c = n.nodeType && tt(n),
            e = r.get(n, "fxshow");
        u.queue || (o = i._queueHooks(n, "fx"), null == o.unqueued && (o.unqueued = 0, w = o.empty.fire, o.empty.fire = function() {
            o.unqueued || w()
        }), o.unqueued++, l.always(function() {
            l.always(function() {
                o.unqueued--;
                i.queue(n, "fx").length || o.empty.fire()
            })
        }));
        1 === n.nodeType && ("height" in t || "width" in t) && (u.overflow = [s.overflow, s.overflowX, s.overflowY], h = i.css(n, "display"), b = "none" === h ? r.get(n, "olddisplay") || si(n.nodeName) : h, "inline" === b && "none" === i.css(n, "float") && (s.display = "inline-block"));
        u.overflow && (s.overflow = "hidden", l.always(function() {
            s.overflow = u.overflow[0];
            s.overflowX = u.overflow[1];
            s.overflowY = u.overflow[2]
        }));
        for (f in t)
            if (a = t[f], re.exec(a)) {
                if (delete t[f], p = p || "toggle" === a, a === (c ? "hide" : "show")) {
                    if ("show" !== a || !e || void 0 === e[f]) continue;
                    c = !0
                }
                y[f] = e && e[f] || i.style(n, f)
            } else h = void 0;
        if (i.isEmptyObject(y)) "inline" === ("none" === h ? si(n.nodeName) : h) && (s.display = h);
        else {
            e ? "hidden" in e && (c = e.hidden) : e = r.access(n, "fxshow", {});
            p && (e.hidden = !c);
            c ? i(n).show() : l.done(function() {
                i(n).hide()
            });
            l.done(function() {
                var t;
                r.remove(n, "fxshow");
                for (t in y) i.style(n, t, y[t])
            });
            for (f in y) v = eu(c ? e[f] : 0, f, l), f in e || (e[f] = v.start, c && (v.end = v.start, v.start = "width" === f || "height" === f ? 1 : 0))
        }
    }

    function ee(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
                u = o.expand(u);
                delete n[f];
                for (r in u) r in n || (n[r] = u[r], t[r] = e)
            } else t[f] = e
    }

    function ou(n, t, r) {
        var h, e, o = 0,
            l = pt.length,
            f = i.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                if (e) return !1;
                for (var s = d || fu(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, o = u.tweens.length; o > r; r++) u.tweens[r].run(i);
                return f.notifyWith(n, [u, i, t]), 1 > i && o ? t : (f.resolveWith(n, [u]), !1)
            },
            u = f.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, {
                    specialEasing: {}
                }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: d || fu(),
                duration: r.duration,
                tweens: [],
                createTween: function(t, r) {
                    var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(f), f
                },
                stop: function(t) {
                    var i = 0,
                        r = t ? u.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; r > i; i++) u.tweens[i].run(1);
                    return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this
                }
            }),
            s = u.props;
        for (ee(s, u.opts.specialEasing); l > o; o++)
            if (h = pt[o].call(u, n, s, u.opts)) return h;
        return i.map(s, eu, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
            elem: n,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function pu(n) {
        return function(t, r) {
            "string" != typeof t && (r = t, t = "*");
            var u, f = 0,
                e = t.toLowerCase().match(c) || [];
            if (i.isFunction(r))
                while (u = e[f++]) "+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
        }
    }

    function wu(n, t, r, u) {
        function e(s) {
            var h;
            return f[s] = !0, i.each(n[s] || [], function(n, i) {
                var s = i(t, r, u);
                return "string" != typeof s || o || f[s] ? o ? !(h = s) : void 0 : (t.dataTypes.unshift(s), e(s), !1)
            }), h
        }
        var f = {},
            o = n === ci;
        return e(t.dataTypes[0]) || !f["*"] && e("*")
    }

    function ai(n, t) {
        var r, u, f = i.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u), n
    }

    function ae(n, t, i) {
        for (var e, u, f, o, s = n.contents, r = n.dataTypes;
            "*" === r[0];) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
        if (e)
            for (u in s)
                if (s[u] && s[u].test(e)) {
                    r.unshift(u);
                    break
                }
        if (r[0] in i) f = r[0];
        else {
            for (u in i) {
                if (!r[0] || n.converters[u + " " + r[0]]) {
                    f = u;
                    break
                }
                o || (o = u)
            }
            f = f || o
        }
        if (f) return (f !== r[0] && r.unshift(f), i[f])
    }

    function ve(n, t, i, r) {
        var h, u, f, s, e, o = {},
            c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u;)
            if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
                if ("*" === u) u = e;
                else if ("*" !== e && e !== u) {
            if (f = o[e + " " + u] || o["* " + u], !f)
                for (h in o)
                    if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                        f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
                        break
                    }
            if (f !== !0)
                if (f && n.throws) t = f(t);
                else try {
                    t = f(t)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: f ? l : "No conversion from " + e + " to " + u
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function vi(n, t, r, u) {
        var f;
        if (i.isArray(t)) i.each(t, function(t, i) {
            r || pe.test(n) ? u(n, i) : vi(n + "[" + ("object" == typeof i ? t : "") + "]", i, r, u)
        });
        else if (r || "object" !== i.type(t)) u(n, t);
        else
            for (f in t) vi(n + "[" + f + "]", t[f], r, u)
    }

    function ku(n) {
        return i.isWindow(n) ? n : 9 === n.nodeType && n.defaultView
    }
    var w = [],
        a = w.slice,
        bi = w.concat,
        ti = w.push,
        ft = w.indexOf,
        et = {},
        nf = et.toString,
        ii = et.hasOwnProperty,
        f = {},
        u = n.document,
        ki = "2.1.4",
        i = function(n, t) {
            return new i.fn.init(n, t)
        },
        tf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rf = /^-ms-/,
        uf = /-([\da-z])/gi,
        ff = function(n, t) {
            return t.toUpperCase()
        },
        y, ot, nr, tr, ir, rr, c, fi, st, l, b, at, oi, oe, su, g, hu, bt, cu, kt, dt, yi, ni, pi, wi, du, gu;
    i.fn = i.prototype = {
        jquery: ki,
        constructor: i,
        selector: "",
        length: 0,
        toArray: function() {
            return a.call(this)
        },
        get: function(n) {
            return null != n ? 0 > n ? this[n + this.length] : this[n] : a.call(this)
        },
        pushStack: function(n) {
            var t = i.merge(this.constructor(), n);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(n, t) {
            return i.each(this, n, t)
        },
        map: function(n) {
            return this.pushStack(i.map(this, function(t, i) {
                return n.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(a.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(n) {
            var i = this.length,
                t = +n + (0 > n ? i : 0);
            return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: ti,
        sort: w.sort,
        splice: w.splice
    };
    i.extend = i.fn.extend = function() {
        var e, f, r, t, o, s, n = arguments[0] || {},
            u = 1,
            c = arguments.length,
            h = !1;
        for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" == typeof n || i.isFunction(n) || (n = {}), u === c && (n = this, u--); c > u; u++)
            if (null != (e = arguments[u]))
                for (f in e) r = n[f], t = e[f], n !== t && (h && t && (i.isPlainObject(t) || (o = i.isArray(t))) ? (o ? (o = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : void 0 !== t && (n[f] = t));
        return n
    };
    i.extend({
        expando: "jQuery" + (ki + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(n) {
            throw new Error(n);
        },
        noop: function() {},
        isFunction: function(n) {
            return "function" === i.type(n)
        },
        isArray: Array.isArray,
        isWindow: function(n) {
            return null != n && n === n.window
        },
        isNumeric: function(n) {
            return !i.isArray(n) && n - parseFloat(n) + 1 >= 0
        },
        isPlainObject: function(n) {
            return "object" !== i.type(n) || n.nodeType || i.isWindow(n) ? !1 : n.constructor && !ii.call(n.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(n) {
            for (var t in n) return !1;
            return !0
        },
        type: function(n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? et[nf.call(n)] || "object" : typeof n
        },
        globalEval: function(n) {
            var t, r = eval;
            n = i.trim(n);
            n && (1 === n.indexOf("use strict") ? (t = u.createElement("script"), t.text = n, u.head.appendChild(t).parentNode.removeChild(t)) : r(n))
        },
        camelCase: function(n) {
            return n.replace(rf, "ms-").replace(uf, ff)
        },
        nodeName: function(n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(n, t, i) {
            var u, r = 0,
                f = n.length,
                e = ri(n);
            if (i) {
                if (e) {
                    for (; f > r; r++)
                        if (u = t.apply(n[r], i), u === !1) break
                } else
                    for (r in n)
                        if (u = t.apply(n[r], i), u === !1) break
            } else if (e) {
                for (; f > r; r++)
                    if (u = t.call(n[r], r, n[r]), u === !1) break
            } else
                for (r in n)
                    if (u = t.call(n[r], r, n[r]), u === !1) break; return n
        },
        trim: function(n) {
            return null == n ? "" : (n + "").replace(tf, "")
        },
        makeArray: function(n, t) {
            var r = t || [];
            return null != n && (ri(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : ti.call(r, n)), r
        },
        inArray: function(n, t, i) {
            return null == t ? -1 : ft.call(t, n, i)
        },
        merge: function(n, t) {
            for (var u = +t.length, i = 0, r = n.length; u > i; i++) n[r++] = t[i];
            return n.length = r, n
        },
        grep: function(n, t, i) {
            for (var u, f = [], r = 0, e = n.length, o = !i; e > r; r++) u = !t(n[r], r), u !== o && f.push(n[r]);
            return f
        },
        map: function(n, t, i) {
            var u, r = 0,
                e = n.length,
                o = ri(n),
                f = [];
            if (o)
                for (; e > r; r++) u = t(n[r], r, i), null != u && f.push(u);
            else
                for (r in n) u = t(n[r], r, i), null != u && f.push(u);
            return bi.apply([], f)
        },
        guid: 1,
        proxy: function(n, t) {
            var u, f, r;
            return "string" == typeof t && (u = n[t], t = n, n = u), i.isFunction(n) ? (f = a.call(arguments, 2), r = function() {
                return n.apply(t || this, f.concat(a.call(arguments)))
            }, r.guid = n.guid = n.guid || i.guid++, r) : void 0
        },
        now: Date.now,
        support: f
    });
    i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(n, t) {
        et["[object " + t + "]"] = t.toLowerCase()
    });
    y = function(n) {
        function r(n, t, i, r) {
            var p, s, a, c, w, y, d, v, nt, g;
            if ((t ? t.ownerDocument || t : h) !== o && k(t), t = t || o, i = i || [], c = t.nodeType, "string" != typeof n || !n || 1 !== c && 9 !== c && 11 !== c) return i;
            if (!r && l) {
                if (11 !== c && (p = hr.exec(n)))
                    if (a = p[1]) {
                        if (9 === c) {
                            if (s = t.getElementById(a), !s || !s.parentNode) return i;
                            if (s.id === a) return i.push(s), i
                        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && et(t, s) && s.id === a) return i.push(s), i
                    } else {
                        if (p[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                        if ((a = p[3]) && u.getElementsByClassName) return b.apply(i, t.getElementsByClassName(a)), i
                    }
                if (u.qsa && (!e || !e.test(n))) {
                    if (v = d = f, nt = t, g = 1 !== c && n, 1 === c && "object" !== t.nodeName.toLowerCase()) {
                        for (y = ft(n), (d = t.getAttribute("id")) ? v = d.replace(cr, "\\$&") : t.setAttribute("id", v), v = "[id='" + v + "'] ", w = y.length; w--;) y[w] = v + vt(y[w]);
                        nt = dt.test(n) && ti(t.parentNode) || t;
                        g = y.join(",")
                    }
                    if (g) try {
                        return b.apply(i, nt.querySelectorAll(g)), i
                    } catch (tt) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return oi(n.replace(lt, "$1"), t, i, r)
        }

        function gt() {
            function n(r, u) {
                return i.push(r + " ") > t.cacheLength && delete n[i.shift()], n[r + " "] = u
            }
            var i = [];
            return n
        }

        function c(n) {
            return n[f] = !0, n
        }

        function v(n) {
            var t = o.createElement("div");
            try {
                return !!n(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null
            }
        }

        function ni(n, i) {
            for (var u = n.split("|"), r = n.length; r--;) t.attrHandle[u[r]] = i
        }

        function wi(n, t) {
            var i = t && n,
                r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || li) - (~n.sourceIndex || li);
            if (r) return r;
            if (i)
                while (i = i.nextSibling)
                    if (i === t) return -1;
            return n ? 1 : -1
        }

        function lr(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === n
            }
        }

        function ar(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === n
            }
        }

        function tt(n) {
            return c(function(t) {
                return t = +t, c(function(i, r) {
                    for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                })
            })
        }

        function ti(n) {
            return n && "undefined" != typeof n.getElementsByTagName && n
        }

        function bi() {}

        function vt(n) {
            for (var t = 0, r = n.length, i = ""; r > t; t++) i += n[t].value;
            return i
        }

        function ii(n, t, i) {
            var r = t.dir,
                u = i && "parentNode" === r,
                e = ki++;
            return t.first ? function(t, i, f) {
                while (t = t[r])
                    if (1 === t.nodeType || u) return n(t, i, f)
            } : function(t, i, o) {
                var s, h, c = [a, e];
                if (o) {
                    while (t = t[r])
                        if ((1 === t.nodeType || u) && n(t, i, o)) return !0
                } else
                    while (t = t[r])
                        if (1 === t.nodeType || u) {
                            if (h = t[f] || (t[f] = {}), (s = h[r]) && s[0] === a && s[1] === e) return c[2] = s[2];
                            if (h[r] = c, c[2] = n(t, i, o)) return !0
                        }
            }
        }

        function ri(n) {
            return n.length > 1 ? function(t, i, r) {
                for (var u = n.length; u--;)
                    if (!n[u](t, i, r)) return !1;
                return !0
            } : n[0]
        }

        function vr(n, t, i) {
            for (var u = 0, f = t.length; f > u; u++) r(n, t[u], i);
            return i
        }

        function yt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
            return o
        }

        function ui(n, t, i, r, u, e) {
            return r && !r[f] && (r = ui(r)), u && !u[f] && (u = ui(u, e)), c(function(f, e, o, s) {
                var l, c, a, p = [],
                    y = [],
                    w = e.length,
                    k = f || vr(t || "*", o.nodeType ? [o] : o, []),
                    v = !n || !f && t ? k : yt(k, p, n, o, s),
                    h = i ? u || (f ? n : w || r) ? [] : e : v;
                if (i && i(v, h, o, s), r)
                    for (l = yt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                if (f) {
                    if (u || n) {
                        if (u) {
                            for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
                            u(null, h = [], l, s)
                        }
                        for (c = h.length; c--;)(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                    }
                } else h = yt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : b.apply(e, h)
            })
        }

        function fi(n) {
            for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ii(function(n) {
                    return n === o
                }, c, !0), a = ii(function(n) {
                    return nt(o, n) > -1
                }, c, !0), e = [function(n, t, i) {
                    var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                    return o = null, r
                }]; s > i; i++)
                if (u = t.relative[n[i].type]) e = [ii(ri(e), u)];
                else {
                    if (u = t.filter[n[i].type].apply(null, n[i].matches), u[f]) {
                        for (r = ++i; s > r; r++)
                            if (t.relative[n[r].type]) break;
                        return ui(i > 1 && ri(e), i > 1 && vt(n.slice(0, i - 1).concat({
                            value: " " === n[i - 2].type ? "*" : ""
                        })).replace(lt, "$1"), u, r > i && fi(n.slice(i, r)), s > r && fi(n = n.slice(r)), s > r && vt(n))
                    }
                    e.push(u)
                }
            return ri(e)
        }

        function yr(n, i) {
            var u = i.length > 0,
                f = n.length > 0,
                e = function(e, s, h, c, l) {
                    var y, d, w, k = 0,
                        v = "0",
                        g = e && [],
                        p = [],
                        nt = ht,
                        tt = e || f && t.find.TAG("*", l),
                        it = a += null == nt ? 1 : Math.random() || .1,
                        rt = tt.length;
                    for (l && (ht = s !== o && s); v !== rt && null != (y = tt[v]); v++) {
                        if (f && y) {
                            for (d = 0; w = n[d++];)
                                if (w(y, s, h)) {
                                    c.push(y);
                                    break
                                }
                            l && (a = it)
                        }
                        u && ((y = !w && y) && k--, e && g.push(y))
                    }
                    if (k += v, u && v !== k) {
                        for (d = 0; w = i[d++];) w(g, p, s, h);
                        if (e) {
                            if (k > 0)
                                while (v--) g[v] || p[v] || (p[v] = gi.call(c));
                            p = yt(p)
                        }
                        b.apply(c, p);
                        l && !e && p.length > 0 && k + i.length > 1 && r.uniqueSort(c)
                    }
                    return l && (a = it, ht = nt), g
                };
            return u ? c(e) : e
        }
        var it, u, t, st, ei, ft, pt, oi, ht, w, rt, k, o, s, l, e, d, ct, et, f = "sizzle" + 1 * new Date,
            h = n.document,
            a = 0,
            ki = 0,
            si = gt(),
            hi = gt(),
            ci = gt(),
            wt = function(n, t) {
                return n === t && (rt = !0), 0
            },
            li = -2147483648,
            di = {}.hasOwnProperty,
            g = [],
            gi = g.pop,
            nr = g.push,
            b = g.push,
            ai = g.slice,
            nt = function(n, t) {
                for (var i = 0, r = n.length; r > i; i++)
                    if (n[i] === t) return i;
                return -1
            },
            bt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            i = "[\\x20\\t\\r\\n\\f]",
            ut = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            vi = ut.replace("w", "w#"),
            yi = "\\[" + i + "*(" + ut + ")(?:" + i + "*([*^$|!~]?=)" + i + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + vi + "))|)" + i + "*\\]",
            kt = ":(" + ut + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + yi + ")*)|.*)\\)|)",
            tr = new RegExp(i + "+", "g"),
            lt = new RegExp("^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$", "g"),
            ir = new RegExp("^" + i + "*," + i + "*"),
            rr = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"),
            ur = new RegExp("=" + i + "*([^\\]'\"]*?)" + i + "*\\]", "g"),
            fr = new RegExp(kt),
            er = new RegExp("^" + vi + "$"),
            at = {
                ID: new RegExp("^#(" + ut + ")"),
                CLASS: new RegExp("^\\.(" + ut + ")"),
                TAG: new RegExp("^(" + ut.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + yi),
                PSEUDO: new RegExp("^" + kt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + i + "*(even|odd|(([+-]|)(\\d*)n|)" + i + "*(?:([+-]|)" + i + "*(\\d+)|))" + i + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + bt + ")$", "i"),
                needsContext: new RegExp("^" + i + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + i + "*((?:-\\d)?\\d*)" + i + "*\\)|)(?=[^-]|$)", "i")
            },
            or = /^(?:input|select|textarea|button)$/i,
            sr = /^h\d$/i,
            ot = /^[^{]+\{\s*\[native \w/,
            hr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            dt = /[+~]/,
            cr = /'|\\/g,
            y = new RegExp("\\\\([\\da-f]{1,6}" + i + "?|(" + i + ")|.)", "ig"),
            p = function(n, t, i) {
                var r = "0x" + t - 65536;
                return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            pi = function() {
                k()
            };
        try {
            b.apply(g = ai.call(h.childNodes), h.childNodes);
            g[h.childNodes.length].nodeType
        } catch (pr) {
            b = {
                apply: g.length ? function(n, t) {
                    nr.apply(n, ai.call(t))
                } : function(n, t) {
                    for (var i = n.length, r = 0; n[i++] = t[r++];);
                    n.length = i - 1
                }
            }
        }
        u = r.support = {};
        ei = r.isXML = function(n) {
            var t = n && (n.ownerDocument || n).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        };
        k = r.setDocument = function(n) {
            var a, c, r = n ? n.ownerDocument || n : h;
            return r !== o && 9 === r.nodeType && r.documentElement ? (o = r, s = r.documentElement, c = r.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", pi, !1) : c.attachEvent && c.attachEvent("onunload", pi)), l = !ei(r), u.attributes = v(function(n) {
                return n.className = "i", !n.getAttribute("className")
            }), u.getElementsByTagName = v(function(n) {
                return n.appendChild(r.createComment("")), !n.getElementsByTagName("*").length
            }), u.getElementsByClassName = ot.test(r.getElementsByClassName), u.getById = v(function(n) {
                return s.appendChild(n).id = f, !r.getElementsByName || !r.getElementsByName(f).length
            }), u.getById ? (t.find.ID = function(n, t) {
                if ("undefined" != typeof t.getElementById && l) {
                    var i = t.getElementById(n);
                    return i && i.parentNode ? [i] : []
                }
            }, t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    return n.getAttribute("id") === t
                }
            }) : (delete t.find.ID, t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
                    return i && i.value === t
                }
            }), t.find.TAG = u.getElementsByTagName ? function(n, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : u.qsa ? t.querySelectorAll(n) : void 0
            } : function(n, t) {
                var i, r = [],
                    f = 0,
                    u = t.getElementsByTagName(n);
                if ("*" === n) {
                    while (i = u[f++]) 1 === i.nodeType && r.push(i);
                    return r
                }
                return u
            }, t.find.CLASS = u.getElementsByClassName && function(n, t) {
                if (l) return t.getElementsByClassName(n)
            }, d = [], e = [], (u.qsa = ot.test(r.querySelectorAll)) && (v(function(n) {
                s.appendChild(n).innerHTML = "<a id='" + f + "'><\/a><select id='" + f + "-\f]' msallowcapture=''><option selected=''><\/option><\/select>";
                n.querySelectorAll("[msallowcapture^='']").length && e.push("[*^$]=" + i + "*(?:''|\"\")");
                n.querySelectorAll("[selected]").length || e.push("\\[" + i + "*(?:value|" + bt + ")");
                n.querySelectorAll("[id~=" + f + "-]").length || e.push("~=");
                n.querySelectorAll(":checked").length || e.push(":checked");
                n.querySelectorAll("a#" + f + "+*").length || e.push(".#.+[+~]")
            }), v(function(n) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden");
                n.appendChild(t).setAttribute("name", "D");
                n.querySelectorAll("[name=d]").length && e.push("name" + i + "*[*^$|!~]?=");
                n.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
                n.querySelectorAll("*,:x");
                e.push(",.*:")
            })), (u.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && v(function(n) {
                u.disconnectedMatch = ct.call(n, "div");
                ct.call(n, "[s!='']:x");
                d.push("!=", kt)
            }), e = e.length && new RegExp(e.join("|")), d = d.length && new RegExp(d.join("|")), a = ot.test(s.compareDocumentPosition), et = a || ot.test(s.contains) ? function(n, t) {
                var r = 9 === n.nodeType ? n.documentElement : n,
                    i = t && t.parentNode;
                return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
            } : function(n, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === n) return !0;
                return !1
            }, wt = a ? function(n, t) {
                if (n === t) return rt = !0, 0;
                var i = !n.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, 1 & i || !u.sortDetached && t.compareDocumentPosition(n) === i ? n === r || n.ownerDocument === h && et(h, n) ? -1 : t === r || t.ownerDocument === h && et(h, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : 4 & i ? -1 : 1)
            } : function(n, t) {
                if (n === t) return rt = !0, 0;
                var i, u = 0,
                    o = n.parentNode,
                    s = t.parentNode,
                    f = [n],
                    e = [t];
                if (!o || !s) return n === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                if (o === s) return wi(n, t);
                for (i = n; i = i.parentNode;) f.unshift(i);
                for (i = t; i = i.parentNode;) e.unshift(i);
                while (f[u] === e[u]) u++;
                return u ? wi(f[u], e[u]) : f[u] === h ? -1 : e[u] === h ? 1 : 0
            }, r) : o
        };
        r.matches = function(n, t) {
            return r(n, null, null, t)
        };
        r.matchesSelector = function(n, t) {
            if ((n.ownerDocument || n) !== o && k(n), t = t.replace(ur, "='$1']"), !(!u.matchesSelector || !l || d && d.test(t) || e && e.test(t))) try {
                var i = ct.call(n, t);
                if (i || u.disconnectedMatch || n.document && 11 !== n.document.nodeType) return i
            } catch (f) {}
            return r(t, o, null, [n]).length > 0
        };
        r.contains = function(n, t) {
            return (n.ownerDocument || n) !== o && k(n), et(n, t)
        };
        r.attr = function(n, i) {
            (n.ownerDocument || n) !== o && k(n);
            var f = t.attrHandle[i.toLowerCase()],
                r = f && di.call(t.attrHandle, i.toLowerCase()) ? f(n, i, !l) : void 0;
            return void 0 !== r ? r : u.attributes || !l ? n.getAttribute(i) : (r = n.getAttributeNode(i)) && r.specified ? r.value : null
        };
        r.error = function(n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        };
        r.uniqueSort = function(n) {
            var r, f = [],
                t = 0,
                i = 0;
            if (rt = !u.detectDuplicates, w = !u.sortStable && n.slice(0), n.sort(wt), rt) {
                while (r = n[i++]) r === n[i] && (t = f.push(i));
                while (t--) n.splice(f[t], 1)
            }
            return w = null, n
        };
        st = r.getText = function(n) {
            var r, i = "",
                u = 0,
                t = n.nodeType;
            if (t) {
                if (1 === t || 9 === t || 11 === t) {
                    if ("string" == typeof n.textContent) return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling) i += st(n)
                } else if (3 === t || 4 === t) return n.nodeValue
            } else
                while (r = n[u++]) i += st(r);
            return i
        };
        t = r.selectors = {
            cacheLength: 50,
            createPseudo: c,
            match: at,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(n) {
                    return n[1] = n[1].replace(y, p), n[3] = (n[3] || n[4] || n[5] || "").replace(y, p), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
                },
                CHILD: function(n) {
                    return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || r.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && r.error(n[0]), n
                },
                PSEUDO: function(n) {
                    var i, t = !n[6] && n[2];
                    return at.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
                }
            },
            filter: {
                TAG: function(n) {
                    var t = n.replace(y, p).toLowerCase();
                    return "*" === n ? function() {
                        return !0
                    } : function(n) {
                        return n.nodeName && n.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(n) {
                    var t = si[n + " "];
                    return t || (t = new RegExp("(^|" + i + ")" + n + "(" + i + "|$)")) && si(n, function(n) {
                        return t.test("string" == typeof n.className && n.className || "undefined" != typeof n.getAttribute && n.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, t, i) {
                    return function(u) {
                        var f = r.attr(u, n);
                        return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(n, t, i, r, u) {
                    var s = "nth" !== n.slice(0, 3),
                        o = "last" !== n.slice(-4),
                        e = "of-type" === t;
                    return 1 === r && 0 === u ? function(n) {
                        return !!n.parentNode
                    } : function(t, i, h) {
                        var v, k, c, l, y, w, b = s !== o ? "nextSibling" : "previousSibling",
                            p = t.parentNode,
                            g = e && t.nodeName.toLowerCase(),
                            d = !h && !e;
                        if (p) {
                            if (s) {
                                while (b) {
                                    for (c = t; c = c[b];)
                                        if (e ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                    w = b = "only" === n && !w && "nextSibling"
                                }
                                return !0
                            }
                            if (w = [o ? p.firstChild : p.lastChild], o && d) {
                                for (k = p[f] || (p[f] = {}), v = k[n] || [], y = v[0] === a && v[1], l = v[0] === a && v[2], c = y && p.childNodes[y]; c = ++y && c && c[b] || (l = y = 0) || w.pop();)
                                    if (1 === c.nodeType && ++l && c === t) {
                                        k[n] = [a, y, l];
                                        break
                                    }
                            } else if (d && (v = (t[f] || (t[f] = {}))[n]) && v[0] === a) l = v[1];
                            else
                                while (c = ++y && c && c[b] || (l = y = 0) || w.pop())
                                    if ((e ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++l && (d && ((c[f] || (c[f] = {}))[n] = [a, l]), c === t)) break; return l -= u, l === r || l % r == 0 && l / r >= 0
                        }
                    }
                },
                PSEUDO: function(n, i) {
                    var e, u = t.pseudos[n] || t.setFilters[n.toLowerCase()] || r.error("unsupported pseudo: " + n);
                    return u[f] ? u(i) : u.length > 1 ? (e = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? c(function(n, t) {
                        for (var r, f = u(n, i), e = f.length; e--;) r = nt(n, f[e]), n[r] = !(t[r] = f[e])
                    }) : function(n) {
                        return u(n, 0, e)
                    }) : u
                }
            },
            pseudos: {
                not: c(function(n) {
                    var t = [],
                        r = [],
                        i = pt(n.replace(lt, "$1"));
                    return i[f] ? c(function(n, t, r, u) {
                        for (var e, o = i(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(t[f] = e))
                    }) : function(n, u, f) {
                        return t[0] = n, i(t, null, f, r), t[0] = null, !r.pop()
                    }
                }),
                has: c(function(n) {
                    return function(t) {
                        return r(n, t).length > 0
                    }
                }),
                contains: c(function(n) {
                    return n = n.replace(y, p),
                        function(t) {
                            return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                        }
                }),
                lang: c(function(n) {
                    return er.test(n || "") || r.error("unsupported lang: " + n), n = n.replace(y, p).toLowerCase(),
                        function(t) {
                            var i;
                            do
                                if (i = l ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(n) {
                    return n === s
                },
                focus: function(n) {
                    return n === o.activeElement && (!o.hasFocus || o.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                },
                enabled: function(n) {
                    return n.disabled === !1
                },
                disabled: function(n) {
                    return n.disabled === !0
                },
                checked: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return "input" === t && !!n.checked || "option" === t && !!n.selected
                },
                selected: function(n) {
                    return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                },
                empty: function(n) {
                    for (n = n.firstChild; n; n = n.nextSibling)
                        if (n.nodeType < 6) return !1;
                    return !0
                },
                parent: function(n) {
                    return !t.pseudos.empty(n)
                },
                header: function(n) {
                    return sr.test(n.nodeName)
                },
                input: function(n) {
                    return or.test(n.nodeName)
                },
                button: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return "input" === t && "button" === n.type || "button" === t
                },
                text: function(n) {
                    var t;
                    return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: tt(function() {
                    return [0]
                }),
                last: tt(function(n, t) {
                    return [t - 1]
                }),
                eq: tt(function(n, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: tt(function(n, t) {
                    for (var i = 0; t > i; i += 2) n.push(i);
                    return n
                }),
                odd: tt(function(n, t) {
                    for (var i = 1; t > i; i += 2) n.push(i);
                    return n
                }),
                lt: tt(function(n, t, i) {
                    for (var r = 0 > i ? i + t : i; --r >= 0;) n.push(r);
                    return n
                }),
                gt: tt(function(n, t, i) {
                    for (var r = 0 > i ? i + t : i; ++r < t;) n.push(r);
                    return n
                })
            }
        };
        t.pseudos.nth = t.pseudos.eq;
        for (it in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) t.pseudos[it] = lr(it);
        for (it in {
                submit: !0,
                reset: !0
            }) t.pseudos[it] = ar(it);
        return bi.prototype = t.filters = t.pseudos, t.setFilters = new bi, ft = r.tokenize = function(n, i) {
            var e, f, s, o, u, h, c, l = hi[n + " "];
            if (l) return i ? 0 : l.slice(0);
            for (u = n, h = [], c = t.preFilter; u;) {
                (!e || (f = ir.exec(u))) && (f && (u = u.slice(f[0].length) || u), h.push(s = []));
                e = !1;
                (f = rr.exec(u)) && (e = f.shift(), s.push({
                    value: e,
                    type: f[0].replace(lt, " ")
                }), u = u.slice(e.length));
                for (o in t.filter)(f = at[o].exec(u)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
                    value: e,
                    type: o,
                    matches: f
                }), u = u.slice(e.length));
                if (!e) break
            }
            return i ? u.length : u ? r.error(n) : hi(n, h).slice(0)
        }, pt = r.compile = function(n, t) {
            var r, u = [],
                e = [],
                i = ci[n + " "];
            if (!i) {
                for (t || (t = ft(n)), r = t.length; r--;) i = fi(t[r]), i[f] ? u.push(i) : e.push(i);
                i = ci(n, yr(e, u));
                i.selector = n
            }
            return i
        }, oi = r.select = function(n, i, r, f) {
            var s, e, o, a, v, c = "function" == typeof n && n,
                h = !f && ft(n = c.selector || n);
            if (r = r || [], 1 === h.length) {
                if (e = h[0] = h[0].slice(0), e.length > 2 && "ID" === (o = e[0]).type && u.getById && 9 === i.nodeType && l && t.relative[e[1].type]) {
                    if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], !i) return r;
                    c && (i = i.parentNode);
                    n = n.slice(e.shift().value.length)
                }
                for (s = at.needsContext.test(n) ? 0 : e.length; s--;) {
                    if (o = e[s], t.relative[a = o.type]) break;
                    if ((v = t.find[a]) && (f = v(o.matches[0].replace(y, p), dt.test(e[0].type) && ti(i.parentNode) || i))) {
                        if (e.splice(s, 1), n = f.length && vt(e), !n) return b.apply(r, f), r;
                        break
                    }
                }
            }
            return (c || pt(n, h))(f, i, !l, r, dt.test(n) && ti(i.parentNode) || i), r
        }, u.sortStable = f.split("").sort(wt).join("") === f, u.detectDuplicates = !!rt, k(), u.sortDetached = v(function(n) {
            return 1 & n.compareDocumentPosition(o.createElement("div"))
        }), v(function(n) {
            return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
        }) || ni("type|href|height|width", function(n, t, i) {
            if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), u.attributes && v(function(n) {
            return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
        }) || ni("value", function(n, t, i) {
            if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue
        }), v(function(n) {
            return null == n.getAttribute("disabled")
        }) || ni(bt, function(n, t, i) {
            var r;
            if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
        }), r
    }(n);
    i.find = y;
    i.expr = y.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.unique = y.uniqueSort;
    i.text = y.getText;
    i.isXMLDoc = y.isXML;
    i.contains = y.contains;
    var di = i.expr.match.needsContext,
        gi = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ef = /^.[^:#\[\.,]*$/;
    i.filter = function(n, t, r) {
        var u = t[0];
        return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
            return 1 === n.nodeType
        }))
    };
    i.fn.extend({
        find: function(n) {
            var t, u = this.length,
                r = [],
                f = this;
            if ("string" != typeof n) return this.pushStack(i(n).filter(function() {
                for (t = 0; u > t; t++)
                    if (i.contains(f[t], this)) return !0
            }));
            for (t = 0; u > t; t++) i.find(n, f[t], r);
            return r = this.pushStack(u > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
        },
        filter: function(n) {
            return this.pushStack(ui(this, n || [], !1))
        },
        not: function(n) {
            return this.pushStack(ui(this, n || [], !0))
        },
        is: function(n) {
            return !!ui(this, "string" == typeof n && di.test(n) ? i(n) : n || [], !1).length
        }
    });
    nr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    tr = i.fn.init = function(n, t) {
        var r, f;
        if (!n) return this;
        if ("string" == typeof n) {
            if (r = "<" === n[0] && ">" === n[n.length - 1] && n.length >= 3 ? [null, n, null] : nr.exec(n), !r || !r[1] && t) return !t || t.jquery ? (t || ot).find(n) : this.constructor(t).find(n);
            if (r[1]) {
                if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), gi.test(r[1]) && i.isPlainObject(t))
                    for (r in t) i.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return f = u.getElementById(r[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = u, this.selector = n, this
        }
        return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? "undefined" != typeof ot.ready ? ot.ready(n) : n(i) : (void 0 !== n.selector && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
    };
    tr.prototype = i.fn;
    ot = i(u);
    ir = /^(?:parents|prev(?:Until|All))/;
    rr = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    i.extend({
        dir: function(n, t, r) {
            for (var u = [], f = void 0 !== r;
                (n = n[t]) && 9 !== n.nodeType;)
                if (1 === n.nodeType) {
                    if (f && i(n).is(r)) break;
                    u.push(n)
                }
            return u
        },
        sibling: function(n, t) {
            for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
            return i
        }
    });
    i.fn.extend({
        has: function(n) {
            var t = i(n, this),
                r = t.length;
            return this.filter(function() {
                for (var n = 0; r > n; n++)
                    if (i.contains(this, t[n])) return !0
            })
        },
        closest: function(n, t) {
            for (var r, f = 0, o = this.length, u = [], e = di.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++)
                for (r = this[f]; r && r !== t; r = r.parentNode)
                    if (r.nodeType < 11 && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                        u.push(r);
                        break
                    }
            return this.pushStack(u.length > 1 ? i.unique(u) : u)
        },
        index: function(n) {
            return n ? "string" == typeof n ? ft.call(i(n), this[0]) : ft.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(n, t) {
            return this.pushStack(i.unique(i.merge(this.get(), i(n, t))))
        },
        addBack: function(n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
        }
    });
    i.each({
        parent: function(n) {
            var t = n.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(n) {
            return i.dir(n, "parentNode")
        },
        parentsUntil: function(n, t, r) {
            return i.dir(n, "parentNode", r)
        },
        next: function(n) {
            return ur(n, "nextSibling")
        },
        prev: function(n) {
            return ur(n, "previousSibling")
        },
        nextAll: function(n) {
            return i.dir(n, "nextSibling")
        },
        prevAll: function(n) {
            return i.dir(n, "previousSibling")
        },
        nextUntil: function(n, t, r) {
            return i.dir(n, "nextSibling", r)
        },
        prevUntil: function(n, t, r) {
            return i.dir(n, "previousSibling", r)
        },
        siblings: function(n) {
            return i.sibling((n.parentNode || {}).firstChild, n)
        },
        children: function(n) {
            return i.sibling(n.firstChild)
        },
        contents: function(n) {
            return n.contentDocument || i.merge([], n.childNodes)
        }
    }, function(n, t) {
        i.fn[n] = function(r, u) {
            var f = i.map(this, t, r);
            return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (rr[n] || i.unique(f), ir.test(n) && f.reverse()), this.pushStack(f)
        }
    });
    c = /\S+/g;
    fi = {};
    i.Callbacks = function(n) {
        n = "string" == typeof n ? fi[n] || of(n) : i.extend({}, n);
        var u, h, o, c, f, e, t = [],
            r = !n.once && [],
            l = function(i) {
                for (u = n.memory && i, h = !0, e = c || 0, c = 0, f = t.length, o = !0; t && f > e; e++)
                    if (t[e].apply(i[0], i[1]) === !1 && n.stopOnFalse) {
                        u = !1;
                        break
                    }
                o = !1;
                t && (r ? r.length && l(r.shift()) : u ? t = [] : s.disable())
            },
            s = {
                add: function() {
                    if (t) {
                        var r = t.length;
                        ! function e(r) {
                            i.each(r, function(r, u) {
                                var f = i.type(u);
                                "function" === f ? n.unique && s.has(u) || t.push(u) : u && u.length && "string" !== f && e(u)
                            })
                        }(arguments);
                        o ? f = t.length : u && (c = r, l(u))
                    }
                    return this
                },
                remove: function() {
                    return t && i.each(arguments, function(n, r) {
                        for (var u;
                            (u = i.inArray(r, t, u)) > -1;) t.splice(u, 1), o && (f >= u && f--, e >= u && e--)
                    }), this
                },
                has: function(n) {
                    return n ? i.inArray(n, t) > -1 : !(!t || !t.length)
                },
                empty: function() {
                    return t = [], f = 0, this
                },
                disable: function() {
                    return t = r = u = void 0, this
                },
                disabled: function() {
                    return !t
                },
                lock: function() {
                    return r = void 0, u || s.disable(), this
                },
                locked: function() {
                    return !r
                },
                fireWith: function(n, i) {
                    return !t || h && !r || (i = i || [], i = [n, i.slice ? i.slice() : i], o ? r.push(i) : l(i)), this
                },
                fire: function() {
                    return s.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!h
                }
            };
        return s
    };
    i.extend({
        Deferred: function(n) {
            var u = [
                    ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", i.Callbacks("memory")]
                ],
                f = "pending",
                r = {
                    state: function() {
                        return f
                    },
                    always: function() {
                        return t.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var n = arguments;
                        return i.Deferred(function(f) {
                            i.each(u, function(u, e) {
                                var o = i.isFunction(n[u]) && n[u];
                                t[e[1]](function() {
                                    var n = o && o.apply(this, arguments);
                                    n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
                                })
                            });
                            n = null
                        }).promise()
                    },
                    promise: function(n) {
                        return null != n ? i.extend(n, r) : r
                    }
                },
                t = {};
            return r.pipe = r.then, i.each(u, function(n, i) {
                var e = i[2],
                    o = i[3];
                r[i[1]] = e.add;
                o && e.add(function() {
                    f = o
                }, u[1 ^ n][2].disable, u[2][2].lock);
                t[i[0]] = function() {
                    return t[i[0] + "With"](this === t ? r : this, arguments), this
                };
                t[i[0] + "With"] = e.fireWith
            }), r.promise(t), n && n.call(t, t), t
        },
        when: function(n) {
            var t = 0,
                u = a.call(arguments),
                r = u.length,
                e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
                f = 1 === e ? n : i.Deferred(),
                h = function(n, t, i) {
                    return function(r) {
                        t[n] = this;
                        i[n] = arguments.length > 1 ? a.call(arguments) : r;
                        i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                    }
                },
                o, c, s;
            if (r > 1)
                for (o = new Array(r), c = new Array(r), s = new Array(r); r > t; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
            return e || f.resolveWith(s, u), f.promise()
        }
    });
    i.fn.ready = function(n) {
        return i.ready.promise().done(n), this
    };
    i.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(n) {
            n ? i.readyWait++ : i.ready(!0)
        },
        ready: function(n) {
            (n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, n !== !0 && --i.readyWait > 0 || (st.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready"))))
        }
    });
    i.ready.promise = function(t) {
        return st || (st = i.Deferred(), "complete" === u.readyState ? setTimeout(i.ready) : (u.addEventListener("DOMContentLoaded", ht, !1), n.addEventListener("load", ht, !1))), st.promise(t)
    };
    i.ready.promise();
    l = i.access = function(n, t, r, u, f, e, o) {
        var s = 0,
            c = n.length,
            h = null == r;
        if ("object" === i.type(r)) {
            f = !0;
            for (s in r) i.access(n, t, s, r[s], !0, e, o)
        } else if (void 0 !== u && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function(n, t, r) {
                return h.call(i(n), r)
            })), t))
            for (; c > s; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
        return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
    };
    i.acceptData = function(n) {
        return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType
    };
    v.uid = 1;
    v.accepts = i.acceptData;
    v.prototype = {
        key: function(n) {
            if (!v.accepts(n)) return 0;
            var r = {},
                t = n[this.expando];
            if (!t) {
                t = v.uid++;
                try {
                    r[this.expando] = {
                        value: t
                    };
                    Object.defineProperties(n, r)
                } catch (u) {
                    r[this.expando] = t;
                    i.extend(n, r)
                }
            }
            return this.cache[t] || (this.cache[t] = {}), t
        },
        set: function(n, t, r) {
            var f, e = this.key(n),
                u = this.cache[e];
            if ("string" == typeof t) u[t] = r;
            else if (i.isEmptyObject(u)) i.extend(this.cache[e], t);
            else
                for (f in t) u[f] = t[f];
            return u
        },
        get: function(n, t) {
            var i = this.cache[this.key(n)];
            return void 0 === t ? i : i[t]
        },
        access: function(n, t, r) {
            var u;
            return void 0 === t || t && "string" == typeof t && void 0 === r ? (u = this.get(n, t), void 0 !== u ? u : this.get(n, i.camelCase(t))) : (this.set(n, t, r), void 0 !== r ? r : t)
        },
        remove: function(n, t) {
            var u, r, f, o = this.key(n),
                e = this.cache[o];
            if (void 0 === t) this.cache[o] = {};
            else
                for (i.isArray(t) ? r = t.concat(t.map(i.camelCase)) : (f = i.camelCase(t), (t in e) ? r = [t, f] : (r = f, r = (r in e) ? [r] : r.match(c) || [])), u = r.length; u--;) delete e[r[u]]
        },
        hasData: function(n) {
            return !i.isEmptyObject(this.cache[n[this.expando]] || {})
        },
        discard: function(n) {
            n[this.expando] && delete this.cache[n[this.expando]]
        }
    };
    var r = new v,
        e = new v,
        sf = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        hf = /([A-Z])/g;
    i.extend({
        hasData: function(n) {
            return e.hasData(n) || r.hasData(n)
        },
        data: function(n, t, i) {
            return e.access(n, t, i)
        },
        removeData: function(n, t) {
            e.remove(n, t)
        },
        _data: function(n, t, i) {
            return r.access(n, t, i)
        },
        _removeData: function(n, t) {
            r.remove(n, t)
        }
    });
    i.fn.extend({
        data: function(n, t) {
            var o, f, s, u = this[0],
                h = u && u.attributes;
            if (void 0 === n) {
                if (this.length && (s = e.get(u), 1 === u.nodeType && !r.get(u, "hasDataAttrs"))) {
                    for (o = h.length; o--;) h[o] && (f = h[o].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), fr(u, f, s[f])));
                    r.set(u, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof n ? this.each(function() {
                e.set(this, n)
            }) : l(this, function(t) {
                var r, f = i.camelCase(n);
                if (u && void 0 === t) {
                    if ((r = e.get(u, n), void 0 !== r) || (r = e.get(u, f), void 0 !== r) || (r = fr(u, f, void 0), void 0 !== r)) return r
                } else this.each(function() {
                    var i = e.get(this, f);
                    e.set(this, f, t); - 1 !== n.indexOf("-") && void 0 !== i && e.set(this, n, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(n) {
            return this.each(function() {
                e.remove(this, n)
            })
        }
    });
    i.extend({
        queue: function(n, t, u) {
            var f;
            if (n) return (t = (t || "fx") + "queue", f = r.get(n, t), u && (!f || i.isArray(u) ? f = r.access(n, t, i.makeArray(u)) : f.push(u)), f || [])
        },
        dequeue: function(n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t),
                o = function() {
                    i.dequeue(n, t)
                };
            "inprogress" === u && (u = r.shift(), e--);
            u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function(n, t) {
            var u = t + "queueHooks";
            return r.get(n, u) || r.access(n, u, {
                empty: i.Callbacks("once memory").add(function() {
                    r.remove(n, [t + "queue", u])
                })
            })
        }
    });
    i.fn.extend({
        queue: function(n, t) {
            var r = 2;
            return "string" != typeof n && (t = n, n = "fx", r--), arguments.length < r ? i.queue(this[0], n) : void 0 === t ? this : this.each(function() {
                var r = i.queue(this, n, t);
                i._queueHooks(this, n);
                "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n)
            })
        },
        dequeue: function(n) {
            return this.each(function() {
                i.dequeue(this, n)
            })
        },
        clearQueue: function(n) {
            return this.queue(n || "fx", [])
        },
        promise: function(n, t) {
            var u, e = 1,
                o = i.Deferred(),
                f = this,
                s = this.length,
                h = function() {
                    --e || o.resolveWith(f, [f])
                };
            for ("string" != typeof n && (t = n, n = void 0), n = n || "fx"; s--;) u = r.get(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
            return h(), o.promise(t)
        }
    });
    var ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        p = ["Top", "Right", "Bottom", "Left"],
        tt = function(n, t) {
            return n = t || n, "none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
        },
        er = /^(?:checkbox|radio)$/i;
    ! function() {
        var i = u.createDocumentFragment(),
            n = i.appendChild(u.createElement("div")),
            t = u.createElement("input");
        t.setAttribute("type", "radio");
        t.setAttribute("checked", "checked");
        t.setAttribute("name", "t");
        n.appendChild(t);
        f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
        n.innerHTML = "<textarea>x<\/textarea>";
        f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue
    }();
    b = "undefined";
    f.focusinBubbles = "onfocusin" in n;
    var cf = /^key/,
        lf = /^(?:mouse|pointer|contextmenu)|click/,
        or = /^(?:focusinfocus|focusoutblur)$/,
        sr = /^([^.]*)(?:\.(.+)|)$/;
    i.event = {
        global: {},
        add: function(n, t, u, f, e) {
            var v, y, w, p, k, h, s, l, o, d, g, a = r.get(n);
            if (a)
                for (u.handler && (v = u, u = v.handler, e = v.selector), u.guid || (u.guid = i.guid++), (p = a.events) || (p = a.events = {}), (y = a.handle) || (y = a.handle = function(t) {
                        if (typeof i !== b && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
                    }), t = (t || "").match(c) || [""], k = t.length; k--;) w = sr.exec(t[k]) || [], o = g = w[1], d = (w[2] || "").split(".").sort(), o && (s = i.event.special[o] || {}, o = (e ? s.delegateType : s.bindType) || o, s = i.event.special[o] || {}, h = i.extend({
                    type: o,
                    origType: g,
                    data: f,
                    handler: u,
                    guid: u.guid,
                    selector: e,
                    needsContext: e && i.expr.match.needsContext.test(e),
                    namespace: d.join(".")
                }, v), (l = p[o]) || (l = p[o] = [], l.delegateCount = 0, s.setup && s.setup.call(n, f, d, y) !== !1 || n.addEventListener && n.addEventListener(o, y, !1)), s.add && (s.add.call(n, h), h.handler.guid || (h.handler.guid = u.guid)), e ? l.splice(l.delegateCount++, 0, h) : l.push(h), i.event.global[o] = !0)
        },
        remove: function(n, t, u, f, e) {
            var p, k, h, v, w, s, l, a, o, b, d, y = r.hasData(n) && r.get(n);
            if (y && (v = y.events)) {
                for (t = (t || "").match(c) || [""], w = t.length; w--;)
                    if (h = sr.exec(t[w]) || [], o = d = h[1], b = (h[2] || "").split(".").sort(), o) {
                        for (l = i.event.special[o] || {}, o = (f ? l.delegateType : l.bindType) || o, a = v[o] || [], h = h[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = p = a.length; p--;) s = a[p], !e && d !== s.origType || u && u.guid !== s.guid || h && !h.test(s.namespace) || f && f !== s.selector && ("**" !== f || !s.selector) || (a.splice(p, 1), s.selector && a.delegateCount--, l.remove && l.remove.call(n, s));
                        k && !a.length && (l.teardown && l.teardown.call(n, b, y.handle) !== !1 || i.removeEvent(n, o, y.handle), delete v[o])
                    } else
                        for (o in v) i.event.remove(n, o + t[w], u, f, !0);
                i.isEmptyObject(v) && (delete y.handle, r.remove(n, "events"))
            }
        },
        trigger: function(t, f, e, o) {
            var w, s, c, b, a, v, l, p = [e || u],
                h = ii.call(t, "type") ? t.type : t,
                y = ii.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = e = e || u, 3 !== e.nodeType && 8 !== e.nodeType && !or.test(h + i.event.triggered) && (h.indexOf(".") >= 0 && (y = h.split("."), h = y.shift(), y.sort()), a = h.indexOf(":") < 0 && "on" + h, t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = e), f = null == f ? [t] : i.makeArray(f, [t]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
                if (!o && !l.noBubble && !i.isWindow(e)) {
                    for (b = l.delegateType || h, or.test(b + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                    c === (e.ownerDocument || u) && p.push(c.defaultView || c.parentWindow || n)
                }
                for (w = 0;
                    (s = p[w++]) && !t.isPropagationStopped();) t.type = w > 1 ? b : l.bindType || h, v = (r.get(s, "events") || {})[t.type] && r.get(s, "handle"), v && v.apply(s, f), v = a && s[a], v && v.apply && i.acceptData(s) && (t.result = v.apply(s, f), t.result === !1 && t.preventDefault());
                return t.type = h, o || t.isDefaultPrevented() || l._default && l._default.apply(p.pop(), f) !== !1 || !i.acceptData(e) || a && i.isFunction(e[h]) && !i.isWindow(e) && (c = e[a], c && (e[a] = null), i.event.triggered = h, e[h](), i.event.triggered = void 0, c && (e[a] = c)), t.result
            }
        },
        dispatch: function(n) {
            n = i.event.fix(n);
            var o, s, e, u, t, h = [],
                c = a.call(arguments),
                l = (r.get(this, "events") || {})[n.type] || [],
                f = i.event.special[n.type] || {};
            if (c[0] = n, n.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, n) !== !1) {
                for (h = i.event.handlers.call(this, n, l), o = 0;
                    (u = h[o++]) && !n.isPropagationStopped();)
                    for (n.currentTarget = u.elem, s = 0;
                        (t = u.handlers[s++]) && !n.isImmediatePropagationStopped();)(!n.namespace_re || n.namespace_re.test(t.namespace)) && (n.handleObj = t, n.data = t.data, e = ((i.event.special[t.origType] || {}).handle || t.handler).apply(u.elem, c), void 0 !== e && (n.result = e) === !1 && (n.preventDefault(), n.stopPropagation()));
                return f.postDispatch && f.postDispatch.call(this, n), n.result
            }
        },
        handlers: function(n, t) {
            var e, u, f, o, h = [],
                s = t.delegateCount,
                r = n.target;
            if (s && r.nodeType && (!n.button || "click" !== n.type))
                for (; r !== this; r = r.parentNode || this)
                    if (r.disabled !== !0 || "click" !== n.type) {
                        for (u = [], e = 0; s > e; e++) o = t[e], f = o.selector + " ", void 0 === u[f] && (u[f] = o.needsContext ? i(f, this).index(r) >= 0 : i.find(f, this, null, [r]).length), u[f] && u.push(o);
                        u.length && h.push({
                            elem: r,
                            handlers: u
                        })
                    }
            return s < t.length && h.push({
                elem: this,
                handlers: t.slice(s)
            }), h
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(n, t) {
                return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode), n
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(n, t) {
                var e, i, r, f = t.button;
                return null == n.pageX && null != t.clientX && (e = n.target.ownerDocument || u, i = e.documentElement, r = e.body, n.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), n.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), n.which || void 0 === f || (n.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), n
            }
        },
        fix: function(n) {
            if (n[i.expando]) return n;
            var f, e, o, r = n.type,
                s = n,
                t = this.fixHooks[r];
            for (t || (this.fixHooks[r] = t = lf.test(r) ? this.mouseHooks : cf.test(r) ? this.keyHooks : {}), o = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(s), f = o.length; f--;) e = o[f], n[e] = s[e];
            return n.target || (n.target = u), 3 === n.target.nodeType && (n.target = n.target.parentNode), t.filter ? t.filter(n, s) : n
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== hr() && this.focus) return (this.focus(), !1)
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === hr() && this.blur) return (this.blur(), !1)
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && i.nodeName(this, "input")) return (this.click(), !1)
                },
                _default: function(n) {
                    return i.nodeName(n.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(n) {
                    void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result)
                }
            }
        },
        simulate: function(n, t, r, u) {
            var f = i.extend(new i.Event, r, {
                type: n,
                isSimulated: !0,
                originalEvent: {}
            });
            u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
            f.isDefaultPrevented() && r.preventDefault()
        }
    };
    i.removeEvent = function(n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i, !1)
    };
    i.Event = function(n, t) {
        return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || void 0 === n.defaultPrevented && n.returnValue === !1 ? lt : k) : this.type = n, t && i.extend(this, t), this.timeStamp = n && n.timeStamp || i.now(), void(this[i.expando] = !0)) : new i.Event(n, t)
    };
    i.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var n = this.originalEvent;
            this.isDefaultPrevented = lt;
            n && n.preventDefault && n.preventDefault()
        },
        stopPropagation: function() {
            var n = this.originalEvent;
            this.isPropagationStopped = lt;
            n && n.stopPropagation && n.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = lt;
            n && n.stopImmediatePropagation && n.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    i.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function(n) {
                var u, f = this,
                    r = n.relatedTarget,
                    e = n.handleObj;
                return (!r || r !== f && !i.contains(f, r)) && (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
            }
        }
    });
    f.focusinBubbles || i.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, t) {
        var u = function(n) {
            i.event.simulate(t, n.target, i.event.fix(n), !0)
        };
        i.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    f = r.access(i, t);
                f || i.addEventListener(n, u, !0);
                r.access(i, t, (f || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    f = r.access(i, t) - 1;
                f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t))
            }
        }
    });
    i.fn.extend({
        on: function(n, t, r, u, f) {
            var e, o;
            if ("object" == typeof n) {
                "string" != typeof t && (r = r || t, t = void 0);
                for (o in n) this.on(o, t, r, n[o], f);
                return this
            }
            if (null == r && null == u ? (u = t, r = t = void 0) : null == u && ("string" == typeof t ? (u = r, r = void 0) : (u = r, r = t, t = void 0)), u === !1) u = k;
            else if (!u) return this;
            return 1 === f && (e = u, u = function(n) {
                return i().off(n), e.apply(this, arguments)
            }, u.guid = e.guid || (e.guid = i.guid++)), this.each(function() {
                i.event.add(this, n, u, r, t)
            })
        },
        one: function(n, t, i, r) {
            return this.on(n, t, i, r, 1)
        },
        off: function(n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj) return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
            if ("object" == typeof n) {
                for (f in n) this.off(f, t, n[f]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = k), this.each(function() {
                i.event.remove(this, n, r, t)
            })
        },
        trigger: function(n, t) {
            return this.each(function() {
                i.event.trigger(n, t, this)
            })
        },
        triggerHandler: function(n, t) {
            var r = this[0];
            if (r) return i.event.trigger(n, t, r, !0)
        }
    });
    var cr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        lr = /<([\w:]+)/,
        af = /<|&#?\w+;/,
        vf = /<(?:script|style|link)/i,
        yf = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ar = /^$|\/(?:java|ecma)script/i,
        pf = /^true\/(.*)/,
        wf = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        h = {
            option: [1, "<select multiple='multiple'>", "<\/select>"],
            thead: [1, "<table>", "<\/table>"],
            col: [2, "<table><colgroup>", "<\/colgroup><\/table>"],
            tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
            td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
            _default: [0, "", ""]
        };
    h.optgroup = h.option;
    h.tbody = h.tfoot = h.colgroup = h.caption = h.thead;
    h.th = h.td;
    i.extend({
        clone: function(n, t, r) {
            var u, c, s, e, h = n.cloneNode(!0),
                l = i.contains(n.ownerDocument, n);
            if (!(f.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
                for (e = o(h), s = o(n), u = 0, c = s.length; c > u; u++) df(s[u], e[u]);
            if (t)
                if (r)
                    for (s = s || o(n), e = e || o(h), u = 0, c = s.length; c > u; u++) yr(s[u], e[u]);
                else yr(n, h);
            return e = o(h, "script"), e.length > 0 && ei(e, !l && o(n, "script")), h
        },
        buildFragment: function(n, t, r, u) {
            for (var f, e, y, l, p, a, s = t.createDocumentFragment(), v = [], c = 0, w = n.length; w > c; c++)
                if (f = n[c], f || 0 === f)
                    if ("object" === i.type(f)) i.merge(v, f.nodeType ? [f] : f);
                    else if (af.test(f)) {
                for (e = e || s.appendChild(t.createElement("div")), y = (lr.exec(f) || ["", ""])[1].toLowerCase(), l = h[y] || h._default, e.innerHTML = l[1] + f.replace(cr, "<$1><\/$2>") + l[2], a = l[0]; a--;) e = e.lastChild;
                i.merge(v, e.childNodes);
                e = s.firstChild;
                e.textContent = ""
            } else v.push(t.createTextNode(f));
            for (s.textContent = "", c = 0; f = v[c++];)
                if ((!u || -1 === i.inArray(f, u)) && (p = i.contains(f.ownerDocument, f), e = o(s.appendChild(f), "script"), p && ei(e), r))
                    for (a = 0; f = e[a++];) ar.test(f.type || "") && r.push(f);
            return s
        },
        cleanData: function(n) {
            for (var f, t, o, u, h = i.event.special, s = 0; void 0 !== (t = n[s]); s++) {
                if (i.acceptData(t) && (u = t[r.expando], u && (f = r.cache[u]))) {
                    if (f.events)
                        for (o in f.events) h[o] ? i.event.remove(t, o) : i.removeEvent(t, o, f.handle);
                    r.cache[u] && delete r.cache[u]
                }
                delete e.cache[t[e.expando]]
            }
        }
    });
    i.fn.extend({
        text: function(n) {
            return l(this, function(n) {
                return void 0 === n ? i.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = n)
                })
            }, null, n, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = vr(this, n);
                    t.appendChild(n)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = vr(this, n);
                    t.insertBefore(n, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
            })
        },
        remove: function(n, t) {
            for (var r, f = n ? i.filter(n, this) : this, u = 0; null != (r = f[u]); u++) t || 1 !== r.nodeType || i.cleanData(o(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && ei(o(r, "script")), r.parentNode.removeChild(r));
            return this
        },
        empty: function() {
            for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(o(n, !1)), n.textContent = "");
            return this
        },
        clone: function(n, t) {
            return n = null == n ? !1 : n, t = null == t ? n : t, this.map(function() {
                return i.clone(this, n, t)
            })
        },
        html: function(n) {
            return l(this, function(n) {
                var t = this[0] || {},
                    r = 0,
                    u = this.length;
                if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof n && !vf.test(n) && !h[(lr.exec(n) || ["", ""])[1].toLowerCase()]) {
                    n = n.replace(cr, "<$1><\/$2>");
                    try {
                        for (; u > r; r++) t = this[r] || {}, 1 === t.nodeType && (i.cleanData(o(t, !1)), t.innerHTML = n);
                        t = 0
                    } catch (f) {}
                }
                t && this.empty().append(n)
            }, null, n, arguments.length)
        },
        replaceWith: function() {
            var n = arguments[0];
            return this.domManip(arguments, function(t) {
                n = this.parentNode;
                i.cleanData(o(this));
                n && n.replaceChild(t, this)
            }), n && (n.length || n.nodeType) ? this : this.remove()
        },
        detach: function(n) {
            return this.remove(n, !0)
        },
        domManip: function(n, t) {
            n = bi.apply([], n);
            var h, v, s, c, u, y, e = 0,
                l = this.length,
                w = this,
                b = l - 1,
                a = n[0],
                p = i.isFunction(a);
            if (p || l > 1 && "string" == typeof a && !f.checkClone && yf.test(a)) return this.each(function(i) {
                var r = w.eq(i);
                p && (n[0] = a.call(this, i, r.html()));
                r.domManip(n, t)
            });
            if (l && (h = i.buildFragment(n, this[0].ownerDocument, !1, this), v = h.firstChild, 1 === h.childNodes.length && (h = v), v)) {
                for (s = i.map(o(h, "script"), bf), c = s.length; l > e; e++) u = h, e !== b && (u = i.clone(u, !0, !0), c && i.merge(s, o(u, "script"))), t.call(this[e], u, e);
                if (c)
                    for (y = s[s.length - 1].ownerDocument, i.map(s, kf), e = 0; c > e; e++) u = s[e], ar.test(u.type || "") && !r.access(u, "globalEval") && i.contains(y, u) && (u.src ? i._evalUrl && i._evalUrl(u.src) : i.globalEval(u.textContent.replace(wf, "")))
            }
            return this
        }
    });
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(n, t) {
        i.fn[n] = function(n) {
            for (var u, f = [], e = i(n), o = e.length - 1, r = 0; o >= r; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), ti.apply(f, u.get());
            return this.pushStack(f)
        }
    });
    oi = {};
    var wr = /^margin/,
        hi = new RegExp("^(" + ct + ")(?!px)[a-z%]+$", "i"),
        vt = function(t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : n.getComputedStyle(t, null)
        };
    ! function() {
        var s, o, e = u.documentElement,
            r = u.createElement("div"),
            t = u.createElement("div");
        if (t.style) {
            t.style.backgroundClip = "content-box";
            t.cloneNode(!0).style.backgroundClip = "";
            f.clearCloneStyle = "content-box" === t.style.backgroundClip;
            r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute";
            r.appendChild(t);

            function h() {
                t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
                t.innerHTML = "";
                e.appendChild(r);
                var i = n.getComputedStyle(t, null);
                s = "1%" !== i.top;
                o = "4px" === i.width;
                e.removeChild(r)
            }
            n.getComputedStyle && i.extend(f, {
                pixelPosition: function() {
                    return h(), s
                },
                boxSizingReliable: function() {
                    return null == o && h(), o
                },
                reliableMarginRight: function() {
                    var f, i = t.appendChild(u.createElement("div"));
                    return i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", e.appendChild(r), f = !parseFloat(n.getComputedStyle(i, null).marginRight), e.removeChild(r), t.removeChild(i), f
                }
            })
        }
    }();
    i.swap = function(n, t, i, r) {
        var f, u, e = {};
        for (u in t) e[u] = n.style[u], n.style[u] = t[u];
        f = i.apply(n, r || []);
        for (u in t) n.style[u] = e[u];
        return f
    };
    var gf = /^(none|table(?!-c[ea]).+)/,
        ne = new RegExp("^(" + ct + ")(.*)$", "i"),
        te = new RegExp("^([+-])=(" + ct + ")", "i"),
        ie = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        kr = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        dr = ["Webkit", "O", "Moz", "ms"];
    i.extend({
        cssHooks: {
            opacity: {
                get: function(n, t) {
                    if (t) {
                        var i = it(n, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(n, t, r, u) {
            if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                var o, h, e, s = i.camelCase(t),
                    c = n.style;
                return t = i.cssProps[s] || (i.cssProps[s] = gr(c, s)), e = i.cssHooks[t] || i.cssHooks[s], void 0 === r ? e && "get" in e && void 0 !== (o = e.get(n, !1, u)) ? o : c[t] : (h = typeof r, "string" === h && (o = te.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(i.css(n, t)), h = "number"), null != r && r === r && ("number" !== h || i.cssNumber[s] || (r += "px"), f.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (c[t] = "inherit"), e && "set" in e && void 0 === (r = e.set(n, r, u)) || (c[t] = r)), void 0)
            }
        },
        css: function(n, t, r, u) {
            var f, s, e, o = i.camelCase(t);
            return t = i.cssProps[o] || (i.cssProps[o] = gr(n.style, o)), e = i.cssHooks[t] || i.cssHooks[o], e && "get" in e && (f = e.get(n, !0, r)), void 0 === f && (f = it(n, t, u)), "normal" === f && t in kr && (f = kr[t]), "" === r || r ? (s = parseFloat(f), r === !0 || i.isNumeric(s) ? s || 0 : f) : f
        }
    });
    i.each(["height", "width"], function(n, t) {
        i.cssHooks[t] = {
            get: function(n, r, u) {
                if (r) return gf.test(i.css(n, "display")) && 0 === n.offsetWidth ? i.swap(n, ie, function() {
                    return iu(n, t, u)
                }) : iu(n, t, u)
            },
            set: function(n, r, u) {
                var f = u && vt(n);
                return nu(n, r, u ? tu(n, t, u, "border-box" === i.css(n, "boxSizing", !1, f), f) : 0)
            }
        }
    });
    i.cssHooks.marginRight = br(f.reliableMarginRight, function(n, t) {
        if (t) return i.swap(n, {
            display: "inline-block"
        }, it, [n, "marginRight"])
    });
    i.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(n, t) {
        i.cssHooks[n + t] = {
            expand: function(i) {
                for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) f[n + p[r] + t] = u[r] || u[r - 2] || u[0];
                return f
            }
        };
        wr.test(n) || (i.cssHooks[n + t].set = nu)
    });
    i.fn.extend({
        css: function(n, t) {
            return l(this, function(n, t, r) {
                var f, e, o = {},
                    u = 0;
                if (i.isArray(t)) {
                    for (f = vt(n), e = t.length; e > u; u++) o[t[u]] = i.css(n, t[u], !1, f);
                    return o
                }
                return void 0 !== r ? i.style(n, t, r) : i.css(n, t)
            }, n, t, arguments.length > 1)
        },
        show: function() {
            return ru(this, !0)
        },
        hide: function() {
            return ru(this)
        },
        toggle: function(n) {
            return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function() {
                tt(this) ? i(this).show() : i(this).hide()
            })
        }
    });
    i.Tween = s;
    s.prototype = {
        constructor: s,
        init: function(n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px")
        },
        cur: function() {
            var n = s.propHooks[this.prop];
            return n && n.get ? n.get(this) : s.propHooks._default.get(this)
        },
        run: function(n) {
            var t, r = s.propHooks[this.prop];
            return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : s.propHooks._default.set(this), this
        }
    };
    s.prototype.init.prototype = s.prototype;
    s.propHooks = {
        _default: {
            get: function(n) {
                var t;
                return null == n.elem[n.prop] || n.elem.style && null != n.elem.style[n.prop] ? (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0) : n.elem[n.prop]
            },
            set: function(n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (null != n.elem.style[i.cssProps[n.prop]] || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
            }
        }
    };
    s.propHooks.scrollTop = s.propHooks.scrollLeft = {
        set: function(n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
        }
    };
    i.easing = {
        linear: function(n) {
            return n
        },
        swing: function(n) {
            return .5 - Math.cos(n * Math.PI) / 2
        }
    };
    i.fx = s.prototype.init;
    i.fx.step = {};
    var d, yt, re = /^(?:toggle|show|hide)$/,
        uu = new RegExp("^(?:([+-])=|)(" + ct + ")([a-z%]*)$", "i"),
        ue = /queueHooks$/,
        pt = [fe],
        rt = {
            "*": [function(n, t) {
                var f = this.createTween(n, t),
                    s = f.cur(),
                    r = uu.exec(t),
                    e = r && r[3] || (i.cssNumber[n] ? "" : "px"),
                    u = (i.cssNumber[n] || "px" !== e && +s) && uu.exec(i.css(f.elem, n)),
                    o = 1,
                    h = 20;
                if (u && u[3] !== e) {
                    e = e || u[3];
                    r = r || [];
                    u = +s || 1;
                    do o = o || ".5", u /= o, i.style(f.elem, n, u + e); while (o !== (o = f.cur() / s) && 1 !== o && --h)
                }
                return r && (u = f.start = +u || +s || 0, f.unit = e, f.end = r[1] ? u + (r[1] + 1) * r[2] : +r[2]), f
            }]
        };
    i.Animation = i.extend(ou, {
        tweener: function(n, t) {
            i.isFunction(n) ? (t = n, n = ["*"]) : n = n.split(" ");
            for (var r, u = 0, f = n.length; f > u; u++) r = n[u], rt[r] = rt[r] || [], rt[r].unshift(t)
        },
        prefilter: function(n, t) {
            t ? pt.unshift(n) : pt.push(n)
        }
    });
    i.speed = function(n, t, r) {
        var u = n && "object" == typeof n ? i.extend({}, n) : {
            complete: r || !r && t || i.isFunction(n) && n,
            duration: n,
            easing: r && t || t && !i.isFunction(t) && t
        };
        return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (null == u.queue || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
            i.isFunction(u.old) && u.old.call(this);
            u.queue && i.dequeue(this, u.queue)
        }, u
    };
    i.fn.extend({
        fadeTo: function(n, t, i, r) {
            return this.filter(tt).css("opacity", 0).show().end().animate({
                opacity: t
            }, n, i, r)
        },
        animate: function(n, t, u, f) {
            var s = i.isEmptyObject(n),
                o = i.speed(t, u, f),
                e = function() {
                    var t = ou(this, i.extend({}, n), o);
                    (s || r.get(this, "finish")) && t.stop(!0)
                };
            return e.finish = e, s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
        },
        stop: function(n, t, u) {
            var f = function(n) {
                var t = n.stop;
                delete n.stop;
                t(u)
            };
            return "string" != typeof n && (u = t, t = n, n = void 0), t && n !== !1 && this.queue(n || "fx", []), this.each(function() {
                var s = !0,
                    t = null != n && n + "queueHooks",
                    o = i.timers,
                    e = r.get(this);
                if (t) e[t] && e[t].stop && f(e[t]);
                else
                    for (t in e) e[t] && e[t].stop && ue.test(t) && f(e[t]);
                for (t = o.length; t--;) o[t].elem !== this || null != n && o[t].queue !== n || (o[t].anim.stop(u), s = !1, o.splice(t, 1));
                (s || !u) && i.dequeue(this, n)
            })
        },
        finish: function(n) {
            return n !== !1 && (n = n || "fx"), this.each(function() {
                var t, e = r.get(this),
                    u = e[n + "queue"],
                    o = e[n + "queueHooks"],
                    f = i.timers,
                    s = u ? u.length : 0;
                for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--;) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
                for (t = 0; s > t; t++) u[t] && u[t].finish && u[t].finish.call(this);
                delete e.finish
            })
        }
    });
    i.each(["toggle", "show", "hide"], function(n, t) {
        var r = i.fn[t];
        i.fn[t] = function(n, i, u) {
            return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(wt(t, !0), n, i, u)
        }
    });
    i.each({
        slideDown: wt("show"),
        slideUp: wt("hide"),
        slideToggle: wt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(n, t) {
        i.fn[n] = function(n, i, r) {
            return this.animate(t, n, i, r)
        }
    });
    i.timers = [];
    i.fx.tick = function() {
        var r, n = 0,
            t = i.timers;
        for (d = i.now(); n < t.length; n++) r = t[n], r() || t[n] !== r || t.splice(n--, 1);
        t.length || i.fx.stop();
        d = void 0
    };
    i.fx.timer = function(n) {
        i.timers.push(n);
        n() ? i.fx.start() : i.timers.pop()
    };
    i.fx.interval = 13;
    i.fx.start = function() {
        yt || (yt = setInterval(i.fx.tick, i.fx.interval))
    };
    i.fx.stop = function() {
        clearInterval(yt);
        yt = null
    };
    i.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    i.fn.delay = function(n, t) {
            return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function(t, i) {
                var r = setTimeout(t, n);
                i.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var n = u.createElement("input"),
                t = u.createElement("select"),
                i = t.appendChild(u.createElement("option"));
            n.type = "checkbox";
            f.checkOn = "" !== n.value;
            f.optSelected = i.selected;
            t.disabled = !0;
            f.optDisabled = !i.disabled;
            n = u.createElement("input");
            n.value = "t";
            n.type = "radio";
            f.radioValue = "t" === n.value
        }();
    g = i.expr.attrHandle;
    i.fn.extend({
        attr: function(n, t) {
            return l(this, i.attr, n, t, arguments.length > 1)
        },
        removeAttr: function(n) {
            return this.each(function() {
                i.removeAttr(this, n)
            })
        }
    });
    i.extend({
        attr: function(n, t, r) {
            var u, f, e = n.nodeType;
            if (n && 3 !== e && 8 !== e && 2 !== e) return typeof n.getAttribute === b ? i.prop(n, t, r) : (1 === e && i.isXMLDoc(n) || (t = t.toLowerCase(), u = i.attrHooks[t] || (i.expr.match.bool.test(t) ? su : oe)), void 0 === r ? u && "get" in u && null !== (f = u.get(n, t)) ? f : (f = i.find.attr(n, t), null == f ? void 0 : f) : null !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : (n.setAttribute(t, r + ""), r) : void i.removeAttr(n, t))
        },
        removeAttr: function(n, t) {
            var r, u, e = 0,
                f = t && t.match(c);
            if (f && 1 === n.nodeType)
                while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) && (n[u] = !1), n.removeAttribute(r)
        },
        attrHooks: {
            type: {
                set: function(n, t) {
                    if (!f.radioValue && "radio" === t && i.nodeName(n, "input")) {
                        var r = n.value;
                        return n.setAttribute("type", t), r && (n.value = r), t
                    }
                }
            }
        }
    });
    su = {
        set: function(n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r
        }
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function(n, t) {
        var r = g[t] || i.find.attr;
        g[t] = function(n, t, i) {
            var u, f;
            return i || (f = g[t], g[t] = u, u = null != r(n, t, i) ? t.toLowerCase() : null, g[t] = f), u
        }
    });
    hu = /^(?:input|select|textarea|button)$/i;
    i.fn.extend({
        prop: function(n, t) {
            return l(this, i.prop, n, t, arguments.length > 1)
        },
        removeProp: function(n) {
            return this.each(function() {
                delete this[i.propFix[n] || n]
            })
        }
    });
    i.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(n, t, r) {
            var f, u, o, e = n.nodeType;
            if (n && 3 !== e && 8 !== e && 2 !== e) return o = 1 !== e || !i.isXMLDoc(n), o && (t = i.propFix[t] || t, u = i.propHooks[t]), void 0 !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : n[t] = r : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
        },
        propHooks: {
            tabIndex: {
                get: function(n) {
                    return n.hasAttribute("tabindex") || hu.test(n.nodeName) || n.href ? n.tabIndex : -1
                }
            }
        }
    });
    f.optSelected || (i.propHooks.selected = {
        get: function(n) {
            var t = n.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        i.propFix[this.toLowerCase()] = this
    });
    bt = /[\t\r\n\f]/g;
    i.fn.extend({
        addClass: function(n) {
            var o, t, r, u, s, f, h = "string" == typeof n && n,
                e = 0,
                l = this.length;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).addClass(n.call(this, t, this.className))
            });
            if (h)
                for (o = (n || "").match(c) || []; l > e; e++)
                    if (t = this[e], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(bt, " ") : " ")) {
                        for (s = 0; u = o[s++];) r.indexOf(" " + u + " ") < 0 && (r += u + " ");
                        f = i.trim(r);
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        removeClass: function(n) {
            var o, t, r, u, s, f, h = 0 === arguments.length || "string" == typeof n && n,
                e = 0,
                l = this.length;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).removeClass(n.call(this, t, this.className))
            });
            if (h)
                for (o = (n || "").match(c) || []; l > e; e++)
                    if (t = this[e], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(bt, " ") : "")) {
                        for (s = 0; u = o[s++];)
                            while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
                        f = n ? i.trim(r) : "";
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        toggleClass: function(n, t) {
            var u = typeof n;
            return "boolean" == typeof t && "string" === u ? t ? this.addClass(n) : this.removeClass(n) : this.each(i.isFunction(n) ? function(r) {
                i(this).toggleClass(n.call(this, r, this.className, t), t)
            } : function() {
                if ("string" === u)
                    for (var t, e = 0, f = i(this), o = n.match(c) || []; t = o[e++];) f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
                else(u === b || "boolean" === u) && (this.className && r.set(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : r.get(this, "__className__") || "")
            })
        },
        hasClass: function(n) {
            for (var i = " " + n + " ", t = 0, r = this.length; r > t; t++)
                if (1 === this[t].nodeType && (" " + this[t].className + " ").replace(bt, " ").indexOf(i) >= 0) return !0;
            return !1
        }
    });
    cu = /\r/g;
    i.fn.extend({
        val: function(n) {
            var t, r, f, u = this[0];
            return arguments.length ? (f = i.isFunction(n), this.each(function(r) {
                var u;
                1 === this.nodeType && (u = f ? n.call(this, r, i(this).val()) : n, null == u ? u = "" : "number" == typeof u ? u += "" : i.isArray(u) && (u = i.map(u, function(n) {
                    return null == n ? "" : n + ""
                })), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, u, "value") || (this.value = u))
            })) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(u, "value")) ? r : (r = u.value, "string" == typeof r ? r.replace(cu, "") : null == r ? "" : r)) : void 0
        }
    });
    i.extend({
        valHooks: {
            option: {
                get: function(n) {
                    var t = i.find.attr(n, "value");
                    return null != t ? t : i.trim(i.text(n))
                }
            },
            select: {
                get: function(n) {
                    for (var o, t, s = n.options, r = n.selectedIndex, u = "select-one" === n.type || 0 > r, h = u ? null : [], c = u ? r + 1 : s.length, e = 0 > r ? c : u ? r : 0; c > e; e++)
                        if (t = s[e], !(!t.selected && e !== r || (f.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && i.nodeName(t.parentNode, "optgroup"))) {
                            if (o = i(t).val(), u) return o;
                            h.push(o)
                        }
                    return h
                },
                set: function(n, t) {
                    for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(r.value, e) >= 0) && (u = !0);
                    return u || (n.selectedIndex = -1), e
                }
            }
        }
    });
    i.each(["radio", "checkbox"], function() {
        i.valHooks[this] = {
            set: function(n, t) {
                if (i.isArray(t)) return n.checked = i.inArray(i(n).val(), t) >= 0
            }
        };
        f.checkOn || (i.valHooks[this].get = function(n) {
            return null === n.getAttribute("value") ? "on" : n.value
        })
    });
    i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
        i.fn[t] = function(n, i) {
            return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
        }
    });
    i.fn.extend({
        hover: function(n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        },
        bind: function(n, t, i) {
            return this.on(n, null, t, i)
        },
        unbind: function(n, t) {
            return this.off(n, null, t)
        },
        delegate: function(n, t, i, r) {
            return this.on(t, n, i, r)
        },
        undelegate: function(n, t, i) {
            return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
        }
    });
    kt = i.now();
    dt = /\?/;
    i.parseJSON = function(n) {
        return JSON.parse(n + "")
    };
    i.parseXML = function(n) {
        var t, r;
        if (!n || "string" != typeof n) return null;
        try {
            r = new DOMParser;
            t = r.parseFromString(n, "text/xml")
        } catch (u) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n), t
    };
    var se = /#.*$/,
        lu = /([?&])_=[^&]*/,
        he = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        ce = /^(?:GET|HEAD)$/,
        le = /^\/\//,
        au = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        vu = {},
        ci = {},
        yu = "*/".concat("*"),
        li = n.location.href,
        nt = au.exec(li.toLowerCase()) || [];
    i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: li,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(nt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": yu,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": i.parseJSON,
                "text xml": i.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(n, t) {
            return t ? ai(ai(n, i.ajaxSettings), t) : ai(i.ajaxSettings, n)
        },
        ajaxPrefilter: pu(vu),
        ajaxTransport: pu(ci),
        ajax: function(n, t) {
            function p(n, t, s, h) {
                var v, it, tt, p, nt, c = t;
                2 !== e && (e = 2, b && clearTimeout(b), l = void 0, w = h || "", u.readyState = n > 0 ? 4 : 0, v = n >= 200 && 300 > n || 304 === n, s && (p = ae(r, u, s)), p = ve(r, p, u, v), v ? (r.ifModified && (nt = u.getResponseHeader("Last-Modified"), nt && (i.lastModified[f] = nt), nt = u.getResponseHeader("etag"), nt && (i.etag[f] = nt)), 204 === n || "HEAD" === r.type ? c = "nocontent" : 304 === n ? c = "notmodified" : (c = p.state, it = p.data, tt = p.error, v = !tt)) : (tt = c, (n || !c) && (c = "error", 0 > n && (n = 0))), u.status = n, u.statusText = (t || c) + "", v ? d.resolveWith(o, [it, c, u]) : d.rejectWith(o, [u, c, tt]), u.statusCode(y), y = void 0, a && k.trigger(v ? "ajaxSuccess" : "ajaxError", [u, r, v ? it : tt]), g.fireWith(o, [u, c]), a && (k.trigger("ajaxComplete", [u, r]), --i.active || i.event.trigger("ajaxStop")))
            }
            "object" == typeof n && (t = n, n = void 0);
            t = t || {};
            var l, f, w, v, b, s, a, h, r = i.ajaxSetup({}, t),
                o = r.context || r,
                k = r.context && (o.nodeType || o.jquery) ? i(o) : i.event,
                d = i.Deferred(),
                g = i.Callbacks("once memory"),
                y = r.statusCode || {},
                tt = {},
                it = {},
                e = 0,
                rt = "canceled",
                u = {
                    readyState: 0,
                    getResponseHeader: function(n) {
                        var t;
                        if (2 === e) {
                            if (!v)
                                for (v = {}; t = he.exec(w);) v[t[1].toLowerCase()] = t[2];
                            t = v[n.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === e ? w : null
                    },
                    setRequestHeader: function(n, t) {
                        var i = n.toLowerCase();
                        return e || (n = it[i] = it[i] || n, tt[n] = t), this
                    },
                    overrideMimeType: function(n) {
                        return e || (r.mimeType = n), this
                    },
                    statusCode: function(n) {
                        var t;
                        if (n)
                            if (2 > e)
                                for (t in n) y[t] = [y[t], n[t]];
                            else u.always(n[u.status]);
                        return this
                    },
                    abort: function(n) {
                        var t = n || rt;
                        return l && l.abort(t), p(0, t), this
                    }
                };
            if (d.promise(u).complete = g.add, u.success = u.done, u.error = u.fail, r.url = ((n || r.url || li) + "").replace(se, "").replace(le, nt[1] + "//"), r.type = t.method || t.type || r.method || r.type, r.dataTypes = i.trim(r.dataType || "*").toLowerCase().match(c) || [""], null == r.crossDomain && (s = au.exec(r.url.toLowerCase()), r.crossDomain = !(!s || s[1] === nt[1] && s[2] === nt[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (nt[3] || ("http:" === nt[1] ? "80" : "443")))), r.data && r.processData && "string" != typeof r.data && (r.data = i.param(r.data, r.traditional)), wu(vu, r, t, u), 2 === e) return u;
            a = i.event && r.global;
            a && 0 == i.active++ && i.event.trigger("ajaxStart");
            r.type = r.type.toUpperCase();
            r.hasContent = !ce.test(r.type);
            f = r.url;
            r.hasContent || (r.data && (f = r.url += (dt.test(f) ? "&" : "?") + r.data, delete r.data), r.cache === !1 && (r.url = lu.test(f) ? f.replace(lu, "$1_=" + kt++) : f + (dt.test(f) ? "&" : "?") + "_=" + kt++));
            r.ifModified && (i.lastModified[f] && u.setRequestHeader("If-Modified-Since", i.lastModified[f]), i.etag[f] && u.setRequestHeader("If-None-Match", i.etag[f]));
            (r.data && r.hasContent && r.contentType !== !1 || t.contentType) && u.setRequestHeader("Content-Type", r.contentType);
            u.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + ("*" !== r.dataTypes[0] ? ", " + yu + "; q=0.01" : "") : r.accepts["*"]);
            for (h in r.headers) u.setRequestHeader(h, r.headers[h]);
            if (r.beforeSend && (r.beforeSend.call(o, u, r) === !1 || 2 === e)) return u.abort();
            rt = "abort";
            for (h in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[h](r[h]);
            if (l = wu(ci, r, t, u)) {
                u.readyState = 1;
                a && k.trigger("ajaxSend", [u, r]);
                r.async && r.timeout > 0 && (b = setTimeout(function() {
                    u.abort("timeout")
                }, r.timeout));
                try {
                    e = 1;
                    l.send(tt, p)
                } catch (ut) {
                    if (!(2 > e)) throw ut;
                    p(-1, ut)
                }
            } else p(-1, "No Transport");
            return u
        },
        getJSON: function(n, t, r) {
            return i.get(n, t, r, "json")
        },
        getScript: function(n, t) {
            return i.get(n, void 0, t, "script")
        }
    });
    i.each(["get", "post"], function(n, t) {
        i[t] = function(n, r, u, f) {
            return i.isFunction(r) && (f = f || u, u = r, r = void 0), i.ajax({
                url: n,
                type: t,
                dataType: f,
                data: r,
                success: u
            })
        }
    });
    i._evalUrl = function(n) {
        return i.ajax({
            url: n,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    };
    i.fn.extend({
        wrapAll: function(n) {
            var t;
            return i.isFunction(n) ? this.each(function(t) {
                i(this).wrapAll(n.call(this, t))
            }) : (this[0] && (t = i(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var n = this; n.firstElementChild;) n = n.firstElementChild;
                return n
            }).append(this)), this)
        },
        wrapInner: function(n) {
            return this.each(i.isFunction(n) ? function(t) {
                i(this).wrapInner(n.call(this, t))
            } : function() {
                var t = i(this),
                    r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n)
            })
        },
        wrap: function(n) {
            var t = i.isFunction(n);
            return this.each(function(r) {
                i(this).wrapAll(t ? n.call(this, r) : n)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    i.expr.filters.hidden = function(n) {
        return n.offsetWidth <= 0 && n.offsetHeight <= 0
    };
    i.expr.filters.visible = function(n) {
        return !i.expr.filters.hidden(n)
    };
    var ye = /%20/g,
        pe = /\[\]$/,
        bu = /\r?\n/g,
        we = /^(?:submit|button|image|reset|file)$/i,
        be = /^(?:input|select|textarea|keygen)/i;
    i.param = function(n, t) {
        var r, u = [],
            f = function(n, t) {
                t = i.isFunction(t) ? t() : null == t ? "" : t;
                u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function() {
            f(this.name, this.value)
        });
        else
            for (r in n) vi(r, n[r], t, f);
        return u.join("&").replace(ye, "+")
    };
    i.fn.extend({
        serialize: function() {
            return i.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this
            }).filter(function() {
                var n = this.type;
                return this.name && !i(this).is(":disabled") && be.test(this.nodeName) && !we.test(n) && (this.checked || !er.test(n))
            }).map(function(n, t) {
                var r = i(this).val();
                return null == r ? null : i.isArray(r) ? i.map(r, function(n) {
                    return {
                        name: t.name,
                        value: n.replace(bu, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: r.replace(bu, "\r\n")
                }
            }).get()
        }
    });
    i.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (n) {}
    };
    var ke = 0,
        gt = {},
        de = {
            0: 200,
            1223: 204
        },
        ut = i.ajaxSettings.xhr();
    return n.attachEvent && n.attachEvent("onunload", function() {
        for (var n in gt) gt[n]()
    }), f.cors = !!ut && "withCredentials" in ut, f.ajax = ut = !!ut, i.ajaxTransport(function(n) {
        var t;
        if (f.cors || ut && !n.crossDomain) return {
            send: function(i, r) {
                var f, u = n.xhr(),
                    e = ++ke;
                if (u.open(n.type, n.url, n.async, n.username, n.password), n.xhrFields)
                    for (f in n.xhrFields) u[f] = n.xhrFields[f];
                n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType);
                n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (f in i) u.setRequestHeader(f, i[f]);
                t = function(n) {
                    return function() {
                        t && (delete gt[e], t = u.onload = u.onerror = null, "abort" === n ? u.abort() : "error" === n ? r(u.status, u.statusText) : r(de[u.status] || u.status, u.statusText, "string" == typeof u.responseText ? {
                            text: u.responseText
                        } : void 0, u.getAllResponseHeaders()))
                    }
                };
                u.onload = t();
                u.onerror = t("error");
                t = gt[e] = t("abort");
                try {
                    u.send(n.hasContent && n.data || null)
                } catch (o) {
                    if (t) throw o;
                }
            },
            abort: function() {
                t && t()
            }
        }
    }), i.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(n) {
                return i.globalEval(n), n
            }
        }
    }), i.ajaxPrefilter("script", function(n) {
        void 0 === n.cache && (n.cache = !1);
        n.crossDomain && (n.type = "GET")
    }), i.ajaxTransport("script", function(n) {
        if (n.crossDomain) {
            var r, t;
            return {
                send: function(f, e) {
                    r = i("<script>").prop({
                        async: !0,
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", t = function(n) {
                        r.remove();
                        t = null;
                        n && e("error" === n.type ? 404 : 200, n.type)
                    });
                    u.head.appendChild(r[0])
                },
                abort: function() {
                    t && t()
                }
            }
        }
    }), yi = [], ni = /(=)\?(?=&|$)|\?\?/, i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var n = yi.pop() || i.expando + "_" + kt++;
            return this[n] = !0, n
        }
    }), i.ajaxPrefilter("json jsonp", function(t, r, u) {
        var f, o, e, s = t.jsonp !== !1 && (ni.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ni, "$1" + f) : t.jsonp !== !1 && (t.url += (dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function() {
            return e || i.error(f + " was not called"), e[0]
        }, t.dataTypes[0] = "json", o = n[f], n[f] = function() {
            e = arguments
        }, u.always(function() {
            n[f] = o;
            t[f] && (t.jsonpCallback = r.jsonpCallback, yi.push(f));
            e && i.isFunction(o) && o(e[0]);
            e = o = void 0
        }), "script")
    }), i.parseHTML = function(n, t, r) {
        if (!n || "string" != typeof n) return null;
        "boolean" == typeof t && (r = t, t = !1);
        t = t || u;
        var f = gi.exec(n),
            e = !r && [];
        return f ? [t.createElement(f[1])] : (f = i.buildFragment([n], t, e), e && e.length && i(e).remove(), i.merge([], f.childNodes))
    }, pi = i.fn.load, i.fn.load = function(n, t, r) {
        if ("string" != typeof n && pi) return pi.apply(this, arguments);
        var u, o, s, f = this,
            e = n.indexOf(" ");
        return e >= 0 && (u = i.trim(n.slice(e)), n = n.slice(0, e)), i.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (o = "POST"), f.length > 0 && i.ajax({
            url: n,
            type: o,
            dataType: "html",
            data: t
        }).done(function(n) {
            s = arguments;
            f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n)
        }).complete(r && function(n, t) {
            f.each(r, s || [n.responseText, t, n])
        }), this
    }, i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
        i.fn[t] = function(n) {
            return this.on(t, n)
        }
    }), i.expr.filters.animated = function(n) {
        return i.grep(i.timers, function(t) {
            return n === t.elem
        }).length
    }, wi = n.document.documentElement, i.offset = {
        setOffset: function(n, t, r) {
            var e, o, s, h, u, c, v, l = i.css(n, "position"),
                a = i(n),
                f = {};
            "static" === l && (n.style.position = "relative");
            u = a.offset();
            s = i.css(n, "top");
            c = i.css(n, "left");
            v = ("absolute" === l || "fixed" === l) && (s + c).indexOf("auto") > -1;
            v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
            i.isFunction(t) && (t = t.call(n, r, u));
            null != t.top && (f.top = t.top - u.top + h);
            null != t.left && (f.left = t.left - u.left + o);
            "using" in t ? t.using.call(n, f) : a.css(f)
        }
    }, i.fn.extend({
        offset: function(n) {
            if (arguments.length) return void 0 === n ? this : this.each(function(t) {
                i.offset.setOffset(this, n, t)
            });
            var r, f, t = this[0],
                u = {
                    top: 0,
                    left: 0
                },
                e = t && t.ownerDocument;
            if (e) return r = e.documentElement, i.contains(r, t) ? (typeof t.getBoundingClientRect !== b && (u = t.getBoundingClientRect()), f = ku(e), {
                top: u.top + f.pageYOffset - r.clientTop,
                left: u.left + f.pageXOffset - r.clientLeft
            }) : u
        },
        position: function() {
            if (this[0]) {
                var n, r, u = this[0],
                    t = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
                    top: r.top - t.top - i.css(u, "marginTop", !0),
                    left: r.left - t.left - i.css(u, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var n = this.offsetParent || wi; n && !i.nodeName(n, "html") && "static" === i.css(n, "position");) n = n.offsetParent;
                return n || wi
            })
        }
    }), i.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, r) {
        var u = "pageYOffset" === r;
        i.fn[t] = function(i) {
            return l(this, function(t, i, f) {
                var e = ku(t);
                return void 0 === f ? e ? e[r] : t[i] : void(e ? e.scrollTo(u ? n.pageXOffset : f, u ? f : n.pageYOffset) : t[i] = f)
            }, t, i, arguments.length, null)
        }
    }), i.each(["top", "left"], function(n, t) {
        i.cssHooks[t] = br(f.pixelPosition, function(n, r) {
            if (r) return (r = it(n, t), hi.test(r) ? i(n).position()[t] + "px" : r)
        })
    }), i.each({
        Height: "height",
        Width: "width"
    }, function(n, t) {
        i.each({
            padding: "inner" + n,
            content: t,
            "": "outer" + n
        }, function(r, u) {
            i.fn[u] = function(u, f) {
                var e = arguments.length && (r || "boolean" != typeof u),
                    o = r || (u === !0 || f === !0 ? "margin" : "border");
                return l(this, function(t, r, u) {
                    var f;
                    return i.isWindow(t) ? t.document.documentElement["client" + n] : 9 === t.nodeType ? (f = t.documentElement, Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : void 0 === u ? i.css(t, r, o) : i.style(t, r, u, o)
                }, t, e ? u : void 0, e, null)
            }
        })
    }), i.fn.size = function() {
        return this.length
    }, i.fn.andSelf = i.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return i
    }), du = n.jQuery, gu = n.$, i.noConflict = function(t) {
        return n.$ === i && (n.$ = gu), t && n.jQuery === i && (n.jQuery = du), i
    }, typeof t === b && (n.jQuery = n.$ = i), i
}),
function(n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
    }

    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function() {
            return "hidden" === n.css(this, "visibility")
        }).length
    }
    var u = 0,
        f = /^ui-id-\d+$/;
    n.ui = n.ui || {};
    n.extend(n.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    n.fn.extend({
        focus: function(t) {
            return function(i, r) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        n(t).focus();
                        r && r.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(n.fn.focus),
        scrollParent: function() {
            var t;
            return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var u, f, r = n(this[0]); r.length && r[0] !== document;) {
                    if (u = r.css("position"), ("absolute" === u || "relative" === u || "fixed" === u) && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
                    r = r.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++u)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = n.attr(t, "tabindex"),
                u = isNaN(r);
            return (u || r >= 0) && i(t, !u)
        }
    });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
        function u(t, i, r, u) {
            return n.each(o, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
            f = r.toLowerCase(),
            e = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + r] = function(i) {
            return i === t ? e["inner" + r].call(this) : this.each(function() {
                n(this).css(f, u(this, i) + "px")
            })
        };
        n.fn["outer" + r] = function(t, i) {
            return "number" != typeof t ? e["outer" + r].call(this, t) : this.each(function() {
                n(this).css(f, u(this, t, !0, i) + "px")
            })
        }
    });
    n.fn.addBack || (n.fn.addBack = function(n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.support.selectstart = "onselectstart" in document.createElement("div");
    n.fn.extend({
        disableSelection: function() {
            return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                n.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    n.extend(n.ui, {
        plugin: {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i) {
                var r, u = n.plugins[t];
                if (u && n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType)
                    for (r = 0; u.length > r; r++) n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        }
    })
}(jQuery),
function(n, t) {
    var r = 0,
        i = Array.prototype.slice,
        u = n.cleanData;
    n.cleanData = function(t) {
        for (var i, r = 0; null != (i = t[r]); r++) try {
            n(i).triggerHandler("remove")
        } catch (f) {}
        u(t)
    };
    n.widget = function(i, r, u) {
        var h, e, f, s, c = {},
            o = i.split(".")[0];
        i = i.split(".")[1];
        h = o + "-" + i;
        u || (u = r, r = n.Widget);
        n.expr[":"][h.toLowerCase()] = function(t) {
            return !!n.data(t, h)
        };
        n[o] = n[o] || {};
        e = n[o][i];
        f = n[o][i] = function(n, i) {
            return this._createWidget ? (arguments.length && this._createWidget(n, i), t) : new f(n, i)
        };
        n.extend(f, e, {
            version: u.version,
            _proto: n.extend({}, u),
            _childConstructors: []
        });
        s = new r;
        s.options = n.widget.extend({}, s.options);
        n.each(u, function(i, u) {
            return n.isFunction(u) ? (c[i] = function() {
                var n = function() {
                        return r.prototype[i].apply(this, arguments)
                    },
                    t = function(n) {
                        return r.prototype[i].apply(this, n)
                    };
                return function() {
                    var i, r = this._super,
                        f = this._superApply;
                    return this._super = n, this._superApply = t, i = u.apply(this, arguments), this._super = r, this._superApply = f, i
                }
            }(), t) : (c[i] = u, t)
        });
        f.prototype = n.widget.extend(s, {
            widgetEventPrefix: e ? s.widgetEventPrefix : i
        }, c, {
            constructor: f,
            namespace: o,
            widgetName: i,
            widgetFullName: h
        });
        e ? (n.each(e._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, f, i._proto)
        }), delete e._childConstructors) : r._childConstructors.push(f);
        n.widget.bridge(i, f)
    };
    n.widget.extend = function(r) {
        for (var u, f, o = i.call(arguments, 1), e = 0, s = o.length; s > e; e++)
            for (u in o[e]) f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r
    };
    n.widget.bridge = function(r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function(e) {
            var h = "string" == typeof e,
                o = i.call(arguments, 1),
                s = this;
            return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function() {
                var i, u = n.data(this, f);
                return u ? n.isFunction(u[e]) && "_" !== e.charAt(0) ? (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : t) : n.error("no such method '" + e + "' for " + r + " widget instance") : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
            }) : this.each(function() {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e, this))
            }), s
        }
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = r++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(i, r) {
            var u, f, e, o = i;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                    for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; u.length - 1 > e; e++) f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                    if (i = u.pop(), r === t) return f[i] === t ? null : f[i];
                    f[i] = r
                } else {
                    if (r === t) return this.options[i] === t ? null : this.options[i];
                    o[i] = r
                }
            return this._setOptions(o), this
        },
        _setOptions: function(n) {
            for (var t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, r, u) {
            var e, f = this;
            "boolean" != typeof i && (u = r, r = i, i = !1);
            u ? (r = e = n(r), this.bindings = this.bindings.add(r)) : (u = r, r = this.element, e = this.widget());
            n.each(u, function(u, o) {
                function s() {
                    return i || f.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? f[o] : o).apply(f, arguments) : t
                }
                "string" != typeof o && (s.guid = o.guid = o.guid || s.guid || n.guid++);
                var h = u.match(/^(\w+)\s*(.*)$/),
                    c = h[1] + f.eventNamespace,
                    l = h[2];
                l ? e.delegate(l, c, s) : r.bind(c, s)
            })
        },
        _off: function(n, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            n.unbind(t).undelegate(t)
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    n(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    n(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    n(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    n(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    })
}(jQuery),
function(n, t) {
    function e(n, t, i) {
        return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
    }

    function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0
    }

    function v(t) {
        var i = t[0];
        return 9 === i.nodeType ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : n.isWindow(i) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    n.ui = n.ui || {};
    var f, u = Math.max,
        i = Math.abs,
        o = Math.round,
        s = /left|center|right/,
        h = /top|center|bottom/,
        c = /[\+\-]\d+(\.[\d]+)?%?/,
        l = /^\w+/,
        a = /%$/,
        y = n.fn.position;
    n.position = {
        scrollbarWidth: function() {
            if (f !== t) return f;
            var u, r, i = n("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                e = i.children()[0];
            return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r
        },
        getScrollInfo: function(t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x"),
                r = t.isWindow ? "" : t.element.css("overflow-y"),
                u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
            return {
                width: f ? n.position.scrollbarWidth() : 0,
                height: u ? n.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = n(t || window),
                r = n.isWindow(i[0]);
            return {
                element: i,
                isWindow: r,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: r ? i.width() : i.outerWidth(),
                height: r ? i.height() : i.outerHeight()
            }
        }
    };
    n.fn.position = function(t) {
        if (!t || !t.of) return y.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, a, w, p, d, g = n(t.of),
            tt = n.position.getWithinInfo(t.within),
            it = n.position.getScrollInfo(tt),
            k = (t.collision || "flip").split(" "),
            nt = {};
        return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function() {
            var i, r, n = (t[this] || "").split(" ");
            1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = s.test(n[0]) ? n[0] : "center";
            n[1] = h.test(n[1]) ? n[1] : "center";
            i = c.exec(n[0]);
            r = c.exec(n[1]);
            nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? p.left += f : "center" === t.at[0] && (p.left += f / 2), "bottom" === t.at[1] ? p.top += a : "center" === t.at[1] && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function() {
            var y, d, h = n(this),
                c = h.outerWidth(),
                l = h.outerHeight(),
                rt = r(this, "marginLeft"),
                ut = r(this, "marginTop"),
                ft = c + rt + r(this, "marginRight") + it.width,
                et = l + ut + r(this, "marginBottom") + it.height,
                s = n.extend({}, p),
                v = e(nt.my, h.outerWidth(), h.outerHeight());
            "right" === t.my[0] ? s.left -= c : "center" === t.my[0] && (s.left -= c / 2);
            "bottom" === t.my[1] ? s.top -= l : "center" === t.my[1] && (s.top -= l / 2);
            s.left += v[0];
            s.top += v[1];
            n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
            y = {
                marginLeft: rt,
                marginTop: ut
            };
            n.each(["left", "top"], function(i, r) {
                n.ui.position[k[i]] && n.ui.position[k[i]][r](s, {
                    targetWidth: f,
                    targetHeight: a,
                    elemWidth: c,
                    elemHeight: l,
                    collisionPosition: y,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [b[0] + v[0], b[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: tt,
                    elem: h
                })
            });
            t.using && (d = function(n) {
                var r = w.left - s.left,
                    v = r + f - c,
                    e = w.top - s.top,
                    y = e + a - l,
                    o = {
                        target: {
                            element: g,
                            left: w.left,
                            top: w.top,
                            width: f,
                            height: a
                        },
                        element: {
                            element: h,
                            left: s.left,
                            top: s.top,
                            width: c,
                            height: l
                        },
                        horizontal: 0 > v ? "left" : r > 0 ? "right" : "center",
                        vertical: 0 > y ? "top" : e > 0 ? "bottom" : "middle"
                    };
                c > f && f > i(r + v) && (o.horizontal = "center");
                l > a && a > i(e + y) && (o.vertical = "middle");
                o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                t.using.call(this, n, o)
            });
            h.offset(n.extend(s, {
                using: d
            }))
        })
    };
    n.ui.position = {
            fit: {
                left: function(n, t) {
                    var h, e = t.within,
                        r = e.isWindow ? e.scrollLeft : e.offset.left,
                        o = e.width,
                        s = n.left - t.collisionPosition.marginLeft,
                        i = r - s,
                        f = s + t.collisionWidth - o - r;
                    t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && 0 >= i ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left)
                },
                top: function(n, t) {
                    var h, o = t.within,
                        r = o.isWindow ? o.scrollTop : o.offset.top,
                        e = t.within.height,
                        s = n.top - t.collisionPosition.marginTop,
                        i = r - s,
                        f = s + t.collisionHeight - e - r;
                    t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && 0 >= i ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top)
                }
            },
            flip: {
                left: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.left + r.scrollLeft,
                        c = r.width,
                        h = r.isWindow ? r.scrollLeft : r.offset.left,
                        l = n.left - t.collisionPosition.marginLeft,
                        a = l - h,
                        v = l + t.collisionWidth - c - h,
                        u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        e = -2 * t.offset[0];
                    0 > a ? (o = n.left + u + f + e + t.collisionWidth - c - y, (0 > o || i(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - t.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > i(s)) && (n.left += u + f + e))
                },
                top: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.top + r.scrollTop,
                        a = r.height,
                        h = r.isWindow ? r.scrollTop : r.offset.top,
                        v = n.top - t.collisionPosition.marginTop,
                        c = v - h,
                        l = v + t.collisionHeight - a - h,
                        p = "top" === t.my[1],
                        u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        e = -2 * t.offset[1];
                    0 > c ? (s = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || i(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - t.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > i(o)) && (n.top += u + f + e))
                }
            },
            flipfit: {
                left: function() {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, i, r, u, f, e = document.getElementsByTagName("body")[0],
                o = document.createElement("div");
            t = document.createElement(e ? "div" : "body");
            r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            e && n.extend(r, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (f in r) t.style[f] = r[f];
            t.appendChild(o);
            i = e || document.documentElement;
            i.insertBefore(t, i.firstChild);
            o.style.cssText = "position: absolute; left: 10.7432222px;";
            u = n(o).offset().left;
            n.support.offsetFractions = u > 10 && 11 > u;
            t.innerHTML = "";
            i.removeChild(t)
        }()
}(jQuery),
function(n) {
    var t = 0;
    n.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, undefined;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                        case f.NUMPAD_ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), undefined;
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                },
                input: function(n) {
                    return r ? (r = !1, n.preventDefault(), undefined) : (this._searchTimeout(n), undefined)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(n) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(n), this._change(n), undefined)
                }
            });
            this._initSource();
            this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    n(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(r) {
                            r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                        })
                    })
                },
                menufocus: function(t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                        n(t.target).trigger(t.originalEvent)
                    }), undefined;
                    var r = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(n, t) {
                    var i = t.item.data("ui-autocomplete-item"),
                        r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r;
                        this.selectedItem = i
                    }));
                    !1 !== this._trigger("select", n, {
                        item: i
                    }) && this._value(i.value);
                    this.term = this._value();
                    this.close(n);
                    this.selectedItem = i
                }
            });
            this.liveRegion = n("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r,
                    data: i,
                    dataType: "json",
                    success: function(n) {
                        u(n)
                    },
                    error: function() {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function(n, t) {
            return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : undefined
        },
        _search: function(n) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({
                term: n
            }, this._response())
        },
        _response: function() {
            var n = this,
                i = ++t;
            return function(r) {
                i === t && n.__response(r);
                n.pending--;
                n.pending || n.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {
                content: n
            });
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function(n) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function(n) {
            this.previous !== this._value() && this._trigger("change", n, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : n.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<a>").text(i.label)).appendTo(t)
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[n](t), undefined) : (this.search(null, t), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(n) {
            var t;
            this._superApply(arguments);
            this.options.disabled || this.cancelSearch || (t = n && n.length ? this.options.messages.results(n.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
}(jQuery),
function(n) {
    n.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, n.proxy(function(n) {
                this.options.disabled && n.preventDefault()
            }, this));
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            this._on({
                "mousedown .ui-menu-item > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-state-disabled > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var i = n(t.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(t), i.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var i = n(t.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(t, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(n, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(t) {
                    n(t.target).closest(".ui-menu").length || this.collapseAll(t);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function o(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var i, f, r, e, u, s = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    s = !1;
                    f = this.previousFilter || "";
                    r = String.fromCharCode(t.keyCode);
                    e = !1;
                    clearTimeout(this.filterTimer);
                    r === f ? e = !0 : r = f + r;
                    u = RegExp("^" + o(r), "i");
                    i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    });
                    i = e && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), u = RegExp("^" + o(r), "i"), i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    }));
                    i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            s && t.preventDefault()
        },
        _activate: function(n) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function() {
            var t, r = this.options.icons.submenu,
                i = this.element.find(this.options.menus);
            i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = n(this),
                    i = t.prev("a"),
                    u = n("<span>").addClass("ui-menu-icon ui-icon " + r).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            t = i.add(this.element);
            t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            t.children(":not(.ui-menu-item)").each(function() {
                var t = n(this);
                /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            });
            t.children(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(n, t) {
            "icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
            this._super(n, t)
        },
        focus: function(n, t) {
            var i, r;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children("a").addClass("ui-state-focus");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.height(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                item: this.active
            }))
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function(t) {
            var i = n.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this.activeMenu = r
            }, this.delay)
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function(n) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(n, t)
            }))
        },
        next: function(n) {
            this._move("next", "first", n)
        },
        previous: function(n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(n, t, i) {
            var r;
            this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]());
            this.focus(i, r)
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = n(this), 0 > i.offset().top - r - u
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(t), undefined)
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(t), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        }
    })
}(jQuery),
function(n) {
    function i(n, t) {
        for (var i = window, r = (n || "").split("."); i && r.length;) i = i[r.shift()];
        return typeof i == "function" ? i : (t.push(n), Function.constructor.apply(null, t))
    }

    function u(n) {
        return n === "GET" || n === "POST"
    }

    function o(n, t) {
        u(t) || n.setRequestHeader("X-HTTP-Method-Override", t)
    }

    function s(t, i, r) {
        var u;
        r.indexOf("application/x-javascript") === -1 && (u = (t.getAttribute("data-ajax-mode") || "").toUpperCase(), n(t.getAttribute("data-ajax-update")).each(function(t, r) {
            var f;
            switch (u) {
                case "BEFORE":
                    f = r.firstChild;
                    n("<div />").html(i).contents().each(function() {
                        r.insertBefore(this, f)
                    });
                    break;
                case "AFTER":
                    n("<div />").html(i).contents().each(function() {
                        r.appendChild(this)
                    });
                    break;
                case "REPLACE-WITH":
                    n(r).replaceWith(i);
                    break;
                default:
                    n(r).html(i)
            }
        }))
    }

    function f(t, r) {
        var e, h, f, c;
        (e = t.getAttribute("data-ajax-confirm"), !e || window.confirm(e)) && (h = n(t.getAttribute("data-ajax-loading")), c = parseInt(t.getAttribute("data-ajax-loading-duration"), 10) || 0, n.extend(r, {
            type: t.getAttribute("data-ajax-method") || undefined,
            url: t.getAttribute("data-ajax-url") || undefined,
            cache: !!t.getAttribute("data-ajax-cache"),
            beforeSend: function(n) {
                var r;
                return o(n, f), r = i(t.getAttribute("data-ajax-begin"), ["xhr"]).apply(t, arguments), r !== !1 && h.show(c), r
            },
            complete: function() {
                h.hide(c);
                i(t.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(t, arguments)
            },
            success: function(n, r, u) {
                s(t, n, u.getResponseHeader("Content-Type") || "text/html");
                i(t.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(t, arguments)
            },
            error: function() {
                i(t.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(t, arguments)
            }
        }), r.data.push({
            name: "X-Requested-With",
            value: "XMLHttpRequest"
        }), f = r.type.toUpperCase(), u(f) || (r.type = "POST", r.data.push({
            name: "X-HTTP-Method-Override",
            value: f
        })), n.ajax(r))
    }

    function h(t) {
        var i = n(t).data(e);
        return !i || !i.validate || i.validate()
    }
    var t = "unobtrusiveAjaxClick",
        r = "unobtrusiveAjaxClickTarget",
        e = "unobtrusiveValidation";
    n(document).on("click", "a[data-ajax=true]", function(n) {
        n.preventDefault();
        f(this, {
            url: this.href,
            type: "GET",
            data: []
        })
    });
    n(document).on("click", "form[data-ajax=true] input[type=image]", function(i) {
        var r = i.target.name,
            u = n(i.target),
            f = n(u.parents("form")[0]),
            e = u.offset();
        f.data(t, [{
            name: r + ".x",
            value: Math.round(i.pageX - e.left)
        }, {
            name: r + ".y",
            value: Math.round(i.pageY - e.top)
        }]);
        setTimeout(function() {
            f.removeData(t)
        }, 0)
    });
    n(document).on("click", "form[data-ajax=true] :submit", function(i) {
        var f = i.currentTarget.name,
            e = n(i.target),
            u = n(e.parents("form")[0]);
        u.data(t, f ? [{
            name: f,
            value: i.currentTarget.value
        }] : []);
        u.data(r, e);
        setTimeout(function() {
            u.removeData(t);
            u.removeData(r)
        }, 0)
    });
    n(document).on("submit", "form[data-ajax=true]", function(i) {
        var e = n(this).data(t) || [],
            u = n(this).data(r),
            o = u && u.hasClass("cancel");
        (i.preventDefault(), o || h(this)) && f(this, {
            url: this.action,
            type: this.method || "GET",
            data: e.concat(n(this).serializeArray())
        })
    })
}(jQuery);
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
}(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(this).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function(t) {
                function r() {
                    var u, r;
                    return i.settings.submitHandler ? (i.submitButton && (u = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && u.remove(), void 0 !== r ? r : !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var t, i, r;
            return n(this[0]).is("form") ? t = this.validate().form() : (r = [], t = !0, i = n(this[0].form).validate(), this.each(function() {
                t = i.element(this) && t;
                r = r.concat(i.errorList)
            }), i.errorList = r), t
        },
        rules: function(t, i) {
            var e, s, f, u, o, h, r = this[0];
            if (t) switch (e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r), t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i));
                    delete f.messages;
                    s[r.name] = f;
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove":
                    return i ? (h = {}, n.each(i.split(/\s/), function(t, i) {
                        h[i] = f[i];
                        delete f[i];
                        "required" === i && n(r).removeAttr("aria-required")
                    }), h) : (delete s[r.name], f)
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({
                required: o
            }, u), n(r).attr("aria-required", "true")), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {
                remote: o
            })), u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(t, i) {
                9 === i.which && "" === this.elementValue(t) || -1 !== n.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var r = n.data(this.form, "validator"),
                        u = "on" + t.type.replace(/^validate/, ""),
                        i = r.settings;
                    i[u] && !n(this).is(i.ignore) && i[u].call(r, this, t)
                }
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var t, r = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", i).on("click.validate", "select, option, [type='radio'], [type='checkbox']", i);
                this.settings.invalidHandler && n(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                var u = this.clean(t),
                    i = this.validationTargetFor(u),
                    r = !0;
                return this.lastElement = i, void 0 === i ? delete this.invalid[u.name] : (this.prepareElement(i), this.currentElements = n(i), r = this.check(i) !== !1, r ? delete this.invalid[i.name] : this.invalid[i.name] = !0), n(t).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t) this.errorList.push({
                        message: t[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                var t, i = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)
                    for (t = 0; i[t]; t++) this.settings.unhighlight.call(this, i[t], this.settings.errorClass, "");
                else i.removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var i, t = 0;
                for (i in n) t++;
                return t
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var i, u = n(t),
                    r = t.type;
                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && "undefined" != typeof t.validity ? t.validity.badInput ? !1 : u.val() : (i = u.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var r, u, i, f = n(t).rules(),
                    s = n.map(f, function(n, t) {
                        return t
                    }).length,
                    o = !1,
                    h = this.elementValue(t);
                for (u in f) {
                    i = {
                        method: u,
                        parameters: f[u]
                    };
                    try {
                        if (r = n.validator.methods[u].call(this, h, t, i.parameters), "dependency-mismatch" === r && 1 === s) {
                            o = !0;
                            continue
                        }
                        if (o = !1, "pending" === r) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!r) return this.formatAndAdd(t, i), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method."), e;
                    }
                }
                if (!o) return this.objectLength(f) && this.successList.push(t), !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; n < arguments.length; n++)
                    if (void 0 !== arguments[n]) return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method),
                    u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t,
                    method: i.method
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var u, o, e, r = this.errorsFor(t),
                    s = this.idOrName(t),
                    f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", s + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement(u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", s) : 0 === r.parents("label[for='" + s + "']").length && (e = r.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), f ? f.match(new RegExp("\\b" + e + "\\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), o = this.groups[t.name], o && n.each(this.groups, function(t, i) {
                    i === o && n("[name='" + t + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                })));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var r = this.idOrName(t),
                    u = n(t).attr("aria-describedby"),
                    i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + u.replace(/\s+/g, ", #")), this.errors().filter(i)
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), n(t).not(this.settings.ignore)[0]
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            },
            destroy: function() {
                this.resetForm();
                n(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function(n, t, i, r) {
            /min|max/.test(i) && (null === t || /number|range|text/.test(t)) && (r = Number(r), isNaN(r) && (r = void 0));
            r || 0 === r ? n[i] = r : t === i && "range" !== t && (n[i] = !0)
        },
        attributeRules: function(t) {
            var r, i, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (r in n.validator.methods) "required" === r ? (i = t.getAttribute(r), "" === i && (i = !0), i = !!i) : i = f.attr(r), this.normalizeAttributeRule(u, e, r, i);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (i in n.validator.methods) r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(u, e, i, r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return void delete t[r];
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }), n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString())
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n)) return !1;
                var i, f, e = 0,
                    r = 0,
                    u = !1;
                if (n = n.replace(/\D/g, ""), n.length < 13 || n.length > 19) return !1;
                for (i = n.length - 1; i >= 0; i--) f = n.charAt(i), r = parseInt(f, 10), u && (r *= 2) > 9 && (r -= 9), e += r, u = !u;
                return e % 10 == 0
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r[0] && u <= r[1]
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r) {
                if (this.optional(i)) return "dependency-mismatch";
                var u, e, f = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                    url: r
                } || r, f.old === t ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    context: u.currentForm,
                    success: function(r) {
                        var o, e, h, s = r === !0 || "true" === r;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        s ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (o = {}, e = r || u.defaultMessage(i, "remote"), o[i.name] = f.message = n.isFunction(e) ? e(t) : e, u.invalid[i.name] = !0, u.showErrors(o));
                        f.valid = s;
                        u.stopRequest(i, s)
                    }
                }, r)), "pending")
            }
        }
    });
    var i, t = {};
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    })
}),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }

    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }

    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }

    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }

    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
    }

    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
            u = r.attr("data-valmsg-replace"),
            e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }

    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"),
            r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }

    function a(t) {
        var i = t.data("unobtrusiveContainer"),
            r = i.attr("data-valmsg-replace"),
            u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
    }

    function v() {
        var t = n(this),
            i = "__jquery_unobtrusive_validation_form_reset";
        if (!t.data(i)) {
            t.data(i, !0);
            try {
                t.data("validator").resetForm()
            } finally {
                t.removeData(i)
            }
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    }

    function s(t) {
        var i = n(t),
            f = i.data(u),
            s = n.proxy(v, t),
            e = r.unobtrusive.options || {},
            o = function(i, r) {
                var u = e[i];
                u && n.isFunction(u) && u.apply(t, r)
            };
        return f || (f = {
            options: {
                errorClass: e.errorClass || "input-validation-error",
                errorElement: e.errorElement || "span",
                errorPlacement: function() {
                    c.apply(t, arguments);
                    o("errorPlacement", arguments)
                },
                invalidHandler: function() {
                    l.apply(t, arguments);
                    o("invalidHandler", arguments)
                },
                messages: {},
                rules: {},
                success: function() {
                    a.apply(t, arguments);
                    o("success", arguments)
                }
            },
            attachValidation: function() {
                i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
            },
            validate: function() {
                return i.validate(), i.valid()
            }
        }, i.data(u, f)), f
    }
    var r = n.validator,
        t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t),
                f = u.parents("form")[0],
                r, e, o;
            f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function() {
                var i = "data-val-" + this.name,
                    r = u.attr(i),
                    s = {};
                r !== undefined && (i += "-", n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }), this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }), n.extend(e, {
                __dummy__: !0
            }), i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t),
                u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
            i.find("[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            });
            u.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function(n, t, i) {
        return i || (i = t, t = []), this.push({
            name: n,
            params: t,
            adapt: i
        }), this
    };
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    };
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min,
                e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    };
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    };
    r.addMethod("__dummy__", function() {
        return !0
    });
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name),
            u = t.params.other,
            s = o(u, r),
            h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
                url: t.params.url,
                type: t.params.type || "GET",
                data: {}
            },
            u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                var i = n(t.form).find(":input").filter("[name='" + f(s) + "']");
                return i.is(":checkbox") ? i.filter(":checked").val() || i.filter(":hidden").val() || "" : i.is(":radio") ? i.filter(":checked").val() || "" : i.val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery);
selectedRoleIds = [];
expandCollapseInputGroup = function() {
    $(this).next().css("display") != "none" ? $(this).next().val() == "" && ($(this).next().animate({
        width: "toggle"
    }, 350), $(this).html($(this).html().substr(0, $(this).html().length - 1))) : ($(this).next().animate({
        width: "toggle"
    }, 350), $(this).append(":"), $(this).next().select())
};
GoToModalHeader = function() {
    document.getElementById("focusModal").scrollIntoView()
};
$(document).ready(function() {
    var n, i, t;
    $(".altinn-input-group > input.form-control").focus(function() {
        $(this).parent().removeClass("has-value")
    });
    $("#infoPortalSearchText").keypress(function(n) {
        n.which == 13 && InfoPortalSearch("infoPortalSearchText")
    });
    $("#infoPortalSearchTextSmall").keypress(function(n) {
        n.which == 13 && InfoPortalSearch("infoPortalSearchTextSmall")
    });
    $(".index-heading").click(function() {
        $(this).hasClass("expanded") ? ($(this).removeClass("expanded"), $(".panel-heading.expanded").length === 0 ? $(".panel-heading").removeClass("dim") : $(this).addClass("dim")) : ($(".panel-heading").removeClass("expanded"), $(this).addClass("expanded"), $(".panel-heading").addClass("dim"), $(".panel-heading.expanded").removeClass("dim"))
    });
    n = {
        transition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend"
    };
    i = document.createElement("div");
    for (t in n)
        if (typeof i.style[t] != "undefined") {
            window.transitionEnd = n[t];
            break
        }
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        $("<style> input { font-size: 16px !important } <\/style>").appendTo("head");
        $(".modal").on("show.bs.modal", function() {
            $(this).css({
                position: "absolute",
                bottom: "auto"
            });
            setTimeout(function() {
                $(".modal-backdrop").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) + "px"
                })
            }, 0)
        })
    }
});
var onBackClick = function() {
        window.history.length > 0 ? window.history.back() : window.location = "/Pages/ServiceEngine/MyMainPage/MyMainPage.aspx"
    },
    dimOtherPanelSections = function(n) {
        $(".panel-section").addClass("dim");
        n.removeClass("dim")
    },
    removePanelSectionDim = function() {
        $(".panel-section").removeClass("dim")
    },
    IsAuthenticated = function() {
        var n = $.ajax("/ui/Profile/IsAuthenticated/").done(function(n) {
            n == "true" || location.reload(!1)
        }).fail(function() {
            location.reload(!1)
        })
    },
    AddLoadingScreen = function(n) {
        $(".altinn-loading-screen").remove();
        $(n).append('<div class="altinn-loading-screen"><img src="/ui/Content/img/spinner.gif"/><\/div>')
    },
    RemoveLoadingScreen = function(n) {
        $(n).children(".altinn-loading-screen").remove()
    },
    ToggleERVisibility = function(n) {
        n.checked ? $("#ERContactInfoEndpoint").css({
            opacity: 1
        }) : $("#ERContactInfoEndpoint").css({
            opacity: .6
        })
    };
if (config = {
        validEmail: /(("[^"]+")|(([a-zA-Z0-9!#$%&'*+\-=?\^_`{|}~])+(\.([a-zA-Z0-9!#$%&'*+\-=?\^_`{|}~])+)*))@((((([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61})[a-zA-Z0-9]\.)|[a-zA-Z0-9]\.){1,9})([a-zA-Z]{2,6}))|((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})))/
    }, $(function() {
        var n = $("#CurrentSelectedDefaultReportee").val();
        n != null && n != undefined && n != "" && n > 0 && SetDefaultReporteeAndExpandPortalSettingsAccordian(n);
        location.hash && $(location.hash + ".collapse").collapse("show")
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery); + function(n) {
    "use strict";

    function t() {
        var i = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var t in n)
            if (void 0 !== i.style[t]) return {
                end: n[t]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function() {
            i = !0
        });
        return r = function() {
            i || n(u).trigger(n.support.transition.end)
        }, setTimeout(r, t), this
    };
    n(function() {
        n.support.transition = t();
        n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function u(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var i = '[data-dismiss="alert"]',
        t = function(t) {
            n(t).on("click", i, this.close)
        },
        r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function(i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, ""));
        r = n(u);
        i && i.preventDefault();
        r.length || (r = f.closest(".alert"));
        r.trigger(i = n.Event("close.bs.alert"));
        i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function() {
        return n.fn.alert = r, this
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.button"),
                f = "object" == typeof i && i;
            r || u.data("bs.button", r = new t(this, f));
            "toggle" == i ? r.toggle() : i && r.setState(i)
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1
        },
        r;
    t.VERSION = "3.3.5";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function(t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t += "Text";
        null == u.resetText && i.data("resetText", i[f]());
        setTimeout(n.proxy(function() {
            i[f](null == u[t] ? this.options[t] : u[t]);
            "loadingText" == t ? (this.isLoading = !0, i.addClass(r).attr(r, r)) : this.isLoading && (this.isLoading = !1, i.removeClass(r).removeAttr(r))
        }, this), 0)
    };
    t.prototype.toggle = function() {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length ? (n = this.$element.find("input"), "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), i.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active"))
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function() {
        return n.fn.button = r, this
    };
    n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var r = n(t.target);
        r.hasClass("btn") || (r = r.closest(".btn"));
        i.call(r, "toggle");
        n(t.target).is('input[type="radio"]') || n(t.target).is('input[type="checkbox"]') || t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
                e = "string" == typeof i ? i : f.slide;
            r || u.data("bs.carousel", r = new t(this, f));
            "number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
        })
    }
    var t = function(t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
        },
        u, r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    t.prototype.keydown = function(n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            n.preventDefault()
        }
    };
    t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
    };
    t.prototype.getItemIndex = function(n) {
        return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
    };
    t.prototype.getItemForDirection = function(n, t) {
        var i = this.getItemIndex(t),
            f = "prev" == n && 0 === i || "next" == n && i == this.$items.length - 1,
            r, u;
        return f && !this.options.wrap ? t : (r = "prev" == n ? -1 : 1, u = (i + r) % this.$items.length, this.$items.eq(u))
    };
    t.prototype.to = function(n) {
        var i = this,
            t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(n > this.$items.length - 1) && !(0 > n)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(n)
        }) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
    };
    t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    t.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    };
    t.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    };
    t.prototype.slide = function(i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = "next" == i ? "left" : "right",
            a = this,
            o, s, h, c;
        return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), (this.$element.trigger(s), !s.isDefaultPrevented()) ? ((this.sliding = !0, l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function() {
            u.removeClass([i, f].join(" ")).addClass("active");
            e.removeClass(["active", f].join(" "));
            a.sliding = !1;
            setTimeout(function() {
                a.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this) : void 0)
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function() {
        return n.fn.carousel = u, this
    };
    r = function(t) {
        var o, r = n(this),
            u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
            e, f;
        u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function() {
        n('[data-ride="carousel"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return n(r)
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
            !r && f.toggle && /show|hide/.test(i) && (f.toggle = !1);
            r || u.data("bs.collapse", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle()
        },
        u;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: !0
    };
    t.prototype.dimension = function() {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height"
    };
    t.prototype.show = function() {
        var f, r, e, u, o, s;
        if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing"), !(r && r.length && (f = r.data("bs.collapse"), f && f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented()))) {
            if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                }, !n.support.transition) return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
        }
    };
    t.prototype.hide = function() {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) return i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function() {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        }, n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
    };
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    t.prototype.getParent = function() {
        return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function(t, i) {
            var u = n(i);
            this.addAriaAndCollapsedClass(r(u), u)
        }, this)).end()
    };
    t.prototype.addAriaAndCollapsedClass = function(n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function() {
        return n.fn.collapse = u, this
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : u.data();
        i.call(f, o)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i = t.attr("data-target"),
            r;
        return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
    }

    function u(t) {
        t && 3 === t.which || (n(o).remove(), n(i).each(function() {
            var u = n(this),
                i = r(u),
                f = {
                    relatedTarget: this
                };
            i.hasClass("open") && (t && "click" == t.type && /input|textarea/i.test(t.target.tagName) && n.contains(i[0], t.target) || (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented() || (u.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", f))))
        }))
    }

    function e(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function(t) {
            n(t).on("click.bs.dropdown", this.toggle)
        },
        f;
    t.VERSION = "3.3.5";
    t.prototype.toggle = function(t) {
        var f = n(this),
            i, o, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = r(f), o = i.hasClass("open"), u(), !o) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(n(this)).on("click", u), e = {
                        relatedTarget: this
                    }, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger("shown.bs.dropdown", e)
            }
            return !1
        }
    };
    t.prototype.keydown = function(t) {
        var e, o, s, h, f, u;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = r(e), s = o.hasClass("open"), !s && 27 != t.which || s && 27 == t.which) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
            h = " li:not(.disabled):visible a";
            f = o.find(".dropdown-menu" + h);
            f.length && (u = f.index(t.target), 38 == t.which && u > 0 && u--, 40 == t.which && u < f.length - 1 && u++, ~u || (u = 0), f.eq(u).trigger("focus"))
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function() {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", u).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", t.prototype.keydown)
}(jQuery); + function(n) {
    "use strict";

    function i(i, r) {
        return this.each(function() {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
            u || f.data("bs.modal", u = new t(this, e));
            "string" == typeof i ? u[i](r) : e.show && u.show(r)
        })
    }
    var t = function(t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = !1;
            this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        },
        r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    t.prototype.toggle = function(n) {
        return this.isShown ? this.hide() : this.show(n)
    };
    t.prototype.show = function(i) {
        var r = this,
            u = n.Event("show.bs.modal", {
                relatedTarget: i
            });
        this.$element.trigger(u);
        this.isShown || u.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            r.$element.one("mouseup.dismiss.bs.modal", function(t) {
                n(t.target).is(r.$element) && (r.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var f = n.support.transition && r.$element.hasClass("fade"),
                u;
            r.$element.parent().length || r.$element.appendTo(r.$body);
            r.$element.show().scrollTop(0);
            r.adjustDialog();
            f && r.$element[0].offsetWidth;
            r.$element.addClass("in");
            r.enforceFocus();
            u = n.Event("shown.bs.modal", {
                relatedTarget: i
            });
            f ? r.$dialog.one("bsTransitionEnd", function() {
                r.$element.trigger("focus").trigger(u)
            }).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
        }))
    };
    t.prototype.hide = function(i) {
        i && i.preventDefault();
        i = n.Event("hide.bs.modal");
        this.$element.trigger(i);
        this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    };
    t.prototype.enforceFocus = function() {
        n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(n) {
            this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
        }, this))
    };
    t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function(n) {
            27 == n.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    t.prototype.resize = function() {
        this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal")
    };
    t.prototype.hideModal = function() {
        var n = this;
        this.$element.hide();
        this.backdrop(function() {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal")
        })
    };
    t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    t.prototype.backdrop = function(i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r, u;
        if (this.isShown && this.options.backdrop) {
            if (r = n.support.transition && f, this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + f).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", n.proxy(function(n) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function() {
            e.removeBackdrop();
            i && i()
        }, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
    };
    t.prototype.handleUpdate = function() {
        this.adjustDialog()
    };
    t.prototype.adjustDialog = function() {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : ""
        })
    };
    t.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    t.prototype.checkScrollbar = function() {
        var n = window.innerWidth,
            t;
        n || (t = document.documentElement.getBoundingClientRect(), n = t.right - Math.abs(t.left));
        this.bodyIsOverflowing = document.body.clientWidth < n;
        this.scrollbarWidth = this.measureScrollbar()
    };
    t.prototype.setScrollbar = function() {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth)
    };
    t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    t.prototype.measureScrollbar = function() {
        var n = document.createElement("div"),
            t;
        return n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function() {
        return n.fn.modal = r, this
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
            e = u.data("bs.modal") ? "toggle" : n.extend({
                remote: !/#/.test(f) && f
            }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function(n) {
            n.isDefaultPrevented() || u.one("hidden.bs.modal", function() {
                r.is(":visible") && r.trigger("focus")
            })
        });
        i.call(u, e, this)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tooltip"),
                f = "object" == typeof i && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.tooltip", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", n, t)
        },
        i;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function(t, i, r) {
        var f, e, u, o, s;
        if (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(n.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (f = this.options.trigger.split(" "), e = f.length; e--;)
            if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else "manual" != u && (o = "hover" == u ? "mouseenter" : "focusin", s = "hover" == u ? "mouseleave" : "focusout", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
        this.options.selector ? this._options = n.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.getOptions = function(t) {
        return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    };
    t.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && n.each(this._options, function(n, r) {
            i[n] != r && (t[n] = r)
        }), t
    };
    t.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    };
    t.prototype.isInStateTrue = function() {
        for (var n in this.inState)
            if (this.inState[n]) return !0;
        return !1
    };
    t.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    };
    t.prototype.show = function() {
        var c = n.Event("show.bs." + this.type),
            l, p, e, w, h;
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i).data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            y && (p = i, e = this.getPosition(this.$viewport), i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i, r.removeClass(p).addClass(i));
            w = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(w, i);
            h = function() {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                "out" == n && u.leave(u)
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h()
        }
    };
    t.prototype.applyPlacement = function(t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h, f, u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top += o;
        t.left += s;
        n.offset.setOffset(r[0], n.extend({
            using: function(n) {
                r.css({
                    top: Math.round(n.top),
                    left: Math.round(n.left)
                })
            }
        }, t), 0);
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        "top" == i && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? t.left += u.left : t.top += u.top;
        var c = /top|bottom/.test(i),
            a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c)
    };
    t.prototype.replaceArrow = function(n, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right")
    };
    t.prototype.hide = function(i) {
        function f() {
            "in" != u.hoverState && r.detach();
            u.$element.removeAttr("aria-describedby").trigger("hidden.bs." + u.type);
            i && i()
        }
        var u = this,
            r = n(this.$tip),
            e = n.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this)
    };
    t.prototype.fixTitle = function() {
        var n = this.$element;
        (n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
    };
    t.prototype.hasContent = function() {
        return this.getTitle()
    };
    t.prototype.getPosition = function(t) {
        t = t || this.$element;
        var u = t[0],
            r = "BODY" == u.tagName,
            i = u.getBoundingClientRect();
        null == i.width && (i = n.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var f = r ? {
                top: 0,
                left: 0
            } : t.offset(),
            e = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            o = r ? {
                width: n(window).width(),
                height: n(window).height()
            } : null;
        return n.extend({}, i, e, o, f)
    };
    t.prototype.getCalculatedOffset = function(n, t, i, r) {
        return "bottom" == n ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == n ? {
            top: t.top - r,
            left: t.left + t.width / 2 - i / 2
        } : "left" == n ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    };
    t.prototype.getViewportAdjustedDelta = function(n, t, i, r) {
        var f = {
                top: 0,
                left: 0
            },
            e, u, o, s, h, c;
        return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.right && (f.left = u.left + u.width - c)), f) : f
    };
    t.prototype.getTitle = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    };
    t.prototype.getUID = function(n) {
        do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
        return n
    };
    t.prototype.tip = function() {
        if (!this.$tip && (this.$tip = n(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    t.prototype.enable = function() {
        this.enabled = !0
    };
    t.prototype.disable = function() {
        this.enabled = !1
    };
    t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    t.prototype.toggle = function(t) {
        var i = this;
        t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
        t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    };
    t.prototype.destroy = function() {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            n.$element.off("." + n.type).removeData("bs." + n.type);
            n.$tip && n.$tip.detach();
            n.$tip = null;
            n.$arrow = null;
            n.$viewport = null
        })
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function() {
        return n.fn.tooltip = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.popover"),
                f = "object" == typeof i && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.popover", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.init("popover", n, t)
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.5";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof t ? "html" : "append" : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide()
    };
    t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    t.prototype.getContent = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function() {
        return n.fn.popover = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function t(i, r) {
        this.$body = n(document.body);
        this.$scrollElement = n(n(i).is(document.body) ? window : i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = "object" == typeof i && i;
            r || u.data("bs.scrollspy", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    t.VERSION = "3.3.5";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    t.prototype.refresh = function() {
        var t = this,
            i = "offset",
            r = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function() {
            var f = n(this),
                u = f.data("target") || f.attr("href"),
                t = /^#./.test(u) && n(u);
            return t && t.length && t.is(":visible") && [
                [t[i]().top + r, u]
            ] || null
        }).sort(function(n, t) {
            return n[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    };
    t.prototype.process = function() {
        var n, i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget;
        if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return this.activeTarget = null, this.clear();
        for (n = t.length; n--;) u != r[n] && i >= t[n] && (void 0 === t[n + 1] || i < t[n + 1]) && this.activate(r[n])
    };
    t.prototype.activate = function(t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy")
    };
    t.prototype.clear = function() {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function() {
        return n.fn.scrollspy = r, this
    };
    n(window).on("load.bs.scrollspy.data-api", function() {
        n('[data-spy="scroll"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(t) {
            this.element = n(t)
        },
        u, i;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function() {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = n.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function() {
                r.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                });
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0]
                })
            }))
        }
    };
    t.prototype.activate = function(i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u()
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function() {
        return n.fn.tab = u, this
    };
    i = function(t) {
        t.preventDefault();
        r.call(n(this), "show")
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.affix"),
                f = "object" == typeof i && i;
            r || u.data("bs.affix", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition()
        },
        r;
    t.VERSION = "3.3.5";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function(n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (null != i && "top" == this.affixed) return i > u ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? u + this.unpin <= f.top ? !1 : "bottom" : n - r >= u + e ? !1 : "bottom";
        var o = null == this.affixed,
            s = o ? u : f.top,
            h = o ? e : t;
        return null != i && i >= u ? "top" : null != r && s + h >= n - r ? "bottom" : !1
    };
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - n
    };
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function() {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = Math.max(n(document).height(), n(document.body).height());
            if ("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), i = this.getState(h, s, f, u), this.affixed != i) {
                if (null != this.unpin && this.$element.css("top", ""), e = "affix" + (i ? "-" + i : ""), o = n.Event(e + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
                this.affixed = i;
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
                this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == i && this.$element.offset({
                top: h - s - u
            })
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function() {
        return n.fn.affix = r, this
    };
    n(window).on("load", function() {
        n('[data-spy="affix"]').each(function() {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            null != t.offsetTop && (t.offset.top = t.offsetTop);
            i.call(r, t)
        })
    })
}(jQuery);
! function(n) {
    "use strict";
    n.matchMedia = n.matchMedia || function(n) {
        var u, i = n.documentElement,
            f = i.firstElementChild || i.firstChild,
            r = n.createElement("body"),
            t = n.createElement("div");
        return t.id = "mq-test-1", t.style.cssText = "position:absolute;top:-100em", r.style.background = "none", r.appendChild(t),
            function(n) {
                return t.innerHTML = '&shy;<style media="' + n + '"> #mq-test-1 { width: 42px; }<\/style>', i.insertBefore(r, f), u = 42 === t.offsetWidth, i.removeChild(r), {
                    matches: u,
                    media: n
                }
            }
    }(n.document)
}(this),
function(n) {
    "use strict";

    function p() {
        y(!0)
    }
    var t = {};
    n.respond = t;
    t.update = function() {};
    var f = [],
        tt = function() {
            var t = !1;
            try {
                t = new n.XMLHttpRequest
            } catch (i) {
                t = new n.ActiveXObject("Microsoft.XMLHTTP")
            }
            return function() {
                return t
            }
        }(),
        w = function(n, t) {
            var i = tt();
            i && (i.open("GET", n, !0), i.onreadystatechange = function() {
                4 !== i.readyState || 200 !== i.status && 304 !== i.status || t(i.responseText)
            }, 4 !== i.readyState && i.send(null))
        };
    if (t.ajax = w, t.queue = f, t.regex = {
            media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
            keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
            urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
            findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
            only: /(only\s+)?([a-zA-Z]+)\s?/,
            minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
            maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
        }, t.mediaQueriesSupported = n.matchMedia && null !== n.matchMedia("only all") && n.matchMedia("only all").matches, !t.mediaQueriesSupported) {
        var c, b, l, i = n.document,
            r = i.documentElement,
            e = [],
            o = [],
            u = [],
            a = {},
            k = 30,
            s = i.getElementsByTagName("head")[0] || r,
            it = i.getElementsByTagName("base")[0],
            h = s.getElementsByTagName("link"),
            v = function() {
                var u, t = i.createElement("div"),
                    n = i.body,
                    o = r.style.fontSize,
                    e = n && n.style.fontSize,
                    f = !1;
                return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = f = i.createElement("body"), n.style.background = "none"), r.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), f && r.insertBefore(n, r.firstChild), u = t.offsetWidth, f ? r.removeChild(n) : n.removeChild(t), r.style.fontSize = o, e && (n.style.fontSize = e), u = l = parseFloat(u)
            },
            y = function(t) {
                var rt = "clientWidth",
                    ut = r[rt],
                    ft = "CSS1Compat" === i.compatMode && ut || i.body[rt] || ut,
                    p = {},
                    ct = h[h.length - 1],
                    et = (new Date).getTime(),
                    tt, g, nt, f, it;
                if (t && c && k > et - c) return n.clearTimeout(b), b = n.setTimeout(y, k), void 0;
                c = et;
                for (tt in e)
                    if (e.hasOwnProperty(tt)) {
                        var a = e[tt],
                            w = a.minw,
                            d = a.maxw,
                            ot = null === w,
                            st = null === d,
                            ht = "em";
                        w && (w = parseFloat(w) * (w.indexOf(ht) > -1 ? l || v() : 1));
                        d && (d = parseFloat(d) * (d.indexOf(ht) > -1 ? l || v() : 1));
                        a.hasquery && (ot && st || !(ot || ft >= w) || !(st || d >= ft)) || (p[a.media] || (p[a.media] = []), p[a.media].push(o[a.rules]))
                    }
                for (g in u) u.hasOwnProperty(g) && u[g] && u[g].parentNode === s && s.removeChild(u[g]);
                u.length = 0;
                for (nt in p) p.hasOwnProperty(nt) && (f = i.createElement("style"), it = p[nt].join("\n"), f.type = "text/css", f.media = nt, s.insertBefore(f, ct.nextSibling), f.styleSheet ? f.styleSheet.cssText = it : f.appendChild(i.createTextNode(it)), u.push(f))
            },
            d = function(n, i, r) {
                var h = n.replace(t.regex.keyframes, "").match(t.regex.media),
                    c = h && h.length || 0,
                    l, a, f, v, u, p, w, s;
                for (i = i.substring(0, i.lastIndexOf("/")), l = function(n) {
                        return n.replace(t.regex.urls, "$1" + i + "$2$3")
                    }, a = !c && r, i.length && (i += "/"), a && (c = 1), f = 0; c > f; f++)
                    for (a ? (v = r, o.push(l(n))) : (v = h[f].match(t.regex.findStyles) && RegExp.$1, o.push(RegExp.$2 && l(RegExp.$2))), p = v.split(","), w = p.length, s = 0; w > s; s++) u = p[s], e.push({
                        media: u.split("(")[0].match(t.regex.only) && RegExp.$2 || "all",
                        rules: o.length - 1,
                        hasquery: u.indexOf("(") > -1,
                        minw: u.match(t.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: u.match(t.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    });
                y()
            },
            g = function() {
                if (f.length) {
                    var t = f.shift();
                    w(t.href, function(i) {
                        d(i, t.href, t.media);
                        a[t.href] = !0;
                        n.setTimeout(function() {
                            g()
                        }, 0)
                    })
                }
            },
            nt = function() {
                for (var r = 0; r < h.length; r++) {
                    var i = h[r],
                        t = i.href,
                        u = i.media,
                        e = i.rel && "stylesheet" === i.rel.toLowerCase();
                    t && e && !a[t] && (i.styleSheet && i.styleSheet.rawCssText ? (d(i.styleSheet.rawCssText, t, u), a[t] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(t) && !it || t.replace(RegExp.$1, "").split("/")[0] === n.location.host) && ("//" === t.substring(0, 2) && (t = n.location.protocol + t), f.push({
                        href: t,
                        media: u
                    })))
                }
                g()
            };
        nt();
        t.update = nt;
        t.getEmValue = v;
        n.addEventListener ? n.addEventListener("resize", p, !1) : n.attachEvent && n.attachEvent("onresize", p)
    }
}(this)
function paging(n) {
    $("#PageName").val() == "DelegateRoles" && $("#RolesPartialView").load("/ui/AccessManagement/DelegateRolesPartial", {
        Role: selectedRoleIds,
        pageSize: $("#pageSize").val(),
        page: n
    })
}

function ViewsPerPage(n) {
    $("#PageName").val() == "DelegateRoles" && $("#RolesPartialView").load("/ui/AccessManagement/DelegateRolesPartial", {
        Role: selectedRoleIds,
        pageSize: n
    })
}

function RoleSelectionChanged(n) {
    var t = $(n),
        i;
    t.is(":checked") == !0 ? (i = jQuery.inArray(t.val(), selectedRoleIds), i == -1 && selectedRoleIds.push(t.val())) : (i = jQuery.inArray(t.val(), selectedRoleIds), i > -1 && (selectedRoleIds = $.grep(selectedRoleIds, function(n) {
        return n != t.val()
    })));
    $("#selectedCount").text(selectedRoleIds.length)
}

function InfoPortalSearch(n) {
    var t = $("#" + n).val();
    t.length <= 4e3 && window.location.replace("/Systemsider/Sok/?SearchWords=" + t)
}

function EnableAltinnButton(n, t) {
    $(n).removeAttr("disabled");
    $(n).removeClass("disabled");
    t != null && t != undefined && t != "undefined" && $(t).html("")
}

function UpdatePersonalSettings() {
    IsAuthenticated();
    var n = $("#personalsettingsform"),
        t = n.attr("action"),
        i = n.serialize();
    $("#personalsettingsform").css("opacity", "0.5");
    $(this).css("disabled", !0);
    $.post(t, i, function(n) {
        $("#personalSettingsContainer").html(n);
        $("#personalsettingsform").css("opacity", "1");
        $(this).css("disabled", !1)
    })
}

function IsLoading(n) {
    return $(n).find(".altinn-loading-screen").length > 0
}

function LoadModal(n, t) {
    IsAuthenticated();
    $.ajax(n).done(function(n) {
        if (IsLoading(t)) {
            var r = $("<div/>", {
                    "class": "card",
                    html: n
                }),
                i = $("<div/>", {
                    "class": "page current-page",
                    data: {
                        "page-no": 1
                    },
                    html: r
                });
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            $("#focusModalContainer").append(i);
            ShouldShowModalFooter() && i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            $("#focusModal").modal("show");
            ShowNavButtons(!0);
            RemoveLoadingScreen(t);
            $("#focusModal").on("hidden.bs.modal", function() {
                $("#focusModalContainer").empty();
                $("#focusModal").attr("aria-hidden", !0)
            });
            $("#focusModal").on("shown.bs.modal", function() {
                $("#focusModal").attr("aria-hidden", !1)
            });
            EnablePopoversAndTooltips(".popoverDescription", !0)
        }
    })
}

function NextModalPage(n) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    $.ajax(n).done(function(n) {
        var t;
        if (IsLoading(".current-page .card")) {
            var r = $("<div/>", {
                    "class": "card",
                    html: n
                }),
                u = $(":data(page-no)"),
                i = $("<div/>", {
                    "class": "page next-page",
                    data: {
                        "page-no": u.length + 1
                    },
                    html: r
                });
            RemoveLoadingScreen(".current-page .card");
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            $("#focusModalContainer").append(i);
            ShouldShowModalFooter() && i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            $(".modal").animate({
                scrollTop: 0
            }, 20);
            t = $(".current-page");
            EnablePopoversAndTooltips(".popoverDescription", !0);
            setTimeout(function() {
                t.removeClass("current-page");
                t.addClass("previous-page");
                i.removeClass("next-page");
                i.addClass("current-page")
            }, 0);
            t.on(window.transitionEnd, function() {
                t.hide();
                t.off()
            });
            window.transitionEnd || (t.hide(), t.off())
        }
    })
}

function ShouldShowModalFooter() {
    return $("#hasRightsInfoPage").length > 0 || $("#servicesByRoles").length > 0 || $("#unavailableRightsInfoPage").length > 0 || $("#modalReceipt").length > 0 ? !1 : ($("#accessToServices").length > 0, !0)
}

function PreviousModalPage() {
    if (IsAuthenticated(), $(".current-page").data("page-no") == 1) {
        $("#focusModal").modal("hide");
        return
    }
    $(".left-over-close").prop("disabled", !0);
    ShowNavButtons(!0);
    var n = $(".current-page"),
        i = $(":data(page-no)"),
        t = i.filter(function() {
            return $(this).data("page-no") === i.length - 1
        });
    t.show();
    n.addClass("next-page");
    n.removeClass("current-page");
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    setTimeout(function() {
        t.addClass("current-page");
        t.removeClass("previous-page");
        $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
        SetRepresentedByUserColor(!1);
        $(".modal-backdrop").removeClass("modal-success");
        $(".modal-backdrop").removeClass("modal-error")
    }, 0);
    n.one(window.transitionEnd, function() {
        n.remove();
        $(".left-over-close").prop("disabled", !1)
    });
    window.transitionEnd || (n.remove(), $(".left-over-close").prop("disabled", !1));
    $(".modal-footer") === "undefined" && ShouldShowModalFooter() ? $(".modal-body").append($("<div/>").load("/ui/Profile/ModalFooter/")) : $(".modal-footer") !== "undefined"
}

function ResetModalAndLoadPage(n, t) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    $.ajax(n).done(function(n) {
        var f, i, r, u;
        if (IsLoading(".current-page .card")) {
            f = $("<div/>", {
                "class": "card",
                html: n
            });
            i = $("<div/>", {
                "class": "page previous-page",
                html: f
            });
            navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
            RemoveLoadingScreen(".current-page .card");
            $("#focusModalContainer").append(i);
            i.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            r = $(".current-page");
            u = $(":data(page-no)");
            r.addClass("next-page");
            r.removeClass("current-page");
            setTimeout(function() {
                i.addClass("current-page");
                i.removeClass("previous-page")
            }, 0);
            r.one(window.transitionEnd, function() {
                i.data("page-no", 1);
                u.remove();
                i.find("script").each(function() {
                    eval($(this).text())
                })
            });
            window.transitionEnd || (i.data("page-no", 1), u.remove(), i.find("script").each(function() {
                eval($(this).text())
            }));
            EnablePopoversAndTooltips(".popoverDescription", !0);
            $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
            SetRepresentedByUserColor(!1);
            $(".modal-backdrop").removeClass("modal-success");
            ShowNavButtons(!0);
            t && t.call(i)
        }
    })
}

function ShowLocalRole(n) {
    $(".current-page").data("goto-page-on-cancel", !0);
    NextModalPage("/ui/AccessManagement/LocalRole/?roleID=" + n)
}

function DeleteLocalRole(n) {
    NextModalPage("/ui/AccessManagement/DeleteLocalRole/?roleID=" + n)
}

function ConfirmUpdateLocalRole() {
    $("#LocalRoleForm").append('<input name="confirmUpdateRole" value="True">');
    $("#LocalRoleForm").submit()
}

function ValidateForm(n, t) {
    $(t).removeData("previousValue");
    setTimeout(function() {
        var t = $(n).find(":submit");
        t.addClass("disabled");
        t.prop("disabled", !0)
    }, 0)
}

function PrepareAddNewRightHolder(n) {
    IsAuthenticated();
    AddLoadingScreen(".current-page .card");
    var t = $("<div/>", {
            "class": "card",
            id: n
        }),
        i = $(":data(page-no)"),
        r = $("<div/>", {
            "class": "page next-page",
            data: {
                "page-no": i.length + 1
            },
            html: t
        });
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    $("#focusModalContainer").append(r)
}

function ShowAddNewRightHolder(n) {
    var t, i, r;
    if (IsAuthenticated(), IsLoading(".current-page .card"))
        if ($(".current-page form .form-control").val(""), RemoveLoadingScreen(".current-page .card"), navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader(), t = $("#" + n).parent(), i = $(".current-page"), t.has("> .altinn-captcha").length == 0 && t.has(".altinn-notification-error").length == 0) {
            t.append($("<div/>").load("/ui/Profile/ModalFooter/"));
            i.addClass("previous-page");
            i.removeClass("current-page");
            t.addClass("current-page");
            t.removeClass("next-page");
            i.on(window.transitionEnd, function() {
                i.hide();
                i.off()
            });
            window.transitionEnd || (i.hide(), i.off())
        } else r = t.children(), $("#PersonTabPage").html(r.html()), $("#NewRightHolder_CaptchaCode").length > 0 && $("#NewRightHolder_CaptchaCode").val(""), t.remove()
}

function PrepareNextPage(n) {
    if (IsAuthenticated(), !IsAnyCheckboxChecked($(".current-page input[name^=delete],.current-page input[name^=add]")) && GetNumEmptyInputs("#SubmitEmail_Input") != 0) return CancelEditMode(), ResetCheckboxes(), !1;
    if (GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"],.current-page input[name="LocalRoleModel.RoleName"]') != 0) return !1;
    AddLoadingScreen(".current-page .card");
    var t = $("<div/>", {
            "class": "card",
            id: n
        }),
        i = $(":data(page-no)"),
        r = $("<div/>", {
            "class": "page next-page",
            data: {
                "page-no": i.length + 1
            },
            html: t
        });
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    $("#focusModalContainer").append(r)
}

function ShowNextPage(n) {
    var t, i;
    if (IsAuthenticated(), IsLoading(".current-page .card")) {
        RemoveLoadingScreen(".current-page .card");
        t = $(".current-page");
        t.addClass("previous-page");
        t.removeClass("current-page");
        i = $("#" + n).parent();
        i.addClass("current-page");
        i.removeClass("next-page");
        t.on(window.transitionEnd, function() {
            t.hide();
            t.off()
        });
        window.transitionEnd || (t.hide(), t.off())
    }
}

function SuccessReceipt() {
    $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-black.svg");
    SetRepresentedByUserColor(!0);
    $(".modal-backdrop").addClass("modal-success");
    ShowNavButtons(!1);
    $(".current.page").find(".modal-footer").remove();
    $("#collapseOtherWithAccess").hasClass("in") && GetRightHolders()
}

function SetReceiptStyle(n) {
    SuccessReceipt();
    var t = $("#" + n);
    t.length != 0 && ($("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg"), $(".modal-backdrop").removeClass("modal-success"), $("div .panel-heading-success").addClass("panel-heading-modal"), $("div .panel-heading-success").removeClass(".panel-heading-success"))
}

function ShowNavButtons(n) {
    n ? ($(".left-over-close").show(), $(".left-over-close").attr("aria-hidden", !1), $(".right-over-close").show(), $(".right-over-close").attr("aria-hidden", !1)) : ($(".left-over-close").hide(), $(".left-over-close").attr("aria-hidden", !0), $(".right-over-close").hide(), $(".right-over-close").attr("aria-hidden", !0))
}

function EnablePopoversAndTooltips(n, t) {
    var i = ".body-content";
    t && (i = ".modal");
    $(n).popover({
        placement: "bottom",
        trigger: "focus",
        container: i,
        template: '<div class="popover bg-popover altinn-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    $(".big-popover").popover({
        placement: "bottom",
        trigger: "focus",
        container: i,
        html: !0,
        template: '<div class="popover bg-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    $(".right-over-close").popover({
        placement: "bottom",
        trigger: "manual",
        container: ".modal",
        template: '<div class="popover red-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>',
        html: !0,
        content: $("#close-popover-content-wrapper").remove().html()
    });
    $(".left-over-close").popover({
        placement: "bottom",
        trigger: "manual",
        container: ".modal",
        template: '<div class="popover red-popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>',
        html: !0,
        content: $("#back-popover-content-wrapper").remove().html()
    });
    $('[data-toggle="tooltip"]').tooltip({
        container: i,
        placement: "top"
    })
}

function OpenDeleteModal() {
    LoadModal("/ui/AccessManagement/DeleteRolesAndRightsForMe/", "#services-available-for-me-panel")
}

function AddNewRightHolder(n) {
    AddLoadingScreen(n);
    LoadModal("/ui/AccessManagement/AddNewRightHolder/", n)
}

function ToggleAdd(n) {
    var t = $(".add-mode").find("#add-right-checkbox-" + n)[0];
    t != null && SetAddCheckboxState(t, !t.checked)
}

function ToggleDelete(n) {
    var t = $(".delete-mode").find("#delete-right-checkbox-" + n)[0];
    t != null && SetDeleteCheckboxState(t, !t.checked)
}

function AddMode(n) {
    n ? ($(".modal-body").addClass("add-mode"), $("#ServiceSearchDropdown_Delegate").parent().hasClass("open") && $("#ServiceSearchDropdown_Delegate").dropdown("toggle"), $("#ServiceSearch_Input_Delegate").val(""), $("#addRoles").collapse("show"), $("#ServiceSearchDropdown").attr("data-toggle", ""), $("#ServiceSearch_Input").prop("disabled", !0), $("#ServiceSearch_Button").prop("disabled", !0), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", ""), $("#ServiceSearch_Input_Delegate").prop("disabled", !0), $("#ServiceSearch_Button_Delegate").prop("disabled", !0)) : ($(".modal-body").removeClass("add-mode"), $("#confirm-add").addClass("disabled"), $("#confirm-add").prop("disabled", !0), ResetCheckboxes(), ResetAddList(), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input").prop("disabled", !1), $("#ServiceSearch_Button").prop("disabled", !1), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input_Delegate").prop("disabled", !1), $("#ServiceSearch_Button_Delegate").prop("disabled", !1))
}

function DeleteMode(n) {
    n ? ($(".modal-body").addClass("delete-mode"), $("#ServiceSearchDropdown_Delegate").parent().hasClass("open") && $("#ServiceSearchDropdown_Delegate").dropdown("toggle"), $("#ServiceSearch_Input_Delegate").val(""), $("#DirectRoles-Delete").collapse("show"), $("#DirectRights-Delete").collapse("show"), $("#ServiceSearchDropdown").attr("data-toggle", ""), $("#ServiceSearch_Input").prop("disabled", !0), $("#ServiceSearch_Button").prop("disabled", !0), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", ""), $("#ServiceSearch_Input_Delegate").prop("disabled", !0), $("#ServiceSearch_Button_Delegate").prop("disabled", !0)) : ($(".modal-body").removeClass("delete-mode"), ResetCheckboxes(), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input").prop("disabled", !1), $("#ServiceSearch_Button").prop("disabled", !1), $("#ServiceSearchDropdown_Delegate").attr("data-toggle", "dropdown"), $("#ServiceSearch_Input_Delegate").prop("disabled", !1), $("#ServiceSearch_Button_Delegate").prop("disabled", !1))
}

function ShowResultMode(n) {
    n ? $(".current-page").addClass("search-result-mode") : ($(".current-page").removeClass("search-result-mode"), $("#ServiceSearchDropdown").attr("data-toggle", "dropdown"))
}

function DoServiceSearchResult(n) {
    var t = jQuery.Event("keyup");
    t.which = 13;
    $(n).keyup(t)
}

function RedirectOnFinish(n, t) {
    IsAuthenticated();
    IsAnyCheckboxChecked($("input[name^=add]")) ? n === "submit" ? $("#EditRolesAndRightForm").submit() : n === "email" && NextModalPage("/ui/AccessManagement/SubmitEmail?userID=" + t[0] + "&partyID=" + t[1]) : (CancelEditMode(), ResetCheckboxes())
}

function ShowDelegationHistory() {
    AddLoadingScreen("#rightHolders");
    $(".modal-footer").hide();
    LoadModal("/ui/AccessManagement/DelegationHistory", "#rightHolders")
}

function CheckAllByName(n, t) {
    checkboxes = document.getElementsByName(n);
    for (var i = 0, r = checkboxes.length; i < r; i++) SetDeleteCheckboxState(checkboxes[i], t)
}

function SetAddCheckboxState(n, t) {
    n.checked = t;
    var i = $("#addible_" + n.value).parent(),
        r = $("#added_" + n.value).parent();
    n.checked ? ($("#confirm-add").removeClass("disabled"), $("#confirm-add").removeAttr("disabled"), i.addClass("hidden"), r.removeClass("hidden")) : (i.removeClass("hidden"), r.addClass("hidden"))
}

function deactiveButton(n) {
    $(n).prop("disabled", !0);
    $(n).hasClass("btn-success") && $(n).removeClass("btn-success");
    $(n).hasClass("disabled") || $(n).addClass("disabled")
}

function activeButton(n) {
    $(n).prop("disabled", !1);
    $(n).hasClass("btn-success") || $(n).addClass("btn-success");
    $(n).hasClass("disabled") && $(n).removeClass("disabled")
}

function CheckRoleOrRightForDelegtion(n, t) {
    var r, i;
    if (t === "role" && (IsAnyCheckboxChecked($("input[name=addRoles]")) ? (activeButton("#confirm-delegate-roles"), activeButton("#submit-email-roles")) : (deactiveButton("#confirm-delegate-roles"), deactiveButton("#submit-email-roles"))), t === "right" && (IsAnyCheckboxChecked($("input[name=addRights]")) ? (activeButton("#confirm-delegate-rights"), activeButton("#submit-email-rights")) : ($("input:hidden[name=DefaultStyleConfirmButton]").val() === "btn-success" && (activeButton("#confirm-delegate-rights"), activeButton("#submit-email-rights")), deactiveButton("#confirm-delegate-rights"), deactiveButton("#submit-email-rights")), n.checked == !0 && (n.id.indexOf("Sign") >= 0 || n.id.indexOf("Write") >= 0 || n.id.indexOf("ArchiveDelete") >= 0)))
        for (r = $("input[name=addRights]"), i = 0; i < r.length; i++) r[i].id.indexOf("Read") >= 0 && (r[i].checked = !0)
}

function UpdateLocalRoleServiceList() {
    $("input[name=addRights]").prop("name", "LocalRoleModel.addRights");
    var n = $('input[name="LocalRoleModel.Rights"]');
    n.length != 0 && n.val().length != 0 && $("#UpdateLocalRoleRightsForm").append(n.clone());
    $("#UpdateLocalRoleRightsForm").submit();
    PreviousModalPage();
    setTimeout(function() {
        ShowResultMode(!1)
    }, 0)
}

function DeleteLocalRoleService(n) {
    $("#" + n).remove();
    $("#LocalRoleServiceList:has(tr)").length == 0 && $("#LocalRoleServiceList").html($('<input hidden name="LocalRoleModel.Rights" value="" />'));
    VerifyButtonState("#submitRole", '#LocalRoleForm input[name="LocalRoleModel.RoleName"],input[name="LocalRoleModel.Rights"]')
}

function ReturnAfterLocalRole(n) {
    ResetModalAndLoadPage("/ui/AccessManagement/ServicesAvailableForActor/?userID=" + $("input[name=CoveredByUserID]").val() + "&partyID=" + $("input[name=CoveredByPartyID]").val(), function() {
        $(this).find(".modal-body").addClass("add-mode");
        $(this).find("#DirectRoles-Delete").collapse("show");
        $(this).find("#addRoles").collapse("show");
        $(this).find("#confirm-add").removeClass("disabled");
        $(this).find("#confirm-add").prop("disabled", !1);
        ToggleAdd(n)
    })
}

function Cancel() {
    var t = $(".current-page"),
        i = $(":data(page-no)"),
        n = i.filter(function() {
            return $(this).data("goto-page-on-cancel") === !0
        });
    n.show();
    t.addClass("next-page");
    t.removeClass("current-page");
    setTimeout(function() {
        n.addClass("current-page");
        n.removeClass("previous-page");
        $("#altinnlogo").attr("src", "/ui/Content/img/altinn-logo-white.svg");
        SetRepresentedByUserColor(!1);
        $(".modal-backdrop").removeClass("modal-success");
        $(".modal-backdrop").removeClass("modal-error")
    }, 0);
    navigator.userAgent.match(/iPhone|iPad|iPod/i) && GoToModalHeader();
    t.one(window.transitionEnd, function() {
        var t = $(":data(page-no)");
        t.filter(function() {
            $(this).data("page-no") > n.data("page-no") && $(this).remove()
        })
    });
    window.transitionEnd || (i = $(":data(page-no)"), i.filter(function() {
        $(this).data("page-no") > n.data("page-no") && $(this).remove()
    }))
}

function LoadServiceListForRoleType(n) {
    $(".current-page .role-service-list-" + n).hasClass("loaded") || $("#services-available-for-me-panel .role-service-list-" + n).hasClass("loaded") || $.ajax({
        url: "/ui/AccessManagement/ServiceListForRoleType",
        data: {
            roleTypeId: n
        },
        beforeSend: function() {
            IsAuthenticated();
            $(".loading-role-type-services-" + n).prop("hidden", !1)
        }
    }).always(function() {
        $(".loading-role-type-services-" + n).prop("hidden", !0);
        $(".role-service-list-" + n).addClass("loaded")
    }).done(function(t) {
        $(".role-service-list-" + n).append(t);
        $(".role-details-service-counter-" + n).html($(t).filter("li").length)
    }).fail(function(n, t) {
        console.log("ServiceListForRoleType failed: " + t)
    })
}

function activateOnValidEmail(n) {
    validate($("#SubmitEmail_Input").val(), config.validEmail) ? (n.hasClass("disabled") && n.removeClass("disabled"), n.attr("disabled", !1)) : (n.hasClass("disabled") || n.addClass("disabled"), n.attr("disabled", !0))
}

function validate(n, t) {
    return n.match(t) != null
}

function submitEmail() {
    validate($("#SubmitEmail_Input").val(), config.validEmail) && ($("#EmailRequestedFor").val() == "DelegateRightsForm" && $("#DelegateRightsForm").length ? ($("#DelegateRightsForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#DelegateRightsForm").submit()) : $("#EmailRequestedFor").val() == "DelegateRolesForm" && $("#DelegateRolesForm").length ? ($("#DelegateRolesForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#DelegateRolesForm").submit()) : $("#EditRolesAndRightForm").length && ($("#EditRolesAndRightForm :input[name=RecepientEmail]:hidden").val($("#SubmitEmail_Input").val()), $("#EditRolesAndRightForm").submit()))
}

function SetDeleteCheckboxState(n, t) {
    n.checked = t;
    var i = $("#" + n.value);
    n.checked ? ($("#confirm-delete").removeClass("disabled"), $("#confirm-delete").removeAttr("disabled"), i.find(".list-text-container").addClass("text-checked-for-deletion"), i.find(".checkbox-icon").addClass("checked")) : (i.find(".list-text-container").removeClass("text-checked-for-deletion"), i.find(".checkbox-icon").removeClass("checked"), IsAnyCheckboxChecked($("input[name^=delete]")) || ($("#confirm-delete").addClass("disabled"), $("#confirm-delete").attr("disabled", "disabled")))
}

function ResetCheckboxes() {
    CheckAllByName("deleteRoles", !1);
    CheckAllByName("deleteRights", !1);
    CheckAllByName("addRoles", !1);
    $("#delete-all-roles-checkbox").prop("checked", !1);
    $("#delete-all-rights-checkbox").prop("checked", !1);
    $("#delete-all-roles-checkbox-icon").removeClass("checked");
    $("#delete-all-rights-checkbox-icon").removeClass("checked")
}

function CancelEditMode() {
    $(".modal-body").removeClass("delete-mode add-mode");
    $("#addRoles").removeClass("in");
    $("#delete-all-roles-checkbox").prop("checked", !1);
    $("#delete-all-roles-checkbox-icon").removeClass("checked");
    $("#delete-all-rights-checkbox").prop("checked", !1);
    $("#delete-all-rights-checkbox-icon").removeClass("checked")
}

function ResetAddList() {
    $(".addible").removeClass("hidden");
    $(".added").addClass("hidden")
}

function ClickCloseButton() {
    if (RemoveLoadingScreen("#focusModalContainer"), ShowResultMode(!1), $("#new-right-holder-page.current-page").length != 0) {
        var n = $.grep($("#direct-roles-link .round-box-bg-blue, #direct-rights-link .round-box-bg-blue"), function(n) {
            return n.innerHTML != 0
        });
        n.length == 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
            $("#closeOKpopover").focus()
        }, 500)) : $("#focusModal").modal("hide")
    } else IsEmailReceiptPrompt() ? showWarningPopover($(".right-over-close")) : IsAnyCheckboxChecked($("input[name^=delete], input[name^=add]")) && ($("#accessToServices").hasClass("add-mode") || $("#accessToServices").hasClass("delete-mode")) ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $('.current-page input[name="LocalRoleModel.Rights"]').length > 0 && GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"]') != 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $(".current-page").find("#LocalRoleForm").find(".added-static").length > 0 ? (showWarningPopover($(".right-over-close")), setTimeout(function() {
        $("#closeOKpopover").focus()
    }, 500)) : $("#focusModal").modal("hide")
}

function ClickBackButton() {
    if (RemoveLoadingScreen("#focusModalContainer"), $("#new-right-holder-page.current-page").length != 0) {
        var n = $.grep($("#direct-roles-link .round-box-bg-blue, #direct-rights-link .round-box-bg-blue"), function(n) {
            return n.innerHTML != 0
        });
        n.length == 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
            $("#backOKpopover").focus()
        }, 500)) : PreviousModalPage()
    } else IsEmailReceiptPrompt() ? PreviousModalPage() : IsAnyCheckboxChecked($("input[name^=delete], input[name^=add]")) && ($("#accessToServices").hasClass("add-mode") || $("#accessToServices").hasClass("delete-mode")) ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : $('.current-page input[name="LocalRoleModel.Rights"]').length > 0 && GetNumEmptyInputs('.current-page input[name="LocalRoleModel.Rights"]') != 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : $(".current-page").find("#LocalRoleForm").find(".added-static").length > 0 ? (showWarningPopover($(".left-over-close")), setTimeout(function() {
        $("#backOKpopover").focus()
    }, 500)) : PreviousModalPage()
}

function showWarningPopover(n) {
    n.popover("show")
}

function VerifyButtonState(n, t) {
    var i = GetNumEmptyInputs(t);
    i == 0 ? SetButtonState(n, !0) : SetButtonState(n, !1)
}

function SetButtonState(n, t) {
    $(n).prop("disabled", !t);
    t ? $(n).removeClass("disabled") : $(n).addClass("disabled")
}

function GetNumEmptyInputs(n) {
    var t = 0;
    return $(n).each(function() {
        $(this).val() == "" && t++
    }), t
}

function IsAnyCheckboxChecked(n) {
    for (var t = 0; t < n.length; t++)
        if (n[t].checked) return !0;
    return !1
}

function IsEmailReceiptPrompt() {
    return $(".current-page").find("#submitEmail").length > 0
}

function GetAllRightsForMe() {
    var n = $.ajax("/ui/AccessManagement/ServicesAvailableForMe/").done(function(n) {
        $("#myrightsContainer").html(n);
        EnablePopoversAndTooltips(".popoverDescription", !1)
    })
}

function ServicesAvailableForActor(n, t, i) {
    AddLoadingScreen(i);
    LoadModal("/ui/AccessManagement/ServicesAvailableForActor/?userID=" + n + "&partyID=" + t, i)
}

function ConsentOverview(n, t, i) {
    AddLoadingScreen(i);
    LoadModal("/ui/AccessManagement/ConsentOverview/?userID=" + n + "&partyID=" + t, i);
    EnablePopoversAndTooltips(".right-over-close", !0)
}

function ChangeTab(n) {
    $(".altinn-tab-container div").children().removeClass("selected");
    $("#" + n).addClass("selected");
    $(".altinn-tab-pages").children().css("display", "none");
    $("#" + n + "Page").css("display", "block")
}

function ViewDelegateSingleRights() {
    var n = $.ajax("/ui/AccessManagement/DelegateRights/").done(function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function ViewRights(n) {
    var t = "/ui/AccessManagement/ViewRights/" + n,
        i = $.ajax(t).done(function(n) {
            $("#modifyRightHoldersContainer").html(n)
        })
}

function ViewRevokeRights(n) {
    var t = "/ui/AccessManagement/RevokeRights/" + n,
        i = $.ajax(t).done(function(n) {
            $("#modifyRightHoldersContainer").html(n)
        })
}

function PostServicesByRoles() {
    var n = $("#servicesFilterForm"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#serviceList").html(n)
    })
}

function GetServicesByRoles(n, t) {
    LoadModal("/ui/AccessManagement/ServicesByRolesOverview?userID=" + n + "&partyID=" + t, "#services-available-for-me-panel")
}

function Delegate(n, t, i, r, u) {
    NextModalPage("/ui/AccessManagement/Delegate?userId=" + n + "&partyId=" + t + "&serviceCode=" + i + "&serviceEditionCode=" + r + "&secondaryPage=" + u)
}

function AddRightsToLocalRole(n, t) {
    var i = encodeURI($("#RoleName_Input").val()),
        r = $("#serviceRights").val();
    NextModalPage("/ui/AccessManagement/AddRightsToLocalRole?roleName=" + i + "&serviceCode=" + n + "&serviceEditionCode=" + t + "&serviceRights=" + r)
}

function SearchForService(n, t, i, r, u, f, e) {
    IsAuthenticated();
    var o = $("#ServiceSearchDropdown_" + u),
        s = o.data("jqXHR");
    n == null || n.length == 0 || $("#ServiceSearchDropdown_" + u).parent().hasClass("open") || $("#ServiceSearchDropdown_" + u).dropdown("toggle");
    s && s.abort();
    o.data("jqXHR", $.ajax({
        cache: !1,
        type: "POST",
        url: "/ui/AccessManagement/SearchAvailableServices/",
        data: {
            searchText: n,
            partyType: t,
            userID: i,
            partyID: r,
            pageMode: u,
            isAdvancedSearch: f,
            isSearchResultReverseOrder: e
        },
        success: function(t) {
            f ? ($(".current-page").hasClass("search-result-mode") || (CancelEditMode(), $(".current-page").addClass("search-result-mode")), $(".current-page").find(".advanced-search-results").html(t), $("#ServiceSearch_Input_" + u).focus(), $("#ServiceSearchDropdown_" + u).parent().hasClass("open") && $("#ServiceSearchDropdown_" + u).dropdown("toggle")) : ($("#ServiceSearchResults_" + u).html(t), n.length > 0 && $("#ServiceSearch_Input_" + u).focus())
        },
        error: function(n) {
            console.log("Unable to perform service search (aborted?)");
            console.log(n)
        }
    }))
}

function DelegateSingleRights() {
    var n = $("#delegaterightsform"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function RevokeRights() {
    var n = $("#revokerightsform"),
        t = n.attr("action"),
        i = n.serialize();
    $.post(t, i, function(n) {
        $("#modifyRightHoldersContainer").html(n)
    })
}

function UpdateEndUserSystems() {
    var n = $("#administrateeusform"),
        t, i;
    AddLoadingScreen("#administrateEusContainer .panel-section");
    t = n.attr("action");
    i = n.serialize();
    $.post(t, i, function(n) {
        RemoveLoadingScreen("#administrateEusContainer .panel-section");
        $("#administrateEusContainer").html(n)
    })
}

function EditEndUserSystem(n) {
    AddLoadingScreen("#administrateEusContainer .panel-section");
    var t = "/ui/Profile/EditEndUserSystem/" + n,
        i = $.ajax(t).done(function(n) {
            RemoveLoadingScreen("#administrateEusContainer .panel-section");
            $("#administrateEusContainer").html(n)
        })
}

function DeleteEndUserSystem(n) {
    AddLoadingScreen("#administrateEusContainer .panel-section");
    $("#administrateEusContainer .popover").popover("hide");
    var t = "/ui/Profile/DeletedEndUserSystem/" + n,
        i = $.ajax(t).done(function(n) {
            RemoveLoadingScreen("#administrateEusContainer .panel-section");
            $("#euslistcontainer").html(n)
        })
}

function GetRightHolders() {
    var n = $.ajax("/ui/Profile/RightHolders/").done(function(n) {
        $("#rightholdercontainer").html(n)
    })
}

function DeclineTransferRequest(n, t) {
    $("#TransferRequestDecline #TransferRequest_RequestedUserID").val(n);
    $("#TransferRequestDecline #TransferRequest_RequestedUserName").val(t)
}

function ConfirmTransferRequest(n, t) {
    $("#TransferRequestAccept #TransferRequest_RequestedUserID").val(n);
    $("#TransferRequestAccept #TransferRequest_RequestedUserName").val(t)
}

function StartTransferRequest(n) {
    var t = $("#TransferRequest");
    return t.removeData("validator"), t.removeData("unobtrusiveValidation"), $.validator.unobtrusive.parse(t), window.confirm(n)
}

function UpdateSelectedReportee() {
    var n = $("#reportee-form"),
        i = n.attr("action"),
        t = n.serialize();
    $.ajax({
        url: "/ui/AccessManagement/ChangeReportee",
        type: "POST",
        data: t,
        success: function() {
            location.reload()
        },
        error: function() {
            console.log("Unable to change reportee")
        }
    })
}

function EReceiptRequestChange() {
    $.ajax({
        cache: !1,
        type: "POST",
        url: "/ui/Profile/UpdateReporteeEndPoint",
        datatType: "html",
        data: {
            __RequestVerificationToken: $("#PersonalContactSettings input[type=hidden][name='__RequestVerificationToken']").val(),
            reporteeEndpoint: {
                IsEmailReceiptRequested: $("input[type=checkbox][id='ReporteeEndPoint_IsEmailReceiptRequested']").is(":checked")
            }
        }
    }).done(function(n) {
        $("#contactSettingsPersonal").html(n)
    })
}

function NotificationSettings(n, t) {
    n == "Section1" ? ($("#Section1").hide(), $("#Section2").show()) : n == "Section2" && t == "Cancel" ? ($("#Section1").show(), $("#Section2").hide()) : n == "Section2" && t == "Next" ? ($("#Section3").show(), $("#Section2").hide()) : n == "Section3" && t == "Cancel" && ($("#Section1").show(), $("#Section3").hide())
}

function ShowPassword(n, t) {
    var r = document,
        i = r.getElementById(t);
    i.getAttribute("type") == "text" ? (i.setAttribute("type", "password"), $(n).children(".hide-password-text").hide(), $(n).children(".show-password-text").show()) : (i.setAttribute("type", "text"), $(n).children(".hide-password-text").show(), $(n).children(".show-password-text").hide(), setTimeout(function() {
        r.getElementById(t).setAttribute("type", "password");
        $(n).children(".hide-password-text").hide();
        $(n).children(".show-password-text").show()
    }, 15e3))
}

function ref(n) {
    var t = n;
    location.href = "/ui/Profile/?R=" + t
}

function ChangePersonalSettings() {
    $("#ContactSettingsPersonalDiv").find("button[type='submit']").removeClass("disabled");
    $("#ContactSettingsPersonalDiv").find("button[type='submit']").attr("disabled", !1)
}

function HideNotificationSentMessages() {
    $("#successEmailPersOrg").hide();
    $("#successPhonePersOrg").hide();
    $("#changesSavedInfoMessage").hide()
}

function setVisibility(n, t) {
    var i = document.getElementById(n),
        t = document.getElementById(t);
    t.style.visibility = i.value.length > 0 ? "visible" : "hidden"
}

function SetDefaultReporteeAndExpandPortalSettingsAccordian(n) {
    $("#IsValidReportee").val() == "True" && $("#reporteemenulist ul li").each(function() {
        var t = $(this).find("input[name='reporteedropdown_partyId']").val();
        if (t == n || t == n) return $("#reporteeselected").html($(this).html()), setPartyID(n), !1
    });
    $("#collapseIntegration").collapse({
        parent: "#accordion"
    }, "show")
}

function GetParameterValues(n) {
    for (var i, r = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), t = 0; t < r.length; t++)
        if (i = r[t].split("="), i[0] == n) return i[1]
}

function RedirectToSearchPage() {
    window.location.href = "/ui/Profile/ReporteeList?DR=true"
}

function EditPassword(n, t) {
    $(n).parent().hide();
    $(t).show()
}

function RemoveConsentElement(n, t) {
    $("#" + n).remove();
    $(".consent-remove-box").length === 0 && ($("#" + t).remove(), PreviousModalPage())
}

function truncateToNumberOfLines(n, t) {
    var i = $.trim(n.text()),
        e = n.height(),
        o = parseInt(n.css("line-height"), 10),
        r = e / o,
        u = i.length,
        s = u / r,
        f = Math.ceil(s * t);
    if (f < u) return n.text(i.substring(0, f) + "...");
    r == 1 && n.css("padding-bottom", "24px")
}

function SetRepresentedByUserColor(n) {
    n ? ($("#represented-by-user").hide(), $("#represented-by-user").css("color", ""), $("#icon-org").length > 0 ? $("#icon-org").attr("src", "/ui/Content/img/icon-org-grey.svg") : $("#icon-person").attr("src", "/ui/Content/img/icon-person-grey.svg")) : ($("#represented-by-user").show(), $("#represented-by-user").css("color", "#ffffff"), $("#icon-org").length > 0 ? $("#icon-org").attr("src", "/ui/Content/img/ikon_representerer_fokus_virk.svg") : $("#icon-person").attr("src", "/ui/Content/img/ikon_representerer_fokus_person.svg"))
}
var selectedRoleIds, expandCollapseInputGroup, GoToModalHeader, config;
! function(n, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = n.document ? t(n, !0) : function(n) {
        if (!n.document) throw new Error("jQuery requires a window with a document");
        return t(n)
    } : t(n)
}("undefined" != typeof window ? window : this, function(n, t) {
    function ri(n) {
        var t = "length" in n && n.length,
            r = i.type(n);
        return "function" === r || i.isWindow(n) ? !1 : 1 === n.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in n
    }

    function ui(n, t, r) {
        if (i.isFunction(t)) return i.grep(n, function(n, i) {
            return !!t.call(n, i, n) !== r
        });
        if (t.nodeType) return i.grep(n, function(n) {
            return n === t !== r
        });
        if ("string" == typeof t) {
            if (ef.test(t)) return i.filter(t, n, r);
            t = i.filter(t, n)
        }
        return i.grep(n, function(n) {
            return ft.call(t, n) >= 0 !== r
        })
    }

    function ur(n, t) {
        while ((n = n[t]) && 1 !== n.nodeType);
        return n
    }

    function of(n) {
        var t = fi[n] = {};
        return i.each(n.match(c) || [], function(n, i) {
            t[i] = !0
        }), t
    }

    function ht() {
        u.removeEventListener("DOMContentLoaded", ht, !1);
        n.removeEventListener("load", ht, !1);
        i.ready()
    }

    function v() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        });
        this.expando = i.expando + v.uid++
    }

    function fr(n, t, r) {
        var u;
        if (void 0 === r && 1 === n.nodeType)
            if (u = "data-" + t.replace(hf, "-$1").toLowerCase(), r = n.getAttribute(u), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : sf.test(r) ? i.parseJSON(r) : r
                } catch (f) {}
                e.set(n, t, r)
            } else r = void 0;
        return r
    }

    function lt() {
        return !0
    }

    function k() {
        return !1
    }

    function hr() {
        try {
            return u.activeElement
        } catch (n) {}
    }

    function vr(n, t) {
        return i.nodeName(n, "table") && i.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
    }

    function bf(n) {
        return n.type = (null !== n.getAttribute("type")) + "/" + n.type, n
    }

    function kf(n) {
        var t = pf.exec(n.type);
        return t ? n.type = t[1] : n.removeAttribute("type"), n
    }

    function ei(n, t) {
        for (var i = 0, u = n.length; u > i; i++) r.set(n[i], "globalEval", !t || r.get(t[i], "globalEval"))
    }

    function yr(n, t) {
        var u, c, f, s, h, l, a, o;
        if (1 === t.nodeType) {
            if (r.hasData(n) && (s = r.access(n), h = r.set(t, s), o = s.events)) {
                delete h.handle;
                h.events = {};
                for (f in o)
                    for (u = 0, c = o[f].length; c > u; u++) i.event.add(t, f, o[f][u])
            }
            e.hasData(n) && (l = e.access(n), a = i.extend({}, l), e.set(t, a))
        }
    }

    function o(n, t) {
        var r = n.getElementsByTagName ? n.getElementsByTagName(t || "*") : n.querySelectorAll ? n.querySelectorAll(t || "*") : [];
        return void 0 === t || t && i.nodeName(n, t) ? i.merge([n], r) : r
    }

    function df(n, t) {
        var i = t.nodeName.toLowerCase();
        "input" === i && er.test(n.type) ? t.checked = n.checked : ("input" === i || "textarea" === i) && (t.defaultValue = n.defaultValue)
    }

    function pr(t, r) {
        var f, u = i(r.createElement(t)).appendTo(r.body),
            e = n.getDefaultComputedStyle && (f = n.getDefaultComputedStyle(u[0])) ? f.display : i.css(u[0], "display");
        return u.detach(), e
    }

    function si(n) {
        var r = u,
            t = oi[n];
        return t || (t = pr(n, r), "none" !== t && t || (at = (at || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement), r = at[0].contentDocument, r.write(), r.close(), t = pr(n, r), at.detach()), oi[n] = t), t
    }

    function it(n, t, r) {
        var e, o, s, u, f = n.style;
        return r = r || vt(n), r && (u = r.getPropertyValue(t) || r[t]), r && ("" !== u || i.contains(n.ownerDocument, n) || (u = i.style(n, t)), hi.test(u) && wr.test(t) && (e = f.width, o = f.minWidth, s = f.maxWidth, f.minWidth = f.maxWidth = f.width = u, u = r.width, f.width = e, f.minWidth = o, f.maxWidth = s)), void 0 !== u ? u + "" : u
    }

    function br(n, t) {
        return {
            get: function() {
                return n() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function gr(n, t) {
        if (t in n) return t;
        for (var r = t[0].toUpperCase() + t.slice(1), u = t, i = dr.length; i--;)
            if (t = dr[i] + r, t in n) return t;
        return u
    }

    function nu(n, t, i) {
        var r = ne.exec(t);
        return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
    }

    function tu(n, t, r, u, f) {
        for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2) "margin" === r && (o += i.css(n, r + p[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + p[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + p[e] + "Width", !0, f))) : (o += i.css(n, "padding" + p[e], !0, f), "padding" !== r && (o += i.css(n, "border" + p[e] + "Width", !0, f)));
        return o
    }

    function iu(n, t, r) {
        var o = !0,
            u = "width" === t ? n.offsetWidth : n.offsetHeight,
            e = vt(n),
            s = "border-box" === i.css(n, "boxSizing", !1, e);
        if (0 >= u || null == u) {
            if (u = it(n, t, e), (0 > u || null == u) && (u = n.style[t]), hi.test(u)) return u;
            o = s && (f.boxSizingReliable() || u === n.style[t]);
            u = parseFloat(u) || 0
        }
        return u + tu(n, t, r || (s ? "border" : "content"), o, e) + "px"
    }

    function ru(n, t) {
        for (var e, u, s, o = [], f = 0, h = n.length; h > f; f++) u = n[f], u.style && (o[f] = r.get(u, "olddisplay"), e = u.style.display, t ? (o[f] || "none" !== e || (u.style.display = ""), "" === u.style.display && tt(u) && (o[f] = r.access(u, "olddisplay", si(u.nodeName)))) : (s = tt(u), "none" === e && s || r.set(u, "olddisplay", s ? e : i.css(u, "display"))));
        for (f = 0; h > f; f++) u = n[f], u.style && (t && "none" !== u.style.display && "" !== u.style.display || (u.style.display = t ? o[f] || "" : "none"));
        return n
    }

    function s(n, t, i, r, u) {
        return new s.prototype.init(n, t, i, r, u)
    }

    function fu() {
        return setTimeout(function() {
            d = void 0
        }), d = i.now()
    }

    function wt(n, t) {
        var r, u = 0,
            i = {
                height: n
            };
        for (t = t ? 1 : 0; 4 > u; u += 2 - t) r = p[u], i["margin" + r] = i["padding" + r] = n;
        return t && (i.opacity = i.width = n), i
    }

    function eu(n, t, i) {
        for (var u, f = (rt[t] || []).concat(rt["*"]), r = 0, e = f.length; e > r; r++)
            if (u = f[r].call(i, t, n)) return u
    }

    function fe(n, t, u) {
        var f, a, p, v, o, w, h, b, l = this,
            y = {},
            s = n.style,
            c = n.nodeType && tt(n),
            e = r.get(n, "fxshow");
        u.queue || (o = i._queueHooks(n, "fx"), null == o.unqueued && (o.unqueued = 0, w = o.empty.fire, o.empty.fire = function() {
            o.unqueued || w()
        }), o.unqueued++, l.always(function() {
            l.always(function() {
                o.unqueued--;
                i.queue(n, "fx").length || o.empty.fire()
            })
        }));
        1 === n.nodeType && ("height" in t || "width" in t) && (u.overflow = [s.overflow, s.overflowX, s.overflowY], h = i.css(n, "display"), b = "none" === h ? r.get(n, "olddisplay") || si(n.nodeName) : h, "inline" === b && "none" === i.css(n, "float") && (s.display = "inline-block"));
        u.overflow && (s.overflow = "hidden", l.always(function() {
            s.overflow = u.overflow[0];
            s.overflowX = u.overflow[1];
            s.overflowY = u.overflow[2]
        }));
        for (f in t)
            if (a = t[f], re.exec(a)) {
                if (delete t[f], p = p || "toggle" === a, a === (c ? "hide" : "show")) {
                    if ("show" !== a || !e || void 0 === e[f]) continue;
                    c = !0
                }
                y[f] = e && e[f] || i.style(n, f)
            } else h = void 0;
        if (i.isEmptyObject(y)) "inline" === ("none" === h ? si(n.nodeName) : h) && (s.display = h);
        else {
            e ? "hidden" in e && (c = e.hidden) : e = r.access(n, "fxshow", {});
            p && (e.hidden = !c);
            c ? i(n).show() : l.done(function() {
                i(n).hide()
            });
            l.done(function() {
                var t;
                r.remove(n, "fxshow");
                for (t in y) i.style(n, t, y[t])
            });
            for (f in y) v = eu(c ? e[f] : 0, f, l), f in e || (e[f] = v.start, c && (v.end = v.start, v.start = "width" === f || "height" === f ? 1 : 0))
        }
    }

    function ee(n, t) {
        var r, f, e, u, o;
        for (r in n)
            if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
                u = o.expand(u);
                delete n[f];
                for (r in u) r in n || (n[r] = u[r], t[r] = e)
            } else t[f] = e
    }

    function ou(n, t, r) {
        var h, e, o = 0,
            l = pt.length,
            f = i.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                if (e) return !1;
                for (var s = d || fu(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, o = u.tweens.length; o > r; r++) u.tweens[r].run(i);
                return f.notifyWith(n, [u, i, t]), 1 > i && o ? t : (f.resolveWith(n, [u]), !1)
            },
            u = f.promise({
                elem: n,
                props: i.extend({}, t),
                opts: i.extend(!0, {
                    specialEasing: {}
                }, r),
                originalProperties: t,
                originalOptions: r,
                startTime: d || fu(),
                duration: r.duration,
                tweens: [],
                createTween: function(t, r) {
                    var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
                    return u.tweens.push(f), f
                },
                stop: function(t) {
                    var i = 0,
                        r = t ? u.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; r > i; i++) u.tweens[i].run(1);
                    return t ? f.resolveWith(n, [u, t]) : f.rejectWith(n, [u, t]), this
                }
            }),
            s = u.props;
        for (ee(s, u.opts.specialEasing); l > o; o++)
            if (h = pt[o].call(u, n, s, u.opts)) return h;
        return i.map(s, eu, u), i.isFunction(u.opts.start) && u.opts.start.call(n, u), i.fx.timer(i.extend(c, {
            elem: n,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function pu(n) {
        return function(t, r) {
            "string" != typeof t && (r = t, t = "*");
            var u, f = 0,
                e = t.toLowerCase().match(c) || [];
            if (i.isFunction(r))
                while (u = e[f++]) "+" === u[0] ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
        }
    }

    function wu(n, t, r, u) {
        function e(s) {
            var h;
            return f[s] = !0, i.each(n[s] || [], function(n, i) {
                var s = i(t, r, u);
                return "string" != typeof s || o || f[s] ? o ? !(h = s) : void 0 : (t.dataTypes.unshift(s), e(s), !1)
            }), h
        }
        var f = {},
            o = n === ci;
        return e(t.dataTypes[0]) || !f["*"] && e("*")
    }

    function ai(n, t) {
        var r, u, f = i.ajaxSettings.flatOptions || {};
        for (r in t) void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
        return u && i.extend(!0, n, u), n
    }

    function ae(n, t, i) {
        for (var e, u, f, o, s = n.contents, r = n.dataTypes;
            "*" === r[0];) r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
        if (e)
            for (u in s)
                if (s[u] && s[u].test(e)) {
                    r.unshift(u);
                    break
                }
        if (r[0] in i) f = r[0];
        else {
            for (u in i) {
                if (!r[0] || n.converters[u + " " + r[0]]) {
                    f = u;
                    break
                }
                o || (o = u)
            }
            f = f || o
        }
        if (f) return (f !== r[0] && r.unshift(f), i[f])
    }

    function ve(n, t, i, r) {
        var h, u, f, s, e, o = {},
            c = n.dataTypes.slice();
        if (c[1])
            for (f in n.converters) o[f.toLowerCase()] = n.converters[f];
        for (u = c.shift(); u;)
            if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
                if ("*" === u) u = e;
                else if ("*" !== e && e !== u) {
            if (f = o[e + " " + u] || o["* " + u], !f)
                for (h in o)
                    if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
                        f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
                        break
                    }
            if (f !== !0)
                if (f && n.throws) t = f(t);
                else try {
                    t = f(t)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: f ? l : "No conversion from " + e + " to " + u
                    }
                }
        }
        return {
            state: "success",
            data: t
        }
    }

    function vi(n, t, r, u) {
        var f;
        if (i.isArray(t)) i.each(t, function(t, i) {
            r || pe.test(n) ? u(n, i) : vi(n + "[" + ("object" == typeof i ? t : "") + "]", i, r, u)
        });
        else if (r || "object" !== i.type(t)) u(n, t);
        else
            for (f in t) vi(n + "[" + f + "]", t[f], r, u)
    }

    function ku(n) {
        return i.isWindow(n) ? n : 9 === n.nodeType && n.defaultView
    }
    var w = [],
        a = w.slice,
        bi = w.concat,
        ti = w.push,
        ft = w.indexOf,
        et = {},
        nf = et.toString,
        ii = et.hasOwnProperty,
        f = {},
        u = n.document,
        ki = "2.1.4",
        i = function(n, t) {
            return new i.fn.init(n, t)
        },
        tf = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        rf = /^-ms-/,
        uf = /-([\da-z])/gi,
        ff = function(n, t) {
            return t.toUpperCase()
        },
        y, ot, nr, tr, ir, rr, c, fi, st, l, b, at, oi, oe, su, g, hu, bt, cu, kt, dt, yi, ni, pi, wi, du, gu;
    i.fn = i.prototype = {
        jquery: ki,
        constructor: i,
        selector: "",
        length: 0,
        toArray: function() {
            return a.call(this)
        },
        get: function(n) {
            return null != n ? 0 > n ? this[n + this.length] : this[n] : a.call(this)
        },
        pushStack: function(n) {
            var t = i.merge(this.constructor(), n);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(n, t) {
            return i.each(this, n, t)
        },
        map: function(n) {
            return this.pushStack(i.map(this, function(t, i) {
                return n.call(t, i, t)
            }))
        },
        slice: function() {
            return this.pushStack(a.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(n) {
            var i = this.length,
                t = +n + (0 > n ? i : 0);
            return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: ti,
        sort: w.sort,
        splice: w.splice
    };
    i.extend = i.fn.extend = function() {
        var e, f, r, t, o, s, n = arguments[0] || {},
            u = 1,
            c = arguments.length,
            h = !1;
        for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" == typeof n || i.isFunction(n) || (n = {}), u === c && (n = this, u--); c > u; u++)
            if (null != (e = arguments[u]))
                for (f in e) r = n[f], t = e[f], n !== t && (h && t && (i.isPlainObject(t) || (o = i.isArray(t))) ? (o ? (o = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : void 0 !== t && (n[f] = t));
        return n
    };
    i.extend({
        expando: "jQuery" + (ki + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(n) {
            throw new Error(n);
        },
        noop: function() {},
        isFunction: function(n) {
            return "function" === i.type(n)
        },
        isArray: Array.isArray,
        isWindow: function(n) {
            return null != n && n === n.window
        },
        isNumeric: function(n) {
            return !i.isArray(n) && n - parseFloat(n) + 1 >= 0
        },
        isPlainObject: function(n) {
            return "object" !== i.type(n) || n.nodeType || i.isWindow(n) ? !1 : n.constructor && !ii.call(n.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(n) {
            for (var t in n) return !1;
            return !0
        },
        type: function(n) {
            return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? et[nf.call(n)] || "object" : typeof n
        },
        globalEval: function(n) {
            var t, r = eval;
            n = i.trim(n);
            n && (1 === n.indexOf("use strict") ? (t = u.createElement("script"), t.text = n, u.head.appendChild(t).parentNode.removeChild(t)) : r(n))
        },
        camelCase: function(n) {
            return n.replace(rf, "ms-").replace(uf, ff)
        },
        nodeName: function(n, t) {
            return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(n, t, i) {
            var u, r = 0,
                f = n.length,
                e = ri(n);
            if (i) {
                if (e) {
                    for (; f > r; r++)
                        if (u = t.apply(n[r], i), u === !1) break
                } else
                    for (r in n)
                        if (u = t.apply(n[r], i), u === !1) break
            } else if (e) {
                for (; f > r; r++)
                    if (u = t.call(n[r], r, n[r]), u === !1) break
            } else
                for (r in n)
                    if (u = t.call(n[r], r, n[r]), u === !1) break; return n
        },
        trim: function(n) {
            return null == n ? "" : (n + "").replace(tf, "")
        },
        makeArray: function(n, t) {
            var r = t || [];
            return null != n && (ri(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : ti.call(r, n)), r
        },
        inArray: function(n, t, i) {
            return null == t ? -1 : ft.call(t, n, i)
        },
        merge: function(n, t) {
            for (var u = +t.length, i = 0, r = n.length; u > i; i++) n[r++] = t[i];
            return n.length = r, n
        },
        grep: function(n, t, i) {
            for (var u, f = [], r = 0, e = n.length, o = !i; e > r; r++) u = !t(n[r], r), u !== o && f.push(n[r]);
            return f
        },
        map: function(n, t, i) {
            var u, r = 0,
                e = n.length,
                o = ri(n),
                f = [];
            if (o)
                for (; e > r; r++) u = t(n[r], r, i), null != u && f.push(u);
            else
                for (r in n) u = t(n[r], r, i), null != u && f.push(u);
            return bi.apply([], f)
        },
        guid: 1,
        proxy: function(n, t) {
            var u, f, r;
            return "string" == typeof t && (u = n[t], t = n, n = u), i.isFunction(n) ? (f = a.call(arguments, 2), r = function() {
                return n.apply(t || this, f.concat(a.call(arguments)))
            }, r.guid = n.guid = n.guid || i.guid++, r) : void 0
        },
        now: Date.now,
        support: f
    });
    i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(n, t) {
        et["[object " + t + "]"] = t.toLowerCase()
    });
    y = function(n) {
        function r(n, t, i, r) {
            var p, s, a, c, w, y, d, v, nt, g;
            if ((t ? t.ownerDocument || t : h) !== o && k(t), t = t || o, i = i || [], c = t.nodeType, "string" != typeof n || !n || 1 !== c && 9 !== c && 11 !== c) return i;
            if (!r && l) {
                if (11 !== c && (p = hr.exec(n)))
                    if (a = p[1]) {
                        if (9 === c) {
                            if (s = t.getElementById(a), !s || !s.parentNode) return i;
                            if (s.id === a) return i.push(s), i
                        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(a)) && et(t, s) && s.id === a) return i.push(s), i
                    } else {
                        if (p[2]) return b.apply(i, t.getElementsByTagName(n)), i;
                        if ((a = p[3]) && u.getElementsByClassName) return b.apply(i, t.getElementsByClassName(a)), i
                    }
                if (u.qsa && (!e || !e.test(n))) {
                    if (v = d = f, nt = t, g = 1 !== c && n, 1 === c && "object" !== t.nodeName.toLowerCase()) {
                        for (y = ft(n), (d = t.getAttribute("id")) ? v = d.replace(cr, "\\$&") : t.setAttribute("id", v), v = "[id='" + v + "'] ", w = y.length; w--;) y[w] = v + vt(y[w]);
                        nt = dt.test(n) && ti(t.parentNode) || t;
                        g = y.join(",")
                    }
                    if (g) try {
                        return b.apply(i, nt.querySelectorAll(g)), i
                    } catch (tt) {} finally {
                        d || t.removeAttribute("id")
                    }
                }
            }
            return oi(n.replace(lt, "$1"), t, i, r)
        }

        function gt() {
            function n(r, u) {
                return i.push(r + " ") > t.cacheLength && delete n[i.shift()], n[r + " "] = u
            }
            var i = [];
            return n
        }

        function c(n) {
            return n[f] = !0, n
        }

        function v(n) {
            var t = o.createElement("div");
            try {
                return !!n(t)
            } catch (i) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null
            }
        }

        function ni(n, i) {
            for (var u = n.split("|"), r = n.length; r--;) t.attrHandle[u[r]] = i
        }

        function wi(n, t) {
            var i = t && n,
                r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || li) - (~n.sourceIndex || li);
            if (r) return r;
            if (i)
                while (i = i.nextSibling)
                    if (i === t) return -1;
            return n ? 1 : -1
        }

        function lr(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return "input" === i && t.type === n
            }
        }

        function ar(n) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === n
            }
        }

        function tt(n) {
            return c(function(t) {
                return t = +t, c(function(i, r) {
                    for (var u, f = n([], i.length, t), e = f.length; e--;) i[u = f[e]] && (i[u] = !(r[u] = i[u]))
                })
            })
        }

        function ti(n) {
            return n && "undefined" != typeof n.getElementsByTagName && n
        }

        function bi() {}

        function vt(n) {
            for (var t = 0, r = n.length, i = ""; r > t; t++) i += n[t].value;
            return i
        }

        function ii(n, t, i) {
            var r = t.dir,
                u = i && "parentNode" === r,
                e = ki++;
            return t.first ? function(t, i, f) {
                while (t = t[r])
                    if (1 === t.nodeType || u) return n(t, i, f)
            } : function(t, i, o) {
                var s, h, c = [a, e];
                if (o) {
                    while (t = t[r])
                        if ((1 === t.nodeType || u) && n(t, i, o)) return !0
                } else
                    while (t = t[r])
                        if (1 === t.nodeType || u) {
                            if (h = t[f] || (t[f] = {}), (s = h[r]) && s[0] === a && s[1] === e) return c[2] = s[2];
                            if (h[r] = c, c[2] = n(t, i, o)) return !0
                        }
            }
        }

        function ri(n) {
            return n.length > 1 ? function(t, i, r) {
                for (var u = n.length; u--;)
                    if (!n[u](t, i, r)) return !1;
                return !0
            } : n[0]
        }

        function vr(n, t, i) {
            for (var u = 0, f = t.length; f > u; u++) r(n, t[u], i);
            return i
        }

        function yt(n, t, i, r, u) {
            for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)(e = n[f]) && (!i || i(e, r, u)) && (o.push(e), h && t.push(f));
            return o
        }

        function ui(n, t, i, r, u, e) {
            return r && !r[f] && (r = ui(r)), u && !u[f] && (u = ui(u, e)), c(function(f, e, o, s) {
                var l, c, a, p = [],
                    y = [],
                    w = e.length,
                    k = f || vr(t || "*", o.nodeType ? [o] : o, []),
                    v = !n || !f && t ? k : yt(k, p, n, o, s),
                    h = i ? u || (f ? n : w || r) ? [] : e : v;
                if (i && i(v, h, o, s), r)
                    for (l = yt(h, y), r(l, [], o, s), c = l.length; c--;)(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
                if (f) {
                    if (u || n) {
                        if (u) {
                            for (l = [], c = h.length; c--;)(a = h[c]) && l.push(v[c] = a);
                            u(null, h = [], l, s)
                        }
                        for (c = h.length; c--;)(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
                    }
                } else h = yt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : b.apply(e, h)
            })
        }

        function fi(n) {
            for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ii(function(n) {
                    return n === o
                }, c, !0), a = ii(function(n) {
                    return nt(o, n) > -1
                }, c, !0), e = [function(n, t, i) {
                    var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
                    return o = null, r
                }]; s > i; i++)
                if (u = t.relative[n[i].type]) e = [ii(ri(e), u)];
                else {
                    if (u = t.filter[n[i].type].apply(null, n[i].matches), u[f]) {
                        for (r = ++i; s > r; r++)
                            if (t.relative[n[r].type]) break;
                        return ui(i > 1 && ri(e), i > 1 && vt(n.slice(0, i - 1).concat({
                            value: " " === n[i - 2].type ? "*" : ""
                        })).replace(lt, "$1"), u, r > i && fi(n.slice(i, r)), s > r && fi(n = n.slice(r)), s > r && vt(n))
                    }
                    e.push(u)
                }
            return ri(e)
        }

        function yr(n, i) {
            var u = i.length > 0,
                f = n.length > 0,
                e = function(e, s, h, c, l) {
                    var y, d, w, k = 0,
                        v = "0",
                        g = e && [],
                        p = [],
                        nt = ht,
                        tt = e || f && t.find.TAG("*", l),
                        it = a += null == nt ? 1 : Math.random() || .1,
                        rt = tt.length;
                    for (l && (ht = s !== o && s); v !== rt && null != (y = tt[v]); v++) {
                        if (f && y) {
                            for (d = 0; w = n[d++];)
                                if (w(y, s, h)) {
                                    c.push(y);
                                    break
                                }
                            l && (a = it)
                        }
                        u && ((y = !w && y) && k--, e && g.push(y))
                    }
                    if (k += v, u && v !== k) {
                        for (d = 0; w = i[d++];) w(g, p, s, h);
                        if (e) {
                            if (k > 0)
                                while (v--) g[v] || p[v] || (p[v] = gi.call(c));
                            p = yt(p)
                        }
                        b.apply(c, p);
                        l && !e && p.length > 0 && k + i.length > 1 && r.uniqueSort(c)
                    }
                    return l && (a = it, ht = nt), g
                };
            return u ? c(e) : e
        }
        var it, u, t, st, ei, ft, pt, oi, ht, w, rt, k, o, s, l, e, d, ct, et, f = "sizzle" + 1 * new Date,
            h = n.document,
            a = 0,
            ki = 0,
            si = gt(),
            hi = gt(),
            ci = gt(),
            wt = function(n, t) {
                return n === t && (rt = !0), 0
            },
            li = -2147483648,
            di = {}.hasOwnProperty,
            g = [],
            gi = g.pop,
            nr = g.push,
            b = g.push,
            ai = g.slice,
            nt = function(n, t) {
                for (var i = 0, r = n.length; r > i; i++)
                    if (n[i] === t) return i;
                return -1
            },
            bt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            i = "[\\x20\\t\\r\\n\\f]",
            ut = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            vi = ut.replace("w", "w#"),
            yi = "\\[" + i + "*(" + ut + ")(?:" + i + "*([*^$|!~]?=)" + i + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + vi + "))|)" + i + "*\\]",
            kt = ":(" + ut + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + yi + ")*)|.*)\\)|)",
            tr = new RegExp(i + "+", "g"),
            lt = new RegExp("^" + i + "+|((?:^|[^\\\\])(?:\\\\.)*)" + i + "+$", "g"),
            ir = new RegExp("^" + i + "*," + i + "*"),
            rr = new RegExp("^" + i + "*([>+~]|" + i + ")" + i + "*"),
            ur = new RegExp("=" + i + "*([^\\]'\"]*?)" + i + "*\\]", "g"),
            fr = new RegExp(kt),
            er = new RegExp("^" + vi + "$"),
            at = {
                ID: new RegExp("^#(" + ut + ")"),
                CLASS: new RegExp("^\\.(" + ut + ")"),
                TAG: new RegExp("^(" + ut.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + yi),
                PSEUDO: new RegExp("^" + kt),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + i + "*(even|odd|(([+-]|)(\\d*)n|)" + i + "*(?:([+-]|)" + i + "*(\\d+)|))" + i + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + bt + ")$", "i"),
                needsContext: new RegExp("^" + i + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + i + "*((?:-\\d)?\\d*)" + i + "*\\)|)(?=[^-]|$)", "i")
            },
            or = /^(?:input|select|textarea|button)$/i,
            sr = /^h\d$/i,
            ot = /^[^{]+\{\s*\[native \w/,
            hr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            dt = /[+~]/,
            cr = /'|\\/g,
            y = new RegExp("\\\\([\\da-f]{1,6}" + i + "?|(" + i + ")|.)", "ig"),
            p = function(n, t, i) {
                var r = "0x" + t - 65536;
                return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            pi = function() {
                k()
            };
        try {
            b.apply(g = ai.call(h.childNodes), h.childNodes);
            g[h.childNodes.length].nodeType
        } catch (pr) {
            b = {
                apply: g.length ? function(n, t) {
                    nr.apply(n, ai.call(t))
                } : function(n, t) {
                    for (var i = n.length, r = 0; n[i++] = t[r++];);
                    n.length = i - 1
                }
            }
        }
        u = r.support = {};
        ei = r.isXML = function(n) {
            var t = n && (n.ownerDocument || n).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        };
        k = r.setDocument = function(n) {
            var a, c, r = n ? n.ownerDocument || n : h;
            return r !== o && 9 === r.nodeType && r.documentElement ? (o = r, s = r.documentElement, c = r.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", pi, !1) : c.attachEvent && c.attachEvent("onunload", pi)), l = !ei(r), u.attributes = v(function(n) {
                return n.className = "i", !n.getAttribute("className")
            }), u.getElementsByTagName = v(function(n) {
                return n.appendChild(r.createComment("")), !n.getElementsByTagName("*").length
            }), u.getElementsByClassName = ot.test(r.getElementsByClassName), u.getById = v(function(n) {
                return s.appendChild(n).id = f, !r.getElementsByName || !r.getElementsByName(f).length
            }), u.getById ? (t.find.ID = function(n, t) {
                if ("undefined" != typeof t.getElementById && l) {
                    var i = t.getElementById(n);
                    return i && i.parentNode ? [i] : []
                }
            }, t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    return n.getAttribute("id") === t
                }
            }) : (delete t.find.ID, t.filter.ID = function(n) {
                var t = n.replace(y, p);
                return function(n) {
                    var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
                    return i && i.value === t
                }
            }), t.find.TAG = u.getElementsByTagName ? function(n, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : u.qsa ? t.querySelectorAll(n) : void 0
            } : function(n, t) {
                var i, r = [],
                    f = 0,
                    u = t.getElementsByTagName(n);
                if ("*" === n) {
                    while (i = u[f++]) 1 === i.nodeType && r.push(i);
                    return r
                }
                return u
            }, t.find.CLASS = u.getElementsByClassName && function(n, t) {
                if (l) return t.getElementsByClassName(n)
            }, d = [], e = [], (u.qsa = ot.test(r.querySelectorAll)) && (v(function(n) {
                s.appendChild(n).innerHTML = "<a id='" + f + "'><\/a><select id='" + f + "-\f]' msallowcapture=''><option selected=''><\/option><\/select>";
                n.querySelectorAll("[msallowcapture^='']").length && e.push("[*^$]=" + i + "*(?:''|\"\")");
                n.querySelectorAll("[selected]").length || e.push("\\[" + i + "*(?:value|" + bt + ")");
                n.querySelectorAll("[id~=" + f + "-]").length || e.push("~=");
                n.querySelectorAll(":checked").length || e.push(":checked");
                n.querySelectorAll("a#" + f + "+*").length || e.push(".#.+[+~]")
            }), v(function(n) {
                var t = r.createElement("input");
                t.setAttribute("type", "hidden");
                n.appendChild(t).setAttribute("name", "D");
                n.querySelectorAll("[name=d]").length && e.push("name" + i + "*[*^$|!~]?=");
                n.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled");
                n.querySelectorAll("*,:x");
                e.push(",.*:")
            })), (u.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && v(function(n) {
                u.disconnectedMatch = ct.call(n, "div");
                ct.call(n, "[s!='']:x");
                d.push("!=", kt)
            }), e = e.length && new RegExp(e.join("|")), d = d.length && new RegExp(d.join("|")), a = ot.test(s.compareDocumentPosition), et = a || ot.test(s.contains) ? function(n, t) {
                var r = 9 === n.nodeType ? n.documentElement : n,
                    i = t && t.parentNode;
                return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
            } : function(n, t) {
                if (t)
                    while (t = t.parentNode)
                        if (t === n) return !0;
                return !1
            }, wt = a ? function(n, t) {
                if (n === t) return rt = !0, 0;
                var i = !n.compareDocumentPosition - !t.compareDocumentPosition;
                return i ? i : (i = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, 1 & i || !u.sortDetached && t.compareDocumentPosition(n) === i ? n === r || n.ownerDocument === h && et(h, n) ? -1 : t === r || t.ownerDocument === h && et(h, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : 4 & i ? -1 : 1)
            } : function(n, t) {
                if (n === t) return rt = !0, 0;
                var i, u = 0,
                    o = n.parentNode,
                    s = t.parentNode,
                    f = [n],
                    e = [t];
                if (!o || !s) return n === r ? -1 : t === r ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
                if (o === s) return wi(n, t);
                for (i = n; i = i.parentNode;) f.unshift(i);
                for (i = t; i = i.parentNode;) e.unshift(i);
                while (f[u] === e[u]) u++;
                return u ? wi(f[u], e[u]) : f[u] === h ? -1 : e[u] === h ? 1 : 0
            }, r) : o
        };
        r.matches = function(n, t) {
            return r(n, null, null, t)
        };
        r.matchesSelector = function(n, t) {
            if ((n.ownerDocument || n) !== o && k(n), t = t.replace(ur, "='$1']"), !(!u.matchesSelector || !l || d && d.test(t) || e && e.test(t))) try {
                var i = ct.call(n, t);
                if (i || u.disconnectedMatch || n.document && 11 !== n.document.nodeType) return i
            } catch (f) {}
            return r(t, o, null, [n]).length > 0
        };
        r.contains = function(n, t) {
            return (n.ownerDocument || n) !== o && k(n), et(n, t)
        };
        r.attr = function(n, i) {
            (n.ownerDocument || n) !== o && k(n);
            var f = t.attrHandle[i.toLowerCase()],
                r = f && di.call(t.attrHandle, i.toLowerCase()) ? f(n, i, !l) : void 0;
            return void 0 !== r ? r : u.attributes || !l ? n.getAttribute(i) : (r = n.getAttributeNode(i)) && r.specified ? r.value : null
        };
        r.error = function(n) {
            throw new Error("Syntax error, unrecognized expression: " + n);
        };
        r.uniqueSort = function(n) {
            var r, f = [],
                t = 0,
                i = 0;
            if (rt = !u.detectDuplicates, w = !u.sortStable && n.slice(0), n.sort(wt), rt) {
                while (r = n[i++]) r === n[i] && (t = f.push(i));
                while (t--) n.splice(f[t], 1)
            }
            return w = null, n
        };
        st = r.getText = function(n) {
            var r, i = "",
                u = 0,
                t = n.nodeType;
            if (t) {
                if (1 === t || 9 === t || 11 === t) {
                    if ("string" == typeof n.textContent) return n.textContent;
                    for (n = n.firstChild; n; n = n.nextSibling) i += st(n)
                } else if (3 === t || 4 === t) return n.nodeValue
            } else
                while (r = n[u++]) i += st(r);
            return i
        };
        t = r.selectors = {
            cacheLength: 50,
            createPseudo: c,
            match: at,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(n) {
                    return n[1] = n[1].replace(y, p), n[3] = (n[3] || n[4] || n[5] || "").replace(y, p), "~=" === n[2] && (n[3] = " " + n[3] + " "), n.slice(0, 4)
                },
                CHILD: function(n) {
                    return n[1] = n[1].toLowerCase(), "nth" === n[1].slice(0, 3) ? (n[3] || r.error(n[0]), n[4] = +(n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] = +(n[7] + n[8] || "odd" === n[3])) : n[3] && r.error(n[0]), n
                },
                PSEUDO: function(n) {
                    var i, t = !n[6] && n[2];
                    return at.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
                }
            },
            filter: {
                TAG: function(n) {
                    var t = n.replace(y, p).toLowerCase();
                    return "*" === n ? function() {
                        return !0
                    } : function(n) {
                        return n.nodeName && n.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(n) {
                    var t = si[n + " "];
                    return t || (t = new RegExp("(^|" + i + ")" + n + "(" + i + "|$)")) && si(n, function(n) {
                        return t.test("string" == typeof n.className && n.className || "undefined" != typeof n.getAttribute && n.getAttribute("class") || "")
                    })
                },
                ATTR: function(n, t, i) {
                    return function(u) {
                        var f = r.attr(u, n);
                        return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
                    }
                },
                CHILD: function(n, t, i, r, u) {
                    var s = "nth" !== n.slice(0, 3),
                        o = "last" !== n.slice(-4),
                        e = "of-type" === t;
                    return 1 === r && 0 === u ? function(n) {
                        return !!n.parentNode
                    } : function(t, i, h) {
                        var v, k, c, l, y, w, b = s !== o ? "nextSibling" : "previousSibling",
                            p = t.parentNode,
                            g = e && t.nodeName.toLowerCase(),
                            d = !h && !e;
                        if (p) {
                            if (s) {
                                while (b) {
                                    for (c = t; c = c[b];)
                                        if (e ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) return !1;
                                    w = b = "only" === n && !w && "nextSibling"
                                }
                                return !0
                            }
                            if (w = [o ? p.firstChild : p.lastChild], o && d) {
                                for (k = p[f] || (p[f] = {}), v = k[n] || [], y = v[0] === a && v[1], l = v[0] === a && v[2], c = y && p.childNodes[y]; c = ++y && c && c[b] || (l = y = 0) || w.pop();)
                                    if (1 === c.nodeType && ++l && c === t) {
                                        k[n] = [a, y, l];
                                        break
                                    }
                            } else if (d && (v = (t[f] || (t[f] = {}))[n]) && v[0] === a) l = v[1];
                            else
                                while (c = ++y && c && c[b] || (l = y = 0) || w.pop())
                                    if ((e ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++l && (d && ((c[f] || (c[f] = {}))[n] = [a, l]), c === t)) break; return l -= u, l === r || l % r == 0 && l / r >= 0
                        }
                    }
                },
                PSEUDO: function(n, i) {
                    var e, u = t.pseudos[n] || t.setFilters[n.toLowerCase()] || r.error("unsupported pseudo: " + n);
                    return u[f] ? u(i) : u.length > 1 ? (e = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? c(function(n, t) {
                        for (var r, f = u(n, i), e = f.length; e--;) r = nt(n, f[e]), n[r] = !(t[r] = f[e])
                    }) : function(n) {
                        return u(n, 0, e)
                    }) : u
                }
            },
            pseudos: {
                not: c(function(n) {
                    var t = [],
                        r = [],
                        i = pt(n.replace(lt, "$1"));
                    return i[f] ? c(function(n, t, r, u) {
                        for (var e, o = i(n, null, u, []), f = n.length; f--;)(e = o[f]) && (n[f] = !(t[f] = e))
                    }) : function(n, u, f) {
                        return t[0] = n, i(t, null, f, r), t[0] = null, !r.pop()
                    }
                }),
                has: c(function(n) {
                    return function(t) {
                        return r(n, t).length > 0
                    }
                }),
                contains: c(function(n) {
                    return n = n.replace(y, p),
                        function(t) {
                            return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
                        }
                }),
                lang: c(function(n) {
                    return er.test(n || "") || r.error("unsupported lang: " + n), n = n.replace(y, p).toLowerCase(),
                        function(t) {
                            var i;
                            do
                                if (i = l ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
                            while ((t = t.parentNode) && 1 === t.nodeType);
                            return !1
                        }
                }),
                target: function(t) {
                    var i = n.location && n.location.hash;
                    return i && i.slice(1) === t.id
                },
                root: function(n) {
                    return n === s
                },
                focus: function(n) {
                    return n === o.activeElement && (!o.hasFocus || o.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
                },
                enabled: function(n) {
                    return n.disabled === !1
                },
                disabled: function(n) {
                    return n.disabled === !0
                },
                checked: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return "input" === t && !!n.checked || "option" === t && !!n.selected
                },
                selected: function(n) {
                    return n.parentNode && n.parentNode.selectedIndex, n.selected === !0
                },
                empty: function(n) {
                    for (n = n.firstChild; n; n = n.nextSibling)
                        if (n.nodeType < 6) return !1;
                    return !0
                },
                parent: function(n) {
                    return !t.pseudos.empty(n)
                },
                header: function(n) {
                    return sr.test(n.nodeName)
                },
                input: function(n) {
                    return or.test(n.nodeName)
                },
                button: function(n) {
                    var t = n.nodeName.toLowerCase();
                    return "input" === t && "button" === n.type || "button" === t
                },
                text: function(n) {
                    var t;
                    return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: tt(function() {
                    return [0]
                }),
                last: tt(function(n, t) {
                    return [t - 1]
                }),
                eq: tt(function(n, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: tt(function(n, t) {
                    for (var i = 0; t > i; i += 2) n.push(i);
                    return n
                }),
                odd: tt(function(n, t) {
                    for (var i = 1; t > i; i += 2) n.push(i);
                    return n
                }),
                lt: tt(function(n, t, i) {
                    for (var r = 0 > i ? i + t : i; --r >= 0;) n.push(r);
                    return n
                }),
                gt: tt(function(n, t, i) {
                    for (var r = 0 > i ? i + t : i; ++r < t;) n.push(r);
                    return n
                })
            }
        };
        t.pseudos.nth = t.pseudos.eq;
        for (it in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) t.pseudos[it] = lr(it);
        for (it in {
                submit: !0,
                reset: !0
            }) t.pseudos[it] = ar(it);
        return bi.prototype = t.filters = t.pseudos, t.setFilters = new bi, ft = r.tokenize = function(n, i) {
            var e, f, s, o, u, h, c, l = hi[n + " "];
            if (l) return i ? 0 : l.slice(0);
            for (u = n, h = [], c = t.preFilter; u;) {
                (!e || (f = ir.exec(u))) && (f && (u = u.slice(f[0].length) || u), h.push(s = []));
                e = !1;
                (f = rr.exec(u)) && (e = f.shift(), s.push({
                    value: e,
                    type: f[0].replace(lt, " ")
                }), u = u.slice(e.length));
                for (o in t.filter)(f = at[o].exec(u)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
                    value: e,
                    type: o,
                    matches: f
                }), u = u.slice(e.length));
                if (!e) break
            }
            return i ? u.length : u ? r.error(n) : hi(n, h).slice(0)
        }, pt = r.compile = function(n, t) {
            var r, u = [],
                e = [],
                i = ci[n + " "];
            if (!i) {
                for (t || (t = ft(n)), r = t.length; r--;) i = fi(t[r]), i[f] ? u.push(i) : e.push(i);
                i = ci(n, yr(e, u));
                i.selector = n
            }
            return i
        }, oi = r.select = function(n, i, r, f) {
            var s, e, o, a, v, c = "function" == typeof n && n,
                h = !f && ft(n = c.selector || n);
            if (r = r || [], 1 === h.length) {
                if (e = h[0] = h[0].slice(0), e.length > 2 && "ID" === (o = e[0]).type && u.getById && 9 === i.nodeType && l && t.relative[e[1].type]) {
                    if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], !i) return r;
                    c && (i = i.parentNode);
                    n = n.slice(e.shift().value.length)
                }
                for (s = at.needsContext.test(n) ? 0 : e.length; s--;) {
                    if (o = e[s], t.relative[a = o.type]) break;
                    if ((v = t.find[a]) && (f = v(o.matches[0].replace(y, p), dt.test(e[0].type) && ti(i.parentNode) || i))) {
                        if (e.splice(s, 1), n = f.length && vt(e), !n) return b.apply(r, f), r;
                        break
                    }
                }
            }
            return (c || pt(n, h))(f, i, !l, r, dt.test(n) && ti(i.parentNode) || i), r
        }, u.sortStable = f.split("").sort(wt).join("") === f, u.detectDuplicates = !!rt, k(), u.sortDetached = v(function(n) {
            return 1 & n.compareDocumentPosition(o.createElement("div"))
        }), v(function(n) {
            return n.innerHTML = "<a href='#'><\/a>", "#" === n.firstChild.getAttribute("href")
        }) || ni("type|href|height|width", function(n, t, i) {
            if (!i) return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), u.attributes && v(function(n) {
            return n.innerHTML = "<input/>", n.firstChild.setAttribute("value", ""), "" === n.firstChild.getAttribute("value")
        }) || ni("value", function(n, t, i) {
            if (!i && "input" === n.nodeName.toLowerCase()) return n.defaultValue
        }), v(function(n) {
            return null == n.getAttribute("disabled")
        }) || ni(bt, function(n, t, i) {
            var r;
            if (!i) return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
        }), r
    }(n);
    i.find = y;
    i.expr = y.selectors;
    i.expr[":"] = i.expr.pseudos;
    i.unique = y.uniqueSort;
    i.text = y.getText;
    i.isXMLDoc = y.isXML;
    i.contains = y.contains;
    var di = i.expr.match.needsContext,
        gi = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ef = /^.[^:#\[\.,]*$/;
    i.filter = function(n, t, r) {
        var u = t[0];
        return r && (n = ":not(" + n + ")"), 1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function(n) {
            return 1 === n.nodeType
        }))
    };
    i.fn.extend({
        find: function(n) {
            var t, u = this.length,
                r = [],
                f = this;
            if ("string" != typeof n) return this.pushStack(i(n).filter(function() {
                for (t = 0; u > t; t++)
                    if (i.contains(f[t], this)) return !0
            }));
            for (t = 0; u > t; t++) i.find(n, f[t], r);
            return r = this.pushStack(u > 1 ? i.unique(r) : r), r.selector = this.selector ? this.selector + " " + n : n, r
        },
        filter: function(n) {
            return this.pushStack(ui(this, n || [], !1))
        },
        not: function(n) {
            return this.pushStack(ui(this, n || [], !0))
        },
        is: function(n) {
            return !!ui(this, "string" == typeof n && di.test(n) ? i(n) : n || [], !1).length
        }
    });
    nr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    tr = i.fn.init = function(n, t) {
        var r, f;
        if (!n) return this;
        if ("string" == typeof n) {
            if (r = "<" === n[0] && ">" === n[n.length - 1] && n.length >= 3 ? [null, n, null] : nr.exec(n), !r || !r[1] && t) return !t || t.jquery ? (t || ot).find(n) : this.constructor(t).find(n);
            if (r[1]) {
                if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), gi.test(r[1]) && i.isPlainObject(t))
                    for (r in t) i.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return f = u.getElementById(r[2]), f && f.parentNode && (this.length = 1, this[0] = f), this.context = u, this.selector = n, this
        }
        return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? "undefined" != typeof ot.ready ? ot.ready(n) : n(i) : (void 0 !== n.selector && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
    };
    tr.prototype = i.fn;
    ot = i(u);
    ir = /^(?:parents|prev(?:Until|All))/;
    rr = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    i.extend({
        dir: function(n, t, r) {
            for (var u = [], f = void 0 !== r;
                (n = n[t]) && 9 !== n.nodeType;)
                if (1 === n.nodeType) {
                    if (f && i(n).is(r)) break;
                    u.push(n)
                }
            return u
        },
        sibling: function(n, t) {
            for (var i = []; n; n = n.nextSibling) 1 === n.nodeType && n !== t && i.push(n);
            return i
        }
    });
    i.fn.extend({
        has: function(n) {
            var t = i(n, this),
                r = t.length;
            return this.filter(function() {
                for (var n = 0; r > n; n++)
                    if (i.contains(this, t[n])) return !0
            })
        },
        closest: function(n, t) {
            for (var r, f = 0, o = this.length, u = [], e = di.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++)
                for (r = this[f]; r && r !== t; r = r.parentNode)
                    if (r.nodeType < 11 && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
                        u.push(r);
                        break
                    }
            return this.pushStack(u.length > 1 ? i.unique(u) : u)
        },
        index: function(n) {
            return n ? "string" == typeof n ? ft.call(i(n), this[0]) : ft.call(this, n.jquery ? n[0] : n) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(n, t) {
            return this.pushStack(i.unique(i.merge(this.get(), i(n, t))))
        },
        addBack: function(n) {
            return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
        }
    });
    i.each({
        parent: function(n) {
            var t = n.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(n) {
            return i.dir(n, "parentNode")
        },
        parentsUntil: function(n, t, r) {
            return i.dir(n, "parentNode", r)
        },
        next: function(n) {
            return ur(n, "nextSibling")
        },
        prev: function(n) {
            return ur(n, "previousSibling")
        },
        nextAll: function(n) {
            return i.dir(n, "nextSibling")
        },
        prevAll: function(n) {
            return i.dir(n, "previousSibling")
        },
        nextUntil: function(n, t, r) {
            return i.dir(n, "nextSibling", r)
        },
        prevUntil: function(n, t, r) {
            return i.dir(n, "previousSibling", r)
        },
        siblings: function(n) {
            return i.sibling((n.parentNode || {}).firstChild, n)
        },
        children: function(n) {
            return i.sibling(n.firstChild)
        },
        contents: function(n) {
            return n.contentDocument || i.merge([], n.childNodes)
        }
    }, function(n, t) {
        i.fn[n] = function(r, u) {
            var f = i.map(this, t, r);
            return "Until" !== n.slice(-5) && (u = r), u && "string" == typeof u && (f = i.filter(u, f)), this.length > 1 && (rr[n] || i.unique(f), ir.test(n) && f.reverse()), this.pushStack(f)
        }
    });
    c = /\S+/g;
    fi = {};
    i.Callbacks = function(n) {
        n = "string" == typeof n ? fi[n] || of(n) : i.extend({}, n);
        var u, h, o, c, f, e, t = [],
            r = !n.once && [],
            l = function(i) {
                for (u = n.memory && i, h = !0, e = c || 0, c = 0, f = t.length, o = !0; t && f > e; e++)
                    if (t[e].apply(i[0], i[1]) === !1 && n.stopOnFalse) {
                        u = !1;
                        break
                    }
                o = !1;
                t && (r ? r.length && l(r.shift()) : u ? t = [] : s.disable())
            },
            s = {
                add: function() {
                    if (t) {
                        var r = t.length;
                        ! function e(r) {
                            i.each(r, function(r, u) {
                                var f = i.type(u);
                                "function" === f ? n.unique && s.has(u) || t.push(u) : u && u.length && "string" !== f && e(u)
                            })
                        }(arguments);
                        o ? f = t.length : u && (c = r, l(u))
                    }
                    return this
                },
                remove: function() {
                    return t && i.each(arguments, function(n, r) {
                        for (var u;
                            (u = i.inArray(r, t, u)) > -1;) t.splice(u, 1), o && (f >= u && f--, e >= u && e--)
                    }), this
                },
                has: function(n) {
                    return n ? i.inArray(n, t) > -1 : !(!t || !t.length)
                },
                empty: function() {
                    return t = [], f = 0, this
                },
                disable: function() {
                    return t = r = u = void 0, this
                },
                disabled: function() {
                    return !t
                },
                lock: function() {
                    return r = void 0, u || s.disable(), this
                },
                locked: function() {
                    return !r
                },
                fireWith: function(n, i) {
                    return !t || h && !r || (i = i || [], i = [n, i.slice ? i.slice() : i], o ? r.push(i) : l(i)), this
                },
                fire: function() {
                    return s.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!h
                }
            };
        return s
    };
    i.extend({
        Deferred: function(n) {
            var u = [
                    ["resolve", "done", i.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", i.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", i.Callbacks("memory")]
                ],
                f = "pending",
                r = {
                    state: function() {
                        return f
                    },
                    always: function() {
                        return t.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var n = arguments;
                        return i.Deferred(function(f) {
                            i.each(u, function(u, e) {
                                var o = i.isFunction(n[u]) && n[u];
                                t[e[1]](function() {
                                    var n = o && o.apply(this, arguments);
                                    n && i.isFunction(n.promise) ? n.promise().done(f.resolve).fail(f.reject).progress(f.notify) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
                                })
                            });
                            n = null
                        }).promise()
                    },
                    promise: function(n) {
                        return null != n ? i.extend(n, r) : r
                    }
                },
                t = {};
            return r.pipe = r.then, i.each(u, function(n, i) {
                var e = i[2],
                    o = i[3];
                r[i[1]] = e.add;
                o && e.add(function() {
                    f = o
                }, u[1 ^ n][2].disable, u[2][2].lock);
                t[i[0]] = function() {
                    return t[i[0] + "With"](this === t ? r : this, arguments), this
                };
                t[i[0] + "With"] = e.fireWith
            }), r.promise(t), n && n.call(t, t), t
        },
        when: function(n) {
            var t = 0,
                u = a.call(arguments),
                r = u.length,
                e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
                f = 1 === e ? n : i.Deferred(),
                h = function(n, t, i) {
                    return function(r) {
                        t[n] = this;
                        i[n] = arguments.length > 1 ? a.call(arguments) : r;
                        i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
                    }
                },
                o, c, s;
            if (r > 1)
                for (o = new Array(r), c = new Array(r), s = new Array(r); r > t; t++) u[t] && i.isFunction(u[t].promise) ? u[t].promise().done(h(t, s, u)).fail(f.reject).progress(h(t, c, o)) : --e;
            return e || f.resolveWith(s, u), f.promise()
        }
    });
    i.fn.ready = function(n) {
        return i.ready.promise().done(n), this
    };
    i.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(n) {
            n ? i.readyWait++ : i.ready(!0)
        },
        ready: function(n) {
            (n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, n !== !0 && --i.readyWait > 0 || (st.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready"))))
        }
    });
    i.ready.promise = function(t) {
        return st || (st = i.Deferred(), "complete" === u.readyState ? setTimeout(i.ready) : (u.addEventListener("DOMContentLoaded", ht, !1), n.addEventListener("load", ht, !1))), st.promise(t)
    };
    i.ready.promise();
    l = i.access = function(n, t, r, u, f, e, o) {
        var s = 0,
            c = n.length,
            h = null == r;
        if ("object" === i.type(r)) {
            f = !0;
            for (s in r) i.access(n, t, s, r[s], !0, e, o)
        } else if (void 0 !== u && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function(n, t, r) {
                return h.call(i(n), r)
            })), t))
            for (; c > s; s++) t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
        return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
    };
    i.acceptData = function(n) {
        return 1 === n.nodeType || 9 === n.nodeType || !+n.nodeType
    };
    v.uid = 1;
    v.accepts = i.acceptData;
    v.prototype = {
        key: function(n) {
            if (!v.accepts(n)) return 0;
            var r = {},
                t = n[this.expando];
            if (!t) {
                t = v.uid++;
                try {
                    r[this.expando] = {
                        value: t
                    };
                    Object.defineProperties(n, r)
                } catch (u) {
                    r[this.expando] = t;
                    i.extend(n, r)
                }
            }
            return this.cache[t] || (this.cache[t] = {}), t
        },
        set: function(n, t, r) {
            var f, e = this.key(n),
                u = this.cache[e];
            if ("string" == typeof t) u[t] = r;
            else if (i.isEmptyObject(u)) i.extend(this.cache[e], t);
            else
                for (f in t) u[f] = t[f];
            return u
        },
        get: function(n, t) {
            var i = this.cache[this.key(n)];
            return void 0 === t ? i : i[t]
        },
        access: function(n, t, r) {
            var u;
            return void 0 === t || t && "string" == typeof t && void 0 === r ? (u = this.get(n, t), void 0 !== u ? u : this.get(n, i.camelCase(t))) : (this.set(n, t, r), void 0 !== r ? r : t)
        },
        remove: function(n, t) {
            var u, r, f, o = this.key(n),
                e = this.cache[o];
            if (void 0 === t) this.cache[o] = {};
            else
                for (i.isArray(t) ? r = t.concat(t.map(i.camelCase)) : (f = i.camelCase(t), (t in e) ? r = [t, f] : (r = f, r = (r in e) ? [r] : r.match(c) || [])), u = r.length; u--;) delete e[r[u]]
        },
        hasData: function(n) {
            return !i.isEmptyObject(this.cache[n[this.expando]] || {})
        },
        discard: function(n) {
            n[this.expando] && delete this.cache[n[this.expando]]
        }
    };
    var r = new v,
        e = new v,
        sf = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        hf = /([A-Z])/g;
    i.extend({
        hasData: function(n) {
            return e.hasData(n) || r.hasData(n)
        },
        data: function(n, t, i) {
            return e.access(n, t, i)
        },
        removeData: function(n, t) {
            e.remove(n, t)
        },
        _data: function(n, t, i) {
            return r.access(n, t, i)
        },
        _removeData: function(n, t) {
            r.remove(n, t)
        }
    });
    i.fn.extend({
        data: function(n, t) {
            var o, f, s, u = this[0],
                h = u && u.attributes;
            if (void 0 === n) {
                if (this.length && (s = e.get(u), 1 === u.nodeType && !r.get(u, "hasDataAttrs"))) {
                    for (o = h.length; o--;) h[o] && (f = h[o].name, 0 === f.indexOf("data-") && (f = i.camelCase(f.slice(5)), fr(u, f, s[f])));
                    r.set(u, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof n ? this.each(function() {
                e.set(this, n)
            }) : l(this, function(t) {
                var r, f = i.camelCase(n);
                if (u && void 0 === t) {
                    if ((r = e.get(u, n), void 0 !== r) || (r = e.get(u, f), void 0 !== r) || (r = fr(u, f, void 0), void 0 !== r)) return r
                } else this.each(function() {
                    var i = e.get(this, f);
                    e.set(this, f, t); - 1 !== n.indexOf("-") && void 0 !== i && e.set(this, n, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        },
        removeData: function(n) {
            return this.each(function() {
                e.remove(this, n)
            })
        }
    });
    i.extend({
        queue: function(n, t, u) {
            var f;
            if (n) return (t = (t || "fx") + "queue", f = r.get(n, t), u && (!f || i.isArray(u) ? f = r.access(n, t, i.makeArray(u)) : f.push(u)), f || [])
        },
        dequeue: function(n, t) {
            t = t || "fx";
            var r = i.queue(n, t),
                e = r.length,
                u = r.shift(),
                f = i._queueHooks(n, t),
                o = function() {
                    i.dequeue(n, t)
                };
            "inprogress" === u && (u = r.shift(), e--);
            u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function(n, t) {
            var u = t + "queueHooks";
            return r.get(n, u) || r.access(n, u, {
                empty: i.Callbacks("once memory").add(function() {
                    r.remove(n, [t + "queue", u])
                })
            })
        }
    });
    i.fn.extend({
        queue: function(n, t) {
            var r = 2;
            return "string" != typeof n && (t = n, n = "fx", r--), arguments.length < r ? i.queue(this[0], n) : void 0 === t ? this : this.each(function() {
                var r = i.queue(this, n, t);
                i._queueHooks(this, n);
                "fx" === n && "inprogress" !== r[0] && i.dequeue(this, n)
            })
        },
        dequeue: function(n) {
            return this.each(function() {
                i.dequeue(this, n)
            })
        },
        clearQueue: function(n) {
            return this.queue(n || "fx", [])
        },
        promise: function(n, t) {
            var u, e = 1,
                o = i.Deferred(),
                f = this,
                s = this.length,
                h = function() {
                    --e || o.resolveWith(f, [f])
                };
            for ("string" != typeof n && (t = n, n = void 0), n = n || "fx"; s--;) u = r.get(f[s], n + "queueHooks"), u && u.empty && (e++, u.empty.add(h));
            return h(), o.promise(t)
        }
    });
    var ct = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        p = ["Top", "Right", "Bottom", "Left"],
        tt = function(n, t) {
            return n = t || n, "none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
        },
        er = /^(?:checkbox|radio)$/i;
    ! function() {
        var i = u.createDocumentFragment(),
            n = i.appendChild(u.createElement("div")),
            t = u.createElement("input");
        t.setAttribute("type", "radio");
        t.setAttribute("checked", "checked");
        t.setAttribute("name", "t");
        n.appendChild(t);
        f.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
        n.innerHTML = "<textarea>x<\/textarea>";
        f.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue
    }();
    b = "undefined";
    f.focusinBubbles = "onfocusin" in n;
    var cf = /^key/,
        lf = /^(?:mouse|pointer|contextmenu)|click/,
        or = /^(?:focusinfocus|focusoutblur)$/,
        sr = /^([^.]*)(?:\.(.+)|)$/;
    i.event = {
        global: {},
        add: function(n, t, u, f, e) {
            var v, y, w, p, k, h, s, l, o, d, g, a = r.get(n);
            if (a)
                for (u.handler && (v = u, u = v.handler, e = v.selector), u.guid || (u.guid = i.guid++), (p = a.events) || (p = a.events = {}), (y = a.handle) || (y = a.handle = function(t) {
                        if (typeof i !== b && i.event.triggered !== t.type) return i.event.dispatch.apply(n, arguments)
                    }), t = (t || "").match(c) || [""], k = t.length; k--;) w = sr.exec(t[k]) || [], o = g = w[1], d = (w[2] || "").split(".").sort(), o && (s = i.event.special[o] || {}, o = (e ? s.delegateType : s.bindType) || o, s = i.event.special[o] || {}, h = i.extend({
                    type: o,
                    origType: g,
                    data: f,
                    handler: u,
                    guid: u.guid,
                    selector: e,
                    needsContext: e && i.expr.match.needsContext.test(e),
                    namespace: d.join(".")
                }, v), (l = p[o]) || (l = p[o] = [], l.delegateCount = 0, s.setup && s.setup.call(n, f, d, y) !== !1 || n.addEventListener && n.addEventListener(o, y, !1)), s.add && (s.add.call(n, h), h.handler.guid || (h.handler.guid = u.guid)), e ? l.splice(l.delegateCount++, 0, h) : l.push(h), i.event.global[o] = !0)
        },
        remove: function(n, t, u, f, e) {
            var p, k, h, v, w, s, l, a, o, b, d, y = r.hasData(n) && r.get(n);
            if (y && (v = y.events)) {
                for (t = (t || "").match(c) || [""], w = t.length; w--;)
                    if (h = sr.exec(t[w]) || [], o = d = h[1], b = (h[2] || "").split(".").sort(), o) {
                        for (l = i.event.special[o] || {}, o = (f ? l.delegateType : l.bindType) || o, a = v[o] || [], h = h[2] && new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)"), k = p = a.length; p--;) s = a[p], !e && d !== s.origType || u && u.guid !== s.guid || h && !h.test(s.namespace) || f && f !== s.selector && ("**" !== f || !s.selector) || (a.splice(p, 1), s.selector && a.delegateCount--, l.remove && l.remove.call(n, s));
                        k && !a.length && (l.teardown && l.teardown.call(n, b, y.handle) !== !1 || i.removeEvent(n, o, y.handle), delete v[o])
                    } else
                        for (o in v) i.event.remove(n, o + t[w], u, f, !0);
                i.isEmptyObject(v) && (delete y.handle, r.remove(n, "events"))
            }
        },
        trigger: function(t, f, e, o) {
            var w, s, c, b, a, v, l, p = [e || u],
                h = ii.call(t, "type") ? t.type : t,
                y = ii.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = e = e || u, 3 !== e.nodeType && 8 !== e.nodeType && !or.test(h + i.event.triggered) && (h.indexOf(".") >= 0 && (y = h.split("."), h = y.shift(), y.sort()), a = h.indexOf(":") < 0 && "on" + h, t = t[i.expando] ? t : new i.Event(h, "object" == typeof t && t), t.isTrigger = o ? 2 : 3, t.namespace = y.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + y.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = e), f = null == f ? [t] : i.makeArray(f, [t]), l = i.event.special[h] || {}, o || !l.trigger || l.trigger.apply(e, f) !== !1)) {
                if (!o && !l.noBubble && !i.isWindow(e)) {
                    for (b = l.delegateType || h, or.test(b + h) || (s = s.parentNode); s; s = s.parentNode) p.push(s), c = s;
                    c === (e.ownerDocument || u) && p.push(c.defaultView || c.parentWindow || n)
                }
                for (w = 0;
                    (s = p[w++]) && !t.isPropagationStopped();) t.type = w > 1 ? b : l.bindType || h, v = (r.get(s, "events") || {})[t.type] && r.get(s, "handle"), v && v.apply(s, f), v = a && s[a], v && v.apply && i.acceptData(s) && (t.result = v.apply(s, f), t.result === !1 && t.preventDefault());
                return t.type = h, o || t.isDefaultPrevented() || l._default && l._default.apply(p.pop(), f) !== !1 || !i.acceptData(e) || a && i.isFunction(e[h]) && !i.isWindow(e) && (c = e[a], c && (e[a] = null), i.event.triggered = h, e[h](), i.event.triggered = void 0, c && (e[a] = c)), t.result
            }
        },
        dispatch: function(n) {
            n = i.event.fix(n);
            var o, s, e, u, t, h = [],
                c = a.call(arguments),
                l = (r.get(this, "events") || {})[n.type] || [],
                f = i.event.special[n.type] || {};
            if (c[0] = n, n.delegateTarget = this, !f.preDispatch || f.preDispatch.call(this, n) !== !1) {
                for (h = i.event.handlers.call(this, n, l), o = 0;
                    (u = h[o++]) && !n.isPropagationStopped();)
                    for (n.currentTarget = u.elem, s = 0;
                        (t = u.handlers[s++]) && !n.isImmediatePropagationStopped();)(!n.namespace_re || n.namespace_re.test(t.namespace)) && (n.handleObj = t, n.data = t.data, e = ((i.event.special[t.origType] || {}).handle || t.handler).apply(u.elem, c), void 0 !== e && (n.result = e) === !1 && (n.preventDefault(), n.stopPropagation()));
                return f.postDispatch && f.postDispatch.call(this, n), n.result
            }
        },
        handlers: function(n, t) {
            var e, u, f, o, h = [],
                s = t.delegateCount,
                r = n.target;
            if (s && r.nodeType && (!n.button || "click" !== n.type))
                for (; r !== this; r = r.parentNode || this)
                    if (r.disabled !== !0 || "click" !== n.type) {
                        for (u = [], e = 0; s > e; e++) o = t[e], f = o.selector + " ", void 0 === u[f] && (u[f] = o.needsContext ? i(f, this).index(r) >= 0 : i.find(f, this, null, [r]).length), u[f] && u.push(o);
                        u.length && h.push({
                            elem: r,
                            handlers: u
                        })
                    }
            return s < t.length && h.push({
                elem: this,
                handlers: t.slice(s)
            }), h
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(n, t) {
                return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode), n
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(n, t) {
                var e, i, r, f = t.button;
                return null == n.pageX && null != t.clientX && (e = n.target.ownerDocument || u, i = e.documentElement, r = e.body, n.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), n.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), n.which || void 0 === f || (n.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), n
            }
        },
        fix: function(n) {
            if (n[i.expando]) return n;
            var f, e, o, r = n.type,
                s = n,
                t = this.fixHooks[r];
            for (t || (this.fixHooks[r] = t = lf.test(r) ? this.mouseHooks : cf.test(r) ? this.keyHooks : {}), o = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(s), f = o.length; f--;) e = o[f], n[e] = s[e];
            return n.target || (n.target = u), 3 === n.target.nodeType && (n.target = n.target.parentNode), t.filter ? t.filter(n, s) : n
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== hr() && this.focus) return (this.focus(), !1)
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === hr() && this.blur) return (this.blur(), !1)
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && i.nodeName(this, "input")) return (this.click(), !1)
                },
                _default: function(n) {
                    return i.nodeName(n.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(n) {
                    void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result)
                }
            }
        },
        simulate: function(n, t, r, u) {
            var f = i.extend(new i.Event, r, {
                type: n,
                isSimulated: !0,
                originalEvent: {}
            });
            u ? i.event.trigger(f, null, t) : i.event.dispatch.call(t, f);
            f.isDefaultPrevented() && r.preventDefault()
        }
    };
    i.removeEvent = function(n, t, i) {
        n.removeEventListener && n.removeEventListener(t, i, !1)
    };
    i.Event = function(n, t) {
        return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || void 0 === n.defaultPrevented && n.returnValue === !1 ? lt : k) : this.type = n, t && i.extend(this, t), this.timeStamp = n && n.timeStamp || i.now(), void(this[i.expando] = !0)) : new i.Event(n, t)
    };
    i.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var n = this.originalEvent;
            this.isDefaultPrevented = lt;
            n && n.preventDefault && n.preventDefault()
        },
        stopPropagation: function() {
            var n = this.originalEvent;
            this.isPropagationStopped = lt;
            n && n.stopPropagation && n.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var n = this.originalEvent;
            this.isImmediatePropagationStopped = lt;
            n && n.stopImmediatePropagation && n.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    i.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(n, t) {
        i.event.special[n] = {
            delegateType: t,
            bindType: t,
            handle: function(n) {
                var u, f = this,
                    r = n.relatedTarget,
                    e = n.handleObj;
                return (!r || r !== f && !i.contains(f, r)) && (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t), u
            }
        }
    });
    f.focusinBubbles || i.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, t) {
        var u = function(n) {
            i.event.simulate(t, n.target, i.event.fix(n), !0)
        };
        i.event.special[t] = {
            setup: function() {
                var i = this.ownerDocument || this,
                    f = r.access(i, t);
                f || i.addEventListener(n, u, !0);
                r.access(i, t, (f || 0) + 1)
            },
            teardown: function() {
                var i = this.ownerDocument || this,
                    f = r.access(i, t) - 1;
                f ? r.access(i, t, f) : (i.removeEventListener(n, u, !0), r.remove(i, t))
            }
        }
    });
    i.fn.extend({
        on: function(n, t, r, u, f) {
            var e, o;
            if ("object" == typeof n) {
                "string" != typeof t && (r = r || t, t = void 0);
                for (o in n) this.on(o, t, r, n[o], f);
                return this
            }
            if (null == r && null == u ? (u = t, r = t = void 0) : null == u && ("string" == typeof t ? (u = r, r = void 0) : (u = r, r = t, t = void 0)), u === !1) u = k;
            else if (!u) return this;
            return 1 === f && (e = u, u = function(n) {
                return i().off(n), e.apply(this, arguments)
            }, u.guid = e.guid || (e.guid = i.guid++)), this.each(function() {
                i.event.add(this, n, u, r, t)
            })
        },
        one: function(n, t, i, r) {
            return this.on(n, t, i, r, 1)
        },
        off: function(n, t, r) {
            var u, f;
            if (n && n.preventDefault && n.handleObj) return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
            if ("object" == typeof n) {
                for (f in n) this.off(f, t, n[f]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = k), this.each(function() {
                i.event.remove(this, n, r, t)
            })
        },
        trigger: function(n, t) {
            return this.each(function() {
                i.event.trigger(n, t, this)
            })
        },
        triggerHandler: function(n, t) {
            var r = this[0];
            if (r) return i.event.trigger(n, t, r, !0)
        }
    });
    var cr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        lr = /<([\w:]+)/,
        af = /<|&#?\w+;/,
        vf = /<(?:script|style|link)/i,
        yf = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ar = /^$|\/(?:java|ecma)script/i,
        pf = /^true\/(.*)/,
        wf = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        h = {
            option: [1, "<select multiple='multiple'>", "<\/select>"],
            thead: [1, "<table>", "<\/table>"],
            col: [2, "<table><colgroup>", "<\/colgroup><\/table>"],
            tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
            td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
            _default: [0, "", ""]
        };
    h.optgroup = h.option;
    h.tbody = h.tfoot = h.colgroup = h.caption = h.thead;
    h.th = h.td;
    i.extend({
        clone: function(n, t, r) {
            var u, c, s, e, h = n.cloneNode(!0),
                l = i.contains(n.ownerDocument, n);
            if (!(f.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
                for (e = o(h), s = o(n), u = 0, c = s.length; c > u; u++) df(s[u], e[u]);
            if (t)
                if (r)
                    for (s = s || o(n), e = e || o(h), u = 0, c = s.length; c > u; u++) yr(s[u], e[u]);
                else yr(n, h);
            return e = o(h, "script"), e.length > 0 && ei(e, !l && o(n, "script")), h
        },
        buildFragment: function(n, t, r, u) {
            for (var f, e, y, l, p, a, s = t.createDocumentFragment(), v = [], c = 0, w = n.length; w > c; c++)
                if (f = n[c], f || 0 === f)
                    if ("object" === i.type(f)) i.merge(v, f.nodeType ? [f] : f);
                    else if (af.test(f)) {
                for (e = e || s.appendChild(t.createElement("div")), y = (lr.exec(f) || ["", ""])[1].toLowerCase(), l = h[y] || h._default, e.innerHTML = l[1] + f.replace(cr, "<$1><\/$2>") + l[2], a = l[0]; a--;) e = e.lastChild;
                i.merge(v, e.childNodes);
                e = s.firstChild;
                e.textContent = ""
            } else v.push(t.createTextNode(f));
            for (s.textContent = "", c = 0; f = v[c++];)
                if ((!u || -1 === i.inArray(f, u)) && (p = i.contains(f.ownerDocument, f), e = o(s.appendChild(f), "script"), p && ei(e), r))
                    for (a = 0; f = e[a++];) ar.test(f.type || "") && r.push(f);
            return s
        },
        cleanData: function(n) {
            for (var f, t, o, u, h = i.event.special, s = 0; void 0 !== (t = n[s]); s++) {
                if (i.acceptData(t) && (u = t[r.expando], u && (f = r.cache[u]))) {
                    if (f.events)
                        for (o in f.events) h[o] ? i.event.remove(t, o) : i.removeEvent(t, o, f.handle);
                    r.cache[u] && delete r.cache[u]
                }
                delete e.cache[t[e.expando]]
            }
        }
    });
    i.fn.extend({
        text: function(n) {
            return l(this, function(n) {
                return void 0 === n ? i.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = n)
                })
            }, null, n, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = vr(this, n);
                    t.appendChild(n)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(n) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = vr(this, n);
                    t.insertBefore(n, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(n) {
                this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
            })
        },
        remove: function(n, t) {
            for (var r, f = n ? i.filter(n, this) : this, u = 0; null != (r = f[u]); u++) t || 1 !== r.nodeType || i.cleanData(o(r)), r.parentNode && (t && i.contains(r.ownerDocument, r) && ei(o(r, "script")), r.parentNode.removeChild(r));
            return this
        },
        empty: function() {
            for (var n, t = 0; null != (n = this[t]); t++) 1 === n.nodeType && (i.cleanData(o(n, !1)), n.textContent = "");
            return this
        },
        clone: function(n, t) {
            return n = null == n ? !1 : n, t = null == t ? n : t, this.map(function() {
                return i.clone(this, n, t)
            })
        },
        html: function(n) {
            return l(this, function(n) {
                var t = this[0] || {},
                    r = 0,
                    u = this.length;
                if (void 0 === n && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof n && !vf.test(n) && !h[(lr.exec(n) || ["", ""])[1].toLowerCase()]) {
                    n = n.replace(cr, "<$1><\/$2>");
                    try {
                        for (; u > r; r++) t = this[r] || {}, 1 === t.nodeType && (i.cleanData(o(t, !1)), t.innerHTML = n);
                        t = 0
                    } catch (f) {}
                }
                t && this.empty().append(n)
            }, null, n, arguments.length)
        },
        replaceWith: function() {
            var n = arguments[0];
            return this.domManip(arguments, function(t) {
                n = this.parentNode;
                i.cleanData(o(this));
                n && n.replaceChild(t, this)
            }), n && (n.length || n.nodeType) ? this : this.remove()
        },
        detach: function(n) {
            return this.remove(n, !0)
        },
        domManip: function(n, t) {
            n = bi.apply([], n);
            var h, v, s, c, u, y, e = 0,
                l = this.length,
                w = this,
                b = l - 1,
                a = n[0],
                p = i.isFunction(a);
            if (p || l > 1 && "string" == typeof a && !f.checkClone && yf.test(a)) return this.each(function(i) {
                var r = w.eq(i);
                p && (n[0] = a.call(this, i, r.html()));
                r.domManip(n, t)
            });
            if (l && (h = i.buildFragment(n, this[0].ownerDocument, !1, this), v = h.firstChild, 1 === h.childNodes.length && (h = v), v)) {
                for (s = i.map(o(h, "script"), bf), c = s.length; l > e; e++) u = h, e !== b && (u = i.clone(u, !0, !0), c && i.merge(s, o(u, "script"))), t.call(this[e], u, e);
                if (c)
                    for (y = s[s.length - 1].ownerDocument, i.map(s, kf), e = 0; c > e; e++) u = s[e], ar.test(u.type || "") && !r.access(u, "globalEval") && i.contains(y, u) && (u.src ? i._evalUrl && i._evalUrl(u.src) : i.globalEval(u.textContent.replace(wf, "")))
            }
            return this
        }
    });
    i.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(n, t) {
        i.fn[n] = function(n) {
            for (var u, f = [], e = i(n), o = e.length - 1, r = 0; o >= r; r++) u = r === o ? this : this.clone(!0), i(e[r])[t](u), ti.apply(f, u.get());
            return this.pushStack(f)
        }
    });
    oi = {};
    var wr = /^margin/,
        hi = new RegExp("^(" + ct + ")(?!px)[a-z%]+$", "i"),
        vt = function(t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : n.getComputedStyle(t, null)
        };
    ! function() {
        var s, o, e = u.documentElement,
            r = u.createElement("div"),
            t = u.createElement("div");
        if (t.style) {
            t.style.backgroundClip = "content-box";
            t.cloneNode(!0).style.backgroundClip = "";
            f.clearCloneStyle = "content-box" === t.style.backgroundClip;
            r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute";
            r.appendChild(t);

            function h() {
                t.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
                t.innerHTML = "";
                e.appendChild(r);
                var i = n.getComputedStyle(t, null);
                s = "1%" !== i.top;
                o = "4px" === i.width;
                e.removeChild(r)
            }
            n.getComputedStyle && i.extend(f, {
                pixelPosition: function() {
                    return h(), s
                },
                boxSizingReliable: function() {
                    return null == o && h(), o
                },
                reliableMarginRight: function() {
                    var f, i = t.appendChild(u.createElement("div"));
                    return i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", e.appendChild(r), f = !parseFloat(n.getComputedStyle(i, null).marginRight), e.removeChild(r), t.removeChild(i), f
                }
            })
        }
    }();
    i.swap = function(n, t, i, r) {
        var f, u, e = {};
        for (u in t) e[u] = n.style[u], n.style[u] = t[u];
        f = i.apply(n, r || []);
        for (u in t) n.style[u] = e[u];
        return f
    };
    var gf = /^(none|table(?!-c[ea]).+)/,
        ne = new RegExp("^(" + ct + ")(.*)$", "i"),
        te = new RegExp("^([+-])=(" + ct + ")", "i"),
        ie = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        kr = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        dr = ["Webkit", "O", "Moz", "ms"];
    i.extend({
        cssHooks: {
            opacity: {
                get: function(n, t) {
                    if (t) {
                        var i = it(n, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(n, t, r, u) {
            if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
                var o, h, e, s = i.camelCase(t),
                    c = n.style;
                return t = i.cssProps[s] || (i.cssProps[s] = gr(c, s)), e = i.cssHooks[t] || i.cssHooks[s], void 0 === r ? e && "get" in e && void 0 !== (o = e.get(n, !1, u)) ? o : c[t] : (h = typeof r, "string" === h && (o = te.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(i.css(n, t)), h = "number"), null != r && r === r && ("number" !== h || i.cssNumber[s] || (r += "px"), f.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (c[t] = "inherit"), e && "set" in e && void 0 === (r = e.set(n, r, u)) || (c[t] = r)), void 0)
            }
        },
        css: function(n, t, r, u) {
            var f, s, e, o = i.camelCase(t);
            return t = i.cssProps[o] || (i.cssProps[o] = gr(n.style, o)), e = i.cssHooks[t] || i.cssHooks[o], e && "get" in e && (f = e.get(n, !0, r)), void 0 === f && (f = it(n, t, u)), "normal" === f && t in kr && (f = kr[t]), "" === r || r ? (s = parseFloat(f), r === !0 || i.isNumeric(s) ? s || 0 : f) : f
        }
    });
    i.each(["height", "width"], function(n, t) {
        i.cssHooks[t] = {
            get: function(n, r, u) {
                if (r) return gf.test(i.css(n, "display")) && 0 === n.offsetWidth ? i.swap(n, ie, function() {
                    return iu(n, t, u)
                }) : iu(n, t, u)
            },
            set: function(n, r, u) {
                var f = u && vt(n);
                return nu(n, r, u ? tu(n, t, u, "border-box" === i.css(n, "boxSizing", !1, f), f) : 0)
            }
        }
    });
    i.cssHooks.marginRight = br(f.reliableMarginRight, function(n, t) {
        if (t) return i.swap(n, {
            display: "inline-block"
        }, it, [n, "marginRight"])
    });
    i.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(n, t) {
        i.cssHooks[n + t] = {
            expand: function(i) {
                for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++) f[n + p[r] + t] = u[r] || u[r - 2] || u[0];
                return f
            }
        };
        wr.test(n) || (i.cssHooks[n + t].set = nu)
    });
    i.fn.extend({
        css: function(n, t) {
            return l(this, function(n, t, r) {
                var f, e, o = {},
                    u = 0;
                if (i.isArray(t)) {
                    for (f = vt(n), e = t.length; e > u; u++) o[t[u]] = i.css(n, t[u], !1, f);
                    return o
                }
                return void 0 !== r ? i.style(n, t, r) : i.css(n, t)
            }, n, t, arguments.length > 1)
        },
        show: function() {
            return ru(this, !0)
        },
        hide: function() {
            return ru(this)
        },
        toggle: function(n) {
            return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function() {
                tt(this) ? i(this).show() : i(this).hide()
            })
        }
    });
    i.Tween = s;
    s.prototype = {
        constructor: s,
        init: function(n, t, r, u, f, e) {
            this.elem = n;
            this.prop = r;
            this.easing = f || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = u;
            this.unit = e || (i.cssNumber[r] ? "" : "px")
        },
        cur: function() {
            var n = s.propHooks[this.prop];
            return n && n.get ? n.get(this) : s.propHooks._default.get(this)
        },
        run: function(n) {
            var t, r = s.propHooks[this.prop];
            return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : s.propHooks._default.set(this), this
        }
    };
    s.prototype.init.prototype = s.prototype;
    s.propHooks = {
        _default: {
            get: function(n) {
                var t;
                return null == n.elem[n.prop] || n.elem.style && null != n.elem.style[n.prop] ? (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0) : n.elem[n.prop]
            },
            set: function(n) {
                i.fx.step[n.prop] ? i.fx.step[n.prop](n) : n.elem.style && (null != n.elem.style[i.cssProps[n.prop]] || i.cssHooks[n.prop]) ? i.style(n.elem, n.prop, n.now + n.unit) : n.elem[n.prop] = n.now
            }
        }
    };
    s.propHooks.scrollTop = s.propHooks.scrollLeft = {
        set: function(n) {
            n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
        }
    };
    i.easing = {
        linear: function(n) {
            return n
        },
        swing: function(n) {
            return .5 - Math.cos(n * Math.PI) / 2
        }
    };
    i.fx = s.prototype.init;
    i.fx.step = {};
    var d, yt, re = /^(?:toggle|show|hide)$/,
        uu = new RegExp("^(?:([+-])=|)(" + ct + ")([a-z%]*)$", "i"),
        ue = /queueHooks$/,
        pt = [fe],
        rt = {
            "*": [function(n, t) {
                var f = this.createTween(n, t),
                    s = f.cur(),
                    r = uu.exec(t),
                    e = r && r[3] || (i.cssNumber[n] ? "" : "px"),
                    u = (i.cssNumber[n] || "px" !== e && +s) && uu.exec(i.css(f.elem, n)),
                    o = 1,
                    h = 20;
                if (u && u[3] !== e) {
                    e = e || u[3];
                    r = r || [];
                    u = +s || 1;
                    do o = o || ".5", u /= o, i.style(f.elem, n, u + e); while (o !== (o = f.cur() / s) && 1 !== o && --h)
                }
                return r && (u = f.start = +u || +s || 0, f.unit = e, f.end = r[1] ? u + (r[1] + 1) * r[2] : +r[2]), f
            }]
        };
    i.Animation = i.extend(ou, {
        tweener: function(n, t) {
            i.isFunction(n) ? (t = n, n = ["*"]) : n = n.split(" ");
            for (var r, u = 0, f = n.length; f > u; u++) r = n[u], rt[r] = rt[r] || [], rt[r].unshift(t)
        },
        prefilter: function(n, t) {
            t ? pt.unshift(n) : pt.push(n)
        }
    });
    i.speed = function(n, t, r) {
        var u = n && "object" == typeof n ? i.extend({}, n) : {
            complete: r || !r && t || i.isFunction(n) && n,
            duration: n,
            easing: r && t || t && !i.isFunction(t) && t
        };
        return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default, (null == u.queue || u.queue === !0) && (u.queue = "fx"), u.old = u.complete, u.complete = function() {
            i.isFunction(u.old) && u.old.call(this);
            u.queue && i.dequeue(this, u.queue)
        }, u
    };
    i.fn.extend({
        fadeTo: function(n, t, i, r) {
            return this.filter(tt).css("opacity", 0).show().end().animate({
                opacity: t
            }, n, i, r)
        },
        animate: function(n, t, u, f) {
            var s = i.isEmptyObject(n),
                o = i.speed(t, u, f),
                e = function() {
                    var t = ou(this, i.extend({}, n), o);
                    (s || r.get(this, "finish")) && t.stop(!0)
                };
            return e.finish = e, s || o.queue === !1 ? this.each(e) : this.queue(o.queue, e)
        },
        stop: function(n, t, u) {
            var f = function(n) {
                var t = n.stop;
                delete n.stop;
                t(u)
            };
            return "string" != typeof n && (u = t, t = n, n = void 0), t && n !== !1 && this.queue(n || "fx", []), this.each(function() {
                var s = !0,
                    t = null != n && n + "queueHooks",
                    o = i.timers,
                    e = r.get(this);
                if (t) e[t] && e[t].stop && f(e[t]);
                else
                    for (t in e) e[t] && e[t].stop && ue.test(t) && f(e[t]);
                for (t = o.length; t--;) o[t].elem !== this || null != n && o[t].queue !== n || (o[t].anim.stop(u), s = !1, o.splice(t, 1));
                (s || !u) && i.dequeue(this, n)
            })
        },
        finish: function(n) {
            return n !== !1 && (n = n || "fx"), this.each(function() {
                var t, e = r.get(this),
                    u = e[n + "queue"],
                    o = e[n + "queueHooks"],
                    f = i.timers,
                    s = u ? u.length : 0;
                for (e.finish = !0, i.queue(this, n, []), o && o.stop && o.stop.call(this, !0), t = f.length; t--;) f[t].elem === this && f[t].queue === n && (f[t].anim.stop(!0), f.splice(t, 1));
                for (t = 0; s > t; t++) u[t] && u[t].finish && u[t].finish.call(this);
                delete e.finish
            })
        }
    });
    i.each(["toggle", "show", "hide"], function(n, t) {
        var r = i.fn[t];
        i.fn[t] = function(n, i, u) {
            return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(wt(t, !0), n, i, u)
        }
    });
    i.each({
        slideDown: wt("show"),
        slideUp: wt("hide"),
        slideToggle: wt("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(n, t) {
        i.fn[n] = function(n, i, r) {
            return this.animate(t, n, i, r)
        }
    });
    i.timers = [];
    i.fx.tick = function() {
        var r, n = 0,
            t = i.timers;
        for (d = i.now(); n < t.length; n++) r = t[n], r() || t[n] !== r || t.splice(n--, 1);
        t.length || i.fx.stop();
        d = void 0
    };
    i.fx.timer = function(n) {
        i.timers.push(n);
        n() ? i.fx.start() : i.timers.pop()
    };
    i.fx.interval = 13;
    i.fx.start = function() {
        yt || (yt = setInterval(i.fx.tick, i.fx.interval))
    };
    i.fx.stop = function() {
        clearInterval(yt);
        yt = null
    };
    i.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    i.fn.delay = function(n, t) {
            return n = i.fx ? i.fx.speeds[n] || n : n, t = t || "fx", this.queue(t, function(t, i) {
                var r = setTimeout(t, n);
                i.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        function() {
            var n = u.createElement("input"),
                t = u.createElement("select"),
                i = t.appendChild(u.createElement("option"));
            n.type = "checkbox";
            f.checkOn = "" !== n.value;
            f.optSelected = i.selected;
            t.disabled = !0;
            f.optDisabled = !i.disabled;
            n = u.createElement("input");
            n.value = "t";
            n.type = "radio";
            f.radioValue = "t" === n.value
        }();
    g = i.expr.attrHandle;
    i.fn.extend({
        attr: function(n, t) {
            return l(this, i.attr, n, t, arguments.length > 1)
        },
        removeAttr: function(n) {
            return this.each(function() {
                i.removeAttr(this, n)
            })
        }
    });
    i.extend({
        attr: function(n, t, r) {
            var u, f, e = n.nodeType;
            if (n && 3 !== e && 8 !== e && 2 !== e) return typeof n.getAttribute === b ? i.prop(n, t, r) : (1 === e && i.isXMLDoc(n) || (t = t.toLowerCase(), u = i.attrHooks[t] || (i.expr.match.bool.test(t) ? su : oe)), void 0 === r ? u && "get" in u && null !== (f = u.get(n, t)) ? f : (f = i.find.attr(n, t), null == f ? void 0 : f) : null !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : (n.setAttribute(t, r + ""), r) : void i.removeAttr(n, t))
        },
        removeAttr: function(n, t) {
            var r, u, e = 0,
                f = t && t.match(c);
            if (f && 1 === n.nodeType)
                while (r = f[e++]) u = i.propFix[r] || r, i.expr.match.bool.test(r) && (n[u] = !1), n.removeAttribute(r)
        },
        attrHooks: {
            type: {
                set: function(n, t) {
                    if (!f.radioValue && "radio" === t && i.nodeName(n, "input")) {
                        var r = n.value;
                        return n.setAttribute("type", t), r && (n.value = r), t
                    }
                }
            }
        }
    });
    su = {
        set: function(n, t, r) {
            return t === !1 ? i.removeAttr(n, r) : n.setAttribute(r, r), r
        }
    };
    i.each(i.expr.match.bool.source.match(/\w+/g), function(n, t) {
        var r = g[t] || i.find.attr;
        g[t] = function(n, t, i) {
            var u, f;
            return i || (f = g[t], g[t] = u, u = null != r(n, t, i) ? t.toLowerCase() : null, g[t] = f), u
        }
    });
    hu = /^(?:input|select|textarea|button)$/i;
    i.fn.extend({
        prop: function(n, t) {
            return l(this, i.prop, n, t, arguments.length > 1)
        },
        removeProp: function(n) {
            return this.each(function() {
                delete this[i.propFix[n] || n]
            })
        }
    });
    i.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(n, t, r) {
            var f, u, o, e = n.nodeType;
            if (n && 3 !== e && 8 !== e && 2 !== e) return o = 1 !== e || !i.isXMLDoc(n), o && (t = i.propFix[t] || t, u = i.propHooks[t]), void 0 !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : n[t] = r : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
        },
        propHooks: {
            tabIndex: {
                get: function(n) {
                    return n.hasAttribute("tabindex") || hu.test(n.nodeName) || n.href ? n.tabIndex : -1
                }
            }
        }
    });
    f.optSelected || (i.propHooks.selected = {
        get: function(n) {
            var t = n.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    });
    i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        i.propFix[this.toLowerCase()] = this
    });
    bt = /[\t\r\n\f]/g;
    i.fn.extend({
        addClass: function(n) {
            var o, t, r, u, s, f, h = "string" == typeof n && n,
                e = 0,
                l = this.length;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).addClass(n.call(this, t, this.className))
            });
            if (h)
                for (o = (n || "").match(c) || []; l > e; e++)
                    if (t = this[e], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(bt, " ") : " ")) {
                        for (s = 0; u = o[s++];) r.indexOf(" " + u + " ") < 0 && (r += u + " ");
                        f = i.trim(r);
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        removeClass: function(n) {
            var o, t, r, u, s, f, h = 0 === arguments.length || "string" == typeof n && n,
                e = 0,
                l = this.length;
            if (i.isFunction(n)) return this.each(function(t) {
                i(this).removeClass(n.call(this, t, this.className))
            });
            if (h)
                for (o = (n || "").match(c) || []; l > e; e++)
                    if (t = this[e], r = 1 === t.nodeType && (t.className ? (" " + t.className + " ").replace(bt, " ") : "")) {
                        for (s = 0; u = o[s++];)
                            while (r.indexOf(" " + u + " ") >= 0) r = r.replace(" " + u + " ", " ");
                        f = n ? i.trim(r) : "";
                        t.className !== f && (t.className = f)
                    }
            return this
        },
        toggleClass: function(n, t) {
            var u = typeof n;
            return "boolean" == typeof t && "string" === u ? t ? this.addClass(n) : this.removeClass(n) : this.each(i.isFunction(n) ? function(r) {
                i(this).toggleClass(n.call(this, r, this.className, t), t)
            } : function() {
                if ("string" === u)
                    for (var t, e = 0, f = i(this), o = n.match(c) || []; t = o[e++];) f.hasClass(t) ? f.removeClass(t) : f.addClass(t);
                else(u === b || "boolean" === u) && (this.className && r.set(this, "__className__", this.className), this.className = this.className || n === !1 ? "" : r.get(this, "__className__") || "")
            })
        },
        hasClass: function(n) {
            for (var i = " " + n + " ", t = 0, r = this.length; r > t; t++)
                if (1 === this[t].nodeType && (" " + this[t].className + " ").replace(bt, " ").indexOf(i) >= 0) return !0;
            return !1
        }
    });
    cu = /\r/g;
    i.fn.extend({
        val: function(n) {
            var t, r, f, u = this[0];
            return arguments.length ? (f = i.isFunction(n), this.each(function(r) {
                var u;
                1 === this.nodeType && (u = f ? n.call(this, r, i(this).val()) : n, null == u ? u = "" : "number" == typeof u ? u += "" : i.isArray(u) && (u = i.map(u, function(n) {
                    return null == n ? "" : n + ""
                })), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, u, "value") || (this.value = u))
            })) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(u, "value")) ? r : (r = u.value, "string" == typeof r ? r.replace(cu, "") : null == r ? "" : r)) : void 0
        }
    });
    i.extend({
        valHooks: {
            option: {
                get: function(n) {
                    var t = i.find.attr(n, "value");
                    return null != t ? t : i.trim(i.text(n))
                }
            },
            select: {
                get: function(n) {
                    for (var o, t, s = n.options, r = n.selectedIndex, u = "select-one" === n.type || 0 > r, h = u ? null : [], c = u ? r + 1 : s.length, e = 0 > r ? c : u ? r : 0; c > e; e++)
                        if (t = s[e], !(!t.selected && e !== r || (f.optDisabled ? t.disabled : null !== t.getAttribute("disabled")) || t.parentNode.disabled && i.nodeName(t.parentNode, "optgroup"))) {
                            if (o = i(t).val(), u) return o;
                            h.push(o)
                        }
                    return h
                },
                set: function(n, t) {
                    for (var u, r, f = n.options, e = i.makeArray(t), o = f.length; o--;) r = f[o], (r.selected = i.inArray(r.value, e) >= 0) && (u = !0);
                    return u || (n.selectedIndex = -1), e
                }
            }
        }
    });
    i.each(["radio", "checkbox"], function() {
        i.valHooks[this] = {
            set: function(n, t) {
                if (i.isArray(t)) return n.checked = i.inArray(i(n).val(), t) >= 0
            }
        };
        f.checkOn || (i.valHooks[this].get = function(n) {
            return null === n.getAttribute("value") ? "on" : n.value
        })
    });
    i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(n, t) {
        i.fn[t] = function(n, i) {
            return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
        }
    });
    i.fn.extend({
        hover: function(n, t) {
            return this.mouseenter(n).mouseleave(t || n)
        },
        bind: function(n, t, i) {
            return this.on(n, null, t, i)
        },
        unbind: function(n, t) {
            return this.off(n, null, t)
        },
        delegate: function(n, t, i, r) {
            return this.on(t, n, i, r)
        },
        undelegate: function(n, t, i) {
            return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
        }
    });
    kt = i.now();
    dt = /\?/;
    i.parseJSON = function(n) {
        return JSON.parse(n + "")
    };
    i.parseXML = function(n) {
        var t, r;
        if (!n || "string" != typeof n) return null;
        try {
            r = new DOMParser;
            t = r.parseFromString(n, "text/xml")
        } catch (u) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && i.error("Invalid XML: " + n), t
    };
    var se = /#.*$/,
        lu = /([?&])_=[^&]*/,
        he = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        ce = /^(?:GET|HEAD)$/,
        le = /^\/\//,
        au = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        vu = {},
        ci = {},
        yu = "*/".concat("*"),
        li = n.location.href,
        nt = au.exec(li.toLowerCase()) || [];
    i.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: li,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(nt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": yu,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": i.parseJSON,
                "text xml": i.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(n, t) {
            return t ? ai(ai(n, i.ajaxSettings), t) : ai(i.ajaxSettings, n)
        },
        ajaxPrefilter: pu(vu),
        ajaxTransport: pu(ci),
        ajax: function(n, t) {
            function p(n, t, s, h) {
                var v, it, tt, p, nt, c = t;
                2 !== e && (e = 2, b && clearTimeout(b), l = void 0, w = h || "", u.readyState = n > 0 ? 4 : 0, v = n >= 200 && 300 > n || 304 === n, s && (p = ae(r, u, s)), p = ve(r, p, u, v), v ? (r.ifModified && (nt = u.getResponseHeader("Last-Modified"), nt && (i.lastModified[f] = nt), nt = u.getResponseHeader("etag"), nt && (i.etag[f] = nt)), 204 === n || "HEAD" === r.type ? c = "nocontent" : 304 === n ? c = "notmodified" : (c = p.state, it = p.data, tt = p.error, v = !tt)) : (tt = c, (n || !c) && (c = "error", 0 > n && (n = 0))), u.status = n, u.statusText = (t || c) + "", v ? d.resolveWith(o, [it, c, u]) : d.rejectWith(o, [u, c, tt]), u.statusCode(y), y = void 0, a && k.trigger(v ? "ajaxSuccess" : "ajaxError", [u, r, v ? it : tt]), g.fireWith(o, [u, c]), a && (k.trigger("ajaxComplete", [u, r]), --i.active || i.event.trigger("ajaxStop")))
            }
            "object" == typeof n && (t = n, n = void 0);
            t = t || {};
            var l, f, w, v, b, s, a, h, r = i.ajaxSetup({}, t),
                o = r.context || r,
                k = r.context && (o.nodeType || o.jquery) ? i(o) : i.event,
                d = i.Deferred(),
                g = i.Callbacks("once memory"),
                y = r.statusCode || {},
                tt = {},
                it = {},
                e = 0,
                rt = "canceled",
                u = {
                    readyState: 0,
                    getResponseHeader: function(n) {
                        var t;
                        if (2 === e) {
                            if (!v)
                                for (v = {}; t = he.exec(w);) v[t[1].toLowerCase()] = t[2];
                            t = v[n.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === e ? w : null
                    },
                    setRequestHeader: function(n, t) {
                        var i = n.toLowerCase();
                        return e || (n = it[i] = it[i] || n, tt[n] = t), this
                    },
                    overrideMimeType: function(n) {
                        return e || (r.mimeType = n), this
                    },
                    statusCode: function(n) {
                        var t;
                        if (n)
                            if (2 > e)
                                for (t in n) y[t] = [y[t], n[t]];
                            else u.always(n[u.status]);
                        return this
                    },
                    abort: function(n) {
                        var t = n || rt;
                        return l && l.abort(t), p(0, t), this
                    }
                };
            if (d.promise(u).complete = g.add, u.success = u.done, u.error = u.fail, r.url = ((n || r.url || li) + "").replace(se, "").replace(le, nt[1] + "//"), r.type = t.method || t.type || r.method || r.type, r.dataTypes = i.trim(r.dataType || "*").toLowerCase().match(c) || [""], null == r.crossDomain && (s = au.exec(r.url.toLowerCase()), r.crossDomain = !(!s || s[1] === nt[1] && s[2] === nt[2] && (s[3] || ("http:" === s[1] ? "80" : "443")) === (nt[3] || ("http:" === nt[1] ? "80" : "443")))), r.data && r.processData && "string" != typeof r.data && (r.data = i.param(r.data, r.traditional)), wu(vu, r, t, u), 2 === e) return u;
            a = i.event && r.global;
            a && 0 == i.active++ && i.event.trigger("ajaxStart");
            r.type = r.type.toUpperCase();
            r.hasContent = !ce.test(r.type);
            f = r.url;
            r.hasContent || (r.data && (f = r.url += (dt.test(f) ? "&" : "?") + r.data, delete r.data), r.cache === !1 && (r.url = lu.test(f) ? f.replace(lu, "$1_=" + kt++) : f + (dt.test(f) ? "&" : "?") + "_=" + kt++));
            r.ifModified && (i.lastModified[f] && u.setRequestHeader("If-Modified-Since", i.lastModified[f]), i.etag[f] && u.setRequestHeader("If-None-Match", i.etag[f]));
            (r.data && r.hasContent && r.contentType !== !1 || t.contentType) && u.setRequestHeader("Content-Type", r.contentType);
            u.setRequestHeader("Accept", r.dataTypes[0] && r.accepts[r.dataTypes[0]] ? r.accepts[r.dataTypes[0]] + ("*" !== r.dataTypes[0] ? ", " + yu + "; q=0.01" : "") : r.accepts["*"]);
            for (h in r.headers) u.setRequestHeader(h, r.headers[h]);
            if (r.beforeSend && (r.beforeSend.call(o, u, r) === !1 || 2 === e)) return u.abort();
            rt = "abort";
            for (h in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) u[h](r[h]);
            if (l = wu(ci, r, t, u)) {
                u.readyState = 1;
                a && k.trigger("ajaxSend", [u, r]);
                r.async && r.timeout > 0 && (b = setTimeout(function() {
                    u.abort("timeout")
                }, r.timeout));
                try {
                    e = 1;
                    l.send(tt, p)
                } catch (ut) {
                    if (!(2 > e)) throw ut;
                    p(-1, ut)
                }
            } else p(-1, "No Transport");
            return u
        },
        getJSON: function(n, t, r) {
            return i.get(n, t, r, "json")
        },
        getScript: function(n, t) {
            return i.get(n, void 0, t, "script")
        }
    });
    i.each(["get", "post"], function(n, t) {
        i[t] = function(n, r, u, f) {
            return i.isFunction(r) && (f = f || u, u = r, r = void 0), i.ajax({
                url: n,
                type: t,
                dataType: f,
                data: r,
                success: u
            })
        }
    });
    i._evalUrl = function(n) {
        return i.ajax({
            url: n,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    };
    i.fn.extend({
        wrapAll: function(n) {
            var t;
            return i.isFunction(n) ? this.each(function(t) {
                i(this).wrapAll(n.call(this, t))
            }) : (this[0] && (t = i(n, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var n = this; n.firstElementChild;) n = n.firstElementChild;
                return n
            }).append(this)), this)
        },
        wrapInner: function(n) {
            return this.each(i.isFunction(n) ? function(t) {
                i(this).wrapInner(n.call(this, t))
            } : function() {
                var t = i(this),
                    r = t.contents();
                r.length ? r.wrapAll(n) : t.append(n)
            })
        },
        wrap: function(n) {
            var t = i.isFunction(n);
            return this.each(function(r) {
                i(this).wrapAll(t ? n.call(this, r) : n)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    i.expr.filters.hidden = function(n) {
        return n.offsetWidth <= 0 && n.offsetHeight <= 0
    };
    i.expr.filters.visible = function(n) {
        return !i.expr.filters.hidden(n)
    };
    var ye = /%20/g,
        pe = /\[\]$/,
        bu = /\r?\n/g,
        we = /^(?:submit|button|image|reset|file)$/i,
        be = /^(?:input|select|textarea|keygen)/i;
    i.param = function(n, t) {
        var r, u = [],
            f = function(n, t) {
                t = i.isFunction(t) ? t() : null == t ? "" : t;
                u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
            };
        if (void 0 === t && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n)) i.each(n, function() {
            f(this.name, this.value)
        });
        else
            for (r in n) vi(r, n[r], t, f);
        return u.join("&").replace(ye, "+")
    };
    i.fn.extend({
        serialize: function() {
            return i.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var n = i.prop(this, "elements");
                return n ? i.makeArray(n) : this
            }).filter(function() {
                var n = this.type;
                return this.name && !i(this).is(":disabled") && be.test(this.nodeName) && !we.test(n) && (this.checked || !er.test(n))
            }).map(function(n, t) {
                var r = i(this).val();
                return null == r ? null : i.isArray(r) ? i.map(r, function(n) {
                    return {
                        name: t.name,
                        value: n.replace(bu, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: r.replace(bu, "\r\n")
                }
            }).get()
        }
    });
    i.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (n) {}
    };
    var ke = 0,
        gt = {},
        de = {
            0: 200,
            1223: 204
        },
        ut = i.ajaxSettings.xhr();
    return n.attachEvent && n.attachEvent("onunload", function() {
        for (var n in gt) gt[n]()
    }), f.cors = !!ut && "withCredentials" in ut, f.ajax = ut = !!ut, i.ajaxTransport(function(n) {
        var t;
        if (f.cors || ut && !n.crossDomain) return {
            send: function(i, r) {
                var f, u = n.xhr(),
                    e = ++ke;
                if (u.open(n.type, n.url, n.async, n.username, n.password), n.xhrFields)
                    for (f in n.xhrFields) u[f] = n.xhrFields[f];
                n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType);
                n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                for (f in i) u.setRequestHeader(f, i[f]);
                t = function(n) {
                    return function() {
                        t && (delete gt[e], t = u.onload = u.onerror = null, "abort" === n ? u.abort() : "error" === n ? r(u.status, u.statusText) : r(de[u.status] || u.status, u.statusText, "string" == typeof u.responseText ? {
                            text: u.responseText
                        } : void 0, u.getAllResponseHeaders()))
                    }
                };
                u.onload = t();
                u.onerror = t("error");
                t = gt[e] = t("abort");
                try {
                    u.send(n.hasContent && n.data || null)
                } catch (o) {
                    if (t) throw o;
                }
            },
            abort: function() {
                t && t()
            }
        }
    }), i.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(n) {
                return i.globalEval(n), n
            }
        }
    }), i.ajaxPrefilter("script", function(n) {
        void 0 === n.cache && (n.cache = !1);
        n.crossDomain && (n.type = "GET")
    }), i.ajaxTransport("script", function(n) {
        if (n.crossDomain) {
            var r, t;
            return {
                send: function(f, e) {
                    r = i("<script>").prop({
                        async: !0,
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", t = function(n) {
                        r.remove();
                        t = null;
                        n && e("error" === n.type ? 404 : 200, n.type)
                    });
                    u.head.appendChild(r[0])
                },
                abort: function() {
                    t && t()
                }
            }
        }
    }), yi = [], ni = /(=)\?(?=&|$)|\?\?/, i.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var n = yi.pop() || i.expando + "_" + kt++;
            return this[n] = !0, n
        }
    }), i.ajaxPrefilter("json jsonp", function(t, r, u) {
        var f, o, e, s = t.jsonp !== !1 && (ni.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(t.data) && "data");
        if (s || "jsonp" === t.dataTypes[0]) return (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ni, "$1" + f) : t.jsonp !== !1 && (t.url += (dt.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function() {
            return e || i.error(f + " was not called"), e[0]
        }, t.dataTypes[0] = "json", o = n[f], n[f] = function() {
            e = arguments
        }, u.always(function() {
            n[f] = o;
            t[f] && (t.jsonpCallback = r.jsonpCallback, yi.push(f));
            e && i.isFunction(o) && o(e[0]);
            e = o = void 0
        }), "script")
    }), i.parseHTML = function(n, t, r) {
        if (!n || "string" != typeof n) return null;
        "boolean" == typeof t && (r = t, t = !1);
        t = t || u;
        var f = gi.exec(n),
            e = !r && [];
        return f ? [t.createElement(f[1])] : (f = i.buildFragment([n], t, e), e && e.length && i(e).remove(), i.merge([], f.childNodes))
    }, pi = i.fn.load, i.fn.load = function(n, t, r) {
        if ("string" != typeof n && pi) return pi.apply(this, arguments);
        var u, o, s, f = this,
            e = n.indexOf(" ");
        return e >= 0 && (u = i.trim(n.slice(e)), n = n.slice(0, e)), i.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (o = "POST"), f.length > 0 && i.ajax({
            url: n,
            type: o,
            dataType: "html",
            data: t
        }).done(function(n) {
            s = arguments;
            f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n)
        }).complete(r && function(n, t) {
            f.each(r, s || [n.responseText, t, n])
        }), this
    }, i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(n, t) {
        i.fn[t] = function(n) {
            return this.on(t, n)
        }
    }), i.expr.filters.animated = function(n) {
        return i.grep(i.timers, function(t) {
            return n === t.elem
        }).length
    }, wi = n.document.documentElement, i.offset = {
        setOffset: function(n, t, r) {
            var e, o, s, h, u, c, v, l = i.css(n, "position"),
                a = i(n),
                f = {};
            "static" === l && (n.style.position = "relative");
            u = a.offset();
            s = i.css(n, "top");
            c = i.css(n, "left");
            v = ("absolute" === l || "fixed" === l) && (s + c).indexOf("auto") > -1;
            v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
            i.isFunction(t) && (t = t.call(n, r, u));
            null != t.top && (f.top = t.top - u.top + h);
            null != t.left && (f.left = t.left - u.left + o);
            "using" in t ? t.using.call(n, f) : a.css(f)
        }
    }, i.fn.extend({
        offset: function(n) {
            if (arguments.length) return void 0 === n ? this : this.each(function(t) {
                i.offset.setOffset(this, n, t)
            });
            var r, f, t = this[0],
                u = {
                    top: 0,
                    left: 0
                },
                e = t && t.ownerDocument;
            if (e) return r = e.documentElement, i.contains(r, t) ? (typeof t.getBoundingClientRect !== b && (u = t.getBoundingClientRect()), f = ku(e), {
                top: u.top + f.pageYOffset - r.clientTop,
                left: u.left + f.pageXOffset - r.clientLeft
            }) : u
        },
        position: function() {
            if (this[0]) {
                var n, r, u = this[0],
                    t = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
                    top: r.top - t.top - i.css(u, "marginTop", !0),
                    left: r.left - t.left - i.css(u, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var n = this.offsetParent || wi; n && !i.nodeName(n, "html") && "static" === i.css(n, "position");) n = n.offsetParent;
                return n || wi
            })
        }
    }), i.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, r) {
        var u = "pageYOffset" === r;
        i.fn[t] = function(i) {
            return l(this, function(t, i, f) {
                var e = ku(t);
                return void 0 === f ? e ? e[r] : t[i] : void(e ? e.scrollTo(u ? n.pageXOffset : f, u ? f : n.pageYOffset) : t[i] = f)
            }, t, i, arguments.length, null)
        }
    }), i.each(["top", "left"], function(n, t) {
        i.cssHooks[t] = br(f.pixelPosition, function(n, r) {
            if (r) return (r = it(n, t), hi.test(r) ? i(n).position()[t] + "px" : r)
        })
    }), i.each({
        Height: "height",
        Width: "width"
    }, function(n, t) {
        i.each({
            padding: "inner" + n,
            content: t,
            "": "outer" + n
        }, function(r, u) {
            i.fn[u] = function(u, f) {
                var e = arguments.length && (r || "boolean" != typeof u),
                    o = r || (u === !0 || f === !0 ? "margin" : "border");
                return l(this, function(t, r, u) {
                    var f;
                    return i.isWindow(t) ? t.document.documentElement["client" + n] : 9 === t.nodeType ? (f = t.documentElement, Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : void 0 === u ? i.css(t, r, o) : i.style(t, r, u, o)
                }, t, e ? u : void 0, e, null)
            }
        })
    }), i.fn.size = function() {
        return this.length
    }, i.fn.andSelf = i.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return i
    }), du = n.jQuery, gu = n.$, i.noConflict = function(t) {
        return n.$ === i && (n.$ = gu), t && n.jQuery === i && (n.jQuery = du), i
    }, typeof t === b && (n.jQuery = n.$ = i), i
}),
function(n, t) {
    function i(t, i) {
        var u, f, e, o = t.nodeName.toLowerCase();
        return "area" === o ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap=#" + f + "]")[0], !!e && r(e)) : !1) : (/input|select|textarea|button|object/.test(o) ? !t.disabled : "a" === o ? t.href || i : i) && r(t)
    }

    function r(t) {
        return n.expr.filters.visible(t) && !n(t).parents().addBack().filter(function() {
            return "hidden" === n.css(this, "visibility")
        }).length
    }
    var u = 0,
        f = /^ui-id-\d+$/;
    n.ui = n.ui || {};
    n.extend(n.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    n.fn.extend({
        focus: function(t) {
            return function(i, r) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() {
                        n(t).focus();
                        r && r.call(t)
                    }, i)
                }) : t.apply(this, arguments)
            }
        }(n.fn.focus),
        scrollParent: function() {
            var t;
            return t = n.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(n.css(this, "position")) && /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(n.css(this, "overflow") + n.css(this, "overflow-y") + n.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? n(document) : t
        },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var u, f, r = n(this[0]); r.length && r[0] !== document;) {
                    if (u = r.css("position"), ("absolute" === u || "relative" === u || "fixed" === u) && (f = parseInt(r.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
                    r = r.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++u)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                f.test(this.id) && n(this).removeAttr("id")
            })
        }
    });
    n.extend(n.expr[":"], {
        data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
            return function(i) {
                return !!n.data(i, t)
            }
        }) : function(t, i, r) {
            return !!n.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(n.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var r = n.attr(t, "tabindex"),
                u = isNaN(r);
            return (u || r >= 0) && i(t, !u)
        }
    });
    n("<a>").outerWidth(1).jquery || n.each(["Width", "Height"], function(i, r) {
        function u(t, i, r, u) {
            return n.each(o, function() {
                i -= parseFloat(n.css(t, "padding" + this)) || 0;
                r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
                u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
            }), i
        }
        var o = "Width" === r ? ["Left", "Right"] : ["Top", "Bottom"],
            f = r.toLowerCase(),
            e = {
                innerWidth: n.fn.innerWidth,
                innerHeight: n.fn.innerHeight,
                outerWidth: n.fn.outerWidth,
                outerHeight: n.fn.outerHeight
            };
        n.fn["inner" + r] = function(i) {
            return i === t ? e["inner" + r].call(this) : this.each(function() {
                n(this).css(f, u(this, i) + "px")
            })
        };
        n.fn["outer" + r] = function(t, i) {
            return "number" != typeof t ? e["outer" + r].call(this, t) : this.each(function() {
                n(this).css(f, u(this, t, !0, i) + "px")
            })
        }
    });
    n.fn.addBack || (n.fn.addBack = function(n) {
        return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
    });
    n("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (n.fn.removeData = function(t) {
        return function(i) {
            return arguments.length ? t.call(this, n.camelCase(i)) : t.call(this)
        }
    }(n.fn.removeData));
    n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    n.support.selectstart = "onselectstart" in document.createElement("div");
    n.fn.extend({
        disableSelection: function() {
            return this.bind((n.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(n) {
                n.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    n.extend(n.ui, {
        plugin: {
            add: function(t, i, r) {
                var u, f = n.ui[t].prototype;
                for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
            },
            call: function(n, t, i) {
                var r, u = n.plugins[t];
                if (u && n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType)
                    for (r = 0; u.length > r; r++) n.options[u[r][0]] && u[r][1].apply(n.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === n(t).css("overflow")) return !1;
            var r = i && "left" === i ? "scrollLeft" : "scrollTop",
                u = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
        }
    })
}(jQuery),
function(n, t) {
    var r = 0,
        i = Array.prototype.slice,
        u = n.cleanData;
    n.cleanData = function(t) {
        for (var i, r = 0; null != (i = t[r]); r++) try {
            n(i).triggerHandler("remove")
        } catch (f) {}
        u(t)
    };
    n.widget = function(i, r, u) {
        var h, e, f, s, c = {},
            o = i.split(".")[0];
        i = i.split(".")[1];
        h = o + "-" + i;
        u || (u = r, r = n.Widget);
        n.expr[":"][h.toLowerCase()] = function(t) {
            return !!n.data(t, h)
        };
        n[o] = n[o] || {};
        e = n[o][i];
        f = n[o][i] = function(n, i) {
            return this._createWidget ? (arguments.length && this._createWidget(n, i), t) : new f(n, i)
        };
        n.extend(f, e, {
            version: u.version,
            _proto: n.extend({}, u),
            _childConstructors: []
        });
        s = new r;
        s.options = n.widget.extend({}, s.options);
        n.each(u, function(i, u) {
            return n.isFunction(u) ? (c[i] = function() {
                var n = function() {
                        return r.prototype[i].apply(this, arguments)
                    },
                    t = function(n) {
                        return r.prototype[i].apply(this, n)
                    };
                return function() {
                    var i, r = this._super,
                        f = this._superApply;
                    return this._super = n, this._superApply = t, i = u.apply(this, arguments), this._super = r, this._superApply = f, i
                }
            }(), t) : (c[i] = u, t)
        });
        f.prototype = n.widget.extend(s, {
            widgetEventPrefix: e ? s.widgetEventPrefix : i
        }, c, {
            constructor: f,
            namespace: o,
            widgetName: i,
            widgetFullName: h
        });
        e ? (n.each(e._childConstructors, function(t, i) {
            var r = i.prototype;
            n.widget(r.namespace + "." + r.widgetName, f, i._proto)
        }), delete e._childConstructors) : r._childConstructors.push(f);
        n.widget.bridge(i, f)
    };
    n.widget.extend = function(r) {
        for (var u, f, o = i.call(arguments, 1), e = 0, s = o.length; s > e; e++)
            for (u in o[e]) f = o[e][u], o[e].hasOwnProperty(u) && f !== t && (r[u] = n.isPlainObject(f) ? n.isPlainObject(r[u]) ? n.widget.extend({}, r[u], f) : n.widget.extend({}, f) : f);
        return r
    };
    n.widget.bridge = function(r, u) {
        var f = u.prototype.widgetFullName || r;
        n.fn[r] = function(e) {
            var h = "string" == typeof e,
                o = i.call(arguments, 1),
                s = this;
            return e = !h && o.length ? n.widget.extend.apply(null, [e].concat(o)) : e, h ? this.each(function() {
                var i, u = n.data(this, f);
                return u ? n.isFunction(u[e]) && "_" !== e.charAt(0) ? (i = u[e].apply(u, o), i !== u && i !== t ? (s = i && i.jquery ? s.pushStack(i.get()) : i, !1) : t) : n.error("no such method '" + e + "' for " + r + " widget instance") : n.error("cannot call methods on " + r + " prior to initialization; attempted to call method '" + e + "'")
            }) : this.each(function() {
                var t = n.data(this, f);
                t ? t.option(e || {})._init() : n.data(this, f, new u(e, this))
            }), s
        }
    };
    n.Widget = function() {};
    n.Widget._childConstructors = [];
    n.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, i) {
            i = n(i || this.defaultElement || this)[0];
            this.element = n(i);
            this.uuid = r++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
            this.bindings = n();
            this.hoverable = n();
            this.focusable = n();
            i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(n) {
                    n.target === i && this.destroy()
                }
            }), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: n.noop,
        _getCreateEventData: n.noop,
        _create: n.noop,
        _init: n.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(n.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: n.noop,
        widget: function() {
            return this.element
        },
        option: function(i, r) {
            var u, f, e, o = i;
            if (0 === arguments.length) return n.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (o = {}, u = i.split("."), i = u.shift(), u.length) {
                    for (f = o[i] = n.widget.extend({}, this.options[i]), e = 0; u.length - 1 > e; e++) f[u[e]] = f[u[e]] || {}, f = f[u[e]];
                    if (i = u.pop(), r === t) return f[i] === t ? null : f[i];
                    f[i] = r
                } else {
                    if (r === t) return this.options[i] === t ? null : this.options[i];
                    o[i] = r
                }
            return this._setOptions(o), this
        },
        _setOptions: function(n) {
            for (var t in n) this._setOption(t, n[t]);
            return this
        },
        _setOption: function(n, t) {
            return this.options[n] = t, "disabled" === n && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(i, r, u) {
            var e, f = this;
            "boolean" != typeof i && (u = r, r = i, i = !1);
            u ? (r = e = n(r), this.bindings = this.bindings.add(r)) : (u = r, r = this.element, e = this.widget());
            n.each(u, function(u, o) {
                function s() {
                    return i || f.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? f[o] : o).apply(f, arguments) : t
                }
                "string" != typeof o && (s.guid = o.guid = o.guid || s.guid || n.guid++);
                var h = u.match(/^(\w+)\s*(.*)$/),
                    c = h[1] + f.eventNamespace,
                    l = h[2];
                l ? e.delegate(l, c, s) : r.bind(c, s)
            })
        },
        _off: function(n, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            n.unbind(t).undelegate(t)
        },
        _delay: function(n, t) {
            function r() {
                return ("string" == typeof n ? i[n] : n).apply(i, arguments)
            }
            var i = this;
            return setTimeout(r, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t);
            this._on(t, {
                mouseenter: function(t) {
                    n(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    n(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t);
            this._on(t, {
                focusin: function(t) {
                    n(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    n(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, i, r) {
            var u, f, e = this.options[t];
            if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
                for (u in f) u in i || (i[u] = f[u]);
            return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
        }
    };
    n.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, i) {
        n.Widget.prototype["_" + t] = function(r, u, f) {
            "string" == typeof u && (u = {
                effect: u
            });
            var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
            u = u || {};
            "number" == typeof u && (u = {
                duration: u
            });
            o = !n.isEmptyObject(u);
            u.complete = f;
            u.delay && r.delay(u.delay);
            o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
                n(this)[t]();
                f && f.call(r[0]);
                i()
            })
        }
    })
}(jQuery),
function(n, t) {
    function e(n, t, i) {
        return [parseFloat(n[0]) * (a.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (a.test(n[1]) ? i / 100 : 1)]
    }

    function r(t, i) {
        return parseInt(n.css(t, i), 10) || 0
    }

    function v(t) {
        var i = t[0];
        return 9 === i.nodeType ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : n.isWindow(i) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : i.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: i.pageY,
                left: i.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    n.ui = n.ui || {};
    var f, u = Math.max,
        i = Math.abs,
        o = Math.round,
        s = /left|center|right/,
        h = /top|center|bottom/,
        c = /[\+\-]\d+(\.[\d]+)?%?/,
        l = /^\w+/,
        a = /%$/,
        y = n.fn.position;
    n.position = {
        scrollbarWidth: function() {
            if (f !== t) return f;
            var u, r, i = n("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
                e = i.children()[0];
            return n("body").append(i), u = e.offsetWidth, i.css("overflow", "scroll"), r = e.offsetWidth, u === r && (r = i[0].clientWidth), i.remove(), f = u - r
        },
        getScrollInfo: function(t) {
            var i = t.isWindow ? "" : t.element.css("overflow-x"),
                r = t.isWindow ? "" : t.element.css("overflow-y"),
                u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
                f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
            return {
                width: f ? n.position.scrollbarWidth() : 0,
                height: u ? n.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var i = n(t || window),
                r = n.isWindow(i[0]);
            return {
                element: i,
                isWindow: r,
                offset: i.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: i.scrollLeft(),
                scrollTop: i.scrollTop(),
                width: r ? i.width() : i.outerWidth(),
                height: r ? i.height() : i.outerHeight()
            }
        }
    };
    n.fn.position = function(t) {
        if (!t || !t.of) return y.apply(this, arguments);
        t = n.extend({}, t);
        var b, f, a, w, p, d, g = n(t.of),
            tt = n.position.getWithinInfo(t.within),
            it = n.position.getScrollInfo(tt),
            k = (t.collision || "flip").split(" "),
            nt = {};
        return d = v(g), g[0].preventDefault && (t.at = "left top"), f = d.width, a = d.height, w = d.offset, p = n.extend({}, w), n.each(["my", "at"], function() {
            var i, r, n = (t[this] || "").split(" ");
            1 === n.length && (n = s.test(n[0]) ? n.concat(["center"]) : h.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
            n[0] = s.test(n[0]) ? n[0] : "center";
            n[1] = h.test(n[1]) ? n[1] : "center";
            i = c.exec(n[0]);
            r = c.exec(n[1]);
            nt[this] = [i ? i[0] : 0, r ? r[0] : 0];
            t[this] = [l.exec(n[0])[0], l.exec(n[1])[0]]
        }), 1 === k.length && (k[1] = k[0]), "right" === t.at[0] ? p.left += f : "center" === t.at[0] && (p.left += f / 2), "bottom" === t.at[1] ? p.top += a : "center" === t.at[1] && (p.top += a / 2), b = e(nt.at, f, a), p.left += b[0], p.top += b[1], this.each(function() {
            var y, d, h = n(this),
                c = h.outerWidth(),
                l = h.outerHeight(),
                rt = r(this, "marginLeft"),
                ut = r(this, "marginTop"),
                ft = c + rt + r(this, "marginRight") + it.width,
                et = l + ut + r(this, "marginBottom") + it.height,
                s = n.extend({}, p),
                v = e(nt.my, h.outerWidth(), h.outerHeight());
            "right" === t.my[0] ? s.left -= c : "center" === t.my[0] && (s.left -= c / 2);
            "bottom" === t.my[1] ? s.top -= l : "center" === t.my[1] && (s.top -= l / 2);
            s.left += v[0];
            s.top += v[1];
            n.support.offsetFractions || (s.left = o(s.left), s.top = o(s.top));
            y = {
                marginLeft: rt,
                marginTop: ut
            };
            n.each(["left", "top"], function(i, r) {
                n.ui.position[k[i]] && n.ui.position[k[i]][r](s, {
                    targetWidth: f,
                    targetHeight: a,
                    elemWidth: c,
                    elemHeight: l,
                    collisionPosition: y,
                    collisionWidth: ft,
                    collisionHeight: et,
                    offset: [b[0] + v[0], b[1] + v[1]],
                    my: t.my,
                    at: t.at,
                    within: tt,
                    elem: h
                })
            });
            t.using && (d = function(n) {
                var r = w.left - s.left,
                    v = r + f - c,
                    e = w.top - s.top,
                    y = e + a - l,
                    o = {
                        target: {
                            element: g,
                            left: w.left,
                            top: w.top,
                            width: f,
                            height: a
                        },
                        element: {
                            element: h,
                            left: s.left,
                            top: s.top,
                            width: c,
                            height: l
                        },
                        horizontal: 0 > v ? "left" : r > 0 ? "right" : "center",
                        vertical: 0 > y ? "top" : e > 0 ? "bottom" : "middle"
                    };
                c > f && f > i(r + v) && (o.horizontal = "center");
                l > a && a > i(e + y) && (o.vertical = "middle");
                o.important = u(i(r), i(v)) > u(i(e), i(y)) ? "horizontal" : "vertical";
                t.using.call(this, n, o)
            });
            h.offset(n.extend(s, {
                using: d
            }))
        })
    };
    n.ui.position = {
            fit: {
                left: function(n, t) {
                    var h, e = t.within,
                        r = e.isWindow ? e.scrollLeft : e.offset.left,
                        o = e.width,
                        s = n.left - t.collisionPosition.marginLeft,
                        i = r - s,
                        f = s + t.collisionWidth - o - r;
                    t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - r, n.left += i - h) : n.left = f > 0 && 0 >= i ? r : i > f ? r + o - t.collisionWidth : r : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = u(n.left - s, n.left)
                },
                top: function(n, t) {
                    var h, o = t.within,
                        r = o.isWindow ? o.scrollTop : o.offset.top,
                        e = t.within.height,
                        s = n.top - t.collisionPosition.marginTop,
                        i = r - s,
                        f = s + t.collisionHeight - e - r;
                    t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - r, n.top += i - h) : n.top = f > 0 && 0 >= i ? r : i > f ? r + e - t.collisionHeight : r : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = u(n.top - s, n.top)
                }
            },
            flip: {
                left: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.left + r.scrollLeft,
                        c = r.width,
                        h = r.isWindow ? r.scrollLeft : r.offset.left,
                        l = n.left - t.collisionPosition.marginLeft,
                        a = l - h,
                        v = l + t.collisionWidth - c - h,
                        u = "left" === t.my[0] ? -t.elemWidth : "right" === t.my[0] ? t.elemWidth : 0,
                        f = "left" === t.at[0] ? t.targetWidth : "right" === t.at[0] ? -t.targetWidth : 0,
                        e = -2 * t.offset[0];
                    0 > a ? (o = n.left + u + f + e + t.collisionWidth - c - y, (0 > o || i(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - t.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > i(s)) && (n.left += u + f + e))
                },
                top: function(n, t) {
                    var o, s, r = t.within,
                        y = r.offset.top + r.scrollTop,
                        a = r.height,
                        h = r.isWindow ? r.scrollTop : r.offset.top,
                        v = n.top - t.collisionPosition.marginTop,
                        c = v - h,
                        l = v + t.collisionHeight - a - h,
                        p = "top" === t.my[1],
                        u = p ? -t.elemHeight : "bottom" === t.my[1] ? t.elemHeight : 0,
                        f = "top" === t.at[1] ? t.targetHeight : "bottom" === t.at[1] ? -t.targetHeight : 0,
                        e = -2 * t.offset[1];
                    0 > c ? (s = n.top + u + f + e + t.collisionHeight - a - y, n.top + u + f + e > c && (0 > s || i(c) > s) && (n.top += u + f + e)) : l > 0 && (o = n.top - t.collisionPosition.marginTop + u + f + e - h, n.top + u + f + e > l && (o > 0 || l > i(o)) && (n.top += u + f + e))
                }
            },
            flipfit: {
                left: function() {
                    n.ui.position.flip.left.apply(this, arguments);
                    n.ui.position.fit.left.apply(this, arguments)
                },
                top: function() {
                    n.ui.position.flip.top.apply(this, arguments);
                    n.ui.position.fit.top.apply(this, arguments)
                }
            }
        },
        function() {
            var t, i, r, u, f, e = document.getElementsByTagName("body")[0],
                o = document.createElement("div");
            t = document.createElement(e ? "div" : "body");
            r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            e && n.extend(r, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            });
            for (f in r) t.style[f] = r[f];
            t.appendChild(o);
            i = e || document.documentElement;
            i.insertBefore(t, i.firstChild);
            o.style.cssText = "position: absolute; left: 10.7432222px;";
            u = n(o).offset().left;
            n.support.offsetFractions = u > 10 && 11 > u;
            t.innerHTML = "";
            i.removeChild(t)
        }()
}(jQuery),
function(n) {
    var t = 0;
    n.widget("ui.autocomplete", {
        version: "1.10.3",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, i, r, u = this.element[0].nodeName.toLowerCase(),
                f = "textarea" === u,
                e = "input" === u;
            this.isMultiLine = f ? !0 : e ? !1 : this.element.prop("isContentEditable");
            this.valueMethod = this.element[f || e ? "val" : "text"];
            this.isNewMenu = !0;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off");
            this._on(this.element, {
                keydown: function(u) {
                    if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, undefined;
                    t = !1;
                    r = !1;
                    i = !1;
                    var f = n.ui.keyCode;
                    switch (u.keyCode) {
                        case f.PAGE_UP:
                            t = !0;
                            this._move("previousPage", u);
                            break;
                        case f.PAGE_DOWN:
                            t = !0;
                            this._move("nextPage", u);
                            break;
                        case f.UP:
                            t = !0;
                            this._keyEvent("previous", u);
                            break;
                        case f.DOWN:
                            t = !0;
                            this._keyEvent("next", u);
                            break;
                        case f.ENTER:
                        case f.NUMPAD_ENTER:
                            this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
                            break;
                        case f.TAB:
                            this.menu.active && this.menu.select(u);
                            break;
                        case f.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(u), u.preventDefault());
                            break;
                        default:
                            i = !0;
                            this._searchTimeout(u)
                    }
                },
                keypress: function(r) {
                    if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), undefined;
                    if (!i) {
                        var u = n.ui.keyCode;
                        switch (r.keyCode) {
                            case u.PAGE_UP:
                                this._move("previousPage", r);
                                break;
                            case u.PAGE_DOWN:
                                this._move("nextPage", r);
                                break;
                            case u.UP:
                                this._keyEvent("previous", r);
                                break;
                            case u.DOWN:
                                this._keyEvent("next", r)
                        }
                    }
                },
                input: function(n) {
                    return r ? (r = !1, n.preventDefault(), undefined) : (this._searchTimeout(n), undefined)
                },
                focus: function() {
                    this.selectedItem = null;
                    this.previous = this._value()
                },
                blur: function(n) {
                    return this.cancelBlur ? (delete this.cancelBlur, undefined) : (clearTimeout(this.searching), this.close(n), this._change(n), undefined)
                }
            });
            this._initSource();
            this.menu = n("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu");
            this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault();
                    this.cancelBlur = !0;
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var i = this.menu.element[0];
                    n(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(r) {
                            r.target === t.element[0] || r.target === i || n.contains(i, r.target) || t.close()
                        })
                    })
                },
                menufocus: function(t, i) {
                    if (this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
                        n(t.target).trigger(t.originalEvent)
                    }), undefined;
                    var r = i.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(n, t) {
                    var i = t.item.data("ui-autocomplete-item"),
                        r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r;
                        this.selectedItem = i
                    }));
                    !1 !== this._trigger("select", n, {
                        item: i
                    }) && this._value(i.value);
                    this.term = this._value();
                    this.close(n);
                    this.selectedItem = i
                }
            });
            this.liveRegion = n("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element);
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching);
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete");
            this.menu.element.remove();
            this.liveRegion.remove()
        },
        _setOption: function(n, t) {
            this._super(n, t);
            "source" === n && this._initSource();
            "appendTo" === n && this.menu.element.appendTo(this._appendTo());
            "disabled" === n && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var i, r, t = this;
            n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
                r(n.ui.autocomplete.filter(i, t.term))
            }) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
                t.xhr && t.xhr.abort();
                t.xhr = n.ajax({
                    url: r,
                    data: i,
                    dataType: "json",
                    success: function(n) {
                        u(n)
                    },
                    error: function() {
                        u([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(n) {
            clearTimeout(this.searching);
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, n))
            }, this.options.delay)
        },
        search: function(n, t) {
            return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : undefined
        },
        _search: function(n) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.cancelSearch = !1;
            this.source({
                term: n
            }, this._response())
        },
        _response: function() {
            var n = this,
                i = ++t;
            return function(r) {
                i === t && n.__response(r);
                n.pending--;
                n.pending || n.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(n) {
            n && (n = this._normalize(n));
            this._trigger("response", null, {
                content: n
            });
            !this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
        },
        close: function(n) {
            this.cancelSearch = !0;
            this._close(n)
        },
        _close: function(n) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
        },
        _change: function(n) {
            this.previous !== this._value() && this._trigger("change", n, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
                return "string" == typeof t ? {
                    label: t,
                    value: t
                } : n.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var i = this.menu.element.empty();
            this._renderMenu(i, t);
            this.isNewMenu = !0;
            this.menu.refresh();
            i.show();
            this._resizeMenu();
            i.position(n.extend({
                of: this.element
            }, this.options.position));
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var n = this.menu.element;
            n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, i) {
            var r = this;
            n.each(i, function(n, i) {
                r._renderItemData(t, i)
            })
        },
        _renderItemData: function(n, t) {
            return this._renderItem(n, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, i) {
            return n("<li>").append(n("<a>").text(i.label)).appendTo(t)
        },
        _move: function(n, t) {
            return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this._value(this.term), this.menu.blur(), undefined) : (this.menu[n](t), undefined) : (this.search(null, t), undefined)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(n, t) {
            (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
        }
    });
    n.extend(n.ui.autocomplete, {
        escapeRegex: function(n) {
            return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, i) {
            var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
            return n.grep(t, function(n) {
                return r.test(n.label || n.value || n)
            })
        }
    });
    n.widget("ui.autocomplete", n.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(n) {
                    return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(n) {
            var t;
            this._superApply(arguments);
            this.options.disabled || this.cancelSearch || (t = n && n.length ? this.options.messages.results(n.length) : this.options.messages.noResults, this.liveRegion.text(t))
        }
    })
}(jQuery),
function(n) {
    n.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, n.proxy(function(n) {
                this.options.disabled && n.preventDefault()
            }, this));
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true");
            this._on({
                "mousedown .ui-menu-item > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-state-disabled > a": function(n) {
                    n.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var i = n(t.target).closest(".ui-menu-item");
                    !this.mouseHandled && i.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(t), i.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var i = n(t.currentTarget);
                    i.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(t, i)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(n, t) {
                    var i = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(n, i)
                },
                blur: function(t) {
                    this._delay(function() {
                        n.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(t) {
                    n(t.target).closest(".ui-menu").length || this.collapseAll(t);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = n(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function o(n) {
                return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var i, f, r, e, u, s = !0;
            switch (t.keyCode) {
                case n.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case n.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case n.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case n.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case n.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case n.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case n.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case n.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case n.ui.keyCode.ENTER:
                case n.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case n.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    s = !1;
                    f = this.previousFilter || "";
                    r = String.fromCharCode(t.keyCode);
                    e = !1;
                    clearTimeout(this.filterTimer);
                    r === f ? e = !0 : r = f + r;
                    u = RegExp("^" + o(r), "i");
                    i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    });
                    i = e && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
                    i.length || (r = String.fromCharCode(t.keyCode), u = RegExp("^" + o(r), "i"), i = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return u.test(n(this).children("a").text())
                    }));
                    i.length ? (this.focus(t, i), i.length > 1 ? (this.previousFilter = r, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            s && t.preventDefault()
        },
        _activate: function(n) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
        },
        refresh: function() {
            var t, r = this.options.icons.submenu,
                i = this.element.find(this.options.menus);
            i.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = n(this),
                    i = t.prev("a"),
                    u = n("<span>").addClass("ui-menu-icon ui-icon " + r).data("ui-menu-submenu-carat", !0);
                i.attr("aria-haspopup", "true").prepend(u);
                t.attr("aria-labelledby", i.attr("id"))
            });
            t = i.add(this.element);
            t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            t.children(":not(.ui-menu-item)").each(function() {
                var t = n(this);
                /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            });
            t.children(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(n, t) {
            "icons" === n && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu);
            this._super(n, t)
        },
        focus: function(n, t) {
            var i, r;
            this.blur(n, n && "focus" === n.type);
            this._scrollIntoView(t);
            this.active = t.first();
            r = this.active.children("a").addClass("ui-state-focus");
            this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            i = t.children(".ui-menu");
            i.length && /^mouse/.test(n.type) && this._startOpening(i);
            this.activeMenu = t.parent();
            this._trigger("focus", n, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var e, o, i, r, u, f;
            this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.height(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
        },
        blur: function(n, t) {
            t || clearTimeout(this.timer);
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", n, {
                item: this.active
            }))
        },
        _startOpening: function(n) {
            clearTimeout(this.timer);
            "true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(n)
            }, this.delay))
        },
        _open: function(t) {
            var i = n.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
        },
        collapseAll: function(t, i) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element);
                this._close(r);
                this.blur(t);
                this.activeMenu = r
            }, this.delay)
        },
        _close: function(n) {
            n || (n = this.active ? this.active.parent() : this.element);
            n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(n) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(n, t))
        },
        expand: function(n) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(n, t)
            }))
        },
        next: function(n) {
            this._move("next", "first", n)
        },
        previous: function(n) {
            this._move("prev", "last", n)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(n, t, i) {
            var r;
            this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
            r && r.length && this.active || (r = this.activeMenu.children(".ui-menu-item")[t]());
            this.focus(i, r)
        },
        nextPage: function(t) {
            var i, r, u;
            return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return i = n(this), 0 > i.offset().top - r - u
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), undefined) : (this.next(t), undefined)
        },
        previousPage: function(t) {
            var i, r, u;
            return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return i = n(this), i.offset().top - r + u > 0
            }), this.focus(t, i)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())), undefined) : (this.next(t), undefined)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || n(t.target).closest(".ui-menu-item");
            var i = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0);
            this._trigger("select", t, i)
        }
    })
}(jQuery),
function(n) {
    function i(n, t) {
        for (var i = window, r = (n || "").split("."); i && r.length;) i = i[r.shift()];
        return typeof i == "function" ? i : (t.push(n), Function.constructor.apply(null, t))
    }

    function u(n) {
        return n === "GET" || n === "POST"
    }

    function o(n, t) {
        u(t) || n.setRequestHeader("X-HTTP-Method-Override", t)
    }

    function s(t, i, r) {
        var u;
        r.indexOf("application/x-javascript") === -1 && (u = (t.getAttribute("data-ajax-mode") || "").toUpperCase(), n(t.getAttribute("data-ajax-update")).each(function(t, r) {
            var f;
            switch (u) {
                case "BEFORE":
                    f = r.firstChild;
                    n("<div />").html(i).contents().each(function() {
                        r.insertBefore(this, f)
                    });
                    break;
                case "AFTER":
                    n("<div />").html(i).contents().each(function() {
                        r.appendChild(this)
                    });
                    break;
                case "REPLACE-WITH":
                    n(r).replaceWith(i);
                    break;
                default:
                    n(r).html(i)
            }
        }))
    }

    function f(t, r) {
        var e, h, f, c;
        (e = t.getAttribute("data-ajax-confirm"), !e || window.confirm(e)) && (h = n(t.getAttribute("data-ajax-loading")), c = parseInt(t.getAttribute("data-ajax-loading-duration"), 10) || 0, n.extend(r, {
            type: t.getAttribute("data-ajax-method") || undefined,
            url: t.getAttribute("data-ajax-url") || undefined,
            cache: !!t.getAttribute("data-ajax-cache"),
            beforeSend: function(n) {
                var r;
                return o(n, f), r = i(t.getAttribute("data-ajax-begin"), ["xhr"]).apply(t, arguments), r !== !1 && h.show(c), r
            },
            complete: function() {
                h.hide(c);
                i(t.getAttribute("data-ajax-complete"), ["xhr", "status"]).apply(t, arguments)
            },
            success: function(n, r, u) {
                s(t, n, u.getResponseHeader("Content-Type") || "text/html");
                i(t.getAttribute("data-ajax-success"), ["data", "status", "xhr"]).apply(t, arguments)
            },
            error: function() {
                i(t.getAttribute("data-ajax-failure"), ["xhr", "status", "error"]).apply(t, arguments)
            }
        }), r.data.push({
            name: "X-Requested-With",
            value: "XMLHttpRequest"
        }), f = r.type.toUpperCase(), u(f) || (r.type = "POST", r.data.push({
            name: "X-HTTP-Method-Override",
            value: f
        })), n.ajax(r))
    }

    function h(t) {
        var i = n(t).data(e);
        return !i || !i.validate || i.validate()
    }
    var t = "unobtrusiveAjaxClick",
        r = "unobtrusiveAjaxClickTarget",
        e = "unobtrusiveValidation";
    n(document).on("click", "a[data-ajax=true]", function(n) {
        n.preventDefault();
        f(this, {
            url: this.href,
            type: "GET",
            data: []
        })
    });
    n(document).on("click", "form[data-ajax=true] input[type=image]", function(i) {
        var r = i.target.name,
            u = n(i.target),
            f = n(u.parents("form")[0]),
            e = u.offset();
        f.data(t, [{
            name: r + ".x",
            value: Math.round(i.pageX - e.left)
        }, {
            name: r + ".y",
            value: Math.round(i.pageY - e.top)
        }]);
        setTimeout(function() {
            f.removeData(t)
        }, 0)
    });
    n(document).on("click", "form[data-ajax=true] :submit", function(i) {
        var f = i.currentTarget.name,
            e = n(i.target),
            u = n(e.parents("form")[0]);
        u.data(t, f ? [{
            name: f,
            value: i.currentTarget.value
        }] : []);
        u.data(r, e);
        setTimeout(function() {
            u.removeData(t);
            u.removeData(r)
        }, 0)
    });
    n(document).on("submit", "form[data-ajax=true]", function(i) {
        var e = n(this).data(t) || [],
            u = n(this).data(r),
            o = u && u.hasClass("cancel");
        (i.preventDefault(), o || h(this)) && f(this, {
            url: this.action,
            type: this.method || "GET",
            data: e.concat(n(this).serializeArray())
        })
    })
}(jQuery);
! function(n) {
    "function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
}(function(n) {
    n.extend(n.fn, {
        validate: function(t) {
            if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = n.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
                i.settings.submitHandler && (i.submitButton = t.target);
                n(this).hasClass("cancel") && (i.cancelSubmit = !0);
                void 0 !== n(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function(t) {
                function r() {
                    var u, r;
                    return i.settings.submitHandler ? (i.submitButton && (u = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && u.remove(), void 0 !== r ? r : !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function() {
            var t, i, r;
            return n(this[0]).is("form") ? t = this.validate().form() : (r = [], t = !0, i = n(this[0].form).validate(), this.each(function() {
                t = i.element(this) && t;
                r = r.concat(i.errorList)
            }), i.errorList = r), t
        },
        rules: function(t, i) {
            var e, s, f, u, o, h, r = this[0];
            if (t) switch (e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r), t) {
                case "add":
                    n.extend(f, n.validator.normalizeRule(i));
                    delete f.messages;
                    s[r.name] = f;
                    i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
                    break;
                case "remove":
                    return i ? (h = {}, n.each(i.split(/\s/), function(t, i) {
                        h[i] = f[i];
                        delete f[i];
                        "required" === i && n(r).removeAttr("aria-required")
                    }), h) : (delete s[r.name], f)
            }
            return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({
                required: o
            }, u), n(r).attr("aria-required", "true")), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {
                remote: o
            })), u
        }
    });
    n.extend(n.expr[":"], {
        blank: function(t) {
            return !n.trim("" + n(t).val())
        },
        filled: function(t) {
            return !!n.trim("" + n(t).val())
        },
        unchecked: function(t) {
            return !n(t).prop("checked")
        }
    });
    n.validator = function(t, i) {
        this.settings = n.extend(!0, {}, n.validator.defaults, t);
        this.currentForm = i;
        this.init()
    };
    n.validator.format = function(t, i) {
        return 1 === arguments.length ? function() {
            var i = n.makeArray(arguments);
            return i.unshift(t), n.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
            t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
                return i
            })
        }), t)
    };
    n.extend(n.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: n([]),
            errorLabelContainer: n([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(n) {
                this.lastActive = n;
                this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
            },
            onfocusout: function(n) {
                !this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
            },
            onkeyup: function(t, i) {
                9 === i.which && "" === this.elementValue(t) || -1 !== n.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
            },
            onclick: function(n) {
                n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
            },
            highlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
            },
            unhighlight: function(t, i, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
            }
        },
        setDefaults: function(t) {
            n.extend(n.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: n.validator.format("Please enter no more than {0} characters."),
            minlength: n.validator.format("Please enter at least {0} characters."),
            rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
            range: n.validator.format("Please enter a value between {0} and {1}."),
            max: n.validator.format("Please enter a value less than or equal to {0}."),
            min: n.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function i(t) {
                    var r = n.data(this.form, "validator"),
                        u = "on" + t.type.replace(/^validate/, ""),
                        i = r.settings;
                    i[u] && !n(this).is(i.ignore) && i[u].call(r, this, t)
                }
                this.labelContainer = n(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
                this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var t, r = this.groups = {};
                n.each(this.settings.groups, function(t, i) {
                    "string" == typeof i && (i = i.split(/\s/));
                    n.each(i, function(n, i) {
                        r[i] = t
                    })
                });
                t = this.settings.rules;
                n.each(t, function(i, r) {
                    t[i] = n.validator.normalizeRule(r)
                });
                n(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", i).on("click.validate", "select, option, [type='radio'], [type='checkbox']", i);
                this.settings.invalidHandler && n(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler);
                n(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
                return this.valid()
            },
            element: function(t) {
                var u = this.clean(t),
                    i = this.validationTargetFor(u),
                    r = !0;
                return this.lastElement = i, void 0 === i ? delete this.invalid[u.name] : (this.prepareElement(i), this.currentElements = n(i), r = this.check(i) !== !1, r ? delete this.invalid[i.name] : this.invalid[i.name] = !0), n(t).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            },
            showErrors: function(t) {
                if (t) {
                    n.extend(this.errorMap, t);
                    this.errorList = [];
                    for (var i in t) this.errorList.push({
                        message: t[i],
                        element: this.findByName(i)[0]
                    });
                    this.successList = n.grep(this.successList, function(n) {
                        return !(n.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                n.fn.resetForm && n(this.currentForm).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                var t, i = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)
                    for (t = 0; i[t]; t++) this.settings.unhighlight.call(this, i[t], this.settings.errorClass, "");
                else i.removeClass(this.settings.errorClass)
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(n) {
                var i, t = 0;
                for (i in n) t++;
                return t
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(n) {
                n.not(this.containers).text("");
                this.addWrapper(n).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) try {
                    n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === n.grep(this.errorList, function(n) {
                    return n.element.name === t.name
                }).length && t
            },
            elements: function() {
                var t = this,
                    i = {};
                return n(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !t.objectLength(n(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            },
            clean: function(t) {
                return n(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return n(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = n([]);
                this.toHide = n([]);
                this.currentElements = n([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(n) {
                this.reset();
                this.toHide = this.errorsFor(n)
            },
            elementValue: function(t) {
                var i, u = n(t),
                    r = t.type;
                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && "undefined" != typeof t.validity ? t.validity.badInput ? !1 : u.val() : (i = u.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var r, u, i, f = n(t).rules(),
                    s = n.map(f, function(n, t) {
                        return t
                    }).length,
                    o = !1,
                    h = this.elementValue(t);
                for (u in f) {
                    i = {
                        method: u,
                        parameters: f[u]
                    };
                    try {
                        if (r = n.validator.methods[u].call(this, h, t, i.parameters), "dependency-mismatch" === r && 1 === s) {
                            o = !0;
                            continue
                        }
                        if (o = !1, "pending" === r) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!r) return this.formatAndAdd(t, i), !1
                    } catch (e) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method.", e), e instanceof TypeError && (e.message += ".  Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method."), e;
                    }
                }
                if (!o) return this.objectLength(f) && this.successList.push(t), !0
            },
            customDataMessage: function(t, i) {
                return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
            },
            customMessage: function(n, t) {
                var i = this.settings.messages[n];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function() {
                for (var n = 0; n < arguments.length; n++)
                    if (void 0 !== arguments[n]) return arguments[n];
                return void 0
            },
            defaultMessage: function(t, i) {
                return this.findDefined(this.customMessage(t.name, i), this.customDataMessage(t, i), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i], "<strong>Warning: No message defined for " + t.name + "<\/strong>")
            },
            formatAndAdd: function(t, i) {
                var r = this.defaultMessage(t, i.method),
                    u = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters));
                this.errorList.push({
                    message: r,
                    element: t,
                    method: i.method
                });
                this.errorMap[t.name] = r;
                this.submitted[t.name] = r
            },
            addWrapper: function(n) {
                return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
            },
            defaultShowErrors: function() {
                for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
                if (this.settings.unhighlight)
                    for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return n(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, i) {
                var u, o, e, r = this.errorsFor(t),
                    s = this.idOrName(t),
                    f = n(t).attr("aria-describedby");
                r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", s + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement(u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", s) : 0 === r.parents("label[for='" + s + "']").length && (e = r.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), f ? f.match(new RegExp("\\b" + e + "\\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), o = this.groups[t.name], o && n.each(this.groups, function(t, i) {
                    i === o && n("[name='" + t + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                })));
                !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
                this.toShow = this.toShow.add(r)
            },
            errorsFor: function(t) {
                var r = this.idOrName(t),
                    u = n(t).attr("aria-describedby"),
                    i = "label[for='" + r + "'], label[for='" + r + "'] *";
                return u && (i = i + ", #" + u.replace(/\s+/g, ", #")), this.errors().filter(i)
            },
            idOrName: function(n) {
                return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), n(t).not(this.settings.ignore)[0]
            },
            checkable: function(n) {
                return /radio|checkbox/i.test(n.type)
            },
            findByName: function(t) {
                return n(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return n("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(n, t) {
                return this.dependTypes[typeof n] ? this.dependTypes[typeof n](n, t) : !0
            },
            dependTypes: {
                boolean: function(n) {
                    return n
                },
                string: function(t, i) {
                    return !!n(t, i.form).length
                },
                "function": function(n, t) {
                    return n(t)
                }
            },
            optional: function(t) {
                var i = this.elementValue(t);
                return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function(n) {
                this.pending[n.name] || (this.pendingRequest++, this.pending[n.name] = !0)
            },
            stopRequest: function(t, i) {
                this.pendingRequest--;
                this.pendingRequest < 0 && (this.pendingRequest = 0);
                delete this.pending[t.name];
                i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function(t) {
                return n.data(t, "previousValue") || n.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, "remote")
                })
            },
            destroy: function() {
                this.resetForm();
                n(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var i = {},
                r = n(t).attr("class");
            return r && n.each(r.split(" "), function() {
                this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function(n, t, i, r) {
            /min|max/.test(i) && (null === t || /number|range|text/.test(t)) && (r = Number(r), isNaN(r) && (r = void 0));
            r || 0 === r ? n[i] = r : t === i && "range" !== t && (n[i] = !0)
        },
        attributeRules: function(t) {
            var r, i, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (r in n.validator.methods) "required" === r ? (i = t.getAttribute(r), "" === i && (i = !0), i = !!i) : i = f.attr(r), this.normalizeAttributeRule(u, e, r, i);
            return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
        },
        dataRules: function(t) {
            var i, r, u = {},
                f = n(t),
                e = t.getAttribute("type");
            for (i in n.validator.methods) r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(u, e, i, r);
            return u
        },
        staticRules: function(t) {
            var i = {},
                r = n.data(t.form, "validator");
            return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function(t, i) {
            return n.each(t, function(r, u) {
                if (u === !1) return void delete t[r];
                if (u.param || u.depends) {
                    var f = !0;
                    switch (typeof u.depends) {
                        case "string":
                            f = !!n(u.depends, i.form).length;
                            break;
                        case "function":
                            f = u.depends.call(i, i)
                    }
                    f ? t[r] = void 0 !== u.param ? u.param : !0 : delete t[r]
                }
            }), n.each(t, function(r, u) {
                t[r] = n.isFunction(u) ? u(i) : u
            }), n.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), n.each(["rangelength", "range"], function() {
                var i;
                t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), n.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var i = {};
                n.each(t.split(/\s/), function() {
                    i[this] = !0
                });
                t = i
            }
            return t
        },
        addMethod: function(t, i, r) {
            n.validator.methods[t] = i;
            n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
            i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, i, r) {
                if (!this.depend(r, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var u = n(i).val();
                    return u && u.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            },
            email: function(n, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
            },
            url: function(n, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(n)
            },
            date: function(n, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(n).toString())
            },
            dateISO: function(n, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
            },
            number: function(n, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
            },
            digits: function(n, t) {
                return this.optional(t) || /^\d+$/.test(n)
            },
            creditcard: function(n, t) {
                if (this.optional(t)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(n)) return !1;
                var i, f, e = 0,
                    r = 0,
                    u = !1;
                if (n = n.replace(/\D/g, ""), n.length < 13 || n.length > 19) return !1;
                for (i = n.length - 1; i >= 0; i--) f = n.charAt(i), r = parseInt(f, 10), u && (r *= 2) > 9 && (r -= 9), e += r, u = !u;
                return e % 10 == 0
            },
            minlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r
            },
            maxlength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || r >= u
            },
            rangelength: function(t, i, r) {
                var u = n.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || u >= r[0] && u <= r[1]
            },
            min: function(n, t, i) {
                return this.optional(t) || n >= i
            },
            max: function(n, t, i) {
                return this.optional(t) || i >= n
            },
            range: function(n, t, i) {
                return this.optional(t) || n >= i[0] && n <= i[1]
            },
            equalTo: function(t, i, r) {
                var u = n(r);
                return this.settings.onfocusout && u.off(".validate-equalTo").on("blur.validate-equalTo", function() {
                    n(i).valid()
                }), t === u.val()
            },
            remote: function(t, i, r) {
                if (this.optional(i)) return "dependency-mismatch";
                var u, e, f = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), f.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = f.message, r = "string" == typeof r && {
                    url: r
                } || r, f.old === t ? f.valid : (f.old = t, u = this, this.startRequest(i), e = {}, e[i.name] = t, n.ajax(n.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: e,
                    context: u.currentForm,
                    success: function(r) {
                        var o, e, h, s = r === !0 || "true" === r;
                        u.settings.messages[i.name].remote = f.originalMessage;
                        s ? (h = u.formSubmitted, u.prepareElement(i), u.formSubmitted = h, u.successList.push(i), delete u.invalid[i.name], u.showErrors()) : (o = {}, e = r || u.defaultMessage(i, "remote"), o[i.name] = f.message = n.isFunction(e) ? e(t) : e, u.invalid[i.name] = !0, u.showErrors(o));
                        f.valid = s;
                        u.stopRequest(i, s)
                    }
                }, r)), "pending")
            }
        }
    });
    var i, t = {};
    n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
        var u = n.port;
        "abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
    }) : (i = n.ajax, n.ajax = function(r) {
        var f = ("mode" in r ? r : n.ajaxSettings).mode,
            u = ("port" in r ? r : n.ajaxSettings).port;
        return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
    })
}),
function(n) {
    function i(n, t, i) {
        n.rules[t] = i;
        n.message && (n.messages[t] = n.message)
    }

    function h(n) {
        return n.replace(/^\s+|\s+$/g, "").split(/\s*,\s*/g)
    }

    function f(n) {
        return n.replace(/([!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~])/g, "\\$1")
    }

    function e(n) {
        return n.substr(0, n.lastIndexOf(".") + 1)
    }

    function o(n, t) {
        return n.indexOf("*.") === 0 && (n = n.replace("*.", t)), n
    }

    function c(t, i) {
        var r = n(this).find("[data-valmsg-for='" + f(i[0].name) + "']"),
            u = r.attr("data-valmsg-replace"),
            e = u ? n.parseJSON(u) !== !1 : null;
        r.removeClass("field-validation-valid").addClass("field-validation-error");
        t.data("unobtrusiveContainer", r);
        e ? (r.empty(), t.removeClass("input-validation-error").appendTo(r)) : t.hide()
    }

    function l(t, i) {
        var u = n(this).find("[data-valmsg-summary=true]"),
            r = u.find("ul");
        r && r.length && i.errorList.length && (r.empty(), u.addClass("validation-summary-errors").removeClass("validation-summary-valid"), n.each(i.errorList, function() {
            n("<li />").html(this.message).appendTo(r)
        }))
    }

    function a(t) {
        var i = t.data("unobtrusiveContainer"),
            r = i.attr("data-valmsg-replace"),
            u = r ? n.parseJSON(r) : null;
        i && (i.addClass("field-validation-valid").removeClass("field-validation-error"), t.removeData("unobtrusiveContainer"), u && i.empty())
    }

    function v() {
        var t = n(this),
            i = "__jquery_unobtrusive_validation_form_reset";
        if (!t.data(i)) {
            t.data(i, !0);
            try {
                t.data("validator").resetForm()
            } finally {
                t.removeData(i)
            }
            t.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors");
            t.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")
        }
    }

    function s(t) {
        var i = n(t),
            f = i.data(u),
            s = n.proxy(v, t),
            e = r.unobtrusive.options || {},
            o = function(i, r) {
                var u = e[i];
                u && n.isFunction(u) && u.apply(t, r)
            };
        return f || (f = {
            options: {
                errorClass: e.errorClass || "input-validation-error",
                errorElement: e.errorElement || "span",
                errorPlacement: function() {
                    c.apply(t, arguments);
                    o("errorPlacement", arguments)
                },
                invalidHandler: function() {
                    l.apply(t, arguments);
                    o("invalidHandler", arguments)
                },
                messages: {},
                rules: {},
                success: function() {
                    a.apply(t, arguments);
                    o("success", arguments)
                }
            },
            attachValidation: function() {
                i.off("reset." + u, s).on("reset." + u, s).validate(this.options)
            },
            validate: function() {
                return i.validate(), i.valid()
            }
        }, i.data(u, f)), f
    }
    var r = n.validator,
        t, u = "unobtrusiveValidation";
    r.unobtrusive = {
        adapters: [],
        parseElement: function(t, i) {
            var u = n(t),
                f = u.parents("form")[0],
                r, e, o;
            f && (r = s(f), r.options.rules[t.name] = e = {}, r.options.messages[t.name] = o = {}, n.each(this.adapters, function() {
                var i = "data-val-" + this.name,
                    r = u.attr(i),
                    s = {};
                r !== undefined && (i += "-", n.each(this.params, function() {
                    s[this] = u.attr(i + this)
                }), this.adapt({
                    element: t,
                    form: f,
                    message: r,
                    params: s,
                    rules: e,
                    messages: o
                }))
            }), n.extend(e, {
                __dummy__: !0
            }), i || r.attachValidation())
        },
        parse: function(t) {
            var i = n(t),
                u = i.parents().addBack().filter("form").add(i.find("form")).has("[data-val=true]");
            i.find("[data-val=true]").each(function() {
                r.unobtrusive.parseElement(this, !0)
            });
            u.each(function() {
                var n = s(this);
                n && n.attachValidation()
            })
        }
    };
    t = r.unobtrusive.adapters;
    t.add = function(n, t, i) {
        return i || (i = t, t = []), this.push({
            name: n,
            params: t,
            adapt: i
        }), this
    };
    t.addBool = function(n, t) {
        return this.add(n, function(r) {
            i(r, t || n, !0)
        })
    };
    t.addMinMax = function(n, t, r, u, f, e) {
        return this.add(n, [f || "min", e || "max"], function(n) {
            var f = n.params.min,
                e = n.params.max;
            f && e ? i(n, u, [f, e]) : f ? i(n, t, f) : e && i(n, r, e)
        })
    };
    t.addSingleVal = function(n, t, r) {
        return this.add(n, [t || "val"], function(u) {
            i(u, r || n, u.params[t])
        })
    };
    r.addMethod("__dummy__", function() {
        return !0
    });
    r.addMethod("regex", function(n, t, i) {
        var r;
        return this.optional(t) ? !0 : (r = new RegExp(i).exec(n), r && r.index === 0 && r[0].length === n.length)
    });
    r.addMethod("nonalphamin", function(n, t, i) {
        var r;
        return i && (r = n.match(/\W/g), r = r && r.length >= i), r
    });
    r.methods.extension ? (t.addSingleVal("accept", "mimtype"), t.addSingleVal("extension", "extension")) : t.addSingleVal("extension", "extension", "accept");
    t.addSingleVal("regex", "pattern");
    t.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url");
    t.addMinMax("length", "minlength", "maxlength", "rangelength").addMinMax("range", "min", "max", "range");
    t.addMinMax("minlength", "minlength").addMinMax("maxlength", "minlength", "maxlength");
    t.add("equalto", ["other"], function(t) {
        var r = e(t.element.name),
            u = t.params.other,
            s = o(u, r),
            h = n(t.form).find(":input").filter("[name='" + f(s) + "']")[0];
        i(t, "equalTo", h)
    });
    t.add("required", function(n) {
        (n.element.tagName.toUpperCase() !== "INPUT" || n.element.type.toUpperCase() !== "CHECKBOX") && i(n, "required", !0)
    });
    t.add("remote", ["url", "type", "additionalfields"], function(t) {
        var r = {
                url: t.params.url,
                type: t.params.type || "GET",
                data: {}
            },
            u = e(t.element.name);
        n.each(h(t.params.additionalfields || t.element.name), function(i, e) {
            var s = o(e, u);
            r.data[s] = function() {
                var i = n(t.form).find(":input").filter("[name='" + f(s) + "']");
                return i.is(":checkbox") ? i.filter(":checked").val() || i.filter(":hidden").val() || "" : i.is(":radio") ? i.filter(":checked").val() || "" : i.val()
            }
        });
        i(t, "remote", r)
    });
    t.add("password", ["min", "nonalphamin", "regex"], function(n) {
        n.params.min && i(n, "minlength", n.params.min);
        n.params.nonalphamin && i(n, "nonalphamin", n.params.nonalphamin);
        n.params.regex && i(n, "regex", n.params.regex)
    });
    n(function() {
        r.unobtrusive.parse(document)
    })
}(jQuery);
selectedRoleIds = [];
expandCollapseInputGroup = function() {
    $(this).next().css("display") != "none" ? $(this).next().val() == "" && ($(this).next().animate({
        width: "toggle"
    }, 350), $(this).html($(this).html().substr(0, $(this).html().length - 1))) : ($(this).next().animate({
        width: "toggle"
    }, 350), $(this).append(":"), $(this).next().select())
};
GoToModalHeader = function() {
    document.getElementById("focusModal").scrollIntoView()
};
$(document).ready(function() {
    var n, i, t;
    $(".altinn-input-group > input.form-control").focus(function() {
        $(this).parent().removeClass("has-value")
    });
    $("#infoPortalSearchText").keypress(function(n) {
        n.which == 13 && InfoPortalSearch("infoPortalSearchText")
    });
    $("#infoPortalSearchTextSmall").keypress(function(n) {
        n.which == 13 && InfoPortalSearch("infoPortalSearchTextSmall")
    });
    $(".index-heading").click(function() {
        $(this).hasClass("expanded") ? ($(this).removeClass("expanded"), $(".panel-heading.expanded").length === 0 ? $(".panel-heading").removeClass("dim") : $(this).addClass("dim")) : ($(".panel-heading").removeClass("expanded"), $(this).addClass("expanded"), $(".panel-heading").addClass("dim"), $(".panel-heading.expanded").removeClass("dim"))
    });
    n = {
        transition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend"
    };
    i = document.createElement("div");
    for (t in n)
        if (typeof i.style[t] != "undefined") {
            window.transitionEnd = n[t];
            break
        }
    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        $("<style> input { font-size: 16px !important } <\/style>").appendTo("head");
        $(".modal").on("show.bs.modal", function() {
            $(this).css({
                position: "absolute",
                bottom: "auto"
            });
            setTimeout(function() {
                $(".modal-backdrop").css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) + "px"
                })
            }, 0)
        })
    }
});
var onBackClick = function() {
        window.history.length > 0 ? window.history.back() : window.location = "/Pages/ServiceEngine/MyMainPage/MyMainPage.aspx"
    },
    dimOtherPanelSections = function(n) {
        $(".panel-section").addClass("dim");
        n.removeClass("dim")
    },
    removePanelSectionDim = function() {
        $(".panel-section").removeClass("dim")
    },
    IsAuthenticated = function() {
        var n = $.ajax("/ui/Profile/IsAuthenticated/").done(function(n) {
            n == "true" || location.reload(!1)
        }).fail(function() {
            location.reload(!1)
        })
    },
    AddLoadingScreen = function(n) {
        $(".altinn-loading-screen").remove();
        $(n).append('<div class="altinn-loading-screen"><img src="/ui/Content/img/spinner.gif"/><\/div>')
    },
    RemoveLoadingScreen = function(n) {
        $(n).children(".altinn-loading-screen").remove()
    },
    ToggleERVisibility = function(n) {
        n.checked ? $("#ERContactInfoEndpoint").css({
            opacity: 1
        }) : $("#ERContactInfoEndpoint").css({
            opacity: .6
        })
    };
if (config = {
        validEmail: /(("[^"]+")|(([a-zA-Z0-9!#$%&'*+\-=?\^_`{|}~])+(\.([a-zA-Z0-9!#$%&'*+\-=?\^_`{|}~])+)*))@((((([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61})[a-zA-Z0-9]\.)|[a-zA-Z0-9]\.){1,9})([a-zA-Z]{2,6}))|((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})))/
    }, $(function() {
        var n = $("#CurrentSelectedDefaultReportee").val();
        n != null && n != undefined && n != "" && n > 0 && SetDefaultReporteeAndExpandPortalSettingsAccordian(n);
        location.hash && $(location.hash + ".collapse").collapse("show")
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(n) {
    "use strict";
    var t = n.fn.jquery.split(" ")[0].split(".");
    if (t[0] < 2 && t[1] < 9 || 1 == t[0] && 9 == t[1] && t[2] < 1) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher");
}(jQuery); + function(n) {
    "use strict";

    function t() {
        var i = document.createElement("bootstrap"),
            n = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var t in n)
            if (void 0 !== i.style[t]) return {
                end: n[t]
            };
        return !1
    }
    n.fn.emulateTransitionEnd = function(t) {
        var i = !1,
            u = this,
            r;
        n(this).one("bsTransitionEnd", function() {
            i = !0
        });
        return r = function() {
            i || n(u).trigger(n.support.transition.end)
        }, setTimeout(r, t), this
    };
    n(function() {
        n.support.transition = t();
        n.support.transition && (n.event.special.bsTransitionEnd = {
            bindType: n.support.transition.end,
            delegateType: n.support.transition.end,
            handle: function(t) {
                if (n(t.target).is(this)) return t.handleObj.handler.apply(this, arguments)
            }
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function u(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.alert");
            u || r.data("bs.alert", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var i = '[data-dismiss="alert"]',
        t = function(t) {
            n(t).on("click", i, this.close)
        },
        r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.prototype.close = function(i) {
        function e() {
            r.detach().trigger("closed.bs.alert").remove()
        }
        var f = n(this),
            u = f.attr("data-target"),
            r;
        u || (u = f.attr("href"), u = u && u.replace(/.*(?=#[^\s]*$)/, ""));
        r = n(u);
        i && i.preventDefault();
        r.length || (r = f.closest(".alert"));
        r.trigger(i = n.Event("close.bs.alert"));
        i.isDefaultPrevented() || (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e())
    };
    r = n.fn.alert;
    n.fn.alert = u;
    n.fn.alert.Constructor = t;
    n.fn.alert.noConflict = function() {
        return n.fn.alert = r, this
    };
    n(document).on("click.bs.alert.data-api", i, t.prototype.close)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.button"),
                f = "object" == typeof i && i;
            r || u.data("bs.button", r = new t(this, f));
            "toggle" == i ? r.toggle() : i && r.setState(i)
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.isLoading = !1
        },
        r;
    t.VERSION = "3.3.5";
    t.DEFAULTS = {
        loadingText: "loading..."
    };
    t.prototype.setState = function(t) {
        var r = "disabled",
            i = this.$element,
            f = i.is("input") ? "val" : "html",
            u = i.data();
        t += "Text";
        null == u.resetText && i.data("resetText", i[f]());
        setTimeout(n.proxy(function() {
            i[f](null == u[t] ? this.options[t] : u[t]);
            "loadingText" == t ? (this.isLoading = !0, i.addClass(r).attr(r, r)) : this.isLoading && (this.isLoading = !1, i.removeClass(r).removeAttr(r))
        }, this), 0)
    };
    t.prototype.toggle = function() {
        var t = !0,
            i = this.$element.closest('[data-toggle="buttons"]'),
            n;
        i.length ? (n = this.$element.find("input"), "radio" == n.prop("type") ? (n.prop("checked") && (t = !1), i.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == n.prop("type") && (n.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), n.prop("checked", this.$element.hasClass("active")), t && n.trigger("change")) : (this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active"))
    };
    r = n.fn.button;
    n.fn.button = i;
    n.fn.button.Constructor = t;
    n.fn.button.noConflict = function() {
        return n.fn.button = r, this
    };
    n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var r = n(t.target);
        r.hasClass("btn") || (r = r.closest(".btn"));
        i.call(r, "toggle");
        n(t.target).is('input[type="radio"]') || n(t.target).is('input[type="checkbox"]') || t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type))
    })
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.carousel"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i),
                e = "string" == typeof i ? i : f.slide;
            r || u.data("bs.carousel", r = new t(this, f));
            "number" == typeof i ? r.to(i) : e ? r[e]() : f.interval && r.pause().cycle()
        })
    }
    var t = function(t, i) {
            this.$element = n(t);
            this.$indicators = this.$element.find(".carousel-indicators");
            this.options = i;
            this.paused = null;
            this.sliding = null;
            this.interval = null;
            this.$active = null;
            this.$items = null;
            this.options.keyboard && this.$element.on("keydown.bs.carousel", n.proxy(this.keydown, this));
            "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", n.proxy(this.pause, this)).on("mouseleave.bs.carousel", n.proxy(this.cycle, this))
        },
        u, r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 600;
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    };
    t.prototype.keydown = function(n) {
        if (!/input|textarea/i.test(n.target.tagName)) {
            switch (n.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            n.preventDefault()
        }
    };
    t.prototype.cycle = function(t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(n.proxy(this.next, this), this.options.interval)), this
    };
    t.prototype.getItemIndex = function(n) {
        return this.$items = n.parent().children(".item"), this.$items.index(n || this.$active)
    };
    t.prototype.getItemForDirection = function(n, t) {
        var i = this.getItemIndex(t),
            f = "prev" == n && 0 === i || "next" == n && i == this.$items.length - 1,
            r, u;
        return f && !this.options.wrap ? t : (r = "prev" == n ? -1 : 1, u = (i + r) % this.$items.length, this.$items.eq(u))
    };
    t.prototype.to = function(n) {
        var i = this,
            t = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(n > this.$items.length - 1) && !(0 > n)) return this.sliding ? this.$element.one("slid.bs.carousel", function() {
            i.to(n)
        }) : t == n ? this.pause().cycle() : this.slide(n > t ? "next" : "prev", this.$items.eq(n))
    };
    t.prototype.pause = function(t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && n.support.transition && (this.$element.trigger(n.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    };
    t.prototype.next = function() {
        if (!this.sliding) return this.slide("next")
    };
    t.prototype.prev = function() {
        if (!this.sliding) return this.slide("prev")
    };
    t.prototype.slide = function(i, r) {
        var e = this.$element.find(".item.active"),
            u = r || this.getItemForDirection(i, e),
            l = this.interval,
            f = "next" == i ? "left" : "right",
            a = this,
            o, s, h, c;
        return u.hasClass("active") ? this.sliding = !1 : (o = u[0], s = n.Event("slide.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), (this.$element.trigger(s), !s.isDefaultPrevented()) ? ((this.sliding = !0, l && this.pause(), this.$indicators.length) && (this.$indicators.find(".active").removeClass("active"), h = n(this.$indicators.children()[this.getItemIndex(u)]), h && h.addClass("active")), c = n.Event("slid.bs.carousel", {
            relatedTarget: o,
            direction: f
        }), n.support.transition && this.$element.hasClass("slide") ? (u.addClass(i), u[0].offsetWidth, e.addClass(f), u.addClass(f), e.one("bsTransitionEnd", function() {
            u.removeClass([i, f].join(" ")).addClass("active");
            e.removeClass(["active", f].join(" "));
            a.sliding = !1;
            setTimeout(function() {
                a.$element.trigger(c)
            }, 0)
        }).emulateTransitionEnd(t.TRANSITION_DURATION)) : (e.removeClass("active"), u.addClass("active"), this.sliding = !1, this.$element.trigger(c)), l && this.cycle(), this) : void 0)
    };
    u = n.fn.carousel;
    n.fn.carousel = i;
    n.fn.carousel.Constructor = t;
    n.fn.carousel.noConflict = function() {
        return n.fn.carousel = u, this
    };
    r = function(t) {
        var o, r = n(this),
            u = n(r.attr("data-target") || (o = r.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "")),
            e, f;
        u.hasClass("carousel") && (e = n.extend({}, u.data(), r.data()), f = r.attr("data-slide-to"), f && (e.interval = !1), i.call(u, e), f && u.data("bs.carousel").to(f), t.preventDefault())
    };
    n(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r);
    n(window).on("load", function() {
        n('[data-ride="carousel"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i, r = t.attr("data-target") || (i = t.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return n(r)
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.collapse"),
                f = n.extend({}, t.DEFAULTS, u.data(), "object" == typeof i && i);
            !r && f.toggle && /show|hide/.test(i) && (f.toggle = !1);
            r || u.data("bs.collapse", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.$element = n(i);
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$trigger = n('[data-toggle="collapse"][href="#' + i.id + '"],[data-toggle="collapse"][data-target="#' + i.id + '"]');
            this.transitioning = null;
            this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger);
            this.options.toggle && this.toggle()
        },
        u;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 350;
    t.DEFAULTS = {
        toggle: !0
    };
    t.prototype.dimension = function() {
        var n = this.$element.hasClass("width");
        return n ? "width" : "height"
    };
    t.prototype.show = function() {
        var f, r, e, u, o, s;
        if (!this.transitioning && !this.$element.hasClass("in") && (r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing"), !(r && r.length && (f = r.data("bs.collapse"), f && f.transitioning)) && (e = n.Event("show.bs.collapse"), this.$element.trigger(e), !e.isDefaultPrevented()))) {
            if (r && r.length && (i.call(r, "hide"), f || r.data("bs.collapse", null)), u = this.dimension(), this.$element.removeClass("collapse").addClass("collapsing")[u](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1, o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[u]("");
                    this.transitioning = 0;
                    this.$element.trigger("shown.bs.collapse")
                }, !n.support.transition) return o.call(this);
            s = n.camelCase(["scroll", u].join("-"));
            this.$element.one("bsTransitionEnd", n.proxy(o, this)).emulateTransitionEnd(t.TRANSITION_DURATION)[u](this.$element[0][s])
        }
    };
    t.prototype.hide = function() {
        var r, i, u;
        if (!this.transitioning && this.$element.hasClass("in") && (r = n.Event("hide.bs.collapse"), this.$element.trigger(r), !r.isDefaultPrevented())) return i = this.dimension(), this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1, u = function() {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
        }, n.support.transition ? void this.$element[i](0).one("bsTransitionEnd", n.proxy(u, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : u.call(this)
    };
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    t.prototype.getParent = function() {
        return n(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(n.proxy(function(t, i) {
            var u = n(i);
            this.addAriaAndCollapsedClass(r(u), u)
        }, this)).end()
    };
    t.prototype.addAriaAndCollapsedClass = function(n, t) {
        var i = n.hasClass("in");
        n.attr("aria-expanded", i);
        t.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    u = n.fn.collapse;
    n.fn.collapse = i;
    n.fn.collapse.Constructor = t;
    n.fn.collapse.noConflict = function() {
        return n.fn.collapse = u, this
    };
    n(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var u = n(this);
        u.attr("data-target") || t.preventDefault();
        var f = r(u),
            e = f.data("bs.collapse"),
            o = e ? "toggle" : u.data();
        i.call(f, o)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(t) {
        var i = t.attr("data-target"),
            r;
        return i || (i = t.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, "")), r = i && n(i), r && r.length ? r : t.parent()
    }

    function u(t) {
        t && 3 === t.which || (n(o).remove(), n(i).each(function() {
            var u = n(this),
                i = r(u),
                f = {
                    relatedTarget: this
                };
            i.hasClass("open") && (t && "click" == t.type && /input|textarea/i.test(t.target.tagName) && n.contains(i[0], t.target) || (i.trigger(t = n.Event("hide.bs.dropdown", f)), t.isDefaultPrevented() || (u.attr("aria-expanded", "false"), i.removeClass("open").trigger("hidden.bs.dropdown", f))))
        }))
    }

    function e(i) {
        return this.each(function() {
            var r = n(this),
                u = r.data("bs.dropdown");
            u || r.data("bs.dropdown", u = new t(this));
            "string" == typeof i && u[i].call(r)
        })
    }
    var o = ".dropdown-backdrop",
        i = '[data-toggle="dropdown"]',
        t = function(t) {
            n(t).on("click.bs.dropdown", this.toggle)
        },
        f;
    t.VERSION = "3.3.5";
    t.prototype.toggle = function(t) {
        var f = n(this),
            i, o, e;
        if (!f.is(".disabled, :disabled")) {
            if (i = r(f), o = i.hasClass("open"), u(), !o) {
                if ("ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && n(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(n(this)).on("click", u), e = {
                        relatedTarget: this
                    }, i.trigger(t = n.Event("show.bs.dropdown", e)), t.isDefaultPrevented()) return;
                f.trigger("focus").attr("aria-expanded", "true");
                i.toggleClass("open").trigger("shown.bs.dropdown", e)
            }
            return !1
        }
    };
    t.prototype.keydown = function(t) {
        var e, o, s, h, f, u;
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName) && (e = n(this), t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (o = r(e), s = o.hasClass("open"), !s && 27 != t.which || s && 27 == t.which) return 27 == t.which && o.find(i).trigger("focus"), e.trigger("click");
            h = " li:not(.disabled):visible a";
            f = o.find(".dropdown-menu" + h);
            f.length && (u = f.index(t.target), 38 == t.which && u > 0 && u--, 40 == t.which && u < f.length - 1 && u++, ~u || (u = 0), f.eq(u).trigger("focus"))
        }
    };
    f = n.fn.dropdown;
    n.fn.dropdown = e;
    n.fn.dropdown.Constructor = t;
    n.fn.dropdown.noConflict = function() {
        return n.fn.dropdown = f, this
    };
    n(document).on("click.bs.dropdown.data-api", u).on("click.bs.dropdown.data-api", ".dropdown form", function(n) {
        n.stopPropagation()
    }).on("click.bs.dropdown.data-api", i, t.prototype.toggle).on("keydown.bs.dropdown.data-api", i, t.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", t.prototype.keydown)
}(jQuery); + function(n) {
    "use strict";

    function i(i, r) {
        return this.each(function() {
            var f = n(this),
                u = f.data("bs.modal"),
                e = n.extend({}, t.DEFAULTS, f.data(), "object" == typeof i && i);
            u || f.data("bs.modal", u = new t(this, e));
            "string" == typeof i ? u[i](r) : e.show && u.show(r)
        })
    }
    var t = function(t, i) {
            this.options = i;
            this.$body = n(document.body);
            this.$element = n(t);
            this.$dialog = this.$element.find(".modal-dialog");
            this.$backdrop = null;
            this.isShown = null;
            this.originalBodyPad = null;
            this.scrollbarWidth = 0;
            this.ignoreBackdropClick = !1;
            this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function() {
                this.$element.trigger("loaded.bs.modal")
            }, this))
        },
        r;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 300;
    t.BACKDROP_TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    };
    t.prototype.toggle = function(n) {
        return this.isShown ? this.hide() : this.show(n)
    };
    t.prototype.show = function(i) {
        var r = this,
            u = n.Event("show.bs.modal", {
                relatedTarget: i
            });
        this.$element.trigger(u);
        this.isShown || u.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            r.$element.one("mouseup.dismiss.bs.modal", function(t) {
                n(t.target).is(r.$element) && (r.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function() {
            var f = n.support.transition && r.$element.hasClass("fade"),
                u;
            r.$element.parent().length || r.$element.appendTo(r.$body);
            r.$element.show().scrollTop(0);
            r.adjustDialog();
            f && r.$element[0].offsetWidth;
            r.$element.addClass("in");
            r.enforceFocus();
            u = n.Event("shown.bs.modal", {
                relatedTarget: i
            });
            f ? r.$dialog.one("bsTransitionEnd", function() {
                r.$element.trigger("focus").trigger(u)
            }).emulateTransitionEnd(t.TRANSITION_DURATION) : r.$element.trigger("focus").trigger(u)
        }))
    };
    t.prototype.hide = function(i) {
        i && i.preventDefault();
        i = n.Event("hide.bs.modal");
        this.$element.trigger(i);
        this.isShown && !i.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(t.TRANSITION_DURATION) : this.hideModal())
    };
    t.prototype.enforceFocus = function() {
        n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(n) {
            this.$element[0] === n.target || this.$element.has(n.target).length || this.$element.trigger("focus")
        }, this))
    };
    t.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function(n) {
            27 == n.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    };
    t.prototype.resize = function() {
        this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal")
    };
    t.prototype.hideModal = function() {
        var n = this;
        this.$element.hide();
        this.backdrop(function() {
            n.$body.removeClass("modal-open");
            n.resetAdjustments();
            n.resetScrollbar();
            n.$element.trigger("hidden.bs.modal")
        })
    };
    t.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null
    };
    t.prototype.backdrop = function(i) {
        var e = this,
            f = this.$element.hasClass("fade") ? "fade" : "",
            r, u;
        if (this.isShown && this.options.backdrop) {
            if (r = n.support.transition && f, this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + f).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", n.proxy(function(n) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(n.target === n.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !i) return;
            r ? this.$backdrop.one("bsTransitionEnd", i).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : i()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), u = function() {
            e.removeBackdrop();
            i && i()
        }, n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", u).emulateTransitionEnd(t.BACKDROP_TRANSITION_DURATION) : u()) : i && i()
    };
    t.prototype.handleUpdate = function() {
        this.adjustDialog()
    };
    t.prototype.adjustDialog = function() {
        var n = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && n ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !n ? this.scrollbarWidth : ""
        })
    };
    t.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        })
    };
    t.prototype.checkScrollbar = function() {
        var n = window.innerWidth,
            t;
        n || (t = document.documentElement.getBoundingClientRect(), n = t.right - Math.abs(t.left));
        this.bodyIsOverflowing = document.body.clientWidth < n;
        this.scrollbarWidth = this.measureScrollbar()
    };
    t.prototype.setScrollbar = function() {
        var n = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        this.bodyIsOverflowing && this.$body.css("padding-right", n + this.scrollbarWidth)
    };
    t.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad)
    };
    t.prototype.measureScrollbar = function() {
        var n = document.createElement("div"),
            t;
        return n.className = "modal-scrollbar-measure", this.$body.append(n), t = n.offsetWidth - n.clientWidth, this.$body[0].removeChild(n), t
    };
    r = n.fn.modal;
    n.fn.modal = i;
    n.fn.modal.Constructor = t;
    n.fn.modal.noConflict = function() {
        return n.fn.modal = r, this
    };
    n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var r = n(this),
            f = r.attr("href"),
            u = n(r.attr("data-target") || f && f.replace(/.*(?=#[^\s]+$)/, "")),
            e = u.data("bs.modal") ? "toggle" : n.extend({
                remote: !/#/.test(f) && f
            }, u.data(), r.data());
        r.is("a") && t.preventDefault();
        u.one("show.bs.modal", function(n) {
            n.isDefaultPrevented() || u.one("hidden.bs.modal", function() {
                r.is(":visible") && r.trigger("focus")
            })
        });
        i.call(u, e, this)
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tooltip"),
                f = "object" == typeof i && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.tooltip", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.type = null;
            this.options = null;
            this.enabled = null;
            this.timeout = null;
            this.hoverState = null;
            this.$element = null;
            this.inState = null;
            this.init("tooltip", n, t)
        },
        i;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"><\/div><div class="tooltip-inner"><\/div><\/div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    t.prototype.init = function(t, i, r) {
        var f, e, u, o, s;
        if (this.enabled = !0, this.type = t, this.$element = n(i), this.options = this.getOptions(r), this.$viewport = this.options.viewport && n(n.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (f = this.options.trigger.split(" "), e = f.length; e--;)
            if (u = f[e], "click" == u) this.$element.on("click." + this.type, this.options.selector, n.proxy(this.toggle, this));
            else "manual" != u && (o = "hover" == u ? "mouseenter" : "focusin", s = "hover" == u ? "mouseleave" : "focusout", this.$element.on(o + "." + this.type, this.options.selector, n.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, n.proxy(this.leave, this)));
        this.options.selector ? this._options = n.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    };
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.getOptions = function(t) {
        return t = n.extend({}, this.getDefaults(), this.$element.data(), t), t.delay && "number" == typeof t.delay && (t.delay = {
            show: t.delay,
            hide: t.delay
        }), t
    };
    t.prototype.getDelegateOptions = function() {
        var t = {},
            i = this.getDefaults();
        return this._options && n.each(this._options, function(n, r) {
            i[n] != r && (t[n] = r)
        }), t
    };
    t.prototype.enter = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusin" == t.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    };
    t.prototype.isInStateTrue = function() {
        for (var n in this.inState)
            if (this.inState[n]) return !0;
        return !1
    };
    t.prototype.leave = function(t) {
        var i = t instanceof this.constructor ? t : n(t.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)), t instanceof n.Event && (i.inState["focusout" == t.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    };
    t.prototype.show = function() {
        var c = n.Event("show.bs." + this.type),
            l, p, e, w, h;
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(c), l = n.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]), c.isDefaultPrevented() || !l) return;
            var u = this,
                r = this.tip(),
                a = this.getUID(this.type);
            this.setContent();
            r.attr("id", a);
            this.$element.attr("aria-describedby", a);
            this.options.animation && r.addClass("fade");
            var i = "function" == typeof this.options.placement ? this.options.placement.call(this, r[0], this.$element[0]) : this.options.placement,
                v = /\s?auto?\s?/i,
                y = v.test(i);
            y && (i = i.replace(v, "") || "top");
            r.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(i).data("bs." + this.type, this);
            this.options.container ? r.appendTo(this.options.container) : r.insertAfter(this.$element);
            this.$element.trigger("inserted.bs." + this.type);
            var f = this.getPosition(),
                o = r[0].offsetWidth,
                s = r[0].offsetHeight;
            y && (p = i, e = this.getPosition(this.$viewport), i = "bottom" == i && f.bottom + s > e.bottom ? "top" : "top" == i && f.top - s < e.top ? "bottom" : "right" == i && f.right + o > e.width ? "left" : "left" == i && f.left - o < e.left ? "right" : i, r.removeClass(p).addClass(i));
            w = this.getCalculatedOffset(i, f, o, s);
            this.applyPlacement(w, i);
            h = function() {
                var n = u.hoverState;
                u.$element.trigger("shown.bs." + u.type);
                u.hoverState = null;
                "out" == n && u.leave(u)
            };
            n.support.transition && this.$tip.hasClass("fade") ? r.one("bsTransitionEnd", h).emulateTransitionEnd(t.TRANSITION_DURATION) : h()
        }
    };
    t.prototype.applyPlacement = function(t, i) {
        var r = this.tip(),
            l = r[0].offsetWidth,
            e = r[0].offsetHeight,
            o = parseInt(r.css("margin-top"), 10),
            s = parseInt(r.css("margin-left"), 10),
            h, f, u;
        isNaN(o) && (o = 0);
        isNaN(s) && (s = 0);
        t.top += o;
        t.left += s;
        n.offset.setOffset(r[0], n.extend({
            using: function(n) {
                r.css({
                    top: Math.round(n.top),
                    left: Math.round(n.left)
                })
            }
        }, t), 0);
        r.addClass("in");
        h = r[0].offsetWidth;
        f = r[0].offsetHeight;
        "top" == i && f != e && (t.top = t.top + e - f);
        u = this.getViewportAdjustedDelta(i, t, h, f);
        u.left ? t.left += u.left : t.top += u.top;
        var c = /top|bottom/.test(i),
            a = c ? 2 * u.left - l + h : 2 * u.top - e + f,
            v = c ? "offsetWidth" : "offsetHeight";
        r.offset(t);
        this.replaceArrow(a, r[0][v], c)
    };
    t.prototype.replaceArrow = function(n, t, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - n / t) + "%").css(i ? "top" : "left", "")
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            t = this.getTitle();
        n.find(".tooltip-inner")[this.options.html ? "html" : "text"](t);
        n.removeClass("fade in top bottom left right")
    };
    t.prototype.hide = function(i) {
        function f() {
            "in" != u.hoverState && r.detach();
            u.$element.removeAttr("aria-describedby").trigger("hidden.bs." + u.type);
            i && i()
        }
        var u = this,
            r = n(this.$tip),
            e = n.Event("hide.bs." + this.type);
        return this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (r.removeClass("in"), n.support.transition && r.hasClass("fade") ? r.one("bsTransitionEnd", f).emulateTransitionEnd(t.TRANSITION_DURATION) : f(), this.hoverState = null, this)
    };
    t.prototype.fixTitle = function() {
        var n = this.$element;
        (n.attr("title") || "string" != typeof n.attr("data-original-title")) && n.attr("data-original-title", n.attr("title") || "").attr("title", "")
    };
    t.prototype.hasContent = function() {
        return this.getTitle()
    };
    t.prototype.getPosition = function(t) {
        t = t || this.$element;
        var u = t[0],
            r = "BODY" == u.tagName,
            i = u.getBoundingClientRect();
        null == i.width && (i = n.extend({}, i, {
            width: i.right - i.left,
            height: i.bottom - i.top
        }));
        var f = r ? {
                top: 0,
                left: 0
            } : t.offset(),
            e = {
                scroll: r ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop()
            },
            o = r ? {
                width: n(window).width(),
                height: n(window).height()
            } : null;
        return n.extend({}, i, e, o, f)
    };
    t.prototype.getCalculatedOffset = function(n, t, i, r) {
        return "bottom" == n ? {
            top: t.top + t.height,
            left: t.left + t.width / 2 - i / 2
        } : "top" == n ? {
            top: t.top - r,
            left: t.left + t.width / 2 - i / 2
        } : "left" == n ? {
            top: t.top + t.height / 2 - r / 2,
            left: t.left - i
        } : {
            top: t.top + t.height / 2 - r / 2,
            left: t.left + t.width
        }
    };
    t.prototype.getViewportAdjustedDelta = function(n, t, i, r) {
        var f = {
                top: 0,
                left: 0
            },
            e, u, o, s, h, c;
        return this.$viewport ? (e = this.options.viewport && this.options.viewport.padding || 0, u = this.getPosition(this.$viewport), /right|left/.test(n) ? (o = t.top - e - u.scroll, s = t.top + e - u.scroll + r, o < u.top ? f.top = u.top - o : s > u.top + u.height && (f.top = u.top + u.height - s)) : (h = t.left - e, c = t.left + e + i, h < u.left ? f.left = u.left - h : c > u.right && (f.left = u.left + u.width - c)), f) : f
    };
    t.prototype.getTitle = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
    };
    t.prototype.getUID = function(n) {
        do n += ~~(1e6 * Math.random()); while (document.getElementById(n));
        return n
    };
    t.prototype.tip = function() {
        if (!this.$tip && (this.$tip = n(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    };
    t.prototype.enable = function() {
        this.enabled = !0
    };
    t.prototype.disable = function() {
        this.enabled = !1
    };
    t.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    };
    t.prototype.toggle = function(t) {
        var i = this;
        t && (i = n(t.currentTarget).data("bs." + this.type), i || (i = new this.constructor(t.currentTarget, this.getDelegateOptions()), n(t.currentTarget).data("bs." + this.type, i)));
        t ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    };
    t.prototype.destroy = function() {
        var n = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            n.$element.off("." + n.type).removeData("bs." + n.type);
            n.$tip && n.$tip.detach();
            n.$tip = null;
            n.$arrow = null;
            n.$viewport = null
        })
    };
    i = n.fn.tooltip;
    n.fn.tooltip = r;
    n.fn.tooltip.Constructor = t;
    n.fn.tooltip.noConflict = function() {
        return n.fn.tooltip = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.popover"),
                f = "object" == typeof i && i;
            (r || !/destroy|hide/.test(i)) && (r || u.data("bs.popover", r = new t(this, f)), "string" == typeof i && r[i]())
        })
    }
    var t = function(n, t) {
            this.init("popover", n, t)
        },
        i;
    if (!n.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.VERSION = "3.3.5";
    t.DEFAULTS = n.extend({}, n.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"><\/div><h3 class="popover-title"><\/h3><div class="popover-content"><\/div><\/div>'
    });
    t.prototype = n.extend({}, n.fn.tooltip.Constructor.prototype);
    t.prototype.constructor = t;
    t.prototype.getDefaults = function() {
        return t.DEFAULTS
    };
    t.prototype.setContent = function() {
        var n = this.tip(),
            i = this.getTitle(),
            t = this.getContent();
        n.find(".popover-title")[this.options.html ? "html" : "text"](i);
        n.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof t ? "html" : "append" : "text"](t);
        n.removeClass("fade top bottom left right in");
        n.find(".popover-title").html() || n.find(".popover-title").hide()
    };
    t.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    };
    t.prototype.getContent = function() {
        var t = this.$element,
            n = this.options;
        return t.attr("data-content") || ("function" == typeof n.content ? n.content.call(t[0]) : n.content)
    };
    t.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    i = n.fn.popover;
    n.fn.popover = r;
    n.fn.popover.Constructor = t;
    n.fn.popover.noConflict = function() {
        return n.fn.popover = i, this
    }
}(jQuery); + function(n) {
    "use strict";

    function t(i, r) {
        this.$body = n(document.body);
        this.$scrollElement = n(n(i).is(document.body) ? window : i);
        this.options = n.extend({}, t.DEFAULTS, r);
        this.selector = (this.options.target || "") + " .nav li > a";
        this.offsets = [];
        this.targets = [];
        this.activeTarget = null;
        this.scrollHeight = 0;
        this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this));
        this.refresh();
        this.process()
    }

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.scrollspy"),
                f = "object" == typeof i && i;
            r || u.data("bs.scrollspy", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    t.VERSION = "3.3.5";
    t.DEFAULTS = {
        offset: 10
    };
    t.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    };
    t.prototype.refresh = function() {
        var t = this,
            i = "offset",
            r = 0;
        this.offsets = [];
        this.targets = [];
        this.scrollHeight = this.getScrollHeight();
        n.isWindow(this.$scrollElement[0]) || (i = "position", r = this.$scrollElement.scrollTop());
        this.$body.find(this.selector).map(function() {
            var f = n(this),
                u = f.data("target") || f.attr("href"),
                t = /^#./.test(u) && n(u);
            return t && t.length && t.is(":visible") && [
                [t[i]().top + r, u]
            ] || null
        }).sort(function(n, t) {
            return n[0] - t[0]
        }).each(function() {
            t.offsets.push(this[0]);
            t.targets.push(this[1])
        })
    };
    t.prototype.process = function() {
        var n, i = this.$scrollElement.scrollTop() + this.options.offset,
            f = this.getScrollHeight(),
            e = this.options.offset + f - this.$scrollElement.height(),
            t = this.offsets,
            r = this.targets,
            u = this.activeTarget;
        if (this.scrollHeight != f && this.refresh(), i >= e) return u != (n = r[r.length - 1]) && this.activate(n);
        if (u && i < t[0]) return this.activeTarget = null, this.clear();
        for (n = t.length; n--;) u != r[n] && i >= t[n] && (void 0 === t[n + 1] || i < t[n + 1]) && this.activate(r[n])
    };
    t.prototype.activate = function(t) {
        this.activeTarget = t;
        this.clear();
        var r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(r).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active"));
        i.trigger("activate.bs.scrollspy")
    };
    t.prototype.clear = function() {
        n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var r = n.fn.scrollspy;
    n.fn.scrollspy = i;
    n.fn.scrollspy.Constructor = t;
    n.fn.scrollspy.noConflict = function() {
        return n.fn.scrollspy = r, this
    };
    n(window).on("load.bs.scrollspy.data-api", function() {
        n('[data-spy="scroll"]').each(function() {
            var t = n(this);
            i.call(t, t.data())
        })
    })
}(jQuery); + function(n) {
    "use strict";

    function r(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.tab");
            r || u.data("bs.tab", r = new t(this));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(t) {
            this.element = n(t)
        },
        u, i;
    t.VERSION = "3.3.5";
    t.TRANSITION_DURATION = 150;
    t.prototype.show = function() {
        var t = this.element,
            f = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target"),
            u;
        if (i || (i = t.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var r = f.find(".active:last a"),
                e = n.Event("hide.bs.tab", {
                    relatedTarget: t[0]
                }),
                o = n.Event("show.bs.tab", {
                    relatedTarget: r[0]
                });
            (r.trigger(e), t.trigger(o), o.isDefaultPrevented() || e.isDefaultPrevented()) || (u = n(i), this.activate(t.closest("li"), f), this.activate(u, u.parent(), function() {
                r.trigger({
                    type: "hidden.bs.tab",
                    relatedTarget: t[0]
                });
                t.trigger({
                    type: "shown.bs.tab",
                    relatedTarget: r[0]
                })
            }))
        }
    };
    t.prototype.activate = function(i, r, u) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1);
            i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0);
            o ? (i[0].offsetWidth, i.addClass("in")) : i.removeClass("fade");
            i.parent(".dropdown-menu").length && i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0);
            u && u()
        }
        var f = r.find("> .active"),
            o = u && n.support.transition && (f.length && f.hasClass("fade") || !!r.find("> .fade").length);
        f.length && o ? f.one("bsTransitionEnd", e).emulateTransitionEnd(t.TRANSITION_DURATION) : e();
        f.removeClass("in")
    };
    u = n.fn.tab;
    n.fn.tab = r;
    n.fn.tab.Constructor = t;
    n.fn.tab.noConflict = function() {
        return n.fn.tab = u, this
    };
    i = function(t) {
        t.preventDefault();
        r.call(n(this), "show")
    };
    n(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery); + function(n) {
    "use strict";

    function i(i) {
        return this.each(function() {
            var u = n(this),
                r = u.data("bs.affix"),
                f = "object" == typeof i && i;
            r || u.data("bs.affix", r = new t(this, f));
            "string" == typeof i && r[i]()
        })
    }
    var t = function(i, r) {
            this.options = n.extend({}, t.DEFAULTS, r);
            this.$target = n(this.options.target).on("scroll.bs.affix.data-api", n.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", n.proxy(this.checkPositionWithEventLoop, this));
            this.$element = n(i);
            this.affixed = null;
            this.unpin = null;
            this.pinnedOffset = null;
            this.checkPosition()
        },
        r;
    t.VERSION = "3.3.5";
    t.RESET = "affix affix-top affix-bottom";
    t.DEFAULTS = {
        offset: 0,
        target: window
    };
    t.prototype.getState = function(n, t, i, r) {
        var u = this.$target.scrollTop(),
            f = this.$element.offset(),
            e = this.$target.height();
        if (null != i && "top" == this.affixed) return i > u ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? u + this.unpin <= f.top ? !1 : "bottom" : n - r >= u + e ? !1 : "bottom";
        var o = null == this.affixed,
            s = o ? u : f.top,
            h = o ? e : t;
        return null != i && i >= u ? "top" : null != r && s + h >= n - r ? "bottom" : !1
    };
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var n = this.$target.scrollTop(),
            i = this.$element.offset();
        return this.pinnedOffset = i.top - n
    };
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(n.proxy(this.checkPosition, this), 1)
    };
    t.prototype.checkPosition = function() {
        var i, e, o;
        if (this.$element.is(":visible")) {
            var s = this.$element.height(),
                r = this.options.offset,
                f = r.top,
                u = r.bottom,
                h = Math.max(n(document).height(), n(document.body).height());
            if ("object" != typeof r && (u = f = r), "function" == typeof f && (f = r.top(this.$element)), "function" == typeof u && (u = r.bottom(this.$element)), i = this.getState(h, s, f, u), this.affixed != i) {
                if (null != this.unpin && this.$element.css("top", ""), e = "affix" + (i ? "-" + i : ""), o = n.Event(e + ".bs.affix"), this.$element.trigger(o), o.isDefaultPrevented()) return;
                this.affixed = i;
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null;
                this.$element.removeClass(t.RESET).addClass(e).trigger(e.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == i && this.$element.offset({
                top: h - s - u
            })
        }
    };
    r = n.fn.affix;
    n.fn.affix = i;
    n.fn.affix.Constructor = t;
    n.fn.affix.noConflict = function() {
        return n.fn.affix = r, this
    };
    n(window).on("load", function() {
        n('[data-spy="affix"]').each(function() {
            var r = n(this),
                t = r.data();
            t.offset = t.offset || {};
            null != t.offsetBottom && (t.offset.bottom = t.offsetBottom);
            null != t.offsetTop && (t.offset.top = t.offsetTop);
            i.call(r, t)
        })
    })
}(jQuery);
! function(n) {
    "use strict";
    n.matchMedia = n.matchMedia || function(n) {
        var u, i = n.documentElement,
            f = i.firstElementChild || i.firstChild,
            r = n.createElement("body"),
            t = n.createElement("div");
        return t.id = "mq-test-1", t.style.cssText = "position:absolute;top:-100em", r.style.background = "none", r.appendChild(t),
            function(n) {
                return t.innerHTML = '&shy;<style media="' + n + '"> #mq-test-1 { width: 42px; }<\/style>', i.insertBefore(r, f), u = 42 === t.offsetWidth, i.removeChild(r), {
                    matches: u,
                    media: n
                }
            }
    }(n.document)
}(this),
function(n) {
    "use strict";

    function p() {
        y(!0)
    }
    var t = {};
    n.respond = t;
    t.update = function() {};
    var f = [],
        tt = function() {
            var t = !1;
            try {
                t = new n.XMLHttpRequest
            } catch (i) {
                t = new n.ActiveXObject("Microsoft.XMLHTTP")
            }
            return function() {
                return t
            }
        }(),
        w = function(n, t) {
            var i = tt();
            i && (i.open("GET", n, !0), i.onreadystatechange = function() {
                4 !== i.readyState || 200 !== i.status && 304 !== i.status || t(i.responseText)
            }, 4 !== i.readyState && i.send(null))
        };
    if (t.ajax = w, t.queue = f, t.regex = {
            media: /@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,
            keyframes: /@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,
            urls: /(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,
            findStyles: /@media *([^\{]+)\{([\S\s]+?)$/,
            only: /(only\s+)?([a-zA-Z]+)\s?/,
            minw: /\([\s]*min\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/,
            maxw: /\([\s]*max\-width\s*:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/
        }, t.mediaQueriesSupported = n.matchMedia && null !== n.matchMedia("only all") && n.matchMedia("only all").matches, !t.mediaQueriesSupported) {
        var c, b, l, i = n.document,
            r = i.documentElement,
            e = [],
            o = [],
            u = [],
            a = {},
            k = 30,
            s = i.getElementsByTagName("head")[0] || r,
            it = i.getElementsByTagName("base")[0],
            h = s.getElementsByTagName("link"),
            v = function() {
                var u, t = i.createElement("div"),
                    n = i.body,
                    o = r.style.fontSize,
                    e = n && n.style.fontSize,
                    f = !1;
                return t.style.cssText = "position:absolute;font-size:1em;width:1em", n || (n = f = i.createElement("body"), n.style.background = "none"), r.style.fontSize = "100%", n.style.fontSize = "100%", n.appendChild(t), f && r.insertBefore(n, r.firstChild), u = t.offsetWidth, f ? r.removeChild(n) : n.removeChild(t), r.style.fontSize = o, e && (n.style.fontSize = e), u = l = parseFloat(u)
            },
            y = function(t) {
                var rt = "clientWidth",
                    ut = r[rt],
                    ft = "CSS1Compat" === i.compatMode && ut || i.body[rt] || ut,
                    p = {},
                    ct = h[h.length - 1],
                    et = (new Date).getTime(),
                    tt, g, nt, f, it;
                if (t && c && k > et - c) return n.clearTimeout(b), b = n.setTimeout(y, k), void 0;
                c = et;
                for (tt in e)
                    if (e.hasOwnProperty(tt)) {
                        var a = e[tt],
                            w = a.minw,
                            d = a.maxw,
                            ot = null === w,
                            st = null === d,
                            ht = "em";
                        w && (w = parseFloat(w) * (w.indexOf(ht) > -1 ? l || v() : 1));
                        d && (d = parseFloat(d) * (d.indexOf(ht) > -1 ? l || v() : 1));
                        a.hasquery && (ot && st || !(ot || ft >= w) || !(st || d >= ft)) || (p[a.media] || (p[a.media] = []), p[a.media].push(o[a.rules]))
                    }
                for (g in u) u.hasOwnProperty(g) && u[g] && u[g].parentNode === s && s.removeChild(u[g]);
                u.length = 0;
                for (nt in p) p.hasOwnProperty(nt) && (f = i.createElement("style"), it = p[nt].join("\n"), f.type = "text/css", f.media = nt, s.insertBefore(f, ct.nextSibling), f.styleSheet ? f.styleSheet.cssText = it : f.appendChild(i.createTextNode(it)), u.push(f))
            },
            d = function(n, i, r) {
                var h = n.replace(t.regex.keyframes, "").match(t.regex.media),
                    c = h && h.length || 0,
                    l, a, f, v, u, p, w, s;
                for (i = i.substring(0, i.lastIndexOf("/")), l = function(n) {
                        return n.replace(t.regex.urls, "$1" + i + "$2$3")
                    }, a = !c && r, i.length && (i += "/"), a && (c = 1), f = 0; c > f; f++)
                    for (a ? (v = r, o.push(l(n))) : (v = h[f].match(t.regex.findStyles) && RegExp.$1, o.push(RegExp.$2 && l(RegExp.$2))), p = v.split(","), w = p.length, s = 0; w > s; s++) u = p[s], e.push({
                        media: u.split("(")[0].match(t.regex.only) && RegExp.$2 || "all",
                        rules: o.length - 1,
                        hasquery: u.indexOf("(") > -1,
                        minw: u.match(t.regex.minw) && parseFloat(RegExp.$1) + (RegExp.$2 || ""),
                        maxw: u.match(t.regex.maxw) && parseFloat(RegExp.$1) + (RegExp.$2 || "")
                    });
                y()
            },
            g = function() {
                if (f.length) {
                    var t = f.shift();
                    w(t.href, function(i) {
                        d(i, t.href, t.media);
                        a[t.href] = !0;
                        n.setTimeout(function() {
                            g()
                        }, 0)
                    })
                }
            },
            nt = function() {
                for (var r = 0; r < h.length; r++) {
                    var i = h[r],
                        t = i.href,
                        u = i.media,
                        e = i.rel && "stylesheet" === i.rel.toLowerCase();
                    t && e && !a[t] && (i.styleSheet && i.styleSheet.rawCssText ? (d(i.styleSheet.rawCssText, t, u), a[t] = !0) : (!/^([a-zA-Z:]*\/\/)/.test(t) && !it || t.replace(RegExp.$1, "").split("/")[0] === n.location.host) && ("//" === t.substring(0, 2) && (t = n.location.protocol + t), f.push({
                        href: t,
                        media: u
                    })))
                }
                g()
            };
        nt();
        t.update = nt;
        t.getEmValue = v;
        n.addEventListener ? n.addEventListener("resize", p, !1) : n.attachEvent && n.attachEvent("onresize", p)
    }
}(this)