import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../MDInput";
import MDButton from "../MDButton";
import MDBox from "../MDBox";
import useUpdate from "../../layouts/branchs/service/useUpdate";
import useDelete from "../../layouts/branchs/service/useDelete";
import { validationSchema } from "../../layouts/branchs/validations/branchValidation";
import MDSnackbar from "../MDSnackbar";

function CreateUser(props) {
  const { post, service } = useUpdate();
  const { postDelete, serviceDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [isChecked] = useState(true);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [branchId] = useState(props.branchId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [branchName] = useState(props.branchName);

  const btnDeleteBranch = async () => {
    await postDelete(branchId);
    window.location.href = `/branchs`;
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
      content="Tebrikler, Şube başarılı bir şekilde güncellendi."
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
      branchId,
      branchName,
      isChecked,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.branchId, values.branchName, isChecked);
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
              label="Şube Adı"
              fullWidth
              name="branchName"
              value={values.branchName}
            />
            {sendForm === true && errors.branchName && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.branchName}</Alert>
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

export default CreateUser;
