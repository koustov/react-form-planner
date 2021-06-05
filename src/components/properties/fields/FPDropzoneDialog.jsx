import * as React from 'react'
import { useState, useEffect } from 'react';

import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';


const FPDropzoneDialog = ({ field, filefilter, onChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useState(() => {
    console.error(`XXXXXXXXX > ${JSON.stringify(field)}`)
  }, [field, filefilter])

  const onValueChanged = (files) => {
    const res = [];
    files.forEach((file) => {
      var reader = new FileReader();
      reader.onloadend = function (evt) {
        // file is loaded
        const result_base64 = evt.target.result;
        if (onChange) {
          onChange(field, [result_base64], field);
        }
      };
      reader.readAsDataURL(file);

    })
  }

  useEffect(() => {

  })

  const onAddClicEvent = () => {
    setIsDialogOpen(true);
  }

  const onCloseEvent = () => {
    setIsDialogOpen(false);
  }


  return (
    <div>
      <Button onClick={onAddClicEvent}>
        Add
      </Button>
      <DropzoneDialog
        open={isDialogOpen}
        onSave={(files) => onValueChanged(files)}
        acceptedFiles={field.filefilter || ['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => onCloseEvent()}
      />
    </div>
  )




}

export default FPDropzoneDialog;
