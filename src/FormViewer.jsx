import * as React from 'react'

import {
  FPControlEdit,
  FVBannerImage,
  FVFormBanner,
  FVFormBannerDefault,
  FVFormContainer,
  FVFormWrapper,
  FVTitleField,
  FVDescriptionField
} from './components/styled'
import { Fragment, useEffect, useState } from 'react'

import FieldLevelValidationForm from './components/field-validation-form'
import { Provider } from 'react-redux'
import * as Themes from './themes'
import store from './store/store'

import { NoContent } from './components//no-content'

import { ThemeProvider } from 'styled-components'

// import { dark } from './themes/dark'

export const FormViewer = (
  {
    template,
    data,
    onChange,
    onControlValueChanged,
    controlMarker,
    editable,
    onButtonClick,
    onInject,
    theme,
    controls = [],
    baseTheme = 'dark',
    themeOverride = {}
  },
  ...rest
) => {
  const [loading, setLoading] = useState(true)
  const [finalData, setFinalData] = useState({})
  const [localTemplate, setLocalTemplate] = useState({})
  const [finalTheme, setFinalTheme] = React.useState({})

  useEffect(() => {
    if (data) {
      setFinalData({ ...data })
    }
    if (template) {
      setLocalTemplate(JSON.parse(JSON.stringify(template)))
    }
    let defaultTheme = theme || Themes[baseTheme] || Themes['dark']
    const oTheme = themeOverride
    defaultTheme = Object.assign(defaultTheme, oTheme)
    setFinalTheme(defaultTheme)

    setLoading(false)
  }, [data, template.fields, theme])

  const controlValueChanged = (k, v, f) => {
    if (onControlValueChanged) {
      onControlValueChanged(k, v, f)
    }
  }

  const formValueChanged = (data) => {
    if (onChange) {
      onChange(data)
    }
  }

  const onValueChanged = (key, value, field) => {
    finalData[key] = value
    controlValueChanged(key, value, field)
    setFinalData({ ...finalData })
    formValueChanged(finalData)
  }

  return (
    <ThemeProvider theme={finalTheme}>
      <Provider store={store}>
        <FVFormWrapper>
          <div>
            {localTemplate.banner ? (
              <div>
                {localTemplate.banner ? (
                  <FVBannerImage background={localTemplate.banner}
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: 'flex-start',
                      justifyContent: 'center' 
                    }}
                  >
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                    {localTemplate.description && 
                      <FVDescriptionField>{localTemplate.description}</FVDescriptionField>
                    }
                  </FVBannerImage>
                ) : (
                  <FVFormBanner
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: 'flex-start',
                      justifyContent: 'center' 
                    }}
                  >
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                    {localTemplate.description && 
                      <FVDescriptionField>{localTemplate.description}</FVDescriptionField>
                    }
                  </FVFormBanner>
                )}
              </div>
            ) : (
              <React.Fragment>
                {localTemplate.title ? (
                  <FVFormBannerDefault
                    elevation={3}
                    bg={localTemplate.bannercolor}
                    style={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: 'flex-start',
                      justifyContent: 'center' 
                    }}
                  >
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                    {localTemplate.description && 
                      <FVDescriptionField>{localTemplate.description}</FVDescriptionField>
                    }
                  </FVFormBannerDefault>
                ) : null}
              </React.Fragment>
            )}
          </div>
          <FVFormContainer
            background={localTemplate.background}
            backgroundColor={localTemplate.backgroundcolor}
          >
            {localTemplate &&
            localTemplate.fields &&
            localTemplate.fields.length ? (
              <FieldLevelValidationForm
                data={finalData}
                fields={localTemplate.fields}
                onChange={(key, value, field) =>
                  onValueChanged(key, value, field)
                }
                onAddColumn={onInject}
                controls={controls}
                editable={editable}
                onButtonClick={onButtonClick}
                controlMarker={controlMarker}
              />
            ) : (
              <NoContent
                label='Your components will appear here'
                subtext='Add new component(s) and re-render'
              />
            )}
          </FVFormContainer>
        </FVFormWrapper>
      </Provider>
    </ThemeProvider>
  )
}
