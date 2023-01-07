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
import { useEffect, useState } from "react";
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
import useList from "./service/useList";
import useApplyRollCall from "./service/useApplyRollCall";
import useClassList from "./service/useClassList";
import MDSnackbar from "../../../components/MDSnackbar";

function Tables() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [openDialog, setOpenDialog] = useState(false);
  const [lessonList, setLessonList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [classId, setClassId] = useState(0);
  const [lessonId, setLessonId] = useState(0);
  const [lessonProgramId, setLessonProgramId] = useState(0);
  const [existStudentIdList, setExistStudentIdList] = useState([]);
  const { get } = useList();
  const { getClassList } = useClassList();
  const { post } = useApplyRollCall();
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
      content="Tebrikler, Yoklama başarılı bir şekilde alındı."
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
    const dateNow = new Date();
    const res = await get(
      `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
    );
    if (res.serviceStatus === "loaded") {
      setLessonList(res.data);
    }
  }, []);

  const clickRollCall = async (selectedClassId, selectedLessonId, selectedLessonProgramId) => {
    setClassId(selectedClassId);
    setLessonId(selectedLessonId);
    setLessonProgramId(selectedLessonProgramId);
    const res = await getClassList(selectedClassId);
    if (res.serviceStatus === "loaded") {
      setClassList(res.data);
      setOpenDialog(true);
    }
  };

  const dateChange = async (event) => {
    console.log(event);
    setDate(event);
    const res = await get(event);
    if (res.serviceStatus === "loaded") {
      setLessonList(res.data);
    }
  };

  const btnSaveFinishModal = async () => {
    const rollCallList = [];
    // eslint-disable-next-line array-callback-return
    classList.map((x) => {
      rollCallList.push({
        classId,
        lessonId,
        studentId: x.StudentId,
        lessonProgramId,
        isActive: existStudentIdList.find((y) => y === x.StudentId) !== undefined ? 1 : 0,
      });
    });
    const res = await post(rollCallList);
    if (res.serviceStatus === "loaded") {
      openSuccessSB();
      window.location.reload();
    }
    setErrorMsg("Yoklama alınırken bir hata oluştu");
    openErrorSB();
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
  ];
  const cardsRollCall = () => {
    const myArray = [];
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < lessonList.length; i++) {
      // eslint-disable-next-line no-loop-func
      (function (index) {
        myArray[i] = (
          <Grid
            onClick={() =>
              clickRollCall(
                lessonList[index].ClassId,
                lessonList[index].LessonId,
                lessonList[index].LessonProgramId
              )
            }
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
                  <b>Saat :</b> {lessonList[i].ClockTime}
                </span>
                <span>
                  <b>Ders :</b> {lessonList[i].LessonName}
                </span>
                <span>
                  <b>Öğretmen :</b> {lessonList[i].TeacherName} {lessonList[i].TeacherSurname}
                </span>
                <span>
                  <b>Sınıf :</b> {lessonList[i].ClassName}
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
            onChange={(event) => dateChange(event.target.value)}
            value={date}
          />
        </MDBox>
        <MDBox>
          <Box>
            <Grid container spacing={0.5}>
              {lessonList.length <= 0 ? (
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
            {classList.length <= 0 ? (
              <b style={{ textAlign: "center", margin: "auto" }}>
                Bu sınıfa ait yoklama alınacak öğrenci bulunmamaktadır
              </b>
            ) : (
              <DataGrid
                rows={classList}
                columns={columns}
                pageSize={15}
                pagination
                localeText={localizedTextsMap}
                rowsPerPageOptions={[5, 10, 15]}
                checkboxSelection
                getRowId={(row) => row.StudentId}
                onSelectionModelChange={(ids) => {
                  console.log(ids);
                  setExistStudentIdList(ids);
                }}
              />
            )}
          </div>

          <br />
          {existStudentIdList.length <= 0 ? (
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
      {renderSuccessSB}
      {renderErrorSB}
    </DashboardLayout>
  );
}

export default Tables;
