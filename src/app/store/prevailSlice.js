import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosInstance from '../api-configs/axiosInstance';
// import mock from 'src/@mock-api/mock';


export const getPrevailData = createAsyncThunk('prevail/getPrevailData', async (queryParams) => {
    // console.log("🚀 ~ file: prevailSlice.js:7 ~ getPrevailData ~ queryParams:", queryParams)
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    // const response = await window.fetch("https://staging-data-api.caremin.com/savings-groups?${queryParams}", requestOptions);
    const url = `https://staging-data-api.caremin.com/savings-groups?${queryParams}`;


    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ file: prevailSlice.js:17 ~ getPrevailData ~ data:", data)
    return data.data;
});

export const getStatsData = createAsyncThunk('prevail/getStatsData', async (queryParams) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    // const response = await window.fetch("https://staging-data-api.caremin.com/savings-groups/stats", requestOptions);
    const url = `https://staging-data-api.caremin.com/savings-groups/stats?${queryParams}`;
    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ getStatsData ~ data:", data);
    return data;
});

export const getBasesData = createAsyncThunk('prevail/getBasesData', async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc"); // Replace with your access token

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const response = await window.fetch("https://staging-data-api.caremin.com/bases?limit=10&nopage=true&page=1&sort=name:asc&with=branches", requestOptions);
    const data = await response.json();
    // console.log("🚀 ~ getBasesData ~ data:", data);
    return data;
});

export const getClustersData = createAsyncThunk('prevail/getClustersData', async (queryParams) => {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwOTAvdXNlcnMvbG9naW4iLCJpYXQiOjE2OTc0NDIwNzUsImV4cCI6MTY5Nzg3NzY3NSwibmJmIjoxNjk3NDQyMDc1LCJqdGkiOiIxVDhvbExMM3l2MWpOTEdHIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhcGkudHJhbnNmb3JtLmRldiIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlcyI6WyJhZG1pbiJdLCJ0aW1lc3RhbXAiOiIyMDE3LTA4LTA2VDIyOjA3OjI1LjAwMDAwMFoiLCJmaXJzdG5hbWUiOiJBZG1pbiIsImxhc3RuYW1lIjoiVXNlciIsImJhc2VfaWQiOm51bGwsImJyYW5jaF9pZCI6bnVsbH19.3LIk0JOypNlVUwDYskX0e8BZ5o1nHvLJTAQm9k-_UKc"); // Replace with your access token

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    // const response = await window.fetch("https://staging-data-api.caremin.com/clusters?limit=10&nopage=true&page=1&sort=name:asc", requestOptions);
    const url = `https://staging-data-api.caremin.com/clusters?${queryParams}`;
    const response = await window.fetch(url, requestOptions);
    const data = await response.json();
    // console.log("Cluster Data:", data);
    return data;
});


const prevailSlice = createSlice({
    name: 'prevail',
    initialState: {
        data: [],
        stats: {},
        basesData: [],
        clusterData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPrevailData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPrevailData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getPrevailData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getStatsData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStatsData.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(getStatsData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;

            })
            .addCase(getBasesData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBasesData.fulfilled, (state, action) => {
                state.loading = false;
                state.basesData = action.payload;
            })
            .addCase(getBasesData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getClustersData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClustersData.fulfilled, (state, action) => {
                state.loading = false;
                state.clusterData = action.payload;
            })
            .addCase(getClustersData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default prevailSlice.reducer;



// Define an async thunk for fetching data
// export const getPrevailData = createAsyncThunk('prevail/getPrevailData', async (queryParams) => {
//     try {

//         // Define a mocked GET request with a base URL and headers
//         mock.onGet('/api/data', {
//             baseURL: 'https://example.com', // Set your base URL here
//             headers: {
//                 'Authorization': 'Bearer YourAccessToken', // Set your headers here
//                 'Custom-Header': 'CustomValue',
//             },
//         }).reply(200, {
//             data: 'Mocked data',
//         });


//         // const response = await axiosInstance.get('savings-groups', {
//         //     params: queryParams, // Pass the query parameters here
//         // });
//         // console.log("🚀 ~ file: prevailSlice.js:24 ~ getPrevailData ~ response:", response)
//         // return response.data;
//     } catch (error) {
//         console.log("🚀 ~ file: prevailSlice.js:28 ~ getPrevailData ~ error:", error)
//         throw error;
//     }
// });

