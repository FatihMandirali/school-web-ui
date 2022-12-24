import { useState } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useApplyUniversity = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const get = async (id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        if (id === undefined) return;
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`University/SingleStudent?studentId=${id}`, {
          headers: { "content-type": "application/json" },
        });

        const value = {
          data: res.data,
          serviceStatus: "loaded",
        };

        setService(value);
        resolve(value);
      } catch (error) {
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  return { service, getStudentUniversity: get };
};

export default useApplyUniversity;
