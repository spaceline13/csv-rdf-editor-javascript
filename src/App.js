import React from 'react';
import RootModel from "./models/RootModel";
import Grid from '@material-ui/core/Grid';
import StepWizard from "react-step-wizard";
import Upload from "./views/Upload";
import DataGrid from "./views/DataGrid";
import SheetsAndColumns from "./views/SheetsAndColumns";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#62a9f3',
        }
    }
});

const ExcelContext = React.createContext(new RootModel());
const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <StepWizard isHashEnabled={true}>
                        <Upload hashKey={'upload'}/>
                        <SheetsAndColumns hashKey={'headers'}/>
                        <DataGrid hashKey={'grid'}/>
                    </StepWizard>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
};
export {ExcelContext};
export default App;