
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getCommunityData = createAsyncThunk('transform/getCommunityData', async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE3MDEyMzU3NzIsImV4cCI6MTcwMTY3MTM3MiwibmJmIjoxNzAxMjM1NzcyLCJqdGkiOiJRRVRQOFdOVlF0SVRPYTFZIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.tiN_u2wODTi0AdzKLFQ3RvIscmaRgsT7QpZIKy6kKZE');
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const url = "https://staging-data-api.caremin.com/communities?limit=20&page=1&participant_status=overriden&with=application.base.branches,application.program,application.community,application.pastor,application.church,application.pastor.churches,application.pastor.churches.barangay,application.pastor.churches.city,application.pastor.churches.affiliation,application.pastor.base,application.pastor.province,application.pastor.city,application.pastor.barangay,application.pastor.contacts,donor,application,savingsGroup,savingsGroupData";
    const response = await window.fetch(url, requestOptions);
     
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});

export const getBranches = createAsyncThunk('transform/getBranches', async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE3MDEyMzU3NzIsImV4cCI6MTcwMTY3MTM3MiwibmJmIjoxNzAxMjM1NzcyLCJqdGkiOiJRRVRQOFdOVlF0SVRPYTFZIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.tiN_u2wODTi0AdzKLFQ3RvIscmaRgsT7QpZIKy6kKZE');
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const url = "https://staging-data-api.caremin.com/communities?limit=20&page=1&participant_status=overriden&with=application.base.branches,application.program,application.community,application.pastor,application.church,application.pastor.churches,application.pastor.churches.barangay,application.pastor.churches.city,application.pastor.churches.affiliation,application.pastor.base,application.pastor.province,application.pastor.city,application.pastor.barangay,application.pastor.contacts,donor,application,savingsGroup,savingsGroupData"; // Change the URL to the correct endpoint for branches
    const response = await window.fetch(url, requestOptions);
     
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log(data,'Indore');
    return data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
});
const CommunitySlice = createSlice({
  name: 'transform',
   initialState: {
    data: [],
    branches: [],
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
      .addCase(getBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload ? action.payload.branches || [] : [];
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
     
  },
});
export default CommunitySlice.reducer;



