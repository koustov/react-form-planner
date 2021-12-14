import * as React from 'react'

import { FormPlanner } from 'react-form-planner'
import { ThemeProvider } from 'styled-components'
import { Themes } from './themes'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DefaultTemplate } from './default-template'
const App = () => {
  const [template, setTemplate] = React.useState(DefaultTemplate)
  const [themeName, setThemeName] = React.useState('glass')
  const handleChange = (event, newAlignment) => {
    setThemeName(newAlignment)
  }
  return (
    <ThemeProvider theme={Themes[themeName]}>
      <div className='container' style={{ boxSizing: 'border-box' }}>
        <div style={{ padding: '1rem', display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontWeight: 100 }}>React Form Planner</h1>
          </div>
          <div>
            <ToggleButtonGroup
              color='primary'
              value={'web'}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton
                value='glass'
                style={{
                  color: `${themeName === 'glass' ? 'yellow' : '#ABABAB'}`
                }}
              >
                Glass
              </ToggleButton>
              <ToggleButton
                value='dark'
                style={{
                  color: `${themeName === 'dark' ? 'yellow' : '#ABABAB'}`
                }}
              >
                Dark
              </ToggleButton>
              <ToggleButton
                value='chalk'
                style={{
                  color: `${themeName === 'chalk' ? 'yellow' : '#ABABAB'}`
                }}
              >
                Chalk
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className='form-wrapper'>
          <FormPlanner
            config={{
              showPreview: true,
              showFormProperties: true,
              allowCustomProps: true,
              allowCustomStyles: true,
              fields: [
                { name: 'header' },
                { name: 'mediumheader' },
                { name: 'smallheader' },
                { name: 'label' },
                { name: 'textbox' },
                { name: 'question' },
                { name: 'number' },
                { name: 'date' },
                { name: 'datetime' },
                { name: 'multiline' },
                { name: 'select' },
                { name: 'radio' },
                { name: 'divider' },
                { name: 'image' },
                { name: 'video' },
                { name: 'pdf' }
              ]
            }}
            onControlValueChanged={() => {
              console.log('onControlValueChanged')
            }}
            onFormValueChanged={(val) => {
              console.log(`Form value: ${JSON.stringify(val)}`)
              setTemplate(val)
            }}
            baseTheme={'dark'}
            themeOverride={Themes[themeName]}
            fieldTemplate={template}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}
export default App
