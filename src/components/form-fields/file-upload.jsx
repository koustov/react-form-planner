import * as React from 'react'

import { faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

import { Button } from '@material-ui/core'
import { FVFileUpload } from '../styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        // setBase64(data);
        // setImageSize(data);
        // document.getElementById('layout-save').hidden = false;
      }
      reader.readAsDataURL(file)
    } else {
      // addToast(`File size too big!`, {
      //     appearance: 'warning',
      //     autoDismiss: true
      // })
      // try { document.getElementById('layout-file').value = '' } catch (error) { }
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
              <label for='modal-image-file' className='action-button'>
                <FontAwesomeIcon icon={faUpload} />
                <p className='file-name'></p>
              </label>
            </div>
            <div>
              <Button
                color='primary'
                onClick={() => {
                  if (!editable) {
                    onImageClear()
                  }
                }}
                className='action-button'
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </div>
          </div>
        </div>
      </FVFileUpload>
    </div>
  )
}
