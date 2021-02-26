import {computed, observable,action} from "mobx";
import ColumnModel from "./ColumnModel";
import XLSX from 'xlsx';
import fileDownload from 'js-file-download';

class SheetModel {
    constructor(root,name,index,contents){
        var me = this;
        this.root = root;
        this.name = name;
        this.index = index;
        this.contents = XLSX.utils.sheet_to_json(contents, {header:1});
        var headers = this.contents[0];
        //set template columns
        var count = 0;
        for (var key in this.root.globals.fields){
            this.templateColumns.push(new ColumnModel(
                {
                    headerName:key,
                    headerLabel: key,
                    field: key,
                    editable:true,
                    type:this.root.globals.fields[key].type
                }, count, this.root, 'template'
            ));
            count++;
        }
        //set excel input file columns
        headers.map(function (header,index) { me.inputFileColumns.push(new ColumnModel({
            headerName:header,
            headerLabel: header,
            field: "field"+index,
            editable: true,
            index: index
        },index,root, 'inputFile')) }); //columns

        this.loaded = true;
    }
    contents = null;
    @observable name;
    @observable index;
    templateColumns = [];
    inputFileColumns = [];
    @observable exportProgress = 0;
    @observable visible = false;
    @observable loaded = false;
    @observable arrayDataChanges = 0;
    /*@computed get checkedColumns(){
        return this.columns.filter(function(column){ return column.checked });
    }*/
    // some third party components need the .label prop to work, that's why we make this computed
    @computed get label(){
        return this.name;
    }
    @computed get colDefs(){
        var arr = this.templateColumns;
        //run through the excel file columns
        this.inputFileColumns.map(function(inputColumn,index){
            //if the column has been marked by user to be matched
            if(inputColumn.match){
                //find the header from the template that needs to be matched to
                var templateHeaderIndex = arr.findIndex(function(tcol){
                    return tcol.headerName == inputColumn.match;
                });
                // set the output array to contain the excel file header instead of this(template) header
                arr[templateHeaderIndex] = inputColumn;
            }
        });
        return arr;
    }
    @computed get arrayData(){
        this.arrayDataChanges; // to trigger the computed on the change of the observable
        var out = [];
        var curRow = [];
        var columns = this.colDefs;
        var data = this.contents;
        const rowsNum = data.length;
        if(columns.length>0) {
            //rows
            for (var i = 1; i < rowsNum; i++) {
                curRow = {};
                for(var j=0;j<columns.length;j++){
                    curRow[columns[j].field] = columns[j].checked?data[i][columns[j].index]:(columns[j].type=='bool'?getBoolAverage(i,columns[j].averageValue,rowsNum):columns[j].averageValue);
                }
                if (curRow != {}) {
                    out.push(curRow);
                }
            }
        }
        return out;
    }
    //for custom refresh of the ArrayData (hopefully not needed) - has an observable named arrayDataChanges that needs to be uncommented
    @action triggerChangeArrayData(){
        this.arrayDataChanges++;
    }
    @action setVisibility(vis){
        this.visible = vis;
        console.log(this.colDefs);
    }
    @action changeMainDataArray(row,col,value){
        this.contents[row][col] = value;
    }
    @action downloadSheet(){
        XLSX.writeFile({ SheetNames:[this.name], Sheets:{[this.name]:XLSX.utils.aoa_to_sheet(formatDataForXLSX(this.colDefs,this.arrayData))}}, this.root.file.originalFile.name+'_edited.xlsx');
    }
    @action callAPI(){
        var me = this;
        fetch('http://148.251.22.254:8080/rdfization-1.0/convert/model2rdf?model=apigea', {
            method: 'POST',
            headers: {
                'Accept': 'application/rdf+xml',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.arrayData)
        }).then(async function(res){
            var rdfBlob = await res.blob();
            fileDownload(rdfBlob, me.root.file.originalFile.name+'.rdf');
        });
    }
}
function getBoolAverage(index,average,rowsNum) {
    const trueRows = parseInt(average) * rowsNum / 100;
    if(average!='') {
        if (index <= trueRows) {
            return 'true';
        } else {
            return 'false';
        }
    }else{
        return '';
    }
}
function formatDataForOriginalFileDownload(columns,data){
    var out = [];
    var curRow = [];
    if(columns.length>0) {
        //rows
        for (var i = 1; i < data.length; i++) {
            curRow = {};
            for(var j=0;j<columns.length;j++){
                curRow[columns[j].field] = columns[j].checked?data[i][columns[j].index]:"";
            }
            if (curRow != {}) {
                out.push(curRow);
            }
        }
    }
    return out;
}
function formatDataForXLSX(columnDefs,rowData){
    var curRow = [];
    var output = [];
    columnDefs.forEach(column=>{
        curRow.push(column.headerName);
    })
    output.push(curRow);
    rowData.forEach(row=>{
        curRow = [];
        for(var col in row){
            curRow.push(row[col]);
        }
        output.push(curRow);
    });
    return output;
}

export default SheetModel;
