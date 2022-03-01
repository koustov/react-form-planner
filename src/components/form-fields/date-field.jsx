import * as React from 'react'
import { useState, useEffect } from 'react'
import DatePickerField from '../date-picker/DatePickerField'
import { FVTextField } from '../styled'

export const FVFormDateField = (
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
      <DatePickerField
        type='date'
        label={field.label}
        editable={editable}
        style={{ width: '100%' }}
        required={field.required}
        error={touched && error}
        {...field.props}
        {...rest}
        onChange={(v) => {
          if (!editable) {
            if (onValueChanged) {
              console.log(v)
              onValueChanged(field.datafield, v, field)
            }
          }
        }}
      ></DatePickerField>
      {/* <FVTextField
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
        type={'date'}
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
      /> */}
      {touched && error && <span>{error}</span>}
    </div>
  )
}
