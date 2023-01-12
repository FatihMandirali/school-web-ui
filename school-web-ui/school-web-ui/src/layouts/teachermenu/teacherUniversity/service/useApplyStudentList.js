import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = () => {
  const [serviceApplyStudentList, setService] = useState({ serviceStatus: "loading" });
  const getData = async (
    name // eslint-disable-next-line no-async-promise-executor
  ) =>
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        if (name === undefined) return;
        console.log(name);
        const res = await httpservice.get(`University/ApplyStudentList?universityName=${name}`);
        const value = {
          data: res.data,
          serviceStatus: "loaded",
        };
        setService(value);
        resolve(value);
      } catch (error) {
        console.log("errorr", error);
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: "Hata oluştu" });
      }
    });

  useEffect(() => {
    getData();
  }, []);

  return { serviceApplyStudentList, getApplyStudentList: getData };
};

export default useList;
