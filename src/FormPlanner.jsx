import * as React from 'react';
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from 'react';
import { getControls, getControlTemplate } from './services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { FPControlEdit, SmallHeader, FPSideBar, FPPlanner, FPPlannerWrapper, FPModalLarge, FPEModal, FPListItem, FPListIcon, FPListItemText } from './components/styled';

import { faTrashAlt, faClone, faChevronDown, faChevronUp, faEye, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import { PropertyEditor } from './components/properties/property-editor';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import { FormViewer } from './FormViewer';

import Grid from '@material-ui/core/Grid';
import * as _ from 'lodash';

import './styles.scss';
import { dark } from './themes/dark';

const useStyles = makeStyles(() => ({
  list: {
    overflow: 'auto',
  }
}));

export const FormPlanner = ({ controls, onFormValueChanged, fieldDefinitions, theme = 'dark' }) => {
  const [finalControls, setFinalControls] = useState([]);
  const [controlListData, setControlListData] = useState([]);
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1);
  const [previewOpened, setPreviewOpened] = useState(false);
  const [editorOpened, setEditorOpened] = useState(false);
  const [formTemplates, setFormTemplates] = useState([]);
  const classes = useStyles();

  // const [dragState, setDragState] = useState({ quotes: initial });

  useEffect(() => {
    setFinalControls(getControls(controls));
  }, [controls])


  // Event Handlers
  const onAdd = (value) => {
    const selectedTemplate = Object.assign(getControlTemplate(value.type, fieldDefinitions), {});

    if (selectedTemplate) {
      selectedTemplate.id = uuidv4();
      selectedTemplate.typeDisplay = value.display;
      const tmpControlListData = controlListData.map(a => Object.assign({}, a));
      tmpControlListData.push(selectedTemplate);
      updateList(tmpControlListData);
    }
  }

  const onRemove = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    const tmpControlListData = controlListData.splice(index, 1);
    updateList(tmpControlListData);
  }

  const onFormValueValueChanged = (templates) => {
    const res = JSON.parse(JSON.stringify(templates));
    setFormTemplates(res);
    if (onFormValueChanged) {
      onFormValueChanged(res);
    }
  }

  const onMoveUp = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setControlListData(moveItem(index, index - 1, controlListData));
  }

  const onMoveDown = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setControlListData(moveItem(index, index + 1, controlListData));
  }

  const onPreviewClicked = () => {
    setPreviewOpened(true);
  }

  const onEditClicked = (index) => {
    setSelectedControlIndex(index);
    setEditorOpened(true);
  }

  const onControlPropertyUpdated = (control) => {
    controlListData[selectedControlIndex] = control;
    setControlListData(controlListData);
    setEditorOpened(false)
  }

  // Helper methods
  const moveItem = (from, to, list) => {
    var f = list.splice(from, 1)[0];
    list.splice(to, 0, f);
    return list;
  }

  const updateList = (theList) => {
    setControlListData(theList);
    onFormValueValueChanged(theList);
  }

  // Rendering
  return (
    <ThemeProvider theme={theme == 'dark' ? dark : ''}>
      <FPPlannerWrapper container spacing={1} className="w-auto m-0">
        <Grid item xs={4} md={3} lg={2}>
          <FPSideBar elevation={3} className="flex-1">
            <div className="fp-side-bar">
              <div className="fp-side-bar-body">
                <List component="nav" aria-label="toolbox-body" className={classes.list}>
                  {
                    finalControls.map((con, conti) => {
                      return <React.Fragment key={conti}>
                        <FPListItem
                          dense
                          button
                          onClick={() => onAdd(con)}
                        >
                          <FPListIcon>
                            <FontAwesomeIcon icon={con.icon} />
                          </FPListIcon>
                          <FPListItemText primary={`${con.display}`} />
                        </FPListItem>
                        <Divider />
                      </React.Fragment>
                    })
                  }
                </List>
              </div>
              <div className="fp-side-bar-footer">
                <List component="nav" aria-label="toolbox-footer" className={classes.list}>
                  <FPListItem
                    button
                    onClick={() => onPreviewClicked()}
                  >
                    <FPListIcon>
                      <FontAwesomeIcon icon={faEye} />
                    </FPListIcon>
                    <FPListItemText primary="Preview" />
                  </FPListItem>
                </List>

              </div>
            </div>
          </FPSideBar>

        </Grid>
        <Grid item xs={8} md={9} lg={10}>
          <FPPlanner elevation={3}>
            {
              controlListData.map((control, control_index) => {
                return (<FPControlEdit {...{ selected: selectedControlIndex === control_index }} key={control_index} onClick={() => { onEditClicked(control_index) }}>
                  <div className="content-overlay"></div>
                  <div className="content-details fadeIn-bottom">

                    <Fab color="secondary" size="small" aria-label="clone" onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation() }} onClick={() => { onEditClicked(control_index) }}>
                      <FontAwesomeIcon icon={faPenAlt} />
                    </Fab>
                    <Fab color="secondary" size="small" aria-label="clone" onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation() }}>
                      <FontAwesomeIcon icon={faClone} />
                    </Fab>
                    <Fab color="primary" size="small" aria-label="delete" onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation() }} onClick={(e) => onRemove(control_index, e)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Fab>
                    <Fab color="default"
                      size="small"
                      aria-label="move up"
                      onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation() }}
                      onClick={(e) => onMoveUp(control_index, e)}
                      disabled={control_index === controlListData.length - 1}
                    >
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Fab>
                    <Fab color="default"
                      size="small"
                      aria-label="move down"
                      onMouseEnter={(e) => { e.preventDefault(); e.stopPropagation() }}
                      onClick={(e) => onMoveDown(control_index, e)}
                      disabled={control_index === 0}>
                      <FontAwesomeIcon icon={faChevronUp} />
                    </Fab>
                  </div>
                  <div className="control-editor-main">
                    <div className="editor-control-header">
                      <div className="editor-control-header">
                        <SmallHeader>
                          {control.typeDisplay}
                        </SmallHeader>
                      </div>
                    </div>
                    <div className="editor-control">
                      {control.template(control, {}, null)}
                    </div>
                  </div>
                </FPControlEdit>
                )
              })
            }
          </FPPlanner>

        </Grid>
      </FPPlannerWrapper>


      <FPEModal
        aria-labelledby="preview-form"
        aria-describedby="transition-form"
        open={previewOpened}
        onClose={() => { setPreviewOpened(false) }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FPModalLarge>
          <FormViewer templates={formTemplates} />
        </FPModalLarge>
      </FPEModal>
      <FPEModal
        aria-labelledby="editor-form"
        aria-describedby="transition-form"
        open={editorOpened}
        onClose={() => { setEditorOpened(false) }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <FPModalLarge>
          <PropertyEditor controls={controlListData} index={selectedControlIndex} onChange={onControlPropertyUpdated} onClose={() => { setEditorOpened(false) }} />
        </FPModalLarge>
      </FPEModal>
    </ThemeProvider>
  );
}
