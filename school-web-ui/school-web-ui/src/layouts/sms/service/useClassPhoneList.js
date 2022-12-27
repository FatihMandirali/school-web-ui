import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useList = (page1) => {
  const [serviceClassList, setService] = useState({ serviceStatus: "loading" });
  const getData = async (id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`JoinTakesControllers/List?classId=${id}`);
        console.log(res);
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
    getData(page1);
  }, []);

  return { serviceClassList, getClassPhoneList: getData };
};

export default useList;
