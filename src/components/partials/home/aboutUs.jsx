import React from 'react';
import image from '../../../assets/about-us.svg';
import { Typography, Box, Paper, Grid, Stack } from '@mui/material';
import Fade from 'react-reveal/Fade'

const AboutUs = () => {
  
    return (
    <Box style={{backgroundColor: 'azure', margin: '0', padding: '0'}}>
      <Box style={{padding: '2rem 4rem 2rem 4rem'}}>
        <Typography variant="h2.heading" component="h2" className="home-section-heading">ABOUT US</Typography>
        <hr class="home-section-hr" />
            <Grid container>
                <Grid item xs={12} sm={12} md={6} className="input-padding">
                    <Fade left={true}>
                        <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" style={{padding: '5px 0px', margin: '0px', height: '100%'}}>
                            <img src={image} alt="empty cart" style={{height: '200px', width: '400px'}} />
                        </Stack>
                    </Fade>
                </Grid>
                
                <Grid item xs={12} sm={12} md={6}>
                    <Fade right>
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '1.2rem', fontWeight: '400', textAlign: 'center', margin: '1.5rem 0'}}>
                            We have started our company since year 1998, with the mission of providing our customers with best quality Ice-Cream.
                        </Typography>
                    </Fade>
                    <Fade right delay={100}>
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '1.2rem', fontWeight: '400', textAlign: 'center', margin: '1.5rem 0'}}>
                            Our customers are very much important for us, so have always tried our best to pleased our customers by improving the quality of our products.
                        </Typography>
                    </Fade>
                    <Fade right delay={200}>
                        <Typography variant="h2.heading" component="h2" style={{fontSize: '1.2rem', fontWeight: '400', textAlign: 'center', margin: '1.5rem 0'}}>
                            We are the leading Ice-Cream company in Mahrajganj District with the best quanlity of all time.
                        </Typography>
                    </Fade>
                </Grid>
            </Grid>
        </Box>
    </Box>
    )
}

export default AboutUs;