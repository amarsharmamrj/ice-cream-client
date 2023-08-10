import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';

import img1 from '../../../../assets/products/img1.png';
import img2 from '../../../../assets/products/img2.png';
import img3 from '../../../../assets/products/img3.png';
import img4 from '../../../../assets/products/img4.png';

import Fade from 'react-reveal/Fade'

const useStyles = makeStyles({
    item: {
        height: '250px',
        width: '250px',
        objectFit: 'cover',
        borderRadius: '100%',
        border: '5px solid white',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        "&:hover": {
            transform: 'scale(1.05)',
            boxShadow:  '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22) ',
        } 
       
    }
})

const MainHighlights = () => {
    const classes = useStyles(); 

    const list= [
        {source: img1, title: 'image1'},
        {source: img2, title: 'image2'},
        {source: img3, title: 'image3'},
        {source: img4, title: 'image4'}
    ]

    const containerStyle = {
        marginTop: '-75px'
    }

    return (
        <Grid container style={containerStyle} mb={4}>
            {
                list.map((item, i) => {
                    return (
                        <Grid item xs={12} sm={3} style={{textAlign: 'center'}}>
                            <Fade bottom delay={200*i}>
                                <img className={classes.item} src={item.source} alt={item.title} />
                            </Fade>
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default MainHighlights;