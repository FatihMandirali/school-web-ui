import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useLessonList = () => {
  const [serviceLesson, setService] = useState({ serviceStatus: "loading" });
  const getData = async () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`Lessons/List`);
        console.log(res);
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

  return { serviceLesson, getLesson: getData };
};

export default useLessonList;
