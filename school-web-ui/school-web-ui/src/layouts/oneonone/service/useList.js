import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get(`Classes/List`);
      const value = {
        data: res.data,
        serviceStatus: "loaded",
      };
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
