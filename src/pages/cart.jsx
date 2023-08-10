import React, { useContext } from 'react';
import CartItems from '../components/partials/cart/cartItems';
import '../index.css';
import { Box, Grid} from '@mui/material';
import { CartContext } from '../contexts/cartContext';

const Cart = (props) =>{
    document.title = 'My Cart'
    const { cart, setCart } = useContext(CartContext);
    return (
        <Box className="container">
            <Grid container>
                <CartItems cart={cart} setCart={setCart} />
            </Grid>
        </Box>
    )
}

export default Cart;