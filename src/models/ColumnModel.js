import {computed, observable, action, reaction} from "mobx";

class ColumnModel {
    constructor(header,index,root,comesFrom){
        var me = this;
        me.root = root;
        me.headerName = header.headerName;
        me.headerLabel = header.headerLabel;
        me.editable = header.editable;
        me.index = index;
        me.averageValue = '';
        //to preset from template
        if(comesFrom=='inputFile'){
            if(Object.keys(root.globals.fields).includes(header.headerName)) {
                console.log('test',header.headerName);
                me.checked = true;
                me.match = header.headerName;
                me.field = header.headerName;
                me.type = root.globals.fields[header.headerName].type;
                changeCellEditor(me);
            } else {
                me.checked = false;
                me.match = '';
                me.field = header.field?header.field:"field"+index;
            }
        } else if(comesFrom=='template') {
            me.checked = false;
            me.match = '';
            me.field = header.headerName;
            me.type = root.globals.fields[header.headerName].type;
            changeCellEditor(me);
        }
        //for the three bellow make sure to check the reaction that sets them after the column changes
        me.cellRenderer = function(params) {
            return '<span class="rag-element">'+params.value?params.value:''+'</span>';
        };
        me.cellValueChanged = function ({api, colDef, column, columnApi, context, data, newValue, node, oldValue}) {
            //me.root.spreadsheet.currentSheet.changeMainDataArray(node.rowIndex + 1, colDef.index, newValue);
        };
        me.cellClassRules = {
            'rag-red-text-outer': function(params) { return (!validator(params)) }
        }
    }
    @observable index;
    @observable headerLabel;
    @observable headerName;
    @observable field;
    @observable editable;
    @observable checked;
    @observable match;
    @observable averageValue;
    @observable type;

    @computed get char (){
        return this.getNameFromNumber(this.index+1);
    }

    @action setColumn(key,value){
        this[key] = value;
        this.root.spreadsheet.currentSheet.triggerChangeArrayData();
    }

    refreshCellEditor(){
        changeCellEditor(this);
    }

    getNameFromNumber(num) {
        var numeric = (num - 1) % 26;
        var letter = String.fromCharCode(65 + numeric);
        var num2 = parseInt((num - 1) / 26);
        if (num2 > 0) {
            return this.getNameFromNumber(num2) + letter;
        } else {
            return letter;
        }
    }

}
function changeCellEditor(me) {
    var type = me.type;
    if(type=='extraction'){
        me.cellEditor = "agSelectCellEditor";
        me.cellEditorParams = {values: ["Maceration", "Ultrasound"]}
    } else {
        me.cellEditor = "agTextCellEditor";
        me.cellEditorParams = {};
    }
}
function validator(params){
    var isValid = true;
    var value = params.value+"";
    var type = params.colDef.type;

    if(type=='extraction'){  //lat
        isValid = ["Maceration", "Ultrasound"].includes(value);
    } else if (type=='text') {  //text
        isValid = true;
    } else if (type=='unique'){
        isValid = true;
    }
    return isValid;
}
export default ColumnModel;