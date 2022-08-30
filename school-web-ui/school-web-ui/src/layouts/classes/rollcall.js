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
import { useState } from "react";
import { CardActionArea, Dialog, DialogContent, DialogTitle, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MDSnackbar from "../../components/MDSnackbar";
import MDButton from "../../components/MDButton";
import { sessionStorageService } from "../../httpservice/sessionStorageService";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";

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
  const [openDialog, setOpenDialog] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [temporarySelectedRows, setTemporarySelectedRows] = useState(
    JSON.parse(sessionStorageService.returnGetRollCall()) === null
      ? []
      : JSON.parse(sessionStorageService.returnGetRollCall())
  );

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  // const openErrorSB = () => setErrorSB(true);
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
  const clickRollCall = () => {
    console.log(temporarySelectedRows);
    setOpenDialog(true);
  };

  const columns = [
    { field: "name", headerName: "Adı", width: 200 },
    { field: "surname", headerName: "Soyadı", minWidth: 400 },
  ];
  const data = [
    { name: "name", surname: "Adı", id: 1 },
    { name: "name1", surname: "Adı1", id: 2 },
    { name: "name3", surname: "Adı3", id: 3 },
  ];

  const changePage = (page) => {
    console.log("page");
    console.log(page);
  };

  const btnSave = () => {
    sessionStorageService.returnSetRollCall(JSON.stringify(temporarySelectedRows));
    setSuccessMsg("Tebrikler, yoklama kaydedildi.");
    openSuccessSB();
  };

  const btnSaveFinishModal = () => {
    setOpenModal(true);
  };

  const btnSaveFinish = () => {
    setSuccessMsg("Tebrikler, yoklama tamamlandı.");
    openSuccessSB();
    window.location.href = "/classes";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Yoklama" />
      <MDBox>
        <br />
        <Box>
          <Grid container spacing={0.5}>
            <Grid
              onClick={() => clickRollCall(1)}
              textAlign="center"
              mt={1}
              fontSize={13}
              item
              xs={2}
            >
              <CardActionArea>
                <Card>
                  <span>
                    <b>Saat :</b> 10:00 - 12:00
                  </span>
                  <span>
                    <b>Ders :</b> Matematik
                  </span>
                  <span>
                    <b>Öğretmen :</b> Fatih Mandıralı
                  </span>
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
        </Box>
      </MDBox>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => dialogClosed()}>
        <DialogTitle>Sınıf Listesi</DialogTitle>
        <DialogContent>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={15}
              pagination
              rowsPerPageOptions={[5, 10, 15]}
              onPageChange={(newPage) => changePage(newPage)}
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                // eslint-disable-next-line no-shadow
                const selectedRows = data.filter((row) => selectedIDs.has(row.id));
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
