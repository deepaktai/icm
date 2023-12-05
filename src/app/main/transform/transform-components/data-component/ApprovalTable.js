import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import ApprovalDialogContent from './ApprovalDialogContent';
import ApprovalDialogHeader from './ApprovalDialogHeader';
// import ApprovalEditPage from './ApprovalEditPage';
import ApprovalListEdit from './ApprovalListEdit';
import PastorProfileContent from './PastorProfileContent';

const customStyles = {
    headRow: { style: { color: '#387BBA' } },
    headCells: { style: { fontSize: '14px', fontWeight: '800' } },
    rows: {
        style: {
            cursor: 'pointer',
        },
    },
    selector: {
        style: { cursor: 'pointer' },
    },
};

function ApprovalTable({ data, allBasesSelected, activeStep, approvalDetail }) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isDetailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isPastorModalOpen, setPastorModalOpen] = useState(false);

    const handleEdit = (row) => {
        setSelectedRow(row);
        setEditDialogOpen(true);
        console.log('Edit Application:', row);
    };

    const handleViewParticipants = (row) => {
        console.log('View Participants:', row);
    };

    const handleApprove = (row) => {
        console.log('Approve Application:', row);
    };

    const handleDrop = (row) => {
        console.log('Drop Application:', row);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
        setDetailsDialogOpen(true);
    };

    const handleCloseDetailsDialog = () => {
        setDetailsDialogOpen(false);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleOpenPastorModal = () => {
        setPastorModalOpen(true);
    };

    const handleClosePastorModal = () => {
        setPastorModalOpen(false);
    };

    const columns = [
        {
            name: 'Application Date',
            selector: (row) => row.applied_at,
        },
        {
            name: 'Program',
            selector: (row) => row.program.name,
        },
        {
            name: 'Location',
            selector: (row) => allBasesSelected ? 'All Bases' : row.base.name,
        },
        {
            name: 'Pastor',
            cell: (row) => (
                <div onClick={() => handleOpenPastorModal(row)}>
                    {row.pastor && row.pastor.firstname && row.pastor.lastname
                        ? `${row.pastor.firstname} ${row.pastor.lastname}`
                        : 'N/A'}
                </div>
            ),
        },
        { name: 'Counselors', selector: (row) => row.total_counselors },
        { name: 'Participants', selector: (row) => row.overall_participants },
        { name: 'Children', selector: (row) => row.total_children },
        {
            cell: (row) => (
                <div>
                    <EditIcon onClick={() => handleEdit(row)} style={{ cursor: 'pointer', color: 'gray' }} />
                    <PlaylistAddIcon onClick={() => handleViewParticipants(row)} style={{ cursor: 'pointer', color: 'gray' }} />
                    <DoneIcon onClick={() => handleApprove(row)} style={{ cursor: 'pointer', color: 'blue' }} />
                    <DeleteIcon onClick={() => handleDrop(row)} style={{ cursor: 'pointer', color: 'red' }} />
                </div>
            ),
        },
    ];

    return (
        <>
            <DataTable
                title="Approval Table"
                columns={columns}
                data={data}
                customStyles={customStyles}
                highlightOnHover
                pagination
                onRowClicked={(row) => handleRowClick(row)}
            />

            {/* Dialog for displaying details of the selected row */}
            <Dialog
                open={isDetailsDialogOpen}
                onClose={handleCloseDetailsDialog}
                maxWidth="xl"
                PaperProps={{ style: { width: '100vw', height: '92vh', marginLeft: '16%', marginTop: '22%' } }}
            >
                <DialogTitle sx={{ background: '#ccc' }}><ApprovalDialogHeader selectedRow={selectedRow} /></DialogTitle>
                <DialogContent>
                    <ApprovalDialogContent />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for editing the selected row */}
            <Dialog
                open={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                fullWidth
                PaperProps={{ style: { width: '100vw', height: 'auto', borderRadius:'1px' } }}
            >
                <DialogTitle sx={{ background: '#386BBA', color: 'white', display: 'flex', justifyContent: 'space-between', position:'sticky', top:'0',zIndex:'1000' }}>Edit Applications
                    <IconButton color="inherit" onClick={handleCloseEditDialog} edge="end">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                {/* <ApprovalEditPage /> */}
                <ApprovalListEdit selectedRow={selectedRow} approvalDetail={approvalDetail}/>
              
            </Dialog>
            <Dialog
                open={isPastorModalOpen}
                onClose={handleClosePastorModal}
                maxWidth="md"
                PaperProps={{ style: { width: '70vw', minHeight: '50vh', marginLeft: '15%', marginTop: '1%'} }}
            >
                <PastorProfileContent selectedRow={selectedRow}/>
            </Dialog>
        </>
    );
}

export default ApprovalTable;
