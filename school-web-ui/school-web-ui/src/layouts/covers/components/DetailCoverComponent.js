import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import useUpdate from "../service/useUpdate";
import useDelete from "../service/useDelete";
import { validationSchema } from "../validations/coverValidation";
import MDSnackbar from "../../../components/MDSnackbar";

function CreateClasses(props) {
  const { service: postService, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [coverId] = useState(props.coverId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [coverName] = useState(props.coverName);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [coverSurname] = useState(props.coverSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [coverEmail] = useState(props.coverEmail);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [coverPhoneNumber, setCoverPhoneNumber] = useState(props.coverPhoneNumber);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const btnDeleteBranch = async () => {
    await postDelete(coverId);
    window.location.href = `/covers`;
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Veli başarılı bir şekilde güncellendi."
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
      coverName,
      coverId,
      coverSurname,
      coverEmail,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        values.coverName,
        values.coverId,
        values.coverSurname,
        values.coverEmail,
        coverPhoneNumber
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Sınıf Adı"
              fullWidth
              name="coverName"
              value={values.coverName}
            />
            {sendForm === true && errors.coverName && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.coverName}</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Veli Soyadı"
              fullWidth
              name="coverSurname"
              value={values.coverSurname}
            />
            {sendForm === true && errors.coverSurname && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.coverSurname}</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Veli Mail"
              fullWidth
              name="coverEmail"
              value={values.coverEmail}
            />
            {sendForm === true && errors.coverEmail && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.coverEmail}</Alert>
              </Stack>
            )}
          </MDBox>

          <MDBox mb={2}>
            <MuiPhoneNumber
              onChange={(e) => setCoverPhoneNumber(e)}
              defaultCountry="tr"
              name="coverPhoneNumber"
              fullWidth
              value={coverPhoneNumber}
            />
          </MDBox>

          {postService.serviceStatus === "loading" ? (
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
    </>
  );
}

export default CreateClasses;
