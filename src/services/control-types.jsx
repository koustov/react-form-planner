import * as React from 'react';
import {
  faTextHeight,
  faTextWidth,
  faHeading,
  faFont,
  faGripLines,
  faImage,
  faVideo,
  faFilePdf,
  faBold,
  faICursor
} from '@fortawesome/free-solid-svg-icons';

import {
  faCheckSquare,
  faCircle,
} from '@fortawesome/free-regular-svg-icons';


const AllControls = [{
  type: "header",
  icon: faHeading,
  display: "Header",
  group: 1
}, {
  type: "label",
  icon: faFont,
  display: "Label",
  group: 1
}, {
  type: "text",
  icon: faICursor,
  display: "Text Box",
  group: 1
}, {
  type: "number",
  icon: faTextWidth,
  display: "Number",
  group: 1
}, {
  type: "textarea",
  icon: faTextHeight,
  display: "Multiline Text",
  group: 1
}, {
  type: "richeditor",
  icon: faBold,
  display: "Rich Text Editor",
  group: 1
}, {
  type: "checkbox",
  icon: faCheckSquare,
  display: "Checkbox",
  group: 1
}, {
  type: "radio",
  icon: faCircle,
  display: "Radio Button",
  group: 1
}, {
  type: "divider",
  icon: faGripLines,
  display: "Divider",
  group: 1
}, {
  type: "image",
  icon: faImage,
  display: "Image",
  group: 1
}, {
  type: "video",
  icon: faVideo,
  display: "Video",
  group: 1
}, {
  type: "pdf",
  icon: faFilePdf,
  display: "PDF",
  group: 1
}]

export const getControls = (requestedControls) => {
  if (requestedControls && requestedControls.length) {
    const finalResult = [];
    let sendingDefault = true;
    requestedControls.forEach((rc) => {
      if (rc) {
        sendingDefault = false;
        const foundEntry = AllControls.filter((ac) => { return ac.type === rc });
        if (foundEntry && foundEntry.length) {
          finalResult.push(foundEntry[0]);
        }
      }
    });
    if (!sendingDefault) {
      return finalResult;
    } else {
      return AllControls;
    }
  } else {
    return AllControls;
  }
}
