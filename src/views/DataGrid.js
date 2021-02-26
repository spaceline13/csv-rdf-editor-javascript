import React from 'react';
import {observer} from "mobx-react-lite";
import { ExcelContext } from "../App";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from '@material-ui/core/TextField';
import styled from "@emotion/styled";
import Infobox from "../components/Infobox";
import Descriptions from "../components/Descriptions";

const DataGrid = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    const sheet = rootContext.spreadsheet.currentSheet;
    const onGridReady = function(params){
        rootContext.spreadsheet.gridApi = params.api;
    };
    if(sheet && sheet.visible) {
        return (
            <center>
                <Container>
                    <Infobox>You can edit your data by double clicking on each cell and/or add user estimates
                        for the columns that have not been matched on the text inputs in the bottom of the page.
                    </Infobox>
                    <AgGridContainer className="ag-theme-balham">
                        <AgGridGreyInfoHeader>TEXT</AgGridGreyInfoHeader>
                        {sheet &&
                        <AgGridReact
                            onGridReady={onGridReady}
                            columnDefs={sheet.colDefs}
                            rowData={sheet.arrayData}
                            enableColResize={true}>
                        </AgGridReact>
                        }
                    </AgGridContainer>
                    <DownloadButton onClick={(e)=>{sheet.downloadSheet()}}>Download XLSX</DownloadButton>
                    <MarginTopDiv>
                        <MainGrid container spacing={16}>
                            <Grid item xs={1}>
                                <BackButton onClick={() => {
                                    props.previousStep();
                                }}><i className="fas fa-chevron-left"></i> &nbsp; Back</BackButton>
                            </Grid>
                            <Grid item xs={10}></Grid>
                            <Grid item xs={1}>
                                <NextButton onClick={() => {
                                    sheet.callAPI();
                                    //props.nextStep();
                                }}>Next &nbsp; <i className="fas fa-chevron-right"></i></NextButton>
                            </Grid>
                        </MainGrid>
                    </MarginTopDiv>
                </Container>
            </center>
        );
    } else {
        return (<div></div>);
    }
});

const Container = styled.div`
    max-width: 1400px; 
    text-align: left;
`;
const AgGridContainer = styled.div`
    height: 60vh;
    width: 100%;
    font-family: Roboto;
    margin-top: 6px;
    
    & .ag-header-cell-label{
        font-size: 20px;
    }

    & .ag-cell{
        font-size: 18px;
        font-family: Roboto;
    }
`;
const AgGridGreyInfoHeader = styled.div`
    background: #f5f7f7;
    border: 1px solid #bdc3c7;
    font-size: 18px;
    padding: 5px 14px;
    color: #707271;
    font-family: Roboto;    
`;
const DownloadButton = styled(Button)`
    width: 100%;
    margin-top: 34px!important;
    border: 1px solid lightgrey!important;
    background: #fffffe;
    color: #283163!important;
`;
const MarginTopDiv = styled.div`
    margin-top: -20px;
`;
const MainGrid = styled(Grid)`
    margin-top: 5px;
`;
const BackButton = styled(Button)`
    font-family: Roboto;
    float: left;
    margin-top: 36px;
`;
const NextButton = styled(Button)`
    font-family: Roboto;
    float: right;
    margin-top: 36px;
`;
const MissingValuesTable = styled.table`
    background: #f5f7f7;
    color: #ff5252;
    margin-top: 20px;
    font-family: Roboto;
`;
const ExclamationIcon = styled.i`
    font-size: 40px;
    margin: 10px 20px;
`;
const TDMessage = styled.td`
    padding-right: 18px;
`;
const AverageValuesContainer = styled.span`
    margin-right: 10px;
    font-family: Roboto;
`;
const AverageValuesTextField = styled(TextField)`
    width: 180px;
`;

export default DataGrid;