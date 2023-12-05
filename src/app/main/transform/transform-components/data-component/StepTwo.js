// StepTwo.js
import React, { useState } from 'react';
import { Grid, TextField, InputLabel, Select, MenuItem, FormLabel, Typography, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PageIndicator from './PageIndicator';

function StepTwo({ onBack, handleSubmit, activeStep,onCancel, selectedRow, approvalDetail }) {
    
    const [selectedTransportation, setSelectedTransportation] = useState(approvalDetail?.means_of_transportation || '');
    const [selectedWater, setSelectedWater] = useState(approvalDetail?.source_of_water || '');
    const [selectedIncome, setSelectedIncome] = useState(approvalDetail?.source_of_income || '');
    const [selectedGeoType, setSelectedGeoType] = useState();
    const GeoOptions = [
        ...new Set(
            approvalDetail &&
            approvalDetail.map((item) => item.base?.geotype || 'null')
        ),
    ];

    console.log(GeoOptions, 'check perpus');

    const handleRadioChange = (value) => {
        setSelectedTransportation(value);
    };

    const handleRadioWater = (value) => {
        setSelectedWater(value);
    }

    const hanleRadioIncome = (value) => {
        setSelectedIncome(value);
    }

    const handleGeoType = (value) => {
        setSelectedGeoType(value);
    };

    const handleCancel = () => {
        // Your cancellation logic here
        console.log('Cancel button clicked');
        onCancel();
    }

    console.log(selectedRow, "selectedRow testing");

    return (
        <>        <div style={{ marginLeft: '25px', marginRight: '25px' }}>
            {/* <h2>Step Two</h2> */}

            <Grid container spacing={2} mt={2}>
                <Grid item xs={4}>
                    {/* <Button onClick={handleBack} sx={{ color: '#386BBA' }}><ArrowBackIosIcon sx={{ fontSize: 14}}/> Back</Button> */}
                    <Button onClick={onBack} sx={{ color: '#386BBA' }}><ArrowBackIosIcon sx={{ fontSize: 18, color: '#367BBA' }} />Back</Button>
                </Grid>
                <Grid item xs={8} style={{ textAlign: 'right' }}>
                    <h6>Application ID</h6>
                    <h6>{selectedRow.application_id}</h6>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Please check boxes for the most appropriate answer:</Typography>
                </Grid>

                <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontWeight: '700', color: '#333' }}>Means of transportation going to the community:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedTransportation}
                        onChange={(e) => handleRadioChange(e.target.value)}
                    >
                        <Grid item xs={4}>
                            <FormControlLabel value="MotorBike" control={<Radio />} label="Motorbike" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Bus" control={<Radio />} label="Bus" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Van" control={<Radio />} label="Van" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Jeepney" control={<Radio />} label="Jeepney" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Tricycle" control={<Radio />} label="Tricycle" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Pumpboat" control={<Radio />} label="Pumpboat" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControlLabel value="Pedicab" control={<Radio />} label="Pedicab" />
                        </Grid>
                    </RadioGroup>
                </Grid>

                <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontWeight: '700', color: '#333' }}>Source of drinking water of participants:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedWater}
                        onChange={(e) => handleRadioWater(e.target.value)}
                    >
                        <Grid item xs={4}><FormControlLabel value="well" control={<Radio />} label="Well" /></Grid>

                        <Grid item xs={4}> <FormControlLabel value="river" control={<Radio />} label="River" /></Grid>

                        <Grid item xs={4}><FormControlLabel value="wtaerDistrict" control={<Radio />} label="Water District" /></Grid>

                        <Grid item xs={4}> <FormControlLabel value="waterStation" control={<Radio />} label="Water Station" /></Grid>

                        <Grid item xs={4}> <FormControlLabel value="manualPump" control={<Radio />} label="Manual Pump" /></Grid>

                        <Grid item xs={4}><FormControlLabel value="spring" control={<Radio />} label="Spring" /></Grid>

                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontWeight: '700', color: '#333' }}>Source of income of participant / Job:</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={selectedIncome}
                        onChange={(e) => hanleRadioIncome(e.target.value)}
                    >
                        <Grid item xs={4}><FormControlLabel value="farming" control={<Radio />} label="Farming" /></Grid>
                        <Grid item xs={4}><FormControlLabel value="hiredLabored" control={<Radio />} label="Hired Laborer" /></Grid>
                        <Grid item xs={4}><FormControlLabel value="fishing" control={<Radio />} label="Fishing" /></Grid>
                        <Grid item xs={4}><FormControlLabel value="pedicabdriver" control={<Radio />} label="Pedicab Driver" /></Grid>
                        <Grid item xs={4}><FormControlLabel value="other" control={<Radio />} label="Other" /></Grid>
                    </RadioGroup>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-text-input"
                        type="text"
                        variant="standard"
                        fullWidth
                        label="Distance of Community from the Office (in km)"
                        value={selectedRow.distance || 'null'}
                    />
                </Grid>
                <Grid item xs={6}>
                    <InputLabel id="demo-simple-select-label1">Geographical Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label1"
                        id="demo-simple-select1"
                        variant="standard"
                        fullWidth
                        value={selectedGeoType}
                        onChange={(e) => handleGeoType(e.target.value)}
                    >
                        <MenuItem value="">Geographical Type</MenuItem>
                        {GeoOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>

        </div>
        <Grid item xs={12} sx={{ overflow: 'hidden', background: '#ccc', marginTop: '20px' }}>
                <div style={{ marginLeft: '25px', marginRight: '25px', marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <PageIndicator activeStep={activeStep} totalSteps={2} />
                    </div>
                    <div>
                        <Button onClick={handleCancel} style={{ marginRight: '10px', borderRadius: '1px', color: '#367BBA' }}>CANCEL</Button>
                        <Button
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: '1px',
                                background: '#368BBA',
                                color: 'white',
                                '&:hover': {
                                    background: '#368BBA',
                                },
                            }}
                        >
                            SUBMIT APPLICATION
                        </Button>
                    </div>
                </div>
            </Grid>

        </>
    );
}

export default StepTwo;
