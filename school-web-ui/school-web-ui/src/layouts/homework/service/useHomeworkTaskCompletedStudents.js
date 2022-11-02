import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useRollCallStudentList = () => {
  const [serviceRollCallStudent, setService] = useState({ serviceStatus: "loading" });
  const getData = async (id, homeworkId) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (id === undefined) return;
        const res = await httpservice.get(`Homework/HomeworkControlAndCheck?homewprkId=${homeworkId}&classId=${id}`);
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
    getData();
  }, []);

  return { serviceRollCallStudent, getTasksCompletedStudents: getData };
};

export default useRollCallStudentList;
