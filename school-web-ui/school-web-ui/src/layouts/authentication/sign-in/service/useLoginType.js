import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useLoginType = () => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async () => {
    try {
      setService({ serviceStatus: "loading" });
      const res = await httpservice.get("Roles/LoginRoleList");
      console.log(res);
      const value = {
        data: res.data,
        serviceStatus: "loaded",
      };
      setService(value);
      console.log(value);
    } catch (error) {
      console.log("errorr", error);
      setService({ serviceStatus: "failed" });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { service, get: getData };
};

export default useLoginType;
