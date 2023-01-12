import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (
    classId // eslint-disable-next-line no-async-promise-executor
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        if (classId === undefined) return;
        setService({ serviceStatus: "loading" });
        console.log(classId);
        const res = await httpservice.get(`JoinTakesControllers/List?classId=${classId}`);
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

  useEffect(() => {
    getData(page1);
  }, []);

  return { service, getClassList: getData };
};

export default useList;
