import * as React from 'react';
import { useState, useEffect } from 'react';
import { getFinalField } from './components/properties/fields';
import { FPFormRow, FPFormWrapper } from './components/styled';

export const FormViewer = ({ templates, data, onFormValueChanged, onControlValueChanged }) => {

  const [finalData, setFinalData] = useState({});

  useEffect(() => {
    if (data) {
      setFinalData(data);
    }
  }, [data])

  const controlValueChanged = (key, value, fld) => {
    finalData[key] = value;
    setFinalData(finalData)
    if (onControlValueChanged) {
      onControlValueChanged(key, value, fld);
    }
    if (onFormValueChanged) {
      onFormValueChanged(finalData);
    }
  }


  return (
    <FPFormWrapper>
      {
        templates.map((ft, fti) => {
          return <FPFormRow key={fti}>
            {getFinalField(ft, controlValueChanged, finalData[ft.datafield])}
          </FPFormRow>
        })
      }
    </FPFormWrapper>
  )
}
