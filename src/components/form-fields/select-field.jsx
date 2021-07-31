import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVSelect, FVMenuItem, FVTextField } from '../styled'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Fields } from 'redux-form'

export const FVFormSelectField = (
  {
    input,
    field,
    value,
    onValueChanged,
    required,
    meta: { touched, error, warning }
  },
  ...rest
) => {
  const [localValue, setLocalvalue] = useState(value)
  useEffect(() => {
    if (field) {
      if (value) {
        const selectedOptions = field.options.filter((o) => {
          return o.value === value
        })
        if (selectedOptions.length) {
          setLocalvalue(selectedOptions[0].value)
          return
        }
      }
      setLocalvalue(field.options[0].value)
    }
  }, [value])

  const onValChange = (e, newval) => {
    setLocalvalue(newval.value)
    if (onValueChanged) {
      if (newval.returnvalue) {
        onValueChanged(field.datafield, newval.returnvalue, field)
      } else {
        onValueChanged(field.datafield, newval, field)
      }
    }
  }
  return (
    <Autocomplete
      id={`autocomplete-field-${field.datafield}`}
      options={field.options}
      getOptionLabel={(option) => option.label}
      getOptionValue={(option) => option.value}
      onChange={onValChange}
      style={{ width: '100%' }}
      renderInput={(params) => (
        <FVTextField
          {...params}
          label={field.label}
          variant='outlined'
          size='small'
        />
      )}
    />
  )
  //   <div>
  //     <label>{label}</label>
  //     <div>
  //       <input {...input} placeholder={label} type={type} />
  //       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  //     </div>
  //   </div>
  // )
}
