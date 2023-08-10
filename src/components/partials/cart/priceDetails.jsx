import { Typography, Stack, Divider, Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import '../../../index.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CartContext } from '../../../contexts/cartContext';
import { UserContext } from '../../../contexts/userContext';
const PriceDetails = (props) => {
    const { cart, setCart } = useContext(CartContext);
    // const { cart, setCart } = props;
    let totalPrice = 0;
    const itemStyle = {
        color: '#6d6d6d',
        fontSize: '1rem',
        fontWeight: '400'
    }

    const itemStyleTotal = {
        color: 'rgb(50 49 49)',
        fontSize: '1.1rem',
        fontWeight: '500'
    }

    useEffect(() => {
        console.log('cart inside priceDetails useeffect:', cart)
    }, [cart])

    return (
        <>
            <Typography variant="h2.heading" component="h2" className="page-heading" sx={{paddingBottom: '5px', fontWeight: '500', color: '#787878'}}>Price Details</Typography>
            <Divider />
            {cart.length > 0 ? (
                cart.map((item) => {
                    totalPrice = totalPrice + (item.price * item.quantity);
                    return (
                        <Stack direction="row" spacing={0} mb={1} justifyContent="space-between" alignItems="center" style={{padding: '5px 0px', margin: '0px'}}>
                            <Typography variant="h2.heading" component="h2" style={itemStyle} >{item.product_name} ({item.quantity})</Typography>
                            <Typography variant="h2.heading" component="h2" style={itemStyle} >Rs. {item.price * item.quantity}</Typography>
                        </Stack>
                    )
                })
            ) : null}
            <Divider />
            <Stack direction="row" spacing={0} mb={1} justifyContent="space-between" alignItems="center" style={{padding: '5px 0px', margin: '0px'}}>
                <Typography variant="h2.heading" component="h2" style={itemStyleTotal} >Total Price:</Typography>
                <Typography variant="h2.heading" component="h2" style={itemStyleTotal} >Rs. {totalPrice}</Typography>
            </Stack>

            <Stack direction="row" spacing={0} mb={1} justifyContent="center" alignItems="center" >
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className="order-button"
                    // onClick={() => handleRemove(item, i)}
                    >
                        <AddShoppingCartIcon style={{fontSize: '1rem', marginRight: '5px'}} />
                         Place Order
                </Button>
            </Stack>

        </>
    )
}

export default PriceDetails;