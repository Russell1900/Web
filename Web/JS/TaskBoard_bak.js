//TaskBoard Operation Area
function addTaskRow(){
    var TaskTable = document.getElementById("TaskTable");

	var Row=document.createElement("tr");

	var Cell0=document.createElement("td");
    Cell0.classList.add("TableRefTd");
    Cell0.innerHTML="User"+(TaskTable.getElementsByTagName("tr").length+1);

    var Cell1=document.createElement("td");
    generateCellStruct(Cell1,1);

    var Cell2=document.createElement("td");
    generateCellStruct(Cell2,1);

    var Cell3=document.createElement("td");
    generateCellStruct(Cell3,1);

    var Cell4=document.createElement("td");
    generateCellStruct(Cell4,1);

    var Cell5=document.createElement("td");
    generateCellStruct(Cell5,2);

    var Cell6=document.createElement("td");
    var IssueDiv = document.createElement("div");
    IssueDiv.classList.add("IssueLogDiv");
    var TextArea = document.createElement("textarea");
    TextArea.innerHTML = "IssueLog";

    IssueDiv.appendChild(TextArea);
    Cell6.appendChild(IssueDiv);

    var Cell7=document.createElement("td");
    var DelButton = document.createElement("button");
    DelButton.innerHTML="X";
    DelButton.onclick = removeRow;
    Cell7.appendChild(DelButton);

    Row.appendChild(Cell0);
    Row.appendChild(Cell1);
    Row.appendChild(Cell2);
    Row.appendChild(Cell3);
    Row.appendChild(Cell4);
    Row.appendChild(Cell5);
    Row.appendChild(Cell6);
    Row.appendChild(Cell7);
    Row.classList.add("TaskTableTr");

    TaskTable.appendChild(Row);
}

function generateCellStruct(Cell,Type) {
    //create basic elements
    var CellDiv = document.createElement("div");
    CellDiv.classList.add("CellDiv");

    var SelectDiv = document.createElement("div");
    SelectDiv.classList.add("SelectDiv");

    var Select = document.createElement("select");
    Select.size = 5;

    var i;
    var Option;
    for (i = 0; i < 7; i++) {
        Option = document.createElement("option");
        Option.innerHTML = "test" + i;
        Select.appendChild(Option);
    }

    var LeftButtonDiv = document.createElement("div");
    LeftButtonDiv.classList.add("LeftButtonDiv");

    var LeftButton = document.createElement("button");
    LeftButton.classList.add("AddRemoveButton");
    LeftButton.onclick = moveLeftOption;
    LeftButton.innerHTML = "&lt";
    if(Type==1){
        var RightButtonDiv = document.createElement("div");
        RightButtonDiv.classList.add("RightButtonDiv");

        var RightButton = document.createElement("button");
        RightButton.classList.add("AddRemoveButton");
        RightButton.onclick = moveRightOption;
        RightButton.innerHTML = "&gt";
    }

    //integrate
    SelectDiv.appendChild(Select);
    CellDiv.appendChild(SelectDiv);

    LeftButtonDiv.appendChild(LeftButton);
    CellDiv.appendChild(LeftButtonDiv);

    if(Type==1){
        RightButtonDiv.appendChild(RightButton);
        CellDiv.appendChild(RightButtonDiv);
    }

    Cell.appendChild(CellDiv);
}

//ActionBoard Operation Area
function addActionRow(){

    var ActionTable = document.getElementById("ActionTable");

    var Row = document.createElement("tr");
    Row.classList.add("ActionTableTr");

    var Cell0 = document.createElement("td");
    Cell0.classList.add("TableRefTd");
    Cell0.innerHTML = ActionTable.getElementsByTagName("tr").length + 1 +".";

    var Cell1 = document.createElement("td");
    var TextInput = document.createElement("input");
    TextInput.setAttribute("type","text");
    TextInput.classList.add("ActionTextInput");
    Cell1.appendChild(TextInput);

    var Cell2 = document.createElement("td");
    var DateInput = document.createElement("input");
    DateInput.setAttribute("type","date");
    DateInput.classList.add("ActionDateInput");
    Cell2.appendChild(DateInput);

    var Cell3 = document.createElement("td");
    var Select = document.createElement("select");
    Select.classList.add("ActionPDCFSelect");
    var option0 = document.createElement("option");
    option0.innerHTML = "Plan";
    var option1 = document.createElement("option");
    option1.innerHTML = "Do";
    var option2 = document.createElement("option");
    option2.innerHTML = "Check";
    var option3 = document.createElement("option");
    option3.innerHTML = "Act";

    Select.appendChild(option0);
    Select.appendChild(option1);
    Select.appendChild(option2);
    Select.appendChild(option3);

    Cell3.appendChild(Select);

    var Cell4 = document.createElement("td");
    var DelButton = document.createElement("button");
    DelButton.innerHTML = "X";
    DelButton.onclick = removeRow;
    Cell4.appendChild(DelButton);

    Row.appendChild(Cell0);
    Row.appendChild(Cell1);
    Row.appendChild(Cell2);
    Row.appendChild(Cell3);
    Row.appendChild(Cell4);
    ActionTable.appendChild(Row);
}

//AndoBoard Operation Area
function addAndoRow(){

    var AndoTable = document.getElementById("AndoTable");

    var Row = document.createElement("tr");
    Row.classList.add("AndoTableTr");

    var Cell0 = document.createElement("td");
    Cell0.classList.add("TableRefTd");
    Cell0.innerHTML = AndoTable.getElementsByTagName("tr").length + 1 +".";

    var Cell1 = document.createElement("td");
    var TextInput = document.createElement("input");
    TextInput.setAttribute("type","text");
    TextInput.classList.add("AndoTextInput");
    Cell1.appendChild(TextInput);

    var Cell2 = document.createElement("td");
    var DateInput = document.createElement("input");
    DateInput.setAttribute("type","date");
    DateInput.classList.add("AndoDateInput");
    Cell2.appendChild(DateInput);

    var Cell3 = document.createElement("td");
    var Select = document.createElement("select");
    Select.classList.add("AndoPDCFSelect");
    var option0 = document.createElement("option");
    option0.innerHTML = "Plan";
    var option1 = document.createElement("option");
    option1.innerHTML = "Do";
    var option2 = document.createElement("option");
    option2.innerHTML = "Check";
    var option3 = document.createElement("option");
    option3.innerHTML = "Act";

    Select.appendChild(option0);
    Select.appendChild(option1);
    Select.appendChild(option2);
    Select.appendChild(option3);

    Cell3.appendChild(Select);

    var Cell4 = document.createElement("td");
    var DelButton = document.createElement("button");
    DelButton.innerHTML = "X";
    DelButton.onclick = removeRow;
    Cell4.appendChild(DelButton);

    Row.appendChild(Cell0);
    Row.appendChild(Cell1);
    Row.appendChild(Cell2);
    Row.appendChild(Cell3);
    Row.appendChild(Cell4);
    AndoTable.appendChild(Row);
}

//MarkBoard Operation Area
function addMarkRow(){

    var MarkTable = document.getElementById("MarkTable");

    var Row = document.createElement("tr");
    Row.classList.add("MarkTableTr");

    var Cell0 = document.createElement("td");
    Cell0.classList.add("TableRefTd");
    Cell0.innerHTML = MarkTable.getElementsByTagName("tr").length + 1 +".";

    var Cell1 = document.createElement("td");
    var TextInput = document.createElement("input");
    TextInput.setAttribute("type","text");
    TextInput.classList.add("MarkTextInput");
    Cell1.appendChild(TextInput);

    var Cell2 = document.createElement("td");
    var DelButton = document.createElement("button");
    DelButton.innerHTML = "X";
    DelButton.onclick = removeRow;
    Cell2.appendChild(DelButton);

    Row.appendChild(Cell0);
    Row.appendChild(Cell1);
    Row.appendChild(Cell2);

    MarkTable.appendChild(Row);
}

//DelButton
function removeRow(){
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
}

//remove options
function removeOption(){
    var Dropdown = this.parentNode.parentNode.firstChild.firstChild;
    Dropdown.remove(Dropdown.selectedIndex);
}

//move options
function moveRightOption(){
    var BaseCell = this.parentNode.parentNode.parentNode;
    var BaseIndex = BaseCell.cellIndex;
    var BaseRow = BaseCell.parentNode;
    var TargetIndex = BaseIndex + 1;
    var TargetCell = BaseRow.cells[TargetIndex];
    var BaseSelect = BaseCell.firstChild.firstChild.firstChild;
    var TargetSelect = TargetCell.firstChild.firstChild.firstChild;
    var Option = BaseSelect.options[BaseSelect.selectedIndex];
    BaseSelect.remove(BaseSelect.selectedIndex);
    TargetSelect.appendChild(Option);
}
function moveLeftOption(){
    var BaseCell = this.parentNode.parentNode.parentNode;
    var BaseIndex = BaseCell.cellIndex;
    var BaseRow = BaseCell.parentNode;
    var TargetIndex = BaseIndex - 1;
    var TargetCell = BaseRow.cells[TargetIndex];
    var BaseSelect = BaseCell.firstChild.firstChild.firstChild;
    var TargetSelect = TargetCell.firstChild.firstChild.firstChild;
    var Option = BaseSelect.options[BaseSelect.selectedIndex];
    BaseSelect.remove(BaseSelect.selectedIndex);
    TargetSelect.appendChild(Option);
}