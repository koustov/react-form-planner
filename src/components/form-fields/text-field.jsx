import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVTextField } from '../styled'

export const FVFormTextField = (
  {
    field,
    value,
    inputvalue,
    onValueChanged,
    required,
    meta: { asyncValidating, touched, error }
  },
  ...rest
) => {
  useEffect(() => {}, [touched, error])
  return (
    <div style={{ width: '100%' }}>
      <FVTextField
        id={`text-field-${field.datafield}`}
        label={`${field.label}`}
        value={inputvalue}
        onChange={(e) => {
          if (onValueChanged) {
            onValueChanged(field.datafield, e.target.value, field)
          }
        }}
        type={field.subtype || 'text'}
        fullWidth
        size='small'
        required={field.required}
        error={touched && error}
        variant='outlined'
        style={{ width: '100%' }}
        multiline={field.multiline}
        rows={field.multiline ? field.rows || '4' : '0'}
        type={field.subtype ? field.subtype : 'text'}
        placeholder={field.placeholder}
        {...field.props}
        {...rest}
      />
      {touched && error && <span>{error}</span>}
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
