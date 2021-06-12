import * as React from 'react'
import { useState, useEffect } from 'react';
import { FPRadio, FPFormControlLabel, FPHeaderField, FPLabelField, FPTextField, FPNoContentAvailable, FPFormLabel, FPRichTextEditor, FPFieldSet } from "../../styled";
import FormControl from '@material-ui/core/FormControl';

const FPRadioControl = ({ rows, columns, field, onChange, ...props }) => {
  const [localValue, setLocalvalue] = useState(field.value);


  const onValueChanged = (e) => {
    setLocalvalue(e.target.checked)
    if (onChange) {
      onChange(field, localValue, field);
    }
  }

  useEffect(() => {
  }, [])

  return (
    <div>
      <FormControl component="fieldset">
        {
          field.label ? (<FPFormLabel component="legend">{field.label}</FPFormLabel>) : (null)
        }

        <FPFieldSet aria-label={field.datafield} name={field.datafield} value={localValue} onChange={onValueChanged}>
          {
            field.data.map((d, di) => {
              return <FPFormControlLabel key={di} value={d.value} control={<FPRadio {...props} />} label={d.name} />
            })
          }
        </FPFieldSet>
      </FormControl>
    </div >
  )




}

export default FPRadioControl
