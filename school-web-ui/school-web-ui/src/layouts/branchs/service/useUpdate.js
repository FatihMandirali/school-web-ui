import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (branchId, branchName, isActive) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        console.log(branchId, branchName, isActive);
        const request = {
          branchId,
          branchName,
          isActive: isActive === true ? 1 : 0,
        };
        const res = await httpservice.post(`Branchs/AddOrUpdate`, request, {
          headers: { "content-type": "application/json" },
        });

        console.log(res);

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

export default useUpdate;
