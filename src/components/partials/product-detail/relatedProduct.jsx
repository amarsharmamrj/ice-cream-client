import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { makeStyles } from '@mui/styles';
import 'react-multi-carousel/lib/styles.css';
import CardSkeleton from '../skeletons/cardSkeleton';
import RelatedProductCard from './relatedProductCard';

const useStyles = makeStyles({
  card: {
    "& li": { 
      padding: '5px'
    }
  }
})


const RelatedProducts = (props) => {
    const params = useParams();
    const {category_name} = props.data; 
    console.log('data:', props.data, category_name)


  const [data, setData] = useState([]); 
  const [dataLoaded, setDataLoaded] = useState(false); 
  const getData = () => {
    console.log('data 2:', props.data, category_name)
    Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getByCategory/${category_name}`)
    .then((result) => {
        console.log('-useEffect--get data from server--success @@--:', result, result.data);
        let filteredData = result.data.filter((item) => item._id != params.id)
        setData(filteredData);
        setDataLoaded(true)
    })
    .catch((error)=> {
        console.log('-useEffect--get data from server--error--:', error);
    })
  }

  useEffect(() => {
    getData();
  }, [category_name, params.id])
    return (
      <>
        {dataLoaded ? (
              data.length > 0 ? (
                data.map((item) => <RelatedProductCard
                                    source={item.image_url} 
                                    title={item.product_name} 
                                    productName={item.product_name}
                                    price={item.price}
                                    id={item._id}
                                  />)
                ) : ''
        ) : (<CardSkeleton />)}
      </>
    )
}

export default RelatedProducts;