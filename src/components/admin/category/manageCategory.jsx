import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Axios from 'axios';
import '../../../index.css'
import { Typography, Box, Paper, IconButton, Tooltip, TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {Link} from 'react-router-dom';
import DataGrid from '../../partials/dataGrid';
import ConfirmDialog from '../../partials/confirmDialog';
import DataGridSkeleton from '../../partials/skeletons/dataGridSkeleton';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';

const ManageCategory = () => {
    const history = useNavigate();
    document.title = 'Manage Category'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]); 
    const [id, setId] = useState(''); 
    const [open, setOpen] = React.useState(false);

    const handleDelete = (e, value) => {
        setOpen(true);
        setId(value.id)
        console.log('id:', id);
    };    
    
    const handleConfirm = () => {
        deleteCategory();
        setOpen(false);
    }

    const  handleCancel = () => {
        setOpen(false);
    }

    const deleteCategory = (e, value) => { 
        setOpen(true);
        console.log('-deleteCategory--id:', id)
        Axios.delete(`${process.env.REACT_APP_API_SERVICE}/category/delete/` + id)
            .then((result) => {
                console.log('-deleteCategory--category delete--success--:', result, result.data);
                enqueueSnackbar(`Category removed from the sytem!`, 
                { 
                    variant: 'info', 
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }
                })
                getData();
            })
            .catch((error)=> {
                console.log('-deleteCategory--category delete--error--:', error);
            })
    }
   
    const handleEdit = (e, value) => {
        console.log('-handleDelete--id:', value.id)
    }
    
    const columns = [
        {
          field: 'category',
          headerName: 'Category Name',
          flex: 1,
          headerClassName: 'data-grid-header'
        },
        {
          field: 'status',
          headerName: 'Status',
          flex: 1,
          headerClassName: 'data-grid-header'
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
                      aria-label="delete"
                      variant="contained"
                    //   color="secondary"
                    className="color-blue"
                    to={`/update-category/${cellValues.value}`}
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
        
        
      ];

    const rows = data.map((item) => {
        return {
            _id: item._id,
            category: item.category,
            status: item.status === true ? 'Active' : 'Inactive',
            delete: item._id,
            update: item._id,
        }
    }) 

    console.log('-rows--:', rows) 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/category/getAll`)
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
            <Typography variant="h2.heading" component="h2" className="page-heading">Manage Category</Typography>
            <Paper elevation={4} className="paper">
                <Stack direction="row" spacing={2} mt={0} mb={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../add-category') }}
                        >
                            <AddIcon />Add Category
                    </Button>
                </Stack>
                {data.length > 0 ? (
                    <DataGrid  rows={rows} columns={columns} autoHeight={true} getRowClassName="data-grid-header" />
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

export default ManageCategory;