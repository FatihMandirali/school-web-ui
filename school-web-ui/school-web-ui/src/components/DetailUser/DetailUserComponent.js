import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { useState } from "react";
import MDInput from "../MDInput";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import { validationSchema } from "../../layouts/users/validations/userValidation";
import useUpdate from "../../layouts/users/service/useUpdate";
import useRoleList from "../../layouts/users/service/useRoleList";
import useBranchList from "../../layouts/users/service/useBranchList";
import useDelete from "../../layouts/users/service/useDelete";
import MDSnackbar from "../MDSnackbar";

function CreateUserComponent(props) {
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  console.log(props);
  const { service: postService, post } = useUpdate();
  const { serviceDelete, postDelete } = useDelete();
  const { serviceBranch } = useBranchList();
  const { service } = useRoleList();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sendForm, setSendForm] = useState(false);

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [firstName] = useState(props.adminName);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [surname] = useState(props.adminSurname);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [userName] = useState(props.username);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [roleId] = useState(props.adminRole);
  // eslint-disable-next-line react/prop-types,react/destructuring-assignment
  const [branchId] = useState(props.branchId);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminTcOrPasaportNo] = useState(props.tc);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [password] = useState(props.password);
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const [adminId] = useState(props.adminId);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const btnDeleteBranch = async () => {
    await postDelete(adminId);
    window.location.href = `/users`;
  };

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

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      firstName,
      surname,
      userName,
      roleId,
      branchId,
      pass: password,
      tc: adminTcOrPasaportNo,
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
        values.tc,
        1
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
    <div>
      <form onSubmit={handleSubmit}>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              onChange={handleChange}
              label="Adı"
              fullWidth
              value={values.firstName}
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
              value={values.surname}
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
              value={values.userName}
            />
            {sendForm === true && errors.userName && (
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">{errors.userName}</Alert>
              </Stack>
            )}
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              name="tc"
              type="text"
              onChange={handleChange}
              value={values.tc}
              label="TC"
              fullWidth
            />
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
              value={values.pass}
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
                defaultValue={values.roleId}
                name="roleId"
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
                defaultValue={values.branchId}
                name="branchId"
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

export default CreateUserComponent;
