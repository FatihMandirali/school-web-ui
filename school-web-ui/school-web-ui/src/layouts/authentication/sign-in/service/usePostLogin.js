import { useState } from "react";
import httpservice from "../../../../httpservice/httpservice";

const usePost = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (email, password) => {
    try {
      console.log(email, password);
      setService({ serviceStatus: "loading" });

      const res = await httpservice.post(`panel/club`, email, {
        headers: { "content-type": "multipart/form-data" },
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

export default usePost;
