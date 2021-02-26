import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import styled from '@emotion/styled';

const Infobox =(props)=>{

    return (
        <InfoboxMain>
            <MainGrid container>
                <Grid item xs={1}>
                    <CircleIcon className="fa fa-info-circle"></CircleIcon>
                </Grid>
                <Grid item xs={11}>
                    <InfoboxContents>
                        {props.children}
                    </InfoboxContents>
                </Grid>
            </MainGrid>
        </InfoboxMain>
    );
};
const InfoboxMain = styled.div`
    font-family: Roboto;
    letter-spacing: 0.5px;
    font-weight: 400;
    line-height: 22px;
    padding-left: 20px;
    border: 1px solid #3f79b5;
    padding: 13px;
    background: #fafcff;
    margin: 10px 0px;
`;
const MainGrid = styled(Grid)`
    margin-top: 5px;
`;
const CircleIcon = styled.i`
    font-size: 30px;
    margin: 5px 20px;
`;
const InfoboxContents = styled.div`
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-left: -32px;
`;
export default Infobox;