import React, {Component} from "react";
import styled from '@emotion/styled';

const DragDropFile = (props) => {
    return (
        <DragArea onDrop={(e)=>{const files=e.dataTransfer.files; if(files&&files[0]) props.handleFile(files[0]);}} onDragEnter={(e)=>{e.stopPropagation(); e.preventDefault();}} onDragOver={(e)=>{e.stopPropagation(); e.preventDefault();}}>
            <Header className={'dnd-head'}>Drag & Drop files</Header>
            {props.children}
        </DragArea>
    );
};
const DragArea = styled.div`
    min-height: 200px; 
    border: 1px dotted grey;
    margin-top:20px;
`;
const Header = styled.span`
    position: relative;
    top: -10px;
    left: 5px;
    background: white;
    padding: 5px;
    font-family: Roboto;
`;
export default DragDropFile;