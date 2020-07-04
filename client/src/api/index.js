import axios from 'axios';

const api = axios.create({
    baseURL: '/',
});

// Products
export const insertProduct = payload => api.post('/api', payload);
export const loginProduct = payload => api.post('/api', payload);
export const getAllProducts = () => api.get('/api');
export const getOneProduct = id => api.get(`/api/${id}`); 
export const updateProductById = (id, payload) => api.put(`/api/${id}`, payload);
export const deleteProductById = id => api.delete(`/api/${id}`);

// Orders
export const insertOrder = payload => api.post('/order', payload);
export const getAllOrders = () => api.get('/order');
export const getOrderById = id => api.get(`/order/${id}`);
export const insertUser = payload => api.post('/user', payload);
export const getAllUsers = () => api.get('/user');
export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
export const deleteUserById = id => api.delete(`/user/${id}`);

const apis = {
    insertProduct,
    loginProduct,
    getAllProducts,
    getOneProduct,
    updateProductById,
    deleteProductById,
    insertOrder,
    getAllOrders,
    getOrderById,
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
};

export default apis;