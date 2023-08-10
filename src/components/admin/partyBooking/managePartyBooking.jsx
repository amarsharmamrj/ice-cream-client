import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import '../../../index.css'
import { Typography, Box, Paper, IconButton, Tooltip, TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Link} from 'react-router-dom';
import DataGrid from '../../partials/dataGrid';
import ConfirmDialog from '../../partials/confirmDialog';
import DataGridSkeleton from '../../partials/skeletons/dataGridSkeleton';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';

const ManagePartyBooking = () => {
    const history = useNavigate();
    document.title = 'Manage Party Booking'
    CheckPageAccess();
    const [data, setData] = useState([]); 
    const [id, setId] = useState(''); 
    const [open, setOpen] = React.useState(false);

    const handleDelete = (e, value) => {
        setOpen(true);
        setId(value.id)
        console.log('id:', id);
    };    
    
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
        Axios.delete(`${process.env.REACT_APP_API_SERVICE}/partyBooking/delete/` + id)
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
          field: 'customer_name',
          headerName: 'Customer Name',
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
            field: 'price',
            headerName: 'Price',
            flex: 1,
            headerClassName: 'data-grid-header'
          },
          { 
            field: 'view',
            headerName: 'View',
            sortable: false,
            flex: 1,
            type:"actions",
            headerClassName: 'data-grid-header',
            renderCell: (cellValues) => {
              return (
                <Tooltip title="View">
                  <IconButton 
                      aria-label="view"
                      variant="contained"
                    //   color="secondary"
                    className="color-blue"
                    to={`/view-party-booking/${cellValues.value}`}
                    component={Link}
                    //   onClick={(event) => {
                    //     handleEdit(event, cellValues);
                    //   }}
                  >
                      <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              );
            }
          },
          { 
            field: 'update',
            headerName: 'Update',
            sortable: false,
            flex: 1,
            type:"actions",
            headerClassName: 'data-grid-header',
            renderCell: (cellValues) => {
              return (
                <Tooltip title="Edit">
                  <IconButton 
                      aria-label="Update"
                      variant="contained"
                    //   color="secondary"
                    className="color-blue"
                    to={`/update-party-booking/${cellValues.value}`}
                    component={Link}
                    //   onClick={(event) => {
                    //     handleEdit(event, cellValues);
                    //   }}
                  >
                      <EditIcon />
                  </IconButton>
                </Tooltip>
              );
            }
          },
        {
          field: 'delete',
          headerName: 'Delete',
          sortable: false,
          flex: 1,
          type:"actions",
          headerClassName: 'data-grid-header',
          renderCell: (cellValues) => {
            return (
                <Tooltip title="Delete">
                    <IconButton 
                        aria-label="delete"
                        variant="contained"
                        // color="secondary"
                        className="color-blue"
                        onClick={(event) => {
                            handleDelete(event, cellValues);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            );
          }
        },
        
      ];

    const rows = data.map((item) => {
        return {
            _id: item._id,
            customer_name: item.customer_name,
            date: item.date,
            price: `Rs. ${item.final_price}`,
            view: item._id,
            update: item._id,
            delete: item._id,
        }
    }) 

    console.log('-rows--:', rows) 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/partyBooking/getAll`)
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
        <Box className="container">
            <Typography variant="h2.heading" component="h2" style={{paddingBottom: '1rem'}} className="page-heading">Manage Party Booking</Typography>
            <Paper elevation={4} className="paper"  style={{padding: '1rem'}}>
                <Stack direction="row" spacing={2} mt={0} mb={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../add-party-booking') }}
                        >
                            <AddIcon />Add Party Booking
                    </Button>
                </Stack>
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

export default ManagePartyBooking;