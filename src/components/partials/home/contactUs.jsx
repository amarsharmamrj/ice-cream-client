import React, { useState, useEffect } from 'react';
import image from '../../../assets/bg10.jpg';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useSnackbar } from 'notistack'; 
import { Typography, Box, Button, Grid, Stack, TextField } from '@mui/material';
import Fade from 'react-reveal/Fade'
import { makeStyles } from '@mui/styles'; 
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles({
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '2px solid #0982ef !important',
                color: '#0982ef !important'
            },
        },
        '& .MuiInputLabel-outlined': {
            color: '#0982ef !important'
        },
    },
    inputGrid: {
        margin: '0.8rem 1rem',
    }
})
// border: '4px solid rgb(9 153 152) !important'

const ContactUs = () => {
    const classes = useStyles();
    const history = useNavigate();
        const { enqueueSnackbar } = useSnackbar();
    const [ apiErrors, setApiErrors] = useState(''); 
    const [ disableSubmit, setDisableSubmit] = useState(false); 
    const [formData, setFormData] = useState({
        errors: {},
        name: '',
        email: '',
        phone: '',
        message: '',
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

    const handleOnChange = (e) => {
        e.preventDefault();
        let targetName = e.target.name;
        let targetValue = e.target.value;
        console.log('-contactus--typing-:', targetValue);
        
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
            name,
            email,
            phone,
            message;
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
        if(data.hasOwnProperty('phone')){
            let phoneRegex = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/
            if(data.phone === ''){
                phone = 'This field is required'
            } else if(!phoneRegex.test(data.phone)){
                phone = "Kindly enter a valid phone."
            }else {
                phone = '';
            }
            err.phone = phone;
        }
        if(data.hasOwnProperty('message')){
            let messageRegex = /^[a-zA-Z ]{1,100}$/;
            if(data.message === ''){
                message = 'This field is required.'
            } else if(!messageRegex.test(data.message)){
                message = "No symbols are allowed!"
            }else if(data.message.length > 100){
                message = "Message should be less than 100 characters."
            }else {
                message = '';
            }
            err.message = message;
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
            email: formData.email,
            phone: formData.phone,
            message: formData.message
        }
        console.log('-handleSubmit--model:', model);

        let err = validate(model);
        console.log("err:", err)
        let flag = 1;
        for(let key in err){
            if(err[key] !== ''){
                flag = 0;
            }
        }
        
        if(flag){
            if(formData.captcha){
                Axios.post(`${process.env.REACT_APP_API_SERVICE}/contact/add`, model)
                .then((result) => {
                    console.log('-handleSubmit--add user--success--:', result);
                    enqueueSnackbar('Message sent successfully!', { variant: 'success'});
                    setDisableSubmit(true);
                    setTimeout(() => {
                        setFormData({
                            errors: {},
                            name: '',
                            email: '',
                            phone: '',
                            message: ''
                        })
                        setDisableSubmit(false);
                    }, 2000)
                })
                .catch((error)=> {
                    console.log('-handleSubmit--add user--error--:', error);
                    enqueueSnackbar('Oops!, Something went wrong.', { variant: 'warning'})
                })
            }else {
                enqueueSnackbar('Please verify reCaptcha!', { variant: 'warning'})
            }
        }else {
            enqueueSnackbar('Kindly fix the highlighted errors.', { variant: 'error'})
        }
    }

    useEffect(()=> {

    }, [formData])
  
    return (
    <Box style={{backgroundColor: 'white', margin: '0', padding: '0'}}>
      <Box style={{padding: '2rem 0rem 0rem 0rem'}}>
        {/* <Typography variant="h2.heading" component="h2" className="home-section-heading">CONTACT US</Typography>
        <hr class="home-section-hr" style={{marginBottom: '2rem'}} /> */}
            <Grid container className="home-parallex-reach-us">
                
                <Grid item xs={12} sm={12} md={12} mt={2}>
                    <Typography variant="h2.heading" component="h2" className="home-section-heading">CONTACT US</Typography>
                    <hr class="home-section-hr" style={{marginBottom: '0rem'}} />
                </Grid>

                <Grid item xs={12} sm={12} md={6}></Grid>

                <Grid item container xs={12} sm={12} md={6} pt={4}>

                    <Grid item xs={12} sm={12} md={12} className={classes.inputGrid}>
                        <TextField
                            className={classes.textField}
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
                    <Grid item xs={12} sm={12} md={12} className={classes.inputGrid}>
                        <TextField
                            className={classes.textField}
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
                    <Grid item xs={12} sm={12} md={12} className={classes.inputGrid}>
                        <TextField
                            className={classes.textField}
                            name="phone"
                            value={formData.phone}
                            fullWidth={true}
                            id="outlined-error-helper-text"
                            label="Phone"
                            color="secondary"
                            onChange={handleOnChange}
                            helperText={formData.errors.phone ?? formData.errors.phone}
                            error={formData.errors.phone ?? formData.errors.phone === '' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.inputGrid}>
                        <TextField
                            className={classes.textField}
                            name="message"
                            value={formData.message}
                            fullWidth={true}
                            multiline={true}
                            rows={4}
                            id="outlined-error-helper-text"
                            label="Message"
                            color="secondary"
                            onChange={handleOnChange}
                            helperText={formData.errors.message ?? formData.errors.message}
                            error={formData.errors.message ?? formData.errors.message === '' ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={classes.inputGrid}>
                        <ReCAPTCHA
                          sitekey={process.env.REACT_APP_RECAPTCHA_KEY} 
                          onChange={handleReCaptcha} 
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="flex-end">
                        <Stack direction="row" spacing={2} mb={4} justifyContent="center">
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                disabled={disableSubmit}
                                className="primary-button-dark"
                                onClick={handleSubmit}
                                >Send Message
                            </Button>
                </Stack>
                </Grid>
                </Grid>

            </Grid>
        </Box>
    </Box>
    )
}

export default ContactUs;