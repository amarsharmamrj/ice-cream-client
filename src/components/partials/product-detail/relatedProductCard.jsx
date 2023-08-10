import React from 'react';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    listItem: {
        margin: '20px 0px',
        "&:hover": {
            backgroundColor: 'white'
        }
    },
    itemCard: {
        width: '100%',
        padding: '0 0 0px 0 !important',
        borderRadius: '0px',
        textAlign: 'center',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        "&:hover": {
            boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        }
        // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        // backgroundColor: 'cornsilk',
    },
    image: {
        height: '13rem',
        width: '100%',
    },
    details: {
        // backgroundColor: '#fff1f1',
    },
    productName: {
        fontSize: '22px',
        color: '#ff3c3f',
        fontFamily: "cursive",
        margin: '0px',
        padding: '1.5rem 0 0 0'
    },
    price: {
        fontSize: '14px',
        margin: '15px 0 0 0',
        "& span": {
            fontSize: '25px',
            color: "#ff3c3f"
        }
    },
    button: {
        backgroundColor: "#01abaa",
        margin: '20px 0px'
    }
})

const RelatedProductCard = (props) => {
    const { source, title, productName, price, id} = props;
    const classes = useStyles();
    console.log('@@:', props.dataLoaded)
    return (
        <>
        <Grid item xs={12} sm={12} md={3} >
        <ListItem
              button
              to={`/product-detail/${id}`}
              component={Link}
              onClick={() => window.scrollTo(0, 100)}
              className={classes.listItem}
        > 
            <div className={classes.itemCard}>
                <img className={classes.image} src={source} alt={title} />
                <div className={classes.details}>
                    <h4 className={classes.productName}>{productName}</h4>
                    <h5 className={classes.price}>Rs. <span>{price}</span></h5>
                    <Button
                        className={classes.button}
                        variant="contained"
                        component={Link}
                        to={`/product-detail/${id}`}
                        >View
                    </Button>
                </div>
            </div>
        </ListItem>
        </Grid>
    </>
    )
}

export default RelatedProductCard;