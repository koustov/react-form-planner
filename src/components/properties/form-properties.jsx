import * as React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  FPSideBar,
  FPDividerField,
  FVTextField,
  FPToolButton,
  FPMediumHeader,
  FPMediumHeaderBar,
  FPPaperVerticalPadding
} from '../../components/styled'

import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import { FormViewer } from '../../FormViewer'
import Grid from '@material-ui/core/Grid'

export const FormProperties = ({ data, onChange, onClose }) => {
  const [formProperties, setFormProperties] = useState({})

  // const [dragState, setDragState] = useState({ quotes: initial });

  useEffect(() => {
    const subset = (({
      title,
      description,
      banner,
      background,
      backgroundcolor,
      bannercolor
    }) => ({
      title,
      description,
      banner,
      background,
      backgroundcolor,
      bannercolor
    }))(data)
    setFormProperties(subset)
  }, [data])

  const onValueChanged = (key, value) => {
    formProperties[key] = value
    setFormProperties(formProperties)
  }

  // Event Handlers
  const onSaveClicked = () => {
    if (onChange) {
      onChange(formProperties)
    }
  }

  const onFormValueChanged = (key, value, field) => {
    formProperties[key] = value
    setFormProperties({ ...formProperties })
  }

  // Rendering
  return (
    <FPPaperVerticalPadding style={{ height: '100%' }}>
      <div>
        <FPMediumHeaderBar>
          <div className='header-title'>
            <FPMediumHeader>Form Properties</FPMediumHeader>
          </div>
          <div className='header-tool-bar'>
            <FPToolButton
              variant='contained'
              color='primary'
              size='large'
              aria-label='save'
              onClick={() => onSaveClicked()}
              anchor={'bottom'}
              style={{ width: '150px' }}
            >
              <FontAwesomeIcon icon={faSave} />
              <span>Save</span>
            </FPToolButton>
            <FPToolButton
              variant='contained'
              color='default'
              size='large'
              aria-label='move down'
              onClick={() => onClose()}
              anchor={'bottom'}
              style={{ width: '150px' }}
            >
              <FontAwesomeIcon icon={faTimes} />
              <span>Cancel</span>
            </FPToolButton>
          </div>
        </FPMediumHeaderBar>
        <div style={{ display: 'flex', flex: 1 }}>
          <FormViewer
            data={formProperties}
            onChange={(key, value, field) => {
              onFormValueChanged(key, value, field)
            }}
            template={{
              fields: [
                [
                  {
                    type: 'header',
                    value: 'Update form properties'
                  }
                ],
                [
                  { type: 'text', datafield: 'title', label: 'Title' },
                  {
                    type: 'text',
                    datafield: 'description',
                    label: 'Description'
                  }
                ],
                [
                  {
                    type: 'imageupload',
                    datafield: 'banner',
                    label: 'Banner Image'
                  },
                  {
                    type: 'imageupload',
                    datafield: 'background',
                    label: 'Background Image'
                  }
                ],
                [
                  {
                    type: 'color',
                    datafield: 'bannercolor',
                    label: 'Banner Color'
                  },
                  {
                    type: 'color',
                    datafield: 'backgroundcolor',
                    label: 'Background Color'
                  }
                ]
              ]
            }}
          />
        </div>
      </div>
    </FPPaperVerticalPadding>
  )
}
