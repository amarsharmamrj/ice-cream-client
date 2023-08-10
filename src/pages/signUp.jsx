import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import '../index.css'
import image from '../assets/signup2.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MomentUtils from '@date-io/moment'; 
import {Link} from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography, Box, Paper, Grid, TextField, InputLabel, OutlinedInput, FormControl, FormHelperText, Button, Stack, InputAdornment, IconButton} from '@mui/material';
import { UserContext } from '../contexts/userContext';
import ReCAPTCHA from "react-google-recaptcha";
    
const SignUp = () => {
    const { user } = useContext(UserContext);
    console.log("----userContext------:", user);
    const history = useNavigate();
    document.title = 'Sign up'
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ showPassword, setShowPassword] = useState(false); 
    const [ formData, setFormData] = useState({
        errors: {},
        name: '',
        dob: null,
        email: '',
        password: '',
        confirm_password: '',
        captcha: false
    })
    
    const handleReCaptcha = (value) => {
        console.log("recaptcha:", value)
        if(value == null){
            setFormData({...formData, captcha: false});
        }else {
            setFormData({...formData, captcha: true});
        }
    }

    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
    }

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
            email,
            password,
            confirm_password;
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
        if(data.hasOwnProperty('password')){
            if(data.password.length < 4){
                password = 'Password should be more than 4 characters.'
            }else if(data.password.length > 20){
                password = "Password shoul be less than 20 characters."
            }else {
                password = '';
            }
            err.password = password;
        }
        if(data.hasOwnProperty('confirm_password')){
            if(data.confirm_password !== formData.password){
                confirm_password = 'Confirm Password does not match with above password.'
            }else {
                confirm_password = '';
            }
            err.confirm_password = confirm_password;
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
            dob: formData.dob != null ? formData.dob._d : '',
            email: formData.email,
            password: formData.password
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
            if(formData.captcha){
                Axios.post(`${process.env.REACT_APP_API_SERVICE}/user/add`, model)
                .then((result) => {
                    console.log('-handleSubmit--add user--success--:', result);
                    enqueueSnackbar('Account created successfully!', { variant: 'success'});
                    setTimeout(() => {
                        history('../login');
                    }, 2000)
                })
                .catch((error)=> {
                    console.log('-handleSubmit--add user--error--:', error);
                    if(error.response.status === 409){
                        setApiErrors(error.response.data.message)
                    }
                    enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
                })
            }else {
                enqueueSnackbar('Please verify reCaptcha!', { variant: 'warning'})
            }
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Sign Up</Typography>
        <Paper elevation={4} className="paper">
            <Grid container>
                {apiErrors !== '' ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <h3 style={{color:'red'}}>{apiErrors}</h3>
                    </Grid>
                ) : ''}
                <Grid item container xs={12} sm={12} md={5} className="input-padding">
                    <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" style={{padding: '5px 0px', margin: '0px', height: '100%'}}>
                        <img src={image} alt="empty cart" style={{height: '200px', width: '0px'}} />
                    </Stack>
                </Grid>
                
                <Grid item container xs={12} sm={12} md={7}>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <TextField
                            name="name"
                            fullWidth
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
                              fulwidth="true"
                              name="dob"
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
                            fullWidth
                            id="outlined-error-helper-text"
                            label="Email"
                            color="secondary"
                            onChange={handleOnChange}
                            helperText={formData.errors.email ?? formData.errors.email}
                            error={formData.errors.email ?? formData.errors.email === '' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <FormControl fullWidth={true} variant="outlined" color="secondary">
                          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth={true}
                            onChange={handleOnChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleToggleVisibility}
                                //   onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility className="color-blue" /> : <VisibilityOff  className="color-blue"  />}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                            error={formData.errors.password ?? formData.errors.password === '' ? true : false}
                          />
                        </FormControl>
                        <FormHelperText style={{color: '#d32f2f', marginLeft: '14px'}}>{formData.errors.password ?? formData.errors.password}</FormHelperText>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <FormControl fullWidth={true} variant="outlined" color="secondary">
                          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            name="confirm_password"
                            type="password"
                            fullWidth={true}
                            onChange={handleOnChange}
                            label="Confirm Password"
                            error={formData.errors.confirm_password ?? formData.errors.confirm_password === '' ? true : false}
                          />
                        </FormControl>
                        <FormHelperText style={{color: '#d32f2f', marginLeft: '14px'}}>{formData.errors.confirm_password ?? formData.errors.confirm_password}</FormHelperText>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <ReCAPTCHA
                          sitekey={process.env.REACT_APP_RECAPTCHA_KEY} 
                          onChange={handleReCaptcha} 
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
                        >Sign Up
                    </Button>
                </Stack>
                </Grid>
            </Grid>
        </Paper>
        </Box>
    )
}

export default SignUp;