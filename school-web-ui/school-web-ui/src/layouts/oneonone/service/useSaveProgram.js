import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";
import lessonProgram from "../prepareData/lessonProgram";

const useUpdate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = (data, id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = await lessonProgram(data, id);
        const res = await httpservice.post(`LessonPrograming/ProgramAddOrUpdate`, request, {
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
