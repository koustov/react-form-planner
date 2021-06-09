import * as React from 'react'
import { useState, useEffect } from 'react';
import { FPTextField } from '../../styled';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { FaTimes, FaPlus } from 'react-icons/fa';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const FPDataGrid = ({ rows, columns, field, onChange }) => {
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

    if (columns && columns.length) {
      setGridColumns(columns);
    } else {
      setGridColumns([
        { field: 'name', headerName: 'Property Name' },
        { field: 'value', headerName: 'Value' },
      ]);
    }

  })

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
    <TableContainer component={Paper}>
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <React.Fragment>
              {gridColumns.map((gc, gci) => {
                return <TableCell key={gci}>{gc["headerName"]}</TableCell>
              })
              }
            </React.Fragment>
          </TableRow>
        </TableHead>
        <TableBody>
          <React.Fragment>{
            gridRows.map((_gr, gri) => {
              return <TableRow key={gri}>
                <TableCell>
                  {gri < gridRows.length ? (
                    <Button size="small" color="secondary" aria-label="save" onClick={() => onRemove(gri)}>
                      <FaTimes />
                    </Button>
                  ) : (null)}
                </TableCell>
                <React.Fragment>{gridColumns.map((gc, gci) => {
                  return <TableCell key={gci}>
                    <FPTextField variant='outlined'
                      size="small"
                      value={gridRows[gri][gc["field"]]}
                      required
                      onChange={(e) => onValueChanged(gri, gc["field"], e.target.value)} placeholder={`${gc["headerName"]}`} />
                  </TableCell>
                })}
                </React.Fragment>
              </TableRow>
            })
          }</React.Fragment>
          <TableRow>
            <TableCell><Button size="small" color="primary" aria-label="add" onClick={() => onAdd()}>
              <FaPlus style={{ marginRight: '8px' }} /> Add
            </Button></TableCell>
          </TableRow>




        </TableBody>
      </Table>
    </TableContainer>
  )




}

export default FPDataGrid
