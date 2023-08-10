import React, { useState } from 'react';
import image from '../../../assets/bg10.jpg';
import { Typography, Box, Button, Grid, Stack, TextField } from '@mui/material';
import Fade from 'react-reveal/Fade'
import { makeStyles } from '@mui/styles'; 

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
        margin: '0.8rem 4rem',
    }
})
// border: '4px solid rgb(9 153 152) !important'

const ReachUs = () => {
    const classes = useStyles();
    
    const [formData, setFormData] = useState({
        errors: {},
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleOnChange = () => {
        
    }
  
    return (
    <Box style={{backgroundColor: 'azure', margin: '0', padding: '0'}}>
      <Box style={{padding: '2rem 4rem 4rem 2rem'}}>
        <Typography variant="h2.heading" component="h2" className="home-section-heading">REACH US</Typography>
        <hr class="home-section-hr" style={{marginBottom: '2rem'}} />
            <Grid container>

                <Grid item xs={12} sm={12} md={6}>

                </Grid>

                <Grid item xs={12} sm={12} md={6} pt={4}>

                </Grid>

            </Grid>
        </Box>
    </Box>
    )
}

export default ReachUs;