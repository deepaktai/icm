import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getApprovalData = createAsyncThunk('transform/getApprovalData', async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE3MDAxMTI2NzQsImV4cCI6MTcwMDU0ODI3NCwibmJmIjoxNzAwMTEyNjc0LCJqdGkiOiJUV0dzd1F0WlI1WHhUNHU2Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.oxm-1tn9i3LHwsFy--T_3B13ePVFBIQwWWtikle2G44');
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const url = "https://staging-data-api.caremin.com/applications?approved&with=church,program,base,church.barangay,church.city,program,base.branches,pastor,pastor.churches,pastor.churches.affiliation,pastor.base,pastor.province,pastor.city,pastor.barangay,pastor.contacts,pastor.churches.barangay,pastor.churches.city";
    const response = await window.fetch(url, requestOptions);
     
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const ApprovalDetail = await response.json();
    console.log(ApprovalDetail,'Indore');
    return ApprovalDetail;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
const ApprovalSlice = createSlice({
  name: 'ApprovalDetail',
   initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApprovalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getApprovalData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getApprovalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }) 
  },
});

export default ApprovalSlice.reducer;



