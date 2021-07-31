import * as React from 'react'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  FPSideBar,
  FPDividerField,
  FVTextField,
  FPToolButton
} from '../../components/styled'

import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons'
import Grid from '@material-ui/core/Grid'

export const FormProperties = ({ data, onChange, onClose }) => {
  const [formProperties, setFormProperties] = useState({})

  // const [dragState, setDragState] = useState({ quotes: initial });

  useEffect(() => {
    const subset = (({ title, description, banner, background }) => ({
      title,
      description,
      banner,
      background
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

  // Rendering
  return (
    <FPSideBar>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <FVTextField
            id={`text-field-title`}
            label={`Form Title`}
            value={formProperties['title']}
            onChange={(e) => {
              onValueChanged('title', e.target.value)
            }}
            fullWidth
            size='small'
            variant='outlined'
          />
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <FVTextField
            id={`text-field-description`}
            label={`Description`}
            value={formProperties['description']}
            onChange={(e) => {
              onValueChanged('description', e.target.value)
            }}
            fullWidth
            size='small'
            variant='outlined'
          />
        </Grid>
      </Grid>

      <div className='fp-side-bar-footer'>
        <FPDividerField />
        <FPToolButton
          variant='contained'
          color='primary'
          size='large'
          aria-label='save'
          onClick={() => onSaveClicked()}
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
          style={{ width: '150px' }}
        >
          <FontAwesomeIcon icon={faTimes} />
          <span>Cancel</span>
        </FPToolButton>
      </div>
    </FPSideBar>
  )
}
