// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { clearState, loadState, sessionStorageService } from "./sessionStorageService";

export const logout = () => {
  sessionStorageService.returnClearToken();
  clearState();
};

const checkAccessTokenIsValid = () => {
  const ACCESS_TOKEN = sessionStorageService.returnGetAccessToken();
  if (ACCESS_TOKEN) {
    try {
      const decoded = jwt_decode(ACCESS_TOKEN);

      const exp = Number(decoded.exp);
      if (exp && Date.now() < exp * 1000) {
        return true;
      }
      logout();
      return false;
    } catch (_) {
      logout();
      return false;
    }
  }
  return false;
};

const handleTokenValidity = () =>
  new Promise((resolve, reject) => {
    const ACCESS_TOKEN = sessionStorageService.returnGetAccessToken();
    const STATE = loadState();
    if (ACCESS_TOKEN == null || STATE == null) {
      logout();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(true);
    } else {
      const isTokenValid = checkAccessTokenIsValid();

      if (!isTokenValid) {
        logout();
        // eslint-disable-next-line prefer-promise-reject-errors
        reject(false);
      }
      resolve(true);
    }
  });

export default handleTokenValidity;
