import { useState } from "react";
import httpservice from "../../../httpservice/httpservice";

const useUpdate = () => {
  const [serviceUpdate, setService] = useState({ serviceStatus: "idle" });

  const post = async (totalAmount, firstPaymentDate, advanceAmount, installment, paymentType) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      try {
        setService({ serviceStatus: "loading" });
        const request = {
          totalAmount,
          firstPaymentDate,
          advanceAmount,
          installment,
          paymentType,
        };
        console.log(request);
        const res = await httpservice.post(`Admins/AddOrUpdate`, request, {
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

export default useUpdate;