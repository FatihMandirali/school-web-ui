import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useCreate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (
    teacherName,
    teacherSurname,
    tcPaspNo,
    emailAdress,
    branchId,
    phone,
    lessonId,
    classId,
    isOneOnOne
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          teacherName,
          teacherSurname,
          tcPaspNo,
          emailAdress,
          branchId,
          teacherPhone: phone.replace(/\s/g, "").substring(1),
          lessonId,
          classId,
          isBusy: isOneOnOne ? 1 : 0,
        };
        const res = await httpservice.post(`Teachers/AddOrUpdate`, request, {
          headers: { "content-type": "application/json" },
        });

        console.log(res);

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

  return { service, post };
};

export default useCreate;
