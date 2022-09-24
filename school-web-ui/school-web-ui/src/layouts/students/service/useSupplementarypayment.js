import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [servicePayment, setService] = useState({ serviceStatus: "idle" });

  const post = async (id, amount) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          id,
          amount,
        };
        console.log(request);
        const res = await httpservice.post(
          `StudentPayment/DownPayment?studentId=${id}&amount=${amount}`,
          request,
          {
            headers: { "content-type": "application/json" },
          }
        );

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

  return { servicePayment, postPayment: post };
};

export default useUpdate;
