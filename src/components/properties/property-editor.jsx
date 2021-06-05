import * as React from 'react'

import {
  FPHeaderBar,
  FPMediumHeader,
  FPMediumHeaderBar,
  FPPaper,
  FPPaperVerticalPadding,
  FPTabWrapper,
  FPTabs,
  SmallHeader
} from '../styled'
import { FaSave, FaTimes } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import { FormViewer } from '../../FormViewer'
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

export const PropertyEditor = ({ control, onChange, onClose }) => {
  const [controlState, setControlState] = useState(control)
  const [editContainerGroups, setEditContainerGroups] = useState({})
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

  useEffect(() => {
    if (control) {
      const res = {}
      control.editableFields.forEach((ed) => {
        const groupName = ed.group ? ed.group : 'Default'
        if (!res[groupName]) {
          res[groupName] = [ed]
        } else {
          res[groupName].push(ed)
        }
      })
      setEditContainerGroups(res)
    }
  }, [control])

  const handleTabSelectionChange = (_event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  const onValueChanged = (_key, value, field) => {
    if (field.is_custom) {
      controlState.custom = controlState.custom || {}
      controlState.custom[field.targetField] = value
    } else {
      controlState[field.targetField] = value
    }
    setControlState({ ...controlState })
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
      controlState[field.targetField],
      undefined,
      field.targetField
    )
  }

  const onControlValueChanged = (key, value, field) => {
    onValueChanged(key, value, field)
  }

  return (
    <FPPaperVerticalPadding style={{ height: '100%' }}>
      <div>
        <FPMediumHeaderBar>
          <div className='header-title'>
            <FPMediumHeader>Type: {control.typeDisplay}</FPMediumHeader>
          </div>
          <div className='header-tool-bar'>
            <Fab
              size='small'
              variant='extended'
              color='secondary'
              aria-label='save'
              onClick={() => onSave()}
            >
              <FaSave />
            </Fab>
            <Fab
              size='small'
              color='default'
              variant='extended'
              aria-label='save'
              onClick={() => onCancel()}
            >
              <FaTimes />
            </Fab>
          </div>
        </FPMediumHeaderBar>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '30%', padding: '8px' }}>
          <FPPaper
            style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
          >
            <FPHeaderBar>
              <SmallHeader>Controlled Preview</SmallHeader>
            </FPHeaderBar>
            <div
              style={{
                display: 'flex',
                flex: 1
              }}
            >
              {getFinalField(controlState)}
            </div>
          </FPPaper>
        </div>
        <div style={{ flex: 1, padding: '8px' }}>
          <FPPaper style={{ height: '100%' }}>
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
                    <Tab label={`${group}`} key={groupi}>
                      XXXXX {groupi}
                    </Tab>
                  )
                })}
              </FPTabs>
              {/* <div style={{ overflow: 'auto', flex: 1 }}>
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
                          templates={editContainerGroups[group]}
                          onControlValueChanged={onControlValueChanged}
                        />
                        // editContainerGroups[group].map((control_filed, control_filed_index) => {
                        //   return <div key={`group_control_${control_filed_index}`}>
                        //     {getFieldControl(control_filed)}
                        //   </div>
                        // })
                      }
                    </TabPanel>
                  )
                })}
              </div> */}
            </FPTabWrapper>
          </FPPaper>
        </div>
      </div>
    </FPPaperVerticalPadding>
  )
}
