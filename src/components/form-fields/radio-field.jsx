import * as React from 'react'

import {
  FVFormControl,
  FVFormControlLabel,
  FVFormLabel,
  FVHeaderField,
  FVRadio,
  FVRadioGroup
} from '../styled'
import { Fragment, useEffect, useState } from 'react'

export const FVFormRadioField = (
  {
    field,
    value,
    editable,
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
      {field.variant === 'open' ? (
        <div>
          <FVHeaderField>{field.label}</FVHeaderField>
          <FVRadioGroup
            aria-label={field.datafield}
            name={field.datafield}
            value={localValue}
            onChange={(e) => {
              if (!editable) {
                onValChange(e)
              }
            }}
            multiline={field.multiline}
            style={{ paddingLeft: '2rem' }}
          >
            {field.options.map((d, di) => {
              return (
                <div key={di}>
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
        </div>
      ) : (
        <FVFormControl component='fieldset'>
          {field.label ? (
            <FVFormLabel component='legend'>{field.label}</FVFormLabel>
          ) : null}

          <FVRadioGroup
            aria-label={field.datafield}
            name={field.datafield}
            value={localValue}
            onChange={(e) => {
              if (!editable) {
                onValChange(e)
              }
            }}
            multiline={field.multiline}
          >
            {field.options.map((d, di) => {
              return (
                <div key={di}>
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
      )}
    </div>
  )
}
