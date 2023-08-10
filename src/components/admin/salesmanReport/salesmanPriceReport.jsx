import React, { useState } from 'react';
import moment from 'moment';
import '../../../index.css'
import { Typography, Box, Paper, Grid, Stack} from '@mui/material';
import { SellingLineChart } from './sellingLineChart';

const SalesmanPriceReport = (props) => {
    // const history = useNavigate();
    document.title = 'Salesman Report'
    // const [ salesmanList, setSalesmanList] = useState([]);
    // const [ selectedSalesmanData, setSelectedSalesmanData] = useState([]);
    // const [formData, setFormData] = useState({
    //     salesman_id: '',
    //     salesman_name: '',
    // })

    const cardStyle = {
        backgroundColor: '#01abaa',
        borderRadius: '10px',
        padding: '1rem',
    }
    
    function numberWithCommas(number) {
        number=number.toString();
        let lastThree = number.substring(number.length-3);
        let otherNumbers = number.substring(0,number.length-3);
        if(otherNumbers != '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    let a = moment();
    console.log('a:', a)
    console.log('moment().subtract(4, days):', moment(a).subtract(4, 'days'))
    console.log('moment().subtract(10, days):', moment(a).subtract(10, 'days'))
    console.log('moment().subtract(1, weeks):', moment(a).subtract(1, 'weeks'))
    console.log('moment().subtract(2, weeks):', moment(a).subtract(2, 'weeks'))
    console.log('moment().subtract(1, month):', moment(a).subtract(1, 'months'))
   
    return (
        <Box mt={5}>
            <Paper elevation={4} className="paper">
                <Grid container>
                    <Grid item xs={12} sm={4} md={4} className="input-padding" justifyContent="center">
                       <Box style={cardStyle} style={{backgroundColor: '#b1f9cd', borderRadius: '10px', padding: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}>
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '10px 0px 5px 0px'}}>
                                Total Sellling
                            </Typography>
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '5px 0px 10px 0px'}}>
                                Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(props.totalPriceData.total_selling)}</span>
                            </Typography>
                        </Stack>   
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className="input-padding" justifyContent="center">
                        <Box style={cardStyle} style={{backgroundColor: '#f5bbce', borderRadius: '10px', padding: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}>
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '10px 0px 5px 0px'}}>
                                Our Commission
                            </Typography>
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '5px 0px 10px 0px'}}>
                                Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(props.totalPriceData.total_our_commission)}</span>
                            </Typography>
                        </Stack>   
                   </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className="input-padding" justifyContent="center">
                        <Box style={cardStyle} style={{backgroundColor: '#d0bbf5', borderRadius: '10px', padding: '1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}>
                        <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '10px 0px 5px 0px'}}>
                                Salesman Commission
                            </Typography>
                            <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '5px 0px 10px 0px'}}>
                                Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(props.totalPriceData.total_salesman_commission)}</span>
                            </Typography>
                        </Stack>   
                    </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} className="input-padding" justifyContent="center">
                        <SellingLineChart data={props.data} />
                    </Grid>

                </Grid>
            </Paper>  
        </Box>
    )
}

export default SalesmanPriceReport;