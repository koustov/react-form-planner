import * as React from 'react'

import { FormPlanner } from 'react-form-planner'
import { ThemeProvider } from 'styled-components'
import { chalk } from './themes/chalk'
import { glass } from './themes/glass'

const App = () => {
  const [template, setTemplate] = React.useState({});
  return (
    <ThemeProvider theme={glass}>
      
      <div style={{
        backgroundImage: `url(https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-5120x2880-1432.jpg)`, 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flex: '1', 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>
          <div style={{height: '100px'}}>
          <h1>
            Reach Form Planner
          </h1>
          </div>
       {/* <FormViewer
                  onChange={(a, b, c) => {
                    console.log('Value received')
                  }}
                  template={{title: "Back to school registration",
                   description: "",
                   banner: "https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-school-season-welcome-new-students-blackboard-hand-painted-image_12937.jpg",
                   background: "https://www.kolpaper.com/wp-content/uploads/2021/02/Blackboard-Wallpaper-3.jpg",
                  fields:[[
                    {
                      type: 'header',
                      value: 'text'
                    }
                  ],[
                    {
                      type: 'imageupload',
                      value: 'text'
                    }
                  ],[
                    {
                      type: 'divider',
                      value: 'text'
                    }
                  ], [
                    {
                      type: 'text',
                      name: 'textbox',
                      display: 'Text Box',
                      group: 'Form Control',
                      datafield: 'dd',
                      bordered: true,
                      default: true
                    },
                  ]]}}
                /> */}
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
      </ThemeProvider>
  )
}

// const App = () => {
//   return (
//     <ThemeProvider theme={dark}>
//       <FormPlanner
        

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
//       />
//       </ThemeProvider>
//   )
// }

export default App
