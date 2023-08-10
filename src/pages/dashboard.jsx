import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import '../index.css'
import { Typography, Chip, Tooltip, Box, Grid, Stack} from '@mui/material';
import { TotalSellingLineChart } from '../components/partials/dashboard/totalSellingLineChart';
import { TotalOurCommissionLineChart } from '../components/partials/dashboard/totalOurCommissioonLineChart';
import { TotalSalesmanCommissionLineChart } from '../components/partials/dashboard/totalSalesmanCommission';
import SalesmanLeaderboard from '../components/partials/dashboard/salesmanLeaderboard';
import TotalCardSkeleton from '../components/partials/dashboard/totalCardskeleton';
import CheckPageAccess from '../contexts/checkPageAccess.js';

const activeChipStyle = {backgroundColor: '#01abaa', color: 'white', fontWeight: '600', margin: '5px 10px', boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}
const InactiveChipStyle = {backgroundColor: 'white', color: '#01abaa', borderColor: '#01abaa', fontWeight: '600', margin: '5px 10px'}

const Dashboard = () => {
    // const history = useNavigate();
    document.title = "Dashboard";
    CheckPageAccess();
    const [data, setData] = useState([]); 
    const [uniqueUnSortData, setUniqueUnSortData] = useState([]); 
    const [initialData, setInitialData] = useState([]); 
    const [totalSelling, setTotalSelling] = useState(0); 
    const [totalOurCommission, setTotalOurCommission] = useState(0); 
    const [activeChip, setActiveChip] = useState({
        today: false,
        yesterday: false,
        currentWeek: false,
        lastWeek: false,
        currentMonth: false,
        lastMonth: false
    })
    console.log("uniqueUnSortData:", uniqueUnSortData)
    
    const innerCardStyle ={
        borderRadius: '10px', 
        padding: '0.7rem', 
        margin: '0.8rem', 
        color: 'rgb(14 157 76)', 
        boxShadow: 'rgb(0 0 0 / 19%) 0px 0px 4px 4px'
    } 
 
    const outerCardStyle = {
        // borderRadius: '10px', 
        // padding: '0.5rem', 
        // margin: '1rem 0rem',
        // boxShadow: 'rgb(0 0 0 / 19%) 0px 0px 4px 3px'
    }

    function numberWithCommas(number) {
        number=number.toString();
        let lastThree = number.substring(number.length-3);
        let otherNumbers = number.substring(0,number.length-3);
        if(otherNumbers !== '')
            lastThree = ',' + lastThree;
        let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }
    
    const priceCalculationData = (data) => {
        let _totalSelling = 0;
        let _totalOurCommision = 0;
        data.forEach((item) => {
            _totalSelling = _totalSelling + item.total_selling;
            _totalOurCommision = _totalOurCommision + item.our_commision;
        })
        setTotalSelling(_totalSelling);
        setTotalOurCommission(_totalOurCommision);
    }
    
    const filterDataCurrentWeek = (data) => {
        console.log("%cfilterDataCurrentWeek function:", "background-color: #01abaa; color: white; padding: 1rem", data)
        console.table(data)
        setActiveChip({
            all: false,
            today: false,
            yesterday: false,
            currentWeek: true,
            lastWeek: false,
            currentMonth: false,
            lastMonth: false
        });
        let todayDate = new Date();
        let filteredData;
        let currentWeekDate = moment(todayDate).subtract(1, 'weeks')._d
        let currentWeekDateFormatted = moment(currentWeekDate).format('YYYY-MM-DD');

        console.log('currentWeekDate, currentWeekDateFormatted:', currentWeekDate, currentWeekDateFormatted);
        filteredData = data.filter((item)  => {
            let serverDate = moment(item.date).format('YYYY-MM-DD')
            if(moment(serverDate).isAfter(currentWeekDateFormatted)){
                return item;
            }
        })
        setData(filteredData);
        priceCalculationData(filteredData);
        console.log('-filterData--condition----case--------Current Week:', filteredData);
    }

    const filterData = (condition) => {
        console.log('-filterData--condition----:', condition);
        let todayDate = new Date();
        let todayDateFormatted = moment(new Date()).format('DD/MM/YYYY');
        let filteredData;
        switch(condition){
            case 'All Data': 
                setActiveChip({
                    all: true,
                    today: false,
                    yesterday: false,
                    currentWeek: false,
                    lastWeek: false,
                    currentMonth: false,
                    lastMonth: false
                });
                setData(initialData);
                priceCalculationData(initialData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
            case 'Today': 
                setActiveChip({
                    all: false,
                    today: true,
                    yesterday: false,
                    currentWeek: false,
                    lastWeek: false,
                    currentMonth: false,
                    lastMonth: false
                });
                // let todayDate = moment(new Date()).format('DD/MM/YYYY');
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('DD/MM/YYYY')
                    console.log('-filterData--condition----case--------:', todayDateFormatted, serverDate, moment(serverDate).isSame(todayDateFormatted));
                    if(moment(serverDate).isSame(todayDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
            case 'Yesterday':
                setActiveChip({
                    all: false,
                    today: false,
                    yesterday: true,
                    currentWeek: false,
                    lastWeek: false,
                    currentMonth: false,
                    lastMonth: false
                });
                // let todayDate = moment(new Date()).format('DD/MM/YYYY');
                let yesterdayDate = moment(todayDate).subtract(1, 'days')._d
                let yesterdayDateFormatted = moment(yesterdayDate).format('DD/MM/YYYY');
                console.log('yesterdayDate, yesterdayDateFormatted:', yesterdayDate, yesterdayDateFormatted);
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('DD/MM/YYYY')
                    console.log('-filterData--condition----case--------:', yesterdayDateFormatted, serverDate, moment(serverDate).isSame(yesterdayDateFormatted));
                    if(moment(serverDate).isSame(yesterdayDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
            case 'Current Week':
                setActiveChip({
                    all: false,
                    today: false,
                    yesterday: false,
                    currentWeek: true,
                    lastWeek: false,
                    currentMonth: false,
                    lastMonth: false
                });
                let currentWeekDate = moment(todayDate).subtract(1, 'weeks')._d
                let currentWeekDateFormatted = moment(currentWeekDate).format('YYYY-MM-DD');

                console.log('currentWeekDate, currentWeekDateFormatted:', currentWeekDate, currentWeekDateFormatted);
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(currentWeekDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;    
            case 'Last Week':
                setActiveChip({
                    all: false,
                    today: false,
                    yesterday: false,
                    currentWeek: false,
                    lastWeek: true,
                    currentMonth: false,
                    lastMonth: false
                });
                let lastWeekDate = moment(todayDate).subtract(2, 'weeks')._d
                let lastWeekDateFormatted = moment(lastWeekDate).format('YYYY-MM-DD');

                console.log('lastWeekDate, lastWeekDateFormatted:', lastWeekDate, lastWeekDateFormatted);
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(lastWeekDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
            case 'Current Month':
                setActiveChip({
                    all: false,
                    today: false,
                    yesterday: false,
                    currentWeek: false,
                    lastWeek: false,
                    currentMonth: true,
                    lastMonth: false
                });
                let CurrentMonthDate = moment(todayDate).subtract(1, 'months')._d
                let CurrentMonthDateFormatted = moment(CurrentMonthDate).format('YYYY-MM-DD');

                console.log('CurrentMonthDate, CurrentMonthDateFormatted:', CurrentMonthDate, CurrentMonthDateFormatted);
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(CurrentMonthDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
            case 'Last Month':
                setActiveChip({
                    all: false,
                    today: false,
                    yesterday: false,
                    currentWeek: false,
                    lastWeek: false,
                    currentMonth: true,
                    lastMonth: true
                });
                let LastMonthDate = moment(todayDate).subtract(2, 'months')._d
                let LastMonthDateFormatted = moment(LastMonthDate).format('YYYY-MM-DD');

                console.log('LastMonthDate, LastMonthDateFormatted:', LastMonthDate, LastMonthDateFormatted);
                filteredData = initialData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(LastMonthDateFormatted)){
                        return item;
                    }
                })
                setData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
        }
    }

    const getData = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/returnSalesmanBilling/getAll`)
        .then((result) => {
            console.log('-useEffect--get data from server--success--:', result, result.data);
            setData(result.data);
            setInitialData(result.data);
            filterDataCurrentWeek(result.data)
        })
        .catch((error)=> {
            console.log('-useEffect--get data from server--error--:', error);
        })
    }

    let unSortData = [];
    let initialUniqueSalesmanObject = [...new Map(data.map(item => [item["salesman_name"], item])).values()];
    let uniqueSalesmanObject = [];
    initialUniqueSalesmanObject.forEach((item) => {
        uniqueSalesmanObject.push({...item, "all_total_selling": 0, "all_our_commission": 0 })
    })
    console.log('--uniqueSalesmanObject----:', uniqueSalesmanObject)
    const calculateTotalSelling = () => {
        data.forEach((allDataItem) => {
            uniqueSalesmanObject.forEach((uniqueDataItem, i) => {
                if(allDataItem.salesman_id === uniqueDataItem.salesman_id){
                    if(allDataItem.total_selling != null){
                        uniqueSalesmanObject[i].all_total_selling = uniqueSalesmanObject[i].all_total_selling + allDataItem.total_selling;
                        uniqueSalesmanObject[i].all_our_commission = uniqueSalesmanObject[i].all_our_commission + allDataItem.our_commision;
                    }
                }
            })
        })
        // setUniqueUnSortData(uniqueSalesmanObject)
        unSortData = uniqueSalesmanObject;
        uniqueSalesmanObject.sort((a, b) => (a.all_total_selling > b.all_total_selling) ? -1 : 1)
    }
    calculateTotalSelling();
    
    useEffect(() => {
        // setUniqueUnSortData(unSortData);
        getData();
    }, [1])

    return (
        <Box style={{margin: '4.5rem 1rem 2rem 1rem'}}>
        {/* <Typography variant="h2.heading" component="h2" className="page-heading">Dashboard</Typography> */}
            <Grid container>
                {/* start of filter cards */}
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <Box style={{textAlign: 'center'}}>
                        <Tooltip title="Click to filter all data">
                                <Chip
                                  label="All Data"
                                  variant="outlined"
                                  style={ activeChip.all ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('All Data')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Today data">
                                <Chip
                                  label="Today"
                                  variant="outlined"
                                  style={ activeChip.today ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Today')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Yesterday data">
                                <Chip
                                  label="Yesterday"
                                  variant="outlined"
                                  style={ activeChip.yesterday ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Yesterday')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Current Week data">
                                <Chip
                                  label="Current Week"
                                  variant="outlined"
                                  style={ activeChip.currentWeek ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Current Week')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Last Week data">
                                <Chip
                                  label="Last Week"
                                  variant="outlined"
                                  style={ activeChip.lastWeek ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Last Week')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Current Month data">
                                <Chip
                                  label="Current Month"
                                  variant="outlined"
                                  style={ activeChip.currentMonth ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Current Month')}
                                />
                            </Tooltip>
                        <Tooltip title="Click to filter Last Month data">
                                <Chip
                                  label="Last Month"
                                  variant="outlined"
                                  style={ activeChip.lastMonth ? activeChipStyle : InactiveChipStyle }
                                  onClick={() => filterData('Last Month')}
                                />
                            </Tooltip>
                    </Box>
                    </Grid>
                {/* end of filter cards */}

                {data.length > 0 ? (
                <Grid item container xs={12} sm={12} md={12} style={outerCardStyle}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Box style={innerCardStyle}>
                                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '0'}}>
                                        Total Selling
                                    </Typography>
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '0'}}>
                                        Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(totalSelling)}</span>
                                    </Typography>
                                    <TotalSellingLineChart data={data} color='rgb(7 213 87)' backgroundColor='rgb(7, 213, 87, 0.5)' />
                                </Stack>   
                            </Box>
                        </Grid> 

                        <Grid item xs={12} sm={12} md={4}>
                            <Box style={innerCardStyle} >
                                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" style={{color: 'rgb(241, 31, 100)'}}>
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '0'}}>
                                        Our Commission
                                    </Typography>
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '0'}}>
                                        Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(totalOurCommission)}</span>
                                    </Typography>
                                    <TotalOurCommissionLineChart data={data} color='rgb(241, 31, 100)' backgroundColor='rgb(241, 31, 100, 0.5)' />
                                </Stack>   
                            </Box>
                        </Grid> 
                        
                        <Grid item xs={12} sm={12} md={4}>
                            <Box style={innerCardStyle} >
                                <Stack direction="column" spacing={2} justifyContent="center" alignItems="center" style={{color: '#1776eb'}}>
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.5rem', fontWeight: '400', margin: '0'}}>
                                        Salesman Commission
                                    </Typography>
                                    <Typography variant="h2.heading" component="h2" style={{display: 'block', fontSize: '1.2rem', fontWeight: '400', margin: '0'}}>
                                        Rs. <span style={{fontSize: '1.7rem', fontWeight: '500', margin: '5px 0px 10px 0px'}}>{numberWithCommas(totalSelling-totalOurCommission)}</span>
                                    </Typography>
                                    <TotalSalesmanCommissionLineChart data={data} color='#1776eb' backgroundColor='#207ae9c7' />
                                </Stack>   
                            </Box>
                        </Grid> 
                </Grid>
                ) : (
                    <TotalCardSkeleton />
                )}
                
                <SalesmanLeaderboard data={data} setUniqueUnSortData={setUniqueUnSortData} />
            </Grid>
        </Box>
    )
}

export default Dashboard;