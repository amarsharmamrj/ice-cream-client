import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Axios from 'axios';
import '../../../index.css'
import { Typography, Box, Paper} from '@mui/material';
import DataGrid from '../../partials/dataGrid';
import DataGridSkeleton from '../../partials/skeletons/dataGridSkeleton';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';
import moment from 'moment';

const ContactForms = () => {
    document.title = 'Contact Forms'
    CheckPageAccess();
    const [data, setData] = useState([]); 

    const columns = [
        {
          field: 'name',
          headerName: 'Name',
          flex: 1,
          headerClassName: 'data-grid-header'
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            headerClassName: 'data-grid-header'
        },
        {
            field: 'phone',
            headerName: 'Phone',
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
            field: 'message',
            headerName: 'Message',
            flex: 1,
            headerClassName: 'data-grid-header'
        }
      ];

    const rows = data.map((item) => {
        return {
            _id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            date: moment(item.createdAt).format('DD/MM/YYYY'),
            message: item.message
        }
    }) 

    console.log('-rows--:', rows) 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/contact/getAll`)
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
            <Typography variant="h2.heading" component="h2" className="page-heading">Contact Forms</Typography>
            <Paper elevation={4} className="paper">
                {data.length > 0 ? (
                    <DataGrid  rows={rows} columns={columns} autoHeight={true} getRowClassName="data-grid-header" height="800px" />
                ) : <DataGridSkeleton />}
            </Paper>
        </Box>
    )
}

export default ContactForms;