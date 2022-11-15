import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useCreate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = (studentId, name, surName, idNo, email, phone, chooseLesson, schoolName) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          studentId,
          name,
          surName,
          idNo,
          email,
          phone: phone.replace(/\s/g, "").substring(1),
          lessonCountDetails: chooseLesson,
          schoolName,
        };
        console.log(request);
        const res = await httpservice.post(`FaceStudent/AddFaceStudent`, request, {
          headers: { "content-type": "application/json" },
        });

        const value = {
          ...res.data,
          serviceStatus: "loaded",
        };
        console.log(value);

        setService(value);
        resolve(value);
      } catch (error) {
        console.log(error);
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });

  return { service, post };
};

export default useCreate;
