import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useTeacherList = () => {
  const [serviceTeacher, setService] = useState({ serviceStatus: "loading" });
  const getData = async (classId) => {
    try {
      setService({ serviceStatus: "loading" });
      if (classId === undefined) return;
      const res = await httpservice.get(`Teachers/GetTeacherByClassId/${classId}`);
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
