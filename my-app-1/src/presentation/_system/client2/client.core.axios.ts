import axios from 'axios';

/**
 * Axios インスタンス
 */
export const axiosInstance = axios.create({ timeout: 10000 });
