import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const todoApi = axios.create({ baseURL: `${apiURL}/todo` });

export const getHomePage = async () => (await axios.get(apiURL + "/")).data;

export const getTodoList = async () => (await todoApi.get('/')).data;

export const getTodo = async (id) => (await todoApi.get(`/${id}`)).data;

export const createTodo = async (todo) => (await todoApi.post('/', todo)).data;

export const updateTodo = async (id, todo) => (await todoApi.patch(`/${id}`, todo)).data;

export const deleteTodo = async (id) => (await todoApi.delete(`/${id}`)).data;
