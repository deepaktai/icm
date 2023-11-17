import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData } from 'app/store/CommunitySlice';
import { Box, FormControl, Select, Grid, MenuItem, InputLabel, TextField } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
function CustomNoDataMessage() {
  return (
    <div className="custom-no-data-message" style={{ marginTop: '10px', color: '#386BBA' }}>
      Please Wait for Table Records...
    </div>
  );
}
const customStyles = {
  headRow: {
    style: {
      color: '#387BBA', // Change the color to your desired color
    },
  },
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: '800'
    },
  },
};

function CommunityTable() {

  const dispatch = useDispatch();
  const communityDetails = useSelector((state) => state.CommunitySlice.data);
  const communityData = communityDetails && communityDetails.data;
  // console.log(communityData, 'community data');

  const [selectedBatch, setSelectedBatch] = useState('B1 of FY23-24');
  const [selectedBase, setSelectedBase] = useState('');
  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };
  
  const handleBaseChange = (event) => {
    setSelectedBase(event.target.value)
  };
  
  useEffect(() => {
    dispatch(getCommunityData());
  }, [dispatch], [communityData]);

  const totalCommunity = communityData ? communityData.reduce((total, row) => total + row.total_counselors, 0) : 0;
  const totalParticipants = communityData ? communityData.reduce((total, row) => total + row.total_participants, 0) : 0;
  const totalChildren = communityData ? communityData.reduce((total, row) => total + row.total_kid_savers, 0) : 0;

  const columns = [
    { name: 'Community ID', selector: (row) => row.community_id },
    { name: 'Program', selector: (row) => row.application.program.name },
    { name: 'Location', selector: (row) => row.application.base.name },
    { name: 'Municipality', selector: (row) => row.application.community_city },
    { name: 'Barangay', selector: (row) => row.application.community_barangay },
    {
      name: 'Pastor',
      selector: (row) => {
        if (row.application.pastor && row.application.pastor.firstname && row.application.pastor.lastname) {
          return `${row.application.pastor.firstname} ${row.application.pastor.lastname}`;
        } else {
          return 'N/A';
        }
      },
    },
    {
      name: '',
      cell: (row) => (
        <>
          <ModeEditIcon style={{ color: 'gray', cursor: 'pointer' }} />
          <DoneIcon style={{ color: 'green', cursor: 'pointer' }} />
          <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
        </>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                id="batch"
                label="Batch"
                variant="standard"
                value={selectedBatch}
                onChange={handleBatchChange}
              >
                {communityData && communityData.map((batch) => (
                  <MenuItem key={batch.batch.id} value={batch.batch.short_name}>
                    {batch.batch.short_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Base</InputLabel>
              <Select
                id="base"
                label="Base"
                variant="standard"
                value={selectedBase}
                onChange={handleBaseChange}
              >
                {/* Assuming you have an array of bases */}
                {/* {communityData && communityData.map((base) => (
                  <MenuItem key={base.id} value={base.name}>
                    {base..name}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All Branch</InputLabel>
              <Select
                type="text"
                id="branch"
                label="Branch"
                variant="standard"
              >
                <MenuItem value="">Branch 01</MenuItem>
                <MenuItem value="">Branch 02</MenuItem>
                <MenuItem value="">Branch 03</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All Program</InputLabel>
              <Select
                type="text"
                id="program"
                label="Program"
                variant="standard"
              >
                <MenuItem value="">Program 01</MenuItem>
                <MenuItem value="">Program 02</MenuItem>
                <MenuItem value="">Program 03</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <TextField id="standard-basic" label="Total Community" variant="standard" value={String(totalCommunity)} fullWidth disabled />
          </Grid>
          <Grid item xs={4} >
            <TextField id="standard-basic" label="Total Participant Override" variant="standard" value={String(totalParticipants)} fullWidth disabled />
          </Grid>
          <Grid item xs={4} >
            <TextField id="standard-basic" label="Total Children" variant="standard" value={String(totalChildren)} fullWidth disabled />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4} >
            <TextField id="standard-basic" label="Pastor Name or ID" variant="standard" fullWidth disabled />
          </Grid>
        </Grid>
      </Box>
      <DataTable
        columns={columns}
        data={communityData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        noDataComponent={<CustomNoDataMessage />}
        customStyles={customStyles}
      />
    </>
  );
}
export default CommunityTable;
