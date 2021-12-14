import * as React from 'react'

import {
  FPControlEdit,
  FVBannerImage,
  FVFormBanner,
  FVFormBannerDefault,
  FVFormContainer,
  FVFormWrapper,
  FVTitleField
} from './components/styled'
import { Fragment, useEffect, useState } from 'react'
import {
  faChevronDown,
  faChevronUp,
  faClone,
  faEye,
  faPenAlt,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'

import FieldLevelValidationForm from './components/field-validation-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Provider } from 'react-redux'
import * as Themes from './themes'
import store from './store/store'

import { NoContent } from './components//no-content'

import { ThemeProvider } from 'styled-components'

// import { dark } from './themes/dark'

export const FormViewer = ({
  template,
  data,
  onChange,
  onControlValueChanged,
  controlMarker,
  editable,
  onButtonClick,
  baseTheme = 'dark',
  themeOverride = {}
}) => {
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
    let defaultTheme = Themes[baseTheme]
    const oTheme = themeOverride
    defaultTheme = Object.assign(defaultTheme, oTheme)
    setFinalTheme(defaultTheme)

    setLoading(false)
  }, [data, template.fields])

  const onValueChanged = (key, value, field) => {
    if (onChange) {
      onChange(key, value, field)
    }
  }

  return (
    <ThemeProvider theme={finalTheme}>
      <Provider store={store}>
        <FVFormWrapper>
          <div>
            {localTemplate.banner ? (
              <div>
                {localTemplate.banner ? (
                  <FVBannerImage background={localTemplate.banner}>
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                  </FVBannerImage>
                ) : (
                  <FVFormBanner>
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                  </FVFormBanner>
                )}
              </div>
            ) : (
              <React.Fragment>
                {localTemplate.title ? (
                  <FVFormBannerDefault
                    elevation={3}
                    bg={localTemplate.bannercolor}
                  >
                    <FVTitleField>{localTemplate.title}</FVTitleField>
                  </FVFormBannerDefault>
                ) : null}
              </React.Fragment>
            )}
          </div>
          <FVFormContainer
            background={localTemplate.background}
            style={{
              background: `${localTemplate.backgroundcolor}`,
              height: '100%'
            }}
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
                editable={editable}
                onButtonClick={onButtonClick}
              />
            ) : (
              <NoContent
                label='Your components will appear hear'
                subtext='Add new component(s) and re-render'
              />
            )}
          </FVFormContainer>
        </FVFormWrapper>
      </Provider>
    </ThemeProvider>
  )
}
