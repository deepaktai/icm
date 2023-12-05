// StepOne.js
import React, {useState} from 'react';
import { Grid, TextField, InputLabel, Select, MenuItem, FormLabel, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PageIndicator from './PageIndicator';

function StepOne({ onNext, dateValue, onDateChange, activeStep, selectedRow, approvalDetail }) {

    const pastorData = selectedRow.pastor || {};
    const { fullname,churches,position,city,barangay} = pastorData;
    const [selectedProgram, setSelectedProgram] = useState('');
    const programOptions = [...new Set(approvalDetail.map((item) => item.program?.name || ''))];

    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value);
    };

    const handleCancel = () => {
        // Your cancellation logic here
        console.log('Cancel button clicked');
    }
    console.log(approvalDetail,"approvalDetail for programa");

    return (
        <>
            <div style={{ marginLeft: '25px', marginRight: '25px' }}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={4}>
                        <TextField
                            id="standard-basic"
                            label="Application Date"
                            variant="standard"
                            type="date"
                            value={dateValue}
                            onChange={(e) => onDateChange(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                    <InputLabel id="demo-simple-select-label">All Program</InputLabel>
                        <Select
                            label="Program"
                            variant="standard"
                            value={selectedProgram}
                            onChange={handleProgramChange}
                            fullWidth
                        >
                            <MenuItem value="">All Programs</MenuItem>
                            {programOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                </Grid>



                    <Grid item xs={4} style={{ textAlign: 'right' }}>
                        <h6>Application ID</h6>
                        <h6>{selectedRow.application_id}</h6>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="pastor"
                            label="Pastor"
                            variant="standard"
                            fullWidth
                            value={fullname || ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <TextField
                            id="base"
                            value={selectedRow.base?.name || ''}
                            label="Base"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                        <Select
                            type="text"
                            id="branch"
                            value={selectedRow.base?.branches?.[0]?.name || ''}
                            label="Branch"
                            variant="standard"
                            fullWidth
                        >
                            {selectedRow.base?.branches?.map((branch) => (
                                <MenuItem key={branch.id} value={branch.name}>
                                    {branch.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: '700', fontStyle: 'italic', color: '#333' }}>
                            If the church is not listed, you must first add this church info as a new church profile in
                            Thrive <ArrowForwardIcon fontSize="10px" /> Church section. Once added, you may return and add/encode this Transform application.
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label" sx={{ fontWeight: '700', color: '#333' }}>Church</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={churches?.[0]?.name || ''}
                            fullWidth
                            variant="standard"
                        >
                            {churches.map((church) => (
                                <MenuItem key={church.id} value={church.name}>
                                    {church.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label" sx={{ fontWeight: '700', color: '#333' }}>Position</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="standard"
                            value={position || ''}
                            fullWidth
                        >
                            <MenuItem value={position || ''}>{position || ''}</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            disabled
                            id="standard2"
                            label="City"
                            variant="standard"
                            value={city?.name || ''}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField
                            disabled
                            id="standard1"
                            label="Barangay"
                            variant="standard"
                            value={barangay?.name || ''}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormLabel id="demo-radio-buttons-group-label">Program Venue</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="pioneering"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="mainchurch" control={<Radio />} label="Main Church" />
                            <FormControlLabel value="pioneering" control={<Radio />} label="Pioneering/Outreach Church" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: '700', color: '#333' }}>Transform Community Address</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard5"
                            label="City/Municipality"
                            variant="standard"
                            value={selectedRow.community_city || NaN}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="standard6"
                            label="Barangay"
                            variant="standard"
                            value={selectedRow.community_barangay || NaN}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard7"
                            label="Street/Sitio/Purok"
                            variant="standard"
                            value={selectedRow.community_street || NaN}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard8"
                            label="Barangay Chairman"
                            variant="standard"
                            value={selectedRow.brgy_chairman || 'null'}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </div>
            <Grid item xs={12} sx={{ overflow: 'hidden', background: '#ccc', marginTop: '20px', position: 'sticky', bottom: 0, zIndex: 1000 }}>
                <div style={{ marginLeft: '25px', marginRight: '25px', marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PageIndicator activeStep={activeStep} totalSteps={2} />
                    </div>
                    <div>
                        <Button onClick={handleCancel} style={{ marginRight: '10px', borderRadius: '1px', color: '#367BBA' }}>CANCEL</Button>
                        <Button onClick={onNext} sx={{
                            borderRadius: '1px',
                            background: '#368BBA',
                            color: 'white',
                            '&:hover': {
                                background: '#368BBA', // Set the background color to the same as the default state
                            },
                        }}>NEXT</Button>
                    </div>
                </div>
            </Grid>
        </>
    );
}

export default StepOne; 
