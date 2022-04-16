import * as React from 'react'

import {
  FaUpload,
  FaTimes
} from 'react-icons/fa'
import { useEffect, useState, Fragment } from 'react'

import { Button, Fab } from '@mui/material'
import { FVFileUpload, FVImageUpload } from '../styled'

export const FVImageloadField = ({
  field,
  filefilter,
  editable,
  inputvalue,
  onValueChanged
}) => {
  const [allImages, setAllImages] = useState([])
  useEffect(() => {
    if (inputvalue) {
      if (Array.isArray(inputvalue)) {
        if (field.multiple) {
          setAllImages(inputvalue)
        } else {
          setAllImages(inputvalue[0])
        }
      } else {
        setAllImages([inputvalue])
      }
    }
  }, inputvalue)

  const addImage = (img, datafield) => {
    allImages.push(img)
    onImageListUpdated(allImages, datafield)
  }

  const removeImage = (index, datafield) => {
    allImages.splice(index, 1)
    onImageListUpdated(allImages, datafield)
  }

  const changeImage = (index, img) => {
    allImages[index] = img
    onImageListUpdated(allImages)
  }

  const onImageListUpdated = (images, datafield) => {
    setAllImages(JSON.parse(JSON.stringify(images)))
    if (onValueChanged) {
      if (field.multiple) {
        onValueChanged(datafield, images, field)
      } else {
        onValueChanged(datafield, images[0], field)
      }
    }
  }

  const handleUpload = (e, datafield) => {
    e.preventDefault()

    const files = e.target.files
    const file = files[0]
    console.log(file.size)
    if (file.size < 2097152) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const data = e.target.result
        addImage(data, datafield)
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
      <FVImageUpload>
        <legend>{field.label}</legend>
        <Fragment>
          {allImages.map((im, imi) => {
            return (
              <div className='image-wrapper' key={imi}>
                <div className='image-container'>
                  <img src={im} />
                </div>
                <Fab color='secondary' aria-label='edit'>
                  <FaTimes 
                    onClick={() => {
                      if (!editable) {
                        removeImage(imi, field.datafield)
                      }
                    }}
                  />
                </Fab>
              </div>
            )
          })}
        </Fragment>
        <div className='upload-file'>
          <div className='file-input'>
            <input
              type='file'
              id={`modal-image-file-${field.datafield}`}
              accept={field.accept || '.jpg,.jpeg,.png'}
              className='file'
              onChange={(e) => {
                if (!editable) {
                  handleUpload(e, field.datafield)
                }
              }}
            />
            <div className='action'>
              <div>
                {field.multiple || allImages.length === 0 ? (
                  <label
                    htmlFor={`modal-image-file-${field.datafield}`}
                    className='action-button'
                  >
                    <FaUpload/>
                    <p className='file-name'></p>
                  </label>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </FVImageUpload>
    </div>
  )
}
