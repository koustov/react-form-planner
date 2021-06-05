import * as React from 'react';
import { FaTextHeight, FaTextWidth, FaSquare, FaCircle, FaGripLines, FaImage, FaVideo, FaFilePdf } from 'react-icons/fa';

const AllControls = [{
  type: "header",
  icon: <FaTextWidth />,
  display: "Header",
  group: 1
}, {
  type: "label",
  icon: <FaTextWidth />,
  display: "Label",
  group: 1
}, {
  type: "text",
  icon: <FaTextWidth />,
  display: "Text Box",
  group: 1
}, {
  type: "number",
  icon: <FaTextWidth />,
  display: "Number",
  group: 1
}, {
  type: "textarea",
  icon: <FaTextHeight />,
  display: "Multiline Text",
  group: 1
}, {
  type: "checkbox",
  icon: <FaSquare />,
  display: "Checkbox",
  group: 1
}, {
  type: "radio",
  icon: <FaCircle />,
  display: "Radio Button",
  group: 1
}, {
  type: "divider",
  icon: <FaGripLines />,
  display: "Divider",
  group: 1
}, {
  type: "image",
  icon: <FaImage />,
  display: "Image",
  group: 1
}, {
  type: "video",
  icon: <FaVideo />,
  display: "Video",
  group: 1
}, {
  type: "pdf",
  icon: <FaFilePdf />,
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
