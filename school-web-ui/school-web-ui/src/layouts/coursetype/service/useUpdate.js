import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (courseId, courseName) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        console.log(courseId, courseName);
        const request = {
          courseId,
          courseName,
        };
        const res = await httpservice.post(`CourseTypes/AddOrUpdate`, request, {
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
