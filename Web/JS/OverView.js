var GlobalUserEid;
var GlobalTamId;

var ActionTr;
var GlobalTamUsers = [];

function displayAllOverView(){
    GlobalUserEid = window.sessionStorage.getItem("GlobalUserEid");
    GlobalTamId = window.sessionStorage.getItem("GlobalTamId");
    displayAllAction();
    displayAllTamUsers();
}

function displayAllAction() {
    $.ajax({
        url: 'http://10.78.146.206:8090/displayAllAction',
        type: 'POST',
        data: 'tamid='+GlobalTamId,
        success: function(response) {
            var ActionInfos = JSON.parse(response);
            var i;
            for(i=0;i<ActionInfos.length;i++)
            {
                if(ActionInfos[i].user == null)
                {
                    ActionInfos[i].user = {
                        eid:""
                    };
                }
                displayNewActionLine(ActionInfos[i]);
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function addAction(){
    var Title = $("#ActionTitle").val();
    var EID = $("#ActionOwner").val().trim();
    EID = EID.split("(")[1];
    EID = EID.split(")")[0];
    var Date = $("#ActionDate").val();
    var PDCA = $("#ActionPDCA").val();

    if ((Title == null) || (Title == "")) {
        alert("Please enter Action Title.");
        return;
    }

    if(EID == null)
    {
        EID = "";
    }

    var Action = {
        "title": Title,
        "status": PDCA,
        "duedate": Date,
        "user":{
            "eid":EID
        },
        "tam":{
            "id":GlobalTamId
        }
    };

    $.ajax({
        url: 'http://10.78.146.206:8090/addAction',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Action),
        type: 'POST',
        success: function(response) {
            var ActionInfo = JSON.parse(response);
            if(ActionInfo.user == null)
            {
                ActionInfo.user = {
                    eid:""
                };
            }
            displayNewActionLine(ActionInfo);
            cleanActionValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function showAddActionGroup(){
    $(".AddActionGroup").show();
    $(".SubActionGroup").hide();
}

function showSubmitActionGroup(){
    $(".AddActionGroup").hide();
    $(".SubActionGroup").show();
}

function displayNewActionLine(ActionInfo) {

    $("#ActionTable").append("<tr id='ActionId" + ActionInfo.id + "'>" + "<td>" + ActionInfo.title + "</td><td>" +
        ActionInfo.user.name + "</td><td>" + ActionInfo.duedate + "</td><td>" + ActionInfo.status + "</td><td><a href='#'><img src='../PIC/edit.png' alt='' title=''border='0' onclick='editAction(this)'/></a>" +
        "<a href='#'><img src='../PIC/trash.gif' alt='' title='' border='0' onclick='removeAction(this)'/></a></td></tr>");

    var UserTd = $("#ActionId" + ActionInfo.id).children("td:nth-child(2)");
    UserTd.data("UserEid",ActionInfo.user.eid);
}

function cleanActionValues(){
    $("#ActionTitle").val("");
    $("#ActionOwner").val("");
    $("#ActionDate").val("");
    $("#ActionPDCA").val("");
}

function editAction(but){
    if(ActionTr != null)
    {
        ActionTr.removeClass("Selected");
    }
    ActionTr = $(but).parent().parent().parent();
    ActionTr.addClass("Selected");
    var title = ActionTr.children("td:nth-child(1)").text();
    var owner = ActionTr.children("td:nth-child(2)").text();
    var eid = ActionTr.children("td:nth-child(2)").data("UserEid");
    var date = ActionTr.children("td:nth-child(3)").text();
    var pdca = ActionTr.children("td:nth-child(4)").text();
    $("#ActionTitle").val(title);
    $("#ActionDate").val(date);
    $("#ActionPDCA").val(pdca);
    if(owner != null )
    {
        $("#ActionOwner").val(owner + " (" + eid + ")");
    }
    showSubmitActionGroup();
}

function removeAction(but){
    ActionTr = $(but).parent().parent().parent();
    var Id = Number(ActionTr.attr("id").replace("ActionId",""));
    $.ajax({
        url: 'http://10.78.146.206:8090/deleteAction',
        data: "id=" + Id,
        type: 'POST',
        success: function(response) {
            ActionTr.remove();
            ActionTr = null;
        },
        error: function(error) {
            ActionTr = null;
            alert("error");

        }
    });
}

function submitAction(){
    var Id = Number(ActionTr.attr("id").replace("ActionId",""));
    var Title = $("#ActionTitle").val();
    var EID = ($("#ActionOwner").val().trim().split("("))[1].trim();
    EID = EID.split(")")[0].trim();
    var Date = $("#ActionDate").val();
    var PDCA = $("#ActionPDCA").val();

    if (Title == null) {
        alert("Please enter Action Title.");
        return;
    }

    if(EID == null)
    {
        EID = "";
    }

    var Action = {
        "id": Id,
        "title": Title,
        "status": PDCA,
        "duedate": Date,
        "user":{
            "eid":EID
        },
        "tam":{
            "id":GlobalTamId
        }
    };

    $.ajax({
        url: 'http://10.78.146.206:8090/addAction',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Action),
        type: 'POST',
        success: function(response) {
            var ActionInfo = JSON.parse(response);

            modifyActionLine(ActionInfo);
            ActionTr.removeClass("Selected");
            showAddActionGroup();
            cleanActionValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function modifyActionLine(ActionInfo){
    ActionTr.children("td:nth-child(1)").text(ActionInfo.title);
    var UserTd = ActionTr.children("td:nth-child(2)");
    UserTd.text(ActionInfo.user.name);
    UserTd.data("UserEid",ActionInfo.user.eid);
    ActionTr.children("td:nth-child(3)").text(ActionInfo.duedate);
    ActionTr.children("td:nth-child(4)").text(ActionInfo.status);
}


function cancelEditAction(){
    ActionTr.removeClass("Selected");
    cleanActionValues();
    showAddActionGroup();
    tr = null;
}

function displayAllTamUsers(){
    $.ajax({
        url: 'http://10.78.146.206:8090/displayTamUsers',
        type: 'POST',
        data: 'tamid='+GlobalTamId,
        success: function(response) {
            var UserInfos = JSON.parse(response);
            var i;
            for(i=0;i<UserInfos.length;i++)
            {
                if(UserInfos[i].mail == null)
                {
                    UserInfos[i].mail = "";
                }
                displayNewTamUser(UserInfos[i]);
                configureOverviewUser(UserInfos[i])
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function displayNewTamUser(UserInfo) {
    var done = ((UserInfo.done/UserInfo.total)*100).toFixed(0);
    var pending = ((UserInfo.pending/UserInfo.total)*100).toFixed(0);
    $("#UserOverview").append("<div id='" + UserInfo.eid + "' style='width=100%'>" + "<div style='width:20%;float:left;'>" + UserInfo.name + "</div>" +
        "<div style='width:70%; float:left;'><div class='progress'  style='width:100%'><div class='progress-bar progress-bar-success' role='progressbar' style='width:" + done + "%'>" + UserInfo.done +
        "</div><div class='progress-bar progress-bar-danger' role='progressbar' style='width:" + pending + "'>" + UserInfo.pending + "</div></div></div></div>");
}

function configureOverviewUser(User){
    GlobalTamUsers.push(User);
    $("#OverviewUsersDataList").append("<option value='" + User.name + " (" + User.eid + ")'</option>")
}