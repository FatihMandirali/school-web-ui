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

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import PaymentIcon from "@mui/icons-material/Payment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import useList from "./service/useList";
import useActiveUniversityList from "./service/useActiveUniversityList";
import useApplyUniversityList from "./service/useApplyUniversityList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";
import MDSnackbar from "../../../components/MDSnackbar";

function Tables() {
  const { service, get } = useList();
  const { getActiveUniversityList } = useActiveUniversityList();
  const { getApplyUniversityList } = useApplyUniversityList();
  const [openDialog, setOpenDialog] = useState(false);
  const [activeUniList, setActiveUniList] = useState([]);
  const [applyUniList, setApplyUniList] = useState([]);
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  // const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="İşlem Başarılı"
      content="Tebrikler, İşlem başarılı bir şekilde gerçekleşti."
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

  const handlePaymentClick = (id) => () => {
    window.location.href = `/coverstudent_paymentdetail/${id}`;
  };
  const handleHomeworkClick = (classId, studentId) => () => {
    window.location.href = `/coverstudent_homeworks/${classId}/student/${studentId}`;
  };
  const handleUniClick = (studentId) => async () => {
    const res = await getActiveUniversityList();
    if (res.serviceStatus !== "loaded") {
      setErrorMsg("Bir hata oluştu");
      renderErrorSB();
      return;
    }
    const resStudentApplyUni = await getApplyUniversityList(studentId);
    if (resStudentApplyUni.serviceStatus !== "loaded") {
      setErrorMsg("Bir hata oluştu");
      renderErrorSB();
      return;
    }
    setApplyUniList(resStudentApplyUni.data);
    setActiveUniList(res.data);
    setOpenDialog(true);
  };

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    {
      field: "StudentSurname",
      headerName: "Soyadı",
      minWidth: 200,
    },
    {
      field: "ClassName",
      headerName: "Sınıf",
      minWidth: 200,
    },
    {
      field: "CreateDate",
      headerName: "Kayıt Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "İşlemler",
      width: 100,
      cellClassName: "actions",
      // eslint-disable-next-line react/no-unstable-nested-components
      getActions: (params) => [
        <Tooltip title="Ödevler">
          <GridActionsCellItem
            icon={<HomeWorkIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleHomeworkClick(params.row.ClassId, params.row.StudentId)}
            color="inherit"
          />
        </Tooltip>,
        <Tooltip title="Ödeme Detay">
          <GridActionsCellItem
            icon={<PaymentIcon />}
            label="Payment"
            className="textPrimary"
            onClick={handlePaymentClick(params.row.StudentId)}
            color="inherit"
          />
        </Tooltip>,
        <Tooltip title="Başvurulan Üniversiteler">
          <GridActionsCellItem
            icon={<HistoryEduIcon />}
            label="Payment"
            className="textPrimary"
            onClick={handleUniClick(params.row.StudentId)}
            color="inherit"
          />
        </Tooltip>,
      ],
    },
  ];

  useEffect(async () => {
    await get();
  }, []);

  const activeUniListTable = (
    <Grid container spacing={2}>
      {activeUniList.map((car) => (
        <Grid item xl={10}>
          <div
            style={{
              border: "2px solid rgb(230, 235, 240)",
              padding: "10px",
              borderRadius: "7px",
            }}
          >
            <div
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                width: "80%",
                float: "left",
                marginLeft: "10px",
              }}
            >
              <span style={{ float: "left" }}>{car.AnnouncementTitle}</span>
            </div>
            <br />
          </div>
        </Grid>
      ))}
    </Grid>
  );
  const applyUniListTable = (
    <Grid container spacing={2}>
      {applyUniList.map((car) => (
        <Grid item xl={10}>
          <div
            style={{
              border: "2px solid rgb(230, 235, 240)",
              padding: "10px",
              borderRadius: "7px",
            }}
          >
            <div
              style={{
                fontSize: "17px",
                fontWeight: "bold",
                width: "80%",
                float: "left",
                marginLeft: "10px",
              }}
            >
              <span style={{ float: "left" }}>{car.Name}</span>
            </div>
            <br />
          </div>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Öğrenciler" />
      <MDBox>
        {service.serviceStatus === "loaded" && (
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={9}
              pagination
              localeText={localizedTextsMap}
              getRowId={(row) => row.StudentId}
              rowsPerPageOptions={[5, 10, 15]}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Başvurulan Üniversiteler</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <h3>Aktif Üniversiteler</h3>
              {activeUniList.length <= 0 ? "Aktif üniversite bulunmamaktadır." : activeUniListTable}
            </Grid>
            <Grid item xs={6} md={6}>
              <h3>Başvurulan Üniversiteler</h3>
              {applyUniList.length <= 0
                ? "Başvurulan üniversite bulunmamaktadır."
                : applyUniListTable}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {renderErrorSB}
      {renderSuccessSB}
    </DashboardLayout>
  );
}

export default Tables;
