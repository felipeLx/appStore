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
export const insertOrder = payload => api.post('/order', payload);
export const getAllOrders = () => api.get('/order');
export const getOrderById = id => api.get(`/order/${id}`);
export const updateOrderById = (id, payload) => api.put(`/order/${id}`, payload);
export const deleteOrderById = id => api.delete(`/order/${id}`);

// Users
export const registerUser = payload => api.post('/user/auth', payload);
export const loginUser = payload => api.post('/user/login', payload);
export const logoutUser = () => api.post('/user/logout');
export const getAllUsers = () => api.get('/user');
export const getUserById = id => api.get(`/user/${id}`);
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = id => api.delete(`/user/${id}`);

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