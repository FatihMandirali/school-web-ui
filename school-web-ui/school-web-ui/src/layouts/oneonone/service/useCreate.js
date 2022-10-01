import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useCreate = () => {
  const [serviceCreate, setService] = useState({ serviceStatus: "idle" });

  const post = async (studentId, lessonId, teacherId, clockTime, times) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          studentId,
          lessonId,
          teacherId,
          clockTime,
          times,
        };
        const res = await httpservice.post(`OneOnOne/AddOrUpdate`, request, {
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

  return { serviceCreate, postCreate: post };
};

export default useCreate;
