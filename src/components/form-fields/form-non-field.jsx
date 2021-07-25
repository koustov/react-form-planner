import * as React from 'react'
import { useState, useEffect } from 'react'
import {
  FVTextField,
  FVFormRow,
  FPDividerField,
  FVImageContainer,
  FVHeaderField,
  FVLabelField
} from '../styled'
import { Field } from 'redux-form'
import { FVVideoField } from './video-field'

export const FVFormNonField = (props) => {
  const renderSwitch = () => {
    switch (props.field.type) {
      case 'image':
        return (
          <FVImageContainer {...props.field.props}>
            <img
              src={props.field.value}
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
          </FVImageContainer>
        )
      case 'divider':
        return <FPDividerField {...props} />
      case 'header':
        return (
          <FVHeaderField
            {...props}
            style={JSON.parse(JSON.stringify(props.field.style || {}))}
          >
            {props.field.value}
          </FVHeaderField>
        )
      case 'label':
        return (
          <FVLabelField
            dangerouslySetInnerHTML={{ __html: props.field.value }}
            {...props}
          ></FVLabelField>
        )
      case 'video':
        return (
          <FVVideoField
            field={props.field}
            {...props}
            style={JSON.parse(JSON.stringify(props.field.style || {}))}
          ></FVVideoField>
        )
      default:
        return 'foo'
    }
  }

  return <React.Fragment>{renderSwitch()}</React.Fragment>
  //   <div>
  //     <label>{label}</label>
  //     <div>
  //       <input {...input} placeholder={label} type={type} />
  //       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  //     </div>
  //   </div>
  // )
}
