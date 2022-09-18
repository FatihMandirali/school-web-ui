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
import { jwtDecode } from "../../../httpservice/jwtDecode";
import { sessionStorageService } from "../../../httpservice/sessionStorageService";

function Tables() {
  const { service, get } = useList();

  const columns = [
    { field: "StudentName", headerName: "Adı", width: 200 },
    {
      field: "StudentSurname",
      headerName: "Soyadı",
      minWidth: 200,
    },
    {
      field: "Amount",
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
    const res = jwtDecode.returnGetJwtDecode(sessionStorageService.returnGetAccessToken());
    if (res === null) {
      sessionStorageService.returnClearToken();
      window.location.href = "/authentication/sign-in";
    }
    await get(parseInt(res.Id, 10));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar pageName="Ödeme Planı" />
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
