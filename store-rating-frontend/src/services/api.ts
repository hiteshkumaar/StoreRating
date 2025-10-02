import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
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
export const createUser = (data: any, role: string) => api.post(`/users?role=${role}`, data);
export const updatePassword = (newPassword: string) => api.patch('/users/password', { newPassword });
export const getUsers = (filters: any) => api.get('/users', { params: filters });
export const createStore = (data: any) => api.post('/stores', data);
export const getStores = (filters: any) => api.get('/stores', { params: filters });
export const getStoresByOwner = (ownerId: number) => api.get(`/stores/owner?ownerId=${ownerId}`);
export const submitRating = (data: { storeId: number; value: number }) => api.post('/ratings', data);
export const updateRating = (id: number, value: number) => api.patch(`/ratings/${id}`, { value });
export const getRatingsByStore = (storeId: number) => api.get(`/ratings/store/${storeId}`);
export const getAverageRating = (storeId: number) => api.get(`/ratings/average/${storeId}`);