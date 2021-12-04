import * as React from 'react'

import {
  FPFieldSet,
  FPGridActionCell,
  FPGridCell,
  FPGridHeaderRow,
  FPGridRow,
  FPTextField,
  FPToolButton,
  SmallHeader
} from '../styled'
import { Fragement, useEffect, useState } from 'react'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Button } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid'

export const FPDataGridView = (
  {
    field,
    value,
    editable,
    inputvalue,
    onValueChanged,
    required,
    input,
    meta: { asyncValidating, touched, error }
  },
  ...rest
) => {
  const [gridRows, setGridRows] = useState([])
  const [gridColumns, setGridColumns] = useState([])
  const [loading, setLoading] = useState(true)

  const onValueUpdate = (index, fieldName, fieldValue) => {
    const res = gridRows[index]
    res[fieldName] = fieldValue
    setGridRows(JSON.parse(JSON.stringify(gridRows)))
    if (onValueChanged) {
      if (field.asobject) {
        const resObj = {}
        gridRows.forEach((r) => {
          resObj[r.name] = r.value
        })
        onValueChanged(field.datafield, resObj, field)
      } else {
        onValueChanged(field.datafield, gridRows, field)
      }
    }
  }

  useEffect(() => {
    let gcolumns = []
    if (field.columns && field.columns.length) {
      setGridColumns(field.columns)
      gcolumns = field.columns
    } else {
      gcolumns = [
        { field: 'name', headerName: 'Property Name' },
        { field: 'value', headerName: 'Value' }
      ]
      setGridColumns(gcolumns)
    }
    if (inputvalue) {
      if (!field.asobject) {
        // const r = []
        // if (typeof inputvalue === 'object') {
        //   Object.keys(inputvalue).forEach((k) => {
        //     r.push({
        //       [gcolumns[0].field]: k,
        //       [gcolumns[0].value]: inputvalue[k]
        //     })
        //   })
        //   setGridRows(r)
        // } else {
        setGridRows(inputvalue)
        // }
      } else {
        const res = []
        Object.keys(inputvalue).forEach((k) => {
          res.push({
            name: input.value[k].name,
            value: input.value[k].value
          })
        })
        setGridRows(res)
      }
    }
    setLoading(false)
  }, [field])

  const onAdd = () => {
    const newRow = {
      value: field.aslist ? uuidv4() : ''
    }
    gridColumns.forEach((gc) => {
      newRow[gc['field']] = newRow[gc['field']] || ''
    })
    gridRows.push(newRow)
    setGridRows(gridRows.concat([]))
  }

  const onRemove = (index) => {
    gridRows.splice(index, 1)
    setGridRows(JSON.parse(JSON.stringify(gridRows)))
  }
  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <FPFieldSet bordered>
          <legend>{field.label}</legend>
          <React.Fragment>
            {gridRows.map((_gr, gri) => {
              return (
                <FPGridRow key={gri}>
                  <FPGridActionCell>
                    {gri < gridRows.length ? (
                      <Button
                        size='small'
                        color='secondary'
                        aria-label='save'
                        onClick={() => {
                          if (!editable) {
                            onRemove(gri)
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    ) : null}
                  </FPGridActionCell>
                  <React.Fragment>
                    {gridColumns.map((gc, gci) => {
                      return (
                        <div key={gci} style={{ flex: gc.hide ? 0 : 1 }}>
                          {!gc.hide ? (
                            <FPGridCell key={gci}>
                              <FPTextField
                                size='small'
                                value={gridRows[gri][gc['field']]}
                                label={`${gc['headerName']}`}
                                placeholder={`update ${gc['field']}`}
                                onChange={(e) => {
                                  if (!editable) {
                                    onValueUpdate(
                                      gri,
                                      gc['field'],
                                      e.target.value
                                    )
                                  }
                                }}
                              />
                            </FPGridCell>
                          ) : (
                            <span style={{ flex: 0 }}></span>
                          )}
                        </div>
                      )
                    })}
                  </React.Fragment>
                </FPGridRow>
              )
            })}
          </React.Fragment>
          <FPGridRow>
            <FPGridActionCell>
              <div>
                <FPToolButton
                  variant='contained'
                  anchor='bottom'
                  onClick={() => {
                    if (!editable) {
                      onAdd()
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add</span>
                </FPToolButton>
              </div>
            </FPGridActionCell>
          </FPGridRow>
        </FPFieldSet>
      )}
    </div>
  )
  return <Fragement></Fragement>
}
