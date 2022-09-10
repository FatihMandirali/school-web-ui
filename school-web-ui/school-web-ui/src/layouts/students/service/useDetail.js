import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useList = (id) => {
  const [serviceDetail, setServiceDetail] = useState({ serviceStatus: "loading" });
  // eslint-disable-next-line no-shadow
  const getDetail = async (id) => {
    try {
      setServiceDetail({ serviceStatus: "loading" });
      if (id === undefined) return;
      const res = await httpservice.get(`Students/Details?studentId=${id}`);
      const value = {
        data: res.data,
        serviceStatus: "loaded",
      };
      console.log(value);
      setServiceDetail(value);
    } catch (error) {
      console.log("errorr", error);
      setServiceDetail({ serviceStatus: "failed" });
    }
  };

  useEffect(() => {
    getDetail(id);
  }, []);

  return { serviceDetail, getDetail };
};

export default useList;
