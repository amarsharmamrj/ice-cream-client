import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

const CardSkeleton = () => {
    return (
        <Grid container>
            {[1,2,3,4].map(() => 
                <Grid item  xs={12} sm={12} md={3} className="input-padding">
                    <Skeleton variant="rectangular" sx={{ height: 180, margin:'10px auto' }} />
                    <Skeleton variant="text" sx={{ width: '75%', margin:'10px auto'}} />
                    <Skeleton variant="text" sx={{ width: '40%', margin:'10px auto'}} />
                    <Skeleton variant="rectangular" sx={{ height: 40, width: '60%', margin:'10px auto'}} />
                </Grid>
            )}
        </Grid>
    )
}

export default CardSkeleton;