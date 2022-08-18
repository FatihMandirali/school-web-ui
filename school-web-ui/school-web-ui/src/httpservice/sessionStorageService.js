export const sessionStorageService = (() => {
  function setAccessToken(tokenObj) {
    sessionStorage.setItem("access_token", tokenObj);
  }
  function setCurrentRole(tokenObj) {
    sessionStorage.setItem("current_role", tokenObj);
  }
  function setRefreshToken(tokenObj) {
    sessionStorage.setItem("refresh_token", tokenObj);
  }
  function setRollCall(tokenObj) {
    sessionStorage.setItem("roll_call", tokenObj);
  }
  function getRollCall() {
    return sessionStorage.getItem("roll_call");
  }
  function getAccessToken() {
    return sessionStorage.getItem("access_token");
  }
  function getCurrentRole() {
    return sessionStorage.getItem("current_role");
  }
  function getRefreshToken() {
    return sessionStorage.getItem("refresh_token");
  }
  function clearToken() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  }
  return {
    returnSetAccessToken: setAccessToken,
    returnSetRefreshToken: setRefreshToken,
    returnGetAccessToken: getAccessToken,
    returnGetRefreshToken: getRefreshToken,
    returnClearToken: clearToken,
    returnGetCurrentRole: getCurrentRole,
    returnSetCurrentRole: setCurrentRole,
    returnSetRollCall: setRollCall,
    returnGetRollCall: getRollCall,
  };
})();
export const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return null;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const clearState = () => {
  try {
    sessionStorage.removeItem("state");
  } catch (error) {
    console.error(error);
  }
};
