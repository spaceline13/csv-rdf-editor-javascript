import { css } from "@emotion/core";

const Disabled = css`
   cursor: not-allowed;
   border: 1px solid #999999;
   background-color: #cccccc;
   color: #666666;
   & :hover {
        cursor: not-allowed;
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
   };
   & :disabled {
        cursor: not-allowed;
        border: 1px solid #999999;
        background-color: #cccccc;
   };
`;

export default Disabled;