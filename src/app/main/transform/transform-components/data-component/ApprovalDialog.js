import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Slide, Box, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import DataTable from 'react-data-table-component';


function ApprovalDialog({ isOpen, handleClose, selectedRowsDetails, onUpdate }) {

    console.log(selectedRowsDetails, "Hello");

    function FlexContainer({ children }) {
        return <div style={{ display: 'flex', gap: '10px' }}>{children}</div>
    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    const handleUpdate = () => {
        const newDetails = //... some new data
            onUpdate(newDetails);
    };

    const columns = [
        {
          name: 'No',selector: (row) => row.id,
        },
        {
          name: 'Participants', selector: (row) => row.program.name,
        },
        {
          name: 'Issue', selector: (row) => row.base.name,
        },
       
        { 
            name: 'Poverty Score	', selector: (row) => row.total_counselors
         },
        {
             name: 'Status', selector: (row) => row.overall_participants
         },
      ];
    

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            TransitionComponent={Transition}
            maxWidth="xl"
            PaperProps={{ style: { width: '100vw', height: '92vh', marginLeft: '16%', marginTop: '22%' } }}
        >
            <DialogTitle sx={{ background: '#CCC' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                            <FlexContainer>
                                {selectedRowsDetails.map((item) => (
                                    <div key={item.id} style={{ margin: '6PX' }}>
                                        <Typography>{item.application_id}</Typography>
                                        <Typography>Pastor</Typography>
                                    </div>
                                ))}
                                {selectedRowsDetails.contacts?.map((contact, index) => (
                                    <div key={index} style={{ margin: '6PX' }}>
                                        <Typography>{contact.contact_no}</Typography>
                                        <Typography>Contact No</Typography>
                                    </div>
                                ))}
                                {selectedRowsDetails.map((item) => (
                                    <div key={item.id} style={{ margin: '6PX' }}>
                                        <Typography>{item.base?.name || 'N/A'}</Typography>
                                        <Typography>Location</Typography>
                                    </div>
                                ))}
                                {selectedRowsDetails.map((item) => (
                                    <div key={item.id} style={{ margin: '6PX' }}>
                                        <Typography>{item.total_counselors}</Typography>
                                        <Typography>Counselors</Typography>
                                    </div>
                                ))}
                                {selectedRowsDetails.map((item) => (
                                    <div key={item.id} style={{ margin: '6PX' }}>
                                        <Typography>{item.total_participants}</Typography>
                                        <Typography>Participants</Typography>
                                    </div>
                                ))}

                            </FlexContainer>
                        </Grid>
                        <Grid item xs={8}>
                            <FlexContainer>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: '#386BBA',
                                        float: 'right',
                                        color: 'white',
                                        marginLeft: '10px',
                                        borderRadius: '1px',
                                        '&:hover': {
                                            background: '#386BBA',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={() => console.log('Button 1')}
                                >
                                    ADD PARTICIPANT
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: '1px',
                                        marginLeft: '10px',
                                        '&:hover': {
                                            background: 'initial',
                                            color: 'initial',
                                        },
                                    }}
                                    onClick={() => console.log('Button 2')}
                                >
                                    DROP
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: '#386BBA',
                                        color: 'white',
                                        borderRadius: '1px',
                                        marginLeft: '10px',
                                        '&:hover': {
                                            background: '#386BBA',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={() => console.log('Button 3')}
                                >
                                    APPROVE
                                </Button>
                                <Button onClick={handleClose} color="primary">
                                    {<ClearIcon sx={{ marginTop: '5px' }} />}
                                </Button>

                            </FlexContainer>
                        </Grid>
                    </Grid>
                </Box>
            </DialogTitle>
            <DialogContent
                sx={{
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        width: '12px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '8px',
                    },
                }}
            >
                
                <DataTable
        columns={columns}
        data={selectedRowsDetails}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
      />
            </DialogContent>
        </Dialog>
    );
}
export default ApprovalDialog;
