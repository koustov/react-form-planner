import * as React from 'react'
import { useState, useEffect } from 'react';
import { FPTextField, FPFieldSet, FPGridHeaderRow, FPGridRow, FPGridCell, FPGridActionCell, SmallHeader } from '../../styled';
import Button from '@material-ui/core/Button';
import { FaTimes, FaPlus } from 'react-icons/fa';

const FPDataGrid = ({ rows, field, onChange }) => {
  const [gridRows, setGridRows] = useState([]);
  const [gridColumns, setGridColumns] = useState([]);


  const onValueChanged = (index, fieldName, fieldValue) => {
    const res = gridRows[index];
    res[fieldName] = fieldValue;
    if (onChange) {
      onChange(field, gridRows, field);
    }
  }

  useEffect(() => {
    if (rows && rows.length) {
      setGridRows(rows);
    }

    if (field.columns && field.columns.length) {
      setGridColumns(field.columns);
    } else {
      setGridColumns([
        { field: 'name', headerName: 'Property Name' },
        { field: 'value', headerName: 'Value' },
      ]);
    }

  }, [])

  const onAdd = () => {
    const newRow = {};
    gridColumns.forEach((gc) => {
      newRow[gc["field"]] = "";
    })
    gridRows.push(newRow);
    setGridRows(gridRows.concat([]));
  }

  const onRemove = (index) => {
    gridRows.splice(index, 1);
    setGridRows(gridRows);
  }


  return (
    <FPFieldSet bordered>
      <legend>{field.label}</legend>
      {/* <FPGridHeaderRow>
        <FPGridActionCell></FPGridActionCell>
        <React.Fragment>
          {gridColumns.map((gc, gci) => {
            return <FPGridCell key={gci}><SmallHeader>{gc["headerName"]}</SmallHeader></FPGridCell>
          })
          }
        </React.Fragment>
      </FPGridHeaderRow> */}
      <React.Fragment>{
        gridRows.map((_gr, gri) => {
          return <FPGridRow key={gri}>
            <FPGridActionCell>
              {gri < gridRows.length ? (
                <Button size="small" color="secondary" aria-label="save" onClick={() => onRemove(gri)}>
                  <FaTimes />
                </Button>
              ) : (null)}
            </FPGridActionCell>
            <React.Fragment>{gridColumns.map((gc, gci) => {
              return <FPGridCell key={gci}>
                <FPTextField
                  size="small"
                  value={gridRows[gri][gc["field"]]}
                  label={`${gc["headerName"]}`}
                  onChange={(e) => onValueChanged(gri, gc["field"], e.target.value)} />
              </FPGridCell>
            })}
            </React.Fragment>
          </FPGridRow>
        })
      }</React.Fragment>
      <FPGridRow>
        <FPGridActionCell><Button size="small" color="primary" aria-label="add" onClick={() => onAdd()}>
          <FaPlus style={{ marginRight: '8px' }} /> Add
            </Button></FPGridActionCell>
      </FPGridRow>
    </FPFieldSet>

  )




}

export default FPDataGrid
