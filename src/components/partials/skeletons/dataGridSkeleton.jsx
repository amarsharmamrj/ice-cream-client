import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import {  Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
 
const DataGridSkeleton = () => {
    return (
        <> 
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                          <TableCell>
                            <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                          </TableCell>
                          <TableCell align="center">
                            <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                          </TableCell>
                          <TableCell align="right">
                            <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                          </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[1,2,3,4].map((row) => 
                            <TableRow key={row}>
                              <TableCell component="th" scope="row">
                                <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} /> 
                              </TableCell>
                              <TableCell align="center">
                                <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                              </TableCell>
                              <TableCell align="right">
                                <Skeleton variant="rectangular" sx={{ height: 40, width: '100%', marginBottom:'2px'}} />
                              </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default DataGridSkeleton;