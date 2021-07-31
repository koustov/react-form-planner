import * as React from 'react'
import {
  faTextHeight,
  faTextWidth,
  faHeading,
  faFont,
  faGripLines,
  faImage,
  faVideo,
  faFilePdf,
  faTh,
  faBold,
  faICursor,
  faCaretSquareDown
} from '@fortawesome/free-solid-svg-icons'

import { faCheckSquare, faCircle } from '@fortawesome/free-regular-svg-icons'

const AllControls = [
  {
    type: 'header',
    icon: faHeading,
    display: 'Big Header',
    group: 'Basic',
    style: { fontSize: '40px' }
  },
  {
    type: 'header',
    icon: faHeading,
    display: 'Medium Header',
    group: 'Basic',
    style: { fontSize: '30px' }
  },
  {
    type: 'header',
    icon: faHeading,
    display: 'Small Header',
    group: 'Basic',
    style: { fontSize: '20px' }
  },
  {
    type: 'label',
    icon: faFont,
    display: 'Label',
    group: 'Basic'
  },
  {
    type: 'text',
    icon: faICursor,
    display: 'Text Box',
    group: 'Form Control',
    bordered: true
  },
  {
    type: 'text',
    icon: faTextWidth,
    display: 'Number',
    group: 'Form Control',
    subtype: 'number',
    label: 'Number Box',
    bordered: true
  },
  {
    type: 'text',
    icon: faTextHeight,
    display: 'Multiline Text',
    group: 'Form Control',
    multiline: true,
    label: 'Multiline Textbox',
    rows: '4',
    bordered: true
  },
  {
    type: 'richeditor',
    icon: faBold,
    display: 'Rich Text Editor',
    group: 'Advanced'
  },
  {
    type: 'grid',
    icon: faTh,
    display: 'Grid',
    group: 'Advanced'
  },
  {
    type: 'checkbox',
    icon: faCheckSquare,
    display: 'Checkbox',
    group: 'Form Control'
  },
  {
    type: 'select',
    icon: faCaretSquareDown,
    display: 'Select',
    group: 'Form Control'
  },
  {
    type: 'radio',
    icon: faCircle,
    display: 'Radio Button',
    group: 'Form Control',
    bordered: true,
    multiline: true
  },
  {
    type: 'divider',
    icon: faGripLines,
    display: 'Divider',
    group: 'Miscellaneous'
  },
  {
    type: 'image',
    icon: faImage,
    display: 'Image',
    group: 'Media',
    style: { height: '100px', width: '100px' }
  },
  {
    type: 'pdf',
    icon: faFilePdf,
    display: 'PDF',
    group: 'Media'
  },
  {
    type: 'video',
    icon: faVideo,
    display: 'Video',
    group: 'Media',
    style: { justifyContent: 'center' }
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
          return ac.type === rc
        })
        if (foundEntry && foundEntry.length) {
          finalResult.push(foundEntry[0])
        }
      }
    })
    if (!sendingDefault) {
      return finalResult
    } else {
      return groupBy(AllControls, 'group')
    }
  } else {
    return groupBy(AllControls, 'group')
  }
}
