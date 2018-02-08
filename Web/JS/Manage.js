var GlobalUserEid;
var GlobalTamId;

var GlobalUsers = [];

function displayManage() {
    GlobalUserEid = window.sessionStorage.getItem("GlobalUserEid");
    GlobalTamId = window.sessionStorage.getItem("GlobalTamId");

    displayManageTamProject();
    getAllManageUsers();
}

function displayManageTamProject() {

    var tamid = GlobalTamId;

    $.ajax({
        url: 'http://10.78.146.206:8090/displayTamProject',
        type: 'POST',
        data: 'tamid='+tamid,
        success: function(response) {
            var ProjectInfos = JSON.parse(response);
            var i;
            for(i=0;i<ProjectInfos.length;i++)
            {
                if(ProjectInfos[i].mail == null)
                {
                    if(ProjectInfos[i].enddate == null)
                    {
                        ProjectInfos[i].enddate = "";
                    }
                    if(ProjectInfos[i].startdate == null)
                    {
                        ProjectInfos[i].startdate = "";
                    }
                }
                displayNewProject(ProjectInfos[i])
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function displayNewProject(ProjectInfo) {
    $("#ProjectTable").append("<tr id='Project" + ProjectInfo.id + "'><td>" + ProjectInfo.name + "</td></tr>")
}

function addProject() {

    var name = $("#ProjectName").val()
    var tamid = GlobalTamId;
    var i;

    var project = {
        "name":name,
        "tam":{
            "id":tamid
        }
    };

    $.ajax({
        url: 'http://10.78.146.206:8090/addProject',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(project),
        type: 'POST',
        success: function(response) {
            var ProInfo = JSON.parse(response);
            displayNewProject(ProInfo);
            $("#ProjectName").val("");
        },
        error: function(error) {
            alert("error");
            $("#ProjectName").val("");
        }
    });
}

function addTamMember() {
    var eid = $("#TamMember").val();
    var tamid = GlobalTamId;

    $.ajax({
        url: 'http://10.78.146.206:8090/addTamMember',
        data: "tamid=" + tamid + "&eid=" + eid,
        type: 'POST',
        success: function(response) {
            $("#TamMember").val("");
        },
        error: function(error) {
            alert("error");
            $("#TamMember").val("");
        }
    });
}

function getAllManageUsers(){
    var Users;
    var i;
    $.ajax({
        url: 'http://10.78.146.206:8090/displayAllUser',
        type: 'POST',
        success: function(response) {
            if(response == null)
            {
                return;
            }
            Users = JSON.parse(response);
            for(i=0;i<Users.length;i++)
            {
                ConfigManageUser(Users[i]);
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function ConfigManageUser(User){
    GlobalUsers.push(User);
    $("#ManageUserDataList").append("<option value='" + User.eid + "'>" + User.name + " (" + User.eid + ")</option>")
}