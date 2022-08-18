/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useTeacherListByClass from "./service/useTeacherListByClass";
import useLessonByProgramList from "./service/useLessonByProgramList";
import LessonProgramComponent from "./components/LessonProgramComponent";

function Tables() {
  const { id } = useParams();
  const { serviceTeacher, getTeacher } = useTeacherListByClass();
  const { serviceLessonList, getLesson } = useLessonByProgramList();

  useEffect(async () => {
    await getTeacher(id);
    await getLesson();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {serviceTeacher.serviceStatus === "loaded" &&
        serviceLessonList.serviceStatus === "loaded" && (
          <LessonProgramComponent
            id={id}
            lessons={serviceLessonList.data}
            teachers={serviceTeacher.data}
          />
        )}
    </>
  );
}

export default Tables;
