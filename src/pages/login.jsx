import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import '../index.css'
import image from '../assets/login2.svg'
import {Link} from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography, Box, Paper, Grid, TextField, InputLabel, OutlinedInput, FormControl, FormHelperText, Button, Stack, InputAdornment, IconButton} from '@mui/material';
    

import { UserContext } from '../contexts/userContext';
import { getLS, setLS } from '../contexts/localStorageEncryption';
import Cart from './cart';
import { CartContext } from '../contexts/cartContext';

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const { setCart } = useContext(CartContext);
    console.log("------user--------:", user);
    const history = useNavigate();
    document.title = 'Sign up'
    const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ showPassword, setShowPassword] = useState(false); 
    const [formData, setFormData] = useState({
        errors: {},
        email: '',
        password: ''
    })

    const handleToggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-addCategory--typing-:', targetValue);

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

    const validate = (data) => {
        console.log('-validate--data-:', data);
        let err = {},
            email,
            password;
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
            if(data.password === ''){
                password = 'This field is required'
            }else {
                password = '';
            }
            err.password = password;
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
            email: formData.email,
            password: formData.password,
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
            Axios.post(`${process.env.REACT_APP_API_SERVICE}/user/login`, model)
            .then((result) => {
                console.log('-handleSubmit--login user--success--:', result);
                enqueueSnackbar('Login Successfull !!', { variant: 'success'});

                console.log("## before:", window.localStorage.getItem("user_session"))
                window.localStorage.removeItem("user_session")

                window.localStorage.setItem("cart", JSON.stringify([]));
                setCart([]);

                // set user in local storage
                setLS(result.data);
                console.log("## after:", window.localStorage.getItem("user_session"))


                // set user information in userContext
                let userData = getLS();
                setUser(userData);

                console.log("@user:", userData)
                
                if(userData != null){
                    userData.user.role === "admin" ?  history("../dashboard") : history("../")
                }

            })
            .catch((error)=> {
                console.log('-handleSubmit--login user--error--:', error);
                setApiErrors('Either email address or password is incorrect!')
                // enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
            })
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }

    return (
        <Box className="container">
        <Typography variant="h2.heading" component="h2" className="page-heading">Login</Typography>
        <Paper elevation={4} className="paper">
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
                        <Typography sx={{display: 'inline'}}>
                            Don't have account? 
                        </Typography>
                        <Typography to={'/signup'} component={Link} sx={{display: 'inline'}} className="text-link">
                            {` Click here to Sign Up`}
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
                        >Login
                    </Button>
                </Stack>
                </Grid>
            </Grid>
        </Paper>
        </Box>
    )
}

export default Login;