import {
  FPControlEdit,
  FPFormRow,
  FPToolButton,
  FVFormCell,
  FVFormRow,
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
  FVQuestionField
} from './form-fields'
import { Field, reduxForm } from 'redux-form'
import React, { Fragment, useEffect, useState } from 'react'
import {
  faChevronDown,
  faChevronUp,
  faClone,
  faEye,
  faPenAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

import { Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))
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

const FieldLevelValidationForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  const [controlsState, setControlsSet] = useState({})
  const [fields, setFields] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const res = {}
    setFields(JSON.parse(JSON.stringify(props.fields)))
    props.fields.forEach((fldRow) => {
      fldRow.forEach((fld) => {
        if (fld.datafield && props.data[fld.datafield]) {
          res[fld.datafield] = props.data[fld.datafield]
        }
      })
    })
    setControlsSet(res)
  }, [props.fields])

  const onValueChanged = (key, value, field) => {
    controlsState[key] = value
    setControlsSet({ ...controlsState })
    if (props.onChange) {
      props.onChange(key, value, field)
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
        <Grid container spacing={1}>
          <React.Fragment>
            {fields.map((fldrow, fldrowi) => {
              return (
                <React.Fragment key={fldrowi}>
                  {fldrow.map((fld, fldi) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12 / fldrow.length}
                        key={fldi}
                      >
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
                                required={
                                  fld.validations && fld.validations.required
                                }
                                inputvalue={controlsState[fld.datafield]}
                                onValueChanged={(key, value, field) =>
                                  onValueChanged(key, value, field)
                                }
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
                                    color='primary'
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
                                    color='primary'
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
                                    color='default'
                                    size='small'
                                    aria-label='move up'
                                    onMouseEnter={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                    onClick={(e) =>
                                      onActionButtonClick('md', fldrowi, e)
                                    }
                                    disabled={fldrowi === fields.length - 1}
                                  >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    <span>Move Down</span>
                                  </FPToolButton>
                                  <FPToolButton
                                    variant='contained'
                                    color='default'
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
                        <Fragment></Fragment>
                      </Grid>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        </Grid>
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
