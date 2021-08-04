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
          showFormProperties: true,
          fields: [
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
        onFormValueChanged={() => {
          console.log('onFormValueChanged')
        }}
        baseTheme={'dark'}
        themeOverride= {{
            background: 'transparent'
        }}
      />
      </ThemeProvider>
  )
}


// config={{
//   showPreview: true,
//   showFormProperties: true,
//   allowCustomProps: true,
//   allowCustomStyles: true,
//   fields: [
//     { name: 'textbox' },
//     { name: 'question' },
//     { name: 'number' },
//     { name: 'multiline' },
//     { name: 'richtextbox' },
//     { name: 'grid' },
//     { name: 'checkbox' },
//     { name: 'select' },
//     { name: 'radio' },
//     { name: 'divider' },
//     { name: 'image' },
//     { name: 'video' },
//     { name: 'color' },
//     { name: 'imageupload' },
//     { name: 'imagesupload' },
//     { name: 'pdf' }
//   ],
// }}
// fieldTemplate = {{title: "Back to school registration",
//  description: "",
//  banner: "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-school-season-welcome-new-students-blackboard-hand-painted-image_12937.jpg",
//  background: "https://www.kolpaper.com/wp-content/uploads/2021/02/Blackboard-Wallpaper-3.jpg",}}

// onControlValueChanged={() => {
//   console.log('onControlValueChanged')
// }}
// onFormValueChanged={() => {
//   console.log('onFormValueChanged')
// }}
// baseTheme={'dark'}
// themeOverride= {{
//     background: 'transparent'
// }}
export default App
