import React, { useEffect, useState } from 'react';
import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import ApprovalTable from './ApprovalTable';
import { useSelector, useDispatch } from 'react-redux';
import { getApprovalData } from 'app/store/ApprovalSlice';

function ApprovalPage() {
    const dispatch = useDispatch();
    const approvalData = useSelector((state) => state.ApprovalSlice.data);
    const approvalDetail = approvalData?.data || [];

    const [selectedBase, setSelectedBase] = useState('');
    const [allBasesSelected, setAllBasesSelected] = useState(false);
    console.log(allBasesSelected,"allBasesSelected");
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');

    useEffect(() => {
        dispatch(getApprovalData());
    }, [dispatch]);

    const handleBaseChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue, "Selected Base");
        setSelectedBase(selectedValue);
        setAllBasesSelected(selectedValue === ''); // Check if all bases are selected
    };

    const handleBranchChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
    };

    // Extract unique values for dropdown options
    const baseOptions = [...new Set(approvalDetail.map((item) => item.base?.name || ''))];
    const branchOptions = [
        ...new Set(
            approvalDetail.reduce((acc, item) => {
                if (item.base?.branches) {
                    // Extract branch names from the 'branches' array
                    acc.push(...item.base.branches.map((branch) => branch.name));
                }
                return acc;
            }, [])
        ),
    ];
    const programOptions = [...new Set(approvalDetail.map((item) => item.program?.name || ''))];

    // Apply filters based on selected values
    const filteredData = approvalDetail.filter((item) => {
        const baseFilter = selectedBase === '' || item.base?.name === selectedBase;
        const branchFilter =
            selectedBranch === '' ||
            (item.base?.branches && item.base.branches.some((branch) => branch.name === selectedBranch));
        const programFilter = selectedProgram === '' || item.program?.name === selectedProgram;

        return baseFilter && branchFilter && programFilter;
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="base-label">All Base</InputLabel>
                        <Select label="Base" variant="standard" value={selectedBase} onChange={handleBaseChange}>
                            <MenuItem value="">All Base</MenuItem>
                            {baseOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="branch-label">All Branch</InputLabel>
                        <Select
                            label="Branch"
                            variant="standard"
                            value={selectedBranch}
                            onChange={handleBranchChange}
                        >
                            <MenuItem value="">All Branches</MenuItem>
                            {branchOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <FormControl fullWidth>
                        <InputLabel id="program-label">All Program</InputLabel>
                        <Select
                            label="Program"
                            variant="standard"
                            value={selectedProgram}
                            onChange={handleProgramChange}
                        >
                            <MenuItem value="">All Programs</MenuItem>
                            {programOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="total-applications"
                        label="Total Applications"
                        variant="standard"
                        disabled
                        sx={{ marginLeft: '5px' }}
                    />
                    <TextField
                        id="total-participant-override"
                        label="Total Participant Override"
                        variant="standard"
                        disabled
                        sx={{ marginLeft: '5px' }}
                    />
                    <TextField
                        id="total-children"
                        label="Total Children"
                        variant="standard"
                        disabled
                        sx={{ marginLeft: '5px' }}
                    />
                </Grid>
            </Grid>
            <ApprovalTable data={filteredData} approvalDetail={approvalDetail} />
        </Box>
    );
}
export default ApprovalPage;
