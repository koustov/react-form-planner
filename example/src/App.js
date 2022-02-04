import * as React from 'react'

import RFP from 'react-form-planner'
import { ThemeProvider } from 'styled-components'
import { Themes } from './themes'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { DefaultTemplate } from './default-template'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const App = () => {
  const [template, setTemplate] = React.useState(DefaultTemplate)
  const [themeName, setThemeName] = React.useState('dark')
  const [data, setData] = React.useState({
    'F_89186732-19d3-4271-b133-ed92757cb17': true
  })
  const [formState, setFormState] = React.useState(DefaultTemplate)

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
            <div>
              <Button onClick={handleOpen}>Preview</Button>
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
            <div>
              {' '}
              <a
                href='https://www.npmjs.com/package/react-form-planner'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  marginRight: '8px'
                }}
              >
                🔶 NPM
              </a>
              <a
                href='https://github.com/koustov/react-form-planner'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  marginRight: '8px'
                }}
              >
                🔘 GIT
              </a>
            </div>
          </div>
        </div>
        <div className='form-wrapper'>
          <RFP.FormPlanner
            config={{
              showFormProperties: true,
              allowCustomProps: true,
              allowCustomStyles: true,
              showBasicLabels: true,
              showPreview: true
            }}
            onFormValueChanged={(val) => {
              setFormState(val)
              console.log(`Form value: ${JSON.stringify(val)}`)
              setTemplate(val)
            }}
            baseTheme={'dark'}
            themeOverride={Themes[themeName]}
            fieldTemplate={template}
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={style}
          style={{
            width: '90vw',
            backgroundColor: '#000',
            height: '90vh',
            overflow: 'auto'
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            style={{ color: '#fff' }}
          >
            Preview Form
          </Typography>
          {open ? (
            <RFP.FormViewer
              id='example-form'
              baseTheme={'dark'}
              themeOverride={Themes[themeName]}
              onChange={(k, v, c) => {
                // data[k] = v
                // setData(data)
                console.log('Form data changed')
                console.log(JSON.stringify(data))
              }}
              onControlValueChanged={(k, v, f) => {
                console.log('Control data changed')
                data[k] = v
                setData(data)
                console.log(
                  `Field: ${k} Value: ${v} Field: ${JSON.stringify(f)}`
                )
              }}
              data={data}
              template={formState}
            />
          ) : null}
        </Box>
      </Modal>
    </ThemeProvider>
  )
}
export default App
