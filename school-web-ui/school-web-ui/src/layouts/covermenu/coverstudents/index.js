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
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import PaymentIcon from "@mui/icons-material/Payment";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import useList from "./service/useList";
import DashboardNavbar from "../../../examples/Navbars/DashboardNavbar";
import localizedTextsMap from "../../../tableContentLanguage";

function Tables() {
  const { service, get } = useList();

  const handlePaymentClick = (id) => () => {
    window.location.href = `/coverstudent_paymentdetail/${id}`;
  };
  const handleHomeworkClick = (classId) => () => {
    window.location.href = `/coverstudent_homeworks/${classId}`;
  };

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
            onClick={handleHomeworkClick(params.row.ClassId)}
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
      ],
    },
  ];

  useEffect(async () => {
    await get();
  }, []);

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
    </DashboardLayout>
  );
}

export default Tables;
