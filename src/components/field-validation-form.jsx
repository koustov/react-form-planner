import {
  FPControlEdit,
  FPFormRow,
  FPToolButton,
  FVFormCell,
  FVFormRow,
  FVPlannerWrapper,
  SmallHeader
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
  faChevronDown,
  faChevronUp,
  faClone,
  faPenAlt,
  faTrashAlt
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
  ...props
}) => {
  const { handleSubmit, pristine, reset, submitting } = props
  const [controlsState, setControlsSet] = useState({})
  const [localFields, setLocalFields] = useState([])

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

  const onActionButtonClick = (type, index, e) => {
    e.preventDefault()
    e.stopPropagation()
    if (props.onButtonClick) {
      props.onButtonClick(type, index)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ flex: 1 }}>
        <FVPlannerWrapper container spacing={1}>
          <React.Fragment>
            {localFields.map((fldrow, fldrowi) => {
              return (
                <div style={{ width: '100%', display: 'flex' }}>
                  {fldrow.map((fld, fldi) => {
                    return (
                      <div
                        style={{ width: '100%', padding: '4px' }}
                        key={{ fldi }}
                      >
                        {fld.visible !== false ? (
                          <FPFormRow
                            editable={props.editable}
                            bordered={fld.bordered}
                          >
                            <div className='element-wrapper'>
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
                            </div>
                            <FPControlEdit
                              className='control-edit-overlay'
                              {...{
                                selected: props.selectedControlIndex === fldrowi
                              }}
                              key={fldrowi}
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
                                        onActionButtonClick('ed', fldrowi, e)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faPenAlt} />
                                      <span>Edit</span>
                                    </FPToolButton>
                                    <FPToolButton
                                      variant='contained'
                                      size='small'
                                      aria-label='clone'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onActionButtonClick('cl', fldrowi, e)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faClone} />
                                      <span>Clone</span>
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
                                        onActionButtonClick('rm', fldrowi, e)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                      <span>Remove</span>
                                    </FPToolButton>
                                    <FPToolButton
                                      variant='contained'
                                      size='small'
                                      aria-label='move up'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onActionButtonClick('md', fldrowi, e)
                                      }
                                      disabled={
                                        fldrowi === localFields.length - 1
                                      }
                                    >
                                      <FontAwesomeIcon icon={faChevronDown} />
                                      <span>Move Down</span>
                                    </FPToolButton>
                                    <FPToolButton
                                      variant='contained'
                                      size='small'
                                      aria-label='move down'
                                      onMouseEnter={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                      }}
                                      onClick={(e) =>
                                        onActionButtonClick('mu', fldrowi, e)
                                      }
                                      disabled={fldrowi === 0}
                                    >
                                      <FontAwesomeIcon icon={faChevronUp} />
                                      <span>Move Up</span>
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
