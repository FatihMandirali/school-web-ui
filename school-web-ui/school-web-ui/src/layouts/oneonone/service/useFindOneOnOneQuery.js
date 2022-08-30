import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useBranchList = () => {
  const [serviceOneonOne, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get(`Brancdsghs/Lissdgt?LessonId=3&Date=10-10-2020`);
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
    getData();
  }, []);

  return { serviceOneonOne, getOneonOne: getData };
};

export default useBranchList;
