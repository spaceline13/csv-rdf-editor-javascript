import React from "react";
import styled from '@emotion/styled';

const SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm","json"
].map(function(x) { return "." + x; }).join(",");

const DataInput = (props) => {
    return (
        <form className="form-inline">
            <div className="form-group">
                <UploadButton>
                    <UploadIcon className="fa fa-file-upload"></UploadIcon>
                    <InputButton type="file" className="form-control" id="file" accept={SheetJSFT} onChange={(e)=>{const files=e.target.files; if(files&&files[0]) props.handleFile(files[0]);}} />
                </UploadButton>
            </div>
        </form>
    );
};
const UploadIcon = styled.i`
    font-size: 40px;
`;
const UploadButton = styled.label`
    font-size: 16px;
    position: relative;
    top: 10px;
    right: 15px;
    font-family: Roboto;
    font-weight: 600;
    color: #6D6E71;
    text-align: center;
    background-color: #3f69b5;
    border: 1px solid #3f69b5;
    color: white;
    padding: 20px 40px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    letter-spacing: 1px;
    border-radius: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-transition: 0.2s linear;
    -moz-transition: 0.2s linear;
    -ms-transition: 0.2s linear;
    -o-transition: 0.2s linear;
    transition: 0.2s linear;
    &:hover {
        color: #3f69b5;
        background-color: #ffffff;
    }
`;
const InputButton = styled.input`
    display: none;
`;
export default DataInput;