import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  Select,
  Grid,
  MenuItem,
  InputLabel,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getApprovalData } from 'app/store/ApprovalSlice';
import DataTable from 'react-data-table-component';


function CustomNoDataMessage() {
    return (
      <div className="custom-no-data-message" style={{ marginTop: '10px', color: '#386BBA' }}>
        Please Wait for Table Records.
      </div>
    );
  }
  
  const customStyles = {
    headRow: {
        style: {
          color: '#387BBA', // Change the color to your desired color
        },
    },
    headCells:{
      style:{
        fontSize: '14px',
        fontWeight: '800'
      },
    },
  };

function ApprovalFilter() {
  const dispatch = useDispatch();
  const approvalData = useSelector((state) => state.ApprovalSlice.data);
  const approvalDetail = approvalData.data;

  console.log(approvalDetail);

  useEffect(() => {
    dispatch(getApprovalData());
  }, [dispatch]);

  const [filteredData, setFilteredData] = useState(approvalDetail);
  const [selectedBase, setSelectedBase] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    let newFilteredData = approvalDetail;

    if (selectedBase) {
      newFilteredData = newFilteredData.filter(
        (row) => row.base.name === selectedBase
      );
    }

    if (selectedBranch) {
      newFilteredData = newFilteredData.filter(
        (row) => row.data.branches.name === selectedBranch
      );
    }

    if (selectedProgram) {
      newFilteredData = newFilteredData.filter(
        (row) => row.program.name === selectedProgram
      );
    }

    setFilteredData(newFilteredData);
  }, [approvalDetail, selectedBase, selectedBranch, selectedProgram]);

  const handleBaseChange = (event) => {
    const baseName = event.target.value;
    setSelectedBase(baseName);
    setSelectedBranch(''); // Reset branch when base changes
    setSelectedProgram(''); // Reset program when base changes
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    setSelectedProgram(''); // Reset program when branch changes
  };
  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const branchOptions = Array.isArray(approvalDetail)
    ? approvalDetail
        .filter((row) => row.base?.name === selectedBase)
        .map((row) => row.base.branches.name)
        .filter((value, index, self) => self.indexOf(value) === index)
    : [];

  const programOptions = Array.isArray(approvalDetail)
    ? approvalDetail
        .filter((row) => row.base?.name === selectedBase)
        .map((row) => row.program?.name)
        .filter((value, index, self) => self.indexOf(value) === index)
    : [];

    const columns = [
    { name: 'Application Date', selector: (row) => row.applied_at },
    { name: 'Program', selector: (row) => row.program.name },
    { name: 'Location', selector: (row) => row.base.name },
    {
      name: 'Pastor',
      selector: (row) => {
        if (row.pastor && row.pastor.firstname && row.pastor.lastname) {
          return `${row.pastor.firstname} ${row.pastor.lastname}`;
        } else {
          return 'N/A';
        }
      },
    },
    { name: 'Counselors', selector: (row) => row.total_counselors },
    { name: 'Participants', selector: (row) => row.overall_participants },
    { name: 'Children', selector: (row) => row.total_children },
]


  return (
    
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="base-label">Base</InputLabel>
              <Select
                label="Base"
                variant="standard"
                value={selectedBase}
                onChange={handleBaseChange}
              >
                {approvalDetail &&
                  approvalDetail
                    .map((row) => row.base.name)
                    .filter(
                      (value, index, self) => self.indexOf(value) === index
                    )
                    .map((baseName, index) => (
                      <MenuItem key={index} value={baseName}>
                        {baseName}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="branch-label">Branch</InputLabel>
              <Select
                label="Branch"
                variant="standard"
                value={selectedBranch}
                onChange={handleBranchChange}
              >
                <MenuItem value="">All Branches</MenuItem>
                {branchOptions.map((branchName, index) => (
                  <MenuItem key={index} value={branchName}>
                    {branchName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="program-label">Program</InputLabel>
              <Select
                label="Program"
                variant="standard"
                value={selectedProgram}
                onChange={handleProgramChange}
              >
                <MenuItem value="">All Programs</MenuItem>
                {programOptions.map((programName, index) => (
                  <MenuItem key={index} value={programName}>
                    {programName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="standard-basic"
              label="Total Applications"
              variant="standard"
              disabled
              sx={{ marginLeft: '5px' }}
            />
            <TextField
              id="standard-basic"
              label="Total Participant Override"
              variant="standard"
              disabled
              sx={{ marginLeft: '5px' }}
            />
            <TextField
              id="standard-basic"
              label="Total Children"
              variant="standard"
              disabled
              sx={{ marginLeft: '5px' }}
            />
          </Grid>
        </Grid>
      </Box>
      <DataTable columns={columns}
       data={filteredData}
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

export default ApprovalFilter;
