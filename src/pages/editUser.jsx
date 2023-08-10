import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import '../index.css'
import image from '../assets/edit.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment'; 
import {Link} from 'react-router-dom';
import { Typography, Box, Paper, Grid, TextField, FormHelperText, Button, Stack } from '@mui/material';
import { UserContext } from '../contexts/userContext';
import { getLS } from '../contexts/localStorageEncryption';
    
const EditUser = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("----userContext------:", user);
    const history = useNavigate();
    document.title = 'Edit Profile'
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ formData, setFormData] = useState({
        errors: {},
        name: '',
        dob: null,
        email: ''
    })

    const handleOnChange = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-addCategory--typing-:', targetValue);
        
        if(targetName === 'dob'){
            let data = {[targetName]: targetValue._d}
            // let flag = 1;
            let err = validate(data);

            setFormData(prev => {
                return {
                    ...prev,
                    [targetName]: targetValue._d,
                    errors: {
                        ...prev.errors,
                        ...err
                    }
                }
            })
        }else {
            let data = {[targetName]: targetValue}
            // let flag = 1;
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

    const validate = (data) => {
        console.log('-validate--data-:', data);
        let err = {},
            name,
            dob,
            email;
        if(data.hasOwnProperty('name')){
            let nameRegex = /^[a-zA-Z ]{2,40}$/;
            if(data.name === ''){
                name = 'This field is required'
            }else if(!nameRegex.test(data.name)){
                name = "Kindly enter a valid name."
            }else {
                name = '';
            }
            err.name = name;
        }
        if(data.hasOwnProperty('dob')){
            if(data.dob === '' || data.dob === null){
                dob = 'This field is required'
            }else {
                dob = '';
            }
            err.dob = dob;
        }
        if(data.hasOwnProperty('email')){
            let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(data.email === ''){
                email = 'This field is required'
            }else if(!emailRegex.test(data.email)){
                email = "Kindly enter a valid email address."
            }else {
                email = '';
            }
            err.email = email;
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
            dob: formData.dob,
            email: formData.email,
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
            const token = getLS().token;
            Axios.patch(`${process.env.REACT_APP_API_SERVICE}/user/me`, model, {
                headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log('-handleSubmit--edit user user--success--:', result);
                enqueueSnackbar('Account updated successfully!', { variant: 'success'});
                setTimeout(() => {
                    history('../login');
                    window.localStorage.removeItem("user_session")
                    setUser(null)
                }, 2000)
            })
            .catch((error)=> {
                console.log('-handleSubmit--edit user--error--:', error);
                if(error.response.status === 409){
                    setApiErrors(error.response.data.message)
                }
                enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
            })
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }
    
    const getData = () => {
        const token = getLS() != null ? getLS().token : null;
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/user/me/`, 
            {
                headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${token}`
                }
            })
        .then((result) => {
            console.log('-useEffect--get user data from server--success--:', result, result.data);
            console.log('-useEffect--get user data from server--success--:', result.data.dob, new Date(result.data.dob));
            setFormData((prev) => {
                return {
                    ...prev,
                    name: result.data.name,
                    dob: new Date(result.data.dob),
                    email: result.data.email
                }
            })
        })
        .catch((error)=> {
            console.log('-useEffect--get user data from server--error--:', error);
            if(error.response.status === 401){
                console.log("@ 401")
                history("../unauthorized")
            }
        })
    }

    useEffect(()=> {
        getData();
    }, [1])

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Update User</Typography>
        <Paper elevation={4} className="paper" style={{padding: '1rem 2rem'}}>
            <Grid container>
                {apiErrors !== '' ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <h3 style={{color:'red'}}>{apiErrors}</h3>
                    </Grid>
                ) : ''}
                <Grid item container xs={12} sm={12} md={5} className="input-padding">
                    <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" style={{padding: '5px 0px', margin: '0px', height: '100%'}}>
                        <img src={image} alt="empty cart" style={{height: '200px', width: '320px'}} />
                    </Stack>
                </Grid>
                
                <Grid item container xs={12} sm={12} md={7}>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <TextField
                            name="name"
                            value={formData.name}
                            fullWidth={true}
                            id="outlined-error-helper-text"
                            label="Name"
                            color="secondary"
                            onChange={handleOnChange}
                            helperText={formData.errors.name ?? formData.errors.name}
                            error={formData.errors.name ?? formData.errors.name === '' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <LocalizationProvider dateAdapter={MomentUtils}>
                            <DatePicker
                              fulwidth={true}
                              name="dob"
                              value={formData.dob}
                              color="secondary"
                            //   onChange={handleOnChange}
                              label="Date Of Birth"
                              value={formData.dob}
                              onChange={(newValue) => {
                                setFormData({...formData, dob : newValue});
                              }}
                              renderInput={(params) => <TextField {...params} fullWidth="true" />}
                            //   helperText={formData.errors.dob ?? formData.errors.dob}
                              error={formData.errors.dob ?? formData.errors.dob === '' ? true : false}
                            />
                        </LocalizationProvider>
                        <FormHelperText style={{color: '#d32f2f', marginLeft: '14px'}}>{formData.errors.dob ?? formData.errors.dob}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <TextField
                            name="email"
                            value={formData.email}
                            fullWidth={true}
                            id="outlined-error-helper-text"
                            label="Email"
                            color="secondary"
                            onChange={handleOnChange}
                            helperText={formData.errors.email ?? formData.errors.email}
                            error={formData.errors.email ?? formData.errors.email === '' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <Typography sx={{display: 'inline'}}>
                            Already have account? 
                        </Typography>
                        <Typography to={'/login'} component={Link} sx={{display: 'inline'}} className="text-link">
                            {` Click here to Login`}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                <Stack direction="row" spacing={2} mt={0} justifyContent="flex-end">
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={handleSubmit}
                        >Update
                    </Button>
                </Stack>
                </Grid>
            </Grid>
        </Paper>
        </Box>
    )
}

export default EditUser;