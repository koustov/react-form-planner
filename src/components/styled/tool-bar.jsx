import Button from '@material-ui/core/Button';
import styled from 'styled-components';

export const FPToolbarButton = styled(Button)`
display: flex;
height: 35px;
width: 100%;
padding: 8px;
border-bottom: 1px solid #454545 !important;
text-transform : none !important;
border-radius: 0px !important;

.fp-toolbar-icon {
    width: 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
}

.fp-toolbar-text {
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
}

`;
