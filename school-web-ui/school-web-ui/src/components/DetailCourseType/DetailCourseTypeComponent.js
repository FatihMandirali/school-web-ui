import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../MDInput";
import MDButton from "../MDButton";
import MDBox from "../MDBox";
import useUpdate from "../../layouts/coursetype/service/useUpdate";
import useDelete from "../../layouts/coursetype/service/useDelete";
import { validationSchema } from "../../layouts/coursetype/validations/courseTypeValidation";
import MDSnackbar from "../MDSnackbar";

function DetailCourseType(props) {
  const { post, service } = useUpdate();
  const { postDelete, serviceDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [courseId] = useState(props.courseId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [courseName] = useState(props.courseName);

  const btnDeleteBranch = async () => {
    await postDelete(courseId);
    window.location.href = `/courseTypes`;
  };
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Kurs türü başarılı bir şekilde güncellendi."
      dateTime="şimdi"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Hata"
      content={errorMsg}
      dateTime="now"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      courseId,
      courseName,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.courseId, values.courseName);
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Kurs Türü"
              fullWidth
              name="courseName"
              value={values.courseName}
            />
            {sendForm === true && errors.courseName && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.courseName}</Alert>
              </Stack>
            )}
          </MDBox>
          {service.serviceStatus === "loading" ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" onClick={() => setSendForm(true)} color="dark" fullWidth>
                Güncelle
              </MDButton>
            </MDBox>
          )}

          {serviceDelete.serviceStatus === "loading" ? (
            <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
              <CircularProgress color="secondary" />
            </Stack>
          ) : (
            <MDBox mt={4} mb={1}>
              <MDButton type="button" onClick={() => btnDeleteBranch()} color="error" fullWidth>
                SİL
              </MDButton>
            </MDBox>
          )}
        </MDBox>
      </form>
      {renderSuccessSB}
      {renderErrorSB}
    </div>
  );
}

export default DetailCourseType;
