import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import styled, { css } from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';


import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Select from "@material-ui/core/Select";
import Radio from '@material-ui/core/Radio';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const FPRichTextEditor = styled(ReactQuill)`
width: 100%;
height: 200px;
`;


export const FPFormControlLabel = styled(FormControlLabel)`
color: ${props => props.theme.rfp.colors.primaryText};
`;

export const FPFormLabel = styled(FormLabel)`
color: ${props => props.theme.rfp.colors.primaryText};
`;

export const FPCheckbox = styled(Checkbox)``;
export const FPRadio = styled(Radio)`

`;

export const FPTextField = styled(TextField)`
margin: 8px;
.MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.rfp.colors.input.border} !important;
  }

  .MuiInput-underline:before {
    border-color: ${({ theme }) => theme.rfp.colors.input.border} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) => theme.rfp.colors.input.border} !important;
  }
  .MuiInputBase-input {
    color: ${({ theme }) => theme.rfp.colors.input.placeholder} !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) => theme.rfp.colors.input.placeholder} !important;
  }

`;

export const FPSelect = styled(Select)`
margin: 8px;
.MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.colors.input.border} !important;
  }


  .MuiInput-underline:before {
    border-color: ${({ theme }) => theme.colors.input.border} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) => theme.colors.input.border} !important;
  }
  .MuiInputBase-input {
    color: ${({ theme }) => theme.colors.input.placeholder} !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) => theme.colors.input.placeholder} !important;
  }


`;


export const FPLabelField = styled.div`
margin: 8px;
color: ${props => props.theme.rfp.colors.primaryText};
`;

export const FPHeaderField = styled(FPLabelField)`
display: flex;
font-size: 18px;
font-weight: 700;
`;

export const FPListItem = styled(ListItem)`
  height: 30px;
  border-left: 2px solid transparent;
  color: ${props => props.theme.rfp.colors.primaryButton};
  .MuiListItemIcon-root {
    color: ${props => props.theme.rfp.colors.primaryButton};
  }
  :hover {
    border-color: ${props => props.theme.rfp.colors.border};
  }
`;

export const FPListIcon = styled(ListItemIcon)`
  min-width: unset;
  margin-right: 16px;
  font-size: 12px !important;
`;

export const FPListItemText = styled(ListItemText)`
  font-size: 12px !important;
`;

export const FPHoverButton = styled.button`
  margin-right: 16px !important;
  height: 40px;
  width: 40px;
  border-radius: 50% !important;
  border: 1px solid #454545 !important;
  min-width: unset  !important;
  cursor: pointer !important;
  &:hover {
    background-color: #787878 !important;
    color: #fff !important;
    transition: all 500ms !important;
    border: 1px solid #343434 !important;
  }



  /* margin: 40px;
  border: 2px solid black;
  background-color: transparent;
  color: black;
  width: 30px;
  height: 30px;
  border-radius: 50%; */
  /* text-transform: uppercase;
  font-size: 15px;
  line-height: 1.3;
  cursor: pointer;
  transition: all 500ms;
  background-image: linear-gradient(to bottom, transparent 0%, transparent 50%, black 50%, black 100%);
  background-repeat: no-repeat;
  background-position: 0 0 ;
  background-size: 90px 180px;

  &:hover {
    color: white;
    background-position: 0 -90px ;
  } */
  `

/* Grid */
export const FPFieldSet = styled.fieldset`
  border: none;
  width: 100%;
  ${(props) => props.bordered && css`
  border: 1px solid;`}
  border-color: ${({ theme }) => theme.rfp.colors.input.border} !important;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  >legend {
    padding: 0px 4px;
    margin-left: 30px;
  }
  `;


export const FPGridRow = styled.div`
border-bottom: 1px solid;
border-color: ${({ theme }) => theme.rfp.colors.input.border} !important;
display: flex;
height: 50px;
`;

export const FPGridHeaderRow = styled(FPGridRow)`
border-bottom: 2px solid;
height: 30px;
`;

export const FPGridCell = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex: 1;
padding: 2px 4px;
`;
export const FPGridActionCell = styled(FPGridCell)`
flex: 0;
min-width: 100px;
`;


