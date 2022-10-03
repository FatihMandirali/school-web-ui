import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useCreate = () => {
  const [service, setService] = useState({ serviceStatus: "idle" });

  const post = async (
    studentNo,
    studentName,
    studentSurName,
    studentIdName,
    adress,
    country,
    email,
    classId,
    branchId,
    phone,
    studentPerId,
    studentPerId2,
    studentPerId3,
    isActiveRecord,
    schoolName
  ) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          studentNo,
          studentName,
          studentSurName,
          studentIdName,
          adress,
          country,
          email,
          classId,
          branchId,
          phoneNumber: phone,
          studentPerId,
          studentPerId2,
          studentPerId3,
          isAnswered: isActiveRecord ? 1 : 0,
          password: studentNo,
          schoolName,
        };
        console.log(request);
        const res = await httpservice.post(`Students/Add`, request, {
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
