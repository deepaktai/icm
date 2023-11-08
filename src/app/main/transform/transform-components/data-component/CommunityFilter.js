import * as React from 'react';
import { Box, FormControl, Select, Grid, MenuItem, InputLabel, TextField } from '@mui/material';

function CommunityFilter() {
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                <Grid item xs={3}>
                <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                            <Select
                                type="text"
                                id="batch"
                                label="Batch"
                                variant="standard"
                            >
                                <MenuItem value="01">Batch 01</MenuItem>
                                <MenuItem value="02">Batch 02</MenuItem>
                                <MenuItem value="03">Batch 03</MenuItem>
                            </Select>
                        </FormControl> 
                </Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Base</InputLabel>
                            <Select
                                type="text"
                                id="base"
                                label="Base"
                                variant="standard"
                            >
                                <MenuItem value="01">Base 01</MenuItem>
                                <MenuItem value="02">Base 02</MenuItem>
                                <MenuItem value="03">Base 03</MenuItem>
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
                    <TextField id="standard-basic" label="Total Applications" variant="standard" fullWidth disabled/>
                    </Grid>
                    <Grid item xs={4} >
                    <TextField id="standard-basic" label="Total Participant Override" variant="standard" fullWidth disabled/>
                    </Grid>
                    <Grid item xs={4} >
                    <TextField id="standard-basic" label="Total Children" variant="standard" fullWidth disabled/>
                    </Grid>
                    </Grid>
                
            </Box>
    </>
  )
}

export default CommunityFilter