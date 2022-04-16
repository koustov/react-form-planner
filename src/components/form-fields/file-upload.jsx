import * as React from 'react'

import { FaTrashAlt, FaUpload } from 'react-icons/fa'

import { Button } from '@mui/material'
import { FVFileUpload } from '../styled'

export const FVFileUploadField = ({
  field,
  editable,
  filefilter,
  onValueChanged
}) => {
  const handleUpload = (e) => {
    e.preventDefault()

    const files = e.target.files
    const file = files[0]
    console.log(file.size)
    if (file.size < 2097152) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const data = e.target.result
        if (onValueChanged) {
          onValueChanged(field.datafield, data, field)
        }
      }
      reader.readAsDataURL(file)
    } else {
    }
  }

  const onImageClear = () => {
    onValueChanged(field.datafield, undefined, field)
  }

  return (
    <div style={{ flex: 1 }}>
      <FVFileUpload>
        <legend>{field.label}</legend>
        <div className='file-input'>
          <input
            type='file'
            id='modal-image-file'
            accept={field.accept || '.jpg,.jpeg,.png'}
            className='file'
            onChange={handleUpload}
          />
          <div className='action'>
            <div>
              <label htmlFor='modal-image-file' className='action-button'>
                <FaUpload/>
                <p className='file-name'></p>
              </label>
            </div>
            <div>
              <Button
                onClick={() => {
                  if (!editable) {
                    onImageClear()
                  }
                }}
                className='action-button'
              >
                <FaTrashAlt/>
              </Button>
            </div>
          </div>
        </div>
      </FVFileUpload>
    </div>
  )
}
