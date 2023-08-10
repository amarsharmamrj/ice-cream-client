import React from 'react';
import '../../../index.css';
import imageDiscount from '../../../assets/choose-discount.svg';
import imageTaste from '../../../assets/choose-taste.svg';
import imageParty from '../../../assets/choose-party.svg';
import imageGrowth from '../../../assets/choose-growth.svg';

import { Typography, Box, Grid, Stack } from '@mui/material';
import Fade from 'react-reveal/Fade'

const WhyChooseUs = () => {
    const imageStyle = {
        height: '100px',
        width: '320px'
    }
    const headingStyle = {
        fontSize: '1.8rem',
        color: '#01abaa',
        padding: '1.2rem 0 0.8rem 0',
        fontWeight: '500'
    }
    // const cardStyle = {
    //     margin: '0.2rem',
    //     padding: '0.5rem 0.2rem 0.2rem 0.2rem',
    //     border: '1px solid #01abaa',
    //     borderRadius: '5px',
    //     '&:hover': {
    //         border: '1px solid orange',
    //     }
    // }
    return (
    <Box style={{backgroundColor: 'white', margin: '0', padding: '0'}}>
      <Box style={{padding: '2rem 4rem 2rem 4rem'}}>
        <Typography variant="h2.heading" component="h2" className="home-section-heading">WHY CHOOSE US</Typography>
        <hr class="home-section-hr" style={{marginBottom: '2rem'}} />
            <Grid container>

                <Grid item xs={12} sm={12} md={3} className="input-padding">
                    <Fade left={true} delay={200}>
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" className="home-choose-card">
                            <img src={imageDiscount} alt="empty cart" style={imageStyle} />
                            <Typography variant="h2.heading" component="h2" style={headingStyle}>Heavy Discount</Typography>
                        </Stack>
                    </Fade>
                </Grid>
                <Grid item xs={12} sm={12} md={3} className="input-padding">
                    <Fade left={true}> 
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" className="home-choose-card">
                            <img src={imageTaste} alt="empty cart" style={imageStyle} />
                            <Typography variant="h2.heading" component="h2" style={headingStyle}>Unique Taste</Typography>
                        </Stack>
                    </Fade>
                </Grid>
                <Grid item xs={12} sm={12} md={3} className="input-padding">
                    <Fade right={true}>
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" className="home-choose-card">
                            <img src={imageParty} alt="empty cart" style={imageStyle} />
                            <Typography variant="h2.heading" component="h2" style={headingStyle}>Party Booking</Typography>
                        </Stack>
                    </Fade>
                </Grid>
                <Grid item xs={12} sm={12} md={3} className="input-padding">
                    <Fade right={true} delay={200}>
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" className="home-choose-card">
                            <img src={imageGrowth} alt="empty cart" style={imageStyle} />
                            <Typography variant="h2.heading" component="h2" style={headingStyle}>Leading Market</Typography>
                        </Stack>
                    </Fade>
                </Grid>
            
            </Grid>
        </Box>
    </Box>
    )
}

export default WhyChooseUs;