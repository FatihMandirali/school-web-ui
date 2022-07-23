import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useCreate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (firstName, surname, userName, roleId, pass, branch, tc) => {
    try {
      setService({ serviceStatus: "loading" });
      const request = {
        firstName,
        surname,
        userName,
        roleId,
        pass,
        adminId: 0,
        adminNo: tc,
        branchId: branch,
      };
      const res = await httpservice.post(`Admins/AddOrUpdate`, request, {
        headers: { "content-type": "application/json" },
      });

      const value = {
        ...res.data,
        serviceStatus: "loaded",
      };

      setService(value);
    } catch (error) {
      setService({ serviceStatus: "failed" });
    }
  };

  return { service, post };
};

export default useCreate;
