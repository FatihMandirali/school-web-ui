import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (password, newPassword) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          password,
          newPassword,
        };
        await httpservice.post(`PasswordManagement`, request, {
          headers: { "content-type": "application/json" },
        });

        const value = {
          serviceStatus: "loaded",
        };
        console.log(value);
        setService(value);
        resolve(value);
      } catch (error) {
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: "Şifre değiştirilemedi" });
      }
    });

  return { service, post };
};

export default useUpdate;
