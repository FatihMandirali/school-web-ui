import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useList = () => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`Cover/List`);
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
    getData();
  }, []);

  return { service, getCover: getData };
};

export default useList;
