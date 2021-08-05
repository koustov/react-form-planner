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
    group: 'Colors'
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

const customStyles = Object.assign(Object.assign({}, EditorFieldMap['grid']), {
  label: 'Custom Styles',
  datafield: 'style',
  group: 'Styles',
  asobject: true
})

const customProps = Object.assign(Object.assign({}, EditorFieldMap['grid']), {
  label: 'Custom Properties',
  asobject: true,
  datafield: 'props',
  is_custom: true,
  group: 'Props'
})

const getUniqueDataField = () => {
  const df = `Field_${Math.floor(Math.random() * 10000) + 1}`
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

const getEditorFields = (type, customdefinition) => {
  let res = []
  switch (type) {
    case 'text':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'placeholder', 'Placeholder')],
        [getEditorField('text', 'validation', 'Validation Regex')],
        [getEditorField('checkbox', 'required', 'Required')],
        [
          getEditorField('color', 'style', 'Text Color', {
            internalDatafield: 'color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Border Color', {
            internalDatafield: 'border-color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Background Color', {
            internalDatafield: 'background-color',
            isappend: true,
            asobject: true
          })
        ]
      ]
      break
    case 'richeditor':
      res = [
        getEditorField('text', 'label'),
        getEditorField('checkbox', 'required')
      ]
      break
    case 'select':
      res = [
        [getEditorField('text', 'label', 'Label', { required: true })],
        [getEditorField('text', 'placeholder', 'Placeholder')],
        [getEditorField('checkbox', 'required', 'Required')],
        [
          getEditorField('grid', 'options', 'Options', {
            columns: [
              { field: 'name', headerName: 'Display' },
              { field: 'value', headerName: 'Value' }
            ],
            group: 'Options'
          })
        ],
        [
          getEditorField('color', 'style', 'Text Color', {
            internalDatafield: 'color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Border Color', {
            internalDatafield: 'border-color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Background Color', {
            internalDatafield: 'background-color',
            isappend: true,
            asobject: true
          })
        ]
      ]
      break
    case 'checkbox':
      res = [[getEditorField('text', 'label', 'Label', { required: true })]]
      break

    case 'radio':
      res = [
        [getEditorField('text', 'label', 'Label')],
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
      res = [
        [getEditorField('text', 'value', 'Text')],
        [
          getEditorField('select', 'style', 'Alignment', {
            options: [
              {
                name: 'Left',
                value: 1,
                returnvalue: { 'justify-content': 'flex-start' }
              },
              {
                name: 'Middle',
                value: 2,
                returnvalue: { 'justify-content': 'center' }
              },
              {
                name: 'Right',
                value: 3,
                returnvalue: { 'justify-content': 'flex-end' }
              }
            ],
            isappend: true,
            asobject: true
          })
        ],
        [
          getEditorField('color', 'style', 'Text Color', {
            internalDatafield: 'color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Border Color', {
            internalDatafield: 'borderColor',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Background Color', {
            internalDatafield: 'backgroundColor',
            isappend: true,
            asobject: true
          })
        ]
      ]
      break
    case 'label':
      res = [
        [getEditorField('textarea', 'value', 'Text')],
        [
          getEditorField('select', 'style', 'Alignment', {
            options: [
              {
                label: 'Left',
                value: 1,
                returnvalue: { 'justify-content': 'flex-start' }
              },
              {
                label: 'Middle',
                value: 2,
                returnvalue: { 'justify-content': 'center' }
              },
              {
                label: 'Right',
                value: 3,
                returnvalue: { 'justify-content': 'flex-end' }
              }
            ],
            asobject: true
          })
        ],
        [
          getEditorField('color', 'style', 'Text Color', {
            internalDatafield: 'color',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Border Color', {
            internalDatafield: 'borderColor',
            isappend: true,
            asobject: true
          }),
          getEditorField('color', 'style', 'Background Color', {
            internalDatafield: 'backgroundColor',
            isappend: true,
            asobject: true
          })
        ]
      ]
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
        [getEditorField('checkbox', 'multiple', 'Allow Multiple imaes')]
      ]
      break
    case 'color':
      res = [
        [getEditorField('text', 'label', 'Label Field')],
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
      res = [
        [getEditorField('text', 'value', 'URL')],
        [
          getEditorField('select', 'style', 'Alignment', {
            options: [
              {
                name: 'Left',
                value: 1,
                returnvalue: { 'justify-content': 'flex-start' }
              },
              {
                name: 'Middle',
                value: 2,
                returnvalue: { 'justify-content': 'center' }
              },
              {
                name: 'Right',
                value: 3,
                returnvalue: { 'justify-content': 'flex-end' }
              }
            ],
            asobject: true
          })
        ]
      ]
      break
    // case 'pdf': res = [
    //   getEditorField("fileupload", "value", { filefilter: ['application/pdf'] }),
    //   customStyles,
    //   customProps
    // ];
    // break
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

        // [getEditorField('texnumber', 'imageHeight', 'Image Height')],
        // [
        //   getEditorField('grid', 'options', 'Answers', {
        //     columns: [
        //       { field: 'label', headerName: 'Options' },
        //       { field: 'value', headerName: 'Value' }
        //     ],
        //     aslist: true
        //   })
        // ]
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
        label: 'Sample radio button',
        value: 1
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
  allowCustomProps,
  allowCustomStyles
) => {
  if (requestedControl && requestedControl.type != '') {
    const foundEntry = AllControlsTemplates.filter((ac) => {
      return ac.type === requestedControl.type
    })
    if (foundEntry && foundEntry.length && foundEntry.length === 1) {
      let fld = Object.assign({}, foundEntry[0])
      // foundEntry.forEach((fld) => {
      fld.editableFields = getEditorFields(fld.type, customFieldDefinitions)
      if (allowCustomProps) {
        fld.editableFields.push([customProps])
      }
      if (allowCustomStyles) {
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
