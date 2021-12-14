import { getFinalField } from '../components/properties/fields'
import { v4 as uuidv4 } from 'uuid'

const allDataFields = []
const BaseEditorFiled = {
  col: 12,
  value: '',
  group: 'General',
  datafield: ''
}
const EditorFieldMap = {
  styleeditor: {
    name: 'styleeditor',
    label: '',
    type: 'styleeditor',
    datafield: ''
  },
  grid: {
    name: 'grid',
    label: '',
    type: 'grid',
    datafield: ''
  },
  customprops: {
    name: 'customProperties',
    label: 'Custom Properties',
    type: 'grid',

    datafield: 'props',
    multivalue: true,

    group: 'Properties',
    is_custom: true
  },
  select: {
    name: 'select',
    label: 'Select',
    type: 'select',
    group: 'General'
  },
  radio: {
    name: 'alignment',
    label: 'Alignment',
    type: 'radio',
    group: 'General'
  },
  color: {
    name: 'color',
    label: 'Background Color',
    type: 'color',
    group: 'Colors',
    advancedfeature: true
  },
  imageupload: {
    name: 'imageupload',
    label: 'Image Upload',
    type: 'imageupload',
    group: 'Default'
  },
  text: {
    name: 'title',
    label: 'Label',

    type: 'text',
    datafield: 'label',
    multivalue: true,

    subtype: 'text'
  },
  textarea: {
    name: 'textarea',
    label: 'Label',

    type: 'textarea',
    datafield: 'label'
  },
  richeditor: {
    name: 'richeditor',
    label: 'Label',

    type: 'richeditor',
    required: true,
    datafield: 'label'
  },
  checkbox: {
    name: 'required',
    label: 'Is Required',
    type: 'checkbox',
    datafield: 'required',
    multivalue: false
  },
  fileupload: {
    name: 'title',
    label: 'Label',
    type: 'fileupload',
    required: true,
    datafield: 'value',
    multivalue: true,
    filefilter: ['image/jpeg', 'image/png', 'image/bmp']
  },
  alignment: {
    name: 'title',
    label: 'Alignment',

    type: 'fileupload',
    required: true,
    datafield: 'value',
    multivalue: true,
    is_custom: true,
    filefilter: ['image/jpeg', 'image/png', 'image/bmp']
  }
}

const customStyles = Object.assign(
  Object.assign({}, EditorFieldMap['styleeditor']),
  {
    label: 'Custom Styles',
    datafield: 'style',
    group: 'Styles',
    asobject: true
  }
)

const customProps = Object.assign(Object.assign({}, EditorFieldMap['grid']), {
  label: 'Custom Properties',
  asobject: true,
  datafield: 'props',
  is_custom: true,
  group: 'Props'
})

const getUniqueDataField = () => {
  const df = `F_${uuidv4()}`
  if (allDataFields.indexOf(df) > -1) {
    getUniqueDataField()
  } else {
    allDataFields.push(df)
    return df
  }
}
const getEditorField = (type, datafield, label, overritevalue) => {
  let res = Object.assign(
    {},
    EditorFieldMap[type],
    BaseEditorFiled,
    { label: label },
    overritevalue || {}
  )
  if (datafield) {
    res.datafield = datafield
  } else {
    const df = getUniqueDataField()
    res.datafield = df
  }

  return res
}

const getEditorFields = (type, customdefinition, config) => {
  let res = []
  switch (type) {
    case 'text':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'placeholder', 'Placeholder')],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [getEditorField('text', 'validation', 'Validation Regex')],
        [getEditorField('checkbox', 'required', 'Required')]
      ]
      break
    case 'date':
    case 'datetime':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })]
      ]
      break
    case 'richeditor':
      res = [
        [getEditorField('text', 'label')],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [getEditorField('checkbox', 'required')]
      ]
      break
    case 'select':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'placeholder', 'Placeholder')],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [getEditorField('checkbox', 'required', 'Required')],
        [
          getEditorField('grid', 'options', 'Options', {
            columns: [
              { field: 'name', headerName: 'Display' },
              { field: 'value', headerName: 'Value' }
            ],
            group: 'Options'
          })
        ]
      ]
      break
    case 'checkbox':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })]
      ]
      break

    case 'radio':
      res = [
        [getEditorField('text', 'label', 'Label')],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [
          getEditorField('grid', 'options', 'Options', {
            columns: [
              { field: 'label', headerName: 'Display' },
              { field: 'value', headerName: 'Value' }
            ],
            group: 'Options'
          })
        ]
      ]
      break
    case 'header':
      res = [[getEditorField('text', 'value', 'Text')]]
      break
    case 'label':
      res = [[getEditorField('textarea', 'value', 'Text')]]
      break
    case 'divider':
      res = [getEditorField('customstyle')]
      break
    case 'imageupload':
      res = [
        [
          getEditorField('text', 'datafield', 'Data Field', {
            datafield: uuidv4()
          })
        ],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [getEditorField('checkbox', 'multiple', 'Allow Multiple imaes')]
      ]
      break
    case 'color':
      res = [
        [getEditorField('text', 'label', 'Label Field')],
        [getEditorField('text', 'datafield', 'Datafield', { required: true })],
        [
          getEditorField('text', 'datafield', 'Data Field', {
            datafield: uuidv4()
          })
        ]
      ]
      break
    case 'image':
      res = [
        [getEditorField('imageupload', 'value', 'Image')],
        [
          getEditorField('number', 'style', 'height', {
            asobject: true
          })
        ],
        [
          getEditorField('number', 'style', 'width', {
            asobject: true
          })
        ]
      ]
      break
    case 'video':
      res = [[getEditorField('text', 'value', 'URL')]]
      break
    case 'pdf':
      res = [
        [
          getEditorField('fileupload', 'value', 'PD FFile', {
            accept: ['application/pdf']
          })
        ]
      ]
      break
    case 'question':
      res = [
        [getEditorField('text', 'label', 'Question', { required: true })],
        [getEditorField('imageupload', 'image', 'Upload image [optional]')],
        [
          getEditorField('grid', 'options', 'Options', {
            aslist: true,
            columns: [
              { field: 'name', headerName: 'Answer Option' },
              { field: 'value', hide: true }
            ],
            group: 'Options'
          })
        ],
        [
          getEditorField('select', 'correctanswer', 'Correct Answer', {
            options: '[DATAFIELD]=options',
            group: 'Options'
          })
        ]
      ]
      break
    default:
      res = []
  }
  if (customdefinition && customdefinition[type]) {
    customdefinition[type].forEach((def) => {
      let targetEditor = Object.assign({}, EditorFieldMap[def.type])
      targetEditor = Object.assign(targetEditor, def.props)
      res.push(targetEditor)
    })
  }
  if (config) {
    res.forEach((row) => {
      row.forEach((c) => {
        if (c.advancedfeature && !config.advancedFeatures) {
          c.visible = false
        }
      })
    })
  }
  return res
}

const AllControlsTemplates = [
  {
    type: 'text',
    label: 'Text Box',
    placeholder: 'Text Box placeholder',
    iseditable: true,
    custom: {
      styles: {
        height: '50px'
      }
    }
  },
  {
    type: 'date',
    label: 'Date Picker',
    placeholder: 'Date picker placeholder',
    iseditable: true,
    custom: {
      styles: {
        height: '50px'
      }
    }
  },
  {
    type: 'datetime',
    label: 'Date Time Picker',
    placeholder: 'Date time picker placeholder',
    iseditable: true,
    custom: {
      styles: {
        height: '50px'
      }
    }
  },
  {
    type: 'richeditor',

    label: 'Rich Editor',
    placeholder: '',
    iseditable: true,
    custom: {
      styles: {
        height: '50px'
      }
    }
  },
  {
    type: 'radio',

    placeholder: '',
    label: 'This is a radio button example',
    iseditable: true,
    options: [
      {
        label: 'Option 1',
        value: 1
      },
      {
        label: 'Option 2',
        value: 2
      },
      {
        label: 'Option 3',
        value: 3
      }
    ]
  },
  {
    type: 'question',

    placeholder: '',
    label: 'This is sample question?',
    iseditable: true,
    options: [
      {
        label: 'Sample answer 1',
        value: 'xxx'
      },
      {
        label: 'Sample answer 2',
        value: 'yyy'
      }
    ]
  },
  {
    type: 'checkbox',

    label: 'This is a checkbox example',
    iseditable: true,
    custom: {
      styles: {
        height: '100px'
      }
    }
  },

  {
    type: 'select',

    placeholder: '',
    label: 'This is a select example',
    iseditable: true,
    options: [
      {
        label: 'Option Label',
        value: 'Option Value'
      }
    ]
  },
  {
    type: 'header',
    value: 'This is a header',
    label: 'Value'
  },
  {
    type: 'label',
    value: 'This is a label',
    custom: {
      styles: {
        height: '40px'
      }
    }
  },
  {
    type: 'divider',
    label: ''
  },
  {
    type: 'imageupload',
    datafield: 'image',
    label: ''
  },
  {
    type: 'color',
    datafield: 'color',
    label: ''
  },
  {
    type: 'image',

    label: ''
  },
  {
    type: 'video',

    label: ''
  },
  {
    type: 'pdf',

    label: ''
  }
]

export const getControlTemplate = (
  requestedControl,
  customFieldDefinitions,
  config
) => {
  if (requestedControl && requestedControl.type != '') {
    const foundEntry = AllControlsTemplates.filter((ac) => {
      return ac.type === requestedControl.type
    })
    if (foundEntry && foundEntry.length && foundEntry.length === 1) {
      let fld = Object.assign({}, foundEntry[0])
      // foundEntry.forEach((fld) => {
      fld.editableFields = getEditorFields(
        fld.type,
        customFieldDefinitions,
        config
      )
      if (config.allowCustomProps) {
        fld.editableFields.push([customProps])
      }
      if (config.allowCustomStyles) {
        fld.editableFields.push([customStyles])
      }
      fld = Object.assign(fld, requestedControl)
      fld.template = (definition, data, onChange) => {
        return getFinalField(
          definition,
          onChange,
          data[`${definition.datafield}`],
          definition.label
        )
      }
      // })
      if (fld.iseditable) {
        fld.datafield = getUniqueDataField()
      }
      return fld
    }
  }
  return undefined
}
