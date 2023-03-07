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
import * as React from "react";
import MDBox from "components/MDBox";
import httpservice from "../../../../httpservice/httpservice";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { CardActionArea, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import useLessonProgramByClassId from "../service/classList";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import MDButton from "components/MDButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const tablestyle = {
  width: "100%",
  border: "1px solid gray",
  borderCollapse: "collapse",
};
const tablestyle1 = {
  border: "1px solid gray",
  borderCollapse: "collapse",
  padding: "2px 5px",
};
const tablestyle2 = {
  width: "40%",
  border: "1px solid gray",
  borderCollapse: "collapse",
  padding: "2px 5px",
};
const tablestyle3 = {
  width: "20%",
  border: "1px solid gray",
  borderCollapse: "collapse",
  padding: "2px 5px",
  textAlign: "center",
};
// eslint-disable-next-line react/prop-types
function Tables() {
  const { get } = useLessonProgramByClassId();
  const [program, setProgram] = useState([]);
  const [opening, setOpening] = useState(false);
  const [listteacher, setListteacher] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [checkeds, setCheckeds] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [updatedata, setUpdatedata] = useState([]);
  const [classData, setClassData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setCheckeds([]);
    setUpdatedata([]);
  };
  const handleCheck = (item) => {
    const newMenuItem = [...checkeds];
    const index = newMenuItem.indexOf(item.studentId);
    if (index === -1) {
      newMenuItem.push({
        classId: item.ClassId,
        studentId: item.StudentId,
        lessonId: item.LessonId,
        isActive: 1,
        lessonProgramId: item.LessonProgramId,
      });
    } else {
      newMenuItem.splice(index, 1);
    }
    setCheckeds(newMenuItem);
    const checkId = new Set(newMenuItem.map(({ studentId }) => studentId));
    const combined = [...newMenuItem, ...newdata.filter(({ studentId }) => !checkId.has(studentId))];
    setUpdatedata(combined);

  };


  const callDetails = async (classId) => {
    try {
      const res = await httpservice.get(
        `JoinTakesControllers/ListTeacher?classId=${classId.ClassId}&lessonProgramId=${classId.LessonProgramId}`
      );
      let newdata = res.data;
      const updatedata = newdata.map((v) => {
        return {
          StudentId: v.StudentId,
          StudentName: v.StudentName,
          StudentSurname: v.StudentSurname,
          ClassId: classId.ClassId,
          LessonId: classId.LessonId,
          LessonProgramId: classId.LessonProgramId,
        };
      });
      const updatedata1 = newdata.map((v) => {
        return {
          classId: classId.ClassId,
          studentId: v.StudentId,
          lessonId: classId.LessonId,
          isActive: 0,
          lessonProgramId: classId.LessonProgramId,
        };
      });
      setClassData(classId)
      setListteacher(updatedata);
      setNewData(updatedata1);
      setOpening(true);
    } catch (error) {
      console.log("errorr", error);
      alert(error.request.response)
    }
  };
  const callbackapi = async () => {
    setOpen(true);
    try {
      const res = await httpservice.get(`Teachers/JoinTake?dayId=${classData.DayId}&lessonProgramId=${classData.LessonProgramId}`);
      if (res.status === 200) {
        setOpen(false);
      }
      console.log(res);

    } catch (error) {
      setOpen(false);
      console.log("errorr", error);
    }
  };
  const addJoinTask = async (classId) => {
    setOpenDialog(false);
    setOpen(true);
    try {
      const res = await httpservice.post(`JoinTakesControllers/Add`, updatedata);
      if (res.status === 200) {
        setOpening(false);
        setOpen(false);
        setCheckeds([]);
        setUpdatedata([]);
        alert("Yoklama alındı");
        callbackapi()
      }
      // setListteacher(res.data)
      console.log(res);
      // setOpening(true)
    } catch (error) {
      setOpen(false);
      console.log("errorr", error);
    }
  };
  useEffect(async () => {
    const res = await get();
    if (res.serviceStatus === "loaded") {
      console.log(res.data);
      setProgram(res.data);
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ders Programı" />
      <MDBox>
        <Box>
          <Grid container spacing={0.5}>
            <Grid textAlign="left" bgcolor="white" item mb={5} xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 1)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 2)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 3)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 4)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 5)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 6)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="left" bgcolor="white" mb={5} item xs={4}>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 7)
                  .map((item) => (
                    <Grid
                      onClick={() => callDetails(item)}
                      textAlign="center"
                      mt={1}
                      fontSize={13}
                      item
                      xs={12}
                    >
                      <CardActionArea>
                        <Card style={{padding:"10px"}}>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                          <span>
                            <b>Sınıf :</b> {item.ClassName}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Modal
            open={opening}
            onClose={() => setOpening(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h3>Öğrenci Listesi</h3>
              <div style={{ minHeight: "500px", overflow: "auto" }}>
                <table style={tablestyle}>
                  <tr style={tablestyle1}>
                    <th style={tablestyle2}>Ad</th>
                    <th style={tablestyle2}>SoyAd</th>
                    <th style={tablestyle3}>Durum</th>
                  </tr>
                  {listteacher.map((v, i) => (
                    <tr key={i} style={tablestyle1}>
                      <td style={tablestyle2}>{v.StudentName}</td>
                      <td style={tablestyle2}>{v.StudentSurname}</td>
                      <td style={tablestyle3}>
                        <div key={i}>
                          <input
                            value={v.StudentId}
                            type="checkbox"
                            onChange={()=>handleCheck(v)}
                            // onChange={(e) => {
                            //   // add to list
                            //   if (e.target.checked) {
                            //     setCheckeds([
                            //       ...checkeds,
                            //       {
                            //         classId: v.ClassId,
                            //         studentId: v.StudentId,
                            //         lessonId: v.LessonId,
                            //         isActive: 1,
                            //         lessonProgramId: v.LessonProgramId,
                            //       },
                            //     ]);
                            //   } else {
                            //     // remove from list
                            //     setCheckeds(
                            //       checkeds.filter((id) => id.studentId !== v.StudentId)
                            //     );
                            //   }
                            //   const checkId = new Set(checkeds.map(({ studentId }) => studentId));
                            //   const combined = [
                            //     ...checkeds,
                            //     ...newdata.filter(({ studentId }) => !checkId.has(studentId)),
                            //   ];
                            //   setUpdatedata(combined)
                            //   console.log("checkeds", checkeds);
                            //   console.log("newdata", newdata);
                            //   console.log("combined", combined);
                            // }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
              <br />
              <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
                <MDButton onClick={() => setOpening(false)} type="button" color="error">
                  Kapalı
                </MDButton>
                <MDButton onClick={() => setOpenDialog(true)} type="button" color="success">
                  Onaylamak
                </MDButton>
              </Stack>
            </Box>
          </Modal>
          <Dialog maxWidth="sm" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
              <Box mt={2}>
                <p
                  style={{
                    textAlign: "center",
                    marginBottom: "30px",
                    marginTop: "20px",
                    color: "#000",
                  }}
                >
                  Yoklamayı bitirmek istiyor musunuz ?
                </p>
                <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
                  <MDButton onClick={() => setOpenDialog(false)} type="button" color="error">
                    Kapalı
                  </MDButton>
                  <MDButton onClick={() => addJoinTask()} type="button" color="success">
                    Göndermek
                  </MDButton>
                </Stack>
              </Box>
            </DialogContent>
          </Dialog>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
