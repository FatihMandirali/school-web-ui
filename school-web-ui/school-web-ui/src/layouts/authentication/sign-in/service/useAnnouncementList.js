import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const useList = () => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async (locationId) => {
    try {
      setService({ serviceStatus: "loading" });
      console.log(locationId);
      const res = await httpservice.get(
        `Announcements/List?locationId=${locationId === undefined ? 0 : locationId}`
      );
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

  return { service, get: getData };
};

export default useList;