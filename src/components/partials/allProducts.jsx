import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Axios from 'axios';
import CardGallery from "react-card-image-gallery";
import Card from '../partials/home/card'
const AllProducts = () => {
    const [data, setData] = useState([]); 

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/product/getAll`)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setData(result.data);
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    } 

    useEffect(() => {
        getData();
    }, [1])

  return (
    <CardGallery imagesPerPage={12}>
        {   
            data.length > 0 ? (
                // data.map((item) => <Card
                // source={item.image_url} 
                // title={item.product_name} 
                // productName={item.product_name}
                // price={item.price}
                // id={item._id}
                // />
                data.map((item) => <div><img
                src={item.image_url} 
                />
                </div>
                )
            ) : ''
        }
    </CardGallery>
  );
}

export default AllProducts;

