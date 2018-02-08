var GlobalUserEid;
var GlobalTamId;

var GlobalTamProject=[];
var GlobalTamUsers=[];
var tr;
function displayTaskBoard() {
    GlobalUserEid = window.sessionStorage.getItem("GlobalUserEid");
    GlobalTamId = window.sessionStorage.getItem("GlobalTamId");

    displayAllTASK();
    displayAllTamProject();
    displayAllTamUsers();
}
function edit1(but){
    if(tr != null)
    {
        tr.removeClass("Selected");
    }
    tr = $(but).parent().parent().parent();
    tr.addClass("Selected");

    var OwnerTd = tr.children("td:nth-child(6)");
    $("#Owner").val(OwnerTd.text() + " (" + OwnerTd.data("UserEid") + ")");
    var RevTd = tr.children("td:nth-child(7)");
    $("#Reviewer").val(RevTd.text() + " (" + RevTd.data("UserEid") + ")");
    $("#UDate").val(tr.children("td:nth-child(4)").text());
    $("#Hours").val(tr.children("td:nth-child(3)").text());
    var PlTd = tr.children("td:nth-child(1)");
    $("#PL").val(PlTd.text() + " (" + PlTd.data("ProId") + ")");
    $("#Status").val(tr.children("td:nth-child(5)").text());
    $("#Task").val(tr.children("td:nth-child(2)").text());

    showSubTaskGroup();
}

function showAddTaskGroup(){
    $(".AddTaskGroup").show();
    $(".SubTaskGroup").hide();
}

function showSubTaskGroup(){
    $(".AddTaskGroup").hide();
    $(".SubTaskGroup").show();
}

function addTask() {
    var Owner = $("#Owner").val().trim().split("(")[1].trim();
    Owner = Owner.split(")")[0].trim();
    var Reviewer = $("#Reviewer").val().trim().split("(")[1].trim();
    Reviewer = Reviewer.split(")")[0].trim();
    var enddate = $("#UDate").val();
    var d = new Date(enddate);
    var deveffort = $("#Hours").val();
    var status = $("#Status").val();
    var title = $("#Task").val();
    var issue = $("#issues").val();
    var Projectid = $("#PL").val().trim().split("(")[1];
    Projectid = Projectid.split(")")[0].trim();

    var Task = {
        "deveffort":deveffort,
        "title": title,
        "enddate": d,
        "status": status,
        "issue": issue,
        "reviewer": {
            "eid": Reviewer
        },
        "user": {
            "eid": Owner
        },
        "project":{
            "id": Projectid
        }

    };

    $.ajax({
        url: 'http://10.78.146.206:8090/addTask',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Task),
        type: 'POST',
        success: function(response) {
            var TaskInfo = JSON.parse(response);
            if(TaskInfo.user == null)
            {
                TaskInfo.user = {
                    eid:""
                };
            }
            if(TaskInfo.reviewer == null)
            {
                TaskInfo.reviewer = {
                    eid:""
                };
            }
            displayNewline(TaskInfo);
            cleanValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function submitTask(){
    var Id = Number(tr.attr("id").replace("TaskId",""));
    var Owner = $("#Owner").val().trim().split("(")[1].trim();
    Owner = Owner.split(")")[0].trim();
    var Reviewer = $("#Reviewer").val().trim().split("(")[1].trim();
    Reviewer = Reviewer.split(")")[0].trim();
    var enddate = $("#UDate").val();
    var d = new Date(enddate);
    var deveffort = $("#Hours").val();
    var status = $("#Status").val();
    var title = $("#Task").val();
    var issue = $("#issues").val();
    var Projectid = $("#PL").val().trim().split("(")[1];
    Projectid = Projectid.split(")")[0].trim();
    var Task = {
        "id":Id,
        "deveffort":deveffort,
        "title": title,
        "enddate": d,
        "status": status,
        "issue": issue,
        "user": {
            "eid": Owner
        },
        "reviewer":{
            "eid": Reviewer
        },
        "project":{
            "id": Projectid
        }

    };

    $.ajax({
        url: 'http://10.78.146.206:8090/addTask',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Task),
        type: 'POST',
        success: function(response) {
            var TaskInfo = JSON.parse(response);
            modifyLine(TaskInfo);
            tr.removeClass("Selected");
            showAddTaskGroup();
            cleanValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function cancelEditTask(){
    tr.removeClass("Selected");
    cleanValues();
    showAddTaskGroup();
    tr = null;
}

function cleanValues(){
    $("#Owner").val("");
    $("#Reviewer").val("");
    $("#UDate").val("Sat Dec 09 2220 08:00:00 GMT+0800 (China Standard Time)");
    $("#Hours").val("");
    $("#Status").val("");
    $("#Task").val("");
    $("#issues").val("");
}

function displayNewline(TaskInfo){
    if(TaskInfo.user == null)
    {
        TaskInfo.user = {
            "eid":""
        }
    }
    if(TaskInfo.reviewer == null)
    {
        TaskInfo.reviewer = {
            "eid":""
        }
    }
    $("#mainbody").append("<tr id='TaskId" + TaskInfo.id + "'>" + "<td>"+ TaskInfo.project.name+ "</td><td>" + TaskInfo.title + "</td><td>" + TaskInfo.deveffort + "</td><td>" + TaskInfo.enddate + "</td><td>" + TaskInfo.status + "</td><td>" + TaskInfo.user.name +"</td><td>" + TaskInfo.reviewer.name + "</td><td><a href='#'><img src='../PIC/edit.png' alt='' title=''border='0' onclick='edit1(this)'/></a></td>" + "<td><a href='#'><img src='../PIC/trash.gif' alt='' title='' border='0' onclick='removeTask(this)'/></a></td></tr>");
    var tempTr =  $("#TaskId" + TaskInfo.id);
    tempTr.children("td:nth-child(1)").data("ProId",TaskInfo.project.id);
    tempTr.children("td:nth-child(6)").data("UserEid",TaskInfo.user.eid);
    tempTr.children("td:nth-child(7)").data("UserEid",TaskInfo.reviewer.eid);
}

function modifyLine(TaskInfo){
    var ProTd = tr.children("td:nth-child(1)");
    ProTd.text(TaskInfo.project.name);
    ProTd.data("ProId",TaskInfo.project.id);
    tr.children("td:nth-child(2)").text(TaskInfo.title);
    tr.children("td:nth-child(3)").text(TaskInfo.deveffort);
    tr.children("td:nth-child(4)").text(TaskInfo.enddate);
    tr.children("td:nth-child(5)").text(TaskInfo.status);
    var UserTd = tr.children("td:nth-child(6)");
    UserTd.text(TaskInfo.user.name);
    UserTd.data("UserEid", TaskInfo.user.eid);
    var ReviewerTd = tr.children("td:nth-child(7)");
    ReviewerTd.text(TaskInfo.reviewer.name);
    ReviewerTd.data("UserEid",TaskInfo.reviewer.eid);
}

function displayAllTASK(){
    var tamid = GlobalTamId;

    $.ajax({
        url: 'http://10.78.146.206:8090/displayAllTask',
        data: "tamid=" + tamid,
        type: 'POST',
        success: function(response) {

            var TaskInfos = JSON.parse(response);
            var i = 0;
            //alert("2");
            for(i=0;i<TaskInfos.length;i++)
            {
                displayNewline(TaskInfos[i]);

            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function removeTask(caller){
    tr = $(caller).parent().parent().parent();
    var Id = Number(tr.attr("id").replace("TaskId",""));

    $.ajax({
        url: 'http://10.78.146.206:8090/removeTask',
        data: "id=" + Id,
        type: 'POST',
        success: function(response) {
            tr.remove();
            tr = null;
        },
        error: function(error) {
            tr = null;
            alert("error");
        }
    });
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
                configureTaskBoardUser(UserInfos[i])
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function configureTaskBoardUser(User){
    GlobalTamUsers.push(User);
    $("#TaskboardUsersDataList").append("<option value='" + User.name + " (" + User.eid + ")'></option>");
}

function displayAllTamProject(){
    $.ajax({
        url: 'http://10.78.146.206:8090/displayTamProject',
        type: 'POST',
        data: 'tamid='+GlobalTamId,
        success: function(response) {
            var ProjectInfos = JSON.parse(response);
            var i;
            for(i=0;i<ProjectInfos.length;i++)
            {
                if(ProjectInfos[i].enddate == null)
                {
                    ProjectInfos[i].enddate = "";
                }
                if(ProjectInfos[i].startdate == null)
                {
                    ProjectInfos[i].startdate = "";
                }
                configureTaskBoardProject(ProjectInfos[i])
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function configureTaskBoardProject(ProjectInfo) {
    GlobalTamProject.push(ProjectInfo);
    $("#TamProjectDataList").append("<option value='" + ProjectInfo.name + " (" + ProjectInfo.id + ")'></option>");
}
