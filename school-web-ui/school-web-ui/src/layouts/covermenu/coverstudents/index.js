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

import { GridActionsCellItem } from "@mui/x-data-grid";
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
import MDSnackbar from "../../../components/MDSnackbar";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTable: {
          styleOverrides: {
            root: {
              backgroundColor: "lightblue",
            },
            paper: {
              boxShadow: "none",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: "lightblue",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              padding: "6px 15px",
            },
          },
        },
      },
    });
  const columnss = [
    {
      name: "StudentName",
      label: "Adı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "StudentSurname",
      label: "Soyadı",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "ClassName",
      label: "Sınıf",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "CreateDate",
      label: "Kayıt Tarihi",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{new Date(value).toLocaleString()}</div>;
        },
      },
    },
    {
      name: "actions",
      label: "İşlemler",
      options: {
        filter: true,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          const id = service.data[dataIndex].StudentId;
          const ClassId = service.data[dataIndex].ClassId;
          return (
            <>
              <Tooltip title="Ödevler">
                <GridActionsCellItem
                  icon={<HomeWorkIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleHomeworkClick(ClassId, id)}
                  color="inherit"
                />
              </Tooltip>
              ,
              <Tooltip title="Ödeme Detay">
                <GridActionsCellItem
                  icon={<PaymentIcon />}
                  label="Payment"
                  className="textPrimary"
                  onClick={handlePaymentClick(id)}
                  color="inherit"
                />
              </Tooltip>
              ,
              <Tooltip title="Başvurulan Üniversiteler">
                <GridActionsCellItem
                  icon={<HistoryEduIcon />}
                  label="Payment"
                  className="textPrimary"
                  onClick={handleUniClick(id)}
                  color="inherit"
                />
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "standard",
    filter: false,
    download: false,
    print: false,
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 100, 200, 500],
    textLabels: {
      body: {
        noMatch: "Üzgünüz, eşleşen kayıt bulunamadı",
      },
    },
  };

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
          <>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Devamsızlıklar"}
                data={service.data}
                columns={columnss}
                options={options}
              />
            </ThemeProvider>
          </>
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
