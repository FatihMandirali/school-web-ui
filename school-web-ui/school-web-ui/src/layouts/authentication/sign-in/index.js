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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import usePost from "./service/usePostLogin";
import useLoginType from "./service/useLoginType";
import { validationSchema } from "./validations/signInValidation";
import MDSnackbar from "../../../components/MDSnackbar";
import { jwtDecode } from "../../../httpservice/jwtDecode";
import { sessionStorageService } from "../../../httpservice/sessionStorageService";

function Basic() {
  const [email] = useState("");
  const [password] = useState("");
  const [roleName] = useState("NONE");
  const { post } = usePost();
  const { service } = useLoginType();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler,Giriş başarılı"
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

  useEffect(() => {
    const token = sessionStorageService.returnGetAccessToken();
    if (token !== undefined && token !== "" && token !== null) window.location.href = "/users";
  }, []);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email,
      password,
      roleName,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.email, values.password, values.roleName);
      console.log(res);
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        jwtDecode.returnSetTokeSave(res.token);
        window.location.href = "/users";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1} />
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <form onSubmit={handleSubmit}>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              {service.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Giriş Türü</InputLabel>
                  <Select
                    label="Giriş Türü"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={values.roleName}
                    name="roleName"
                  >
                    <MenuItem key={0} value="NONE">
                      Seçiniz
                    </MenuItem>
                    {service.data.map((u) => (
                      <MenuItem key={u.RoleId} value={u.RoleName}>
                        {u.RoleValue}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.roleName && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.roleName}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Kullanıcı Adı"
                  fullWidth
                  name="email"
                  value={values.email}
                />
                {sendForm === true && errors.email && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.email}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  onChange={handleChange}
                  label="Password"
                  fullWidth
                  name="password"
                  value={values.password}
                />
                {sendForm === true && errors.password && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.password}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton type="submit" onClick={() => setSendForm(true)} color="info" fullWidth>
                  sign in
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </form>
        {renderSuccessSB}
        {renderErrorSB}
      </Card>
    </BasicLayout>
  );
}

export default Basic;
