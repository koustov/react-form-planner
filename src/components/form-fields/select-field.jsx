import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FVMenuItem,
  FVTextField,
  FPSelect,
  FPInputFiedlSet,
  FVInputLabel,
  FVFormControl,
  FVFormControlSimple,
  FPSelectWrapper
} from '../styled'
import { MenuItem, FormControl } from '@mui/material'
import { Fragment } from 'react'

export const FVFormSelectField = (
  {
    input,
    field,
    editable,
    value,
    onValueChanged,
    inputvalue,
    allvalue,
    required,
    meta: { touched, error, warning }
  },
  ...rest
) => {
  const [localValue, setLocalvalue] = useState('')
  useEffect(() => {
    if (field) {
      if (inputvalue) {
        const selectedOptions = getOptions().filter((o) => {
          return o.returnvalue === inputvalue
        })
        if (selectedOptions.length) {
          setLocalvalue(selectedOptions[0].value)
          return
        } else {
          const ops = getOptions()
          const selectedOptionsValue = ops.filter((o) => {
            return o.value === inputvalue
          })
          if (selectedOptionsValue.length) {
            setLocalvalue('')
            setLocalvalue(selectedOptionsValue[0])
            return
          }
        }
      }
      setLocalvalue(getOptions()[0].value)
    }
  }, [value])

  const getOptions = () => {
    if (field.options) {
      if (Array.isArray(field.options)) {
        return field.options
      }

      if (field.options.indexOf('[DATAFIELD]') > -1) {
        const df = field.options.split('=')[1]
        return allvalue[df]
      }
    }
    return []
  }

  const onValChange = (newval) => {
    const val = newval ? newval.value : undefined
    setLocalvalue(val)
    if (onValueChanged) {
      const retValue = getOptions().filter((o) => {
        return o.value === val
      })
      if (retValue && retValue.length > 0) {
        if (retValue[0].returnvalue) {
          onValueChanged(field.datafield, retValue[0].returnvalue, field)
        } else {
          onValueChanged(field.datafield, retValue[0].value, field)
        }
      } else {
        onValueChanged(field.datafield, undefined, field)
      }
    }
  }
  return (
    <FPSelectWrapper>
      <FPSelect
        disablePortal
        freeSolo
        value={localValue}
        onChange={(event, newValue) => {
          onValChange(newValue)
        }}
        id={`ac-${field.datafield}`}
        options={getOptions()}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <FVTextField {...params} label={field.label} />
        )}
      />
    </FPSelectWrapper>
  )
}
