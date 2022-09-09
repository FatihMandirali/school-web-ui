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

import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";

function Tables() {
  const { service, get } = useList();

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 300 },
    {
      field: "StudentSurname",
      headerName: "Soyadı",
      minWidth: 300,
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
  ];

  useEffect(async () => {
    await get();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Çocuklar" />
      <MDBox>
        <br />
        {service.serviceStatus === "loaded" && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={10}
              pagination
              getRowId={(row) => row.StudentId}
              rowsPerPageOptions={[5, 10, 15]}
              loading={service.serviceStatus === "loading"}
            />
          </div>
        )}
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
