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
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";

function Tables() {
  const { service, get } = useList();
  const { getApplyStudentList } = useApplyStudentList();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  const handleRecordClick = (id) => async () => {
    setIsLoading(true);
    const res = await getApplyStudentList(id);
    setStudentList(res.data);
    setIsLoading(false);
    setOpenDialog(true);
  };

  const columns = [
    { field: "AnnouncementTitle", headerName: "Üniversite", width: 250 },
    {
      field: "AnnouncementText",
      headerName: "URL",
      width: 250,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
          {params.value}
        </a>
      ),
    },
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
