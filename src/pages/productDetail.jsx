import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import '../index.css';
import { Typography, Box, Grid} from '@mui/material';
import Axios from 'axios';
import Image from '../components/partials/product-detail/image';
import Description from '../components/partials/product-detail/description';
import DescSkeleton from '../components/partials/skeletons/descSkeleton';
import RelatedProducts from '../components/partials/product-detail/relatedProduct';
import { CartContext } from '../contexts/cartContext';
const ProductDetail = (props) => {
    const params = useParams();
    const { cart, setCart } = useContext(CartContext);

    // const history = useNavigate();
    document.title = 'Product Details'
    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false); 

     const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getById/` + params.id)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setData(result.data);
            setDataLoaded(true);
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    }

    useEffect(() => {
        getData();
    }, [1, params.id])

    return (
        <Box className="container">
            <Typography variant="h2.heading" component="h2" className="page-heading">Product Description</Typography>
            <Grid container>
            {dataLoaded ? (
                <>
                    <Grid item xs={12} sm={12} md={6} className="input-padding">
                        <Image image={data.image_url} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} className="input-padding">
                        <Description data={data} cart={cart} setCart={setCart} />
                    </Grid>
                </>) : (<DescSkeleton />)}

                <Grid item container xs={12} sm={12} md={12} mt={5}>
                    <Typography variant="h2.heading" component="h2" style={{padding: '0px'}} className="page-heading">Related Products</Typography>
                </Grid>

                <Grid item container xs={12} sm={12} md={12} justifyContent="center">
                    <RelatedProducts data={data} />
                </Grid>

            </Grid>
        </Box>
    )
}

export default ProductDetail;