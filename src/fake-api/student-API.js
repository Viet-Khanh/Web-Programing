import { FAKE_API, FAKE_API_ROOM, FAKE_API_SERVICE, FAKE_API_VISITER } from "./fake";

export const studentAPI = () => {
    return new Promise(res =>{
        setTimeout(() => {
            res(FAKE_API)
        },1000)
    })
}


export const visiterAPI = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(FAKE_API_VISITER)
        }, 750)
    })
}

export const serviceAPI = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(FAKE_API_SERVICE)
        }, 750)
    })
}

export const roomAPI = () => {
    return new Promise(res => {
        setTimeout(() => {
            res(FAKE_API_ROOM)
        }, 750)
    })
}