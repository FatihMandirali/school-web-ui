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
import useList from "./service/useList";
import useApplyStudentList from "./service/useApplyStudentList";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../tableContentLanguage";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

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

  const columns = [
    { field: "AnnouncementTitle", headerName: "Başlık", width: 250 },
    { field: "AnnouncementText", headerName: "Açıklama", width: 250 },
    {
      field: "RelaseDate",
      headerName: "Yayın Tarihi",
      width: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "EndDate",
      headerName: "Bitiş Tarihi",
      width: 200,
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
        <Tooltip title="Detay">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(params.row.AnnouncementId)}
            color="inherit"
          />
        </Tooltip>,
        <Tooltip title="Kayıtlı Öğrenciler">
          <GridActionsCellItem
            icon={<HistoryEduIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleRecordClick(params.row.AnnouncementTitle)}
            color="inherit"
          />
        </Tooltip>,
      ],
    },
  ];

  useEffect(() => {
    get();
  }, []);

  const studentListTable = (
    <>
      <Grid container spacing={2}>
        {studentList.map((car) => (
          <Grid item xl={3}>
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
                <span style={{ float: "left" }}>
                  {car.StudentName} {car.StudentSurname}
                </span>
              </div>
              <br />
            </div>
          </Grid>
        ))}
      </Grid>
    </>
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
          <div style={{ height: 550, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={8}
              pagination
              localeText={localizedTextsMap}
              getRowId={(row) => row.AnnouncementId}
              rowsPerPageOptions={[5, 10, 15]}
              loading={service.serviceStatus === "loading"}
            />
          </div>
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
