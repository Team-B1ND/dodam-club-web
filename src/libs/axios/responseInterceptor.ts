import { AxiosError } from "axios";
import token from "../token/token";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, REQUEST_TOKEN_KEY } from "src/constants/token/token.constants";
import customAxios from "./customAxios";
import { refreshApi } from "src/api/axios/axios.api";

let isRefreshing = false;
const refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
};

const addRefeshSubscriber = (callback: (accessToken: string) => void) => {
  refreshSubscribers.push(callback);
};

const ResponseHandler = async (error: AxiosError) => {
  if (error.response) {
    const {
      config: originalRequest,
      response: { status },
    } = error;

    const usingAccessToken = token.getToken(ACCESS_TOKEN_KEY);
    const usingRefreshToken = token.getToken(REFRESH_TOKEN_KEY);

    if (status === 401 && usingAccessToken !== undefined && usingRefreshToken !== undefined && !isRefreshing) {
      isRefreshing = true;

      try {
        const {data: newAccessToken} = await refreshApi(usingAccessToken)
        customAxios.defaults.headers.common[REQUEST_TOKEN_KEY] = `Bearer ${newAccessToken}`;

        token.setToken(ACCESS_TOKEN_KEY, newAccessToken);

        isRefreshing = false;
        onTokenRefreshed(newAccessToken);

        return new Promise((resolve) => {
          addRefeshSubscriber((accessToken: string) => {
            originalRequest!.headers![REQUEST_TOKEN_KEY] = `Bearer ${accessToken}`;
            resolve(customAxios(originalRequest!));
          });
        });
      } catch (error) {
        console.error("Failed to refresh access token:", error);
        token.clearToken();
        window.alert("세션이 만료되었습니다.");
        window.location.href = "https://dodam.b1nd.com/sign";
      }
    }
  }

  return Promise.reject(error);
};

export default ResponseHandler;