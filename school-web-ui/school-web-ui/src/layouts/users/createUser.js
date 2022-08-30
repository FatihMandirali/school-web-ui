import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MDInput from "../../components/MDInput";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useRoleList from "./service/useRoleList";
import useCreate from "./service/useCreate";
import useBranchList from "./service/useBranchList";
import { validationSchema } from "./validations/userValidation";
import MDSnackbar from "../../components/MDSnackbar";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import "../../assets/selectbox/selectbox.css";

function CreateUser() {
  const { service, get } = useRoleList();
  const { serviceBranch, getBranch } = useBranchList();
  const { service: postService, post } = useCreate();
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
      content="Tebrikler, Kullanıcı başarılı bir şekilde eklendi."
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
    get();
    getBranch();
  }, []);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      firstName: "",
      surname: "",
      userName: "",
      roleId: 0,
      branchId: 0,
      pass: "",
      tc: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(
        values.firstName,
        values.surname,
        values.userName,
        values.roleId,
        values.pass,
        values.branchId,
        values.tc
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
    <DashboardLayout>
      <DashboardNavbar pageName="Kullanıcı Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Adı"
                  fullWidth
                  name="firstName"
                />
                {sendForm === true && errors.firstName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.firstName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  onChange={handleChange}
                  label="Soyad"
                  fullWidth
                  name="surname"
                />
                {sendForm === true && errors.surname && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.surname}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="userName"
                  type="text"
                  onChange={handleChange}
                  label="Kullanıcı Adı"
                  fullWidth
                />
                {sendForm === true && errors.userName && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.userName}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput name="tc" type="text" onChange={handleChange} label="TC" fullWidth />
                {sendForm === true && errors.tc && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.tc}</Alert>
                  </Stack>
                )}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  onChange={handleChange}
                  label="Şifre"
                  fullWidth
                  name="pass"
                />
                {sendForm === true && errors.pass && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.pass}</Alert>
                  </Stack>
                )}
              </MDBox>
              {service.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Rolü</InputLabel>
                  <Select
                    label="Rolü"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="roleId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {service.data.map((u) => (
                      <MenuItem key={u.RoleId} value={u.RoleId}>
                        {u.RoleName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.roleId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.roleId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              {serviceBranch.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Şube</InputLabel>
                  <Select
                    label="Şube"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="branchId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceBranch.data.map((u) => (
                      <MenuItem key={u.BranchId} value={u.BranchId}>
                        {u.BranchName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.branchId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.branchId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}
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

export default CreateUser;
