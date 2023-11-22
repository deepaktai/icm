import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData, getBranches } from 'app/store/CommunitySlice';
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
      color: '#387BBA',
    },
  },
  headCells: {
    style: {
      fontSize: '14px',
      fontWeight: '800',
    },
  },
};

function CommunityTable() {
  const dispatch = useDispatch();
  const communityDetails = useSelector((state) => state.CommunitySlice.data);
  const communityData = communityDetails && communityDetails.data;
  const [selectedBatch, setSelectedBatch] = useState('B1 of FY23-24');
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handleBaseChange = (event) => {
    const selectedBase = event.target.value;
    setSelectedBase(selectedBase);

    // Filter the communityData based on the selected base
    const filteredData = communityData.filter((item) => item.application.base.name === selectedBase);

    // Dispatch the action with the filtered data
    dispatch(getCommunityData(selectedBase, selectedBranch, selectedProgram, filteredData));
  };

  const uniqueCommunityData = Array.from(new Set(communityData && communityData.map((base) => base.application.base.id)))
    .map((id) => communityData.find((base) => base.application.base.id === id));

  useEffect(() => {
    dispatch(getCommunityData(selectedBase, selectedBranch, selectedProgram));
  }, [dispatch, selectedBase, selectedBranch, selectedProgram]);

  let displayData = communityData;
  if (selectedBase) {
    // If a base is selected, filter the data
    displayData = communityData.filter((item) => item.application.base.name === selectedBase);
  } else {
    // If no base is selected, display all data
    displayData = communityData;
  }

  const handleProgramChange = (event) => {
    const selectedProgram = event.target.value;
    setSelectedProgram(selectedProgram);
  
    // Filter the communityData based on the selected program
    const filteredData = communityData.filter(
      (item) => item.application.program.name === selectedProgram
    );
  
    console.log("Filtered Data:", filteredData);
    
  
    // Dispatch the action with the filtered data
    dispatch(getCommunityData(selectedBase, selectedBranch, selectedProgram, filteredData));
  };
  
  const handleBranchChange = (event) => {
    const selectedBranch = event.target.value;
    setSelectedBranch(selectedBranch);

    const filteredData = communityData.filter((item) => {
      const baseName = item.application.base?.name;
      const branchName = item.application.branch?.name;

      return (!selectedBase || baseName === selectedBase) &&
        (!selectedBranch || branchName === selectedBranch);
    });

    dispatch(getCommunityData(selectedBase, selectedBranch, selectedProgram, filteredData));
  };
  
  const uniqueProgramData = Array.from(new Set(communityData && communityData.map((base) => base.application.program.id)))
    .map((id) => communityData.find((base) => base.application.program.id === id));
    console.log(uniqueProgramData,'aise hi')

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  const totalCommunity = uniqueCommunityData ? uniqueCommunityData.reduce((total, row) => total + row.total_counselors, 0) : 0;
  const totalParticipants = uniqueCommunityData ? uniqueCommunityData.reduce((total, row) => total + row.total_participants, 0) : 0;
  const totalChildren = uniqueCommunityData ? uniqueCommunityData.reduce((total, row) => total + row.total_kid_savers, 0) : 0;

  // Inside your columns definition
  const columns = [
    { name: 'Community ID', selector: (row) => row.community_id },
    {
      name: 'Program',
      selector: (row) => {
        return row.application?.program?.name;
      }
    },
    {
      name: 'Location',
      selector: (row) => {
        return row.application?.base?.name;
      }
    },
    { name: 'Municipality', selector: (row) => row.application?.community_city },
    { name: 'Barangay', selector: (row) => row.application?.community_barangay },
    {
      name: 'Pastor',
      selector: (row) => {
        const pastor = row.application?.pastor;
        if (pastor && pastor.firstname && pastor.lastname) {
          return `${pastor.firstname} ${pastor.lastname}`;
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
                defaultValue="B1 of FY23-24"
                onChange={handleBatchChange}
              >
                {uniqueCommunityData &&
                  uniqueCommunityData.map((base) => {
                    const batchId = `${base.application.base.id}-${base.batch.short_name}`;
                    return (
                      <MenuItem key={batchId} value={base.batch.short_name}>
                        {base.batch.short_name}
                      </MenuItem>
                    );
                  })}
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
                {uniqueCommunityData &&
                  uniqueCommunityData.map((base) => (
                    <MenuItem key={base.application.base.id} value={base.application.base.name}>
                      {base.application.base.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedBase ? (
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">All Branch</InputLabel>
                <Select
                  id="branch"
                  label="Branch"
                  variant="standard"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                >
                  {uniqueCommunityData &&
                    uniqueCommunityData
                      .filter((base) => base.application.base.name === selectedBase)
                      .map((base) =>
                        base.application.base.branches
                          ? base.application.base.branches.map((branch) => (
                            <MenuItem key={branch.id} value={branch.name}>
                              {branch.name}
                            </MenuItem>
                          ))
                          : null
                      )}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">All Branch</InputLabel>
                <Select
                  id="branch"
                  label="Branch"
                  variant="standard"
                  value={selectedBranch}
                  onChange={handleBranchChange}
                  disabled
                >
                  {/* You can provide a disabled MenuItem if needed */}
                  <MenuItem value="" disabled>
                    Select Base to Enable
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">All Program</InputLabel>
              <Select
  id="program"
  label="Program"
  variant="standard"
  value={selectedProgram}
  onChange={handleProgramChange}
>
  {uniqueProgramData &&
    uniqueProgramData.map((program) => (
      <MenuItem
        key={program.application.program.id}
        value={program.application.program.name}
      >
        {program.application.program.name}
      </MenuItem>
    ))}
</Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField id="standard-basic" label="Total Community" variant="standard" value={String(totalCommunity)} fullWidth disabled />
          </Grid>
          <Grid item xs={4}>
            <TextField id="standard-basic" label="Total Participant Override" variant="standard" value={String(totalParticipants)} fullWidth disabled />
          </Grid>
          <Grid item xs={4}>
            <TextField id="standard-basic" label="Total Children" variant="standard" value={String(totalChildren)} fullWidth disabled />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField id="standard-basic" label="Pastor Name or ID" variant="standard" fullWidth disabled />
          </Grid>
        </Grid>
      </Box>
      <DataTable
        columns={columns}
        data={displayData}
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
