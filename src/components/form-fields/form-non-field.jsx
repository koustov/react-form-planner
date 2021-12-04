import * as React from 'react'
import { useState, useEffect, Fragement } from 'react'
import {
  FVTextField,
  FVFormRow,
  FPNoContentAvailable,
  FPDividerField,
  FVImageContainer,
  FVHeaderField,
  FVLabelField
} from '../styled'
import { FVVideoField } from './video-field'
import { FVPDFViewer } from './pdf-field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons'

export const FVFormNonField = (props) => {
  const renderSwitch = () => {
    switch (props.field.type) {
      case 'image':
        return (
          <FVImageContainer {...props.field.props}>
            {props.field.value && props.field.value.length ? (
              <img
                src={props.field.value}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <FPNoContentAvailable>
                <div>
                  <FontAwesomeIcon icon={faImage} />
                </div>
                <div>NO IMAGE SELECTED</div>
              </FPNoContentAvailable>
            )}
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
      case 'pdf':
        return (
          <FVPDFViewer
            field={props.field}
            {...props}
            style={JSON.parse(JSON.stringify(props.field.style || {}))}
          ></FVPDFViewer>
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
