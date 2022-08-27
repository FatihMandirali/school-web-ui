import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useLessonByProgramList = () => {
  const [serviceLessonProgram, setService] = useState({ serviceStatus: "loading" });
  const getData = async (id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (id === undefined) return;
        const res = await httpservice.get(
          `LessonPrograming/ProgramingList?startDate=2022-08-24&endDate=2022-08-26&classId=${id}`
        );
        const value = {
          data: res.data,
          serviceStatus: "loaded",
        };
        console.log(value);
        setService(value);
        resolve(value);
      } catch (error) {
        console.log("errorr", error);
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  useEffect(() => {
    getData();
  }, []);

  return { serviceLessonProgram, getLessonProgram: getData };
};

export default useLessonByProgramList;
