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
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { CardActionArea, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import MDInput from "../../../components/MDInput";
import localizedTextsMap from "../../../tableContentLanguage";

function Tables() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [openDialog, setOpenDialog] = useState(false);

  const clickRollCall = (lessonProgramId) => {
    console.log(lessonProgramId);
    setOpenDialog(true);
  };

  const rollCall = [
    {
      ClockTime: "07:30 - 08:30",
      LessonName: "Matematik",
      TeacherName: "Ali Veli",
      LessonProgramId: 1,
    },
  ];

  const students = [
    {
      StudentName: "Ufuk",
      StudentSurname: "Test",
      StudentId: 2,
      ClassName: "1",
    },
    {
      StudentName: "Murat",
      StudentSurname: "Test",
      StudentId: 1,
      ClassName: "1",
    },
  ];
  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
  ];
  const cardsRollCall = () => {
    const myArray = [];
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < rollCall.length; i++) {
      // eslint-disable-next-line no-loop-func
      (function (index) {
        myArray[i] = (
          <Grid
            onClick={() => clickRollCall(rollCall[index].LessonProgramId)}
            textAlign="center"
            mt={1}
            fontSize={13}
            item
            xs={2}
            key={index}
          >
            <CardActionArea>
              <Card>
                <span>
                  <b>Saat :</b> {rollCall[i].ClockTime}
                </span>
                <span>
                  <b>Ders :</b> {rollCall[i].LessonName}
                </span>
                <span>
                  <b>Öğretmen :</b> {rollCall[i].TeacherName}
                </span>
              </Card>
            </CardActionArea>
          </Grid>
        );
      })(i);
    }
    return myArray;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Yoklama(Çalışmalar devam ediyor..)" />
      <MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <MDInput
            id="date-local"
            label="Yoklama Tarih"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => setDate(event.target.value)}
            value={date}
          />
        </MDBox>
        <MDBox>
          <Box>
            <Grid container spacing={0.5}>
              {rollCall.length <= 0 ? (
                <b style={{ textAlign: "center", margin: "auto" }}>
                  Bugüne ait yoklama dersi bulunmamaktadır
                </b>
              ) : (
                cardsRollCall()
              )}
            </Grid>
          </Box>
        </MDBox>
      </MDBox>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Sınıf Listesi</DialogTitle>
        <DialogContent>
          <div style={{ height: 400, width: "100%" }}>
            {students.length <= 0 ? (
              <b style={{ textAlign: "center", margin: "auto" }}>
                Bu sınıfa ait yoklama alınacak öğrenci bulunmamaktadır
              </b>
            ) : (
              <DataGrid
                rows={students}
                columns={columns}
                pageSize={15}
                pagination
                localeText={localizedTextsMap}
                rowsPerPageOptions={[5, 10, 15]}
                checkboxSelection
                getRowId={(row) => row.StudentId}
                onSelectionModelChange={(ids) => {
                  console.log(ids);
                }}
              />
            )}
          </div>

          <br />
          {students.length <= 0 ? (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <MDButton fullWidth onClick={() => btnSave()} variant="gradient" color="info">
                  Kaydet
                </MDButton>
              </Grid>
              <Grid item xs={2}>
                <MDButton
                  onClick={() => btnSaveFinishModal()}
                  style={{ float: "right" }}
                  variant="gradient"
                  color="success"
                  fullWidth
                >
                  BİTİR
                </MDButton>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
