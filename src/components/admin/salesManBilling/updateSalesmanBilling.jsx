import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack'; 
import '../../../index.css'
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Tooltip, IconButton, Box, Paper,InputAdornment, Grid, TextField, Autocomplete, Button, Stack, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

const UpdateSalesmanBilling = () => {
    const params = useParams();
    const history = useNavigate();
    document.title = 'Update Salesman Billing'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ currentQuantity, setCurrentQuantity] = useState(''); 
    const [ productList, setProductList] = useState([]);
    const [ salesmanList, setSalesmanList] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0);
    const [formData, setFormData] = useState({
        errors: {},
        salesman_id: '',
        salesman_name: '',
        date: '',
        day:'',
        products: [],
        total_price: '',
    })
    console.log("a:", currentQuantity)
    
    function numberWithCommas(number) {
        number=number.toString();
        let lastThree = number.substring(number.length-3);
        let otherNumbers = number.substring(0,number.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    const handleProductSelect = async (e, v) => {
        e.preventDefault();
        if(v != null){
            let flag = false;
            function checkProductExist(){
                formData.products.forEach((item) => {
                    if(item.product_id === v._id){
                        flag = true;
                    }
                })
            }
            await checkProductExist();
            console.log('-handleProductSelect--:',v, v.product_name);
            if(!flag){
                let product = { "product_id": v._id, "product_name": v.product_name, "price": v.price, "image_url": v.image_url, "quantity": ""}
                let data = [...formData.products, product]
                setFormData((prev) => {
                    return {
                        ...prev,
                        products: data
                    }
                })
            }
            console.log("-handleProductSelect--formData-----:", formData)   
        }
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
                total = total + (item.price * item.quantity);
            })
            console.log('total:', total)
            setTotalPrice(total);
            setFormData((prev) => {
                return {
                    ...prev,
                    total_price: total
                }
            })
        }
    }

    const handleProductQuantity = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-handleProductSelect--:', targetName, targetValue);
        formData.products.forEach((item) => {
            if(item.product_name === targetName){
                item.quantity = targetValue;
                setCurrentQuantity(targetValue);
            }
        })
        console.log('-handleProductQuantity--:', formData.products);
        calculateTotalPrice();
    }

    const handleDelete = (e, row, i) => {
        console.log('-handleDelete--:', row, i)
        let newData = formData.products.splice(i, 1);
        calculateTotalPrice();
        setFormData((prev) => {
            return {
                ...prev,
                newData
            }
        })
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
    
    const handleSubmit = (e) => {
        // e.preventDefault();
        const model = {
            id: params.id,
            salesman_id: formData.salesman_id,
            salesman_name: formData.salesman_name,
            date: formData.date,
            day: formData.day,
            products: JSON.stringify(formData.products),
            total_price: formData.total_price
        }
        console.log('-handleSubmit--model:', model);

        let err = validate(model);
        let flag = 1;
        for(let key in err){
            if(err[key] !== ''){
                console.log('err[key]:', err[key])
                flag = 0;
            }
        }
        
        if(flag){
            Axios.post(`${process.env.REACT_APP_API_SERVICE}/salesmanBilling/update`, model)
            .then((result) => {
                console.log('-handleSubmit--update salesmanBilling--success--:', result);
                enqueueSnackbar('Form submitted sucessfully!', { variant: 'success'});
                setTimeout(() => {
                    history('../salesman-billing/0');
                }, 2000)
            })
            .catch((error)=> {
                console.log('-handleSubmit--updateSalesmanBilling--error--:', error);
                if(error.response.status === 500){
                    setApiErrors(error.response.data.message)
                }
                enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
            })
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
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
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/salesmanBilling/getById/` + params.id)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setTotalPrice(result.data.total_price)
            setFormData((prev) => {
                return {
                    ...prev,
                    salesman_name: result.data.salesman_name,
                    date: result.data.date,
                    day: result.data.day,
                    products: JSON.parse(result.data.products),
                }
            })
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
        <Typography variant="h2.heading" component="h2" className="page-heading">Update Salesman Billing</Typography>
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
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                <Autocomplete
                //   multiple
                  onChange={(e, v) =>
                    handleProductSelect(e, v)
                  }
                  name="product"
                  fullWidth={true}
                  id="combo-box-demo"
                  options={productList}
                  autoHighlight
                  getOptionLabel={(option) => option.product_name}
                //   value={formData.products}
                  renderOption={(props, option) => (
                    <div {...props}>
                        <img src={option.image_url} alt="" height="40px" width="45px" />
                        <ListItem key={option.product_name} value={option.product_name}>{option.product_name}</ListItem>
                    </div>
                  )}
                  renderInput={(params) => (
                    <>
                        <TextField
                          {...params}
                          label="Choose Product"
                          color="secondary"
                        //   inputProps={{
                        //     ...params.inputProps,
                        //   }}
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
                {/* start product lis table */}
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                  {formData.products.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                              <StyledTableCell>Product Image</StyledTableCell>
                              <StyledTableCell>Product Name</StyledTableCell>
                              <StyledTableCell align="center">Quantity</StyledTableCell>
                              <StyledTableCell align="center">Rate</StyledTableCell>
                              <StyledTableCell align="right">Total</StyledTableCell>
                              <StyledTableCell align="center">Action</StyledTableCell>
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
                                      <StyledTableCell align="center">
                                      {console.log('@@:', row, row.quantity)}
                                          <TextField
                                            name={row.product_name}
                                            type="number"
                                            size="small"
                                            id="outlined-error-helper-text"
                                            // label="Quantity"
                                            color="secondary"
                                            value={row.quantity} 
                                            onChange={handleProductQuantity}
                                            // helperText={formData.errors.products ?? formData.errors.products}
                                            // error={formData.errors.products ?? formData.errors.products === '' ? true : false}
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                                      <StyledTableCell align="right">Rs. {numberWithCommas(row.price * row.quantity)}</StyledTableCell>
                                      <StyledTableCell align="center">
                                        <Tooltip title="Delete">
                                            <IconButton 
                                                aria-label="delete"
                                                variant="contained"
                                                // color="secondary"
                                                className="color-blue"
                                                onClick={(e) => {
                                                  handleDelete(e, row, i);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
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
                <Grid item xs={12} sm={12} md={12} className="input-padding" display="flex" justifyContent="flex-end">
                    <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '500'}}>
                        {formData.products.length > 0 ? (`Total: Rs. ${numberWithCommas(totalPrice)}`) : `Total Rs. 0`}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={handleSubmit}
                        >Update
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../salesman-billing/0') }}
                        >Cancel
                    </Button>
                </Stack>
                </Grid> 
            </Grid>
        </Paper>  
        </Box>
    )
}

export default UpdateSalesmanBilling;