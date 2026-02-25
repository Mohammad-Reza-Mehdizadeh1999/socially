// src/services/api/authService.ts
import api from './axiosConfig';
import type { AxiosResponse } from 'axios'; 

export interface LoginDataType {
  email: string;
  password: string;
}

export interface RegisterDataType {
  name : string;
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginRequest = (data: LoginDataType): Promise<AxiosResponse<any>> => {
  return api.post('/authentication/login', data);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerRequest = (data: RegisterDataType): Promise<AxiosResponse<any>> => {
  return api.post('/authentication/register', data);
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutRequest = (): Promise<AxiosResponse<any>> => {
  return api.post('/authentication/logout');};
