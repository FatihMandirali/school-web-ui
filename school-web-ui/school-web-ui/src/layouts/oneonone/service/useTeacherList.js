import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useTeacherList = () => {
  const [serviceTeacher, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get(`Teachers/OneOnOneTeacherList`);
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

  return { serviceTeacher, getTeacher: getData };
};

export default useTeacherList;
