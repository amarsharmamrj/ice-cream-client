import React, {useState, useEffect } from 'react';
import { useSnackbar } from 'notistack'; 
import { Typography, Tooltip, Button, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Description = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { cart, setCart } = props;
    let duplicateIndex;
    const [quantity, setQuantity] = useState(1);
    const [cartItem, setCartItem] = useState({});
    const { product_name, price, desc, _id, image_url } = props.data;

    window.scrollTo(0, 0);

    const handleQuantityMinus = () => {
        if(quantity > 1){
            setQuantity(quantity-1)
        }
    }

    const handleQuantityPlus = () => {
        if(quantity >= 1 && quantity <= 8){
            setQuantity(quantity+1)
        }
    }

    const handleAddToCart = async () => {
        let flag = true;
        setCartItem({
            id: _id,
            product_name: product_name,
            price: price,
            quantity: quantity
        })
        
        const setProductExitFlag = () => {
            if(cart.length > 0){
                cart.forEach((item, i) => {
                    if(item.id == _id){
                        flag = false;
                        duplicateIndex = i;
                    }
                })
            }
        }
        await setProductExitFlag();

        if(flag === true){
            setCart((prev) => {
                return [
                        ...prev,
                        {
                            id: _id,
                            product_name: product_name,
                            price: price,
                            quantity: quantity,
                            image_url: image_url
                        }
                    ]
            })
            window.localStorage.setItem("cart", JSON.stringify([...cart, {
                id: _id,
                product_name: product_name,
                price: price,
                quantity: quantity,
                image_url: image_url
            }]));
    
            
        }else {
            cart.splice(duplicateIndex, 1);
            setCart((prev) => {
                return [
                        ...prev,
                        {
                            id: _id,
                            product_name: product_name,
                            price: price,
                            quantity: quantity,
                            image_url: image_url
                        }
                    ]
            })
            window.localStorage.setItem("cart", JSON.stringify([...cart, {
                id: _id,
                product_name: product_name,
                price: price,
                quantity: quantity,
                image_url: image_url
            }]));
        }
        
        enqueueSnackbar(`${product_name} added to Cart!`, 
            { 
                variant: 'info', 
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }
        })
        
        }

    useEffect(() => {
        console.log('-cartItem--:', cartItem);
        console.log('-cart--:', cart);
    }, [cart])
    
    return (
        <>
            <Typography 
                variant="h2.heading" 
                component="h2" 
                className="page-heading"
                style={{fontWeight: '400', padding: '0', fontSize: '1.6rem'}}
                >
                    {product_name}
            </Typography>
            <Typography 
                variant="h2.heading" 
                component="h2" 
                className="page-heading"
                style={{fontWeight: '400', paddingBottom: '1rem', fontSize: '0.8rem'}}
                >
                    Category: {product_name}
            </Typography>

            <Typography 
                variant="h2.heading" 
                component="h2" 
                className="page-heading"
                style={{fontWeight: '500', fontSize: '1.1rem', padding: '0'}}
                >
                    MRP: Rs. {price}
            </Typography>
            <Typography 
                variant="h2.heading" 
                component="h2" 
                className="page-heading"
                style={{fontWeight: '400', paddingBottom: '1rem', fontSize: '0.8rem'}}
                >
                    (Inclusive of all taxes)
            </Typography>

            <Typography 
                variant="h2.heading" 
                component="h2" 
                // className="page-heading"
                style={{fontWeight: '200', paddingBottom: '1rem', fontSize: '1.2rem'}}
                >
                    {desc}
            </Typography>
            
            <Stack direction="row" spacing={0} mb={3} justifyContent="flex-start" alignItems="center">
                    <Tooltip title={quantity == 1 ? 'Minimum allowed quantity is 1!' : ''} arrow>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className="counter-button"
                            onClick={handleQuantityMinus}
                            ><RemoveIcon />
                        </Button>
                    </Tooltip>
                    <Typography 
                        variant="h2.heading" 
                        component="h2" 
                        className="page-heading"
                        style={{fontWeight: '500', padding: '0 1rem', fontSize: '1.4rem', alignItems: 'center'}}
                        >
                            {quantity}
                    </Typography>
                    <Tooltip title={quantity == 9 ? 'Maximum allowed quantity is 9!' : ''} arrow>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            className="counter-button"
                            onClick={handleQuantityPlus}
                            ><AddIcon />
                        </Button>
                    </Tooltip>
                </Stack>
                <Button 
                        variant="contained" 
                        color="secondary" 
                        className="primary-button-dark"
                        onClick={handleAddToCart}
                        ><AddShoppingCartIcon style={{paddingRight: '10px'}} /> Add To Cart
                </Button>
        </>
    )
} 

export default Description;