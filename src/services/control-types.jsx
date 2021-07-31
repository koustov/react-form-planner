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
  faTh,
  faVideo
} from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCircle } from '@fortawesome/free-regular-svg-icons'

const AllControls = [
  {
    type: 'header',
    name: 'header',
    icon: faHeading,
    display: 'Big Header',
    group: 'Basic',
    style: { fontSize: '40px' },
    default: true
  },
  {
    type: 'header',
    icon: faHeading,
    name: 'mediumheader',
    display: 'Medium Header',
    group: 'Basic',
    style: { fontSize: '30px' },
    default: true
  },
  {
    type: 'header',
    icon: faHeading,
    name: 'smallheader',
    display: 'Small Header',
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
    group: 'Form Control',
    bordered: true,
    default: true
  },
  {
    type: 'text',
    icon: faTextWidth,
    name: 'number',
    display: 'Number',
    group: 'Form Control',
    subtype: 'number',
    label: 'Number Box',
    bordered: true,
    default: true
  },
  {
    type: 'text',
    icon: faTextHeight,
    name: 'multiline',
    display: 'Multiline Text',
    group: 'Form Control',
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
    display: 'Rich Text Editor',
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
    group: 'Form Control'
  },
  {
    type: 'select',
    icon: faCaretSquareDown,
    name: 'select',
    display: 'Select',
    group: 'Form Control',
    default: true
  },
  {
    type: 'radio',
    icon: faCircle,
    name: 'radio',
    display: 'Radio Button',
    group: 'Form Control',
    bordered: true,
    multiline: true
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
    style: { height: '100px', width: '100px' },
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
    type: 'question',
    icon: faQuestionCircle,
    name: 'question',
    variant: 'open',
    display: 'Question',
    label: 'This is an example of question?',
    options: [
      {
        label: 'Sample answer options',
        value: 'xx'
      },
      {
        label: 'Sample answer options 2',
        value: 'xx'
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
