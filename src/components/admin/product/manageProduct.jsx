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

const ManageProduct = () => {
    const history = useNavigate();
    document.title = 'Manage Product'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]); 
    const [id, setId] = useState(''); 
    const [open, setOpen] = React.useState(false);

    const handleDelete = (e, value) => {
        setOpen(true);
        setId(value.id)
    };    
    
    const handleConfirm = () => {
        deleteProduct();
        setOpen(false);
    }

    const  handleCancel = () => {
        setOpen(false);
    }

    const deleteProduct = () => { 
        console.log('-handleDelete--id:', id)
        Axios.delete(`${process.env.REACT_APP_API_SERVICE}/product/delete/` + id)
            .then((result) => {
                console.log('-handleDelete--product  delete--success--:', result, result.data);
                enqueueSnackbar(`Product removed from the sytem!`, 
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
                console.log('-handleDelete--product  delete--error--:', error);
            })
    }
  
    const columns = [
        {
          field: 'product',
          headerName: 'Product Name',
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
            field: 'description',
            headerName: 'Description',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'category',
            headerName: 'Category',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'image',
            headerName: 'Image',
            flex: 1,
            headerClassName: 'data-grid-header',
            renderCell: (cellValues) => {
                return (
                  <Tooltip title="Product Image">
                    <img src={cellValues.value} alt="image" style={{height: '100px', width: '100px', borderRadius: '5px', objectFit: 'contain'}} />
                  </Tooltip>
                );
              }
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
                    to={`/update-product/${cellValues.value}`}
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
            product: item.product_name,
            price: 'Rs. ' + item.price,
            description: item.desc,
            category: item.category_name,
            image: item.image_url,
            status: item.status === true ? 'Active' : 'Inactive',
            delete: item._id,
            update: item._id,
        }
    }) 

    console.log('-rows--:', rows) 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getAll`)
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
            <Typography variant="h2.heading" component="h2" className="page-heading">Manage Product</Typography>
            <Paper elevation={4} className="paper">
                <Stack direction="row" spacing={2} mt={0} mb={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../add-product') }}
                        >
                            <AddIcon />Add Product
                    </Button>
                </Stack>
                {data.length > 0 ? (
                    <DataGrid  rows={rows} columns={columns} autoHeight={true} getRowClassName="data-grid-header" height="800px" />
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

export default ManageProduct;