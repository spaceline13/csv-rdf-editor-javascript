import React from "react";
import styled from '@emotion/styled';
import Paper from "@material-ui/core/Paper/Paper";

const Descriptions = ({fields,gridPage}) => {
    const SheetSelection = styled.div`
        height: ${gridPage?'200px':'60vh'};
        overflow-y: scroll;
        border: 1px solid #ccc;
        padding-bottom: 20px;
    `;
    return (
        <div>
            {gridPage&&<Header><Contents>Field Descriptions</Contents></Header>}
            <SheetSelection>
                {Object.keys(fields).map((key)=>
                    <Description>
                        <b>{gridPage?key:fields[key].name}</b><br/>
                        {fields[key].description}
                    </Description>
                )}
            </SheetSelection>
        </div>
    );
};
const Contents = styled.span`
    margin-left: 20px;
`;
const Header = styled.div`
    background: #f5f7f7;
    color: #ff5252;
    margin-top: 20px;
    font-family: Roboto;
    width: 100%;
    padding: 23px 0px;
    margin-bottom: 10px;
`;
const Description = styled(Paper)`
    margin: 10px; 
    padding: 10px;
`;
export default Descriptions;