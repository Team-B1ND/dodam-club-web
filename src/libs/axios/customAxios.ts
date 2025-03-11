import CONFIG from 'src/config/config.json'
import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios'
import requestInterceptor from './requestInterceptor'
import ResponseHandler from './responseInterceptor'
import Token from '../token/token'
import {
  REQUEST_TOKEN_KEY,
  ACCESS_TOKEN_KEY,
} from 'src/constants/token/token.constants'

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: CONFIG.SERVER,
  headers: {
    [REQUEST_TOKEN_KEY]: `Bearer ${Token.getToken(ACCESS_TOKEN_KEY)}`,
  },
}

const customAxios = axios.create(axiosRequestConfig)

// requestInterceptor의 타입을 InternalAxiosRequestConfig으로 변경
customAxios.interceptors.request.use(
  requestInterceptor as (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
  (err: AxiosError) => Promise.reject(err)
)

customAxios.interceptors.response.use(
  (res: AxiosResponse) => res,
  ResponseHandler
)

export default customAxios

export const setAccessToken = (token: string) => {
  customAxios.defaults.headers[REQUEST_TOKEN_KEY] = `Bearer ${token}`
}
