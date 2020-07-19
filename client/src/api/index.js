import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

// Products
export const insertProduct = payload => api.post('/api', payload);
export const getAllProducts = () => api.get('/api');
export const getOneProduct = id => api.get(`/api/${id}`); 
export const updateProductById = (id, payload) => api.put(`/api/${id}`, payload);
export const deleteProductById = id => api.delete(`/api/${id}`);

// Orders
export const insertOrder = payload => api.post('/orders', payload);
export const getAllOrders = () => api.get('/orders');
export const getOrderById = id => api.get(`/orders/${id}`);
export const updateOrderById = (id, payload) => api.put(`/orders/${id}`, payload);
export const deleteOrderById = id => api.delete(`/orders/${id}`);

// Users
export const registerUser = payload => api.post('/users/signup', payload);
export const loginUser = payload => api.post('/users/login', payload);
export const logoutUser = () => api.post('/users/logout');
export const getAllUsers = () => api.get('/users');
export const getUserById = id => api.get(`/users/${id}`);
export const updateUserById = (id, payload) => api.put(`/users/${id}`, payload);
export const deleteUserById = id => api.delete(`/users/${id}`);

const apis = {
    insertProduct,
    getAllProducts,
    getOneProduct,
    updateProductById,
    deleteProductById,
    insertOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById,
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};

export default apis;