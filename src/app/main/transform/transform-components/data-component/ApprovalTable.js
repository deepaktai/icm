import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovalData } from 'app/store/ApprovalSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';


function CustomNoDataMessage() {
  return (
    <div className="custom-no-data-message" style={{ marginTop: '10px', color: '#386BBA' }}>
      Please Wait for Table Records.
    </div>
  );
}

const customStyles = {
  headRow: {
      style: {
        color: '#387BBA', // Change the color to your desired color
      },
  },
  headCells:{
    style:{
      fontSize: '14px',
      fontWeight: '800'
    },
  },
};

function ApprovalTable() {
  const dispatch = useDispatch();
  const ApprovalData = useSelector((state) => state.ApprovalSlice.data);
  const ApprovalDetail = ApprovalData.data;
  // console.log(ApprovalDetail, "Hello");

  const columns = [
    { name: 'Application Date', selector: (row) => row.applied_at },
    { name: 'Program', selector: (row) => row.program.name },
    { name: 'Location', selector: (row) => row.base.name },
    {
      name: 'Pastor',
      selector: (row) => {
        if (row.pastor && row.pastor.firstname && row.pastor.lastname) {
          return `${row.pastor.firstname} ${row.pastor.lastname}`;
        } else {
          return 'N/A';
        }
      },
    },
    { name: 'Counselors', selector: (row) => row.total_counselors },
    { name: 'Participants', selector: (row) => row.overall_participants },
    { name: 'Children', selector: (row) => row.total_children },
    {
      name: 'Actions', 
      cell: (row) => (
        <>
          <ModeEditIcon style={{ color: 'gray', cursor: 'pointer' }} />
          <DoneIcon style={{ color: 'green', cursor: 'pointer' }} />
          <DeleteIcon style={{ color: 'red', cursor: 'pointer' }} />
        </>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getApprovalData());
  }, [dispatch]);

  return (
    <>
      <DataTable
        columns={columns}
        data={ApprovalDetail}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        noDataComponent={<CustomNoDataMessage />}
        customStyles={customStyles}
      />
    </>
  );
}

export default ApprovalTable;
