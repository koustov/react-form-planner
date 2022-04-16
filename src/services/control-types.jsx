import * as React from 'react'

import {
  FaBold,
  FaCaretSquareDown,
  FaFilePdf,
  FaFont,
  FaGripLines,
  FaHeading,
  FaICursor,
  FaImage,
  FaQuestionCircle,
  FaTextHeight,
  FaTextWidth,
  FaCalendar,
  FaTh,
  FaUpload,
  FaVideo,
  FaPallet,
  FaCheckSquare,
  FaCircle
} from 'react-icons/fa'

const AllControls = [
  {
    type: 'header',
    name: 'header',
    icon: FaHeading,
    display: 'Large',
    group: 'Basic',
    style: { fontSize: '40px' },
    default: true
  },
  {
    type: 'header',
    icon: FaHeading,
    name: 'mediumheader',
    display: 'Medium',
    group: 'Basic',
    style: { fontSize: '30px' },
    default: true
  },
  {
    type: 'header',
    icon: FaHeading,
    name: 'smallheader',
    display: 'Small',
    group: 'Basic',
    style: { fontSize: '20px' },
    default: true
  },
  {
    type: 'label',
    icon: FaFont,
    name: 'label',
    display: 'Label',
    group: 'Basic',
    default: true
  },
  {
    type: 'text',
    icon: FaICursor,
    name: 'textbox',
    display: 'Text Box',
    group: 'Control',
    bordered: true,
    default: true
  },
  {
    type: 'text',
    icon: FaTextWidth,
    name: 'number',
    display: 'Number',
    group: 'Control',
    subtype: 'number',
    label: 'Number Box',
    bordered: true,
    default: true
  },
  {
    type: 'date',
    icon: FaCalendar,
    name: 'date',
    display: 'Calendar',
    group: 'Control',
    subtype: 'date',
    label: 'Date Picker',
    bordered: true,
    default: true
  },
  {
    type: 'datetime',
    icon: FaCalendar,
    name: 'datetime',
    display: 'Date Time',
    group: 'Control',
    subtype: 'date',
    label: 'Date Time Picker',
    bordered: true,
    default: true
  },
  {
    type: 'text',
    icon: FaTextHeight,
    name: 'multiline',
    display: 'Multiline',
    group: 'Control',
    multiline: true,
    label: 'Multiline Textbox',
    rows: '4',
    bordered: true,
    default: true
  },
  {
    type: 'richeditor',
    icon: FaBold,
    name: 'richtextbox',
    display: 'Rich Text',
    group: 'Advanced'
  },
  {
    type: 'grid',
    icon: FaTh,
    name: 'grid',
    display: 'Grid',
    group: 'Advanced'
  },
  {
    type: 'checkbox',
    icon: FaCheckSquare,
    name: 'checkbox',
    display: 'Checkbox',
    group: 'Control'
  },
  {
    type: 'select',
    icon: FaCaretSquareDown,
    name: 'select',
    display: 'Select',
    group: 'Control',
    default: true
  },
  {
    type: 'radio',
    icon: FaCircle,
    name: 'radio',
    display: 'Radio',
    group: 'Control',
    bordered: true,
    multiline: true
  },
  {
    type: 'color',
    icon: FaPallet,
    name: 'color',
    display: 'Color',
    label: 'Color Picker',
    group: 'Control',
    bordered: true
  },
  {
    type: 'divider',
    icon: FaGripLines,
    name: 'divider',
    display: 'Divider',
    group: 'Miscellaneous',
    default: true
  },
  {
    type: 'image',
    icon: FaImage,
    name: 'image',
    display: 'Image',
    group: 'Media',
    style: { height: '300px', width: '300px' },
    default: true
  },
  {
    type: 'pdf',
    icon: FaFilePdf,
    name: 'pdf',
    display: 'PDF',
    group: 'Media'
  },
  {
    type: 'video',
    icon: FaVideo,
    name: 'video',
    display: 'Video',
    group: 'Media',
    style: { justifyContent: 'center' }
  },
  {
    type: 'imageupload',
    icon: FaUpload,
    multiple: false,
    name: 'imageupload',
    display: 'Image',
    group: 'Uploads',
    accept: '.jpg,.jpeg,.png',
    bordered: true,
    multiline: true
  },
  {
    type: 'imageupload',
    icon: FaUpload,
    multiple: true,
    name: 'imagesupload',
    display: 'Images',
    group: 'Uploads',
    accept: '.jpg,.jpeg,.png',
    bordered: true,
    multiline: true
  },
  {
    type: 'question',
    icon: FaQuestionCircle,
    name: 'question',
    variant: 'open',
    display: 'Question',
    label: 'This is an example of question?',
    options: [
      {
        name: 'Sample answer options',
        value: 'afba8147-3aef-4426-8384-4e969c70c77d'
      },
      {
        name: 'Sample answer options 2',
        value: 'cfe76801-0ecf-4f8b-9b32-46cdbc0db875'
      }
    ],
    group: 'Quiz'
  }
  // , {
  //   type: "video",
  //   icon: faVideo,
  //   display: "Video",
  //   group: 1
  // }, {
  //   type: "pdf",
  //   icon: faFilePdf,
  //   display: "PDF",
  //   group: 1
  // }
]

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const getControls = (requestedControls) => {
  if (requestedControls && requestedControls.length) {
    const finalResult = []
    let sendingDefault = true
    requestedControls.forEach((rc) => {
      if (rc) {
        sendingDefault = false
        const foundEntry = AllControls.filter((ac) => {
          return ac.name === rc.name
        })
        if (foundEntry && foundEntry.length) {
          finalResult.push(Object.assign(foundEntry[0], rc))
        }
      }
    })
    if (!sendingDefault) {
      return groupBy(finalResult, 'group')
    } else {
      return groupBy(AllControls, 'group')
    }
  } else {
    return groupBy(AllControls, 'group')
  }
}

export const getAllInNameFormat = () => {
  const res = []

  AllControls.forEach((c) => {
    res.push({ name: c.name })
  })
  return res
}
