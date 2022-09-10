import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useClassList = () => {
  const [serviceClass, setService] = useState({ serviceStatus: "loading" });
  const getData = async (branchId) => {
    try {
      setService({ serviceStatus: "loading" });
      if (branchId === undefined) return;
      const res = await httpservice.get(`Classes/GetClassesByBranchId/${branchId}`);
      console.log(res);
      const value = {
        data: res.data,
        serviceStatus: "loaded",
      };
      console.log(value);
      setService(value);
    } catch (error) {
      console.log("errorr", error);
      setService({ serviceStatus: "failed" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { serviceClass, getClass: getData };
};

export default useClassList;
