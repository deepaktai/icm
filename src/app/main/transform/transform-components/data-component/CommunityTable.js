import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunityData } from 'app/store/CommunitySlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
} from '@mui/material';

function CommunityTable() {
  const dispatch = useDispatch();
  const communityData = useSelector((state) => state.getCommunityData);
  const data = communityData|| [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getCommunityData());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
        <TableContainer style={{ marginTop: '10px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Base</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Application Date</TableCell>
                <TableCell>Pastor</TableCell>
                <TableCell>Pastor Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.application_id}
                      </TableCell>
                      <TableCell>{row.base?.name}</TableCell>
                      <TableCell>{row.branch?.name}</TableCell>
                      <TableCell>{row.applied_at}</TableCell>
                      <TableCell>{row.pastor_id}</TableCell>
                      <TableCell>{row.active}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
}

export default CommunityTable;
