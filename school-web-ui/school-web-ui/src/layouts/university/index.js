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
import EditIcon from "@mui/icons-material/Edit";
import Icon from "@mui/material/Icon";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import useList from "./service/useList";
import useApplyStudentList from "./service/useApplyStudentList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../tableContentLanguage";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Tables() {
  const { service, get } = useList();
  const { getApplyStudentList } = useApplyStudentList();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const handleEditClick = (id) => () => {
    window.location.href = `/university_detail/${id}`;
  };
  const handleRecordClick = (id) => async () => {
    setIsLoading(true);
    const res = await getApplyStudentList(id);
    setStudentList(res.data);
    setIsLoading(false);
    setOpenDialog(true);
  };
  const getMuiTheme = () =>
    createTheme({
      components: {},
    });
  const columnss = [
    {
      name: "AnnouncementTitle",
      label: "Üniversite",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "AnnouncementText",
      label: "URL",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return (
            <a href={value} target="_blank" rel="noreferrer">
              {value}
            </a>
          );
        },
      },
    },
    {
      name: "RelaseDate",
      label: "Yayın Tarihi",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value) => {
          return <div style={{}}>{new Date(value).toLocaleString()}</div>;
        },
      },
    },
    {
      name: "EndDate",
      label: "Bitiş Tarihi",
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
          const id = service.data[dataIndex].AnnouncementId;
          const AnnouncementTitle = service.data[dataIndex].AnnouncementTitle;
          return (
            <>
              <Tooltip title="Detay">
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />
              </Tooltip>
              ,
              <Tooltip title="Kayıtlı Öğrenciler">
                <GridActionsCellItem
                  icon={<HistoryEduIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleRecordClick(AnnouncementTitle)}
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

  const columnsDetail = [
    {
      field: "StudentName",
      headerName: "Ad Soyad",
      width: 300,
      valueGetter: (params) => `${params.row.StudentName} ${params.row.StudentSurname}`,
    },
    {
      field: "ClassName",
      headerName: "Sınıfı",
      width: 300,
    },
  ];

  useEffect(() => {
    get();
  }, []);

  const studentListTable = (
    <Grid container spacing={2}>
      {studentList.length <= 0 ? (
        <h4 style={{ marginLeft: "20px" }}>Üniversiteye kayıtlı öğrenci bulunmamaktadır.</h4>
      ) : (
        <div style={{ height: 500, width: "100%", marginLeft: "20px" }}>
          <DataGrid
            rows={studentList}
            columns={columnsDetail}
            pageSize={8}
            pagination
            localeText={localizedTextsMap}
            getRowId={(row) => row.StudentName}
            rowsPerPageOptions={[5, 10, 15]}
            loading={service.serviceStatus === "loading"}
          />
        </div>
      )}
    </Grid>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Üniversite" />
      <MDBox>
        <MDBox mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" />
          <Link to="/university_create" style={{ color: "#FFF" }}>
            <MDButton size="small" variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;ekle
            </MDButton>
          </Link>
        </MDBox>
        {service.serviceStatus === "loaded" && (
          <>
            <ThemeProvider theme={getMuiTheme()}>
              <MUIDataTable
                title={"Üniversite"}
                data={service.data}
                columns={columnss}
                options={options}
              />
            </ThemeProvider>
          </>
        )}
      </MDBox>

      <Dialog maxWidth="xl" fullWidth open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Kayıtlı Öğrenciler</DialogTitle>
        <DialogContent>
          <MDBox mt={2} mb={2}>
            {studentListTable}
          </MDBox>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
