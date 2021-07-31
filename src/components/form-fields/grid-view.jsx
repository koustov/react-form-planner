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

import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { v4 as uuidv4 } from 'uuid'

export const FPDataGridView = (
  {
    field,
    value,
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
    if (input && input.value) {
      if (!field.asobject) {
        setGridRows(input.value)
      } else {
        const res = []
        Object.keys(input.value).forEach((k) => {
          res.push({
            name: k,
            value: input.value[k]
          })
        })
        setGridRows(res)
      }
    }

    if (field.columns && field.columns.length) {
      setGridColumns(field.columns)
    } else {
      setGridColumns([
        { field: 'name', headerName: 'Property Name' },
        { field: 'value', headerName: 'Value' }
      ])
    }
    setLoading(false)
  }, [field])

  const onAdd = () => {
    const newRow = {
      name: field.aslist ? uuidv4() : ''
    }
    gridColumns.forEach((gc) => {
      newRow[gc['field']] = ''
    })
    gridRows.push(newRow)
    setGridRows(gridRows.concat([]))
  }

  const onRemove = (index) => {
    gridRows.splice(index, 1)
    setGridRows(JSON.parse(JSON.stringify(gridRows)))
  }

  return (
    <Fragement>
      {loading ? null : (
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
                        onClick={() => onRemove(gri)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    ) : null}
                  </FPGridActionCell>
                  <React.Fragment>
                    {gridColumns.map((gc, gci) => {
                      return (
                        <Fragement key={gci}>
                          {!field.aslist || gci > 0 ? (
                            <FPGridCell key={gci}>
                              <FPTextField
                                size='small'
                                value={gridRows[gri][gc['field']]}
                                label={`${gc['headerName']}`}
                                placeholder={`update ${gc['field']}`}
                                onChange={(e) =>
                                  onValueUpdate(
                                    gri,
                                    gc['field'],
                                    e.target.value
                                  )
                                }
                              />
                            </FPGridCell>
                          ) : (
                            <Fragement />
                          )}
                        </Fragement>
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
                  color='primary'
                  anchor='bottom'
                  onClick={() => onAdd()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add</span>
                </FPToolButton>
              </div>
            </FPGridActionCell>
          </FPGridRow>
        </FPFieldSet>
      )}
    </Fragement>
  )
}
