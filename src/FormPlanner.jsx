import './styles.scss'

import * as React from 'react'

import {
  FPAccordion,
  FPAccordionDetails,
  FPAccordionSummary,
  FPBottomNavigation,
  FPBottomNavigationAction,
  FPDividerField,
  FPEModal,
  FPListIcon,
  FPListItem,
  FPListItemText,
  FPModalLarge,
  FPPlanner,
  FPPlannerWrapper,
  FPSideBar
} from './components/styled'
import { Fragment, useEffect, useState } from 'react'
import {
  faAssistiveListeningSystems,
  faChevronDown,
  faEdit,
  faLevelUpAlt,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons'
import { getControlTemplate, getControls } from './services'

import { Backdrop } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormProperties } from './components/properties/form-properties'
import { FormViewer } from './FormViewer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import { PropertyEditor } from './components/properties/property-editor'
import { ThemeProvider } from 'styled-components'
import * as Themes from './themes'
import { makeStyles } from '@material-ui/core/styles'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles(() => ({
  list: {
    overflow: 'auto'
  }
}))

const DefaultConfig = {
  showFormProperties: false,
  showPreview: true,
  allowCustomStyles: false,
  allowCustomProps: false,
  advancedFeatures: false,
  fields: [
    {
      name: 'header',
      props: {}
    },
    { name: 'mediumheader' },
    { name: 'smallheader' },
    { name: 'label' }
  ]
}

export const FormPlanner = ({
  config,
  onFormValueChanged,
  fieldTemplate = {},
  fieldDefinitions,
  baseTheme = 'dark',
  themeOverride = {},
  ...rest
}) => {
  const [finalControls, setFinalControls] = useState([])
  const [controlListData, setControlListData] = useState({ fields: [] })
  const [selectedControlIndex, setSelectedControlIndex] = useState(-1)
  const [previewOpened, setPreviewOpened] = useState(false)
  const [editorOpened, setEditorOpened] = useState(false)
  const [formPropertiesOpened, setFormPropertiesOpened] = useState(false)
  const [loading, setLoading] = useState(true)
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(0)
  const [localConfig, setLocalConfig] = React.useState({})
  const [finalTheme, setFinalTheme] = React.useState({})

  useEffect(() => {
    setFinalControls(
      getControls(getMergedArray(DefaultConfig.fields, config.fields))
    )
    const lConfig = Object.assign(DefaultConfig, config)
    setLocalConfig(lConfig)
    let defaultTheme = Themes[baseTheme]
    const oTheme = themeOverride
    defaultTheme = Object.assign(defaultTheme, oTheme)
    setFinalTheme(defaultTheme)
    const localTemplate = fieldTemplate
    if (!localTemplate.fields) {
      localTemplate.fields = []
    }
    setControlListData(localTemplate)
    setLoading(false)
  }, [config])

  const getMergedArray = (a1, a2) => {
    const res = a1
    a2.forEach((a2c) => {
      if (
        res.filter((r) => {
          return r.name === a2c.name
        }).length === 0
      ) {
        res.push(a2c)
      }
    })
    return res
  }

  // Event Handlers
  const onAdd = (value) => {
    const selectedTemplate = Object.assign(
      getControlTemplate(value, fieldDefinitions, localConfig),
      {}
    )

    if (selectedTemplate) {
      selectedTemplate.id = uuidv4()
      selectedTemplate.typeDisplay = value.display
      const tmpControlListData = controlListData

      tmpControlListData.fields.push([selectedTemplate])
      updateList(tmpControlListData)
      setSelectedControlIndex(tmpControlListData.fields.length - 1)
      // setEditorOpened(true)
    }
  }

  const onFormValueValueChanged = (templates) => {
    const res = JSON.parse(JSON.stringify(templates))
    if (onFormValueChanged) {
      onFormValueChanged(res)
    }
  }

  const onActionButtonClicked = (type, index) => {
    let tmpCLD
    switch (type) {
      case 'mu':
        const movedUpFields = moveItem(index, index - 1, controlListData.fields)
        controlListData.fields = movedUpFields
        updateList(controlListData)
        break
      case 'md':
        const movedDownFields = moveItem(
          index,
          index + 1,
          controlListData.fields
        )
        controlListData.fields = movedDownFields
        updateList(controlListData)
        break
      case 'ed':
        setSelectedControlIndex(index)
        setEditorOpened(true)
        break
      case 'rm':
        controlListData.fields.splice(index, 1)
        updateList(controlListData)
        break
      case 'cl':
        controlListData.fields.push(controlListData.fields[index])
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
    if (onFormValueChanged) {
      onFormValueChanged(controlListData)
    }
  }

  const onFormPropertyUpdated = (value) => {
    const newControlListData = Object.assign(controlListData, value)
    setControlListData(JSON.parse(JSON.stringify(newControlListData)))
    setFormPropertiesOpened(false)
    if (onFormValueChanged) {
      onFormValueChanged(newControlListData)
    }
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

  return (
    <ThemeProvider theme={finalTheme}>
      {loading ? null : (
        <FPPlannerWrapper container spacing={1} className='w-auto m-0'>
          <React.Fragment>
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
                            expandIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
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
                                      <FPListItemText
                                        primary={`${con.display}`}
                                      />
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
                  <React.Fragment>
                    {localConfig.showPreview ||
                    localConfig.showFormProperties ? (
                      <div className='fp-side-bar-footer'>
                        <FPDividerField />
                        <FPBottomNavigation showLabels>
                          <div>
                            {localConfig.showFormProperties ? (
                              <FPBottomNavigationAction
                                label='Form Properties'
                                icon={<FontAwesomeIcon icon={faEdit} />}
                                onClick={() => setFormPropertiesOpened(true)}
                              />
                            ) : null}
                          </div>
                          <div>
                            {localConfig.showPreview ? (
                              <FPBottomNavigationAction
                                label='Preview'
                                icon={<FontAwesomeIcon icon={faStickyNote} />}
                                onClick={() => onPreviewClicked()}
                              />
                            ) : null}
                          </div>
                        </FPBottomNavigation>
                      </div>
                    ) : null}
                  </React.Fragment>
                </div>
              </FPSideBar>
            </Grid>
            <Grid
              item
              xs={8}
              md={9}
              lg={10}
              style={{ height: '100%', overflow: 'auto' }}
            >
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
          </React.Fragment>{' '}
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
        </FPPlannerWrapper>
      )}
    </ThemeProvider>
  )
}
