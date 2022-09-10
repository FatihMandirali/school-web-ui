// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import { sessionStorageService } from "./sessionStorageService";

// eslint-disable-next-line import/prefer-default-export
export const jwtDecode = (() => {
  function getJwtDecode(tokenObj) {
    try {
      const decoded = jwt_decode(tokenObj);
      return decoded;
    } catch (e) {
      return null;
    }
  }
  function setTokeSave(tokenObj) {
    sessionStorageService.returnSetAccessToken(tokenObj);
  }

  return {
    returnGetJwtDecode: getJwtDecode,
    returnSetTokeSave: setTokeSave,
  };
})();
