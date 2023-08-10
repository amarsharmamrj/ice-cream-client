import React, { useState , useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Axios from 'axios';
import moment from 'moment';
import image from '../../../assets/no_data.png'
import '../../../index.css'
import SearchIcon from '@mui/icons-material/Search';
import { Typography, Tooltip, Chip, Box, Paper,InputAdornment, Grid, TextField, Autocomplete, FormHelperText, Stack, ListItem} from '@mui/material';
import SalesmanPriceReport from './salesmanPriceReport';
import CheckPageAccess from '../../../contexts/checkPageAccess.js';

const activeChipStyle = {backgroundColor: '#01abaa', color: 'white', fontWeight: '600', margin: '5px 10px', boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}
const InactiveChipStyle = {backgroundColor: 'white', color: '#01abaa', borderColor: '#01abaa', fontWeight: '600', margin: '5px 10px'}

const SalesmanReport = () => {
    const history = useNavigate();
    const params = useParams();
    document.title = 'Salesman Report'
    CheckPageAccess();
    const [ salesmanList, setSalesmanList] = useState([]);
    const [ salesmanName, setSalesmanName] = useState('');
    const [ selectedSalesmanData, setSelectedSalesmanData] = useState([]);
    const [ initialSelectedSalesmanData, setInitialSelectedSalesmanData] = useState([]);
    const [formData, setFormData] = useState({
        salesman_id: '',
        salesman_name: '',
    })
    const [totalPriceData, setTotalPriceData] = useState({
        total_selling: 0,
        total_our_commission: 0,
        total_salesman_commission: 0
    })

    const [activeChip, setActiveChip] = useState({
        today: false,
        yesterday: false,
        currentWeek: false,
        lastWeek: false,
        currentMonth: false,
        lastMonth: false
    })
    
    const handleSalesman = (e, v) => {
        e.preventDefault();
        if(v != null){
            console.log('-handleSalesman--:',v, v._id, v.name);
            setFormData((prev) => {
                return {
                    ...prev,
                    salesman_id: v._id,
                    salesman_name: v.name,
                }
            })
            getSelectedSalesmanData(v._id);
            setSalesmanName()
            console.log("-handleSalesman--formData-----:", formData)   
        }
    }

    const getSalesmanList = () => {
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/salesman/getAll`)
        .then((result) => {
            console.log('-useEffect--get salesman list from server--success--:', result, result.data);
            let activeSalesmanList = result.data.filter((item) => item.status === true)
            setSalesmanList(activeSalesmanList);
        })
        .catch((error)=> {
            console.log('-useEffect--get salesman list from server--error--:', error);
        })
    }
    
    const filterDataCurrentWeek = (data) => {
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
        setSelectedSalesmanData(filteredData);
        priceCalculationData(filteredData);
        console.log('-filterData--condition----case--------Today:', filteredData);
    }

    const getSelectedSalesmanData = (salesman_id) => {
        console.log('salesman_id::', salesman_id)
        Axios.get(`${process.env.REACT_APP_API_SERVICE}/returnSalesmanBilling/getAllBySalesmanId/${salesman_id}`)
        .then((result) => {
            console.log('-useEffect--get selected salesman data from server--success--:', result, result.data);
            setSelectedSalesmanData(result.data);
            setInitialSelectedSalesmanData(result.data);
            filterDataCurrentWeek(result.data);
            priceCalculationData(result.data);
        })
        .catch((error)=> {
            console.log('-useEffect--get selected salesman data from server--error--:', error);
        })
    }
    
    const priceCalculationData = (data) => {
        let _totalSelling = 0;
        let _totalOurCommision = 0;
        let _totalSalesmanCommission = 0;
        data.forEach((item) => {
            _totalSelling = _totalSelling + item.total_selling; 
            _totalOurCommision = _totalOurCommision + item.our_commision;
            _totalSalesmanCommission = _totalSalesmanCommission + (item.total_selling - item.our_commision);
        })
        setTotalPriceData({"total_selling":_totalSelling, "total_our_commission": _totalOurCommision, "total_salesman_commission": _totalSalesmanCommission})
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
                setSelectedSalesmanData(initialSelectedSalesmanData);
                priceCalculationData(initialSelectedSalesmanData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('DD/MM/YYYY')
                    console.log('-filterData--condition----case--------:', todayDateFormatted, serverDate, moment(serverDate).isSame(todayDateFormatted));
                    if(moment(serverDate).isSame(todayDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('DD/MM/YYYY')
                    console.log('-filterData--condition----case--------:', yesterdayDateFormatted, serverDate, moment(serverDate).isSame(yesterdayDateFormatted));
                    if(moment(serverDate).isSame(yesterdayDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(currentWeekDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(lastWeekDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(CurrentMonthDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
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
                filteredData = initialSelectedSalesmanData.filter((item)  => {
                    let serverDate = moment(item.date).format('YYYY-MM-DD')
                    if(moment(serverDate).isAfter(LastMonthDateFormatted)){
                        return item;
                    }
                })
                setSelectedSalesmanData(filteredData);
                priceCalculationData(filteredData);
                console.log('-filterData--condition----case--------Today:', filteredData);
                break;
        }
    }

    useEffect(() => {
        getSalesmanList();
        if(params.id != undefined){
            getSelectedSalesmanData(params.id);
        }
    }, [1])  

    return (
        <Box className="container">
            {params.name != undefined ? (
                <Typography variant="h2.heading" component="h2" className="page-heading">{params.name}'s Report</Typography>
            ) : (
                <Typography variant="h2.heading" component="h2" className="page-heading">Salesman Report</Typography>
            )}
        <Paper elevation={4} style={{padding: '1rem 1rem 0.5rem 1rem'}}>
            <Grid container>
                {params.name === undefined ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        <Autocomplete
                            onChange={(e, v) =>
                          handleSalesman(e, v)
                        }
                        name="salesman_name"
                        fullWidth={true}
                        id="combo-box-demo"
                        options={salesmanList}
                        autoHighlight
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <div {...props}>
                              <ListItem key={option.name} value={option.name}>{option.name}</ListItem>
                          </div>
                        )}
                        // value={{name: salesmanName}}
                        // value={{name: params.name}}

                        renderInput={(params) => (
                          <>
                              <TextField
                                {...params}
                                label="Choose Salesman"
                                InputProps={{
                                    ...params.InputProps,
                                    type: "search",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon style={{color:"#01abaa"}} />
                                        </InputAdornment>
                                    )
                                }} 
                                color="secondary"
                           />
                          </>
                          )}
                        />
                        <FormHelperText style={{paddingLeft: '1rem'}}>Select Salesman from the above dropdown to view reports</FormHelperText>
                    </Grid>
                ) : ('')}
                
                {selectedSalesmanData.length > 0 ? (
                    <Grid item xs={12} sm={12} md={12} className="input-padding">
                        {/* <Stack direction="row" spacing={1} justifyContent="space-around"> */}
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
                            <Tooltip
                     title="Click to filter Current Week data">
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
                        {/* </Stack> */}
                    </Grid>
                ) : ''}

            </Grid>
        </Paper>  
        {/* price report */}
        {selectedSalesmanData.length > 0 ? (
            <SalesmanPriceReport 
                totalPriceData={totalPriceData}
                data={selectedSalesmanData}
            />
        ) : (
            <Paper elevation={4} style={{margin: '2rem 0px', padding: '0rem 0 1rem 0'}}>
                <Stack direction="column" spacing={0} justifyContent="center" alignItems="center" style={{padding: '5px 0px', margin: '0px', height: '100%'}}>
                    <img src={image} alt="empty cart" style={{height: '200px', width: '400px'}} />
                    <Typography variant="h2.heading" component="h2" className="page-heading" sx={{paddingBottom: '10px', fontWeight: '500', marginBottom: '10px'}}>No data to display. Try selecting salesman from the above dropdwon.</Typography>
                </Stack>
            </Paper>
        )}
        {/* -- price report */}
        </Box>
    )
}

export default SalesmanReport;