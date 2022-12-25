import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async () =>
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`University/ActiveList`);
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

  return { service, getActiveUniversityList: getData };
};

export default useList;