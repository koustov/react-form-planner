
import styled, { css } from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Tabs from '@material-ui/core/Tabs';
const BoxSelected = css`
  border-color: #3f51b5;
`;


export const FPPaper = styled(Paper)`
  padding: 8px;
`;

export const FPTabWrapper = styled.div`
flex-grow: 1;
display: flex;
`;

export const FPTabs = styled(Tabs)`
  display: flex;
`;

export const FPPlannerWrapper = styled(Grid)`
  height: 100%;
  padding: 4px;
`;

export const FPSideBar = styled(FPPaper)`
height: 100%;
.fp-side-bar {
  height: 100% ;
  display: flex;
    flex-direction: column;
  >* {
    width: 100% !important;
  }
    &-header{
      width: 100%;
    }
    &-body{
      width: 100%;
      flex: 1;
      width: 15%;
      display: flex;
      flex-direction: column;
      overflow: auto;
    }
    &-footer{
      width: 100%;
    }

}
`;

export const FPPlanner = styled(FPPaper)`
height: 100%;
padding: 4px;

>* {
  margin: 8px;
}

.fp-main-area {
    flex:1;
    display: flex;
    padding: 8px;
    overflow: hidden;
    >div {
      /* display: grid;
    grid-template-columns: 1fr;
    grid-gap: 8px; */
    flex: 1;
    padding:8px;
      overflow: auto;
      border: 1px solid #787878;
    }

}
`;

export const FPPreviewBox = styled.div`
  height: 100px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #787878;
`;

export const FPControlEditBox = styled.div`
  flex:1;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #787878;
  display: flex;
  flex-direction: column;
`;
export const FPEModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FPModalLarge = styled.div`
  background: #fff;
  height: 90vh;
  width: 90vw;
`;

export const FPPaperVerticalPadding = styled(FPPaper)`
display: flex;
flex-direction: column;
>div{
  padding: 8px;
}
`;

export const FPPaperPadding = styled(FPPaper)`
>div{
  padding: 8px;
}
`;



export const FPEditorModal = styled(FPPaper)`
display: flex;
margin: 8px;
flex-direction: column;
height: 100%;
`;

export const FPControlEdit = styled.div`

position: relative;
overflow: hidden;
min-height: 50px;
border-radius: 4px;
padding: 2px 16px;
display:flex;
flex-direction: column;
border: 1px solid #454545;
flex: 0;

cursor: pointer;
${(props) => props.selected && BoxSelected}
&:hover {
  .control-editor-main {
  -webkit-filter: blur(2px);
  filter: blur(2px);
  transition:all 0.7s
  }
}
.content-overlay {
  background: rgba(255,255,255,0.3);
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

&:hover .content-overlay{
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
  >* {
      margin:8px;
    }
}

&:hover .content-details{
  top: 50%;
  left: 50%;
  opacity: 1;
}
`;

export const SmallHeader = styled.div`
  height: 30px;
  font-size:12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: rgba(0,0,0,.5);
`;

export const FPMediumHeader = styled(SmallHeader)`
  font-size:16px;
  color: rgba(0,0,0,.7);
`;

export const FPHeaderBar = styled.div`
  height: 20px;
  font-size:12px;
  display: flex;
  margin: 8px;
  .header-title {
    flex:1;
    display: flex;
    align-items: center;
  }
  .header-tool-bar{
    display: flex;
    align-items: center;
    >* {
      margin: 8px;
    }
  }
`;
export const FPMediumHeaderBar = styled(FPHeaderBar)`
  height: 40px;
  border-bottom: 1px solid #787878;
`;


export const FPDividerField = styled.hr`
margin: 25px auto 30px;
padding: 0;
border: 0;
border-top: solid 3px;
text-align: center;

&:after {
content: "\f0e7";
display: inline-block;
position: relative;
top: -1.7rem;
padding: 0 1rem;
font-family: FontAwesome;
font-size: 3rem;
background-color: #fff;
}
`;

export const FPFormWrapper = styled.div`

`;
export const FPFormRow = styled.div`
  padding: 4px;
  margin: 4px;
`;


export const FPNoContentAvailable = styled.div`
  height: 80px;
  background: #EFEFEF;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted #787878;
    ;
  >div {
    margin-right: 8px;
    color: #787878;
    letter-spacing: 4px;
    font-size: 10px;
  }

`
