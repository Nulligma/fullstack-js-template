import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const userApi = axios.create({ baseURL: `${apiURL}/user` });

export const getJobList = async () => (await userApi.get('/jobs')).data;

export const registerUser = async (userData) => (await userApi.post('/',userData)).data;

export const loginUser = async (userData) => (await userApi.post('/auth',userData)).data;