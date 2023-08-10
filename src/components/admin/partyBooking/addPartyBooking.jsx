import React, { useState , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import { useSnackbar } from 'notistack'; 
import '../../../index.css'
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Divider, Chip, Tooltip, IconButton, Box, Paper,InputAdornment, Grid, TextField, Autocomplete, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack, ListItem} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody'; 
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment'; 
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

const AddPartyBooking = () => {
    const history = useNavigate();
    document.title = 'Add Party Booking'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ currentQuantity, setCurrentQuantity] = useState(''); 
    const [ productList, setProductList] = useState([]);
    const [ salesmanList, setSalesmanList] = useState([]);
    const [ totalPrice, setTotalPrice] = useState(0); 
    const [ advance, setAdvance] = useState(0); 
    const [ totalDiscountPrice, setTotalDiscountPrice] = useState(0); 
    const [formData, setFormData] = useState({
        errors: {},
        customer_name: '',
        date: new Date(),
        time: new Date(),
        mobile_number: '',
        alternate_mobile_number: '',
        address: '',
        products: [],
        total_price: 0,
        total_discount: 0,
        advance: 0,
        final_price: 0
    })
    // moment(new Date()).format('dddd')
    function numberWithCommas(number) {
        number=number.toString();
        let lastThree = number.substring(number.length-3);
        let otherNumbers = number.substring(0,number.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    
    const handleOnChange = (e) => {
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-addCategory--typing-:', targetValue);

        if(targetName === 'advance'){
            let data = {[targetName]: targetValue}
            console.log('##:', formData.total_price, formData.total_discount, formData.advance)
            let err = validate(data);
            setFormData(prev => {
                return {
                    ...prev,
                    [targetName]: targetValue,
                    final_price: formData.total_price - formData.total_discount - targetValue
                }
            })
            // calculateTotalPrice();
        }else {
            let data = {[targetName]: targetValue}
            let err = validate(data);
            setFormData(prev => {
                return {
                    ...prev,
                    [targetName]: targetValue,
                    errors: {
                        ...prev.errors,
                        ...err
                    }
                }
            })
        }
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
            let data = [];
            if(!flag){
                let product = { "product_id": v._id, "product_name": v.product_name, "price": v.price, "image_url": v.image_url, "quantity": "", "discounted_rate": v.price}
                data = [...formData.products, product]
                setFormData((prev) => {
                    return {
                        ...prev,
                        products: data
                    }
                })
            }
            setFormData((prev) => {
                return {
                    ...prev,
                    products: data,
                    errors: {...prev.errors, products: ''}
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


            let totalDiscount = 0;
            formData.products.forEach((item) => {
                totalDiscount = totalDiscount + (item.discounted_rate * item.quantity);
            })
            console.log('total:', totalDiscount)
            setTotalDiscountPrice(totalDiscount);
            setFormData((prev) => {
                return {
                    ...prev,
                    total_discount: total-totalDiscount,
                    // final_price: total-(total-totalDiscount)-formData.advance
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

    const handleProductDiscountedRate = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-handleProductDiscountedRate--:', targetName, targetValue);
        if(targetValue != '' || targetValue != '0'){
            formData.products.forEach((item) => {
                if(item.product_name === targetName){
                    item.discounted_rate = targetValue;
                    setCurrentQuantity(targetValue);
                }
            })
            console.log('-handleProductDiscountedRate--:', formData.products);
            calculateTotalPrice();
        }
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
        let err = {},
            customer_name,
            date,
            time,
            mobile_number,
            alternate_mobile_number,
            address,
            products;
        if(data.hasOwnProperty('customer_name')){
            if(data.customer_name === ''){
                customer_name = 'This field is required.'
            }else {
                customer_name = '';
            }
            err.customer_name = customer_name;
        }
        if(data.hasOwnProperty('date')){
            if(data.date === '' || data.date == null){
                date = 'This field is required.'
            }else {
                date = '';
            }
            err.date = date;
        }
        if(data.hasOwnProperty('time')){
            if(data.time === '' || data.time == null){
                time = 'This field is required.'
            }else {
                time = '';
            }
            err.time = time;
        }
        if(data.hasOwnProperty('mobile_number')){
            if(data.mobile_number === ''){
                mobile_number = 'This field is required.'
            }else {
                mobile_number = '';
            }
            err.mobile_number = mobile_number;
        }
        if(data.hasOwnProperty('alternate_mobile_number')){
            if(data.alternate_mobile_number === ''){
                alternate_mobile_number = 'This field is required.'
            }else {
                alternate_mobile_number = '';
            }
            err.alternate_mobile_number = alternate_mobile_number;
        }
        if(data.hasOwnProperty('address')){
            if(data.address === ''){
                address = 'This field is required.'
            }else {
                address = '';
            }
            err.address = address;
        }
        if(data.hasOwnProperty('products')){
            if(data.products.length < 1){
                products = 'Kindly select atleast one product from the above dropdown.'
            }else {
                products = '';
            }
            err.products = products;
        }
        setFormData({
            ...formData,
            errors: {...formData.errors, ...err}
        })
        return err;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const model = {
            customer_name: formData.customer_name,
            date: moment(formData.date._d).format('LL'),
            time: moment(formData.time._d).format('LT'),
            mobile_number: formData.mobile_number,
            alternate_mobile_number: formData.alternate_mobile_number,
            address: formData.address,
            products: JSON.stringify(formData.products),
            total_price: parseInt(formData.total_price),
            total_discount: parseInt(formData.total_discount),
            advance: parseInt(formData.advance),
            final_price: parseInt(formData.final_price)
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
            Axios.post(`${process.env.REACT_APP_API_SERVICE}/partyBooking/add`, model)
            .then((result) => {
                console.log('-handleSubmit--add products--success--:', result);
                enqueueSnackbar('Form submitted sucessfully!', { variant: 'success'});
                setTimeout(() => {
                    history('../manage-party-booking');
                }, 2000)
            })
            .catch((error)=> {
                console.log('-handleSubmit--addSalesmanBilling--error--:', error);
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

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/salesman/getAll`)
        .then((result) => {
            console.log('-useEffect--get salesman list from server--success--:', result, result.data);
            let activeSalesmanList = result.data.filter((item) => item.status === true)
            setSalesmanList(activeSalesmanList);
        })
        .catch((error)=> {
            console.log('-useEffect--get salesman list from server--error--:', error);
        })
    }

    useEffect(() => {
        getProductList();
        getData();
    }, [1])  

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Add Party Booking</Typography>
        <Paper elevation={4} className="paper">
            <Grid container>
                {apiErrors!= '' ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <h3 style={{color:'red'}}>{apiErrors}</h3>
                    </Grid>
                ) : ''}
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                    <TextField
                        fullWidth={true}
                        name="customer_name"
                        onChange={handleOnChange}
                        id="outlined-error-helper-text"
                        label="Customer Name"
                        color="secondary"
                        helperText={formData.errors.customer_name ?? formData.errors.customer_name}
                        error={formData.errors.customer_name ?? formData.errors.customer_name === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <LocalizationProvider dateAdapter={MomentUtils}>
                        <DatePicker
                          fulwidth="true"
                          name="date"
                          onChange={handleOnChange}
                          label="Delivery Time"
                          value={formData.date}
                          onChange={(newValue) => {
                            setFormData({...formData, date : newValue});
                          }}
                          renderInput={(params) => <TextField {...params} fullWidth="true" />}
                          helperText={formData.errors.date ?? formData.errors.date}
                          error={formData.errors.date ?? formData.errors.date === '' ? true : false}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <LocalizationProvider dateAdapter={MomentUtils}>
                        <TimePicker
                            label="Delivery Time"
                            name="time"
                            onChange={handleOnChange}
                            value={formData.time}
                            onChange={(newValue) => {
                              setFormData({...formData, time: newValue});
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth="true" />}
                            helperText={formData.errors.time ?? formData.errors.time}
                            error={formData.errors.time ?? formData.errors.time === '' ? true : false}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        fullWidth={true}
                        name="mobile_number"
                        onChange={handleOnChange}
                        id="outlined-error-helper-text"
                        label="Mobile Number"
                        color="secondary"
                        helperText={formData.errors.mobile_number ?? formData.errors.mobile_number}
                        error={formData.errors.mobile_number ?? formData.errors.mobile_number === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        fullWidth={true}
                        name="alternate_mobile_number"
                        onChange={handleOnChange}
                        id="outlined-error-helper-text"
                        label="Alternate Mobile Number"
                        color="secondary"
                        helperText={formData.errors.alternate_mobile_number ?? formData.errors.alternate_mobile_number}
                        error={formData.errors.alternate_mobile_number ?? formData.errors.alternate_mobile_number === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                    <TextField
                        fullWidth={true}
                        name="address"
                        onChange={handleOnChange}
                        id="outlined-error-helper-text"
                        label="Address"
                        color="secondary"
                        helperText={formData.errors.address ?? formData.errors.address}
                        error={formData.errors.address ?? formData.errors.address === '' ? true : false}
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
                        error={formData.errors.products ?? formData.errors.products === '' ? true : false}
                        />
                    </>
                  )}
                //   helperText={formData.errors.products ?? formData.errors.products}
                //   error={formData.errors.products ?? formData.errors.products === '' ? true : false}
                />
                    <FormHelperText style={{color: '#d32f2f', paddingLeft: '1rem'}}>{formData.errors.products ?? formData.errors.products}</FormHelperText>
                </Grid>

                {formData.products.length > 0 ? (
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider style={{width: '100%', alignItems: 'center', margin: '1.5rem 0 0.2rem 0'}} color="secondary">
                            <Chip label="PRODUCT DESCRIPTION" />
                        </Divider>
                    </Grid>
                ) : ''}

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
                              <StyledTableCell align="center">Discounted Rate</StyledTableCell>
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
                                      <StyledTableCell align="center">
                                        <TextField
                                            name={row.product_name}
                                            type="number"
                                            size="small"
                                            id="outlined-error-helper-text"
                                            // label="Quantity"
                                            color="secondary"
                                            value={row.discounted_rate} 
                                            onChange={handleProductDiscountedRate}
                                            // helperText={formData.errors.products ?? formData.errors.products}
                                            // error={formData.errors.products ?? formData.errors.products === '' ? true : false}
                                        />
                                      </StyledTableCell>
                                      <StyledTableCell align="right">Rs. {numberWithCommas(row.discounted_rate * row.quantity)}</StyledTableCell>
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
                  ) : ""}
                </Grid> 
                {/* end of product list table */}
                
                {formData.products.length > 0 ? (
                    <>
                        <Grid item xs={12} sm={12} md={12}>
                            <Divider style={{width: '100%', alignItems: 'center', margin: '1.5rem 0 0.2rem 0'}} color="secondary">
                                <Chip label="PRICE DESCRIPTION" />
                            </Divider>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className="input-padding">
                            <TextField
                                fullWidth={true}
                                type="number"
                                name="advance"
                                onChange={handleOnChange}
                                id="outlined-error-helper-text"
                                label="Advance"
                                color="secondary"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                            <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '400'}}>
                                {formData.products.length > 0 ? (`Total: Rs. ${numberWithCommas(totalPrice)}`) : `Total Rs. 0`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                            <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '400'}}>
                                {formData.products.length > 0 ? (`Total Discount(-): Rs. ${numberWithCommas(totalPrice-totalDiscountPrice)}`) : `Total Discount Rs. 0`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} style={{padding: '0.5rem 1rem 0 1rem'}} display="flex" justifyContent="flex-end">
                            <Typography variant="h2.heading" component="h2" style={{fontSize: '18px', fontWeight: '400'}}>
                                {formData.products.length > 0 ? (`Advance(-): Rs. ${numberWithCommas(formData.advance)}`) : `Advance Rs. 0`}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className="input-padding" display="flex" justifyContent="flex-end">
                            <Typography variant="h2.heading" component="h2" style={{fontSize: '20px', fontWeight: '500'}}>
                                {formData.products.length > 0 ? (`Final Price: Rs. ${numberWithCommas((totalPrice-(totalPrice-totalDiscountPrice))-formData.advance)}`) : `Total Discount Rs. 0`}
                            </Typography>
                        </Grid>
                    </>
                ) : '' }

                <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={handleSubmit}
                        >Save
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={() => { history('../manage-party-booking') }}
                        >Cancel
                    </Button>
                </Stack>
                </Grid> 
            </Grid>
        </Paper>  
        </Box>
    )
}

export default AddPartyBooking;