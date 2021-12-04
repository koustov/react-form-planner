import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FVSelect,
  FVMenuItem,
  FVTextField,
  FPSelect,
  FPInputFiedlSet
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
            setLocalvalue(selectedOptionsValue[0].value)
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
  }

  const onValChange = (newval) => {
    const val = newval.target.value
    setLocalvalue(val)
    if (onValueChanged) {
      const retValue = getOptions().filter((o) => {
        return o.value === val
      })
      if (retValue[0].returnvalue) {
        onValueChanged(field.datafield, retValue[0].returnvalue, field)
      } else {
        onValueChanged(field.datafield, retValue[0].value, field)
      }
    }
  }
  return (
    <FPInputFiedlSet>
      <legend>{field.label}</legend>
      <FPSelect
        labelId={`select-field-${field.datafield}`}
        id={`select-field-${field.datafield}`}
        size='small'
        fullWidth
        value={localValue}
        onChange={(e, nv) => {
          if (!editable) {
            onValChange(e)
          }
        }}
        label='Age'
      >
        {getOptions().map((o, oi) => {
          return (
            <MenuItem name={o.name} value={o.value} key={oi}>
              {o.name}
            </MenuItem>
          )
        })}
      </FPSelect>
    </FPInputFiedlSet>
  )
}
