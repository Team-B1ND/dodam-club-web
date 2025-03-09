import { InternalAxiosRequestConfig } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "../../constants/token/token.constants";

const requestInterceptor = (config: InternalAxiosRequestConfig, url: string): InternalAxiosRequestConfig => {
  if (
    token.getToken(REFRESH_TOKEN_KEY) === undefined
  ) {
    window.location.href = "https://dodam.b1nd.com/sign";
  } else {
    config.headers[REQUEST_TOKEN_KEY] = `Bearer ${token.getToken(ACCESS_TOKEN_KEY)}`
    }

  return config;
};

export default requestInterceptor;