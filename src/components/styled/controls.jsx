import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  BottomNavigation,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
  Radio,
  RadioGroup,
  TextField,
  Autocomplete
} from '@mui/material'

import styled, { css } from 'styled-components'
import { getThemeData } from '../../services/utils'

export const FPBottomNavigation = styled(BottomNavigation)`
  background: transparent;
  display: flex;
  height: 100%;
  color: ${(props) =>
    getThemeData(props.theme, 'colors.primaryText')} !important;
  > button {
    flex: 1;
    display: flex;
  }
`

export const FPSquareActionButton = styled.button`
  background: ${(props) =>
    props.selected
      ? getThemeData(props.theme, 'colors.primaryText')
      : 'transparent'};
  color: ${(props) =>
    props.selected
      ? '#454545'
      : getThemeData(props.theme, 'colors.primaryText')};
  outline: none;
  height: 80px;
  width: 100%;
  border: thin solid ${({ theme }) => getThemeData(theme, 'colors.primaryText')};
  border-radius: 4px;
  cursor: pointer;
  > div:nth-child(1) {
    font-size: 1.2rem;
  }
  div {
    display: flex;
    flex: 1;

    justify-content: center;
    align-items: center;
  }
  flex: 1;
  display: flex !important;
  transition: all 1sec;
  flex-direction: column;
  position: relative;
  display: block;
  margin: 0 2px;

  justify-content: center;
  align-items: center;

  padding: 10rem / @hfs 20rem / @hfs;
  text-transform: uppercase;
  overflow: hidden;
  :disabled {
    color: #787878;
    border-color: #787878;
    cursor: not-allowed;
  }
  &:before {
    box-sizing: border-box;
    transform: translateX(100%);
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 99.5%;
    height: 2px;
    border-bottom: 2px solid transparent;
    border-left: 2px solid transparent;
    border-radius: 4px;
  }

  &:after {
    box-sizing: border-box;
    transform: translateX(-100%);
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99.5%;
    height: 2px;
    border-top: 1px solid transparent;
    border-right: 1px solid transparent;
    border-radius: 4px;
  }

  &:not([disabled]):hover {
    color: ${(props) =>
      props.selected
        ? '#454545'
        : getThemeData(props.theme, 'colors.primaryText')};
    text-decoration: none;
    backdrop-filter: blur(
      ${({ theme }) => getThemeData(theme, 'colors.card.blur') || '0px'}
    );
    &:before {
      transition: 0.1s transform linear, 0.1s height linear 0.1s;
      transform: translateX(0);
      height: 100%;
      border-color: ${(props) =>
        getThemeData(props.theme, 'colors.primaryText')};
      border-radius: 4px;
    }
    &:after {
      transition: 0.1s transform linear 0.2s, 0.1s height linear 0.3s;
      transform: translateX(0);
      height: 100%;
      border-color: ${(props) =>
        getThemeData(props.theme, 'colors.primaryText')};
      border-radius: 4px;
    }
  }
`

export const FPAccordion = styled(Accordion)`
  height: ${(props) => (props.expanded ? '100%' : 'auto')};
  background: transparent !important;
  color: ${(props) =>
    getThemeData(props.theme, 'colors.primaryText')} !important;
`

export const FPAccordionSummary = styled(AccordionSummary)`
  /* height: 30px; */
  /* min-height: unset; */
  .MuiAccordionSummary-root.Mui-expanded {
    min-height: unset !important;
  }
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
  .MuiAccordionSummary-expandIconWrapper {
    color: ${(props) =>
      getThemeData(props.theme, 'colors.primaryText')} !important;
  }
`

export const FPAccordionDetails = styled(AccordionDetails)`
  padding: 0px !important;
`

export const FPToolButton = styled(Button)`
  border-radius: 0px 0px 0px 0px !important;
  border: 1px solid
    ${(props) => getThemeData(props.theme, 'colors.primaryButton')} !important;
  color: ${(props) =>
    getThemeData(props.theme, 'colors.primaryButton')} !important;
  background: transparent !important;

  &:hover {
    color: ${(props) =>
      getThemeData(props.theme, 'colors.primaryButtonText')} !important;
    background: ${(props) =>
      getThemeData(props.theme, 'colors.primaryButton')} !important;
  }
  color: ${(props) =>
    getThemeData(props.theme, 'colors.primaryText')} !important;
  width: 10px;
  transition: width 0.5s ease-out;
  &:first-child {
    border-top-left-radius: ${(props) =>
      props.anchor === 'bottom' ? '8px' : '0px'} !important;
    border-bottom-left-radius: ${(props) =>
      props.anchor === 'bottom' ? '0px' : '8px'} !important;
  }

  &:last-child {
    border-top-right-radius: ${(props) =>
      props.anchor === 'bottom' ? '8px' : '0px'} !important;
    border-bottom-right-radius: ${(props) =>
      props.anchor === 'bottom' ? '0px' : '8px'} !important;
  }

  &:disabled {
    background: #787878 !important;
  }

  svg {
    margin-right: 8px;
  }
`

export const FPFormControlLabel = styled(FormControlLabel)`
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPFormLabel = styled(FormLabel)`
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPCheckbox = styled(Checkbox)``
export const FPRadio = styled(Radio)``

export const FPRadioGroup = styled(RadioGroup)``

export const FPTextField = styled(TextField)`
  width: 100%;
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    legend {
      color: ${({ theme }) =>
        getThemeData(theme, 'colors.input.placeholder')} !important;
    }
  }

  .MuiInput-underline:before {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }
  .MuiInputBase-input {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.placeholder')} !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
`

export const FPSelect = styled(Autocomplete)`
  width: 100%;
  .MuiInputBase-fullWidth {
    padding: 1px !important;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    legend {
      color: ${({ theme }) =>
        getThemeData(theme, 'colors.input.border')} !important;
    }
  }
  .MuiPopover-paper {
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}}
    ) !important;
  }

  .MuiInput-underline:before {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }
  .MuiInputBase-input {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    margin: unset !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }

  .MuiSvgIcon-root {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
    top: -6px !important;
  }
`

export const FPSelectWrapper = styled.div`
  width: 100%;
  div[role='presentation'],
  div[role='presentation'] div {
    background: ${(props) =>
      getThemeData(props.theme, 'colors.card.start')} !important;
    color: ${(props) =>
      getThemeData(props.theme, 'colors.primaryText')} !important;
  }
`

export const FPLabelField = styled.div`
  margin: 8px;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPHeaderField = styled(FPLabelField)`
  display: flex;
  font-size: 18px;
  font-weight: 700;
`

export const FPListItem = styled(ListItem)`
  height: 30px;
  width: 100%;
  border-left: 2px solid transparent;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  .MuiListItemIcon-root {
    color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  }
  :hover {
    border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
  }
`

export const FPListIcon = styled(ListItemIcon)`
  min-width: unset !important;
  .MuiListItemIcon-root {
    min-width: unset !important;
  }
  margin-right: 16px;
  font-size: 12px !important;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPListItemText = styled(ListItemText)`
  font-size: 12px !important;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPHoverButton = styled.button`
  margin-right: 16px !important;
  height: 40px;
  width: 40px;
  border-radius: 50% !important;
  border: 1px solid #454545 !important;
  min-width: unset !important;
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
  ${(props) =>
    props.bordered &&
    css`
      border: 1px solid;
    `}
  border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  margin-inline-start: 0px;
  width: 100%;
  margin: 0px !important;
  margin-inline-end: 0px;
  min-inline-size: 0px;
  padding-block-start: 0px;
  padding-block-end: 0px;
  padding-inline: 0px;
  legend {
    padding: 0px 4px;
    margin-left: 10px;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
`

export const FPGridRow = styled.div`
  /* border-bottom: 1px solid; */
  /* border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important; */
  padding: 0.5rem;
  display: flex;
  height: 50px;
`

export const FPGridHeaderRow = styled(FPGridRow)`
  border-bottom: 2px solid;
  height: 30px;
`

export const FPGridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2px 1rem;
`
export const FPGridActionCell = styled(FPGridCell)`
  flex: 0;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0px 8px;
  align-items: center;
  div {
  }
`

export const FVFormControlLabel = styled(FormControlLabel)`
  flex: 1;
  height: 100%;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`
export const FVFormControlSimple = styled(FormControl)`
  width: -webkit-fill-available;
  padding: 0px !important;
  border: 0px !important;
  border-color: none !important;
  padding: 0 !important;
  .MuiInputLabel-outlined {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.placeholder')} !important;
  }
`

export const FVFormControl = styled(FVFormControlSimple)`
  border-radius: 5px;
  padding: 8px !important;
  border: 1px solid !important;
  border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important;
  padding: 0px 8px 2px 8px !important;
  top: -5px !important;
`

export const FVFormLabel = styled(FormLabel)`
  text-align: initial;
  color: ${(props) =>
    getThemeData(props.theme, 'colors.primaryText')} !important;
  padding: 0px 4px !important;
  font-size: 0.75em !important;
`

export const FVCheckbox = styled.div`
  display: block;
  margin-bottom: 15px;

  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;
  }
  label {
    position: relative;
    color: ${({ theme }) => getThemeData(theme, 'colors.primaryText')};
    cursor: pointer;
  }

  label:before {
    content: '';
    -webkit-appearance: none;
    background-color: transparent;
    border-radius: 4px;
    border: 2px solid
      ${({ theme }) => getThemeData(theme, 'colors.input.border')};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
      inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
  }

  input:checked + label:after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 6px;
    height: 14px;
    border: solid ${({ theme }) => getThemeData(theme, 'colors.input.border')};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`
export const FVRadio = styled(Radio)`
  color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important;
  .MuiIconButton-label {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.color')} !important;
  }
  .PrivateSwitchBase-input {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }
  .MuiTouchRipple-root {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }
`

export const FVRadioGroup = styled(RadioGroup)`
  flex-direction: 'column' !important;

  /* height: ${(props) => (props.multiline ? '40px' : 'unset')}; */
`

export const FVTextField = styled(TextField)`
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    border-color: ${(props) => props.error && 'red'} !important;
  }

  .MuiInput-underline:before {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    border-color: ${(props) => props.error && 'red'} !important;
  }

  .MuiInputLabel-animated {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
  }
  .MuiInputBase-input {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.placeholder')} !important;
  }

  .MuiInputLabel-outlined {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
  input {
    ::-webkit-calendar-picker-indicator {
      cursor: pointer;
      filter: invert(1);
    }
  }
`

export const FVColorField = styled(TextField)`
  width: 200px !important;
  padding: 0px !important;
  height: 40px !important;
  label {
    display: none !important;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: transparent !important;
    border-color: transparent !important;
  }

  .MuiInput-underline:before {
    border-color: transparent !important;
    border-color: transparent !important;
  }

  .MuiInputLabel-animated {
    color: transparent !important;
  }
  .MuiInputBase-input {
    color: transparent !important;
  }

  .MuiInputLabel-outlined {
    color: transparent !important;
  }
  input {
    padding: 0px !important;
    height: 40px !important;
    width: 150px !important;
  }
`
export const FVMenu = styled(Menu)`
  background: transparent !important;
  box-sizing: border-box !important;
  .MuiMenu-list {
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}
    ) !important;
  }
  backdrop-filter: blur(
    ${({ theme }) => getThemeData(theme, 'colors.card.blur') || '0px'}
  );
`
export const FVMenuItem = styled(MenuItem)`
  .MuiMenuItem-root {
    background: ${(props) =>
      props.theme.colors[
        props.elevation ? `background${props.elevation}` : `background1`
      ]} !important;
  }
  .MuiListItemText-root {
    color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  }
  .MuiListItemIcon-root {
    color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  }
`
export const FVInputLabel = styled(InputLabel)``

export const FVLabelField = styled.div`
  margin: 8px;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FVTitleField = styled(FVLabelField)`
  display: flex;
  font-size: 25px;
  font-weight: 700;
  mix-blend-mode: exclusion;
`

export const FVDescriptionField = styled(FVLabelField)`
  display: flex;
  font-size: 20px;
  font-weight: 500;
  mix-blend-mode: exclusion;
`

export const FVHeaderField = styled(FVLabelField)`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FVListItem = styled(ListItem)`
  height: 30px;
  border-left: 2px solid transparent;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  .MuiListItemIcon-root {
    color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
  }
  :hover {
    border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
  }
`

export const FVListIcon = styled(ListItemIcon)`
  min-width: unset;
  margin-right: 16px;
  font-size: 12px !important;
`

export const FVListItemText = styled(ListItemText)`
  font-size: 12px !important;
`

export const FVHoverButton = styled.button`
  margin-right: 16px !important;
  height: 40px;
  width: 40px;
  border-radius: 50% !important;
  border: 1px solid #454545 !important;
  min-width: unset !important;
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
export const FVFieldSet = styled.fieldset`
  border: none;
  width: 100%;
  ${(props) =>
    props.bordered &&
    css`
      border: 1px solid;
    `}
  border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border-radius: 4px;
  margin-inline-start: 0px;
  width: 100%;
  margin: 0px !important;
  margin-inline-end: 0px;
  min-inline-size: 0px;
  padding-block-start: 0px;
  padding-block-end: 0px;
  padding-inline: 0px;
  legend {
    padding: 0px 4px;
    margin-left: 10px;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
`

export const FVGridRow = styled.div`
  /* border-bottom: 1px solid; */
  /* border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important; */
  display: flex;
  height: 50px;
`

export const FVGridHeaderRow = styled(FVGridRow)`
  border-bottom: 2px solid;
  height: 30px;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FVGridCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2px 4px;
`
export const FVGridActionCell = styled(FVGridCell)`
  flex: 0;
  width: 50px;
`

export const FVFileUpload = styled.fieldset`
  display: block;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  height: 50px;
  color: white;
  border: 1px solid ${({ theme }) => getThemeData(theme, 'colors.input.border')} !important;
  border-radius: 4px;
  padding: 8px;
  .preview {
    display: flex;
    justify-content: center;
    align-items: 'center';
  }
  .action {
    display: flex;
    div {
      flex: 1;
    }
    .action-button {
      width: 100%;
      height: 100%;
      font-size: 15px;
      display: block;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s ease-out;
    }
  }

  .file {
    opacity: 0;
    width: 0.1px;
    height: 0.1px;
    position: absolute;
  }
  .file-input {
    height: 100%;
  }

  .file-name {
    position: absolute;
    bottom: -35px;
    left: 10px;
    font-size: 0.85rem;
    color: #555;
  }

  input:hover + label,
  input:focus + label {
    transform: scale(1.02);
  }

  /* Adding an outline to the label on focus */
  input:focus + label {
    outline: 1px solid #000;
    outline: -webkit-focus-ring-color auto 2px;
  }
`

export const FVImageUpload = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => getThemeData(theme, 'colors.input.border')} !important;
  border-radius: 4px;
  legend {
    padding: 0px 4px;
    margin-left: 5px;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
  .image-wrapper {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    border: 1px solid
      ${({ theme }) => getThemeData(theme, 'colors.input.border')} !important;
    border-radius: 4px;
    margin: 1rem;
    button {
      position: absolute;
      height: 20px;
      width: 20px;
      min-height: unset;
    }
    .image-container {
      flex: 1;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .footer {
      height: 30px;
      display: flex;
      background: ${({ theme }) =>
        getThemeData(theme, 'colors.background3')} !important;

      div {
        flex: 1;
        text-align: center;
        color: ${({ theme }) =>
          getThemeData(theme, 'colors.listPrimary')} !important;
      }
    }
  }
  .upload-file {
    display: block;
    border: none;
    outline: none;
    background: transparent;
    width: 100px;
    height: 100px;
    color: white;

    padding: 8px;
    .action {
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        flex: 1;
      }
      .action-button {
        width: 100px;
        height: 100px;
        border: 1px solid
          ${({ theme }) => getThemeData(theme, 'colors.input.border')} !important;
        border-radius: 4px;
        font-size: 15px;
        display: block;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.2s ease-out;
      }
    }

    .file {
      opacity: 0;
      width: 0.1px;
      height: 0.1px;
      position: absolute;
    }
    .file-input {
      height: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .file-name {
      position: absolute;
      bottom: -35px;
      left: 10px;
      font-size: 0.85rem;
      color: #555;
    }

    input:hover + label,
    input:focus + label {
      transform: scale(1.02);
    }

    /* Adding an outline to the label on focus */
    input:focus + label {
      outline: 1px solid #000;
      outline: -webkit-focus-ring-color auto 2px;
    }
  }
`
