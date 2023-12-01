import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:6868/',
    timeout: 1000,
    headers: {
        'x-auth-token': 'fake-token',
        'Content-type': 'application/json'
    }
});

const createCheck = async (check) => {
    return await instance.post('check', check);
}

const searchCheckByRut = async (rut) => {
    return await instance.get(`/check/search/rut/${rut}`);
}

const deleteCheck = async (check) => {
    return await instance.delete(`check/${check.rut}?fecha=${check.fecha}&hora=${check.hora}`);
}

const getReportData = async (rut) => {
    const response = await instance.get(`/check/report/${rut}`);
    return response.data;
};

export const getAllChecksByRut = (rut) => {
    // Tu lógica para obtener los registros por Rut
    return axios.get(`/checks/${rut}`);
};


export {
    createCheck,
    searchCheckByRut,
    deleteCheck,
    getReportData,
}