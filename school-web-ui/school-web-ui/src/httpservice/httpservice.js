import axios from "axios";
import { sessionStorageService } from "./sessionStorageService";

const instance = axios.create({ baseURL: "http://localhost:5246/api/" });

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/authentication/sign-in";
    }
    if (error.response.status === 403) {
      window.location.href = "/unauthorization";
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorageService.returnGetAccessToken();
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${sessionStorageService.returnGetAccessToken()}`;
    if (token === null && window.location.href.indexOf("authentication/sign-in") < 0) {
      window.location.href = "/authentication/sign-in";
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
