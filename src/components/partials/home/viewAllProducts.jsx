import React from 'react';
import minion from '../../../assets/minions.gif';
import mango1 from '../../../assets/mango-bar.png';
import mango2 from '../../../assets/mango-bar2.png';
import { Typography, Box, Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade'

const ViewAllProducts = () => {
  
    return (
    <Box style={{backgroundColor: 'azure', margin: '0', padding: '2rem rem'}}>
      <Box style={{padding: 0, margin: 0}}>
        <Typography variant="h2.heading" component="h2" className="home-section-heading">PRODUCTS</Typography>
        <hr class="home-section-hr" />
            <Grid container>

                <Grid item xs={12} sm={12} md={12}>
                    <div className="home-minion-div">
                        {/* <img src={mango1} alt="empty cart" className="mango-one" />
                        <img src={minion} alt="empty cart" className="minion" /> */}
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className="primary-button-dark"
                            style={{padding: '1rem', fontSize: '1.2rem'}}
                            component={Link}
                            to="../all-products"
                            // onClick={handleSubmit}
                            >View Our Products
                        </Button>
                        {/* <</div>div className="home-minion-div-overlay"></div> */}
                        {/* <img src={mango2} alt="empty cart" className="mango-two" /> */}
                    </div>
                    
                </Grid>
                
            </Grid>
        </Box>
    </Box>
    )
}

export default ViewAllProducts;