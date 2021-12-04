import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVTextField } from '../styled'
import { CSSBuilder } from 'react-ui-css-builder'

export const FVFormStyleField = (
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
      <CSSBuilder
        onChange={(e) => {
          if (!editable) {
            if (onValueChanged) {
              onValueChanged(field.datafield, e.target.value, field)
            }
          }
        }}
      />
      {touched && error && <span>{error}</span>}
    </div>
  )
}
