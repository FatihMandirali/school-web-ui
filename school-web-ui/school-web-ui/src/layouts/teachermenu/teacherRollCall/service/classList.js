import { useState, useEffect } from "react";
import httpservice from "../../../../httpservice/httpservice";

const classList = (page1) => {
  const [service, setService] = useState({ serviceStatus: "loading" });
  const getData = async () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      let now = new Date().toLocaleDateString("en-us", { weekday: "long" });
      console.log("now", now);
      try {
        setService({ serviceStatus: "loading" });
        const res = await httpservice.get(`Teachers/classProgram`);
        const filtered = res.data.filter((e) => {
          if (now === "Monday") {
            return e.DayName === "Monday";
          } else if (now === "Tuesday") {
            return e.DayName === "Tuesday";
          } else if (now === "Wednesday") {
            return e.DayName === "Wednesday";
          } else if (now === "Thursday") {
            return e.DayName === "Thursday";
          } else if (now === "Friday") {
            return e.DayName === "Friday";
          } else if (now === "Saturday") {
            return e.DayName === "Saturday";
          } else if (now === "Sunday") {
            return e.DayName === "Sunday";
          }
        });
        console.log("filtered", filtered);
        const value = {
          data: filtered,
          serviceStatus: "loaded",
        };
        console.log(value);
        setService(value);
        resolve(value);
      } catch (error) {
        console.log("errorr", error);
        setService({ serviceStatus: "failed" });
        resolve({ serviceStatus: "failed", errorMessage: error.response.data });
      }
    });
  return { service, get: getData };
};

export default classList;
