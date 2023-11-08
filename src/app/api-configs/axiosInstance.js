import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://rc-data-api.caremin.com/', // Replace with your API base URL
  baseURL: 'https://staging-data-api.caremin.com/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your authentication token logic here
  },
});

export default instance;
