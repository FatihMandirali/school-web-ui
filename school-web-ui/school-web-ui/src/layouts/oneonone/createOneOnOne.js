import { useEffect, useState } from "react";
import { FormControl, InputLabel, Modal, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import MDBox from "../../components/MDBox";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import useLessonByProgramList from "./service/useLessonByProgramList";
import useTeacherList from "./service/useTeacherList";
import useStudentList from "./service/useStudentList";
import useCreate from "./service/useCreate";
import MDSnackbar from "../../components/MDSnackbar";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import { validationSchema } from "./validations/oneOnOneValidation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreateOneOnOne() {
  const { serviceLessonList } = useLessonByProgramList();
  const { serviceTeacher } = useTeacherList();
  const { serviceStudent } = useStudentList();
  const { serviceCreate, postCreate } = useCreate();
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sendForm, setSendForm] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, Bire bir ders başarıyla eklendi."
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
  useEffect(async () => {}, []);

  const btnSaveOneonOne = async () => {
    openSuccessSB();
    setOpenModal(false);
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      lessonId: 0,
      teacherId: 0,
      studentId: 0,
      times: "",
      startTime: "",
      endTime: "",
    },
    validationSchema,
    // eslint-disable-next-line no-shadow
    onSubmit: async (values) => {
      const res = await postCreate(
        values.studentId,
        values.lessonId,
        values.teacherId,
        `${values.startTime}-${values.endTime}`,
        values.times
      );
      if (res.serviceStatus === "loaded") {
        openSuccessSB();
        window.location.href = "/oneonone";
      } else {
        setErrorMsg(res.errorMessage);
        openErrorSB();
      }
    },
  });

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Bire Bir Ders Oluştur" />
      <Card>
        <form onSubmit={handleSubmit}>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox mb={2}>
              <MDInput
                id="datetime-local"
                label="Tarih"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                name="times"
                onChange={handleChange}
              />
              {sendForm === true && errors.times && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.times}</Alert>
                </Stack>
              )}
            </MDBox>
            <MDBox mb={2}>
              <Grid container spacing={0.5}>
                <Grid textAlign="center" bgcolor="white" item xs={6}>
                  <Box>
                    <TextField
                      id="time"
                      label="Başlama Saati"
                      type="time"
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleChange}
                      name="startTime"
                    />
                    {sendForm === true && errors.startTime && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">{errors.startTime}</Alert>
                      </Stack>
                    )}
                  </Box>
                </Grid>
                <Grid textAlign="center" bgcolor="white" item xs={6}>
                  <Box>
                    <TextField
                      id="time"
                      label="Bitiş Saati"
                      type="time"
                      defaultValue="07:30"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      onChange={handleChange}
                      name="endTime"
                    />
                    {sendForm === true && errors.endTime && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">{errors.endTime}</Alert>
                      </Stack>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </MDBox>
            <MDBox>
              {serviceLessonList.serviceStatus === "loaded" && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Ders</InputLabel>
                  <Select
                    label="Ders"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="lessonId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceLessonList.data.map((u) => (
                      <MenuItem key={u.LessonId} value={u.LessonId}>
                        {u.LessonName}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.lessonId && (
                    <Stack sx={{ width: "100%" }}>
                      <Alert severity="error">{errors.lessonId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}
            </MDBox>
            <MDBox>
              {serviceTeacher.serviceStatus === "loaded" && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Öğretmen</InputLabel>
                  <Select
                    label="Öğretmen"
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
                    {serviceTeacher.data.map((u) => (
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
            </MDBox>
            <MDBox mb={2}>
              {serviceStudent.serviceStatus === "loaded" && (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-filled-label">Öğrenci</InputLabel>
                  <Select
                    label="Öğrenci"
                    displayEmpty
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    onChange={handleChange}
                    defaultValue={0}
                    name="studentId"
                    className="specificSelectBox"
                  >
                    <MenuItem key={0} value={0}>
                      Seçiniz
                    </MenuItem>
                    {serviceStudent.data.studentList.map((u) => (
                      <MenuItem key={u.StudentId} value={u.StudentId}>
                        {u.StudentName} {u.StudentSurname}
                      </MenuItem>
                    ))}
                    {serviceStudent.data.faceStudentList.map((u) => (
                      <MenuItem key={u.StudentId} value={u.StudentId}>
                        {u.StudentName} {u.StudentSurname}
                      </MenuItem>
                    ))}
                  </Select>
                  {sendForm === true && errors.studentId && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error">{errors.studentId}</Alert>
                    </Stack>
                  )}
                </FormControl>
              )}

              {sendForm === true && errors.lessonName && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert severity="error">{errors.lessonName}</Alert>
                </Stack>
              )}
            </MDBox>
            <MDBox mb={2}>
              {serviceCreate.serviceStatus === "loading" ? (
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
          </MDBox>
        </form>
      </Card>
      {renderSuccessSB}
      {renderErrorSB}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Birebir dersi onaylamak istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenModal(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => btnSaveOneonOne()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default CreateOneOnOne;
