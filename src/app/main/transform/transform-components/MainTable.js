import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainData } from 'app/store/MainPageSlice';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from '@mui/material';
import { Box, FormControl, Select, Grid, MenuItem, InputLabel, TextField } from '@mui/material';

function MainTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.MainPageSlice.data);
  const rows = data.data || [];
  console.log(rows, 'complete data');
  const [selectedBase, setSelectedBase] = useState('AllBase');
  const [selectedBranch, setSelectedBranch] = useState('AllBranch');

  useEffect(() => {
    dispatch(getMainData());
  }, [dispatch]);

  return (
<Box sx={{ flexGrow: 1, marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="base-label">Base</InputLabel>
            <Select
              id="base"
              labelId="base-label"
              variant="standard"
              value={selectedBase}
              onChange={(e) => setSelectedBase(e.target.value)}
            >
              <MenuItem value="AllBase">All Base</MenuItem>
              <MenuItem value="01">Base 01</MenuItem>
              <MenuItem value="02">Base 02</MenuItem>
              <MenuItem value="03">Base 03</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="branch-label">Branch</InputLabel>
            <Select
              id="branch"
              labelId="branch-label"
              variant="standard"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              disabled={selectedBase === 'AllBase'}
            >
              <MenuItem value="AllBranch">All Branch</MenuItem>
              <MenuItem value="Branch01">Branch 01</MenuItem>
              <MenuItem value="Branch02">Branch 02</MenuItem>
              <MenuItem value="Branch03">Branch 03</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <TextField
              type="text"
              id="program"
              label="Search Pastor's Name or ID"
              variant="standard"
            />
          </FormControl>
        </Grid>
      </Grid>
    

    <TableContainer style={{ marginTop: '10px' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Application ID</TableCell>
            <TableCell>Base</TableCell>
            <TableCell>Branch</TableCell>
            <TableCell>Application Date</TableCell>
            <TableCell>Pastor</TableCell>
            <TableCell>Pastor Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.application_id}
              </TableCell>
              <TableCell>{row.base.name}</TableCell>
              <TableCell>{row.branch.name}</TableCell>
              <TableCell>{row.applied_at}</TableCell>
              <TableCell>{row.pastor_id}</TableCell>
              <TableCell>{row.active}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}

export default MainTable;
