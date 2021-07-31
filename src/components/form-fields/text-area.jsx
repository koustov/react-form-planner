import * as React from 'react'
import { useState, useEffect } from 'react'
import { FVFormTextField } from './text-field'

export const FVFormTextAreaField = (props) => {
  const [newProps, setNewProps] = useState(props)
  useEffect(() => {
    let res = { ...props, multiline: true }
    res.props = res.props || {}
    setNewProps(res)
  }, [])
  return <FVFormTextField {...newProps} />
  //   <div>
  //     <label>{label}</label>
  //     <div>
  //       <input {...input} placeholder={label} type={type} />
  //       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  //     </div>
  //   </div>
  // )
}
