import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getApplicationData = createAsyncThunk('transform/getApplicationData', async () => {
    try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTkyNDkyNjIsImV4cCI6MTY5OTY4NDg2MiwibmJmIjoxNjk5MjQ5MjYyLCJqdGkiOiJ2eXR2b0xHbGV0cGpNaVplIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.1NN_aTKW4dkLOp2mgLR7nwFuQ4oemH3uEyPtWXmh9Wo');
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        const url = "https://staging-data-api.caremin.com/programs?active=true&limit=10&nopage=true&page=1&sort=name:asc";
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


export const fetchPastors = createAsyncThunk('transform/fetchPastors', async () => {
    // Replace 'YOUR_API_TOKEN' with your actual API token
    const apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTkyNDkyNjIsImV4cCI6MTY5OTY4NDg2MiwibmJmIjoxNjk5MjQ5MjYyLCJqdGkiOiJ2eXR2b0xHbGV0cGpNaVplIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.1NN_aTKW4dkLOp2mgLR7nwFuQ4oemH3uEyPtWXmh9Wo'; // Replace with your token

    try {
      const response = await fetch('https://staging-data-api.caremin.com/pastors?check_status=1&limit=20&page=1&search=a&sort=lastname:asc&with=churches,churches.barangay,churches.city,district,base,district.branch', {
        headers: {
          'Authorization': apiToken,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error('Invalid data format in the API response.');
        throw new Error('Invalid data format');
      }
    } catch (error) {
      throw error;
    }
  });

  export const fetchBaseAndBranchData = createAsyncThunk('transform/fetchBaseAndBranchData', async (pastorId) => {
    // Fetch base and branch data for the selected pastor
    const apiToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTkyNDkyNjIsImV4cCI6MTY5OTY4NDg2MiwibmJmIjoxNjk5MjQ5MjYyLCJqdGkiOiJ2eXR2b0xHbGV0cGpNaVplIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.1NN_aTKW4dkLOp2mgLR7nwFuQ4oemH3uEyPtWXmh9Wo'; // Replace with your token

    try {
      const response = await fetch(`https://staging-data-api.caremin.com/pastors/${pastorId}?with=base,district.branch`, {
        headers: {
          'Authorization': apiToken,
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data && data.base && data.district && data.district.branch) {
        return { base: data.base, branch: data.district.branch };
      }
    } catch (error) {
      console.error('Error fetching base and branch data:', error);
      throw error;
    }
  });


  const PastorSlice = createSlice({
    name: 'transform',
    initialState: {
      pastors: [], // Corrected variable name
      selectedPastor: null,
      base: null,
      branch: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // ... Other cases
  
        .addCase(fetchPastors.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPastors.fulfilled, (state, action) => {
          state.loading = false;
          state.pastors = action.payload; // Corrected variable name
        })
        .addCase(fetchPastors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchBaseAndBranchData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBaseAndBranchData.fulfilled, (state, action) => {
          state.loading = false;
          state.base = action.payload.base; // Corrected variable name
          state.branch = action.payload.branch; // Corrected variable name
        })
        .addCase(fetchBaseAndBranchData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default PastorSlice;
  