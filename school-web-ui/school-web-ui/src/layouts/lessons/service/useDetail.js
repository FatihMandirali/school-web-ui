import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useDetail = (id) => {
  const [serviceDetail, setServiceDetail] = useState({ serviceStatus: "loading" });
  // eslint-disable-next-line no-shadow
  const getDetail = async (id) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setServiceDetail({ serviceStatus: "loading" });
        const res = await httpservice.get(`Lessons/${id}`);
        const value = {
          data: res.data,
          serviceStatus: "loaded",
        };
        setServiceDetail(value);
        resolve(value);
      } catch (error) {
        console.log("errorr", error);
        setServiceDetail({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  useEffect(() => {
    getDetail(id);
  }, []);

  return { serviceDetail, getDetail };
};

export default useDetail;
