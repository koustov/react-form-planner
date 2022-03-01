import * as React from 'react'

import {
  faBold,
  faCaretSquareDown,
  faFilePdf,
  faFont,
  faGripLines,
  faHeading,
  faICursor,
  faImage,
  faQuestionCircle,
  faTextHeight,
  faTextWidth,
  faCalendar,
  faTh,
  faUpload,
  faVideo,
  faPallet,
  faCheckSquare,
  faCircle
} from '@fortawesome/free-solid-svg-icons'

const AllControls = [
  {
    type: 'header',
    name: 'header',
    icon: faHeading,
    display: 'Large',
    group: 'Basic',
    style: { fontSize: '40px' },
    default: true
  },
  {
    type: 'header',
    icon: faHeading,
    name: 'mediumheader',
    display: 'Medium',
    group: 'Basic',
    style: { fontSize: '30px' },
    default: true
  },
  {
    type: 'header',
    icon: faHeading,
    name: 'smallheader',
    display: 'Small',
    group: 'Basic',
    style: { fontSize: '20px' },
    default: true
  },
  {
    type: 'label',
    icon: faFont,
    name: 'label',
    display: 'Label',
    group: 'Basic',
    default: true
  },
  {
    type: 'text',
    icon: faICursor,
    name: 'textbox',
    display: 'Text Box',
    group: 'Control',
    bordered: true,
    default: true
  },
  {
    type: 'text',
    icon: faTextWidth,
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
    icon: faCalendar,
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
    icon: faCalendar,
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
    icon: faTextHeight,
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
    icon: faBold,
    name: 'richtextbox',
    display: 'Rich Text',
    group: 'Advanced'
  },
  {
    type: 'grid',
    icon: faTh,
    name: 'grid',
    display: 'Grid',
    group: 'Advanced'
  },
  {
    type: 'checkbox',
    icon: faCheckSquare,
    name: 'checkbox',
    display: 'Checkbox',
    group: 'Control'
  },
  {
    type: 'select',
    icon: faCaretSquareDown,
    name: 'select',
    display: 'Select',
    group: 'Control',
    default: true
  },
  {
    type: 'radio',
    icon: faCircle,
    name: 'radio',
    display: 'Radio',
    group: 'Control',
    bordered: true,
    multiline: true
  },
  {
    type: 'color',
    icon: faPallet,
    name: 'color',
    display: 'Color',
    label: 'Color Picker',
    group: 'Control',
    bordered: true
  },
  {
    type: 'divider',
    icon: faGripLines,
    name: 'divider',
    display: 'Divider',
    group: 'Miscellaneous',
    default: true
  },
  {
    type: 'image',
    icon: faImage,
    name: 'image',
    display: 'Image',
    group: 'Media',
    style: { height: '300px', width: '300px' },
    default: true
  },
  {
    type: 'pdf',
    icon: faFilePdf,
    name: 'pdf',
    display: 'PDF',
    group: 'Media'
  },
  {
    type: 'video',
    icon: faVideo,
    name: 'video',
    display: 'Video',
    group: 'Media',
    style: { justifyContent: 'center' }
  },
  {
    type: 'imageupload',
    icon: faUpload,
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
    icon: faUpload,
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
    icon: faQuestionCircle,
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
