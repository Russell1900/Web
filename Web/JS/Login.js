/* Element input is like:
 * {TamType:  ,
 *  TamGroup  ,
 * }
 */
var GlobalUserEid;
var GlobalTamId;
var TamList =new Array(5);//tam layers

function loadUserData(){
    $.ajax({
        url: 'http://localhost:8090/getUserTams',
        type: 'POST',
        data:"UserEID="+GlobalUserEid,
        success: function(response) {
            //var TamInfos = JSON.parse(response);
            processSelect(response);
        },
        error: function(error) {
            alert("error");
        }
    });
}

function processSelect(Inputs) {

    var i;
    $("#LeftList").empty();
    for (i = 0; i < TamList.length; i++) {
        TamList[i] = [];
    }
    for (j = 0; j < TamList.length; j++) {
        for (i = 0; i < Inputs.length; i++) {
            if (Inputs[i].type == "TAM" + (j + 1)) {
                TamList[j].push({Id: Inputs[i].id, Name: Inputs[i].name});
                Inputs.splice(i, 1);
                i--;
            }
        }
    }

    for (i = 0; i < TamList.length; i++) {
        if (TamList[i].length !== 0) {
            var type = "Tam" + (i + 1);
            $("#LeftList").append("<button type='button' class='list-group-item' value='" + i + "' onclick='displayTamGroup(this)'>" + type + "</button>");
        }
    }
}

function displayTamGroup(but){
    //generate right select
    var i = $(but).val()
    var j;
    $("#RightList").empty();
    if(TamList[i].length !== 0)
    {
        for(j=0;j<TamList[i].length;j++)
        {
            $("#RightList").append("<button type='button' class='list-group-item' value='" + TamList[i][j].Id + "' onclick='openTam(this)'>" + TamList[i][j].Name +"</button>");
        }
    }

}

function openTam(but){
    GlobalTamId = $(but).val();
    window.sessionStorage.setItem("GlobalTamId",GlobalTamId);
    window.open('OverView.html');
}

function setUserEid(){
    GlobalUserEid = $("#UserEidIn").val();
    window.sessionStorage.setItem("GlobalUserEid",GlobalUserEid);
    loadUserData();
}