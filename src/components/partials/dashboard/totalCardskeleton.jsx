import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid } from '@mui/material';

const innerCardStyle ={
    borderRadius: '10px', 
    padding: '0.7rem', 
    margin: '0.8rem', 
    color: 'rgb(14 157 76)', 
    boxShadow: 'rgb(0 0 0 / 19%) 0px 0px 4px 4px'
} 

const TotalCardSkeleton = () => {
    return (
        <Grid container>
                <Grid item  xs={12} sm={12} md={4} className="input-padding" justifyContent="center">
                    <Box style={innerCardStyle}>
                        <Skeleton variant="text" sx={{ width: '50%', height: '20px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '40%', height: '25px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '100%', height: '150px', margin: '0px auto 0px auto'}} />
                    </Box>
                </Grid>
                <Grid item  xs={12} sm={12} md={4} className="input-padding" justifyContent="center">
                    <Box style={innerCardStyle}>
                        <Skeleton variant="text" sx={{ width: '50%', height: '20px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '40%', height: '25px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '100%', height: '150px', margin: '0px auto 0px auto'}} />
                    </Box>
                </Grid>
                <Grid item  xs={12} sm={12} md={4} className="input-padding" justifyContent="center">
                    <Box style={innerCardStyle}>
                        <Skeleton variant="text" sx={{ width: '50%', height: '20px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '40%', height: '25px', margin: '0px auto 0px auto'}} />
                        <Skeleton variant="text" sx={{ width: '100%', height: '150px', margin: '0px auto 0px auto'}} />
                    </Box>
                </Grid>
        </Grid>
    )
}

export default TotalCardSkeleton;