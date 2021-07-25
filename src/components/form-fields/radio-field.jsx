import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FVFormLabel,
  FVRadioGroup,
  FVFormControlLabel,
  FVRadio,
  FVFormControl
} from '../styled'
export const FVFormRadioField = (
  {
    field,
    value,
    onValueChanged,
    required,
    meta: { asyncValidating, touched, error }
  },
  ...rest
) => {
  const [localValue, setLocalvalue] = useState(value)

  const onValChange = (e) => {
    setLocalvalue(e.target.value)
    if (onValueChanged) {
      const retValue = field.options.filter((f) => {
        return f.value.toString() === e.target.value.toString()
      })
      if (retValue && retValue.length && retValue[0].returnvalue) {
        onValueChanged(field.datafield, retValue[0].returnvalue, field)
      } else {
        onValueChanged(field.datafield, e.target.value, field)
      }
    }
  }
  return (
    <div>
      <FVFormControl component='fieldset'>
        {field.label ? (
          <FVFormLabel component='legend'>{field.label}</FVFormLabel>
        ) : null}

        <FVRadioGroup
          aria-label={field.datafield}
          name={field.datafield}
          value={localValue}
          onChange={onValChange}
          multiline={field.multiline}
        >
          {field.options.map((d, di) => {
            return (
              <div>
                <FVFormControlLabel
                  key={di}
                  value={d.value}
                  control={<FVRadio {...rest} />}
                  label={d.label}
                />
              </div>
            )
          })}
        </FVRadioGroup>
      </FVFormControl>
    </div>
  )
}
