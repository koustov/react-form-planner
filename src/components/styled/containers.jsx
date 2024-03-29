import styled, { css } from 'styled-components'

import { Tabs, Tab, Paper, Modal, Grid, Drawer } from '@mui/material'
import { getThemeData } from '../../services/utils'

const BoxSelected = css`
  border-color: #3f51b5;
`

export const FPPaper = styled(Paper)`
  background: transparent !important;
  height: 100% !important;
  box-sizing: border-box !important;
  background: ${(props) =>
    props.theme.colors[
      props.elevation ? `background${props.elevation}` : `background1`
    ]} !important;
  padding: 8px;
  backdrop-filter: blur(
    ${({ theme }) => getThemeData(theme, 'colors.card.blur') || '0px'}
  );
`

export const FPEditorPaper = styled(FPPaper)`
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  ) !important;
`

export const FPTabWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const FPTabPanel = styled.div`
  flex: 1;
  padding: '8px';
  height: 100%;
  > .MuiBox-root {
    height: 100%;
  }
`

export const FPTabs = styled(Tabs)`
  display: flex;
  color: ${({ theme }) => getThemeData(theme, 'colors.ternaryText')} !important;
  .MuiTab-textColorPrimary {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
`

export const FPTab = styled(Tab)`
  display: flex;
  border-color: red;
`

export const FPPlannerWrapper = styled(Grid)`
  overflow: hidden;
  height: 100%;
  padding: 4px;
  background: ${(props) =>
    getThemeData(props.theme, 'colors.background')} !important;
`
export const FPSideBarWrapper = styled(Grid)`
  display: block;
  @media (max-width: 900px) {
    display: none;
  }
`

export const FPSideBarSmall = styled(Grid)`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`
export const FPSideBar = styled(FPPaper)`
  height: 100%;
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  ) !important;
  .fp-side-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    > * {
      width: 100% !important;
    }
    &-header {
      width: 100%;
    }
    &-body {
      width: 100%;
      flex: 1;
      width: 15%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    &-footer {
      width: 100%;
      height: 70px;
      .MuiBottomNavigation-root {
        background: transparent !important;
      }
    }
  }
`

export const FPPlanner = styled(FPPaper)`
  padding: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  height: inherit;
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  ) !important;

  backdrop-filter: blur(
    ${({ theme }) => getThemeData(theme, 'colors.card.blur') || '0px'}
  );
  > * {
    margin: 8px;
  }

  .fp-main-area {
    flex: 1;
    display: flex;
    padding: 8px;
    overflow: hidden;
    > div {
      /* display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px; */
      flex: 1;
      padding: 8px;
      overflow: auto;
      border: 1px solid #787878;
    }
  }
`
export const FPPreviewBox = styled.div`
  height: 100px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #787878;
  background: ${(props) => getThemeData(props.theme, 'colors.modal.bg')};
`

export const FPEModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FPModalLarge = styled.div`
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  ) !important;
  height: 90vh;
  width: 90vw;
`

export const FPPaperVerticalPadding = styled(FPPaper)`
  display: flex;
  flex-direction: column;
  > div {
    padding: 8px;
  }
`

export const FPPaperPadding = styled(FPPaper)`
  > div {
    padding: 8px;
  }
`

export const FPEditorModal = styled(FPPaper)`
  display: flex;
  margin: 8px;
  flex-direction: column;
  height: 100%;
`

export const SmallHeader = styled.div`
  height: 30px;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => getThemeData(props.theme, 'colors.secondaryText')};
`

export const FPMediumHeader = styled(SmallHeader)`
  font-size: 16px;
  color: ${(props) => getThemeData(props.theme, 'colors.primaryText')};
`

export const FPHeaderBar = styled.div`
  height: 20px;
  font-size: 12px;
  display: flex;
  margin: 8px;
  .header-title {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .header-tool-bar {
  }
`
export const FPMediumHeaderBar = styled(FPHeaderBar)`
  height: 45px;
  border-bottom: 1px solid #787878;
`

export const FPFiedlSet = styled.fieldset`
  border: 1px solid transparent;
  border-radius: 4px;
  border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
  height: 100%;
  > legend {
    padding: 0rem 1rem;
    color: ${(props) => getThemeData(props.theme, 'colors.primaryButton')};
    span {
      margin-left: 0.5rem;
    }
  }
`

export const FPInputFiedlSet = styled(FPFiedlSet)`
  border-color: ${(props) => getThemeData(props.theme, 'colors.input.border')};
  > legend {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
  }
`

export const FPDividerField = styled.hr`
  padding: 0;
  border: 0;
  border-top: solid 2px;
  text-align: center;
  border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
  width: 100%;
`

export const FPFormWrapper = styled.div`
  width: 100%;
`
export const FPFormRow = styled.div`
  border-right: 4px solid transparent;
  width: 99%;
  border: 1px solid transparent;
  ${(props) => props.selected && BoxSelected}

  .control-edit-overlay {
    height: ${(props) => (props.editable ? '20px' : '0px')};
  }
  .action-button-wrapper {
    display: none;
  }
  /* .element-wrapper {
    border: 1px solid transparent;
  } */
  &:hover {
    .action-button-wrapper {
      display: ${(props) => (props.editable ? 'flex' : 'none')};
    }
    .element-wrapper {
      border-radius: 4px;
      border: 1px solid
        ${(props) =>
          props.editable && !props.bordered
            ? getThemeData(props.theme, 'colors.primaryText')
            : 'transparent'};
    }
    /* .element-wrapper {
      border-radius: 4px;
      border: 1px solid
        ${(props) =>
      props.editable && !props.bordered
        ? props.theme.colors.primaryText
        : 'transparent'};
    } */
  }
`

export const FPFormColumn = styled.div`
  border: 1px solid transparent;
  position: relative;
  ${(props) =>
    props.editable && props.selected
      ? getThemeData(props.theme, 'colors.primaryText')
      : 'transparent'};
  &:hover {
    border-radius: 4px;
    border: 1px solid
      ${(props) =>
        props.editable && !props.bordered
          ? getThemeData(props.theme, 'colors.primaryText')
          : 'transparent'};
  }
  > .edit-overlay {
    display: ${(props) => (props.editable ? 'block' : 'none')};
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    z-index: 9;
  }
`

export const FPControlEdit = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-left: 2px;
`

export const FPControlEditXXXX = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 50px;
  border-radius: 4px;
  padding: 2px 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #454545;
  flex: 0;

  cursor: pointer;
  ${(props) => props.selected && BoxSelected}
  &:hover {
    .control-editor-main {
      -webkit-filter: blur(2px);
      filter: blur(2px);
      transition: all 0.7s;
    }
  }
  .content-overlay {
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    height: 99%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    -webkit-transition: all 0.4s ease-in-out 0s;
    -moz-transition: all 0.4s ease-in-out 0s;
    transition: all 0.4s ease-in-out 0s;
    z-index: 998;
  }

  &:hover .content-overlay {
    opacity: 1;
  }

  .content-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    top: 80%;
    z-index: 999;
    > * {
      margin: 8px;
    }
  }

  &:hover .content-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }
`

export const FPControlEditBox = styled.div`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
`

export const FPNoContentAvailable = styled.div`
  height: 300px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted ${(props) => getThemeData(props.theme, 'colors.border')};
  border-radius: 4px;
  color: ${({ theme }) => getThemeData(theme, 'colors.secondaryText')};
  width: 100%;
  > div {
    margin-right: 8px;
    color: ${({ theme }) => getThemeData(theme, 'colors.secondaryText')};
    letter-spacing: 4px;
    font-size: 10px;
  }
`

export const FVPaper = styled(Paper)`
  background: ${(props) =>
    props.theme.colors[
      props.elevation ? `background${props.elevation}` : `background1`
    ]} !important;
  padding: 8px;
`

export const FVEditorPaper = styled(FVPaper)`
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}}
  ) !important;
`

export const FVTabWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const FVTabs = styled(Tabs)`
  display: flex;
`

export const FVPlannerWrapper = styled(Grid)`
  height: 100%;
  padding: 4px;
  grid-row-gap: 20px !important;
  background: ${(props) => props.theme.colors.background};
`

export const FVSideBar = styled(FVPaper)`
  height: 100%;
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  );
  .fp-side-bar {
    height: 100%;
    display: flex;
    flex-direction: column;
    > * {
      width: 100% !important;
    }
    &-header {
      width: 100%;
    }
    &-body {
      width: 100%;
      flex: 1;
      width: 15%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    &-footer {
      height: 100px;
      width: 100%;
      padding: 1rem;
    }
  }
`

export const FVPlanner = styled(FVPaper)`
  height: 100%;
  padding: 4px;
  background-image: linear-gradient(
    ${(props) => getThemeData(props.theme, 'colors.card.start')},
    ${(props) => getThemeData(props.theme, 'colors.card.end')}
  );
  > * {
    margin: 8px;
  }

  .fp-main-area {
    flex: 1;
    display: flex;
    padding: 8px;
    overflow: hidden;
    > div {
      /* display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px; */
      flex: 1;
      padding: 8px;
      overflow: auto;
      border: 1px solid #787878;
    }
  }
`
export const FVPreviewBox = styled.div`
  height: 100px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #787878;
`

export const FVControlEditBox = styled.div`
  flex: 1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  border-color: ${(props) => getThemeData(props.theme, 'colors.border')};
`
export const FVEModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FVModalLarge = styled.div`
  background: #fff;
  height: 90vh;
  width: 90vw;
`

export const FVPaperVerticalPadding = styled(FVPaper)`
  display: flex;
  flex-direction: column;
  > div {
    padding: 8px;
  }
`

export const FVPaperPadding = styled(FVPaper)`
  > div {
    padding: 8px;
  }
`

export const FVEditorModal = styled(FVPaper)`
  display: flex;
  margin: 8px;
  flex-direction: column;
  height: 100%;
`

export const FVControlEdit = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 50px;
  border-radius: 4px;
  padding: 2px 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #454545;
  flex: 0;

  cursor: pointer;
  ${(props) => props.selected && BoxSelected}
  &:hover {
    .control-editor-main {
      -webkit-filter: blur(2px);
      filter: blur(2px);
      transition: all 0.7s;
    }
  }
  .content-overlay {
    background: rgba(255, 255, 255, 0.3);
    position: absolute;
    height: 99%;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    -webkit-transition: all 0.4s ease-in-out 0s;
    -moz-transition: all 0.4s ease-in-out 0s;
    transition: all 0.4s ease-in-out 0s;
    z-index: 998;
  }

  &:hover .content-overlay {
    opacity: 1;
  }

  .content-details {
    position: absolute;
    text-align: center;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    top: 50%;
    left: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    top: 80%;
    z-index: 999;
    > * {
      margin: 8px;
    }
  }

  &:hover .content-details {
    top: 50%;
    left: 50%;
    opacity: 1;
  }
`
export const FVMediumHeader = styled(SmallHeader)`
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7);
`

export const FVHeaderBar = styled.div`
  height: 20px;
  font-size: 12px;
  display: flex;
  margin: 8px;
  .header-title {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .header-tool-bar {
    display: flex;
    align-items: center;
    > * {
      margin: 8px;
    }
  }
`
export const FVMediumHeaderBar = styled(FVHeaderBar)`
  height: 40px;
  border-bottom: 1px solid #787878;
`

export const FVDividerField = styled.hr`
  margin: 25px auto 30px;
  padding: 0;
  border: 0;
  border-top: solid 3px;
  text-align: center;
  border-color: ${(props) => getThemeData(props.theme, 'colors.border')};

  &:after {
    content: '\f0e7';
    display: inline-block;
    position: relative;
    top: -1.7rem;
    padding: 0 1rem;
    font-family: FontAwesome;
    font-size: 3rem;
    background-color: #fff;
  }
`
export const FVFormContainer = styled.div`
  padding: 1rem;
  height: 100%;
  overflow: auto;
  ${(props) =>
    props.background
      ? `background-image: url(${props.background});
         background-repeat: no-repeat;
         background-size: cover;`
      : `background: ${props.backgroundColor};`}
`
export const FVFormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => getThemeData(props.theme, 'colors.background')};
  background-image: url(${(props) => props.background});
  background-repeat: no-repeat;
  background-size: cover;
`
export const FVFormRow = styled.div``
export const FVFormCell = styled.div`
  padding: 4px;
  margin: 4px;
  border-right: 4px solid transparent;
  display: inline-flex;
  width: 95%;
  ${(props) => props.selected && BoxSelected}
`

export const FVNoContentAvailable = styled.div`
  height: 80px;
  background: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted #787878;
  > div {
    margin-right: 8px;
    color: #787878;
    letter-spacing: 4px;
    font-size: 10px;
  }
`

export const FVFormBannerDefault = styled.div`
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background: ${(props) => props.bg};
  /* background: ${(props) =>
    props.bg
      ? props.bg
      : props.theme.colors[
          props.elevation ? `background${props.elevation}` : `background1`
        ]} !important; */
`

export const FVFormBanner = styled(FVFormBannerDefault)`
  height: 80px;
`

export const FVBannerImage = styled(FVFormBanner)`
  background-image: url(${(props) => props.background}) !important;
  background-size: contain;
`

export const FVImageContainer = styled.div`
  display: flex;
  align-items: contain;
`

export const FPDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 600px !important;
    background: none !important;
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}
    ) !important;
    backdrop-filter: blur(
      ${({ theme }) => getThemeData(theme, 'colors.card.blur') || '0px'}
    );
  }
`

export const FloatingLabelContainer = styled.div`
  position: relative;

  .floating-input {
    font-size: 14px;
    padding: 4px 4px;
    display: block;
    width: 100%;
    height: 30px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #757575;
  }

  .floating-input:focus {
    outline: none;
    /* border-bottom:2px solid #5264AE;  */
  }

  label {
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.ternaryText')} !important;
    font-size: 0.75em;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    padding: 0px 8px;
    left: 8px;
    top: -8px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}
    ) !important;
  }

  .highlight {
    position: absolute;
    height: 50%;
    width: 100%;
    top: 15%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }
`
