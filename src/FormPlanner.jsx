import './styles.scss'

import * as React from 'react'

import {
  FPAccordion,
  FPAccordionDetails,
  FPAccordionSummary,
  FPBottomNavigation,
  FPSquareActionButton,
  FPDividerField,
  FPMediumHeader,
  FPPaperVerticalPadding,
  FPEModal,
  FPListIcon,
  FPListItem,
  FPListItemText,
  FPModalLarge,
  FPPaper,
  FPPlanner,
  FPPlannerWrapper,
  FPSideBar
} from './components/styled'
import { Fragment, useEffect, useState } from 'react'
import {
  faChevronDown,
  faEdit,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons'
import { getControlTemplate, getControls, getAllInNameFormat } from './services'

import { Backdrop, Divider, Grid, List } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormProperties } from './components/properties/form-properties'
import { FormViewer } from './FormViewer'
import { PropertyEditor } from './components/properties/property-editor'
import { ThemeProvider } from 'styled-components'
import * as Themes from './themes'
import { v4 as uuidv4 } from 'uuid'

// const useStyles = makeStyles(() => ({
//   list: {
//     overflow: 'auto'
//   }
// }))

const DefaultConfig = {
  showFormProperties: false,
  showPreview: true,
  allowCustomStyles: false,
  allowCustomProps: false,
  advancedFeatures: false,
  fields: []
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
  // const classes = useStyles()
  const [expanded, setExpanded] = React.useState(0)
  const [localConfig, setLocalConfig] = React.useState({})
  const [finalTheme, setFinalTheme] = React.useState({})

  useEffect(() => {
    if (config.showBasicLabels) {
      DefaultConfig.fields = [
        {
          name: 'header',
          props: {}
        },
        { name: 'mediumheader' },
        { name: 'smallheader' },
        { name: 'label' }
      ]
    }

    const incomingFields = config.fields || getAllInNameFormat()
    setFinalControls(
      getControls(getMergedArray(DefaultConfig.fields, incomingFields))
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
  const onAdd = (value, rowindex) => {
    const selectedTemplate = Object.assign(
      getControlTemplate(value, fieldDefinitions, localConfig),
      {}
    )

    if (selectedTemplate) {
      selectedTemplate.id = uuidv4()
      selectedTemplate.typeDisplay = value.display
      const tmpControlListData = controlListData

      if (rowindex) {
        tmpControlListData.fields[rowindex].push(selectedTemplate)
      } else {
        tmpControlListData.fields.push([selectedTemplate])
      }
      updateList(tmpControlListData)
      setSelectedControlIndex({
        row: tmpControlListData.fields.length - 1,
        column: 0
      })
      // setEditorOpened(true)
    }
  }

  const onFormValueValueChanged = (templates) => {
    const res = JSON.parse(JSON.stringify(templates))
    if (onFormValueChanged) {
      onFormValueChanged(res)
    }
  }

  const onActionButtonClicked = (type, row, column) => {
    let tmpCLD
    switch (type) {
      case 'mu':
        const movedUpFields = moveItem(
          row,
          row - 1,
          column,
          column,
          controlListData.fields
        )
        controlListData.fields = movedUpFields
        updateList(controlListData)
        break
      case 'md':
        const movedDownFields = moveItem(
          row,
          row + 1,
          column,
          column,
          controlListData.fields
        )
        controlListData.fields = movedDownFields
        updateList(controlListData)
        break
      case 'ml':
        const movedLeftFields = moveItem(
          row,
          row,
          column,
          column - 1,
          controlListData.fields
        )
        controlListData.fields = movedLeftFields
        updateList(controlListData)
        break
      case 'mr':
        const movedRightFields = moveItem(
          row,
          row,
          column,
          column + 1,
          controlListData.fields
        )
        controlListData.fields = movedRightFields
        updateList(controlListData)
        break
      case 'ed':
        setSelectedControlIndex({
          row: row,
          column: column
        })
        setEditorOpened(true)
        break
      case 'rm':
        if (controlListData.fields[row].length === 1)
          controlListData.fields.splice(row, 1)
        else controlListData.fields[row].splice(column, 1)
        updateList(controlListData)
        break
      case 'cl':
        controlListData.fields.push([controlListData.fields[row][column]])
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
  const moveItem = (fromRow, toRow, fromColumn, toColumn, list) => {
    if (fromRow === toRow) {
      let rowList = list[fromRow]
      const item = rowList[fromColumn]
      const f = rowList.splice(fromColumn, 1)
      rowList.splice(toColumn, 0, item)
    } else {
      var f = list.splice(fromRow, 1)[0]
      list.splice(toRow, 0, f)
    }

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
                <FPPaper className='fp-side-bar'>
                  <FPPaper className='fp-side-bar-body'>
                    <>
                      {Object.keys(finalControls).length === 1 ? (
                        <>
                          {Object.keys(finalControls).map((fc, fci) => {
                            return (
                              <List
                                component='nav'
                                aria-label='toolbox-body'
                                style={{ width: '100%', overflow: 'auto' }}
                                key={fci}
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
                            )
                          })}
                        </>
                      ) : (
                        <>
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
                                    style={{ width: '100%', overflow: 'auto' }}
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
                                              <FontAwesomeIcon
                                                icon={con.icon}
                                              />
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
                        </>
                      )}
                    </>
                  </FPPaper>
                  <React.Fragment>
                    {localConfig.showPreview ||
                    localConfig.showFormProperties ? (
                      <div className='fp-side-bar-footer'>
                        {/* <FPDividerField /> */}
                        <FPBottomNavigation showLabels>
                          {localConfig.showFormProperties ? (
                            <FPSquareActionButton
                              onClick={() => setFormPropertiesOpened(true)}
                            >
                              <div>
                                <FontAwesomeIcon icon={faEdit} />
                              </div>
                              <div>Properties</div>
                            </FPSquareActionButton>
                          ) : null}
                          {localConfig.showPreview ? (
                            <FPSquareActionButton
                              onClick={() => onPreviewClicked()}
                            >
                              <div>
                                <FontAwesomeIcon icon={faStickyNote} />
                              </div>
                              <div>Preview</div>
                            </FPSquareActionButton>
                          ) : null}
                        </FPBottomNavigation>
                      </div>
                    ) : null}
                  </React.Fragment>
                </FPPaper>
              </FPSideBar>
            </Grid>
            <Grid
              item
              xs={8}
              md={9}
              lg={10}
              style={{ height: '100%', overflow: 'hidden' }}
            >
              <FPPlanner elevation={1}>
                <FormViewer
                  onChange={(a, b, c) => {
                    console.log('Value received')
                  }}
                  plannerConfig={localConfig}
                  template={controlListData}
                  editable={true}
                  onButtonClick={onActionButtonClicked}
                  controls={finalControls}
                  onInject={(item, row) => {
                    onAdd(item, row)
                  }}
                />
              </FPPlanner>
            </Grid>
          </React.Fragment>{' '}
          <FPEModal
            aria-labelledby='preview-form'
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
              <FPPaperVerticalPadding style={{ height: '100%' }}>
                <div>
                  <FPMediumHeader>Preview Form</FPMediumHeader>
                  <FPDividerField />
                </div>
                <div style={{ flex: 1 }}>
                  <FormViewer
                    theme='dark'
                    template={controlListData}
                    onButtonClick={onActionButtonClicked}
                  />
                </div>
              </FPPaperVerticalPadding>
            </FPModalLarge>
          </FPEModal>
          <FPEModal
            aria-labelledby='property-editor'
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
                plannerConfig={localConfig}
                onClose={() => {
                  setEditorOpened(false)
                }}
              />
            </FPModalLarge>
          </FPEModal>
          <FPEModal
            aria-labelledby='form-properties'
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
