import React, { useState, useEffect } from 'react';
import { Box, TextField, FormControlLabel, FormControl, Select, Grid, Typography, Radio, MenuItem, InputLabel, RadioGroup } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getApplicationData, fetchPastors, fetchBaseAndBranchData, fetchChurch } from 'app/store/NewApplicationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Application() {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const [dateValue, onDateChange] = useState(formattedDate);
  const [program, setProgram] = useState("");
  const [selectedBaseName, setSelectedBaseName] = useState("");
  const [selectedBranchName, setSelectedBranchName] = useState("");
  const [selectedchurch, setSelectedChurch] = useState('');
  // const [selectedposition, setSelectedPosition] = useState('');
  // const [selectedProgram, setSelectedProgram] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedPastor, setSelectedPastor] = useState("");
  const branches = [{ id: 1, name: 'Branch 1' },{ id: 2, name: 'Branch 2' },{ id: 3, name: 'Branch 3' },{ id: 4, name: 'Branch 4' }];
  const data = useSelector((state) => state.NewApplicationSlice);
  const ndata = data.data;
  const pastorsData = useSelector((state) => state.NewApplicationSlice.pastors);
  // console.log(pastorsData, "indore");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPastors());
    dispatch(getApplicationData());
  }, [dispatch]);

  const handlePastorChange = (event) => {
    const selectedPastorId = event.target.value;

    if (selectedPastorId) {
      setSelectedPastor(selectedPastorId);

      dispatch(fetchBaseAndBranchData(selectedPastorId))
        .then((resultAction) => {
          if (fetchBaseAndBranchData.fulfilled.match(resultAction)) {
            const { base, branch } = resultAction.payload;
            setSelectedBaseName(base.name);
            // setSelectedBranchName(branch.name);
          } else {
            console.error("Error fetching base and branch data:", resultAction.error.message);
          }
        });
    }
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setActiveStep(0); // Reset the step when the dialog is closed
  };

  const steps = ['New Application', 'New Application']; // Define your steps here

  return (
    <React.Fragment>

      {activeStep === 0 ? (
        <Button
          id="newapp"
          className="btn btn-primary"
          type="button"
          onClick={openDialog} // Open the dialog
          sx={{
            background: '#368BBA', color: 'white', borderRadius: '3px', "&:hover": {
              background: "#368BBA"
            },
          }}
        >
          New Application
        </Button>
      ) : null}
            <TextField sx={{marginLeft:'10px'}}
              type="text"
              id="application"
              label="Total Application"
              variant="standard"
              defaultValue={20}
            />
      <Button
        id="newapp"
        className="btn-light"
        type="button"
        // onClick={} 
        sx={{ float: 'right', color: '#386BBA' }}
      >
        Delete Applications
      </Button>
      <Dialog open={isDialogOpen} onClose={closeDialog} fullWidth >
        <DialogTitle sx={{ background: '#368BBA', color: 'white' }}>{steps[activeStep]}</DialogTitle>
        <Button
          onClick={closeDialog}
          sx={{ position: 'absolute', right: 10, top: 10, color: 'white' }}
        >
          <CloseIcon />
        </Button>
        <DialogContent sx={{ marginTop: '5px' }}>
          <DialogContent sx={{ marginTop: '5px' }}>
            {activeStep === 0 ? (                   // First page new application page
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
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

                    <Grid item xs={4} style={{ marginLeft: '10px' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Program</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={program}
                          label="Program"
                          variant="standard"
                          onChange={(e) => setProgram(e.target.value)}
                        >
                          {ndata && Array.isArray(ndata) && ndata.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} style={{ marginLeft: '10px' }}>
                      <TextField
                        id="standard-basic"
                        label="Application ID"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <Grid item xs={12} style={{ marginLeft: '10px' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Pastor</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="pastor"
                          value={selectedPastor}
                          onChange={handlePastorChange}
                          variant="standard"
                        >
                          <MenuItem value="">Select a Pastor</MenuItem> {/* Add a default value */}
                          {pastorsData.map((pastor) => (
                            <MenuItem key={pastor.id} value={pastor.id}>
                              {`${pastor.firstname} ${pastor.lastname} (${pastor.id})`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <TextField
                        type="text"
                        id="base"
                        value={selectedBaseName}
                        readOnly
                        label="Base"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                        <Select
                          type="text"
                          id="branch"
                          value={selectedBranchName}
                          label="Branch"
                          variant="standard"
                        >
                          <MenuItem value="">Select a Branch</MenuItem>
                          {branches.map((branch) => (
                            <MenuItem key={branch.id} value={branch.name}>
                              {branch.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <Typography style={{ fontSize: '15px', fontStyle: 'italic' }}>
                      If the church is not listed, you must first add this church info as a new church profile in
                      Thrive <ArrowForwardIcon /> Church section. Once added, you may return and add/encode this Transform application.
                    </Typography>
                  </Grid>

                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <Typography>Church</Typography>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Church</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedchurch}
                          // onChange={handleChurch}
                          variant="standard"
                        >
                         
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <Typography>Position</Typography>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Position</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={selectedposition}
                          // onChange={handlePosition}
                          variant="standard"
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <TextField
                        disabled
                        id="standard-basic"
                        label="City"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <TextField
                        disabled
                        id="standard-basic"
                        label="Barangay"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginLeft: '10px' }}>
                    <Typography>Program Venue</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={4} style={{ marginLeft: '10px' }}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="Main Church"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="mainchurch" control={<Radio />} label="Main Church" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="pioneering" control={<Radio />} label="Pioneering/Outreach Church" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ marginLeft: '10px' }}>
                    <Typography>Transform Community Address</Typography>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <TextField
                        id="standard-basic"
                        label="City/Municipality"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} style={{ marginLeft: '10px' }}>
                      <TextField
                        id="standard-basic"
                        label="Barangay"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={12} style={{ marginLeft: '10px' }}>
                      <TextField
                        id="standard-basic"
                        label="Street/Sitio/Purok"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item xs={12} style={{ marginLeft: '10px' }}>
                      <TextField
                        id="standard-basic"
                        label="Barangay Chairman"
                        variant="standard"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            ) : (   // Second page coding of the new application page
              <>
                <Button onClick={handleBack} sx={{ marginLeft: '10px', color: '#368BBA' }}>Back</Button>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      id="standard-text-input"
                      label="Application ID"
                      type="text"
                      variant="standard"
                      sx={{ float: 'right' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Please check boxes for the most appropriate answer:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography style={{ fontWeight: '500' }}>Means of transportation going to the community:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="MoterBike" control={<Radio />} label="MoterBike" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Bus" control={<Radio />} label="Bus" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Van" control={<Radio />} label="Van" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Jeepney" control={<Radio />} label="Jeepney" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Tricycle" control={<Radio />} label="Tricycle" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Pumpboat" control={<Radio />} label="Pumpboat" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="Pedicab" control={<Radio />} label="Pedicab" />
                    </RadioGroup>
                  </Grid>


                  <Grid item xs={12}>
                    <Typography>Source of drinking water of participants:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="well  " control={<Radio />} label="Well" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="river" control={<Radio />} label="River" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="wtaerDistrict" control={<Radio />} label="Water District" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="waterStation" control={<Radio />} label="Water Station" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="manualPump" control={<Radio />} label="Manual Pump" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="spring" control={<Radio />} label="Spring" />
                    </RadioGroup>
                  </Grid>


                  <Grid item xs={12}>
                    <Typography>Source of income of participant / Job:</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="farming" control={<Radio />} label="Farming" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="hiredLabored" control={<Radio />} label="Hired Laborer" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="fishing" control={<Radio />} label="Fishing" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="pedicabdriver" control={<Radio />} label="Pedicab Driver" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={4}>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-text-input"
                      type="text"
                      variant="standard"
                      fullWidth
                      defaultValue="Distance of Community from the office (in KM)"
                      sx={{ fontSize: '8px' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      label="Position"
                      variant="standard"
                      fullWidth
                      inputProps={{
                        'aria-label': 'Position',
                      }}
                      value={selectedProgram}
                      onChange={handleProgramChange}
                      sx={{ width: '180px', marginTop: '15px' }}
                    >
                      <MenuItem value="">Position</MenuItem>
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </>
            )}

          </DialogContent>
        </DialogContent>
        <DialogActions style={{ background: '#F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ marginLeft: '10px' }}>Page {activeStep + 1}/2</span>
          {activeStep > 0 && (
            <Button onClick={closeDialog}>CANCEL</Button>
          )}
          {activeStep < steps.length - 1 ? (
            <>
              <Button onClick={closeDialog} sx={{ borderRadius: '2px' }}>
                CANCEL
              </Button>
              <Button onClick={handleNext} sx={{ borderRadius: '2px' }}>
                NEXT
              </Button>
            </>
          ) : (
            <Button onClick={closeDialog}>SUBMIT</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default Application;
