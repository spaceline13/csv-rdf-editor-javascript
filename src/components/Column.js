import React from "react";
import styled from '@emotion/styled';
import {observer} from "mobx-react-lite";
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";

const Column = observer(({sheet,globals})=>{
    return (
        <div>
            {sheet.inputFileColumns.length>0?
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <NoBulletUL>
                                {sheet.inputFileColumns.map((header, i) =>
                                    <li key={i}>
                                        <ColoredCheckbox defaultChecked={header.checked} onChange={(e)=>{header.setColumn('checked',e.target.checked)}}/>
                                        <SheetHeader>{header.char}  ({header.headerLabel})</SheetHeader>&nbsp;
                                        {header.checked?
                                            <span>
                                                &nbsp; can be matched with: &nbsp;
                                                <Select
                                                    value={header.match}
                                                    onChange={(e)=>{
                                                        header.setColumn('match',e.target.value);
                                                        header.setColumn('headerName', e.target.value);
                                                        header.setColumn('field', e.target.value);
                                                        header.setColumn('type', globals.fields[e.target.value].type);
                                                        header.refreshCellEditor();
                                                        e.stopPropagation();
                                                        return false;
                                                    }}
                                                    inputProps={{
                                                        name: 'Choose an existing dataset',
                                                        id: 'existing-dataset',
                                                    }}
                                                >
                                                    {Object.keys(globals.fields).map(function(key){
                                                        return <MenuItem value={key}>{globals.fields[key].name}</MenuItem>;
                                                    })}
                                                </Select>
                                            </span>
                                        :
                                            <span></span>
                                        }
                                    </li>
                                )}
                             </NoBulletUL>
                        </td>
                    </tr>
                    </tbody>
                </table>
            :
                <div>No headers to show</div>
            }
        </div>
    );
})
const NoBulletUL = styled.ul`
    list-style:none;
`;
const ColoredCheckbox = styled(Checkbox)`
    color: #ffa44a!important;
`;
const SheetHeader = styled.b`
    font-family: Roboto;
`;
export default Column;