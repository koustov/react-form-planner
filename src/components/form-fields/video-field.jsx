import React, { Suspense } from 'react'
import { FPNoContentAvailable } from '../styled'
import styled from 'styled-components'

const FlexDiv = styled.div`
  display: flex;
  width: 100%;
`
export const FVVideoField = ({ field }, ...rest) => {
  let VideoPlayer
  try {
    VideoPlayer = React.lazy(() => import('react-player'))
  } catch {}

  return (
    <div style={{ display: 'flex' }}>
      {VideoPlayer ? (
        <Suspense fallback={<div>Loading...</div>}>
          {field.value ? (
            <FlexDiv style={JSON.parse(JSON.stringify(field.style || {}))}>
              {VideoPlayer ? (
                <VideoPlayer url={`${field.value}`} />
              ) : (
                'No video player installed'
              )}
            </FlexDiv>
          ) : (
            <FPNoContentAvailable>
              <div></div>
              <div>NO VIDEO SELECTED</div>
            </FPNoContentAvailable>
          )}
        </Suspense>
      ) : (
        <FPNoContentAvailable>
          <div></div>
          <div>
            Will not be able to render video. Please check documentation
          </div>
        </FPNoContentAvailable>
      )}
    </div>
  )
}
