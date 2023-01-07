import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (
    date // eslint-disable-next-line no-async-promise-executor
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (date === undefined) return;
        console.log(date);
        const res = await httpservice.get(`JoinTakesControllers/ListJoinTeacher?startDate=${date}`);
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

  return { service, get: getData };
};

export default useList;
