import * as React from 'react'

import { FormPlanner } from 'form-planner'
// import 'react-form-planner/dist/index.css'

const App = () => {
  return <FormPlanner controls={[""]} onControlValueChanged={() => {
    console.log('onControlValueChanged')
  }}
    onFormValueChanged={() => {
      console.log('onFormValueChanged');
    }} />
}

export default App
