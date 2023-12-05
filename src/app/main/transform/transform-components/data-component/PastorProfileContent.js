import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function PastorProfileContent({ selectedRow }) {
  console.log(selectedRow, "selectedRow");

  if (!selectedRow || !selectedRow.pastor) {
    // Handle cases where selectedRow or selectedRow.pastor is null or undefined
    return <div>No data available.</div>;
}

  const removeSpecialCharacters = (inputString) => {
    return inputString.replace(/[^a-zA-Z0-9\s]/g, ''); // Removes special characters
  };

  // Assuming you have data for the table
  const tableData = [
    { label: 'Gender', value: selectedRow.pastor.gender ? selectedRow.pastor.gender.charAt(0).toUpperCase() + selectedRow.pastor.gender.slice(1) : '' },
    { label: 'Date of Birth ', value: selectedRow.pastor.birth_date },
    { label: 'Status ', value: selectedRow.pastor.status ? selectedRow.pastor.status.charAt(0).toUpperCase() + selectedRow.pastor.status.slice(1) :'' },
    { 
      label: 'Educ. Level', 
      value: selectedRow.pastor.educational_attainment ? 
        removeSpecialCharacters(selectedRow.pastor.educational_attainment)
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('  ')
        : ''
    },
    { label: 'Attended Seminary ', value: selectedRow.pastor.seminary },
    { label: 'Church ', value: selectedRow.church_name ? selectedRow.church_name.charAt(0).toUpperCase() + selectedRow.church_name.slice(1) : '' },
    { label: 'Church Affiliation ', value: selectedRow.church.church_affiliation_id },
    { label: 'Position ', value: selectedRow.pastor.position  },
    { label: 'Church Address', value: selectedRow.pastor.province.name },
    { label: 'City or Municipality ', value: selectedRow.church_city },
    { label: 'Province ', value: selectedRow.pastor.province.name },
  ];
  const tableData2 = [
    { label: 'Base - Thrive Area', value: selectedRow.base.name },
    { label: 'Thrive', value: 'Value ' },
    { label: 'Info Created', value: selectedRow.base.created_at },
    { label: 'Info Updated', value: selectedRow.base.updated_at },
    { label: 'Membership Date', value: selectedRow.pastor.membership_date },
    { label: 'Active ', value: selectedRow.pastor.active ? 'Yes' : 'No' },
    { label: 'Member', value: selectedRow.pastor.member ? 'Yes' : 'No'  },
  ];

  return (
    <>
      <Box
        sx={{
          width: '90%',
          margin: '25px',
          borderRadius: '0px',
          overflow: 'hidden', // Set overflow to hidden
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography variant="h4" fontSize={'22px'}>
              {selectedRow.pastor.fullname}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '16px' }}>
              <a href='#' style={{ textDecoration: 'none' }}>
                Go To Profile
              </a>
            </Typography>
            {/* Table within Grid item */}
            <Table>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {row.label}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ marginBottom:'30px', marginLeft:'65%', fontSize:'15px'}}>
              {selectedRow.pastor.contacts[0].contact_no}
            </Typography>
            {/* Table within Grid item */}
            <Table>
              <TableBody>
                {tableData2.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {row.label}
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid #e0e0e0' }}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default PastorProfileContent;
