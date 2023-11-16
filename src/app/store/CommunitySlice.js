
// First API

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCommunityData = createAsyncThunk('transform/getCommunityData', async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTkyNDkyNjIsImV4cCI6MTY5OTY4NDg2MiwibmJmIjoxNjk5MjQ5MjYyLCJqdGkiOiJ2eXR2b0xHbGV0cGpNaVplIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.1NN_aTKW4dkLOp2mgLR7nwFuQ4oemH3uEyPtWXmh9Wo');
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const url = "https://staging-data-api.caremin.com/applications?limit=50&page=1&sort=applied_at:asc&with=branch,program,church,church.barangay,church.city,base.branches,pastor,pastor.churches,pastor.churches.affiliation,pastor.churches.barangay,pastor.churches.city,pastor.base,pastor.branch,pastor.province,pastor.city,pastor.barangay,pastor.contacts";
    const response = await window.fetch(url, requestOptions);
     
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data,'Indore');
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});


const CommunitySlice = createSlice({
  name: 'transform',
   initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommunityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunityData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCommunityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
  },
});

export default CommunitySlice.reducer;



