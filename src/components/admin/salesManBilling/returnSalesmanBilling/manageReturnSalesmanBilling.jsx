import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../../index.css'
import moment from 'moment'
import { Typography, Box, Paper, IconButton, Tooltip} from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import {Link} from 'react-router-dom';
import DataGrid from '../../../partials/dataGrid';
import ConfirmDialog from '../../../partials/confirmDialog';
import DataGridSkeleton from '../../../partials/skeletons/dataGridSkeleton';
import CheckPageAccess from '../../../../contexts/checkPageAccess.js';

const ManageReturnSalesmanBilling = () => {
    const history = useNavigate();
    document.title = 'Manage Return Salesman Billing'
    CheckPageAccess();
    const [data, setData] = useState([]); 
    const [id, setId] = useState(''); 
    const [open, setOpen] = React.useState(false);

    const handleConfirm = () => {
        deleteSalesmanBilling();
        setOpen(false);
    }

    const  handleCancel = () => {
        setOpen(false);
    }

    const deleteSalesmanBilling = (e, value) => { 
        setOpen(true);
        console.log('-deleteSalesmanBilling--id:', id)
        Axios.delete(`${process.env.REACT_APP_API_SERVICE}/salesmanBilling/delete/` + id)
            .then((result) => {
                console.log('-deleteSalesmanBilling--salesman delete--success--:', result, result.data);
                getData();
            })
            .catch((error)=> {
                console.log('-deleteSalesmanBilling--salesman delete--error--:', error);
            })
    }
   
    const columns = [
        {
          field: 'salesman_name',
          headerName: 'Salesman Name',
          flex: 1,
          headerClassName: 'data-grid-header'
        },
        {
          field: 'date',
          headerName: 'Date',
          flex: 1,
          headerClassName: 'data-grid-header'
        },
        {
            field: 'day',
            headerName: 'Day',
            flex: 1,
            headerClassName: 'data-grid-header'
          },
          { 
              field: 'return',
              headerName: 'Return',
              sortable: false,
              flex: 1,
              type:"actions",
              headerClassName: 'data-grid-header',
              renderCell: (cellValues) => {
                console.log('@@', cellValues)
                return (
                  <Tooltip title="Return">
                    <IconButton 
                      disabled={cellValues.value.returned}
                        aria-label="Update"
                        variant="contained"
                      //   color="secondary"
                      className={cellValues.value.returned === true ? 'color-gray' : 'color-blue'}
                      to={`/return-salesman-billing/${cellValues.value.id}`}
                      component={Link}
                      //   onClick={(event) => {
                      //     handleEdit(event, cellValues);
                      //   }}
                    >
                        <AssignmentReturnIcon />
                    </IconButton>
                  </Tooltip>
                );
              }
            },
      ];

    const rows = data.map((item) => {
        return {
            _id: item._id,
            salesman_name: item.salesman_name,
            date: moment(item.date).format('DD/MM/YYYY'),
            day: item.day,
            return: {id: item._id, returned: item.returned},
        }
    }) 

    console.log('-rows--:', rows) 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/salesmanBilling/getAll`)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setData(result.data);
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    }
    
    useEffect(() => {
        getData();
    }, [1])

    return (
        <Box>
            <Typography variant="h2.heading" component="h2" style={{paddingBottom: '1rem'}} className="page-heading">Manage Return Salesman Billing</Typography>
            <Paper elevation={4} style={{padding: '0.5rem'}}>
                {data.length > 0 ? (
                  <DataGrid  rows={rows} columns={columns} getRowClassName="data-grid-header" />
                ) : <DataGridSkeleton />}
                <ConfirmDialog
                    title={'Confirm Delete'}
                    desc={'Are you sure, you want to delete this item ?'}
                    open={open}
                    setOpen={setOpen} 
                    handleConfirm={handleConfirm}
                    handleCancel={handleCancel}
                />
            </Paper>
        </Box>
    )
}

export default ManageReturnSalesmanBilling;