import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

const DescSkeleton = () => {
    return (
        <Grid container>
                <Grid item  xs={12} sm={12} md={6} className="input-padding">
                    <Skeleton variant="rectangular" sx={{ height: 350, margin:'10px auto' }} />
                </Grid>
                <Grid item  xs={12} sm={12} md={6} className="input-padding">
                    <Skeleton variant="text" sx={{ width: '75%', height: '50px', marginBottom:'0px'}} />
                    <Skeleton variant="text" sx={{ width: '50%', height: '10px', marginBottom:'10px'}} />

                    <Skeleton variant="text" sx={{ width: '50%', height: '40px', marginBottom:'0px'}} />
                    <Skeleton variant="text" sx={{ width: '60%', height: '10px', marginBottom:'20px'}} />

                    <Skeleton variant="text" sx={{ width: '100%', height: '20px', marginBottom:'20px'}} />
                    
                    <Skeleton variant="rectangular" sx={{ height: 40, width: '32%', marginBottom:'30px'}} />

                    <Skeleton variant="rectangular" sx={{ height: 40, width: '40%', marginBottom:'10px'}} />
                </Grid>
        </Grid>
    )
}

export default DescSkeleton;