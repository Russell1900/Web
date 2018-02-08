function addUser(Eid, Name, Mail){
    $.ajax({
        type:'GET',
        url:"http://10.78.146.206:8090/addUser",
        data: 'EID='+ Eid +'&Name=' + Name + '&Mail='+ Mail,
        success:function(msg){
            alert(JSON.stringify(msg));
        }
    });
}

function addAction(Title, Content, Status, DueDate){
    $.ajax({
        type:'GET',
        url:"http://10.78.146.206:8090/addAction",
        data: 'ActionTitle='+ Title +'&ActionContent=' + Content + '&ActionStatus='+ Status + '&ActionDueDate=' + DueDate,
        success:function(msg){
            alert(JSON.stringify(msg));
        }
    });
}

function addTAM(Name, Type, Admin){
    var x;
    $.ajax({
        type:'GET',
        url:"http://10.78.146.206:8090/addTam",
        data: "TamName="+Name+"&TamType=" + Type + "&TamAdmin=" + Admin,
        success:function(msg,status){
            x = JSON.stringify(msg);
        }
    });
    return x;
}

function addTask(){
    $.ajax({
        type:'GET',
        url:"http://10.78.146.206:8090/addTask",
        data: 'TaskTitle='+ Name +'&=TaskStatus' + Type + '&TamAdmin='+ Admin,
        success:function(msg){
            alert(JSON.stringify(msg));
        }
    });
}