import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getDetailData = createAsyncThunk('detail/getDetailData', async (id) => {
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE3MDEyMzU3NzIsImV4cCI6MTcwMTY3MTM3MiwibmJmIjoxNzAxMjM1NzcyLCJqdGkiOiJRRVRQOFdOVlF0SVRPYTFZIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.tiN_u2wODTi0AdzKLFQ3RvIscmaRgsT7QpZIKy6kKZE");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    const url = `https://staging-data-api.caremin.com/savings-groups/${id}?with=batch,cluster`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ file: prevailSlice.js:17 ~ getPrevailData ~ data:", data)
    return data;
});

export const getSavingData = createAsyncThunk('detail/getSavingData', async (id) => {
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE3MDEyMzU3NzIsImV4cCI6MTcwMTY3MTM3MiwibmJmIjoxNzAxMjM1NzcyLCJqdGkiOiJRRVRQOFdOVlF0SVRPYTFZIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.tiN_u2wODTi0AdzKLFQ3RvIscmaRgsT7QpZIKy6kKZE");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    const url = `https://staging-data-api.caremin.com/savings-group-data?savings_group_id=${id}&sort=report_at:asc`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    return data.data;
});
const detailSlice = createSlice({
    name: 'detail',
    initialState: {
        data: {},
        saving:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDetailData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDetailData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getDetailData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getSavingData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSavingData.fulfilled, (state, action) => {
                state.loading = false;
                state.saving = action.payload;
            })
            .addCase(getSavingData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default detailSlice.reducer;