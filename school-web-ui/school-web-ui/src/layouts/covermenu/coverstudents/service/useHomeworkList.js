import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useHomeworkList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (times, classId) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (classId === undefined) return;
        const res = await httpservice.get(
          `Homework/ListForStudentAndCover?times=${times}&classId=${classId}`
        );
        const value = {
          data: res.data,
          serviceStatus: "loaded",
        };
        setService(value);
        resolve(value);
      } catch (error) {
        console.log("errorr", error);
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  useEffect(() => {
    getData(page1);
  }, []);

  return { service, get: getData };
};

export default useHomeworkList;
