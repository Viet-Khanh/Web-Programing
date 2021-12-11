import axios from "axios";
import { BASE_URL } from "./enpoint";

const request = axios.create({
    baseURL :BASE_URL,
    timeout : 25000
})


const apiClient = {
    get: (url, data = {}) => {
        return request({
            method: "get",
            url,
            params: data,
        })
            .then((response) => response)
            .catch((err) => {
                throw err;
            });
    },
    post: (url, data) => {
        return request({
            method: "post",
            url,
            data,
        })
            .then((response) => response)
           // .then((response) => response.message)
            .catch((err) => {
                throw err;
            });
    },
    delete: (url, data, headers = {}) =>
        request({
            method: "delete",
            url,
            data,
            headers,
        })
            .then((response) => response)
            .catch((err) => {
                throw err;
            }),
    put: (url, data) =>
        request({
            method: "put",
            url,
            data,
        })
            .then((response) => response)
            .catch((err) => {
                throw err;
            }),
    patch: (url, data) =>
        request({
            method: "patch",
            url,
            data,
        })
            .then((response) => response)
            .catch((err) => {
                throw err;
            }),
}

export {apiClient}