import FileModel from './FileModel';
import SpreadsheetModel from "./SpreadsheetModel";
import GlobalsModel from "./GlobalsModel";

class RootModel {
    constructor() {
        this.spreadsheet = new SpreadsheetModel(this);
        this.file = new FileModel(this);
        this.globals = new GlobalsModel();
    }
}

export default RootModel;