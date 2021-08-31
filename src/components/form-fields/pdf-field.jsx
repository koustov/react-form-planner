import React, { useEffect, useState } from 'react'
import { FPNoContentAvailable } from '../styled'
import styled from 'styled-components'

const FlexDiv = styled.div`
  display: flex;
  width: 100%;
`
export const FVPDFViewer = ({ field }, ...rest) => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [urlPdf, setPdfUrl] = useState()

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  useEffect(() => {
    if (field.value) {
      const url = b64toBlob(field.value, 'application/pdf')
      setPdfUrl(url)
    }
  }, [field.value])

  const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(
      b64Data.replace(/^data:application\/pdf;base64,/, '')
    )

    var len = byteCharacters.length
    var buffer = new ArrayBuffer(len)
    var view = new Uint8Array(buffer)
    for (var i = 0; i < len; i++) {
      view[i] = byteCharacters.charCodeAt(i)
    }

    // create the blob object with content-type "application/pdf"
    var blob = new Blob([view], { type: 'application/pdf' })
    var url = URL.createObjectURL(blob)
    return url
  }

  return (
    <div>
      {urlPdf ? (
        <div>
          <iframe
            src={urlPdf}
            style={{ height: '100vh', width: '100%' }}
          ></iframe>
          {/* <Document file={urlPdf} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p> */}
        </div>
      ) : (
        <FPNoContentAvailable>
          <div></div>
          <div>NO PDF SELECTED</div>
        </FPNoContentAvailable>
      )}
    </div>
  )
}
