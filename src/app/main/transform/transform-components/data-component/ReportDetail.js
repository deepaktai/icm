import * as React from 'react';
import { Box, FormControl, Select, Grid, MenuItem, InputLabel, TextField, Button } from '@mui/material';

function ReportDetail() {
    return (
        <>
            <Box sx={{ flexGrow: 1, margin:0, padding:0 }}>
                <Grid container>
                    <Button variant="contained" style={{width:'14%', borderRadius:'1px', background:'#368BBA', color:'white'}}>Contained</Button>
                    <Grid container spacing={2} style={{ marginLeft: '200px' }}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">All Program</InputLabel>
                                <Select
                                    type="text"
                                    id="program"
                                    label="Program"
                                    variant="standard"
                                >
                                    <MenuItem value="01">Program 01</MenuItem>
                                    <MenuItem value="02">Program 02</MenuItem>
                                    <MenuItem value="03">Program 03</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9} >
                            <TextField id="standard-basic" label="Total Children" variant="standard" fullWidth disabled />
                        </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{ marginLeft: '200px' }}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                                    <Select
                                        type="text"
                                        id="Batch"
                                        label="Batch"
                                        variant="standard"
                                    >
                                        <MenuItem value="01">Batch 01</MenuItem>
                                        <MenuItem value="02">Batch 02</MenuItem>
                                        <MenuItem value="03">Batch 03</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Base</InputLabel>
                                    <Select
                                        type="text"
                                        id="Base"
                                        label="Base"
                                        variant="standard"
                                    >
                                        <MenuItem value="">Base 01</MenuItem>
                                        <MenuItem value="">Base 02</MenuItem>
                                        <MenuItem value="">Base 03</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">All Branch</InputLabel>
                                    <Select
                                        type="text"
                                        id="Branch"
                                        label="Branch"
                                        variant="standard"
                                    >
                                        <MenuItem value="">Branch 01</MenuItem>
                                        <MenuItem value="">Branch 02</MenuItem>
                                        <MenuItem value="">Branch 03</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
            </Box>
        </>
    )
}

export default ReportDetail