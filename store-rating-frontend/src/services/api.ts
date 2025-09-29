import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Update with your backend URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (data: any) => api.post('/auth/signup', data);
export const login = (data: any) => api.post('/auth/login', data);
export const createUser = (data: any) => api.post('/users', data);
export const getUsers = (params: any) => api.get('/users', { params });
export const updatePassword = (data: any) => api.patch('/users/password', data);
export const createStore = (data: any) => api.post('/stores', data);
export const getStores = (params: any) => api.get('/stores', { params });
export const getStoreRating = (storeId: number) => api.get(`/stores/${storeId}/rating`);
export const submitRating = (data: any) => api.post('/ratings', data);
export const getRatingsByStore = (storeId: number) => api.get(`/ratings/store/${storeId}`);
export const getUserRating = (storeId: number) => api.get(`/ratings/user/${storeId}`);