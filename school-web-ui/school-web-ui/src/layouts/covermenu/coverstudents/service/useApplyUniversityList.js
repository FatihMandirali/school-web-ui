import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (id) =>
    new Promise(async (resolve) => {
      try {
        if (id === undefined || id <= 0) return;
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`University/SingleStudent?studentId=${id}`);
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
    getData(page1);
  }, []);

  return { service, getApplyUniversityList: getData };
};

export default useList;
