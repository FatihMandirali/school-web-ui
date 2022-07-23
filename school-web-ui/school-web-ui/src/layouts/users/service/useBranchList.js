import { useState, useEffect } from "react";
import httpservice from "../../../httpservice/httpservice";

const useBranchList = () => {
  const [serviceBranch, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get(`Branchs/List`);
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

  return { serviceBranch, getBranch: getData };
};

export default useBranchList;
