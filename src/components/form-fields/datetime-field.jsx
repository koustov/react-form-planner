import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVTextField } from '../styled'

export const FVFormDateTimeField = (
  {
    field,
    value,
    editable,
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
          if (!editable) {
            if (onValueChanged) {
              onValueChanged(field.datafield, e.target.value, field)
            }
          }
        }}
        InputLabelProps={{
          shrink: true
        }}
        type={'datetime-local'}
        fullWidth
        size='small'
        required={field.required}
        error={touched && error}
        variant='outlined'
        style={{ width: '100%' }}
        multiline={field.multiline}
        rows={field.multiline ? field.rows || '4' : '0'}
        {...field.props}
        {...rest}
      />
      {touched && error && <span>{error}</span>}
    </div>
  )
}
