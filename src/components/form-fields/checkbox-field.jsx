import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVFormControlLabel, FVCheckbox } from '../styled'

export const FVFormCheckboxField = (
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
  useEffect(() => {}, [touched, error])
  return (
    <div>
      <FVFormControlLabel
        control={
          <FVCheckbox
            checked={value}
            onChange={(e) => {
              if (onValueChanged) {
                if (!editable) {
                  onValueChanged(field.datafield, e.target.checked, field)
                }
              }
            }}
            name='checkedB'
            error={touched && error}
            variant='outlined'
            {...field.props}
            {...rest}
          />
        }
        label={`${field.label}`}
      ></FVFormControlLabel>
    </div>
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
