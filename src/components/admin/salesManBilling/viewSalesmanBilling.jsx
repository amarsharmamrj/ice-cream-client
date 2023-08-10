import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack'; 
import '../../../index.css'
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Box, Divider, Chip, Paper,InputAdornment, Grid, TextField, Autocomplete, Button, Stack, ListItem} from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DataGridSkeleton from '../../partials/skeletons/dataGridSkeleton';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#01abaa",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '5px 10px'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
        backgroundColor: '#edf9f9'
    }
  }));

const ViewReturnSalesmanBilling = () => {
    const params = useParams();
    const history = useNavigate();
    document.title = 'View Salesman Billing'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ currentQuantity, setCurrentQuantity] = useState(''); 
    const [ productList, setProductList] = useState([]);
    const [ salesmanList, setSalesmanList] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [ commisionPercent, setCommisionPercent] = useState(60);
    const [formData, setFormData] = useState({
        errors: {},
        salesman_id: '',
        salesman_name: '',
        date: '',
        day:'',
        products: [],
        total_selling: '',
        commission_percent: commisionPercent,
        our_commision: ''
    })
    console.log("a:", productList, currentQuantity)
    function numberWithCommas(number) {
        // number=number.toString();
        // let lastThree = number.substring(number.length-3);
        // let otherNumbers = number.substring(0,number.length-3);
        // if(otherNumbers != '')
        //     lastThree = ',' + lastThree;
        // let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        // return res;
        return number;
    }

    const handleSalesman = (e, v) => {
        e.preventDefault();
        if(v != null){
            console.log('-handleSalesman--:',v, v._id, v.name);
            setFormData((prev) => {
                return {
                    ...prev,
                    salesman_id: v._id,
                    salesman_name: v.name
                }
            })
            console.log("-handleProductSelect--formData-----:", formData)   
        }
    }

    const calculateTotalPrice = () => {
        if(formData.products.length > 0){
            let total = 0;
            formData.products.forEach((item) => {
                console.log('total:', totalPrice, item)
                total = total + (item.price * (item.quantity-(item.hasOwnProperty('return_quantity') ? item.return_quantity : 0)));
            })
            console.log('total:', total)
            setTotalPrice(total);
            setFormData((prev) => {
                return {
                    ...prev,
                    total_selling: total,
                    our_commision: (total * commisionPercent) / 100
                }
            })
        }
    }

    const validate = (data) => {
        console.log('-validate--data-:', data);
        let salesman_name,
            products;
        if(data.hasOwnProperty('salesman_name')){
            if(data.salesman_name === ''){
                salesman_name = 'Kindly select salesman from the above dropdown'
            }else {
                salesman_name = '';
            }
        }
        if(data.hasOwnProperty('products')){
            if(data.products.length < 0){
                products = 'Kindly choose atleast one product!'
            }else {
                products = '';
            }
        }
        setFormData({
            ...formData,
            errors: {salesman_name, products}
        })
        return {salesman_name, products};
    }
    
    const getProductList = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getAll`)
        .then((result) => {
            console.log('-useEffect--get product list from server--success--:', result, result.data);
            let activeProductList = result.data.filter((item) => item.status === true);
            setProductList(activeProductList);
        })
        .catch((error)=> {
            console.log('-useEffect--get product list from server--error--:', error);
        })
    }

    const getSalesmanList = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/salesman/getAll`)
        .then((result) => {
            console.log('-useEffect--get salesmanBilling list from server--success--:', result, result.data);
            let activeSalesmanList = result.data.filter((item) => item.status === true)
            setSalesmanList(activeSalesmanList);
        })
        .catch((error)=> {
            console.log('-useEffect--get salesmanBilling list from server--error--:', error);
        })
    }
    
    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/returnSalesmanBilling/getById/` + params.id)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setTotalPrice(result.data.total_price)
            if(result.data != ''){
                setFormData((prev) => {
                    return {
                        ...prev,
                        salesman_id: result.data._id,
                        salesman_name: result.data.salesman_name,
                        date: result.data.date,
                        day: result.data.day,
                        products: JSON.parse(result.data.products),
                        our_commision: result.data.our_commision,
                        total_selling: result.data.total_selling,
                        commission_percent: result.data.commission_percent
                    }
                })
            }
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    }

    useEffect(() => {
        getProductList();
        getSalesmanList();
        getData();
    }, [1])  

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">View Returned Salesman Billing</Typography>
        <Paper elevation={4} className="paper">
            <Grid container>
                {apiErrors!= '' ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <h3 style={{color:'red'}}>{apiErrors}</h3>
                    </Grid>
                ) : ''}
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                    <Autocomplete
                        onChange={(e, v) =>
                          handleSalesman(e, v)
                        }
                        name="salesman_name"
                        fullWidth={true}
                        id="combo-box-demo"
                        options={salesmanList}
                        autoHighlight
                        disabled="true"
                        getOptionLabel={(option) => option.name}
                        value={{name: formData.salesman_name}}
                        renderOption={(props, option) => (
                          <div {...props}>
                              <ListItem key={option.name} value={option.name}>{option.name}</ListItem>
                          </div>
                        )}
                        renderInput={(params) => (
                          <>
                              <TextField
                                {...params}
                                label="Choose Salesman"
                                InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon style={{color:"#01abaa"}} />
                                        </InputAdornment>
                                    )
                                }} 
                           />
                          </>
                      )}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        id="outlined-error-helper-text"
                        label="Date"
                        color="secondary"
                        value={moment(formData.date).format('DD/MM/YYYY')}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        fullWidth={true}
                        disabled={true}
                        id="outlined-error-helper-text"
                        label="Day"
                        color="secondary"
                        value={formData.day}
                    />
                </Grid>
                
                <Grid item xs={12} sm={12} md={12}>
                    <Divider style={{width: '100%', alignItems: 'center', margin: '1.5rem 0 0.2rem 0'}} color="secondary">
                        <Chip label="PRODUCT DESCRIPTION" />
                    </Divider>
                </Grid>

                {/* start product list table */}
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                  {formData.products.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                              <StyledTableCell>Product Image</StyledTableCell>
                              <StyledTableCell>Product Name</StyledTableCell>
                              <StyledTableCell align="center">Quantity</StyledTableCell>
                              <StyledTableCell align="center">Return Quantity</StyledTableCell>
                              <StyledTableCell align="center">Sold Quantity</StyledTableCell>
                              <StyledTableCell align="center">Rate</StyledTableCell>
                              <StyledTableCell align="right">Total</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {formData.products.length > 0 ? (
                                formData.products.map((row, i) => (
                                    <StyledTableRow key={row.product_name}>
                                      <StyledTableCell component="th" scope="row">
                                          <img src={row.image_url} alt="product" height="35px" width="40px" />
                                      </StyledTableCell>
                                      <StyledTableCell component="th" scope="row">{row.product_name}</StyledTableCell>
                                      <StyledTableCell align="center">{row.quantity}</StyledTableCell>
                                      <StyledTableCell align="center">{row.return_quantity}</StyledTableCell>
                                      <StyledTableCell align="center">{row.quantity - (row.hasOwnProperty('return_quantity') ? row.return_quantity : 0)}</StyledTableCell>
                                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                                      <StyledTableCell align="right">
                                          Rs. {numberWithCommas(row.hasOwnProperty('return_quantity') ? 
                                          row.price * (row.quantity-row.return_quantity) : 
                                          row.price * (row.quantity-0))}
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))
                                ) : ''}
                        </TableBody>
                    </Table>
                    </TableContainer>
                  ) : <DataGridSkeleton /> }
                </Grid> 
                {/* end of product list table */}

                <Grid item xs={12} sm={12} md={12}>
                    <Divider style={{width: '100%', alignItems: 'center', margin: '1.5rem 0 0.2rem 0'}} color="secondary">
                        <Chip label="PRICE DESCRIPTION" />
                    </Divider>
                </Grid>

                <Grid item xs={6} sm={6} md={6}></Grid>

                <Grid item container xs={12} sm={12} md={6}>
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {formData.products.length > 0 ? (`Total Selling: `) : `Total Rs. 0`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {formData.products.length > 0 ? (`Rs. ${numberWithCommas(formData.total_selling)}`) : ``}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {`Change Commission %: `}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end" alignItems="center">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {formData.commission_percent} %
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '14px', fontWeight: '400'}}>
                            {formData.products.length > 0 ? (`Salesman Commission:`) : `Total Rs. 0`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '14px', fontWeight: '400'}}>
                            {formData.products.length > 0 ? (`Rs. ${numberWithCommas(formData.total_selling-formData.our_commision)}`) : `Total Rs. 0`}
                        </Typography>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {formData.products.length > 0 ? (`Our Commission:`) : `Total Rs. 0`}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                            {formData.products.length > 0 ? (`Rs. ${numberWithCommas(formData.our_commision)}`) : `Total Rs. 0`}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../salesman-billing/2') }}
                        >Go Back
                    </Button>
                </Stack>
                </Grid> 
            </Grid>
        </Paper>  
        </Box>
    )
}

export default ViewReturnSalesmanBilling;