import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (
    coverName,
    coverId,
    coverSurname,
    coverEmail,
    coverPhoneNumber,
    coverPhoneNumber2
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          coverName,
          coverId,
          coverSurname,
          coverEmail,
          coverPhoneNumber: coverPhoneNumber.replace(/\s/g, "").substring(1),
          coverPhoneNumber2: coverPhoneNumber2.replace(/\s/g, "").substring(1),
        };
        const res = await httpservice.post(`Cover/AddOrUpdate`, request, {
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

export default useUpdate;
