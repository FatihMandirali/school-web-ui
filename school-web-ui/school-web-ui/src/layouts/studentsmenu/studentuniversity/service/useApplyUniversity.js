import { useState } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useApplyUniversity = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (universityName) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.post(`University/Add?universityName=${universityName}`, {
          headers: { "content-type": "application/json" },
        });

        const value = {
          ...res.data,
          serviceStatus: "loaded",
        };

        setService(value);
        resolve(value);
      } catch (error) {
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  return { service, post };
};

export default useApplyUniversity;
