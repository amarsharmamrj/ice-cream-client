import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { makeStyles } from '@mui/styles';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Typography } from '@mui/material';
// custom components
import Card from '../card';
import CardSkeleton from '../../skeletons/cardSkeleton';

const useStyles = makeStyles({
  card: {
    "& li": {
      padding: '5px'
    }
  }
})


const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }; 

const Candies = () => {
  const classes = useStyles();
  const [data, setData] = useState([]); 
  const [dataLoaded, setDataLoaded] = useState(false); 
  const getData = () => {
    Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getByCategory/Candy`)
    .then((result) => {
        console.log('-useEffect--get data from server--success--:', result, result.data);
        setData(result.data);
        setDataLoaded(true)
    })
    .catch((error)=> {
        console.log('-useEffect--get data from server--error--:', error);
    })
  }

  useEffect(() => {
    getData();
  }, [1])
    return (
      <>
      <div className="section-odd">
        <Typography variant="h2.heading" component="h2" className="section-heading">Candies</Typography>
        {dataLoaded ? (
          <Carousel 
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            draggable={true}
            className={classes.card}
          >
            {
              data.map((item) => <Card 
                                  source={item.image_url} 
                                  title={item.product_name} 
                                  productName={item.product_name}
                                  price={item.price}
                                  id={item._id}
                                />)
            }
          </Carousel>
        ) : (<CardSkeleton />)}
      </div>
      </>
    )
}

export default Candies;