import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useTeacherList = () => {
  const [serviceCourse, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get(`CourseTypes/List`);
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

  return { serviceCourse, getCourse: getData };
};

export default useTeacherList;
