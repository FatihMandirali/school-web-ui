import { useState } from "react";
import httpservice from "../../../../httpservice/httpservice";

const usePost = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (userName, password, roleName) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          userName,
          password,
          roleName,
        };
        console.log(request);
        const res = await httpservice.post(`Login`, request, {
          headers: { "content-type": "application/json" },
        });

        const value = {
          ...res.data.accessToken,
          serviceStatus: "loaded",
        };
        localStorage.setItem("fullName", res.data.fullName);
        setService(value);
        resolve(value);
      } catch (error) {
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  return { service, post };
};

export default usePost;
