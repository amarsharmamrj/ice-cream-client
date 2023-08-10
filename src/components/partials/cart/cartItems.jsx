import React, { useContext, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack'; 
import '../../../index.css';
import { Typography, Box, Paper, Grid, Button, Stack, Tooltip} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import PriceDetails from './priceDetails';
import EmptyCart from './emptyCart';
import { CartContext } from '../../../contexts/cartContext';

const CartItems = (props) => {
    const { enqueueSnackbar } = useSnackbar(); 
    const { cart, setCart } = useContext(CartContext);
    // const { cart, setCart } = props;
    const [tempCart, setTempCart] = useState([]);

    const itemStyle = {
        padding: '8px 0px',
        margin: '8px 0px',
        borderRadius: '2px',
        boxShadow: '0px 0px 2px 1px #d1cdcd',
    }

    const productNameStyle = {
        fontSize: '1rem',
        paddingBottom: '5px'
    }

    const priceStyle = {
        fontSize: '1rem',
        fontWeight: '600',
        paddingBottom: '5px'
    }
    
    const handleQuantityMinus = (item) => {
        if(item.quantity > 1){
            item.quantity = item.quantity - 1;
            setCart((prev) => {
                return [
                    ...prev,
                    item
                ]
            })
            setCart(cart);
            window.localStorage.setItem("cart", JSON.stringify(cart));
    
            setTempCart((prev) => {
                return [
                    ...prev,
                    cart
                ]
            })
            
        }
    }
    
    const handleQuantityPlus = (item) => {
        if(item.quantity >= 1 && item.quantity <= 8){
            item.quantity = item.quantity + 1;
            setCart((prev) => {
                return [
                    ...prev,
                    item
                ]
            })
            setCart(cart);
            window.localStorage.setItem("cart", JSON.stringify(cart));
            setTempCart((prev) => {
                return [
                    ...prev,
                    cart
                ]
            })
        }
    }
    
    const handleRemove = (item, i) => {
        cart.splice(i, 1);
        setCart(cart);
        setTempCart((prev) => {
            return [
                ...prev,
                cart
            ]
        })
        window.localStorage.setItem("cart", JSON.stringify(cart));
        enqueueSnackbar(`${item.product_name} removed from Cart!`, 
            { 
                variant: 'warning', 
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
            })
    }

    useEffect(() => {
        console.log('cart useeffect:', cart)
    }, [cart])
    
    return(
        <> 
        {cart.length > 0 ? (
            <>
            <Grid item xs={12} sm={12} md={7}>
                <Paper elevation={3} sx={{padding: '0.5rem', margin: '1rem'}}>
                    <Typography variant="h2.heading" component="h2" className="page-heading" sx={{paddingBottom: '10px', fontWeight: '500'}}>My Cart ({cart.length})</Typography>
                    {
                        cart.length > 0 ? (
                            cart.map((item, i) => {
                        return (
                        <>  
                            <Stack style={itemStyle} direction="row" justifyContent="flex-start" alignItems="center" spacing={2} >
                                <Box style={{height: '7rem', width: '10rem'}}>
                                    <img src={item.image_url} alt={item.product_name} style={{height: '100%', width: '100%'}} />
                                </Box>
                                <Box>
                                    <Typography  style={productNameStyle} variant="h4" component="h4" className="page-heading">{item.product_name}</Typography>
                                    <Typography  style={priceStyle} variant="h4" component="h4" className="page-heading">Rs. {item.price * item.quantity}</Typography>

                                    <Stack direction="row" spacing={0} mb={1} justifyContent="space-start" alignItems="center">
                                        <Tooltip title={item.quantity == 1 ? 'Minimum allowed quantity is 1!' : ''} arrow>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                className="counter-button-2"
                                                onClick={() => handleQuantityMinus(item)}
                                                ><RemoveIcon />
                                            </Button>
                                        </Tooltip>
                                        <Typography 
                                            variant="h2.heading" 
                                            component="h2" 
                                            className="page-heading"
                                            style={{fontWeight: '500', padding: '0 0.8rem', fontSize: '1rem', alignItems: 'center'}}
                                            >
                                                {item.quantity}
                                        </Typography>
                                        <Tooltip title={item.quantity == 9 ? 'Maximum allowed quantity is 9!' : ''} arrow>
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                className="counter-button-2"
                                                onClick={() => handleQuantityPlus(item)}
                                                ><AddIcon />
                                            </Button>
                                        </Tooltip>
                                    </Stack>
                                    <Stack direction="row" spacing={0} mb={0} justifyContent="flex-start" alignItems="center"> 
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            className="remove-button"
                                            onClick={() => handleRemove(item, i)}
                                            >
                                                <RemoveShoppingCartIcon style={{fontSize: '1rem', marginRight: '5px'}} />
                                                 Remove
                                        </Button>
                                </Stack>
                                </Box>
                            </Stack>
                        </>
                        ) 
                            })
                        ) : null
                    }
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                <Paper elevation={3} sx={{padding: '0.5rem', margin: '1rem'}}>
                    <PriceDetails cart={cart} setCart={setCart} />
                </Paper>
            </Grid>
            </>
        ) : (
            <Grid item xs={12} sm={12} md={12} justifyContent="center">
                <EmptyCart />
            </Grid>
        )}
        </>
    )
}

export default CartItems;