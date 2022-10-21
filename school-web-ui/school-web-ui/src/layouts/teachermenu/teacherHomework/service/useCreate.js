import { useState } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useCreate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (description, lessonId, classId) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          description,
          lessonId,
          classId,
        };
        const res = await httpservice.post(`Homework/Add`, request, {
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

export default useCreate;
