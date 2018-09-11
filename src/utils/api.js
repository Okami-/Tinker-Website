import axios from 'axios';

export function get(path, params) {
    return axios({
        method: 'get',
        url,
        params,
        withCredentials: true,
    }).then(resp => resp.data);
}

export function post(path, data, params) {
    return axios({
        method: 'post',
        url,
        data,
        params,
        withCredentials: true,
    });
}