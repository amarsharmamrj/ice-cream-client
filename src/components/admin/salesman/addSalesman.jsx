import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import '../../../index.css'
import { Typography, Box, Paper, Grid, TextField, InputLabel, MenuItem, FormControl, Select, FormHelperText, Button, Stack} from '@mui/material';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';
    
const arrayForAge = [];
for(let i = 10; i <= 100; i++){
    arrayForAge.push(i);
}

const AddSalesman = () => {
    const history = useNavigate();
    document.title = 'Add Salesman'
    CheckPageAccess();
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [formData, setFormData] = useState({
        errors: {},
        name: '',
        age: '',
        address: '',
        phone: '',
        status: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-addSalesman--typing-:', targetValue);

        let data = {[targetName]: targetValue}
        
        let flag = 1;
        let err = validate(data);

        setFormData(prev => {
            return {
                ...prev,
                [targetName]: targetValue
            }
        })
    }

    const validate = (data) => {
        console.log('-validate--data-:', data);
        let err = {}, 
            name,
            age,
            address,
            phone,
            status;
        if(data.hasOwnProperty('name')){
            if(data.name === ''){
                name = 'This field is required'
            }else {
                name = '';
            }
            err.name = name;
        }
        if(data.hasOwnProperty('age')){
            if(data.age === ''){
                age = 'This field is required'
            }else {
                age = '';
            }
            err.age = age;
        }
        if(data.hasOwnProperty('address')){
            if(data.address === ''){
                address = 'This field is required'
            }else {
                address = '';
            }
            err.address = address;
        }
        if(data.hasOwnProperty('phone')){
            if(data.phone === ''){
                phone = 'This field is required'
            }else {
                phone = '';
            }
            err.phone = phone;
        }
        if(data.hasOwnProperty('status')){
            if(data.status == ''){
                status = 'This field is required'
            }else {
                status = '';
            }
            err.status = status;
        }
        setFormData({
            ...formData,
            errors: {...formData.errors, ...err}
        })
        return err;
    }
    
    const handleSubmit = (e) => {
        // e.preventDefault();
        const model = {
            name: formData.name,
            age: formData.age,
            address: formData.address,
            phone: formData.phone,
            status: formData.status === 1 ? true : false,
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
            Axios.post(`${process.env.REACT_APP_API_SERVICE}/salesman/add`, model)
            .then((result) => {
                console.log('-handleSubmit--add salesman--success--:', result);
                enqueueSnackbar('Form submitted sucessfully!', { variant: 'success'});
                setTimeout(() => {
                    history('../manage-salesman');
                }, 2000)
            })
            .catch((error)=> {
                console.log('-handleSubmit--add salesman--error--:', error);
                if(error.response.status === 500){
                    setApiErrors(error.response.data.message)
                }
                enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
            })
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Add Salesman</Typography>
        <Paper elevation={4} className="paper">
            <Grid container>
                {apiErrors!= '' ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <h3 style={{color:'red'}}>{apiErrors}</h3>
                    </Grid>
                ) : ''}
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        name="name"
                        fullWidth
                        id="outlined-error-helper-text"
                        label="Salesman Name"
                        color="secondary"
                        onChange={handleOnChange}
                        helperText={formData.errors.name ?? formData.errors.name}
                        error={formData.errors.name ?? formData.errors.name === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <FormControl fullWidth>
                        <InputLabel color="secondary">Age</InputLabel>
                        <Select
                            name="age"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.age}
                            label="Age"
                            color="secondary"
                            onChange={handleOnChange}
                            error={formData.errors.age ?? formData.errors.age === '' ? true : false}
                        >
                           {arrayForAge.map((item) => <MenuItem value={item}>{item}</MenuItem>)}
                        </Select>
                        <FormHelperText style={{color: '#d32f2f'}}>{formData.errors.age ?? formData.errors.age}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className="input-padding">
                    <TextField
                        name="address"
                        fullWidth
                        id="outlined-error-helper-text2"
                        label="Address"
                        color="secondary"
                        onChange={handleOnChange}
                        helperText={formData.errors.address ?? formData.errors.address}
                        error={formData.errors.address ?? formData.errors.address === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <TextField
                        name="phone"
                        fullWidth
                        id="outlined-error-helper-text3"
                        label="Phone"
                        color="secondary"
                        onChange={handleOnChange}
                        helperText={formData.errors.phone ?? formData.errors.phone}
                        error={formData.errors.phone ?? formData.errors.phone === '' ? true : false}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <FormControl fullWidth>
                        <InputLabel color="secondary">Status</InputLabel>
                        <Select
                            name="status"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData.status}
                            label="Status"
                            color="secondary"
                            onChange={handleOnChange}
                            error={formData.errors.status ?? formData.errors.status === '' ? true : false}
                            // helperText={formData.errors.status ?? formData.errors.status}
                        >
                            <MenuItem value={1}>Active</MenuItem>
                            <MenuItem value={2}>Inactive</MenuItem>
                        </Select>
                        <FormHelperText style={{color: '#d32f2f'}}>{formData.errors.status ?? formData.errors.status}</FormHelperText>
                    </FormControl>
                </Grid>
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
                        onClick={() => { history('../manage-salesman') }}
                        >Cancel
                    </Button>
                </Stack>
                </Grid>
            </Grid>
        </Paper>
        </Box>
    )
}

export default AddSalesman;