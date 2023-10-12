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

export {
    getUsers,
    createUsers
}