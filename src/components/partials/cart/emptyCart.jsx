import React from 'react';
import '../../../index.css';
import { Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom'

import image from '../../../assets/emptyCart.png'

const EmptyCart = () => {
    document.title = 'Cart is Empty!'
    return (
        <Stack direction="column" spacing={0} mb={1} justifyContent="center" alignItems="center" style={{padding: '5px 0px', margin: '0px', height: '100%'}}>
            <img src={image} alt="empty cart" style={{height: '50%', width: '40%'}} />
            <Typography variant="h2.heading" component="h2" className="page-heading" sx={{paddingBottom: '10px', fontWeight: '500', marginBottom: '10px'}}>Your cart is empty! Go back to add to your cart!</Typography>
            <Button 
                variant="contained" 
                color="secondary" 
                className="primary-button-dark"
                component={Link}
                to={"/"}
                >Go to home
            </Button>
        </Stack>
    )
}

export default EmptyCart;