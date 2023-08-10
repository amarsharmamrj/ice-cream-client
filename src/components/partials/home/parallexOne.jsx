import React from 'react';
import '../../../index.css';
import image from '../../../assets/bg2.jpg';
import { Typography, Box, Paper, Grid, Stack } from '@mui/material';

const ParallexOne = () => {
    const parallexStyle = {
        backgroundImage: 'url("../../../assets/bg2.jpg")',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
    return (
      <Box>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                   <div className="home-parallex-one">
                       
                   </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ParallexOne;