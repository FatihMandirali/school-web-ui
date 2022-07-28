import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../MDInput";
import MDButton from "../MDButton";
import MDBox from "../MDBox";
import useUpdate from "../../layouts/finance/service/useUpdate";
import useDelete from "../../layouts/finance/service/useDelete";
import { validationSchema } from "../../layouts/finance/validations/financeValidation";
import MDSnackbar from "../MDSnackbar";

function DetailFinance(props) {
  const { post, service } = useUpdate();
  const { postDelete, serviceDelete } = useDelete();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [finansTypeId] = useState(props.finansTypeId);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [finansTypeName] = useState(props.finansTypeName);

  const btnDeleteBranch = async () => {
    await postDelete(finansTypeId);
    window.location.href = `/finances`;
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
      content="Tebrikler, Finans türü başarılı bir şekilde güncellendi."
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
      finansTypeId,
      finansTypeName,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.finansTypeId, values.finansTypeName);
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
              label="Finans Türü"
              fullWidth
              name="finansTypeName"
              value={values.finansTypeName}
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

export default DetailFinance;
