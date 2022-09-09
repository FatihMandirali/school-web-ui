import Card from "@mui/material/Card";
import { useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MuiPhoneNumber from "material-ui-phone-number";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import { validationSchema } from "./validations/faceStudentValidation";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateFinance() {
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Birebir öğrenci başarılı bir şekilde eklendi."
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

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      surName: "",
      idNo: "",
      email: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.name, values.surName, values.idNo, values.email, phone);
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/faceStudent";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Birebir Öğrenci Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput type="text" onChange={handleChange} label="Adı" fullWidth name="name" />
                {sendForm === true && errors.name && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.name}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Soyadı"
                  fullWidth
                  name="surName"
                />
                {sendForm === true && errors.surName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.surName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Öğrenci numarası"
                  fullWidth
                  name="idNo"
                />
                {sendForm === true && errors.idNo && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.idNo}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" onChange={handleChange} label="Mail" fullWidth name="email" />
                {sendForm === true && errors.email && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.email}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MuiPhoneNumber
                  onChange={(e) => setPhone(e)}
                  defaultCountry="tr"
                  name="phone"
                  fullWidth
                />
                {sendForm === true && phone.length <= 0 && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">Telefon numarasını girin</Alert>
                  </Stack>
                )}
              </MDBox>

              {postService.serviceStatus === "loading" ? (
                <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
                  <CircularProgress color="secondary" />
                </Stack>
              ) : (
                <MDBox mt={4} mb={1}>
                  <MDButton type="submit" onClick={() => setSendForm(true)} color="dark" fullWidth>
                    Oluştur
                  </MDButton>
                </MDBox>
              )}
            </MDBox>
          </form>
        </Card>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
    </DashboardLayout>
  );
}

export default CreateFinance;
