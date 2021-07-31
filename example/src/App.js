import * as React from 'react'

import { FormPlanner } from 'react-form-planner'
import { ThemeProvider } from 'styled-components'
import { dark } from './themes/dark'

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <FormPlanner
        config={{
          showPreview: true,
          fields: [{ name: 'textbox' }, { name: 'question' }, { name: 'radio' }]
        }}
        onControlValueChanged={() => {
          console.log('onControlValueChanged')
        }}
        onFormValueChanged={() => {
          console.log('onFormValueChanged')
        }}
        theme={dark}
      />
    </ThemeProvider>
  )
}

export default App
