import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [serviceUpdate, setService] = useState({ serviceStatus: "idle" });

  const post = async (
    studentId,
    studentNo,
    studentName,
    studentSurName,
    studentIdName,
    adress,
    country,
    email,
    classId,
    branchId,
    studentPhoneNumber,
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
          studentId,
          studentNo,
          studentName,
          studentSurName,
          studentIdName,
          classId,
          branchId,
          studentPerId,
          email,
          phoneNumber: studentPhoneNumber.replace(/\s/g, "").substring(1),
          studentPerId2,
          studentPerId3,
          adress,
          country,
          schoolName,
        };
        console.log(request);
        const res = await httpservice.put(`Students/Update`, request, {
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

  return { serviceUpdate, post };
};

export default useUpdate;
