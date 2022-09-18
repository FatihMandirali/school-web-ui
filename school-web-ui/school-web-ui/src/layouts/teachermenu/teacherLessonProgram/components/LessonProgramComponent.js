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
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import useLessonProgramByClassId from "../service/useList";
import DashboardNavbar from "../../../../examples/Navbars/DashboardNavbar";

// eslint-disable-next-line react/prop-types
function Tables() {
  const { get } = useLessonProgramByClassId();
  const [program, setProgram] = useState([]);

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
            <Grid textAlign="center" bgcolor="white" item mb={5} xs={3}>
              <h4>Pazartesi</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 1)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Salı</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 2)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Çarşamba</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 3)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Perşembe</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 4)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Cuma</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 5)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Cumartesi</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 6)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            <Grid textAlign="center" bgcolor="white" mb={5} item xs={3}>
              <h4>Pazar</h4>
              <Grid container spacing={0.5}>
                {program
                  .filter((x) => x.DayId === 7)
                  .map((item) => (
                    <Grid textAlign="center" mt={1} fontSize={13} item xs={12}>
                      <CardActionArea>
                        <Card>
                          <span>
                            <b>Saat :</b> {item.ClockTime}
                          </span>
                          <span>
                            <b>Ders :</b> {item.LessonName}
                          </span>
                          <span>
                            <b>Öğretmen :</b> {item.TeacherName} {item.TeacherSurname}
                          </span>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
