import React, { Suspense } from 'react'
import { FPNoContentAvailable } from '../styled'

const VideoPlayer = React.lazy(() => import('react-player'))
export const FVVideoField = ({ field }, ...rest) => {
  return (
    <div style={{ display: 'flex' }}>
      {VideoPlayer ? (
        <Suspense fallback={<div>Loading...</div>}>
          {field.value ? (
            <VideoPlayer url={`${field.value}`} />
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
