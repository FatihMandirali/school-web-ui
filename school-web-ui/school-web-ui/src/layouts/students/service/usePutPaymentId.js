import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const usePutPaymentId = () => {
  const [serviceUpdate, setService] = useState({ serviceStatus: "idle" });

  const post = async (id, status) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.put(`StudentPayment/EventChange/?id=${id}&status=${status}`, {
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
        resolve({ serviceStatus: "loaded", errorMessage: error.response.data });
      }
    });

  return { serviceUpdate, post };
};

export default usePutPaymentId;
