import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:6868/',
    timeout: 1000,
    headers: {
        'x-auth-token': 'fake-token',
        'Content-type': 'application/json'
    }
});
const getUsers = async () => {
    return await instance.get('user');
}

const createUsers = async (user) => {
    return await instance.post('user', user);
}

const deleteUser = async (rut)  => {
    return await instance.delete(`user/${rut}`);
}

const updateUser = async (rut, user) => {
    return await instance.put(`user/${rut}`, user);
}

const searchUserByRut = async (rut) => {
    return await instance.get(`/user/search/rut/${rut}`);
}

export {
    getUsers,
    createUsers,
    deleteUser,
    updateUser,
    searchUserByRut,
}