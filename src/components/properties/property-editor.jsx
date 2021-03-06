import * as React from 'react'

import {
  FPHeaderBar,
  FPMediumHeader,
  FPMediumHeaderBar,
  FPPaper,
  FPPaperVerticalPadding,
  FPTabWrapper,
  FPTabPanel,
  FPTabs,
  FPTab,
  FPFiedlSet,
  FPToolButton,
  FPEditorPaper,
  SmallHeader
} from '../styled'
import {
  FaSave,
  FaTimes,
  FaEye,
  FaEdit
} from 'react-icons/fa'
import { useEffect, useState } from 'react'

import { Box } from '@mui/material'
import { FormViewer } from '../../FormViewer'
import { getFinalField } from './fields'

import { getControlTemplate } from '../../services/control-template'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <FPTabPanel
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </FPTabPanel>
  )
}

export const PropertyEditor = ({
  controls,
  template,
  index,

  onChange,
  onClose,
  plannerConfig = { plannerConfig }
}) => {
  const [controlState, setControlState] = useState({})
  const [editContainerGroups, setEditContainerGroups] = useState({})
  const [readOnlyTemplate, setReadOnlyTemplate] = useState(undefined)
  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  const [selectedIndex, setSelectedIndex] = React.useState(index)

  useEffect(() => {
    if (controls && controls.length) {
      let control = Object.assign({}, controls[index.row][index.column])

      const res = {}
      if (!control.editableFields) {
        control = Object.assign(
          control,
          getControlTemplate(control, control, plannerConfig)
        )
      }
      control.editableFields.forEach((ed) => {
        const groupName = ed[0].group ? ed[0].group : 'Default'
        ed.value = controls[index.row][index.column][ed.datafield]
        if (!res[groupName]) {
          res[groupName] = [ed]
        } else {
          res[groupName].push(ed)
        }
      })
      setReadOnlyTemplate(controls)
      setControlState(Object.assign({}, controls[index.row][index.column]))
      setEditContainerGroups(res)
    }
  }, [])

  const handleTabSelectionChange = (_event, newValue) => {
    setSelectedTabIndex(newValue)
  }

  const onValueChanged = (_key, value, field) => {
    if (field.is_custom) {
      controlState.custom = controlState.custom || {}
      controlState.custom[field.datafield] =
        controlState.custom[field.datafield] || {}
      const vals = {}
      value.forEach((v) => {
        vals[v.name] = v.value
      })
      if (field.isappend) {
        controlState.custom[field.datafield] = Object.assign(
          controlState.custom[field.datafield] || {},
          vals
        )
      } else {
        controlState.custom[field.datafield] = vals
      }
    } else {
      if (field.isappend) {
        controlState[field.datafield] = Object.assign(
          controlState[field.datafield] || {},
          value
        )
      } else {
        controlState[field.datafield] = value
      }
    }
    setControlState({ ...controlState })
    return controlState
  }

  const onSave = () => {
    if (onChange) {
      onChange(readOnlyTemplate)
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
    readOnlyTemplate[selectedIndex.row][selectedIndex.column][key] = value
    setReadOnlyTemplate(JSON.parse(JSON.stringify(readOnlyTemplate)))
  }

  return (
    <FPPaperVerticalPadding style={{ height: '100%' }}>
      <div>
        <FPMediumHeaderBar>
          <div className='header-title'>
            <FPMediumHeader>Type: {controlState.typeDisplay}</FPMediumHeader>
          </div>
          <div className='header-tool-bar'>
            <FPToolButton
              variant='contained'
              size='large'
              aria-label='save'
              onClick={() => onSave()}
              anchor={'bottom'}
              style={{ width: '150px' }}
            >
              <FaSave/>
              <span>Save</span>
            </FPToolButton>
            <FPToolButton
              variant='contained'
              size='large'
              aria-label='move down'
              onClick={() => onCancel()}
              anchor={'bottom'}
              style={{ width: '150px' }}
            >
              <FaTimes/>
              <span>Cancel</span>
            </FPToolButton>
          </div>
        </FPMediumHeaderBar>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: '30%', padding: '8px' }}>
          <FPFiedlSet>
            <legend>
              <FaEye /> <span>Preview</span>
            </legend>
            <div
              style={{
                display: 'flex',
                flex: 1,
                zoom: '50%'
              }}
            >
              <FormViewer
                template={{ ...{ fields: readOnlyTemplate } }}
                controlMarker={selectedIndex}
              />
            </div>
          </FPFiedlSet>
        </div>
        <div style={{ flex: 1, padding: '8px' }}>
          <FPFiedlSet>
            <legend>
              <FaEdit/> <span>Properties</span>
            </legend>
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
                    <FPTab
                      label={`${group}`}
                      key={groupi}
                      selected={selectedTabIndex === groupi}
                    />
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
                      style={{ flex: 1, padding: '8px', height: '100%' }}
                    >
                      {
                        <FormViewer
                          template={{ fields: editContainerGroups[group] }}
                          data={controlState}
                          onControlValueChanged={onControlValueChanged}
                        />
                      }
                    </TabPanel>
                  )
                })}
              </div>
            </FPTabWrapper>
          </FPFiedlSet>
        </div>
      </div>
    </FPPaperVerticalPadding>
  )
}
