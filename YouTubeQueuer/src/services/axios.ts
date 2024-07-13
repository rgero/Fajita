import axios from 'axios';

export const fajitaAxios = axios.create({
  withCredentials: true,
});