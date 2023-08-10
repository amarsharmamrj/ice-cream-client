import React from 'react';
import '../index.css';
import Bricks from '../components/partials/home/bricks-section/bricks';
import Chocobars from '../components/partials/home/chocobars-section/chocbars';
import Candies from '../components/partials/home/candies-section/candies';
import Cones from '../components/partials/home/cones-section/cones';
import { Typography } from '@mui/material';

const AllProducts = (props) =>{
    document.title = 'All Products'
    return (
       <div>
           <Typography variant="h2.heading" component="h2" mt={5} className="home-section-heading">ALL PRODUCTS</Typography>
            <hr class="home-section-hr" />
           <Bricks />
           <Chocobars />
           <Cones />
           <Candies />
       </div>
    )
}

export default AllProducts;