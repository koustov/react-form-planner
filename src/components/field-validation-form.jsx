import {
  FPControlEdit,
  FPFormRow,
  FPToolButton,
  FVFormCell,
  FVFormRow,
  FVPlannerWrapper,
  SmallHeader,
  FPBottomNavigation,
  FPDrawer,
  FPPaperVerticalPadding,
  FPSquareActionButton,
  FPDividerField,
  FPFormColumn,
  FVGridHeaderRow,
  FPHeaderField
} from './styled'
import {
  FPDataGridView,
  FVFileUploadField,
  FVFormCheckboxField,
  FVFormNonField,
  FVFormRadioField,
  FVFormSelectField,
  FVFormTextAreaField,
  FVFormTextField,
  FVFormDateField,
  FVFormDateTimeField,
  FVQuestionField,
  FVImageloadField,
  FVFormColorField,
  FVFormStyleField
} from './form-fields'
import { Field, reduxForm } from 'redux-form'
import React, { Fragment, useEffect, useState } from 'react'
import {
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faClone,
  faPenAlt,
  faTrashAlt,
  faPen,
  faPlus,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import { Button, Grid } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ValidationMap = {
  required: (value) => (value ? undefined : 'Required'),
  maxLength: (max) => (value) =>
    value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined,
  number: (value) =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined,
  minValue: (min) => (value) =>
    value && value < min ? `Must be at least ${min}` : undefined,
  email: (value) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined,
  tooOld: (value) =>
    value && value > 65 ? 'You might be too old for this' : undefined,
  aol: (value) =>
    value && /.+@aol\.com/.test(value)
      ? 'Really? You still use AOL for your email?'
      : undefined
}
const renderSwitch = (type) => {
  switch (type) {
    case 'text':
      return FVFormTextField
    case 'date':
      return FVFormDateField
    case 'datetime':
      return FVFormDateTimeField
    case 'select':
      return FVFormSelectField
    case 'radio':
      return FVFormRadioField
    case 'textarea':
      return FVFormTextAreaField
    case 'checkbox':
      return FVFormCheckboxField
    case 'grid':
      return FPDataGridView
    case 'question':
      return FVQuestionField
    case 'fileupload':
      return FVFileUploadField
    case 'imageupload':
      return FVImageloadField
    case 'color':
      return FVFormColorField
    case 'styleeditor':
      return FVFormStyleField
    default:
      return 'foo'
  }
}

const validate = (values, props) => {
  const errors = {}
  // if (!values.username) {
  //   errors.username = 'Required'
  // }
  // if (!values.password) {
  //   errors.password = 'Required'
  // }
  return errors
}

const asyncValidate = (values, dis, props) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
}

const FieldLevelValidationForm = ({
  data,
  fields,
  onChange,
  theme,
  controls,
  onAddColumn,
  plannerConfig,
  controlMarker = {},
  ...props
}) => {
  const { handleSubmit, pristine, reset, submitting } = props
  const [controlsState, setControlsSet] = useState({})
  const [localFields, setLocalFields] = useState([])
  const [selectedIndices, setSelectedIndices] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addAdditional, setAddAdditional] = useState('')

  useEffect(() => {
    const res = {}
    setLocalFields(JSON.parse(JSON.stringify(fields)))
    fields.forEach((fldRow) => {
      fldRow.forEach((fld) => {
        if (fld.datafield && data[fld.datafield]) {
          res[fld.datafield] = data[fld.datafield]
        }
      })
    })
    setControlsSet(res)
  }, [fields, data])

  const onValueChanged = (key, value, field) => {
    controlsState[key] = value
    setControlsSet({ ...controlsState })
    if (onChange) {
      onChange(key, value, field)
    }
  }
  const getValidations = (field) => {
    const res = []
    if (field.validations && field.validations.length) {
      Object.keys(field.validations).forEach((k) => {
        if (ValidationMap[k]) {
          res.push(ValidationMap[k])
        }
      })
    }
    return res
  }

  const onActionButtonClick = (type, row, column, e, closeDrawer) => {
    e.preventDefault()
    e.stopPropagation()
    if (closeDrawer) {
      setDrawerOpen(false)
    }
    if (props.onButtonClick) {
      props.onButtonClick(type, row, column)
    }
  }

  const onMoreClick = (row, column, columncount, rowcount) => {
    setSelectedIndices({
      rowIndex: row,
      columnIndex: column,
      columnCount: columncount,
      rowCount: rowcount
    })
    setDrawerOpen(true)
  }

  const getSelectedLabel = () => {
    if (selectedIndices.rowIndex > -1 && selectedIndices.columnIndex > -1) {
      try {
        return localFields[selectedIndices.rowIndex][
          selectedIndices.columnIndex
        ].label
      } catch {}
    }
    return ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ flex: 1 }}>
        <FVPlannerWrapper container spacing={1}>
          <React.Fragment>
            {localFields.map((fldrow, fldrowi) => {
              return (
                <div style={{ width: '100%', display: 'flex' }} key={fldrowi}>
                  {fldrow.map((fld, fldi) => {
                    return (
                      <div
                        style={{ width: '100%', padding: '4px' }}
                        key={`${fldrowi}-${fldi}`}
                      >
                        {fld.visible !== false ? (
                          <FPFormRow
                            editable={props.editable}
                            bordered={fld.bordered}
                          >
                            <FPFormColumn
                              editable={props.editable}
                              selected={
                                selectedIndices.rowIndex === fldrowi &&
                                selectedIndices.columnIndex === fldi
                              }
                              className='element-wrapper'
                            >
                              {fld.datafield ? (
                                <Field
                                  name={fld.datafield}
                                  component={renderSwitch(fld.type)}
                                  field={fld}
                                  themeOverride={theme}
                                  required={
                                    fld.validations && fld.validations.required
                                  }
                                  inputvalue={controlsState[fld.datafield]}
                                  allvalue={controlsState}
                                  onValueChanged={(key, value, field) =>
                                    onValueChanged(key, value, field)
                                  }
                                  editable={props.editable}
                                  input={{
                                    value: controlsState[fld.datafield]
                                  }}
                                  {...props}
                                />
                              ) : (
                                <FVFormNonField field={fld} />
                              )}{' '}
                            </FPFormColumn>
                            <FPControlEdit
                              className='control-edit-overlay'
                              {...{
                                selected: props.selectedControlIndex === fldrowi
                              }}
                              key={`${fldrowi}-${fldi}`}
                            >
                              <div className='content-details action-button-wrapper fadeIn-bottom'>
                                {props.editable ? (
                                  <Fragment>
                                    <FPToolButton
                                      variant='contained'
                                      size='small'
                                      aria-label='clone'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onActionButtonClick(
                                          'ed',
                                          fldrowi,
                                          fldi,
                                          e
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faPenAlt} />
                                    </FPToolButton>
                                    <FPToolButton
                                      variant='contained'
                                      color='secondary'
                                      size='small'
                                      aria-label='delete'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onActionButtonClick(
                                          'rm',
                                          fldrowi,
                                          fldi,
                                          e
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </FPToolButton>
                                    <FPToolButton
                                      variant='contained'
                                      size='small'
                                      aria-label='more'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onMoreClick(
                                          fldrowi,
                                          fldi,
                                          fldrow.length,
                                          localFields.length
                                        )
                                      }
                                    >
                                      <FontAwesomeIcon icon={faEllipsisH} />
                                    </FPToolButton>
                                  </Fragment>
                                ) : null}
                              </div>
                            </FPControlEdit>
                          </FPFormRow>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </React.Fragment>
        </FVPlannerWrapper>
      </div>
      <FPDrawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawerOpen ? (
          <FPPaperVerticalPadding>
            <FPHeaderField>More Option: {getSelectedLabel()}</FPHeaderField>
            <FPDividerField />
            <div style={{ display: 'flex' }}>
              <FPSquareActionButton
                onClick={(e) =>
                  onActionButtonClick(
                    'ed',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    true
                  )
                }
              >
                <div>
                  <FontAwesomeIcon icon={faPen} />
                </div>
                <div>Edit</div>
              </FPSquareActionButton>
              <FPSquareActionButton
                onClick={(e) =>
                  onActionButtonClick(
                    'cl',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    true
                  )
                }
              >
                <div>
                  <FontAwesomeIcon icon={faClone} />
                </div>
                <div>Clone</div>
              </FPSquareActionButton>
            </div>
            <div style={{ display: 'flex' }}>
              <FPSquareActionButton
                disabled={selectedIndices.rowIndex === 0}
                onClick={(e) => {
                  setSelectedIndices({
                    ...selectedIndices,
                    rowIndex: selectedIndices.rowIndex + -1
                  })
                  onActionButtonClick(
                    'mu',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    false
                  )
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faChevronUp} />
                </div>
                <div>Move Up Row</div>
              </FPSquareActionButton>
              <FPSquareActionButton
                disabled={
                  selectedIndices.rowIndex === selectedIndices.rowCount - 1
                }
                onClick={(e) => {
                  setSelectedIndices({
                    ...selectedIndices,
                    rowIndex: selectedIndices.rowIndex + 1
                  })
                  onActionButtonClick(
                    'md',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    false
                  )
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
                <div>Move Down Row</div>
              </FPSquareActionButton>
              <FPSquareActionButton
                disabled={selectedIndices.columnIndex === 0}
                onClick={(e) => {
                  setSelectedIndices({
                    ...selectedIndices,
                    columnIndex: selectedIndices.columnIndex - 1
                  })
                  onActionButtonClick(
                    'ml',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    false
                  )
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div>Move Left Column</div>
              </FPSquareActionButton>
              <FPSquareActionButton
                disabled={
                  selectedIndices.columnIndex ===
                  selectedIndices.columnCount - 1
                }
                onClick={(e) => {
                  setSelectedIndices({
                    ...selectedIndices,
                    columnIndex: selectedIndices.columnIndex + 1
                  })
                  onActionButtonClick(
                    'mr',
                    selectedIndices.rowIndex,
                    selectedIndices.columnIndex,
                    e,
                    false
                  )
                }}
              >
                <div>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div>Move Right Column</div>
              </FPSquareActionButton>
            </div>

            <FPHeaderField>Add new column</FPHeaderField>
            <FPDividerField />
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gridGap: '8px'
              }}
            >
              {Object.keys(controls).map((k, ki) => {
                return (
                  <React.Fragment key={ki}>
                    {controls[k].map((c, ci) => {
                      return (
                        <FPSquareActionButton
                          key={`${ki}-${ci}`}
                          onClick={() => {
                            setDrawerOpen(false)
                            if (onAddColumn)
                              onAddColumn(c, selectedIndices.rowIndex)
                          }}
                        >
                          <div>
                            <FontAwesomeIcon icon={c.icon} />
                          </div>
                          <div>{c.display}</div>
                        </FPSquareActionButton>
                      )
                    })}
                  </React.Fragment>
                )
              })}
            </div>
          </FPPaperVerticalPadding>
        ) : null}
      </FPDrawer>
    </form>
  )
}

export default reduxForm({
  form: 'fieldLevelValidation', // a unique identifier for this form
  validate,
  // asyncValidate,
  destroyOnUnmount: true,
  enableReinitialize: true,
  touchOnChange: true,
  trigger: 'blur'
})(FieldLevelValidationForm)
