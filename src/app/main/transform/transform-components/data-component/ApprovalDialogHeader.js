import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function ApprovalDialogHeader({ selectedRow }) {
    console.log(selectedRow, "selectedRow");

    function FlexContainer({ children }) {
        return <div style={{ display: 'flex', gap: '10px' }}>{children}</div>;
    }

    const pastorData = selectedRow.pastor || {}; // Ensure pastorData is an object even if selectedRow.pastor is null or undefined
    const { fullname, contacts } = pastorData;
    const { contact_no } = contacts[0] || {};
    const location = selectedRow || {};
    const { church_barangay, church_city, total_counselors, total_participants, total_approved_participants } =location;
    

    return (
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Grid container spacing={3} justifyContent="space-between">
                <Grid item xs={8}>
                    <FlexContainer>
                        <div>
                            <Typography>{fullname}</Typography>
                            <Typography>Pastor</Typography>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <Typography>{contact_no}</Typography>
                            <Typography>Contact No.</Typography>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <Typography>{church_barangay && church_city ? `${church_barangay}, ${church_city}` : ''}</Typography>
                            <Typography>Location</Typography>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <Typography>{total_counselors}</Typography>
                            <Typography>Counselors</Typography>
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            <Typography>{total_approved_participants && total_participants ? `${total_approved_participants} / ${total_participants}` :'' }</Typography>
                            <Typography>Participants</Typography>
                        </div>
                    </FlexContainer>
                </Grid>
                <Grid item xs={4}>
                    <FlexContainer>
                        <Button variant="contained" sx={{ borderRadius: '1px', background: '#368BBA', color: 'white', marginLeft: '20px', '&:hover': { background: '#368BBA', color: 'white' }, }}>ADD PARTICIPANT</Button>
                        <Button variant="text" sx={{ marginLeft: '20px' }}>DROP</Button>
                        <Button variant="contained" sx={{ borderRadius: '1px', background: '#368BBA', color: 'white', marginLeft: '20px', '&:hover': { background: '#368BBA', color: 'white' }, }}>APPROVE</Button>
                        <CloseIcon sx={{ marginLeft: '20px', marginTop: '10px' }} />
                    </FlexContainer>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ApprovalDialogHeader;
