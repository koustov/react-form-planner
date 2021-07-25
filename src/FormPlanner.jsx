import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { useState, useEffect } from 'react'
import { getControls, getControlTemplate } from './services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  FPControlEdit,
  SmallHeader,
  FPSideBar,
  FPPlanner,
  FPPlannerWrapper,
  FPModalLarge,
  FPEModal,
  FPAccordion,
  FPAccordionSummary,
  FPListItem,
  FPListIcon,
  FPAccordionDetails,
  FPDividerField,
  FPListItemText,
  FPBottomNavigation,
  FPBottomNavigationAction
} from './components/styled'

import {
  faTrashAlt,
  faClone,
  faChevronDown,
  faEdit,
  faStickyNote,
  faPenAlt
} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Fab from '@material-ui/core/Fab'
import { PropertyEditor } from './components/properties/property-editor'
import { FormProperties } from './components/properties/form-properties'
import { makeStyles } from '@material-ui/core/styles'

import { Backdrop, AccordionDetails } from '@material-ui/core'
import { FormViewer } from './FormViewer'

import Grid from '@material-ui/core/Grid'
import * as _ from 'lodash'

import './styles.scss'
import { dark } from './themes/dark'

const useStyles = makeStyles(() => ({
  list: {
    overflow: 'auto'
  }
}))

export const FormPlanner = ({
  controls,
  onFormValueChanged,
  fieldDefinitions,
  theme = 'dark'
}) => {
  const [finalControls, setFinalControls] = useState([])
  const [controlListData, setControlListData] = useState({ fields: [] })
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1)
  const [previewOpened, setPreviewOpened] = useState(false)
  const [editorOpened, setEditorOpened] = useState(false)
  const [formPropertiesOpened, setFormPropertiesOpened] = useState(false)
  const [formTemplates, setFormTemplates] = useState([])
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(0)

  const [bottomNavigationValue, setBottomNavigationValue] = React.useState(0)

  // const [dragState, setDragState] = useState({ quotes: initial });

  useEffect(() => {
    setFinalControls(getControls(controls))
  }, [controls])

  // Event Handlers
  const onAdd = (value) => {
    const selectedTemplate = Object.assign(
      getControlTemplate(value, fieldDefinitions),
      {}
    )

    if (selectedTemplate) {
      selectedTemplate.id = uuidv4()
      selectedTemplate.typeDisplay = value.display
      const tmpControlListData = controlListData

      tmpControlListData.fields.push([selectedTemplate])
      updateList(tmpControlListData)
      setSelectedControlIndex(tmpControlListData.fields.length - 1)
      setEditorOpened(true)
    }
  }

  const onRemove = (index, e) => {
    e.preventDefault()
    e.stopPropagation()
    const tmpControlListData = controlListData.fields.splice(index, 1)
    updateList(tmpControlListData)
  }

  const onFormValueValueChanged = (templates) => {
    const res = JSON.parse(JSON.stringify(templates))
    setFormTemplates(res)
    if (onFormValueChanged) {
      onFormValueChanged(res)
    }
  }

  const onActionButtonClicked = (type, index) => {
    let tmpCLD
    switch (type) {
      case 'mu':
        tmpCLD = moveItem(index, index - 1, controlListData.fields)
        updateList(tmpCLD)
        break
      case 'md':
        tmpCLD = moveItem(index, index + 1, controlListData.fields)
        updateList(tmpCLD)
        break
      case 'ed':
        setSelectedControlIndex(index)
        setEditorOpened(true)
        break
      case 'rm':
        controlListData.fields.splice(index, 1)
        updateList(controlListData.fields)
        break
      case 'cl':
        const newcontrol = controlListData.fields[index]
        controlListData.fields.push(newcontrol)
        updateList(controlListData)
        break
      default: //DO nothing
    }
  }
  const onPreviewClicked = () => {
    setPreviewOpened(true)
  }

  const onControlPropertyUpdated = (control) => {
    controlListData.fields = control
    setControlListData(controlListData)
    setEditorOpened(false)
  }

  const onFormPropertyUpdated = (value) => {
    const newControlListData = Object.assign(controlListData, value)
    setControlListData(JSON.parse(JSON.stringify(newControlListData)))
    setFormPropertiesOpened(false)
  }

  // Helper methods
  const moveItem = (from, to, list) => {
    var f = list.splice(from, 1)[0]
    list.splice(to, 0, f)
    return list
  }

  const updateList = (theList) => {
    setControlListData(JSON.parse(JSON.stringify(theList)))
    onFormValueValueChanged(theList)
  }

  const handleExpansionChange = (index) => {
    if (expanded !== index) {
      setExpanded(index)
    }
  }

  // Rendering
  return (
    <ThemeProvider theme={theme == 'dark' ? dark : ''}>
      <FPPlannerWrapper container spacing={1} className='w-auto m-0'>
        <Grid item xs={4} md={3} lg={2} style={{ overflow: 'hidden' }}>
          <FPSideBar elevation={1} className='flex-1'>
            <div className='fp-side-bar'>
              <div className='fp-side-bar-body'>
                {Object.keys(finalControls).map((fc, fci) => {
                  return (
                    <FPAccordion
                      key={fci}
                      expanded={expanded === fci}
                      onChange={() => handleExpansionChange(fci)}
                    >
                      <FPAccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                      >
                        {fc}
                      </FPAccordionSummary>
                      <FPAccordionDetails>
                        <List
                          component='nav'
                          aria-label='toolbox-body'
                          className={classes.list}
                          style={{ width: '100%' }}
                        >
                          {finalControls[fc].map((con, conti) => {
                            return (
                              <React.Fragment key={conti}>
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
                            )
                          })}
                        </List>
                      </FPAccordionDetails>
                    </FPAccordion>
                  )
                })}
              </div>
              <div className='fp-side-bar-footer'>
                <FPDividerField />
                <FPBottomNavigation showLabels>
                  <FPBottomNavigationAction
                    label='Form Properties'
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() => setFormPropertiesOpened(true)}
                  />
                  <FPBottomNavigationAction
                    label='Preview'
                    icon={<FontAwesomeIcon icon={faStickyNote} />}
                    onClick={() => onPreviewClicked()}
                  />
                </FPBottomNavigation>
              </div>
            </div>
          </FPSideBar>
        </Grid>
        <Grid item xs={8} md={9} lg={10}>
          <FPPlanner elevation={1}>
            <FormViewer
              onChange={(a, b, c) => {
                console.log('Value received')
              }}
              template={controlListData}
              editable={true}
              onButtonClick={onActionButtonClicked}
            />
          </FPPlanner>
        </Grid>
      </FPPlannerWrapper>

      <FPEModal
        aria-labelledby='preview-form'
        aria-describedby='transition-form'
        open={previewOpened}
        onClose={() => {
          setPreviewOpened(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <FPModalLarge>
          <FormViewer
            theme='dark'
            template={controlListData}
            onButtonClick={onActionButtonClicked}
          />
        </FPModalLarge>
      </FPEModal>
      <FPEModal
        aria-labelledby='editor-form'
        aria-describedby='transition-form'
        open={editorOpened}
        onClose={() => {
          setEditorOpened(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <FPModalLarge>
          <PropertyEditor
            controls={controlListData.fields}
            index={selectedControlIndex}
            onChange={onControlPropertyUpdated}
            onClose={() => {
              setEditorOpened(false)
            }}
          />
        </FPModalLarge>
      </FPEModal>

      <FPEModal
        aria-labelledby='editor-form'
        aria-describedby='transition-form'
        open={formPropertiesOpened}
        onClose={() => {
          setFormPropertiesOpened(false)
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <FPModalLarge>
          <FormProperties
            data={controlListData}
            onChange={onFormPropertyUpdated}
            onClose={() => {
              setFormPropertiesOpened(false)
            }}
          />
        </FPModalLarge>
      </FPEModal>
    </ThemeProvider>
  )
}
