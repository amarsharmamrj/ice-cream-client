import React, { useEffect, useState } from 'react';
import { Typography,Tooltip, IconButton, Box, Paper, Grid, Skeleton} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import {Link} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DataGridSkeleton from '../skeletons/dataGridSkeleton';
import { SalesmanLeaderboardChart } from './salesmanLeaderboardChart';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#01abaa",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      padding: '2px 5px'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    '&:hover': {
        backgroundColor: '#edf9f9'
    }
  }));

  
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
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}


const SalesmanLeaderboard = (props) => {
    let unSortData = [];
    // const [uniqueSalesmanData, setUniqueSalesmanData] = useState([]);

    console.log("%c--props.data----:", "background-color: green; color: white", props.data)
    console.table(props.data)

    // let unique = [...new Set(props.data.map((item) => item.salesman_name))]
    // console.log('--unique----:', unique)

    let initialUniqueSalesmanObject = [...new Map(props.data.map(item => [item["salesman_name"], item])).values()];
    let uniqueSalesmanObject = [];
    initialUniqueSalesmanObject.forEach((item) => {
        uniqueSalesmanObject.push({...item, "all_total_selling": 0, "all_our_commission": 0 })
    })

    let initialUniqueSalesmanObjectFinal = [];
    initialUniqueSalesmanObject.forEach((item) => {
      initialUniqueSalesmanObjectFinal.push({...item, "all_total_selling": 0, "all_our_commission": 0 })
  })

    console.log('--uniqueSalesmanObject----:', uniqueSalesmanObject)
    // setUniqueSalesmanData(uniqueSalesmanObject);
    
    const calculateTotalSelling = () => {
        props.data.forEach((allDataItem) => {
            uniqueSalesmanObject.forEach((uniqueDataItem, i) => {
                if(allDataItem.salesman_id === uniqueDataItem.salesman_id){
                    if(allDataItem.total_selling != null){
                        uniqueSalesmanObject[i].all_total_selling = uniqueSalesmanObject[i].all_total_selling + allDataItem.total_selling;
                        uniqueSalesmanObject[i].all_our_commission = uniqueSalesmanObject[i].all_our_commission + allDataItem.our_commision;
                    }
                }
            })
            initialUniqueSalesmanObjectFinal.forEach((uniqueDataItem, i) => {
              if(allDataItem.salesman_id === uniqueDataItem.salesman_id){
                  if(allDataItem.total_selling != null){
                      initialUniqueSalesmanObjectFinal[i].all_total_selling = initialUniqueSalesmanObjectFinal[i].all_total_selling + allDataItem.total_selling;
                      initialUniqueSalesmanObjectFinal[i].all_our_commission = initialUniqueSalesmanObjectFinal[i].all_our_commission + allDataItem.our_commision;
                  }
              }
          })
        })
        unSortData = uniqueSalesmanObject;
        console.log('--unSortData-----:', unSortData)
        uniqueSalesmanObject.sort((a, b) => (a.all_total_selling > b.all_total_selling) ? -1 : 1)
    }
    calculateTotalSelling();
    console.log('--uniqueSalesmanObject----after manipulation--------:', uniqueSalesmanObject, initialUniqueSalesmanObjectFinal);
    console.table(uniqueSalesmanObject);

    useEffect(() => {
        // console.log('--unSortData-----:', unSortData)
        // props.setUniqueUnSortData(unSortData);
    }, [1])
    
    return (
        <Grid item container xs={12} sm={12} md={12} style={outerCardStyle}>

          <Grid item xs={12} sm={12} md={12} >
            <Box style={innerCardStyle}>
              <Typography variant="h2.heading" component="h2" style={{color: 'black', fontSize: '20px', paddingBottom: '1rem'}}>Salesman Leaderboard</Typography>
                {uniqueSalesmanObject.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                              <StyledTableCell>Name</StyledTableCell>
                              <StyledTableCell>Selling</StyledTableCell>
                              <StyledTableCell>Our Commission</StyledTableCell>
                              <StyledTableCell align="center">View</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uniqueSalesmanObject.length > 0 ? (
                                uniqueSalesmanObject.map((row, i) => (
                                    <StyledTableRow key={row.product_name}>
                                      <StyledTableCell component="th" scope="row">{row.salesman_name}</StyledTableCell>
                                      <StyledTableCell>Rs. {numberWithCommas(row.all_total_selling)}</StyledTableCell>
                                      <StyledTableCell>Rs. {numberWithCommas(row.all_our_commission)}</StyledTableCell>
                                      <StyledTableCell align="center">
                                        <Tooltip title="View">
                                            <IconButton 
                                              aria-label="Update"
                                              variant="contained"
                                              //   color="secondary"
                                              className="color-blue"
                                              to={`/salesman-report/${row.salesman_name}/${row.salesman_id}`}
                                              component={Link}
                                              //   onClick={(event) => {
                                              //     handleEdit(event, cellValues);
                                              //   }}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))
                                ) : ''}
                        </TableBody>
                    </Table>
                    </TableContainer>
                  ) : <DataGridSkeleton /> }
            </Box>
          </Grid>

          {initialUniqueSalesmanObjectFinal.length ? (
            <Grid item xs={12} sm={12} md={12}>
              <Box style={innerCardStyle}>
                <Typography variant="h2.heading" component="h2" style={{color: 'black', fontSize: '20px', paddingBottom: '1rem'}}>Salesman Leaderboard Graph</Typography>
                <SalesmanLeaderboardChart data={initialUniqueSalesmanObjectFinal} />
              </Box>
            </Grid> 
          ) : (
            <Grid item xs={12} sm={12} md={12}>
              <Box style={innerCardStyle}>
                <Typography variant="h2.heading" component="h2" style={{color: 'black', fontSize: '20px', paddingBottom: '1rem'}}>Salesman Leaderboard Graph</Typography>
                <Skeleton variant="text" sx={{ width: '100%', borderRadius: '10px', height: '400px', margin: '10px'}} />
              </Box>
            </Grid> 
          )}

        </Grid>
    )
}

export default SalesmanLeaderboard;