import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (page) => {
    try {
      setService({ serviceStatus: "loading" });
      console.log(page);
      const res = await httpservice.get(`Cover/StudentJoin`);
      console.log(res);
      const value = {
        data: res.data,
        serviceStatus: "loaded",
      };
      console.log(value);
      setService(value);
    } catch (error) {
      console.log("errorr", error);
      setService({ serviceStatus: "failed" });
    }
  };

  useEffect(() => {
    getData(page1);
  }, []);

  return { service, get: getData };
};

export default useList;
