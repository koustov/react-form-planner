import * as React from 'react'

import { FormPlanner } from 'react-form-planner'
import { ThemeProvider } from 'styled-components'
import { glass } from './themes/glass'

const App = () => {
  const [template, setTemplate] = React.useState({});
  return (
    <ThemeProvider theme={glass}>
      
      <div className="container">
          <div style={{padding: '1rem'}}>
          <h1 style={{fontWeight: 100}}>
            Reach Form Planner
          </h1>
          </div>
          <div className="form-wrapper">
      <FormPlanner
        config={{
          showPreview: true,
          showFormProperties: true,
          showStylingProps: false,
          fields: [
            { name: 'header' },
            { name: 'mediumheader' },
            { name: 'smallheader' },
            { name: 'label' },
            { name: 'textbox' },
            { name: 'question' },
            { name: 'number' },
            { name: 'multiline' },
            { name: 'select' },
            { name: 'radio' },
            { name: 'divider' },
            { name: 'image' },
            { name: 'video' },
            { name: 'pdf' }
          ],
        }}
        onControlValueChanged={() => {
          console.log('onControlValueChanged')
        }}
        onFormValueChanged={(val) => {
          console.log('onFormValueChanged')
          setTemplate(val)
        }}
        baseTheme={'dark'}
        themeOverride= {glass}
        fieldTemplate={template}
      />
      </div>
      </div>
      </ThemeProvider>
  )
}
export default App
