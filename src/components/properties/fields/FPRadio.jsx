import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FPRadio,
  FPFormControlLabel,
  FPHeaderField,
  FPLabelField,
  FPTextField,
  FPNoContentAvailable,
  FPFormLabel,
  FPFieldSet,
  FPRadioGroup
} from '../../styled'
import { FormControl } from '@mui/material'

const FPRadioControl = ({ field, onChange, ...props }) => {
  const [localValue, setLocalvalue] = useState(field.value)

  const onValueChanged = (e) => {
    setLocalvalue(e.target.value)
    if (onChange) {
      const retValue = field.data.filter((f) => {
        return f.value.toString() === e.target.value.toString()
      })
      if (retValue && retValue.length && retValue[0].returnvalue) {
        onChange(field, retValue[0].returnvalue, field)
      } else {
        onChange(field, e.target.value, field)
      }
    }
  }

  useEffect(() => {}, [])

  return (
    <div>
      <FormControl component='fieldset'>
        {field.label ? (
          <FPFormLabel component='legend'>{field.label}</FPFormLabel>
        ) : null}

        <FPRadioGroup
          aria-label={field.datafield}
          name={field.datafield}
          value={localValue}
          onChange={onValueChanged}
        >
          {field.data.map((d, di) => {
            return (
              <FPFormControlLabel
                key={di}
                value={d.value}
                control={<FPRadio {...props} />}
                label={d.name}
              />
            )
          })}
        </FPRadioGroup>
      </FormControl>
    </div>
  )
}

export default FPRadioControl
