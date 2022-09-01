import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useLessonByProgramList = () => {
  const [serviceRollCall, setService] = useState({ serviceStatus: "loading" });
  const getData = async (id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (id === undefined) return;
        const res = await httpservice.get(
          `LessonPrograming/ProgramingList?startDate=2022-08-24&endDate=2022-08-26&classId=${id}&type=5`
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

  return { serviceRollCall, getRollCall: getData };
};

export default useLessonByProgramList;
