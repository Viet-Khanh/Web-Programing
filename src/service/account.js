import { apiClient } from "./apiClient";
import { ENDPOINTS } from "./enpoint";


//student 
export const getAllStudent = (param) => apiClient.get(ENDPOINTS.STUDENT , param)
export const addStudent = (body) => apiClient.post(ENDPOINTS.STUDENT , body)
export const delStudent = (body) => apiClient.delete(ENDPOINTS.STUDENT , body)
// export const editStudent = (body) => apiClient.put(ENDPOINTS.STUDENT , body)

//guest
export const getAllGuest = (param) => apiClient.get(ENDPOINTS.GUEST , param)
export const addGuest = (body) => apiClient.post(ENDPOINTS.GUEST , body)
export const delGuest = (body) => apiClient.delete(ENDPOINTS.GUEST , body)
//export const editGuest = (body) => apiClient.put(ENDPOINTS.GUEST , body)

//vehicle
export const getAllVehicles = (param) => apiClient.get(ENDPOINTS.VEHICLE, param);
export const addVehicle = (body) => apiClient.post(ENDPOINTS.VEHICLE, body);
export const updateVehicle = (id, body) => apiClient.put(`${ENDPOINTS.VEHICLE}/${id}`, body);
export const deleteVehilce = (id) => apiClient.delete(`${ENDPOINTS.VEHICLE}/${id}`, {});

//rooms

export const getAllRooms = (param) => apiClient.get(ENDPOINTS.ROOM ,param)
export const addRooms = (body) => apiClient.post(ENDPOINTS.ROOM , body)
export const updateRooms = (body) => apiClient.put(ENDPOINTS.ROOM , body)

//login
export const checkLogin = (body) => apiClient.post(ENDPOINTS.LOGIN , body)

//bill
export const getBillByStudentId = (id) => apiClient.get(`${ENDPOINTS.BILL}?studentId=${id}`, {});
