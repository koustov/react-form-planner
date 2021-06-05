import * as React from 'react'
import { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';



const FPPdfViewer = ({ value }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file={`${value}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* <Page pageNumber={pageNumber} /> */}
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  )




}

export default FPPdfViewer
