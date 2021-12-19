import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVFormControlLabel, FVCheckbox, FVHeaderField } from '../styled'

export const FVFormCheckboxField = (
  {
    field,
    value,
    editable,
    onValueChanged,
    inputvalue,
    required,
    meta: { asyncValidating, touched, error }
  },
  ...rest
) => {
  const [val, setVal] = useState()
  useEffect(() => {
    if (inputvalue !== undefined) {
      setVal(inputvalue)
    }
  }, [touched, error, inputvalue])
  return (
    <FVCheckbox>
      <input
        type='checkbox'
        checked={val}
        id={`${field.datafield}`}
        error={touched && error}
        onChange={(e) => {
          if (onValueChanged) {
            setVal(!val)
            onValueChanged(field.datafield, !val, field)
          }
        }}
      />
      <label htmlFor={`${field.datafield}`}>{field.label}</label>
    </FVCheckbox>
    //   <FVHeaderField>{field.label}</FVHeaderField>
    //   <FVFormControlLabel
    //     control={
    //       <FVCheckbox
    //         checked={inputvalue}
    //         onChange={(e) => {
    //           if (onValueChanged) {
    //             if (!editable) {
    //               onValueChanged(field.datafield, e.target.checked, field)
    //             }
    //           }
    //         }}
    //         name='checkedB'
    //         error={touched && error}
    //         variant='outlined'
    //         {...field.props}
    //         {...rest}
    //       />
    //     }
    //     label={`${field.label}`}
    //   ></FVFormControlLabel>
    // </div>
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
