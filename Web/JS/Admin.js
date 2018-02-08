var tr;
var GlobalUsers=[];

function showAddTamGroup(){
    $(".AddTamGroup").show();
    $(".SubTamGroup").hide();
}

function showSubmitTamGroup(){
    $(".AddTamGroup").hide();
    $(".SubTamGroup").show();
}

function displayAll() {
    displayAllTAM();
    getAllUsers();
}

function addTam() {
    var Owner = $("#Owner").val().toUpperCase();
    var TamType = $("#TamType").val();
    var TamName = $("#TamName").val();
    /*if (Owner == null) {
        alert("Please enter Tam Owner.");
        return;
    }*/
    if (TamType == null) {
        alert("Please enter Tam Type.");
        return;
    }
    if (TamName == null) {
        alert("Please enter Tam Name.");
        return;
    }

    var Tam = {
        "name": TamName,
        "type": TamType,
        "admin": {
            "eid": Owner
        }
    };

    $.ajax({
        url: 'http://localhost:8090/addTam',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Tam),
        type: 'POST',
        success: function(response) {
            var TamInfo = JSON.parse(response);
            if(TamInfo.admin == null)
            {
                TamInfo.admin = {
                    eid:""
                };
            }
            displayNewline(TamInfo);
            cleanValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function editTam(caller) {
    if (tr != null)
    {
        tr.removeClass("selectedtr");
    }
    tr = $(caller).parent().parent().parent();
    tr.addClass("selectedtr");
    var name = tr.children("td:nth-child(1)").text();
    var type = tr.children("td:nth-child(2)").text();
    var admin = tr.children("td:nth-child(3)").text();
    $("#TamName").val(name);
    $("#TamType").val(type);
    if(admin != null )
    {
        $("#Owner").val(admin)
    }
    showSubmitTamGroup();
}

function submitTam(){
    var Id = Number(tr.attr("id").replace("TamId",""));
    var Owner = $("#Owner").val();
    var TamType = $("#TamType").val();
    var TamName = $("#TamName").val();
    /*if (Owner == null) {
        alert("Please enter Tam Owner.");
        return;
    }*/
    if (TamType == null) {
        alert("Please enter Tam Type.");
        return;
    }
    if (TamName == null) {
        alert("Please enter Tam Name.");
        return;
    }

    var Tam = {
        "id":Id,
        "name": TamName,
        "type": TamType,
        "admin": {
            "eid": Owner
        }
    };

    $.ajax({
        url: 'http://localhost:8090/addTam',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Tam),
        type: 'POST',
        success: function(response) {
            var TamInfo = JSON.parse(response);
            if(TamInfo.admin == null)
            {
                TamInfo.admin = {
                    eid:""
                };
            }
            modifyLine(TamInfo);
            tr.removeClass("selectedtr");
            showAddTamGroup();
            cleanValues();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function cancelEditTam(){
    tr.removeClass("selectedtr");
    cleanValues();
    showAddTamGroup();
    tr = null;
}

function cleanValues(){
    $("#TamName").val("");
    $("#TamType").val("");
    $("#Owner").val("");
}

function displayNewline(TamInfo){
    $("#mainbody").append("<tr id='TamId" + TamInfo.id + "'>" + "<td>"+ TamInfo.name + "</td><td>" +
        TamInfo.type + "</td><td>" + TamInfo.admin.eid + "</td><td><a href='#'><img src='../PIC/edit.png' alt='' title=''border='0' onclick='editTam(this)'/></a></td>" +
        "<td><a href='#'><img src='../PIC/trash.gif' alt='' title='' border='0' onclick='removeTam(this)'/></a></td></tr>");
}

function modifyLine(TamInfo){
    tr.children("td:nth-child(1)").text(TamInfo.name);
    tr.children("td:nth-child(2)").text(TamInfo.type);
    tr.children("td:nth-child(3)").text(TamInfo.admin.eid);
}

function displayAllTAM(){

    $.ajax({
        url: 'http://localhost:8090/displayAllTam',
        type: 'POST',
        success: function(response) {
            if(response == null)
            {
                return;
            }
            var TamInfos = JSON.parse(response);
            var i;
            for(i=0;i<TamInfos.length;i++)
            {
                if(TamInfos[i].admin == null)
                {
                    TamInfos[i].admin = {
                        eid:""
                    };
                }
                displayNewline(TamInfos[i]);
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function removeTam(caller){
    tr = $(caller).parent().parent().parent();
    var Id = Number(tr.attr("id").replace("TamId",""));
    $.ajax({
        url: 'http://localhost:8090/deleteTam',
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

function addUser() {
    var eid = $("#UEID").val();
    var name = $("#UName").val();
    var mail = $("#UEmail").val();

    var User;

    var UserInfo = {
        "eid": eid,
        "name":name,
        "mail":mail
    };

    $.ajax({
        url: 'http://localhost:8090/addUser',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(UserInfo),
        type: 'POST',
        success: function(response) {
            User = JSON.parse(response);
            ConfigUser(User);
            clearAddUserInfomation();
        },
        error: function(error) {
            alert("error");
        }
    });
}

function getAllUsers(){
    var Users;
    var i;
    $.ajax({
        url: 'http://localhost:8090/displayAllUser',
        type: 'POST',
        success: function(response) {
            if(response == null)
            {
                return;
            }
            Users = JSON.parse(response);
            for(i=0;i<Users.length;i++)
            {
                ConfigUser(Users[i]);
            }
        },
        error: function(error) {
            alert("error");
        }
    });
}

function clearAddUserInfomation(){
    $("#UEID").val("");
    $("#UName").val("");
    $("#UEmail").val("");
}

function ConfigUser(User){
    GlobalUsers.push(User);
    $("#AllUsersDataList").append("<option value='" + User.eid + "'>" + User.name + " (" + User.eid + ")</option>")
}