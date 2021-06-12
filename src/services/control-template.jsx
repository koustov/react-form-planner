import { getFinalField } from '../components/properties/fields';


const BaseEditorFiled = {
  col: 12,
  value: '',
  group: "Default",
  datafield: ""
}
const EditorFieldMap = {
  grid: {
    name: 'grid',
    label: "",
    type: 'grid',
    datafield: ""
  },
  customprops: {
    name: 'customProperties',
    label: "Custom Properties",
    type: 'grid',
    datafield: "",
    targetField: 'props',
    multivalue: true,

    group: "Properties",
    is_custom: true
  },
  radio: {
    name: 'alignment',
    label: "Alignment",
    type: 'radio',
    group: "Default"
  },
  text: {
    name: 'title',
    label: "Label",
    datafield: "",
    type: 'text',
    required: true,
    targetField: 'label',
    multivalue: true,

    subtype: 'text',

  },
  textarea: {
    name: 'textarea',
    label: "Label",
    datafield: "",
    type: 'textarea',
    targetField: 'label',
  },
  richeditor: {
    name: 'richeditor',
    label: "Label",
    datafield: "",
    type: 'richeditor',
    required: true,
    targetField: 'label'
  },
  checkbox: {
    name: 'required',
    label: "Is Required",
    type: 'checkbox',
    datafield: "",
    required: true,
    targetField: 'required',
    multivalue: false,


  },
  fileupload: {
    name: 'title',
    label: "Label",
    datafield: "",
    type: 'fileupload',
    required: true,
    targetField: 'value',
    multivalue: true,
    filefilter: ['image/jpeg', 'image/png', 'image/bmp'],
  },
  alignment: {
    name: 'title',
    label: "Alignment",
    datafield: "",
    type: 'fileupload',
    required: true,
    targetField: 'value',
    multivalue: true,
    is_custom: true,
    filefilter: ['image/jpeg', 'image/png', 'image/bmp'],
  }
}

const customStyles = Object.assign(Object.assign({}, EditorFieldMap['grid']), {
  label: "Custom Styles",
  datafield: "",
  targetField: 'style',
  is_custom: true,
  group: "Styles",
});

const customProps = Object.assign(Object.assign({}, EditorFieldMap['grid']), {
  label: "Custom Properties",
  datafield: "",
  targetField: 'props',
  is_custom: true,
  group: "Props",
});


const getEditorField = (type, targetfield, overritevalue) => {
  let res = Object.assign({}, BaseEditorFiled, EditorFieldMap[type], overritevalue || {});
  if (targetfield) {
    res.targetField = targetfield
  }
  return res;
}

const getEditorFields = (type, customdefinition) => {
  let res = [];
  switch (type) {
    case "text": res = [
      getEditorField("text", "label"),
      getEditorField("checkbox", "required"),
      customStyles,
      customProps
    ];
      break
    case 'richeditor': res = [
      getEditorField("text", "label"),
      getEditorField("checkbox", "required"),
      customStyles,
      customProps
    ];
      break;
    case 'textarea': [
      getEditorField("text", "label"),
      getEditorField("checkbox", "required"),
      customStyles,
      customProps
    ];
      break;
    case 'radio': res = [
      getEditorField("text", "label"),
      getEditorField("grid", "data", {
        columns: [
          { field: 'name', headerName: 'Display' },
          { field: 'value', headerName: 'Value' },
        ],
        label: 'Options',
        group: 'Options',
        is_custom: true,
        targetField: 'style',
        dataField: 'justify-content'
      }),
      customStyles,
      customProps
    ];
      break;
    case 'header': res = [
      getEditorField("text", "label"),
      getEditorField("radio", "style", {
        data: [{
          name: 'Left',
          value: 1,
          returnvalue: { name: 'justify-content', value: 'flex-start' }
        }, {
          name: 'Middle',
          value: 2,
          returnvalue: { name: 'justify-content', value: 'center' }
        }, {
          name: 'Right',
          value: 3,
          returnvalue: { name: 'justify-content', value: 'flex-end' }
        }],
        is_custom: true,
        isappend: true,
      }),
      customStyles,
      customProps
    ];
      break;
    case 'label': res = [
      getEditorField("textarea", "label"),
      getEditorField("radio", "style", {
        data: [{
          name: 'Left',
          value: 1,
          returnvalue: { name: 'justify-content', value: 'flex-start' }
        }, {
          name: 'Middle',
          value: 2,
          returnvalue: { name: 'justify-content', value: 'center' }
        }, {
          name: 'Right',
          value: 3,
          returnvalue: { name: 'justify-content', value: 'flex-end' }
        }],
        is_custom: true,
        isappend: true,
      }),
      customStyles,
      customProps
    ];
      break;
    case 'divider': res = [getEditorField("customstyle")]
      break;
    case 'image': res = [
      getEditorField("fileupload"),
      getEditorField("text", "height", { label: "Height", subtype: "number", col: 6, value: 200, is_custom: true }),
      getEditorField("text", "width", { label: "Width", subtype: "number", col: 6, value: 200, is_custom: true }),
      customStyles,
      customProps
    ];
      break;
    case 'video': res = [
      getEditorField("text", "value", { label: "URL" }),
      customStyles,
      customProps
    ];
      break;
    case 'pdf': res = [
      getEditorField("fileupload", "value", { filefilter: ['application/pdf'] }),
      customStyles,
      customProps
    ];
      break;
    default: res = [];
  }
  if (customdefinition && customdefinition[type]) {
    customdefinition[type].forEach((def) => {
      let targetEditor = Object.assign({}, EditorFieldMap[def.type]);
      targetEditor = Object.assign(targetEditor, def.props);
      res.push(targetEditor)
    })
  }
  return res;
}


const AllControlsTemplates = [{
  type: "text",
  datafield: "",
  label: 'Question for one liner answer',
  placeholder: "This is a single line answer template",
  custom: {
    styles: {
      height: '50px'
    }
  }
}, {
  type: "richeditor",
  datafield: "",
  label: 'Rich Editor',
  placeholder: "",
  custom: {
    styles: {
      height: '50px'
    }
  }
}, {
  type: "textarea",
  datafield: "",
  placeholder: "This is a multiline asnwer template",
  label: 'Question for multi liner answer',
  custom: {
    styles: {
      height: '100px'
    },
    props: {
      rows: 4
    }
  },
}, {
  type: "radio",
  datafield: "",
  placeholder: "",
  label: 'This is a radio button example',
  custom: {
    styles: {
      height: '100px'
    },
    props: {
      rows: 4
    }
  },
  data: [{
    name: "Sample radio button",
    value: 1
  }]
}, {
  type: "header",
  datafield: "",
  label: 'This is a header'
}, {
  type: "label",
  datafield: "",
  label: 'This is a label',
  custom: {
    styles: {
      height: '40px'
    }
  }
}, {
  type: "divider",
  datafield: "",
  label: ''
}, {
  type: "image",
  datafield: "",
  label: ''
}, {
  type: "video",
  datafield: "",
  label: ''
}, {
  type: "pdf",
  datafield: "",
  label: ''
}]

export const getControlTemplate = (requestedControl, customFieldDefinitions) => {
  if (requestedControl && requestedControl != '') {
    const foundEntry = AllControlsTemplates.filter((ac) => { return ac.type === requestedControl });
    if (foundEntry && foundEntry.length) {
      foundEntry.forEach((fld) => {
        fld.editableFields = getEditorFields(fld.type, customFieldDefinitions);
        fld.template = (definition, data, onChange) => {
          return getFinalField(definition, onChange, data[`${definition.datafield}`], definition.label)
        }
      });
      return foundEntry[0];
    }
  }
  return undefined;
}
