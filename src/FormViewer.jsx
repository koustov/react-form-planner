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

import Fab from '@material-ui/core/Fab'
import FieldLevelValidationForm from './components/field-validation-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Provider } from 'react-redux'
import { Themes } from './themes'
import store from './store/store'

// import { ThemeProvider } from 'styled-components'







// import { dark } from './themes/dark'

export const FormViewer = ({
  template,
  data,
  onChange,
  onControlValueChanged,
  controlMarker,
  editable,
  onButtonClick,
  theme = 'dark'
}) => {
  const [finalData, setFinalData] = useState({})
  const [selectedTheme, setSelectedTheme] = useState(Themes['dark'])
  const [localTemplate, setLocalTemplate] = useState({})

  useEffect(() => {
    if (data) {
      setFinalData(data)
    }
    if (template) {
      setLocalTemplate(JSON.parse(JSON.stringify(template)))
    }
    if (theme) {
      if (typeof theme === 'object' && theme !== null) {
        setSelectedTheme(theme)
      } else {
        setSelectedTheme(Themes[theme])
      }
    }
  }, [data, template.fields])

  return (
    // <ThemeProvider theme={theme == 'dark' ? dark : ''}>
    <Provider store={store}>
      <FVFormWrapper background={localTemplate.background}>
        <div>
          {localTemplate.banner ? (
            <div>
              {localTemplate.banner.bannerImage ? (
                <FVBannerImage background={localTemplate.banner.bannerImage}>
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
                <FVFormBannerDefault elevation={3}>
                  <FVTitleField>{localTemplate.title}</FVTitleField>
                </FVFormBannerDefault>
              ) : null}
            </React.Fragment>
          )}
        </div>
        <FVFormContainer>
          {localTemplate &&
          localTemplate.fields &&
          localTemplate.fields.length ? (
            <FieldLevelValidationForm
              data={finalData}
              fields={localTemplate.fields}
              onChange={onChange}
              editable={editable}
              onButtonClick={onButtonClick}
            />
          ) : (
            <div></div>
          )}
        </FVFormContainer>
      </FVFormWrapper>
    </Provider>
    // {/* </ThemeProvider> */}
  )
}
