import * as React from 'react'

import {
  FPHeaderBar,
  FPMediumHeader,
  FPMediumHeaderBar,
  FPPaper,
  FPPaperVerticalPadding,
  FPTabWrapper,
  FPTabs,
  FPEditorPaper,
  SmallHeader
} from '../styled'
import { faSave, faTimes, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import { FormViewer } from 'react-form-viewer'
import Tab from '@material-ui/core/Tab'
import { getFinalField } from './fields'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </div>
  )
}

export const PropertyEditor = ({ controls, template, index, onChange, onClose }) => {
  const [controlState, setControlState] = useState({})
  const [editContainerGroups, setEditContainerGroups] = useState({})
  const [readOnlyTemplate, setReadOnlyTemplate] = useState(undefined)
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(index);

  useEffect(() => {
    if (controls && controls.length) {
      const control = Object.assign({}, controls[index][0]);
      const res = {}
      control.editableFields.forEach((ed) => {
        const groupName = ed.group ? ed.group : 'Default'
        ed.value = controls[index][0][ed.datafield];
        if (!res[groupName]) {
          res[groupName] = [ed]
        } else {
          res[groupName].push(ed);
        }

      })
      setReadOnlyTemplate(controls);
      setControlState(Object.assign({}, controls[index]));
      setEditContainerGroups(res)
      console.error(JSON.stringify(controls[index]));
    }
  }, [])

  const handleTabSelectionChange = (_event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  const onValueChanged = (_key, value, field) => {
    if (field.is_custom) {
      controlState.custom = controlState.custom || {}
      controlState.custom[field.datafield] = controlState.custom[field.datafield] || [];

      if (field.isappend) {
        controlState.custom[field.datafield].push(value)
        // controlState.custom[field.datafield] = Object.assign(controlState.custom[field.datafield], { [field.datafield]: value });
      } else {
        controlState.custom[field.datafield] = value
      }

    } else {
      controlState[field.datafield] = value
    }
    setControlState({ ...controlState })
    return controlState;
  }

  const onSave = () => {
    if (onChange) {
      onChange(controlState)
    }
    onCancel()
  }

  const onCancel = () => {
    if (onClose) {
      onClose()
    }
  }

  const getFieldControl = (field) => {
    return getFinalField(
      field,
      onValueChanged,
      controlState[field.datafield],
      undefined,
      field.datafield
    )
  }

  const onControlValueChanged = (key, value, field) => {
    const res = onValueChanged(key, value, field)
    readOnlyTemplate[selectedIndex] = res;
    setReadOnlyTemplate(readOnlyTemplate);
  }
  const onNextClicked = () => {
    if (onChange) {
      onChange(controlState)
    }
    setSelectedIndex(selectedIndex + 1);
    setControlState(Object.assign({}, controls[selectedIndex + 1]));
  }

  const onPreviousClicked = () => {
    if (onChange) {
      onChange(controlState)
    }
    setSelectedIndex(selectedIndex - 1);
    setControlState(Object.assign({}, controls[selectedIndex - 1]));
  }

  return (
    <FPPaperVerticalPadding style={{ height: '100%' }}>
      <div>
        <FPMediumHeaderBar>
          <div className='header-title'>
            <FPMediumHeader>Type: {controlState.typeDisplay}</FPMediumHeader>
          </div>
          <div className='header-tool-bar'>
            <Fab
              size='small'
              color='default'
              variant='extended'
              aria-label='previous'
              disabled={selectedIndex === 0}
              onClick={() => onPreviousClicked()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Fab>
            <Fab
              size='small'
              color='default'
              variant='extended'
              aria-label='next'
              disabled={selectedIndex === controls.length - 1}
              onClick={() => onNextClicked()}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Fab>
            <Fab
              size='small'
              variant='extended'
              color='secondary'
              aria-label='save'
              onClick={() => onSave()}
            >
              <FontAwesomeIcon icon={faSave} />
            </Fab>
            <Fab
              size='small'
              color='default'
              variant='extended'
              aria-label='cancel'
              onClick={() => onCancel()}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Fab>
          </div>
        </FPMediumHeaderBar>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '30%', padding: '8px' }}>
          <FPEditorPaper
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <FPHeaderBar>
              <SmallHeader>Preview</SmallHeader>
            </FPHeaderBar>
            <div
              style={{
                display: 'flex',
                flex: 1,
                zoom: '50%'
              }}
            >
              <FormViewer
                template={{ fields: readOnlyTemplate }}
                controlMarker={selectedIndex}
              />
              {/* {getFinalField(controlState)} */}
            </div>
          </FPEditorPaper>
        </div>
        <div style={{ flex: 1, padding: '8px' }}>
          <FPEditorPaper style={{ height: '100%' }}>
            <FPHeaderBar>
              <SmallHeader>Update Properties</SmallHeader>
            </FPHeaderBar>
            <FPTabWrapper>
              <FPTabs
                variant='scrollable'
                value={selectedTabIndex}
                onChange={handleTabSelectionChange}
                aria-label='Control editor'
                indicatorColor='primary'
                textColor='primary'
              >
                {Object.keys(editContainerGroups).map((group, groupi) => {
                  return (
                    <Tab label={`${group}`} key={groupi} />
                  )
                })}
              </FPTabs>
              <div style={{ overflow: 'auto', flex: 1 }}>
                {Object.keys(editContainerGroups).map((group, groupi) => {
                  return (
                    <TabPanel
                      key={groupi}
                      value={selectedTabIndex}
                      index={groupi}
                      style={{ flex: 1, padding: '8px' }}
                    >
                      {
                        <FormViewer
                          template={{ fields: editContainerGroups[group] }}
                          data={controlState}
                          onChange={onControlValueChanged}
                        />
                      }
                    </TabPanel>
                  )
                })}
              </div>
            </FPTabWrapper>
          </FPEditorPaper>
        </div>
      </div>
    </FPPaperVerticalPadding>
  )
}
