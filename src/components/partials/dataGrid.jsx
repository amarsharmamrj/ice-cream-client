import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function NewDataGrid(props) {
  return (
    <>
      {props.autoHeight ? (
        <DataGrid 
          autoHeight
          getRowId={(row) => row._id} 
          rows={props.rows} 
          columns={props.columns}  
          components={{ Toolbar: GridToolbar }} 
        />
      ) : (
        <div style={{height: '800px'}}>
          <DataGrid 
            getRowId={(row) => row._id} 
            rows={props.rows} 
            columns={props.columns}  
            components={{ Toolbar: GridToolbar }} 
          />
        </div>
      )}
    </>
  );
}
