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
    { field: "StudentName", headerName: "Adı", width: 150 },
    {
      field: "StudentSurname",
      headerName: "Soyadı",
      minWidth: 150,
    },
    {
      field: "Amount",
      headerName: "Toplam Tutar",
      minWidth: 200,
    },
    {
      field: "Period",
      headerName: "Aylık Tutar",
      minWidth: 200,
    },
    {
      field: "EndDate",
      headerName: "Son Ödeme Tarihi",
      minWidth: 200,
      valueGetter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "Events",
      headerName: "Ödenme Durumu",
      minWidth: 200,
      valueGetter: (params) => (params.value <= 0 ? "Ödenmedi" : "Ödendi"),
    },
  ];

  useEffect(async () => {
    await get();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ödeme Planları" />
      <MDBox>
        {service.serviceStatus === "loaded" && (
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={service.data}
              columns={columns}
              pageSize={9}
              pagination
              getRowId={(row) => row.PaymentStudentId}
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
