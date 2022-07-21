import axios from "axios";
// import { sessionStorageService } from "./sessionStorageService";

const instance = axios.create({ baseURL: "http://localhost:5246/api/" });

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("errorrr");
    console.log(error);
    if (error.response.status === 401) {
      // Add Logic to
      // 1. Redirect to login page or
      // 2. Request refresh token
      console.log("errorrr 401");
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) =>
    // const token = sessionStorageService.returnGetAccessToken();
    // if (token === null && window.location.href.indexOf("authentication/sign-in") < 0) {
    //  window.location.href = "/authentication/sign-in";
    // }

    config,
  (error) => {
    Promise.reject(error);
  }
);
export default instance;
