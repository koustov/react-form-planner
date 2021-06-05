import { getFinalField } from '../components/properties/fields';


const BaseEditorFiled = {
  col: 12,
  value: '',
  group: "Default",
  datafield: ""
}
const EditorFieldMap = {
  customstyle: {
    name: 'customStyles',
    label: "Custom Styles",
    type: 'grid',
    datafield: "",
    targetField: 'style',
    is_custom: true,
    group: "Styles",
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

const IsRequiredField = {
  name: 'required',
  label: "Is Required",
  type: 'checkbox',
  datafield: "",
  required: true,
  targetField: 'required',
  multivalue: false,


}
const LabelField = {
  name: 'title',
  label: "Label",
  datafield: "",
  type: 'text',
  required: true,
  targetField: 'label',
  multivalue: true,


}
const TextEditorField = {
  name: 'text-field',
  label: "",
  datafield: "",
  type: 'text',
  required: true,
  targetField: '',
  multivalue: true,


}
const ImageField = {
  name: 'title',
  label: "Label",
  datafield: "",
  type: 'fileupload',
  required: true,
  targetField: 'value',
  multivalue: true,


}
const FileField = {
  name: 'title',
  label: "Label",
  datafield: "",
  type: 'fileupload',
  required: true,
  targetField: 'value',
  multivalue: true,


}


const getEditorField = (type, targetfield, overritevalue) => {
  let res = Object.assign({}, BaseEditorFiled, EditorFieldMap[type], overritevalue || {});
  if (targetfield) {
    res.targetField = targetfield
  }

  return res;
}


const AllControlsTemplates = [{
  type: "text",
  datafield: "",
  label: 'Question for one liner answer',
  placeholder: "This is a single line answer template",
  template: (definition, data, onChange) => {
    return getFinalField(definition, onChange, data[`${definition.datafield}`], definition.label)
  },
  custom: {
    styles: {
      height: '50px'
    }
  },
  editableFields: [
    getEditorField("text", "label"),
    getEditorField("checkbox", "required"),
    getEditorField("customstyle"),
    getEditorField("customprops")
  ]
}, {
  type: "textarea",
  datafield: "",
  placeholder: "This is a multiline asnwer template",
  label: 'Question for multi liner answer',
  template: (definition, data, onChange) => {
    return getFinalField(definition, onChange, data[`${definition.datafield}`], definition.label)
  },
  custom: {
    styles: {
      height: '100px'
    },
    props: {
      rows: 4
    }
  },
  editableFields: [
    getEditorField("text", "label"),
    getEditorField("checkbox", "required"),
    getEditorField("customstyle"),
    getEditorField("customprops"),
  ]
}, {
  type: "header",
  datafield: "",
  label: 'This is a header',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  editableFields: [
    getEditorField("text", "label"),
    getEditorField("customstyle"),
    getEditorField("customprops"),
  ]
}, {
  type: "label",
  datafield: "",
  label: 'This is a label',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  custom: {
    styles: {
      height: '40px'
    }
  },
  editableFields: [
    getEditorField("text", "label"),
    getEditorField("checkbox", "required"),
    getEditorField("customstyle"),
    getEditorField("customprops"),
  ]
}, {
  type: "divider",
  datafield: "",
  label: 'This is a header',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  editableFields: [
    getEditorField("customstyle")]
}, {
  type: "image",
  datafield: "",
  label: '',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  editableFields: [
    getEditorField("fileupload"),
    getEditorField("text", "height", { label: "Height", subtype: "number", col: 6, value: 200, is_custom: true }),
    getEditorField("text", "width", { label: "Width", subtype: "number", col: 6, value: 200, is_custom: true }),
    getEditorField("customstyle"),
    getEditorField("customprops")
  ]
}, {
  type: "video",
  datafield: "",
  label: '',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  editableFields: [
    getEditorField("text", "value", { label: "URL" }),
    getEditorField("customstyle"),
    getEditorField("customprops")
  ]
}, {
  type: "pdf",
  datafield: "",
  label: '',
  template: (definition) => {
    return getFinalField(definition, undefined, undefined, definition.label)
  },
  editableFields: [
    getEditorField("fileupload", "value", { filefilter: ['application/pdf'] }),
    getEditorField("customstyle"),
    getEditorField("customprops")
  ]
}]

export const getControlTemplate = (requestedControl) => {
  if (requestedControl && requestedControl != '') {
    const foundEntry = AllControlsTemplates.filter((ac) => { return ac.type === requestedControl });
    if (foundEntry && foundEntry.length) {
      return foundEntry[0];
    }
  }
  return undefined;
}
