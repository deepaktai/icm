import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getMemberData = createAsyncThunk('member/getMemberData', async (id) => {
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    const url = `https://staging-data-api.caremin.com/participants?is_sg_participant=1&nopage=true&savings_group_id=${id}&sort=lastname:asc&with=community`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ file: memberSlice.js:19 ~ getMemberData ~ data:", data)
    return data;
});

export const getMember1Data = createAsyncThunk('member/getMember1Data', async (id) => {
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    const url = `https://staging-data-api.caremin.com/participants?is_non_sg=1&nopage=true&savings_group_id=${id}&sort=participant_id:asc&with=community`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ file: memberSlice.js:19 ~ getMemberData ~ data:", data)
    return data;
}); 

export const getCommunityData = createAsyncThunk('member/getCommunityData', async (id) => {
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    const url = `https://staging-data-api.caremin.com/savings-groups/${id}?with=communities`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ file: memberSlice.js:19 ~ getMemberData ~ data:", data)
    return data;
});
const memberSlice = createSlice({
    name: 'member',
    initialState: {
        data: [],
        data1:[],
        community:[],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMemberData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMemberData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getMemberData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getMember1Data.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMember1Data.fulfilled, (state, action) => {
                state.loading = false;
                state.data1 = action.payload;
            })
            .addCase(getMember1Data.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getCommunityData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCommunityData.fulfilled, (state, action) => {
                state.loading = false;
                state.community = action.payload;
            })
            .addCase(getCommunityData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default memberSlice.reducer;