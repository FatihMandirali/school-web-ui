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
import { CardActionArea, Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useParams } from "react-router-dom";
import MDSnackbar from "../../components/MDSnackbar";
import MDButton from "../../components/MDButton";
import { sessionStorageService } from "../../httpservice/sessionStorageService";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import useRollCallList from "./service/useRollCallList";
import useRollCallStudentList from "./service/useRollCallStudentList";
import useMakeRollCall from "./service/useMakeRollCall";

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

// eslint-disable-next-line react/prop-types
function Tables() {
  const { id } = useParams();
  const { getRollCall } = useRollCallList();
  const { post } = useMakeRollCall();
  const { serviceRollCallStudent, getRollCallStudent } = useRollCallStudentList();
  const [openDialog, setOpenDialog] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [lessonId, setLessonId] = useState(0);
  const [rollCall, setRollCall] = useState([]);
  const [students, setStudents] = useState([]);
  const [temporarySelectedRows, setTemporarySelectedRows] = useState([]);

  useEffect(async () => {
    const studentRes = await getRollCallStudent(id);
    if (studentRes.serviceStatus === "loaded") {
      setStudents(studentRes.data);
    }
    const res = await getRollCall(id);
    if (res.serviceStatus === "loaded") {
      setRollCall(res.data);
    }
  }, []);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content={successMsg}
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

  // eslint-disable-next-line no-shadow
  const dialogClosed = () => {
    setOpenDialog(false);
  };

  // eslint-disable-next-line no-shadow
  const clickRollCall = (lessonId) => {
    setLessonId(lessonId);
    setTemporarySelectedRows(
      JSON.parse(sessionStorageService.returnGetRollCall(lessonId)) === null
        ? []
        : JSON.parse(sessionStorageService.returnGetRollCall(lessonId))
    );
    setOpenDialog(true);
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    { field: "StudentSurname", headerName: "Soyadı", minWidth: 400 },
  ];

  const changePage = (page) => {
    console.log("page");
    console.log(page);
  };

  const btnSave = () => {
    console.log(temporarySelectedRows);
    sessionStorageService.returnSetRollCall(JSON.stringify(temporarySelectedRows), lessonId);
    setSuccessMsg("Tebrikler, yoklama kaydedildi.");
    openSuccessSB();
  };

  const btnSaveFinishModal = () => {
    setOpenModal(true);
  };

  const btnSaveFinish = async () => {
    console.log(temporarySelectedRows);
    const request = [];
    // eslint-disable-next-line array-callback-return
    students.map((item) => {
      request.push({
        classId: id,
        studentId: item.StudentId,
        lessonId,
        isActive: temporarySelectedRows.find((x) => x === item.StudentId) !== undefined ? 1 : 0,
      });
    });
    console.log(request);
    const res = await post(request);
    if (res.serviceStatus === "loaded") {
      setSuccessMsg("Tebrikler, yoklama tamamlandı.");
      openSuccessSB();
      window.location.href = "/classes";
    } else {
      setSuccessMsg("Yoklama tamamlanırken bir sorun oluştu.");
      openErrorSB();
    }
  };

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
                  <b>Öğretmen :</b> {rollCall[i].TeacherName} {rollCall[i].TeacherSurname}
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
      <DashboardNavbar pageName="Yoklama" />
      <MDBox>
        <br />
        <Box>
          <Grid container spacing={0.5}>
            {cardsRollCall()}
          </Grid>
        </Box>
      </MDBox>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => dialogClosed()}>
        <DialogTitle>Sınıf Listesi</DialogTitle>
        <DialogContent>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={students}
              columns={columns}
              pageSize={15}
              pagination
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={(newPage) => changePage(newPage)}
              checkboxSelection
              getRowId={(row) => row.StudentId}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                // eslint-disable-next-line no-shadow
                const selectedRows = serviceRollCallStudent.data.filter((row) =>
                  selectedIDs.has(row.StudentId)
                );
                console.log(selectedRows);
                console.log(ids);

                setTemporarySelectedRows(ids);
              }}
              selectionModel={temporarySelectedRows}
            />
          </div>

          <br />
          <Grid container spacing={2}>
            <Grid item xs={9} />
            <Grid item xs={2}>
              <MDButton onClick={() => btnSave()} variant="gradient" color="info">
                Kaydet
              </MDButton>
            </Grid>
            <Grid item xs={1}>
              <MDButton
                onClick={() => btnSaveFinishModal()}
                style={{ float: "right" }}
                variant="gradient"
                color="success"
              >
                BİTİR
              </MDButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
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
            Yoklamayı bitirmek istediğinize emin misiniz?
          </Typography>
          <br />
          <Stack style={{ justifyContent: "center" }} spacing={15} direction="row">
            <MDButton type="button" onClick={() => setOpenModal(false)} color="error">
              İPTAL
            </MDButton>
            <MDButton type="button" onClick={() => btnSaveFinish()} color="dark">
              ONAYLA
            </MDButton>
          </Stack>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default Tables;
