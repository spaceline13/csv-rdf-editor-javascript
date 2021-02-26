import React from 'react';
import DragDropFile from '../components/DragDropFile';
import DataInput from '../components/DataInput';
import {observer} from "mobx-react-lite";
import {ExcelContext} from "../App";
import Grid from "@material-ui/core/Grid/Grid";
import Button from '@material-ui/core/Button';
import Infobox from "../components/Infobox";
import styled from "@emotion/styled";

const Upload = observer((props)=> {
    const rootContext = React.useContext(ExcelContext);
    return (
        <div>
            <center>
                {!rootContext.file.showFileIsLoading ?
                    <Container>
                        <Infobox>Please Upload your spreadsheet (xls, xlsx or csv) and make sure that all the columns
                            have a name in the first row. Please NOTE that the service will not work correctly if there
                            are no names for the columns in the first row of your file. The max size of the file is
                            10MB
                        </Infobox>
                        <DragDropFile handleFile={(file) => {
                            rootContext.file.openFile(file, props.nextStep);
                        }}>
                            <br/><br/><br/>
                            <center>
                                <DataInput handleFile={(file) => {
                                    rootContext.file.openFile(file, props.nextStep);
                                }}/>
                            </center>
                        </DragDropFile>
                    </Container>
                    :
                    <div>Your file is being processed</div>
                }
            </center>
        </div>
    );
});
const Container = styled.div`
    max-width: 1400px; 
    text-align: left;
`;
const MainGrid = styled(Grid)`
    margin-top: 5px;
`;
const DownloadTemplateGrid = styled(Grid)`
    font-size: 20px; 
    text-align: center;
`;
const DownloadTemplateButton = styled(Button)`
    margin-top: 10px;
`;
const DownloadIcon = styled.i`
    font-size: 20px;
`;
const UseExistingDatasetGrid = styled(Grid)`
    border-left: 1px solid grey;
    border-right: 1px solid grey;
    text-align: center;
`;
const MobileAssistantGrid = styled(Grid)`
    font-size: 20px; 
    text-align: center;
`;
const MobileAssistantButton = styled(Button)`
    margin-top: 10px;
`;
const MobileIcon = styled.i`
    font-size: 20px;
`;
export default Upload;