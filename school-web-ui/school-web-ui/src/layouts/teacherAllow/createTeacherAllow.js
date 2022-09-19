import Card from "@mui/material/Card";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MDButton from "../../components/MDButton";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useCreate from "./service/useCreate";
import { validationSchema } from "./validations/userValidation";
import MDSnackbar from "../../components/MDSnackbar";
import useTeacherList from "./service/useTeacherList";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

function CreateTeacherAllow() {
  const { service, get } = useTeacherList();
  const { service: postService, post } = useCreate();
  const [sendForm, setSendForm] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [startClock, setStartClock] = useState("07:30");
  const [endClock, setEndClock] = useState("07:30");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Öğretmen başarılı bir şekilde eklendi."
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
  useEffect(async () => {
    await get();
  }, []);

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      teacherId: 0,
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await post(values.teacherId, `${startClock}-${endClock}`, values.dayId);
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/teacher_allow";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğretmen İzin Oluştur" />
      <MDBox>
        <Card>
          <form onSubmit={handleSubmit}>
            <MDBox pt={5} pb={3} px={3}>
              {service.serviceStatus === "loaded" && (
                <FormControl mb={5} fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Öğretmenler</InputLabel>
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
                    name="teacherId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {service.data.map((u) => (
                      <MenuItem key={u.TeacherId} value={u.TeacherId}>
                        {u.TeacherName} {u.TeacherSurname}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.teacherId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.teacherId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              <FormControl mb={5} fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Günler</InputLabel>
                <Select
                  label="Şube"
                  displayEmpty
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleChange}
                  defaultValue={1}
                  name="dayId"
                  className="specificSelectBox"
                >
                  <MenuItem key={1} value={1}>
                    Pazartesi
                  </MenuItem>
                  <MenuItem key={2} value={2}>
                    Salı
                  </MenuItem>
                  <MenuItem key={3} value={3}>
                    Çarşamba
                  </MenuItem>
                  <MenuItem key={4} value={4}>
                    Perşembe
                  </MenuItem>
                  <MenuItem key={5} value={5}>
                    Cuma
                  </MenuItem>
                  <MenuItem key={6} value={6}>
                    Cumartesi
                  </MenuItem>
                  <MenuItem key={7} value={7}>
                    Pazar
                  </MenuItem>
                </Select>
                {sendForm === true && errors.teacherId && (
                  <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">{errors.teacherId}</Alert>
                  </Stack>
                )}
              </FormControl>

              <Grid container spacing={0.5}>
                <Grid textAlign="center" bgcolor="white" item xs={6}>
                  <Box mt={2}>
                    <TextField
                      id="time"
                      label="Başlama Saati"
                      type="time"
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                      fullWidth
                      onChange={(event) => setStartClock(event.target.value)}
                    />
                  </Box>
                </Grid>
                <Grid textAlign="center" bgcolor="white" item xs={6}>
                  <Box mt={2}>
                    <TextField
                      id="time"
                      label="Bitiş Saati"
                      type="time"
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      sx={{ width: 150 }}
                      fullWidth
                      onChange={(event) => setEndClock(event.target.value)}
                    />
                  </Box>
                </Grid>
              </Grid>

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

export default CreateTeacherAllow;
