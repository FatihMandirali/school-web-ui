import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useDelete = () => {
  const [serviceDelete, setService] = useState({ serviceStatus: "idle" });

  const postDelete = async (announcementsId) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });

        const res = await httpservice.delete(
          `Announcements/Delete?announcementsId=${announcementsId}`,
          {
            headers: { "content-type": "application/json" },
          }
        );

        const value = {
          ...res.data,
          serviceStatus: "loaded",
        };

        setService(value);
        resolve(value);
      } catch (error) {
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  return { serviceDelete, postDelete };
};

export default useDelete;
