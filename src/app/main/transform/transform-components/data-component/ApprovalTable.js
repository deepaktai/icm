import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Application ID', width: 170 },
  { field: 'program', headerName: 'Program', width: 150 },
  { field: 'location', headerName: 'Location', width: 150 },
  { field: 'pastor', headerName: 'Pastor', width: 150 },
  { field: 'counselors', headerName: 'Counselors', width: 150 },
  { field: 'participants', headerName: 'Participants', width: 150 },
  { field: 'children', headerName: 'Children', width: 150 },

];

const rows = [
  { id: 1, program: 'Snow', location: 'Jon', pastor: 'abc', counselors: 'abc', participants: 'abc', children: 'abc' },
];

function ApprovalTable() {
   
  
  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
    </>
  )
}

export default ApprovalTable