import React from "react";
import {ExcelContext} from "../App";
import {observer} from "mobx-react-lite";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Column from '../components/Column';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid/Grid";
import Infobox from "../components/Infobox";
import styled from "@emotion/styled";
import Descriptions from "../components/Descriptions";

const SheetsAndColumns = observer((props)=>{
    const rootContext = React.useContext(ExcelContext);
    const sheet = rootContext.spreadsheet.currentSheet;

    if(sheet && sheet.loaded) {
        return (
            <center>
                <Container>
                    <div>
                        {rootContext.file.fileLoaded ?
                            <TextAlignLeft>
                                <Infobox> Match your file's columns with the columns that are essential for the tool</Infobox>
                                {rootContext.spreadsheet.sheets.length > 0 ?
                                    <MainGrid container spacing={16}>
                                        <SubGrid item xs={7}>
                                            <SheetSelection>
                                                <Tabs
                                                    style={sheet.exportProgress == 0 ? {opacity: '1'} : {opacity: '0.1'}}
                                                    onSelect={(index, lastIndex) => {
                                                        rootContext.spreadsheet.setCurrentSheetIndex(index);
                                                    }}>
                                                    <TabList>
                                                        {rootContext.spreadsheet.sheets.map((sheet, i) =>
                                                            <Tab key={i}>{sheet.label}
                                                                <i className="far fa-file" style={{marginLeft: '8px'}}></i>
                                                            </Tab>
                                                        )}
                                                    </TabList>
                                                    {rootContext.spreadsheet.sheets.map((sheet, i) =>
                                                        <TabPanel key={i}>
                                                            <ColumnName>Column name</ColumnName>
                                                            <Column sheet={sheet} globals={rootContext.globals}/>
                                                        </TabPanel>
                                                    )}
                                                </Tabs>
                                            </SheetSelection>
                                        </SubGrid>
                                        <SubGrid item xs={5}>
                                            <Descriptions fields={rootContext.globals.fields}/>
                                        </SubGrid>
                                    </MainGrid>
                                    :
                                    <div>Loading file...</div>
                                }

                            </TextAlignLeft>
                            :
                            <div></div>
                        }
                    </div>
                    <BackButton onClick={() => {
                        window.location.href = '/'
                    }}><i className="fas fa-chevron-left"></i> &nbsp; Back</BackButton>
                    <NextButton onClick={() => {
                        sheet.setVisibility(true);
                        props.nextStep()
                    }}>Next &nbsp; <i className="fas fa-chevron-right"></i></NextButton>
                </Container>
            </center>
        );
    } else {
        return (<div>Loading...</div>);
    }
});
const Container = styled.div`
    max-width: 1400px;
`;
const TextAlignLeft = styled.div`
    text-align: left;
`;
const MainGrid = styled(Grid)`
    margin-top: 5px;
`;
const SubGrid = styled(Grid)`
    font-family: Roboto;
    & ul {
        padding-left: unset !important;
    }
`;
const SheetSelection = styled.div`
    height: 60vh;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding-bottom: 20px;
`;
const ColumnName = styled.div`
    margin-left: 16px;
    margin-top: 26px;
    font-size: 18px;
    font-weight: 500;
    font-family: Roboto;
`;
const BackButton = styled(Button)`
    float:left;
`;
const NextButton = styled(Button)`
    float:right;
`;
export default SheetsAndColumns;