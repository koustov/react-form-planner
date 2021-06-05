import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';

import styled from 'styled-components';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const FPFormControlLabel = styled(FormControlLabel)``;

export const FPCheckbox = styled(Checkbox)``;

export const FPTextField = styled(TextField)`
margin: 8px;
`;

export const FPHeaderField = styled.div`
display: flex;
font-size: 18px;
font-weight: 700;
`;

export const FPLabelField = styled.label`
margin: 8px;
`;

export const FPListItem = styled(ListItem)`
  height: 30px;
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
