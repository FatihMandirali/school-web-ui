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

// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, Select } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import Icon from "@mui/material/Icon";
import MDTypography from "../../components/MDTypography";
import useTeacherListByClass from "./service/useTeacherListByClass";
import useLessonList from "./service/useLessonList";
import MDButton from "../../components/MDButton";

function Tables() {
  const { id } = useParams();
  const { serviceTeacher, getTeacher } = useTeacherListByClass();
  const { service, get } = useLessonList();
  const [program, setProgram] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [teacherId, setTeacherId] = useState(0);
  const [lessonId, setLessonId] = useState(0);
  const [sendForm, setSendForm] = useState(false);
  const [startClock, setStartClock] = useState("07:30");
  const [endClock, setEndClock] = useState("07:30");
  const [day, setDay] = useState("");

  useEffect(async () => {
    setProgram([
      {
        id: 1,
        day: "monday",
        clock: "09:00 - 10:00",
        teacherId: 1,
        teacherName: "Fatih Mandıralı",
        lessonId: 1,
        lessonName: "Fizik",
      },
      {
        id: 2,
        day: "tuesday",
        clock: "09:50 - 10:50",
        teacherId: 1,
        teacherName: "Ayşe Mandıralı",
        lessonId: 1,
        lessonName: "Sağlık",
      },
    ]);

    await getTeacher(id);
    await get();
  }, []);

  // eslint-disable-next-line no-shadow
  const newLessonCreated = (day) => {
    setDay(day);
    setOpenDialog(true);
  };
  // eslint-disable-next-line no-shadow
  const dialogClosed = () => {
    setTeacherId(0);
    setLessonId(0);
    setSendForm(false);
    setOpenDialog(false);
  };

  const newLessonDialogAccept = () => {
    setSendForm(true);
    if (teacherId <= 0 || lessonId <= 0) return;
    const request = {
      id: program.length + 1,
      day,
      clock: `${startClock} - ${endClock}`,
      teacherId,
      teacherName: "Fatih Mandıralı",
      lessonId,
      lessonName: "Fizik",
    };
    setProgram([...program, request]);
    setOpenDialog(false);
  };
  const onChangeTeacher = (event) => {
    console.log(event);
    setTeacherId(event.target.value);
  };
  const onChangeLesson = (event) => {
    console.log(`lesson ${event.target.value}`);
    setLessonId(event.target.value);
  };

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium">
            <h1>Ders Programı</h1>
          </MDTypography>
          <MDButton onClick={() => setProgram([])} variant="gradient" color="error">
            &nbsp;TEMİZLE
          </MDButton>
        </MDBox>
        <br />
        <Box>
          <Grid container spacing={0.5}>
            <Grid textAlign="center" bgcolor="white" item mb={5} xs={3}>
              <h4>Pazartesi</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "monday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("monday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Salı</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "tuesday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("tuesday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Çarşamba</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "wednesday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("wednesday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Perşembe</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "thursday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("thursday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Cuma</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "friday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("friday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Cumartesi</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "saturday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("saturday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Pazar</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.day === "sunday")
                  .map((item) => (
                    <Grid mt={1} fontSize={13} bgcolor="aliceblue" item xs={12}>
                      <span>
                        <b>Saat :</b> {item.clock}
                      </span>
                      <br />
                      <span>
                        <b>Ders :</b> {item.lessonName}
                      </span>
                      <br />
                      <span>
                        <b>Öğretmen :</b> {item.teacherName}
                      </span>
                    </Grid>
                  ))}
                <Grid
                  mt={1}
                  textAlign="center"
                  fontSize={13}
                  bgcolor="aliceblue"
                  item
                  xs={12}
                  justifyContent="center"
                  onClick={() => newLessonCreated("sunday")}
                >
                  Yeni Ders Ekle
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MDBox>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => dialogClosed()}>
        <DialogTitle>Programa Ders Ekle</DialogTitle>
        <DialogContent>
          <Grid container spacing={0.5}>
            <Grid textAlign="center" bgcolor="white" item xs={3}>
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
            <Grid textAlign="center" bgcolor="white" item xs={3}>
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
            <Grid textAlign="center" bgcolor="white" item xs={3}>
              <Box mt={2}>
                {serviceTeacher.serviceStatus === "loaded" && (
                  <FormControl mb={5} fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Öğretmen</InputLabel>
                    <Select
                      label="Öğretmen"
                      displayEmpty
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      defaultValue={0}
                      name="teacherId"
                      onChange={onChangeTeacher}
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
                    {sendForm === true && teacherId <= 0 && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">Lütfen öğretmen seçin</Alert>
                      </Stack>
                    )}
                  </FormControl>
                )}
              </Box>
            </Grid>
            <Grid textAlign="center" bgcolor="white" item xs={3}>
              <Box mt={2}>
                {service.serviceStatus === "loaded" && (
                  <FormControl mb={5} fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Ders</InputLabel>
                    <Select
                      label="Ders"
                      displayEmpty
                      variant="outlined"
                      margin="dense"
                      fullWidth
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      defaultValue={0}
                      name="lessonId"
                      onChange={onChangeLesson}
                    >
                      <MenuItem key={0} value={0}>
                        Seçiniz
                      </MenuItem>
                      {service.data.map((u) => (
                        <MenuItem key={u.LessonId} value={u.LessonId}>
                          {u.LessonName}
                        </MenuItem>
                      ))}
                    </Select>
                    {sendForm === true && lessonId <= 0 && (
                      <Stack sx={{ width: "100%" }} spacing={2}>
                        <Alert severity="error">Lütfen ders seçin</Alert>
                      </Stack>
                    )}
                  </FormControl>
                )}
              </Box>
            </Grid>
          </Grid>
          <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium" />
            <MDButton onClick={() => newLessonDialogAccept()} variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;ekle
            </MDButton>
          </MDBox>
        </DialogContent>
      </Dialog>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium" />
        <MDButton onClick={() => setProgram([])} variant="gradient" color="success">
          &nbsp;Kaydet
        </MDButton>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
